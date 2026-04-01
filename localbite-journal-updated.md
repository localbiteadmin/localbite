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
