#!/bin/bash
# localbite-pre-geocode-check.sh
# Run before geocoding any city to confirm the geocoder is ready
# Usage: bash localbite-pre-geocode-check.sh [city-json-file]
# Example: bash localbite-pre-geocode-check.sh localbite-lisbon-2025-2026.json

FILE=$1

if [ -z "$FILE" ]; then
  echo "Usage: bash localbite-pre-geocode-check.sh [city-json-file]"
  exit 1
fi

echo ""
echo "=== Pre-geocode check: $FILE ==="
echo ""

# 1. Confirm the JSON file exists
if [ ! -f "$FILE" ]; then
  echo "❌ File not found: $FILE"
  exit 1
fi
echo "✓ File exists: $FILE"

# 2. Confirm JSON is valid
node -e "JSON.parse(require('fs').readFileSync('$FILE','utf8'))" 2>/dev/null
if [ $? -ne 0 ]; then
  echo "❌ JSON is invalid — run node -e \"JSON.parse(...)\" to see error"
  exit 1
fi
echo "✓ JSON is valid"

# 3. Show city/country (top-level and meta)
echo ""
echo "--- City/country field locations ---"
node -e "
const d = JSON.parse(require('fs').readFileSync('$FILE','utf8'));
console.log('Top-level city:', d.city || '(not present)');
console.log('Top-level country:', d.country || '(not present)');
if (d.meta) {
  console.log('meta.city:', d.meta.city || '(not present)');
  console.log('meta.country:', d.meta.country || '(not present)');
} else {
  console.log('meta: (not present)');
}
const city = d.city || (d.meta && d.meta.city);
const country = d.country || (d.meta && d.meta.country);
console.log('');
console.log('Resolved city for geocoder:', city);
console.log('Resolved country for geocoder:', country);
"

# 4. Show restaurant count
echo ""
node -e "
const d = JSON.parse(require('fs').readFileSync('$FILE','utf8'));
const n = d.restaurants.length;
const nullCoords = d.restaurants.filter(r => r.lat === null).length;
console.log('Restaurants:', n);
console.log('Already geocoded:', n - nullCoords);
console.log('Null coordinates (will be geocoded):', nullCoords);
"

# 5. Check if city is in CITY_BOXES in geocoder
echo ""
echo "--- Bounding box check ---"
node -e "
const d = JSON.parse(require('fs').readFileSync('$FILE','utf8'));
const city = d.city || (d.meta && d.meta.city);
const geocoder = require('fs').readFileSync('localbite-geocode.js','utf8');
if (geocoder.includes(\"'\" + city + \"'\")) {
  console.log('✓ City found in geocoder CITY_BOXES:', city);
} else {
  console.log('❌ City NOT found in geocoder CITY_BOXES:', city);
  console.log('  Add this entry to CITY_BOXES in localbite-geocode.js before running');
}
"

# 6. Show neighbourhood list
echo ""
echo "--- Neighbourhoods in this file ---"
node -e "
const d = JSON.parse(require('fs').readFileSync('$FILE','utf8'));
const nbs = [...new Set(d.restaurants.map(r => r.neighbourhood).filter(Boolean))].sort();
console.log(nbs.join('\n'));
console.log('');
console.log('Total unique neighbourhoods:', nbs.length);
console.log('Restaurants with null neighbourhood:', d.restaurants.filter(r => !r.neighbourhood).length);
"

echo ""
echo "=== Check complete ==="
echo ""
echo "If all items show ✓, run: node localbite-geocode.js $FILE"
echo "If bounding box shows ❌, add CITY_BOXES entry first (see journal for format)"
