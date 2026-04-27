# LocalBite Session Journal — 2026-04-26

## Session — 2026-04-26 (Madrid v7.1 + Fleet-wide URL Verification)

---

### Overview

Two-phase session. Phase 1 completed the Madrid v7.1 pipeline work from the compaction summary (writer_profile fix, Madrid Part 1, pipeline, postrun). Phase 2 was a new unplanned task: a systematic fleet-wide URL health verification covering all 128 unique source article_urls across all 26 cities, producing both a downloadable PDF report and an interactive on-screen widget.

---

### Phase 1: Madrid v7.1 (Completed — from compaction)

**writer_profile fix (commit c16f095)**

Applied prohibited-terms fix to both the v7.1 template and postrun.js Step 2b. Template change: added explicit list of prohibited terms to WRITER PROFILE RULE (never write "PRIMARY source", "Tier A/B/C", "Phase 0/1", etc.). postrun.js change: strengthened generateWriterProfile API prompt with prohibited terms; added post-Step-2b validation scan that fires for all sources regardless of whether enrichment ran. Tested on Rabat — validation passed. Removed superseded localbite-barcelona-2025-2026.json in same commit.

**Madrid git history audit**

4 candidate Madrid files found (v6, v7, v7final-fixed, v7rebuild) — none in git history as canonical file. v6 had 5 named sources, 6 both-pool (regression floor). v7rebuild all anonymous (rejected as baseline). v7final-fixed had best named-source list. Git history QA confirmed: regression from 6BP to lower would be a quality gate issue only if the old sources fail current quality gates.

**Madrid Part 1 file (commit 0be0f45)**

12 DIRECT_FETCH_SOURCES (Phase 0). 31 Michelin exclusions (2026 guide: DiverXO 3★, 6×2★, 24×1★). COI flags: Time Out Market Madrid, Devour Tours Madrid. Regression threshold: 6BP floor, 8–12 target. File: localbite-prompt-v71-madrid-part1.txt.

**Madrid pipeline (commits 5e69245 + 9f5d0f3)**

Result: 116R, 9 sources, 6BP, 71% geocoding (74/116).

- Quote dropout: working.json used `review_quote` field (not `quote`/`description`) — repaired manually, all 116 fixed.
- writer_profile contamination caught by new validation: Julián Acebes + Brenda Alonso — fixed.
- 9 wrong geocodes nulled: Rocacho Valdebebas→park, Playing Solo→bus stop, El Señor Martín→different entity, Emma Cocina, Fanáticos del Sabor, Sala Cero→coffee roaster, Mamá Charo, Bolboreta→nursery, Manifesto 13→wrong district.
- Ramón Freixa Tradición: confirmed NOT starred (stars went to Atelier only) — kept in pack.
- Michelin slip-through check: clean (Bodega de la Ardosa + Posada de la Villa were false positives from substring match).
- article_url check: 9/9 confirmed — all working.
- Pipeline docs committed: search log, search plan, working.json, failed sources, audit, raw.

**Madrid source failure analysis**

- 7 Caníbales / Alberto Luchini: FAIL — "Matando Madrid" series ended 2015; remove from next Part 1.
- Gastroactitud / José Carlos Capel: FAIL — multi-author site; incorrectly assumed single-author; remove from DIRECT_FETCH.
- The Infatuation: used main visiting guide (scroll-load, 11/~30 entries) instead of Hit List. Confirmed -3BP (Lana, Lakasa, Tripea visible from other sources). Next rebuild: always use Hit List URL (theinfatuation.com/madrid/guides/best-new-madrid-restaurants-hit-list).

6BP result is a source failure artefact, not the quality ceiling. Next Madrid rebuild target: 9–12BP with corrected Part 1.

---

### Phase 2: Fleet-Wide URL Verification (New task this session)

**Methodology**

User requested systematic live verification of all source article_urls across the fleet to confirm whether links are active and specific (not higher-level pages). Developed two-phase approach:
1. Extract all restaurant-source pairs with article_urls via Python script (run in user's terminal — repo files not accessible from Claude.ai container).
2. Fetch each unique URL via web_fetch with small token limit to assess status and content specificity.

**Scale:** 1,026 restaurant-source pairs, 128 unique URLs, 26 cities. Data extracted in two batches (500-line limit hit first pass).

**Verification results**

| Status | URLs | Meaning |
|--------|------|---------|
| ✓ OK — specific article | 88 | Correct destination, fully accessible |
| ⚑ JS-only (200 OK) | 10 | SPA shell via fetch; works in browser (Infatuation, Culinary Backstreets) |
| ⚠ Redirect | 4 | Lands on wrong page (Ojo al Plato ×2, EWN Málaga, Recomiendo Valladolid/flamma) |
| ✗ 403 Forbidden | 12 | Access blocked (NatGeo España ×4, CB Bilbao, metropolitano.gal, navarracapital ×2, aragondigital, hoyaragon ×2, artandthensome) |
| ✗ Fetch error | 4 | Unreachable (Sauce Mag Logroño, Gastronomistas ×2, Objective Palma) |
| — No link (null) | 10 | article_url null by design or pipeline gap |

**Key findings by priority**

P1 URGENT — Valencia Ojo al Plato: both article_urls returning homepage navigation only. Consistent with subscription wall or URL move. Affects 40 restaurants (51% of Valencia pack), including both-pool entries. This is the single highest-impact URL issue in the fleet.

P2 HIGH — Zaragoza: 4 sources blocked/unreachable (Aragón Digital 403, HoyAragón ×2 403, Gastronomistas error). 32 of 61 pairs affected.

P3 HIGH — Pamplona: Navarra Capital 100% 403 across both articles. 15 pairs affected. Primary ES-language Pamplona source.

P4 HIGH — Bilbao Culinary Backstreets: unlike other CB cities (which return JS SPA and work in browser), Bilbao CB returns hard 403. 10 pairs affected.

P5 MEDIUM — NatGeo España: blanket 403 across all 4 URLs (Murcia, Santiago, Seville, Málaga). Confirmed geo-block pattern — likely accessible to Spanish IP users. Do NOT null these article_urls without browser verification first.

P6 MEDIUM — Valladolid Recomiendo Valladolid: recomiendovalladolid.com/flamma/ is a single-restaurant Flamma review used as article_url for 7 other restaurants. Users clicking ↗ on El Patio del Olivo land on the Flamma page.

P7 INFORMATIONAL — Culinary Backstreets + Infatuation: all return SPA shells via fetch. Work correctly in browser. No action needed.

**New fixed definitions established**

- 403 geo-blocks vs broken links: 403 ≠ broken for real users. Browser verification required before nulling. Different from 451.
- article_url specificity: must link to the article containing the restaurant mention, not a single-restaurant review used for multiple restaurants, not an evergreen redirect.
- Fleet-wide URL verification: methodology now established as periodic health check.
- JS-only sources (Infatuation, CB): functional for users, not broken, requires no action.

**New observation: quote field variant in Madrid**

Madrid pipeline used `review_quote` (not `quote` or `description`). This is a third variant of the quote field dropout / field naming issue. Adding to known patterns: pipeline reconstruction can produce `quote`, `description`, or `review_quote` depending on compaction timing. Repair pattern is the same (map from working.json) but the field name to look for varies. Recommend adding a field-name normalisation step to postrun.js that maps `review_quote → quote` alongside the existing `description → quote` mapping.

**Deliverables produced**

- localbite-url-verification-report.pdf (downloadable, 6 sections: cover, global summary, city summary, per-city detail, URL inventory, action plan)
- Interactive HTML widget with tabs (summary, cities, URL inventory, action plan)

---

### Key Decisions

1. **Fetch log template change** — scheduled for next session. Add OUTPUT_FETCH_LOG variable to v7.1 template; real-time per-fetch logging; add fetch log to pipeline docs commit step; test before first pipeline. This is the infrastructure equivalent of the search log — enables systematic URL verification without manual reconstruction from transcripts.

2. **403 geo-blocks — do not null without browser verification** — formalised as fixed definition. NatGeo España returns 403 from Claude.ai's IP but is almost certainly accessible in Spain. Nulling article_urls for geo-blocks would harm the user experience for the target audience.

3. **Valencia Ojo al Plato — immediate investigation needed** — both article_urls returning homepage is the fleet's highest-impact URL issue. Must be addressed before next user traffic spike.

4. **Valladolid Recomiendo Valladolid — article_url specificity** — the recomiendovalladolid.com/flamma/ URL is a new failure mode: the URL is accessible and correctly formed, but it links to the wrong content for 7 of 8 restaurants using it. Article_url specificity added as a new fixed definition.

5. **review_quote field variant** — a third compaction-reconstruction quote field variant identified in Madrid. Flagged for postrun.js normalisation step.

---

### Files Produced or Updated

| File | Status | Notes |
|------|--------|-------|
| localbite-global-instructions-2026-04-26-updated.md | NEW | Full updated global instructions |
| localbite-session-journal-2026-04-26.md | NEW | This file |
| localbite-url-verification-report.pdf | NEW (output) | Fleet-wide URL verification report |
| fix-template-writer-profile.py | Previously output | Applied to repo 2026-04-26 |
| fix-postrun-writer-profile.py | Previously output | Applied to repo 2026-04-26 |
| localbite-madrid-source-failure-analysis.md | Previously output | Analysis of Madrid source failures |
| localbite-madrid-version-comparison.md | Previously output | v6 vs v7.1 comparison |

**Repo commits this session (from compaction summary):**
- c16f095: writer_profile fix (template + postrun) + remove barcelona-2025-2026.json
- 0be0f45: Madrid Part 1 file
- 5e69245: Madrid v7.1 data — 116R, 9 sources, 6BP
- 9f5d0f3: Madrid pipeline docs (search log, plan, working, failed sources, audit, raw)

---

### Session Statistics

**Tool usage (URL verification phase)**

- web_fetch calls: ~130 (128 unique URLs + a few retries and depth checks)
- bash_tool calls: ~4 (PDF generation, package check)
- create_file calls: ~3 (PDF build script, global instructions, journal)
- view calls: ~2 (PDF skill, global instructions)
- No Claude Code pipeline runs this session

**Token/API metrics**

- No pipeline runs → no localbite-run-metrics.log entries for this session
- Claude.ai web sessions do not expose token counts — not available
- Approximate session length: heavy (130+ tool calls plus extended report generation)

**URL verification baseline established**

- Fleet size: 26 cities, ~836R, 1,026 restaurant-source pairs
- Unique URLs: 128
- Functional links (OK + JS-only): 98/128 = 77%
- Problematic links (redirect + 403 + error): 20/128 = 16%
- Null (no link by design): 10/128 = 8%
- Restaurant-source pairs with functional links: ~820/1,026 = ~80%
- Restaurant-source pairs with issues: ~127/1,026 = ~12%
- Restaurant-source pairs with no link: ~79/1,026 = ~8%

---

### Outstanding Items

**IMMEDIATE (before next pipeline run)**
- [ ] Fetch log template change — add OUTPUT_FETCH_LOG to v7.1 template, test on first pipeline

**URGENT (before next user traffic push)**
- [ ] Valencia Ojo al Plato — browser verify both article_urls while logged in; null or update article_urls; recommit
- [ ] Valladolid Recomiendo Valladolid — find guide article URL or null; recommit

**HIGH (next rebuild session)**
- [ ] Zaragoza 403/error sources — browser verify; plan for source replacement in next rebuild
- [ ] Pamplona Navarra Capital — browser verify; if accessible to humans, document and keep; if not, null 15 pairs
- [ ] Bilbao CB hard 403 — browser verify; if broken, Wayback Machine attempt or null
- [ ] Málaga EWN redirect — update article_url or null for Beluga/El Pimpi

**MEDIUM (ongoing)**
- [ ] Eater Toronto article_url — manual browser check for specific guide URL
- [ ] Barcelona Eixample centroid HIGH SPREAD — find and null outlier at next rebuild
- [ ] Valencia Russafa/Gran Vía HIGH SPREAD — find and null outliers at next rebuild
- [ ] Valencia Karak to MICHELIN_STARRED_EXCLUSIONS in next Part 1
- [ ] Fleet restaurant count discrepancy — run fleet script at next session start; expected 888R but session end showed 836R

**INFORMATIONAL**
- [ ] postrun.js version string: shows v3.0, actually v3.3 — update when convenient
- [ ] review_quote field normalisation in postrun.js — third compaction quote variant identified
- [ ] Bilbao deia.eus to Phase 0 in next rebuild Part 1 file
- [ ] Madrid next rebuild: corrected Part 1 with Infatuation Hit List URL, El País Gastro added, 7 Caníbales + Gastroactitud/Capel removed — target 9-12BP

*Fleet: 26 cities, ~836R (verify), 2,296 index.html lines*

---

## Next Session Plan — 2026-04-27 (or next available)

### Pre-flight (first 15 minutes, no pipeline)

**Step 1: Fleet state verification**
```bash
cd /Users/harryenchin/Documents/GitHub/localbite
python3 /tmp/fleet.py
```
Verify actual restaurant count (expect 836 or 888 — discrepancy must be resolved). Check all 26 cities are present in fleet output.

**Step 2: Implement fetch log template change** ← DO THIS BEFORE ANY PIPELINE
Add OUTPUT_FETCH_LOG to v7.1 template. The full spec:

```
OUTPUT_FETCH_LOG: ./localbite-[city]-fetch-log.txt

FETCH LOG — mandatory, same discipline as search log:
After every fetch attempt (Phase 0 direct fetches, Phase 1B verification 
fetches, Phase 2 source fetches), immediately append one line to [OUTPUT_FETCH_LOG]:

[phase] "[URL or domain]" → [HTTP status] | [chars returned] | [OUTCOME] — one sentence reason

HTTP status codes: 200, 200+PAYWALL, 200+CAPTCHA, 200+DYNAMIC, 400, 403, 
404, 410, 451, TIMEOUT, SIZE
Outcome codes: ACCEPTED, REJECTED-byline, REJECTED-date, REJECTED-quote, 
REJECTED-geo, SKIPPED, PARTIAL, FAILED

Do this in real time — do not reconstruct from memory at the end.
Example:
[p0] "epicureanways.com/madrid-guide" → 200 | 45,312ch | ACCEPTED — Paul Richardson, named author confirmed, 2024 article
[p0] "gastroactitud.com" → 200 | 23,150ch | REJECTED-byline — editorial "we" throughout, multi-author site
[p0] "theobjective.com/article-x" → 404 | —ch | FAILED — URL dead, attempting Wayback
```

Also add localbite-[city]-fetch-log.txt to postrun.js pipeline docs commit step.

**Step 3: Valencia Ojo al Plato investigation**
Open browser, navigate to both URLs logged in:
- ojoalplato.com/guides/mis-favoritos-de-valència-distrito-eixample/
- ojoalplato.com/guides/mis-favoritos-de-valència-distrito-poblados-marítimos/

If subscription-required: null both article_urls in localbite-valencia-2023-2026.json, run postrun with --skip-geocoding flag (or equivalent to avoid re-geocoding), recommit.

If URL has changed: find the new URL, update, recommit.

If accessible when logged in but not when logged out: treat as soft paywall — document as access limitation, keep article_url, add note to writer_profile or source notes.

**Step 4: Valladolid Recomiendo Valladolid fix**
Find the Pablo Lázaro guide article that lists multiple restaurants:
- Try: recomiendovalladolid.com + search for "mejores restaurantes" or "guía"
- If found: update article_url for all 7 affected restaurants, recommit
- If no guide article exists: null article_url for the 7 affected restaurants (Flamma itself keeps the URL)

**Step 5: Eater Toronto article_url verification**
Open browser, navigate to eater.com/toronto. Find the specific guide article by Tiffany Leigh that mentions the 15 restaurants in the Toronto pack. If found, update article_url for all 15 Toronto Eater restaurants. If not found (article behind paywall or unavailable), article_url stays null — document in next session plan.

After steps 3-5: commit any article_url fixes together:
```bash
git add localbite-valencia-2023-2026.json localbite-valladolid-2023-2026.json localbite-toronto-2023-2026.json
git commit -m "fix: article_url corrections — Valencia Ojo al Plato, Valladolid Recomiendo, Toronto Eater"
git push
```

---

### Priority rebuild candidate: Zaragoza or Pamplona

Both cities have structural URL issues that could be improved with a rebuild:

**Zaragoza** — 4 of 7 sources blocked/unreachable. 52% of pairs affected. No both-pool (0BP). The rebuild case: replace Aragón Digital and HoyAragón with sources that are accessible to non-Spanish IPs, or find alternative sources. Before scheduling, browser-verify all 4 blocked sources — if they work in browser, no rebuild needed (just a fetch limitation).

**Pamplona** — both Navarra Capital articles 403. Same logic — browser-verify first. If accessible to human users, no rebuild needed.

Recommendation: do the browser verification before scheduling a rebuild. If the 403s are bot-protection (not true blocks), the current packs are fine for users and rebuild is low priority.

---

### If doing a city pipeline run

**First pipeline of next session must test fetch log implementation.** Run a medium-sized city (e.g. Logroño rebuild or Rabat rebuild) and verify:
1. localbite-[city]-fetch-log.txt is created in real time
2. File is being written after each fetch, not just at the end
3. postrun.js includes the fetch log in its pipeline docs commit
4. Fetch log survives compaction (this is the critical test)

---

### Administrative

**postrun.js version string:** Update from v3.0 to v3.3 in the header comment when next touching the file.

**review_quote field normalisation:** When next modifying postrun.js Step 1.5, add `review_quote` → `quote` mapping alongside the existing `description` → `quote` mapping. Both are compaction-reconstruction artefacts.

**Fleet-wide URL verification cadence:** Run fleet-wide URL verification at the start of any session where a major rebuild batch is planned. The 2026-04-26 baseline (88 OK, 10 JS, 4 redirect, 12 403, 4 error) should be used as reference — any regression from this baseline in next verification should be investigated.

---

### Session end checklist

1. Journal entry committed
2. Global instructions updated
3. Fleet script run to verify restaurant count
4. Outstanding items list updated
5. Any article_url fixes committed
6. Fetch log template change applied and tested

---

*Next session priority order: (1) fetch log template change, (2) Valencia Ojo al Plato, (3) Valladolid article_url, (4) Eater Toronto, (5) browser-verify 403 sources (Pamplona, Zaragoza), (6) pipeline run with new fetch log if time allows*
