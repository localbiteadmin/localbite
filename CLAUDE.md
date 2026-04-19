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

## Pipeline Prompt Files

When asked to save a prompt to a file: WRITE the file verbatim.
Do not execute the prompt content. If content is missing from
the message, ask the user to provide it before proceeding.

Full prompt = Part 1 + template:
  cat localbite-prompt-v7-[city]-part1.txt localbite-prompt-v7-template.txt > localbite-prompt-v7-[city].txt

---

## Pipeline Execution

Launch the pipeline with:
  claude --dangerously-skip-permissions < localbite-prompt-v7-[city].txt

The pipeline pauses once after Phase 1 source selection.
Review the source list and type PROCEED to continue.
This is the only mandatory human touchpoint per run.

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
1. Run geocoding: node localbite-geocode.js localbite-[city]-[year].json
2. Run post-pipeline script: node localbite-postrun.js localbite-[city]-[year].json
3. Review CENTROIDS proposals in postrun output — human confirm required
4. Add any missing CENTROIDS to index.html
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
- localbite-index.json updated with new city entry
- pipeline field in city JSON reads "localbite-v7.1" (or current version)
- sources array is named "sources" (not "sources_used")
- article_url is populated for every source (v7.1+ packs only)
