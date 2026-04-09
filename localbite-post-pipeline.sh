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
FILE="localbite-${CITY}-2023-2026.json"

if [ ! -f "$FILE" ]; then
  echo "ERROR: ${FILE} not found — has the pipeline finished?"
  exit 1
fi

echo "=== Post-pipeline: ${CITY} ==="
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
