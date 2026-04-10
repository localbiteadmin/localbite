#!/bin/bash
# localbite-post-pipeline.sh — run all post-pipeline steps for a city
# Usage: bash localbite-post-pipeline.sh seville

set -e

if [ -z "$1" ]; then
  echo "Usage: bash localbite-post-pipeline.sh <city-slug>"
  echo "Example: bash localbite-post-pipeline.sh seville"
  exit 1
fi

CITY=$1

# Auto-detect year range — Spanish cities use 2023-2026, others use 2025-2026
if [ -f "localbite-${CITY}-2023-2026.json" ]; then
  YEAR_RANGE="2023-2026"
elif [ -f "localbite-${CITY}-2025-2026.json" ]; then
  YEAR_RANGE="2025-2026"
else
  echo "ERROR: No city JSON found for ${CITY} — has the pipeline finished?"
  exit 1
fi
FILE="localbite-${CITY}-${YEAR_RANGE}.json"
echo "Using: ${FILE}"

echo "=== Post-pipeline: ${CITY} ==="
echo ""

echo "Step 0 — JSON validation..."
node -e "
  const fs = require('fs');
  const raw = fs.readFileSync('${FILE}', 'utf8');
  try {
    const data = JSON.parse(raw);
    console.log('✓ JSON valid — ' + data.restaurants.length + ' restaurants');
  } catch(e) {
    console.error('ERROR: Invalid JSON in ${FILE}');
    console.error(e.message);
    process.exit(1);
  }
"
echo ""

echo "Step 1 — Geocoding..."
node localbite-geocode.js "$FILE"
echo ""

echo "Step 2 — Viewer update (centroids + CITY_BOUNDS)..."
node localbite-viewer-update.js "$FILE"
echo ""

echo "Step 3 — Index update..."
node localbite-index-update.js "$FILE"
echo ""

echo "Step 4 — Commit and push..."
bash localbite-commit.sh "$CITY"
echo ""

echo "=== ${CITY} complete ==="
