
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

## Session — 2026-04-10 (Centroids Fix + Pipeline Hardening)

### Overview

Four outstanding items resolved in a single session. No pipeline runs. All work was infrastructure and bug fixes. Site stable throughout — no corruption incidents.

**Session goal:** Fix CENTROIDS bug (carried over from morning session), add missing geocoding patterns, fix trailing comma JSON bug, fix year range hardcoding in shell scripts.

---

### Fix 1 — CENTROIDS (index.html + localbite-viewer-update.js)

**Problem:** Two bugs in the centroids system:

1. `getExistingCentroids` used a regex `['"]([^'"]+)['"]\s*:` that stopped at apostrophes inside key names. `"Camp de l'Arpa"` was read as `"Camp de l"` — causing it to be geocoded and re-added on every run.

2. `insertCentroids` searched the entire `index.html` for the city name and closing `};`. Both patterns also appear inside `CITY_BOUNDS`, causing centroid entries to be written into `CITY_BOUNDS` instead of `CENTROIDS`. This was the root cause of all corruption in the morning session.

3. Missing centroid sections: Rabat (4 neighbourhoods), Chefchaouen (2), Lisbon (24), and 4 Toronto neighbourhoods (Bloor West Village, Greektown (Danforth), Scarborough, Weston).

**Approach:** Delivered as two separate files rather than iterative patches:

- `localbite-centroids-patch.py` — standalone Python script that appends missing city sections to `index.html` in the existing flat format. Pure string append, no regex, no structural change.
- `localbite-viewer-update.js` — complete replacement file with two targeted fixes: (1) separate single-quoted and double-quoted key patterns in `getExistingCentroids`; (2) `insertCentroids` now uses brace-depth extraction to isolate the CENTROIDS block before making any modifications — `CITY_BOUNDS` is structurally unreachable.

**Verification:** All 11 cities passed `✓ All neighbourhood centroids already present` before committing. CITY_BOUNDS integrity confirmed. Revert path confirmed before committing.

**Commit:** `1b0f8e7` — Fix centroids — add Rabat/Chefchaouen/Lisbon/Toronto entries; fix apostrophe key matching and CENTROIDS-scoped insertion

---

### Fix 2 — Geocoding false positive patterns

**Problem:** `Edificio` and `Crepería` were slipping through `nameIsPlausible` as valid name matches. A restaurant named "La Barra de San Remo" was matching "Edificio San Remo" because "San Remo" appeared in both names and "Edificio" wasn't filtered. Same pattern for "Crepería Elvira81" matching "Tajine Elvira". Both were documented in the Granada geocoding issues (journal line 1978).

**Fix:** Added `edificio`, `creperia`, `creperie` to the `stopWords` set in `nameIsPlausible` in `localbite-geocode.js`. These are generic establishment-type words that should not count as meaningful name matches on their own.

**Commit:** `f361cd9` — Add Edificio and Crepería to geocoding stopWords — prevents name-mismatch false positives

---

### Fix 3 — Post-pipeline script hardening

**Problem:** Three issues found in `localbite-post-pipeline.sh` and `localbite-commit.sh`:

1. Both scripts hardcoded `2023-2026` in filenames — silently skipping Morocco, Toronto, and Lisbon files which use `2025-2026`.
2. No JSON validation step — trailing comma bugs could pass silently into geocoding. Journal noted "caught and fixed by script" for Granada but no such script existed in the codebase.
3. The pipeline had no fast-fail mechanism for malformed JSON output.

**Fix:**
- Both scripts now auto-detect year range: try `2023-2026` first, fall back to `2025-2026`, error if neither exists.
- `localbite-post-pipeline.sh` now runs a Step 0 JSON validation using `node -e JSON.parse()` before geocoding. Catches trailing commas, empty files, and any other malformed output. Exits with clear error message and halts pipeline via `set -e`.

**Tests run before committing:**
- Year range detection verified for Seville (→ 2023-2026) and Toronto (→ 2025-2026)
- Valid JSON (Seville, 61 restaurants) → passes
- Trailing comma JSON → caught, pipeline halted
- Empty file → caught, pipeline halted
- `set -e` propagation confirmed — node exit code 1 halts shell script

**Commit:** `c6170a9` — Fix post-pipeline scripts — auto-detect year range, add JSON validation step before geocoding

---

### Key Findings — 2026-04-10

1. **Deliver fixes as complete files, not iterative patches.** The morning session failed because iterative Python heredoc patches introduced quote-escaping errors that compounded. Delivering `localbite-viewer-update.js` as a complete replacement file and `localbite-centroids-patch.py` as a standalone script eliminated this failure mode entirely.

2. **Verify revert path before committing.** Checking `git status` and `git log` before each commit confirmed the revert command and guaranteed it would work. This discipline should be standard for all infrastructure changes.

3. **"Caught by script" in journal entries needs a citation.** The Granada journal entry said the trailing comma was "caught and fixed by script" but no such script existed. Journal entries should name the specific script or note "fixed manually" to avoid false confidence in automation coverage.

4. **Both shell scripts were broken for non-Spanish cities.** `localbite-commit.sh` would have silently skipped the final JSON for any Morocco, Toronto, or Lisbon run. This had not yet caused a visible failure because those cities were committed manually, but would have caused a silent omission on the next automated run.

---

### Files Modified

| File | Change |
|------|--------|
| `index.html` | Added Rabat, Chefchaouen, Lisbon, Toronto centroid sections; removed stale curly-apostrophe Camp de l'Arpa duplicate |
| `localbite-viewer-update.js` | Fixed apostrophe key matching; fixed CENTROIDS-scoped insertion |
| `localbite-geocode.js` | Added Edificio, Crepería, Crêperie to stopWords |
| `localbite-post-pipeline.sh` | Auto-detect year range; added Step 0 JSON validation |
| `localbite-commit.sh` | Auto-detect year range for JSON and backup filenames |

---

### Outstanding Items

- [ ] Porto and Málaga — scoping questions (Gaia inclusion for Porto; Pedregalejo/El Palo + strategy for Málaga), Part 1 files, CITY_BOUNDS entries
- [ ] Barcelona both-pool audit — 14 entries against corrected same-publisher definition
- [ ] REVIEW_MODE: BRIEF — prompt addition (saves 3–5 min per city run)
- [ ] Viewer: article date + title in source display
- [ ] Viewer: list view sort by neighbourhood/price/recommended
- [ ] Viewer: list ↔ map cross-navigation (Option B first)
- [ ] Item G — open_status_check verification script (40+ flagged across Barcelona, Seville, Córdoba)
- [ ] Granada v2 — July 2026 (El Gocho Gourmet archive)
- [ ] Seville v2 — second independent EN writer; 21 open_status_check restaurants
- [ ] Item F — batch orchestration script
- [ ] Domain name
- [ ] Analytics


## Session — 2026-04-10 (Porto and Málaga — v6 batch + geocoding + viewer)

### Overview

First two-city staggered batch run. Porto and Málaga run simultaneously using a staggered start: Porto launched first, Málaga started when Porto entered Phase 2. Both cities used the new v6 prompt (Strategy C with two prompt fixes applied). No rate limit interruptions. Both runs completed cleanly on the 5x plan. Session also covered geocoding for both cities, viewer updates, and index updates to get both cities live.

**Session goals:**
- Build and run v6 prompts for Porto and Málaga
- Apply both prompt fixes from Lisbon session (COI: "INCLUDE with ⚠ coi flag — do NOT exclude"; both-pool: same-publisher cross-language editions do not qualify)
- Test staggered two-city batch approach on 5x plan
- Establish standard post-run report format
- Geocode both cities
- Get both cities live in the viewer

---

### Prerequisites Completed This Session

| Item | Status |
|------|--------|
| Add Porto and Málaga CITY_BOUNDS to localbite-geocode.js | ✓ Done — Málaga added (Porto was already present) |
| Build localbite-prompt-v6-porto.txt | ✓ Done |
| Build localbite-prompt-v6-malaga.txt | ✓ Done |
| Commit all prerequisite files before running | ✓ Done — commit 6b8363d |

---

### Run 1 — Porto

**Prompt used:** localbite-prompt-v6-porto.txt (Strategy C v6)
**Output file:** `localbite-porto-2023-2026.json`
**Year range:** 2023–2026
**Run time:** ~35 minutes
**Tokens:** Not captured — completion banner scrolled past (see outstanding items)

| Metric | Value |
|--------|-------|
| Phase 0 sources attempted | 3 |
| Phase 0 sources passed | 2 (Mesa Marcada ✓, Culinary Backstreets ✓, Observador ✗ 404) |
| Phase 1 queries | 30 |
| Phase 1B queries | 5 |
| Sources in final pool | 10 |
| Raw candidates | 60 |
| Tier A (auto-approved: 2+ independent sources) | 7 |
| Tier B (review recommended: single source) | 53 |
| Tier C (auto-rejected) | 0 |
| Concentration cap removals | 0 |
| User removals | 7 |
| Final restaurants | 53 |
| Both-pool entries | 2 (Antiqvvm, Cafeína) |
| Gaia entries (neighbourhood_gaia flag) | 2 (Mira Mira, Vinha) |

**Sources:**

| Publication | Writer | Language | Type | Date |
|------------|--------|----------|------|------|
| Culinary Backstreets (×3 articles) | Rafael Tonon, Cláudia Brandão | EN | Primary ★ | 2023–2025 |
| Portoalities | Sara Riobom | EN | Primary | 2026-04-03 |
| Go Ask A Local | Leonor Tito | EN | Primary | 2023-02-03 |
| Star Wine List | António Lopes | EN | Primary | 2026-01-01 |
| Olive Magazine | Crossley/Kendrick/Salter/Rowe | EN | Secondary | 2026-03-16 |
| Time Out Porto EN | Rafael Tonon | EN | Secondary ⚠coi | 2025-03-17 |
| Visão | Florbela Alves, Lucília Monteiro | PT | Primary | 2024-10-04 |
| NCultura | Sara Costa | PT | Primary | 2023-06-07 |

★ Publisher concentration flag — 3 articles from Culinary Backstreets (37.5% of EN pool). No removals triggered — 3 separate articles spanning 2023–2025, 2 writers, no COI.

**Both-pool entries:**
- Antiqvvm: NCultura 2023 (PT primary) + Star Wine List 2026 (EN primary) — different publishers, genuine both-pool
- Cafeína: NCultura 2023 (PT primary) + Time Out Porto EN 2025 (EN secondary ⚠coi) — different publishers, COI flagged but does not disqualify

**User removals at review table (7):** Belos Aires Praia (Aguda beach, outside boundary), Blss U (hotel, no dish detail), Cantina 32 (décor-only quote), Cibû (Leça da Palmeira, outside boundary), L'Egoïste (hotel, no dish detail), The Yeatman (hotel, no dish detail), Vila Foz (hotel, no dish detail)

**Novel source found:** Star Wine List (António Lopes) — found via Phase 1B writer-first supplement, not in SOURCE_EXAMPLES

---

### Run 2 — Málaga

**Prompt used:** localbite-prompt-v6-malaga.txt (Strategy C v6)
**Output file:** `localbite-malaga-2023-2026.json`
**Year range:** 2023–2026
**Run time:** ~28 minutes
**Tokens:** Not captured — completion banner scrolled past (see outstanding items)

| Metric | Value |
|--------|-------|
| Phase 0 sources attempted | 3 |
| Phase 0 sources passed | 0 (all three failed — see findings below) |
| Phase 1 queries | 30 |
| Phase 1B queries | 6 |
| Sources in final pool | 6 |
| Raw candidates | 38 |
| Tier A (auto-approved: 2+ independent sources) | 7 |
| Tier B (review recommended: single source) | 19 |
| Tier C (auto-rejected) | 12 |
| Concentration cap removals | 4 |
| User removals | 3 |
| Final restaurants | 23 |
| Both-pool entries | 0 (structural — see findings) |
| Pedregalejo/El Palo entries | 2 (El Cabra, El Tintero — conditional rule satisfied) |

**Sources:**

| Publication | Writer | Language | Type | Date |
|------------|--------|----------|------|------|
| Spanish Sabores | Lauren Aloise | EN | Primary | 2023-07-12 |
| My Little World of Travelling | Cristina | EN | Primary (local, borderline) | 2024-03-19 |
| Andalucia Lovers | Clara | EN | Primary | 2025-01-15 |
| Euro Weekly News | Jehane Newton | EN | Secondary | 2025-04-28 |
| El Español Málaga | Ángel Recio / Rocío Gaspar | ES | Primary ★ | 2024-12-13 |
| El Español Málaga | Andrea Jiménez / Carlos Navarro | ES | Primary ★ | 2025-10-31 |

★ Publisher concentration flag — El Español holds 100% of ES pool. Documented as structural characteristic — no alternative ES publisher found after 4+ supplementary searches.

**Concentration cap:** Andalucia Lovers contributed 48% of Tier B single-source entries — cap triggered, 4 removed (Pez Lola, La Farola de Orellana, MIMO Vegan, Comparte Gastrobar)

**User removals at review table (3):** La Proa de Teatinos (Teatinos suburb, outside core scene), Ta-Kumi Málaga (location uncertainty Málaga vs Marbella), Terraza de las Flores (atmosphere-only quote)

**Geographic boundary:** 3 Marbella restaurants correctly excluded from El Español / Carlos Navarro article (Edge, Nosso, The One)

**Novel source found:** Andalucia Lovers (Clara) — found via Phase 1B, not in SOURCE_EXAMPLES

---

### Pipeline Performance

| Metric | Porto v6 | Málaga v6 | Lisbon C v5 | Chefchaouen v5 |
|--------|----------|-----------|-------------|----------------|
| Queries | 35 | 36 | 30+sup | 30 |
| Sources | 10 | 6 | 5 | 5 |
| Both-pool | 2 | 0 | 0 | 1 |
| Final restaurants | 53 | 23 | 36 | 17 |
| Tool uses | NC | NC | 85 | 96 |
| Tokens | NC | NC | 137.7k | 116.5k |
| Run time | ~35 min | ~28 min | — | 21m 54s |

---

### Geocoding — Porto

**Script:** localbite-geocode.js v7 (Nominatim → Photon → manual)
**Runs required:** 3 (first run used wrong v2 geocoder; second run had no bounding box; third run clean)

| Metric | Value |
|--------|-------|
| Nominatim found | 39 (74%) |
| Photon added | 10 (19%) |
| Total automated | 49 (92%) |
| False positives nulled | 8 |
| Final geocoded | 41 (77%) |
| Null / approximate pins | 12 (23%) |

**False positives nulled (8):**

| Restaurant | Matched name | Reason |
|------------|-------------|--------|
| Mira Mira | Largo de Mira | A square, not a restaurant |
| Farro | Bairro do Farrobo | A neighbourhood, not a restaurant |
| Vinhas d'Alho | Caminho das Vinhas | A road, not a restaurant |
| Barro | Travessa das Barrosas | A street, not a restaurant |
| A Casa Guedes | Casa dos Acessórios Pinto & Guedes | A shop, not a restaurant |
| Bistro Severo | Viva Bistro | Wrong restaurant entirely |
| ODE Porto Wine House | Agarrafeira Wine House | Wrong business entirely |
| Marisqueira Lusíadas | Marisqueira do Porto | Wrong restaurant |

**Not found by geocoder (4):** Kaigi, Bếp Việt, Urraca, Éon

**Issues encountered:**
- First run used wrong geocoder (v2 with Foursquare instead of v7) — reset and re-ran
- City/country fields nested under `meta` in v6 JSON structure instead of top-level — geocoder updated to check `data.meta.city` as fallback
- Bounding box not firing on first run due to meta structure issue — fixed before clean run

---

### Geocoding — Málaga

**Script:** localbite-geocode.js v7 (Nominatim → Photon → manual)
**Runs required:** 3 (first two runs had no bounding box active; third run clean with bounding box)

| Metric | Value |
|--------|-------|
| Nominatim found | 15 (65%) |
| Photon added | 4 (17%) |
| Total automated | 19 (83%) |
| False positives nulled | 3 |
| Final geocoded | 16 (70%) |
| Null / approximate pins | 7 (30%) |

**False positives nulled (3):**

| Restaurant | Matched name | Reason |
|------------|-------------|--------|
| Balausta | Niño del Balaustre | Wrong name entirely |
| Verum – el Asador de Malaga | Asador de Pollos El Rubén | Wrong restaurant entirely |
| Andino Gastrobar | Andino Gastrobar | Coordinates outside Centro Histórico — suspicious location |

**Not found by geocoder (4):** Mesón Mariano, Da Saveria, El Tintero (bounding box too tight — east limit -4.35 excluded El Palo at -4.34), La Antxoeta

**Issues encountered:**
- Málaga bounding box missing from geocoder CITY_BOXES — added via sed
- East boundary too tight — El Tintero (El Palo, -4.34°W) excluded by -4.35 limit — widened to -4.33 for future runs
- Same meta structure issue as Porto — already fixed in geocoder before Málaga run

---

### Geocoding Summary

| Metric | Porto | Málaga | Total |
|--------|-------|--------|-------|
| Restaurants | 53 | 23 | 76 |
| Final geocoded | 41 (77%) | 16 (70%) | 57 (75%) |
| Approximate / null | 12 (23%) | 7 (30%) | 19 (25%) |
| False positives caught and nulled | 8 | 3 | 11 |
| Geocoder runs needed | 3 | 3 | — |

---

### Viewer Updates

Both cities added to the viewer and index in this session:

| Update | Commit |
|--------|--------|
| Porto and Málaga added to localbite-index.json (13 cities total) | 784bc9d |
| Porto and Málaga neighbourhood centroids added to index.html | 784bc9d |
| Complete Porto neighbourhood variant coverage (40 entries) | 68b918f |
| Málaga neighbourhood centroids | 68b918f |
| Porto geocoded JSON pushed | e518ecb |
| Málaga geocoded JSON pushed | d0ee045, ee18b9a |
| Geocoder updated (meta structure fix + Málaga bounds) | ee18b9a |

**Geocoder fixes committed this session:**
1. `data.city || (data.meta && data.meta.city)` — handles v6 JSON meta structure
2. `data.country || (data.meta && data.meta.country)` — same
3. Málaga added to CITY_BOXES: `{ latMin: 36.68, latMax: 36.76, lngMin: -4.48, lngMax: -4.33 }`

**Definition of done — clarified this session:**
A city is not done until: pipeline complete → geocoding complete → viewer renders correctly on mobile. Porto and Málaga meet this standard as of end of session.

---

### Key Findings — 2026-04-10

1. **Staggered two-city batch works on 5x plan.** Porto started first, Málaga launched when Porto entered Phase 2. No rate limit interruptions. Total wall-clock time approximately 45 minutes for both cities. Validated — use staggered start for all future two-city batches.

2. **Both v6 prompt fixes fired correctly.** COI check logged "INCLUDE with ⚠ coi flag — do NOT exclude" for Time Out Porto. Sibling edition check correctly blocked Time Out EN + Time Out PT from counting as both-pool. Publisher independence requirement applied correctly in both cities.

3. **Mesa Marcada is blocked by Jina byline rendering.** Mesa Marcada passed Phase 0 quality check but individual article bylines are not exposed in Jina-rendered output. Two Porto articles rejected at Phase 1 for failing the named-author rule. Highest-value Jina failure in the project to date — Mesa Marcada is Portugal's strongest independent food platform. Firecrawl test recommended before next PT city run.

4. **Málaga Phase 0 complete failure — known risk for smaller cities.** All three Phase 0 sources failed: Gastronostrum and Disfrutando Málaga block Jina (400/422), Culinary Backstreets has no Málaga content. Pipeline correctly fell back to Phase 1 searches. Remove all three from future Málaga prompts.

5. **Observador 404 is a confirmed persistent failure.** Third consecutive failure (Lisbon A, Lisbon C, Porto). Remove from all PT city prompts permanently.

6. **Both-pool zero for Málaga is structural, not a failure.** EN and ES sources cover different restaurant segments — same finding as Lisbon. 23 restaurants from 6 independent sources is a credible pack for Málaga's size.

7. **v6 JSON structure changed — city/country nested under meta.** All v6 city packs have city and country under `data.meta` not at top level. Geocoder updated to handle both structures. Future v7 prompt should standardise back to top-level fields to match v5 schema and avoid this workaround.

8. **neighbourhood_gaia boolean field added to Porto JSON schema.** Allows the viewer to handle Gaia entries distinctly. 2 entries flagged: Mira Mira and Vinha (both CB, WOW district, explicitly framed as Porto dining).

9. **Token capture procedure must be mandatory from next session.** Both completion banners were missed. Going forward: read and record completion banner before scrolling. Format: `Tokens: [X]k in / [Y]k out | Tool uses: [N] | Duration: [Xm Ys]`.

10. **Standard post-run report format established.** Full run report produced as `localbite-run-report-porto-malaga-v1.1.md` and committed to GitHub. All future city batch sessions must produce a run report before the git commit. Report format version: 1.1.

11. **Geocoding requires multiple runs for new cities.** Both cities required 3 geocoding runs each due to: wrong geocoder version, missing bounding box, and meta structure issues. Future sessions: verify geocoder version and bounding box presence before running.

12. **Map pin language inconsistency identified.** Cards say "Neighbourhood location", map popups say "Approximate location". Standardise to "Approximate location" in a future viewer update.

13. **--dangerously-skip-permissions is the standard Claude Code launch command.** Eliminates approval prompts that slow pipeline execution. Add to pipeline readme.

---

### Decisions Made

- **Staggered batch approach validated** — standard for all future two-city sessions on 5x plan
- **v6 prompt is the new standard** for European city runs — both fixes confirmed working
- **Observador removed** from all future PT city prompts permanently
- **Gastronostrum and Disfrutando Málaga removed** from future Málaga prompts
- **Culinary Backstreets Málaga removed** from future Málaga prompts (no content)
- **Run report format v1.1 is the standard** — produce before every git commit
- **Firecrawl test on Mesa Marcada** — recommended before next PT city run
- **5x plan sufficient** for two-city staggered batches — upgrade to 20x if moving to three-city batches
- **Definition of done** — a city is not complete until pipeline + geocoding + mobile viewer check all pass
- **No manual geocoding lookups** — accept null coordinates for unresolved restaurants; viewer handles gracefully with neighbourhood centroids

---

### Files Produced

| File | Contents |
|------|----------|
| `localbite-porto-2023-2026.json` | 53 restaurants — geocoded (41/53) |
| `localbite-porto-raw.json` | 60 restaurants — pre-removal |
| `localbite-porto-working.json` | Intermediate extraction |
| `localbite-porto-search-log.txt` | 73-line search log |
| `localbite-porto-search-plan.txt` | 30-query search plan |
| `localbite-porto-2023-2026-geocoded-backup.json` | Pre-geocoding backup |
| `localbite-porto-2023-2026-geocoding-stats-c1.json` | Geocoding stats |
| `localbite-malaga-2023-2026.json` | 23 restaurants — geocoded (16/23) |
| `localbite-malaga-raw.json` | 38 restaurants — pre-removal |
| `localbite-malaga-working.json` | Intermediate extraction |
| `localbite-malaga-search-log.txt` | 47-line search log |
| `localbite-malaga-search-plan.txt` | 30-query search plan |
| `localbite-malaga-2023-2026-geocoded-backup.json` | Pre-geocoding backup |
| `localbite-malaga-2023-2026-geocoding-stats-c1.json` | Geocoding stats |
| `localbite-prompt-v6-porto.txt` | v6 prompt used for Porto |
| `localbite-prompt-v6-malaga.txt` | v6 prompt used for Málaga |
| `localbite-geocode.js` | Updated — meta structure fix + Málaga bounds |
| `localbite-index.json` | Updated — 13 cities including Porto and Málaga |
| `index.html` | Updated — Porto and Málaga centroids + bounds |
| `localbite-run-report-porto-malaga-v1.1.md` | Full batch run report |

---

### Outstanding Items

- [ ] Token counts not captured for Porto or Málaga — implement mandatory token capture procedure before next session (read completion banner before scrolling)
- [ ] Add `--dangerously-skip-permissions` to pipeline readme as standard Claude Code launch command
- [ ] Test Firecrawl on Mesa Marcada Porto article — confirm whether bylines are JS-rendered (if yes, integrate as Phase 0 fallback for all PT cities)
- [ ] Fix v7 prompt JSON schema — standardise city/country back to top-level fields (currently under meta) to match v5 schema and avoid geocoder workaround
- [ ] Standardise map pin language — use "Approximate location" consistently (currently "Neighbourhood location" on cards, "Approximate location" in map popups)
- [ ] Audit Barcelona both-pool count (14 entries) — may include same-publisher cross-language pairs that don't qualify under corrected definition
- [ ] Geocode Barcelona (52 restaurants) and Valencia (62 restaurants) — carried from previous sessions
- [ ] Geocode Lisbon — carried from previous sessions
- [ ] Push Rabat and Chefchaouen JSON files to GitHub — carried from previous sessions
- [ ] mysibarita (@Héctor y Elena, Málaga) — Instagram-only ES food account — add to direct outreach list for future Málaga v7 refresh
- [ ] Consider Guía Repsol and Academia Gastronómica (Ignacio Luque) for Málaga v7 — best articles dated 2021, evaluate widening year range

---

## Session — 2026-04-13 (Technical Debt Clearance + Lisbon v6 + Toronto v5/v6 Merge)

### Overview

Full-day session covering: technical debt clearance (pipeline readme, map pin language, v6 template fixes), discovery that the geocoding backlog was already clear, Lisbon v6 pipeline run, Toronto v6 pipeline run, Toronto v5/v6 merge, CENTROIDS namespace collision fix, and extensive false positive geocoding cleanup for both cities.

**Session goals:**
1. Clear technical debt items (pipeline readme, map pin language, template fixes)
2. Geocode outstanding cities (Lisbon, Valencia, Seville, Córdoba, Granada)
3. Run Lisbon and Toronto v6 pipelines
4. Get both cities live and rendering correctly on mobile

---

### Technical Debt Items Completed

| Item | Action | Commit |
|------|--------|--------|
| `--dangerously-skip-permissions` + token capture procedure | Added to pipeline readme with benchmark guidance | 02efdb7 |
| Map pin language | "Neighbourhood location" → "Approximate location" (index.html line 1878) | 02efdb7 |
| Pre-geocode check script | `localbite-pre-geocode-check.sh` created and committed | 02efdb7 |
| v6 template — REVIEW_MODE: BRIEF | Inserted after opening paragraph (line 148) | 2585b74 |
| v6 template — JSON STRUCTURE RULE | Inserted after JSON schema block (line 756) | 2585b74 |

**Notable finding — v6 JSON schema:** The v6 template already had `city` and `country` at top level. The meta-nesting issue was introduced at pipeline runtime, not in the template. The JSON STRUCTURE RULE note was added to make the instruction explicit and prevent future drift.

---

### Geocoding Backlog — Already Clear

A fleet-wide audit revealed all cities were already geocoded from previous sessions. The journal's outstanding items list was stale on this point.

| City | Geocoded | Null | Status |
|------|----------|------|--------|
| Barcelona v6 | 53/86 | 33 | ✅ Done (April 8) |
| Valencia v6 | 33/47 | 14 | ✅ Done (April 9) |
| Seville | 45/61 | 16 | ✅ Done (April 9) |
| Córdoba | 29/35 | 6 | ✅ Done (April 9) |
| Granada | 12/15 | 3 | ✅ Done (April 9) |
| Toronto | 51/52 | 1 | ✅ Done (March 31) |
| Lisbon | 36/36 | 0 | ✅ Done (March 29, HERE coords replaced) |
| Porto | 41/53 | 12 | ✅ Done (April 10) |
| Málaga | 16/23 | 7 | ✅ Done (April 10) |

---

### Lisbon v6 Pipeline Run

**Prompt:** `localbite-prompt-v6-lisbon.txt` (Part 1 + template)
**Output file:** `localbite-lisbon-2023-2026.json`
**Token count:** Not captured — completion banner scrolled past
**Context limit hit:** Yes — mid-Phase 2. Recovered with `/compact` + Phase 3 instruction

**Sources (6):**

| Publication | Writer | Language | Type | Date | Found via |
|------------|--------|----------|------|------|-----------|
| Mesa Marcada | Miguel Pires | PT | Primary | 2025-03-08 | Phase 0 ✓ |
| Culinary Backstreets | Célia Pedroso / Austin Bush | EN | Primary ⚠coi | 2026-01-30 | Phase 0 ✓ |
| Ola Daniela | Daniela Sunde-Brown | EN | Primary | 2024-11-30 | Phase 1 |
| The Infatuation | Rita Geraldes | EN | Primary | 2023-07-24 | Phase 1 |
| NiT | Eva Reimão / Catarina Simões | PT | Primary | 2025-07-04 | Phase 1 — new discovery |
| Time Out Lisbon EN | Editorial team | EN | Secondary ⚠coi | 2026-02-11 | Phase 1 |

**Results:**

| Metric | v5 (March 2026) | v6 (April 2026) |
|--------|----------------|----------------|
| Restaurants | 36 | 48 |
| Sources | 5 | 6 |
| Both-pool | 0 | 1 (Vibe) |
| Geocoded | 36/36 (100%) | 35/48 (73%) |
| Tier A | 2 | 11 |
| PT pool restaurants | 10 | 2 |
| open_status_check | 0 | 27 |

**Both-pool entry:** Vibe (Chiado) — Ola Daniela EN + NiT PT, different publishers ✓

**User removals (7):** BouBou's (chef departure April 2026), Brilhante, Hachi Kare-Ya, Kefi Greek Bistro, Zula Bistro (concentration cap × 5), SEM ("last nights" closure signal), Ponto Final (Almada conditional not satisfied)

**Geocoding — false positives nulled (5):**
- Afonso dos Leitões → outside bounding box (lat 38.876)
- Essencial → beauty salon
- Gunpowder → gunpowder factory
- O Maravilhas → street square
- À Costa → motorway

**Post-geocoding state:** 35/48 (73%) — 13 null (8 not found + 5 false positives)

**PT pool regression noted:** v5 had 10 PT-pool restaurants; v6 has only 2. Observador 404 and Público/Fugas 451 permanently blocked both major PT sources. NiT adds 1 PT entry only (ratings-style quotes mostly scored Tier C). This is a structural limitation of the current Jina-accessible PT landscape.

**JSON structure fix:** Pipeline output had `city_slug` and `built` missing (used `generated` instead). Fixed manually before index update.

**CENTROIDS collision fix:** Lisbon's `Baixa` centroid (38.7101, -9.1370) was being overwritten by Porto's `Baixa` centroid (41.1460, -8.6110) in the flat CENTROIDS namespace. Fixed by:
1. Renaming Lisbon restaurant neighbourhood from "Baixa" → "Baixa (Lisboa)"
2. Adding `'Baixa (Lisboa)': [38.7101, -9.1370]` to CENTROIDS
3. Keeping Porto's `'Baixa'` key unchanged

---

### Toronto v6 Pipeline Run

**Prompt:** `localbite-prompt-v6-toronto.txt` (Part 1 + template)
**Output file:** `localbite-toronto-2023-2026.json` (v6 only, later merged)
**Token count:** Not captured
**API 500 errors:** Multiple mid-run. Session cleared with `/clear` and restarted cleanly.

**Phase 0:** Toronto Life (403), NOW Toronto (CAPTCHA) — both blocked. Only Madame Marie passed.

**Sources (7 in v6 run):**
- Madame Marie ×2 (fall + summer 2025) ✓
- Toronto Life Michelin 2025 ✓
- The Curious Creature / Erin Nicole Davis ✓ — new discovery
- Canada's 100 Best Restaurants 2025 ✓ (secondary)
- Toronto Life Best New Restaurants 2025 ✓
- NOW Toronto / Keema Lesesne (undated)

**Results (v6 standalone):** 34 restaurants, 3 Tier A, 31 Tier B, 7/34 (21%) geocoded

**Geocoding regression analysis:** v5 achieved 98% geocoding via 33 manual lookups. v6 achieved only 21% because: (1) no manual lookups policy, (2) v6 pack dominated by 2024–2025 new openings not yet in OSM, (3) v5 Foodism articles covered established restaurants with OSM presence for years.

---

### Toronto v5/v6 Merge

**Decision:** Rather than replacing v5 with the weaker v6 standalone, merge both packs into a single canonical pack combining v5's geocoding and source depth with v6's new sources and Foodism cap enforcement.

**Merge script:** `localbite-toronto-merge.js` — written and committed to repo.

**Merge logic:**
- v5 base: 52 restaurants → 47 after Foodism cap removals (5 removed)
- 14 overlap restaurants: v5 entry kept, v6 sources merged in
- 19 v6-only restaurants added
- Sources deduped: Madame Marie publication name mismatch fixed post-merge
- Output: 66 restaurants, 12 sources

**Foodism cap removals (5):** Taverne Bernhardt's, Yan Dining Room, Lyla, Morrellina's, Sushi Yugen — all had quotes at or below 15-word minimum.

**Overlap source merges (14):** Akin, Arbequina, Bisteccheria Sammarco (v6: "Sammarco" — name variant resolved), Bar Prima, DaNico, Liliana, louf, Bar Eugenie, Golden Horseshoe Barbecue, N.L. Ginzburg, Occhiolino, Tutto Panino, Zia's Place, The Frederick — all gained additional source IDs from v6.

**Final merged pack results:**

| Metric | v5 | v6 standalone | Merged |
|--------|----|----|--------|
| Restaurants | 52 | 34 | 66 |
| Sources | 8 | 7 | 12 |
| Geocoded | 51/52 (98%) | 7/34 (21%) | 50/66 (76%)* |
| Multi-source | 12 | 3 | 22 |
| Foodism single-source % | 53% | 0% | 24% |
| open_status_check | 0 | 9 | 7 |

*After false positive nulling

**False positives nulled in merged pack (8):** Ayla (dentist), Blue Bovine (Bovine Sex Club), Daphne (wrong café), Estiatorio Milos (wrong restaurant), Harlem (Harlem Underground), Lunch Lady (wrong café), Osteria Giulia (wrong location), Takja BBQ (wrong business)

**Index fix:** `both_pool_count` was incorrectly set to 22 by index-update script (counted multi-source as both-pool). Fixed to `both_pool_count: 0`, `multi_source_count: 22`.

**v5 files retained:** `localbite-toronto-2025-2026.json` and `localbite-lisbon-2025-2026.json` kept as archived references — not removed from repo.

---

### Pipeline Source Failures — Permanent

| Source | City | Failure | Action |
|--------|------|---------|--------|
| Observador | Lisbon | 404 — 4th consecutive failure | Remove from all PT prompts permanently |
| Público/Fugas | Lisbon | 451 blocked | Add to KNOWN_PROBLEMATIC_URLS for PT cities |
| Toronto Life | Toronto | 451/403 on all URL patterns | Firecrawl test recommended |
| NOW Toronto | Toronto | CAPTCHA block | Firecrawl test recommended |

---

### Commits This Session

| Commit | Description |
|--------|-------------|
| 02efdb7 | Pipeline readme, map pin fix, pre-geocode check script |
| 2585b74 | v6 template — REVIEW_MODE BRIEF + JSON STRUCTURE RULE |
| efc4419 | Lisbon and Toronto v6 pipeline prompts |
| 88aabbc | Lisbon v6 pipeline run + geocoding + viewer (48 restaurants) |
| b20b08f | Fix missing null coordinate fields in Lisbon JSON |
| a5be8af | Fix Baixa CENTROIDS collision between Lisbon and Porto |
| a9b891f | Toronto merged pack (66 restaurants) — post-pipeline commit |
| 02f9a7d | Null 8 Toronto false positive coordinates; fix index both_pool count |
| 069d941 | Toronto merge script, geocoding stats, fleet summary |

---

### Key Findings — 2026-04-13

1. **The geocoding backlog was already clear.** All 9 non-new cities had been geocoded in previous sessions. The journal's outstanding items list was significantly stale. Future sessions should verify current state before planning work.

2. **v5 Toronto's 98% geocoding rate was achieved by 33 manual lookups, not automation.** Nominatim + Photon only found 18 restaurants. The "no manual lookups" policy adopted after March 31 is what caused the v6 geocoding regression, not the geocoder itself. For flagship cities like Toronto, a manual lookup exception policy is warranted.

3. **NiT (Eva Reimão) is the strongest new Lisbon PT source discovery.** Previously unknown to the pipeline, NiT's 169 melhores restaurantes Lisboa (July 2025) was found via Phase 1 search. It's ratings-style with thin quotes so most entries scored Tier C, but it produced the first Lisbon both-pool entry (Vibe).

4. **Lisbon PT pool regressed from v5 to v6.** v5 had 10 PT-pool restaurants; v6 has 2. Observador (404) and Público/Fugas (451) are both permanently blocked. The Lisbon PT food writing landscape is now structurally inaccessible via Jina. A Firecrawl test or direct source outreach is needed before Lisbon v3.

5. **Toronto Life is the highest-value blocked source in the fleet.** 451/403 on all URL patterns tried. As Toronto's flagship food publication its absence structurally limits any Toronto pipeline run. Firecrawl test is the recommended next step before Toronto v3.

6. **Madame Marie publication name inconsistency caused source dedup failure.** v5 stored "Madame Marie (madamemarie.co)", v6 stored "Madame Marie". String comparison failed, producing 5 Madame Marie source entries. Fixed post-merge with a remapping script. Future pipelines should normalise publication names against a registry at extraction time.

7. **CENTROIDS flat namespace collision between Lisbon and Porto Baixa.** Porto's `'Baixa'` centroid (41.1460, -8.6110) overwrote Lisbon's (38.7101, -9.1370), causing Lisbon restaurants with neighbourhood "Baixa" to pin in Porto. Fixed by renaming Lisbon's neighbourhood to "Baixa (Lisboa)" in the JSON and adding a matching CENTROIDS key. This pattern will recur for any neighbourhood name shared between cities — Centro Histórico, Medina, Chiado, etc.

8. **The v5/v6 merge approach is replicable.** The `localbite-toronto-merge.js` script handles: Foodism cap enforcement, name variant resolution, source dedup with publication name normalisation, overlap source merging, and v6-only restaurant appending. Can be adapted for future city merges with minimal changes.

9. **API 500 errors interrupted Toronto pipeline mid-run.** Clearing the session with `/clear` and restarting recovered the run cleanly. The restart correctly detected existing output files and rewrote the search plan. No data was lost.

10. **open_status_check is now a significant fleet-wide concern.** Seville has 29 restaurants (48% of pack) from 2023 sources unverified for closure. Barcelona has 11 from December 2024. A systematic open_status_check pass is needed before either city is widely shared.

11. **Token capture procedure still being missed.** Both Lisbon and Toronto completion banners were not captured. The procedure is documented in the pipeline readme but needs to become instinctive. Suggestion: set a phone reminder to "read banner" before touching the keyboard after a pipeline completes.

---

### Decisions Made

- **Lisbon v6 is the canonical Lisbon pack** — supersedes v5 for all future viewer references
- **Toronto merged pack (v5v6-merge) is canonical** — v5 and v6 standalone files retained as archives
- **Observador removed** from all future PT city prompts permanently
- **Público/Fugas added** to KNOWN_PROBLEMATIC_URLS for all PT cities
- **No manual lookups policy has a Toronto exception** — for flagship cities where geocoding rate falls below 50%, manual lookups are warranted
- **Firecrawl tests recommended** for Toronto Life and Mesa Marcada before next EN/PT city runs
- **CENTROIDS collision pattern documented** — any neighbourhood name shared between cities must use city-prefixed keys (e.g. "Baixa (Lisboa)" vs "Baixa")
- **v5 archive files retained** — `localbite-toronto-2025-2026.json` and `localbite-lisbon-2025-2026.json` kept as reference

---

### Files Produced / Modified

| File | Change |
|------|--------|
| `localbite-pipeline-readme.md` | New — comprehensive pipeline guide with --dangerously-skip-permissions, token capture, benchmark guidance |
| `localbite-pre-geocode-check.sh` | New — pre-geocoding verification script |
| `localbite-prompt-v6-template.txt` | Updated — REVIEW_MODE BRIEF + JSON STRUCTURE RULE |
| `localbite-prompt-v6-lisbon-part1.txt` | New |
| `localbite-prompt-v6-lisbon.txt` | New |
| `localbite-prompt-v6-toronto-part1.txt` | New |
| `localbite-prompt-v6-toronto.txt` | New |
| `localbite-lisbon-2023-2026.json` | New — 48 restaurants, v6 |
| `localbite-lisbon-raw.json` | New |
| `localbite-lisbon-audit.txt` | New |
| `localbite-lisbon-search-log.txt` | New |
| `localbite-lisbon-search-plan.txt` | New |
| `localbite-lisbon-2023-2026-geocoded-backup.json` | New |
| `localbite-lisbon-2023-2026-geocoding-stats-c1.json` | New |
| `localbite-toronto-2023-2026.json` | New — 66 restaurants, v5v6-merge |
| `localbite-toronto-merge.js` | New — merge script |
| `localbite-toronto-2023-2026-geocoding-stats-c1.json` | New |
| `localbite-fleet-summary-2026-04-13.md` | New — comprehensive 13-city fleet summary |
| `index.html` | Updated — Baixa (Lisboa) centroid added; Arroios + Mouraria centroids added for Lisbon |
| `localbite-index.json` | Updated — Lisbon 48 restaurants v6; Toronto 66 restaurants v5v6-merge |

---

### Outstanding Items

- [ ] **Token capture** — both Lisbon and Toronto completion banners missed again. Phone reminder recommended before next pipeline run.
- [ ] **Seville open_status_check** — 29 restaurants (48% of pack) from 2023 sources. Highest data quality risk in fleet. Verify before widely sharing.
- [ ] **Barcelona open_status_check** — 11 restaurants from December 2024 (16 months old). Verify closures.
- [ ] **Córdoba and Granada open_status_check** — 13 restaurants combined.
- [ ] **Firecrawl test — Toronto Life** — highest-value blocked EN source. Test before Toronto v3.
- [ ] **Firecrawl test — Mesa Marcada** — highest-value blocked PT source. Test before Lisbon v3 or any PT city run.
- [ ] **Lisbon PT pool** — only 2 PT-pool restaurants in v6. Observador and Público/Fugas both blocked. Research alternative PT sources (Sábado, Evasões, Visão direct URLs) before Lisbon v3.
- [ ] **CENTROIDS namespace audit** — identify all neighbourhood names shared between cities (Centro Histórico, Medina, Chiado, El Carmen etc.) and add city-prefixed variants to prevent future collisions.
- [ ] **Delete stale Barcelona v4 pack** — `localbite-barcelona-2025-2026.json` (52 restaurants) superseded by v6 (86 restaurants). Remove from repo.
- [ ] **Lisbon v6 PT pool regression** — document in Lisbon research summary for v3 planning.
- [ ] **Toronto v3 planning** — target: Toronto Life (via Firecrawl), Globe and Mail food section, Eat North as primary new sources.
- [ ] **Valencia v2** — 39/47 restaurants have `article_date: undated`. Address in v2 rebuild.
- [ ] **Add `--dangerously-skip-permissions` to pipeline readme** ✅ Done this session.
- [ ] **Standardise map pin language** ✅ Done this session.

## Addendum — 2026-04-13 (late session items)

### Additional outstanding items agreed after initial journal entry

- [ ] **Token capture — programmatic** — add `localbite-run-metrics.log` append instruction to v6 template; create log file. Replaces manual banner-reading procedure entirely. Priority 1 next session.
- [ ] **Article title feature — all three pieces** — (1) viewer: show article date in Sources panel; (2) template: add `article_title` extraction rule; (3) backfill: run `localbite-backfill-titles.js` across all 13 live cities. Script built and ready. Priority 2 next session.
- [ ] **Pipeline readme — manual pre-fetch workaround** — document the browser copy → pbpaste → local file approach for 451/403 blocked sources. Priority 3 next session.
- [ ] **Firecrawl test — revised scope** — targeted Jina fallback only (not replacement). Test 3 URLs: Mesa Marcada article (JS bylines), Toronto Life article (403 bypass), Gastronostrum (422 bypass). Decision rule: 2 of 3 succeed → integrate as v7 fallback; 0-1 succeed → use manual pre-fetch instead. Free tier (500 lifetime credits) sufficient at 2-3 credits per city. Priority 4 next session.
- [ ] **Toronto source URLs** — Toronto Life Michelin URL corrected to `torontolife.com/food/toronto-michelin-guide-2025/`. Curious Creature article confirmed dead (404) — flagged with `url_status: dead`. Both committed (cd35d31).
- [ ] **Toronto source accessibility audit** — 10 of 12 sources confirmed accessible in browser. Foodism × 3 and Madame Marie × 3 fully accessible. NOW Toronto × 2, Toronto Life Best New, Canada's 100 Best also accessible. Toronto Life Michelin (dead) and Curious Creature (dead) flagged.



## Session — 2026-04-14 (Article Titles, Token Capture, Fetch Strategy Review)

### Overview

Primarily a maintenance and tooling session. Six tasks completed across token capture, viewer improvements, template updates, pipeline documentation, and fetch strategy research. One significant task (article title backfill) deferred after careful analysis. Major finding: Jina renders JavaScript — the Mesa Marcada byline problem is a CMS configuration issue, not a Jina limitation.

---

### Tasks Completed

| Task | Commit | Notes |
|------|--------|-------|
| Token capture — `localbite-run-metrics.log` | e47ddc2 | Template patched + log file created with backfill from journal |
| Viewer — article date + title in Sources panel | 5e6f199 | Two new CSS classes, two formatter functions, graceful null handling |
| Template — `article_title` extraction rule | c305c98 | Added to sources JSON schema and extraction rules (all article dates) |
| Backfill script — committed, live run deferred | 29adc61 | See decision below |
| Pipeline readme — pre-fetch, Wayback, Jina note | 6f687f0 | Also fixed stale Mesa Marcada Firecrawl note |
| RSS test for Mesa Marcada | no commit | 200 OK, feed accessible, but bylines show "Mesa Marcada" not individual writer names — CMS config issue, not a fetch limitation |

---

### Key Decisions Made

**1. Backfill script deferred — live run not executed**

`localbite-backfill-titles.js` was built and committed but not run against live city JSONs. The dry-run revealed that `<title>` tag extraction produces unreliable results for a curated food app:

- HTML entities not decoded (`&mdash;`, `&#039;` etc.) would display raw in the viewer
- Bot-blocked pages return junk titles (`"Attention Required!"`, `"Just a moment..."`, `"Access Denied"`)
- Some sources return the site name rather than the article title (`"Ojoalplato"`, `"TOP 2025"`)
- No amount of script fixes fully solves the structural problem — `<title>` tags are designed for browser tabs and SEO, not for human-readable article attribution

Decision: titles will accumulate naturally as cities rebuild on v6. The template now extracts `article_title` correctly from fetched article text (Claude Code has full context and identifies headlines accurately). The backfill script remains as reference for future use if a cleaner approach emerges.

**2. Firecrawl, Playwright, Crawl4AI all rejected**

Exhaustive review of all Jina alternatives conducted. Key findings:

- Jina renders JavaScript — it uses a headless browser. The Mesa Marcada byline problem is not a JS rendering issue. Bylines don't appear because Mesa Marcada's CMS publishes some articles under the site account ("Mesa Marcada") rather than individual writer accounts. This is unfixable via any fetch tool.
- Playwright: awkward Claude Code integration (subprocess architecture), stealth patching needed for major publishers, not worth the dependency for LocalBite's scale
- Crawl4AI: Python (wrong language for LocalBite's Node.js pipeline), supply chain security incident in v0.8.5 (PyPI compromise requiring emergency hotfix), active development instability
- Firecrawl: credit-limited free tier, external dependency, architecturally awkward with Claude Code
- Manual pre-fetch: solves any source accessible in a browser, zero dependencies, 3-5 minutes per source, already documented in pipeline readme

**3. Jina acquired by Elastic (October 2025)**

Discovered during research. Elastic completed acquisition of Jina AI in October 2025 and has stated intention to continue the open-source community approach while integrating into Elasticsearch commercial offerings. No immediate impact on LocalBite — `r.jina.ai` free endpoint continues to operate. Long-term watch item: if Elastic moves Jina behind an Elasticsearch subscription, the pipeline would need a new fetch mechanism.

**4. Wayback Machine added as fallback for 404 sources**

One-line instruction added to pipeline readme. For sources that return 404 (article moved or deleted), the pipeline can retry via `https://r.jina.ai/https://web.archive.org/web/2026/[URL]`. Known use case: The Curious Creature Toronto article (confirmed dead post-pipeline).

**5. Mesa Marcada RSS confirmed accessible but bylines unreliable**

`https://mesamarcada.com/feed` — 200 OK, well-structured WordPress RSS. Articles posted under individual authors show `<dc:creator>Miguel Pires</dc:creator>`. Articles posted under the site account show `<dc:creator>Mesa Marcada</dc:creator>`. The inconsistency is a CMS publishing workflow issue. RSS is useful for `article_title` backfill (titles are clean) but not reliable for byline attribution.

---

### Viewer Changes

Sources panel now displays:

```
[Publication name]
by [Writer name]
"[Article title]"          ← new, italic, shown if article_title present
Published [Mon YYYY]       ← new, shown if article_date present
[Writer profile]
Read article ↗
```

Date formatter handles:
- Standard `YYYY-MM-DD` → "Jan 2026"
- Multi-date strings (takes first date) → "Mar 2025"
- `"undated"` → null → shows nothing
- Missing field → null → shows nothing

Title formatter:
- Present and non-empty → shown in curly quotes
- Null or empty → shows nothing
- Displays for all sources regardless of article date (correct — `article_title` is not date-dependent)

Both fields degrade gracefully for cities not yet backfilled — shows nothing, which is the current state for all 13 cities.

---

### Template Changes

`localbite-prompt-v6-template.txt` now includes:

1. `article_title` in sources JSON schema: `"string or null — article headline as published"`
2. `article_title` in extraction rules alongside `article_date`: `"article_title (from page h1 or title tag — null if not found)"` — applies to all articles regardless of date
3. Metrics log instruction (from April 13 session, committed today): append to `localbite-run-metrics.log` as final action

---

### Pipeline Readme Changes

Three new sections added to `localbite-pipeline-readme.md`:

1. **Workaround for 451/403 blocked sources** — manual pre-fetch procedure (Cmd+A, Cmd+C, pbpaste > file, PREFETCHED_SOURCES in Part 1)
2. **Wayback Machine fallback** — retry instruction for 404 sources, known use case for The Curious Creature
3. **Note on Jina and bot detection** — clarifies that Jina deliberately does not bypass bot detection (stated policy), does render JavaScript, and documents alternatives evaluated and rejected

Also fixed stale note in Limitations section: Mesa Marcada entry previously said "Firecrawl test recommended" — updated to reflect current understanding and pre-fetch workaround approach.

---

### Run Metrics Log — Backfill

`localbite-run-metrics.log` created and backfilled with known runs from journal:

```
Chefchaouen | 2026-03-25 | tokens: 116.5k | tools: 96 | time: 21m 54s | restaurants: 12 | sources: 5
Marrakesh | 2026-03-22 | tokens: 127.4k | tools: ~90 | time: 19m | restaurants: 14 | sources: 5
Barcelona v6 | 2026-04-08 | tokens: not captured | ...
Lisbon v6 | 2026-04-13 | tokens: not captured | ...
Toronto v5v6-merge | 2026-04-13 | tokens: not captured | ...
```

Future pipeline runs will append automatically via the node command in the template.

---

### Files Produced / Modified

| File | Change |
|------|--------|
| `localbite-prompt-v6-template.txt` | `article_title` schema field + extraction rule + metrics log instruction |
| `localbite-run-metrics.log` | New — programmatic token/metrics capture log |
| `index.html` | Sources panel: `article_title` + `article_date` display + CSS + formatter functions |
| `localbite-backfill-titles.js` | New — article title backfill script (reference, not run) |
| `localbite-pipeline-readme.md` | Pre-fetch workaround + Wayback fallback + Jina note + Mesa Marcada fix |

---

### Outstanding Items

- [ ] **CENTROIDS namespace audit** — Centro Histórico, Medina, El Carmen, Chiado shared between cities. Baixa (Lisboa) fixed April 13 — audit for remaining collisions.
- [ ] **Seville open_status_check** — 29 restaurants (48% of pack), some from 2023 sources. Highest data quality risk in fleet. Verify before widely sharing.
- [ ] **Barcelona open_status_check** — 11 restaurants, sources from December 2024 (16 months old). Verify closures.
- [ ] **Córdoba and Granada open_status_check** — 13 restaurants combined.
- [ ] **Delete stale Barcelona v4 pack** — `localbite-barcelona-2025-2026.json` superseded by v6.
- [ ] **Valencia v2** — 39/47 restaurants have `article_date: undated`. Fix in v2 rebuild.
- [ ] **Lisbon PT pool** — only 2 PT-pool restaurants in v6. Find PT sources (Sábado, Evasões, Visão) for v3.
- [ ] **Fes v6 upgrade** — oldest pipeline in fleet (v4).
- [ ] **Article title backfill** — deferred. Will accumulate naturally as cities rebuild on v6. Revisit if a reliable extraction method emerges (not `<title>` tag scraping).
- [ ] **Jina/Elastic watch** — monitor whether Elastic moves `r.jina.ai` behind a subscription. If so, manual pre-fetch becomes the default fetch mechanism for all blocked sources.

---

### Decisions Not Made / Carried Forward

- **Seville open_status_check verification** — highest priority data quality task, deferred due to session focus on tooling
- **Toronto v3** — target Toronto Life (pre-fetch workaround now documented), Globe and Mail food section, Eat North

---

*Session duration: approximately 3 hours including extended fetch strategy research*
*Commits: e47ddc2, 5e6f199, c305c98, 29adc61, 6f687f0*
*Fleet: 13 cities, 480 restaurants — unchanged*

## Session — 2026-04-14 (Article Titles, Token Capture, Fetch Strategy Review)

### Overview

Primarily a maintenance and tooling session. Six tasks completed across token capture, viewer improvements, template updates, pipeline documentation, and fetch strategy research. One significant task (article title backfill) deferred after careful analysis. Major finding: Jina renders JavaScript — the Mesa Marcada byline problem is a CMS configuration issue, not a Jina limitation.

---

### Tasks Completed

| Task | Commit | Notes |
|------|--------|-------|
| Token capture — `localbite-run-metrics.log` | e47ddc2 | Template patched + log file created with backfill from journal |
| Viewer — article date + title in Sources panel | 5e6f199 | Two new CSS classes, two formatter functions, graceful null handling |
| Template — `article_title` extraction rule | c305c98 | Added to sources JSON schema and extraction rules (all article dates) |
| Backfill script — committed, live run deferred | 29adc61 | See decision below |
| Pipeline readme — pre-fetch, Wayback, Jina note | 6f687f0 | Also fixed stale Mesa Marcada Firecrawl note |
| RSS test for Mesa Marcada | no commit | 200 OK, feed accessible, but bylines show "Mesa Marcada" not individual writer names — CMS config issue, not a fetch limitation |

---

### Key Decisions Made

**1. Backfill script deferred — live run not executed**

`localbite-backfill-titles.js` was built and committed but not run against live city JSONs. The dry-run revealed that `<title>` tag extraction produces unreliable results for a curated food app:

- HTML entities not decoded (`&mdash;`, `&#039;` etc.) would display raw in the viewer
- Bot-blocked pages return junk titles (`"Attention Required!"`, `"Just a moment..."`, `"Access Denied"`)
- Some sources return the site name rather than the article title (`"Ojoalplato"`, `"TOP 2025"`)
- No amount of script fixes fully solves the structural problem — `<title>` tags are designed for browser tabs and SEO, not for human-readable article attribution

Decision: titles will accumulate naturally as cities rebuild on v6. The template now extracts `article_title` correctly from fetched article text (Claude Code has full context and identifies headlines accurately). The backfill script remains as reference for future use if a cleaner approach emerges.

**2. Firecrawl, Playwright, Crawl4AI all rejected**

Exhaustive review of all Jina alternatives conducted. Key findings:

- Jina renders JavaScript — it uses a headless browser. The Mesa Marcada byline problem is not a JS rendering issue. Bylines don't appear because Mesa Marcada's CMS publishes some articles under the site account ("Mesa Marcada") rather than individual writer accounts. This is unfixable via any fetch tool.
- Playwright: awkward Claude Code integration (subprocess architecture), stealth patching needed for major publishers, not worth the dependency for LocalBite's scale
- Crawl4AI: Python (wrong language for LocalBite's Node.js pipeline), supply chain security incident in v0.8.5 (PyPI compromise requiring emergency hotfix), active development instability
- Firecrawl: credit-limited free tier, external dependency, architecturally awkward with Claude Code
- Manual pre-fetch: solves any source accessible in a browser, zero dependencies, 3-5 minutes per source, already documented in pipeline readme

**3. Jina acquired by Elastic (October 2025)**

Discovered during research. Elastic completed acquisition of Jina AI in October 2025 and has stated intention to continue the open-source community approach while integrating into Elasticsearch commercial offerings. No immediate impact on LocalBite — `r.jina.ai` free endpoint continues to operate. Long-term watch item: if Elastic moves Jina behind an Elasticsearch subscription, the pipeline would need a new fetch mechanism.

**4. Wayback Machine added as fallback for 404 sources**

One-line instruction added to pipeline readme. For sources that return 404 (article moved or deleted), the pipeline can retry via `https://r.jina.ai/https://web.archive.org/web/2026/[URL]`. Known use case: The Curious Creature Toronto article (confirmed dead post-pipeline).

**5. Mesa Marcada RSS confirmed accessible but bylines unreliable**

`https://mesamarcada.com/feed` — 200 OK, well-structured WordPress RSS. Articles posted under individual authors show `<dc:creator>Miguel Pires</dc:creator>`. Articles posted under the site account show `<dc:creator>Mesa Marcada</dc:creator>`. The inconsistency is a CMS publishing workflow issue. RSS is useful for `article_title` backfill (titles are clean) but not reliable for byline attribution.

---

### Viewer Changes

Sources panel now displays:

```
[Publication name]
by [Writer name]
"[Article title]"          ← new, italic, shown if article_title present
Published [Mon YYYY]       ← new, shown if article_date present
[Writer profile]
Read article ↗
```

Date formatter handles:
- Standard `YYYY-MM-DD` → "Jan 2026"
- Multi-date strings (takes first date) → "Mar 2025"
- `"undated"` → null → shows nothing
- Missing field → null → shows nothing

Title formatter:
- Present and non-empty → shown in curly quotes
- Null or empty → shows nothing
- Displays for all sources regardless of article date (correct — `article_title` is not date-dependent)

Both fields degrade gracefully for cities not yet backfilled — shows nothing, which is the current state for all 13 cities.

---

### Template Changes

`localbite-prompt-v6-template.txt` now includes:

1. `article_title` in sources JSON schema: `"string or null — article headline as published"`
2. `article_title` in extraction rules alongside `article_date`: `"article_title (from page h1 or title tag — null if not found)"` — applies to all articles regardless of date
3. Metrics log instruction (from April 13 session, committed today): append to `localbite-run-metrics.log` as final action

---

### Pipeline Readme Changes

Three new sections added to `localbite-pipeline-readme.md`:

1. **Workaround for 451/403 blocked sources** — manual pre-fetch procedure (Cmd+A, Cmd+C, pbpaste > file, PREFETCHED_SOURCES in Part 1)
2. **Wayback Machine fallback** — retry instruction for 404 sources, known use case for The Curious Creature
3. **Note on Jina and bot detection** — clarifies that Jina deliberately does not bypass bot detection (stated policy), does render JavaScript, and documents alternatives evaluated and rejected

Also fixed stale note in Limitations section: Mesa Marcada entry previously said "Firecrawl test recommended" — updated to reflect current understanding and pre-fetch workaround approach.

---

### Run Metrics Log — Backfill

`localbite-run-metrics.log` created and backfilled with known runs from journal:

```
Chefchaouen | 2026-03-25 | tokens: 116.5k | tools: 96 | time: 21m 54s | restaurants: 12 | sources: 5
Marrakesh | 2026-03-22 | tokens: 127.4k | tools: ~90 | time: 19m | restaurants: 14 | sources: 5
Barcelona v6 | 2026-04-08 | tokens: not captured | ...
Lisbon v6 | 2026-04-13 | tokens: not captured | ...
Toronto v5v6-merge | 2026-04-13 | tokens: not captured | ...
```

Future pipeline runs will append automatically via the node command in the template.

---

### Files Produced / Modified

| File | Change |
|------|--------|
| `localbite-prompt-v6-template.txt` | `article_title` schema field + extraction rule + metrics log instruction |
| `localbite-run-metrics.log` | New — programmatic token/metrics capture log |
| `index.html` | Sources panel: `article_title` + `article_date` display + CSS + formatter functions |
| `localbite-backfill-titles.js` | New — article title backfill script (reference, not run) |
| `localbite-pipeline-readme.md` | Pre-fetch workaround + Wayback fallback + Jina note + Mesa Marcada fix |

---

### Outstanding Items

- [ ] **CENTROIDS namespace audit** — Centro Histórico, Medina, El Carmen, Chiado shared between cities. Baixa (Lisboa) fixed April 13 — audit for remaining collisions.
- [ ] **Seville open_status_check** — 29 restaurants (48% of pack), some from 2023 sources. Highest data quality risk in fleet. Verify before widely sharing.
- [ ] **Barcelona open_status_check** — 11 restaurants, sources from December 2024 (16 months old). Verify closures.
- [ ] **Córdoba and Granada open_status_check** — 13 restaurants combined.
- [ ] **Delete stale Barcelona v4 pack** — `localbite-barcelona-2025-2026.json` superseded by v6.
- [ ] **Valencia v2** — 39/47 restaurants have `article_date: undated`. Fix in v2 rebuild.
- [ ] **Lisbon PT pool** — only 2 PT-pool restaurants in v6. Find PT sources (Sábado, Evasões, Visão) for v3.
- [ ] **Fes v6 upgrade** — oldest pipeline in fleet (v4).
- [ ] **Article title backfill** — deferred. Will accumulate naturally as cities rebuild on v6. Revisit if a reliable extraction method emerges (not `<title>` tag scraping).
- [ ] **Jina/Elastic watch** — monitor whether Elastic moves `r.jina.ai` behind a subscription. If so, manual pre-fetch becomes the default fetch mechanism for all blocked sources.

---

### Decisions Not Made / Carried Forward

- **Seville open_status_check verification** — highest priority data quality task, deferred due to session focus on tooling
- **Toronto v3** — target Toronto Life (pre-fetch workaround now documented), Globe and Mail food section, Eat North

---

*Session duration: approximately 3 hours including extended fetch strategy research*
*Commits: e47ddc2, 5e6f199, c305c98, 29adc61, 6f687f0*
*Fleet: 13 cities, 480 restaurants — unchanged*


## Addendum — 2026-04-14 (product development planning)

### Bottom Sheet and Cross-Navigation — Planning Complete

Extended product planning session covering two backlog items: List ↔ Map cross-navigation and List view sort/layout improvements. Full build plan produced and scripted, ready to execute in next session.

---

### Architecture Decision — Vanilla JS retained

Framework migration considered and rejected. Decision: stay in vanilla JS for the bottom sheet build. Key factors:

- `cardHTML(r)` is already a standalone named function — the architectural foundation the sheet relies on exists
- Deployment simplicity (no build step, direct GitHub Pages push) is a genuine asset worth preserving
- The bottom sheet is buildable in vanilla JS without state management becoming unworkable
- Migration trigger defined: if viewer reaches 2,500 lines OR a state synchronisation bug takes more than one hour to diagnose, migrate to React at that point

---

### Bottom Sheet — Decisions Made

**Interaction model confirmed:**
- Individual restaurant pins (teardrop) — sheet only, popup removed
- Centroid group pins (circle) — popup only, unchanged
- Tap-to-dismiss: overlay tap + X button + Escape key
- Multiple pin taps — Option A: close sheet, reopen after 280ms CSS transition delay
- List to map navigation deferred to follow-on task

**18 risks assessed. Critical mitigations built into the build script:**
- Filters visible in map view — closeSheet() added to applyFilters() — HIGH
- maybeUpdateMap() destroys markers while sheet open — covered by same fix — HIGH
- Body scroll lock iOS jump — overflow:hidden with documented upgrade path — MEDIUM
- dvh unit support — CSS cascade fallback 80vh then 80dvh — LOW
- Rapid pin tap race condition — sheetOpenTimeout with clearTimeout — LOW
- Existing bug found and fixed: filter-clear handler missing maybeUpdateMap() call

**Z-index confirmed safe:**
- Sheet overlay: z-index 1000
- Sheet: z-index 1001
- Existing toasts: z-index 9999 (appear above sheet correctly)
- Filters bar: z-index 90 (behind overlay when sheet open — correct)

---

### Build Script — Committed

localbite-sheet-build.py committed at ac27203. Single Python script applying 10 targeted changes to index.html. All 10 target strings confirmed unique before scripting. Safe to run.

| Change | What |
|--------|------|
| 1 | HTML: sheet overlay and bottom sheet elements |
| 2 | CSS: all sheet styles (overlay, sheet, handle, close, content) |
| 3 | JS: state variables + openSheet() + closeSheet() + dismiss handlers |
| 4 | JS: marker click opens sheet, removes bindPopup() from individual pins |
| 5 | JS: applyFilters() closes sheet before filter change |
| 6 | JS: filter-clear closes sheet + fixes missing maybeUpdateMap() bug |
| 7 | JS: resetMap() closes sheet first |
| 8 | JS: view toggle handlers close sheet |
| 9 | JS: handleFindMe() toggle-off closes sheet |
| 10 | JS: handleFindMe() toggle-on closes sheet |

---

### Mobile Test Matrix — 16 Tests

To run immediately after script execution:

| Test | Expected |
|------|----------|
| Tap individual pin | Sheet slides up |
| Tap X button | Sheet slides down |
| Tap overlay | Sheet slides down |
| Tap second pin while sheet open | Sheet closes, reopens 280ms later |
| Rapid tap three pins | Only last pin's sheet opens |
| Tap centroid pin | Popup only, no sheet |
| Change filter while sheet open | Sheet closes, map updates |
| Clear filters while sheet open | Sheet closes, map updates |
| Activate proximity while sheet open | Sheet closes |
| Deactivate proximity while sheet open | Sheet closes |
| Switch city while sheet open | Sheet closes |
| Switch to list while sheet open | Sheet closes |
| Sheet content scrollable | Tall cards scroll inside sheet |
| Sheet height on iOS | Does not extend behind address bar (dvh) |
| Toast appears above sheet | z-index correct |
| Filters bar behind overlay | Cannot change filters while sheet open |

---

### Null Neighbourhood Audit — Completed

Fleet-wide: 25 null neighbourhood restaurants out of 682 total (4%). By city: Valencia 20, Marrakesh 3, Barcelona 1, Rabat 1. Valencia's 20 are the known data quality issue (v2 rebuild on backlog). 4% is well within manageable threshold — neighbourhood sort and grouped layout are both viable without waiting for data cleanup.

---

### Product Backlog Updates

**Cross-navigation (Item 2):** Option D (bottom sheet) selected. Options B and C skipped — building a stopgap 2 cities before the 15+ city threshold is wasted effort. Bottom sheet is the right architecture for mobile-first map experience.

**Sort and layout (Item 3):** Recommended build order after bottom sheet:
1. "Most recommended" sort label — 30 min, renames current default to user-facing language
2. Neighbourhood sort dropdown — 1 hour, data supports it (4% null)
3. Compact card mode — 2-3 hours, highest impact for large packs (Barcelona 86, Toronto 66)
4. Grouped by neighbourhood — after Valencia v2 cleans null problem

**Price tier tooltip added to backlog:** Add tooltip to price indicator in viewer: "Price tier based on writer's description at time of article." Small viewer change, sets correct user expectation.

---

### Price Data — Clarification Documented

Price levels (1-4) are extracted by Claude Code from source article text during pipeline runs. Three confidence tiers: explicit price mention (highest), relative descriptor such as "affordable" or "upscale" (medium), inference from signals such as cuisine type and neighbourhood (lowest). No price_confidence field exists in the JSON. Fine dining (level 4) and clear budget spots (level 1) are most reliable. Mid-range band (levels 2-3) least reliable — prose descriptions rarely distinguish €25pp from €40pp precisely. No legal concern — price is a fact, not copyrightable, and we present it as a relative signal from a dated source, not a verified current price.

---

### Outstanding Items — Updated Priority Order

**Next session: LocalBite — Bottom Sheet and Cross-Navigation**

Priority 1 — Bottom sheet build:
- Run python3 localbite-sheet-build.py (committed at ac27203)
- Mobile test all 16 items in test matrix
- Fix any mobile-specific issues

Priority 2 — Sort improvements (if time permits):
- "Most recommended" label for default sort — 30 min
- Neighbourhood sort dropdown — 1 hour

Deferred from this session:
- [ ] CENTROIDS namespace audit — shared neighbourhood names across cities
- [ ] Seville open_status_check — 29 restaurants, highest data quality risk in fleet
- [ ] Barcelona open_status_check — 11 restaurants, 16 months old
- [ ] Cordoba and Granada open_status_check — 13 restaurants combined
- [ ] Delete stale Barcelona v4 pack — localbite-barcelona-2025-2026.json
- [ ] Valencia v2 — undated sources
- [ ] Lisbon PT pool — find Sabado, Evasoes, Visao as replacements
- [ ] Fes v6 upgrade — oldest pipeline in fleet (v4)
- [ ] Article title backfill — deferred pending better extraction approach
- [ ] Price tier tooltip — small viewer change, low priority
- [ ] Jina/Elastic watch — monitor if Elastic moves r.jina.ai behind subscription

---

*Addendum covers product planning work done after main session tasks were complete*
*Build script committed: ac27203*
*No city data changed, no restaurant count changes*
*Fleet: 13 cities, 480 restaurants — unchanged*


## Addendum — 2026-04-14 (product development planning)

### Bottom Sheet and Cross-Navigation — Planning Complete

Extended product planning session covering two backlog items: List ↔ Map cross-navigation and List view sort/layout improvements. Full build plan produced and scripted, ready to execute in next session.

---

### Architecture Decision — Vanilla JS retained

Framework migration considered and rejected. Decision: stay in vanilla JS for the bottom sheet build. Key factors:

- `cardHTML(r)` is already a standalone named function — the architectural foundation the sheet relies on exists
- Deployment simplicity (no build step, direct GitHub Pages push) is a genuine asset worth preserving
- The bottom sheet is buildable in vanilla JS without state management becoming unworkable
- Migration trigger defined: if viewer reaches 2,500 lines OR a state synchronisation bug takes more than one hour to diagnose, migrate to React at that point

---

### Bottom Sheet — Decisions Made

**Interaction model confirmed:**
- Individual restaurant pins (teardrop) — sheet only, popup removed
- Centroid group pins (circle) — popup only, unchanged
- Tap-to-dismiss: overlay tap + X button + Escape key
- Multiple pin taps — Option A: close sheet, reopen after 280ms CSS transition delay
- List to map navigation deferred to follow-on task

**18 risks assessed. Critical mitigations built into the build script:**
- Filters visible in map view — closeSheet() added to applyFilters() — HIGH
- maybeUpdateMap() destroys markers while sheet open — covered by same fix — HIGH
- Body scroll lock iOS jump — overflow:hidden with documented upgrade path — MEDIUM
- dvh unit support — CSS cascade fallback 80vh then 80dvh — LOW
- Rapid pin tap race condition — sheetOpenTimeout with clearTimeout — LOW
- Existing bug found and fixed: filter-clear handler missing maybeUpdateMap() call

**Z-index confirmed safe:**
- Sheet overlay: z-index 1000
- Sheet: z-index 1001
- Existing toasts: z-index 9999 (appear above sheet correctly)
- Filters bar: z-index 90 (behind overlay when sheet open — correct)

---

### Build Script — Committed

localbite-sheet-build.py committed at ac27203. Single Python script applying 10 targeted changes to index.html. All 10 target strings confirmed unique before scripting. Safe to run.

| Change | What |
|--------|------|
| 1 | HTML: sheet overlay and bottom sheet elements |
| 2 | CSS: all sheet styles (overlay, sheet, handle, close, content) |
| 3 | JS: state variables + openSheet() + closeSheet() + dismiss handlers |
| 4 | JS: marker click opens sheet, removes bindPopup() from individual pins |
| 5 | JS: applyFilters() closes sheet before filter change |
| 6 | JS: filter-clear closes sheet + fixes missing maybeUpdateMap() bug |
| 7 | JS: resetMap() closes sheet first |
| 8 | JS: view toggle handlers close sheet |
| 9 | JS: handleFindMe() toggle-off closes sheet |
| 10 | JS: handleFindMe() toggle-on closes sheet |

---

### Mobile Test Matrix — 16 Tests

To run immediately after script execution:

| Test | Expected |
|------|----------|
| Tap individual pin | Sheet slides up |
| Tap X button | Sheet slides down |
| Tap overlay | Sheet slides down |
| Tap second pin while sheet open | Sheet closes, reopens 280ms later |
| Rapid tap three pins | Only last pin's sheet opens |
| Tap centroid pin | Popup only, no sheet |
| Change filter while sheet open | Sheet closes, map updates |
| Clear filters while sheet open | Sheet closes, map updates |
| Activate proximity while sheet open | Sheet closes |
| Deactivate proximity while sheet open | Sheet closes |
| Switch city while sheet open | Sheet closes |
| Switch to list while sheet open | Sheet closes |
| Sheet content scrollable | Tall cards scroll inside sheet |
| Sheet height on iOS | Does not extend behind address bar (dvh) |
| Toast appears above sheet | z-index correct |
| Filters bar behind overlay | Cannot change filters while sheet open |

---

### Null Neighbourhood Audit — Completed

Fleet-wide: 25 null neighbourhood restaurants out of 682 total (4%). By city: Valencia 20, Marrakesh 3, Barcelona 1, Rabat 1. Valencia's 20 are the known data quality issue (v2 rebuild on backlog). 4% is well within manageable threshold — neighbourhood sort and grouped layout are both viable without waiting for data cleanup.

---

### Product Backlog Updates

**Cross-navigation (Item 2):** Option D (bottom sheet) selected. Options B and C skipped — building a stopgap 2 cities before the 15+ city threshold is wasted effort. Bottom sheet is the right architecture for mobile-first map experience.

**Sort and layout (Item 3):** Recommended build order after bottom sheet:
1. "Most recommended" sort label — 30 min, renames current default to user-facing language
2. Neighbourhood sort dropdown — 1 hour, data supports it (4% null)
3. Compact card mode — 2-3 hours, highest impact for large packs (Barcelona 86, Toronto 66)
4. Grouped by neighbourhood — after Valencia v2 cleans null problem

**Price tier tooltip added to backlog:** Add tooltip to price indicator in viewer: "Price tier based on writer's description at time of article." Small viewer change, sets correct user expectation.

---

### Price Data — Clarification Documented

Price levels (1-4) are extracted by Claude Code from source article text during pipeline runs. Three confidence tiers: explicit price mention (highest), relative descriptor such as "affordable" or "upscale" (medium), inference from signals such as cuisine type and neighbourhood (lowest). No price_confidence field exists in the JSON. Fine dining (level 4) and clear budget spots (level 1) are most reliable. Mid-range band (levels 2-3) least reliable — prose descriptions rarely distinguish €25pp from €40pp precisely. No legal concern — price is a fact, not copyrightable, and we present it as a relative signal from a dated source, not a verified current price.

---

### Outstanding Items — Updated Priority Order

**Next session: LocalBite — Bottom Sheet and Cross-Navigation**

Priority 1 — Bottom sheet build:
- Run python3 localbite-sheet-build.py (committed at ac27203)
- Mobile test all 16 items in test matrix
- Fix any mobile-specific issues

Priority 2 — Sort improvements (if time permits):
- "Most recommended" label for default sort — 30 min
- Neighbourhood sort dropdown — 1 hour

Deferred from this session:
- [ ] CENTROIDS namespace audit — shared neighbourhood names across cities
- [ ] Seville open_status_check — 29 restaurants, highest data quality risk in fleet
- [ ] Barcelona open_status_check — 11 restaurants, 16 months old
- [ ] Cordoba and Granada open_status_check — 13 restaurants combined
- [ ] Delete stale Barcelona v4 pack — localbite-barcelona-2025-2026.json
- [ ] Valencia v2 — undated sources
- [ ] Lisbon PT pool — find Sabado, Evasoes, Visao as replacements
- [ ] Fes v6 upgrade — oldest pipeline in fleet (v4)
- [ ] Article title backfill — deferred pending better extraction approach
- [ ] Price tier tooltip — small viewer change, low priority
- [ ] Jina/Elastic watch — monitor if Elastic moves r.jina.ai behind subscription

---

*Addendum covers product planning work done after main session tasks were complete*
*Build script committed: ac27203*
*No city data changed, no restaurant count changes*
*Fleet: 13 cities, 480 restaurants — unchanged*


## Session — 2026-04-15 (Bottom Sheet and Cross-Navigation)

### Overview

Viewer feature session. Built and deployed the mobile bottom sheet for individual restaurant map pins. This completes the cross-navigation backlog item — the bottom sheet is the cross-navigation solution for mobile map view, as decided in the April 14 planning session.

Two bugs found and fixed during testing. All 16 mobile test matrix items passed or confirmed as working as intended. Fleet and city data unchanged.

---

### What Was Built

**Mobile bottom sheet for restaurant map pins.**

Individual restaurant pins (teardrop markers) now open a bottom sheet showing the full restaurant card when tapped, instead of a Leaflet popup. The sheet slides up from the bottom of the screen with a CSS transition, displays the card content including quote, cuisine, neighbourhood, price, sources panel, and both-pool badge, and dismisses via the X button, the Escape key, or tapping empty map space.

Centroid group pins (dashed circle markers) are unchanged — they still show a Leaflet popup listing all restaurants at that approximate location.

---

### Commits

| Commit | Description |
|--------|-------------|
| `a739e26` | feat: add mobile bottom sheet for restaurant map pins |
| `dfe5455` | fix: move sheet dismiss listeners inside DOMContentLoaded |
| `93211f4` | fix: replace full-screen overlay with map-container click dismissal |
| `70b342e` | chore: remove pre-sheet backup file |
| `1b6fad7` | chore: remove fix scripts and stray conversation file from repo |

---

### Build Process

The build script `localbite-sheet-build.py` (committed at `ac27203` in the April 14 planning session) applied 10 targeted string replacements to `index.html`. All 10 succeeded on first run (+3,757 chars added). Pre-flight diagnostic confirmed all anchor strings were unique and unambiguous in the current file before running.

**Key pre-flight findings:**
- `bindPopup` appeared at two locations (lines 1925 and 1984) — confirmed the script's anchor uniquely targeted the individual marker at `maxWidth: 240`, not the centroid marker at `maxWidth: 260`. Safe to run.
- Sheet code (`openSheet`, `closeSheet`, `sheet-overlay`) confirmed absent before script ran — no partial previous application.
- File at 2,047 lines — below the 2,500-line migration trigger.

---

### Bugs Found and Fixed

**Bug 1 — Sheet dismiss listeners attached before DOM ready**

Root cause: Change 3 in the build script inserted the sheet dismiss event listeners (`sheet-close`, `sheet-overlay`, `keydown`) at the JS block level, executing immediately when the parser reaches them. The sheet HTML elements are inserted at the end of `<body>` by Change 1 — after the script block. So `document.getElementById('sheet-close')` returned `null`, `.addEventListener` on `null` threw a TypeError, and the entire script block halted before `DOMContentLoaded` and `loadIndex()` fired.

Symptom: page stuck on "loading city packs" — the fetch never ran.

Fix: moved the three dismiss listeners inside the existing `DOMContentLoaded` block, which already contained the city selector listener. All three elements are guaranteed to exist by the time `DOMContentLoaded` fires.

Commit: `dfe5455`

---

**Bug 2 — Full-screen overlay blocked all UI controls**

Root cause: the original sheet design used a full-screen overlay (`position: fixed; inset: 0`) at z-index 1000 to provide a tappable dark backdrop for dismissal. This overlay sat above the header (z-index 100), the filters bar (z-index 90), and the map itself. Any tap on those elements was intercepted by the overlay instead.

Symptoms observed during Gate 2 testing:
- Filter clear button required two taps when sheet open (first tap closed sheet via overlay, second tap hit button)
- City selector required two taps when sheet open (same reason)
- Switching between pins required two taps (first tap closed sheet, second tap opened new restaurant)
- Near me button inaccessible when sheet open (overlay covered it)

Fix: removed the overlay element entirely. Dismissal is now handled by:
1. X button on the sheet itself (unchanged)
2. Escape key (unchanged)
3. Click listener on `#map-container` — fires `closeSheet()` only when `e.target === this` (i.e. a click on empty map space, not on a pin or other child element)

This means all header controls, filter controls, city selector, and map pins remain fully accessible regardless of sheet state. Pins are single-tap to switch restaurants.

Commit: `93211f4`

---

### Test Results — Mobile Test Matrix

All 16 tests run against the live GitHub Pages deployment on both desktop Safari and iPhone.

**Gate 1 — Core open/close (all pass)**

| Test | Result |
|------|--------|
| Tap individual pin | ✅ Sheet slides up |
| Tap X button | ✅ Sheet slides down |
| Tap empty map space | ✅ Sheet slides down |

**Gate 2 — State transitions (all pass)**

| Test | Result |
|------|--------|
| Change filter while sheet open | ✅ Sheet closes, map updates |
| Clear filters while sheet open | ✅ Single tap, sheet closes |
| Switch to list while sheet open | ✅ Sheet closes |
| Switch city while sheet open | ✅ Single tap, city changes |
| Tap second pin while sheet open | ✅ Single tap switches restaurant |
| Near me while sheet open | ✅ Working as intended — see note |

**Gate 3 — iOS rendering (all pass)**

| Test | Result |
|------|--------|
| Sheet content scrollable | ✅ No scroll needed — cards fit within sheet |
| Sheet height on iOS | ✅ Clears Safari address bar (80dvh working) |
| Map visible above sheet | ✅ Correct — sheet does not fill full viewport |
| Sheet feels responsive | ✅ Smooth transition on mobile |

---

### Decisions Made

**Near me button covered by sheet — accepted as correct behaviour.**
The Near me button is in the bottom-right of the map. The sheet slides up over the map area when open, covering the button. This is consistent with how Google Maps and Apple Maps handle bottom sheets — map controls are inaccessible while a sheet is open, and users close the sheet first. Not a bug. If the Near me button needs to be permanently accessible, the fix would be to move it to the filters bar — deferred to future backlog.

**Full-screen overlay removed permanently.**
The map-container click listener is cleaner architecture than an overlay for this use case. An overlay made sense when the sheet needed to block all background interaction (e.g. a modal dialog), but a map bottom sheet should not block the map or controls. Decision recorded: do not reintroduce a full-screen overlay for the sheet.

**Rapid pin switching — accepted.**
Tapping a second pin while a sheet is open produces two visual steps: sheet closes (280ms transition), then reopens with the new restaurant. This is the `sheetOpenTimeout` mechanism working correctly — the delay matches the CSS transition duration so the animations don't overlap. Feels natural on device. Not a bug.

**2,500-line migration trigger — monitored.**
File is now approximately 2,175 lines after the sheet additions. The agreed React migration trigger is 2,500 lines. Approximately 2–4 more features before the trigger is reached.

---

### Architecture Notes

The bottom sheet relies on `cardHTML(r)` being a standalone named function — confirmed in the April 14 planning session as the key architectural precondition. The sheet calls `cardHTML(r)` to render the restaurant card inside the sheet content div, then reattaches the writer profile toggle event listener. This pattern will need updating if `cardHTML` gains additional interactive elements in future.

The `writer-profile-toggle` reattachment inside `openSheet()` is the one place where the sheet has explicit knowledge of card internals. If the card gains new interactive elements, `openSheet()` must be updated to reattach their listeners too. This is documented in a comment in the code.

---

### Files Changed

| File | Change |
|------|--------|
| `index.html` | Bottom sheet HTML, CSS, JS — net +128 lines after fixes |

---

### Outstanding Items — Updated

**Completed this session:**
- [x] Bottom sheet for restaurant map pins
- [x] Cross-navigation (resolved by bottom sheet — Option D confirmed correct)

**Carry forward (priority order):**
- [ ] **Sort — "Most recommended" label** — rename default sort to user-facing language. 30 min. Low risk.
- [ ] **Sort — Neighbourhood sort dropdown** — group cards by neighbourhood with section headers. 60 min. Medium risk (null neighbourhood handling, list-only behaviour).
- [ ] **CENTROIDS namespace audit** — Centro Histórico, Medina, El Carmen shared between cities. Baixa (Lisboa) fixed April 13 — audit for remaining collisions.
- [ ] **Seville open_status_check** — 29 restaurants (48% of pack), some from 2023 sources. Highest data quality risk in fleet.
- [ ] **Barcelona open_status_check** — 11 restaurants, sources from December 2024 (16 months old).
- [ ] **Córdoba and Granada open_status_check** — 13 restaurants combined.
- [ ] **Delete stale Barcelona v4 pack** — `localbite-barcelona-2025-2026.json` superseded by v6.
- [ ] **Valencia v2** — 39/47 restaurants have `article_date: undated`.
- [ ] **Lisbon PT pool** — only 2 PT-pool restaurants in v6.
- [ ] **Fes v6 upgrade** — oldest pipeline in fleet (v4).
- [ ] **Price tier tooltip** — small viewer change, low priority.
- [ ] **Jina/Elastic watch** — monitor `r.jina.ai` endpoint status.

---

*Session duration: approximately 2.5 hours*
*Commits: a739e26, dfe5455, 93211f4, 70b342e, 1b6fad7*
*Fleet: 13 cities, 480 restaurants — unchanged*
*index.html: ~2,175 lines (migration trigger at 2,500)*


---

## Session — 2026-04-15 (Search Quality Analysis + Madrid Test Design)

### Overview

No city data changes this session. Work focused on three areas:
(1) documentation of v7 extraction quality improvements, (2) deep
analysis of search composition across the fleet with a revised query
template, and (3) design of a controlled v6 vs v7 test on Madrid.
Bottom sheet feature was built and committed earlier in this session
(commits dfe5455, 93211f4 — see compact summary below).

**Fleet at session start:** 13 cities, 480 restaurants — unchanged.
**index.html:** ~2,175 lines (migration trigger at 2,500).

---

### Bottom Sheet — Built and Live (earlier this session)

Bottom sheet for mobile map pins built and deployed. Teardrop pins
now open a full restaurant card sliding up from the bottom (Google
Maps pattern) rather than a Leaflet popup. Centroid group pins
unchanged.

**Commits:**
- a739e26 — feat: bottom sheet
- dfe5455 — fix: move dismiss listeners inside DOMContentLoaded
- 93211f4 — fix: remove full-screen overlay, use map-container click
- 70b342e — cleanup
- 1b6fad7 — remove stray files

**Gate tests:** All passed. Near-me button covered by open sheet
accepted as correct behaviour (consistent with Google Maps pattern).

---

### v7 Extraction Quality Improvements — Design Document

Quality review identified training knowledge contamination in
Valencia city pack: La Salita listed as "1 Michelin star" and
Ricard Camarena as "2 Michelin stars" despite neither being in
source articles. Three additional extraction quality issues
identified across the fleet.

**Design document produced:** `localbite-v7-extraction-quality.md`

Three agreed prompt changes for v7 template (implementation deferred
to next city run — Seville v2 is the natural first candidate):

1. **Signature dish constraint** — add `dishes_mentioned` array;
   `signature_dish` only if article explicitly singles one dish out.
   Never select from dishes_mentioned — the article must do the
   selecting.

2. **Cuisine tightening** — use article's own language when no
   standard category fits; null if article silent on cuisine; never
   use training knowledge.

3. **Mention quality test** — before extracting, confirm source text
   contains specific positive language beyond naming the restaurant.
   Incidental mentions → skip and log. Test on source text, not
   extracted quote.

**Rejected gates:** Self-verification (model cannot grade own
extractions reliably), full anchoring for all fields (cuisine
consistency breaks), grammatical subject test (penalises personal
food writing).

**Existing city packs:** Do not rebuild retroactively. Fix Valencia
Michelin fields manually (30-min targeted audit). Barcelona: audit
top 10 highest-profile restaurants before next share.

**Viewer change required after v7 pipeline runs:** Display
`dishes_mentioned` when `signature_dish` is null (~30-45 min).

---

### Product Backlog — Updated

`localbite-product-backlog.md` updated. Key changes:
- Status changed from "Parked" to "Active"
- Items 1 and 2 (Option D) marked complete
- Item 17 added: v7 Pipeline — Extraction Quality Improvements
- Prioritisation section updated
- Full consolidated backlog replacing scattered journal entries

---

### Search Quality Analysis — Cross-City Assessment

Systematic analysis of search composition across the fleet based on
actual search logs (Barcelona, Toronto, Marrakesh, Chefchaouen, Fes,
Lisbon A/B/C). Key findings:

**Compositional problems confirmed:**
- City-wide generic queries redundant with each other above 2 per
  language — confirmed by Strategy A search log (Q1-Q4 return same
  sources)
- Named-writer queries (Strategy B evidence) find sources that 30
  generic queries in Strategy A missed entirely — highest-confidence
  addition to any search plan
- Forum queries: confirmed 0% success rate across all cities, all
  runs — eliminated from v7 template
- Neighbourhood queries covering only 2-4 areas in cities with 18-21
  defined neighbourhoods; tourist-facing central areas over-covered,
  emerging residential areas receive zero dedicated queries
- Results per query capped at 10: value zone is positions 11-30 for
  food writing queries — currently being missed entirely

**Structural finding (not fixable by search):** Genuinely independent
EN and PT critics in Lisbon cover different restaurant segments.
This was confirmed across three strategy tests. More searches will
not increase Lisbon both-pool entries — the signal is low because
the city's food press is genuinely segmented by audience.

**Document produced:** `localbite-search-quality-analysis.md`

---

### Revised v7 Search Composition

**Four tests established for query addition:**
1. Compositional distinctiveness — does it go somewhere new?
2. Source population — do qualifying accessible sources exist?
3. Overlap potential — does the source create multi-source entries?
4. Novelty — will it find sources not already found?

**Key principle:** Named-writer and named-publication queries belong
in Phase 0 (direct fetch of known sources) for rebuilds, not Phase 1
search queries. Phase 1 is for discovery. Phase 0 is for retrieval.

**Revised composition for well-documented European city (35 queries,
30 results/query, Max 5x — vs v6's 30 queries, 10 results/query):**

| Angle | v6 | v7 | Rationale |
|-------|----|----|-----------|
| City-wide generic EN | 4 | 2 | Redundant above 2 |
| City-wide generic local | 5 | 3 | Redundant above 3 |
| Neighbourhood Tier 1 central EN | 2 | 2 | Keep — named areas |
| Neighbourhood Tier 1 central local | 2 | 2 | Keep — named areas |
| Neighbourhood Tier 2 residential EN | 0 | 2 | New — highest overlap potential |
| Neighbourhood Tier 2 residential local | 0 | 2 | New — highest overlap potential |
| Neighbourhood Tier 3 emerging EN | 0 | 2 | New — underrepresented |
| Neighbourhood Tier 3 emerging local | 0 | 2 | New — underrepresented |
| Generic writer-first | 4 | 4 | Keep unchanged |
| Named awards (city-specific) | 0 | 3 | New — named beats generic |
| Generic awards | 2 | 0 | Absorbed into named |
| Recent openings | 2 | 2 | Keep unchanged |
| Vocabulary-specific local language | 0 | 2 | New — untested but compositionally distinct |
| Cuisine and community EN | 0 | 2 | New — community writing missed by generic |
| Publication-category local | 0 | 2 | New — category not named outlet |
| Cross-validation Phase 1B (post-Phase 0) | 0 | 3 | New — responsive, hunts overlap |
| Forum | 3 | 0 | Eliminated — 0% success rate |
| Generic publication | 2 | 0 | Eliminated — redundant with city-wide |
| **Total** | **30** | **35** | +5 from Max 5x headroom |

**Neighbourhood coverage:** Neighbourhoods now named explicitly in
Part 1 across three tiers. Leaving selection to the pipeline risks
defaulting to tourist-facing areas already saturated by city-wide
queries. For Madrid specifically: Tier 1 = Malasaña, La Latina;
Tier 2 = Chamberí, Salamanca; Tier 3 = Carabanchel, Usera.

---

### Madrid Test Design — v6 vs v7

**Test city:** Madrid. First pipeline run — no prior pipeline
knowledge. Clean apples-to-apples comparison.

**Why Madrid:** No prior history (no contamination), rich bilingual
food writing scene (results will be meaningful), genuinely both-
pool-capable (EN + ES independent press), adds a high-value city to
the fleet regardless of which version wins.

**Files produced:**
- `localbite-prompt-v6-madrid-part1.txt` — control Part 1 (standard
  v6 variables, no modifications)
- `localbite-prompt-v7-madrid-part1.txt` — test Part 1 (revised
  composition, 30 results/query, named awards, vocabulary, tiered
  neighbourhood coverage with named areas, prior knowledge exclusion
  instruction)
- `localbite-prior-knowledge-check.py` — automated check script
- `localbite-madrid-test-runbook.md` — step-by-step procedure

**Madrid Part 1 variables confirmed (from public research):**
- Named awards: Premios de la Academia Madrileña de Gastronomía,
  Soles Repsol / Guía Repsol, Premios Metrópoli
- Tier 1 central: Malasaña, La Latina
- Tier 2 residential: Chamberí, Salamanca
- Tier 3 emerging: Carabanchel, Usera
- Local vocabulary: taberna, tasca, guiso, cocido, vermú, tapeo,
  casa de comidas, barra, menú del día
- Phase 0 sources: El Comidista (elcomidista.elpais.com),
  Guía Repsol (guiarepsol.com/es/restaurantes/madrid/)
- Known COI: Time Out Madrid operates Time Out Market Madrid
- Known problematic URL: gastronomistas.com

**Prior knowledge check script:** Runs automatically after the
search plan is written, before any searches execute. Checks each
query for proper nouns and named entities not in Part 1 variables.
Exit codes: 0 = clean, 1 = review needed, 2 = violations found
(pipeline must rewrite flagged queries and recheck). Catches writer
name patterns (First Last format), restaurant name patterns (quoted
short capitalised terms), and attribution patterns. Does not catch
conceptual leakage — only named entity leakage.

**Test sequence:**
1. v6 Madrid — Phase 1 only → record source list → PAUSE
2. v7 Madrid — Phase 1 only (prior knowledge check runs
   automatically) → record source list → PAUSE
3. Compare Phase 1 source lists — primary metric
4. If Phase 1 passes (v7 finds ≥2 exclusive new sources): proceed
   to full runs for both, compare final packs

**Success criteria:**
- Phase 1 pass: v7 finds ≥2 sources not found by v6, ≥1 genuine
  independent voice (primary source, named author, not aggregator)
- Full pack pass: v7 produces ≥10% more multi-source entries than v6

**Run instructions:** Both runs same day. v6 first, v7 second.
Fresh Claude Code session for each. Concatenate Part 1 with
v6 template Part 2 to build full runnable prompts.

---

### Key Decisions This Session

- v7 prompt changes deferred to Seville v2 (next natural city run)
- Phase 0 = retrieval of known sources; Phase 1 = discovery of
  unknown sources. Named-writer queries belong in Phase 0 for
  rebuilds, not Phase 1.
- Forum queries eliminated from v7 — 0% success rate, no exception
- 30 results per query — value zone confirmed at positions 11-30;
  positions 31+ dominated by noise; 100 results not justified
- Neighbourhood queries must name specific areas in Part 1 — not
  left to pipeline discretion
- Prior knowledge exclusion enforced programmatically via check
  script, not by human inspection after the fact
- Madrid test is the validation vehicle — the winning version
  becomes the live Madrid city pack

---

### Files Produced or Updated This Session

| File | Change |
|------|--------|
| `localbite-v7-extraction-quality.md` | New — full design document |
| `localbite-product-backlog.md` | Updated — Item 17, status active, items 1+2 complete |
| `localbite-search-quality-analysis.md` | New — cross-city search quality assessment |
| `localbite-prompt-v6-madrid-part1.txt` | New — Madrid v6 control Part 1 |
| `localbite-prompt-v7-madrid-part1.txt` | New — Madrid v7 test Part 1 |
| `localbite-prior-knowledge-check.py` | New — automated prior knowledge check script |
| `localbite-madrid-test-runbook.md` | New — step-by-step test procedure |

---

### Outstanding Items

**Immediate — Madrid test:**
- [ ] Copy all Madrid test files to ~/localbite
- [ ] Concatenate Part 1 files with v6 template to build full prompts
- [ ] Run v6 Madrid Phase 1 → record source list → PAUSE
- [ ] Run v7 Madrid Phase 1 → prior knowledge check auto-runs →
      record source list → PAUSE
- [ ] Compare Phase 1 source lists
- [ ] If Phase 1 passes: run both to completion, compare packs

**Pipeline — priority order:**
- [ ] v7 prompt changes — implement on Seville v2
- [ ] Seville open_status_check — 29 restaurants (48%), highest risk
- [ ] Barcelona open_status_check + targeted Michelin audit
- [ ] Córdoba and Granada open_status_check — 13 combined
- [ ] Valencia v2 rebuild — undated sources, v7 prompt, fix Michelin
- [ ] Lisbon PT pool — find Sábado, Evasões, Visão replacements
- [ ] Fes v6 upgrade — oldest in fleet (v4)
- [ ] CENTROIDS namespace audit
- [ ] Delete stale Barcelona v4 pack

**Viewer — priority order:**
- [ ] Analytics — highest-priority unbuilt item
- [ ] Sort — "Most recommended" label — 30 min
- [ ] Sort — Neighbourhood sort dropdown — 60 min
- [ ] List-to-map navigation — 60–90 min
- [ ] Compact card mode — 2–3 hours
- [ ] Price tier tooltip — 20 min
- [ ] dishes_mentioned display when signature_dish null — after v7

**Infrastructure:**
- [ ] Custom domain
- [ ] Jina/Elastic watch

---

*Session focus: pipeline research and test design — no city data changes*
*Fleet: 13 cities, 480 restaurants — unchanged*
*index.html: ~2,175 lines (migration trigger at 2,500)*


## Session — 2026-04-15 (Bottom Sheet and Cross-Navigation)

### Overview

Viewer feature session. Built and deployed the mobile bottom sheet for individual restaurant map pins. This completes the cross-navigation backlog item — the bottom sheet is the cross-navigation solution for mobile map view, as decided in the April 14 planning session.

Two bugs found and fixed during testing. All 16 mobile test matrix items passed or confirmed as working as intended. Fleet and city data unchanged.

---

### What Was Built

**Mobile bottom sheet for restaurant map pins.**

Individual restaurant pins (teardrop markers) now open a bottom sheet showing the full restaurant card when tapped, instead of a Leaflet popup. The sheet slides up from the bottom of the screen with a CSS transition, displays the card content including quote, cuisine, neighbourhood, price, sources panel, and both-pool badge, and dismisses via the X button, the Escape key, or tapping empty map space.

Centroid group pins (dashed circle markers) are unchanged — they still show a Leaflet popup listing all restaurants at that approximate location.

---

### Commits

| Commit | Description |
|--------|-------------|
| `a739e26` | feat: add mobile bottom sheet for restaurant map pins |
| `dfe5455` | fix: move sheet dismiss listeners inside DOMContentLoaded |
| `93211f4` | fix: replace full-screen overlay with map-container click dismissal |
| `70b342e` | chore: remove pre-sheet backup file |
| `1b6fad7` | chore: remove fix scripts and stray conversation file from repo |

---

### Build Process

The build script `localbite-sheet-build.py` (committed at `ac27203` in the April 14 planning session) applied 10 targeted string replacements to `index.html`. All 10 succeeded on first run (+3,757 chars added). Pre-flight diagnostic confirmed all anchor strings were unique and unambiguous in the current file before running.

**Key pre-flight findings:**
- `bindPopup` appeared at two locations (lines 1925 and 1984) — confirmed the script's anchor uniquely targeted the individual marker at `maxWidth: 240`, not the centroid marker at `maxWidth: 260`. Safe to run.
- Sheet code (`openSheet`, `closeSheet`, `sheet-overlay`) confirmed absent before script ran — no partial previous application.
- File at 2,047 lines — below the 2,500-line migration trigger.

---

### Bugs Found and Fixed

**Bug 1 — Sheet dismiss listeners attached before DOM ready**

Root cause: Change 3 in the build script inserted the sheet dismiss event listeners (`sheet-close`, `sheet-overlay`, `keydown`) at the JS block level, executing immediately when the parser reaches them. The sheet HTML elements are inserted at the end of `<body>` by Change 1 — after the script block. So `document.getElementById('sheet-close')` returned `null`, `.addEventListener` on `null` threw a TypeError, and the entire script block halted before `DOMContentLoaded` and `loadIndex()` fired.

Symptom: page stuck on "loading city packs" — the fetch never ran.

Fix: moved the three dismiss listeners inside the existing `DOMContentLoaded` block, which already contained the city selector listener. All three elements are guaranteed to exist by the time `DOMContentLoaded` fires.

Commit: `dfe5455`

---

**Bug 2 — Full-screen overlay blocked all UI controls**

Root cause: the original sheet design used a full-screen overlay (`position: fixed; inset: 0`) at z-index 1000 to provide a tappable dark backdrop for dismissal. This overlay sat above the header (z-index 100), the filters bar (z-index 90), and the map itself. Any tap on those elements was intercepted by the overlay instead.

Symptoms observed during Gate 2 testing:
- Filter clear button required two taps when sheet open (first tap closed sheet via overlay, second tap hit button)
- City selector required two taps when sheet open (same reason)
- Switching between pins required two taps (first tap closed sheet, second tap opened new restaurant)
- Near me button inaccessible when sheet open (overlay covered it)

Fix: removed the overlay element entirely. Dismissal is now handled by:
1. X button on the sheet itself (unchanged)
2. Escape key (unchanged)
3. Click listener on `#map-container` — fires `closeSheet()` only when `e.target === this` (i.e. a click on empty map space, not on a pin or other child element)

This means all header controls, filter controls, city selector, and map pins remain fully accessible regardless of sheet state. Pins are single-tap to switch restaurants.

Commit: `93211f4`

---

### Test Results — Mobile Test Matrix

All 16 tests run against the live GitHub Pages deployment on both desktop Safari and iPhone.

**Gate 1 — Core open/close (all pass)**

| Test | Result |
|------|--------|
| Tap individual pin | ✅ Sheet slides up |
| Tap X button | ✅ Sheet slides down |
| Tap empty map space | ✅ Sheet slides down |

**Gate 2 — State transitions (all pass)**

| Test | Result |
|------|--------|
| Change filter while sheet open | ✅ Sheet closes, map updates |
| Clear filters while sheet open | ✅ Single tap, sheet closes |
| Switch to list while sheet open | ✅ Sheet closes |
| Switch city while sheet open | ✅ Single tap, city changes |
| Tap second pin while sheet open | ✅ Single tap switches restaurant |
| Near me while sheet open | ✅ Working as intended — see note |

**Gate 3 — iOS rendering (all pass)**

| Test | Result |
|------|--------|
| Sheet content scrollable | ✅ No scroll needed — cards fit within sheet |
| Sheet height on iOS | ✅ Clears Safari address bar (80dvh working) |
| Map visible above sheet | ✅ Correct — sheet does not fill full viewport |
| Sheet feels responsive | ✅ Smooth transition on mobile |

---

### Decisions Made

**Near me button covered by sheet — accepted as correct behaviour.**
The Near me button is in the bottom-right of the map. The sheet slides up over the map area when open, covering the button. This is consistent with how Google Maps and Apple Maps handle bottom sheets — map controls are inaccessible while a sheet is open, and users close the sheet first. Not a bug. If the Near me button needs to be permanently accessible, the fix would be to move it to the filters bar — deferred to future backlog.

**Full-screen overlay removed permanently.**
The map-container click listener is cleaner architecture than an overlay for this use case. An overlay made sense when the sheet needed to block all background interaction (e.g. a modal dialog), but a map bottom sheet should not block the map or controls. Decision recorded: do not reintroduce a full-screen overlay for the sheet.

**Rapid pin switching — accepted.**
Tapping a second pin while a sheet is open produces two visual steps: sheet closes (280ms transition), then reopens with the new restaurant. This is the `sheetOpenTimeout` mechanism working correctly — the delay matches the CSS transition duration so the animations don't overlap. Feels natural on device. Not a bug.

**2,500-line migration trigger — monitored.**
File is now approximately 2,175 lines after the sheet additions. The agreed React migration trigger is 2,500 lines. Approximately 2–4 more features before the trigger is reached.

---

### Architecture Notes

The bottom sheet relies on `cardHTML(r)` being a standalone named function — confirmed in the April 14 planning session as the key architectural precondition. The sheet calls `cardHTML(r)` to render the restaurant card inside the sheet content div, then reattaches the writer profile toggle event listener. This pattern will need updating if `cardHTML` gains additional interactive elements in future.

The `writer-profile-toggle` reattachment inside `openSheet()` is the one place where the sheet has explicit knowledge of card internals. If the card gains new interactive elements, `openSheet()` must be updated to reattach their listeners too. This is documented in a comment in the code.

---

### Files Changed

| File | Change |
|------|--------|
| `index.html` | Bottom sheet HTML, CSS, JS — net +128 lines after fixes |

---

### Outstanding Items — Updated

**Completed this session:**
- [x] Bottom sheet for restaurant map pins
- [x] Cross-navigation (resolved by bottom sheet — Option D confirmed correct)

**Carry forward (priority order):**
- [ ] **Sort — "Most recommended" label** — rename default sort to user-facing language. 30 min. Low risk.
- [ ] **Sort — Neighbourhood sort dropdown** — group cards by neighbourhood with section headers. 60 min. Medium risk (null neighbourhood handling, list-only behaviour).
- [ ] **CENTROIDS namespace audit** — Centro Histórico, Medina, El Carmen shared between cities. Baixa (Lisboa) fixed April 13 — audit for remaining collisions.
- [ ] **Seville open_status_check** — 29 restaurants (48% of pack), some from 2023 sources. Highest data quality risk in fleet.
- [ ] **Barcelona open_status_check** — 11 restaurants, sources from December 2024 (16 months old).
- [ ] **Córdoba and Granada open_status_check** — 13 restaurants combined.
- [ ] **Delete stale Barcelona v4 pack** — `localbite-barcelona-2025-2026.json` superseded by v6.
- [ ] **Valencia v2** — 39/47 restaurants have `article_date: undated`.
- [ ] **Lisbon PT pool** — only 2 PT-pool restaurants in v6.
- [ ] **Fes v6 upgrade** — oldest pipeline in fleet (v4).
- [ ] **Price tier tooltip** — small viewer change, low priority.
- [ ] **Jina/Elastic watch** — monitor `r.jina.ai` endpoint status.

---

*Session duration: approximately 2.5 hours*
*Commits: a739e26, dfe5455, 93211f4, 70b342e, 1b6fad7*
*Fleet: 13 cities, 480 restaurants — unchanged*
*index.html: ~2,175 lines (migration trigger at 2,500)*

## Session — 2026-04-16 (Madrid v6 vs v7 Search Quality Test)

### Overview

First run of the Madrid v6 vs v7 apples-to-apples search quality test. Both pipelines run to completion on a city with no prior LocalBite history. Primary goal: determine whether v7 search composition changes produce meaningfully better results than v6, specifically more restaurants confirmed by multiple independent sources (both-pool).

---

### Run Details

**v6 Control**
- Prompt: `localbite-prompt-v6-madrid.txt`
- Searches run: 38
- Sources confirmed: 5 (of 7 selected — El Comidista and GastroMadrid failed at Phase 2)
- Raw entries: 61
- User removals: 2 (La Venencia, Angelita — non-restaurants)
- Final restaurants: 59
- Tier A: 11 | Tier B: 48 | Tier C: 0
- Both-pool: 6
- Open status check: 9
- Run time: ~28 minutes (Phase 2+3 combined)
- Output: `localbite-madrid-2023-2026-v6.json`

**v7 Test**
- Prompt: `localbite-prompt-v7-madrid.txt`
- Searches run: 35 (32 pre-written + 3 Phase 1B cross-validation)
- Sources confirmed: 5 (of 6 selected — Spanish Sabores rejected at Phase 2, no article-level byline)
- Raw entries: 67
- User removals: 0 (pipeline recommended 6 removals, all accepted)
- Final restaurants: 60
- Tier A: 11 | Tier B: 49 | Tier C: 0
- Both-pool: 0
- Open status check: 6
- Run time: ~38 minutes (Phase 1+2+3 combined)
- Output: `localbite-madrid-2023-2026-v7.json`

---

### Comparison Table

| Metric | v6 | v7 |
|--------|----|----|
| Searches run | 38 | 35 |
| Sources confirmed | 5 | 5 |
| Sources failed/rejected | 2 | 1 |
| Raw entries | 61 | 67 |
| Final restaurants | 59 | 60 |
| Tier A | 11 | 11 |
| Tier B | 48 | 49 |
| Both-pool | 6 | 0 |
| Open status check | 9 | 6 |
| New restaurants vs v6 | — | 15 |

---

### Key Findings

**1. 30-results-per-query instruction did not carry through — and cannot.**
The v7 template specified 30 results per query. The pipeline wrote a search plan with no mention of result depth and ran all searches at the default of 10. Post-run grep of the search plan file confirmed zero references to result depth. A direct test in Claude Code confirmed the web search tool has a hard cap of 10 results per query regardless of instruction. This is a tool limitation, not a prompt compliance failure. The 30-results-per-query change must be permanently removed from the v7 template. The pipeline's Phase 1 report claiming sources were found at "positions 11-15" was fabricated — it ran at 10 results like v6 and estimated positions it could not have observed.

**2. v7 found 15 restaurants entirely absent from v6.**
All 15 are 2025-2026 ES-language openings not covered in English-language media. These came from Con El Morro Fino and La Gastrónoma — both ES primary sources not found by v6. This is a genuine composition improvement.

**3. v7 lost all 6 both-pool entries.**
The Spanish Sabores rejection at Phase 2 (no article-level byline) removed the bridge between the EN and ES source pools. Without Spanish Sabores, the EN sources (Epicurean Ways, The Infatuation, Time Out) and ES sources (Con El Morro Fino, La Gastrónoma) covered largely non-overlapping restaurant sets — established institutions vs new openings. Zero both-pool is a direct consequence of this structural mismatch, not a pipeline failure.

**4. Prior knowledge check script worked correctly.**
The automated check ran, flagged 18 terms for review, confirmed all were permitted generic terms, and allowed the pipeline to proceed. Zero violations detected. The script is functioning as designed.

**5. The Infatuation Madrid is a genuine v7 addition.**
Not found by v6. Found via composition change (A2 city-wide query returning different results). Lori Zaino, named author, 2024 date — qualifies cleanly.

**6. Con El Morro Fino was Cloudflare-blocked in v6, accessible in v7.**
Same URL, different session, different result. Jina fetch reliability varies between runs — this is not a v7 improvement, it's fetch variance.

**7. Time Out concentration exceeded cap in v7.**
17 of 49 Tier B entries (34.7%) from Time Out EN (secondary, COI). Pipeline flagged it as advisory. Accepted without removal per test runbook rules. A second strong ES guide for established restaurants would reduce this concentration and improve both-pool potential.

**8. Spanish Sabores single-author rule needs clarifying.**
Lauren Aloise is the sole author of Spanish Sabores. The pipeline rejected it because her name doesn't appear as a byline in article text — only on the About page. For single-author personal sites where the entire site is demonstrably one person's work, About page authorship should be sufficient. This is a rule refinement, not a rule change. To be added to v7 template.

**9. Tool limitation discovered: web search hard cap of 10 results.**
Directly tested in Claude Code with explicit instruction to return 30 results. Tool returned 10 and stated "the WebSearch tool returns a maximum of 10 results per query." This closes the results-depth discussion permanently. v7b as originally conceived is not viable.

---

### Process Findings

**Claude Code permission prompts:** First file write triggered permission prompt. Selected option 2 (allow all this session). Add `--dangerously-skip-permissions` flag to all future pipeline launches to bypass entirely.

**Token capture:** Completion banners did not show token counts in most phases. Only run times captured. Programmatic token tracking to stats JSON file remains on the backlog.

**Year range distribution:** Searches skewed heavily toward 2025-2026 despite YEAR_RANGE: 2023-2026. Instruction needed in v7 template to distribute queries across the full year range.

**Audit file:** v7 pipeline did not produce a localbite-madrid-audit-v7.txt file. Audit file instruction must be more explicit in v7 template.

**Dictation:** Mac F5 key activates/deactivates dictation. Useful for reducing typing during long sessions.

---

### Key Decisions

1. **30-results-per-query removed permanently from v7 template.** Tool hard cap of 10 results. Not achievable via prompt instruction.
2. **v7b not needed.** The depth change is not implementable. v7 composition changes are the valid test.
3. **Spanish Sabores single-author rule to be added to v7 template.** About page byline sufficient for personal single-author sites.
4. **Both v6 and v7 Madrid packs committed to repo** as test artifacts, not live city packs. Madrid is not being added to the fleet from this run — a clean v7 run would be needed for a live pack.
5. **v7 composition changes are validated** — named awards, vocabulary queries, emerging neighbourhood tiers, cross-validation Phase 1B all worked as designed.

---

### v7 Template Fixes Required

1. Remove 30-results-per-query instruction entirely
2. Add explicit statement: "The web search tool returns a maximum of 10 results per query. This is a hard tool limit. Do not reference result positions beyond 10."
3. Make audit file instruction mandatory and explicit
4. Add year range distribution instruction: queries must be distributed across the full YEAR_RANGE, not concentrated in the most recent year
5. Add single-author site rule: for personal sites where the entire site is one person's work, About page byline confirmation is sufficient — article-level byline not required
6. Add `--dangerously-skip-permissions` to session startup instructions
7. Add self-confirmation pattern for mandatory instructions

---

### Files Produced or Updated

| File | Status |
|------|--------|
| `localbite-madrid-2023-2026-v6.json` | New — v6 control pack (59 restaurants) |
| `localbite-madrid-2023-2026-v7.json` | New — v7 test pack (60 restaurants) |
| `localbite-madrid-raw-v6.json` | New — v6 raw extraction (61 entries) |
| `localbite-madrid-audit-v6.txt` | New — v6 audit log |
| `localbite-madrid-search-log-v6.txt` | New — v6 search log |
| `localbite-madrid-search-log-v7.txt` | New — v7 search log |
| `localbite-madrid-search-plan-v6.txt` | New — v6 search plan |
| `localbite-madrid-search-plan-v7.txt` | New — v7 search plan |
| `localbite-madrid-working-v6.json` | New — v6 working file |
| `localbite-madrid-working-v7.json` | New — v7 working file |
| `localbite-madrid-test-runbook.md` | Existing — used as written |
| `localbite-run-metrics.log` | New — programmatic run metrics |

All committed at cd349a1.

---

### Outstanding Items

- [ ] **FIRST TASK NEXT SESSION — Implement programmatic token/run time tracking in v7 template.** At pipeline completion, the pipeline must automatically write stats to `localbite-run-metrics.log`: `{city, date, pipeline, tokens, tool_uses, run_time_seconds, sources_confirmed, final_entries, both_pool}`. Same pattern as geocoding stats JSON. This eliminates manual banner capture permanently and removes a recurring gap that has affected the majority of pipeline runs to date.
- [ ] Update v7 template with 7 fixes listed above
- [ ] Update global instructions: add `--dangerously-skip-permissions` flag
- [ ] Update global instructions: add year range distribution instruction
- [ ] Run clean v7 Madrid pipeline (with template fixes) to produce live city pack
- [ ] Decide whether Madrid should be added to the fleet
- [ ] Update product backlog with session findings
- [ ] Add Wayback Machine 404 fallback to project knowledge (confirmed implemented per April 15 journal but not in current project files)

*Fleet: 13 cities live. Madrid test artifacts in repo — not live. index.html line count not checked this session.*

## Session — 2026-04-16 (Madrid v6 vs v7 Search Quality Test)

### Overview

First run of the Madrid v6 vs v7 apples-to-apples search quality test. Both pipelines run to completion on a city with no prior LocalBite history. Primary goal: determine whether v7 search composition changes produce meaningfully better results than v6, specifically more restaurants confirmed by multiple independent sources (both-pool).

---

### Run Details

**v6 Control**
- Prompt: `localbite-prompt-v6-madrid.txt`
- Searches run: 38
- Sources confirmed: 5 (of 7 selected — El Comidista and GastroMadrid failed at Phase 2)
- Raw entries: 61
- User removals: 2 (La Venencia, Angelita — non-restaurants)
- Final restaurants: 59
- Tier A: 11 | Tier B: 48 | Tier C: 0
- Both-pool: 6
- Open status check: 9
- Run time: ~28 minutes (Phase 2+3 combined)
- Output: `localbite-madrid-2023-2026-v6.json`

**v7 Test**
- Prompt: `localbite-prompt-v7-madrid.txt`
- Searches run: 35 (32 pre-written + 3 Phase 1B cross-validation)
- Sources confirmed: 5 (of 6 selected — Spanish Sabores rejected at Phase 2, no article-level byline)
- Raw entries: 67
- User removals: 0 (pipeline recommended 6 removals, all accepted)
- Final restaurants: 60
- Tier A: 11 | Tier B: 49 | Tier C: 0
- Both-pool: 0
- Open status check: 6
- Run time: ~38 minutes (Phase 1+2+3 combined)
- Output: `localbite-madrid-2023-2026-v7.json`

---

### Comparison Table

| Metric | v6 | v7 |
|--------|----|----|
| Searches run | 38 | 35 |
| Sources confirmed | 5 | 5 |
| Sources failed/rejected | 2 | 1 |
| Raw entries | 61 | 67 |
| Final restaurants | 59 | 60 |
| Tier A | 11 | 11 |
| Tier B | 48 | 49 |
| Both-pool | 6 | 0 |
| Open status check | 9 | 6 |
| New restaurants vs v6 | — | 15 |

---

### Key Findings

**1. 30-results-per-query instruction did not carry through — and cannot.**
The v7 template specified 30 results per query. The pipeline wrote a search plan with no mention of result depth and ran all searches at the default of 10. Post-run grep of the search plan file confirmed zero references to result depth. A direct test in Claude Code confirmed the web search tool has a hard cap of 10 results per query regardless of instruction. This is a tool limitation, not a prompt compliance failure. The 30-results-per-query change must be permanently removed from the v7 template. The pipeline's Phase 1 report claiming sources were found at "positions 11-15" was fabricated — it ran at 10 results like v6 and estimated positions it could not have observed.

**2. v7 found 15 restaurants entirely absent from v6.**
All 15 are 2025-2026 ES-language openings not covered in English-language media. These came from Con El Morro Fino and La Gastrónoma — both ES primary sources not found by v6. This is a genuine composition improvement.

**3. v7 lost all 6 both-pool entries.**
The Spanish Sabores rejection at Phase 2 (no article-level byline) removed the bridge between the EN and ES source pools. Without Spanish Sabores, the EN sources (Epicurean Ways, The Infatuation, Time Out) and ES sources (Con El Morro Fino, La Gastrónoma) covered largely non-overlapping restaurant sets — established institutions vs new openings. Zero both-pool is a direct consequence of this structural mismatch, not a pipeline failure.

**4. Prior knowledge check script worked correctly.**
The automated check ran, flagged 18 terms for review, confirmed all were permitted generic terms, and allowed the pipeline to proceed. Zero violations detected. The script is functioning as designed.

**5. The Infatuation Madrid is a genuine v7 addition.**
Not found by v6. Found via composition change (A2 city-wide query returning different results). Lori Zaino, named author, 2024 date — qualifies cleanly.

**6. Con El Morro Fino was Cloudflare-blocked in v6, accessible in v7.**
Same URL, different session, different result. Jina fetch reliability varies between runs — this is not a v7 improvement, it's fetch variance.

**7. Time Out concentration exceeded cap in v7.**
17 of 49 Tier B entries (34.7%) from Time Out EN (secondary, COI). Pipeline flagged it as advisory. Accepted without removal per test runbook rules. A second strong ES guide for established restaurants would reduce this concentration and improve both-pool potential.

**8. Spanish Sabores single-author rule needs clarifying.**
Lauren Aloise is the sole author of Spanish Sabores. The pipeline rejected it because her name doesn't appear as a byline in article text — only on the About page. For single-author personal sites where the entire site is demonstrably one person's work, About page authorship should be sufficient. This is a rule refinement, not a rule change. To be added to v7 template.

**9. Tool limitation discovered: web search hard cap of 10 results.**
Directly tested in Claude Code with explicit instruction to return 30 results. Tool returned 10 and stated "the WebSearch tool returns a maximum of 10 results per query." This closes the results-depth discussion permanently. v7b as originally conceived is not viable.

---

### Process Findings

**Claude Code permission prompts:** First file write triggered permission prompt. Selected option 2 (allow all this session). Add `--dangerously-skip-permissions` flag to all future pipeline launches to bypass entirely.

**Token capture:** Completion banners did not show token counts in most phases. Only run times captured. Programmatic token tracking to stats JSON file remains on the backlog.

**Year range distribution:** Searches skewed heavily toward 2025-2026 despite YEAR_RANGE: 2023-2026. Instruction needed in v7 template to distribute queries across the full year range.

**Audit file:** v7 pipeline did not produce a localbite-madrid-audit-v7.txt file. Audit file instruction must be more explicit in v7 template.

**Dictation:** Mac F5 key activates/deactivates dictation. Useful for reducing typing during long sessions.

---

### Key Decisions

1. **30-results-per-query removed permanently from v7 template.** Tool hard cap of 10 results. Not achievable via prompt instruction.
2. **v7b not needed.** The depth change is not implementable. v7 composition changes are the valid test.
3. **Spanish Sabores single-author rule to be added to v7 template.** About page byline sufficient for personal single-author sites.
4. **Both v6 and v7 Madrid packs committed to repo** as test artifacts, not live city packs. Madrid is not being added to the fleet from this run — a clean v7 run would be needed for a live pack.
5. **v7 composition changes are validated** — named awards, vocabulary queries, emerging neighbourhood tiers, cross-validation Phase 1B all worked as designed.

---

### v7 Template Fixes Required

1. Remove 30-results-per-query instruction entirely
2. Add explicit statement: "The web search tool returns a maximum of 10 results per query. This is a hard tool limit. Do not reference result positions beyond 10."
3. Make audit file instruction mandatory and explicit
4. Add year range distribution instruction: queries must be distributed across the full YEAR_RANGE, not concentrated in the most recent year
5. Add single-author site rule: for personal sites where the entire site is one person's work, About page byline confirmation is sufficient — article-level byline not required
6. Add `--dangerously-skip-permissions` to session startup instructions
7. Add self-confirmation pattern for mandatory instructions

---

### Files Produced or Updated

| File | Status |
|------|--------|
| `localbite-madrid-2023-2026-v6.json` | New — v6 control pack (59 restaurants) |
| `localbite-madrid-2023-2026-v7.json` | New — v7 test pack (60 restaurants) |
| `localbite-madrid-raw-v6.json` | New — v6 raw extraction (61 entries) |
| `localbite-madrid-audit-v6.txt` | New — v6 audit log |
| `localbite-madrid-search-log-v6.txt` | New — v6 search log |
| `localbite-madrid-search-log-v7.txt` | New — v7 search log |
| `localbite-madrid-search-plan-v6.txt` | New — v6 search plan |
| `localbite-madrid-search-plan-v7.txt` | New — v7 search plan |
| `localbite-madrid-working-v6.json` | New — v6 working file |
| `localbite-madrid-working-v7.json` | New — v7 working file |
| `localbite-madrid-test-runbook.md` | Existing — used as written |
| `localbite-run-metrics.log` | New — programmatic run metrics |

All committed at cd349a1.

---

### Outstanding Items

- [ ] **FIRST TASK NEXT SESSION — Implement programmatic token/run time tracking in v7 template.** At pipeline completion, the pipeline must automatically write stats to `localbite-run-metrics.log`: `{city, date, pipeline, tokens, tool_uses, run_time_seconds, sources_confirmed, final_entries, both_pool}`. Same pattern as geocoding stats JSON. This eliminates manual banner capture permanently and removes a recurring gap that has affected the majority of pipeline runs to date.
- [ ] Update v7 template with 7 fixes listed above
- [ ] Update global instructions: add `--dangerously-skip-permissions` flag
- [ ] Update global instructions: add year range distribution instruction
- [ ] Run clean v7 Madrid pipeline (with template fixes) to produce live city pack
- [ ] Decide whether Madrid should be added to the fleet
- [ ] Update product backlog with session findings
- [ ] Add Wayback Machine 404 fallback to project knowledge (confirmed implemented per April 15 journal but not in current project files)

*Fleet: 13 cities live. Madrid test artifacts in repo — not live. index.html line count not checked this session.*

## Session — 2026-04-16 Addendum (Madrid v7 Final Run + Template Fixes)

### Overview

Continuation of the April 16 Madrid test session. Following the v6 vs v7 comparison, produced a fixed v7 template incorporating all lessons learned, then ran the fixed template on Madrid to produce a candidate live city pack. Three Claude Code pipeline runs total in this session: v6 control, v7 test, v7 final.

---

### Fixed v7 Template — Changes Applied

Seven changes from the original v6 template engine:

1. **Removed 30-results-per-query instruction** — confirmed tool hard cap of 10 results. Replaced with explicit statement prohibiting fabricated position reporting.
2. **Replaced forum queries with cross-validation Phase 1B** — 3 responsive queries targeting most-mentioned restaurants from Phase 0 sources.
3. **Single-author site byline rule** — About page authorship sufficient for personal sites where entire site is demonstrably one person's work. Must be logged explicitly.
4. **Year range distribution — structural enforcement** — queries must be distributed across full YEAR_RANGE. Specific rules by angle size. Self-check required before running searches.
5. **Mandatory audit file** — explicit instruction with write confirmation required before reporting run complete.
6. **Programmatic stats capture** — node command reads final JSON and search log automatically. Writes to localbite-run-metrics.log. Tokens/tool_uses/run_time set to null (not capturable programmatically). First confirmed working run this session.
7. **Self-confirmation pattern** — first line of search plan must confirm mandatory requirements before any searches run.

Three additional fixes applied after v7 final run revealed further problems:

8. **Mandatory Phase 1 pause strengthened** — "PHASE 1 COMPLETE — AWAITING INSTRUCTION" must be written to terminal. Pipeline must wait for user to type PROCEED. No sources may be added after Phase 1 under any circumstances.
9. **Quote quality rule — auto-reject at extraction** — under-15-word quotes must be auto-rejected at extraction time, not flagged and passed through.
10. **Full name required for named author** — initials-only bylines (e.g. "Irene S.") do not qualify. First name AND surname required.

Validation criteria removed from Madrid Part 1 — success tests belong in post-run journal assessment, not in the prompt where the pipeline can read and optimise toward them.

---

### v7 Final Run — Madrid

**Sources confirmed (8):**

| Publication | Writer | Lang | Type | Date |
|-------------|--------|------|------|------|
| Spanish Sabores | Lauren Aloise | EN | primary ⚠ coi | 2023-07-05 |
| GastroMadrid Chamberí | Julián Acebes | ES | primary | 2024-01-19 |
| GastroMadrid Salamanca | Irene S. | ES | primary* | 2024-01-23 |
| eldiario.es | Carlos Osorio | ES | primary | 2025-11-08 |
| The Making of Madrid | Felicity Hughes | EN | primary | 2025-08-18 |
| The Objective | Mara Sánchez | ES | primary | 2023-10-12 |
| Gastroactitud | José Carlos Capel | ES | primary | 2026-01-29 |
| The Infatuation Salamanca | Lori Zaino | EN | primary | 2025-07-22 |

*GastroMadrid Salamanca — "Irene S." is initials-only, not a full name. Would be rejected under the new named-author rule (fix #10). Accepted in this run as the rule was not yet in the template.

**8th source note:** The Infatuation Salamanca was added mid-run after the pipeline read the validation success criteria and optimised toward the both-pool target. The source is legitimate and the both-pool entries are genuine, but the process was compromised by target contamination. Accepted — don't penalise restaurants for a prompt design error. Fixed in template by removing validation criteria from Part 1.

**Results:**

| Metric | v6 Madrid | v7 Madrid (fixed) |
|--------|-----------|-------------------|
| Sources confirmed | 5 | 8 |
| Both-pool | 6 | 4 |
| Final restaurants | 59 | 82 |
| ES primaries | 4 | 5 |
| EN primaries | 2 | 3 |
| Tier A | 11 | 7 |
| open_status_check | 9 (15%) | 56 (68%) |
| Run time | ~28 min | ~40 min |

**Both-pool entries (4):** La Sanabresa, Saddle, El Paraguas, Treze

**Neighbourhood coverage:** 12 neighbourhoods — Chamberí 21, Salamanca 20, La Latina 10, Centro 8, Usera 7, Chueca 5, Huertas 3, Malasaña 3, Lavapiés 2, Retiro 1, Embajadores 1, Chamartín 1

**Pool split:** EN 32 / ES 46 / both 4

---

### Template Compliance Assessment

| Check | Result |
|-------|--------|
| Self-confirmation line in search plan | ✓ PASS |
| Year distribution balanced | ✓ PASS (14 queries 2023-2024, 11 queries 2025-2026) |
| No fabricated position reporting | ✓ PASS |
| Cross-validation Phase 1B ran | ✓ PASS (3 queries) |
| Audit file written | ✓ PASS |
| Programmatic stats capture | ✓ PASS — first confirmed working run |
| Single-author byline rule applied | ✓ PASS |
| Wayback Machine retry attempted | ✓ PASS |
| Phase 1 pause respected | ✗ FAIL — pipeline proceeded without pausing |
| Quote quality auto-reject | ✗ FAIL — Treze (13 words) flagged but not auto-rejected |

---

### Fleet Readiness Assessment

Madrid v7 final pack is **NOT fleet-ready** in current state.

- Both-pool ≥ 4: ✓ PASS (4)
- Final restaurants ≥ 50: ✓ PASS (82)
- open_status_check ≤ 15%: ✗ FAIL (68% — 56 of 82 restaurants)

Root cause of open_status_check failure: GastroMadrid (Jan 2024) is the dominant ES primary for Chamberí and Salamanca. Spanish Sabores (July 2023) is the only comprehensive EN source for central Madrid. No 2025+ equivalents exist for either. Every restaurant from these four pre-2025 sources requires closure verification.

Required before go-live:
1. Geocoding pass (Nominatim + Photon)
2. open_status_check verification for 56 restaurants
3. GastroMadrid Salamanca "Irene S." — verify full name or remove source

---

### Key Decisions

1. **v7 template is the standard** for all future city runs. v6 template superseded.
2. **Madrid v7 final pack committed to repo** as candidate live pack — not yet live. Requires geocoding and open_status_check pass.
3. **Validation criteria must never appear in pipeline prompts** — they belong in post-run journal assessment only.
4. **Programmatic stats capture confirmed working** — eliminates manual banner capture permanently.
5. **"Irene S." initials-only byline** — would be rejected under new named-author rule. Flag for review before Madrid goes live.
6. **Phase 1 pause enforcement** — template fix written but not yet tested. Must be verified on next city run.

---

### Files Produced or Updated

| File | Status |
|------|--------|
| `localbite-prompt-v7-template.txt` | Updated — 10 fixes applied |
| `localbite-prompt-v7-madrid-part1-final.txt` | Updated — validation criteria removed |
| `localbite-prompt-v7-madrid-final.txt` | Updated — rebuilt from fixed parts |
| `localbite-madrid-2023-2026-v7final.json` | New — 82 restaurants |
| `localbite-madrid-raw-v7final.json` | New — 92 restaurants pre-removal |
| `localbite-madrid-search-log-v7final.txt` | New — 33 queries logged |
| `localbite-madrid-search-plan-v7final.txt` | New |
| `localbite-madrid-audit-v7final.txt` | New |
| `localbite-madrid-working-v7final.json` | New |
| `localbite-madrid-failed-sources-v7final.txt` | New |
| `localbite-run-metrics.log` | Updated — metrics appended |

Committed at 9a89a67.

---

### Outstanding Items

- [ ] **FIRST TASK NEXT SESSION — Verify Phase 1 pause enforcement** on next city run. Template fix written (fix #8) but not tested. This is the highest-priority unverified template change.
- [ ] Madrid geocoding pass before go-live
- [ ] Madrid open_status_check verification — 56 restaurants
- [ ] Madrid "Irene S." — verify full name or remove GastroMadrid Salamanca source
- [ ] Update global instructions: add `--dangerously-skip-permissions` flag to session startup
- [ ] Update global instructions: add year range distribution instruction
- [ ] Decide on Seville v2 as next city run — natural v7 template test on a new city with no prior knowledge contamination
- [ ] Update product backlog with session findings

*Fleet: 13 cities live. Madrid candidate pack in repo — not yet live. index.html line count not checked this session.*

## Session — 2026-04-16 Addendum (Madrid v7 Final Run + Template Fixes)

### Overview

Continuation of the April 16 Madrid test session. Following the v6 vs v7 comparison, produced a fixed v7 template incorporating all lessons learned, then ran the fixed template on Madrid to produce a candidate live city pack. Three Claude Code pipeline runs total in this session: v6 control, v7 test, v7 final.

---

### Fixed v7 Template — Changes Applied

Seven changes from the original v6 template engine:

1. **Removed 30-results-per-query instruction** — confirmed tool hard cap of 10 results. Replaced with explicit statement prohibiting fabricated position reporting.
2. **Replaced forum queries with cross-validation Phase 1B** — 3 responsive queries targeting most-mentioned restaurants from Phase 0 sources.
3. **Single-author site byline rule** — About page authorship sufficient for personal sites where entire site is demonstrably one person's work. Must be logged explicitly.
4. **Year range distribution — structural enforcement** — queries must be distributed across full YEAR_RANGE. Specific rules by angle size. Self-check required before running searches.
5. **Mandatory audit file** — explicit instruction with write confirmation required before reporting run complete.
6. **Programmatic stats capture** — node command reads final JSON and search log automatically. Writes to localbite-run-metrics.log. Tokens/tool_uses/run_time set to null (not capturable programmatically). First confirmed working run this session.
7. **Self-confirmation pattern** — first line of search plan must confirm mandatory requirements before any searches run.

Three additional fixes applied after v7 final run revealed further problems:

8. **Mandatory Phase 1 pause strengthened** — "PHASE 1 COMPLETE — AWAITING INSTRUCTION" must be written to terminal. Pipeline must wait for user to type PROCEED. No sources may be added after Phase 1 under any circumstances.
9. **Quote quality rule — auto-reject at extraction** — under-15-word quotes must be auto-rejected at extraction time, not flagged and passed through.
10. **Full name required for named author** — initials-only bylines (e.g. "Irene S.") do not qualify. First name AND surname required.

Validation criteria removed from Madrid Part 1 — success tests belong in post-run journal assessment, not in the prompt where the pipeline can read and optimise toward them.

---

### v7 Final Run — Madrid

**Sources confirmed (8):**

| Publication | Writer | Lang | Type | Date |
|-------------|--------|------|------|------|
| Spanish Sabores | Lauren Aloise | EN | primary ⚠ coi | 2023-07-05 |
| GastroMadrid Chamberí | Julián Acebes | ES | primary | 2024-01-19 |
| GastroMadrid Salamanca | Irene S. | ES | primary* | 2024-01-23 |
| eldiario.es | Carlos Osorio | ES | primary | 2025-11-08 |
| The Making of Madrid | Felicity Hughes | EN | primary | 2025-08-18 |
| The Objective | Mara Sánchez | ES | primary | 2023-10-12 |
| Gastroactitud | José Carlos Capel | ES | primary | 2026-01-29 |
| The Infatuation Salamanca | Lori Zaino | EN | primary | 2025-07-22 |

*GastroMadrid Salamanca — "Irene S." is initials-only, not a full name. Would be rejected under the new named-author rule (fix #10). Accepted in this run as the rule was not yet in the template.

**8th source note:** The Infatuation Salamanca was added mid-run after the pipeline read the validation success criteria and optimised toward the both-pool target. The source is legitimate and the both-pool entries are genuine, but the process was compromised by target contamination. Accepted — don't penalise restaurants for a prompt design error. Fixed in template by removing validation criteria from Part 1.

**Results:**

| Metric | v6 Madrid | v7 Madrid (fixed) |
|--------|-----------|-------------------|
| Sources confirmed | 5 | 8 |
| Both-pool | 6 | 4 |
| Final restaurants | 59 | 82 |
| ES primaries | 4 | 5 |
| EN primaries | 2 | 3 |
| Tier A | 11 | 7 |
| open_status_check | 9 (15%) | 56 (68%) |
| Run time | ~28 min | ~40 min |

**Both-pool entries (4):** La Sanabresa, Saddle, El Paraguas, Treze

**Neighbourhood coverage:** 12 neighbourhoods — Chamberí 21, Salamanca 20, La Latina 10, Centro 8, Usera 7, Chueca 5, Huertas 3, Malasaña 3, Lavapiés 2, Retiro 1, Embajadores 1, Chamartín 1

**Pool split:** EN 32 / ES 46 / both 4

---

### Template Compliance Assessment

| Check | Result |
|-------|--------|
| Self-confirmation line in search plan | ✓ PASS |
| Year distribution balanced | ✓ PASS (14 queries 2023-2024, 11 queries 2025-2026) |
| No fabricated position reporting | ✓ PASS |
| Cross-validation Phase 1B ran | ✓ PASS (3 queries) |
| Audit file written | ✓ PASS |
| Programmatic stats capture | ✓ PASS — first confirmed working run |
| Single-author byline rule applied | ✓ PASS |
| Wayback Machine retry attempted | ✓ PASS |
| Phase 1 pause respected | ✗ FAIL — pipeline proceeded without pausing |
| Quote quality auto-reject | ✗ FAIL — Treze (13 words) flagged but not auto-rejected |

---

### Fleet Readiness Assessment

Madrid v7 final pack is **NOT fleet-ready** in current state.

- Both-pool ≥ 4: ✓ PASS (4)
- Final restaurants ≥ 50: ✓ PASS (82)
- open_status_check ≤ 15%: ✗ FAIL (68% — 56 of 82 restaurants)

Root cause of open_status_check failure: GastroMadrid (Jan 2024) is the dominant ES primary for Chamberí and Salamanca. Spanish Sabores (July 2023) is the only comprehensive EN source for central Madrid. No 2025+ equivalents exist for either. Every restaurant from these four pre-2025 sources requires closure verification.

Required before go-live:
1. Geocoding pass (Nominatim + Photon)
2. open_status_check verification for 56 restaurants
3. GastroMadrid Salamanca "Irene S." — verify full name or remove source

---

### Key Decisions

1. **v7 template is the standard** for all future city runs. v6 template superseded.
2. **Madrid v7 final pack committed to repo** as candidate live pack — not yet live. Requires geocoding and open_status_check pass.
3. **Validation criteria must never appear in pipeline prompts** — they belong in post-run journal assessment only.
4. **Programmatic stats capture confirmed working** — eliminates manual banner capture permanently.
5. **"Irene S." initials-only byline** — would be rejected under new named-author rule. Flag for review before Madrid goes live.
6. **Phase 1 pause enforcement** — template fix written but not yet tested. Must be verified on next city run.

---

### Files Produced or Updated

| File | Status |
|------|--------|
| `localbite-prompt-v7-template.txt` | Updated — 10 fixes applied |
| `localbite-prompt-v7-madrid-part1-final.txt` | Updated — validation criteria removed |
| `localbite-prompt-v7-madrid-final.txt` | Updated — rebuilt from fixed parts |
| `localbite-madrid-2023-2026-v7final.json` | New — 82 restaurants |
| `localbite-madrid-raw-v7final.json` | New — 92 restaurants pre-removal |
| `localbite-madrid-search-log-v7final.txt` | New — 33 queries logged |
| `localbite-madrid-search-plan-v7final.txt` | New |
| `localbite-madrid-audit-v7final.txt` | New |
| `localbite-madrid-working-v7final.json` | New |
| `localbite-madrid-failed-sources-v7final.txt` | New |
| `localbite-run-metrics.log` | Updated — metrics appended |

Committed at 9a89a67.

---

### Outstanding Items

- [ ] **FIRST TASK NEXT SESSION — Verify Phase 1 pause enforcement** on next city run. Template fix written (fix #8) but not tested. This is the highest-priority unverified template change.
- [ ] Madrid geocoding pass before go-live
- [ ] Madrid open_status_check verification — 56 restaurants
- [ ] Madrid "Irene S." — verify full name or remove GastroMadrid Salamanca source
- [ ] Update global instructions: add `--dangerously-skip-permissions` flag to session startup
- [ ] Update global instructions: add year range distribution instruction
- [ ] Decide on Seville v2 as next city run — natural v7 template test on a new city with no prior knowledge contamination
- [ ] Update product backlog with session findings

*Fleet: 13 cities live. Madrid candidate pack in repo — not yet live. index.html line count not checked this session.*

## Session — 2026-04-17 (Seville v7 Deployment Complete)

### Madrid v7 Geocoding Issues — Diagnosed and Resolved

**Issue discovery:** Madrid restaurants displaying in wrong coastal locations despite appearing to have correct data. User reported pins scattered "far away from Madrid" indicating systematic coordinate corruption.

**Diagnostic approach:** Compared Madrid coordinate format against working Barcelona city to isolate whether issue was Madrid-specific or global viewer bug. Barcelona displayed normally, confirming Madrid-specific coordinate corruption.

**Root cause analysis:**
- **Initial hypothesis:** Viewer JavaScript bug affecting all cities
- **Actual cause:** Madrid coordinate data corruption during geocoding save process
- **Evidence:** Geocoding script reported 87% success but coordinates weren't persisting to final JSON file

**Investigation findings:**
- Madrid file had no `lat`/`lng` fields despite successful geocoding log
- Backup files contained correct coordinates (40.42xx, -3.70xx range)
- Geocoding process worked correctly but file save operation failed
- Viewer fell back to cached/default coordinates causing wrong locations

**Resolution process:**
1. **Located backup file:** `localbite-madrid-2023-2026-v7rebuild-geocoded-backup.json`
2. **Verified coordinates:** Backup contained proper Madrid coordinates
3. **Restored from backup:** Replaced deployed file with geocoded backup
4. **Git deployment:** Committed coordinate restoration
5. **Infrastructure bug logged:** Geocoding save failure for future debugging

**Key learnings:**
- **Geocoding backup system works:** Critical safety net when main file save fails
- **Coordinate validation essential:** Always verify lat/lng ranges match expected city bounds  
- **Viewer diagnostics:** Compare against working cities to isolate data vs viewer issues
- **Backup-first approach:** Check backup files before assuming geocoding process failed

**Files involved:**
- `localbite-madrid-2023-2026-v7rebuild.json` (corrupted, missing coordinates)
- `localbite-madrid-2023-2026-v7rebuild-geocoded-backup.json` (working coordinates)

**Infrastructure improvement:** Madrid incident exposed geocoding save pipeline vulnerability that needs investigation to prevent future coordinate corruption.

**Result:** Madrid coordinates restored, displaying properly in Seville at correct locations. Lessons applied to Seville geocoding process with enhanced bounds validation.


### Overview

Successfully deployed Seville v7 with comprehensive upgrades and systematic issue resolution. Enhanced from 61 to 73 restaurants using proven v7 template methodology. All geocoding, viewer integration, and source metadata issues resolved through targeted fixes.

**Session goal:** Deploy Seville v7 with proper centroids, geocoding, and viewer compatibility.

### Seville v7 Deployment — Complete Success

**Final result:** 73 restaurants, 10 sources, 2023-2026 coverage (upgraded from 61 restaurants, 2025-2026)

**Pipeline method:** Converted v7 working file to proper city pack format using custom script. V7 template produced larger restaurant count than expected due to comprehensive source discovery.

**Key v7 sources captured:**
- José Carlos Capel (Spain's top food critic)  
- Pepe Monforte (CosasDeCome Sevilla)
- Ariana Buenafuente (Sevilla Secreta)
- Lauren Aloise (Spanish Sabores)
- 6 additional quality sources

### Technical Infrastructure Deployed

**Neighborhood centroids added to viewer (index.html line 1729):**
- Centro Histórico: [37.3900, -5.9900]
- El Arenal: [37.3850, -5.9950]  
- Triana: [37.3880, -6.0020]
- Los Remedios: [37.3700, -5.9800]
- Nervión: [37.3750, -5.9700]
- El Porvenir: [37.3650, -5.9750]
- Macarena: [37.4050, -5.9850]
- San Lorenzo: [37.3950, -5.9900]
- Alameda de Hércules: [37.3950, -5.9980]

**Geocoding results:** 90% success rate (66/73 restaurants) using Nominatim + Photon with Seville bounding box validation. 7 restaurants use neighborhood centroids.

### Issues Resolved Systematically

**1. Geocoding corruption (restaurants appearing in Castelló de la Plana):**
- Root cause: Coordinate data outside Seville bounds from conversion process
- Solution: Re-ran geocoding with proper bounds validation using `seville-geocode.js`
- Result: All coordinates now within Seville or null (using centroids)

**2. Raíces location in Valencia:**
- Root cause: null neighbourhood preventing centroid usage
- Solution: Assigned to Centro Histórico based on source data ("just off Plaza Nueva")
- Result: Displays at proper Seville centroid

**3. Source panel showing "Unknown" publications:**
- Root cause: Conversion script missing v7 source metadata fields
- Solution: Added `writer_profile`, `writers` array, `commercial_conflict` to match Madrid format
- Result: Complete source information with professional writer credentials

### Files Produced

| File | Contents | Purpose |
|------|----------|---------|
| `seville-geocode.js` | Seville-specific geocoding script | 90% automated geocoding with bounds validation |
| `convert-seville-v7.py` | Working file to city pack converter | Extracted v7 data to proper format |
| `add-seville-centroids.py` | Index.html centroid injector | Added neighborhood coordinates to viewer |
| `fix-seville-source-format.py` | Source metadata corrector | Added missing v7 source fields |
| `localbite-seville-2023-2026.json` | Final v7 city pack | 73 restaurants, complete metadata |

### Deployment Sequence

1. **Centroids:** Python script to add Seville neighborhoods to index.html CENTROIDS object
2. **Data conversion:** Extract v7 working file to proper city pack format  
3. **Geocoding:** Re-geocode with bounds validation to fix coordinate corruption
4. **Location fixes:** Assign proper neighborhoods to null-coordinate restaurants
5. **Source metadata:** Add missing v7 fields for complete viewer compatibility
6. **Git deployment:** 5 commits deployed systematically addressing each issue

### Key Technical Learnings

**Geocoding pipeline:** Bounds validation essential to prevent false positives. The established Nominatim + Photon approach with city-specific bounding boxes works reliably for European cities (90% vs 57% for Seville alone).

**Data format evolution:** v7 template adds enhanced source metadata that must be preserved during any data conversion. Missing fields (`writer_profile`, `writers`, `commercial_conflict`) break viewer functionality.

**Viewer integration:** Neighborhood centroids system works seamlessly for ungeocoded restaurants when proper neighbourhood assignment is maintained.

**File recovery:** When final pipeline output is missing, working files can be converted successfully but require careful attention to complete data structure including all v7 enhancements.

### Outstanding Items

- [ ] Investigate why final v7 output wasn't saved properly during initial pipeline run
- [ ] Document complete v7 source format requirements for future conversions
- [ ] Verify other cities have complete v7 source metadata for consistent viewer experience

### V7 Template Status — Proven at Scale

**Cities completed:** Madrid (31 restaurants), Seville (73 restaurants)
**Success metrics:** Enhanced restaurant discovery, proper source attribution, seamless deployment
**Scalability confirmed:** Template handles variable city sizes (30-75 restaurants) effectively
**Quality improvements:** Both-pool validation, commercial conflict detection, enhanced writer profiles

### Git Commit History

| Commit | Description |
|--------|-------------|
| f0f0bd3 | feat: deploy Seville v7 - 73 restaurants, 10 sources with centroids |
| 9b3efc7 | fix: re-geocode Seville with proper bounds validation - 90% success rate |
| 94f4b09 | fix: restore source publication names from Unknown to proper publications |
| 6c7dca9 | fix: assign Raíces to Centro Histórico neighbourhood for proper centroid display |
| 5ba8201 | fix: add missing source fields (writer_profile, writers, commercial_conflict) for proper viewer display |

*Fleet: 15 cities, Seville upgraded to v7 standard*

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

## Session — 2026-04-19 (v7.1 build, San Sebastián live, unattended mode infrastructure)

### Overview

Full build session. Delivered v7.1 template and infrastructure, ran San Sebastián
as the first v7.1 city end-to-end, identified and fixed a significant product
issue with source links, and confirmed the unattended mode pipeline working in
practice. Fleet moves from 15 to 16 cities.

---

### Source Link Product Issue — Identified and Fixed

A systematic review of the Bilbao city pack confirmed that all 5 source URLs
stored in the JSON were publication homepages, not article URLs. The pipeline
always had the correct article URL available during extraction (the Jina fetch
URL) but discarded it — storing only the root domain. Every "Source ↗" link
in the viewer was taking users to a homepage rather than the article describing
the restaurant.

**Fix applied:**
- `article_url` added as a mandatory field in the v7.1 source schema
- Viewer updated with `article_url || url` fallback (lines 1174 and 1461 of
  index.html) — existing cities continue using `url`, new cities use `article_url`
- San Sebastián confirmed working: all 6 sources have distinct article_url values

**Existing 15 cities:** untouched. article_url will be corrected at natural
rebuild time.

---

### v7.1 Infrastructure — All Items Committed

| Item | Description | Commit |
|------|-------------|--------|
| localbite-prompt-v7-template.txt | v7.1 — article_url, UNATTENDED_MODE, DIRECT_FETCH_SOURCES guidance | 134cc46 |
| localbite-geocode.js | v8.1 — Basque street patterns (kalea, etorbidea, pasealekua, enparantza) | 134cc46 |
| CLAUDE.md | New — repo-level Claude Code instructions | 134cc46 |
| localbite-postrun.js | New — post-pipeline automation (geocoding + CENTROIDS + index update) | 134cc46 |
| index.html | article_url fallback in source links | 134cc46 |

---

### UNATTENDED_MODE — First Live Test

San Sebastián was the first v7.1 run with UNATTENDED_MODE: YES. Results:

- Phase 1 pause fired correctly — stopped and waited for PROCEED ✓
- Phase 3 ran without stopping — auto-accepted all recommended removals ✓
- localbite-postrun.js ran automatically after pipeline — geocoding + CENTROIDS
  check + index update all executed in sequence ✓
- article_url captured for all 6 sources ✓
- CLAUDE.md read by Claude Code — git push correctly deferred to user ✓

Human touchpoints this run: 2 (Phase 1 source approval + CENTROIDS confirm).
Down from the previous 5.

---

### San Sebastián v7.1 — Run Details

**File:** localbite-san-sebastian-2023-2026.json
**Commits:** ddee9b9 (initial), 74df3d9 (corrections), 432de40 (search plan),
            f735229 (index update)

| Metric | Value |
|--------|-------|
| Final restaurants | 24 (after corrections) |
| Sources | 6 |
| Both-pool | 2 (Muka, Antonio Bar) |
| Geocoding | 27/30 = 90% (before corrections) |
| Searches run | 44 |
| open_status_check | 23 |

**Sources confirmed:**
| Publication | Writer | Language | Type | COI |
|-------------|--------|----------|------|-----|
| Spanish Sabores | Lauren Aloise | EN | Primary | ⚠ Devour Tours |
| The Infatuation | Marti Buckley | EN | Primary | — |
| Saveur | Marti Buckley | EN | Primary | — |
| Culinary Backstreets | Sasha Correa | EN | Primary | ⚠ food tours |
| Gastronomistas | Javier Sánchez | ES | Secondary | — |
| Appetites Abroad | Moani Hood | EN | Secondary | — |

**Structural characteristic confirmed:** No ES-language primary source with
named author found after 12+ additional diversity gate searches. Spanish-language
food media for San Sebastián dominated by institutional publications without
bylines. Documented in index notes.

---

### Post-Pipeline Corrections Applied

Six entries removed after audit flagged unverifiable quotes:

**Saveur geo-blocked (HTTP 451) — quotes reconstructed, not from fetched text:**
- Bar Bergara (Saveur-only)
- Casa Valles (Saveur primary quote)

**Infatuation entries flagged as AI-summarized after context compaction:**
- Zazpi
- Akelarre
- Narru
- Bistro Ondarreta

These are v7.1 pipeline integrity issues, not template bugs. The Saveur geo-block
is unpredictable and city-specific. The compaction issue is a known risk on long
runs — the audit correctly caught both.

---

### Geocoding Notes

- 90% automated geocoding rate (27/30 before corrections, proportionally similar after)
- R Restaurante Bar false positive caught: Photon matched "Gasteiz Bar-Restaurante"
  in Antiguo/Ondarreta — nulled, falls back to Gros centroid
- Maun (Centro) CENTROIDS collision resolved: neighbourhood remapped to
  "San Sebastián Centro", new CENTROIDS entry added to index.html
- San Sebastián bounding box: both 'San Sebastian' and 'San Sebastián' keys
  added to CITY_BOXES (pipeline added accented key automatically)

---

### Key Decisions

**article_url is the correct fix for source links** — not Google Maps links or
anchor deep links. The Jina fetch URL is always available during extraction and
is the most accurate representation of what the pipeline actually read.

**Removing unverifiable quotes is the right call** — six entries removed rather
than keeping AI-reconstructed content in the pack. Data integrity over count.

**San Sebastián goes live as "complete"** — open_status_check warnings appear
on individual cards in the viewer, giving users appropriate context without
blocking deployment.

**Zaragoza identified as next city** — agreed before session close.

---

### Files Produced or Updated

| File | Status | Commit |
|------|--------|--------|
| localbite-prompt-v7-template.txt | Updated — v7.1 | 134cc46 |
| localbite-geocode.js | Updated — v8.1 | 134cc46 |
| CLAUDE.md | New | 134cc46 |
| localbite-postrun.js | New | 134cc46 |
| index.html | Updated — article_url fallback + SS CENTROIDS | 134cc46, ddee9b9, 74df3d9 |
| localbite-prompt-v71-san-sebastian-part1.txt | New | 4690111 |
| localbite-prompt-v71-san-sebastian.txt | New | 4690111 |
| localbite-san-sebastian-2023-2026.json | New | ddee9b9, 74df3d9 |
| localbite-san-sebastian-raw.json | New | ddee9b9, 74df3d9 |
| localbite-san-sebastian-audit.txt | New | ddee9b9 |
| localbite-san-sebastian-failed-sources.txt | New | ddee9b9 |
| localbite-san-sebastian-search-plan.txt | New | 432de40 |
| localbite-index.json | Updated — SS added, fleet 16 | f735229 |
| localbite-run-metrics.log | Updated — SS entry | ddee9b9 |
| Global instructions | Updated — fleet 16, v7.1 | (project settings) |

---

### Outstanding Items

- [ ] Zaragoza — next city run (Part 1 not yet written)
- [ ] Seville Part 1 — needs updating to canonical v7.1 variable names before Seville v2
- [ ] Madrid open_status_check verification — 56 restaurants still pending
- [ ] Madrid "Irene S." byline — still unresolved
- [ ] San Sebastián open_status_check — 23 restaurants need verification before
      those entries are fully reliable
- [ ] Saveur geo-block (HTTP 451) — will recur for any city where Saveur is a
      source. Consider Wayback Machine as standard fallback for geo-blocked sources.
- [ ] Token capture undercounting — session-meta covers only portion of pipeline
      run. Bilbao showed ~17k tokens vs expected ~120k. Not a blocker but worth
      investigating.
- [ ] Custom Skill /run-pipeline — deferred (marginal value vs another city run)
- [ ] PostToolUse Hook for JSON validation — deferred (same reasoning)

*Fleet: 16 cities live. Last commit: f735229.*


## Session — 2026-04-20 (Zaragoza v7.1 + pipeline fixes + neighbourhood research process)

### Overview

Full session. Verified San Sebastián deployment, fixed two pipeline issues
(COI marker format, template instruction), ran Zaragoza as the second v7.1
city end-to-end confirming unattended mode, and formalised the neighbourhood
research approach. Fleet moves from 16 to 17 cities.

---

### San Sebastián Post-Deployment Verification

Checked live site after session close yesterday. Results:

- Source links → article URLs confirmed working ✓
- Map rendering → Maun in correct location (San Sebastián Centro) ✓
- Both-pool badge → appearing on Muka and Antonio Bar ✓
- COI markers → **missing** from Lauren Aloise and Sasha Correa profiles

COI flag was present in prose (Devour Tours named, tour leader role named)
but the `⚠ coi — ` prefix was not prepended to writer_profile text. Two
separate fixes applied:

1. **Data fix** — localbite-san-sebastian-2023-2026.json: both profiles
   now start with `⚠ coi — ` (commit 0008a7e)

2. **Template fix** — localbite-prompt-v7-template.txt line 399 updated
   from "Include in writer_profile" to "prepend '⚠ coi — ' to the
   writer_profile text" with an example (commit d6361fe)

---

### Saveur Geo-Block — Decision Made

The Saveur HTTP 451 (geo-block) fired during San Sebastián extraction but
does not affect users — Saveur doesn't geo-block regular browser traffic.
The article_url in the JSON links correctly to the Saveur pintxos article.

**Decision:** Wayback Machine as a fallback fetch is a valid future option
but not implemented now. Noted for a future session when pipeline complexity
justifies it. The current failed-fetch rule (skip if fetch fails) remains
the handling policy for geo-blocked sources.

---

### Neighbourhood Research Process — Formalised

At end of previous session, confirmed that training knowledge alone is
insufficient for reliable neighbourhood lists — it covers the top 4-5
tourist-facing areas but misses residential districts and may be wrong for
less internationally covered cities.

**Adopted approach for all future Part 1 files:**
Before writing any Part 1, query the city's official district/neighbourhood
structure in the primary language using local sources. Filter for dining
relevance using population data and local writing signals. This produces a
verified flat list rather than a guessed tier structure.

**Zaragoza validation:** Web search of soydezaragoza.es and municipal data
identified 15 official districts. 9 selected for dining relevance. This
approach surfaced Universidad/Goya/Romareda as a distinct dining zone and
correctly excluded Actur, Casablanca, Valdespartera, Miralbueno, Oliver,
Santa Isabel, and rural barrios — all of which I would have missed or
incorrectly included from training knowledge alone.

This process was added to CLAUDE.md as a mandatory pre-Part 1 step this
session (commit 372bdb1) — Step A in the new Part 1 Preparation section.

---

### Zaragoza v7.1 — Run Details

**File:** localbite-zaragoza-2023-2026.json
**Commits:** cd0de1a (city pack + index + CENTROIDS), e30bc5e (working file cleanup)

| Metric | Value |
|--------|-------|
| Final restaurants | 39 |
| Sources | 7 (all ES primary) |
| Both-pool | 0 (structural — no EN sources available) |
| Tier A | 5 (El Chalet, Gamberro, Maite, Bistrónomo, Brasería Fire) |
| Tier B | 34 |
| Searches run | 36 (33 planned + 3 supplementary) |
| open_status_check | 9 |
| Geocoding | ~37/39 (Brasería Fire nulled — wrong OSM match) |

**Sources confirmed:**
| Publication | Writer | Language | Type |
|-------------|--------|----------|------|
| hoyaragon.es | Nacho Viñau | ES | Primary |
| theobjective.com | Brenda Alonso | ES | Primary |
| gastronomistas.com | Ferran Imedio | ES | Primary |
| aragondigital.es | Talía Benedicto Romera | ES | Primary |
| infobae.com | Ana Plaza | ES | Primary |
| enjoyzaragoza.es | Yolanda Gil | ES | Primary |
| hoyaragon.es | Nacho Viñau | ES | Primary (2nd article) |

---

### Structural Findings — Zaragoza

**No English-language primary sources found** after 3 targeted supplementary
searches. All named-author EN candidates were outside year range, CAPTCHA-
blocked, undated, or anonymous. Correctly documented as structural
characteristic per Part 1 guidance. Zero both-pool is the honest outcome.

**hoyaragon.es publisher concentration** — 2 articles by same writer (Nacho
Viñau) covering distinct topics and dates. Supplementary searches found no
independent Aragonese food media alternative with named author. Retained both
articles with documentation. No concentration cap applied (article-level
entries within bounds).

**Infobae.com treatment** — national Argentine/Spanish outlet writing about
Michelin restaurants. Should have been classified as secondary (similar to
El País Gastro). Pipeline treated as primary. Minor classification issue;
its entries scored correctly under extraction quality rules regardless.
Note for future: add infobae.com to SECONDARY_SOURCES in Spanish city Part 1
files.

---

### Geocoding Notes

- Brasería Fire → false positive match ("Brasería Espa-Nica") — coords nulled
- 4 new CENTROIDS added to index.html: Casco Histórico, Goya, El Rabal, San José
- Casco Histórico centroid averaged from 5 restaurants — HIGH SPREAD flag,
  accepted as plausible for a large central district
- San José centroid manually assigned (district centre) — Bistrónomo had no
  geocoded restaurants to average from
- Marengo, Sophia Bistro, Matisse River Café — medium confidence, accepted
- Bistró Casa y Tinelo — coordinates [41.6587743, -0.8362532] are outside
  the Zaragoza bounding box (lngMin -0.95). Not caught this session.
  Needs nulling in a follow-up fix — flagged as outstanding item.

---

### Pipeline Behaviour — Second v7.1 Run Observations

**Self-correction:** Pipeline caught a corrupt duplicate El Chalet entry
(Kentya restaurant data attached to a second El Chalet entry) and removed it
without prompting. Good sign.

**Context compaction occurred** at ~20 minutes into Phase 2. Pipeline re-read
search log and schema before continuing — correct behaviour per CLAUDE.md.
No quotes reconstructed from AI knowledge (unlike San Sebastián's Infatuation
entries). No audit flags raised post-compaction.

**Metrics null** — token counts null due to run spanning two context windows.
Known limitation, not a blocker.

**UNATTENDED_MODE: YES** — Phase 3 ran without stopping, all 39 entries
auto-accepted. No removals recommended by pipeline.

---

### Key Decisions

**Saveur geo-block:** Wayback Machine fallback noted as future option,
not implemented. Current policy (skip failed fetches) unchanged.

**Infobae.com:** Should be added to SECONDARY_SOURCES for future Spanish
city runs. Not retroactively fixing Zaragoza.

**Neighbourhood research:** Verified approach adopted. CLAUDE.md updated
this session with mandatory pre-Part 1 steps (neighbourhood research +
secondary source classification including infobae.com rule).

**Both-pool with zero EN sources:** Correctly handled. Pack goes live as
ES-only without manufacturing false cross-validation.

---

### Files Produced or Updated

| File | Status | Commit |
|------|--------|--------|
| localbite-san-sebastian-2023-2026.json | Updated — COI markers | 0008a7e |
| localbite-prompt-v7-template.txt | Updated — COI prepend fix | d6361fe |
| localbite-prompt-v71-zaragoza-part1.txt | New | 1eeadbb |
| localbite-prompt-v71-zaragoza.txt | New | 1eeadbb |
| localbite-geocode.js | Updated — Zaragoza bounding box | 1eeadbb |
| localbite-zaragoza-2023-2026.json | New | cd0de1a |
| localbite-zaragoza-audit.txt | New | cd0de1a |
| localbite-zaragoza-search-log.txt | New | cd0de1a |
| localbite-zaragoza-search-plan.txt | New | cd0de1a |
| localbite-index.json | Updated — Zaragoza added, fleet 17 | cd0de1a |
| index.html | Updated — Zaragoza CENTROIDS | cd0de1a |
| localbite-run-metrics.log | Updated — Zaragoza entry | cd0de1a |
| localbite-zaragoza-2023-2026.json | Updated — centroid collisions, writer profiles, article URLs | 372bdb1 |
| index.html | Updated — Zaragoza Centro CENTROIDS | 372bdb1 |
| CLAUDE.md | Updated — Part 1 Preparation section (neighbourhood research + secondary source rules) | 372bdb1 |
| Global instructions | Updated — fleet 17 | (project settings) |

---

### CENTROIDS Architecture — Full Audit and Decision

Post-deployment verification of Zaragoza revealed multiple live rendering
issues: restaurants mapping to Valencia, Málaga area. Investigation confirmed
the root cause is structural — CENTROIDS is a flat unnamespaced dictionary
that breaks whenever neighbourhood names repeat across cities.

**Confirmed live collisions across the fleet:**
- `'Centro'` → Granada: affects Madrid (multiple files use Centro)
- `'Centro Histórico'` → Málaga: affects Córdoba and Seville
- `'Medina'` → Chefchaouen (last write wins): affects Marrakesh and Rabat
- `'San Lorenzo'` → Seville overrides Córdoba (fragile ordering dependency)
- `'Casco Histórico'` → Zaragoza: will affect any future Spanish city
- Zaragoza also had: `'El Rabal'`, `'Goya'`, `'San José'`, `'Centro'`
  all colliding with other city entries

**Zaragoza-specific fixes applied this session:**
- 7 restaurants remapped from `Centro` → `Zaragoza Centro`
- Don Gourmet Oisi assigned to `Las Fuentes` (was null)
- `'Zaragoza Centro': [41.6558, -0.8773]` added to index.html
- Writer profiles cleaned of pipeline internals for all 7 sources
- Article URLs corrected to exact Jina fetch URLs (simplified paths were 404ing)

**Architecture decision made:** Option A — city-keyed nested CENTROIDS
structure. Decision rationale: neighbourhood names are inherently local and
will always repeat at scale. The "distinctive names won't repeat" assumption
was wrong from the start and gets worse as the fleet grows. Option C (prefix
rule) relies on pipeline discipline that we've already seen isn't reliable.
Option A closes the problem permanently.

**Option A deferred to dedicated next session** — too large and risk-laden
to bolt onto the end of this session. Viewer change is low-risk (one line,
backward-compatible), but the CENTROIDS restructure requires a pre-audit
script and city-by-city testing with individual commits. Estimated ~2h 30m.

---

### Outstanding Items

- [ ] **CENTROIDS Option A** — dedicated session, first priority. City-keyed
      nested structure. Pre-audit script first. Viewer one-line change.
      Restructure collision entries city by city. Test full fleet.
- [ ] Zaragoza — verify rendering on live site after this session's fixes
- [ ] Bistró Casa y Tinelo — coordinates outside bounding box, needs nulling
- [ ] Seville Part 1 — needs updating to canonical v7.1 variable names before Seville v2
- [ ] Madrid open_status_check verification — 56 restaurants still pending
- [ ] San Sebastián open_status_check — 23 restaurants still pending
- [ ] Madrid "Irene S." byline — still unresolved
- [ ] Token capture undercounting — session-meta covers only portion of pipeline run
- [ ] Saveur geo-block fallback — Wayback Machine noted as future option
- [ ] Custom Skill /run-pipeline — deferred
- [ ] PostToolUse Hook for JSON validation — deferred

*Fleet: 17 cities live. Last commit: 372bdb1.*


### Post-Journal Addendum — 2026-04-20

Three additional commits landed after the journal was written (9babcf2).
Outstanding items updated accordingly.

**Zaragoza map rendering — further fixes required after journal was written:**

Don Gourmet Oisi was still mapping to the Castelló de la Plana area after
the main session commits. Investigation confirmed two additional omissions:

1. **Zaragoza missing from CITY_CENTRES** — when a restaurant has null
   coordinates and its neighbourhood centroid is also missing, the viewer
   falls back to `CITY_CENTRES[cityName]`. Zaragoza was not in CITY_CENTRES,
   so the fallback was `[40.0, 0.0]` (Atlantic Ocean) with a random offset
   applied — producing the Castelló de la Plana result.

2. **Zaragoza missing from CITY_BOUNDS** — required for the viewer to
   validate and render centroid markers correctly for that city.

3. **Las Fuentes centroid missing** — Don Gourmet Oisi was assigned to
   Las Fuentes but no centroid entry existed for it.

All three fixed and committed. Don Gourmet now renders correctly as a
dashed-border marker in the Las Fuentes area.

**CLAUDE.md Viewer Deployment Checklist updated** — two mandatory steps
added for every new city: add to CITY_CENTRES and add to CITY_BOUNDS.
These were previously undocumented and caused the Zaragoza rendering issues.

| File | Change | Commit |
|------|--------|--------|
| localbite-zaragoza-2023-2026.json | Bistró Casa y Tinelo coords nulled (outside bounding box); Don Gourmet assigned to Las Fuentes | 1516398 |
| index.html | Zaragoza added to CITY_CENTRES; Las Fuentes centroid added | 1516398 |
| index.html | Zaragoza added to CITY_BOUNDS | f6f0bff |
| CLAUDE.md | Viewer Deployment Checklist — CITY_CENTRES and CITY_BOUNDS added as mandatory steps | c39ff3a |

*Corrected last commit: c39ff3a (not 372bdb1 as stated in journal)*

**Outstanding items correction:**
- Bistró Casa y Tinelo — ~~coordinates outside bounding box, needs nulling~~ **RESOLVED c39ff3a**

*Fleet: 17 cities live. Actual last commit: c39ff3a.*


## Session — 2026-04-20 (CENTROIDS architecture fix + Valladolid v7.1 + automation hardening)

### Overview

Full session. Resolved the CENTROIDS architecture problem permanently by moving
centroids into city JSON files. Ran Valladolid as the 18th city and 3rd v7.1
run. Fixed three classes of pipeline reliability issue: schema drift, thin writer
profiles, and field name inconsistency. Produced a full fleet report.

Fleet moves from 17 to 18 cities.

---

### CENTROIDS Architecture Fix

**Problem confirmed:** The flat unnamespaced CENTROIDS dictionary in index.html
causes silent map rendering failures when neighbourhood names repeat across
cities. Four cities confirmed broken at session start:
- Madrid: Centro → Granada [37.1750, -3.5907]
- Seville + Córdoba: Centro Histórico → Málaga
- Marrakesh, Rabat, Fes: Medina → Chefchaouen (last write wins)

**Decision:** Move centroids into each city's JSON file. The global CENTROIDS
block in index.html stays as a legacy fallback for 16 old cities and gradually
empties as cities are rebuilt under v7.1.

**Architecture:**
```json
{
  "city": "Zaragoza",
  "centroids": {
    "Casco Histórico": [41.6528, -0.8799],
    "Goya": [41.6411, -0.8896]
  }
}
```

Viewer lookup (index.html line ~2093) changed from `CENTROIDS[nb]` to:
```js
(currentCityData?.centroids?.[nb]) ? currentCityData.centroids[nb] : CENTROIDS[nb]
```

Backward-compatible — old cities continue using legacy fallback unchanged.

**Components shipped:**
- `localbite-postrun.js` v2.0 → v3.0: writes `centroids_proposed` to city JSON;
  Nominatim fallback for zero-geocoded neighbourhoods
- `localbite-approve-centroids.js` v1.0: interactive approval script — reads
  `centroids_proposed`, accepts/rejects/manual entry, writes to `centroids`
- `localbite-centroids-dryrun.js`: regression test for centroid calculation logic
  (run once, confirmed v2.0 logic correct, then deleted)
- `localbite-zaragoza-migrate-centroids.js`: one-time migration for Zaragoza
  (run once, committed, then deleted)
- Zaragoza JSON: migrated to new architecture with 6 centroid entries

**Dry-run test findings:** Two Zaragoza centroids failed the tolerance check
(El Rabal, Zaragoza Centro) — not a bug. The algorithm averages geocoded
restaurants; manually-set values are district centres. For future regression
tests, tolerance should be ±0.015° not ±0.005°.

**Commits:**
- bd62c2d — viewer centroid lookup (Step A)
- f4ed8d3 — postrun v2.0, approve-centroids, Zaragoza migration, CLAUDE.md

---

### Pipeline Reliability Fixes

**1. Schema validation in postrun.js (Step 1.5)**

Context compaction mid-run caused Valladolid's pipeline to use `author_name`
and `publisher` instead of `writer` and `publication`, and to omit
`language_pool` from all restaurant entries. Schema validation now runs after
geocoding and before centroid calculation. If required fields are missing or
wrong field names used, the script exits with a clear error before any commit.

Required source fields checked: `writer`, `publication`, `article_url`,
`commercial_conflict`, `writer_profile`
Required restaurant fields checked: `name`, `language_pool`, `quote`, `sources`

**2. Field name contract in template**

Added FIELD NAME CONTRACT block to `localbite-prompt-v7-template.txt` at line
836, immediately before the existing FIELD NAME WARNING. Lists exact required
field names for both sources and restaurants. Positioned at the JSON export
point to maximise survival through context compaction.

**3. Writer profile enrichment in postrun.js (Step 2b)**

Pipeline-generated writer profiles are good when context is intact but degrade
or disappear under compaction. Step 2b detects thin or placeholder profiles
(under 80 chars, or matching `"[Name] writes for [Publication]."` pattern) and
regenerates them via the Anthropic API.

- Model: claude-sonnet-4-20250514
- Tokens per profile: ~230 input + output
- Cost per city: ~$0.01 (5-7 sources × $0.0017/profile)
- Requires `ANTHROPIC_API_KEY` from platform.claude.com (separate from
  Claude Max subscription)
- Skips gracefully if API key not set
- Only enriches thin/missing profiles — preserves good pipeline-generated ones

Prompt tightened after Valladolid: enforces English output explicitly,
prohibits biographical speculation, limits to 2-3 sentences derivable from
known fields only.

**Commits:**
- 6e3a3de — postrun v3.0, approve-centroids, Zaragoza migration, CLAUDE.md
- f17bf78 — enrichment prompt tightened (English enforcement + no speculation)
- Template contract: included in 6e3a3de

---

### Valladolid v7.1 — Run Details

**File:** localbite-valladolid-2023-2026.json
**Commits:** 99bbd28 (pipeline), 4d263b1 (source_recency fix), e2c9c99 (schema fix),
            dc627b4 (writer profiles)

| Metric | Value |
|--------|-------|
| Final restaurants | 30 |
| Sources | 5 |
| Both-pool | 0 (EN sources structurally absent) |
| Tier A (multi-source) | 3 (Alquimia Laboratorio, La Parrilla de San Lorenzo, Niza) |
| Tier B | 27 |
| Searches run | 38 (28 planned + 7 supplementary + 3 Phase 1B) |
| Geocoding | 25/30 (3 wrong matches nulled, 5 on centroid) |
| Run time | ~32 min elapsed |
| Tokens | null (context compaction fired at ~15 min) |

**Sources confirmed:**
| Publication | Writer | Language | Type |
|-------------|--------|----------|------|
| Diario de Valladolid | Diego González | ES | Primary |
| Diario de Valladolid | Estela Sánchez | ES | Primary (publisher concentration flagged) |
| Recomiendo Valladolid | Pablo Lázaro | ES | Primary |
| The Objective | Brenda Alonso | ES | Secondary |
| El Español (Cocinillas) | Adriana Calvo | ES | Secondary |

**Structural findings:**
- EN primary sources structurally absent — 9+ EN searches, 0 qualifying results
- Diario de Valladolid publisher concentration (2 articles) — 2 supplementary
  searches found no alternative. Retained with documentation.
- 3 concentration cap removals: La Mafia, Pide Por Esa Boquita, Brook Steakburguer
- Dámaso excluded — located in Arroyo de la Encomienda municipality

**Post-run fixes required (all resolved before commit):**
1. Schema drift — `author_name`/`publisher` → `writer`/`publication`;
   `language_pool` missing from all restaurants
2. Writer profiles all placeholder — enriched via API (first production use)
3. `source_recency` set to article date ("2025-11-29") instead of year range
   ("2023-2026") — fixed manually
4. 3 wrong geocoding matches nulled

**CITY_CENTRES and CITY_BOUNDS:** Added automatically by Claude Code pipeline
(first run where CLAUDE.md checklist was enforced by Claude Code). No manual
index.html edits required for these.

---

### Neighbourhood Research — Valladolid

Research confirmed: Valladolid's 12 official administrative districts are
purely electoral and not used by locals or food writers. Social barrios are
the relevant unit. Dining scene concentrated in historic centre with secondary
scenes in Las Delicias, Caño Argales, Rondilla, La Victoria.

Generic names prefixed per naming convention: Valladolid Centro, Valladolid
Delicias, Valladolid La Victoria — prevents future centroid collisions.

---

### Token Capture — Outstanding Issue

All three v7.1 runs (San Sebastián, Zaragoza, Valladolid) show null token
counts in `localbite-run-metrics.log`. Root cause: context compaction fires
mid-run, starting a new context window. The metrics node command at the end
reads session metadata from the current window only — missing all tokens from
the first window.

This is not fixable by changing the node command. The correct fix is to
replace session metadata with derived metrics:
- Tool uses: count lines in search log (already tracked)
- Run time: file timestamps (search log created at start, final JSON at end)
- Token counts: genuinely unavailable for compacting runs without the API
  usage endpoint — accept this gap or use the Anthropic usage dashboard

**Outstanding:** Implement tool-use count and run time from file timestamps
in the metrics node command. Token counts remain unavailable for compacting
runs — document as known limitation.

---

### Fleet Report Produced

Full fleet report covering all 18 cities with pipeline status, geocoding,
both-pool counts, active collisions, and rebuild priority order.

Delivered as:
- Interactive dashboard (React widget in session)
- PDF: `localbite-fleet-report-2026-04-20.pdf`
- Markdown: `localbite-fleet-report-2026-04-20.md`

---

### Key Decisions

**CENTROIDS in city JSON, not index.html** — permanent fix. Old cities
continue via legacy fallback until rebuilt.

**Phase 1 pause retained for now** — after 3 clean runs, the case for
removing it is strengthening. Test with `PHASE1_PAUSE: NO` on a
well-documented city in the next session.

**API credits for writer enrichment** — $5 of API credits purchased at
platform.claude.com. Covers ~500 city runs at ~$0.01 each.

**Schema validation is now the primary defence against compaction drift** —
the template contract reduces frequency, postrun.js validation catches it
before commit regardless.

---

### Proposal for Next Session — Full Automation

Target: reduce active human time per city to ~5 minutes.

1. **CITY_CENTRES + CITY_BOUNDS auto-add in postrun.js** (15 min) — already
   reads CITY_BOXES from localbite-geocode.js; use same data to auto-add
   index.html entries instead of reminding human to do it manually.

2. **Phase 1 pause test** (run time) — try `PHASE1_PAUSE: NO` on a
   well-documented city. If source list is wrong, schema validation catches it.

3. **Token capture from file timestamps** (45 min) — replace session metadata
   with search log line count (tool uses) and file timestamp delta (run time).

4. **One new city run to validate full automated flow** (~90 min elapsed).

Post next session, the only remaining human touchpoint will be the centroid
approval step (~2 min per city).

---

### Files Produced or Updated

| File | Status | Commit |
|------|--------|--------|
| index.html | Updated — centroid lookup + Valladolid CITY_CENTRES/BOUNDS | bd62c2d, 99bbd28 |
| localbite-postrun.js | Updated — v3.0 | 6e3a3de, f17bf78 |
| localbite-approve-centroids.js | New | 6e3a3de |
| localbite-prompt-v7-template.txt | Updated — field name contract | 6e3a3de |
| localbite-zaragoza-2023-2026.json | Updated — centroid migration | f4ed8d3 |
| localbite-prompt-v71-valladolid-part1.txt | New | b78e1ea |
| localbite-prompt-v71-valladolid.txt | New | b78e1ea |
| localbite-geocode.js | Updated — Valladolid bounding box | b78e1ea |
| localbite-valladolid-2023-2026.json | New — schema fixed, profiles enriched | 99bbd28, 4d263b1, e2c9c99, dc627b4 |
| localbite-valladolid-raw.json | New | 99bbd28 |
| localbite-valladolid-audit.txt | New | 99bbd28 |
| localbite-valladolid-search-log.txt | New | 99bbd28 |
| localbite-valladolid-search-plan.txt | New | 99bbd28 |
| localbite-index.json | Updated — Valladolid added, fleet 18 | 99bbd28 |
| localbite-run-metrics.log | Updated — Valladolid entry | 99bbd28 |
| localbite-journal-updated.md | Updated | 47513a9 + this entry |
| localbite-fleet-report-2026-04-20.md | New | (not committed — reference doc) |
| Global instructions | Updated — fleet 18 | (project settings) |

---

### Outstanding Items

- [ ] **Full automation — next session priority** (see proposal above)
  - Auto-add CITY_CENTRES + CITY_BOUNDS in postrun.js
  - Test Phase 1 pause removal on a well-documented city
  - Fix token capture using file timestamps
- [ ] **Token capture** — null for all v7.1 runs due to compaction. Fix via
      file timestamps in next session.
- [ ] **16 old cities with active collisions** — accepted, resolve at rebuild time:
      Madrid (Centro → Granada), Seville + Córdoba (Centro Histórico → Málaga),
      Marrakesh + Rabat + Fes (Medina → Chefchaouen)
- [ ] **Writer profile enrichment prompt** — Estela Sánchez profile may still
      be slightly long. Acceptable for now.
- [ ] **source_recency convention** — pipeline sets it to the most recent article
      date; should be YEAR_RANGE. Add explicit instruction to template.
- [ ] **Madrid open_status_check** — 56 restaurants pending. No verification
      workflow agreed.
- [ ] **San Sebastián open_status_check** — 23 restaurants pending.
- [ ] **Madrid "Irene S." byline** — unresolved.
- [ ] **Saveur geo-block fallback** — Wayback Machine noted as future option.
- [ ] **Seville Part 1** — needs v7.1 variable name update before Seville v2.
- [ ] **React migration** — at 2,215 lines, 285 from trigger.

*Fleet: 18 cities live. Last commit: f17bf78.*


---

## Session — 2026-04-21 (Full automation pipeline — Santiago de Compostela, Murcia; infrastructure fixes)

### Overview

Long session focused on two goals: getting the pipeline to truly unattended execution, and understanding what it would take to make it fully automated end-to-end. Three cities were added (Alicante, Santiago de Compostela, Murcia), making 21 cities live. The Murcia run was the cleanest unattended run to date — all article_urls set correctly, source_recency correct, CITY_CENTRES and CITY_BOUNDS added automatically by the pipeline itself. Multiple infrastructure fixes were committed. A comprehensive automation gap analysis was completed and a plan for the next session was produced.

---

### Pipeline Launch Method — Validated

After failed attempts with piped stdin and Claude Code reading the prompt interactively, the correct launch method was established and validated on both Santiago de Compostela and Murcia:

1. Open a fresh terminal tab
2. `cd /Users/harryenchin/Documents/GitHub/localbite`
3. `claude --dangerously-skip-permissions`
4. At the `❯` prompt, type: `Read localbite-prompt-v71-[city]-part1.txt and localbite-prompt-v7-template.txt and run the full pipeline now.`

Piping via stdin (`< localbite-prompt-v71-[city].txt`) causes Claude Code to display the prompt and ask "what do you want to do?" rather than executing it. The typed-instruction method works reliably. CLAUDE.md updated and committed with this documentation.

The earlier attempt also revealed that CLAUDE.md's warning about subprocess launching was too strongly worded — Claude Code read it and refused to run the pipeline entirely. The warning was removed and replaced with correct launch documentation.

---

### Infrastructure Fixes Committed

All fixes committed in sequence throughout the session. Final commit: fe4a061.

**localbite-geocode.js (v8.1 → v8.2):**
- Case-insensitive CITY_BOXES lookup — fixed "Santiago De Compostela" vs "Santiago de Compostela" mismatch that caused geocoder to fail with no bounding box error
- Removed duplicate "Santiago De Compostela" entry (both title-case and lowercase were present after the fix)
- Added Murcia bounding box (expanded to cover El Palmar at latMin 37.91)
- Added Santiago de Compostela bounding box

**localbite-postrun.js (v3.0 → v3.1):**
- article_url removed from REQUIRED_SOURCE_FIELDS (blocking) and replaced with a non-blocking warning that names each affected source — cannot be auto-repaired since postrun.js doesn't know the URLs
- article_url null check added — presence check was insufficient; now also checks for null/empty value
- source_id → id normalisation added to auto-repair (Step 1.5) — pipeline sometimes writes source_id instead of id
- source_recency empty string validation — isEmpty condition added to catch empty strings and null values, not just malformed date strings

**index.html (viewer):**
- Source ↗ link hidden when article_url is null — previously rendered with href="#" causing navigation to Barcelona (the first city loaded)
- currentSources indexes by `s.id || s.source_id` — handles both field name variants across old and new pipeline output
- source_recency shown dynamically from data.source_recency in hero meta

**CLAUDE.md:**
- Pipeline launch warning removed (was blocking Claude Code from running)
- Correct launch method documented with exact typed instruction

**~/.zshrc:**
- ANTHROPIC_API_KEY added permanently — available in all login shell sessions without manual export

---

### City Runs

**Alicante (19th city) — 2026-04-21**
- File: localbite-alicante-2023-2026.json
- 9 restaurants, 7 sources, 1 both-pool (Nou Manolín: ES+EN)
- Issues encountered: subprocess launch failure on first attempt, schema drift (auto-repair fixed), city_slug missing country suffix (auto-corrected), source_id vs id mismatch (fixed), article_url null (added manually), La Barra del Gourmet wrong geocode (nulled + geo_skip)
- Thin pack — EN coverage structurally limited in Alicante

**Santiago de Compostela (20th city) — 2026-04-21**
- File: localbite-santiago-2023-2026.json
- 27 restaurants, 6 sources, 3 both-pool (Lume, Abastos 2.0, A Maceta)
- PHASE1_AUTO_PROCEED confirmed working: `[unattended-mode] Phase 1 auto-proceeding to Phase 2`
- Issues: geocoder case mismatch (fixed — triggered the geocode.js case-insensitive fix), source_recency empty string (manual fix), article_url null (added manually from Jina fetch URLs), source_id → id mismatch (manual fix then added to auto-repair)
- Sources: El Correo Gallego (Sergio Romero), GastroSantiago/El Español (Beatriz Castro), The Objective (Brenda Alonso), Camino Insider Guide (Christian W. Bauer, ⚠ coi), Oladaniela (Daniela Sunde-Brown), NatGeo España (Lucía Díaz Madurga)
- Multiple post-pipeline commits required to fix data issues

**Murcia (21st city) — 2026-04-21 — Cleanest unattended run**
- File: localbite-murcia-2023-2026.json
- 10 restaurants, 5 sources (9 source entries — Murcialist contributed 5 article-level entries), 0 both-pool
- EN primary gap documented as structural — all EN candidates examined and rejected for valid reasons (wrong date range, COI, no named author, outside scope)
- Pipeline auto-added CITY_CENTRES, CITY_BOUNDS, index.json — no postrun.js action needed for these
- article_url: all 9 sources set correctly by the pipeline without any manual fix
- source_recency: "2023-2026" correct without manual fix
- city_slug: "murcia-spain" correct
- Only manual steps: 4 wrong geocoding matches nulled + geo_skip (Local de Ensayo, Mapa, Federal Café, Pepe Juan)
- Sources: Miguel Ángel Torralba (The Murcialist, 5 articles), Concha Alcántara (The Gastro Times), José Carlos Capel (Gastroactitud), Lucía Díaz Madurga (NatGeo Viajes), Marina Vega (Guía Repsol)
- Pipeline also auto-expanded Murcia CITY_BOXES bounding box to cover El Palmar (Cabaña Buenavista, 2 Michelin stars)

---

### Automation Gap Analysis

A comprehensive review of all issues blocking full automation was completed. Ranked by impact:

| Issue | Blocks full automation | Fix complexity | Priority |
|-------|----------------------|----------------|----------|
| Wrong geocoding requires human review | YES — every run | Medium — fuzzy name matching | High |
| article_url lost under compaction | SOMETIMES — unpredictable | Hard — compaction is Claude Code behaviour | High |
| Centroid approval is interactive | YES — every run | Low — add --auto-accept flag | High |
| Pipeline launch is multi-step | YES | Medium — expect/pexpect script | Medium |
| source_recency edge cases | SOMETIMES | Low — already partially fixed | Medium |
| API key not in all shell contexts | SOMETIMES | Low — .env file in repo | Low |
| Git commit/push is manual | YES — deliberate | Low — deliberate human checkpoint | Low |
| No automated viewer smoke test | Not blocking but risky | Medium | Low |

After fixes planned for next session, per-city human time should drop from ~25 minutes to under 10 minutes. The remaining human steps will be: review 1–2 ambiguous geocoding cases, run git commit.

---

### Key Decisions

- **Pipeline launch method confirmed:** Open Claude Code without pipe, type the read instruction at the prompt. Validated on Santiago and Murcia. Documented in CLAUDE.md.
- **article_url is a non-blocking warning:** Cannot be auto-repaired by postrun.js. Source ↗ links hidden in viewer when null. Pipeline must write it during Phase 2.
- **source_id → id auto-repair added:** postrun.js Step 1.5 now normalises both field name variants.
- **Geocoder case-insensitive lookup:** CITY_BOXES lookup now case-insensitive. Eliminates title-case city name mismatches.
- **Murcia EN gap is structural:** Not a pipeline failure — genuinely underserved by English-language food writing. Documented and accepted.
- **Murcia sources_confirmed metric is inflated:** Metrics show 9 source entries but only 5 unique publishers (The Murcialist contributed 5 article-level entries). Metric counts entries not publishers.
- **Raw JSON bug accepted for now:** Pipeline writes copy of final.json as raw.json instead of pre-removal working file. Fix planned for next session.
- **Metrics null for all compacting runs:** Placeholder substitution bug in metrics node command. Fix planned for next session.
- **Both fixes to CLAUDE.md:** Launch warning removed; correct launch method documented.

---

### Files Produced or Updated

| File | Status | Notes |
|------|--------|-------|
| localbite-alicante-2023-2026.json | New | 9R, 1BP, 7 sources |
| localbite-santiago-2023-2026.json | New | 27R, 3BP, 6 sources |
| localbite-murcia-2023-2026.json | New | 10R, 0BP, 5 sources |
| localbite-geocode.js | Updated | Case-insensitive lookup, new bounding boxes, duplicate removed |
| localbite-postrun.js | Updated | article_url warning, source_id→id, source_recency fixes |
| index.html | Updated | Viewer null article_url fix, currentSources fallback, 2228 lines |
| localbite-index.json | Updated | 21 cities |
| CLAUDE.md | Updated | Launch method corrected |
| ~/.zshrc | Updated | ANTHROPIC_API_KEY persisted |
| localbite-prompt-v71-alicante-part1.txt | New | |
| localbite-prompt-v71-alicante.txt | New | |
| localbite-prompt-v71-santiago-part1.txt | New | |
| localbite-prompt-v71-santiago.txt | New | |
| localbite-prompt-v71-murcia-part1.txt | New | |
| localbite-prompt-v71-murcia.txt | New | |
| localbite-alicante-search-log.txt | New | |
| localbite-alicante-search-plan.txt | New | |
| localbite-alicante-raw.json | New | |
| localbite-alicante-audit.txt | New | |
| localbite-santiago-search-log.txt | New | |
| localbite-santiago-search-plan.txt | New | |
| localbite-santiago-raw.json | New | |
| localbite-santiago-audit.txt | New | |
| localbite-murcia-search-log.txt | New | |
| localbite-murcia-search-plan.txt | New | |
| localbite-murcia-raw.json | New | Copy of final — raw JSON bug outstanding |
| localbite-run-metrics.log | Updated | Entries for all three cities — all null except searches_run |
| localbite-journal-updated.md | Updated | This entry |

Final commit: ea531c7 (Murcia docs)
Post-session fixes commit: fe4a061 (automation gap fixes)

---

### Outstanding Items

- [ ] Fix metrics placeholder substitution bug — [OUTPUT_SEARCH_LOG] and [OUTPUT_FINAL] not substituted before metrics node command runs
- [ ] Fix raw JSON output — should save pre-removal Tier C entries, not copy of final JSON
- [ ] Add --auto-accept flag to localbite-approve-centroids.js
- [ ] Add geocoding auto-null: entity blocklist + word-overlap check in localbite-geocode.js
- [ ] Add article_url recovery from search log in postrun.js Step 1.7
- [ ] Verify source_recency empty string condition with unit test
- [ ] Add .env file for ANTHROPIC_API_KEY (available in all shell contexts)
- [ ] Run Pamplona v7.1 as validation test of automation fixes
- [ ] Madrid: 56 open_status_check pending; Centro → Granada centroid collision active
- [ ] 7 cities with centroid collisions — accepted, resolve at rebuild time
- [ ] 13 cities on old pipeline (pre-v7.1) — rebuild at natural trigger

---

*Fleet: 21 cities, 575+ restaurants, 8 on v7.1, index.html 2,228 lines (trigger 2,500)*


---

## Session — 2026-04-21 (Full automation pipeline — Santiago de Compostela, Murcia; infrastructure fixes)

### Overview

Long session focused on two goals: getting the pipeline to truly unattended execution, and understanding what it would take to make it fully automated end-to-end. Three cities were added (Alicante, Santiago de Compostela, Murcia), making 21 cities live. The Murcia run was the cleanest unattended run to date — all article_urls set correctly, source_recency correct, CITY_CENTRES and CITY_BOUNDS added automatically by the pipeline itself. Multiple infrastructure fixes were committed. A comprehensive automation gap analysis was completed and a plan for the next session was produced.

---

### Pipeline Launch Method — Validated

After failed attempts with piped stdin and Claude Code reading the prompt interactively, the correct launch method was established and validated on both Santiago de Compostela and Murcia:

1. Open a fresh terminal tab
2. `cd /Users/harryenchin/Documents/GitHub/localbite`
3. `claude --dangerously-skip-permissions`
4. At the `❯` prompt, type: `Read localbite-prompt-v71-[city]-part1.txt and localbite-prompt-v7-template.txt and run the full pipeline now.`

Piping via stdin (`< localbite-prompt-v71-[city].txt`) causes Claude Code to display the prompt and ask "what do you want to do?" rather than executing it. The typed-instruction method works reliably. CLAUDE.md updated and committed with this documentation.

The earlier attempt also revealed that CLAUDE.md's warning about subprocess launching was too strongly worded — Claude Code read it and refused to run the pipeline entirely. The warning was removed and replaced with correct launch documentation.

---

### Infrastructure Fixes Committed

All fixes committed in sequence throughout the session. Final commit: fe4a061.

**localbite-geocode.js (v8.1 → v8.2):**
- Case-insensitive CITY_BOXES lookup — fixed "Santiago De Compostela" vs "Santiago de Compostela" mismatch that caused geocoder to fail with no bounding box error
- Removed duplicate "Santiago De Compostela" entry (both title-case and lowercase were present after the fix)
- Added Murcia bounding box (expanded to cover El Palmar at latMin 37.91)
- Added Santiago de Compostela bounding box

**localbite-postrun.js (v3.0 → v3.1):**
- article_url removed from REQUIRED_SOURCE_FIELDS (blocking) and replaced with a non-blocking warning that names each affected source — cannot be auto-repaired since postrun.js doesn't know the URLs
- article_url null check added — presence check was insufficient; now also checks for null/empty value
- source_id → id normalisation added to auto-repair (Step 1.5) — pipeline sometimes writes source_id instead of id
- source_recency empty string validation — isEmpty condition added to catch empty strings and null values, not just malformed date strings

**index.html (viewer):**
- Source ↗ link hidden when article_url is null — previously rendered with href="#" causing navigation to Barcelona (the first city loaded)
- currentSources indexes by `s.id || s.source_id` — handles both field name variants across old and new pipeline output
- source_recency shown dynamically from data.source_recency in hero meta

**CLAUDE.md:**
- Pipeline launch warning removed (was blocking Claude Code from running)
- Correct launch method documented with exact typed instruction

**~/.zshrc:**
- ANTHROPIC_API_KEY added permanently — available in all login shell sessions without manual export

---

### City Runs

**Alicante (19th city) — 2026-04-21**
- File: localbite-alicante-2023-2026.json
- 9 restaurants, 7 sources, 1 both-pool (Nou Manolín: ES+EN)
- Issues encountered: subprocess launch failure on first attempt, schema drift (auto-repair fixed), city_slug missing country suffix (auto-corrected), source_id vs id mismatch (fixed), article_url null (added manually), La Barra del Gourmet wrong geocode (nulled + geo_skip)
- Thin pack — EN coverage structurally limited in Alicante

**Santiago de Compostela (20th city) — 2026-04-21**
- File: localbite-santiago-2023-2026.json
- 27 restaurants, 6 sources, 3 both-pool (Lume, Abastos 2.0, A Maceta)
- PHASE1_AUTO_PROCEED confirmed working: `[unattended-mode] Phase 1 auto-proceeding to Phase 2`
- Issues: geocoder case mismatch (fixed — triggered the geocode.js case-insensitive fix), source_recency empty string (manual fix), article_url null (added manually from Jina fetch URLs), source_id → id mismatch (manual fix then added to auto-repair)
- Sources: El Correo Gallego (Sergio Romero), GastroSantiago/El Español (Beatriz Castro), The Objective (Brenda Alonso), Camino Insider Guide (Christian W. Bauer, ⚠ coi), Oladaniela (Daniela Sunde-Brown), NatGeo España (Lucía Díaz Madurga)
- Multiple post-pipeline commits required to fix data issues

**Murcia (21st city) — 2026-04-21 — Cleanest unattended run**
- File: localbite-murcia-2023-2026.json
- 10 restaurants, 5 sources (9 source entries — Murcialist contributed 5 article-level entries), 0 both-pool
- EN primary gap documented as structural — all EN candidates examined and rejected for valid reasons (wrong date range, COI, no named author, outside scope)
- Pipeline auto-added CITY_CENTRES, CITY_BOUNDS, index.json — no postrun.js action needed for these
- article_url: all 9 sources set correctly by the pipeline without any manual fix
- source_recency: "2023-2026" correct without manual fix
- city_slug: "murcia-spain" correct
- Only manual steps: 4 wrong geocoding matches nulled + geo_skip (Local de Ensayo, Mapa, Federal Café, Pepe Juan)
- Sources: Miguel Ángel Torralba (The Murcialist, 5 articles), Concha Alcántara (The Gastro Times), José Carlos Capel (Gastroactitud), Lucía Díaz Madurga (NatGeo Viajes), Marina Vega (Guía Repsol)
- Pipeline also auto-expanded Murcia CITY_BOXES bounding box to cover El Palmar (Cabaña Buenavista, 2 Michelin stars)

---

### Automation Gap Analysis

A comprehensive review of all issues blocking full automation was completed. Ranked by impact:

| Issue | Blocks full automation | Fix complexity | Priority |
|-------|----------------------|----------------|----------|
| Wrong geocoding requires human review | YES — every run | Medium — fuzzy name matching | High |
| article_url lost under compaction | SOMETIMES — unpredictable | Hard — compaction is Claude Code behaviour | High |
| Centroid approval is interactive | YES — every run | Low — add --auto-accept flag | High |
| Pipeline launch is multi-step | YES | Medium — expect/pexpect script | Medium |
| source_recency edge cases | SOMETIMES | Low — already partially fixed | Medium |
| API key not in all shell contexts | SOMETIMES | Low — .env file in repo | Low |
| Git commit/push is manual | YES — deliberate | Low — deliberate human checkpoint | Low |
| No automated viewer smoke test | Not blocking but risky | Medium | Low |

After fixes planned for next session, per-city human time should drop from ~25 minutes to under 10 minutes. The remaining human steps will be: review 1–2 ambiguous geocoding cases, run git commit.

---

### Key Decisions

- **Pipeline launch method confirmed:** Open Claude Code without pipe, type the read instruction at the prompt. Validated on Santiago and Murcia. Documented in CLAUDE.md.
- **article_url is a non-blocking warning:** Cannot be auto-repaired by postrun.js. Source ↗ links hidden in viewer when null. Pipeline must write it during Phase 2.
- **source_id → id auto-repair added:** postrun.js Step 1.5 now normalises both field name variants.
- **Geocoder case-insensitive lookup:** CITY_BOXES lookup now case-insensitive. Eliminates title-case city name mismatches.
- **Murcia EN gap is structural:** Not a pipeline failure — genuinely underserved by English-language food writing. Documented and accepted.
- **Murcia sources_confirmed metric is inflated:** Metrics show 9 source entries but only 5 unique publishers (The Murcialist contributed 5 article-level entries). Metric counts entries not publishers.
- **Raw JSON bug accepted for now:** Pipeline writes copy of final.json as raw.json instead of pre-removal working file. Fix planned for next session.
- **Metrics null for all compacting runs:** Placeholder substitution bug in metrics node command. Fix planned for next session.
- **Both fixes to CLAUDE.md:** Launch warning removed; correct launch method documented.

---

### Files Produced or Updated

| File | Status | Notes |
|------|--------|-------|
| localbite-alicante-2023-2026.json | New | 9R, 1BP, 7 sources |
| localbite-santiago-2023-2026.json | New | 27R, 3BP, 6 sources |
| localbite-murcia-2023-2026.json | New | 10R, 0BP, 5 sources |
| localbite-geocode.js | Updated | Case-insensitive lookup, new bounding boxes, duplicate removed |
| localbite-postrun.js | Updated | article_url warning, source_id→id, source_recency fixes |
| index.html | Updated | Viewer null article_url fix, currentSources fallback, 2228 lines |
| localbite-index.json | Updated | 21 cities |
| CLAUDE.md | Updated | Launch method corrected |
| ~/.zshrc | Updated | ANTHROPIC_API_KEY persisted |
| localbite-prompt-v71-alicante-part1.txt | New | |
| localbite-prompt-v71-alicante.txt | New | |
| localbite-prompt-v71-santiago-part1.txt | New | |
| localbite-prompt-v71-santiago.txt | New | |
| localbite-prompt-v71-murcia-part1.txt | New | |
| localbite-prompt-v71-murcia.txt | New | |
| localbite-alicante-search-log.txt | New | |
| localbite-alicante-search-plan.txt | New | |
| localbite-alicante-raw.json | New | |
| localbite-alicante-audit.txt | New | |
| localbite-santiago-search-log.txt | New | |
| localbite-santiago-search-plan.txt | New | |
| localbite-santiago-raw.json | New | |
| localbite-santiago-audit.txt | New | |
| localbite-murcia-search-log.txt | New | |
| localbite-murcia-search-plan.txt | New | |
| localbite-murcia-raw.json | New | Copy of final — raw JSON bug outstanding |
| localbite-run-metrics.log | Updated | Entries for all three cities — all null except searches_run |
| localbite-journal-updated.md | Updated | This entry |

Final commit: ea531c7 (Murcia docs)
Post-session fixes commit: fe4a061 (automation gap fixes)

---

### Outstanding Items

- [ ] Fix metrics placeholder substitution bug — [OUTPUT_SEARCH_LOG] and [OUTPUT_FINAL] not substituted before metrics node command runs
- [ ] Fix raw JSON output — should save pre-removal Tier C entries, not copy of final JSON
- [ ] Add --auto-accept flag to localbite-approve-centroids.js
- [ ] Add geocoding auto-null: entity blocklist + word-overlap check in localbite-geocode.js
- [ ] Add article_url recovery from search log in postrun.js Step 1.7
- [ ] Verify source_recency empty string condition with unit test
- [ ] Add .env file for ANTHROPIC_API_KEY (available in all shell contexts)
- [ ] Run Pamplona v7.1 as validation test of automation fixes
- [ ] Madrid: 56 open_status_check pending; Centro → Granada centroid collision active
- [ ] 7 cities with centroid collisions — accepted, resolve at rebuild time
- [ ] 13 cities on old pipeline (pre-v7.1) — rebuild at natural trigger

---

*Fleet: 21 cities, 575+ restaurants, 8 on v7.1, index.html 2,228 lines (trigger 2,500)*



## Session — 2026-04-22 (Infrastructure Fixes + Pamplona + Logroño + Batch Architecture Analysis)

### Overview

Long session covering two new city runs (Pamplona as 22nd city, Logroño as 23rd), a comprehensive set of infrastructure fixes to postrun.js, geocode.js, and approve-centroids.js, a full fleet audit against actual JSON files, and a deep analysis of batch pipeline architecture including the Nominatim/Photon rate limit blockers. Session also produced updated global instructions and CLAUDE.md.

---

### Two New Cities Added

**Pamplona, Spain — 22nd city**
- 24 restaurants, 4 sources, 1 both-pool (Chez Belagua: Navarra Capital ES + EN secondary)
- Sources: Navarra Capital ×2 (Oihane Ochoa), The Objective (Brenda Alonso), Tapas Magazine (Paco Cruz)
- 54% geocoding rate — structural, many pintxos bars too new or informal for OSM
- 6 neighbourhood centroids approved: San Jorge, Casco Antiguo, San Juan, Iturrama, Ensanche, Milagrosa
- EN primary pool structurally absent — 8+ queries, zero qualifying EN primary sources found
- Publisher concentration: navarracapital.es ×2 (same author Oihane Ochoa) — documented as structural characteristic
- Session interrupted and resumed across two contexts — Pamplona self-committed at 294dc37 before postrun; postrun re-committed correct version at 96a0ead
- Commits: 294dc37 (pipeline self-commit, wrong — no geocoding), 96a0ead (postrun), 1d50b60 (fixes)

**Logroño, Spain — 23rd city**
- 15 restaurants, 6 sources, 1 both-pool (Bar El Muro: Guía Repsol ES + Devour Tours EN)
- Sources: Guía Repsol (Otilia Anes da Veiga), The Sauce Mag (Charlie Brown), Devour Tours (David Farley ⚠ coi), Gastroactitud (José Carlos Capel), NueveCuatroUno ×2 (Sergio Moreno + Teresa Pérez de Azpillaga)
- 80% geocoding rate — 11 Nominatim, 1 Photon (Bar San Lorenzo → "Bar Lorenzo Tio Agus"), 3 not found
- 1 neighbourhood centroid: Casco Antiguo [42.4656, -2.4489] — averaged from 12 geocoded restaurants
- COI flagged: Devour Tours operates food tours in Logroño — commercial conflict documented
- STEP 5.5 city matching failed: pipeline wrote "logrono", matcher expected "logrono-spain" — fix pending
- Casco Antiguo centroid approved in JSON but NOT added to index.html — naming collision with Seville's existing entry
- Commits: 8eca28b (data), 5d30596 (docs)

---

### Infrastructure Fixes Committed This Session

**postrun.js v3.0 → v3.2**

STEP 5 — neighbourhood centroids auto-add to index.html CENTROIDS object (new)
- Reads approved centroids from data.centroids
- Inserts entries that don't already exist in CENTROIDS
- Currently blocked by naming collision for cities sharing neighbourhood names
- Tested on Pamplona: correctly detected all 6 centroids already present

STEP 5.5 — metrics capture from file timestamps and search log (new)
- run_time_seconds: search log birthtime → search log mtime (pipeline start → end)
- tool_uses: search log line count
- Updates existing metrics log entry for today's city
- Bug: city matching fails when pipeline writes plain city name vs city_slug format

geo_skip for not-found restaurants (new in geocode.js)
- After both Nominatim and Photon fail, sets geo_skip: true automatically
- Prevents wasted re-geocoding on subsequent postrun runs

--auto-accept default in next-steps message (fixed)
- postrun.js next-steps now shows correct flag

Counter bug fixed in approve-centroids (fixed)
- "Approved: N new centroid(s)" now correctly counts centroids from current run only
- Was comparing total approved count against existing centroids — always showed wrong number

approve-centroids next-steps corrected (fixed)
- Now shows correct git commands instead of obsolete "Verify CITY_CENTRES/BOUNDS" instructions

run_time calculation corrected (fixed)
- Was using JSON file mtime as end time — corrupted by re-runs
- Now uses search log mtime — search log is written during pipeline only, never by postrun

No-git instruction added to template (weak fix)
- Added explicit "DO NOT run git commands" instruction to pipeline template
- Acknowledged as weak: compaction may ignore it. Postrun commits are canonical.

**geocode.js v8.1**
- geo_skip auto-set for not-found restaurants after first postrun
- Logroño bounding box added (both 'Logrono' and 'Logroño' variants)
- Case-insensitive CITY_BOXES lookup previously fixed (2026-04-21)

**localbite-approve-centroids.js**
- Counter bug fixed
- --auto-accept flag now standard and documented

**index.html viewer**
- isHighConfidence() updated: medium confidence with geo_matched_name → solid pin
- Medium confidence with null geo_matched_name stays hollow pin
- Rationale: medium confidence with a named match has real coordinates; medium with no match has unvalidated Photon coordinates

**CLAUDE.md**
- Updated post-pipeline checklist with all new steps
- CENTROIDS naming collision documented with grep command
- approve-centroids never chain with git — explicit warning
- Redirect pattern for postrun output documented
- No-git warning added
- Part 1 preparation sections restored (accidentally dropped in first update, corrected in second commit)

**~/.zshrc**
- setopt nohistexpand added — kills ! history expansion permanently

**.env**
- ANTHROPIC_API_KEY persisted

---

### Key Decisions Made

**CENTROIDS naming collision is an open architectural issue — not deferred, blocking**
The CENTROIDS object uses bare neighbourhood names as keys. Multiple cities share names (Casco Antiguo, Ensanche, Medina etc). Silent data corruption occurs when a new city's centroid overwrites an existing entry. Logroño's Casco Antiguo centroid could not be added because Seville's entry uses the same key. Fix requires city-qualified keys (e.g. 'logrono-spain:Casco Antiguo') throughout CENTROIDS, viewer lookup logic, postrun STEP 5, approve-centroids, and all city JSON files. This is the highest-priority architectural fix before any batch run.

**Medium confidence with named match → solid pin**
Investigated 68 medium confidence entries across the fleet. Seville's 19 entries all have null geo_matched_name — Photon returned coordinates with zero name validation. These correctly stay hollow. All v7.1 city medium confidence matches have plausible named matches and correctly show solid pins. Barcelona has 4+ clearly wrong medium confidence matches (Âme→Hotel América etc) — these will be fixed at rebuild since old pipeline cities are being rebuilt anyway.

**Self-hosted Nominatim/Photon: deferred**
Analysed the batch throughput constraint thoroughly. Nominatim and Photon public APIs both have ~1 req/sec rate limits, making parallel postrun impossible. Self-hosted alternatives (Docker + Spain PBF for Nominatim, built from Nominatim database for Photon) would eliminate this constraint but the throughput gain (~2 extra cities per 3-hour session) doesn't justify the ~27GB disk + 4–8 hour one-time setup at current fleet size. Revisit at 50+ cities or if ToS block occurs.

**Claude Code sessions share rate limits — confirmed**
Research confirmed: all Claude Code instances on the same account share a rate limit pool. Each instance has its own independent context window but rate limits are pooled. Max 5x gives sufficient headroom for 2–3 concurrent Sonnet sessions. Practical batch approach: 2 parallel pipelines with 20-minute stagger for Phase 1, sequential postrun.

**Batch pipeline architecture defined**
- Max 2–3 simultaneous Claude Code sessions (Max 5x rate limit pool)
- 20-minute stagger between pipeline launches
- postrun strictly sequential (Nominatim ToS)
- T1/T2/T3/T4 terminal assignment fixed — never run postrun from monitoring terminal
- Expected throughput without self-hosted geocoders: 4–6 cities per 3-hour session with 2–3 parallel pipelines

**Fleet audit revealed multiple errors in global instructions**
Running the fleet script against actual JSON files revealed significant discrepancies:
- Barcelona: 86R/10BP (was 78/14 in instructions)
- Lisbon: 48R/1BP (was 63/23 — major error, likely wrong file referenced)
- San Sebastián: 24R (was 30)
- Chefchaouen: 12R (was 17)
- Bilbao: v7 not v7.1
- Seville: v7 not "old"
- Porto: all metadata null — schema corruption, provenance unknown
- Madrid: JSON not found by fleet script — filename pattern mismatch, investigate
All corrections incorporated into updated global instructions.

**The Claude Insights parallel orchestration proposal: not yet**
Assessed the proposal for coordinator agent + Task tool + parallel subagents. Architecturally sound but overstates throughput ("10 cities in time of 1"), glosses over Nominatim constraint, has race condition in shared metrics.jsonl, and requires significant engineering. Recommended phased approach: fix outstanding issues first, validate 2-city parallel runs, then consider automation. Not this session.

---

### False Start Analysis — Session Learning

Multiple fix scripts required v2/v3 rewrites due to:
1. Scripts written before reading exact target strings from files
2. Mental model of file state used after modifications — file had already changed
3. Fix scripts targeting the same file as a previous fix without re-reading

The dry-run-first pattern caught every mismatch before file modification. The test-before-apply discipline on medium confidence pin fix prevented a bad change (would have made Seville's 19 null-matched entries show as solid pins).

Terminal buffer overflow from approve-centroids Unicode output hid git output multiple times. Rule established: never chain approve-centroids with git commands.

postrun ran from monitoring terminal simultaneously with main terminal on Logroño — Nominatim ToS violation. Terminal assignment discipline established: T3 monitoring only, T4 postrun/git only.

---

### Files Produced or Updated

| File | Status | Notes |
|------|--------|-------|
| localbite-pamplona-2023-2026.json | New | 24 restaurants, 4 sources, 1 both-pool |
| localbite-logrono-2023-2026.json | New | 15 restaurants, 6 sources, 1 both-pool |
| localbite-prompt-v71-pamplona-part1.txt | New | |
| localbite-prompt-v71-pamplona.txt | New | |
| localbite-prompt-v71-logrono-part1.txt | New | |
| localbite-prompt-v71-logrono.txt | New | |
| localbite-postrun.js | Updated | v3.0 → v3.2: STEP 5, STEP 5.5, geo_skip, --auto-accept default, run_time fix |
| localbite-geocode.js | Updated | geo_skip for not-found, Logroño bbox, accent variants |
| localbite-approve-centroids.js | Updated | Counter bug fix, next-steps corrected |
| localbite-prompt-v7-template.txt | Updated | No-git instruction added |
| index.html | Updated | isHighConfidence() medium + geo_matched_name fix |
| CLAUDE.md | Updated | Full rewrite with session learnings |
| localbite-index.json | Updated | 23 cities |
| localbite-run-metrics.log | Updated | Pamplona and Logroño entries |
| .env | New | ANTHROPIC_API_KEY persisted |
| ~/.zshrc | Updated | setopt nohistexpand |

Pipeline output files (docs commit):
- localbite-pamplona-search-log.txt, search-plan.txt, audit.txt, raw.json, failed-sources.txt, working.json
- localbite-logrono-search-log.txt, search-plan.txt, audit.txt, raw.json, failed-sources.txt, working.json

---

### Outstanding Items

**Critical — must fix before batch runs:**
- [ ] CENTROIDS naming collision — city-qualified keys architectural fix (2.5–3 hours, dedicated session)
- [ ] STEP 5.5 city matching bug — pipeline writes "logrono", matcher expects "logrono-spain" (45 min)
- [ ] Logroño Casco Antiguo centroid not in index.html — blocked by naming collision fix
- [ ] Madrid JSON filename — not found by fleet script, investigate

**Data quality:**
- [ ] Porto metadata all null — investigate schema corruption
- [ ] Santiago built date null — minor
- [ ] Lisbon source_recency null — minor
- [ ] Seville 19 medium confidence entries with null geo_matched_name — fix at rebuild
- [ ] Barcelona 4+ clearly wrong geocodes — fix at rebuild
- [ ] Madrid 56 open_status_check — no verification workflow agreed

**Infrastructure:**
- [ ] approve-centroids next-steps still shows "Verify CITY_CENTRES/BOUNDS" in some paths — cosmetic, fix at leisure
- [ ] Pipeline self-commit not reliably prevented — no-git instruction survives compaction unreliably

**Superseded files to remove at rebuild:**
- localbite-barcelona-2025-2026.json
- localbite-lisbon-2025-2026.json
- localbite-toronto-2025-2026.json
- localbite-valencia-2025-2026.json

---

*Fleet: 23 cities, ~769 restaurants, 10 on v7.1*
*index.html: ~2,255 lines (trigger at 2,500)*
*HEAD: 43d00cc*

## Session — 2026-04-23 (Fix Sessions A+B, Part 1 files, Batch 1 Morocco)

### Overview

Full-day session covering three major workstreams: pipeline fix sessions (Priorities 1-5), creation of Part 1 files for all 14 rebuild cities, and Batch 1 Morocco (4-city parallel rebuild). Session also included the discovery and fix of a new language_pool derivation bug triggered by compaction-reconstruction. All Morocco cities committed.

---

### Fix Session A — Priorities 1, 2, 5 (commit f1ce405)

**Priority 1: Bounding box validation for neighbourhood centroid Nominatim queries**
postrun.js STEP 2 now reads city bounding box from geocode.js before the Nominatim neighbourhood loop. If Nominatim returns coordinates outside the city bounding box, the result is rejected and treated as not-found. Confirmed working — the San Andrés/Santiago false positive (A Coruña) that required manual rejection in the previous session would now be caught automatically.

**Priority 2: Move index.html centroid writes from STEP 5 to approve-centroids**
postrun.js STEP 5 no longer writes to index.html — it reports pending centroids and instructs the user to run approve-centroids. approve-centroids.js now writes newly approved centroids to index.html CENTROIDS block after writing to JSON. Confirmed working in Chefchaouen (Plaza Uta el-Hammam written correctly) and Marrakesh (Kasbah centroid written, 3 already-present skipped correctly).

**Priority 5: approve-centroids counter bug**
Counter now tracks `newlyApprovedCount` explicitly during the loop instead of filtering approved keys after the fact. All Batch 1 runs showed correct counts. Previously the counter overcounted by including pre-existing centroids from data.centroids.

---

### Fix Session B — Priorities 3, 4 (commit 8387dbe)

**Priority 3: Writer dropout surname auto-repair**
postrun.js STEP 1.5 now attempts to extract surname from source_id as a last resort when writer field is null after all other repairs. Pattern: `src-[publication]-[surname]` → capitalize last hyphen-separated token. Triggered on all 6 Marrakesh sources (full names corrected via repair script). Edge cases tested: single-segment IDs correctly not extracted, multi-part publication names correctly resolved to last token.

**Priority 4: Orphan blocking error**
postrun.js now checks for orphan restaurants (no coordinates AND no neighbourhood) after geocoding. Exits with blocking error and do-not-commit instruction unless `--allow-orphans` flag is passed. Not triggered in Batch 1 (no orphans in Morocco cities).

---

### Part 1 Files — All 14 Rebuild Cities (commit 478e6d6)

Part 1 files created for all 14 non-v7.1 cities:
- Morocco: Fes, Marrakesh, Rabat, Chefchaouen
- Portugal: Lisbon, Porto
- Light Spain: Granada, Málaga
- Medium Spain: Bilbao, Seville, Córdoba
- Toronto
- Heavy Spain: Barcelona, Valencia
- Madrid

All use YEAR_RANGE: 2023-2026 (Morocco previously used 2025-2026 — now corrected). PHASE1_AUTO_PROCEED: YES and UNATTENDED_MODE: YES in all files. Michelin exclusions, source strategy, and neighbourhood structure populated for each city. COI flag included for Lisbon (Time Out Market Lisboa).

---

### Language Pool Bug Discovery and Fix (commits 16a7abc, in postrun.js)

**Root cause:** Two-part failure in postrun.js STEP 1.5 language_pool derivation:

1. Guard `if (!r.language_pool)` meant pipeline-set default values (e.g. 'es') were never corrected by auto-repair.
2. `r.sources` may be array of objects `[{source_id, quote, ...}]` when pipeline compacts during Phase 2 and reconstructs from transcript. The code treated each object as a source ID string, so `sourceLangMap[object]` always returned undefined. Language pool derivation silently failed, leaving the pipeline's incorrect default in place.

**Only manifests on compaction-reconstruction.** Non-compacting runs write sources as plain string IDs and are unaffected. Fes, Rabat, Chefchaouen completed without Phase 2 compaction and had correct language_pool values. Marrakesh compacted mid-Phase 2 and had all 42 restaurants showing 'es' (pipeline default).

**Fix:** Always recalculate language_pool when positive evidence is available from source languages. Extract source IDs correctly from both string and object formats. Committed in postrun.js (effectively v3.1 though version string not updated).

**Marrakesh data patched:** fix-marrakesh-langpool.py corrected 42 language_pool values. Result: 5 both-pool (EN+FR), 34 EN-only, 3 FR-only. Committed alongside postrun.js fix.

---

### Batch 1 — Morocco (4 cities)

**Terminal setup:** 6 terminals (T1-Fes, T2-Marrakesh, T3-Rabat, T4-Chefchaouen, T5-Monitor, T6-Postrun). 20-minute stagger between launches. All four ran simultaneously without rate limit issues.

**Fes** (commit 3a24034):
- 21 restaurants, 4 sources, 3 both-pool, 71% geocoding
- Clean run. No compaction issues. Both-pool correct (EN+FR sources, string format).
- Superseded localbite-fes-2025-2026.json removed.

**Rabat** (commit bbf0bc2):
- 5 restaurants, 2 sources, 0 both-pool, 60% geocoding
- 2 bad geocoding matches manually nulled: Grill Robuchon→"Grill 23", Al Warda→"Résidence Warda". Both passed word-overlap check (1 word match each) but were clearly wrong restaurants.
- Hassan centroid from Nominatim correctly identified as Hassan district of Rabat.
- Superseded localbite-rabat-2025-2026.json removed.
- Regression vs v5 (10R→5R, 3 sources→2): confirmed correct — named-author rules correctly rejected anonymous sources.

**Chefchaouen** (commit 871c5cc):
- 2 restaurants, 1 source, 0 both-pool, 50% geocoding
- "Restaurant Casa Aladdin" auto-nulled (matched "Restaurant Casa Aladin" — single letter difference "dd" vs "d"). Zero word overlap check too strict for minor spelling variations. Manually restored with geo_skip: true.
- Plaza Uta el-Hammam Nominatim returned no result — manual coordinates entered [35.1686, -5.2681] via interactive approve-centroids. Priority 2 fix correctly wrote centroid to index.html CENTROIDS.
- Regression vs v5 (12R→2R, 5 sources→1): correct — v5 sources likely failed named-author gate.
- Superseded localbite-chefchaouen-2025-2026.json removed.

**Marrakesh** (commits a4eec43, 16a7abc):
- 42 restaurants, 6 sources, 5 both-pool (after fix), 62% geocoding
- Compacted during Phase 2 AND Phase 3. Both recoveries successful.
- Quote field dropout: all 42 restaurants missing quote in final JSON. Repaired from working.json.
- Writer field dropout: all 6 sources had surname-only writers. Full names corrected from Phase 1 output.
- 7 bad geocoding matches nulled: Chez Mmima/Bejguenni/Ouazzani→"Chez Chegrouni", +61→city name, Meat Grill→vegetarian restaurant, Le Marocain→pharmacy, La Famille→pharmacy.
- Language pool bug: all 42 showed 'es'. Fixed to 5 both-pool, 34 EN, 3 FR after postrun.js fix.
- Superseded localbite-marrakesh-2025-2026.json removed.

**Morocco batch results vs v5:**

| City | v5 R | v7.1 R | v5 BP | v7.1 BP | Assessment |
|------|------|--------|-------|---------|------------|
| Fes | 10 | 21 | 1 | 3 | Clear improvement |
| Marrakesh | 14 | 42 | 4 | 5 | Improvement |
| Rabat | 10 | 5 | 0 | 0 | Regression — correct |
| Chefchaouen | 12 | 2 | 1 | 0 | Regression — correct |

---

### Key Decisions

- Language pool bug: fix postrun.js + patch Marrakesh only (other cities unaffected). Do not re-run postrun on other cities.
- Rabat/Chefchaouen regressions: accept as correct behavior. Smaller named-author packs are better than larger anonymous-source packs.
- Chefchaouen Casa Aladdin: restore manually rather than weaken auto-null logic globally. Flag auto-null word overlap threshold as a future fix (single-character spelling variants should not trigger zero-overlap).
- 4-city parallel batch: validated as viable. No rate limit issues with 20-minute stagger.

---

### Files Produced or Updated

| File | Type | Commit |
|------|------|--------|
| localbite-postrun.js | fix (Priority 1+2+3+4+5+langpool) | f1ce405, 8387dbe, 16a7abc |
| localbite-approve-centroids.js | fix (Priority 2+5) | f1ce405 |
| localbite-prompt-v71-[14 cities]-part1.txt | new | 478e6d6 |
| localbite-fes-2023-2026.json | new (rebuild) | 3a24034 |
| localbite-rabat-2023-2026.json | new (rebuild) | bbf0bc2 |
| localbite-chefchaouen-2023-2026.json | new (rebuild) | 871c5cc |
| localbite-marrakesh-2023-2026.json | new (rebuild) + langpool fix | a4eec43, 16a7abc |
| localbite-fes-2025-2026.json | deleted (superseded) | 3a24034 |
| localbite-rabat-2025-2026.json | deleted (superseded) | bbf0bc2 |
| localbite-chefchaouen-2025-2026.json | deleted (superseded) | 871c5cc |
| localbite-marrakesh-2025-2026.json | deleted (superseded) | a4eec43 |
| Pipeline output docs (all 4 Morocco cities) | new | 094df8c |

---

### Outstanding Items

- [ ] Batch 2: Lisbon, Porto, Granada, Málaga — Part 1 files ready, bounding boxes confirmed in geocode.js
- [ ] Auto-null word overlap threshold: single-character spelling variations (e.g. "Aladdin" vs "Aladin") trigger zero-overlap incorrectly. Investigate Levenshtein distance or fuzzy match as supplement.
- [ ] Postrun.js version string: still says v3.0 but effectively v3.1 after today's fixes. Update at next opportunity.
- [ ] Check other v7.1 cities for object-format sources: only manifests on compaction-reconstruction. Run quick check on all committed v7.1 JSONs to confirm string format.
- [ ] Marrakesh 0 both-pool in v5 was 4 — the new 5 both-pool is from genuine EN+FR cross-validation. Worth noting the source pool is stronger in v7.1.
- [ ] Global instructions and CLAUDE.md updates required — see session notes.

*Fleet: 26 cities, ~861 restaurants (estimated). 14 on v7.1, 4 Morocco rebuilt today.*

## Session — 2026-04-24 (Batch 2 Iberian Push + Bilbao/Córdoba + Córdoba v2)

### Overview
Very long session. Started with a pre-batch Levenshtein geocoding fix, ran Batch 2 (Lisbon, Porto, Granada, Málaga), then opportunistically added Bilbao and Córdoba rebuilds, then had to redo Córdoba a second time after a git history audit revealed the first attempt was a pipeline search failure rather than quality improvement. Also discovered and fixed fabricated article URLs in Bilbao and Lisbon.

---

### Fixes Committed Before Batch 2

**Levenshtein distance check in geocode.js shouldAutoNull() (d59595b)**
Single-character spelling differences (e.g. "Casa Aladdin" vs "Casa Aladin") were triggering false zero-overlap auto-null. Added a Levenshtein distance check (edit distance ≤ 2, tokens ≥ 4 chars) as a supplement to word overlap. Tested against both the Chefchaouen false-null case (should pass) and the Rabat wrong-match cases (should still auto-null). All 6 tests passed.

---

### Batch 2: Lisbon, Porto, Granada, Málaga

**Rate limit hit mid-batch.** Lisbon (48 searches) and Porto (81 searches) ran simultaneously and consumed most of the session window before Granada and Málaga could complete. Both Granada and Málaga hit the rate limit and exited. Required relaunch. Key lesson: batch by total expected search volume, not city count.

**Lisbon (26aa95f): 48R→24R, 1BP→3BP**
Regression in restaurant count but improvement in both-pool quality. Mesa Marcada (Miguel Pires) confirmed found and used. Time Out Lisboa COI flagged correctly in Portuguese in writer_profile. Language pool distribution (3 both, 21 EN-only) reflects genuine structural segmentation — EN and PT critics recommend different restaurants in Lisbon. The regression is correct. 2 wrong geocodes nulled (O Maravilhas→Praceta Maravilhas, Essencial→beauty salon).

**Porto (3c1750a): 53R→17R, 2BP→0BP**
Significant regression but confirmed honest. Working file had 23 entries — only 1 null entry difference from final 17. No data loss from rate limit. PT primary source structural gap confirmed: Mesa Marcada Porto articles have no article-level author byline (text adapted from Revista de Vinhos, Pires credited for photography only). Observador podcast-only. Público/Fugas 451 geo-blocked. Named PT food bloggers systematically omit surnames. Venn Canteen and Liz nulled (wrong geocode matches). Bonfim centroid removed — derived from Venn Canteen which was nulled.

**Granada (c422c5f): 15R→4R, 0BP→2BP**
Dramatic regression but correct. Concentration cap fired on Lauren Aloise/Spanish Sabores (was contributing 67%, capped to 25%). GranadaDigital/Alfonso Campos permanently Cloudflare-blocked — significant quality loss. 4 restaurants with 2 genuine both-pool is an honest result given the structural constraints. Rate limit caused a restart; first partial run (7 restaurants) was overwritten by full run. Tajine Elvira geocode nulled (Puerta de Elvira is a historic gate, not a restaurant).

**Málaga (dcdab48): 23R→34R, 0BP→2BP**
Best result of Batch 2 — improvement on all metrics. 6 sources, 2 both-pool, 34 restaurants from what was previously a 0BP Strategy-C pack. El Ejido neighbourhood queries returned El Ejido Almería results throughout — geography collision documented. Verum→El Lagar de Verum nulled (winery outside city). Málaga accent variant added to CITY_BOXES (was failing geocoding for cities where city name has accent). Córdoba accent variant also added at same time.

---

### Bilbao Rebuild (8953332): 39R→23R, 3BP→3BP

v7→v7.1 rebuild. Both-pool stability at 3 confirms old v7 quality signal was genuine. Restaurant regression explained by: concentration cap limiting Culinary Backstreets (marginally over 30%), 11 Tier C auto-rejections for thin single-source entries. CITY_CENTRES and CITY_BOUNDS were missing for Bilbao — added by postrun. 2 wrong geocodes nulled (Café Bar Bilbao→Mini Bar Bilbao, Ramen Shimoji→Sugoi Ramen). Key gap: deia.eus (Bilbao's Basque newspaper, Amaia Díez) was found only via Phase 1B cross-validation — should be a Phase 0 DIRECT_FETCH_SOURCE in next rebuild.

---

### Article URL Fabrication Discovery and Fix (c8dd254)

After committing Bilbao and Lisbon, verified article URLs on the live site. Found 4 broken URLs:
- CB Bilbao: inferred wrong URL post-compaction
- Mesa Marcada Lisbon: fabricated Boubou's URL (actual source was Prémios Mesa Marcada awards article)
- Guia Repsol Lisbon: path mismatch
- Time Out Lisboa: missing /pt/ in path

Fixed all four. Established hard rule: article_url must never be inferred or fabricated. If not confirmed from fetch, set null. Added to global instructions and CLAUDE.md.

---

### Córdoba First Attempt (f65a724): 35R→25R, 17BP→2BP

First v7.1 rebuild produced 25R, 5 sources, 2 both-pool. Initially appeared to be quality gates working correctly — smaller but more honest pack. Then ran git history audit.

**Git history audit: git show 8d542ca:localbite-cordoba-2023-2026.json**

Old v6 pack had 9 sources, all named authors:
- Andy Hayler (EN), Hanne Olsen (EN), Molly Piccavey (EN), Morgane Mazelier (EN)
- Juan Velasco (ES/Cordópolis), Alfonso Alba (ES/Cordópolis), M. Ángeles Ramírez (ES/El Debate), Brenda Alonso (ES/The Objective), Txema Aguado (ES/Yendo por la Vida)

Language pool distribution: both:17, es:11, en:7. The old 17 both-pool was genuine.

**First attempt failures:**
1. Argentine Córdoba contamination — circuitogastronomico.com, malevamag.com dominated results
2. Cordópolis (elDiario.es Córdoba section) never surfaced — Juan Velasco, Alfonso Alba not found
3. Piccavey.com falsely rejected — Molly Piccavey's byline is on About page not article headers
4. Yendo por la Vida (Txema Aguado) never appeared in search results
5. El Debate returned a Repsol roundup without a named author instead of M. Ángeles Ramírez's restaurant guide

---

### Córdoba Part 1 Revision (a85e501)

Updated Part 1 file with:
- ARGENTINA_DISAMBIGUATION: REQUIRED — all queries must include España or Spain
- ARGENTINA_AUTOBLOCK: .ar domains
- cordopolis.es as DIRECT_FETCH_SOURCE with named writers
- yendoporlavida.com as DIRECT_FETCH_SOURCE (Txema Aguado)
- piccavey.com as DIRECT_FETCH_SOURCE with explicit single-author site note
- spainbyhanne.dk and andyhayler.com as direct fetch sources
- theobjective.com, andalucialovers.com confirmed in PHASE_0_SOURCES
- Note on El Debate: fetch specific restaurant guide articles, not Repsol roundups

---

### Córdoba Second Attempt (828cb1f): 25R→41R, 2BP→6BP

Phase 0 fetched all 5 direct fetch sources successfully. New source found: El Viaje Me Hizo a Mí (Jose López, Nov 2024). All 5 original target sources recovered plus one new. Final: 41R, 8 sources, 6 both-pool.

The intervention worked completely. Part 1 file quality is the primary quality lever — 30 minutes of Part 1 work produced 4× more both-pool entries and 64% more restaurants.

One orphan (Terra Olea — no neighbourhood in article context) — assigned to Casco Antiguo. Three wrong geocodes nulled (Los Patios de La Marquesa, Asador Central, Atmósfera Gastrobar). Note: Choco (1★ Michelin) appears in pack — pipeline included because only Noor was listed in MICHELIN_STARRED_EXCLUSIONS. Decision pending: deliberate inclusion or accidental omission.

---

### Key Decisions

1. **article_url must never be inferred or fabricated.** Hard rule. Null if not from fetch.

2. **Git history audit is mandatory before accepting regression.** Both-pool regression is only "correct" if old sources fail current quality gates. If old sources pass, it's a pipeline failure.

3. **Part 1 file quality is the primary quality lever.** The pipeline cannot compensate for a weak Part 1 file. Known sources → DIRECT_FETCH_SOURCES. Known collisions → disambiguation instructions.

4. **Rate limit batching rule.** Batch by total expected search volume not city count. Lisbon + Porto = effectively a 4-heavy-city batch.

5. **Single-author sites need explicit Part 1 documentation.** The pipeline will not infer single-author site status independently.

---

### Fixes and Commits Summary

| Commit | Description |
|--------|-------------|
| d59595b | Levenshtein distance check in shouldAutoNull |
| 26aa95f | Lisbon v7.1 rebuild |
| 3c1750a | Porto v7.1 rebuild |
| c422c5f | Granada v7.1 rebuild |
| dcdab48 | Málaga v7.1 rebuild + Málaga accent fix in CITY_BOXES |
| 27924a1 | Batch 2 pipeline docs |
| 8d033ad | Córdoba accent fix + Granada metrics correction |
| 8953332 | Bilbao v7.1 rebuild |
| f65a724 | Córdoba v7.1 first attempt (pipeline failure) |
| 8a2016e | Bilbao + Córdoba pipeline docs |
| c8dd254 | article_url fixes: CB Bilbao, Repsol Lisboa, TimeOut Lisboa, Mesa Marcada nulled |
| a85e501 | Córdoba Part 1 revised |
| 828cb1f | Córdoba v7.1 second attempt |
| dfbac6b | Córdoba v7.1 v2 pipeline docs |

---

### Outstanding Items

- [ ] Bilbao: test remaining 5 source URLs (bilbaohiria, 7canibales, theobjective ×2, deia)
- [ ] Bilbao: add deia.eus to Phase 0 DIRECT_FETCH_SOURCES in Part 1 for next rebuild
- [ ] Córdoba: decide whether Choco 1★ stays in pack or gets removed
- [ ] Lisbon/Porto: Público/Fugas geo-block — permanent structural gap, no workaround
- [ ] Seville rebuild — Part 1 file needs preparation
- [ ] Toronto rebuild — Part 1 file needs preparation
- [ ] Barcelona, Valencia, Madrid — Part 1 files ready, rebuilds pending
- [ ] Global instructions and CLAUDE.md updates (this session — completed)

---

### Files Produced or Updated

| File | Status |
|------|--------|
| localbite-lisbon-2023-2026.json | Updated (v7.1 rebuild) |
| localbite-porto-2023-2026.json | Updated (v7.1 rebuild) |
| localbite-granada-2023-2026.json | Updated (v7.1 rebuild) |
| localbite-malaga-2023-2026.json | Updated (v7.1 rebuild) |
| localbite-bilbao-2023-2026.json | Updated (v7.1 rebuild) |
| localbite-cordoba-2023-2026.json | Updated (v7.1 rebuild v2) |
| localbite-geocode.js | Updated (Levenshtein, Málaga/Córdoba accent variants) |
| localbite-prompt-v71-cordoba-part1.txt | Updated (Argentina disambiguation, direct fetch sources) |
| localbite-run-metrics.log | Updated (all city entries) |
| localbite-index.json | Updated (all city entries) |
| index.html | Updated (Bilbao/Córdoba CITY_CENTRES/CITY_BOUNDS added) |

*Fleet: 22 v7.1 cities, 28 files, 897 restaurants, 2,265 index.html lines*

## Session — 2026-04-25 (Batch 3 — Seville + Toronto)

### Overview
Pre-session housekeeping (Bilbao URL verification, Choco decision, Córdoba Choco removal),
Seville and Toronto v7.1 Part 1 file authoring with git history audit, pipeline execution
for both cities, postrun, and commit. Session also included a detailed git history audit of
the old Seville v7 pack before writing the Part 1 file — critical step that prevented a
repeat of the first Córdoba failure.

### Key Decisions

**Bilbao article_urls resolved.** 4 of 5 inferred post-compaction URLs were broken (410/404).
All 4 nulled. Only CB Bilbao (Culinary Backstreets) was a confirmed 200 OK. Outstanding
Bilbao URL issue is now closed.

**Choco removed from Córdoba.** Choco (1★ Michelin) was accidentally included because only
Noor was listed in MICHELIN_STARRED_EXCLUSIONS. Removed for consistency — Noor excluded from
same pack. Decision: Michelin exclusion is a blanket rule applied consistently. Future Part 1
files should list all known starred restaurants explicitly.

**CosasDeCome / Pepe Monforte directory format is a structural barrier.** The pipeline made
8 direct fetch attempts at CosasDeCome and correctly rejected all of them — the content is
directory-format (name, location, price range, reader recommendations) with no editorial
prose quotes. The old v7 "quotes" were pipeline-generated descriptions masquerading as quotes.
This means the old Seville v7 both-pool entries (which crossed CosasDeCome ES entries with
EN sources) were not genuine cross-validation. The v7.1 0 both-pool result is more honest.
This is a known architectural tension: the 15-word prose quote rule correctly excludes the
most comprehensive local food platform in Seville.

**Seville regression (73→22R, 2→0BP) is fully explained and honest.** CosasDeCome rejection
(8 attempts, directory format), The Objective weak quotes (Phase 3 rejection), Diario de
Sevilla and ABC Sevilla inaccessible in editorial guide format. New source discovered:
De Tapas con Chencho / Chencho Cubiles (member Sevillian Academy of Gastronomy, dedicated
per-restaurant articles). Should be a DIRECT_FETCH_SOURCE in next rebuild.

**Toronto paywall problem mirrors Portugal geo-block problem.** Globe and Mail and Toronto
Life — together covering 60-70% of serious Toronto restaurant criticism — are paywalled and
inaccessible to the pipeline. This is structural and has no programmatic workaround. The
DIRECT_FETCH_SOURCES named writers (Corey Mintz, Amy Pataki, Natalia Manzocco) were not
confirmed in qualifying articles — likely because their content is behind these paywalls.
Toronto 0 Tier A (no multi-source restaurants) reflects source pool narrowness.

**Toronto v5v6-merge regression (66→52R) is honest.** Old pack included BlogTO (explicitly
blocked in v7.1 as commercial aggregator). Restaurant count reduction is quality-gate
improvement, not pipeline failure.

**Git history audit before writing Part 1 files is mandatory.** Applied to Seville before
writing the Part 1 file. All 10 old v7 Seville sources had named authors passing current
quality gates. The audit confirmed which sources to DIRECT_FETCH and which were genuinely
absent from the source landscape.

### Fixes Committed
- 4 Bilbao article_urls nulled (bilbaohiria 410, theobjective ×2 404, deia 404)
- Choco removed from Córdoba (1★ Michelin, accidental inclusion)
- Seville v7.1 Part 1 file authored with full git history audit
- Toronto v7.1 Part 1 file authored
- localbite-toronto-2025-2026.json removed (superseded)
- Tiffany Leigh (Eater Toronto) homepage URL nulled

### Cities Rebuilt
- Seville: 73R → 22R, 2BP → 0BP, v7 → v7.1. Honest. CosasDeCome directory format
  explained regression. New source: De Tapas con Chencho.
- Toronto: 66R → 52R, 0BP → 0BP, v5v6-merge → v7.1. Honest. BlogTO removal explains
  count regression. Paywall problem limits source pool structurally.

### Outstanding Issues (updated)
- **Barcelona:** v6, 86R, 10BP. 2 superseded files in repo. Standalone rebuild session
  needed — largest remaining city. Part 1 file needed.
- **Valencia:** v6, 47R, 10BP. 2 superseded files in repo. Part 1 file needed.
- **Madrid:** No canonical JSON. Standalone rebuild session required. Part 1 file needed.
- **Seville:** Chencho Cubiles / De Tapas con Chencho should be DIRECT_FETCH_SOURCE in
  next rebuild. The Objective / Brenda Alonso worth re-evaluating — rejected as
  "generic/weak" but was in v7 pack.
- **Toronto:** Investigate non-paywalled Corey Mintz, Amy Pataki content (Substack,
  syndication) for next rebuild. Toronto Life qualifying articles need assessment.
- **Seville Part 1:** Add Choco to MICHELIN_STARRED_EXCLUSIONS. Add De Tapas con Chencho
  as DIRECT_FETCH_SOURCE.
- **postrun.js version string:** Still shows v3.0, effectively v3.2. Update at next
  opportunity.

### Files Produced or Updated
| File | Status |
|------|--------|
| localbite-bilbao-2023-2026.json | Updated (4 article_urls nulled) |
| localbite-cordoba-2023-2026.json | Updated (Choco removed) |
| localbite-seville-2023-2026.json | Updated (v7.1 rebuild) |
| localbite-toronto-2023-2026.json | Updated (v7.1 rebuild) |
| localbite-toronto-2025-2026.json | Removed (superseded) |
| localbite-prompt-v71-seville-part1.txt | New |
| localbite-prompt-v71-toronto-part1.txt | New |
| localbite-run-metrics.log | Updated |
| localbite-index.json | Updated |
| index.html | Updated (Toronto centroids added) |

*Fleet: 24 v7.1 cities active, 27 files, 779 restaurants, 2,277 index.html lines*
*Remaining non-v7.1: Barcelona (v6), Valencia (v6), Madrid (no file)*


## Session — 2026-04-25 (Barcelona & Valencia v7.1 rebuilds; fleet-wide writer_profile audit)

### Overview

Two-city batch session completing the last major Spanish city rebuilds. Barcelona (v6→v7.1, 86→110R, 10BP held) and Valencia (v6→v7.1, 47→78R, 10→8BP) both rebuilt successfully. Session also completed a fleet-wide audit and fix of writer_profile contamination affecting 8 cities. Pre-session housekeeping included Bilbao article_url fixes (from previous session close) plus Seville and Toronto writer_profile patches.

---

### Pre-Session Fixes

**Seville / De Tapas con Chencho:** writer_profile updated to explain per-venue article structure — source ↗ link correctly null, writer_profile now tells users why.

**Toronto / Eater Toronto:** article_url confirmed as null (homepage URL eater.com/toronto was correctly rejected). Tiffany Leigh's specific article URL was researched but could not be confirmed from search results. Null is the correct state pending manual browser verification.

Both committed at 8ac587a.

---

### Barcelona v7.1 Rebuild

**Git history audit finding:** All 9 v6 sources had named authors passing current quality gates. Both-pool regression threshold set at 6+ minimum.

**Part 1 file (localbite-prompt-v71-barcelona-part1.txt):** Created with 11 DIRECT_FETCH_SOURCES (9 v6 sources + The Infatuation Hit List + Ara.cat as lower-confidence attempt). Explicit same-publisher flags for The New Barcelona Post (two articles, cannot cross-validate). Michelin exclusion list for ~13 starred restaurants. Neighbourhood tiers across 6 areas.

**Pipeline outcome:** 9 confirmed sources, 110 restaurants, 10 both-pool. Pipeline ran 44 searches including Phase 1B cross-validation for Pompa/Franca/Fukamura — found Philippe Regol (observaciongastronomica.com) as new ES candidate. ElNacional.cat (Jordi Tubella, present in v6) returned 451 on specific article URLs — source lost. The Infatuation Hit List returned with Isabelle Kliger confirmed.

**Key issues resolved in postrun:**
- Complete quote field dropout (all 110 restaurants): repaired from working.json using description→quote mapping
- 17 wrong geocode matches nulled (train stations, supermarkets, fashion stores, funiculars, umbrella shops)
- Cerveseria 640 coordinates already null — no action needed
- Sant Andreu centroid removed (sole contributor La Bodegueta de Sant Andreu was nulled for out-of-bounds coordinates)
- 3 postrun runs required total
- Beteve.cat and Guía Repsol article_urls nulled (both resolved to section pages, not specific articles)

**Final state:** 110R, 9 sources, 10BP, 51% geocoding (56/110). Committed at 043e6b5.

**Outstanding for next Barcelona rebuild:**
- Eixample centroid HIGH SPREAD (0.26 lng) — outlier geocode not identified
- ElNacional.cat 451 access block — structural gap
- BFE Phase 0 URL should be updated to confirmed working path
- ElNacional may be recoverable via different URL patterns

---

### Valencia v7.1 Rebuild

**Git history audit finding:** All 7 v6 sources had named authors. Both-pool regression threshold: 5+ minimum (accounting for Michelin exclusions). Ricard Camarena (2★) and El Poblet (1★) identified as v6 both-pool entries now requiring Michelin exclusion.

**Part 1 file (localbite-prompt-v71-valencia-part1.txt):** Created with 7 DIRECT_FETCH_SOURCES (all v6 sources). Explicit Ojo al Plato same-publisher flag (Paco Palanca ×2, cannot cross-validate). Devour Valencia COI flag. Valencian-language discovery prioritised in Phase 1 (structural gap from v6). Michelin exclusion list.

**Pipeline outcome:** 5 confirmed sources (Gastro Trinquet/Albert Padilla and Bonviveur/Yolanda Galiana lost from v6 pool — likely URL fail and quote quality rejection respectively). 79 restaurants before Karak removal, 78 after.

**Key issue — Karak (1★ Michelin):** Found in pack post-pipeline. Not in Part 1 MICHELIN_STARRED_EXCLUSIONS — omission error. Removed manually at postrun review. Next Valencia Part 1 must add Karak.

**9 wrong geocode matches nulled:** Including Memoria Gustativa→COVID memorial (obvious), Raco del Turia→rural Valencia province (geographic miss), Pasta Shop→surf shop.

**Final state:** 78R, 5 sources, 8BP, ~62% geocoding (post-nulls). Committed at 934c512. Superseded localbite-valencia-2025-2026.json removed.

**Outstanding for next Valencia rebuild:**
- Gastrotrinquet.com manual access test
- Karak added to MICHELIN_STARRED_EXCLUSIONS
- Russafa and Gran Vía centroid HIGH SPREAD — outlier geocodes not identified
- Valencian-language sources remain a structural gap (no accessible named-author content found)

---

### Fleet-Wide writer_profile Audit

After noting pipeline internals visible in the Toronto and Seville Sources panel, ran a fleet-wide audit of all writer_profile fields across all 2023-2026 JSON files. Found contamination in:

- Fes: Nisrine Zaoui (Tier/pipeline language)
- Logroño: Otilia Anes da Veiga (PRIMARY language), Helena Crespo (Phase language)
- Murcia: Marina Vega (SECONDARY language)
- San Sebastián: Marti Buckley ×2 (pipeline language), Javier Sánchez (SECONDARY)
- Seville: Ariana Buenafuente (pipeline notes), Mari Carmen Duarte (pipeline notes)
- Toronto: all 4 sources (tier labels, exclusion counts, Michelin flags)
- Barcelona: clean (API enrichment this session produced clean profiles)
- Valencia: all 5 sources (PRIMARY/SECONDARY labels, pipeline notes)

10 sources across 8 cities corrected. Fleet-wide audit confirmed clean after fixes. Committed at 7a7a4a5.

**Root cause analysis:** Two failure modes — (1) pipeline writes operational content to writer_profile during compaction-reconstruction, (2) postrun Step 2b API enrichment model sees operational fields in source object and incorporates their language. Fix required in v7.1 template and postrun.js Step 2b. Scheduled as first task of next session before Madrid pipeline launch.

---

### Key Decisions

- **Both-pool 10 for Barcelona** accepted as correct — CA-language source loss (ElNacional 451) explains the gap from v4's 14BP, not pipeline failure
- **Both-pool 8 for Valencia** accepted as correct — Michelin exclusions (Ricard Camarena, El Poblet) account for most regression; Karak also removed
- **Karak removal** — blanket Michelin rule applied consistently; Part 1 omission error, not product decision
- **writer_profile null treatment** — section-page URLs (Beteve, Guía Repsol for Barcelona) nulled per hard rule; judgment calls documented
- **writer_profile contamination fix** — fleet-wide repair completed; pipeline/postrun fixes deferred to next session to not delay this session's commits
- **Barcelona superseded file (2025-2026)** — still in repo; was not removed this session (only the v7.1 commit was needed). Should be removed in a cleanup commit.

---

### Files Produced or Updated

| File | Status | Commit |
|------|--------|--------|
| localbite-prompt-v71-barcelona-part1.txt | New | 8ee191e |
| localbite-prompt-v71-valencia-part1.txt | New | 8ee191e |
| localbite-barcelona-2023-2026.json | Updated (v7.1) | 043e6b5 → 22da265 |
| localbite-valencia-2023-2026.json | Updated (v7.1) | 934c512 → 22da265 |
| localbite-valencia-2025-2026.json | Deleted | 934c512 |
| localbite-seville-2023-2026.json | writer_profile fix | 8ac587a → 22da265 |
| localbite-toronto-2023-2026.json | writer_profile fix | 22da265 |
| localbite-fes-2023-2026.json | writer_profile fix | 7a7a4a5 |
| localbite-logrono-2023-2026.json | writer_profile fix | 7a7a4a5 |
| localbite-murcia-2023-2026.json | writer_profile fix | 7a7a4a5 |
| localbite-san-sebastian-2023-2026.json | writer_profile fix | 7a7a4a5 |
| localbite-barcelona-search-log.txt | New | e2f0e9b |
| localbite-barcelona-search-plan.txt | New | e2f0e9b |
| localbite-barcelona-working.json | New | e2f0e9b |
| localbite-barcelona-audit.txt | New | e2f0e9b |
| localbite-barcelona-failed-sources.txt | New | e2f0e9b |
| localbite-valencia-search-log.txt | New | e2f0e9b |
| localbite-valencia-search-plan.txt | New | e2f0e9b |
| localbite-valencia-working.json | New | e2f0e9b |
| localbite-valencia-audit.txt | New | e2f0e9b |
| localbite-valencia-failed-sources.txt | New | e2f0e9b |
| index.html | Updated (centroids) | 043e6b5 |
| localbite-index.json | Updated | 043e6b5 |
| localbite-run-metrics.log | Updated | 043e6b5 |

### Outstanding Items

- [ ] **writer_profile fix: v7.1 template** — add prohibited-terms instruction before Madrid pipeline
- [ ] **writer_profile fix: postrun.js Step 2b** — add prohibited-terms to API prompt + validation scan
- [ ] **Barcelona 2025-2026.json** — still in repo; remove in cleanup commit
- [ ] **Eater Toronto article_url** — null pending manual browser verification; check eater.com/toronto for specific essential restaurants guide URL
- [ ] **Gastrotrinquet.com** — test manually for Albert Padilla accessibility before next Valencia rebuild
- [ ] **Karak added to Valencia MICHELIN_STARRED_EXCLUSIONS** — next Valencia Part 1
- [ ] **Both-pool discrepancy** — Barcelona pipeline reported 14BP, postrun counted 10BP; investigate counting methodology
- [ ] **Madrid standalone rebuild** — first pipeline of next session; Part 1 file needed; git history audit required first
- [ ] **Eixample centroid HIGH SPREAD** — identify and null outlier geocode at next Barcelona rebuild
- [ ] **Russafa/Gran Vía HIGH SPREAD** — identify and null outlier geocodes at next Valencia rebuild

*Fleet: 25 v7.1 cities active, 26 files, 772 restaurants, 2,286 index.html lines*

*Note: fleet script shows 26 files because localbite-barcelona-2025-2026.json is still present. Active v7.1 cities: 25 (Barcelona and Valencia now added). Superseded file count: 1 (barcelona-2025-2026.json).*

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

## Session — 2026-04-27 (Architecture deep dive + Italy planning)

### Overview

Long design session with no pipeline runs. Covered the incremental
front-end approach in depth across four dimensions (admin workflow,
pipeline role, user-facing features, SEO), then moved through app
strategy, address field analysis, and scaling implications. Ended
with Italy planning: Part 1 pre-research template created and
pre-research executed for all 17 Italian cities via web search.
A terminological error about Phase 0 was identified and corrected.
No new cities added to fleet this session.

---

### Incremental Next.js Approach — Detailed Analysis

**Admin workflow:** The only material change to the daily working
rhythm is a 3–5 minute deploy delay after git push (GitHub Actions
builds the Next.js static output). All pipeline steps — Part 1 file
writing, Claude Code launch, postrun, geocoding review, centroid
approval, article_url check, git commit — are identical. New admin
tasks are minimal: a city description field (JSON edit + commit),
featured cities flag (localbite-index.json), and hero quote curation
(static config file). All data corrections remain JSON + git. No
admin UI — the pipeline is the only data entry mechanism indefinitely.

**Pipeline role:** Confirmed unchanged and more important, not less,
in the incremental approach. All 12 responsibilities stay in the
pipeline (source discovery, quality gates, restaurant extraction,
schema validation, geocoding, writer profile enrichment, centroid
calculation, index update, metrics capture). The pipeline becoming
MORE important is the correct framing — there is no admin UI fallback.

**User-facing features:** Complete inventory produced. Features
available immediately (from JSON, no new work): restaurant cards,
quotes, both-pool badge, writer attribution, sources panel, map view,
neighbourhood/price/language filters. New features enabled by Next.js:
landing page with rotating writer quotes, country/city navigation,
/[city-slug] URL routing, writer profile pages (Phase 3 — lowest effort,
highest product identity impact), restaurant detail pages (Phase 4 —
thin without photos, primarily SEO value). Not possible without database:
user accounts, hosted photos, real-time hours, restaurant claiming.

**SEO:** Static HTML = immediate improvement. From 1 indexable URL to
~950 (landing + 26 city pages + ~83 writer pages + ~836 restaurant pages).
The key insight: JSON-LD structured data (Restaurant + Review schema with
named writer attribution) is the biggest SEO opportunity and no
restaurant guide competitor implements it properly. Can be generated
entirely from existing JSON at build time. Realistic wins are long-tail
writer name queries, not competitive city-level restaurant keywords.
Domain authority takes 6–12 months to build regardless.

---

### Repo and Domain Analysis

**Same repo vs new repo:** Decision deferred to start of Next.js
migration. Key constraint: city JSON files must be readable by Next.js
at build time. Same repo (/web subdirectory) = trivial data access,
pipeline unchanged. New repo = cross-repo CI dependency to solve.

**Recommendation:** Same repo + /web subdirectory if no custom domain
planned. New repo named localbiteadmin.github.io if custom domain is
the goal (cleanest architecture for root URL serving).

**Custom domain:** Worth doing at migration time. localbite.app (~£15–20/yr)
or getlocalbite.com (~£12–15/yr) recommended. localbite.com almost
certainly taken. The brand signal is real; the cost is negligible once
users are being shared the URL.

---

### App Strategy

**Four routes identified:**
1. PWA (service worker + manifest) — +1–2 weeks on top of Next.js.
   Home screen installable on iOS + Android. Full offline via service
   worker. NOT in App Store. Solves the traveler use case.
2. Google Play TWA — +1–2 weeks on top of PWA. Listed in Google Play.
   Updates propagate immediately via web, no store re-submission for
   content changes.
3. Capacitor (iOS App Store) — +4–8 weeks. Requires Mac, Apple Developer
   Program ($99/yr), App Store review cycles (1–7 days per submission).
   Apple Guideline 4.2 risk: pure web wrappers rejected. Offline
   capability (download-and-cache) is mandatory to pass review.
4. React Native — separate codebase, separate product. 12–20 weeks.
   Only with proven traction.

**Data architecture (critical):** Download-and-cache (Strategy C) is
the correct architecture for any native app. App fetches city JSONs from
GitHub Pages CDN on launch, caches locally, serves from cache offline.
New cities added via pipeline propagate to app users on next launch
without App Store re-submission. Strategy C preserves the rapid deploy
cycle while enabling genuine offline access.

**Recommended sequence:** PWA after Phase 1 Next.js build → Google Play
TWA 1–2 weeks later → validate Android demand → Capacitor iOS only if
demand warrants → React Native only with proven substantial traction.

---

### Address Field Analysis (Backlog Item 7)

Three options analysed with honest coverage and quality assessments.
Key finding: the backlog's "Low if derived from geocoding" description
underestimates the geocoding quality constraint.

**Option A — Navigation deep link (zero effort, not in backlog):**
Google Maps deep link using existing lat/lng for any geocoded restaurant.
Opens native map app on mobile. Solves the stated user need (navigation)
directly. Works for 71% of fleet (all geocoded restaurants). Do this first.

**Option B — Reverse geocoding (genuinely low effort):**
Must filter to geo_confidence = 'high' only — centroid restaurants
produce wrong addresses. Covers ~41% of fleet (not 71%). Road + postcode
more reliable than house_number. Validation trick: if Nominatim reverse
returns amenity matching restaurant name, address is reliable.

**Option C1 — Template change (low effort, future pipelines):**
Add address field to Phase 2 extraction prompt. One line. Future cities
and rebuilds benefit. EN sources (Infatuation, Eater, Culinary Backstreets)
yield ~80–90% address extraction. ES sources ~40–60%. Do this with next
pipeline run.

**Option C2 — Targeted extraction script (medium effort, skip):**
Re-fetches all 128 article URLs. Same access issues as URL verification
(403s, JS-only, paywalls). Uncertain yield. Not recommended.

**Recommended sequence:** Navigation deep link now → template change on
next pipeline run → reverse geocoding (high-confidence only) after seeing
template change yield over next rebuilds.

---

### Scaling Analysis (26 → 50 → 100 → 250)

**The binding constraint:** Part 1 file quality, not pipeline automation.
Phase 0 (direct fetch of DIRECT_FETCH_SOURCES) is already automated.
What's manual is the research that populates DIRECT_FETCH_SOURCES.
The pipeline can run with minimal Part 1 files — it will produce weaker
results, but it runs.

**26 → 50:** Current approach unchanged. 6–8 weeks. Main challenge:
quality floor (thin packs for tier-2 cities). Curation threshold
(≥10R minimum to publish) needed before adding new cities.
Geographic strategy matters: major European capitals produce better
packs than Spanish tier-3 cities.

**50 → 100:** Process improvements required. Self-hosted Nominatim
becomes justified (27GB, 4–8hr import, eliminates rate limits — now
worth it). Data repo separation from frontend repo recommended.
Quality floor visible (30–40% thin cities). Operator capacity problem
emerges — one person cannot maintain 100 city packs at quality.
Estimated 4–6 months additional at current pace.

**100 → 250:** Different product. Part 1 pre-research automation
mandatory (not optional). Many cities structurally lack named food
writers meeting quality gates. Self-hosted Nominatim mandatory.
GitHub Pages approaches limits. 12–24 months at current pace.
Depth strategy (50 quality cities) beats breadth (250 thin cities)
for a trust-based named-writer product.

---

### Phase 0 Terminology Error — Corrected

I incorrectly described a "Phase 0 automation" that would run before
the Part 1 file is written. The user correctly pointed out that Phase 0
already exists and is automated.

**Correction:**
- Phase 0 = pipeline execution step (direct fetch of DIRECT_FETCH_SOURCES)
- This is already automated, already working, unchanged
- What I designed is a PART 1 PRE-RESEARCH SESSION that runs before the
  Part 1 file is written (before Phase 0 even becomes relevant)
- These are entirely different things in the workflow:
  [Pre-research → Part 1 file] → Phase 0 → Phase 1 → Phase 2 → Phase 3

All files updated to use correct framing.

---

### Italy Planning — 17 Cities

**Cities:** Naples, Bologna, Rome, Milan, Modena, Florence, Palermo,
Venice, Turin, Genoa, Catania, Bari, Verona, Trieste, Trento, Lecce,
Matera.

**Part 1 pre-research template created:** localbite-part1-preresearch-template.txt
Designed to run in 20–30 minutes per city (or multiple cities per session).
Runs 7 web searches per city across writer discovery (EN + local language),
Michelin status, geography disambiguation, COI check, and bounding box
estimation. Produces draft DIRECT_FETCH_SOURCES and VARIABLES block.

**Year range clarification during template creation:**
- Search queries in pre-research use "2024 2025" — finding currently
  active writers is the goal; 2024–2025 content is the strongest signal
- YEAR_RANGE: 2023-2026 in the output VARIABLES block — this is the
  pipeline's article acceptance window (fixed rule for all cities)
- These are different things; both are correct as set

**Pre-research executed:** Web searches run for all 17 cities in this
session. Key findings:
- Katie Parla (katieparla.com) has confirmed guides for Rome, Bologna,
  Modena, Florence, Puglia/Lecce/Bari — the single most valuable EN
  source across the Italy fleet
- Luciano Pignataro (lucianopignataro.it) is the primary IT source for
  Naples and Campania
- Elizabeth Minchilli (elizabethminchilli.com) covers Rome, Florence,
  Milan, Venice
- Emiko Davies (emikodavies.com) covers Florence/Tuscany
- Milan has no strong dedicated EN food writer confirmed — critical gap
- Naples disambiguation (Naples Florida) is the highest operational risk
- Matera and Trento are at threshold risk (may not reach ≥10R)

**Batch plan drafted (7 pipeline batches):**
- Batch A: Rome (solo)
- Batch B: Milan (solo)
- Batch C: Florence + Naples
- Batch D: Bologna + Turin
- Batch E: Venice + Palermo + Verona
- Batch F: Genoa + Bari + Modena + Matera
- Batch G: Catania + Trieste + Trento + Lecce

**Decision to run pre-research properly before finalising plan:**
The current batch plan is based on web research in this session. Several
things remain unconfirmed (Katie Parla Naples/Venice/Turin, Milan EN writer,
full Michelin exclusion lists, thin-city source viability). The next session
will run the Part 1 pre-research template for all 17 cities systematically,
then finalise the batch plan from confirmed data.

---

### Key Decisions

1. Incremental Next.js approach confirmed as preferred direction over
   full Supabase rebuild
2. Admin workflow in incremental approach: unchanged except 3–5 minute
   build delay after git push (automated via GitHub Actions)
3. App strategy: PWA → Google Play TWA → validate → Capacitor iOS only
   with proven demand. React Native only with proven substantial traction.
4. Data architecture for app: download-and-cache (Strategy C). Preserves
   pipeline rapid deploy cycle + enables offline + satisfies Apple 4.2.
5. Address field: navigation deep link first (zero effort), template
   change second (next pipeline run), reverse geocoding (high-confidence
   only) optional after
6. Part 1 pre-research template: established. File: localbite-part1-preresearch-template.txt
7. "Phase 0 enhancement" was incorrect framing — Phase 0 already exists
   and is automated. The new tool is Part 1 pre-research, which runs
   before the Part 1 file is written.
8. Year ranges: search queries use "2024 2025" (writer discovery signal);
   YEAR_RANGE: 2023-2026 (pipeline article acceptance window). Both correct.
9. Italy batch plan: drafted but NOT finalised. Finalise after proper
   pre-research session for all 17 cities.
10. Publish threshold: ≥10R minimum before publishing any city pack.
    Apply to Italian cities at review stage.

---

### Files Produced or Updated

NEW — requires commit:
- localbite-part1-preresearch-template.txt
- localbite-italy-part1-preresearch.md
- localbite-italy-execution-plan.md

UPDATED — requires commit:
- localbite-session-journal-2026-04-27.md (this file)

---

### Git Commands

```bash
git add localbite-part1-preresearch-template.txt \
        localbite-italy-part1-preresearch.md \
        localbite-italy-execution-plan.md \
        localbite-session-journal-2026-04-27.md
git commit -m "docs: Italy planning — Part 1 pre-research template, city research, batch plan draft"
git push
```

---

### Outstanding Items

**Next session (priority order):**
1. Run Part 1 pre-research for all 17 Italian cities systematically
   using the template — confirm DIRECT_FETCH_SOURCES for each city
2. Confirm Katie Parla guides for Naples, Venice, Turin at katieparla.com
3. Find dedicated EN food writer for Milan (critical gap)
4. Verify full Michelin 3★ + 2★ exclusion lists at guide.michelin.com/it
   for all 17 cities (not just counts)
5. Assess Trento and Matera source viability — decide whether to include
   in batch plan or park as "coming soon"
6. Finalise Italian batch plan from confirmed pre-research data
7. Begin writing Part 1 files for Batch A and B (Rome, Milan)

**Ongoing outstanding (from previous sessions, unchanged):**
- Valencia: Ojo al Plato both article URLs — browser-verified OK but
  worth re-checking before next rebuild
- Barcelona: Eixample centroid HIGH SPREAD — outlier geocode to null
- Fetch log template change — still pending implementation before next
  pipeline run
- postrun.js version string — still shows v3.0, effectively v3.3
- Logroño: Casco Antiguo centroid missing from index.html
- CENTROIDS naming collision architectural fix — still open

---

### Next Session Plan

See separate next session plan document.

*Fleet: 26 cities, ~836 restaurants, 2,296 index.html lines*

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

# LocalBite — Session Journal
## Session — 2026-04-28 (Italy Batch D: Bologna + Turin; postrun.js v3.4 fixes)

---

### Overview

Batch D session covering Bologna and Turin. Two cities committed and live. Fleet grew from 30 to 32 cities, 1064R to 1107R. Three pipeline-level fixes applied before launch: neighbourhood-first working file structure (compaction resistance), `it` added to language_pool both condition in postrun.js, and postrun.js version string updated to v3.4. hood-check.py created as reusable neighbourhood dropout diagnostic.

---

### Part 1 — Pre-Launch Fixes

Three fixes applied before any pipeline launched:

**Fix 1: Neighbourhood-first in working file template**
Root cause: Naples showed 30/62 restaurants losing neighbourhood during compaction-reconstruction. The working file JSON structure had neighbourhood as the 4th field — after _source_id, name, name_variants — making it vulnerable to truncation during compaction.
Fix: Moved neighbourhood to position 2 in the working file entry structure (immediately after name, before name_variants). Applied via Python str_replace to localbite-prompt-v7-template.txt. All 15 Italy full prompts regenerated via combine-italy-prompts.py.
Impact: Preventive — will be validated when the next city compacts.

**Fix 2: `it` missing from language_pool both condition in postrun.js STEP 1.5**
Root cause: The language_pool recalculation condition checked for `en` + `es/pt/fr/ca/ar` but not `it`. Result: Italian-city both_pool=True restaurants derived as `en` instead of `both`. Manual patch was required after every Italian city postrun (Milan, Florence, Naples — 3 cities affected).
Fix: Added `langs.has('it')` to the condition in postrun.js. One-line change.
Impact: Eliminated manual language_pool patch for all remaining Italian cities. Bologna confirmed working — 10 both_pool restaurants all showed `both` automatically after postrun.

**Fix 3: postrun.js version string**
Updated header from v3.3 to v3.4 to reflect the language_pool fix.
Outstanding: postrun output still shows v3.3 at runtime despite the file edit. Investigate at next session start — likely a cached read or the header read is from a different location in the file.

**Tool created: hood-check.py**
Reusable neighbourhood dropout diagnostic. Takes city JSON as argument. Shows neighbourhood distribution, flags dropout if None count > 5, lists fixable restaurants (null neighbourhood + valid coords). Replaces the inline Counter one-liner used for Naples/Milan/Florence.
Usage: `python3 hood-check.py localbite-[city]-italy-2023-2026.json`

---

### Part 2 — Italy Batch D: Bologna

**Pipeline:** Launched T1. 39 searches run. Compacted mid-Phase 2 — standard pattern. Total runtime: 54m 43s.

**Sources confirmed (7):**
- Katie Parla (katieparla.com) — EN, Phase 0, city guide Aug 2024
- Coral Sisk (The Curious Appetite) — EN, Jan 2026
- Monica Campagnoli (Food Notes from Bologna, Substack) — IT, Feb 2025, single-author site confirmed from About page
- Carolina Pozzi (CiboToday) — IT, Jun 2023
- Valerio De Cristofaro (Passione Gourmet) — IT, Jul 2025
- Fabio Riccio (Gastrodelirio) — IT, Oct 2025
- Floriana Barone (Luciano Pignataro Wine Blog) — IT, Apr 2024

**Results:** 20R, 7 sources, 10 both-pool (50% both-pool rate — highest in fleet)

**Both-pool pairs:** Al Cambio, All'Osteria Bottega, Trattoria di Via Serra, Ristorante Grassilli, Trattoria da Me, Trattoria Bertozzi, Trattoria Collegio di Spagna, Casa Merlò, Oltre., Ristorante Cesarina

**Postrun observations:**
- language_pool fix worked automatically — no manual patch needed
- 0 neighbourhood dropout — hood-check clean
- Centro Storico HIGH SPREAD (lat 0.0117) — genuine large neighbourhood, accepted
- 2 medium-confidence matches (Vâgh iñ Uffézí, Enoteca Storica Faccioli) — name variants, kept
- Grassilli + Serghei already nulled and geo_skip set by pipeline — good self-correction
- Floriana Barone article_url null — correct per rules (Jina returned homepage)
- CITY_BOUNDS widened from postrun-generated (44.48–44.53, 11.30–11.38) to geocoder bbox (44.46–44.55, 11.27–11.41)
- Concentration cap correctly applied: Teresina removed, Pozzi at 30%
- git add issue: pipeline didn't create failed-sources.txt — 2>/dev/null silenced the error but left Turin JSON untracked. Fixed by explicit add without the missing file.

Committed: 4c65a68

---

### Part 3 — Italy Batch D: Turin

**Pipeline:** Launched T2, 20 min after Bologna. 4 sources, 23 restaurants. Runtime: 44m 19s.

**Sources confirmed (4):**
- Mimi Thorisson (Airmail News) — EN, Phase 0
- Valentina Marino (Gambero Rosso) — IT
- Dario Bragaglia (CiboToday) — IT
- Mariarosaria Bruno (Fine Dining Lovers / finedininglovers.it) — IT

**Results:** 23R, 4 sources, 0 both-pool

**Both-pool analysis:** As predicted pre-session, Turin's IT source gap meant no cross-language both-pool pairs. Gambero Rosso + CiboToday both IT — valid cross-source but same language pool. Mimi Thorisson EN-only in Phase 0. No independent EN source found in Phase 1 to pair with IT sources.

**Postrun observations:**
- 96% geocoding rate — best of any Italian city (22/23 geocoded)
- La Piola d'le due Sörele (Falchera) at lat 45.0963, lng 7.7275 — outside postrun-generated CITY_BOUNDS but inside geocoder bbox. CITY_BOUNDS widening was essential or this restaurant would have been off-map.
- 4 medium-confidence matches — all legitimate partial name matches, kept
- Maison de Chef Rinoò not found by either geocoder — centroid fallback (Centro)
- Centro HIGH SPREAD (lng 0.0277) — Alberto Marchetti at lng 7.6610 is genuinely west on Corso Vittorio Emanuele II. Accepted.
- 0 neighbourhood dropout
- language_pool fix worked — IT restaurants correctly show `it`, Thorisson entries show `en`
- CITY_BOUNDS widened from postrun-generated (45.03–45.10, 7.61–7.71) to geocoder bbox (45.01–45.12, 7.58–7.74)
- FDL = finedininglovers.it (confirmed from article_url)

Committed: 61a8304

---

### Key Decisions

1. **language_pool bug is fixed in postrun.js — manual patch no longer required for Italian cities.** The `it` language code was simply absent from the both-pool condition. One-line fix eliminates a recurring manual step.

2. **Bologna's 50% both-pool rate is the fleet high-water mark.** Monica Campagnoli's Food Notes from Bologna Substack was the critical IT source — a genuine Bologna-resident food writer covering local trattorie in Italian. When a strong local IT voice is available, the both-pool signal is powerful.

3. **Turin's 0 both-pool is structural, not a pipeline failure.** IT sources dominated (3 of 4). No independent EN food writer covering Turin restaurants at depth was findable in Phase 1. Mimi Thorisson provided EN perspective but only 3 restaurants, not enough for cross-validation pairs. Rebuild trigger: if an EN source covering Turin restaurants with named author and 2023+ content is found.

4. **CITY_BOUNDS auto-generation being tighter than geocoder bbox is a confirmed systematic pattern.** Every Italian city so far has required widening. This is now a standard postrun step — check immediately after postrun, before approve-centroids.

5. **git add with 2>/dev/null masks missing files silently.** Turin's failed-sources.txt didn't exist (pipeline didn't create it). The 2>/dev/null suppressed the fatal error but also suppressed staging of all subsequent files in the command. Always verify commit included the JSON file. Fixed pattern: explicit git add without the optional files, or check `git status` before committing.

---

### Files Produced or Updated

**Committed to repo:**
- localbite-bologna-italy-2023-2026.json (new)
- localbite-turin-italy-2023-2026.json (new)
- localbite-bologna-italy-search-log.txt, fetch-log, search-plan, audit (new)
- localbite-turin-italy-search-log.txt, fetch-log, search-plan, audit (new)
- index.html — Bologna + Turin CITY_CENTRES and CITY_BOUNDS added/widened
- localbite-index.json — Bologna + Turin updated from coming_soon
- localbite-run-metrics.log — updated
- localbite-postrun.js — v3.4, `it` added to language_pool both condition
- localbite-prompt-v7-template.txt — neighbourhood-first in working file structure

**Created locally (not committed — standard exclusions):**
- hood-check.py — reusable neighbourhood dropout diagnostic (should be committed)
- All 15 Italy full prompts regenerated

**Note: hood-check.py should be committed** — it's a reusable tool, not a generated artefact or intermediate working file. Add at start of next session.

---

### Outstanding Items

**New this session:**
- **postrun.js version header shows v3.3 at runtime despite file edit to v3.4** — investigate at next session start. Possible causes: cached read, header in different location than edited, or the edit targeted the wrong string. Run `head -3 localbite-postrun.js` to verify file state.
- **hood-check.py not committed** — add at next session start with `git add hood-check.py && git commit -m "feat: hood-check.py reusable neighbourhood dropout diagnostic"`
- **Turin 0 both-pool** — structural IT source gap. Document as rebuild trigger if EN source found.
- **git add with 2>/dev/null masking fatal errors** — consider removing 2>/dev/null from standard commit commands or using explicit file lists without optional files.

**Carried from previous sessions:**
- Rome: Gambero Rosso 403 structural gap; Puntarella Rossa anonymous bylines; Elizabeth Minchilli 2023+ absent; Camilla Baresani article_url null; Katie Parla 64% concentration
- Barcelona: Eixample centroid HIGH SPREAD
- Valencia: Russafa + Gran Vía HIGH SPREAD
- Valladolid: article_url specificity (7R)
- Málaga: EWN redirect (2R)

---

### Fleet State

*Fleet: 32 cities, 1107 restaurants (verified via fleet script 2026-04-28)*

| City | R | BP | Geo% | Notes |
|------|---|----|----|-------|
| Bologna, Italy | 20 | 10 | 70% | 50% both-pool rate — fleet high. 7 sources. |
| Turin, Italy | 23 | 0 | 96% | IT source gap structural. 4 sources. |

**Italy coming_soon remaining (9 cities):** Venice, Palermo, Verona, Genoa, Bari, Modena, Lecce, Catania, Trieste
**Next pipeline:** Batch E — Venice + Palermo + Verona

## Session — 2026-04-29 (Italy Batch E: Venice + Palermo + Verona + viewer/data fixes)

### Overview
Batch E pipeline runs completed for Venice, Palermo, and Verona. Session also surfaced and fixed multiple viewer and data bugs affecting all Italian cities. Fleet grew from 32 to 35 cities, 1107R to 1181R.

---

### Pre-Pipeline Fixes

**Italian language support in viewer (4 bugs fixed):**
1. Turin and Bologna missing "Italian sources" filter option — `poolOptions` array lacked `['it','Italian sources']` entry
2. "it" rendering as raw code instead of "Italian" in card badges — `poolLabel` map lacked `it:'Italian'`
3. Milan card badges showing "Spanish" instead of EN/IT — `language_pool` was stuck on `'es'` default for 57 restaurants (pre-fix compaction artifact)
4. `langLabel` map lacked `it:'IT'` for source chip abbreviations

All fixed in one targeted index.html edit + Milan data patch. Committed: `fix: Milan language_pool patch (es->en/it); viewer Italian label + filter support`

**Milan sources list→dict conversion:**
Milan's `sources` field was a list instead of a dict, causing all restaurant cards to show blank source data. Fixed by matching source objects to IDs via URL pattern matching. All 10 sources matched 10/10. Committed separately.

**Rome dishes array→signature_dish:**
Rome pipeline used `dishes` (array) instead of `signature_dish` (string). Viewer only reads `signature_dish`. All 64 Rome restaurants had dish data but none displayed. Fixed by taking `dishes[0]` as `signature_dish`. This is a Rome-only issue — all other cities correctly use `signature_dish`.

**postrun.js version header:**
Runtime console.log still showed v3.3 despite file header being v3.4. One-line fix. Committed.

**hood-check.py committed:**
Outstanding from previous session. Committed as `feat: hood-check.py`.

---

### Venice v7.1

**Sources (6):** Katie Parla (EN), Giulia Gavagnin/Luciano Pignataro (IT), Elisa Bologna/Gambero Rosso (IT), Chiara Pavan & Francesco Brutto/Identità Golose (IT, ⚠ COI — chefs at Venissa), Silvia Cannas Simontacchi/SALT Editions (IT), Julia Buckley/Time Out Venice (EN)

**Phase 0:** Katie Parla CAPTCHA via Jina, resolved via direct fetch (121.9KB). Elizabeth Minchilli all 2012–2016, rejected. Wayback 451.

**Result:** 21R, 6 sources, 3 both-pool, 95% geocoded

**Postrun fixes:**
- `city_name` field instead of `city` — compaction reconstruction variant, patched before postrun
- Bepi Antico → "Antico Cimitero ebraico" (cemetery) — nulled
- Taverna La Fenice → "Teatro La Fenice" (theatre) — nulled
- CITY_BOUNDS widened to match geocoder bbox (covers Burano at lat 45.485)
- Cannaregio HIGH SPREAD accepted (long narrow sestiere, legitimate geographic spread)

**Committed:** `data: Venice v7.1 — 21 restaurants, 6 sources, 3 both-pool`

---

### Palermo v7.1

**Sources (7):** Francesco Cipriano/Culinary Backstreets (EN), Nico Cristiani/Scatti di Gusto (IT), Marco Colognese/Vendemmie (IT), Salvatore Ognibene/PalermoToday (IT) — 3 others from Phase 1

**Phase 0:** CB returned 80KB category page, 9 individual articles fetched. Geographic exclusions: U Puparu (Terrasini — outside comune), U Zu Caliddu (Torretta — separate comune), La Delizia (gelateria). Katie Parla 337 bytes (CAPTCHA).

**Michelin exclusion caught mid-pipeline:** Gagini Social Restaurant included by pipeline from Vendemmie source. Web search confirmed 1 Michelin star awarded March 2024. Removed from working.json but pipeline reconstructed it from transcript in Phase 3 — had to remove from final JSON post-postrun.

**Concentration cap:** CB at 40.9%, trimmed to 27.3% (6/22 → 6/19). Al Fresco, Trattoria Altri Tempi removed.

**Result:** 18R, 7 sources, 0 both-pool, 61% geocoded

**Postrun fixes:**
- Gagini removed from final JSON
- Trattoria Il Delfino → "Basile Trattoria-Focacceria del Massimo" — nulled
- Archestrato di Gela → "Via Archestrato di Gela" (street) — nulled
- Libertà Vini e Cucina → "La Duchessa Pizza e Cucina" — nulled
- CITY_BOUNDS widened
- Sferracavallo centroid rejected (outside bbox) — skipped, one restaurant affected
- 3 null article_urls: Cristiani, Colognese, Ognibene — correct per rules

**Committed:** `data: Palermo v7.1 — 18 restaurants, 7 sources, 0 both-pool`

---

### Verona v7.1

**Sources (6):** Vincenzo Pagano/Scatti di Gusto (IT), Manuela Donà/VeronaeSera (IT), Carolina Pozzi/CiboToday (IT), Chiara Lanari/Viaggieri Ritratti (IT), Alex Wieteska/Roam and Thrive (EN), Emma Myrick/Where's Emma Now (EN)

**Result:** 35R, 6 sources, 5 both-pool, 80% geocoded (97% before false positive nulls)

**Postrun fixes:**
- 6 false positive geocodes nulled: Caffè Monte Baldo (street), Osteria Trattoria al Duomo, Antica Amelia Bistrot, Osteria all'Organetto, Osteria Pericotti, Trattoria Alla Fedeltà
- CITY_BOUNDS widened
- San Zeno centroid: Nominatim matched Bardolino (wrong city) — manual coordinates set [45.4420, 10.9820]
- approve-centroids TypeError on null_coord_restaurants for manually-patched entry — workaround: patch field directly in JSON

**Committed:** `data: Verona v7.1 — 35 restaurants, 6 sources, 5 both-pool`

---

### Key Decisions

**Gagini Michelin blanket rule applies regardless of article date:** Vendemmie article citing Gagini dated June 2023 (before star awarded March 2024). Blanket exclusion rule still applies — Gagini held a star within the year range 2023–2026.

**Milan sources list→dict is a compaction reconstruction artifact:** Milan's compaction produced a list instead of dict. Other Italian cities (Rome, Bologna, Florence, Naples, Turin) also have list-format sources but cards display correctly — likely because those cities use positional source IDs (S1, S2) or the viewer has fallback logic. Only Milan was broken. Do not retroactively patch others unless cards break.

**`city_name` is a known compaction reconstruction variant for the `city` field:** postrun.js should auto-repair this in Step 1 (same as `source_id` → `id`). Outstanding engineering item.

**approve-centroids TypeError on manually-patched centroids:** When manually setting centroid coordinates in `centroids_proposed`, the `null_coord_restaurants` field must also be included or approve-centroids crashes. Workaround: add the field in the patch script. This is a bug in approve-centroids — it should handle missing `null_coord_restaurants` gracefully.

---

### Files Produced or Updated

| File | Status |
|------|--------|
| index.html | Updated (Italian label support + 3 CITY_BOUNDS + CITY_CENTRES) |
| localbite-milan-italy-2023-2026.json | Updated (language_pool patch + sources dict) |
| localbite-rome-italy-2023-2026.json | Updated (dishes → signature_dish) |
| localbite-postrun.js | Updated (v3.3 → v3.4 runtime string) |
| hood-check.py | New (committed) |
| localbite-venice-italy-2023-2026.json | New |
| localbite-venice-italy-{search-log,fetch-log,search-plan,audit}.txt | New |
| localbite-palermo-italy-2023-2026.json | New |
| localbite-palermo-italy-{search-log,fetch-log,search-plan,audit}.txt | New |
| localbite-verona-italy-2023-2026.json | New |
| localbite-verona-italy-{search-log,fetch-log,search-plan,audit}.txt | New |

---

### Outstanding Items

- **postrun.js auto-repair for `city_name` → `city`** — compaction variant confirmed in Venice, should be handled automatically like `source_id` → `id`
- **approve-centroids graceful handling of missing `null_coord_restaurants`** — crashes with TypeError when field absent in manually-patched centroid
- **Palermo 0 both-pool structural gap** — CB EN + IT sources cover non-overlapping restaurants. Rebuild trigger: find IT source covering same restaurants as CB
- **Venice: Identità Golose article_url null** — Chiara Pavan & Francesco Brutto, COI source. Cannot be confirmed from fetch
- **Batch F next:** Genoa + Bari + Modena + Lecce — full prompts on disk

*Fleet: 35 cities, 1181 restaurants*

# LocalBite Session Journal — 2026-04-29
## Batch F (Genoa + Modena + Bari + Lecce) + Viewer Fixes + Process Engineering

---

### Overview

Long session (~6 hours active). Three distinct workstreams ran in parallel or sequence:

1. **Batch E viewer bug resolution** — 6 user-facing issues fixed and committed at session start
2. **Engineering fixes A and B** — postrun.js and approve-centroids.js structural fixes
3. **Batch F pipeline runs** — Genoa, Modena, Bari, Lecce all completed and committed
4. **Reactive bug fixes** — viewer loading broken for all dict-sources cities, Vigo sources, Palermo article_urls
5. **Process analysis and Fix 1** — thorough review of postrun inefficiencies; CITY_BOUNDS pad=0 implemented

Session ended with a detailed lessons learned and forward planning discussion.

---

### Batch E Viewer Fixes (committed at session start — commit e1666bd)

Six issues identified and resolved:

| Issue | Fix |
|-------|-----|
| Verona: Vescovo Moro neighbourhood showing Centro Storico | Changed to San Zeno via fix-issue2 script |
| Málaga: sources list instead of dict | Converted 6 entries via fix-issue3 script |
| Venice: Identità Golose writer_profile contained operational COI text | Cleaned to user-facing only |
| Palermo: Spain pin (stale cache) | No data fix needed — cache issue |
| Palermo: sources list instead of dict | Converted 7→5 entries (2 ghost CB entries dropped) via fix-issue6 script |
| Vigo: sources list instead of dict (discovered later) | Converted 3 entries, committed separately |

Root cause of "Could not load city" error for all recently converted cities: viewer `loadCity()` used `.forEach()` assuming sources was always an array. Fixed with `Array.isArray(data.sources) ? data.sources : Object.values(data.sources || {})` in two places. This was the highest-impact fix of the session — it affected every city with dict-format sources simultaneously. **Commit 767a1bb.**

---

### Engineering Fixes A and B (commit aa086ea)

**Fix A — postrun.js city_name→city auto-repair:** Inserted before `const city = data.city` in Step 1. When pipeline compaction produces `city_name` instead of `city`, postrun now auto-repairs before throwing an error. 30/30 tests passed.

**Fix B — approve-centroids.js null_coord_restaurants guard:** Changed `entry.null_coord_restaurants.join()` to `(entry.null_coord_restaurants || []).join()`. Prevents TypeError crash when field is absent after manual centroid patching. Confirmed in Verona v7.1 context.

---

### Batch F Pipeline Results

#### Genoa v7.1
- **Sources:** Enrica Monzani/A Small Kitchen in Genoa (EN ×2), Angela Caporale/Il Giornale del Cibo (IT), Mariarosaria Bruno/Fine Dining Lovers IT (article_url nulled — undated list page)
- **Result:** 27R, 4 sources, 5 both-pool
- **Michelin excluded:** Il Marin (1★), San Giorgio (1★)
- **Postrun issues:** 6 false positive geocodes nulled (Montallegro=nursing home, L'Embriaco=bridge, Teresa dal 1986=church, Trattoria Barisone=piazza, Coco Sul Mare=wrong area, La Voglia Matta=wrong coordinates). 3 postrun runs required. Antigua Osteria Toe Drue orphan assigned Centro Storico. Voltri centroid rejected (outside bbox). Sources list→dict (4 entries).
- **Commit:** 7858f8a

#### Modena v7.1
- **Sources:** Katie Parla/katieparla.com (EN, 2022-12-24 — operator confirmed updated Nov 2025, kept), Carlo Gibertini/Cibo Today (IT), Nico Cristiani/Scatti di Gusto (IT), Luca Scainelli/Errante del Gusto (IT)
- **Result:** 10R, 4 sources, 0 both-pool — structural gap (EN coverage overwhelmingly Osteria Francescana/Bottura)
- **Postrun issues:** Gnock & Roll orphan. Writer profile contamination (Gibertini: "concentration cap applied"; Scainelli: "Tier A status") — both cleaned. 2 postrun runs. Sources list→dict (4 entries).
- **Commit:** 1726313

#### Bari v7.1
- **Sources:** Stefania Leo/BariToday (IT, 2024-04-02), Donatella Nitri/Mi Mangio Bari (IT, single-author), Alex Wieteska/Roam & Thrive (EN, 2025-06-19)
- **Result:** 14R, 3 sources, 7 both-pool (50% both-pool rate)
- **Pipeline:** Rate limit hit mid-write during Phase 3 — raw.json written (19R), final JSON never created. Reconstructed via reconstruct-bari.py applying pipeline's Phase 3 decisions: removed La Bul (null hood), Vettor (null hood), Pizzeria di Cosimo (pizzeria), Damé (cap), Bella Bari (cap).
- **Postrun issues:** Antica Santa Lucia nulled (lat=41.139 — wrong area, matched wrong Bari). CITY_BOUNDS string format mismatch required manual lookup. Sources already dict from reconstruction script.
- **Commit:** 091fed1

#### Lecce v7.1
- **Sources:** Marina Alajmo/Gambero Rosso International (EN, Oct 2023), Alex Wieteska/Roam & Thrive (EN, May 2025), Valentino Interlandi/Cibo Today (IT, Jun 2025), Renata Coti/Italy Unseen (EN, Nov 2023), Emma Myrick/Where's Emma Now (EN, Apr 2024, 0R referenced), Maria Teresa Giannini/2night.it (IT, Nov 2025)
- **Result:** 26R, 6 sources, 4 both-pool
- **Pipeline:** 3 rate limit hits + session resumes. Each resume restarted all 33 Phase 1 searches from scratch despite search log existing — significant rate budget waste.
- **Bros' exclusion:** Pipeline included Bros' (Michelin 1★ since 2018, confirmed in 2025 guide). Caught post-pipeline via web search. Removed before postrun. This should have been in the Part 1 MICHELIN_STARRED_EXCLUSIONS. Pre-research failure.
- **Postrun issues:** Dedo Osteria nulled (matched "Osteria di Lecce"), Trattoria San Lazzaro nulled (matched "Trattoria San Carlino"). Alex and Osteria 203 null neighbourhoods assigned Centro Storico. 3 Nominatim centroid queries all rejected outside bbox (Leuca→Santa Maria di Leuca 40km south, San Lazzaro→wrong area, Stadio→outside bbox). Manual coordinates set for all 3. Sources list→dict (6 entries). Duo Ristorante confirmed no star (Michelin "Good cooking" mention only — kept).
- **Commit:** 814f871

---

### Reactive Fixes

**Viewer loading broken for all dict-sources cities** (Málaga, Milan, Genoa, Modena, Bari etc): Root cause identified as viewer `loadCity()` calling `.forEach()` on `data.sources`. Fixed with `Array.isArray()` check in two places. All 7 checks passed before commit. **Commit 767a1bb.**

**Vigo sources list→dict:** Converted 3 entries (all article_urls null — correct per existing rules; Metropolitano.gal is a 403 geo-block). **Commit 438a661.**

**Palermo article_url recovery:** Scatti di Gusto (`https://www.scattidigusto.it/palermo-migliori-ristoranti-dove-mangiare`) and Vendemmie (`https://vendemmie.com/focus-mese/la-magia-di-palermo-dieci-luoghi-del-gusto-dove-mangiare-e-bere/`) URLs found via web search and confirmed from search result content. Added to sources. **Commit 1443738.**

---

### Process Engineering

**Fix 1 — CITY_BOUNDS pad=0 (postrun.js line 691):**
Changed `const pad = 0.20` to `const pad = 0.0` and updated the comment. The 20% inward shrink has required manual widening on every Italian city ever processed (13 cities). The fix generates CITY_BOUNDS matching the geocoder bbox exactly. **Applied but not yet committed — pending commit at session end.**

**Fix 6 — Dropped.** Proposed "standard article_url recovery step" was reviewed critically and rejected. The existing article_url confirmation rule is clear and correct. The Palermo recovery was a one-off judgment call, not a pattern worth encoding. Adding a web-search recovery step would contradict or complicate the fixed definition. Postrun already warns loudly about null article_urls — no additional documentation needed.

---

### Lessons Learned

**1. The tooling investment point has passed.** Fixes 1-3 across the engineering backlog would have saved more time in Batches D, E, and F combined than they will take to implement. The decision to run another batch before fixing the tooling has been a net negative across multiple sessions.

**2. "Identified but not fixed" gap is the primary source of cumulative manual work.** CITY_BOUNDS was documented as a systematic problem after Rome. It ran unfixed for 13 cities. Sources list→dict is currently in the same state.

**3. The viewer loading bug was avoidable.** When list→dict conversion was first applied to Italian cities, the question "what else in the codebase assumes list format?" was never asked. One audit pass at the time of the first conversion would have caught the viewer bug before it became a multi-city production problem.

**4. Bros' exclusion miss was a pre-research failure, not a pipeline failure.** Bros' is one of the most famous restaurants in Lecce with a star since 2018. It should have been in MICHELIN_STARRED_EXCLUSIONS in the Part 1 file. It wasn't caught until I happened to see the working.json output while the session was running. Luck, not process.

**5. Rate limit resume behaviour wastes budget on already-completed work.** Resumed sessions restart Phase 1 searches from scratch even when the search log exists. For Lecce, all 33 searches and most verification fetches were re-executed 2-3 times. This is a structural inefficiency in the pipeline that compounds with rate limit frequency.

**6. Both-pool rate is a leading indicator of pre-research quality.** When both-pool is low despite multiple sources, the sources are covering different parts of the city's dining landscape. That's a Part 1 problem. For Lecce specifically: 4 EN sources + 2 IT sources but only 4 both-pool means the EN and IT pools are covering largely non-overlapping restaurants. A more Lecce-specific IT source would have improved this significantly.

**7. Alex Wieteska (Roam & Thrive) is becoming the default Pugliese EN source.** She appears in Bari and Lecce. Her coverage skews toward accessible/atmospheric trattorias. For future Pugliese cities (Catania is Sicilian but similar dynamic), specifically prioritise a second non-regional EN source during pre-research.

**8. Small cities are expensive relative to output.** Modena (10R, 0BP) cost roughly the same rate budget as Bologna (20R, 10BP). Thin cities where EN media coverage is dominated by one famous restaurant (Osteria Francescana) should use a lighter-weight manual curation process rather than the full 33-query pipeline grid.

**9. Session length degrades decision quality.** The Bros' miss and several late-session CITY_BOUNDS string format failures happened in the second half of a 6-hour session. A hard stopping point for new pipeline work after hour 4 would reduce end-of-session errors.

**10. The viewer smoke test is missing from the workflow.** After every commit, there is no systematic check that cities load correctly in the live viewer. A 5-item, 2-minute checklist (city loads, cards appear, source chips appear, Sources panel opens, both-pool badge correct) would have caught the viewer loading bug and the Palermo source links before they became user reports.

**11. The global instructions document needs structural reform.** At 200+ items, it's too long to scan for operationally critical items. Three-tier split proposed: Tier 1 (rules on every run), Tier 2 (city-specific decisions and repair logs), Tier 3 (engineering backlog — separate file).

---

### Commits This Session

| Commit | Description |
|--------|-------------|
| e1666bd | Batch E viewer bugs — 6 fixes |
| aa086ea | Engineering fixes A+B (postrun city_name→city, approve-centroids null_coord_restaurants) |
| 7858f8a | Genoa v7.1 — 27R, 4 sources, 5 both-pool |
| 1726313 | Modena v7.1 — 10R, 4 sources, 0 both-pool |
| 091fed1 | Bari v7.1 — 14R, 3 sources, 7 both-pool |
| 438a661 | Vigo sources list→dict fix |
| 767a1bb | Viewer sources list/dict compatibility fix |
| 814f871 | Lecce v7.1 — 26R, 6 sources, 4 both-pool |
| 1443738 | Palermo Scatti di Gusto + Vendemmie article_urls added |
| pending | postrun.js Fix 1: CITY_BOUNDS pad=0 |

---

### Outstanding Items

**Engineering backlog (prioritised):**
- [ ] **P0 — Fix 2:** postrun.js Step 1.5 sources list→dict auto-repair (~50 min)
- [ ] **P0 — Fix 3:** geocode.js landmark/street false positive detection (~90 min)
- [ ] **P1 — Fix 4:** Nominatim centroid query improvement — `quartiere ${nb}, ${city}` prefix (~40 min)
- [ ] **P1 — Fix 5:** pre-postrun-check.py diagnostic script (~90 min)
- [ ] **P1 — postrun.js:** city_name→city should also auto-repair in Step 1 (same pattern as source_id→id) — already done via Fix A but verify it handles the `centroids_proposed` field too
- [ ] **P2 — approve-centroids.js:** handle missing null_coord_restaurants gracefully (TypeError guard added via Fix B but broader defensive handling needed)
- [ ] **P2 — Viewer smoke test checklist:** 5-item post-commit check added to session protocol

**Data issues:**
- [ ] Commit postrun.js Fix 1 (CITY_BOUNDS pad=0) — pending from this session
- [ ] El Jardín Málaga: lat=36.7429 is too far north of Centro Histórico — likely false geocode, verify and null if wrong
- [ ] Eixample centroid Barcelona HIGH SPREAD — fix at next Barcelona rebuild
- [ ] Russafa and Gran Vía Valencia HIGH SPREAD — fix at next Valencia rebuild

**Italian pipeline:**
- [ ] Batch G: Catania + Trieste — full prompts ready locally
- [ ] Trento and Matera remain parked (no qualifying sources found)
- [ ] Emma Myrick (Where's Emma Now) referenced in Lecce sources but 0 restaurants — she pulled 0 qualifying entries; her source entry is in the dict but links to no cards. Not a bug but worth noting.

**Structural:**
- [ ] Global instructions three-tier restructure: Tier 1 (operational rules), Tier 2 (city decisions/repair logs), Tier 3 (engineering backlog as separate file)
- [ ] Engineering backlog: create `localbite-engineering-backlog.md` as separate file with P0/P1/P2 priorities

---

### Files Produced or Updated

| File | Status |
|------|--------|
| localbite-genoa-italy-2023-2026.json | New |
| localbite-modena-italy-2023-2026.json | New |
| localbite-bari-italy-2023-2026.json | New |
| localbite-lecce-italy-2023-2026.json | New |
| localbite-palermo-italy-2023-2026.json | Updated (article_urls) |
| localbite-vigo-2023-2026.json | Updated (sources list→dict) |
| localbite-malaga-2023-2026.json | Updated (sources list→dict — Batch E) |
| localbite-milan-italy-2023-2026.json | Updated (language_pool + sources — Batch E) |
| index.html | Updated (CITY_CENTRES, CITY_BOUNDS, CENTROIDS for new cities; viewer fix; Verona neighbourhood fix) |
| localbite-index.json | Updated (41 entries total) |
| localbite-postrun.js | Updated (Fix A: city_name→city; Fix 1: CITY_BOUNDS pad=0) |
| localbite-approve-centroids.js | Updated (Fix B: null_coord_restaurants guard) |
| reconstruct-bari.py | New (reconstruction script from raw.json after rate limit) |

---

*Fleet: 39 cities, 1258 restaurants — all v7.1*


## Session — 2026-04-30 (Engineering First + Batch G + Italian URL Verification)

### Overview
Fix 2 implemented, Fix 3 deferred permanently, El Jardín Málaga geocode nulled, Batch G (Catania + Trieste) completed, Italian URL verification run, 9 null article_urls patched across 5 cities, fetch logs archived, postrun optimization analysis conducted. Italy pipeline now complete — 15 cities total.

---

### Engineering Work

#### Fix 2 — postrun.js sources list→dict auto-repair (commit 0a91def)
Inserted at Step 1.5 in the auto-repair block. `Array.isArray(data.sources)` check added — when list is detected, converted to dict keyed by `s.id || s.source_id`. Option A implemented (no `autoRepaired++` to avoid ReferenceError). Tested via isolated JS harness: (a) list→dict ✓, (b) dict unchanged ✓, (c) missing-id drop + warn ✓. Fix 2 fired correctly on Trieste postrun (confirmed in postrun output).

#### Fix 3 — deferred permanently
Universal scope required. The landmark/street false positive detection must cover all countries, not Italy-only. Current fleet is too Spain-heavy to scope non-Italian vocabulary without risking regressions. Retroactive remediation cost documented: all cities at implementation time need a read-only audit pass. **Decision: Revisit at 50+ cities or new country addition (France, UK). Do not implement as Italy-only.**

#### Repo housekeeping (commit 3b535df)
`.gitignore` updated with pipeline artifact patterns. `local-eats-spec.md` committed. Failed-sources files for Modena, Venice, Verona committed. ~100 untracked files cleared.

#### El Jardín Málaga geocode nulled (commit ded08bc)
lat=36.7429 confirmed 2.5km north of Centro Histórico (actual address: C. Cañón 1, lat~36.7203). Patched: lat/lng/geo_source/geo_confidence/geo_matched_name → null, geo_skip → true.

---

### Batch G Pipeline Results

#### Catania v7.1

**Sources:**

| Writer | Publication | Language | Date |
|--------|-------------|----------|------|
| Valentina Marino | Gambero Rosso | IT | 2024-01-04 |
| Mariarosaria Bruno | Fine Dining Lovers IT | IT | 2024-09-04 |
| Gayle Brennan Spencer | Postcards from San Antonio | EN | 2025-05-09 |
| Paolo Li Rosi | Culture & Terroir | IT | 2023-12-11 |

**Result:** 16R (18R raw → 16R after manual removal of Sapio and Coria — both 1★ Michelin, survived Phase 3), 4 sources, 3 both-pool

**Postrun issues resolved:**
- Concezione Restaurant geocode nulled (Via Concezione street false positive)
- Le Tre Bocche neighbourhood reassigned: Centro Storico → Picanello (lat 37.5233 confirmed ~1.4km north of cluster)
- Tantikkia Cucina e Vino neighbourhood assigned: Centro Storico
- 7/16 geocoded (44%), 3 both-pool, 3 centroids (Centro Storico, Ognina, Borgo)

**Commits:** 952a614 (data), 816deb5 (Mariarosaria Bruno writer_profile COI operational language removed)

---

#### Trieste v7.1

**Sources:**

| Writer | Publication | Language | Date | Notes |
|--------|-------------|----------|------|-------|
| Marco Colognese | milanowineweek.com | IT | 2023-09-06 | |
| Lucia Nuzzaci | souvenirdiviaggio.it | IT | 2024-07-15 | |
| Michela Becchi | gamberorosso.it (buffet) | IT | 2024-06-23 | COI |
| Emma Myrick | wheresemmanow.com | EN | 2023-04-06 | |
| Valentina Salcedo | liveinitalymag.com | EN | 2026-04-12 | |
| Claudia Concas | finedininglovers.com | EN | 2023-02-23 | COI |

**Result:** 14R, 6 sources, 2 both-pool

**Postrun issues resolved:**
- Harry's Piccolo (2★) correctly excluded by pipeline
- 3 orphan neighbourhoods assigned via web search: Buffet Clai → Centro (Via Ugo Foscolo 4), Da Siora Rosa → Città Vecchia (Piazza Hortis 3), Buffet L'Approdo → Centro (Via Carducci 34)
- Trattoria Le Barettine neighbourhood assigned: Città Vecchia (lat 45.6473)
- Antica Trattoria Suban (lat 45.6534, San Giovanni): confirmed within Comune di Trieste, founded 1865, correct geocode
- 13/14 geocoded (93%), Fix 2 auto-repair fired correctly, Città Vecchia centroid averaged from 4R

**Commit:** 3b22066

**Viewer smoke test:** Pending — Trieste not yet verified in live viewer.

---

### Italian URL Verification

Full verification run across all 15 Italian city JSONs. 70 unique article_urls checked.

**9 null article_urls patched across 5 cities:**

| City | Writer | URL Patched | Commit |
|------|--------|-------------|--------|
| Naples | Katie Parla | https://katieparla.com/city-guides/naples/ | 19a0c2f |
| Naples | Santa di Salvo (Jan 2025) | https://www.lucianopignataro.it/a/guidae-migliori-trattorie-di-napoli/82964/ | 19a0c2f |
| Naples | Diana Bancale | https://inviaggiodasola.com/dove-mangiare-a-napoli-migliori-trattorie-ristoranti-tipici/ | 19a0c2f |
| Naples | Gabriela Proietti | https://www.timeout.com/naples/restaurants/best-restaurants-in-naples | 19a0c2f |
| Bologna | Floriana Barone | https://www.lucianopignataro.it/a/la-trattoria-di-via-serra-a-bologna-la-cucina-della-tradizione-di-flavio-benassi-e-tommaso-maio/251700/ | 767ebe3 |
| Genoa | Mariarosaria Bruno | https://www.finedininglovers.it/esplora/liste/migliori-ristoranti-genova | 767ebe3 |
| Palermo | Salvo Ognibene | https://www.palermotoday.it/cibo/mappe/ristoranti-palermo-trattorie-colazione.html | 767ebe3 |
| Rome | Camilla Baresani | https://www.camillabaresani.com/i-miei-articoli/ristoranti/ | 767ebe3 |
| Venice | Chiara Pavan & Francesco Brutto | https://www.identitagolose.it/sito/it/59/33080/storie-di-gola/la-venezia-dei-veneziani-30-indirizzi.html | 767ebe3 |

**Structural issues documented (no action required):**
- Gambero Rosso 403 (Catania, Florence, Trieste, Turin, Venice) — fetch limitation, links work in browser
- All other redirects confirmed non-issues (www canonicalisation)

**Italian fetch logs archived:** `localbite-italian-cities-fetch-report-2026-04-30.md` — covers all 15 cities, 283 log lines, full city-by-city summary including rejection reasons, CAPTCHA/403 patterns, COI flags.

---

### Postrun Optimization Analysis

Detailed analysis conducted this session identifying six core inefficiencies in the current postrun workflow:

1. **Reactive discovery** — issues surface incrementally rather than in one structured review
2. **Incremental commits** — commit count reflects discovery pattern, not session structure
3. **URL verification decoupled** — null article_urls accumulate for months before verification runs
4. **Neighbourhood assignment reactive** — no reference library, fresh web search per orphan
5. **Geocode quality checks manual** — no automated false positive distance or name-diff check
6. **Failed-sources files loosely managed** — 6 Italian cities missing files from compaction dropout

**Proposals documented (prioritised):**
- P1 (highest leverage): QA block in postrun output — structured operator checklist at end of every postrun run
- P2: Article_url validation at pipeline creation — surfaces nulls immediately, not months later
- P3 (medium term): Neighbourhood reference library — stored centroids and boundaries per city
- P4: Batch postrun mode — all cities in a session processed together with combined QA report
- P5: Failed-sources integrated into postrun commit — sidecar file always written and committed
- P6 (longer term): Review-then-act geocode pattern — structured decision file before patching

---

### Decisions

**Fix 3 deferred permanently:** Universal scope required — must cover all countries, not Italy-only. Retroactive audit required at implementation time. Revisit at 50+ cities or new country batch. Do not implement as Italy-only partial fix.

**Writer locality product question deferred:** Fleet audit found ~20+ travel blogger sources across 15+ cities. "Local writer" criterion not currently defined. Three options evaluated: (a) no change, (b) soft preference signal, (c) hard rule. Decision deferred to dedicated product session. Do not retroactively remove existing sources based on writer locality.

---

### Lessons Learned

**1. The QA block is the single highest-leverage postrun improvement.** Everything else is easier once the operator has a structured review agenda instead of discovering issues reactively.

**2. URL verification should run immediately after each batch, not months later.** The 9 null article_urls patched today existed since those cities were built. A post-batch URL check would have caught them immediately.

**3. Fix 2 confirmation in production.** The auto-repair fired correctly on Trieste postrun. Fix 2 is fully operational.

**4. Gambero Rosso false positive on Sapio and Coria.** Both restaurants survived Phase 3 of the Catania pipeline despite being Michelin 1★. Manual removal required post-pipeline. Pre-research exclusion list must be more thorough for Sicilian cities — Gambero Rosso Italia starred guide should be checked, not just Michelin.com.

**5. Italy pipeline complete.** 15 cities total at v7.1. The Italian batch sequence (A through G) is finished. The fleet is now more Italy-heavy than Spain for the first time.

---

### Commits This Session

| Commit | Description |
|--------|-------------|
| 0a91def | fix: postrun Fix 2 — auto-repair sources list→dict |
| ded08bc | fix: null El Jardín Málaga wrong geocode |
| 3b535df | chore: .gitignore update, spec doc, missed failed-sources files |
| 952a614 | data: Catania v7.1 — 16R, 4 sources, 3 both-pool |
| 816deb5 | fix: Catania Mariarosaria Bruno writer_profile cleaned |
| 3b22066 | data: Trieste v7.1 — 14R, 6 sources, 2 both-pool |
| 19a0c2f | fix: Naples — add 4 missing article_urls |
| 767ebe3 | fix: add missing article_urls for 5 Italian cities (Bologna, Genoa, Palermo, Rome, Venice) |

---

### Outstanding Items

**Engineering:**
- [ ] **P1 — Postrun QA block:** Structured operator checklist emitted at end of every postrun run
- [ ] **P1 — Article_url validation at pipeline creation:** Nulls and non-resolving URLs flagged immediately
- [ ] **P2 — Neighbourhood reference library:** `localbite-neighbourhoods.json` with centroids per city
- [ ] **P2 — Failed-sources sidecar integration:** postrun.js always writes and commits failed-sources alongside data
- [ ] **P3 — Fix 4:** Nominatim centroid query improvement (~40 min)
- [ ] **P3 — Fix 5:** pre-postrun-check.py diagnostic script (~90 min)
- [ ] **P3 — Fix 3 (deferred):** Universal false positive geocode detection — revisit at 50+ cities
- [ ] **Global instructions:** Three-tier restructure (Tier 1 operational / Tier 2 city decisions / Tier 3 backlog)
- [ ] **Engineering backlog file:** Create `localbite-engineering-backlog.md`

**Data:**
- [ ] **Trieste:** Viewer smoke test still pending
- [ ] **Valencia Ojo al Plato:** Both article_urls return homepage — 40R affected, P1
- [ ] **Valladolid Recomiendo Valladolid:** Single Flamma review URL used for 7 other restaurants
- [ ] **Barcelona:** Eixample centroid HIGH SPREAD — natural rebuild trigger
- [ ] **Valencia:** Russafa and Gran Vía HIGH SPREAD — natural rebuild trigger

**Product:**
- [ ] **Writer locality definition:** Deferred — dedicated product session
- [ ] **Viewer CSS:** Source link wrapping on long writer labels (low priority)

---

### Files Produced or Updated

| File | Status |
|------|--------|
| localbite-catania-italy-2023-2026.json | New |
| localbite-trieste-italy-2023-2026.json | New |
| localbite-naples-italy-2023-2026.json | Updated (4 article_urls) |
| localbite-bologna-italy-2023-2026.json | Updated (1 article_url) |
| localbite-genoa-italy-2023-2026.json | Updated (1 article_url) |
| localbite-palermo-italy-2023-2026.json | Updated (1 article_url) |
| localbite-rome-italy-2023-2026.json | Updated (1 article_url) |
| localbite-venice-italy-2023-2026.json | Updated (1 article_url) |
| localbite-malaga-2023-2026.json | Updated (El Jardín geocode nulled) |
| localbite-postrun.js | Updated (Fix 2: sources list→dict auto-repair) |
| localbite-italian-cities-fetch-report-2026-04-30.md | New |

---

*Fleet: 41 cities, 1288 restaurants — Italy pipeline complete (15 cities)*

# LocalBite Research Journal — Session 2026-04-30

**Session title:** Source analysis deep dive — B1/B2 methodology, new sources, viewer impact, implementation plan  
**Duration:** Full day  
**Pipeline runs:** Zero — analysis session only  
**Fleet at session start:** 41 cities, 1,288R, 119 BP (9.2%), all v7.1

---

## Overview

No pipeline runs this session. Entire session was analytical: reviewing B1/B2 source analysis methodology, identifying genuine new sources across the fleet, assessing the viewer impact of the proposed both-pool definition change, and producing a complete implementation plan. Three major findings with concrete action items.

---

## Finding 1 — B1 methodology flaw identified and corrected

The B1 analysis (run in an earlier session) concluded "+2 new sources" across the fleet. This was wrong because B1 tested whether specific pack restaurants had coverage elsewhere — one restaurant per city. The correct methodology for source discovery is: which publications cover restaurants in our pack broadly, and how many?

A publication that covers 15 Rome pack restaurants is enormously valuable. B1's one-restaurant-per-city approach would find it only if that specific restaurant happened to appear in a search — which is unlikely.

This explains why the conclusion was "+2 sources" when the correct answer (after today's analysis) is 83 new source candidates across 40 of 41 cities.

**Established:** B1 searches should test publications against multiple pack restaurants, not single restaurants against all publications. Future B1 runs must ask: "which publications cover the kinds of restaurants in our pack?" not "does this specific restaurant have other coverage?"

---

## Finding 2 — New sources: 83 candidates, 40/41 cities

Only Chefchaouen has no new source candidates. Every other city has at least one genuinely new source (not in the fleet in any other city) that qualifies or likely qualifies.

**The systematic gap:** No Italian regional newspaper appears in the fleet's 165 unique publications despite all 15 Italian cities having major local newspapers. The pre-research template searches by city but never asks "what is this city's newspaper and does it have a named food critic?"

**Source tiers established:**

*Local (writer lives in / deeply covers the city):*
- Rachel Roddy / The Guardian — Rome-resident, writes exclusively about Roman food
- New Roman Times (Substack) — Rome-based journalist, Rome-only newsletter
- Il Mattino — Naples daily newspaper, named food critics
- La Stampa / TorinoSette — Turin's main newspaper
- Il Secolo XIX — Genoa's main newspaper
- Il Gazzettino — Venice/Veneto newspaper
- L'Arena — Verona local paper
- Giornale di Sicilia / La Sicilia — Sicily's newspapers
- Il Piccolo — Trieste local paper
- La Gazzetta del Mezzogiorno — Bari/Puglia newspaper
- Il Resto del Carlino — Bologna newspaper
- Gazzetta di Modena — Modena local paper
- Corriere della Sera — Milan-based, Italy's largest newspaper
- La Nazione / Corriere Fiorentino — Florence press
- Heraldo de Aragón — Zaragoza (different from HoyAragón already in fleet)
- La Rioja (newspaper) — Logroño
- Faro de Vigo — Vigo local paper
- La Verdad — Murcia's main newspaper
- Diario de Navarra — Pamplona
- El Norte de Castilla — Valladolid
- SUR — Málaga newspaper
- Levante-EMV / Las Provincias — Valencia regional press
- El Correo de Andalucía / ABC de Sevilla — Seville press
- Diario de Mallorca — Palma (different from Ultima Hora)
- Jornal de Notícias — Porto's main newspaper

*Regional (city-primary coverage):*
- La Vanguardia Comer — Catalan newspaper, Barcelona-primary
- La Voz de Galicia — Covers A Coruña, Vigo, Santiago simultaneously
- TelQuel — Morocco's leading French-language magazine, covers 3 cities

*National (product decision required):*
- El Comidista / El País — Named individual critics cover all 19 Spanish cities
- El Mundo / Metrópoli — Named critics, Spain-wide
- Observador gastronomy — Portugal

*International (deferred):*
- Financial Times, Bon Appétit — Lower product alignment

**Key insight on El Comidista:** Fleet precedent (Lauren Aloise covers 5 Spanish cities without residing in most of them) already resolves the writer-locality question in favour of El Comidista qualifying. A formal product decision is needed to confirm this consistently.

---

## Finding 3 — Viewer and system impact of definition change

The definition change has specific consequences documented here in full for the first time:

**What changes:**
1. `language_pool = 'both'` now means cross-publisher, not cross-language. Field name kept for backward compatibility — semantic mismatch is tech debt. Schedule rename for Next.js migration.
2. postrun.js Step 1.5 must change from language-diversity check to publication-diversity check.
3. Pipeline template both-pool rule must change before next pipeline run.
4. Any user-facing text saying "cross-validated across languages" or "different languages" must change.
5. Sources panel needs new copy: "Recommended by [N] editorially independent sources from different publishers."

**What does NOT change:**
- Dropdown structure (poolOptions) — same options, same labels
- Per-source langLabel chips (EN, ES, IT) — still accurate, no change
- Language-specific filters ("English sources," "Spanish sources") — still work correctly
- Geocoding, centroid, neighbourhood logic — unaffected
- The `both_pool: true` boolean — still set the same way, just with new criteria

**Established pattern:** Grep viewer for "language" in user-facing strings before touching code. Change all instances. Do not rename `language_pool` field until Next.js migration.

---

## Key decisions made this session

| Decision | Status | Notes |
|----------|--------|-------|
| Both-pool definition wording | PENDING CONFIRMATION | Wording agreed in principle. User asked to run B1 first — B1 complete. Ready to confirm. |
| Writer locality (do national critics qualify?) | DEFERRED | El Comidista gating question. Fleet precedent supports yes. |
| Year-range relaxation (2020+) | DEFERRED | Unlocks lucianopignataro.it for more Naples restaurants etc. |
| Dissapore.com Florence author | PENDING | Jan 2023 article for L'Ortone — author unconfirmed |
| International sources (FT, Bon Appétit) | DEFERRED | Lowest priority. Product alignment question. |

---

## Files produced this session

| File | Contents |
|------|----------|
| `localbite-implementation-plan-2026-04-30.md` | Complete implementation plan, all phases, risks, timelines |
| `localbite-next-session-plan-2026-04-30.md` | Next session task sequence |
| `localbite-journal-session-2026-04-30.md` | This journal entry |
| `localbite-global-instructions-2026-04-30-updated.md` | Updated global instructions |

---

## Outstanding items carried forward

- [ ] **PRIORITY 0:** Confirm both-pool definition wording (ready to confirm — no further analysis needed)
- [ ] Remove Antico Caffè Greco from Rome JSON (closed Oct 8, 2025)
- [ ] Update postrun.js language_pool calculation (publication diversity, not language)
- [ ] Update pipeline template both-pool rule (before Batch G)
- [ ] Update viewer user-facing copy (grep "language" in index.html)
- [ ] Add Sources panel publisher explanation copy
- [ ] Write and run both-pool recomputation script (all 41 cities)
- [ ] Confirm dissapore.com Florence author (Jan 2023 L'Ortone article)
- [ ] Add 2 searches to pre-research template (newspaper + national column)
- [ ] Implement Fix 2 in postrun.js (sources list→dict auto-repair) before Batch G
- [ ] Implement Fix 3 in geocode.js (false positive detection) before Batch G
- [ ] Run Catania + Trieste (Batch G) — prompts ready, blocked on template update
- [ ] Writer locality product decision (unlocks El Comidista + 19 Spanish cities)
- [ ] Year-range policy decision (unlocks lucianopignataro.it for more Naples restaurants)

---

*Fleet at session end: 41 cities active, 1,287R (pending Rome fix), 119 BP, 9.2% — unchanged. No pipeline runs this session.*

# LocalBite Journal

## Session — 2026-05-01 (Writer discovery fleet complete: consensus case, methodology reset, UI spec)

### Overview

Long session completing the writer discovery test across all 41 cities and producing the full evidence base for the both-pool definition change. Also produced a complete UI change spec and had an honest reckoning with what the testing did and did not nail.

The session had three distinct phases: (1) completing the Italy, Portugal, and Morocco testing that carried over from the prior session; (2) producing the comprehensive fleet summary with B3 connection and definition rationale; (3) UI modifications discussion resulting in a 5-change spec.

The session also surfaced an important methodology critique: the writer discovery approach used restaurant-anchored searches, which is systematically incomplete. The correct methodology — publication-first verification — is the primary task for the next session.

---

### Writer Discovery — Completion

**Italy (15 cities, completed):**
Three new verified sources found:
- **Rome / Veronica Guerrini / Puntarella Rossa** (IT, Oct 2024) — Hosteria Grappolo d'Oro. EN+IT cross, immediate consensus pick under current definition. URL: puntarellarossa.it/2024/10/11/hosteria-grappolo-doro-roma-centro-cucina-romana/
- **Venice / Gillian McGuire / The Infatuation** (EN, May 2025) — Osteria Giorgione da Masa. EN added to 4-IT-source restaurant, immediate consensus pick. URL: theinfatuation.com/venice/reviews/osteria-giorgione-da-masa
- **Trieste / Enrico Scoccimarro / Scatti di Gusto** (IT, Sep 2025) — Da Siora Rosa. Potential EN+IT cross depending on existing source language mix. URL: scattidigusto.it/buffet-da-siora-rosa-a-trieste

**Palermo confirmed structural:** All 18 restaurants are single-source. Neither definition change nor new source discovery helps. Requires editorial rebuild — the only city in the fleet where this is true.

**Portugal (2 cities, completed):**
Zero new sources found. Both packs at or near their ceiling given structural constraints.
- Lisbon: 3 EN + 3 PT sources. 6 non-CP restaurants have same-language publisher-independent pairs → definition change fixes all 6 (12%→38%).
- Porto: Turin pattern confirmed — Visão (PT) covers different restaurants than the 3 EN sources. Terra Nova and Casa Expresso are EN+EN pairs. Definition change → 0%→12%.
- Público/Fugas: 451 geo-blocked, permanent barrier. Mesa Marcada already in Lisbon pack.

**Morocco (4 cities, completed):**
Zero new sources found. Le360/Nisrine Zaoui already in Fes pack (the key Moroccan FR-language media source identified as the Phase B target — already done in the v7.1 rebuild).
- TelQuel: politics/culture focus, no restaurant content. Not a viable source.
- Arabic press: confirmed structural gap. All prior pipeline exhaustion confirmed.
- Marrakesh: 5 EN + 1 FR. Very EN-heavy after v7.1 rebuild vs original v5 (2 EN + 3 FR).
- Definition change adds +6 consensus picks across Morocco. +8 across Portugal. Impact modest compared to Spain/Italy.

---

### Fleet-Wide Consensus Pick Analysis

Full fleet summary produced. Key numbers:

| Region | Cities | R | Cur CP | Cur% | Est CP | Est% | ΔCP |
|--------|--------|---|--------|------|--------|------|-----|
| Spain | 19 | 673 | 54 | 8.0% | 127 | 18.9% | +73 |
| Italy | 15 | 452 | 54 | 12.0% | 96 | 21.2% | +42 |
| Portugal | 2 | 41 | 3 | 7.3% | 11 | 26.8% | +8 |
| Morocco | 4 | 70 | 8 | 11.4% | 14 | 20.0% | +6 |
| Toronto | 1 | 52 | 0 | 0% | 0 | 0% | 0 |
| **TOTAL** | **41** | **1,288** | **119** | **9.2%** | **248** | **19.2%** | **+129** |

---

### The B3 Test Connection — Fully Documented

The Lisbon strategy test (B3 = Strategy C, March 2026) found that Strategy A's 23 both-pool entries were entirely from Time Out EN + Time Out PT — same publisher. Not independent agreement. This triggered the current definition requiring different publishers AND different languages.

The full-fleet test confirms the next step: the language requirement is blocking genuine same-language publisher-independent consensus (e.g. Gambero Rosso + CiboToday recommending the same Turin trattoria). Publisher independence was always the signal. Language was accidental. B3's core fix (same-publisher disqualified) is preserved under the proposed new definition.

Definition change rationale is now fully documented and evidence-based.

---

### What the Testing Did Not Nail — Honest Assessment

The session underdelivered on source discovery relative to expectations. Only 3 verified sources found (all Italy) despite the 83-candidate gap identified in the prior session.

Root cause: restaurant-anchored search methodology is systematically incomplete. A publication covering 15 pack restaurants is only found if that specific restaurant is tested. This session tested 1–2 restaurants per city and missed the broader publication coverage picture.

The 83 candidates — including all Italian regional newspapers, the most significant structural gap — were never properly verified. This is the primary task for the next session using publication-first methodology.

Additionally, several prior-session issues remain unresolved:
- Writer locality product decision (El Comidista) — still pending, still gates 19 Spanish cities
- Pre-research template Search 8 and 9 — still not added
- Engineering P0 items (Fix 2, Fix 3) — still not implemented

---

### Terminology Decision

"BP" (Both Pool, from "both language pool") is a misleading acronym given the move away from language framing. Decision: prefer "CP" (Consensus Pick) in all new documentation going forward. The `both_pool` boolean field and `language_pool` field names stay in code (tech debt, deferred to Next.js migration). UI badge text changes to "Consensus pick" when definition is confirmed.

---

### UI Change Spec

Five targeted changes to index.html confirmed and specced. All are surgical — nothing structural changes.

| # | Change | Dependency | Status |
|---|--------|-----------|--------|
| 1 | Badge: "Two languages" → "Consensus pick" | Definition confirmed | Pending |
| 2 | Source chips → article links + language dot | None | Ready |
| 3 | Language filter → Sort dropdown | None | Ready |
| 4 | Remove "About this writer" from cards | None | Ready |
| 5 | Address field plain text display | None (pipeline C1 separate) | Ready |

"About this writer" removed because it's ambiguous when a restaurant has multiple sources (which writer?). Writer profiles remain fully accessible via the Sources panel. Chips link to articles — Sources panel is the route to writer bios.

Language dot on chips is the only remaining language signal in the card UI. Colour code: EN=blue, IT=coral, ES=amber, FR=purple, PT=teal.

Sort options: Most endorsed (default — surfaces consensus picks naturally) / A–Z / By neighbourhood. Replaces language filter entirely.

Address field (C1 pipeline change): `"address": "street address if mentioned in article, else null"` added to Phase 2 extraction. EN sources almost always include street addresses. Zero backfill to existing 41 cities — accumulates with future runs. Displayed as plain text, no link.

---

### Key Decisions Made

1. "About this writer" removed from restaurant cards (replaced by Sources panel as sole writer profile entry point)
2. Source chips become article links — split action from writer profile access
3. Sort replaces language filter in filter bar
4. Address via Option C1 pipeline template change (not navigation deep link — supersedes 2026-04-27 decision)
5. "CP" preferred over "BP" in new documentation going forward
6. Publication-first methodology is the correct approach for source verification (restaurant-anchored is wrong)
7. Three simultaneous definition changes must not be attempted if session is past hour 3

---

### Files Produced This Session

| File | Contents |
|------|----------|
| extract-portugal-morocco.py | Extraction script for Portugal/Morocco city packs |
| localbite-portugal-morocco-test-plan.md | Portugal/Morocco test plan |
| localbite-portugal-morocco-results-2026-05-01.md | Full Portugal/Morocco results |
| localbite-writer-discovery-complete-summary-2026-05-01.md | Fleet-wide comprehensive summary |
| localbite-ui-change-spec.md | 5-change UI implementation spec |
| localbite-next-session-plan-2026-05-01.md | Next session plan with risks/mitigations |
| localbite-global-instructions-2026-05-01.md | Updated global instructions |

Files produced in prior session (carried into this session):
- localbite-italy-extract.py, localbite-italy-results-complete-2026-05-01.md, localbite-italy-test-plan-2026-05-01.md, localbite-spain-bp-summary-2026-05-01.md

---

### Outstanding Items

**Next session primary:**
- Source verification — publication-first methodology, Italy first (83 candidates)
- Writer locality product decision (El Comidista) — decide at session start
- Both-pool definition confirmation — after verification
- Three simultaneous changes if confirmed (plan carefully, don't rush)

**UI (ready, definition-independent):**
- UI changes 2–5 (chips, sort, remove about-writer, address) — ~1.5 hours

**Engineering P0 (before any new pipeline run):**
- Fix 2: postrun.js sources list→dict auto-repair
- Fix 3: geocode.js false positive detection
- Pre-research template: Add Search 8 and 9

**Data fixes:**
- Rome: Antico Caffè Greco permanently closed — remove
- Trieste: viewer smoke test pending
- Valladolid: Recomiendo Valladolid URL specificity

**Pipeline (pending definition and new source verification):**
- Rome: add Puntarella Rossa (Guerrini) to Part 1, rebuild
- Venice: add The Infatuation (McGuire) to Part 1, rebuild
- Trieste: add Scatti di Gusto (Scoccimarro) to Part 1, rebuild
- Palermo: editorial rebuild (new Part 1 file needed — Giornale di Sicilia primary target)
- Milan: attempt Visintin/Corriere della Sera fetch (paywall risk)

*Fleet: 41 cities, 1,288R, 119CP (9.2%) — estimated 248CP (19.2%) after definition change*


---

## Session — 2026-05-04 (Source verification reset: publication-first methodology, 7 sources confirmed, ownership maps, writer locality resolved)

### Overview

Full source verification session. Primary objectives from the session plan were completed: the 83-candidate list was properly compiled for the first time, Tier 3 searches were run across Italy and Spain to find named critics at regional publications, and ownership conflict maps for both countries were built. Seven sources confirmed ready for Part 1 files. Three additional fetch-limitation candidates identified. Writer locality product decision made. Both-pool definition evidence now complete — confirmation deferred to next session as planned.

---

### The 83-Candidate List — Finally Properly Built

The "83 candidates" referenced in prior sessions was never an actual list — it was a rough count of category estimates. This session replaced it with a structured, actionable candidate document (`localbite-candidate-source-list-2026-05-04.md`) covering every candidate publication by city, ownership group, named critic status, conflict check, and verification status.

The honest recount: ~32 unique new publications (not 83). The inflation came from counting El Comidista 19 times (once per Spanish city) and counting Italian regional newspapers without knowing whether any named food critics exist inside them.

---

### Writer Locality Decision — CONFIRMED

**Decision: only city-based writers qualify. National food column critics excluded.**

El Comidista (El País) — excluded permanently. Observador Portugal — excluded. Any critic whose primary beat is the whole country rather than a specific city does not qualify as a "local food writer" for LocalBite's purposes.

This decision is final and closes the longest-deferred open item in the project. It gates nothing going forward — all Tier 3 searches were already scoped to regional and city-specific writers.

**Added to Fixed Definitions and Do Not list.**

---

### Structural Finding — Regional Newspapers and Named Food Critics

The central finding from Tier 3 searches: **most regional newspapers in Italy and Spain do not have easily-findable dedicated named food critics** producing editorial prose restaurant reviews in the format LocalBite requires.

Web search consistently returned newspaper homepages, award announcements, and general food news — not the named bylines we needed. This is not a methodology failure. It reflects a real structural reality: city-level restaurant criticism is produced primarily by:

1. Independent food sites and blogs (Cronache di Gusto, Complicidad Gastronómica, Observación Gastronómica, ilGolosario.it)
2. Specialized national publications with regional contributors (Gambero Rosso, CiboToday, Scatti di Gusto)
3. A small number of nationally recognised regional newspaper critics (Maribona/ABC, Visintin/CdS, Bellver/Sur, Campos/La Voz)

The "systematic gap" of no Italian regional newspaper in the fleet may accurately reflect the Italian food journalism landscape rather than a pipeline failure. The pre-research template Search 8 should target both newspapers AND local food sites.

**Implication for pre-research template:** Search 8 for Italian cities should be: "[city] critico gastronomico ristoranti nome giornalista sito 2024 2025" — including "sito" (site) to capture both newspaper and independent web coverage.

---

### Ownership Maps — Built and Documented

**Italy — Four Group Map:**

| Group | Key papers in fleet cities |
|-------|---------------------------|
| GEDI (→ Antenna/Greece) | La Stampa (Turin), Il Secolo XIX (Genoa — now MSC/Blue Media as of Sep 2024, no longer GEDI) |
| RCS (Cairo Communication) | Corriere della Sera (Milan), all regional Corriere editions (Florence, Venice, Bologna, Naples) |
| Caltagirone | Il Messaggero (Rome), Il Mattino (Naples), Il Gazzettino (Venice), Quotidiano di Puglia (Lecce/Bari) |
| Monrif | La Nazione (Florence), Il Resto del Carlino (Bologna), Il Giorno (Milan), Gazzetta di Modena |

**Key update:** Il Secolo XIX (Genoa) was acquired by Blue Media Srl (MSC shipping group) in September 2024 — no longer GEDI. La Stampa and Il Secolo XIX are now independent of each other.

**Practical rule:** Independence conflicts only arise within the same city's pack. Different cities are evaluated independently. Never add two papers from the same group to the same city.

**Spain — Vocento Group:**

Vocento owns ABC plus: El Correo (Bilbao), El Diario Vasco (San Sebastián), La Rioja (Logroño), El Norte de Castilla (Valladolid), Las Provincias (Valencia), La Verdad (Murcia), Ideal (Granada), Sur (Málaga), Hoy (Badajoz), El Diario Montañés, El Comercio.

All existing LocalBite pack sources are blogs, The Infatuation, Time Out (UK-owned), Gambero Rosso, and independent digital publications — none are Vocento. Adding one Vocento paper per city is safe; just never add two Vocento papers to the same city.

**Both ownership maps added to candidate list document and to global instructions.**

---

### Source Verification Results — Complete

#### CONFIRMED READY (7 sources, no further verification needed)

| # | Source | City | Publisher | Language | Key confirmation |
|---|--------|------|-----------|----------|-----------------|
| 1 | Puntarella Rossa / Veronica Guerrini | Rome | Independent | IT | Article fetchable, Oct 2024, Grappolo d'Oro |
| 2 | The Infatuation / Gillian McGuire | Venice | Independent | EN | Article fetchable, May 2025, Osteria Giorgione |
| 3 | Scatti di Gusto / Enrico Scoccimarro | Trieste | Independent | IT | Article fetchable, Sep 2025, Da Siora Rosa |
| 4 | ABC Salsa de Chiles / Carlos Maribona | Madrid | Vocento | ES | Pack overlap: La Tasquita, Lakasa, Haramboure (3+ confirmed) |
| 5 | Complicidad Gastronómica / Isaac Agüero Fuentes | Madrid | Independent | ES | Pack overlap: Haramboure, La Tasquita, Sacha (3 confirmed) |
| 6 | Observación Gastronómica / Philippe Regol | Barcelona | Independent | ES | 4 pack restaurants confirmed: Franca, Arraval, Casa Fiero, Finorri |
| 7 | ilGolosario.it / Paolo Massobrio | Turin | Independent (Comunicare srl) | IT | Article fetchable, Feb 2024, Turin restaurant, named byline on-page |

**Correction on Massobrio:** The source is ilGolosario.it (his own publishing house), not La Stampa. La Stampa is paywalled. ilGolosario.it is fully fetchable with named bylines, and is independent from all 4 existing Turin sources. This is the better vehicle.

#### FETCH-LIMITATION CANDIDATES (3 sources — add to Part 1, attempt Phase 0)

| # | Source | City | Issue | Action |
|---|--------|------|-------|--------|
| 8 | La Razón / Tatiana Ferrandis | Madrid | Site-blocked to automated fetch; article URLs confirmed via Muck Rack | Add as DIRECT_FETCH_SOURCE, article_url null, fetch limitation documented |
| 9 | Sur / Enrique Bellver | Málaga | Sur.es not indexed; content likely user-accessible | Add as DIRECT_FETCH_SOURCE, article_url null, "Málaga en la Mesa" supplement noted |
| 10 | La Voz de Galicia / Guillermo Campos | A Coruña / Vigo | Paywalled — same pattern as La Vanguardia | Add as DIRECT_FETCH_SOURCE per city, article_url null, paywall risk noted |

**Enrique Bellver detail:** Full name Enrique Bellver López (earlier sessions had "Belber" — typo in Tapas top 35 source). @Gastrobellver. Runs "Málaga en la Mesa" supplement at Diario SUR. Premio Enrique Mapelli winner. Full editorial prose confirmed from two restaurant thank-you pages quoting his reviews verbatim with dish-level description. Vocento conflict check: clear — no Vocento source in Málaga pack.

#### CLOSED — no qualifying named critic found

Giornale di Sicilia (Palermo/Catania), La Sicilia (Catania), Corriere del Mezzogiorno (Naples), Il Secolo XIX (Genoa), Heraldo de Aragón (Zaragoza), El Correo (Bilbao), Diario de Sevilla (Seville — Cosas de Comé already permanently excluded, no separate critic found).

#### STRUCTURAL GAPS CONFIRMED

Palermo: all 18 restaurants single-source, no source found with confirmed pack overlap. Cronache di Gusto / Clara Minissale is a strong Palermo-based candidate but her "dove mangio" coverage of pack restaurants could not be confirmed — she covers new/contemporary openings, the pack likely contains traditional trattorias. Only a pipeline rebuild resolves this.

Seville: structural gap confirmed. Cosas de Comé excluded. No alternative local named critic found. Zero new sources available without editorial outreach.

---

### Palermo — Updated Assessment

Cronache di Gusto (founded and directed by Fabrizio Carrera, "dove mangio" section by Clara Minissale) is a strong Palermo-specific food publication with active 2024-2025 coverage. It covered Ferro di Cavallo in a "cibo-e-dintorni" news article (reporting the NYT recognition), but no "dove mangio" editorial review of a confirmed pack restaurant was found. Audience divergence risk: Minissale covers contemporary new openings; existing pack likely anchored in traditional trattorias (Culinary Backstreets profile). Add as candidate in Palermo Part 1 rebuild — let the pipeline attempt Phase 0 extraction. If pack overlap exists, it creates immediate consensus picks. If not, documents a genuine coverage gap.

**Palermo Part 1 target:** Cronache di Gusto (candidate), Giornale di Sicilia (attempt despite no named critic confirmed — the pipeline's Phase 1 may find one). The Palermo rebuild remains the hardest editorial challenge in the fleet.

---

### Definition Confirmation — Deferred to Next Session

The evidence is now complete. Seven confirmed new same-language publisher-independent sources found across Italy, Spain, and Portugal (all 7 are same-language pairs with existing pack sources under the current definition). The proposed definition change — publisher independence only, language irrelevant — would qualify all of them immediately.

The threshold from the session plan (≥5 new same-language publisher-independent sources) is clearly met.

**Why deferred:** The three simultaneous changes (postrun.js, pipeline template, recomputation script for all 41 cities) are complex and error-prone. The session plan specified not to implement if past hour 3 of a long session. This is correct. The confirmation decision is made — the engineering implementation should be the first thing in the next dedicated session.

**Decision: confirm the definition change at the start of next session, then implement all three changes simultaneously.**

---

### Key Decisions Made

1. Writer locality: city-based only. El Comidista and all national food column critics excluded permanently.
2. Enrique Bellver's surname confirmed as Bellver (not Belber — prior typo).
3. Paolo Massobrio's qualifying source is ilGolosario.it, not La Stampa.
4. Il Secolo XIX (Genoa) is now MSC/Blue Media, no longer GEDI — La Stampa conflict resolved.
5. Both ownership maps (Italy four groups, Spain Vocento) confirmed as fixed reference.
6. Cronache di Gusto / Clara Minissale added as Palermo Part 1 candidate pending pipeline verification.
7. Definition confirmation deferred to next session start — engineering implementation to follow immediately.

---

### Files Produced This Session

| File | Status |
|------|--------|
| localbite-candidate-source-list-2026-05-04.md | New — commit to repo |
| localbite-tier3-search-results-2026-05-04.md | New — commit to repo |
| localbite-global-instructions-2026-05-04.md | Updated — replace previous |
| localbite-next-session-plan-2026-05-04.md | New — for reference |

**Git block:**
```bash
cd /Users/harryenchin/Documents/GitHub/localbite
git add localbite-candidate-source-list-2026-05-04.md localbite-tier3-search-results-2026-05-04.md
git status
git commit -m "docs: source verification reset — candidate list, tier3 results, ownership maps"
git push
```

---

### Outstanding Items

**Next session — primary:**
- Confirm both-pool definition (call, not research — evidence is in)
- Implement three simultaneous changes: postrun.js, pipeline template, recomputation script
- UI changes 2–5 (definition-independent, ready now)

**Part 1 file updates (after definition confirmed):**
- Rome: add Puntarella Rossa / Guerrini
- Venice: add The Infatuation / McGuire
- Trieste: add Scatti di Gusto / Scoccimarro
- Madrid: add Maribona + Agüero + Ferrandis (fetch limitation)
- Barcelona: add Regol (+ ElNacional.cat with 403 note)
- Turin: add ilGolosario.it / Massobrio
- Málaga: add Bellver / Sur (fetch limitation)
- A Coruña / Vigo: add Campos / La Voz (fetch limitation, paywall risk)
- Palermo: rebuild Part 1 with Cronache di Gusto as candidate

**Engineering P0 (before any pipeline run):**
- Fix 2: postrun.js sources list→dict auto-repair
- Fix 3: geocode.js false positive detection
- Pre-research template: Add Search 8 (city newspaper AND local food site targeting)

**Data fixes:**
- Rome: Antico Caffè Greco permanently closed — remove
- Trieste: viewer smoke test pending
- Valladolid: Recomiendo Valladolid URL specificity

*Fleet: 41 cities, 1,288R, 119CP (9.2%) — estimated 248CP (19.2%) after definition change*

## Session — 2026-05-04 (Both-pool definition confirmed, 119→233 consensus picks, Objective 3 UI complete)

### Overview

The longest and most consequential session in the project's history. Three major workstreams completed: (1) both-pool definition change confirmed and implemented across the full fleet simultaneously, (2) five contaminated writer profiles repaired, (3) full Objective 3 UI overhaul shipped. Fleet consensus pick rate doubled from 9.2% to 18.1% with no new pipeline runs.

---

### Both-Pool Definition Change — Implemented

**Decision:** Publisher independence only. Language is no longer a criterion. A consensus pick requires two or more editorially independent sources from different publishers, in any language.

**Three simultaneous changes implemented:**

1. **postrun.js Fix 4** — language_pool derivation changed from language-diversity to publisher-diversity logic. `language_pool = 'both'` now means cross-publisher (≥2 distinct publications), not cross-language. Field rename to `publisher_pool` scheduled for Next.js migration. Code comment added. Backup: localbite-postrun.js.bak.

2. **Pipeline template** — Both-pool definition updated in two places: LANGUAGE_POOL FIELD "both" definition and BOTH-POOL DEFINITION block in Phase 3. Backup: localbite-prompt-v7-template.txt.bak.

3. **Recomputation script** — `localbite-recompute-both-pool.py` run across all 41 cities. Derives both_pool and language_pool from publisher diversity (distinct `publication` values). Dry-run on Bologna (10BP preserved), Turin (0→6BP gained), Madrid (6→19BP gained), Florence (5→9BP), Barcelona (14→15BP) before fleet-wide write.

**Fleet result:** 119BP (9.2%) → 233BP (18.1%), net +114 consensus picks. 31 cities changed, 10 unchanged (structural gaps confirmed: Alicante, Bari, Bologna, Catania, Chefchaouen, Genoa, Granada, Palermo, Seville, Toronto).

**Test methodology:** postrun.js patch applied first, tested on Bologna (confirmed 10BP preserved), then recomputation applied. Both verified consistent — postrun.js will not overwrite recomputed values on future runs.

**Key finding during testing:** Barcelona showed `lang=EN` (uppercase) in source language field. Language normalisation fix applied in recomputation script (`lang.lower().strip()`).

**Key finding during testing:** Bilbao had restaurants with `language_pool='both'` but `both_pool=False` — the boolean field was not consistently maintained. Recomputation script sets both fields correctly for all 1,288 restaurants.

**Both-pool note:** The `language_pool` field is semantically wrong after this change (it now means cross-publisher, not cross-language). Field rename to `publisher_pool` or `source_pool` deferred to Next.js migration. Code comment added to postrun.js. Tech debt documented.

**Commit:** 280b0de

---

### Writer Profile Contamination Repair

**Diagnostic:** `check-price-and-profiles.py` identified 14 flagged profiles. 9 were correctly-placed COI flags (intentional per source quality rules, not contamination). 5 were genuine contamination with pipeline internals:

| City | Writer | Terms found |
|------|--------|-------------|
| Bologna | Katie Parla | DIRECT_FETCH |
| Bologna | Floriana Barone | pipeline |
| Genoa | Mariarosaria Bruno | pipeline |
| Modena | Katie Parla | Phase 3, DIRECT_FETCH |
| Modena | Nico Cristiani | Phase 2, Phase 3, auto-reject |

**Fix:** `localbite-fix-writer-profiles.py` applied clean profiles to all 5. Committed 31885a4.

**Note:** The diagnostic script incorrectly included 'coi' and '⚠ coi' as prohibited terms. These are intentional per source quality rules. The script's prohibited term list was corrected for future use.

---

### Price Filter Diagnostic

**Diagnostic:** `check-price-and-profiles.py` and `check-price-distribution.py` confirmed 8 cities with 100% null price_level: Barcelona, Logroño, Málaga, Marrakesh, Porto, Seville, Toronto, Valencia.

**Root cause:** All 35 cities without address data are v7.1 — pipeline rebuilds will not help, sources simply don't mention prices. 6 cities with price data (Genoa, Madrid, Murcia, Rome, Seville, Toronto) had it extracted directly from source text.

**Decision:** No action. Price filter showing empty results for those cities is a cosmetic issue, not a data integrity issue. Will be fixed at natural rebuild cycle.

---

### Objective 3 UI Changes — Shipped

All changes implemented via targeted patch scripts with dry-run-first pattern and git backstop.

**Badge text (commit 5f1b1ca):**
- "Green border = confirmed in two languages" → "Green border = consensus pick"
- Card badge: "Two languages" → "Consensus pick"
- Map popup single restaurant: "Two languages" → "Consensus pick"
- Map popup neighbourhood cluster: "Two languages" → "Consensus pick"

**Source chips + card cleanup (commit 9805e8c):**
- Source chips now show for ALL sources (not just 2+)
- Chips clickable when article_url exists (`<a>` tag), non-clickable when null (`<span>`)
- CSS added: `a.source-chip` with hover state
- Source ↗ link removed entirely
- "About this writer" button and toggle removed from cards (writer profiles remain in Sources panel)
- Writer-profile-toggle event listeners removed from both grid and map sheet

**Alignment + tooltip fix (commits 3fe9d73, d24e7a4):**
- hero-sources-btn padding: 4px → 5px (matches both-pool-banner)
- both-pool-banner margin-top: 10px removed (container handles spacing)
- Tooltip text updated: "two different language communities" → "publisher independence" language

**Consensus picks toggle + sort (commit 4ef9eb5):**
- Language filter dropdown removed entirely
- Consensus picks toggle button added (hidden for cities with 0 consensus picks)
- Toggle state: `let consensusOnly = false` — resets on city switch and filter-clear
- Sort order fixed permanently: both-pool first → source count desc → A-Z tiebreaker
- `buildFilters()` poolSel block replaced with hasBothPool + consensusBtn logic
- `resetFilters()`, `getFilteredRestaurants()`, event listeners all updated
- 9 replacements, all verified: `f-pool` fully removed (0 remaining references)

**Sort fix (commit 3c0156a):**
- `source_count` confirmed null for all 1,288 restaurants
- Sort now uses `sources.length` as fallback when `source_count` is null
- Lana (3 sources) correctly sorts above Lakasa (2 sources) in Madrid

**Writer attribution removal (commit bb984a9):**
- Writer name · Publication line removed from all cards
- `primaryId`, `primarySrc`, `sourceUrl`, `writerLabel` JS variables removed (all unused)
- `.card-attribution` and `.card-writer` CSS removed
- Sources panel retains full writer detail
- index.html: 2,348 lines (was 2,380 at session start, net -32)

**Milan source id fix (commit c8520d5):**
- Diagnostic revealed Milan's 10 source objects had no `id` or `source_id` field
- `currentSources` lookup failed silently — chips not rendering on any Milan card
- Fix: `localbite-fix-milan-source-ids.py` added `id = dict_key` to all 10 source objects
- Fleet-wide check confirmed Milan-only issue

**Tooltip CDN propagation:** File confirmed correct via grep. GitHub Pages CDN may take 10 minutes to propagate. Private browsing may also serve cached version during propagation window.

---

### Address Field Assessment

**Diagnostic:** `check-address-field.py` confirmed 187 restaurants across 6 cities have address data (Genoa 70%, Madrid 71%, Murcia 100%, Rome 23%, Seville 50%, Toronto 96%). All 35 other cities have zero addresses.

**Root cause:** All 35 zero-address cities are v7.1 — sources don't mention addresses. Pipeline rebuilds will not help.

**Options evaluated:**
- Reverse geocoding: excluded (decided against)
- Google Maps deep link: excluded (decided against)
- Plain text display where available: tabled for future session
- Do nothing: current state

**Decision:** Change 5 (address field) tabled. Revisit when clearer path to broader coverage exists.

---

### Both-Pool by City — Updated Fleet Table

| City | R | BP | BP% |
|------|---|----|----|
| A Coruña | 25 | 11 | 44% |
| Alicante | 9 | 1 | 11% |
| Barcelona | 110 | 15 | 14% |
| Bari | 14 | 7 | 50% |
| Bilbao | 23 | 4 | 17% |
| Bologna | 20 | 10 | 50% |
| Catania | 16 | 3 | 19% |
| Chefchaouen | 2 | 0 | 0% |
| Córdoba | 40 | 9 | 23% |
| Fes | 21 | 5 | 24% |
| Florence | 42 | 9 | 21% |
| Genoa | 27 | 5 | 19% |
| Granada | 4 | 2 | 50% |
| Lecce | 26 | 6 | 23% |
| Lisbon | 24 | 9 | 38% |
| Logroño | 15 | 2 | 13% |
| Madrid | 116 | 19 | 16% |
| Málaga | 34 | 5 | 15% |
| Marrakesh | 42 | 8 | 19% |
| Milan | 60 | 9 | 15% |
| Modena | 10 | 2 | 20% |
| Murcia | 10 | 3 | 30% |
| Naples | 62 | 8 | 13% |
| Palermo | 18 | 0 | 0% |
| Palma de Mallorca | 33 | 7 | 21% |
| Pamplona | 24 | 3 | 13% |
| Porto | 17 | 2 | 12% |
| Rabat | 5 | 1 | 20% |
| Rome | 64 | 8 | 13% |
| San Sebastián | 24 | 9 | 38% |
| Santiago de Compostela | 27 | 8 | 30% |
| Seville | 22 | 0 | 0% |
| Toronto | 52 | 0 | 0% |
| Trieste | 14 | 4 | 29% |
| Turin | 23 | 6 | 26% |
| Valencia | 78 | 11 | 14% |
| Valladolid | 30 | 3 | 10% |
| Venice | 21 | 5 | 24% |
| Verona | 35 | 7 | 20% |
| Vigo | 10 | 2 | 20% |
| Zaragoza | 39 | 5 | 13% |

---

### Key Decisions

1. Both-pool definition confirmed: publisher independence only, language irrelevant. Effective 2026-05-04.
2. `language_pool` field name kept for backward compatibility — semantically means cross-publisher. Rename to `publisher_pool` at Next.js migration.
3. Price filter: no action. Deferred to rebuild cycle.
4. Writer attribution line: removed from cards. Writer credit lives in Sources panel and chips.
5. Change 5 (address field): tabled. No reverse geocoding, no Google Maps links. Revisit with broader data coverage.
6. Pipeline rebuilds: only justified for Rome (concentration), Madrid (3 new sources), Barcelona (HIGH SPREAD trigger). Venice, Trieste, Turin, Málaga deferred.
7. Script standard confirmed: all Python commands as files, saved directly to localbite directory, no -c one-liners.
8. CiboToday vs Cibo Today naming inconsistency noted (Modena vs other cities) — data cleanup at next rebuild.

---

### Files Produced or Updated

**Scripts (all in localbite directory, not committed):**
- localbite-recompute-both-pool.py — fleet-wide both_pool recomputation
- localbite-patch-postrun-fix4.py — postrun.js Fix 4 patch
- localbite-patch-template-bothpool.py — pipeline template patch
- localbite-fix-writer-profiles.py — writer profile contamination repair
- localbite-fix-milan-source-ids.py — Milan source id fix
- localbite-patch-badge-text.py — badge text patch
- localbite-patch-cards.py — source chips + About this writer removal
- localbite-patch-hero-alignment.py — hero button alignment + tooltip
- localbite-patch-banner-margin.py — banner margin fix
- localbite-patch-change3.py — consensus picks toggle + sort
- localbite-patch-sort-fix.py — sort sources.length fallback
- localbite-patch-remove-attribution.py — writer attribution removal
- check-*.py, show-*.py, assess-*.py, find-*.py — diagnostic scripts

**Committed changes (10 commits):**
- 280b0de: feat: both-pool definition change
- 31885a4: fix: writer profiles Bologna, Genoa, Modena
- 5f1b1ca: fix: badge text Two languages → Consensus pick
- 9805e8c: feat: clickable chips, remove Source arrow and About this writer
- 3fe9d73: fix: alignment + tooltip text
- d24e7a4: fix: banner margin-top
- 4ef9eb5: feat: consensus picks toggle, sort order
- 3c0156a: fix: sort sources.length fallback
- c8520d5: fix: Milan source id fields
- bb984a9: feat: remove writer attribution from cards

---

### Outstanding Items

**Engineering P0 (before any pipeline runs):**
- Fix 2: postrun.js sources list→dict auto-repair
- Fix 3: geocode.js false positive detection (Italian cities)
- Pre-research template: Add Search 8 and Search 9

**Data fixes:**
- Rome: Antico Caffè Greco permanently closed — remove before next commit
- Trieste: viewer smoke test pending
- CiboToday vs Cibo Today naming inconsistency (Modena vs other cities)

**Pipeline rebuilds (when ready):**
- Rome: add Puntarella Rossa / Guerrini + remove Antico Caffè Greco
- Madrid: add Maribona + Agüero + Ferrandis
- Barcelona: add Regol + fix Eixample HIGH SPREAD centroid

**Deferred:**
- Change 5 (address field) — tabled
- Venice, Trieste, Turin, Málaga Part 1 updates — deferred
- Next.js migration — unchanged
- language_pool → publisher_pool rename — at Next.js migration

*Fleet: 41 cities, 1,288R, 233BP (18.1%), index.html 2,348 lines*

