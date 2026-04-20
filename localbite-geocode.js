#!/usr/bin/env node
// LocalBite Geocoding Script v8.1
// Combination 1: Nominatim → Photon
//
// Usage: node localbite-geocode.js <city-json-file> [--debug]
//
// Policy reminders:
//   - HERE API is permanently excluded (ToS prohibits permanent storage)
//   - Manual geocoding lookups are not permitted
//   - Restaurants without coordinates use neighbourhood centroid fallback
//     in the viewer — ensure all neighbourhoods are registered in
//     index.html CENTROIDS before deployment (see deployment checklist)

'use strict';

const fs = require('fs');
const https = require('https');

const file = process.argv[2];
const debugMode = process.argv.includes('--debug');

if (!file) {
  console.error('Usage: node localbite-geocode.js <city-json-file> [--debug]');
  process.exit(1);
}

// ── INPUT VALIDATION ──
let data;
try {
  data = JSON.parse(fs.readFileSync(file, 'utf8'));
} catch (e) {
  console.error(`Error reading or parsing ${file}: ${e.message}`);
  process.exit(1);
}

if (!data.restaurants || !Array.isArray(data.restaurants)) {
  console.error(`Error: ${file} does not contain a valid "restaurants" array.`);
  console.error('Ensure the file is a properly formatted LocalBite city pack JSON.');
  process.exit(1);
}

// Normalise city name to title case for consistent CITY_BOXES lookup
const rawCity = data.city || (data.meta && data.meta.city);
const country = data.country || (data.meta && data.meta.country);

if (!rawCity || !country) {
  console.error('Error: city pack JSON must have top-level "city" and "country" fields.');
  process.exit(1);
}

// Title-case normalisation for case-insensitive CITY_BOXES lookup
const toTitleCase = s => s.replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
const city = toTitleCase(rawCity.trim());

// ── BOUNDING BOXES ──
// City-level tight boxes for false positive rejection.
// ADDING A NEW CITY: add an entry here before running geocoding.
// The script will refuse to run without a configured bounding box.
const CITY_BOXES = {
  'Fes':          { latMin: 33.90, latMax: 34.20, lngMin:  -5.20, lngMax:  -4.80 },
  'Marrakesh':    { latMin: 31.40, latMax: 31.80, lngMin:  -8.20, lngMax:  -7.80 },
  'Rabat':        { latMin: 33.80, latMax: 34.20, lngMin:  -7.00, lngMax:  -6.60 },
  'Chefchaouen':  { latMin: 35.00, latMax: 35.40, lngMin:  -5.40, lngMax:  -5.10 },
  'Barcelona':    { latMin: 41.20, latMax: 41.60, lngMin:   1.90, lngMax:   2.40 },
  'Valencia':     { latMin: 39.20, latMax: 39.70, lngMin:  -0.60, lngMax:  -0.10 },
  'Lisbon':       { latMin: 38.60, latMax: 38.90, lngMin:  -9.30, lngMax:  -9.00 },
  'Porto':        { latMin: 41.10, latMax: 41.30, lngMin:  -8.80, lngMax:  -8.50 },
  'Copenhagen':   { latMin: 55.60, latMax: 55.80, lngMin:  12.40, lngMax:  12.70 },
  'Edinburgh':    { latMin: 55.90, latMax: 56.00, lngMin:  -3.30, lngMax:  -3.10 },
  'Tel Aviv':     { latMin: 32.00, latMax: 32.20, lngMin:  34.70, lngMax:  34.90 },
  'Toronto':      { latMin: 43.58, latMax: 43.86, lngMin: -79.64, lngMax: -79.11 },
  'Cordoba':      { latMin: 37.82, latMax: 37.96, lngMin:  -4.87, lngMax:  -4.68 },
  'Granada':      { latMin: 37.14, latMax: 37.25, lngMin:  -3.65, lngMax:  -3.55 },
  'Malaga':       { latMin: 36.68, latMax: 36.76, lngMin:  -4.48, lngMax:  -4.33 },
  'Madrid':       { latMin: 40.35, latMax: 40.50, lngMin:  -3.75, lngMax:  -3.60 },
  'Seville':      { latMin: 37.30, latMax: 37.45, lngMin:  -6.05, lngMax:  -5.90 },
  'Bilbao':       { latMin: 43.22, latMax: 43.32, lngMin:  -3.05, lngMax:  -2.80 },
  'Valladolid':    { latMin: 41.61, latMax: 41.72, lngMin: -4.82, lngMax: -4.63 },
  'Zaragoza':       { latMin: 41.60, latMax: 41.70, lngMin: -0.95, lngMax: -0.75 },
  'San Sebastian':  { latMin: 43.28, latMax: 43.34, lngMin:  -2.04, lngMax:  -1.89 },
  'San Sebastián':  { latMin: 43.28, latMax: 43.34, lngMin:  -2.04, lngMax:  -1.89 },
};

const COUNTRY_BOXES = {
  'Morocco':   { latMin: 27.0, latMax: 36.0, lngMin: -14.0, lngMax:  -1.0 },
  'Spain':     { latMin: 35.0, latMax: 44.5, lngMin: -10.0, lngMax:   5.0 },
  'Portugal':  { latMin: 36.5, latMax: 42.5, lngMin: -10.0, lngMax:  -6.0 },
  'Denmark':   { latMin: 54.5, latMax: 57.8, lngMin:   8.0, lngMax:  15.2 },
  'Scotland':  { latMin: 54.5, latMax: 60.9, lngMin:  -7.6, lngMax:  -0.7 },
  'Israel':    { latMin: 29.5, latMax: 33.4, lngMin:  34.2, lngMax:  35.9 },
  'France':    { latMin: 41.0, latMax: 51.5, lngMin:  -5.5, lngMax:   9.0 },
  'Italy':     { latMin: 36.0, latMax: 47.5, lngMin:   6.5, lngMax:  19.0 },
  'Canada':    { latMin: 41.5, latMax: 83.0, lngMin: -141.0, lngMax: -52.0 },
  'United Kingdom': { latMin: 49.9, latMax: 60.9, lngMin: -8.2, lngMax:  1.8 },
};

// ── PRE-FLIGHT: BOUNDING BOX REQUIRED ──
// Missing bounding box is a hard stop — not a warning.
// Add the city to CITY_BOXES above before running.
const cityBox = CITY_BOXES[city];
if (!cityBox) {
  console.error(`\nERROR: No bounding box configured for "${city}".`);
  console.error('Geocoding cannot proceed without a bounding box — false positives will reach the final pack.');
  console.error(`Add an entry for "${city}" to CITY_BOXES in localbite-geocode.js before running.`);
  console.error('\nExample entry (adjust coordinates for the actual city):');
  console.error(`  '${city}': { latMin: XX.XX, latMax: XX.XX, lngMin: XX.XX, lngMax: XX.XX },`);
  process.exit(1);
}

// ── BOUNDS CHECK ──
function isInBounds(lat, lng) {
  if (lat < cityBox.latMin || lat > cityBox.latMax ||
      lng < cityBox.lngMin || lng > cityBox.lngMax) return false;
  const countryBox = COUNTRY_BOXES[country];
  if (countryBox) {
    return lat >= countryBox.latMin && lat <= countryBox.latMax &&
           lng >= countryBox.lngMin && lng <= countryBox.lngMax;
  }
  return true;
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function httpGet(url, headers = {}) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'LocalBite-Geocoder/8.1 (github.com/localbiteadmin/localbite)',
        ...headers
      }
    };
    https.get(url, options, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return httpGet(res.headers.location, headers).then(resolve).catch(reject);
      }
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => {
        try { resolve(JSON.parse(body)); }
        catch (e) { reject(new Error(`JSON parse error (${res.statusCode}): ${body.slice(0, 100)}`)); }
      });
    }).on('error', reject);
  });
}

// ── NON-RESTAURANT ENTITY DETECTION ──
// Patterns for streets, squares, parks, landmarks, and transit.
// Language coverage: Spanish, Portuguese, French, Catalan, Basque,
// English, Arabic (romanised). Add new languages as new cities are added.
const NON_RESTAURANT_PATTERNS = [
  // ── Spanish ──
  /^Calle (de |del |de la |de los )/i,
  /^Plaza (de |del |de la |de los )/i,
  /^Avenida (de |do |da )/i,
  /^Paseo (de |del )/i,
  /^Puente (de |del |de la )/i,
  /^Castillo (de |del |de la )/i,
  /^Centro [Dd]eportivo/i,
  /^Polideportivo/i,
  /^Arroyo (de |del |de la )/i,
  /^Parque (de |del |de la )/i,
  /^Jardín (de |del |de la )/i,
  /^Jardines (de |del |de la )/i,
  /^Palacio (de |del |de la )/i,
  /^Torre (de |del |de la )/i,
  /^Iglesia (de |del |de la )/i,
  /^Catedral/i,
  /^Basílica/i,
  /^Convento (de |del |de la )/i,
  /^Museo (de |del |de la )/i,
  /^Mercado (de |del |de la )/i,
  // ── Portuguese ──
  /^Rua (de |do |da |dos |das )/i,
  /^Praça (de |do |da )/i,
  /^Ribeira (de |do |da )/i,
  /^Parque (de |do |da )/i,
  // ── French ──
  /^Rue (de |du |des |de la )/i,
  /^Place (de |du |des |de la )/i,
  /^Parc (de |du |des )/i,
  // ── Catalan ──
  /^Carrer (de |d'|dels? |de les |via |del |major|nou|vell)/i,
  /^Carrer [A-Z]/i,
  /^Pont (de |del |d')/i,
  /^Castell (de |del |d')/i,
  /^Plaça (de |del |de la |d')/i,
  /^Jardins? (de |del |d')/i,
  /^Palau (de |del |d')/i,
  /^Mercat (de |del |d')/i,
  /^Avinguda (de |del |d')/i,
  /^Passeig (de |del |d')/i,
  // ── Basque (Euskara) ──
  // kalea = street, etorbidea = avenue/boulevard,
  // pasealekua = promenade/walk, enparantza = square/plaza
  /\bkalea\b/i,
  /\betorbidea\b/i,
  /\bpasealekua\b/i,
  /\benparantza\b/i,
  // ── General / cross-language ──
  /\bEstació\b/i,
  /\bEstación\b/i,
  /\bEstação\b/i,
  /\bStation\b/i,
  /\bAirport\b/i,
  /\bAeroport\b/i,
  /\bAeropuerto\b/i,
  /\bUniversitat\b/i,
  /\bUniversidad\b/i,
  /\bUniversidade\b/i,
  /\bUniversity\b/i,
  /\bHospital\b/i,
  /\bMuseu\b/i,
  /\bMuseo\b/i,
  /\bMusée\b/i,
  /\bMetro\b/i,
  /\bSubway\b/i,
  /^Line \d/i,
];

function isNonRestaurantEntity(matchedName, neighbourhood) {
  if (!matchedName) return false;
  for (const pattern of NON_RESTAURANT_PATTERNS) {
    if (pattern.test(matchedName)) return true;
  }
  if (neighbourhood) {
    const normalize = s => s.toLowerCase().replace(/[^a-z0-9]/g, '');
    const normMatch = normalize(matchedName);
    const normNb = normalize(neighbourhood);
    if (normMatch === normNb || (normNb.includes(normMatch) && normMatch.length > 3)) {
      return true;
    }
  }
  return false;
}

// ── NAME SIMILARITY CHECK ──
function nameIsPlausible(restaurantName, matchedName) {
  if (!matchedName) return false;
  const normalize = s => s.toLowerCase()
    .replace(/[^a-z0-9À-ɏ]/g, ' ')
    .replace(/\s+/g, ' ').trim();
  const rName = normalize(restaurantName);
  const mName = normalize(matchedName);
  if (mName.includes(rName) || rName.includes(mName)) return true;
  const stopWords = new Set(['the', 'a', 'an', 'de', 'da', 'do', 'das', 'dos',
    'of', 'in', 'at', 'le', 'la', 'les', 'el', 'los', 'and', 'e', 'y',
    'restaurant', 'cafe', 'bar', 'bistro', 'taberna', 'tasca',
    'edificio', 'creperia', 'creperie']);
  const rWords = rName.split(' ').filter(w => w.length > 2 && !stopWords.has(w));
  const mWords = mName.split(' ').filter(w => w.length > 2 && !stopWords.has(w));
  for (const rw of rWords) {
    for (const mw of mWords) {
      if (mw.includes(rw) || rw.includes(mw)) return true;
      const rStripped = rw.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const mStripped = mw.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      if (mStripped.includes(rStripped) || rStripped.includes(mStripped)) return true;
    }
  }
  return false;
}

// ── SERVICE 1: NOMINATIM ──
async function queryNominatim(name, nb, city, country) {
  const viewbox = `&viewbox=${cityBox.lngMin},${cityBox.latMax},${cityBox.lngMax},${cityBox.latMin}&bounded=1`;

  const queries = [
    `${name}, ${city}, ${country}`,
    `${name} restaurant, ${city}`,
    nb ? `${name}, ${nb}, ${city}` : null,
  ].filter(Boolean);

  for (const q of queries) {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=5&addressdetails=1${viewbox}`;
    try {
      const results = await httpGet(url);
      await sleep(1100);

      if (!results || results.length === 0) {
        // Bounded search returned nothing — try unbounded with post-filter
        const urlUnbounded = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=5&addressdetails=1`;
        const unbounded = await httpGet(urlUnbounded);
        await sleep(1100);
        if (!unbounded || unbounded.length === 0) continue;
        const inBounds = unbounded.filter(r => isInBounds(parseFloat(r.lat), parseFloat(r.lon)));
        if (inBounds.length === 0) {
          if (debugMode) console.log(`  ✗ Nominatim (unbounded): ${unbounded.length} result(s) outside bounding box`);
          continue;
        }
        const best = inBounds.find(r => r.class === 'amenity') || inBounds[0];
        const nomName = best.display_name.split(',')[0];
        if (isNonRestaurantEntity(nomName, nb)) {
          if (debugMode) console.log(`  ✗ Nominatim non-restaurant entity: "${nomName}" — rejected`);
          continue;
        }
        return {
          lat: parseFloat(best.lat), lng: parseFloat(best.lon),
          source: 'nominatim', confidence: best.class === 'amenity' ? 'high' : 'medium',
          matched_name: nomName, query: q
        };
      }

      const inBounds = results.filter(r => isInBounds(parseFloat(r.lat), parseFloat(r.lon)));
      if (inBounds.length === 0) {
        if (debugMode) {
          const first = results[0];
          console.log(`  ✗ Nominatim: result(s) outside bounding box`);
          console.log(`    Rejected: ${parseFloat(first.lat).toFixed(4)}, ${parseFloat(first.lon).toFixed(4)} — ${first.display_name.split(',').slice(0, 2).join(',')}`);
        }
        continue;
      }

      const best = inBounds.find(r => r.class === 'amenity') || inBounds[0];
      const nomName = best.display_name.split(',')[0];
      if (isNonRestaurantEntity(nomName, nb)) {
        if (debugMode) console.log(`  ✗ Nominatim non-restaurant entity: "${nomName}" — rejected`);
        continue;
      }
      return {
        lat: parseFloat(best.lat), lng: parseFloat(best.lon),
        source: 'nominatim', confidence: best.class === 'amenity' ? 'high' : 'medium',
        matched_name: nomName, query: q
      };
    } catch (e) {
      console.error(`  Nominatim error: ${e.message}`);
      await sleep(1100);
    }
  }
  return null;
}

// ── SERVICE 2: PHOTON ──
async function queryPhoton(name, nb, city, country) {
  const queries = [
    `${name} ${city}`,
    nb ? `${name} ${nb} ${city}` : null,
  ].filter(Boolean);

  const centreLat = (cityBox.latMin + cityBox.latMax) / 2;
  const centreLng = (cityBox.lngMin + cityBox.lngMax) / 2;

  for (const q of queries) {
    const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(q)}&limit=5&lang=en&lat=${centreLat}&lon=${centreLng}`;
    try {
      const result = await httpGet(url);
      await sleep(300);

      if (!result.features || result.features.length === 0) continue;

      const inBounds = result.features.filter(f => {
        const coords = f.geometry && f.geometry.coordinates;
        if (!coords) return false;
        return isInBounds(coords[1], coords[0]); // Photon returns [lng, lat]
      });

      if (inBounds.length === 0) {
        if (debugMode) console.log(`  ✗ Photon: result(s) outside bounding box`);
        continue;
      }

      const best = inBounds.find(f =>
        f.properties && f.properties.osm_type === 'N' &&
        f.properties.type && ['restaurant', 'cafe', 'bar', 'fast_food'].includes(f.properties.type)
      ) || inBounds[0];

      const coords = best.geometry.coordinates;
      const props = best.properties || {};
      const isAmenity = props.type && ['restaurant', 'cafe', 'bar', 'fast_food'].includes(props.type);
      const photonName = props.name || '';

      if (photonName && !nameIsPlausible(name, photonName)) {
        if (debugMode) console.log(`  ✗ Photon name mismatch: "${photonName}" vs "${name}" — rejected`);
        continue;
      }
      if (isNonRestaurantEntity(photonName, nb)) {
        if (debugMode) console.log(`  ✗ Photon non-restaurant entity: "${photonName}" — rejected`);
        continue;
      }

      return {
        lat: coords[1], lng: coords[0],
        source: 'photon', confidence: isAmenity ? 'high' : 'medium',
        matched_name: photonName || q, query: q
      };
    } catch (e) {
      console.error(`  Photon error: ${e.message}`);
      await sleep(300);
    }
  }
  return null;
}

// ── MAIN ──
async function geocodeAll() {
  console.log(`\nLocalBite Geocoder v8.1`);
  console.log(`══════════════════════════════════════════════`);
  console.log(`City:         ${city}, ${country}`);
  console.log(`Restaurants:  ${data.restaurants.length}`);
  console.log(`Stack:        Nominatim → Photon`);
  console.log(`Bounding box: lat ${cityBox.latMin}–${cityBox.latMax}, lng ${cityBox.lngMin}–${cityBox.lngMax}`);
  console.log(`══════════════════════════════════════════════\n`);

  const stats = { nominatim: 0, photon: 0, already: 0, not_found: 0 };
  const notFound = [];

  for (let i = 0; i < data.restaurants.length; i++) {
    const r = data.restaurants[i];
    const nb = r.neighbourhood || '';

    if (r.lat && r.lng) {
      console.log(`[${i + 1}/${data.restaurants.length}] ✓ ${r.name} — already geocoded (${r.geo_source})`);
      stats.already++;
      continue;
    }

    console.log(`[${i + 1}/${data.restaurants.length}] Searching: ${r.name}${nb ? ` (${nb})` : ''}`);

    // Service 1: Nominatim
    let geo = await queryNominatim(r.name, nb, city, country);
    if (geo) {
      console.log(`  ✓ Nominatim [${geo.confidence}]: ${geo.lat.toFixed(5)}, ${geo.lng.toFixed(5)} — "${geo.matched_name}"`);
      Object.assign(r, {
        lat: geo.lat, lng: geo.lng,
        geo_source: 'nominatim', geo_confidence: geo.confidence,
        geo_matched_name: geo.matched_name
      });
      stats.nominatim++;
      continue;
    }

    // Service 2: Photon
    console.log(`  → Trying Photon...`);
    geo = await queryPhoton(r.name, nb, city, country);
    if (geo) {
      console.log(`  ✓ Photon [${geo.confidence}]: ${geo.lat.toFixed(5)}, ${geo.lng.toFixed(5)} — "${geo.matched_name}"`);
      Object.assign(r, {
        lat: geo.lat, lng: geo.lng,
        geo_source: 'photon', geo_confidence: geo.confidence,
        geo_matched_name: geo.matched_name
      });
      stats.photon++;
      continue;
    }

    console.log(`  ✗ Not found — will use neighbourhood centroid fallback in viewer`);
    notFound.push(r);
    stats.not_found++;
  }

  // ── WRITE OUTPUT ──
  const backupFile = file.replace('.json', '-geocoded-backup.json');
  fs.writeFileSync(backupFile, JSON.stringify(data, null, 2));
  fs.writeFileSync(file, JSON.stringify(data, null, 2));

  // ── POST-WRITE VERIFICATION ──
  // Re-read the written file and count coordinates to confirm save succeeded.
  let verifiedCount = 0;
  try {
    const written = JSON.parse(fs.readFileSync(file, 'utf8'));
    verifiedCount = written.restaurants.filter(r => r.lat !== null && r.lat !== undefined).length;
    console.log(`\nWrite verified: ${verifiedCount} restaurants have coordinates in ${file}`);
  } catch (e) {
    console.error(`\nWARNING: Could not verify written file — ${e.message}`);
  }

  // ── ORPHAN CHECK ──
  // Restaurants with both null coordinates and null neighbourhood will not
  // display correctly in the viewer — centroid fallback requires neighbourhood.
  const orphans = data.restaurants.filter(r =>
    (!r.lat || r.lat === null) && (!r.neighbourhood || r.neighbourhood === null)
  );
  if (orphans.length > 0) {
    console.log(`\n⚠  ORPHAN WARNING — ${orphans.length} restaurant(s) have no coordinates AND no neighbourhood:`);
    orphans.forEach((r, i) => {
      console.log(`  ${i + 1}. ${r.name} — will not display on map without neighbourhood assignment`);
    });
    console.log(`  Action required: assign neighbourhood from article context before deployment.`);
  }

  // ── SUMMARY ──
  const total = data.restaurants.length;
  const found = stats.nominatim + stats.photon + stats.already;
  const hitRate = Math.round(found / total * 100);

  console.log(`\n══════════════════════════════════════════════`);
  console.log(`GEOCODING RESULTS`);
  console.log(`══════════════════════════════════════════════`);
  console.log(`Nominatim found:    ${stats.nominatim} (${Math.round(stats.nominatim / total * 100)}%)`);
  console.log(`Photon added:       ${stats.photon} (${Math.round(stats.photon / total * 100)}%)`);
  console.log(`Already geocoded:   ${stats.already}`);
  console.log(`Not found:          ${stats.not_found}`);
  console.log(`──────────────────────────────────────────────`);
  console.log(`Total with coords:  ${found}/${total} (${hitRate}%)`);
  console.log(`Using centroid:     ${stats.not_found}`);

  if (orphans.length > 0) {
    console.log(`Orphans (no coords + no neighbourhood): ${orphans.length} ⚠`);
  }

  // Medium confidence — worth a visual spot-check
  const mediumFound = data.restaurants.filter(r => r.lat && r.geo_confidence === 'medium');
  if (mediumFound.length > 0) {
    console.log(`\nMedium confidence — spot-check recommended (${mediumFound.length}):`);
    mediumFound.forEach((r, i) => {
      console.log(`  ${i + 1}. ${r.name} → matched as "${r.geo_matched_name || 'unknown'}"`);
    });
  }

  // Centroid fallback — no action needed but listed for awareness
  if (notFound.length > 0) {
    console.log(`\nUsing centroid fallback — no coordinates found (${notFound.length}):`);
    notFound.forEach((r, i) => {
      console.log(`  ${i + 1}. ${r.name}${r.neighbourhood ? ` → centroid: ${r.neighbourhood}` : ' → ⚠ no neighbourhood assigned'}`);
    });
    console.log(`\n  ⚠ DEPLOYMENT CHECKLIST: Before going live, verify that every neighbourhood`);
    console.log(`    listed above is registered in the CENTROIDS object in index.html.`);
    console.log(`    Unregistered neighbourhoods will display at random incorrect locations.`);
  }

  // ── STATS FILE ──
  // Fixed filename per city — overwrites on each run, does not accumulate.
  const mediumCount = mediumFound.length;
  const statsFile = file.replace('.json', '-geocoding-stats.json');
  fs.writeFileSync(statsFile, JSON.stringify({
    city, country,
    total, found, hit_rate_pct: hitRate,
    nominatim: stats.nominatim,
    photon: stats.photon,
    already: stats.already,
    not_found: stats.not_found,
    orphans: orphans.length,
    high_confidence: found - mediumCount - stats.already,
    medium_confidence: mediumCount,
    verify_recommended: mediumCount,
    centroid_fallback: stats.not_found,
    not_found_names: notFound.map(r => r.name),
    orphan_names: orphans.map(r => r.name),
    medium_names: mediumFound.map(r => r.name)
  }, null, 2));

  console.log(`\nStats: ${statsFile}`);
  console.log(`Backup: ${backupFile}`);
  console.log(`\nDone.`);
}

geocodeAll().catch(console.error);
