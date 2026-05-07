## Session — 2026-05-07 (Fix 8 implementation; France Batch B recovery — Lyon, Marseille, Bordeaux)

### Overview

Long session. Implemented Fix 8 (comprehensive schema normalization in postrun.js), recovered all three parked France Batch B cities, and resolved three additional bugs discovered during the recovery: the `notable_dishes` always-delete pattern, the `geo` null deletion structural bug, and the `approve-centroids.js` apostrophe crash. All three cities are now live. Fleet at 45 cities.

---

### Fix 8 Implementation

Fix 8 was implemented as a Python patch script (`localbite-apply-fix8.py`) that applied 4 targeted patches to postrun.js. Dry-run verified all 4 anchors before apply. +210 lines added to postrun.js.

**Fix 8 patches:**
1. `entries → restaurants` top-level rename (before Array.isArray guard) — handles Marseille-class drift
2. Fix 8a–8e: top-level renames, noise removal, per-restaurant reshapes, defaults, derivations
3. Hard-fail conformance check before Step 4 (blocks index.html modification on drifted packs)
4. Fix 9: enhanced CITY_CENTRES bbox-midpoint warning with known-good city values

**Acceptance tests — all passed:**
- Pre-condition: Lyon and Marseille both confirmed DIVERGES before recovery ✓
- Hard-fail trigger: fired on deleted `pipeline` field, blocked Step 4, exit 1 ✓
- Test 3 (Paris no-op): CONFORMS, no HARD-FAIL ✓
- Test 1 (Lyon broken): CONFORMS after postrun ✓
- Test 2 (Marseille broken): CONFORMS after postrun ✓
- Test 4 (Rome regression): no HARD-FAIL, conformance passed ✓
- Test 4 (Madrid regression): no HARD-FAIL, conformance passed ✓

**Three bugs found during testing and fixed:**

1. **`notable_dishes` always-delete** — the rename block only deleted `notable_dishes` when `dishes` was absent. If `dishes` already existed, `notable_dishes` was never cleaned up. Fixed in postrun.js (condition changed from `if (Array.isArray(r.notable_dishes) && !('dishes' in r))` to `if (Array.isArray(r.notable_dishes))`). Required manual deletion of 6 instances from Lyon JSON.

2. **`confidence` always-delete** — same pattern. `confidence` → `geo_confidence` rename only ran when `geo_confidence` was absent. geocode.js sets `geo_confidence`, so the delete never fired. Fixed in postrun.js. Required manual deletion from Marseille (25 restaurants) and Bordeaux (16 restaurants).

3. **`geo` null deletion structural bug** — the `localbite-fix-postrun-geo-conf.py` fix script placed `delete r.geo` inside the inner `if (r.geo && ...)` block instead of the outer `if ('geo' in r)` block. When `r.geo` is null (the actual case in all three cities), the inner condition is false and `delete r.geo` never runs. Required manual deletion from all three cities. Final fix applied at commit 83362c9: moved `delete r.geo; autoRepaired++;` to outside the inner if.

**Additional fix:**
- `approve-centroids.js` apostrophe crash: Lyon's `Presqu'île` neighbourhood wrote `'Presqu'île'` as a JS key, producing `SyntaxError: Unexpected identifier 'île'` and breaking the viewer. Fixed to use double quotes for all CENTROIDS keys. Commit 824ff6b.

---

### France Batch B Recovery

**Lyon** — 43R, 4 sources, 4 CPs. Commit 314b424.
- Recovered from `_drift-recovery/localbite-lyon-france-2023-2026.json.broken`
- 838 fields auto-repaired by Fix 8
- Three bad geocodes nulled: Daniel et Denise, Le Petit Abuluzi, Majorelle
- CITY_CENTRES corrected from bbox midpoint [45.7650, 4.8650] → [45.7640, 4.8357] (Place des Jacobins)
- HIGH SPREAD on Part-Dieu, Presqu'île, Gerland — accepted (large arrondissement neighbourhoods)
- Smoke test passed after apostrophe fix

**Marseille** — 30R, 5 sources, 1 CP. Commit 4a5f323.
- Recovered from `_drift-recovery/localbite-marseille-france-2023-2026.json`
- 427 fields auto-repaired by Fix 8
- Seven bad geocodes nulled: Forest ("Cassis Forest" — wrong city), Luna Piena ("La Luna Verda"), Rotisserie Joyau ("Rotisserie Snack"), Treiz'envie ("Envie"), La Chapelle ("Chapelle de la Galline"), L'Original ("Pizzeria L'Original"), Sur Le Pouce
- CITY_CENTRES corrected from bbox midpoint [43.3050, 5.4225] → [43.2965, 5.3698] (Vieux-Port)
- Smoke test passed

**Bordeaux** — 16R, 3 sources, 1 CP. Commits a586bd9 + 1e506ad.
- Le Cent 33 excluded (Michelin 1★ awarded 2026 — blanket exclusion rule)
- Schema drift same as Marseille pattern (extraction_date, geo null, confidence, address, cuisine)
- 232 fields auto-repaired by Fix 8
- geo manually deleted (structural bug in postrun.js, fixed post-commit in 83362c9)
- CITY_CENTRES set to [44.8378, -0.5792] (Place de la Bourse)
- Commit message typo: says "N consensus picks" instead of "1" — cosmetic only
- Smoke test passed (Pudlowski source link goes to publication-level page, not article — document for next rebuild)

---

### Root Cause Confirmation: Batch B Compaction

Session confirmed the user's insight from last session: compaction in Lyon/Marseille was caused by **concurrent pipeline execution under rate-limit pressure**, NOT city size. Evidence: Madrid (89R, 11 sources) ran clean; Lyon (43R, 4 sources) compacted. Lyon/Marseille ran as part of a 3-city simultaneous batch (T1/T2/T3). Bordeaux launched last and didn't compact. Paris ran solo and had minimal drift.

Operational fix for Batch C: solo runs or very wide stagger (45–60 min), not 3 concurrent.

---

### Schema-diag Notes

`localbite-schema-diag.py` now committed. Useful pre-commit tool. When comparing Italian/Spanish cities against Paris reference, shows DIVERGES for legitimate city-type field differences (`lon`, `price_level`, `quote_lang`, `city_language`, etc.) — these are informational notices, not blocking issues. The diagnostic is most useful for France-vs-France comparisons.

---

### Key Decisions

1. **Batch B compaction cause confirmed**: concurrent execution + rate limits, not city size. Solo runs for Batch C.
2. **always-delete pattern for noise fields**: noise fields must always be deleted regardless of whether the canonical field exists. Applies to `notable_dishes`, `confidence`, `geo`, `writers`, `article_urls`. Any future fix must follow this pattern.
3. **approve-centroids.js double-quote fix**: all CENTROIDS keys now use double quotes. Permanent fix for French (and any other) neighbourhood names with apostrophes.
4. **postrun.js geo fix**: `delete r.geo` must be outside the inner `if (r.geo && ...)` block, inside the outer `if ('geo' in r)` block. Fixed at 83362c9.
5. **Schema-diag cross-city comparison**: DIVERGES from Italian/Spanish cities vs Paris reference is expected and non-blocking. The tool is for France-vs-France drift detection.

---

### Files Produced or Updated

**Committed:**
- `localbite-postrun.js` — Fix 8 + Fix 9 + geo/confidence/notable_dishes/geo-structural fixes (multiple commits)
- `localbite-schema-diag.py` — new diagnostic tool
- `localbite-fix8-test-plan.md` — acceptance test plan
- `localbite-approve-centroids.js` — apostrophe fix
- `localbite-lyon-france-2023-2026.json` — 43R, 4 sources, 4 CPs
- `localbite-marseille-france-2023-2026.json` — 30R, 5 sources, 1 CP
- `localbite-bordeaux-france-2023-2026.json` — 16R, 3 sources, 1 CP
- `localbite-bordeaux-france-audit.txt` and pipeline logs
- `index.html` — Lyon/Marseille/Bordeaux CITY_CENTRES, CITY_BOUNDS, neighbourhood centroids; apostrophe fix
- `localbite-index.json` — Lyon/Marseille/Bordeaux entries updated

**_drift-recovery/ cleared:** Lyon and Marseille JSONs recovered and committed. Folder is now empty (Bordeaux was in working tree, not parked).

---

### Outstanding Items

**Engineering (before Batch C):**
- Add schema fence to v7 template — explicit canonical field names in Phase 3 write instruction (cheap, 10 minutes)
- schema-diag.py POSTRUN_ADDED_R: add `lon`, `price_level`, `quote_lang`, `city_language`, `quote_language`, `article_title`, `flagged`, `name_variants`, `opening_year`, `price_currency`, `source_type_combination`, `confidence_tiers`, `sources_count`, `total_restaurants` to suppress Italian/Spanish false alarms

**Batch C (when ready — solo runs, wide stagger):**
- Nice + Toulouse + Strasbourg
- PHASE1_AUTO_PROCEED: YES, UNATTENDED_MODE: YES
- Run each solo (not concurrent) — 45–60 min stagger minimum
- postrun: Fix 8 now handles drift correctly (geo structural fix included)

**Data fixes (next rebuilds):**
- Bordeaux: Pudlowski article_url links to publication-level page — null at next rebuild
- Bordeaux: commit message says "N consensus picks" (cosmetic typo, no functional impact)
- Lyon: Tribune de Lyon article_url links to author index page — null at next rebuild

**Viewer/UI (deferred):**
- Sources panel UX gap: "recommended by [N] editorially independent sources" copy
- Sticky filters-bar + sticky credits-title: deferred to Next.js
- React migration: index.html now ~2,394 lines (trigger at 2,500)

**Pre-research template:**
- Add Search 8/9 + structured dossier output format (deferred from last session)

*Fleet: 45 v7.1 cities active, 1,364 restaurants. Production at commit 83362c9. France: 4/10 live (Paris, Lyon, Marseille, Bordeaux). Batch C pending.*
