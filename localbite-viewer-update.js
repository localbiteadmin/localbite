#!/usr/bin/env node
// localbite-viewer-update.js
// Reads a city JSON pack and updates index.html automatically:
//   1. Geocodes any missing neighbourhood centroids via Nominatim
//   2. Adds missing entries to the CENTROIDS object in index.html
//   3. Checks CITY_BOUNDS — adds city if missing
//
// Usage: node localbite-viewer-update.js localbite-barcelona-2023-2026.json
//
// Prerequisites: Nominatim (no API key required, 1 req/sec rate limit)
// Safe to run multiple times — skips neighbourhoods already in CENTROIDS.

import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const inputFile = process.argv[2];
if (!inputFile) {
  console.error('Usage: node localbite-viewer-update.js <city-json-file>');
  process.exit(1);
}

const cityPath  = path.resolve(inputFile);
const indexPath = path.join(__dirname, 'index.html');

if (!fs.existsSync(cityPath))  { console.error(`ERROR: ${cityPath} not found`);  process.exit(1); }
if (!fs.existsSync(indexPath)) { console.error(`ERROR: index.html not found at ${indexPath}`); process.exit(1); }

const cityData = JSON.parse(fs.readFileSync(cityPath, 'utf8'));
const city     = cityData.city;
const country  = cityData.country;

if (!city || !country) {
  console.error('ERROR: city JSON missing city or country fields');
  process.exit(1);
}

// ── Collect unique neighbourhood names from the city pack ──
const neighbourhoods = [...new Set(
  cityData.restaurants
    .map(r => r.neighbourhood)
    .filter(n => n && n.trim().length > 0)
)].sort();

console.log(`\nLocalBite Viewer Update — ${city}, ${country}`);
console.log(`Neighbourhoods in pack: ${neighbourhoods.length}`);
console.log(neighbourhoods.map(n => `  • ${n}`).join('\n'));
console.log();

// ── Read index.html ──
let html = fs.readFileSync(indexPath, 'utf8');

// ── Extract the CENTROIDS block as a string ──
// Returns { block, blockStart, blockEnd } where block is the content
// between "const CENTROIDS = {" and its closing "};", and blockStart/blockEnd
// are the indices in the full html string.
// Throws if CENTROIDS cannot be found.
function extractCentroidsBlock(html) {
  const openMarker = 'const CENTROIDS = {';
  const openIdx = html.indexOf(openMarker);
  if (openIdx === -1) throw new Error('Could not find "const CENTROIDS = {" in index.html');

  // Find the matching closing }; by scanning from after the opening {
  // We track brace depth so we find the CENTROIDS }; not some inner one.
  let depth = 0;
  let i = openIdx + openMarker.length - 1; // position of the opening {
  const len = html.length;

  while (i < len) {
    const ch = html[i];
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) {
        // Found the closing }. Check it's followed by ; (possibly with whitespace)
        let j = i + 1;
        while (j < len && html[j] === ' ') j++;
        if (html[j] === ';') {
          return {
            blockStart: openIdx,
            blockEnd: j + 1,           // index after the ;
            innerStart: openIdx + openMarker.length,
            innerEnd: i,               // index of the closing }
            inner: html.slice(openIdx + openMarker.length, i)
          };
        }
      }
    }
    i++;
  }
  throw new Error('Could not find closing }; for CENTROIDS block');
}

// ── Parse existing CENTROIDS keys ──
// BUG FIX 1: The original regex  ['"]([^'"]+)['"]\s*:  stops at apostrophes
// inside key names (e.g. "Camp de l'Arpa" was read as just "Camp de l").
// New approach: match EITHER 'single-quoted key' OR "double-quoted key"
// separately, so an apostrophe inside a double-quoted key is allowed.
function getExistingCentroids(html) {
  const { inner } = extractCentroidsBlock(html);
  const keys = [];
  // Match 'single-quoted key': no apostrophes allowed inside
  const singleQuoted = /\s*'([^']+)'\s*:/g;
  // Match "double-quoted key": apostrophes allowed inside
  const doubleQuoted = /\s*"([^"]+)"\s*:/g;
  let m;
  while ((m = singleQuoted.exec(inner)) !== null) {
    if (!m[1].startsWith('//')) keys.push(m[1]);
  }
  while ((m = doubleQuoted.exec(inner)) !== null) {
    if (!m[1].startsWith('//')) keys.push(m[1]);
  }
  return keys;
}

// ── Parse existing CITY_BOUNDS entries ──
function getExistingCityBounds(html) {
  const match = html.match(/const CITY_BOUNDS\s*=\s*\{([\s\S]*?)\};/);
  if (!match) return [];
  const block = match[1];
  const keys = [];
  const keyPattern = /['"]([^'"]+)['"]\s*:/g;
  let m;
  while ((m = keyPattern.exec(block)) !== null) keys.push(m[1]);
  return keys;
}

// ── Nominatim geocode a neighbourhood name ──
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function nominatimFetch(query) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'nominatim.openstreetmap.org',
      path: `/search?q=${encodeURIComponent(query)}&format=json&limit=3&addressdetails=1`,
      headers: { 'User-Agent': 'LocalBite-viewer-update/1.0 (localbite project)' }
    };
    https.get(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch(e) { reject(e); }
      });
    }).on('error', reject);
  });
}

async function geocodeNeighbourhood(nb, city, country) {
  const queries = [
    `${nb}, ${city}, ${country}`,
    `${nb} neighbourhood ${city}`,
    `${nb} ${city}`,
  ];
  for (const q of queries) {
    const results = await nominatimFetch(q);
    if (results && results.length > 0) {
      const r = results[0];
      return { lat: parseFloat(r.lat), lng: parseFloat(r.lon), query: q };
    }
    await sleep(1100);
  }
  return null;
}

// ── Insert new centroids into the CENTROIDS block ──
// BUG FIX 2: The original function searched the ENTIRE html string for the
// city comment "// CityName" and for the closing "};". Both patterns also
// appear inside CITY_BOUNDS (city names) and elsewhere, causing centroid
// entries to be written into the wrong objects.
//
// New approach: extract the CENTROIDS block first (using extractCentroidsBlock),
// make all modifications within that isolated string, then substitute the
// modified block back into the full html. The CITY_BOUNDS object is never
// touched because we never run a regex against the full file.
function insertCentroids(html, city, newEntries) {
  const { blockStart, blockEnd, inner } = extractCentroidsBlock(html);

  // Format new entry lines.
  // Use double quotes when the name contains an apostrophe, single quotes otherwise.
  const newLines = newEntries.map(e => {
    const hasApostrophe = e.name.includes("'");
    const q = hasApostrophe ? '"' : "'";
    return `  ${q}${e.name}${q}: [${e.lat.toFixed(4)}, ${e.lng.toFixed(4)}],`;
  }).join('\n');

  const cityComment = `// ${city}`;

  let newInner;

  if (inner.includes(cityComment)) {
    // City section already exists — find the next city comment and insert before it.
    const afterComment = inner.indexOf(cityComment) + cityComment.length;
    const nextComment  = inner.indexOf('\n  //', afterComment);

    if (nextComment === -1) {
      // This is the last city section — append before the final whitespace.
      newInner = inner.trimEnd() + '\n' + newLines + '\n';
    } else {
      newInner = inner.slice(0, nextComment) + '\n' + newLines + inner.slice(nextComment);
    }
    console.log(`  Added ${newEntries.length} centroid(s) to existing ${city} section`);
  } else {
    // No city section yet — append a new section before the end of the block.
    newInner = inner.trimEnd() + `\n\n  ${cityComment}\n` + newLines + '\n';
    console.log(`  Created new ${city} section in CENTROIDS`);
  }

  // Reconstruct: everything before CENTROIDS block + new block + everything after.
  const newBlock = 'const CENTROIDS = {' + newInner + '}';
  const newHtml  = html.slice(0, blockStart) + newBlock + html.slice(blockEnd - 1);
  // Note: blockEnd includes the ';' so we keep it: html.slice(blockEnd - 1) starts at ';'
  return newHtml;
}

// ── Add city to CITY_BOUNDS if missing ──
function insertCityBounds(html, city, cityData) {
  const coords = cityData.restaurants
    .filter(r => r.lat && r.lng)
    .map(r => ({ lat: r.lat, lng: r.lng }));

  let minLat, maxLat, minLng, maxLng;

  if (coords.length > 0) {
    minLat = Math.min(...coords.map(c => c.lat)) - 0.05;
    maxLat = Math.max(...coords.map(c => c.lat)) + 0.05;
    minLng = Math.min(...coords.map(c => c.lng)) - 0.05;
    maxLng = Math.max(...coords.map(c => c.lng)) + 0.05;
  } else {
    console.log(`  WARNING: No geocoded restaurants to derive CITY_BOUNDS from.`);
    console.log(`  Add ${city} to CITY_BOUNDS manually in index.html.`);
    return html;
  }

  const newEntry = `  '${city}':      { minLat: ${minLat.toFixed(2)}, maxLat: ${maxLat.toFixed(2)}, minLng: ${minLng.toFixed(2)},  maxLng: ${maxLng.toFixed(2)}  },`;

  const boundsMatch = html.match(/(const CITY_BOUNDS\s*=\s*\{[\s\S]*?)(\};)/);
  if (!boundsMatch) {
    console.log('  WARNING: Could not find CITY_BOUNDS in index.html — add manually.');
    return html;
  }

  html = html.replace(
    boundsMatch[0],
    boundsMatch[1] + newEntry + '\n' + boundsMatch[2]
  );
  console.log(`  Added ${city} to CITY_BOUNDS: lat ${minLat.toFixed(2)}–${maxLat.toFixed(2)}, lng ${minLng.toFixed(2)}–${maxLng.toFixed(2)}`);
  return html;
}

// ── MAIN ──
async function main() {
  let existingCentroids, existingBounds;
  try {
    existingCentroids = getExistingCentroids(html);
    existingBounds    = getExistingCityBounds(html);
  } catch (e) {
    console.error(`ERROR: ${e.message}`);
    process.exit(1);
  }

  console.log(`Existing CENTROIDS entries: ${existingCentroids.length}`);
  console.log(`Existing CITY_BOUNDS entries: ${existingBounds.length}`);
  console.log();

  // ── Step 1: Find missing neighbourhood centroids ──
  const missing = neighbourhoods.filter(nb => !existingCentroids.includes(nb));

  if (missing.length === 0) {
    console.log('✓ All neighbourhood centroids already present in index.html');
  } else {
    console.log(`Geocoding ${missing.length} missing neighbourhood(s):`);
    const newEntries = [];
    const failed = [];

    for (const nb of missing) {
      process.stdout.write(`  Geocoding "${nb}"... `);
      await sleep(1100);
      const result = await geocodeNeighbourhood(nb, city, country);
      if (result) {
        console.log(`✓ [${result.lat.toFixed(4)}, ${result.lng.toFixed(4)}]`);
        newEntries.push({ name: nb, lat: result.lat, lng: result.lng });
      } else {
        console.log(`✗ Not found`);
        failed.push(nb);
      }
    }

    if (newEntries.length > 0) {
      html = insertCentroids(html, city, newEntries);
      console.log(`\n✓ Added ${newEntries.length} centroids to index.html`);
    }

    if (failed.length > 0) {
      console.log(`\n⚠ ${failed.length} neighbourhood(s) could not be geocoded — add manually:`);
      failed.forEach(nb => console.log(`  '${nb}': [lat, lng],`));
    }
  }

  // ── Step 2: Check CITY_BOUNDS ──
  console.log();
  if (existingBounds.includes(city)) {
    console.log(`✓ ${city} already present in CITY_BOUNDS`);
  } else {
    console.log(`Adding ${city} to CITY_BOUNDS...`);
    html = insertCityBounds(html, city, cityData);
  }

  // ── Step 3: Write updated index.html ──
  fs.writeFileSync(indexPath, html);
  console.log('\n✓ index.html saved.');
  console.log('\nNext: git add index.html and commit.');
}

main().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
