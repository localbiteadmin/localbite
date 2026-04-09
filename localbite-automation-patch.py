#!/usr/bin/env python3
"""
LocalBite automation patch — Items B and D
Run from ~/Documents/GitHub/localbite/

Item B: Add non-restaurant false positive detection to localbite-geocode.js
Item D: Create localbite-index-update.js

Usage: python3 localbite-automation-patch.py
"""

import os, json, sys

BASE = os.path.expanduser('~/Documents/GitHub/localbite')

# ─────────────────────────────────────────────────────────────────────────────
# ITEM B — False positive detection in localbite-geocode.js
# ─────────────────────────────────────────────────────────────────────────────

GEOCODE_PATH = os.path.join(BASE, 'localbite-geocode.js')

NON_RESTAURANT_BLOCK = """
// ── NON-RESTAURANT ENTITY DETECTION ──
// Catches false positives where Nominatim/Photon matched a street, park,
// plaza, station, or other non-restaurant entity instead of the restaurant.
// Called after nameIsPlausible passes — a second gate before accepting a match.

const NON_RESTAURANT_PATTERNS = [
  /^Carrer (de |d'|dels? |de les )/i,   // streets (Catalan)
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
  /\\bEstació\\b/i,                      // train/metro stations (Catalan)
  /\\bEstación\\b/i,                     // stations (Spanish)
  /\\bEstação\\b/i,                      // stations (Portuguese)
  /\\bStation\\b/i,                      // stations (English)
  /\\bAirport\\b/i,                      // airports
  /\\bAeroport\\b/i,                     // airports (Catalan/French)
  /\\bAeropuerto\\b/i,                   // airports (Spanish)
  /\\bUniversitat\\b/i,                  // universities (Catalan)
  /\\bUniversidad\\b/i,                  // universities (Spanish)
  /\\bUniversidade\\b/i,                 // universities (Portuguese)
  /\\bUniversity\\b/i,                   // universities (English)
  /\\bHospital\\b/i,                     // hospitals
  /\\bMuseu\\b/i,                        // museums (Catalan/Portuguese)
  /\\bMuseo\\b/i,                        // museums (Spanish)
  /\\bMusée\\b/i,                        // museums (French)
  /\\bMetro\\b/i,                        // metro stations
  /\\bSubway\\b/i,                       // subway stations
  /^Line \\d/i,                          // metro/train lines
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

"""

# Insert the non-restaurant block before the NAME SIMILARITY CHECK comment
TARGET_B = '// ── NAME SIMILARITY CHECK ──'

def patch_geocode():
    with open(GEOCODE_PATH, 'r') as f:
        content = f.read()

    if 'isNonRestaurantEntity' in content:
        print('Item B: isNonRestaurantEntity already present — skipping.')
        return False

    if TARGET_B not in content:
        print(f'ERROR Item B: Target string not found in {GEOCODE_PATH}')
        return False

    content = content.replace(TARGET_B, NON_RESTAURANT_BLOCK + TARGET_B, 1)

    # Now wire isNonRestaurantEntity into the Nominatim and Photon result handling.
    # After nameIsPlausible passes, add the non-restaurant check.
    # Nominatim result acceptance (around line 163/181 in original):
    content = content.replace(
        "matched_name: best.display_name.split(',')[0], query: q\n        };\n      } else {\n        console.log(`  ✗ Nominatim",
        "matched_name: best.display_name.split(',')[0], query: q\n        };\n      } else {\n        console.log(`  ✗ Nominatim",
    )

    # Wire into Nominatim: add non-restaurant check after nameIsPlausible check
    # Find the Nominatim nameIsPlausible rejection and add our check after acceptance
    old_nominatim = """        const matchedName = best.display_name.split(',')[0];
        if (!nameIsPlausible(name, matchedName)) {
          console.log(`  ✗ Nominatim name mismatch: "${matchedName}" vs "${name}" — rejected`);"""

    new_nominatim = """        const matchedName = best.display_name.split(',')[0];
        if (!nameIsPlausible(name, matchedName)) {
          console.log(`  ✗ Nominatim name mismatch: "${matchedName}" vs "${name}" — rejected`);"""

    # Wire into Photon: add non-restaurant check after nameIsPlausible check
    old_photon = """      if (photonName && !nameIsPlausible(name, photonName)) {
        console.log(`  ✗ Photon name mismatch: "${photonName}" vs "${name}" — rejected`);
        continue;
      }"""

    new_photon = """      if (photonName && !nameIsPlausible(name, photonName)) {
        console.log(`  ✗ Photon name mismatch: "${photonName}" vs "${name}" — rejected`);
        continue;
      }
      if (isNonRestaurantEntity(photonName, nb)) {
        console.log(`  ✗ Photon non-restaurant entity: "${photonName}" — auto-nulled`);
        continue;
      }"""

    if old_photon in content:
        content = content.replace(old_photon, new_photon, 1)
        print('Item B: Photon non-restaurant check wired in.')
    else:
        print('WARNING Item B: Could not wire Photon check — patch manually.')

    # Add non-restaurant check into Nominatim result loop
    # Find where Nominatim checks nameIsPlausible for the candidate loop
    old_nom_loop = """      if (!nameIsPlausible(name, best.title)) {
        console.log(`  ✗ Nominatim name mismatch: "${best.title}" vs "${name}" — rejected`);"""

    new_nom_loop = """      if (!nameIsPlausible(name, best.title)) {
        console.log(`  ✗ Nominatim name mismatch: "${best.title}" vs "${name}" — rejected`);"""

    # Wire non-restaurant check at the point where Nominatim accepts a result
    # Look for the high-confidence acceptance block
    old_nom_accept = """        return {
          lat: parseFloat(best.lat), lng: parseFloat(best.lon),
          source: 'nominatim', confidence: isAmenity ? 'high' : 'medium',
          matched_name: best.display_name.split(',')[0], query: q
        };"""

    new_nom_accept = """        const nomMatchedName = best.display_name.split(',')[0];
        if (isNonRestaurantEntity(nomMatchedName, nb)) {
          console.log(`  ✗ Nominatim non-restaurant entity: "${nomMatchedName}" — auto-nulled`);
          return null;
        }
        return {
          lat: parseFloat(best.lat), lng: parseFloat(best.lon),
          source: 'nominatim', confidence: isAmenity ? 'high' : 'medium',
          matched_name: nomMatchedName, query: q
        };"""

    if old_nom_accept in content:
        content = content.replace(old_nom_accept, new_nom_accept, 1)
        print('Item B: Nominatim non-restaurant check wired in.')
    else:
        print('WARNING Item B: Could not wire Nominatim check — patch manually.')

    with open(GEOCODE_PATH, 'w') as f:
        f.write(content)

    print('Item B: localbite-geocode.js patched successfully.')
    return True


# ─────────────────────────────────────────────────────────────────────────────
# ITEM D — localbite-index-update.js (new script)
# ─────────────────────────────────────────────────────────────────────────────

INDEX_UPDATE_SCRIPT = r"""#!/usr/bin/env node
// localbite-index-update.js
// Reads a city JSON pack and updates localbite-index.json automatically.
// Usage: node localbite-index-update.js localbite-barcelona-2023-2026.json
//
// What it does:
// - Reads city, country, city_slug, built, restaurant_count, both_pool_count,
//   source_count, pipeline from the city JSON
// - Updates the matching entry in localbite-index.json (or adds if new)
// - Sets status: "complete" and file: [input filename]
// - Never overwrites fields not present in the city JSON

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const inputFile = process.argv[2];
if (!inputFile) {
  console.error('Usage: node localbite-index-update.js <city-json-file>');
  process.exit(1);
}

const cityPath = path.resolve(inputFile);
const indexPath = path.join(__dirname, 'localbite-index.json');

if (!fs.existsSync(cityPath)) {
  console.error(`ERROR: City file not found: ${cityPath}`);
  process.exit(1);
}
if (!fs.existsSync(indexPath)) {
  console.error(`ERROR: localbite-index.json not found at ${indexPath}`);
  process.exit(1);
}

// Read city JSON
const cityData = JSON.parse(fs.readFileSync(cityPath, 'utf8'));
const indexData = JSON.parse(fs.readFileSync(indexPath, 'utf8'));

// Extract fields from city JSON
const city       = cityData.city;
const country    = cityData.country;
const city_slug  = cityData.city_slug;
const built      = cityData.built;
const pipeline   = cityData.pipeline || 'localbite-v6';
const restaurants = cityData.restaurants || [];
const sources     = cityData.sources || [];

if (!city || !city_slug) {
  console.error('ERROR: city JSON missing required fields (city, city_slug)');
  process.exit(1);
}

// Count both-pool entries
const both_pool_count = restaurants.filter(r =>
  r.language_pool === 'both' || r.language_pool === 'both-pool' ||
  r.language_pool === 'multi-source'
).length;

const restaurant_count = restaurants.length;
const source_count     = sources.length;

// Find existing entry or create new
const cities = indexData.cities || [];
const existingIdx = cities.findIndex(c =>
  c.city_slug === city_slug || c.city === city
);

const updatedEntry = {
  city,
  country,
  city_slug,
  pipeline,
  built,
  restaurant_count,
  both_pool_count,
  source_count,
  file: path.basename(inputFile),
  status: 'complete',
};

// Preserve any existing fields not being updated (e.g. description, notes)
if (existingIdx >= 0) {
  const existing = cities[existingIdx];
  cities[existingIdx] = { ...existing, ...updatedEntry };
  console.log(`Updated ${city} in localbite-index.json`);
} else {
  cities.push(updatedEntry);
  console.log(`Added ${city} to localbite-index.json`);
}

console.log(`  restaurant_count: ${restaurant_count}`);
console.log(`  both_pool_count:  ${both_pool_count}`);
console.log(`  source_count:     ${source_count}`);
console.log(`  pipeline:         ${pipeline}`);
console.log(`  built:            ${built}`);
console.log(`  file:             ${path.basename(inputFile)}`);

// Write updated index
indexData.cities = cities;
fs.writeFileSync(indexPath, JSON.stringify(indexData, null, 2));
console.log('localbite-index.json saved.');
"""

INDEX_UPDATE_PATH = os.path.join(BASE, 'localbite-index-update.js')

def create_index_update():
    if os.path.exists(INDEX_UPDATE_PATH):
        print('Item D: localbite-index-update.js already exists — skipping.')
        return False
    with open(INDEX_UPDATE_PATH, 'w') as f:
        f.write(INDEX_UPDATE_SCRIPT)
    print('Item D: localbite-index-update.js created.')
    return True


# ─────────────────────────────────────────────────────────────────────────────
# RUN
# ─────────────────────────────────────────────────────────────────────────────

if __name__ == '__main__':
    os.chdir(BASE)
    print(f'Working in: {BASE}\n')

    b_changed = patch_geocode()
    print()
    d_changed = create_index_update()

    print('\n─────────────────────────────────────')
    print('Done. Next steps:')
    print()
    print('1. Test Item D (index update):')
    print('   node localbite-index-update.js localbite-barcelona-2023-2026.json')
    print()
    print('2. Test Item B (geocoding) — re-run on Barcelona to confirm false')
    print('   positive patterns fire correctly:')
    print('   node localbite-geocode.js localbite-barcelona-2023-2026-geocoded-backup.json')
    print()
    print('3. Then build Item C (localbite-viewer-update.js) separately.')
    print('4. Then set up SSH credentials (Item A).')
