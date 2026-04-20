#!/usr/bin/env node
// LocalBite Post-Pipeline Script v2.0
//
// Changes from v1.0:
//   - CENTROIDS check now writes centroids_proposed to the city JSON
//     instead of printing entries to paste into index.html manually
//   - Nominatim fallback for neighbourhoods with zero geocoded restaurants
//   - Fixed sources.length bug (sources is an object, not an array)
//   - Reminder to run localbite-approve-centroids.js after this script
//
// Usage: node localbite-postrun.js <city-json-file>
// Example: node localbite-postrun.js localbite-bilbao-2023-2026.json

'use strict';

const fs             = require('fs');
const path           = require('path');
const https          = require('https');
const { execSync }   = require('child_process');

const file = process.argv[2];

if (!file) {
  console.error('Usage: node localbite-postrun.js <city-json-file>');
  process.exit(1);
}

// ── HELPERS ──────────────────────────────────────────────────────────────────

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

// Query Nominatim for a place name. Returns {lat, lng, display_name} or null.
// Nominatim ToS: max 1 request/second, User-Agent required.
function nominatimGeocode(query) {
  return new Promise((resolve) => {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`;
    const options = {
      headers: {
        'User-Agent': 'LocalBite/2.0 (https://github.com/localbiteadmin/localbite)'
      }
    };
    https.get(url, options, (res) => {
      let raw = '';
      res.on('data', chunk => raw += chunk);
      res.on('end', () => {
        try {
          const results = JSON.parse(raw);
          if (results && results.length > 0) {
            resolve({
              lat: parseFloat(results[0].lat),
              lng: parseFloat(results[0].lon),
              display_name: results[0].display_name
            });
          } else {
            resolve(null);
          }
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

// ── MAIN (async) ──────────────────────────────────────────────────────────────

(async () => {

  // ── LOAD CITY PACK ──────────────────────────────────────────────────────────

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
  const pipeline  = data.pipeline || 'localbite-v7.1';

  // Fix: sources is an object keyed by ID, not an array
  const sourceCount = data.sources
    ? (Array.isArray(data.sources)
        ? data.sources.length
        : Object.keys(data.sources).length)
    : 0;

  console.log(`\nLocalBite Post-Pipeline Script v2.0`);
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
  // STEP 2 — CENTROIDS CALCULATION
  // ══════════════════════════════════════════════

  console.log(`\nSTEP 2 — Centroids calculation`);
  console.log(`──────────────────────────────────────────────`);
  console.log(`Calculating centroids for null-coordinate restaurants...`);
  console.log(`Results will be written to centroids_proposed in ${file}.\n`);

  // Find null-coordinate restaurants grouped by neighbourhood
  const nullCoordRestaurants = data.restaurants.filter(r => !r.lat || r.lat === null);
  const nbGroups = {};
  for (const r of nullCoordRestaurants) {
    const nb = r.neighbourhood;
    if (!nb) continue;
    if (!nbGroups[nb]) nbGroups[nb] = [];
    nbGroups[nb].push(r);
  }

  const missingNbs = Object.keys(nbGroups);

  if (missingNbs.length === 0) {
    console.log(`✓ All restaurants have coordinates. No centroids needed.`);
    data.centroids_proposed = {};
  } else {
    console.log(`Found ${missingNbs.length} neighbourhood(s) needing centroids:`);
    missingNbs.forEach(nb => console.log(`  • ${nb} (${nbGroups[nb].length} restaurant(s))`));
    console.log('');

    const proposed = {};

    for (const nb of missingNbs) {
      const nullRests = nbGroups[nb];
      const nullNames = nullRests.map(r => r.name);

      // Find geocoded restaurants in the same neighbourhood for averaging
      const geocodedInNb = data.restaurants.filter(
        r => r.neighbourhood === nb && r.lat && r.lng
      );

      if (geocodedInNb.length > 0) {
        // AVERAGED source
        const avgLat = geocodedInNb.reduce((s, r) => s + r.lat, 0) / geocodedInNb.length;
        const avgLng = geocodedInNb.reduce((s, r) => s + r.lng, 0) / geocodedInNb.length;

        const latSpread = Math.max(...geocodedInNb.map(r => r.lat)) -
                          Math.min(...geocodedInNb.map(r => r.lat));
        const lngSpread = Math.max(...geocodedInNb.map(r => r.lng)) -
                          Math.min(...geocodedInNb.map(r => r.lng));
        const highSpread = latSpread > 0.005 || lngSpread > 0.005;

        proposed[nb] = {
          coords: [parseFloat(avgLat.toFixed(4)), parseFloat(avgLng.toFixed(4))],
          source: 'averaged',
          restaurant_count: geocodedInNb.length,
          high_spread: highSpread,
          lat_spread: parseFloat(latSpread.toFixed(4)),
          lng_spread: parseFloat(lngSpread.toFixed(4)),
          requires_verification: highSpread,
          null_coord_restaurants: nullNames
        };

        const flag = highSpread ? ' ⚠ HIGH SPREAD' : '';
        console.log(`  ${nb}: [${avgLat.toFixed(4)}, ${avgLng.toFixed(4)}] — averaged from ${geocodedInNb.length} restaurant(s)${flag}`);

      } else {
        // NOMINATIM fallback
        console.log(`  ${nb}: no geocoded restaurants — querying Nominatim...`);
        await sleep(1100);
        const query = `${nb}, ${city}, ${country}`;
        const result = await nominatimGeocode(query);

        if (result) {
          console.log(`  ${nb}: [${result.lat.toFixed(4)}, ${result.lng.toFixed(4)}] — Nominatim ⚠ verify`);
          proposed[nb] = {
            coords: [parseFloat(result.lat.toFixed(4)), parseFloat(result.lng.toFixed(4))],
            source: 'nominatim',
            nominatim_query: query,
            nominatim_display: result.display_name,
            requires_verification: true,
            null_coord_restaurants: nullNames
          };
        } else {
          console.log(`  ${nb}: Nominatim returned no result — manual assignment required`);
          proposed[nb] = {
            coords: null,
            source: 'none',
            requires_verification: true,
            null_coord_restaurants: nullNames
          };
        }
      }
    }

    data.centroids_proposed = proposed;
    console.log('');
  }

  // Write centroids_proposed to city JSON
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
  console.log(`✓ centroids_proposed written to ${file}`);

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
    const existingIdx = indexJson.cities.findIndex(
      c => c.city_slug === citySlug || c.file === file
    );

    const restaurantCount = data.restaurants.length;
    const bothPoolCount   = data.restaurants.filter(r =>
      r.language_pool === 'both' || r.language_pool === 'both-pool'
    ).length;
    const openStatusCount = data.restaurants.filter(r => r.open_status_check).length;
    const today           = new Date().toISOString().split('T')[0];

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
  }

  // ══════════════════════════════════════════════
  // SUMMARY
  // ══════════════════════════════════════════════

  const missingCount = Object.keys(data.centroids_proposed || {}).length;
  const needsManual  = Object.values(data.centroids_proposed || {}).some(e => e.coords === null);

  console.log(`\n══════════════════════════════════════════════`);
  console.log(`POST-PIPELINE COMPLETE`);
  console.log(`══════════════════════════════════════════════`);
  console.log(`City:              ${city}, ${country}`);
  console.log(`Restaurants:       ${data.restaurants.length}`);
  console.log(`Both-pool:         ${data.restaurants.filter(r => r.language_pool === 'both' || r.language_pool === 'both-pool').length}`);
  console.log(`Sources:           ${sourceCount}`);
  console.log(`Open status check: ${data.restaurants.filter(r => r.open_status_check).length}`);
  console.log('');

  if (missingCount > 0) {
    console.log(`⚠  ACTION REQUIRED before committing:`);
    console.log(`   Run: node localbite-approve-centroids.js ${file}`);
    if (needsManual) {
      console.log(`   One or more centroids need manual coordinate entry (Nominatim returned no result).`);
    }
    console.log('');
    console.log(`   Do NOT commit ${file} until approve-centroids has been run.`);
  } else {
    console.log(`✓  No centroids action required.`);
  }

  console.log('');
  console.log(`Next steps:`);
  if (missingCount > 0) {
    console.log(`  1. node localbite-approve-centroids.js ${file}`);
    console.log(`  2. Verify CITY_CENTRES entry exists for ${city} in index.html`);
    console.log(`  3. Verify CITY_BOUNDS entry exists for ${city} in index.html`);
    console.log(`  4. git add ${file} localbite-index.json`);
  } else {
    console.log(`  1. Verify CITY_CENTRES entry exists for ${city} in index.html`);
    console.log(`  2. Verify CITY_BOUNDS entry exists for ${city} in index.html`);
    console.log(`  3. git add ${file} localbite-index.json`);
  }
  console.log('');

})();
