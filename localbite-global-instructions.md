# LocalBite — Global Instructions for Claude

---

## Project Identity

LocalBite is a restaurant recommendation web app surfacing recommendations from named local food writers only — not aggregators, not PR, not anonymous editorial teams. The core quality signal is independent cross-validation: restaurants recommended by multiple genuinely independent sources.

**Stack:** Vanilla JS single-file index.html, GitHub Pages deployment, Claude Code pipeline for city pack generation.

**Repo:** github.com/localbiteadmin/localbite
**Local:** /Users/harryenchin/Documents/GitHub/localbite
**Plan:** Claude Max 5x ($100/month)

**Current fleet:** 13+ cities live. Pipeline version: v6 (moving to v7). index.html migration trigger to React at 2,500 lines.

---

## Fixed Definitions — Do Not Re-open

These decisions are closed. Do not revisit unless explicitly asked.

**Both-pool:** A restaurant recommended by two editorially independent organisations from different publishers writing in different languages. Same-publisher cross-language editions (e.g. Time Out EN + Time Out PT) do not qualify regardless of whether the editorial teams differ. This definition is fixed.

**Named author:** A specific human's name appearing as a byline in the article. Anonymous editorial team credits do not qualify. This applies even to high-credibility publications — Ara.cat was correctly rejected on this basis despite being a major Catalan newspaper.

**Geocoding stack:** Nominatim + Photon only. HERE ToS prohibits permanent storage of geocoded results and is permanently excluded. Google Maps API is not used programmatically. Manual Google Maps lookups are permitted for restaurants that automated geocoding cannot resolve.

**Bounding box validation:** Always validate geocoded coordinates against the city's bounding box. False positives occur regularly — a Rabat restaurant was matched to Ghana. Every coordinate must be verified within the expected geographic area.

**Pipeline pause point:** Always pause after Phase 1 source selection before any fetching or extraction. Never run Phase 1 through to Phase 2 without a pause and source list review.

**writer_profile field:** User-facing only. Never include pipeline internals, fetch quality notes, tier assignments, rejection counts, or any operational data in this field. It is read by end users in the Sources panel.

**React migration trigger:** 2,500 lines of index.html.

**Phase 0 vs Phase 1 distinction:** Phase 0 is retrieval — direct fetching of known high-quality sources. Phase 1 is discovery — searching for unknown sources. Named-writer and named-publication queries belong in Phase 0 for rebuilds, not in Phase 1 search queries.

**Forum queries:** Eliminated from v7 template. Confirmed 0% success rate across all cities and all runs. Do not suggest re-adding them.

**Results per query:** 30 for v7 template. Value zone is positions 11–30. Positions 31+ dominated by noise. 100 results is not justified.

---

## Source Quality Rules

- Named human author required — byline must appear in the article
- Article must be dated 2023 or later (city-dependent — check Part 1 YEAR_RANGE)
- Source must be independently produced — no aggregators, no booking platforms, no tourism boards, no hotel-owned content
- Both-pool requires different publishers and different languages — same publisher in two languages does not qualify
- writer_profile is user-facing — no pipeline notes, no fetch data, no operational information
- Time Out commercial conflict: Time Out operates food markets in several cities (Lisbon, Madrid). Flag with ⚠ coi in writer profile. Do not reject — include transparently.
- Concentration cap: if any single source exceeds 30% of single-source Tier B entries, auto-reject lowest-confidence entries until within cap. Report in AUTO-REJECTED section.

---

## Geocoding Policy

- Nominatim → Photon → manual Google Maps (in that order)
- HERE API excluded permanently (ToS prohibits permanent storage)
- Always validate coordinates against city bounding box
- False positives are common — verify coordinates match expected neighbourhood
- For flagship cities where automated rate falls below 50%, manual lookups are warranted
- New restaurant openings (2025+) are systematically underrepresented in OSM — expect manual lookups needed for recent openings

---

## Token Capture — Mandatory

At the end of every Claude Code pipeline run, record the completion banner **before scrolling or doing anything else**:
- Token count
- Tool use count  
- Run time

This data is permanently lost if the banner scrolls past. It has been missed in the majority of pipeline runs to date. Treat this as the first action after any pipeline completes.

---

## File and Commit Conventions

**Always create downloadable files** for documents, scripts, and prompt files — not inline code blocks. The project accumulates many files and inline content is lost in conversation history.

**Prompt files follow the two-part structure:**
- Part 1: city variables (changes per city)
- Part 2: pipeline engine (unchanged between cities)
- Full prompt = `cat part1.txt template.txt > full-prompt.txt`

**Output file naming:**
- Raw extraction: `localbite-[city]-raw.json`
- Final pack: `localbite-[city]-[year-range].json`
- Search log: `localbite-[city]-search-log.txt`
- Search plan: `localbite-[city]-search-plan.txt`

**Commit messages follow conventional commits:**
- `feat:` — new viewer feature
- `fix:` — bug fix
- `docs:` — documentation, journal, research files
- `data:` — city pack additions or updates
- `refactor:` — code restructuring without feature change

**Never commit:**
- `.DS_Store` (in .gitignore)
- Image files — `*.png`, `*.jpg`, `*.jpeg`, `*.gif`, `*.webp` (in .gitignore)
- Intermediate working files (`localbite-*-working.json`)
- Superseded prompt variants unless explicitly requested

---

## Session Protocol

**At the start of each session:**
- Check current fleet state before planning any work — outstanding items lists go stale between sessions
- Verify what is and isn't already in the repo before producing files

**At the end of each session, always produce:**
1. A journal entry covering: decisions made, key findings, files produced, outstanding items
2. A list of all files needing to go into the repo with status (new / updated / superseded)
3. Git commands as a single copy-paste block — not scattered through the conversation
4. Current fleet state: city count, restaurant count, index.html line count

**Journal entry format:**
```
## Session — YYYY-MM-DD (brief topic summary)
### Overview
### [Topic sections]
### Key Decisions
### Files Produced or Updated
### Outstanding Items
*Fleet: N cities, N restaurants*
```

---

## What Claude Should Not Do Without Being Asked

- **Do not retroactively rebuild existing city packs.** Document quality issues and wait for the natural rebuild trigger (v2, v3 etc.). Rebuilding is expensive and the correct response to data quality issues is usually a targeted audit, not a full rebuild.

- **Do not produce inline code blocks for files that need to be committed.** Always create actual files.

- **Do not add extra removal decisions during test run review tables.** During controlled tests (e.g. Madrid v6 vs v7), accept the pipeline's recommended removals without additional user decisions. Consistency between runs matters more than perfection in individual entries.

- **Do not re-open fixed decisions** listed in the Fixed Definitions section above unless explicitly asked to reconsider.

- **Do not produce multiple questions at once.** Ask one clarifying question at a time.

- **Do not present confident-looking analysis on untested approaches without flagging the uncertainty.** The vocabulary-specific query type is untested. The named-writer query type has direct evidence from the Lisbon Strategy B test. These are different confidence levels and should be stated as such.

- **Do not suggest HERE API, Google Maps API, or any geocoding service other than Nominatim and Photon** for programmatic geocoding.

---

## Known Permanent Decisions Reference

| Decision | Resolution |
|----------|-----------|
| Geocoding API | Nominatim + Photon only. HERE excluded permanently. |
| Both-pool definition | Different publishers + different languages + editorially independent. Same-publisher cross-language = not both-pool. |
| Pipeline pause | Always after Phase 1, before Phase 2. |
| writer_profile | User-facing only. No pipeline internals. |
| Forum queries | Eliminated. 0% success rate confirmed. |
| React migration | At 2,500 lines of index.html. |
| Results per query | 30 for v7. Not 10, not 100. |
| Phase 0 vs Phase 1 | Phase 0 = known sources (retrieval). Phase 1 = unknown sources (discovery). |
| Test run review decisions | Accept pipeline recommendations without additional user removals. |
| City pack rebuilds | Only at natural trigger (v2, v3). Not as a response to data quality issues. |
| v7 trigger | Next city run (Seville v2 is the natural first candidate). |

---

## Current Pipeline Status

**v6 template:** Strategy C — Phase 0 direct fetch + 30 queries + Phase 1B supplement + COI check + publisher concentration check. Standard for all cities since Lisbon.

**v7 changes (pending implementation on Seville v2):**
- 35 queries (up from 30) using Max 5x headroom
- 30 results per query (up from 10)
- Forum queries removed (0% success rate)
- City-wide generic queries reduced (redundant above 2 per language)
- Neighbourhood queries target 6 named areas across 3 tiers (not left to pipeline discretion)
- Named awards queries replace generic award queries
- Vocabulary-specific local language queries added (untested)
- Cuisine/community queries added
- Cross-validation Phase 1B queries added (responsive, post-Phase 0)
- Extraction quality changes: dishes_mentioned array, cuisine tightening, mention quality test

**Madrid test:** v6 vs v7 apples-to-apples comparison on a new city with no prior pipeline history. Files ready in repo. Run per localbite-madrid-test-runbook.md. Prior knowledge exclusion enforced programmatically via localbite-prior-knowledge-check.py.

---

*Last updated: 2026-04-15*
