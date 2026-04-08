## Session — 2026-04-08 (Barcelona v6 Pipeline + Batch Design + Template Fixes)

### Overview

Long session covering: batch processing design and gap analysis, v6 prompt template creation, Barcelona v6 pipeline run (first v6 run ever), geocoding, viewer fixes, and automation backlog creation. Barcelona v6 is now live with 86 restaurants.

---

### Batch Processing Design

Full review of pipeline issues and 12 considerations for batch processing conducted. Key decisions made:

**Cities confirmed for first test batch:** Barcelona, Valencia, Seville (all rebuilt from scratch with v6)
**Decision:** Barcelona and Valencia v4 packs stay live until v6 replacements are ready
**Decision:** No manual geocoding — automated only; null coordinates = list-only display, no centroid pins on map (future viewer change)
**Decision:** Content window expanded from 2025–2026 to 2023–2026 (pre-2025 sources flagged with open_status_check)

**12 considerations discussed:**
1. Search improvement — neighbourhood-complete approach, expanded years, stopping rule
2. No manual geocoding — automation only policy
3. QA with two-tier retry (30s + 60s) built into Phase 2
4. City setup automation — OSM Overpass for neighbourhoods (post-batch)
5. Two-step country/city dropdown (post-batch)
6. Auto-removals with audit report — Tier C auto-applied; Tier B recommended shown to human for first batch runs
7. Domain name (post-batch)
8. Publication discovery — publication registry planned (post-batch)
9. Model/plan — stay on Sonnet, Max 5x; fresh Claude Code session per city
10. Jina alternatives — Firecrawl as fallback (post-batch)
11. City-specific automation — CITY_TYPE, PROXIMITY_RADIUS_KM, city setup script
12. Sequencing — some items pre-batch, some post-batch

---

### v6 Prompt Template — Created and Fixed

**Files created:**
- `localbite-prompt-v6-template.txt` — production Part 2 engine
- `localbite-prompt-v6-barcelona-part1.txt`
- `localbite-prompt-v6-valencia-part1.txt`
- `localbite-prompt-v6-seville-part1.txt`

**Key v6 changes from v5:**
- Content window 2023–2026 (was 2025–2026 only)
- Neighbourhood-complete search: Part A (one query per neighbourhood per language) + Part B (14 cross-cutting angles)
- Stopping rule: 8 consecutive queries with no new sources → stop; soft ceiling 55
- Two-tier retry: 30s wait retry 1, 60s wait retry 2, then permanent failure
- Both-pool strict definition: same-publisher cross-language editions excluded
- Traceability check (anti-fabrication)
- Writer profile rule: user-facing only, no pipeline notes ever
- Auto-apply Tier C; show Tier B recommended removals for human review (first batch)
- PROXIMITY_RADIUS_KM field in Part 1 with defaults by CITY_TYPE
- New outputs: OUTPUT_FAILED_SOURCES, OUTPUT_AUDIT

**12 gaps fixed after Barcelona run:**
1. CITY_TYPE — added definitions and note it's metadata-only currently
2. SOURCE_EXAMPLES — added cap of 4 per language tier
3. Stopping rule — clarified "new SOURCES" not just "new results"; added precedence note over neighbourhood completeness
4. Diversity gate — fixed trigger from "30 searches" to "after all planned searches"
5. Diversity gate — clarified multilingual requirement needs ALL language pools
6. Publisher concentration — now catches same-publisher multi-writer scenarios (NBP issue)
7. open_status_check — removed closure searches from Phase 3, deferred to post-pipeline Stage 2
8. AUTO-APPLY — changed to show Tier B recommended removals for human review for first batch
9. retries_attempted — changed from boolean to integer (0/1/2)
10. source_tier — now applies to all city types not just single-language
11. Token tracking — added mandatory token/tool/time recording before review table
12. FINAL SUMMARY — fixed "before review table" wording contradiction

---

### Barcelona v6 Pipeline Run

**Prompt:** `localbite-prompt-v6-barcelona.txt` (Part 1 + Part 2 concatenated)
**Command:** `claude --dangerously-skip-permissions < localbite-prompt-v6-barcelona.txt`

**Performance metrics:**
- Pipeline: 158.4k tokens · 117 tool uses · 36m 51s
- Export: 68.4k tokens · 15 tool uses · 8m 4s
- Total: 226.8k tokens · 132 tool uses · ~45 minutes
- Queries run: 56 (stopping rule fired at query 34)
- Stopping rule: triggered — last 8 queries returned only known sources

**Sources (9 total, all fetched successfully — zero failures):**

| Publication | Writer | Language | Type | COI |
|-------------|--------|----------|------|-----|
| Barcelona Food Experience | Maria | EN | Primary | No |
| Beteve.cat | Carmen Cortés Vidal | CA | Primary | No |
| Culinary Backstreets | Paula Mourenza | EN | Primary | No |
| Gastronosfera | Eric Morgado | ES | Primary | No |
| The New Barcelona Post | Anna Torrents | ES | Primary | No |
| The New Barcelona Post | P. Ribot | ES | Primary | No |
| In and Out Barcelona | Stefania Talento | ES | Primary | No |
| Guía Repsol | Lourdes López | ES | Primary | ⚠ coi |
| ElNacional.cat | Jordi Tubella | CA | Primary | No |

**Note:** The New Barcelona Post contributed two articles (different writers). Publisher concentration check should have flagged this — identified as gap, fixed in template (New Gap A).

**New sources vs v4:** Culinary Backstreets, Gastronosfera, In and Out Barcelona — all genuinely independent voices not in previous packs.

**Confidence tier breakdown:**
- Tier A (auto-approved): 13 — 10 both-pool + 3 multi-source same language
- Tier B (reviewed): 73
- Tier C auto-rejected: 15 (quote failures + concentration cap)
- Auto-removed (recommended): 0
- User removed: 0
- Final pack: 86 restaurants

**Both-pool entries (10 — all verified legitimate cross-publisher pairs):**

| Restaurant | Source A | Source B | Pool |
|------------|----------|----------|------|
| Besta | BFE (EN) | TNBP/Torrents (ES) | EN + ES |
| Franca | BFE (EN) | TNBP/Torrents (ES) | EN + ES |
| Bar Alegría | BFE (EN) | Guía Repsol (ES) ⚠ coi | EN + ES |
| La Cova Fumada | BFE (EN) | Beteve (CA) | EN + CA |
| Tapas 24 | BFE (EN) | Beteve (CA) | EN + CA |
| Bar Cañete | BFE (EN) | Beteve (CA) | EN + CA |
| Fino Bar | BFE (EN) | Beteve (CA) | EN + CA |
| Fukamura | Beteve (CA) | TNBP/Torrents (ES) | CA + ES |
| Sophie Kai | Beteve (CA) | TNBP/Ribot (ES) | CA + ES |
| Bornès | TNBP/Torrents (ES) | Beteve (CA) | ES + CA |

**Concentration cap:** BFE had 44% of pool; 9 lowest-confidence entries auto-rejected to bring to ~28%.

**COI flagged:** Guía Repsol — affects Bar Alegría, Trü, Barra Oso, Barra M.

**open_status_check:** 11 restaurants from Dec 2024 sources — not yet verified, flagged for Stage 2.

---

### Geocoding — Barcelona

**Script:** `localbite-geocode.js` (now writes in place, backup to -geocoded-backup.json)
**Bounding box:** lat 41.2–41.6, lng 1.9–2.4

| Method | Count |
|--------|-------|
| Nominatim (high confidence) | 41 |
| Photon (medium confidence) | 18 |
| Not found | 27 |
| **Automated total** | **59/86 (69%)** |

**6 false positives manually cleared** (Photon/Nominatim matched non-restaurants):
- Franca → Barcelona-Estació de França (train station)
- Bar Remedios → Jardins de Remedios Varo (park)
- La Bodegueta de Sant Andreu → outside bounding box
- Arraval → neighbourhood name (el Raval)
- Bar Veracruz → Plaça de Veracruz (square)
- Barra M → Carrer de la Barra de Ferro (street)

**Final geocoding state:**
- High confidence (solid pins): 41
- Medium confidence (hollow pins): 12
- Null (list-only): 33

**Key finding:** False positive detection needs automation — 6 of 18 medium-confidence matches were non-restaurants (streets, parks, stations, squares). Documented in automation backlog as Item B.

---

### Viewer Updates

**index.html changes:**
- 7 missing Barcelona neighbourhood centroids added: El Barri Gòtic, Sants, Montjuïc, Fort Pienc, Nou Barris, Sant Andreu, Camp de l'Arpa
- Static hardcoded map caveat div hidden (was overriding dynamic caveat logic — showed "approximate locations" for all restaurants including high-confidence ones)

**localbite-index.json changes:**
- Barcelona entry updated: pipeline v4 → v6, count 52 → 86, both_pool 14 → 10, file 2025-2026 → 2023-2026
- last_updated: 2026-03-27 → 2026-04-08

**CITY_BOUNDS check:** Barcelona already present in proximity feature — no changes needed.

**geo_matched_name check:** Not rendered in viewer — no action needed.

---

### Automation Backlog Created

Full automation backlog documented in `localbite-automation-backlog.md` (10 items, ~16 hours estimated).

**Priority 1 — Before Valencia/Seville (~5 hours):**
- A: Git SSH credentials (10 min) — deferred to next session
- B: False positive detection in geocode.js (1 hour)
- C: localbite-viewer-update.js (2–3 hours)
- D: localbite-index-update.js (30 min)

**Priority 2 — After first batch (~5 hours):**
- E: Batch mode flag in prompt
- F: Batch orchestration shell script
- G: open_status_check verification script

**Priority 3 — Post-batch product (~6 hours):**
- H: localbite-city-setup.js
- I: Publication registry JSON
- J: Firecrawl integration

---

### Definition of Done — Established

Six-stage checklist created for production-ready city packs:
1. Pipeline complete (all output files written)
2. Data quality checks (writer profiles, failed sources, open_status_check, both-pool)
3. Geocoding (automated script, false positive review, final counts)
4. Viewer update (index.json, centroids, CITY_BOUNDS, local test)
5. Commit and push
6. Journal entry

---

### Key Findings — 2026-04-08

1. **First v6 run validated core approach.** Neighbourhood-complete search, stopping rule, two-tier retry, traceability check, and strict both-pool definition all worked correctly. 86 restaurants from 9 sources is the strongest Barcelona pack to date.

2. **Stopping rule works as designed for well-documented cities.** Fired at query 34 of a planned 56 — the candidate pool was saturated. For european_major cities, expect stopping rule to fire before neighbourhood completeness is exhausted.

3. **The trilingual ceiling contradiction is theoretical not practical.** Barcelona (28 neighbourhoods × 3 languages = 84 potential queries) never got close to 55 — stopping rule prevented it. No change needed to template ceiling for well-documented cities.

4. **226.8k tokens is significantly higher than v4 (estimated ~110k).** The neighbourhood-complete search approach roughly doubles token cost. For Max 5x this is still 2–3 cities per session. Worth monitoring whether the additional coverage justifies the cost as more cities are run.

5. **Export phase costs 68.4k tokens — disproportionately expensive.** Roughly 30% of total token cost just to write JSON from an assembled dataset. Suggests re-processing is happening during export rather than pure serialisation. Known inefficiency, documented in automation backlog.

6. **False positive rate for geocoding is manageable but needs automation.** 6 of 18 medium-confidence matches (33%) were non-restaurants. The matched names contain clear signals (Carrer de, Plaça de, Estació, Jardins de) that can be auto-detected. Documented as Item B in automation backlog.

7. **The process today was manual pipeline run with automated assistance, not batch processing.** Every post-pipeline step (geocoding trigger, false positive review, viewer update, index update, commit) required human intervention. Full automation requires building Items A–D from the backlog before the next batch run.

8. **git push via HTTPS requires GitHub Desktop.** SSH credentials not configured for localbiteadmin account. Item A in automation backlog. Will fix in next session.

---

### Files Produced / Modified

| File | Change |
|------|--------|
| `localbite-barcelona-2023-2026.json` | New — 86 restaurants, v6 pipeline, geocoded |
| `localbite-barcelona-raw.json` | New — 101 restaurants pre-review |
| `localbite-barcelona-audit.txt` | New — auto-rejection log |
| `localbite-barcelona-search-log.txt` | New — 56 queries logged |
| `localbite-barcelona-search-plan.txt` | New — search plan |
| `localbite-barcelona-failed-sources.txt` | New — empty (no failures) |
| `localbite-barcelona-working.json` | New — pipeline intermediate file |
| `localbite-barcelona-prompt-v6-barcelona.txt` | New — concatenated prompt |
| `localbite-barcelona-2023-2026-geocoded-backup.json` | New — geocoding backup |
| `localbite-barcelona-2023-2026-geocoding-stats-c1.json` | New — geocoding stats |
| `localbite-prompt-v6-template.txt` | Updated — 12 gaps fixed |
| `localbite-prompt-v6-barcelona-part1.txt` | New |
| `localbite-prompt-v6-valencia-part1.txt` | New |
| `localbite-prompt-v6-seville-part1.txt` | New |
| `localbite-index.json` | Updated — Barcelona v6, last_updated |
| `index.html` | Updated — 7 Barcelona centroids, static caveat fixed |
| `localbite-geocode.js` | Updated — writes in place, backup to -geocoded-backup.json |
| `localbite-automation-backlog.md` | New — 10 automation items documented |
| `localbite-journal-updated.md` | Updated — this entry |

---

### Outstanding Items

- [ ] **Next session first:** Set up Git SSH credentials (Automation Item A)
- [ ] Build automation Items B, C, D before Valencia run
- [ ] Run Valencia v6 pipeline
- [ ] Run Seville v6 pipeline
- [ ] Verify 11 Barcelona open_status_check restaurants (Stage 2)
- [ ] Clean up old `localbite-barcelona-2025-2026.json` from repo
- [ ] Two-step country/city dropdown in viewer (post-batch)
- [ ] Domain name check (post-batch)
- [ ] Update project knowledge files to reflect v6 template and batch design decisions
