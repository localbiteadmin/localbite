#!/bin/bash
set -e
if [ -z "$1" ]; then
  echo "Usage: bash localbite-commit.sh <city-slug>"
  exit 1
fi
CITY=$1
MSG=${2:-"Add ${CITY} city pack (v6, $(date +%Y-%m-%d))"}
echo "Committing files for: ${CITY}"
for file in \
  "localbite-${CITY}-2023-2026.json" \
  "localbite-${CITY}-raw.json" \
  "localbite-${CITY}-audit.txt" \
  "localbite-${CITY}-search-log.txt" \
  "localbite-${CITY}-search-plan.txt" \
  "localbite-${CITY}-failed-sources.txt" \
  "localbite-${CITY}-working.json" \
  "localbite-${CITY}-2023-2026-geocoded-backup.json" \
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
