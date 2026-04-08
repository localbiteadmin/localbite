# LocalBite — Automation Backlog
## Created: 2026-04-08

---

## Context

The first v6 pipeline run (Barcelona, 2026-04-08) revealed that the current
process is "manual pipeline run with automated assistance" — not true batch
processing. Every post-pipeline step required human intervention. This
document captures all automation work needed to make batch processing
genuinely unattended.

---

## Priority 1 — Must build before next batch run

### A. Git SSH credentials
**What:** Configure SSH instead of HTTPS so `git push` works from Terminal
without credential prompts. Currently every push requires GitHub Desktop.
**How:**
```bash
ssh-keygen -t ed25519 -C "localbiteadmin@github.com"
cat ~/.ssh/id_ed25519.pub  # add this to GitHub Settings → SSH Keys
git remote set-url origin git@github.com:localbiteadmin/localbite.git
git push  # should now work without credentials
```
**Effort:** 10 minutes
**Impact:** Removes push friction from every single session permanently.
Enables fully terminal-based workflow with no GitHub Desktop dependency.

---

### B. False positive auto-detection in localbite-geocode.js
**What:** The geocoding script currently flags medium-confidence matches for
human review but cannot detect obvious false positives automatically. Today
we manually identified 6 false positives (train station, park, street name,
square, neighbourhood name, plaza) that required human knowledge of Barcelona
geography.
**How:** Add a `NON_RESTAURANT_PATTERNS` list to the script. Any match whose
`geo_matched_name` contains these patterns is auto-nulled rather than flagged
as medium confidence:
```javascript
const NON_RESTAURANT_PATTERNS = [
  /^Carrer de /i,        // streets
  /^Plaça de /i,         // squares/plazas
  /^Jardins de /i,       // parks/gardens
  /^Estació/i,           // train/bus stations
  /\bstation\b/i,        // stations in English
  /\bairport\b/i,        // airports
  /^Parc /i,             // parks
  /^Avinguda /i,         // avenues (usually not restaurants)
  /^Passeig de /i,       // promenades
  /\bLine\b/i,           // metro/train lines
  /\bMetro\b/i,          // metro stations
  /\bUniversitat\b/i,    // universities
  /\bHospital\b/i,       // hospitals
  /\bMercat\b.*\bde\b/i, // markets (as buildings, not restaurant markets)
];
```
Any match whose name is just the neighbourhood name itself (exact match to
the neighbourhood field) should also be auto-nulled.
**Effort:** 1 hour
**Impact:** Removes the most error-prone manual geocoding step. Reduces
human review of geocoding output from ~20 items to ~5.

---

### C. localbite-viewer-update.js (new script)
**What:** Currently after each city run, the following viewer update steps
are done manually: check if neighbourhood centroids exist, identify missing
ones, add them to index.html CENTROIDS object, check CITY_BOUNDS, check
CITY_PROXIMITY/proximity radius. For Barcelona today this required 4
separate manual investigations and a Claude Code session.
**How:** New Node.js script that takes a city JSON file and:
1. Reads GEOGRAPHIC_BOUNDARY_INCLUDE neighbourhood list from the JSON
2. Geocodes each neighbourhood name via Nominatim (e.g. "Gràcia Barcelona")
3. Checks if each neighbourhood already exists in index.html CENTROIDS
4. Adds any missing ones to the CENTROIDS object in index.html
5. Checks if city exists in CITY_BOUNDS — adds if missing using bounding box
   from the geocoding script's existing BOUNDING_BOXES config
6. Logs all changes made

```bash
node localbite-viewer-update.js localbite-barcelona-2023-2026.json
# Output:
# Checking 19 neighbourhoods for Barcelona...
# Added 7 missing centroids to index.html
# CITY_BOUNDS: Barcelona already present
# Done.
```

**Effort:** 2–3 hours
**Impact:** Removes all viewer update manual steps. Makes Stage 4 of the
definition of done a single command.

---

### D. localbite-index-update.js (new script)
**What:** After each city run, localbite-index.json is manually updated with
restaurant count, both-pool count, source count, pipeline version, built
date. Today this required instructing Claude Code with specific numbers.
Prone to human error (wrong counts, wrong dates).
**How:** New Node.js script that reads the city JSON and updates
localbite-index.json automatically:
```bash
node localbite-index-update.js localbite-barcelona-2023-2026.json
# Reads: city, country, city_slug, built date, restaurant count,
#        both_pool count, source count, pipeline version from JSON
# Updates or adds the corresponding entry in localbite-index.json
# Output:
# Updated Barcelona in localbite-index.json
# restaurant_count: 86, both_pool_count: 10, source_count: 9
# pipeline: localbite-v6, built: 2026-04-08
```
**Effort:** 30 minutes
**Impact:** Removes manual index update step. Guarantees counts match the
actual JSON rather than human memory.

---

## Priority 2 — Build after first successful batch run

### E. Batch mode flag for pipeline (no review pause)
**What:** The v6 prompt currently pauses at the end for human review of the
full restaurant table. For batch processing of cities 3+ (after v6 is
validated), this pause should be optional. A `--batch` or `--no-review` mode
would auto-accept all entries and export directly.
**How:** Add a `BATCH_MODE` flag to Part 1:
```
BATCH_MODE: YES  # or NO (default)
```
In Phase 3 Step 4, add: "If BATCH_MODE is YES, skip the review table and
proceed directly to Step 5 export. Log all Tier A and Tier B entries to
OUTPUT_FINAL without presenting the review table."
**Effort:** 1 hour (prompt change only — no code)
**Impact:** Makes pipeline truly unattended for validated city types.
**Caveat:** Only enable after v6 has been validated on 2–3 cities. Human
review is valuable while the prompt is being calibrated. For the first batch
(Barcelona, Valencia, Seville), keep review enabled.

---

### F. Batch orchestration shell script
**What:** A shell script that runs the full pipeline → geocode → viewer
update → index update → commit sequence for multiple cities without manual
intervention between steps.
**How:**
```bash
#!/bin/bash
# localbite-batch.sh
# Usage: ./localbite-batch.sh barcelona valencia seville

for city in "$@"; do
  echo "=== Processing $city ==="

  # Concatenate Part 1 + template
  cat localbite-prompt-v6-${city}-part1.txt \
      localbite-prompt-v6-template.txt \
      > localbite-prompt-v6-${city}.txt

  # Run pipeline (unattended, batch mode)
  claude --dangerously-skip-permissions \
         < localbite-prompt-v6-${city}.txt

  # Geocode
  node localbite-geocode.js localbite-${city}-2023-2026.json

  # Update viewer
  node localbite-viewer-update.js localbite-${city}-2023-2026.json

  # Update index
  node localbite-index-update.js localbite-${city}-2023-2026.json

  # Commit
  git add localbite-${city}-2023-2026.json \
          localbite-${city}-raw.json \
          localbite-${city}-audit.txt \
          localbite-${city}-search-log.txt \
          localbite-${city}-search-plan.txt \
          localbite-${city}-failed-sources.txt \
          localbite-index.json \
          index.html
  git commit -m "Add ${city} city pack (batch run $(date +%Y-%m-%d))"
  git push

  echo "=== $city complete ==="
done
```
**Effort:** 2 hours (after A–E are built)
**Impact:** True batch processing — run 3 cities overnight, wake up to 3
new city packs live.
**Depends on:** A (SSH credentials), B (false positive detection), C
(viewer update script), D (index update script), E (batch mode flag)

---

### G. open_status_check verification script
**What:** Restaurants from 2023–2024 sources are flagged with
`open_status_check: true`. Currently this is verified manually. A script
could automate most of it.
**How:** Script reads the city JSON, finds all `open_status_check: true`
entries, runs a web search for each (`[name] [city] closed 2025`) via the
Anthropic API, and reports:
- Confirmed open (found recent review or social media)
- Confirmed closed (found closure announcement)
- Unknown (inconclusive — needs human check)
**Effort:** 2–3 hours
**Impact:** Reduces Stage 2 verification from manual lookups to reviewing
a report. Most restaurants will be "Unknown" (inconclusive) but confirmed
closures are automatically removed.
**Note:** Uses Anthropic API tokens. Run once per city, not in the main
pipeline.

---

## Priority 3 — Post-batch product work

### H. localbite-city-setup.js (city variables generator)
**What:** Currently Part 1 city variables are written manually for each new
city. For a city with no prior research, this requires knowing the
neighbourhood names, publications, price levels, etc.
**How:** Script that takes city name + country + city type and:
1. Queries OSM Overpass API for administrative neighbourhood boundaries
2. Generates GEOGRAPHIC_BOUNDARY_INCLUDE list automatically
3. Sets price levels by country (EUR for Spain/Portugal, MAD for Morocco etc)
4. Sets PROXIMITY_RADIUS_KM by city type
5. Writes a Part 1 template file ready to review and supplement
```bash
node localbite-city-setup.js "Porto" "Portugal" european_minor
# Writes: localbite-prompt-v6-porto-part1.txt
# Human reviews and adds: SOURCE_EXAMPLES, DIRECT_FETCH_SOURCES,
#                         KNOWN_COMMERCIAL_CONFLICTS, KNOWN_PROBLEMATIC_URLS
```
**Effort:** 3–4 hours
**Impact:** Reduces city setup from 30–60 minutes of research to 5 minutes
of review. The most important automation for scaling to 20+ cities.

---

### I. Publication registry (localbite-publication-registry.json)
**What:** Known publications discovered across all city runs are currently
not recorded anywhere. Each new city run starts from zero knowledge of local
publications.
**How:** JSON file keyed by city/country with known publications, writers,
URLs, language, quality notes:
```json
{
  "barcelona-spain": {
    "primary_en": [
      {"publication": "Barcelona Food Experience", "url": "barcelonafoodexperience.com",
       "writer": "Maria", "notes": "Active, confirmed 2026"}
    ],
    "primary_es": [...],
    "primary_ca": [...]
  }
}
```
Updated after each city run. Used by localbite-city-setup.js to pre-populate
DIRECT_FETCH_SOURCES and SOURCE_EXAMPLES.
**Effort:** 1 hour to create structure + ongoing maintenance
**Impact:** Compounds over time — each city run makes the next nearby city
run faster and more accurate.

---

### J. Firecrawl integration as Jina fallback
**What:** Jina fails on JS-rendered sites. Firecrawl renders JavaScript and
handles more sites successfully. Adding as Phase 2 fallback would recover
some of the fetch failures that currently go to OUTPUT_FAILED_SOURCES.
**How:** In Phase 2 retry logic, after Retry 2 (60s wait) fails, attempt
once via Firecrawl API before marking as permanent failure:
```
RETRY 3 — Firecrawl fallback (JS-rendered sites only):
POST https://api.firecrawl.dev/v1/scrape
{ url: [URL], formats: ['markdown'] }
If returns 3,000+ chars: proceed with extraction.
If fails: mark as fetch_status: "failed", log to OUTPUT_FAILED_SOURCES.
```
Firecrawl free tier: 500 pages/month — enough for 5–6 cities.
**Effort:** 1–2 hours (prompt change + API key setup)
**Impact:** Recovers Guía Repsol and other JS-heavy sources that currently
fail. May add 5–10 restaurants per city from previously inaccessible sources.

---

## Summary — Sequencing

### Before running Valencia and Seville:
1. **A** — Git SSH (10 min) — do immediately
2. **B** — False positive detection in geocode.js (1 hour)
3. **C** — localbite-viewer-update.js (2–3 hours)
4. **D** — localbite-index-update.js (30 min)

### After Valencia and Seville are live:
5. **E** — Batch mode flag in prompt (1 hour)
6. **F** — Batch orchestration script (2 hours)
7. **G** — open_status_check verification script (2–3 hours)

### Post-batch product work:
8. **H** — localbite-city-setup.js (3–4 hours)
9. **I** — Publication registry (1 hour + ongoing)
10. **J** — Firecrawl integration (1–2 hours)

---

## Total estimated effort

| Phase | Items | Estimated hours |
|---|---|---|
| Before Valencia/Seville | A, B, C, D | ~5 hours |
| After first batch | E, F, G | ~5 hours |
| Post-batch product | H, I, J | ~6 hours |
| **Total** | | **~16 hours** |

---

## Notes from Barcelona v6 run (2026-04-08)

- Pipeline: 158.4k tokens, 117 tool uses, 36m 51s
- Export: 68.4k tokens, 15 tool uses, 8m 4s
- Total: 226.8k tokens, ~45 minutes
- Geocoding: 69% automated (59/86), 6 false positives manually cleared
- Viewer updates: 7 missing centroids added manually, 1 static caveat bug fixed
- Template gaps found and fixed: 12
- Stopping rule fired at query 34 of planned 56 — well-documented city
- Both-pool signal: 10 genuine cross-publisher pairs (strict v6 definition)
- New sources vs v4: Culinary Backstreets, Gastronosfera, In and Out Barcelona
