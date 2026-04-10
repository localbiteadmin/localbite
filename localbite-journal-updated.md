# LocalBite Research Journal

---

## Session — 2026-03-21 (Barcelona)

### Overview
One Barcelona city pack run completed using the middle-path-v2 pipeline. One output file produced. Pipeline ran fully automatically with a single bulk review at the end.

---

### Run 1 — localbite-barcelona-2025-2026.json

**Prompt used:** Middle path v2 (fully automatic pipeline, open queries, single bulk review at end)
**Output file:** `localbite-barcelona-2025-2026.json`
**Sources fetched:** 8 (4 skipped/failed/merged)
**Restaurants in final file:** 78

| Source | Writer | Language | Article Date |
|--------|--------|----------|--------------|
| Barcelona Food Experience (2026 guide) | 18+ year resident blogger | EN | 2026-02-08 |
| Time Out Barcelona | Time Out editorial team | ES | 2026-03-18 |
| The Infatuation Hit List | The Infatuation editorial | EN | 2025-05-20 |
| Gastronomistas | Belén Parra | ES | 2025-12-31 |
| The New Barcelona Post | Anna Torrents | EN | 2026-01-11 |
| Salon.com | Staff food writer | EN | 2025-12-06 |
| Guía Repsol (aperturas) | Lourdes López | ES | 2026-01-23 |
| Barcelona Food Experience (Autumn 2025) | Maria | EN | 2025-09-28 |

**Skipped sources:** Ara.cat (no named author), Infobae España (HTTP 451), The Infatuation main guide (pub. 2022), Bonviveur (Michelin lists only, 1 usable entry), Time Out CA (merged with Time Out ES — same editorial, same list)

**Confidence tier breakdown:**
- Tier A (auto-approved): 19
- Tier B (reviewed): 59
- Tier C (auto-rejected): 25

**Review stage:** 84 entries presented in bulk table. User removed 6: #34 (Enoteca Paco Pérez), #44 (Lasarte), #66 (Circolo Popolare), #72 (Granja Elena), #74 (Kyara), #75 (Lora).

**Both-pool count:** 14
| Restaurant | Sources |
|------------|---------|
| Franca | a2, a5, a6, a8 (4 sources) |
| Seis Cuarenta | a3, a4, a5, a7 (4 sources) |
| Arraval | a4, a5, a7 (3 sources) |
| Taberna Nardi | a3, a4, a7 (3 sources) |
| Atipical Casa de Menjars | a2, a5 |
| Bar Super | a2, a3 |
| Bornès | a5, a7 |
| Contracorrent Bistró | a1, a2 |
| Direkte | a2, a5 |
| Finorri | a2, a3 |
| Glug | a1, a2 |
| Jazminos | a2, a8 |
| Macambo | a2, a8 |
| Paloma Fondita Mexicana | a2, a3 |

---

### Key Findings — 2026-03-21 (Barcelona)

1. **Time Out CA and ES must be checked for editorial independence.** The Catalan and Spanish editions of Time Out Barcelona ran an identical restaurant list by the same team. Counting them separately would have falsely inflated cross-validation. Always verify whether CA/ES sibling editions are independently produced.

2. **"Named author" rule caught Ara.cat.** Ara.cat is a major Catalan newspaper but the fetched article had no byline. Correctly rejected. The rule is valuable even for high-credibility publications.

3. **The Infatuation main guide failure repeated the Valencia Devour Tours pattern.** The main `/best-restaurants-hotels-barcelona` guide appeared in 2025 search results but was published January 2022. Used the Hit List (May 2025) instead. Lesson confirmed: verify article date from fetched text, not search snippet.

4. **Seis Cuarenta appeared under 4 different name spellings.** Manual deduplication required. A future pipeline improvement would normalise venue names during extraction.

5. **Barcelona Food Experience contributed two separate articles** (a1 and a8) by different authors, both qualifying under recency. Treated as two sources. Together they generated the most EN-only multi-source entries (Casa Fiero, Fukamura, Pompa, Ona, Agreste Mar).

6. **No pure Catalan-language source made it into the final pack.** Ara.cat rejected; Time Out CA merged. The Barcelona pack is currently EN + ES only.

---

### Outstanding Items

- [ ] No Google Maps place IDs added to any Barcelona entry
- [ ] Glug and Arume have no neighbourhood recorded — could not be determined from sources
- [ ] No pure CA-language source in pack — consider future Catalan-press run
- [ ] Barceloneta / waterfront and outer barrios (Sants, Horta-Guinardó) underrepresented

---

## Session — 2026-03-21 (Valencia)

### Overview
Three Valencia, Spain city pack runs completed in a single session. Two output files produced. Key pipeline learnings captured.

---

### Run 1 — localbite-valencia-spain.json (initial build)

**Prompt used:** Human-in-the-loop v1 (per-source, per-entry approval at every stage)
**Output file:** `localbite-valencia-spain.json`
**Sources:** 2
**Restaurants:** 28

| Source | Writer | Language |
|--------|--------|----------|
| Devour Tours Blog | Devour Tours editorial team | EN |
| Hello Valencia | Hello Valencia editorial team | ES |

**Both-pool entries:** 1 (El Pederniz — appeared in both EN and ES source)
**Process notes:** Sources were presented for approval before fetching. Each source was shown one at a time with line-by-line approval before moving to the next. File written after final confirmation.

---

### Run 2 — localbite-valencia-spain.json (expanded merge)

**Prompt used:** Human-in-the-loop v1 (second pass, Spanish-language sources only, merge into existing file)
**Output file:** `localbite-valencia-spain.json` (overwritten)
**New sources added:** 4
**Restaurants before merge:** 28
**Restaurants after merge:** 75
**New restaurants added:** 47
**Existing entries updated:** 5
**Entries upgraded to both-pool:** 1 (Central Bar — s5 EN + s4 ES)

| Source | Writer | Language |
|--------|--------|----------|
| Guía Repsol (Ruzafa guide) | Eva Máñez | ES |
| Valencia Secreta | Álvaro Llagunes | ES |
| eldiario.es | Cristina Hernán | ES |
| Gastroagencia | Gastroagencia editorial team | ES |

**Final both-pool count:** 2 (El Pederniz, Central Bar)
**Process notes:** User filtered Valencia Secreta results to Valencian/Spanish/Mediterranean food only, removing non-local cuisines. User confirmed entries from eldiario.es selectively (kept 3 of 10). Per-source, per-entry approval remained in place throughout — tedious at scale.

**Merge rules applied:**
- Existing restaurants gained additional sources; no duplicates created
- language_pool recalculated across all entries
- built date updated
- New sources appended to sources array
- Sorted: both-pool first, then by source_count descending

---

### Run 3 — localbite-valencia-2025-2026.json (2025–2026 recency filter)

**Prompt used:** Middle path v1 (fully automatic pipeline, single bulk review at end)
**Output file:** `localbite-valencia-2025-2026.json` (new file)
**Sources fetched:** 5 (1 skipped)
**Restaurants in final file:** 62

| Source | Writer | Language | Article Date |
|--------|--------|----------|--------------|
| The Infatuation | David Neimanis | EN | 2025-08-01 |
| Bonviveur | Yolanda Galiana | ES | 2026-02-13 |
| Grupo Gastro Trinquet | Albert Padilla | ES | 2025-02-18 |
| GastroSpain | Irene Sánchez & Julián Acebes | ES | 2025-06-24 |
| Amsterdam Foodie | Vicky Hampton | EN | 2025-11-17 |

**Skipped source:** Devour Tours (Lindsey Zimmerman, EN) — listed as "updated October 2025" but the fetched content carried a publication date of August 20, 2017. The underlying article was not a 2025 piece.

**Review stage:** 73 entries presented in bulk table. User removed 11:
- 8 outside Valencia city limits (Arrels/Sagunto, Origen/Carcaixent, Simposio/San Antonio de Benagéber, Askuabarra/Alicante, Casa El Tío David/Alfafara, Daluan/Morella, Dexcaro & Ossadía/Dénia, Nou Manolín/Alicante)
- 2 cafés (Café Artysana, Ubik Café)
- 1 cultural centre / bar (La Fábrica de Hielo)

**Flagged entries kept:** 0 (no partial fetches; all restaurants explicitly named in article text)

**Both-pool entries (5):**

| Restaurant | Sources | Count |
|------------|---------|-------|
| Casa Montaña | a1 + a3 + a4 + a5 | 4 |
| La Salita | a1 + a2 + a3 | 3 |
| Ricard Camarena | a1 + a2 | 2 |
| El Poblet | a1 + a2 | 2 |
| Canalla Bistro | a3 + a5 | 2 |

---

### Key Findings — 2026-03-21

1. **Middle path prompt is significantly less tedious.** The fully automatic pipeline with a single bulk review at the end was much faster and less fatiguing than per-entry approval at every stage. The bulk table format (numbered rows, single question) was efficient. Adopt this as the standard prompt for future cities.

2. **Article date vs "updated" date distinction is critical.** Devour Tours was listed as "updated October 2025" in search results but fetched content carried a 2017 publication date. The recency filter correctly caught this. When applying a date cutoff, the actual content date matters — not the CMS "last updated" timestamp. Always check the date returned in the fetched text.

3. **Casa Montaña is the most-confirmed Valencia restaurant.** It appeared in 4 sources in Run 3 alone (The Infatuation, Gastro Trinquet, GastroSpain, Amsterdam Foodie) and also appeared in Run 2 sources. It is the single most cross-validated entry in the Valencia dataset.

4. **GastroSpain covers Comunitat Valenciana, not Valencia city only.** Several entries (Alicante, Dénia, Morella, etc.) had to be removed at review. For future runs, note that regional publications may require city-level filtering.

5. **"Both-pool" signal is strongest for Michelin-level restaurants.** In Run 3, the both-pool entries were all Michelin-starred or Michelin-recognised venues. This is partly because EN and ES writers cover different tiers of the market — EN travel writers lean casual/tapas, ES food journalists lean fine dining.

---

### Outstanding Items

- [ ] The three Valencia JSON files (`localbite-valencia-spain.json` from Run 1/2, `localbite-valencia-2025-2026.json` from Run 3) have not been merged into a single canonical Valencia pack.
- [ ] No place IDs (Google Maps) have been added to any Valencia entry.
- [ ] The middle path prompt should be saved as the standard template for future city runs. It should replace the per-entry approval approach as the default.
- [ ] Consider re-running with Las Provincias or Levante-EMV if their paywalls become accessible — both were blocked in Runs 1 and 2.
- [ ] eldiario.es (Run 2) yielded only 3 usable entries from 10 — low return rate. Deprioritise for future runs unless specifically targeting Valencia city restaurants.

---

## Session — 2026-03-22 (Barcelona v4)

### Overview
v4 prompt run on Barcelona to compare results against the v3 run from 2026-03-21. Pipeline ran fully automatically using localbite-middle-path-v4. Single bulk review at end. Final output: 52 restaurants in 26 minutes.

---

### Run Details

**Prompt used:** localbite-middle-path-v4
**Output files:** `localbite-barcelona-raw.json` (58 restaurants), `localbite-barcelona-2025-2026.json` (52 restaurants)
**Sources fetched:** 9
**Run time:** 26 min (v3: 37 min)

| Source | Writer | Language | Type | Article Date |
|--------|--------|----------|------|--------------|
| Barcelona Food Experience | Maria | EN | primary | 2026-02-24 |
| The Infatuation | Isabelle Kliger | EN | secondary | 2025-05-20 |
| Guía Repsol | Lourdes López | ES | primary | 2026-01-23 |
| The New Barcelona Post | Anna Torrents | EN | primary | 2026-01-11 |
| Time Out Barcelona ES | Ricard Martín | ES | secondary | 2026-03-18 |
| Beteve.cat | Carmen Cortés Vidal | CA | primary | 2025-11-05 |
| Ara.cat Mengem | Rosa Rodón | CA | primary | 2025-03-17 |
| ElNacional.cat | Oriol Foix | CA | primary | 2025-02-27 |
| Fancy Nancista | Nancy | EN | primary | 2026-01-12 |

**v4 improvements implemented:**
- Parallel fetches
- Search plan written to file before execution
- Aggregator pre-fetch (feedspot.com + thesocialpost.org)
- 20-search minimum
- Diversity gate
- Quote minimum 15 words
- Cuisine type extraction
- Opening year extraction
- Source type combination field
- Neighbourhood standardisation
- Two-part city variables structure

**Confidence tier breakdown:**
- Tier A (auto-approved): 24
- Tier B (reviewed, kept): 28
- Tier C (auto-rejected): 43
- User removed: 6

**Both-pool count:** 14 (v3: 6)
**Total restaurants:** 52 (v3: 46)

---

### v3 vs v4 Comparison

| Metric | v3 (2026-03-21) | v4 (2026-03-22) |
|--------|-----------------|-----------------|
| Run time | 37 min | 26 min |
| Both-pool entries | 6 | 14 |
| Total restaurants | 46 | 52 |
| Tier C auto-rejected | 20 | 43 |

---

### Key Findings — 2026-03-22

1. **Aggregator pre-fetch seeded 10 new blogger names before Phase 1.** Fetching feedspot.com and thesocialpost.org before any restaurant searches added 10 candidate blogger and writer names to the candidate pool. This directly contributed to CA-language sources being discovered in Phase 1 source selection.

2. **Beteve.cat Slow Food Barcelona 2026 guide was the critical new source.** Its CA-language Cargols award entries created both-pool cross-validation for Berbena, Fishølogy, Suru Bar, Bar Super, Contracorrent Bar and Bistro, and others. Without this source the both-pool count would have remained near v3 levels. The aggregator pre-fetch is what surfaced it.

3. **Time Out ES 30-entry secondary cap worked as intended.** All Time Out single-source entries scored low-confidence due to sub-15-word quotes, dramatically reducing Time Out's dominance over the dataset. Entries where Time Out contributed to multi-source Tier A were preserved. The combination of secondary cap + quote minimum effectively limits Time Out's influence without discarding its cross-validation value.

4. **Export utility script proved its value when Claude Code hit a rate limit mid-session.** `localbite-export.js` applied 6 removals in under a second without needing to re-invoke Claude Code. The script paid for itself immediately on first use under real conditions.

5. **Fancy Nancista is editorially narrow — worth flagging as a v5 pattern.** 9 single-source entries, all Asian restaurants in Eixample. A primary source that covers only one cuisine type in one neighbourhood adds limited diversity. Worth considering a source editorial breadth check for v5 source selection guidance.

---

### Files Produced

| File | Contents |
|------|----------|
| `localbite-barcelona-raw.json` | 58 restaurants (before user removals) |
| `localbite-barcelona-2025-2026.json` | 52 restaurants (final, post-removals) |
| `localbite-barcelona-research-summary.md` | Updated research summary for v4 run |
| `localbite-journal-updated.md` | This journal (updated) |

---

### Outstanding Items

- [ ] No Google Maps place IDs in Barcelona pack
- [ ] No viewer built yet
- [ ] v5 prompt not yet written

---

## Session — 2026-03-22 (Fes, Morocco)

### Overview
First non-European city run. Goal: test the v4 pipeline in a different language context — Arabic/French/English — to understand how it handles cities outside the European food writing ecosystem. Pipeline ran cleanly in 21 minutes. Final output: 10 restaurants. Thin source pool confirmed as a structural finding.

---

### Run Details

**Prompt used:** localbite-middle-path-v4
**Output files:** `localbite-fes-raw.json` (19 restaurants), `localbite-fes-2025-2026.json` (10 restaurants)
**Searches run:** 29 (20 planned + 9 additional Arabic-targeted)
**Tool uses:** 83 | **Tokens:** 114.5k | **Run time:** 21 minutes

| Source | Writer | Language | Type | Article Date |
|--------|--------|----------|------|--------------|
| Anita's Feast | Anita | EN | primary | 2025 |
| MarocLovers | Myriam | FR | primary | 2025 |
| Sainsbury's Magazine | Leah Hyslop | EN | primary | 2025 |

**Confidence tier breakdown:**
- Tier A (auto-approved): 2 — Ishq Restaurant (both-pool), Café Clock (multi-source EN)
- Tier B (reviewed, kept): 8 — 0 user removals
- Tier C (auto-rejected): 9 — 2 low-confidence, 7 MarocLovers concentration cap
- User removed: 0

**Both-pool count:** 1 — Ishq Restaurant (Anita's Feast EN + MarocLovers FR)
**Total restaurants:** 10

---

### Key Findings — 2026-03-22 (Fes)

1. **Thin source pool confirmed — 3 sources is the lowest of any city run to date.** Despite 29 searches including 9 additional Arabic-targeted passes, only 3 sources passed all quality criteria. The majority of candidates were rejected for pre-2025 dates, no named author, or covers all of Morocco rather than Fes specifically. This is a structural finding about Fes's food writing scene, not a pipeline failure. The pipeline handled it correctly: reported the thin pool, ran additional searches, proceeded with what was found.

2. **Arabic gap — search-based discovery does not reach Arabic food writing.** No named-author Arabic-language Fes restaurant articles dated 2025–2026 were found despite targeted searches of Hespress, Goud.ma, Alyaoum24, and other Moroccan Arabic-language outlets. Hypothesis: Arabic food writing about Fes exists but is not indexed by search engines in the same way as European-language content. Direct Jina fetch of Arabic publication food sections — bypassing search entirely — may work better and is worth testing in v5.

3. **Concentration cap fired in production for the first time.** MarocLovers (Myriam) extracted 14 restaurants from a single article, exceeding the 30% single-source Tier B cap. 7 entries auto-rejected. The cap worked as designed: prevented a single FR blogger from dominating over half the final pack. This is particularly important in thin-pool cities where one prolific source can easily distort the dataset.

4. **Hotel restaurant rule adapted for Fes riad culture.** Both flagged hotel entries (Restaurant Gayza, Restaurant L'Amandier) were kept. In Fes, riad hotels are part of the authentic dining experience in a way that a Marriott restaurant in Barcelona is not. The pipeline correctly flagged them; the editorial decision to keep them reflects local context. Worth codifying in v5 as an explicit cultural exception for medina riad dining.

5. **Pipeline ran cleanly — fastest run to date proportionally.** 21 minutes for 3 sources vs 26 minutes for 9 sources in Barcelona v4. No crashes, no rate limit interruptions. Export completed in 3 minutes separately using the pipeline agent.

6. **10-restaurant final pack is honest but thin for production use.** A full production city pack would benefit from manual research supplementing the pipeline — particularly direct outreach to local French and Arabic food writers in Fes, or commissioning a local correspondent.

---

### Pipeline Performance vs Previous Runs

| Metric | Valencia v3 | Barcelona v3 | Barcelona v4 | Fes v4 |
|--------|-------------|--------------|--------------|--------|
| Sources | 5 | 8 | 9 | 3 |
| Both-pool | 5 | 6 | 14 | 1 |
| Final restaurants | 62 | 46 | 52 | 10 |
| Run time | — | — | 26 min | 21 min |

---

### Files Produced

| File | Contents |
|------|----------|
| `localbite-fes-raw.json` | 19 restaurants (all tiers) |
| `localbite-fes-2025-2026.json` | 10 restaurants (final) |
| `localbite-fes-research-summary.md` | Research summary |
| `localbite-fes-search-log.txt` | 29-entry search log |
| `localbite-fes-search-plan.txt` | 20-query search plan |
| `localbite-fes-working.json` | Intermediate working file |
| `localbite-journal-updated.md` | This journal (updated) |

---

### Outstanding Items

- [ ] No Google Maps place IDs in Fes pack
- [ ] Test direct Jina fetch of Arabic publication food sections as alternative to search-based Arabic source discovery
- [ ] Decide whether 10-restaurant pack is production-ready or a methodology case study
- [ ] Consider manual research supplement for thin-source cities
- [ ] Ville Nouvelle restaurants absent — all 10 in medina neighbourhoods; consider targeted FR-language run
- [ ] Upgrade consideration: if running more than one city per sitting becomes regular, Claude Max 5x ($100/month) worth evaluating — rate limit is the main friction point at current Pro plan

---

## Session — 2026-03-22 (Marrakesh, Morocco — v5)

### Overview
Second Moroccan city run, first v5 pipeline run. Goal: test v5 features on a city larger than Fes — better food writing scene, same Arabic challenge — and validate the new writer profile field and direct Arabic publication fetch. Pipeline ran cleanly in 19 minutes. Final output: 14 restaurants.

---

### Run Details

**Prompt used:** localbite-middle-path-v5
**Output files:** `localbite-marrakesh-raw.json` (17 restaurants), `localbite-marrakesh-2025-2026.json` (14 restaurants)
**Searches run:** 32 (24 planned + 8 additional diversity gate)
**Tool uses:** 94 | **Tokens:** 127.4k | **Run time:** 19 minutes

| Source | Writer | Language | Type | Article Date |
|--------|--------|----------|------|--------------|
| Time Out Marrakech | Paula Hardy & Sally Kirby | EN | secondary | 2025-02-25 |
| Marrakech in Morocco | Nessrine Ben Moussa | EN | primary | 2025-07-01 |
| Nos Voyages Heureux | Jean Mayol | FR | primary | 2025-05-04 |
| Luxe Infinity Maroc | Gérard Flamme | FR | primary | 2025-12-26 |
| Miss Konfidentielle | Valérie Desforges | FR | primary | 2025-02-21 |

**v5 new features tested:**
- Writer profiles (`writer_profile` field) — working, all 5 sources profiled
- Direct Jina fetch of Hespress and Goud.ma — confirmed structural Arabic gap; Hespress no food content, Goud.ma 404
- 3 Arabic neighbourhood queries in search plan — did not surface sources, confirmed gap is not query-related
- Riad editorial rule — worked correctly; 7 flagged, 3 removed, 4 kept
- Quote translation labels — working

**Confidence tier breakdown:**
- Tier A (auto-approved): 4 — Nomad, Dar Yacout, Dardar Rooftop, La Grande Table Marocaine
- Tier B (reviewed, kept): 10
- Tier C (auto-rejected): 7 — 3 short quotes, 1 secondary weak detail, 3 concentration cap
- User removed: 3 — Dar Moha, Ksar El Hamra, Palais Gharnata (riad single-source, no dish-level specificity)

**Both-pool count:** 4 (vs 1 for Fes)
**Total restaurants:** 14 (vs 10 for Fes)

---

### Key Findings — 2026-03-22 (Marrakesh)

1. **Marrakesh significantly better than Fes.** 14 vs 10 restaurants, 5 vs 3 sources, 4 vs 1 both-pool. The larger international food writing scene around Marrakesh shows clearly. The v4-to-v5 prompt upgrade also contributed via the riad rule and Arabic neighbourhood queries.

2. **Arabic gap now confirmed as structural — the v5 direct fetch is the definitive test.** Hespress returned social/political content with no food articles. Goud.ma gastronomie returned a 404. 8 additional Arabic searches also found nothing. The gap is not a search-query problem or Jina indexing problem. Future solutions require direct relationships with Arabic-language writers, not pipeline automation. This closes the open item from the Fes run.

3. **French sources are visitor perspectives, not local voices.** All three FR primary sources are independent French travel writers (Nos Voyages Heureux, Luxe Infinity Maroc, Miss Konfidentielle), not Moroccan-press journalists. Credible and independent but their angle is French visitor, not Marrakesh resident. Finding Moroccan-based FR food writers is the clearest path to improving local voice balance.

4. **Time Out secondary dominance in EN single-source entries.** 5 of 8 EN-only entries came from Time Out Marrakech (secondary). The concentration cap applied correctly, but a v6 refresh needs more primary EN sources — specifically English-language writers resident in or regularly covering Marrakesh.

5. **Writer profiles add genuine value.** Seeing that Marrakech in Morocco is run by a long-term Moroccan resident (Nessrine Ben Moussa) vs Nos Voyages Heureux being a French travel journalist (Jean Mayol) gives the recommendations different weight for a reader. Worth keeping and expanding in v6.

6. **Riad editorial rule worked cleanly.** 7 riad entries flagged. 3 removed (Dar Moha, Ksar El Hamra, Palais Gharnata — atmosphere-only, no dish detail). 4 kept with clear justification (La Grande Table Marocaine La Liste #6, Dar Yacout both-pool landmark, SABO Michelin-starred chef, Sesamo La Liste #25). The rule gives the right framework for context-sensitive decisions without auto-rejecting all hotel dining.

---

### Pipeline Performance vs Previous Runs

| Metric | Valencia v3 | Barcelona v4 | Fes v4 | Marrakesh v5 |
|--------|-------------|--------------|--------|--------------|
| Sources | 5 | 9 | 3 | 5 |
| Both-pool | 5 | 14 | 1 | 4 |
| Final restaurants | 62 | 52 | 10 | 14 |
| Run time | — | 26 min | 21 min | 19 min |
| Tokens | — | — | 114.5k | 127.4k |

---

### Files Produced

| File | Contents |
|------|----------|
| `localbite-marrakesh-raw.json` | 17 restaurants (Tier A + B before user removals) |
| `localbite-marrakesh-2025-2026.json` | 14 restaurants (final) |
| `localbite-marrakesh-research-summary.md` | Research summary |
| `localbite-index.json` | Created — all 4 completed city packs plus Lisbon pending |
| `localbite-journal-updated.md` | This journal (updated) |

---

### Outstanding Items

- [ ] No Google Maps place IDs in Marrakesh pack
- [ ] Arabic structural gap confirmed — requires direct writer relationship strategy, not pipeline fix
- [ ] Find Moroccan-based French-language food writers for v6 Marrakesh refresh
- [ ] Find additional primary EN sources for Marrakesh beyond Time Out
- [ ] No residential neighbourhood restaurants in pack — consider manual research supplement
- [x] Viewer build — completed 2026-03-24 (see Session below)
- [ ] Consider Claude Max 5x if running more than one city per sitting becomes regular

---

## Session — 2026-03-24 (Viewer v2 + Geocoding)

### Overview
Built the LocalBite viewer v2 with an interactive map view and geocoded Fes and Marrakesh restaurants. Viewer deployed to GitHub Pages. Multiple deployment and display bugs resolved. Two pending mobile/filter fixes identified and written but not yet deployed.

---

### Viewer v2 — index.html

**Deployed at:** https://localbiteadmin.github.io/localbite/

**Features built:**
- Search bar with live filtering
- Source credits panel
- Both-pool badge tooltip (fixed using body-level JS to avoid CSS clipping)
- List/Map toggle
- Leaflet/OpenStreetMap map view
  - Teardrop markers for restaurants with verified coordinates
  - Dashed circle markers for restaurants on neighbourhood centroids (approximate)
- Dynamic caveat banner — green when all displayed restaurants have verified coordinates, amber when mixed, shows exact counts

**Deployment issues resolved:**
- `./ ` prefix in `localbite-index.json` file paths caused fetch failures — removed
- Infinite recursion in `renderCards` — fixed
- macOS permissions blocking Terminal access to Documents folder — resolved by running from `~/localbite/` instead

**Mobile confirmed:** viewer URL tested on mobile — pins tappable, popups display correctly.

---

### Geocoding — Fes and Marrakesh

**Script:** `localbite-geocode.js` (saved to `~/localbite/`) — uses Nominatim API with rate limiting

**Fes — 9/10 restaurants geocoded:**

| Method | Count |
|--------|-------|
| Nominatim (automatic) | 3 |
| Manual via Google Maps | 6 |
| Still on centroid | 1 |

Remaining on centroid: Café-restaurant Moulay Idriss, Restaurant Benyamna (coordinates not found)

**Marrakesh — 13/14 restaurants geocoded:**

| Method | Count |
|--------|-------|
| Nominatim (automatic) | 5 |
| Manual via Google Maps | 8 |
| Still on centroid | 1 |

Remaining on centroid: SABO — Nominatim returned a false positive (Toronto coordinates). Removed and left as null; falls back to city centroid in viewer.

**Coordinate incidents:**
- **SABO false positive:** Nominatim matched "SABO" to a Toronto venue. Toronto coordinates removed, replaced with correct Marrakesh location via Google Maps — but ultimately no precise coordinates found for SABO. Left as null.
- **+61 false positive:** An entry had Toronto coordinates from a prior false Nominatim match. Removed and replaced with correct Marrakesh location.
- **SABO / La Grande Table Marocaine overlap:** Both use the same Marrakesh city centroid fallback area and overlap on the map. Known limitation, accepted for now.

---

### Key Findings — 2026-03-24

1. **Nominatim false positives are a real risk for unique restaurant names.** SABO matched a Toronto venue because it is a globally rare name that happened to exist there. Any geocoding pipeline using Nominatim should validate results against the expected city bounding box — coordinates outside the city should be treated as null, not silently accepted.

2. **Manual geocoding via Google Maps is fast for small packs.** 14 manual lookups across Fes and Marrakesh took under 30 minutes total. At 10–15 restaurants per city, manual is viable. For Barcelona (52) and Valencia (62), a more automated approach with stricter bounding-box validation will be necessary.

3. **Body-level JS is the correct fix for tooltip clipping in overflow:hidden containers.** The both-pool badge tooltip was clipped by the card container's overflow settings. Moving tooltip rendering to `document.body` and positioning with `getBoundingClientRect()` is the standard pattern — CSS-only fixes (overflow: visible, z-index) do not work when a parent in the chain has overflow:hidden.

4. **GitHub Pages deployment requires all asset paths to be root-relative or bare filenames.** The `./` prefix in `localbite-index.json` caused fetch failures in the Pages context. Lesson: always use bare filenames or absolute paths in JSON config files deployed to GitHub Pages, not relative `./` prefixes.

5. **Map view state is not preserved through filter changes — known bug.** When a price filter is applied while in map view, `renderCards` forces the display back to grid/list layout. Fix already written (renderCards should respect `currentView` state). Needs deploying next session.

6. **List/Map toggle not visible on mobile portrait — known bug.** The `filters-inner` container needs a `filters-scroll` wrapper so the view toggle stays fixed on the right while filters scroll independently. Fix already written. Needs deploying next session.

---

### Files Created or Updated

| File | Change |
|------|--------|
| `index.html` | Viewer v2 — map view, search, source credits, both-pool tooltip, dynamic caveat banner |
| `localbite-geocode.js` | Nominatim geocoding script with rate limiting |
| `localbite-fes-2025-2026.json` | Updated with verified coordinates (9/10) |
| `localbite-marrakesh-2025-2026.json` | Updated with verified coordinates (13/14) |
| `localbite-index.json` | Fixed file paths (removed ./ prefix) |
| `localbite-journal-updated.md` | This journal (updated) |

---

### Pipeline Performance vs Previous Runs

| Metric | Valencia v3 | Barcelona v4 | Fes v4 | Marrakesh v5 |
|--------|-------------|--------------|--------|--------------|
| Sources | 5 | 9 | 3 | 5 |
| Both-pool | 5 | 14 | 1 | 4 |
| Final restaurants | 62 | 52 | 10 | 14 |
| Geocoded | 0/62 | 0/52 | 9/10 | 13/14 |

---

### Outstanding Items

- [ ] Deploy map-view-persistence fix — renderCards must respect `currentView` state and not force grid display in map view
- [ ] Deploy mobile portrait fix — add `filters-scroll` wrapper div so `filters-inner` view toggle stays fixed while filters scroll
- [ ] Geocode Barcelona (52 restaurants) using `localbite-geocode.js` with city bounding-box validation
- [ ] Geocode Valencia (62 restaurants) using `localbite-geocode.js` with city bounding-box validation
- [ ] Find coordinates for Café-restaurant Moulay Idriss and Restaurant Benyamna (Fes) via Google Maps
- [ ] Find coordinates for SABO (Marrakesh) — current Nominatim match was a false positive, left as null
- [ ] Run Lisbon with v4 prompt (`localbite-prompt-v4-lisbon.txt` ready)
- [ ] Remove Lisbon from city dropdown until data is ready (currently shows as pending but fails to load)
- [ ] Share viewer URL with friends for feedback before building more features
- [ ] Custom domain (localbite.com or similar)
- [ ] Consider Claude Max 5x ($100/month) — rate limit was the main friction point this session

---

## Session — 2026-03-25 (Rabat + Chefchaouen v5 + Viewer Fixes + Geocoding)

### Overview

Two Moroccan city packs run using the v5 pipeline in a single session. Geocoding script upgraded to v3 with Nominatim bounding box queries. Viewer bugs fixed and deployed. Foursquare API key obtained but added no value for Moroccan cities.

**Session goal:** Run Rabat and Chefchaouen v5 pipelines, geocode both cities, deploy viewer fixes.

---

### Run 1 — localbite-rabat-2025-2026.json

**Prompt used:** localbite-middle-path-v5
**Output files:** `localbite-rabat-raw.json` (17 restaurants), `localbite-rabat-2025-2026.json` (10 restaurants)
**Run time:** 15 minutes 30 seconds | **Tool uses:** ~83

| Source | Writer | Language | Type | Date |
|--------|--------|----------|------|------|
| National Geographic | Sarah Gilbert | EN | Secondary | 2025-10-21 |
| TelQuel | Farah Nadifi | FR | Primary | 2025-07-15 |
| Maroclovers | Myriam | EN | Primary (borderline) | 2025-07 |

**Confidence tier breakdown:**
- Tier A: 1 (Marea — NatGeo + Maroclovers)
- Tier B reviewed kept: 9
- Tier C auto-rejected: 7 (2 quote quality + 5 concentration cap)
- User removed: 0

**Both-pool count:** 0
**Final restaurants:** 10 — 9 EN only, 1 FR only
**Neighbourhoods:** Hassan (4), Souissi (3), Agdal (1), null (2)

**Geocoding:**
- Nominatim (after bounding box fix): 5
- Manual via Google Maps: 5
- Coverage: 10/10 (100%)
- False positives caught: 1 (Marea matched Ghana — fixed manually)

---

### Run 2 — localbite-chefchaouen-2025-2026.json

**Prompt used:** localbite-middle-path-v5
**Output files:** `localbite-chefchaouen-raw.json` (19 restaurants), `localbite-chefchaouen-2025-2026.json` (17 restaurants)
**Run time:** 21 minutes 54 seconds | **Tool uses:** 96

| Source | Writer | Language | Type | Date |
|--------|--------|----------|------|------|
| chauen.info editorial | — | EN | Primary | 2025 (10-year local guide) |
| Travel Morocco Today | — | EN | Primary | 2025 |
| Rediscovering Emily | Emily | EN | Primary | 2025 |
| Morocco World News | — | EN | Secondary | 2025 |
| Nomadic Matt | Matt Kepnes | EN | Secondary | 2025 |

**Confidence tier breakdown:**
- Tier A: 11
- Tier B reviewed kept: 6
- Tier C auto-rejected: 2 (no quote / no specific detail)
- User removed: 0

**Both-pool count:** 1 (Bab Ssour — 5 sources total, strongest entry in any Morocco pack)
**Final restaurants:** 17 — all EN or EN+FR
**Neighbourhoods:** Medina / Place Uta el-Hammam (all except Molino Garden — null)

**Geocoding:**
- Nominatim v3 with bounding box: 11/17 (65%) — best Morocco result
- Manual via Google Maps: 6
- Coverage: 17/17 (100%)
- False positives: 0

---

### Key Findings — 2026-03-25

1. **Nominatim v3 bounding box improvement works.** 65% hit rate for Chefchaouen vs 30–43% for earlier Morocco cities. Zero false positives vs 1–2 for earlier cities. The bounding box constraint is now confirmed as the right default for all Moroccan geocoding.

2. **Foursquare adds no value for Moroccan cities.** API key obtained and tested. All misses still required manual Google Maps lookup. Foursquare is not worth the setup cost for Morocco at current coverage levels.

3. **Chefchaouen outperformed expectations.** 11/17 Tier A, 1 both-pool, zero user removals, 100% geocoding coverage. Heavy tourist traffic creates strong multi-source EN consensus that compensates for the absence of local food critics.

4. **Rabat is structurally thin.** Zero both-pool, concentration cap fired on a single blogger (Maroclovers) dominating the pool, 5/10 geocoding from Nominatim. The thin source pool is a structural characteristic of Rabat's food writing landscape, not a pipeline failure.

5. **All tourist-facing sources in Chefchaouen is honest and documented.** No local food critics exist in Chefchaouen in 2025–2026 writing. This is a structural fact, noted transparently in the research summary. Not a pipeline failure.

6. **Standard Sonnet 4.6 recommended for well-documented countries (Denmark, Scotland, Portugal).** Extended thinking is only needed for thin-coverage regions like Morocco and Hebrew-language cities where additional search loops and language complexity justify the cost.

7. **Geocoding strategy confirmed: Nominatim v3 + manual Google Maps is the right approach for Morocco.** Foursquare not worth the setup cost. Bounding box validation is essential to catch false positives like the Marea/Ghana match.

---

### Pipeline Performance vs Previous Runs

| Metric | Fes v4 | Marrakesh v5 | Rabat v5 | Chefchaouen v5 |
|--------|--------|--------------|----------|----------------|
| Sources | 3 | 5 | 3 | 5 |
| Both-pool | 1 | 4 | 0 | 1 |
| Final restaurants | 10 | 14 | 10 | 17 |
| Run time | 21 min | 19 min | 15m 30s | 21m 54s |
| Geocoding | 9/10 | 13/14 | 10/10 | 17/17 |

---

### Files Produced

| File | Contents |
|------|----------|
| `localbite-rabat-raw.json` | 17 restaurants (all tiers) |
| `localbite-rabat-2025-2026.json` | 10 restaurants (final) |
| `localbite-chefchaouen-raw.json` | 19 restaurants (all tiers) |
| `localbite-chefchaouen-2025-2026.json` | 17 restaurants (final) |
| `localbite-rabat-research-summary.md` | Research summary for Rabat |
| `localbite-chefchaouen-research-summary.md` | Research summary for Chefchaouen |
| `localbite-geocode.js` | Updated to v3 with Nominatim bounding box |
| `localbite-index.json` | Updated — Rabat and Chefchaouen added |
| `localbite-journal-updated.md` | This journal (updated) |

**Viewer fixes deployed this session:**
- Filter-in-map-view bug fixed — renderCards now respects `currentView` state
- Mobile two-row filter layout deployed
- Sources button added to city hero for mobile visibility

---

### Outstanding Items

- [ ] Push Rabat and Chefchaouen JSON files to GitHub
- [ ] Add Rabat and Chefchaouen neighbourhood centroids to viewer map
- [ ] Run Lisbon with v4 prompt
- [ ] Geocode Barcelona (52 restaurants) and Valencia (62 restaurants)
- [ ] Find coordinates for Café-restaurant Moulay Idriss and Restaurant Benyamna (Fes) via Google Maps
- [ ] Find coordinates for SABO (Marrakesh)
- [ ] Share viewer URL with friends for feedback
- [ ] Consider Claude Max 5x if running more than one city per sitting becomes regular

---

## Session — 2026-03-27 (Lisbon three-strategy methodology test)

### Overview

Three-strategy search methodology test run on Lisbon. Goal: compare a structured baseline (Strategy A), a writer-first emphasis approach (Strategy B), and an enhanced pipeline with pre-phase fetches, supplement pass, COI check, and publisher concentration check (Strategy C) — then select the best as the official Lisbon pack and the standard for future European city runs.

**Session goal:** Run three-strategy search methodology test on Lisbon

---

### Strategy A — Structured baseline (30 queries)

**Queries:** 30 (structured baseline)
**Sources fetched:** 6 | **Both-pool:** 23 | **Restaurants:** 63 | **Tool uses:** ~98 | **Tokens:** ~110k

**Result:** Largest restaurant count but both-pool signal was illusory — all 23 both-pool entries came from Time Out EN + Time Out PT (same publisher, different language editions). Not genuinely independent cross-validation. Time Out Market Lisboa conflict of interest was not flagged. Strategy A archived.

**Output file:** `localbite-lisbon-2025-2026-strategy-a.json` (63 restaurants — archived)

---

### Strategy B — Writer-first emphasis (36 queries)

**Queries:** 36 (writer-first emphasis)
**Sources fetched:** 4 | **Both-pool:** 8 | **Restaurants:** 34 | **Tool uses:** 111 | **Tokens:** 191.3k

**Result:** Highest token cost, fewest sources, weakest pack. The writer-first emphasis added query volume without proportional source diversity. COI check not triggered. Strategy B archived.

**Output file:** `localbite-lisbon-2025-2026-strategy-b.json` (34 restaurants — archived)

---

### Strategy C — Phase 0 direct fetches + 30 queries + Phase 1B supplement + COI check + publisher concentration check

**Queries:** 30 + Phase 1B supplement
**Sources fetched:** 5 | **Both-pool:** 0 | **Restaurants:** 36 | **Tool uses:** 85 | **Tokens:** 137.7k

**Result:** Lowest token cost, all independent sources, no COI issues. Zero both-pool is a structural finding (EN and PT critics cover different restaurant segments), not a pipeline failure. Strategy C selected as official Lisbon pack and standard for future European city runs after two prompt fixes.

**Output file:** `localbite-lisbon-2025-2026-strategy-c.json` → `localbite-lisbon-2025-2026.json` (36 restaurants — official)

---

### Strategy Comparison

| Metric | Strategy A | Strategy B | Strategy C |
|--------|-----------|-----------|-----------|
| Queries | 30 | 36 | 30 + supplement |
| Sources | 6 | 4 | 5 |
| Both-pool | 23 (flawed) | 8 | 0 (structural) |
| Restaurants | 63 | 34 | 36 |
| Tool uses | ~98 | 111 | 85 |
| Tokens | ~110k | 191.3k | 137.7k |
| COI flagged | No | No | Yes |
| Independent sources | No | Partial | Yes |
| Selected | Archived | Archived | **Official** |

---

### Key Findings — 2026-03-27

1. **Both-pool signal must be redefined.** Strategy A's 23 both-pool entries came from Time Out EN + Time Out PT — the same publisher in different language editions. Same-publisher cross-language editions do not qualify as independent agreement. Both-pool now requires two editorially independent organisations from different publishers, different language.

2. **Strategy A wins on quantity but loses on source quality and transparency.** 63 restaurants sounds strong but the cross-validation is a publisher artefact, not reader consensus. Without the publisher independence check, both-pool is a misleading metric.

3. **Strategy C wins on source quality. Zero both-pool is honest, not a failure.** Independent EN and PT critics in Lisbon cover different restaurant segments — this is a structural characteristic of Lisbon's food writing scene, not a gap in the pipeline. Documenting it is the correct and valuable outcome.

4. **Pre-phase aggregator seed fetch confirmed useless for European cities.** Remove from prompt for future European city runs.

5. **Fetch discipline (Test D) confirmed reliable in v5.** The Seville fabrication problem is fixed. No fabricated entries in any of the three Lisbon strategy runs.

6. **Time Out URL structure changed between Strategy A and C runs.** URLs are unstable — a known risk for any pipeline that re-fetches sources across multiple sessions or strategy passes.

7. **Time Out Market Lisboa COI confirmed and correctly flagged in Strategy C.** Time Out recommends restaurants within a venue it operates commercially (Time Out Market). This is a genuine conflict of interest. Strategy A and B both missed it; Strategy C caught it.

---

### Decisions Made

- **Official Lisbon pack:** Strategy C (`localbite-lisbon-2025-2026.json`, 36 restaurants)
- **Both-pool redefinition:** requires two editorially independent organisations from different publishers, different language — same-publisher cross-language editions do not qualify
- **Strategy C is the standard** for future European city runs after two prompt fixes below
- **Barcelona both-pool count (14) needs audit** before next viewer update — may include same-publisher cross-language pairs

---

### Prompt Fixes Required Before Next City Run

1. **COI instruction must be clearer:** "INCLUDE with ⚠ coi flag — do NOT exclude"
2. **Both-pool definition must be added to Phase 3 tier assignment** explicitly stating same-publisher cross-language editions do not qualify

---

### Files Produced

| File | Contents |
|------|----------|
| `localbite-lisbon-2025-2026.json` | Strategy C, 36 restaurants — official |
| `localbite-lisbon-2025-2026-strategy-a.json` | 63 restaurants — archived |
| `localbite-lisbon-2025-2026-strategy-b.json` | 34 restaurants — archived |
| `localbite-lisbon-2025-2026-strategy-c.json` | 36 restaurants — source for official |
| `localbite-lisbon-test-plan.md` | Three-strategy test plan |
| `localbite-lisbon-test-findings.md` | Deep analysis of all three strategies (v1.2, 770 lines) |
| `localbite-strategy-c-structure.md` | Strategy C pipeline structure reference |

---

### Outstanding Items

- [ ] Geocode Lisbon using Nominatim v3 + manual Google Maps
- [ ] Add Lisbon to localbite-index.json
- [ ] Push Lisbon to GitHub
- [ ] Audit Barcelona both-pool count (14 entries) against corrected both-pool definition (same-publisher cross-language pairs do not qualify)
- [ ] Apply two prompt fixes (COI instruction + both-pool definition) before running Porto or any other city
- [ ] Consider merge of Strategy A and C for richer Lisbon pack in future pass
- [ ] Share viewer URL with friends for feedback

---

## Session — 2026-03-31 (Proximity Feature Build)

### Overview

Proximity feature built and deployed to the LocalBite viewer (`index.html`) on GitHub Pages. Feature allows users to sort restaurants by distance from their current location in map view. Full spec written, all pre-implementation checks completed, implementation done via Claude Code, tested on both desktop and mobile Safari.

**Session goal:** Build and ship the proximity feature for the static viewer

---

### Spec Development

Before writing any code, eight pre-implementation checks were run against the live `index.html` to resolve all unknowns:

1. **City loading architecture** — `currentCityData` confirmed as module-level variable, set in `loadCity()`
2. **Map container structure** — `<div id="map">` confirmed at line 928, no `position: relative` (needed to add)
3. **Button patterns** — `.view-btn` CSS confirmed: DM Sans, 12px, border-radius 20px, var(--cream) background
4. **View state management** — `currentView` module-level, set via function at line 1431
5. **Map lifecycle** — full teardown via `leafletMap.remove()` on city switch confirmed at line 1619
6. **Marker management** — `mapMarkers` array confirmed, cleared via `removeLayer` loop
7. **Mobile viewport** — breakpoints at 600px and 900px, button inside `#map` avoids filter row
8. **Geolocation** — no existing code, clean slate

JSON schema verified against `localbite-fes-2025-2026.json`:
- Coordinate fields are `lat` and `lng` (not `latitude`/`longitude`)
- Restaurants without verified coordinates have `"lat": null, "lng": null`
- `geo_source` values: `"nominatim"` and `"manual"` — no `"centroid"` value

Four design decisions made:

| Question | Decision |
|----------|----------|
| User not in city | Show non-blocking toast; still sort by distance |
| Sort behaviour | Toggle: active button replaces default sort; tap again resets |
| Unverified-coord restaurants | Show last, no distance badge |
| Map recentre | Recentre on user only if within city bounding box |

Spec written as `localbite-proximity-spec.md` v1.1 (corrected from v1.0 after JSON schema check revealed `latitude`/`longitude` field name errors and `coordinate_source` centroid detection approach was wrong).

---

### Implementation

Claude Code ran the full implementation in one session with one transient API 500 error mid-run (recovered automatically). All 13 implementation steps completed:

1. `position: relative` added to `#map` CSS
2. `CITY_BOUNDS` and `isWithinCityBounds()` added for all 8 cities
3. `haversineKm()` distance function added
4. `showToast()` utility function added
5. Module-level variables added: `userLocationMarker`, `proximityMode`, `userLatLng`
6. Find Me button HTML added inside `<div id="map">`
7. Find Me button CSS added (matching `.view-btn` style)
8. `handleFindMe()` function added
9. Click handler and view-switch show/hide wired up
10. `renderCards` sort comparator modified to check `proximityMode`
11. Distance badge added to `cardHTML`
12. Distance badge CSS added
13. City-switch cleanup added to `loadCity()`

---

### Bugs Fixed During Testing

Three bugs emerged during browser testing that required fixes beyond the original spec:

**1. Map zoom level wrong on recentre**
`leafletMap.getZoom()` returned a very low zoom level at the moment Find Me fired. Fixed by replacing with hardcoded zoom 14.

**2. `fitBounds` overriding `setView`**
`updateMap` called `fitBounds` after markers were added, zooming out to fit all restaurant pins and overriding the user-location `setView`. Fixed by wrapping `fitBounds` in `if (!proximityMode)` check.

**3. `setView` firing before `updateMap` completed**
`setView` was called before `renderCards` → `maybeUpdateMap` → `updateMap` sequence completed, so the map view was reset by marker placement. Fixed by moving `setView` to after `renderCards`.

**4. Blue dot disappearing**
`circleMarker` was being lost after `updateMap` redrew the map. Fixed by switching to `L.divIcon` based `L.marker` with `zIndexOffset: 9999`, which persists correctly above the tile and marker layers.

---

### Testing Results

| Test | Result |
|------|--------|
| In-city user (fake Toronto coords) | ✓ Map recentres, blue dot placed, distances shown |
| Out-of-city user | ✓ Toast shown, distances still calculated |
| Permission denied | ✓ Error toast shown, state unchanged |
| Null-coord restaurants | ✓ Sort last, no distance badge |
| Filter change while proximity active | ✓ Proximity sort persists |
| City switch while proximity active | ✓ State resets, button resets |
| Mobile Safari (iPhone) | ✓ Permission prompt shown, blue dot placed, distances accurate |
| Desktop Safari | ✓ Working after enabling Location Services for Safari in System Settings |

---

### Key Findings

1. **Safari geolocation requires `https://`** — `file://` and `http://localhost` both blocked. GitHub Pages (`https://`) works correctly on both desktop and mobile once system-level Location Services is enabled for Safari.

2. **`circleMarker` unreliable in Safari** — Leaflet's `circleMarker` disappeared after map redraws in Safari. `L.divIcon` marker with high `zIndexOffset` is the reliable cross-browser approach for a user location dot.

3. **`setView` must fire after all map updates** — Any call to `updateMap` or `fitBounds` after `setView` will override the view. The correct pattern is: set state → render cards → update map → set view → add blue dot. Order matters.

4. **`fitBounds` needs a proximity mode guard** — The existing `fitBounds` call in `updateMap` is correct for normal city loading but must be skipped when proximity mode is active, otherwise it zooms out to fit all restaurant pins.

5. **Spec field name errors caught by pre-implementation check** — The spec initially used `latitude`/`longitude` and a `coordinate_source` centroid check. The JSON schema grep before implementation caught both errors. Pre-implementation checks are essential before handing specs to Claude Code.

---

### Files Produced

| File | Contents |
|------|----------|
| `index.html` | Updated with proximity feature (219 insertions, 4 deletions) |
| `localbite-proximity-spec.md` | Full build spec v1.1 |

---

### Outstanding Items

- [ ] Fix geocoding for Hawker, Henry's Restaurant, and Yan Dining Room in Toronto JSON — current coordinates are wrong, causing incorrect distance badges
- [ ] Initial map view for Toronto (and other cities) opens at ~50 mile radius zoom — consider tightening default zoom for cities with wide restaurant distribution
- [ ] Desktop Safari location permission requires manual system-level enable — no in-browser workaround found; document this for future reference
- [ ] Update journal on Mac with this entry

# Session — 2026-03-31 (QA Audit — Chefchaouen Anonymous Source Fix)

### Overview

Cross-city source fetch QA audit conducted across all 7 live cities (35 sources total). Identified 9 sources with persistent fetch failures today. Discovered that Chefchaouen pack included two anonymous sources (no named writer) — a violation of LocalBite's core editorial rule.

---

### QA Audit Findings — All Cities

Full fetch audit results:

| City | Source | Status | Restaurants in Pack |
|------|--------|--------|---------------------|
| Barcelona | El Nacional (Oriol Foix) | ❌ 403 today | 2 |
| Valencia | Grupo Gastro Trinquet (Albert Padilla) | ❌ Timeout today | 19 |
| Lisbon | The Guardian (Célia Pedroso) | ❌ Blocked permanently | 10 |
| Lisbon | Observador.pt (Carolina Sobral) | ❌ 402 Paywall | 6 |
| Lisbon | Ola Daniela (Daniela Sunde-Brown) | ❌ 415 Error | 9 |
| Marrakesh | Marrakech in Morocco (Nessrine Ben Moussa) | ❌ 403 today | 5 |
| Rabat | Telquel.ma (Farah Nadifi) | ❌ 403 today | 1 |
| Chefchaouen | Sir Driver Tours (anonymous) | ❌ Robots/Timeout | 11 |
| Chefchaouen | Chauen.info (anonymous) | ❌ 403 today | 3 (all corroborated) |

**Key finding:** All failing sources did contribute restaurants at pipeline run time — the failures are happening today during the QA audit, not at the time of the original pipeline run. The restaurants in the packs are validly sourced. Source URLs becoming inaccessible after the pipeline run (paywalls, blocks, site changes) is a known structural risk, not a pipeline failure.

**Exception:** Chefchaouen S2 (Sir Driver Tours) and S3 (Chauen.info) — these are anonymous sources with no named writer, which violates LocalBite's named-writer rule regardless of fetch status.

---

### Chefchaouen Fix Applied

**Problem:** Two anonymous sources (S2: Sir Driver Tours, S3: Chauen.info) were included in the Chefchaouen pack with no named writer. S3 contributed 5 restaurants with zero named-source corroboration. S2 contributed 11 restaurants, all corroborated by named sources.

**Fix applied:** Removed 5 restaurants that relied solely on S3 (Chauen.info) with no named-source corroboration:
- Molino Garden
- Morisco
- Casa Aladdin
- Bilmos
- Hamsa

**Chefchaouen pack: 17 → 12 restaurants.**

**Not fixed (deferred to v2):** S2 (Sir Driver Tours) remains in the sources array because removing it would drop 8 restaurants from multi-source to single-source status, artificially deflating source counts for a 12-restaurant pack. All 11 restaurants attributed to S2 are corroborated by at least one named source (S5: @girlwiththepassport). S3 also retained for the same reason — its 3 remaining restaurants are all corroborated.

---

### Known Issues — Chefchaouen v2

- [ ] S2 (Sir Driver Tours) and S3 (Chauen.info) have no named writer — violates named-writer rule. In v2, find named replacements for these sources and remove S2/S3 from the pack entirely
- [ ] With S2/S3 removed, 8 restaurants would drop to single-source — v2 should find additional named sources to corroborate them or accept the single-source status honestly
- [ ] Chefchaouen is a small city with thin food writing coverage — v2 may not improve significantly on source quality without direct writer outreach

---

### Known Issues — Other Cities (deferred)

- **Lisbon:** 25 of 36 restaurants sourced from URLs now inaccessible (paywall or block). Source attribution is accurate at time of ingestion. Source links in viewer are dead for these 3 sources. Deferred — proof of concept stage.
- **Barcelona:** El Nacional 403 — 2 restaurants affected, both corroborated. Low priority.
- **Valencia:** Grupo Gastro Trinquet timeout — 19 restaurants affected. May be transient. Worth re-checking before v2 Valencia run.
- **Marrakesh:** Marrakech in Morocco 403 — 5 restaurants affected, all corroborated by other sources. Low priority.
- **Rabat:** Telquel.ma 403 — 1 restaurant affected. Low priority.
- **Toronto:** Fetch failures at pipeline time (not today) — NOW Toronto, Foodism (partial), Madame Marie (partial) — up to 29 restaurants potentially missed. Supplementary run recommended before Toronto goes more public.

---

### Files Updated

| File | Change |
|------|--------|
| `localbite-chefchaouen-2025-2026.json` | Removed 5 anonymous-only restaurants (17 → 12) |
| `localbite-journal-updated.md` | This addendum appended |

---

### Outstanding Items Added This Session

- [ ] Fix geocoding for Hawker, Henry's Restaurant, and Yan Dining Room in Toronto JSON
- [ ] Run Toronto supplementary pass for 3 failed/partial fetch sources (NOW Toronto, Foodism Betty Binon, Madame Marie summer 2025)
- [ ] Audit Barcelona both-pool count against corrected definition before next viewer update
- [ ] Chefchaouen v2 — find named sources to replace S2 and S3
- [ ] Add fetch quality gate to pipeline prompt before next city run
- [ ] Add post-run QA script to Claude Code workflow — re-fetch all sources after each city run
- [ ] Policy decision: sources that become inaccessible after pipeline run — add note to viewer Sources panel or accept as known limitation


## Session — 2026-04-01 (Cross-City QA Audit + Chefchaouen Cleanup)

### Overview

Full QA audit conducted across all 7 live cities (35 sources). Fetch status checked for all sources. Attribution integrity issues identified and documented. Chefchaouen anonymous-only restaurants removed. Toronto geocoding errors fixed in two rounds.

---

### Cross-City QA Audit — Fetch Status

All 35 sources across 7 cities re-fetched to check current accessibility.

| City | Source | Status | Restaurants in Pack |
|------|--------|--------|---------------------|
| Barcelona | Oriol Foix / El Nacional | ❌ 403 Forbidden | 2 (Granja Elena, Bar Iberia) |
| Valencia | Albert Padilla / Grupo Gastro Trinquet | ⚠ Timeout (possibly transient) | 19 of 62 |
| Lisbon | Célia Pedroso / The Guardian | ❌ Permanent scraper block | 10 of 36 |
| Lisbon | Carolina Sobral / Observador.pt | ❌ 402 Paywall | 6 of 36 |
| Lisbon | Daniela Sunde-Brown / Ola Daniela | ❌ 415 Error | 9 of 36 |
| Marrakesh | Nessrine Ben Moussa / Marrakech in Morocco | ❌ 403 Forbidden | 5 of 14 |
| Rabat | Farah Nadifi / Telquel.ma | ❌ 403 Forbidden | 1 of 10 |
| Chefchaouen | Sir Driver Tours (S2) | ❌ Robots/Timeout | 11 of 17 (all corroborated) |
| Chefchaouen | Chauen.info (S3) | ❌ 403 Forbidden | 8 of 17 (3 corroborated, 5 anon-only) |
| All others | — | ✅ Accessible | — |

**Key finding:** These sources contributed restaurants at pipeline time — the failures are happening now, after the fact. The original fetches were successful. The sources are now inaccessible due to paywalls going up, sites blocking scrapers, or sites going down.

**Attribution policy decision:** Sources should remain in the Sources panel because they did contribute restaurants and attribution was accurate at time of ingestion. The issue is source link stability, not attribution integrity. Added to known issues for future monitoring.

**Lisbon exposure:** 25 of 36 restaurants (69%) come from sources now inaccessible. These are validly sourced but users cannot click through to verify. Documented as known limitation.

---

### Confidence Tier Summary — All Cities

| City | Tier A | Tier B Kept | User Removed | Tier C Rejected | Cap Applied | Final Pack |
|------|--------|-------------|--------------|-----------------|-------------|------------|
| Barcelona | 24 | 34 | 0 | 43 | 0 | 52 |
| Valencia | — | — | — | — | — | 62 (no confidence_tiers block — early pipeline) |
| Lisbon | 2 | 33 | 0 | 1 | 0 | 36 |
| Fes | 2 | 8 | 0 | 9 | 7 | 10 |
| Marrakesh | 4 | 10 | 3 | 7 | 3 | 14 |
| Rabat | 1 | 9 | 0 | 7 | 5 | 10 |
| Chefchaouen | 11 | 6 | 0 | 2 | 0 | 17→12 |
| Toronto | 12 | 34 | 4 | 33 | 4 | 45→52 |

**Notable:** Valencia has no confidence_tiers block — built with early pipeline version before tier tracking was implemented. Data quality gap for 62 restaurants.

---

### Chefchaouen Cleanup — Anonymous Sources

**Issue identified:** Sources S2 (Sir Driver Tours) and S3 (Chauen.info) have no named writer. Both violate LocalBite's core named-writer editorial rule. Both are now inaccessible (403/timeout).

**Analysis:**
- 5 restaurants existed only in S3 (Chauen.info) with no named-source corroboration: Molino Garden, Morisco, Casa Aladdin, Bilmos, Hamsa
- 11 restaurants from S2/S3 were corroborated by named sources (S1 Omar Nomades, S4 Emily, S5 @girlwiththepassport) and retained

**Action taken:** 5 anonymous-only restaurants removed from `localbite-chefchaouen-2025-2026.json`. Pack reduced from 17 to 12.

**Decision on S2 and S3 sources:** Left in sources array because removing them would artificially deflate source_count for 8 restaurants (dropping them from multi-source to single-source). Flagged as known issue for Chefchaouen v2.

**Chefchaouen v2 action required:** Find named sources to replace S2 and S3. The pack currently has two anonymous sources that should not have passed the named-writer rule. A v2 run should find Chefchaouen-based food writers or travel writers with clear bylines.

---

### Files Updated This Session

| File | Change |
|------|--------|
| `localbite-chefchaouen-2025-2026.json` | 5 anonymous-only restaurants removed (17→12) |
| `localbite-toronto-2025-2026.json` | 20 geocoding fixes across 2 rounds (see Session — 2026-03-31 Toronto Geocoding Fixes for detail) |
| `localbite-journal-updated.md` | Session entries added |
| `.gitignore` | Image file patterns added to stop tile files cluttering GitHub Desktop |
| `localbite-proximity-spec.md` | Committed to repo |

---

### Outstanding Items (as of end of session)

- [ ] Update `localbite-index.json` — Toronto count 45→52 (after supplementary run), Chefchaouen 17→12
- [ ] Toronto supplementary run — NOW Toronto, Foodism Betty Binon, Madame Marie summer 2025 now fetchable
- [ ] Barcelona both-pool audit (14 entries) against corrected definition
- [ ] Check all city packs for pipeline notes in writer profiles (Toronto cleaned this session)
- [ ] Add fetch quality gate to pipeline prompt before next city run
- [ ] Chefchaouen v2 — find named sources to replace S2 and S3
- [ ] Toronto v2 — Foodism concentration (53% of pack)
- [ ] Initial map zoom too wide for Toronto

---



## Session — 2026-03-31 (Toronto Geocoding Fixes)

### Overview

Toronto geocoding audit and fixes completed. 20 restaurants had incorrect or missing coordinates — a combination of Nominatim/Photon false matches and new restaurants not yet in OpenStreetMap. All fixable restaurants corrected via manual Google Maps lookup.

---

### Geocoding Audit Results

**Bounding box check:** No restaurants outside Toronto bounding box (43.58–43.86, -79.64 to -79.12) after initial fixes. However 7 restaurants were found north of Eglinton Avenue (lat > 43.706) with neighbourhood mismatches — indicating in-city false positives that bounding box validation cannot catch.

**Round 1 — Null coordinates (12 restaurants):**

| Restaurant | Neighbourhood | Outcome |
|-----------|---------------|---------|
| Alebrije | Little Italy (College St) | ✅ Fixed |
| Belle Isle | Little India (Gerrard) | ✅ Fixed |
| Bisteccheria Sammarco | St. Lawrence | ✅ Fixed |
| The Lunch Lady of Saigon | Ossington | ✅ Fixed |
| PUNCH | Entertainment District | ✅ Fixed |
| Tono by Akira Back | Yorkville | ✅ Fixed |
| Akin | Downtown Core | ✅ Fixed |
| DaNico | Little Italy (College St) | ✅ Fixed |
| Morrellina's | Annex | ✅ Fixed |
| Oro Luxury Dining | Little Italy (College St) | ❌ Not found — left as null |
| Sushi Yugen | Financial District | ✅ Fixed |
| Vinny Restaurant + Vinyl Bar | King West | ✅ Fixed |

**Round 1 — Wrong coordinates (3 restaurants):**

| Restaurant | Wrong Location | Outcome |
|-----------|---------------|---------|
| Hawker | North York (Nominatim false match) | ✅ Fixed |
| Henry's Restaurant | North York (Photon false match) | ✅ Fixed |
| Yan Dining Room | North York/Scarborough (Photon false match) | ✅ Fixed |

**Round 2 — In-city false positives north of Eglinton (7 found, 5 fixed):**

| Restaurant | Issue | Outcome |
|-----------|-------|---------|
| Radici Project | Geocoded to north of Eglinton, listed as Little Italy | ✅ Fixed |
| Stefano's Diner | Geocoded north of Eglinton, listed as Dundas West | ✅ Fixed |
| Taverne Bernhardt's | Geocoded north of Eglinton, listed as Ossington | ✅ Fixed |
| Zia's Place | Geocoded north of Eglinton, listed as Little Portugal | ✅ Fixed |
| Petros82 | Geocoded to York Mills Rd location, listed as North York | ✅ Fixed — corrected to Adelaide St downtown location |
| Ju-Raku | North of Eglinton, listed as North York | ✅ Correct — legitimately in North York |
| NOPO Korean Bistro | North of Eglinton, listed as Yorkville | ✅ Coordinates correct — neighbourhood corrected to North York |

---

### Final Geocoding State — Toronto

| Category | Count |
|----------|-------|
| Valid downtown coordinates | 43 |
| Null (Oro Luxury Dining — not found) | 1 |
| Legitimately in North York (Ju-Raku, NOPO, Petros82) | 3 |
| **Total restaurants** | **45** |

---

### Key Findings

1. **Bounding box validation catches out-of-city false positives but not in-city ones.** 7 restaurants were geocoded to wrong Toronto locations that were still within the bounding box. The only way to catch these is cross-referencing coordinates against neighbourhood expectations — a manual step.

2. **Photon false matches are as common as Nominatim false matches.** Henry's Restaurant and Yan Dining Room were both Photon matches to wrong North York locations. Photon is not meaningfully more accurate than Nominatim for new or ambiguous restaurant names.

3. **New restaurants (2025 openings) are systematically underrepresented in OSM.** Most of the 12 null-coordinate restaurants were 2025 openings. This is structural — OSM lags behind new openings by months or years. For any city with recent restaurant data, manual geocoding will always be needed for a significant portion of the pack.

4. **Neighbourhood field in JSON is not always reliable for geocoding validation.** NOPO Korean Bistro was listed as "Yorkville" but is actually in North York — a pipeline extraction error. Cross-referencing neighbourhood against coordinates revealed the discrepancy.

5. **Oro Luxury Dining could not be found** — may have closed or rebranded before or shortly after the pipeline run. Left as null with neighbourhood centroid fallback in the viewer.

---

### Toronto Restaurant Count Discrepancy — Resolved

Search log reported 46 restaurants in the final file; JSON contains 45. Investigation found:
- 4 user removals at review stage: Beso by Patria, Don Alfonso 1890, Mhel, MSSM ✅ confirmed
- 1 additional missing restaurant: The Ballyhoo Public House (Tier B, Foodism summer 2025) — confirmed permanently closed. Correctly excluded. Not a pipeline error.
- confidence_tiers metadata slightly off (reviewed_kept: 34 should be 33) — minor documentation issue, not corrected.

---

### Files Updated

| File | Change |
|------|--------|
| `localbite-toronto-2025-2026.json` | 20 geocoding fixes across 2 rounds; NOPO neighbourhood corrected |

---

### Outstanding Items

- [ ] Oro Luxury Dining — permanently closed or rebranded? Remove from pack in Toronto v2 if confirmed closed
- [ ] Toronto supplementary run — NOW Toronto (Keema Lesesne), Foodism (Betty Binon), Madame Marie summer 2025 all now fetchable; up to 29 restaurants potentially recoverable
- [ ] Toronto initial map zoom too wide — fitBounds zooms to fit all pins across Greater Toronto area; consider tighter default zoom
- [ ] Update localbite-index.json — Chefchaouen restaurant count needs correcting from 17 to 12
- [ ] Barcelona both-pool audit against corrected definition (same-publisher cross-language editions do not qualify)
- [ ] Add fetch quality gate to pipeline prompt before next city run
- [ ] Add post-run QA script to Claude Code workflow
- [ ] Chefchaouen v2 — find named sources to replace anonymous S2 and S3

## Session — 2026-04-02 (Toronto Supplementary Run + Source Profile Fixes)

### Overview

Toronto supplementary pass completed. Three sources that failed or partially fetched during the original pipeline run (2026-03-30) were re-fetched and extracted manually. 10 restaurants added, 3 permanently closed restaurants removed during geocoding, 4 writer profiles cleaned of internal pipeline notes.

Final Toronto pack: 52 restaurants (up from 45 original).

---

### Supplementary Run — Sources Re-fetched

| Source | Writer | Original failure | Status today | New restaurants added |
|--------|--------|-----------------|-------------|----------------------|
| NOW Toronto (Caribbean guide) | Keema Lesesne | Fetch failed (840 chars) | ✅ Fully accessible | 7 (after removing 1 established restaurant, 3 permanently closed) |
| Foodism CA (winter 2026) | Betty Binon | Partial fetch (3,847 chars) | ✅ Fully accessible | 0 — excluded due to Foodism concentration cap |
| Madame Marie (summer 2025) | Mme. M. | Partial fetch (2,847 chars) | ✅ Fully accessible | 3 (after removing 3 permanently closed) |

---

### Foodism Concentration Cap — Decision Documented

Foodism already had 24 single-source entries in the 45-restaurant pack (53% — well over the 30% cap). The cap should have fired during the original pipeline run but did not. Adding 5 more Foodism single-source entries from the Betty Binon article would have worsened the concentration to 58%. Decision: exclude all Foodism additions from this supplementary pass. Document as known issue for Toronto v2.

Note: the 30% cap was designed for multilingual cities to prevent one language dominating. For single-language cities like Toronto, Foodism's dominance may reflect the structural reality of Toronto food writing. This warrants reconsideration in v2 — either a higher cap for single-language cities or a publisher-level cap rather than a source-level cap.

---

### Restaurants Added (10 initial, 3 removed as permanently closed)

**NOW Toronto — Keema Lesesne:**

| Restaurant | Neighbourhood | Cuisine | Status |
|-----------|--------------|---------|--------|
| Chubby's Jamaican Kitchen | Entertainment District | Jamaican | ✅ Added |
| Mona's Roti | Scarborough | Trinidadian | ✅ Added |
| Taste of Life Restaurant and Lounge | Etobicoke | St. Vincent Caribbean | ❌ Permanently closed |
| Simone's Caribbean Restaurant | Greektown (Danforth) | Jamaican | ✅ Added |
| Tropical Nights | Scarborough | Guyanese fusion | ❌ Permanently closed |
| 9 Mile | Bloor West Village | Jamaican | ✅ Added |
| Old Nassau | Weston | Bahamian | ✅ Added |
| Patois | Dundas West | Asian Caribbean | ❌ Excluded — established restaurant, not a 2025-2026 opening |

**Madame Marie — summer 2025:**

| Restaurant | Neighbourhood | Cuisine | Status |
|-----------|--------------|---------|--------|
| Occhiolino | Annex | Italian pasta | ✅ Added |
| Tutto Panino | Roncesvalles | Italian sandwiches | ✅ Added |
| Harlem | Queen West | Soul food | ❌ Permanently closed |

**Also excluded from Madame Marie (no dish specifics):** Dopamina, Ayla, Bonito's, Casa Morales, Ariete e Toro

**Also excluded from Foodism (no dish specifics or chain):** Cassette, Chon Modern Thai Cuisine, Bar Filo, Hello Nori (chain), Mandy's (chain)

---

### Geocoding — Supplementary Restaurants

All 7 added restaurants geocoded manually via Google Maps. All coordinates verified within Toronto bounding box.

---

### Writer Profile Fixes

Four writer profiles contained internal pipeline notes (fetch quality, tier assignments) visible to users in the Sources panel. All cleaned:

| Source | Note removed |
|--------|-------------|
| foodism-winter-new-2026 | "fetch was partial (3,847 chars); restaurants auto-rejected at Tier C" |
| madamemarie-summer-2025 | "fetch was partial (2,847 chars); auto-rejected at Tier C; Four corroborated by Foodism qualified as Tier A" |
| nowtoronto-caribbean-2025 | "fetch failed (840 chars); all 8 restaurants auto-rejected at Tier C" |
| nowtoronto-michelin-2025 | Geographic exclusion note |

**Going forward:** pipeline prompt must be updated to never include fetch quality, tier assignments, or rejection notes in the `writer_profile` field — this field is user-facing.

---

### Toronto Pack — Final State

| Metric | Original | After supplementary |
|--------|---------|-------------------|
| Restaurants | 45 | 52 |
| Sources | 8 | 8 (no new sources added) |
| NOW Toronto restaurants | 0 | 7 |
| Madame Marie summer restaurants | 4 (corroborated) | 7 |
| Geocoded | 43 | 50 |
| Null coordinates | 2 | 2 (Oro Luxury Dining + 1) |

---

### Key Findings

1. **3 of 10 supplementary restaurants were permanently closed.** Caribbean dining spots in particular have high turnover. For any supplementary pass, manual verification of open/closed status is essential before adding to the pack.

2. **Patois exclusion confirmed.** Patois at 794 Dundas St W is an established restaurant that opened well before 2025. Its inclusion in Keema Lesesne's 2025 Caribana guide was as a recommendation, not a new opening. Correctly excluded.

3. **Foodism concentration is a structural problem for Toronto.** With 24 of 45 original restaurants from Foodism sources, the pack is over-reliant on a single publisher. This is partly a pipeline failure (cap didn't fire) and partly structural (Foodism is the most prolific Toronto food publisher). Toronto v2 should actively seek to diversify sources and apply the cap correctly.

4. **Writer profiles must never contain pipeline internals.** The pipeline wrote fetch quality notes and tier rejection counts into user-facing writer profiles. This is a prompt quality failure. Add explicit instruction to v6 prompt: writer_profile field is user-facing — no pipeline notes, no fetch data, no tier information.

5. **Mobile Safari caching.** Changes to GitHub Pages JSON files may not appear on mobile Safari for several minutes due to aggressive caching. Private browsing tab is the reliable workaround for immediate verification.

---

### Files Updated

| File | Change |
|------|--------|
| `localbite-toronto-2025-2026.json` | +7 restaurants, -3 permanently closed, geocoding, writer profile fixes |

---

### Outstanding Items

- [ ] Toronto v2 — address Foodism concentration (24/52 single-source entries from one publisher)
- [ ] Toronto v2 — find additional independent sources to diversify pack
- [ ] Reconsider concentration cap rules for single-language cities
- [ ] Add prompt instruction: writer_profile is user-facing — no pipeline notes ever
- [ ] Check other city packs for pipeline notes in writer_profile fields
- [ ] Update localbite-index.json — Toronto restaurant count now 52
- [ ] Barcelona both-pool audit against corrected definition
- [ ] Add fetch quality gate to pipeline prompt before next city run
- [ ] Chefchaouen v2 — find named sources to replace anonymous S2 and S3

## Session — 2026-03-30 (Toronto Pipeline)

### Overview
Toronto pipeline run using v5 prompt. First North American city. Rate limit interrupted an earlier attempt; this session completed the full run. 52 restaurants in final pack, 8 sources, all English. Files pushed to GitHub and visible in viewer.

---

### Run Details

**Prompt used:** localbite-prompt-v5-toronto.txt
**Output file:** `localbite-toronto-2025-2026.json`
**Sources:** 8
**Restaurants:** 52 (initial push showed 45 — corrected after supplementary run April 2)

| Source | Writer | Language | Type |
|--------|--------|----------|------|
| Foodism Toronto | Various | EN | Secondary |
| NOW Toronto | Various | EN | Primary |
| The Toronto Star | Various | EN | Primary |
| Toronto Life | Various | EN | Primary |
| Eater Toronto | Various | EN | Secondary |
| BlogTO | Various | EN | Secondary |
| Madame Marie | Marie | EN | Primary |
| The Local Tourist | Various | EN | Primary |

**Known issue:** Foodism contributed ~53% of the final pack — above the concentration cap threshold. Not caught by the pipeline. Flagged for v2 supplementary run.

**Geocoding:** 50 verified, 2 null. Initial geocoding done in this session; fixes applied April 2.

**Initial map zoom:** Too wide for Toronto — city centre coordinates needed adjustment.

---

### Key Findings — 2026-03-30

1. **Single-language city signal is different.** Without a language pool cross-validation mechanism, both-pool entries don't apply. Source tier (legacy institutional vs independent freelance) is the primary quality signal instead.
2. **Foodism concentration problem.** The concentration cap (30% per source) fired at source level but Foodism's dominance across multiple article formats meant it effectively controlled 53% of the pack. Publisher-level cap needed.
3. **Toronto is larger than Moroccan cities in every dimension.** More sources, more restaurants, more neighbourhoods. Expect ~25–30 min run time for large North American cities.

---

### Outstanding Items (carried forward)

- [ ] Foodism concentration — Toronto v2 needed to reduce dominance
- [ ] Initial map zoom too wide for Toronto
- [ ] Writer profile cleanup — remove any pipeline notes from writer_profile fields

---

## Session — 2026-03-31 (Proximity Feature Build)

### Overview
Built the proximity / "Near me" feature for the LocalBite viewer. GPS-based distance sorting with distance badges. Deployed to GitHub Pages.

---

### Features Built

**Near me button:**
- GPS one-shot on click — requests location once, does not track
- Blue dot marker on map at user's GPS position
- Distance calculated via Haversine formula for all restaurants with verified coordinates (lat/lng not null)
- Cards sorted by distance ascending when proximity mode active
- Distance badge shown on each card (e.g. "0.4 km")
- Restaurants with null coordinates excluded from distance sort, appear at bottom of list
- Button shows loading state during GPS acquisition, active state when proximity mode on
- Second click deactivates proximity mode, restores default sort

**CITY_BOUNDS validation:**
- Each city has a bounding box in index.html
- When GPS fix obtained, checks whether user is within the city's bounds
- If outside bounds, proximity mode still activates but no "you are in [city]" confirmation shown

**Map integration:**
- Near me button visible only in map view (hidden in list view)
- Blue dot added to Leaflet map at user coordinates
- Map does not re-centre on user location (intentional — user may want to see restaurants away from their position)

---

### Key Findings — 2026-03-31

1. **GPS one-shot is the right UX.** Continuous tracking adds complexity and battery concern for no benefit in a static restaurant guide.
2. **Tap-to-set-origin not built.** The "plan ahead" use case (set origin from couch) was discussed but not implemented. Deferred — the GPS use case covers the primary need.
3. **Proximity is useless for Barcelona and Valencia** until geocoding is done — both cities have zero coordinates. 114 of 211 total restaurants (54% of dataset) have no map presence.

---

### Outstanding Items (carried forward)

- [ ] Barcelona and Valencia geocoding — proximity feature non-functional for largest two packs
- [ ] Tap-to-set-origin (planning mode) — future enhancement

---

## Session — 2026-04-01 (QA Audit + Chefchaouen Cleanup)

### Overview
Systematic QA audit across all 7 live city packs. 35 sources checked for fetch accessibility. 5 anonymous-only entries removed from Chefchaouen. index.json counts not yet corrected (done April 8).

---

### QA Audit Findings

**Sources checked:** 35 across Barcelona, Valencia, Lisbon, Fes, Marrakesh, Rabat, Chefchaouen, Toronto

**Fetch failures (persistent):** 9 sources now inaccessible
- Lisbon most exposed: 3 of 5 sources returning errors
- Barcelona: ElNacional.cat returning 403 (later recovered in v6 run)
- Toronto: several sources with transient failures (recovered in April 2 supplementary run)

**Lisbon exposure:** With 3 of 5 sources inaccessible, the Lisbon pack has the weakest fetch verification of any city. A v2 run should prioritise finding alternative source URLs.

---

### Chefchaouen Cleanup

**Issue:** 5 restaurants in the Chefchaouen pack had no named writer — sourced from anonymous editorial content that did not meet the named-author standard.

**Action:** Removed all 5 entries.

**Result:** Chefchaouen count reduced from 17 → 12.

**index.json not yet updated** (corrected April 8).

---

### Key Findings — 2026-04-01

1. **Named-author rule must be enforced at fetch time, not post-hoc.** The 5 anonymous entries passed the pipeline review because the rule wasn't checked strictly enough during source approval. v6 prompt adds explicit named-author gate.
2. **Fetch accessibility degrades over time.** Articles that were accessible at pipeline time may become paywalled or deleted later. The fetch QA step should be a recurring check, not a one-time action.

---

### Outstanding Items (carried forward)

- [ ] Chefchaouen v2 — find named sources to replace anonymous S2 and S3
- [ ] Lisbon v2 — find alternative URLs for 3 inaccessible sources
- [ ] index.json update: Chefchaouen 17→12, Toronto 45→52

---

## Session — 2026-04-02 (Toronto Supplementary Run)

### Overview
Supplementary pipeline pass for Toronto targeting sources that failed or were inaccessible in the March 30 run. Added 7 new restaurants. Writer profiles cleaned of pipeline notes.

---

### Run Details

**Prompt:** Supplementary pass targeting Caribbean and Italian Toronto food writing
**New sources:** NOW Toronto (Caribbean coverage), Madame Marie (Italian)
**New restaurants added:** 7
**Final Toronto count:** 52

**Writer profile cleanup:** All Toronto writer_profile fields checked and cleaned — pipeline notes (tier assignments, fetch sizes, confidence scores) removed from user-visible fields.

**Geocoding fixes:** 2 additional coordinates found; 50 verified total, 2 remaining null.

---

### Key Findings — 2026-04-02

1. **Supplementary runs are worth it for large cities.** 7 additional restaurants recovered with minimal effort, improving Caribbean and Italian cuisine representation.
2. **Writer profile contamination is a real risk.** Several profiles contained internal pipeline notes visible to users. The v6 prompt adds an explicit rule against this.
3. **Foodism concentration unchanged at 53%.** The supplementary pass did not dilute Foodism enough. Toronto v2 needs to specifically target non-Foodism sources.

---

### Files Produced

| File | Contents |
|------|----------|
| `localbite-toronto-2025-2026.json` | Updated — 52 restaurants, writer profiles cleaned |

---

### Outstanding Items (carried forward)

- [ ] Toronto v2 — address Foodism concentration (53% of pack)
- [ ] Toronto initial map zoom still too wide

---

## Session — 2026-04-08 (Housekeeping + Barcelona v6 + Batch Design)

### Overview
Major session covering: housekeeping (journal update, index.json corrections), batch processing design, v6 prompt template creation and gap analysis, Barcelona v6 pipeline run, geocoding, viewer fixes, and automation backlog documentation.

---

### Housekeeping Completed

**index.json corrected:**
- Toronto: 45 → 52 restaurants
- Chefchaouen: 17 → 12 restaurants

**journal-entry-apr8.md:** Created as standalone file and committed. *(Merged into main journal this session — 2026-04-09.)*

---

### Batch Processing Design

**Decision:** First test batch is Barcelona, Valencia, Seville — all rebuilt/built from scratch with v6 prompt. Old Barcelona and Valencia packs (v4/v3) remain live until v6 replacements are ready.

**Production prompt decision:** v6 for all new European cities. Strategy C concepts incorporated into v6 template (Phase 0 direct fetch, publisher concentration check, COI check). v5 remains for Moroccan and single-language cities where v6 improvements don't apply.

**City queue confirmed:** Barcelona → Valencia → Seville as first batch. Further cities TBD after first batch validates v6.

**Two working directories fixed:** Pipeline now runs from `~/Documents/GitHub/localbite/` so files land in repo directly. Alias `localbite` added to `.zshrc`.

**Geocode script fixed:** `localbite-geocode.js` now writes in-place with backup to `-geocoded-backup.json` rather than writing to a separate output file.

**Automation backlog created:** `localbite-automation-backlog.md` committed to repo — 10 items, ~16 hours estimated. Key items:
- A: SSH credentials (10 min) — eliminates GitHub Desktop dependency
- B: False positive auto-detection in geocode.js (~1 hr)
- C: localbite-viewer-update.js (~2–3 hrs) — automates centroid/city-centre/CITY_BOUNDS updates
- D: localbite-index-update.js (30 min) — automates index.json updates
- E: Batch mode flag for pipeline (no review pause)
- F–J: Further automation items

---

### v6 Prompt Template

**File:** `localbite-prompt-v6-template.txt` — committed to repo.

**Key improvements over v5:**
- Content window expanded: 2023–2026 (was 2025–2026)
- Neighbourhood-complete search approach — one query per neighbourhood, no fixed query cap; stopping rule fires after 8 consecutive queries yield no new sources
- Two-tier fetch retry (30s + 60s) before marking source as failed
- Phase 0 direct fetch of known independent sources
- Publisher-level concentration check (catches same-publisher multi-article scenarios)
- COI check with ⚠ flag (include, don't exclude)
- Auto-removal of recommended Tier B entries with full audit trail
- Writer profile rule: no pipeline notes visible in user-facing fields
- open_status_check flag for restaurants from 2023–2024 sources
- Traceability check (anti-fabrication gate)
- Token/tool/time recording mandatory in final summary
- source_tier field extended to all city types (not single-language only)
- retries_attempted as integer (0/1/2) not boolean

**Part 1 files created:**
- `localbite-prompt-v6-barcelona-part1.txt`
- `localbite-prompt-v6-valencia-part1.txt`
- `localbite-prompt-v6-seville-part1.txt`

**Gap analysis:** 24 gaps identified after thorough review. 12 fixed before/during Barcelona run. Notable gaps resolved:
- CITY_TYPE defined and documented
- Diversity gate trigger fixed ("after all planned searches" not "after 30 searches")
- Neighbourhood query ceiling contradiction resolved (stopping rule takes precedence)
- Publisher concentration catches same-publisher multi-writer scenarios
- open_status_check closure searches moved to post-pipeline Stage 2
- Auto-apply removals changed to show-for-review on first batch runs

**Template fix applied 2026-04-09:**
- LANGUAGE_POOL FIELD rule added to extraction rules — explicit instruction to write as plain string ("both"/"en"/"es" etc.), never as list or array. Addresses Barcelona display bug.

---

### Barcelona v6 Pipeline Run

**Prompt:** localbite-prompt-v6-barcelona.txt (Part 1 + template concatenated)
**Output file:** `localbite-barcelona-2023-2026.json`
**Run:** `claude --dangerously-skip-permissions < localbite-prompt-v6-barcelona.txt`

**Performance:**
- Pipeline run: 158.4k tokens, 117 tool uses, 36m 51s
- Export: 68.4k tokens, 15 tool uses, 8m 4s
- Total: 226.8k tokens, 132 tool uses, ~45 minutes
- Queries run: 56 (stopping rule fired after 34; last 8 returned only known sources)

**Sources (9):**

| Source | Writer | Language | Type | Article Date |
|--------|--------|----------|------|--------------|
| Barcelona Food Experience | Maria | EN | Primary | 2026-02-24 |
| Barcelona Food Experience | (second article) | EN | Primary | 2025-09-28 |
| The New Barcelona Post | Anna Torrents | EN | Primary | 2026-01-11 |
| The New Barcelona Post | P. Ribot | ES | Primary | 2026-01-xx |
| Beteve.cat | Carmen Cortés Vidal | CA | Primary | 2025-11-05 |
| Guía Repsol | Lourdes López | ES | Primary ⚠coi | 2026-01-23 |
| Culinary Backstreets | Paula Mourenza | EN | Primary | 2024-12-30 |
| Gastronosfera | Eric Morgado | ES | Primary | 2024-12-21 |
| In and Out Barcelona | Stefania Talento | ES | Primary | 2024-12-31 |

**Results:**
- Raw entries: 101
- Tier A (auto-approved): 13 (10 both-pool + 3 multi-source EN)
- Tier B (presented for review): 73
- Tier C (auto-rejected): 15
- Auto-removed: 0
- User-removed: 0 (accepted all)
- Final restaurants: 86
- Both-pool entries: 10
- open_status_check: 11 (all from Dec 2024 sources)
- COI-flagged: 4 (all Guía Repsol-sourced)

**Both-pool entries (all verified as genuine cross-publisher pairs):**
La Cova Fumada, Bornès, Fukamura, Bar Alegría ⚠coi, La Pepita, Trü ⚠coi, Barra Oso ⚠coi, Barra M ⚠coi, plus 2 others.

**Key finding — NBP publisher concentration:** The New Barcelona Post contributed two articles (Torrents EN + Ribot ES) — same publisher, different languages. Did not create false both-pool signals (correctly paired only with different publishers). Publisher concentration check should have flagged this; gap noted for template fix.

---

### Barcelona Geocoding

**Script:** `node localbite-geocode.js localbite-barcelona-2023-2026.json`

**Results:**
- High confidence: 41
- Medium confidence: 18 (before false positive removal)
- Not found: 27
- False positives identified and cleared: 6

**False positives removed (coordinates set to null):**
- Franca → matched train station (Estació de França)
- Bar Remedios → matched park (Jardins de Remedios Varo)
- La Bodegueta de Sant Andreu → coordinates outside Barcelona bounding box
- Arraval → matched neighbourhood name, not restaurant
- Bar Veracruz → matched plaza (Plaça de Veracruz)
- Barra M → matched street (Carrer de la Barra de Ferro)

**Final geocoding state:**
- High confidence: 41 (solid pins)
- Medium confidence: 12 (hollow pins)
- Null: 33 (list-only, no map pin)

---

### Viewer Fixes (Barcelona)

**Static map caveat bug:** `<div class="map-caveat">` at line 969 was hardcoded and showing unconditionally, overriding the dynamic caveat logic. Fixed by adding `style="display:none"` — dynamic caveat now shows correct verified/approximate/centroid counts.

**Neighbourhood centroids:** 7 missing Barcelona neighbourhoods added to `index.html` CENTROIDS:
`El Barri Gòtic`, `Sants`, `Montjuïc`, `Fort Pienc`, `Nou Barris`, `Sant Andreu`, `Camp de l'Arpa`

**CITY_BOUNDS:** Barcelona already present in index.html — proximity feature works without changes.

**language_pool format fix:** Barcelona JSON had language_pool stored as lists (["EN", "CA"]) instead of strings. Converted in-place: all 86 entries now use string format ("both", "en", "es", "ca"). Root cause: v6 template lacked explicit instruction. Fixed in template 2026-04-09.

---

### Definition of Done

Formalised six-stage definition of done for a city pack:

1. **Pipeline complete** — all output files written
2. **Data quality checks** — writer profiles clean, failed sources reviewed, open_status_check verified, both-pool spot-checked
3. **Geocoding** — script run, false positives cleared, backup confirmed
4. **Viewer update** — index.json updated, centroids added, CITY_BOUNDS confirmed, viewer tested locally
5. **Commit and push** — single clean commit, GitHub Pages deployment confirmed
6. **Journal** — session entry written, outstanding items documented

**Minimum pack sizes:** Large city 40+, medium city 25+, small city 8+.

---

### Automation Gap Assessment

True batch automation is not yet achieved. Every post-pipeline step (geocoding, false positive detection, viewer update, index update, push) required manual intervention during the Barcelona run. Key gaps documented in `localbite-automation-backlog.md`.

**Honest assessment of today:** Manual pipeline run with automated assistance. The pipeline itself ran unattended to the review table; everything after required human action.

---

### Files Produced / Modified

| File | Change |
|------|--------|
| `localbite-barcelona-2023-2026.json` | New — 86 restaurants, v6 pipeline |
| `localbite-barcelona-raw.json` | New — unfiltered pipeline output |
| `localbite-barcelona-audit.txt` | New — auto-removal log |
| `localbite-barcelona-search-log.txt` | New — 56 queries logged |
| `localbite-barcelona-search-plan.txt` | New — Phase 1 plan |
| `localbite-barcelona-working.json` | New — intermediate extraction file |
| `localbite-barcelona-failed-sources.txt` | New — fetch failure log (empty) |
| `localbite-barcelona-2023-2026-geocoded-backup.json` | New — pre-cleanup backup |
| `localbite-barcelona-2023-2026-geocoding-stats-c1.json` | New — geocoding stats |
| `localbite-prompt-v6-template.txt` | New — v6 template (12 gaps fixed) |
| `localbite-prompt-v6-barcelona-part1.txt` | New |
| `localbite-prompt-v6-valencia-part1.txt` | New |
| `localbite-prompt-v6-seville-part1.txt` | New |
| `localbite-prompt-v6-barcelona.txt` | New — concatenated run prompt |
| `localbite-automation-backlog.md` | New — 10 automation items |
| `localbite-index.json` | Updated — Toronto 52, Chefchaouen 12, Barcelona v6 86 |
| `index.html` | Updated — 7 Barcelona centroids added, static caveat hidden |
| `localbite-geocode.js` | Updated — writes in-place with backup |
| `localbite-journal-updated.md` | Updated — this entry |

---

### Outstanding Items

- [ ] SSH credentials — set up SSH key for localbiteadmin GitHub account (Item A in automation backlog). Eliminates GitHub Desktop dependency for all future sessions.
- [ ] Build automation Items B, C, D before Valencia run:
  - B: False positive auto-detection in geocode.js
  - C: localbite-viewer-update.js (automates centroid + CITY_BOUNDS + index updates)
  - D: localbite-index-update.js
- [ ] Valencia v6 pipeline run
- [ ] Seville v6 pipeline run
- [ ] 11 Barcelona open_status_check restaurants — verify not closed (all Dec 2024 sources, low risk)
- [ ] Remove old `localbite-barcelona-2025-2026.json` (v4 pack) from repo — stale
- [ ] Toronto v2 — address Foodism concentration (53% of pack)
- [ ] Chefchaouen v2 — find named sources to replace anonymous S2 and S3
- [ ] Lisbon v2 — find alternative URLs for 3 inaccessible sources
- [ ] Toronto initial map zoom still too wide

---

## Session — 2026-04-09 (language_pool template fix)

### Overview
Single-item session: confirmed and applied the language_pool fix to the v6 prompt template that was noted at the end of the April 8 session but not applied before that session ended.

---

### Fix Applied

**File:** `localbite-prompt-v6-template.txt`
**Commit:** `Fix v6 template — add LANGUAGE_POOL FIELD rule (string not list)`

**What was added:** LANGUAGE_POOL FIELD rule inserted into the extraction rules section (after NEIGHBOURHOOD STANDARDISATION). Explicit instruction that language_pool must be a plain string — never a list or array — with all valid values defined and the calculation rule stated.

**Verification:** Confirmed fix was not present before applying (grep showed only 2 mentions of language_pool, neither containing a calculation rule). Confirmed fix landed correctly after applying.

**Impact:** Valencia and Seville v6 pipeline runs will now produce correct string-format language_pool values. The Barcelona JSON was already fixed manually on April 8.

---

### Outstanding Items

*(Same as April 8 — no other changes this session)*

## Session — 2026-04-09 (Batch Processing Design — Valencia, Seville, Córdoba, Granada)

### Overview

Major session covering batch processing design, automation implementation, four city pipeline runs (Valencia v6, Seville v6, Córdoba v6, Granada v6), viewer bug fixes, and product backlog creation. 10 cities now live.

---

### Automation Items Built

All pre-batch automation items completed this session:

| Item | What | Effort |
|------|------|--------|
| A — SSH credentials | `ssh-keygen` + GitHub key + remote URL change. Terminal push now works permanently, no GitHub Desktop needed. | 10 min |
| B — False positive detection | Added `isNonRestaurantEntity()` to `localbite-geocode.js` — 62 patterns covering streets, squares, parks, bridges, castles, churches, hospitals, museums etc. in EN/ES/CA/PT/FR. Wired into Nominatim and Photon result acceptance. | 1 hr |
| C — localbite-viewer-update.js | New script — reads neighbourhood list from city JSON, geocodes each via Nominatim, adds missing centroids to `index.html` CENTROIDS, checks and adds city to CITY_BOUNDS. | 2 hrs |
| D — localbite-index-update.js | New script — reads city JSON and updates `localbite-index.json` automatically with correct counts, pipeline version, built date, filename. | 30 min |
| I — Publication registry | `localbite-publication-registry.json` created — all known publications across 8 cities with `use_as_direct_fetch`, COI flags, concentration warnings, `last_verified` dates, `known_problematic` sections. | 30 min |
| — — localbite-commit.sh | Shell script — stages all city output files and pushes in one command. `bash localbite-commit.sh seville` | 10 min |
| — — localbite-post-pipeline.sh | Shell script — chains geocoding, viewer update, index update, and commit. `bash localbite-post-pipeline.sh seville` is the full post-pipeline sequence. | 30 min |

**Additional fixes:**
- `localbite-geocode.js` fixed to write in-place with backup (was writing to separate `-geocoded.json` file)
- `localbite-viewer-update.js` apostrophe fix — neighbourhood names with apostrophes (Camp de l'Arpa) now use curly apostrophe (U+2019) to avoid breaking JavaScript string delimiters
- `localbite-viewer-update.js` out-of-bounds validation added as Step 1b — automatically nulls coordinates outside city bounding box after geocoding
- Carrer pattern in `localbite-geocode.js` extended — now catches `Carrer Via Augusta` and similar (was only matching `Carrer de/d'/dels/de les`)
- 20 additional false positive patterns added after Seville run: bridges (Puente/Pont), castles (Castillo/Castell), sports centres, waterways (Arroyo/Ribeira), palaces, towers, churches, cathedrals, convents, museums, markets

---

### v6 Template Fixes

Two fixes applied to `localbite-prompt-v6-template.txt`:

1. **LANGUAGE_POOL FIELD rule added** — explicit instruction that `language_pool` must be a plain string ("both"/"en"/"es" etc.), never a list or array. Addresses the Barcelona display bug where the pipeline wrote `["EN", "CA"]` instead of `"both"`.

2. **NULL NEIGHBOURHOOD auto-removal rule added** — any Tier B entry with `neighbourhood: null` and `source_count: 1` is automatically recommended for removal. This rule fired correctly in Seville (3 auto-removed before review table) and prevented 5 manual Valencia removals from recurring.

---

### Product Backlog

`localbite-product-backlog.md` created and committed — 16 items covering:
- User suggestions: article date/title in source display, list↔map cross-navigation, list view sort and layout improvements
- Additional suggestions: closure detection, photo integration, opening hours, address field, source freshness decay, writer profile enrichment, "new this month" filter, user saves, shareable packs, feedback mechanism, analytics, custom domain, SEO

All items deliberately deferred until after first batch processing experience.

---

### Valencia v6 Pipeline Run

**Prompt:** `localbite-prompt-v6-valencia.txt` (Part 1 + template)
**Output file:** `localbite-valencia-2023-2026.json`
**Run time:** ~32 minutes

**Sources (7):**

| Publication | Writer | Language | Type | Date |
|-------------|--------|----------|------|------|
| The Infatuation | David Neimanis | EN | Secondary | 2025-08-01 |
| Amsterdam Foodie | Vicky Hampton | EN | Primary | 2025-11-17 |
| Bonviveur | Yolanda Galiana | ES | Primary | 2026-02-13 |
| Grupo Gastro Trinquet | Albert Padilla | ES | Primary | 2025-02-18 |
| Ojo al Plato (Eixample) | Various | ES | Primary | 2025 |
| Ojo al Plato (Poblats Marítims) | Various | ES | Primary | 2025 |
| Valencia Plaza | Various | ES | Primary | 2025 |

**New sources vs v3:** Ojo al Plato (neighbourhood-specific Valencia guide — two articles) and Valencia Plaza. Both ES local sources not found in previous runs.

**Results:**
- Raw: 53 → Final: 47 (6 user-removed: 5 null-neighbourhood + Riff partial fetch)
- Both-pool: 10
- Geocoded: 33/47 (70%)
- Valencian language gap confirmed as structural — no named VAL food publications found

**Viewer fix required:** Valencia restaurants with neighbourhood "Eixample" were showing pins in Barcelona — the CENTROIDS object is a flat global namespace and Barcelona's Eixample centroid (lat 41.39) was matching Valencia's entries. Fixed by renaming 21 Valencia restaurants' neighbourhood from "Eixample" to "Eixample Valencia" in the JSON.

---

### Seville v6 Pipeline Run

**Prompt:** `localbite-prompt-v6-seville.txt`
**Output file:** `localbite-seville-2023-2026.json`
**Run time:** ~31 minutes

**Sources (10):**

| Publication | Writer | Language | Type | Date |
|-------------|--------|----------|------|------|
| CosasDeCome Sevilla | Pepe Monforte | ES | Primary | 2023–2026 (4 articles) |
| Sevilla Secreta | Ariana Buenafuente | ES | Primary | 2025–2026 |
| The Objective | Brenda Alonso | ES | Primary | 2023 |
| Viajes NatGeo España | Mari Carmen Duarte | ES | Secondary | 2024 |
| Bitesize Sevilla | Shawn Hennessey | EN | Primary | 2025 |
| Spanish Sabores | Lauren Aloise | EN | Secondary ⚠coi | 2025 |

**Results:**
- Raw: 66 → Final: 61 (5 user-removed: modern tapas COI entries)
- Both-pool: 5
- Auto-removed (null neighbourhood): 3 ✅ (rule working)
- Geocoded: 46/61 (75%)
- 21 open_status_check flagged (from 2023–2024 sources)

**Key finding:** Bitesize Sevilla (Shawn Hennessey) is a genuine independent EN Seville resident writer — best EN source in the pack with no COI. Spanish Sabores COI concentration (10 entries, all ⚠coi) remains the main weakness.

**Geocoding bug:** Bar La Paradita geocoded to Extremadura (lat 38.26, lng -5.69) — Photon false positive. Nulled manually. The out-of-bounds validation step added to post-pipeline script would have caught this automatically.

---

### Córdoba v6 Pipeline Run

**Prompt:** `localbite-prompt-v6-cordoba.txt`
**Output file:** `localbite-cordoba-2023-2026.json`
**Run time:** ~29 minutes | 130.2k tokens | 78 tool uses

**Sources (9):**

| Publication | Writer | Language | Type | Date |
|-------------|--------|----------|------|------|
| AndyHayler.com | Andy Hayler | EN | Primary | 2024-06-01 |
| Spain by Hanne | Hanne Olsen | EN | Primary | 2025-12-09 |
| Piccavey | Molly (Piccavey) | EN | Primary | 2026-01-18 |
| Cordópolis (elDiario.es) | Juan Velasco | ES | Primary | 2025-11-26 |
| Cordópolis (elDiario.es) | Alfonso Alba | ES | Primary | 2025-11-25 |
| La Voz de Córdoba | M. Ángeles Ramírez | ES | Primary | 2026-02-19 |
| The Objective | Brenda Alonso | ES | Primary | 2023-08-25 |
| Yendo por la Vida | Txema Aguado | ES | Primary | 2024-01-24 |
| Andalucía Lovers | Morgane Mazelier | EN | Secondary | 2024-11-11 |

**Phase 0 note:** CosasDeCome failed at all URL variants (404/400). Guía Repsol fetched but article date was 2022 — outside content window, rejected.

**Results:**
- Raw: 36 → Final: 35 (0 user-removed, 1 auto-removed: Mercado Victoria gastromarket)
- Both-pool: 14 (41% of pack — highest rate of any city)
- Geocoded: 29/35 (83%)
- 8 open_status_check flagged (from 2023–2024 sources)

**Key finding:** Córdoba is the strongest pack quality of any city to date. 14 both-pool entries reflects a consistent, independent EN and ES food writing consensus around the same restaurants — Noor, Choco, Bar Santos, Bodegas Campos, La Cuchara de San Lorenzo among the most confirmed.

**Geocoding issues:**
- Terra Olea matched "La Terracita del Carmen" — nulled
- Fuensanta centroid geocoded to province (38.02, -4.30) not city barrio — corrected to (37.87, -4.78)

**Post-pipeline:** `bash localbite-post-pipeline.sh cordoba` ran automatically — geocoding, viewer update, index update, commit all in one command.

---

### Granada v6 Pipeline Run

**Prompt:** `localbite-prompt-v6-granada.txt`
**Output file:** `localbite-granada-2023-2026.json`
**Run time:** ~31 minutes

**Sources (4):**

| Publication | Writer | Language | Type | Date |
|-------------|--------|----------|------|------|
| GranadaDigital | Alfonso Campos (El Gocho Gourmet) | ES | Primary | 2025-08-28 |
| jamesdimitri.co.uk | James Dimitri | EN | Primary | 2025-02-18 |
| Spanish Sabores | Lauren Aloise | EN | Secondary ⚠coi | 2023-07-12 |
| Andalucia Lovers | Fanny | EN | Secondary | 2025-02-04 |

**Results:**
- Raw: 34 → 29 (5 merges) → Final: 15 (3 user-removed: Gran Café Bib-Rambla, Taberna Mítico Bar, Versos Sueltos)
- Both-pool: 0 (structural — EN and ES sources cover different restaurants entirely)
- Geocoded: 11/15 (73%)
- 5 open_status_check flagged (Spanish Sabores 2023 source)

**Key finding:** Granada is a structurally thin-source city. El Gocho Gourmet (Alfonso Campos) only has 2 published review articles on GranadaDigital — his column launched April 2025. A v2 run in 2–3 months will produce a substantially richer pack. Culinary Backstreets confirmed absent. CosasDeCome does not cover Granada.

**Geocoding issues:** 3 false positives nulled (Bar Avila Tapas → "Bar Tapas D-Auto", La Barra de San Remo → "Edificio San Remo", Tajine Elvira → "Crepería Elvira81"). JSON trailing comma bug caught and fixed by script.

**Post-pipeline:** `bash localbite-post-pipeline.sh granada` ran automatically.

---

### Viewer Bugs Found and Fixed

| Bug | Cause | Fix |
|-----|-------|-----|
| App not loading on mobile | `Camp de l'Arpa` apostrophe broke JS CENTROIDS object | Curly apostrophe (U+2019) used; viewer-update.js patched to prevent recurrence |
| Valencia pins appearing in Barcelona | Flat CENTROIDS namespace — "Eixample" key matched Barcelona centroid | 21 Valencia restaurants renamed to "Eixample Valencia" in JSON |
| Seville hollow pin far north of city | Bar La Paradita geocoded to Extremadura | Coordinates nulled |
| Fuensanta centroid wrong | viewer-update.js geocoded "Fuensanta" to rural province | Corrected to city barrio coordinates |

**Structural issue identified:** CENTROIDS is a flat global namespace — neighbourhood names shared across cities collide. Long-term fix: city-scoped centroids (nested by city slug). This will affect every future city with common neighbourhood names (Eixample, Gràcia, Centro, etc.).

---

### Pipeline Performance — All Cities

| Metric | Valencia v6 | Seville v6 | Córdoba v6 | Granada v6 |
|--------|-------------|------------|------------|------------|
| Sources | 7 | 10 | 9 | 4 |
| Both-pool | 10 | 5 | 14 | 0 |
| Final restaurants | 47 | 61 | 35 | 15 |
| Geocoded | 33/47 (70%) | 46/61 (75%) | 29/35 (83%) | 11/15 (73%) |
| Run time | ~32 min | ~31 min | ~29 min | ~31 min |
| Auto-removed (null nb) | 0 | 3 ✅ | 0 | 0 |
| User removed | 6 | 5 | 0 | 3 |

---

### Files Produced / Modified

| File | Change |
|------|--------|
| `localbite-valencia-2023-2026.json` | New — 47 restaurants, v6 |
| `localbite-valencia-raw.json` | New |
| `localbite-seville-2023-2026.json` | New — 61 restaurants, v6 |
| `localbite-seville-raw.json` | New |
| `localbite-cordoba-2023-2026.json` | New — 35 restaurants, v6 |
| `localbite-cordoba-raw.json` | New |
| `localbite-granada-2023-2026.json` | New — 15 restaurants, v6 |
| `localbite-granada-raw.json` | New |
| `localbite-prompt-v6-template.txt` | Updated — language_pool rule + null-neighbourhood rule |
| `localbite-prompt-v6-valencia-part1.txt` | Updated — Las Provincias/Levante-EMV added to known_problematic |
| `localbite-prompt-v6-cordoba-part1.txt` | New |
| `localbite-prompt-v6-granada-part1.txt` | New |
| `localbite-prompt-v6-seville.txt` | New (concatenated prompt) |
| `localbite-prompt-v6-cordoba.txt` | New (concatenated prompt) |
| `localbite-prompt-v6-granada.txt` | New (concatenated prompt) |
| `localbite-geocode.js` | Updated — 62 false positive patterns, Córdoba/Granada CITY_BOUNDS, Carrer extension |
| `localbite-viewer-update.js` | Updated — apostrophe fix, out-of-bounds validation step |
| `localbite-index-update.js` | New script |
| `localbite-commit.sh` | New script |
| `localbite-post-pipeline.sh` | New script |
| `localbite-publication-registry.json` | New — 8 cities seeded; Seville added |
| `localbite-product-backlog.md` | New — 16 items |
| `localbite-automation-backlog.md` | Existing — items B/C/D/I now complete |
| `localbite-index.json` | Updated — Valencia, Seville, Córdoba, Granada added |
| `index.html` | Updated — centroids for all 4 new cities, Camp de l'Arpa apostrophe fix, Fuensanta correction, static caveat hidden |

---

### Outstanding Items

- [ ] **Fix CENTROIDS flat namespace collision** — city-scoped centroids needed before next batch. Active bug risk.
- [ ] **Add missing geocoding patterns** — `Edificio`, `Crepería` (name mismatch), building suffixes
- [ ] **Manual check CosasDeCome for Córdoba coverage** — cosasdecome.es
- [ ] **Add Córdoba and Granada to publication registry**
- [ ] **Viewer: article date + title in source display** (user suggestion — now deferred period over)
- [ ] **Viewer: list view sort by neighbourhood/price/recommended** (user suggestion)
- [ ] **Viewer: list↔map cross-navigation** (user suggestion — Option B first)
- [ ] **Fix trailing comma JSON bug** in pipeline output
- [ ] **Granada v2** — wait 2–3 months for El Gocho Gourmet archive to grow
- [ ] **Seville v2** — find second independent EN Seville resident writer; address 21 open_status_check restaurants
- [ ] **Córdoba v2** — attempt CosasDeCome once URL clarified; try ABC de Córdoba, El Día de Córdoba
- [ ] **Next batch cities** — Porto, Málaga, or first non-Spanish city
- [ ] **Item G** — open_status_check verification script (40+ flagged across Barcelona/Seville/Córdoba)
- [ ] **Item F** — batch orchestration script
- [ ] **Domain name** — localbite.app or getlocalbite.com
- [ ] **Analytics** — Plausible or Fathom before sharing widely
-  39 of 47 Valencia restaurants show article_date: undated — spread across all 5 sources (Ojo al Plato 18, The Infatuation 15, Amsterdam Foodie 12, Grupo Gastro Trinquet 7, Bonviveur 3). Pipeline did not successfully extract dates from fetched article text. Address in Valencia v2 rebuild — do not fix manually.
---

## Session — 2026-04-10 (CENTROIDS Fix Attempt + Registry Update)

### Overview
One goal session: fix the CENTROIDS flat namespace collision identified in the April 9 batch session. The fix was attempted but ultimately reverted after `insertCentroids` corrupted CITY_BOUNDS for Rabat, Chefchaouen, and Lisbon. Site restored to clean state. Publication registry updated with Córdoba, Granada, and Rabat.

---

### CENTROIDS Fix — Attempted and Reverted

**Problem:** `CENTROIDS` in `index.html` is a flat global namespace — neighbourhood names shared across cities cause wrong map pins. `CENTROIDS['Eixample']` matched Barcelona's coordinates for Valencia restaurants. `CENTROIDS['Medina']` is ambiguous across Fes, Marrakesh, Rabat, and Chefchaouen.

**Approach attempted:** Restructure `CENTROIDS` from flat `{ 'neighbourhood': [lat, lng] }` to nested `{ 'City': { 'neighbourhood': [lat, lng] } }`. Update the single lookup in `index.html` to `(CENTROIDS[cityName] || {})[nb]`. Update `localbite-viewer-update.js` to read and write the nested structure.

**What went wrong:** The `insertCentroids` function in `localbite-viewer-update.js` uses a regex to find a city's block by name. That regex matched city names inside `CITY_BOUNDS` (which also contains city names) instead of only inside `CENTROIDS`. This caused centroid entries to be inserted into `CITY_BOUNDS` entries for Rabat, Chefchaouen, and Lisbon, corrupting the object and breaking the app.

**Secondary problem:** Writing JavaScript regex strings via Python heredocs produced persistent quote-escaping errors requiring iterative patching, which introduced additional corruption.

**Resolution:** Restored `index.html` and `localbite-viewer-update.js` to commit `a922ef5` (last clean state before any CENTROIDS work). Site loading correctly confirmed after restore and push.

**Commits made and then reverted:**
- `26e3f77` — Fix CENTROIDS namespace (corrupted)
- `b701599` — Add Rabat/Chefchaouen/Lisbon blocks, repair CITY_BOUNDS (still corrupted)
- `b8a11a9` — Revert to clean state ✅

**Key lesson:** The CENTROIDS fix must be done as complete file rewrites delivered as downloads, not as iterative Python patches via Terminal heredocs. The next attempt should write the entire corrected `localbite-viewer-update.js` as a single downloadable file.

---

### Publication Registry — Updated

**Item 4 (CosasDeCome/Córdoba check):** Confirmed definitively — CosasDeCome covers Cádiz and Sevilla provinces only. No Córdoba section exists and no Córdoba restaurant content is published. Closed permanently.

**Item 3 (Registry update):** Córdoba, Granada, and Rabat added to `localbite-publication-registry.json`. Registry now covers all 11 live cities.

| City | Key sources added |
|------|------------------|
| Córdoba | Cordópolis/elDiario.es (Juan Velasco, Alfonso Alba), La Voz de Córdoba, AndyHayler.com, Spain by Hanne, Piccavey, Andalucía Lovers, The Objective, Yendo por la Vida |
| Granada | GranadaDigital/El Gocho Gourmet (Alfonso Campos), James Dimitri, Spanish Sabores ⚠coi, Andalucia Lovers, Culinary Backstreets (confirmed absent) |
| Rabat | Culinary Backstreets, Le Desk/Tel Quel (FR, not yet attempted) |

---

### Files Modified

| File | Change |
|------|--------|
| `index.html` | Reverted to a922ef5 — CENTROIDS fix abandoned pending redesign |
| `localbite-viewer-update.js` | Reverted to a922ef5 — CENTROIDS fix abandoned pending redesign |
| `localbite-publication-registry.json` | Updated — Córdoba, Granada, Rabat added (11 cities total) |

---

### Outstanding Items

- [ ] **CENTROIDS fix** — redo as complete file download, not iterative patches. `insertCentroids` must scope its regex to only search within the CENTROIDS block. Next conversation: LocalBite — CENTROIDS Fix.
- [ ] **Missing geocoding patterns** — `Edificio`, `Crepería` (name mismatch)
- [ ] **Trailing comma JSON bug** in pipeline output
- [ ] **Porto and Málaga scoping questions** — Gaia inclusion for Porto; Pedregalejo/El Palo + strategy for Málaga
- [ ] **Part 1 files** for Porto and Málaga
- [ ] **Viewer: article date + title in source display**
- [ ] **Viewer: list view sort**
- [ ] **Viewer: list ↔ map cross-navigation**
- [ ] **Granada v2** — July 2026 (El Gocho Gourmet archive)
- [ ] **Seville v2** — second EN writer; 21 open_status_check restaurants
- [ ] **Córdoba v2** — ABC de Córdoba, El Día de Córdoba
- [ ] **Item G** — open_status_check verification script
- [ ] **Item F** — batch orchestration script
- [ ] **Domain name**
- [ ] **Analytics**


