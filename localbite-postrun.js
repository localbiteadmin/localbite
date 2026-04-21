#!/usr/bin/env node
// LocalBite Post-Pipeline Script v3.0
//
// Changes from v2.0:
//   - Step 1.5 (new): Schema validation — checks required field names
//     on sources and restaurants before proceeding. Exits with clear
//     error if fields are wrong. Catches compaction-induced schema drift.
//   - Step 2b (new): Writer profile enrichment — detects thin or
//     placeholder writer_profiles and generates proper 2-3 sentence
//     profiles via the Anthropic API. Requires ANTHROPIC_API_KEY env var.
//     Skips gracefully if API key not set or if profiles are already good.
//
// Usage: node localbite-postrun.js <city-json-file>

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

function nominatimGeocode(query) {
  return new Promise((resolve) => {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`;
    const options = {
      headers: { 'User-Agent': 'LocalBite/3.0 (https://github.com/localbiteadmin/localbite)' }
    };
    https.get(url, options, (res) => {
      let raw = '';
      res.on('data', chunk => raw += chunk);
      res.on('end', () => {
        try {
          const results = JSON.parse(raw);
          if (results && results.length > 0) {
            resolve({ lat: parseFloat(results[0].lat), lng: parseFloat(results[0].lon), display_name: results[0].display_name });
          } else { resolve(null); }
        } catch (e) { resolve(null); }
      });
    }).on('error', () => resolve(null));
  });
}

function generateWriterProfile(writer, publication, articleTitle, articleDate, language) {
  return new Promise((resolve) => {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) { resolve(null); return; }

    const prompt = `Write a user-facing profile for a food writer in the LocalBite restaurant discovery app.

CRITICAL: You MUST write the profile in ENGLISH. This is non-negotiable regardless of the source language. Even if the publication is Spanish, French, or any other language, the profile must be in English.

Writer: ${writer}
Publication: ${publication}
Article: "${articleTitle}" (${articleDate})
Source language: ${language}

STRICT RULES:
- Write exactly 2-3 sentences. No more.
- Only state facts derivable from the fields above. Do not invent years of experience, network size, or any biographical detail not given.
- Cover: who this writer is and what the publication covers.
- Do not start with the writer name as the first word.
- No pipeline notes, no operational data.
- Output MUST be in ENGLISH.

Respond with only the profile text — no preamble, no quotes, no labels.`;

    const body = JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 200,
      messages: [{ role: 'user', content: prompt }]
    });

    const options = {
      hostname: 'api.anthropic.com',
      path: '/v1/messages',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'Content-Length': Buffer.byteLength(body)
      }
    };

    const req = https.request(options, (res) => {
      let raw = '';
      res.on('data', chunk => raw += chunk);
      res.on('end', () => {
        try {
          const data = JSON.parse(raw);
          const text = data.content && data.content[0] && data.content[0].text;
          resolve(text ? text.trim() : null);
        } catch (e) { resolve(null); }
      });
    });
    req.on('error', () => resolve(null));
    req.write(body);
    req.end();
  });
}

function isThinProfile(profile) {
  if (!profile) return true;
  if (profile.length < 80) return true;
  if (/^.{3,40} writes for .{3,60}\.$/.test(profile.trim())) return true;
  return false;
}

// ── MAIN ─────────────────────────────────────────────────────────────────────

(async () => {

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

  const city     = data.city;
  const country  = data.country;
  const citySlug = data.city_slug;
  const pipeline = data.pipeline || 'localbite-v7.1';
  const sourceCount = data.sources
    ? (Array.isArray(data.sources) ? data.sources.length : Object.keys(data.sources).length)
    : 0;

  console.log(`\nLocalBite Post-Pipeline Script v3.0`);
  console.log(`══════════════════════════════════════════════`);
  console.log(`City:     ${city}, ${country}`);
  console.log(`File:     ${file}`);
  console.log(`Pipeline: ${pipeline}`);
  console.log(`══════════════════════════════════════════════\n`);

  // ══ STEP 1 — GEOCODING ═══════════════════════════════════════════════════════

  console.log(`STEP 1 — Geocoding`);
  console.log(`──────────────────────────────────────────────`);

  const geocodeScript = path.join(__dirname, 'localbite-geocode.js');
  if (!fs.existsSync(geocodeScript)) {
    console.error(`ERROR: localbite-geocode.js not found.`);
    process.exit(1);
  }

  try {
    console.log(`Running: node localbite-geocode.js ${file}\n`);
    execSync(`node "${geocodeScript}" "${file}"`, { stdio: 'inherit' });
  } catch (e) {
    console.error(`\nGeocoding script exited with error.`);
    process.exit(1);
  }

  try {
    data = JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (e) {
    console.error(`Error re-reading ${file} after geocoding: ${e.message}`);
    process.exit(1);
  }

  // ══ STEP 1.5 — SCHEMA VALIDATION ═════════════════════════════════════════════

  console.log(`\nSTEP 1.5 — Schema validation`);
  console.log(`──────────────────────────────────────────────`);

  const REQUIRED_SOURCE_FIELDS    = ['writer', 'publication', 'article_url', 'commercial_conflict', 'writer_profile'];
  const REQUIRED_RESTAURANT_FIELDS = ['name', 'language_pool', 'quote', 'sources'];

  const errors = [];
  const sourcesArray = Array.isArray(data.sources) ? data.sources : Object.values(data.sources || {});

  for (const [i, src] of sourcesArray.entries()) {
    const label = src.writer || src.author_name || src.id || `#${i}`;
    for (const field of REQUIRED_SOURCE_FIELDS) {
      if (!(field in src)) errors.push(`Source "${label}": missing field "${field}"`);
    }
    if ('author_name' in src && !('writer' in src))
      errors.push(`Source "${label}": uses "author_name" — must be "writer"`);
    if ('publisher' in src && !('publication' in src))
      errors.push(`Source "${label}": uses "publisher" — must be "publication"`);
  }

  for (const [i, r] of data.restaurants.entries()) {
    for (const field of REQUIRED_RESTAURANT_FIELDS) {
      if (!(field in r) || r[field] === undefined)
        errors.push(`Restaurant "${r.name || `#${i}`}": missing field "${field}"`);
    }
  }

  if (errors.length > 0) {
    console.log(`\n✗ SCHEMA VALIDATION FAILED — ${errors.length} error(s):\n`);
    errors.forEach(e => console.log(`  ✗ ${e}`));
    console.log(`\nCommon cause: context compaction caused field name drift.`);
    console.log(`See FIELD NAME CONTRACT in the v7.1 template.`);
    console.log(`\nDo NOT commit ${file} until schema errors are resolved.\n`);
    process.exit(1);
  }

  console.log(`✓ Schema validation passed — all required fields present.`);

  // ══ STEP 1.6 — source_recency validation ════════════════════════════════════
  // Compaction sometimes causes the pipeline to write the most recent article
  // date (e.g. "2025-11-29") instead of the YEAR_RANGE (e.g. "2023-2026").
  // Detect and auto-correct from the filename before anything else runs.
  {
    const recency = data.source_recency || '';
    const isDateString = /^\d{4}-\d{2}-\d{2}$/.test(recency);
    const isYearRange  = /^\d{4}-\d{4}$/.test(recency);
    if (isDateString || (!isYearRange && recency !== '')) {
      // Extract year range from filename: localbite-city-YYYY-YYYY.json
      const rangeMatch = path.basename(file).match(/(\d{4}-\d{4})\.json$/);
      if (rangeMatch) {
        const corrected = rangeMatch[1];
        console.log(`\n⚠ source_recency "${recency}" looks like a date string — correcting to "${corrected}"`);
        data.source_recency = corrected;
        fs.writeFileSync(file, JSON.stringify(data, null, 2));
        console.log(`✓ source_recency corrected and written.`);
      } else {
        console.log(`\n⚠ source_recency "${recency}" looks wrong but could not derive year range from filename.`);
        console.log(`  Expected filename pattern: localbite-[city]-YYYY-YYYY.json`);
        console.log(`  Fix manually: data.source_recency should be the YEAR_RANGE from Part 1.`);
      }
    } else {
      console.log(`✓ source_recency "${recency}" — correct format.`);
    }
  }

  // ══ STEP 2 — CENTROIDS CALCULATION ═══════════════════════════════════════════

  console.log(`\nSTEP 2 — Centroids calculation`);
  console.log(`──────────────────────────────────────────────`);
  console.log(`Calculating centroids for null-coordinate restaurants...\n`);

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
      const nullNames = nbGroups[nb].map(r => r.name);
      const geocodedInNb = data.restaurants.filter(r => r.neighbourhood === nb && r.lat && r.lng);

      if (geocodedInNb.length > 0) {
        const avgLat = geocodedInNb.reduce((s, r) => s + r.lat, 0) / geocodedInNb.length;
        const avgLng = geocodedInNb.reduce((s, r) => s + r.lng, 0) / geocodedInNb.length;
        const latSpread = Math.max(...geocodedInNb.map(r => r.lat)) - Math.min(...geocodedInNb.map(r => r.lat));
        const lngSpread = Math.max(...geocodedInNb.map(r => r.lng)) - Math.min(...geocodedInNb.map(r => r.lng));
        const highSpread = latSpread > 0.005 || lngSpread > 0.005;

        proposed[nb] = {
          coords: [parseFloat(avgLat.toFixed(4)), parseFloat(avgLng.toFixed(4))],
          source: 'averaged', restaurant_count: geocodedInNb.length,
          high_spread: highSpread, lat_spread: parseFloat(latSpread.toFixed(4)),
          lng_spread: parseFloat(lngSpread.toFixed(4)),
          requires_verification: highSpread, null_coord_restaurants: nullNames
        };
        console.log(`  ${nb}: [${avgLat.toFixed(4)}, ${avgLng.toFixed(4)}] — averaged from ${geocodedInNb.length} restaurant(s)${highSpread ? ' ⚠ HIGH SPREAD' : ''}`);
      } else {
        console.log(`  ${nb}: no geocoded restaurants — querying Nominatim...`);
        await sleep(1100);
        const result = await nominatimGeocode(`${nb}, ${city}, ${country}`);
        if (result) {
          console.log(`  ${nb}: [${result.lat.toFixed(4)}, ${result.lng.toFixed(4)}] — Nominatim ⚠ verify`);
          proposed[nb] = { coords: [parseFloat(result.lat.toFixed(4)), parseFloat(result.lng.toFixed(4))], source: 'nominatim', nominatim_query: `${nb}, ${city}, ${country}`, nominatim_display: result.display_name, requires_verification: true, null_coord_restaurants: nullNames };
        } else {
          console.log(`  ${nb}: Nominatim returned no result — manual assignment required`);
          proposed[nb] = { coords: null, source: 'none', requires_verification: true, null_coord_restaurants: nullNames };
        }
      }
    }

    data.centroids_proposed = proposed;
    console.log('');
  }

  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
  console.log(`✓ centroids_proposed written to ${file}`);

  // ══ STEP 2b — WRITER PROFILE ENRICHMENT ══════════════════════════════════════

  console.log(`\nSTEP 2b — Writer profile enrichment`);
  console.log(`──────────────────────────────────────────────`);

  if (!process.env.ANTHROPIC_API_KEY) {
    console.log(`⚠  ANTHROPIC_API_KEY not set — skipping enrichment.`);
    console.log(`   Set ANTHROPIC_API_KEY to enable automatic profile generation.`);
  } else {
    const thinSources = sourcesArray.filter(src => isThinProfile(src.writer_profile));

    if (thinSources.length === 0) {
      console.log(`✓ All writer profiles look good — no enrichment needed.`);
    } else {
      console.log(`Found ${thinSources.length} thin or missing profile(s). Generating via API...\n`);
      let enriched = 0;

      for (const src of thinSources) {
        const writer      = src.writer || 'Unknown';
        const publication = src.publication || 'Unknown';
        const title       = src.article_title || 'food guide';
        const date        = src.article_date || 'recent';
        const language    = src.language || 'es';

        process.stdout.write(`  ${writer} (${publication})... `);
        await sleep(500);
        const profile = await generateWriterProfile(writer, publication, title, date, language);

        if (profile) {
          src.writer_profile = profile;
          enriched++;
          console.log(`done.`);
          console.log(`  → ${profile.substring(0, 90)}...`);
        } else {
          console.log(`failed — keeping existing.`);
        }
      }

      // Ensure data.sources reflects enriched profiles
      if (Array.isArray(data.sources)) {
        // sourcesArray is data.sources directly — already updated in place
      } else {
        data.sources = sourcesArray;
      }

      fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
      console.log(`\n✓ ${enriched} profile(s) enriched and written to ${file}`);
    }
  }

  // ══ STEP 3 — INDEX.JSON UPDATE ════════════════════════════════════════════════

  console.log(`\nSTEP 3 — localbite-index.json update`);
  console.log(`──────────────────────────────────────────────`);

  const indexJsonPath = path.join(__dirname, 'localbite-index.json');
  let indexJson;
  try {
    indexJson = JSON.parse(fs.readFileSync(indexJsonPath, 'utf8'));
  } catch (e) {
    console.error(`ERROR: Could not read localbite-index.json — ${e.message}`);
    indexJson = null;
  }

  if (indexJson) {
    const existingIdx = indexJson.cities.findIndex(c => c.city_slug === citySlug || c.file === file);
    const restaurantCount = data.restaurants.length;
    const bothPoolCount   = data.restaurants.filter(r => r.language_pool === 'both' || r.language_pool === 'both-pool').length;
    const openStatusCount = data.restaurants.filter(r => r.open_status_check).length;
    const today           = new Date().toISOString().split('T')[0];

    const newEntry = { city, country, city_slug: citySlug, pipeline, built: today, restaurant_count: restaurantCount, both_pool_count: bothPoolCount, source_count: sourceCount, file, status: 'complete', open_status_check_count: openStatusCount, notes: '' };

    if (existingIdx >= 0) { indexJson.cities[existingIdx] = newEntry; console.log(`Updating existing entry...`); }
    else { indexJson.cities.push(newEntry); console.log(`Adding new city entry...`); }

    indexJson.last_updated = today;
    fs.writeFileSync(indexJsonPath, JSON.stringify(indexJson, null, 2));
    console.log(`✓ localbite-index.json updated. Total cities: ${indexJson.cities.length}`);
  }

  // ══ SUMMARY ═══════════════════════════════════════════════════════════════════

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
    if (needsManual) console.log(`   One or more centroids need manual coordinate entry.`);
    console.log(`   Do NOT commit ${file} until approve-centroids has been run.`);
  } else {
    console.log(`✓  No centroids action required.`);
  }

  console.log('');
  console.log(`Next steps:`);
  const steps = missingCount > 0
    ? [`1. node localbite-approve-centroids.js ${file}`, `2. Verify CITY_CENTRES for ${city} in index.html`, `3. Verify CITY_BOUNDS for ${city} in index.html`, `4. git add ${file} localbite-index.json`]
    : [`1. Verify CITY_CENTRES for ${city} in index.html`, `2. Verify CITY_BOUNDS for ${city} in index.html`, `3. git add ${file} localbite-index.json`];
  steps.forEach(s => console.log(`  ${s}`));
  console.log('');

})();
