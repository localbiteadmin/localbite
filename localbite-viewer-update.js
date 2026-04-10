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

// ── Parse existing CENTROIDS entries ──
// Returns neighbourhood keys already present for this specific city
function getExistingCentroids(html, city) {
  const safeCity = city.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // Match 'CityName': { ... }, — handles both quote styles
  const cityPattern = new RegExp(
    "['\"]" + safeCity + "['\"]\\s*:\\s*\\{([\\s\\S]*?)\\},"
  );
  const match = html.match(cityPattern);
  if (!match) return []; // City not yet in CENTROIDS — fine
  const block = match[1];
  const keys = [];
  // Handle both: 'Key' and "Key with apostrophe's"
  const keyPattern = /(?:'([^']+)'|"([^"]+)")\s*:/g;
  let m;
  while ((m = keyPattern.exec(block)) !== null) {
    const key = m[1] !== undefined ? m[1] : m[2];
    if (key && !key.startsWith('//')) keys.push(key);
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
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=3&addressdetails=1`;
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
  // Try specific query first, then broader
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
    await sleep(1100); // Nominatim rate limit: 1 req/sec
  }
  return null;
}

// ── Insert new centroids into the CENTROIDS block ──
// Nested structure: CENTROIDS = { 'City': { 'nb': [lat, lng] } }
function insertCentroids(html, city, newEntries) {
  const safeCity = city.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const cityBlockRx = new RegExp(
    "(['\"]" + safeCity + "['\"]\\s*:\\s*\\{)([\\s\\S]*?)(\\},)"
  );
  const entryLines = newEntries.map(e => {
    // Use double quotes when name contains apostrophe, single quotes otherwise
    const q = e.name.includes("'") ? '"' : "'";
    return '    ' + q + e.name + q + ': [' + e.lat.toFixed(4) + ', ' + e.lng.toFixed(4) + '],';
  }).join('\n');

  if (cityBlockRx.test(html)) {
    // Append inside existing city block
    html = html.replace(cityBlockRx, '$1$2' + entryLines + '\n  $3');
    console.log('  Added ' + newEntries.length + ' centroid(s) to existing ' + city + ' block');
  } else {
    // Create new city block before the closing }; of CENTROIDS
    const centroidsEnd = html.indexOf('\n};', html.indexOf('const CENTROIDS'));
    if (centroidsEnd === -1) throw new Error('Cannot find end of CENTROIDS block');
    const block = "\n  '" + city + "': {\n" + entryLines + '\n  },';
    html = html.slice(0, centroidsEnd) + block + html.slice(centroidsEnd);
    console.log('  Created new city block for ' + city + ' in CENTROIDS');
  }
  return html;
}


async function main() {
  let existingCentroids, existingBounds;
  try {
    existingCentroids = getExistingCentroids(html, city);
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
      await sleep(1100); // rate limit
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
