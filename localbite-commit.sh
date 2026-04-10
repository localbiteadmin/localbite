#!/bin/bash
set -e
if [ -z "$1" ]; then
  echo "Usage: bash localbite-commit.sh <city-slug>"
  exit 1
fi
CITY=$1
MSG=${2:-"Add ${CITY} city pack (v6, $(date +%Y-%m-%d))"}

# Auto-detect year range
if [ -f "localbite-${CITY}-2023-2026.json" ]; then
  YEAR_RANGE="2023-2026"
elif [ -f "localbite-${CITY}-2025-2026.json" ]; then
  YEAR_RANGE="2025-2026"
else
  YEAR_RANGE="2025-2026"
  echo "WARNING: No city JSON found — defaulting to ${YEAR_RANGE}"
fi
echo "Committing files for: ${CITY}"
for file in \
  "localbite-${CITY}-${YEAR_RANGE}.json" \
  "localbite-${CITY}-raw.json" \
  "localbite-${CITY}-audit.txt" \
  "localbite-${CITY}-search-log.txt" \
  "localbite-${CITY}-search-plan.txt" \
  "localbite-${CITY}-failed-sources.txt" \
  "localbite-${CITY}-working.json" \
  "localbite-${CITY}-${YEAR_RANGE}-geocoded-backup.json" \
  "localbite-${CITY}-geocoding-stats-c1.json" \
  "localbite-prompt-v6-${CITY}.txt" \
  "localbite-index.json" \
  "index.html"; do
  if [ -f "$file" ]; then
    git add "$file"
    echo "  staged: $file"
  fi
done
git commit -m "$MSG"
git push
echo "Done — ${CITY} committed and pushed."
