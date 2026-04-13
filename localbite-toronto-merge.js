#!/usr/bin/env node
// localbite-toronto-merge.js
// Merges Toronto v5 (2025-2026) and v6 (2023-2026) into a single canonical pack
// Output: localbite-toronto-2023-2026.json (overwrites v6 file)
// Run from: /Users/harryenchin/Documents/GitHub/localbite/

const fs = require('fs');

// ─── LOAD FILES ───────────────────────────────────────────────────────────────

const v5 = JSON.parse(fs.readFileSync('localbite-toronto-2025-2026.json', 'utf8'));
const v6 = JSON.parse(fs.readFileSync('localbite-toronto-2023-2026.json', 'utf8'));

console.log('Loaded v5:', v5.restaurants.length, 'restaurants,', v5.sources.length, 'sources');
console.log('Loaded v6:', v6.restaurants.length, 'restaurants,', v6.sources.length, 'sources');

// ─── STEP 1: FOODISM CAP — remove 5 weakest single-source Foodism entries ─────

const foodismRemove = new Set([
  'Taverne Bernhardt\'s',
  'Yan Dining Room',
  'Lyla',
  'Morrellina\'s',
  'Sushi Yugen'
]);

const v5restaurants = v5.restaurants.filter(r => {
  if (foodismRemove.has(r.name)) {
    console.log('Foodism cap removal:', r.name);
    return false;
  }
  return true;
});

console.log('After Foodism cap:', v5restaurants.length, 'v5 restaurants');

// ─── STEP 2: BUILD NORMALISED NAME MAP ────────────────────────────────────────

// Manual name variant resolutions
const nameVariants = {
  'sammarco': 'Bisteccheria Sammarco',  // v6 "Sammarco" = v5 "Bisteccheria Sammarco"
  'louf': 'louf',                         // normalise capitalisation — keep lowercase
  'bar prima': 'Bar Prima',
  'danico': 'DaNico',
  'the frederick': 'The Frederick',
  'golden horseshoe barbecue': 'Golden Horseshoe Barbecue',
  'n.l. ginzburg': 'N.L. Ginzburg',
  'oro luxury dining': 'Oro Luxury Dining',
  "zia's place": "Zia's Place",
  'occhiolino': 'Occhiolino',
  'tutto panino': 'Tutto Panino',
  'arbequina': 'Arbequina',
  'liliana': 'Liliana',
  'akin': 'Akin',
  'bar eugenie': 'Bar Eugenie',
};

// Build lookup from normalised name → v5 restaurant
const v5byName = {};
v5restaurants.forEach(r => {
  v5byName[r.name.toLowerCase().trim()] = r;
});

// ─── STEP 3: MERGE SOURCES ARRAYS ─────────────────────────────────────────────

// Remap v6 source IDs to avoid collision with v5 IDs
// v6 sources get prefix "v6-" if their ID already exists in v5
const v5sourceIds = new Set(v5.sources.map(s => s.id));

const v6sourceRemap = {};
const newSources = [];

v6.sources.forEach(s => {
  // Check if this publication already exists in v5 (by publication name)
  const existsInV5 = v5.sources.find(s5 =>
    s5.publication.toLowerCase() === s.publication.toLowerCase() &&
    s5.writer === s.writer
  );
  if (existsInV5) {
    // Map v6 ID to v5 ID — don't add duplicate
    v6sourceRemap[s.id] = existsInV5.id;
    console.log('Source dedup:', s.publication, '→ maps to v5', existsInV5.id);
  } else {
    // New source — add to merged pool, remap ID if collision
    let newId = s.id;
    if (v5sourceIds.has(newId)) {
      newId = 'v6-' + newId;
    }
    v6sourceRemap[s.id] = newId;
    newSources.push({ ...s, id: newId });
    console.log('New source added:', s.publication, '/', s.writer, '→', newId);
  }
});

const mergedSources = [...v5.sources, ...newSources];
console.log('Merged sources:', mergedSources.length, 'total');

// ─── STEP 4: PROCESS V6 RESTAURANTS ──────────────────────────────────────────

// Remap v6 restaurant source IDs
function remapSources(sourceIds) {
  return sourceIds.map(id => v6sourceRemap[id] || id);
}

const v6onlyRestaurants = [];
const overlapUpdates = [];

v6.restaurants.forEach(r6 => {
  const key = r6.name.toLowerCase().trim();
  
  // Check for name variant (e.g. Sammarco → Bisteccheria Sammarco)
  const resolvedName = nameVariants[key];
  const lookupKey = resolvedName ? resolvedName.toLowerCase().trim() : key;
  
  const v5match = v5byName[lookupKey];
  
  if (v5match) {
    // Overlap — merge sources into v5 entry
    const remappedSources = remapSources(r6.sources);
    const newSourceIds = remappedSources.filter(id => !v5match.sources.includes(id));
    if (newSourceIds.length > 0) {
      overlapUpdates.push({ name: v5match.name, addSources: newSourceIds });
      console.log('Overlap merge:', v5match.name, '← adding sources:', newSourceIds);
    }
  } else {
    // V6-only — add to merged pack with remapped sources
    const remapped = { ...r6, sources: remapSources(r6.sources) };
    v6onlyRestaurants.push(remapped);
  }
});

// Apply overlap source merges to v5 restaurants
v5restaurants.forEach(r => {
  const update = overlapUpdates.find(u => u.name === r.name);
  if (update) {
    r.sources = [...r.sources, ...update.addSources];
    r.source_count = r.sources.length;
    // Recalculate language_pool if now multi-source
    if (r.source_count >= 2 && r.language_pool === 'en') {
      r.language_pool = 'multi-source';
    }
  }
});

console.log('V6-only restaurants to add:', v6onlyRestaurants.length);
v6onlyRestaurants.forEach(r => console.log(' +', r.name, '|', r.neighbourhood, '| geocoded:', r.lat !== null));

// ─── STEP 5: ASSEMBLE MERGED RESTAURANT LIST ──────────────────────────────────

const mergedRestaurants = [...v5restaurants, ...v6onlyRestaurants];

// Sort: multi-source first, then by source_count desc, then alphabetical
mergedRestaurants.sort((a, b) => {
  const aMulti = a.language_pool === 'multi-source' ? 0 : 1;
  const bMulti = b.language_pool === 'multi-source' ? 0 : 1;
  if (aMulti !== bMulti) return aMulti - bMulti;
  const aCount = a.source_count || a.sources.length;
  const bCount = b.source_count || b.sources.length;
  if (bCount !== aCount) return bCount - aCount;
  return a.name.localeCompare(b.name);
});

// ─── STEP 6: CALCULATE FINAL STATS ───────────────────────────────────────────

const geocoded = mergedRestaurants.filter(r => r.lat !== null).length;
const tierA = mergedRestaurants.filter(r => r.confidence_tier === 'A').length;
const tierB = mergedRestaurants.filter(r => r.confidence_tier === 'B').length;
const multiSource = mergedRestaurants.filter(r => r.language_pool === 'multi-source').length;
const openCheck = mergedRestaurants.filter(r => r.open_status_check === true).length;

// Foodism final count
const foodismSourceIds = new Set(
  mergedSources.filter(s => s.publication.toLowerCase().includes('foodism')).map(s => s.id)
);
const foodismSingle = mergedRestaurants.filter(r =>
  r.sources.length === 1 && foodismSourceIds.has(r.sources[0])
).length;

console.log('');
console.log('=== MERGE SUMMARY ===');
console.log('Total restaurants:', mergedRestaurants.length);
console.log('Geocoded:', geocoded, '/', mergedRestaurants.length, '(' + Math.round(geocoded/mergedRestaurants.length*100) + '%)');
console.log('Tier A:', tierA, '| Tier B:', tierB);
console.log('Multi-source:', multiSource);
console.log('open_status_check:', openCheck);
console.log('Foodism single-source:', foodismSingle, '/', mergedRestaurants.length, '(' + Math.round(foodismSingle/mergedRestaurants.length*100) + '%)');
console.log('Sources:', mergedSources.length);

// ─── STEP 7: WRITE OUTPUT ─────────────────────────────────────────────────────

const output = {
  city: 'Toronto',
  country: 'Canada',
  city_slug: 'toronto-canada',
  built: new Date().toISOString().split('T')[0],
  source_recency: '2023-2026',
  pipeline: 'localbite-v5v6-merge',
  confidence_tiers: {
    auto_approved: tierA,
    reviewed_kept: tierB,
    user_removed: 0,
    auto_rejected: 0,
    concentration_cap_applied: foodismRemove.size,
    foodism_cap_removals: Array.from(foodismRemove)
  },
  merge_notes: {
    v5_file: 'localbite-toronto-2025-2026.json',
    v6_file: 'localbite-toronto-2023-2026.json',
    v5_restaurants_before_cap: v5.restaurants.length,
    foodism_cap_removals: Array.from(foodismRemove),
    overlaps_merged: overlapUpdates.length,
    v6_only_added: v6onlyRestaurants.length,
    new_sources_added: newSources.map(s => s.publication + ' / ' + s.writer)
  },
  sources: mergedSources,
  restaurants: mergedRestaurants
};

// Write to backup first
fs.writeFileSync('localbite-toronto-2023-2026-merge-backup.json', JSON.stringify(output, null, 2));
console.log('Backup written: localbite-toronto-2023-2026-merge-backup.json');

// Validate before overwriting
const parsed = JSON.parse(JSON.stringify(output));
if (parsed.restaurants.length !== mergedRestaurants.length) {
  console.error('VALIDATION FAILED — restaurant count mismatch. Aborting overwrite.');
  process.exit(1);
}

fs.writeFileSync('localbite-toronto-2023-2026.json', JSON.stringify(output, null, 2));
console.log('Output written: localbite-toronto-2023-2026.json');
console.log('Done.');
