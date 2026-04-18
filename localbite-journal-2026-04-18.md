## Session — 2026-04-18 (v7 template + geocoding overhaul; Bilbao first v7 city run)

### Overview
Full review and revision of the v7 template (21 issues fixed) and geocoding script (11 issues fixed), global instructions updated, and a complete end-to-end Bilbao city run including pipeline, geocoding, viewer registration, and deployment. Bilbao is the first city run on the revised v7 template and geocoding script v8.

---

### v7 Template Revision — 21 Issues Fixed

All 21 issues identified in the pre-session analysis were fixed, stepped through with confirmation, and committed at 522ba20 (1,019 lines, up from 806).

Key fixes:
- **P1:** Preamble contradiction resolved; Part 1 variable contract added (19 variables, REQUIRED/OPTIONAL with fallbacks); "sources" field name warning added prominently; working file format specified to match final JSON; Phase 1 COMPLETE now includes locked source list; search regex fixed; token capture instructions corrected.
- **P2:** Quote quality → auto-reject at extraction (not flag); full name rule added explicitly; mandatory 17-field source checklist; null neighbourhood rule for ungeocoded restaurants; source_recency → `[YEAR_RANGE]`; article_title added to extraction rules; SEARCH_ANGLE_EXAMPLES removed; source_tier duplicate removed; query ceiling → soft 45, hard 55.
- **P3:** flagged field rule added; Phase 1B edge case (scales to 1/2/3 queries); found_via standardised; dishes_mentioned added; target contamination warning added.
- Additional: `geo_matched_name: null` added to restaurant JSON schema (decided during geocoding review).

---

### Geocoding Script v8 — 11 Issues Fixed

Committed at 571b9f4 (525 lines, down from original due to HERE removal).

Key fixes:
- **P1 Critical:** Missing bounding box → hard stop (`process.exit(1)`); post-run orphan check (null coords + null neighbourhood → named warning list); misleading Google Maps links removed → centroid fallback language + deployment checklist reminder; post-write coordinate verification (re-reads file, prints verified count).
- **P2 High:** `geo_matched_name` formalised in schema and template; city name title-case normalisation for CITY_BOXES lookup; stats file → fixed filename overwrites (no -c1 accumulation); input validation guard added.
- **P3 Housekeeping:** HERE code fully removed; duplicate Seville entry removed; dead code in nameIsPlausible removed.

---

### Global Instructions Updated

- Token capture: programmatic only, no manual banner
- Results per query: 10 (hard tool limit)
- Query ceiling: soft 45, hard 55
- `--dangerously-skip-permissions` added to session startup
- Current fleet: 14 → 15 cities, pipeline v7
- v7 trigger row: "Implemented and committed. Standard for all new city runs."
- Madrid test block removed (stale)
- Last updated: 2026-04-18

---

### Bilbao v7 City Run — Complete

**Files produced:**
- `localbite-prompt-v7-bilbao-part1.txt` — Part 1 variables
- `localbite-prompt-v7-bilbao.txt` — full prompt (1,094 lines)
- `localbite-bilbao-2023-2026.json` — 39 restaurants (final)
- `localbite-bilbao-raw.json` — 40 restaurants (pre-removal)
- `localbite-bilbao-working.json` — extraction working file
- `localbite-bilbao-audit.txt` — full audit trail
- `localbite-bilbao-failed-sources.txt` — rejected candidates
- `localbite-bilbao-search-log.txt` — 36 queries logged
- `localbite-bilbao-search-plan.txt` — search plan
- `localbite-bilbao-2023-2026-geocoding-stats.json` — geocoding stats

**Pipeline results:**
- 5 sources: Culinary Backstreets (Marti Buckley, EN, Dec 2025), bilbaohiria.com (Mairenis Gómez, ES, Jun 2024), Appetites Abroad (Moani Hood, EN, Aug 2025), The Week (Irenie Forshaw, EN, Jun 2024), Lo que Coma Don Manuel (Igor Cubillo, ES, Dec 2025)
- 5 sources vs 6–12 target: structural characteristic of Bilbao's food blog ecosystem — majority of Spanish-language sites do not credit named authors. Documented, not a pipeline failure.
- Diversity gate: ✓ passed
- 39 restaurants final (40 raw, Le Chocolat removed — bakery not restaurant)
- 4 Tier A (3 both-pool: Asador Indusi, Txakoli Simón, Zarate; 1 multi-source ES: Víctor Montes)
- 35 Tier B
- Concentration cap applied: 2 LQCDM entries removed (Aitor Rauleaga Jatetxea, Batzoki de Miribilla) to reach 30%
- 15 open_status_check flags (from 2024 sources)

**Geocoding results:**
- 97% hit rate: 33 Nominatim (85%), 5 Photon (13%), 1 not found
- Serantes I false positive caught during spot-check: matched "Serantes kalea" (kalea = street in Basque). Coordinates nulled manually. Gap identified: `kalea` not in NON_RESTAURANT_PATTERNS.
- Nerua Guggenheim Bilbao: matched Guggenheim Museum — correct (restaurant is inside the museum).
- 2 restaurants using centroid fallback: Waman (Abando), Serantes I (Abando)
- Write verification confirmed: 38 coordinates in written file
- Orphan check: no orphans (both null-coordinate restaurants have neighbourhood)

**Deployment:**
- Bilbao bounding box added to CITY_BOXES before run
- 5 Bilbao neighbourhoods added to CENTROIDS in index.html (Casco Viejo, Abando, Indautxu, Ensanche, Begoña)
- Bilbao added to localbite-index.json as 15th city

---

### Learnings

1. **Template and geocoding fixes held end-to-end** — every new mechanism tested successfully in the Bilbao run.
2. **`kalea` missing from NON_RESTAURANT_PATTERNS** — Basque street word not covered. Serantes I false positive caught manually. Any city with a non-Roman-language local vocabulary needs street/place terms added before the run.
3. **DIRECT_FETCH_SOURCES must be article-level URLs** — both Phase 0 sources returned hub pages and failed. Section pages will almost always fail. Part 1 guidance needs clarification.
4. **Structural characteristic of thin named-author pools confirmed for Bilbao** — 5 sources after exhaustive search. Pipeline handled correctly.
5. **Centroid deployment gate works as designed** — Option B (process checklist) caught the missing Abando entry before deployment.

---

### Key Decisions

- `geo_matched_name` added to official restaurant JSON schema (both template and geocoding script)
- Failure 3 (centroid gap): Option B confirmed — deployment checklist step, not code fix
- `kalea` to be added to NON_RESTAURANT_PATTERNS in next geocoding script update
- DIRECT_FETCH_SOURCES guidance to be clarified in Part 1 variable contract (article-level URLs only)
- claude.md updates: **tabled to next session**

---

### Unattended Mode Analysis

For a fully unattended run, five steps need automation. Recommended "semi-attended" approach (one human touchpoint):

| Change | Priority | Est. Time |
|--------|----------|-----------|
| Auto-accept Phase 3 removals (UNATTENDED_MODE flag) | 1 | 45 min |
| Post-pipeline automation script (geocoding + index update + CENTROIDS check) | 2 | 2–3 hrs |
| CENTROIDS pre-population from geocoded data | 3 | 1 hr |
| Part 1 DIRECT_FETCH_SOURCES guidance update | 4 | 15 min |
| Auto-PROCEED after Phase 1 (risky — keep as last) | 5 | 1 hr |

Keep Phase 1 source approval as the single mandatory human touchpoint.

---

### Files Produced or Updated

| File | Status |
|------|--------|
| localbite-prompt-v7-template.txt | Updated — 21 issues fixed |
| localbite-geocode.js | Updated — 11 issues fixed |
| localbite-prompt-v7-bilbao-part1.txt | New |
| localbite-prompt-v7-bilbao.txt | New |
| localbite-bilbao-2023-2026.json | New |
| localbite-bilbao-raw.json | New |
| localbite-bilbao-working.json | New |
| localbite-bilbao-audit.txt | New |
| localbite-bilbao-failed-sources.txt | New |
| localbite-bilbao-search-log.txt | New |
| localbite-bilbao-search-plan.txt | New |
| localbite-bilbao-2023-2026-geocoding-stats.json | New |
| localbite-run-metrics.log | Updated |
| localbite-index.json | Updated — Bilbao added, 15 cities |
| index.html | Updated — Bilbao CENTROIDS added |

---

### Outstanding Items

- [ ] Add `kalea` to NON_RESTAURANT_PATTERNS in localbite-geocode.js
- [ ] Clarify DIRECT_FETCH_SOURCES guidance in Part 1 variable contract (article-level URLs)
- [ ] claude.md updates — tabled to next session
- [ ] Implement unattended mode changes (priority order above)
- [ ] Seville Part 1 needs updating to canonical v7 variable names before next Seville run
- [ ] Madrid open_status_check verification — 56 restaurants pending before go-live
- [ ] Madrid "Irene S." byline — unresolved
- [ ] /insights metrics gap — Bilbao run token/tool data not appearing in Claude Code report; investigate localbite-run-metrics.log to confirm data was captured

*Fleet: 15 cities, ~600 restaurants*
