# LocalBite — Session Journal
## Session — 2026-04-28 (Italy Batch B+C: Milan + Florence + Naples; Rome QA fixes; price filter fix; centroid naming collision)

---

### Overview

Long session covering pre-pipeline QA on the live Rome pack, resolution of four production issues, and the full execution of Italy Batch B (Milan) and Batch C (Florence + Naples). Three Italian cities committed and live. Fleet grew from 27 to 30 cities, 900R to 1064R.

---

### Part 1 — Pre-Pipeline QA (Rome production issues)

Four issues identified and resolved before any new pipelines launched:

**Issue 1: Price filter broken in Rome**
Root cause: pipeline dropout — sources (Katie Parla, The Infatuation) do not include explicit price notation, and the v7.1 template instruction required explicit mention. Result: all 64 Rome restaurants had null price_level.
Fix: (a) added inference instruction to template at line 638 — allows pipeline to assign price_level from cuisine/neighbourhood/dishes context when not explicit. (b) regenerated all 15 Italy combined prompts. (c) manually assigned all 64 Rome price levels via patch script.
Committed: 5c89bf5 (template fix), 94ee159 (Rome price patch).

**Issue 2: Rome neighbourhood pins wrong (Trastevere, Campo de' Fiori, Prati)**
Root cause: 7 wrong geocodes showing as high-confidence — Nominatim false positives placing restaurants ~10km from their correct location.
Restaurants nulled: L'Elementare, Supplì, Grappolo d'Oro, Siciliainbocca, Roscioli, I-Gio, Dal Toscano.
Also fixed: Piatto Romano language_pool corrected from 'en' to 'both' (postrun compaction bug).
Geocoded rate: 83% → 72% (honest figure after removing false positives).
Committed: 87b5f18.

**Issue 3: Katie Parla source links don't show specific restaurant**
Root cause: structural — her Rome guide is a single page covering 130+ restaurants with no anchor links. The article_url is technically correct (it is the article containing the mention) but UX is poor. No fix possible. Documented.

**Issue 4: Katie Parla over-emphasis across Italian cities**
Review of Milan and Florence Part 1 files confirmed she is NOT in DIRECT_FETCH_SOURCES for either — Jaclyn DeGiorgio is Milan anchor, Emiko Davies is Florence anchor. The concern was valid at the planning stage but was correctly addressed when Part 1 files were written. No changes needed.

---

### Part 2 — Italy Batch B: Milan

**Pipeline:** Launched T1, ~09:40. Compacted mid-Phase 2 — standard pattern.

**Sources confirmed (10 — strongest source pool of any Italian city so far):**
- Jaclyn DeGiorgio (A Signorina in Milan) — 3 articles, Jun 2025 / Jul 2025 / Jun 2024, EN, single-author site confirmed
- Elizabeth De Filippo-Jones (The Infatuation) — Oct 2024, EN
- Elizabeth De Filippo-Jones (Eater) — Mar 2025, EN (different publisher — both-pool eligible)
- Caterina Zanzi (Conosco un posto) — Dec 2024 + Dec 2025, IT
- Davide Frigoli (Imbruttito) — Mar 2024 + Apr 2024, IT
- Davide Scapin Giordani (Passione Gourmet) — Sep 2025, IT

**Results:** 60R, 10 sources, 3 both-pool (Trippa, Alba Pasta Bar, Botoi), 67% geocoded

**Postrun issues:**
- Both-pool: 0 reported → fixed language_pool for 3 both-pool restaurants (compaction bug)
- 6 HIGH SPREAD centroids — all legitimate geographic spread (Navigli stretches far south)
- All 10 article_urls confirmed from fetch — best article_url result of any city

Committed: 34a28d6 (initial), 6160584 (language_pool fix).

---

### Part 3 — Italy Batch C: Florence

**Pipeline:** Launched T2 ~20 min after Milan. Fast run — compacted but recovered cleanly.

**Sources confirmed (5):**
- Emiko Davies (Substack) — Oct 2023, EN
- Georgette Jupe (Girl in Florence) — Jan 2024 updated 2026, EN
- Elena Farinelli (IO AMO Firenze) — Jan 2025, IT
- Antonella De Santis (Gambero Rosso) — Jan 2026, IT
- Vivian Petrini (CiboToday) — Apr 2024, IT (secondary)

**Results:** 42R, 5 sources, 5 both-pool, 93% geocoded (best Italian city geocoding rate)

**Postrun issues:**
- Both-pool: 0 reported → fixed language_pool for 5 restaurants
- 4 wrong geocodes nulled: Regina Bistecca (matched to "Osteria della Bistecca" far north), Cucina (wrong side of Arno), Dalla Lola (matched to a piazza), L'OV Osteria Vegetariana (far north)
- 92% → 88% geocoded after nulling (honest figure)
- CENTROID NAMING COLLISION: Centro Storico centroid pointing to Rome coordinates, Porta Romana pointing to Milan coordinates. Fix: added both to Florence JSON centroids (JSON-first lookup resolves collision). Also patched CITY_BOUNDS which were tighter than geocoder bbox — widened to include Rifredi (Trattoria Da Burde at edge of city).

Committed: 66498f5 (initial), 13fb5c0 (centroid fix).

---

### Part 4 — Italy Batch C: Naples

**Pipeline:** Launched T3 ~20 min after Florence. Compacted during Phase 2 — significant neighbourhood dropout.

**Sources confirmed (5):**
- Katie Parla (katieparla.com) — Naples city guide, EN
- Santa di Salvo (lucianopignataro.it) — IT
- Diana Bancale (inviaggiodasola.com) — IT
- Gabriela Proietti (timeout.com) — EN
- [5th source from pipeline]

**Results:** 62R, 5 sources, 6 both-pool (Donna Teresa, Nennella, Mimì alla Ferrovia, Diego, Locanda Gesù Vecchio, Osteria Mattozzi), 81% geocoded

**Major postrun issue — neighbourhood dropout:**
Compaction caused neighbourhood field to drop for 30/62 restaurants. Diagnosis: large "unknown" bucket in hood_check with coordinates scattered across the full city bounding box. Repair: coordinate-based neighbourhood assignment script (fix-naples-geocodes-hoods.py) assigning neighbourhoods from bounding boxes + explicit overrides for ambiguous cases.

Three true orphans (no neighbourhood, no coords): Persika, Il Basilico, Il Gambero Rotto. Resolved via web search: Persika → Chiaia (Via Giovanni Bausan, 5); Il Basilico → Vomero (Via Filippo Cifariello, 9); Il Gambero Rotto → Chiaia (Via Giovanni Bausan, 53). Note: Persika appears in 2026 Michelin Guide Italia as recommended restaurant (not starred — confirmed safe to include).

**Additional wrong geocodes nulled:**
- Attilio → "Via Attilio Micheluzzi" (street)
- Da Alfredo → "Via Alfredo Capelli" (street, wrong longitude)
- Manfredi → "Via Gaetano Manfredi" (street)
- Trattoria Antonio La Trippa → too far north for Chiaia
- Ostaria Pignatelli → "Villa Pignatelli" (museum)
- Al 53 → "Napoli" (the city itself)

Katie Parla article_url nulled — katieparla.com/restaurants/naples/ is a category page, not a specific article.

Three postrun runs required (orphans → neighbourhood assignment → wrong geocodes → final clean run).

Committed: 987cf1f.

---

### Part 5 — CENTROID NAMING COLLISION — Root Cause and Resolution

**Discovery:** Florence's Regina Bistecca (null coords, neighbourhood=Centro Storico) was displaying in Rome on the live map. Investigation revealed the global CENTROIDS dict in index.html had a single `Centro Storico` key pointing to Rome's coordinates. Florence restaurants with null coords in Centro Storico fell through to this key.

**Root cause analysis:** The viewer lookup checks `currentCityData.centroids[nb]` (city JSON) FIRST, then falls back to global `CENTROIDS[nb]`. The city JSON `centroids` field only contains entries for neighbourhoods that had null-coord restaurants needing centroid calculation. Neighbourhoods where all restaurants were geocoded never get added to the city JSON — so they fall through to the global dict and collide.

**Resolution:** Since the viewer already implements JSON-first lookup, the correct fix is to ensure all null-coord restaurant neighbourhoods are covered by the city JSON centroids — NOT to implement city-qualified keys in index.html. Diagnostic confirmed: all four Italian cities (Rome, Milan, Florence, Naples) have complete JSON centroid coverage for all null-coord restaurants. No naming collisions remain.

**Also fixed:** CITY_BOUNDS for Rome, Milan, Naples, Florence — postrun auto-generates tighter bounds than the geocoder bounding boxes, causing edge restaurants to be clipped. All four widened to match geocoder bboxes.

Committed: 52b216d (index.html patch), 13fb5c0 (Florence JSON centroids), 763bd46 (Rome/Milan/Naples CITY_BOUNDS), 1621561 (Florence CITY_BOUNDS).

---

### Key Decisions

1. **price_level dropout is a template/source issue, not a pipeline bug.** Template now allows inference from context. Repair pattern for already-run cities: manual assignment script.

2. **neighbourhood dropout on compaction is a new known failure mode.** When pipeline compacts during Phase 2/3, the neighbourhood field may drop for many restaurants. Standard repair: coordinate-based neighbourhood assignment + explicit overrides.

3. **language_pool bug persists post-compaction.** both_pool=True restaurants will show wrong language_pool after compaction-reconstruction. Standard repair: check after every postrun, patch language_pool='both' for all both_pool=True restaurants.

4. **CENTROID naming collision resolved without architectural changes.** JSON-first lookup already exists. Fix: ensure city JSON centroids cover all null-coord restaurant neighbourhoods. No need for city-qualified keys in index.html.

5. **Katie Parla katieparla.com/restaurants/[city]/ is a category page — always null.** This is different from her specific article URLs (e.g. katieparla.com/where-to-eat-drink-shop-rome/). Category pages are not article_urls.

6. **Medium-confidence geocodes matching streets, piazzas, churches, museums, or the city name itself are wrong geocodes.** Always null these regardless of confidence level or in-bounds validation.

7. **Trattoria Da Burde in Rifredi is correctly geocoded** — it really is in northwest Florence near the airport. The isolated green pin on the map is accurate. Not a data error.

---

### Files Produced or Updated

**Scripts (new, in repo):**
- fix-price-inference.py — template price_level inference instruction
- patch-rome-price-levels.py — Rome price_level manual assignment
- patch-rome-bad-geocodes.py — Rome wrong geocode nulling
- fix-naples-geocodes-hoods.py — Naples wrong geocode nulling + neighbourhood assignment
- patch-centroid-collisions.py — index.html centroid collision patch (superseded by JSON approach)
- fix-centroid-collisions-complete.py — NOT needed, discarded

**Data files committed:**
- localbite-rome-italy-2023-2026.json — price_level patched, 7 geocodes nulled, centroids recalculated, Piatto Romano language_pool fixed
- localbite-milan-italy-2023-2026.json — new city, language_pool fixed
- localbite-florence-italy-2023-2026.json — new city, 4 geocodes nulled, centroid collision fixed
- localbite-naples-italy-2023-2026.json — new city, 30 neighbourhood repairs, 6 geocodes nulled
- index.html — multiple fixes: centroid patches, CITY_BOUNDS for 4 cities
- localbite-index.json — index updated
- localbite-prompt-v7-template.txt — price_level inference instruction added

---

### Outstanding Items

**New this session:**
- **language_pool bug on compaction** — postrun STEP 1.5 recalculation fails for compacted cities with list-format sources. Pattern: both_pool=True but language_pool stays wrong. Manual fix required after every Italian city postrun. Should be fixed in postrun.js STEP 1.5.
- **neighbourhood dropout on compaction** — no programmatic prevention yet. The Part 1 template should instruct the pipeline to write neighbourhood as the FIRST field in each restaurant object during extraction, making it compaction-resistant. Add before next batch.
- **CITY_BOUNDS auto-generation tighter than geocoder** — systematic issue for all Italian cities added by postrun. Add verification step to postrun checklist.
- **Katie Parla Naples both-pool depth** — only 6 both-pool from 5 sources; Katie Parla article_url null (category page). Structural — no fix possible without better IT sources.
- **Naples Santa di Salvo duplicate source entry** — appears twice in sources (one null URL, one single-restaurant review URL). Compaction artifact. Review at rebuild.
- **Milan article_url none for some sources** — Diana Bancale and Gabriela Proietti. Compaction dropout. Accepted for now.

**Carried from previous sessions:**
- Rome: Gambero Rosso 403 structural gap; Puntarella Rossa anonymous bylines; Elizabeth Minchilli 2023+ absent; Camilla Baresani article_url null; Katie Parla 64% concentration
- Barcelona: Eixample centroid HIGH SPREAD
- Valencia: Russafa + Gran Vía HIGH SPREAD
- Valladolid: article_url specificity (7R)
- Málaga: EWN redirect (2R)
- postrun.js version string still shows v3.0

---

### Fleet State

*Fleet: 30 cities, 1064 restaurants (verified via fleet script 2026-04-28)*

| City | R | BP | Geo% | Notes |
|------|---|----|----|-------|
| Milan, Italy | 60 | 3 | 67% | 10 sources — strongest Italian source pool |
| Florence, Italy | 42 | 5 | 88% | Best geocoding rate of any Italian city |
| Naples, Italy | 62 | 6 | 81% | Neighbourhood dropout repaired |
| Rome, Italy | 64 | 1 | 72% | Price patched; 7 wrong geocodes nulled |

**Italy coming_soon remaining:** Bologna, Turin, Venice, Palermo, Verona, Genoa, Bari, Modena, Lecce, Catania, Trieste (11 cities)
