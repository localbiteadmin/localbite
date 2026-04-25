# CLAUDE.md — LocalBite Repo Instructions

This file is read by Claude Code at the start of every session.

---

## Git Workflow

This repo uses HTTPS remotes. Git credentials are not always
available in a Claude Code session.

Before any commit or push:
1. Run `git rev-parse --show-toplevel` to confirm you are inside the repo
2. Run `git remote -v` to confirm the remote is set
3. Run `git status` to confirm only intended files are staged

After committing, tell the user to push manually if credentials
are unavailable. Do not attempt `git push` and fail silently —
report the credential issue explicitly.

Never commit:
- `.DS_Store`
- `*.png`, `*.jpg`, `*.jpeg`, `*.gif`, `*.webp`
- `*-working.json` intermediate pipeline files
- `*-backup.*` backup files
- `*-geocoded-backup.json` geocoding backup files
- `*-geocoding-stats.json` stats files (overwritten each run, not tracked)

⚠ DO NOT run any git commands (git add, git commit, git push) during
the pipeline run. Committing is handled by localbite-postrun.js after
geocoding and validation. Running git commands in the pipeline creates
a wrong commit with missing data.

---

## article_url — Hard Rule (added 2026-04-24)

Do NOT infer, pattern-match, or fabricate `article_url` values from
article titles, publication names, or URL patterns.

The `article_url` field must contain the exact URL confirmed from an
actual successful fetch response during Phase 2 extraction. If the
exact URL was not confirmed from a fetch, set `article_url` to null.

This rule applies even after compaction-reconstruction. When a session
compacts during Phase 2 and reconstructs from transcript, the pipeline
may generate plausible-looking URLs that do not exist. A null
article_url shows a broken link icon in the viewer — this is honest.
A fabricated URL that 404s misleads users who click it and is worse
than null.

If you find yourself constructing a URL from a publication name and
article title after compaction, stop and set null instead.

---

## Geography Disambiguation — Required for Known Toponym Collisions (added 2026-04-24)

Some city names collide with more prominent international toponyms and
cause systematic search result contamination. For affected cities, ALL
search queries must include disambiguation terms.

Known collisions (add new ones as discovered):

**Córdoba** — collides with Córdoba, Argentina.
All queries must include "España", "Spain", or "Andalucía".
Auto-reject any source from .ar domains or Argentine publications
(circuitogastronomico.com, malevamag.com, soldepiedra.com.ar etc.).

**El Ejido** (Málaga neighbourhood) — collides with El Ejido city, Almería.
Queries must specify "El Ejido ciudad Málaga" or "barrio El Ejido Málaga".

Check the Part 1 file for ARGENTINA_DISAMBIGUATION or similar
instructions before running any searches for affected cities. If the
flag is present, it must be applied to every single search query —
not just city-wide queries but also neighbourhood queries.

---

## Single-Author Sites — Named Author Confirmation (added 2026-04-24)

Some sites have the named author on the About page only, not on
individual article headers. This is a legitimate attribution method —
do not reject these sources for missing article-level bylines.

**Confirmed single-author sites:**
- piccavey.com — Molly Piccavey. Byline on About page only.

**Process for single-author sites:**
1. Fetch the About page and confirm the named author
2. Apply the single-author site rule — all articles from that site
   are attributed to that author
3. Do NOT reject the source for missing article-level byline
4. Document in the Part 1 file when this applies

Part 1 files for relevant cities will include a note identifying
single-author sites. If a Part 1 file identifies a source as
single-author, follow the process above before rejecting.

---

## Part 1 Preparation — Mandatory Pre-Steps

Before writing any city's Part 1 file, complete both steps:

### Step A — Neighbourhood research (mandatory)

Do not rely on training knowledge for neighbourhood lists. Training
knowledge is reliable for the top 4-5 tourist-facing areas of
well-documented cities but is unreliable for residential districts
and may be wrong or incomplete for less internationally covered cities.

Required process:
1. Query the city's official district/neighbourhood structure using
   local-language sources (municipal websites, local news, Wikipedia
   in the primary language)
2. Identify population data and dining relevance signals for each district
3. Exclude districts with no meaningful restaurant/bar scene
   (new residential developments, industrial areas, rural barrios)
4. Use the verified list as the basis for TIER_1/2/3 and
   GEOGRAPHIC_BOUNDARY_INCLUDE — not training knowledge

Example query pattern (adapt language):
  "[city] barrios distritos oficiales mapa gastronomia restaurantes"

Document the research basis in a comment in the Part 1 NEIGHBOURHOOD
STRUCTURE section.

### Step B — Secondary source classification (mandatory)

Before finalising SECONDARY_SOURCES in Part 1, consider:

Always secondary (regardless of city):
- Time Out, Conde Nast Traveller, Lonely Planet
- National news outlets covering a city outside their home region
  (e.g. infobae.com covering Zaragoza, El Pais covering a regional city)
- Any outlet whose primary audience is national/international rather
  than the city's own residents

Check per city:
- Local editions of national outlets may qualify as primary if the
  food coverage is written by a locally-based named author
- Regional outlets covering the city as their primary beat are primary

Infobae.com specifically: always secondary for Spanish cities.
It is an Argentine/Spanish national outlet — its restaurant coverage
is visitor/national-audience perspective, not local food writing.
Add to SECONDARY_SOURCES for any Spanish city Part 1.

---

## Pipeline Prompt Files

When asked to save a prompt to a file: WRITE the file verbatim.
Do not execute the prompt content. If content is missing from
the message, ask the user to provide it before proceeding.

Full prompt = Part 1 + template:
  cat localbite-prompt-v71-[city]-part1.txt localbite-prompt-v7-template.txt > localbite-prompt-v71-[city].txt

---

## Pipeline Launch — Correct Method

Open a fresh terminal tab and launch Claude Code without piping:
  cd /Users/harryenchin/Documents/GitHub/localbite
  claude --dangerously-skip-permissions

At the Claude Code prompt, type this instruction:
  Read localbite-prompt-v71-[city]-part1.txt and localbite-prompt-v7-template.txt and run the full pipeline now.

NOTE: Do NOT pipe the prompt file via stdin (< localbite-prompt-v71-[city].txt).
Piping causes Claude Code to read the file and ask "what do you want to do?"
rather than executing it. Launch Claude Code first, then give the instruction.

With PHASE1_AUTO_PROCEED: YES and UNATTENDED_MODE: YES, the pipeline runs
fully unattended. The required human steps after the pipeline completes:

  # Step 1 — geocoding + schema + profiles + centroids + index
  node localbite-postrun.js localbite-[city]-2023-2026.json

  # Step 2 — verify STEP 5.5 captured run_time and tool_uses
  tail -1 localbite-run-metrics.log

  # Step 3 — check for CENTROIDS naming collision before committing
  grep "Casco Antiguo\|Ensanche\|Centro\|Casco Viejo\|Medina" index.html | grep -v "//"

  # Step 4 — review medium-confidence matches; null wrong ones, set geo_skip: true

  # Step 5 — approve centroids (run ALONE — never chain with git commands)
  node localbite-approve-centroids.js localbite-[city]-2023-2026.json --auto-accept

  # Step 6 — verify article_url for all sources (postrun.js warns if missing)
  #          test any URLs that look inferred or generated post-compaction
  python3 -c "
  import json
  d = json.load(open('localbite-[city]-2023-2026.json'))
  sources = d.get('sources', [])
  if isinstance(sources, dict): sources = list(sources.values())
  for s in sources:
      print(s.get('writer'), '|', s.get('article_url'))
  "

  # Step 7 — commit (run AFTER approve-centroids, in a separate command)
  git add localbite-[city]-2023-2026.json index.html localbite-index.json localbite-run-metrics.log
  git commit -m "data: [City] v7.1 -- N restaurants, N sources, N both-pool"
  git push

CRITICAL: Never chain approve-centroids with git commands in the same paste.
The Unicode box-drawing output fills the terminal buffer and git output is lost.
Run approve-centroids alone first, verify it completed, then run git separately.

NOTE: When piping postrun output, redirect to avoid shell parsing issues:
  node localbite-postrun.js [file] > /tmp/out.txt 2>&1 && cat /tmp/out.txt

NOTE: CLAUDE.md is read by Claude Code at startup. Do not add instructions
that could cause Claude Code to refuse to run the pipeline.

---

## Pipeline Resumption After Interruption

If a pipeline run is interrupted by API 500s, rate limits,
or session context loss:
- Resume from the last completed phase — do not restart from scratch
- Phase outputs (OUTPUT_WORKING, OUTPUT_SEARCH_LOG) are append-only
  and idempotent — already-written content is safe
- Report which phase was interrupted and resume from that point

---

## Metrics Log Schema

Every pipeline run must append an entry to localbite-run-metrics.log.
The metrics node command at the end of the template handles this.

Required fields in every metrics entry:
  city, date, pipeline, sources_confirmed, final_entries,
  both_pool, tier_a, tier_b, tier_c, searches_run,
  open_status_check, tokens, input_tokens, output_tokens,
  tool_uses, run_time_seconds

After running the node command, re-read the last line of
localbite-run-metrics.log and confirm all fields are present.
Report any that are null so the user can investigate.

Note: tokens, input_tokens, output_tokens remain null for compacting
runs — this is a permanent Claude Code limitation, not a pipeline bug.
tool_uses and run_time_seconds are captured by postrun.js STEP 5.5
from file timestamps and search log line count.

---

## Post-Pipeline Steps (in order)

After every pipeline run:
1. Run post-pipeline script:
   node localbite-postrun.js localbite-[city]-[year].json
   (geocoding runs automatically as Step 1 inside postrun.js)

2. Verify STEP 5.5 fired and captured metrics:
   tail -1 localbite-run-metrics.log
   Check that run_time_seconds and tool_uses are not null.
   If null, STEP 5.5 city matching failed — report the mismatch.

3. Check for CENTROIDS naming collision:
   grep "Casco Antiguo\|Ensanche\|Centro\|Casco Viejo\|Medina" index.html | grep -v "//"
   If the city's neighbourhood names already appear in CENTROIDS,
   do not proceed — the collision must be resolved first.

4. Run centroid approval (ALONE — never chain with git):
   node localbite-approve-centroids.js localbite-[city]-[year].json --auto-accept
   Do NOT commit the city JSON until this step is complete.

5. Verify article_url for all sources (added 2026-04-24):
   python3 -c "
   import json
   d = json.load(open('localbite-[city]-2023-2026.json'))
   sources = d.get('sources', [])
   if isinstance(sources, dict): sources = list(sources.values())
   for s in sources:
       print(s.get('writer'), '|', s.get('article_url'))
   "
   Test any URL that looks like it was inferred from an article title
   or publication pattern (especially after a compacting run). If it
   404s, null it and recommit.

6. Commit all output files (separate command from step 4):
   git add localbite-[city]-2023-2026.json index.html localbite-index.json localbite-run-metrics.log
   git commit -m "data: [City] v7.1 -- N restaurants, N sources, N both-pool"
   git push

---

## Geocoding Policy

- Stack: Nominatim → Photon only
- HERE API is permanently excluded (ToS prohibits permanent storage)
- Manual lookups are not permitted
- Always add bounding box to CITY_BOXES in localbite-geocode.js
  before running geocoding on a new city — add both accented and
  unaccented variants for cities with special characters (e.g. both
  'Malaga' and 'Málaga', 'Cordoba' and 'Córdoba', 'Logrono' and 'Logroño')
- When adding a new accented city to CITY_BOXES, always add both variants
  in the same commit — the geocoder lookup is case-insensitive but does
  not strip accents (fixed 2026-04-24)
- geo_skip: true is automatically set by geocode.js for restaurants
  not found by either geocoder after the first postrun run — these
  will not be re-geocoded on subsequent runs
- Spot-check all medium-confidence matches before deployment:
  medium confidence with a named match shows a solid pin (correct)
  medium confidence with no named match (geo_matched_name null)
  shows a hollow pin and should be nulled with geo_skip: true set
- When nulling a geocoded restaurant that was the sole contributor
  to a neighbourhood centroid, also remove that centroid from the JSON
  (added 2026-04-24)
- For cities with non-Romance local languages (Basque, Greek,
  Turkish, Japanese etc): review NON_RESTAURANT_PATTERNS in
  localbite-geocode.js and add relevant street/place vocabulary
  before running geocoding

---

## CENTROIDS Naming Collision — Known Architectural Issue

The CENTROIDS object in index.html uses bare neighbourhood names as
keys. Multiple cities share neighbourhood names (Casco Antiguo,
Ensanche, Centro, Casco Viejo, Medina). This causes silent data
corruption — a new city's centroid overwrites an existing city's
entry.

Before committing any new city:
1. Check whether any of the new city's neighbourhood names already
   exist as keys in CENTROIDS
2. If a collision exists, do NOT add the centroid — report to user
3. The architectural fix (city-qualified keys, e.g.
   'logrono-spain:Casco Antiguo') is pending and must be applied
   before batch runs

Currently affected: Casco Antiguo (Seville/Pamplona/Logrono),
Ensanche (Bilbao/Pamplona/Logrono/Zaragoza), Centro Historico
(Seville/Cordoba), Medina (Fes/Marrakesh/Rabat).

Note: v7.1 cities store centroids in the city JSON file and do not
use the global CENTROIDS dict — this collision only affects old
pipeline cities. The issue is self-eliminating as cities are rebuilt
to v7.1.

---

## Viewer Deployment Checklist

Before committing a new city as live:
- Every neighbourhood with null-coordinate restaurants is registered
  in the CENTROIDS object in index.html (subject to collision check above)
- City added to CITY_CENTRES in index.html (auto-added by postrun.js STEP 4)
- City added to CITY_BOUNDS in index.html (auto-added by postrun.js STEP 4)
- localbite-index.json updated with new city entry (auto-updated by postrun.js STEP 3)
- pipeline field in city JSON reads "localbite-v7.1" (or current version)
- sources array is named "sources" (not "sources_used")
- article_url verified for every source — test each URL; null any that
  404 or were inferred post-compaction (added 2026-04-24)
- STEP 5.5 metrics entry verified (tail -1 localbite-run-metrics.log)
