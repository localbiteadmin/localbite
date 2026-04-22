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
  cat localbite-prompt-v7-[city]-part1.txt localbite-prompt-v7-template.txt > localbite-prompt-v7-[city].txt

---

## Pipeline Execution

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
  node localbite-postrun.js localbite-[city]-2023-2026.json
  node localbite-approve-centroids.js localbite-[city]-2023-2026.json --auto-accept
  git add localbite-[city]-2023-2026.json index.html localbite-index.json
  git commit -m "data: [City] v7.1 -- N restaurants, N sources, N both-pool"
  git push

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

---

## Post-Pipeline Steps (in order)

After every pipeline run:
1. Run post-pipeline script: node localbite-postrun.js localbite-[city]-[year].json
   (geocoding runs automatically as Step 1 inside postrun.js)
2. Run centroid approval: node localbite-approve-centroids.js localbite-[city]-[year].json
   Review each proposed centroid — accept, skip, or enter manually.
   Do NOT commit the city JSON until this step is complete.
3. Verify CITY_CENTRES entry exists for the new city in index.html
4. Verify CITY_BOUNDS entry exists for the new city in index.html
5. Commit all output files

---

## Geocoding Policy

- Stack: Nominatim → Photon only
- HERE API is permanently excluded (ToS prohibits permanent storage)
- Manual lookups are not permitted
- Always add bounding box to CITY_BOXES in localbite-geocode.js
  before running geocoding on a new city
- Spot-check all medium-confidence matches before deployment
- For cities with non-Romance local languages (Basque, Greek,
  Turkish, Japanese etc): review NON_RESTAURANT_PATTERNS in
  localbite-geocode.js and add relevant street/place vocabulary
  before running geocoding

---

## Viewer Deployment Checklist

Before committing a new city as live:
- Every neighbourhood with null-coordinate restaurants is registered
  in the CENTROIDS object in index.html
- City added to CITY_CENTRES in index.html (fallback for null-coord restaurants)
- City added to CITY_BOUNDS in index.html (required for map rendering of centroid markers)
- localbite-index.json updated with new city entry
- pipeline field in city JSON reads "localbite-v7.1" (or current version)
- sources array is named "sources" (not "sources_used")
- article_url is populated for every source (v7.1+ packs only)
