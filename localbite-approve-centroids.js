#!/usr/bin/env node
// LocalBite Centroid Approval Script v1.0
//
// Reads centroids_proposed from a city JSON (written by localbite-postrun.js),
// presents each entry for human approval, and writes approved entries to the
// `centroids` field in the city JSON.
//
// After running, centroids_proposed is removed from the JSON.
//
// Usage: node localbite-approve-centroids.js <city-json-file>
// Example: node localbite-approve-centroids.js localbite-zaragoza-2023-2026.json

'use strict';

const fs       = require('fs');
const readline = require('readline');

const file = process.argv[2];

if (!file) {
  console.error('Usage: node localbite-approve-centroids.js <city-json-file>');
  process.exit(1);
}

// ── LOAD CITY JSON ───────────────────────────────────────────────────────────

let data;
try {
  const raw = fs.readFileSync(file, 'utf8');
  data = JSON.parse(raw);
} catch (e) {
  console.error(`Error reading ${file}: ${e.message}`);
  process.exit(1);
}

// Safety check — verify essential fields are present
const requiredFields = ['city', 'restaurants', 'sources'];
for (const f of requiredFields) {
  if (!(f in data)) {
    console.error(`ERROR: ${file} is missing required field "${f}". Aborting to avoid data corruption.`);
    process.exit(1);
  }
}

if (!data.centroids_proposed || Object.keys(data.centroids_proposed).length === 0) {
  console.log(`No centroids_proposed found in ${file}.`);
  console.log(`Run localbite-postrun.js first to calculate proposed centroids.`);
  process.exit(0);
}

const city     = data.city;
const proposed = data.centroids_proposed;
const entries  = Object.entries(proposed);

// ── APPROVAL LOOP ────────────────────────────────────────────────────────────

const rl = readline.createInterface({
  input:  process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise(resolve => rl.question(question, resolve));
}

function formatCoords(coords) {
  if (!coords) return 'NONE (manual entry required)';
  return `[${coords[0]}, ${coords[1]}]`;
}

(async () => {
  console.log(`\nLocalBite Centroid Approval`);
  console.log(`══════════════════════════════════════════════`);
  console.log(`City: ${city}`);
  console.log(`File: ${file}`);
  console.log(`Proposed centroids: ${entries.length}`);
  console.log(`══════════════════════════════════════════════`);
  console.log('');
  console.log(`For each proposed centroid:`);
  console.log(`  y — accept as proposed`);
  console.log(`  n — skip (restaurant(s) will use CITY_CENTRES random offset)`);
  console.log(`  m — enter coordinates manually`);
  console.log('');

  const approved = data.centroids || {};
  const skipped  = [];
  let   i        = 1;

  for (const [nb, entry] of entries) {
    console.log(`─────────────────────────────────────────────`);
    console.log(`${i}/${entries.length}  ${nb}`);
    console.log(`  Proposed: ${formatCoords(entry.coords)}`);
    console.log(`  Source:   ${entry.source}`);

    if (entry.source === 'averaged') {
      console.log(`  Averaged from: ${entry.restaurant_count} geocoded restaurant(s)`);
      if (entry.high_spread) {
        console.log(`  ⚠ HIGH SPREAD — lat ${entry.lat_spread}, lng ${entry.lng_spread}`);
        console.log(`    Centroid may be inaccurate. Verify in Google Maps before accepting.`);
        console.log(`    https://www.google.com/maps/search/?api=1&query=${entry.coords[0]},${entry.coords[1]}`);
      }
    }

    if (entry.source === 'nominatim') {
      console.log(`  ⚠ NOMINATIM — requires verification`);
      console.log(`  Query: "${entry.nominatim_query}"`);
      console.log(`  Result: ${entry.nominatim_display}`);
      if (entry.coords) {
        console.log(`  Verify: https://www.google.com/maps/search/?api=1&query=${entry.coords[0]},${entry.coords[1]}`);
      }
    }

    if (entry.source === 'none') {
      console.log(`  ⚠ NO RESULT — Nominatim returned nothing. Manual entry required.`);
    }

    console.log(`  Null-coord restaurants: ${entry.null_coord_restaurants.join(', ')}`);
    console.log('');

    let answer;

    if (entry.coords === null) {
      answer = await ask(`  Enter coords manually or skip? (m/n): `);
      answer = answer.trim().toLowerCase() || 'n';
      if (answer !== 'm') answer = 'n';
    } else {
      answer = await ask(`  Accept? (y/n/m): `);
      answer = answer.trim().toLowerCase() || 'y';
    }

    if (answer === 'y') {
      approved[nb] = entry.coords;
      console.log(`  ✓ Accepted: ${formatCoords(entry.coords)}\n`);
    } else if (answer === 'm') {
      const latStr = await ask(`  Enter latitude:  `);
      const lngStr = await ask(`  Enter longitude: `);
      const lat = parseFloat(latStr.trim());
      const lng = parseFloat(lngStr.trim());
      if (isNaN(lat) || isNaN(lng)) {
        console.log(`  Invalid coordinates — skipping.\n`);
        skipped.push(nb);
      } else {
        approved[nb] = [lat, lng];
        console.log(`  ✓ Manually set: [${lat}, ${lng}]\n`);
      }
    } else {
      skipped.push(nb);
      console.log(`  — Skipped.\n`);
    }

    i++;
  }

  rl.close();

  // ── WRITE RESULTS ──────────────────────────────────────────────────────────

  console.log(`─────────────────────────────────────────────`);
  console.log(`Summary:`);
  const newlyApproved = Object.keys(approved).length - Object.keys(data.centroids || {}).length;
  console.log(`  Approved: ${newlyApproved} new centroid(s)`);
  console.log(`  Skipped:  ${skipped.length}`);

  if (skipped.length > 0) {
    console.log(`  Skipped neighbourhoods (will use random CITY_CENTRES offset):`);
    skipped.forEach(nb => console.log(`    • ${nb}`));
  }

  // Write approved centroids and remove centroids_proposed
  data.centroids = approved;
  delete data.centroids_proposed;

  // Safety: verify JSON still parses correctly before writing
  let verified;
  try {
    verified = JSON.parse(JSON.stringify(data));
    if (!verified.city || !verified.restaurants || !verified.sources) {
      throw new Error('Required fields missing after modification');
    }
  } catch (e) {
    console.error(`\nERROR: JSON validation failed — ${e.message}`);
    console.error('File NOT written. No changes made.');
    process.exit(1);
  }

  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
  console.log(`\n✓ Written to ${file}`);
  console.log(`  centroids: ${Object.keys(approved).length} entries`);
  console.log(`  centroids_proposed: removed`);

  console.log('');
  console.log(`Next steps:`);
  console.log(`  1. Verify CITY_CENTRES entry exists for ${city} in index.html`);
  console.log(`  2. Verify CITY_BOUNDS entry exists for ${city} in index.html`);
  console.log(`  3. Commit: git add ${file}`);
  console.log('');

})();
