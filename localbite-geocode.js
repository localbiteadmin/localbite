#!/usr/bin/env node
// LocalBite Geocoding Script v7
// Combination 1: Nominatim → Photon → manual
// Combination 2: Nominatim → HERE → manual
//
// Usage:
//   Combination 1: node localbite-geocode.js <city-json-file>
//   Combination 2: node localbite-geocode.js <city-json-file> <here-api-key> [--debug]

const fs = require('fs');
const https = require('https');
const http = require('http');

const file = process.argv[2];
const hereKey = process.argv[3] || null;
const debugMode = process.argv.includes('--debug');
const combination = hereKey ? 2 : 1;

if (!file) {
  console.error('Usage: node localbite-geocode.js <city-json-file> [here-api-key]');
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const city = data.city || (data.meta && data.meta.city);
const country = data.country || (data.meta && data.meta.country);

// ── BOUNDING BOXES ──
// City-level tight boxes for false positive rejection
const CITY_BOXES = {
  'Fes':          { latMin: 33.9,  latMax: 34.2,  lngMin: -5.2,  lngMax: -4.8 },
  'Marrakesh':    { latMin: 31.4,  latMax: 31.8,  lngMin: -8.2,  lngMax: -7.8 },
  'Rabat':        { latMin: 33.8,  latMax: 34.2,  lngMin: -7.0,  lngMax: -6.6 },
  'Chefchaouen':  { latMin: 35.0,  latMax: 35.4,  lngMin: -5.4,  lngMax: -5.1 },
  'Barcelona':    { latMin: 41.2,  latMax: 41.6,  lngMin:  1.9,  lngMax:  2.4 },
  'Valencia':     { latMin: 39.2,  latMax: 39.7,  lngMin: -0.6,  lngMax: -0.1 },
  'Lisbon':       { latMin: 38.6,  latMax: 38.9,  lngMin: -9.3,  lngMax: -9.0 },
  'Porto':        { latMin: 41.1,  latMax: 41.3,  lngMin: -8.8,  lngMax: -8.5 },
  'Copenhagen':   { latMin: 55.6,  latMax: 55.8,  lngMin: 12.4,  lngMax: 12.7 },
  'Edinburgh':    { latMin: 55.9,  latMax: 56.0,  lngMin: -3.3,  lngMax: -3.1 },
  'Tel Aviv':     { latMin: 32.0,  latMax: 32.2,  lngMin: 34.7,  lngMax: 34.9 },
  'Toronto':      { latMin: 43.58, latMax: 43.86, lngMin: -79.64, lngMax: -79.11 },
  'Córdoba':      { latMin: 37.82, latMax: 37.96, lngMin: -4.87, lngMax: -4.68 },
  'Granada':      { latMin: 37.14, latMax: 37.25, lngMin: -3.65, lngMax: -3.55 },
  'Málaga':       { latMin: 36.68, latMax: 36.76, lngMin: -4.48, lngMax: -4.33 },
  'Madrid':        { latMin: 40.35, latMax: 40.50, lngMin: -3.75, lngMax: -3.60 },
};

const COUNTRY_BOXES = {
  'Morocco':     { latMin: 27.0,  latMax: 36.0,  lngMin: -14.0, lngMax: -1.0  },
  'Spain':       { latMin: 35.0,  latMax: 44.5,  lngMin: -10.0, lngMax:  5.0  },
  'Portugal':    { latMin: 36.5,  latMax: 42.5,  lngMin: -10.0, lngMax: -6.0  },
  'Denmark':     { latMin: 54.5,  latMax: 57.8,  lngMin:  8.0,  lngMax: 15.2  },
  'Scotland':    { latMin: 54.5,  latMax: 60.9,  lngMin: -7.6,  lngMax: -0.7  },
  'Israel':      { latMin: 29.5,  latMax: 33.4,  lngMin: 34.2,  lngMax: 35.9  },
  'France':      { latMin: 41.0,  latMax: 51.5,  lngMin: -5.5,  lngMax:  9.0  },
  'Italy':       { latMin: 36.0,  latMax: 47.5,  lngMin:  6.5,  lngMax: 19.0  },
  'Canada':      { latMin: 41.5,  latMax: 83.0,  lngMin: -141.0, lngMax: -52.0 },
};

function isInBounds(lat, lng) {
  const cityBox = CITY_BOXES[city];
  if (cityBox) {
    if (lat < cityBox.latMin || lat > cityBox.latMax ||
        lng < cityBox.lngMin || lng > cityBox.lngMax) return false;
  }
  const countryBox = COUNTRY_BOXES[country];
  if (countryBox) {
    return lat >= countryBox.latMin && lat <= countryBox.latMax &&
           lng >= countryBox.lngMin && lng <= countryBox.lngMax;
  }
  return true;
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function httpGet(url, headers = {}, useHttp = false) {
  return new Promise((resolve, reject) => {
    const lib = useHttp ? http : https;
    const options = {
      headers: {
        'User-Agent': 'LocalBite-Geocoder/4.0 (github.com/localbiteadmin/localbite)',
        ...headers
      }
    };
    lib.get(url, options, res => {
      // Handle redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return httpGet(res.headers.location, headers).then(resolve).catch(reject);
      }
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => {
        try { resolve(JSON.parse(body)); }
        catch(e) { reject(new Error(`JSON parse error (${res.statusCode}): ${body.slice(0,100)}`)); }
      });
    }).on('error', reject);
  });
}



// ── NON-RESTAURANT ENTITY DETECTION ──
// Catches false positives where Nominatim/Photon matched a street, park,
// plaza, station, or other non-restaurant entity instead of the restaurant.
// Called after nameIsPlausible passes — a second gate before accepting a match.

const NON_RESTAURANT_PATTERNS = [
  /^Carrer (de |d'|dels? |de les |via |del |major|nou|vell)/i,   // streets (Catalan)
  /^Carrer [A-Z]/i,   // Carrer + capitalised word (catches Via Augusta, etc.)
  /^Puente (de |del |de la )/i,       // bridges (Spanish)
  /^Pont (de |del |d')/i,             // bridges (Catalan)
  /^Castillo (de |del |de la )/i,     // castles (Spanish)
  /^Castell (de |del |d')/i,          // castles (Catalan)
  /^Centro [Dd]eportivo/i,            // sports centres
  /^Polideportivo/i,                   // sports centres
  /^Arroyo (de |del |de la )/i,       // waterways/streams
  /^Ribeira (de |do |da )/i,          // waterways (Portuguese)
  /^Parque (de |del |de la )/i,       // parks (Spanish)
  /^Jardín (de |del |de la )/i,       // gardens (Spanish)
  /^Jardines (de |del |de la )/i,     // gardens (Spanish plural)
  /^Palacio (de |del |de la )/i,      // palaces
  /^Palau (de |del |d')/i,            // palaces (Catalan)
  /^Torre (de |del |de la )/i,        // towers (often landmarks)
  /^Iglesia (de |del |de la )/i,      // churches
  /^Catedral/i,                        // cathedrals
  /^Basílica/i,                        // basilicas
  /^Convento (de |del |de la )/i,     // convents
  /^Museo (de |del |de la )/i,        // museums (Spanish)
  /^Mercat (de |del |d')/i,           // markets as buildings (Catalan)
  /^Mercado (de |del |de la )/i,      // markets as buildings (Spanish)
  /^Calle (de |del |de la |de los )/i,  // streets (Spanish)
  /^Rua (de |do |da |dos |das )/i,      // streets (Portuguese)
  /^Rue (de |du |des |de la )/i,        // streets (French)
  /^Plaça (de |del |de la |d')/i,       // squares (Catalan)
  /^Plaza (de |del |de la |de los )/i,  // squares (Spanish)
  /^Praça (de |do |da )/i,              // squares (Portuguese)
  /^Place (de |du |des |de la )/i,      // squares (French)
  /^Jardins? (de |del |d')/i,           // parks/gardens (Catalan/Spanish)
  /^Parque (de |do |da )/i,             // parks (Spanish/Portuguese)
  /^Parc (de |du |des )/i,              // parks (French/Catalan)
  /^Avinguda (de |del |d')/i,           // avenues (Catalan)
  /^Avenida (de |do |da )/i,            // avenues (Spanish/Portuguese)
  /^Passeig (de |del |d')/i,            // promenades (Catalan)
  /^Paseo (de |del )/i,                 // promenades (Spanish)
  /\bEstació\b/i,                      // train/metro stations (Catalan)
  /\bEstación\b/i,                     // stations (Spanish)
  /\bEstação\b/i,                      // stations (Portuguese)
  /\bStation\b/i,                      // stations (English)
  /\bAirport\b/i,                      // airports
  /\bAeroport\b/i,                     // airports (Catalan/French)
  /\bAeropuerto\b/i,                   // airports (Spanish)
  /\bUniversitat\b/i,                  // universities (Catalan)
  /\bUniversidad\b/i,                  // universities (Spanish)
  /\bUniversidade\b/i,                 // universities (Portuguese)
  /\bUniversity\b/i,                   // universities (English)
  /\bHospital\b/i,                     // hospitals
  /\bMuseu\b/i,                        // museums (Catalan/Portuguese)
  /\bMuseo\b/i,                        // museums (Spanish)
  /\bMusée\b/i,                        // museums (French)
  /\bMetro\b/i,                        // metro stations
  /\bSubway\b/i,                       // subway stations
  /^Line \d/i,                          // metro/train lines
];

/**
 * Returns true if the matched name looks like a non-restaurant entity.
 * Used as a post-filter after nameIsPlausible passes.
 * @param {string} matchedName - The name returned by the geocoding service
 * @param {string} neighbourhood - The restaurant's neighbourhood field
 * @returns {boolean} true = likely a false positive, reject this match
 */
function isNonRestaurantEntity(matchedName, neighbourhood) {
  if (!matchedName) return false;

  // Check against non-restaurant patterns
  for (const pattern of NON_RESTAURANT_PATTERNS) {
    if (pattern.test(matchedName)) return true;
  }

  // Check if matched name is just the neighbourhood name itself
  // (pure neighbourhood-name false positive, e.g. "Arraval" → "el Raval")
  if (neighbourhood) {
    const normalize = s => s.toLowerCase().replace(/[^a-z0-9]/g, '');
    const normMatch = normalize(matchedName);
    const normNb = normalize(neighbourhood);
    if (normMatch === normNb || normNb.includes(normMatch) && normMatch.length > 3) {
      return true;
    }
  }

  return false;
}

// ── NAME SIMILARITY CHECK ──
// Returns true if matched name shares meaningful words with restaurant name
function nameIsPlausible(restaurantName, matchedName) {
  if (!matchedName) return false;
  const normalize = s => s.toLowerCase()
    .replace(/[^a-z0-9À-ɏs]/g, ' ')
    .replace(/s+/g, ' ').trim();
  const rName = normalize(restaurantName);
  const mName = normalize(matchedName);
  if (mName.includes(rName) || rName.includes(mName)) return true;
  const stopWords = new Set(['the','a','an','de','da','do','das','dos',
    'of','in','at','le','la','les','el','los','and','e','y',
    'restaurant','cafe','bar','bistro','taberna','tasca',
    'edificio','creperia','creperie']);
  const rWords = rName.split(' ').filter(w => w.length > 2 && !stopWords.has(w));
  const mWords = mName.split(' ').filter(w => w.length > 2 && !stopWords.has(w));
  for (const rw of rWords) {
    for (const mw of mWords) {
      if (mw.includes(rw) || rw.includes(mw)) return true;
      const rStripped = rw.normalize('NFD').replace(/[̀-ͯ]/g, '');
      const mStripped = mw.normalize('NFD').replace(/[̀-ͯ]/g, '');
      if (mStripped.includes(rStripped) || rStripped.includes(mStripped)) return true;
    }
  }
  const cityTerms = ['portugal','spain','morocco','lisboa','lisbon','porto',
    'madrid','barcelona','rua','avenida','street','avenue','road'];
  const mWordsAll = mName.split(' ');
  if (mWordsAll.every(w => cityTerms.includes(w) || w.length <= 3)) return false;
  return false;
}

// ── SERVICE 1: NOMINATIM ──
async function queryNominatim(name, nb, city, country) {
  const cityBox = CITY_BOXES[city];
  const viewbox = cityBox
    ? `&viewbox=${cityBox.lngMin},${cityBox.latMax},${cityBox.lngMax},${cityBox.latMin}&bounded=1`
    : '';

  const queries = [
    `${name}, ${city}, ${country}`,
    `${name} restaurant, ${city}`,
    nb ? `${name}, ${nb}, ${city}` : null,
  ].filter(Boolean);

  for (const q of queries) {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=5&addressdetails=1${viewbox}`;
    try {
      const results = await httpGet(url);
      await sleep(1100); // Nominatim rate limit: 1 req/sec

      if (!results || results.length === 0) {
        // Bounded search returned nothing — try unbounded as fallback
        if (viewbox) {
          const urlUnbounded = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=5&addressdetails=1`;
          const unbounded = await httpGet(urlUnbounded);
          await sleep(1100);
          if (!unbounded || unbounded.length === 0) continue;
          const inBounds = unbounded.filter(r => isInBounds(parseFloat(r.lat), parseFloat(r.lon)));
          if (inBounds.length === 0) {
            console.log(`  ✗ Nominatim (unbounded): ${unbounded.length} result(s) outside bounding box`);
            continue;
          }
          const best = inBounds.find(r => r.class === 'amenity') || inBounds[0];
          const nomName1 = best.display_name.split(',')[0];
          if (isNonRestaurantEntity(nomName1, nb)) {
            console.log(`  ✗ Nominatim non-restaurant entity: "${nomName1}" — auto-nulled`);
            continue;
          }
          return {
            lat: parseFloat(best.lat), lng: parseFloat(best.lon),
            source: 'nominatim', confidence: best.class === 'amenity' ? 'high' : 'medium',
            matched_name: nomName1, query: q
          };
        }
        continue;
      }

      const inBounds = results.filter(r => isInBounds(parseFloat(r.lat), parseFloat(r.lon)));
      if (inBounds.length === 0) {
        console.log(`  ✗ Nominatim: ${results.length} result(s) outside bounding box`);
        const first = results[0];
        console.log(`    Rejected: ${parseFloat(first.lat).toFixed(4)}, ${parseFloat(first.lon).toFixed(4)} — ${first.display_name.split(',').slice(0,2).join(',')}`);
        continue;
      }

      const best = inBounds.find(r => r.class === 'amenity') || inBounds[0];
      const nomName2 = best.display_name.split(',')[0];
      if (isNonRestaurantEntity(nomName2, nb)) {
        console.log(`  ✗ Nominatim non-restaurant entity: "${nomName2}" — auto-nulled`);
        continue;
      }
      return {
        lat: parseFloat(best.lat), lng: parseFloat(best.lon),
        source: 'nominatim', confidence: best.class === 'amenity' ? 'high' : 'medium',
        matched_name: nomName2, query: q
      };
    } catch(e) {
      console.error(`  Nominatim error: ${e.message}`);
      await sleep(1100);
    }
  }
  return null;
}

// ── SERVICE 2: HERE ──
async function queryHERE(name, nb, city, country, apiKey) {
  if (!apiKey) return null;

  const queries = [
    `${name} ${city}`,
    nb ? `${name} ${nb} ${city}` : null,
    `${name} restaurant ${city}`,
  ].filter(Boolean);

  const cityBox = CITY_BOXES[city];

  for (const q of queries) {
    let url = `https://geocode.search.hereapi.com/v1/geocode?q=${encodeURIComponent(q)}&apiKey=${apiKey}&limit=5`;

    // Add location bias toward city centre — use circle not bbox
    // bbox can be too restrictive for HERE; circle bias with post-filter works better
    if (cityBox) {
      const centreLat = (cityBox.latMin + cityBox.latMax) / 2;
      const centreLng = (cityBox.lngMin + cityBox.lngMax) / 2;
      url += `&at=${centreLat},${centreLng}`;
    }

    try {
      const result = await httpGet(url);
      await sleep(200);

      if (!result.items || result.items.length === 0) {
        if (debugMode) console.log(`    DEBUG — HERE: empty response for query: ${q}`);
        continue;
      }

      const inBounds = result.items.filter(item => {
        const pos = item.position;
        if (!pos) return false;
        return isInBounds(pos.lat, pos.lng);
      });

      if (inBounds.length === 0) {
        console.log(`  ✗ HERE: result(s) outside bounding box`);
        if (debugMode) {
          console.log(`    DEBUG — HERE returned ${result.items.length} result(s):`);
          result.items.slice(0, 3).forEach((item, i) => {
            console.log(`    [${i+1}] ${item.title} | type: ${item.resultType} | pos: ${item.position ? item.position.lat.toFixed(5) + ', ' + item.position.lng.toFixed(5) : 'none'}`);
          });
        }
        continue;
      }

      // Prefer food/restaurant category results
      const best = inBounds.find(item =>
        item.categories && item.categories.some(c =>
          c.id && (c.id.startsWith('100-') || c.id.startsWith('200-'))
        )
      ) || inBounds[0];

      const pos = best.position;
      const confidence = best.resultType === 'place' ? 'high' : 'medium';

      // Name similarity check — reject if matched name unrelated to restaurant
      if (!nameIsPlausible(name, best.title)) {
        console.log(`  ✗ HERE name mismatch: "${best.title}" vs "${name}" — rejected`);
        continue;
      }

      return {
        lat: pos.lat, lng: pos.lng,
        source: 'here', confidence,
        matched_name: best.title, query: q
      };
    } catch(e) {
      console.error(`  HERE error: ${e.message}`);
      await sleep(200);
    }
  }
  return null;
}

// ── SERVICE 3: PHOTON ──
async function queryPhoton(name, nb, city, country) {
  const cityBox = CITY_BOXES[city];

  const queries = [
    `${name} ${city}`,
    nb ? `${name} ${nb} ${city}` : null,
  ].filter(Boolean);

  for (const q of queries) {
    let url = `https://photon.komoot.io/api/?q=${encodeURIComponent(q)}&limit=5&lang=en`;

    // Add location bias toward city centre
    const countryBox = COUNTRY_BOXES[country];
    if (cityBox) {
      const centreLat = (cityBox.latMin + cityBox.latMax) / 2;
      const centreLng = (cityBox.lngMin + cityBox.lngMax) / 2;
      url += `&lat=${centreLat}&lon=${centreLng}`;
    }

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
        console.log(`  ✗ Photon: result(s) outside bounding box`);
        continue;
      }

      // Prefer amenity features
      const best = inBounds.find(f =>
        f.properties && f.properties.osm_type === 'N' &&
        f.properties.type && ['restaurant','cafe','bar','fast_food'].includes(f.properties.type)
      ) || inBounds[0];

      const coords = best.geometry.coordinates;
      const props = best.properties || {};
      const isAmenity = props.type && ['restaurant','cafe','bar','fast_food'].includes(props.type);

      const photonName = props.name || '';
      // Name similarity check — reject if matched name unrelated to restaurant
      if (photonName && !nameIsPlausible(name, photonName)) {
        console.log(`  ✗ Photon name mismatch: "${photonName}" vs "${name}" — rejected`);
        continue;
      }
      if (isNonRestaurantEntity(photonName, nb)) {
        console.log(`  ✗ Photon non-restaurant entity: "${photonName}" — auto-nulled`);
        continue;
      }

      return {
        lat: coords[1], lng: coords[0],
        source: 'photon', confidence: isAmenity ? 'high' : 'medium',
        matched_name: photonName || q, query: q
      };
    } catch(e) {
      console.error(`  Photon error: ${e.message}`);
      await sleep(300);
    }
  }
  return null;
}

// ── MAIN ──
async function geocodeAll() {
  console.log(`\nLocalBite Geocoder v7`);
  console.log(`══════════════════════════════════════════════`);
  console.log(`City:        ${city}, ${country}`);
  console.log(`Restaurants: ${data.restaurants.length}`);
  console.log(`Combination: ${combination} — ${combination === 1 ? 'Nominatim → Photon → manual' : 'Nominatim → HERE → manual'}`);
  const cityBox = CITY_BOXES[city];
  if (cityBox) {
    console.log(`Bounding box: lat ${cityBox.latMin}–${cityBox.latMax}, lng ${cityBox.lngMin}–${cityBox.lngMax}`);
  } else {
    console.log(`Bounding box: not configured for this city`);
  }
  console.log(`══════════════════════════════════════════════\n`);

  const stats = {
    nominatim: 0, here: 0, photon: 0,
    already: 0, not_found: 0,
    false_positives_caught: 0
  };
  const notFound = [];

  for (let i = 0; i < data.restaurants.length; i++) {
    const r = data.restaurants[i];
    const nb = r.neighbourhood || '';

    // Skip if already geocoded
    if (r.lat && r.lng) {
      console.log(`[${i+1}/${data.restaurants.length}] ✓ ${r.name} — already geocoded (${r.geo_source})`);
      stats.already++;
      continue;
    }

    console.log(`[${i+1}/${data.restaurants.length}] Searching: ${r.name}${nb ? ` (${nb})` : ''}`);

    // Service 1: Nominatim
    let geo = await queryNominatim(r.name, nb, city, country);
    if (geo) {
      console.log(`  ✓ Nominatim [${geo.confidence}]: ${geo.lat.toFixed(5)}, ${geo.lng.toFixed(5)} — "${geo.matched_name}"`);
      Object.assign(r, { lat: geo.lat, lng: geo.lng, geo_source: 'nominatim', geo_confidence: geo.confidence, geo_matched_name: geo.matched_name });
      stats.nominatim++;
      continue;
    }

    // Service 2: Photon (Combination 1 only) OR HERE (Combination 2 only)
    if (combination === 1) {
      console.log(`  → Trying Photon...`);
      geo = await queryPhoton(r.name, nb, city, country);
      if (geo) {
        console.log(`  ✓ Photon [${geo.confidence}]: ${geo.lat.toFixed(5)}, ${geo.lng.toFixed(5)} — "${geo.matched_name}"`);
        Object.assign(r, { lat: geo.lat, lng: geo.lng, geo_source: 'photon', geo_confidence: geo.confidence, geo_matched_name: geo.matched_name });
        stats.photon++;
        continue;
      }
    } else if (combination === 2 && hereKey) {
      console.log(`  → Trying HERE...`);
      geo = await queryHERE(r.name, nb, city, country, hereKey);
      if (geo) {
        console.log(`  ✓ HERE [${geo.confidence}]: ${geo.lat.toFixed(5)}, ${geo.lng.toFixed(5)} — "${geo.matched_name}"`);
        Object.assign(r, { lat: geo.lat, lng: geo.lng, geo_source: 'here', geo_confidence: geo.confidence, geo_matched_name: geo.matched_name });
        stats.here++;
        continue;
      }
      console.log(`  ✗ HERE: no result in bounding box`);
    }

    // Not found by any service
    console.log(`  ✗ Not found — needs manual verification`);
    notFound.push(r);
    stats.not_found++;
  }

  // Write output
  const backupFile = file.replace('.json', '-geocoded-backup.json');
  fs.writeFileSync(backupFile, JSON.stringify(data, null, 2));
  fs.writeFileSync(file, JSON.stringify(data, null, 2));

  // Summary
  const total = data.restaurants.length;
  const found = stats.nominatim + stats.here + stats.photon + stats.already;
  const hitRate = Math.round(found / total * 100);

  console.log(`\n══════════════════════════════════════════════`);
  console.log(`RESULTS — Combination ${combination}`);
  console.log(`══════════════════════════════════════════════`);
  console.log(`Nominatim found:     ${stats.nominatim} (${Math.round(stats.nominatim/total*100)}%)`);
  if (combination === 2) {
    console.log(`HERE added:          ${stats.here} (${Math.round(stats.here/total*100)}%)`);
  }
  console.log(`Photon added:        ${stats.photon} (${Math.round(stats.photon/total*100)}%)`);
  console.log(`Already geocoded:    ${stats.already}`);
  console.log(`Not found:           ${stats.not_found}`);
  console.log(`──────────────────────────────────────────────`);
  console.log(`Total found:         ${found}/${total} (${hitRate}%)`);
  console.log(`Manual needed:       ${stats.not_found}`);
  console.log(`\nUpdated ${file} in place. Backup at ${backupFile}`);

  // Separate medium confidence from not-found for three-tier output
  const mediumFound = data.restaurants.filter(r => r.lat && r.geo_confidence === 'medium');

  if (mediumFound.length > 0) {
    console.log(`\nVerify recommended — medium confidence (${mediumFound.length}):`);
    mediumFound.forEach((r, i) => {
      const search = `https://www.google.com/maps/search/${encodeURIComponent(r.name + ' ' + city)}`;
      console.log(`  ${i+1}. ${r.name} → ${r.geo_matched_name || 'unknown match'}`);
      console.log(`     Quick check: ${search}`);
    });
  }

  if (notFound.length > 0) {
    console.log(`\nManual lookup needed — not found (${notFound.length}):`);
    notFound.forEach((r, i) => {
      const search = `https://www.google.com/maps/search/${encodeURIComponent(r.name + ' ' + city)}`;
      console.log(`  ${i+1}. ${r.name}${r.neighbourhood ? ` (${r.neighbourhood})` : ''}`);
      console.log(`     → ${search}`);
    });
  }

  // Record stats for test comparison
  const mediumCount = data.restaurants.filter(r => r.lat && r.geo_confidence === 'medium').length;
  const statsFile = file.replace('.json', `-geocoding-stats-c${combination}.json`);
  fs.writeFileSync(statsFile, JSON.stringify({
    combination, city, country,
    total, found, hit_rate_pct: hitRate,
    nominatim: stats.nominatim,
    here: stats.here,
    photon: stats.photon,
    already: stats.already,
    not_found: stats.not_found,
    high_confidence: found - mediumCount,
    medium_confidence: mediumCount,
    verify_recommended: mediumCount,
    manual_required: stats.not_found,
    not_found_names: notFound.map(r => r.name),
    medium_names: data.restaurants.filter(r => r.lat && r.geo_confidence === 'medium').map(r => r.name)
  }, null, 2));
  console.log(`\nStats saved to: ${statsFile}`);
  console.log(`\nDone.`);
}

geocodeAll().catch(console.error);
