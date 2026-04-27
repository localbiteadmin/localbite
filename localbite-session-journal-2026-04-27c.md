## Session — 2026-04-27 (Italy Part 1 Files + Rome v7.1 Pipeline)

### Overview

Full Italy pipeline preparation session plus first Italian city run. Wrote and committed 15 Part 1 files covering all planned Italian cities (Batches A–G). Fixed an incorrect Gambero Rosso COI flag across 3 files. Completed all pipeline pre-launch tasks (CITY_BOXES, index entries, fetch log template, combined prompts). Launched and completed Rome v7.1: 64 restaurants, 4 sources, 1 both-pool.

---

### Key Decisions

**Gambero Rosso COI removed (permanent).**
Gambero Rosso operates a cooking school network (Città del gusto) in Italy. A cooking school is not a commercial conflict of interest with restaurant recommendations — it does not create a financial relationship with the restaurants being reviewed. The COI flag was incorrect reasoning by analogy with Time Out's food markets. Removed from Rome, Milan, and Florence Part 1 files (commit 90040c8). Gambero Rosso is now treated as a standard named-author source across all Italian cities. This is a permanent decision — do not re-add COI language for Gambero Rosso.

**Ahimè Bologna confirmed: Bib Gourmand + Green Star only.**
Ahimè (Via San Gervasio 6/e, Bologna) holds a Michelin Green Star (sustainability) and a Bib Gourmand recognition. It does NOT hold a regular Michelin star. Confirmed from the official Michelin Guide page and multiple Italian sources. Ahimè is NOT excluded from the Bologna pack — it may appear as a qualifying recommendation if a named writer recommends it. The Bologna Part 1 file's "verify" instruction is now resolved.

**Katie Parla concentration cap accepted for Rome.**
Katie Parla appears in 41 of 64 Rome entries (64%), above the 30% cap guideline. Accepted as-is because: (1) her guide covers 130+ Rome venues across the full geographic spread including peripheral neighbourhoods; (2) trimming to 30% would eliminate all coverage of Centocelle, Torpignattara, Pigneto, Ostiense, Monteverde; (3) the high concentration is a structural consequence of Gambero Rosso being 403-blocked and Puntarella Rossa having anonymous bylines — not a pipeline failure. Documented as known limitation; flag for Rome rebuild.

**Camilla Baresani article_url null — correct.**
Camilla Baresani (camillabaresani.com, IT) has 5 individual article pages but no single canonical guide URL. Her article_url was left as null. This is correct per the article_url rules — the specific article URLs exist in the audit file but were not confirmed via a single fetch response that could serve as the source URL. Null shows a broken link icon in the viewer, which is honest.

**Trento and Matera parked.**
No qualifying named-author sources found for either city in pre-research. No Part 1 files written. Will revisit if sources surface in future research sessions.

---

### Italy Part 1 Files — All Committed

| City | Batch | Commit | Key Notes |
|------|-------|--------|-----------|
| Rome | A | 4b37a7e → 90040c8 | Katie Parla + Elizabeth Minchilli Phase 0; 20★ exclusions |
| Milan | B | 4b37a7e → 90040c8 | Jaclyn DeGiorgio EN gap resolved; 20★ exclusions |
| Florence | C | 8f70681 → 90040c8 | Emiko Davies + Leonardo Romanelli; 9★ exclusions |
| Naples | C | 8f70681 | Disambiguation MANDATORY — never bare "Naples"; 4★ in city |
| Bologna | D | 8a992b0 | Katie Parla Phase 0; I Portici only 1★ in city; Ahimè not excluded |
| Venice | E | 8a992b0 | Islands only — Mestre excluded; 7★ exclusions |
| Modena | F | 8a992b0 | Katie Parla Phase 0; Osteria Francescana 3★ + Al Gatto Verde 1★ |
| Turin | D | 6b27825 | Mimi Thorisson (Airmail News) Phase 0; 8★ in city; Magorabin closed |
| Palermo | E | 6b27825 | Culinary Backstreets Phase 0; Mec Restaurant only 1★ in city |
| Verona | E | 6b27825 | No Phase 0 sources; Casa Perbellini 3★; Iris + Il Desco 1★ |
| Genoa | F | 575d9e1 | No Phase 0; Il Marin + San Giorgio 1★; The Cook lost star 2026 |
| Bari | F | 575d9e1 | No Phase 0; ZERO starred restaurants in city — unique in fleet |
| Lecce | F | 575d9e1 | No Phase 0; Primo Restaurant 1★; Bros' lost star 2026 |
| Catania | G | 7ac35d2 | No Phase 0; Coria + Sapio both 1★ in city |
| Trieste | G | 7ac35d2 | No Phase 0; Harry's Piccolo 2★ only; no 1★ in city |

---

### Pipeline Pre-Launch Tasks Completed

**geocode.js** — 15 Italian city CITY_BOXES added (commit 7beda4c). All 15/15 verified in file. Venice bounding box covers islands + outer lagoon; Mestre coordinates (lat 45.47–45.50, lng 12.22–12.26) excluded.

**localbite-index.json** — 15 Italian cities added as coming_soon (commit 7beda4c). Fleet now 41 cities total.

**Fetch log template** — OUTPUT_FETCH_LOG added to localbite-prompt-v7-part1-template.txt (commit 7beda4c). All 15 Italy Part 1 files already included it. Main v7.1 template (localbite-prompt-v7-template.txt) already had it.

**Combined prompts** — 15 full pipeline prompts produced (localbite-prompt-v71-[city]-italy-full.txt) by combining Part 1 + v7.1 template. Local files only, not committed.

**Scripts produced and committed** — add-italy-city-boxes.py, add-italy-index-entries.py, add-fetch-log-to-template.py, combine-italy-prompts.py. All local, not in repo.

---

### Rome v7.1 Pipeline Run

**Run time:** 52 minutes 39 seconds  
**Commit:** 8367ee9  
**Status:** Pushed and live

| Metric | Value |
|--------|-------|
| Restaurants | 64 |
| Tier A (2+ sources) | 8 |
| Tier B (single source) | 56 |
| Both-pool | 1 (Piatto Romano) |
| Geocoded | 53/64 (83%) |
| Sources | 4 |
| Searches run | 42 |

**Sources:**
- S1 Katie Parla — katieparla.com — EN — June 2024 (updated)
- S2 Annie Replogle — The Infatuation — EN — August 2025
- S3 Camilla Baresani — camillabaresani.com — IT — Feb–Aug 2024 (Corriere della Sera contributor, single-author portfolio site)
- S4 Marta Correale — Mama Loves Rome — EN — Nov 2024 / Jan 2025

**Phase 0 outcomes:**
- Katie Parla: direct fetch succeeded (Jina/Cloudflare blocked, direct WebFetch worked)
- Elizabeth Minchilli: FAILED — category page shows only 2016–2019 content, no 2023+ Rome posts
- Wayback Machine: 451 for both Katie Parla URLs

**IT source search:** Gambero Rosso 403 blocked. Puntarella Rossa anonymous "Redazione" bylines — rejected. Agrodolce anonymous — rejected. Camilla Baresani found via cross-validation query on Piatto Romano.

**Post-pipeline actions:**
- 6 wrong geocode matches nulled (Giano, Da Dante, Ristorante Rocco, Antico Caffè Greco, Camillo a Piazza Navona, Mazzo)
- Monti centroid recalculated after Ristorante Rocco null (was pulling centroid south toward EUR)
- Katie Parla concentration (64%) accepted — documented as structural limitation
- Camilla Baresani article_url left null — correct per rules
- Pipeline self-committed (no-git instruction did not survive this run) — canonical commit is 8367ee9

**Known Rome issues:**
- Gambero Rosso 403 structural gap — no workaround
- Puntarella Rossa anonymous bylines — structural gap
- Both-pool low (1) due to Camilla Baresani covering only 5 individual restaurants
- Antico Caffè Greco (S3/Baresani) — active lease dispute per Feb 2024 article; verify still open before rebuild
- Camilla Baresani article_url null — correct but shows broken link icon in viewer
- Elizabeth Minchilli Rome content appears to be paywalled or paginated behind 2023 cutoff — investigate for rebuild

---

### Files Produced or Updated

| File | Status | Commit |
|------|--------|--------|
| localbite-prompt-v71-rome-italy-part1.txt | New → updated (COI fix) | 90040c8 |
| localbite-prompt-v71-milan-italy-part1.txt | New → updated (COI fix) | 90040c8 |
| localbite-prompt-v71-florence-italy-part1.txt | New → updated (COI fix) | 90040c8 |
| localbite-prompt-v71-naples-italy-part1.txt | New | 8f70681 |
| localbite-prompt-v71-bologna-italy-part1.txt | New | 8a992b0 |
| localbite-prompt-v71-venice-italy-part1.txt | New | 8a992b0 |
| localbite-prompt-v71-modena-italy-part1.txt | New | 8a992b0 |
| localbite-prompt-v71-turin-italy-part1.txt | New | 6b27825 |
| localbite-prompt-v71-palermo-italy-part1.txt | New | 6b27825 |
| localbite-prompt-v71-verona-italy-part1.txt | New | 6b27825 |
| localbite-prompt-v71-genoa-italy-part1.txt | New | 575d9e1 |
| localbite-prompt-v71-bari-italy-part1.txt | New | 575d9e1 |
| localbite-prompt-v71-lecce-italy-part1.txt | New | 575d9e1 |
| localbite-prompt-v71-catania-italy-part1.txt | New | 7ac35d2 |
| localbite-prompt-v71-trieste-italy-part1.txt | New | 7ac35d2 |
| localbite-geocode.js | Updated (15 CITY_BOXES) | 7beda4c |
| localbite-index.json | Updated (15 coming_soon) | 7beda4c |
| localbite-prompt-v7-part1-template.txt | Updated (OUTPUT_FETCH_LOG) | 7beda4c |
| localbite-rome-italy-2023-2026.json | New | 8367ee9 |
| localbite-rome-italy-search-log.txt | New | 8367ee9 |
| localbite-rome-italy-fetch-log.txt | New | 8367ee9 |
| localbite-rome-italy-search-plan.txt | New | 8367ee9 |
| localbite-rome-italy-audit.txt | New | 8367ee9 |
| localbite-rome-italy-failed-sources.txt | New | 8367ee9 |
| localbite-run-metrics.log | Updated | 8367ee9 |

Local only (not committed): 15 full pipeline prompt files (*-italy-full.txt), 4 helper scripts.

---

### Outstanding Items

- **Italy Batch B (Milan)** — next pipeline to run. Full prompt ready: localbite-prompt-v71-milan-italy-full.txt
- **Italy Batches C–G** — all full prompts ready on disk
- **Bari thin city risk** — zero starred restaurants; limited EN media. Run last in Batch F; review R count before committing to index
- **Lecce thin city risk** — small city. Run last in Batch F
- **Catania thin city risk** — limited EN media. Monitor R count
- **Trieste thin city risk** — small city. Monitor R count
- **Rome rebuild triggers** — Gambero Rosso access, Puntarella Rossa named bylines, Elizabeth Minchilli 2023+ content, broader IT source pool
- **Antico Caffè Greco lease dispute** — verify still open before Rome rebuild
- **Valladolid article_url specificity** — recomiendovalladolid.com/flamma/ used as source for 7 other restaurants. Fix at next rebuild
- **Málaga EWN redirect** — dated article redirects to evergreen landing page. Affects Beluga + El Pimpi
- **Barcelona Eixample HIGH SPREAD centroid** — outlier geocode ~20km east. Fix at next rebuild
- **Valencia Russafa + Gran Vía HIGH SPREAD** — fix at next rebuild
- **postrun.js version string** — still shows v3.0, effectively v3.3. Update at next opportunity

*Fleet: 27 cities, ~900R, 2,296 index.html lines*
