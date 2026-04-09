#!/usr/bin/env node
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
