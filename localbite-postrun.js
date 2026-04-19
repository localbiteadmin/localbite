#!/usr/bin/env node
// LocalBite Post-Pipeline Script v1.0
//
// Runs after every pipeline completion. Handles:
//   1. Geocoding (calls localbite-geocode.js)
//   2. CENTROIDS check — identifies neighbourhoods missing from index.html
//      and proposes coordinates derived from geocoded restaurant data
//   3. localbite-index.json update — adds the new city entry
//
// Usage: node localbite-postrun.js <city-json-file>
// Example: node localbite-postrun.js localbite-bilbao-2023-2026.json
//
// The script does NOT commit anything. All changes require human review
// before committing. CENTROIDS proposals require explicit human confirmation.

'use strict';

const fs   = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const file = process.argv[2];

if (!file) {
  console.error('Usage: node localbite-postrun.js <city-json-file>');
  process.exit(1);
}

// ── LOAD CITY PACK ──
let data;
try {
  data = JSON.parse(fs.readFileSync(file, 'utf8'));
} catch (e) {
  console.error(`Error reading ${file}: ${e.message}`);
  process.exit(1);
}

if (!data.restaurants || !Array.isArray(data.restaurants)) {
  console.error(`Error: ${file} does not contain a valid "restaurants" array.`);
  process.exit(1);
}

const city      = data.city;
const country   = data.country;
const citySlug  = data.city_slug;
const yearRange = data.source_recency || 'unknown';
const pipeline  = data.pipeline || 'localbite-v7.1';

console.log(`\nLocalBite Post-Pipeline Script v1.0`);
console.log(`══════════════════════════════════════════════`);
console.log(`City:     ${city}, ${country}`);
console.log(`File:     ${file}`);
console.log(`Pipeline: ${pipeline}`);
console.log(`══════════════════════════════════════════════\n`);

// ══════════════════════════════════════════════
// STEP 1 — GEOCODING
// ══════════════════════════════════════════════

console.log(`STEP 1 — Geocoding`);
console.log(`──────────────────────────────────────────────`);

const geocodeScript = path.join(__dirname, 'localbite-geocode.js');
if (!fs.existsSync(geocodeScript)) {
  console.error(`ERROR: localbite-geocode.js not found in ${__dirname}`);
  console.error('Geocoding skipped — run manually: node localbite-geocode.js ' + file);
} else {
  try {
    console.log(`Running: node localbite-geocode.js ${file}\n`);
    execSync(`node "${geocodeScript}" "${file}"`, { stdio: 'inherit' });
  } catch (e) {
    console.error(`\nGeocoding script exited with error. Check output above.`);
    console.error(`If the city is missing from CITY_BOXES, add it to localbite-geocode.js first.`);
    process.exit(1);
  }
}

// Re-read file after geocoding — coordinates have been written
try {
  data = JSON.parse(fs.readFileSync(file, 'utf8'));
} catch (e) {
  console.error(`Error re-reading ${file} after geocoding: ${e.message}`);
  process.exit(1);
}

// ══════════════════════════════════════════════
// STEP 2 — CENTROIDS CHECK
// ══════════════════════════════════════════════

console.log(`\nSTEP 2 — CENTROIDS check`);
console.log(`──────────────────────────────────────────────`);

// Read index.html and extract existing CENTROIDS keys
const indexPath = path.join(__dirname, 'index.html');
let indexHtml = '';
try {
  indexHtml = fs.readFileSync(indexPath, 'utf8');
} catch (e) {
  console.error(`WARNING: Could not read index.html — ${e.message}`);
  console.error('CENTROIDS check skipped.');
  indexHtml = '';
}

// Extract registered CENTROIDS keys from index.html
const registeredCentroids = new Set();
if (indexHtml) {
  const centroidsMatch = indexHtml.match(/const CENTROIDS\s*=\s*\{([\s\S]*?)\};/);
  if (centroidsMatch) {
    const centroidsBlock = centroidsMatch[1];
    const keyRegex = /'([^']+)'\s*:/g;
    let m;
    while ((m = keyRegex.exec(centroidsBlock)) !== null) {
      registeredCentroids.add(m[1]);
    }
  }
}

// Find neighbourhoods used by null-coordinate restaurants
const nullCoordRestaurants = data.restaurants.filter(
  r => !r.lat || r.lat === null
);

// Group null-coordinate restaurants by neighbourhood
const nbGroups = {};
for (const r of nullCoordRestaurants) {
  const nb = r.neighbourhood;
  if (!nb) continue;
  if (!nbGroups[nb]) nbGroups[nb] = [];
  nbGroups[nb].push(r);
}

// Also collect all neighbourhoods used in the pack
const allNeighbourhoods = new Set(
  data.restaurants
    .map(r => r.neighbourhood)
    .filter(Boolean)
);

// Check which are missing from CENTROIDS
const missingCentroids = [];
for (const nb of Object.keys(nbGroups)) {
  if (!registeredCentroids.has(nb)) {
    missingCentroids.push(nb);
  }
}

if (missingCentroids.length === 0) {
  console.log(`✓ All neighbourhoods with null-coordinate restaurants are registered in CENTROIDS.`);
  console.log(`  No action needed.`);
} else {
  console.log(`⚠  ${missingCentroids.length} neighbourhood(s) are missing from CENTROIDS in index.html:`);
  console.log(`   These restaurants will display at random incorrect locations until registered.\n`);

  // Propose centroids derived from geocoded restaurant coordinates
  // for each missing neighbourhood (using restaurants WITH coordinates
  // in the same neighbourhood as the source of the average)
  console.log(`PROPOSED CENTROIDS — add to CENTROIDS object in index.html:`);
  console.log(`(Coordinates are averaged from geocoded restaurants in each neighbourhood.`);
  console.log(` Verify before committing — high spread = less accurate centroid.)\n`);

  for (const nb of missingCentroids) {
    // Find all geocoded restaurants in this neighbourhood for averaging
    const geocodedInNb = data.restaurants.filter(
      r => r.neighbourhood === nb && r.lat && r.lng
    );

    if (geocodedInNb.length === 0) {
      // No geocoded restaurants in this neighbourhood — cannot propose
      console.log(`  '${nb}': [UNKNOWN — no geocoded restaurants in this neighbourhood]`);
      console.log(`  → Manual coordinate lookup required for this neighbourhood.\n`);
      continue;
    }

    const avgLat = geocodedInNb.reduce((s, r) => s + r.lat, 0) / geocodedInNb.length;
    const avgLng = geocodedInNb.reduce((s, r) => s + r.lng, 0) / geocodedInNb.length;

    // Spread check — warn if high variance (centroid may be inaccurate)
    const latSpread = Math.max(...geocodedInNb.map(r => r.lat)) -
                      Math.min(...geocodedInNb.map(r => r.lat));
    const lngSpread = Math.max(...geocodedInNb.map(r => r.lng)) -
                      Math.min(...geocodedInNb.map(r => r.lng));
    const highSpread = latSpread > 0.005 || lngSpread > 0.005;

    console.log(`  '${nb}': [${avgLat.toFixed(4)}, ${avgLng.toFixed(4)}],`);
    console.log(`  // Averaged from ${geocodedInNb.length} geocoded restaurant(s) in this neighbourhood`);
    if (highSpread) {
      console.log(`  // ⚠ HIGH SPREAD (lat ${latSpread.toFixed(4)}, lng ${lngSpread.toFixed(4)}) — verify manually`);
    }
    console.log(`  // Null-coordinate restaurants using this centroid: ${nbGroups[nb].map(r => r.name).join(', ')}`);
    console.log('');
  }

  console.log(`Action required:`);
  console.log(`  Add the proposed entries to the CENTROIDS object in index.html.`);
  console.log(`  Verify coordinates in Google Maps before committing.`);
  console.log(`  Look for "// Bilbao" (or your city) comment block in the CENTROIDS section.`);
}

// ══════════════════════════════════════════════
// STEP 3 — localbite-index.json UPDATE
// ══════════════════════════════════════════════

console.log(`\nSTEP 3 — localbite-index.json update`);
console.log(`──────────────────────────────────────────────`);

const indexJsonPath = path.join(__dirname, 'localbite-index.json');
let indexJson;
try {
  indexJson = JSON.parse(fs.readFileSync(indexJsonPath, 'utf8'));
} catch (e) {
  console.error(`ERROR: Could not read localbite-index.json — ${e.message}`);
  console.error('index.json update skipped.');
  indexJson = null;
}

if (indexJson) {
  // Check if city already exists in index
  const existingIdx = indexJson.cities.findIndex(
    c => c.city_slug === citySlug || c.file === file
  );

  const restaurantCount  = data.restaurants.length;
  const bothPoolCount    = data.restaurants.filter(r => r.language_pool === 'both').length;
  const sourceCount      = data.sources ? data.sources.length : 0;
  const openStatusCount  = data.restaurants.filter(r => r.open_status_check).length;
  const today            = new Date().toISOString().split('T')[0];

  const newEntry = {
    city:             city,
    country:          country,
    city_slug:        citySlug,
    pipeline:         pipeline,
    built:            today,
    restaurant_count: restaurantCount,
    both_pool_count:  bothPoolCount,
    source_count:     sourceCount,
    file:             file,
    status:           'complete',
    open_status_check_count: openStatusCount,
    notes:            ''
  };

  if (existingIdx >= 0) {
    console.log(`City already exists in localbite-index.json (entry ${existingIdx + 1}).`);
    console.log(`Updating existing entry...`);
    indexJson.cities[existingIdx] = newEntry;
  } else {
    console.log(`Adding new city entry to localbite-index.json...`);
    indexJson.cities.push(newEntry);
  }

  indexJson.last_updated = today;
  fs.writeFileSync(indexJsonPath, JSON.stringify(indexJson, null, 2));
  console.log(`✓ localbite-index.json updated. Total cities: ${indexJson.cities.length}`);
  console.log(`\nNew entry:`);
  console.log(JSON.stringify(newEntry, null, 2));
}

// ══════════════════════════════════════════════
// SUMMARY
// ══════════════════════════════════════════════

console.log(`\n══════════════════════════════════════════════`);
console.log(`POST-PIPELINE COMPLETE`);
console.log(`══════════════════════════════════════════════`);
console.log(`City:              ${city}, ${country}`);
console.log(`Restaurants:       ${data.restaurants.length}`);
console.log(`Both-pool:         ${data.restaurants.filter(r => r.language_pool === 'both').length}`);
console.log(`Sources:           ${data.sources ? data.sources.length : 'unknown'}`);
console.log(`Open status check: ${data.restaurants.filter(r => r.open_status_check).length}`);
console.log(``);

if (missingCentroids.length > 0) {
  console.log(`⚠  ACTION REQUIRED before committing:`);
  console.log(`   Add ${missingCentroids.length} missing CENTROIDS to index.html (see Step 2 above).`);
  console.log(`   Verify proposed coordinates in Google Maps before adding.`);
} else {
  console.log(`✓  No CENTROIDS action required.`);
}

console.log(``);
console.log(`Next steps:`);
console.log(`  1. Review CENTROIDS proposals above (if any) and update index.html`);
console.log(`  2. Review medium-confidence geocoding matches from Step 1`);
console.log(`  3. Commit: git add ${file} localbite-index.html localbite-index.json`);
console.log(`     git commit -m "data: ${city} v7.1 city pack — ${data.restaurants.length} restaurants, ${data.sources ? data.sources.length : '?'} sources"`);
console.log(``);
