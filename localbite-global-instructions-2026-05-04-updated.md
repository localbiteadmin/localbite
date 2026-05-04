# LocalBite — Global Instructions for Claude

---

## Project Identity

LocalBite is a restaurant recommendation web app surfacing recommendations from named local food writers only — not aggregators, not PR, not anonymous editorial teams. The core quality signal is independent cross-validation: restaurants recommended by multiple genuinely independent sources.

**Stack:** Vanilla JS single-file index.html (current), migrating to Next.js static export. GitHub Pages deployment, Claude Code pipeline for city pack generation.

**Repo:** github.com/localbiteadmin/localbite
**Local:** /Users/harryenchin/Documents/GitHub/localbite
**Plan:** Claude Max 5x ($100/month)

**Current fleet:** 41 v7.1 cities active, 41 files total. Pipeline version: v7.1. index.html migration trigger to React at 2,500 lines. Current index.html: 2,348 lines. Fleet restaurants: 1,288R, 233 CP (18.1%). Verify with fleet script at next session start.

---

## Fixed Definitions — Do Not Re-open

These decisions are closed. Do not revisit unless explicitly asked.

**Both-pool / Consensus pick — CONFIRMED 2026-05-04:** Publisher independence only. Language is no longer a criterion.
> "A consensus pick is a restaurant recommended by two or more editorially independent sources from different publishers, in any language. Publisher independence requires sources are not owned by the same parent company, do not share editorial direction, and have no commercial relationship. Cross-language or same-brand editions of the same publisher (e.g. Time Out EN + Time Out PT) do not qualify regardless of editorial separation. All qualifying sources must carry named authorship under the existing named-author rule."

**Implementation status:** All three simultaneous changes applied 2026-05-04: (1) postrun.js Fix 4 updated to publisher-diversity logic; (2) pipeline template both-pool definition updated; (3) recomputation script run across all 41 cities. Fleet CP: 119 (9.2%) → 233 (18.1%), net +114. Commit: 280b0de.

**language_pool field semantic change — IMPLEMENTED 2026-05-04:** `language_pool = 'both'` now means cross-publisher (≥2 distinct publications), NOT cross-language. Field name kept for backward compatibility. Code comment added to postrun.js. Rename to `publisher_pool` or `source_pool` scheduled for Next.js migration.

**Writer locality — CONFIRMED 2026-05-04:** Only city-based writers qualify as LocalBite sources. A qualifying local writer is one whose primary beat is that specific city — they live there, are based there, or habitually cover that city's restaurants specifically. National food column critics who cover restaurants across an entire country do not qualify.

Excluded permanently: El Comidista (El País) — named critics cover all of Spain. Observador (Portugal) — national coverage. Do not add either to any Part 1 file.

**Named author:** A specific human's name appearing as a byline in the article. Anonymous editorial team credits do not qualify. This applies even to high-credibility publications — Ara.cat was correctly rejected on this basis despite being a major Catalan newspaper.

**Single-author site rule:** Some sites (e.g. piccavey.com) are single-author sites where the author attribution appears on the About page but not on individual article headers. These qualify as named-author sources. The pipeline must confirm the author from the About page and then apply the single-author site rule — all articles from that site are accepted as from that named author. Do not reject single-author sites for missing article-level bylines. Document in Part 1 file when this applies.

**Geocoding stack:** Nominatim + Photon only. HERE ToS prohibits permanent storage of geocoded results and is permanently excluded. Google Maps API is not used programmatically. Manual Google Maps lookups are not permitted for restaurants that automated geocoding cannot resolve.

**Bounding box validation:** Always validate geocoded coordinates against the city's bounding box. False positives occur regularly — a Rabat restaurant was matched to Ghana. Every coordinate must be verified within the expected geographic area. The geocoder performs case-insensitive CITY_BOXES lookup — "Santiago De Compostela" and "Santiago de Compostela" both resolve correctly. Bounding box validation also applies to neighbourhood centroid Nominatim queries — coordinates outside the city bounding box are rejected and treated as not-found (fixed 2026-04-23).

**Accented city names in CITY_BOXES:** Both accented and unaccented variants must be present in geocode.js CITY_BOXES for any city with accented characters. Known pairs: Málaga/Malaga, Córdoba/Cordoba, Logroño/Logrono, A Coruña/A Coruna, San Sebastián/San Sebastian. When adding new accented cities, add both variants. The accent-stripping in the case-insensitive lookup does not handle accent variants (fixed 2026-04-24).

**Pipeline pause point:** Always pause after Phase 1 source selection before any fetching or extraction. Never run Phase 1 through to Phase 2 without a pause and source list review. PHASE1_AUTO_PROCEED: YES overrides this pause — use only in validated unattended runs.

**writer_profile field:** User-facing only. Never include pipeline internals, fetch quality notes, tier assignments, rejection counts, or any operational data in this field. It is read by end users in the Sources panel. The viewer no longer shows writer profiles on cards — profiles appear only in the Sources panel. Prohibited terms include: "PRIMARY source", "SECONDARY source", "Tier A/B/C", "Phase 0/1/2/3", "fetch quality", "confirmed byline", "cap applied", "sibling edition check", "DIRECT_FETCH". Fleet-wide repair confirmed 2026-04-25/26. Additional repairs: Bologna (Katie Parla, Floriana Barone), Genoa (Mariarosaria Bruno), Modena (Katie Parla, Nico Cristiani) — repaired 2026-05-04.

**React migration trigger:** 2,500 lines of index.html. Current: 2,348 lines.

**Phase 0 vs Phase 1 distinction:** Phase 0 is retrieval — direct fetching of known high-quality sources. Phase 1 is discovery — searching for unknown sources. Named-writer and named-publication queries belong in Phase 0 for rebuilds, not in Phase 1 search queries.

**Forum queries:** Eliminated from v7 template. Confirmed 0% success rate across all cities and all runs. Do not suggest re-adding them.

**Results per query:** 10 per query. This is the hard tool limit and cannot be overridden. Do not reference positions beyond 10 or claim results were found at positions 11–30.

**article_url field:** Required in v7.1 JSON schema. MUST be confirmed from an actual successful fetch response during extraction — never inferred, pattern-matched, or fabricated from article titles or publisher patterns. If not confirmed from a fetch, set null. This applies especially after compaction-reconstruction. Null article_url shows a broken link icon in the viewer — this is honest. A fabricated URL that 404s is worse than null. postrun.js warns loudly if article_url is missing or null but will not block the commit. Homepage URLs (e.g. eater.com/toronto) are not article URLs — null these too.

**article_url specificity:** article_url must link to the specific article that contains the restaurant mention — not a single-restaurant review page used for multiple restaurants, and not an evergreen guide landing page. This is a link destination quality rule, separate from the confirmed-from-fetch rule. Identified via fleet-wide URL verification 2026-04-26.

**Katie Parla category page URLs:** katieparla.com/restaurants/[city]/ is a category page, not an article URL — null it. Her specific guide articles are valid article_urls if confirmed from fetch. Fixed definition established 2026-04-28.

**Shell one-liners:** Always use Python for shell one-liners. Never use Node.js inline via `node -e` with `!` characters — zsh interprets `!` as history expansion and the command fails. Python does not have this issue.

**Script standard — CONFIRMED 2026-05-04:** Every Python command goes in a script file. No `-c` one-liners, regardless of length. Save scripts directly to `/Users/harryenchin/Documents/GitHub/localbite/`, then run `python3 scriptname.py`. This is the standard method without exception.

**CENTROIDS naming collision:** The CENTROIDS object in index.html uses bare neighbourhood names as keys. For v7.1 cities this is resolved automatically: the viewer checks `currentCityData.centroids[nb]` (city JSON) FIRST before falling back to global `CENTROIDS[nb]`. The global CENTROIDS dict is now legacy-only for pre-v7.1 cities. Fixed definition established 2026-04-28.

**CITY_BOUNDS auto-generation — pad=0 (fixed 2026-04-29):** postrun now generates CITY_BOUNDS matching the geocoder bbox exactly. Do not widen CITY_BOUNDS after postrun for new cities — it is no longer needed.

**Medium confidence geocoding pins:** The viewer's `isHighConfidence()` function returns true for `geo_confidence === 'high'`, `'verified'`, AND `'medium'` when `geo_matched_name` is not null. Medium confidence with a named match shows a solid pin. Medium confidence without a named match (geo_matched_name is null) stays hollow.

**Street/landmark false positive geocodes:** Nominatim frequently matches restaurant names to streets (Via [Name]), piazzas, churches, museums, or the city name itself. Always null these regardless of whether the coordinates are in-bounds. Engineering fix pending (geocode.js auto-detection — Fix 3). Fixed definition established 2026-04-28. Known false positives documented in Geocoding Policy section.

**price_level dropout — structural gap confirmed 2026-05-04:** 8 cities have 100% null price_level: Barcelona, Logroño, Málaga, Marrakesh, Porto, Seville, Toronto, Valencia. All are v7.1 — pipeline rebuilds will not help, sources don't mention prices. Price filter shows empty results for these cities. No action taken — will be fixed at natural rebuild cycle.

**price_level dropout on Italian cities:** When the pipeline extracts restaurants from sources that do not explicitly state prices, price_level will be null. The v7.1 template now includes inference from context. If a city's restaurants all have null price_level after pipeline run, a manual patch script assigning price levels from context is required. Fixed 2026-04-28.

**neighbourhood dropout on compaction-reconstruction:** When the pipeline compacts during Phase 2/3, the neighbourhood field may drop. Run hood-check.py after postrun and look for a large None bucket. Repair: coordinate-based neighbourhood assignment script. Template fix (neighbourhood-first) applied 2026-04-28. hood-check.py is reusable — run after every Italian city postrun.

**language_pool derivation — UPDATED 2026-05-04:** postrun.js STEP 1.5 now recalculates language_pool from publisher diversity — if 2+ distinct `publication` values cover a restaurant, set `language_pool = 'both'`. Single-publisher restaurants use the source's language field (lowercased). Code comment in postrun.js: "`language_pool = 'both'` means cross-publisher as of 2026-05-04, not cross-language. Field rename scheduled for Next.js migration."

**Self-hosted geocoding:** Deferred. Revisit if a ToS block occurs in practice or fleet exceeds 50 cities.

**Batch pipeline architecture:** Maximum 3–4 simultaneous Claude Code sessions on Max 5x plan. Always stagger pipeline launches by 20 minutes. postrun.js must run sequentially — never two simultaneous postrun instances (Nominatim ToS: 1 req/sec per IP).

**Quote field dropout on compaction-reconstruction:** If the pipeline compacts during Phase 2 and reconstructs from transcript during Phase 3, the final JSON may be missing the quote field for all restaurants despite working.json containing correct quotes. Repair pattern: build name→quote map from working.json, patch final.json, re-run postrun. Observed in Marrakesh v7.1 rebuild (2026-04-23).

**Quote field dropout — description variant:** When the pipeline compacts and reconstructs, it may write 'description' instead of 'quote' for the quote field. Repair: map description→quote from working.json. Standard repair pattern confirmed Barcelona 2026-04-25.

**Multiple postrun runs:** For large cities with wrong geocode outliers, 2–3 postrun runs may be required and are correct. geo_skip flags prevent redundant geocoding API calls on subsequent runs.

**Infatuation + Culinary Backstreets JS-only:** Both return SPA shells via automated fetch. Work correctly in browser. No action needed — not broken links. Do not null these article_urls.

**Auto-null word overlap for spelling variants:** Levenshtein distance check (edit distance ≤ 2, tokens ≥ 4 chars) prevents false auto-null on single-character spelling variants. Fixed 2026-04-24.

**Geography disambiguation:** City names that collide with prominent international toponyms cause systematic search result contamination. Known collisions: Córdoba (Spain vs Argentina), El Ejido (Málaga neighbourhood vs Almería city), Naples (Italy vs Naples Florida).

**Part 1 file quality as primary quality lever:** Known named-author sources must be listed as DIRECT_FETCH_SOURCES. Known geography collisions must be flagged. Known byline edge cases must be documented. The pipeline cannot compensate for a weak Part 1 file.

**Git history QA for regression analysis:** Before accepting a consensus pick regression as "quality gates working correctly," check the old pack's source list via git history. Command: `git log --oneline -- localbite-[city]-2023-2026.json` then `git show [hash]:localbite-[city]-2023-2026.json`.

**Bonfim centroid derived from wrong match:** When a centroid is derived from a geocoded restaurant that is later nulled as a wrong match, the centroid must also be removed.

**CosasDeCome directory format:** No editorial prose quotes. Reject permanently. Do not attempt Wayback Machine fallback (451 confirmed). Fixed definition established 2026-04-25.

**Michelin exclusion is a blanket rule:** All Michelin-starred restaurants are excluded from city packs regardless of article date. Part 1 files must list all known starred restaurants in MICHELIN_STARRED_EXCLUSIONS. Confirmed: Gagini Social Restaurant (Palermo), Bros' (Lecce). Fixed definition established 2026-04-25.

**Paywall structural gap:** Toronto (Globe and Mail, Toronto Life); Portugal (Público/Fugas — geo-blocked 451). No programmatic workaround. Document per city.

**writer_profile contamination on compaction-reconstruction:** Repair pattern: clean profiles that bleed phase references, tier assignments, or fetch notes. Fleet-wide repair confirmed. Additional repairs applied 2026-05-04 (Bologna, Genoa, Modena).

**451 geo-blocking as access barrier:** Permanent access barriers. Document per city. Do not spend multiple Phase 0 fetch attempts on a source confirmed to return 451.

**403 geo-blocks vs broken links:** 403 from fetch ≠ broken for users. Browser-verify before nulling. Known geo-block pattern: NatGeo España, metropolitano.gal, navarracapital.es, aragondigital.es, hoyaragon.es.

**Fleet-wide URL verification:** Periodic health check. Baseline: 128 unique URLs, 88 OK, 10 JS-only (functional in browser), 4 redirect, 12 403, 4 fetch error, 10 null. The JS-only category (Culinary Backstreets, The Infatuation) is functional for users and requires no action.

**Fetch log template change — implemented:** The v7.1 template captures OUTPUT_FETCH_LOG. All Italy Part 1 files include OUTPUT_FETCH_LOG.

**Part 1 pre-research session:** Runs BEFORE the Part 1 file is written. Template: localbite-part1-preresearch-template.txt. Workflow: [Pre-research → Part 1 file] → Phase 0 → Phase 1 → Phase 2 → Phase 3. Do not describe as "Phase 0 automation." Established 2026-04-27.

**Pre-research search query year terms vs YEAR_RANGE field:** Pre-research discovery searches use "2024 2025". YEAR_RANGE: 2023-2026 belongs in the Part 1 VARIABLES block, not in discovery searches.

**Publish threshold:** ≥10R minimum before publishing any city pack. Cities below threshold are marked "coming soon."

**Address field — tabled 2026-05-04:** Pipeline extraction (Option C1: add address field to Phase 2 extraction prompt) is the only viable path to address data for future rebuilds. All 35 cities without address data are v7.1 — rebuilds will not help those cities as their sources don't mention addresses. 6 cities have address data from pipeline extraction (Genoa 70%, Madrid 71%, Murcia 100%, Rome 23%, Seville 50%, Toronto 96%). Address display in the viewer (Change 5) is tabled — revisit when broader coverage path exists. Google Maps deep links and reverse geocoding are not being implemented.

**Italy full prompt files:** Generated locally by `python3 combine-italy-prompts.py localbite-prompt-v7-template.txt`. Not committed to the repo.

**Incremental Next.js approach:** The chosen front-end direction. Key constraints: pipeline JSON format frozen, GitHub Pages stays, Leaflet/OSM stays, consensus picks are first-class. Do not suggest Supabase, database backend, or server-side rendering without explicit instruction.

**App strategy:** PWA → TWA → Capacitor iOS → React Native. Download-and-cache data strategy. Do not suggest bundling city data in the app binary.

**Gambero Rosso is not a COI source:** A cooking school does not create a commercial conflict of interest. Standard named-author source. No COI flags. Fixed definition established 2026-04-27.

**Concentration cap — contextual application:** 30% cap is a quality safeguard, not a hard rule. Rome v7.1 Katie Parla 64% accepted as structural — flag for rebuild. Established 2026-04-27.

**Italy pipeline status:** COMPLETE as of 2026-04-30. 15 cities at v7.1. Trento and Matera parked.

**Italy new sources verified 2026-05-04:** Three sources confirmed ready for Part 1 updates and rebuilds:
- Rome: Veronica Guerrini / Puntarella Rossa (IT) — confirmed fetchable, Oct 2024, Grappolo d'Oro
- Venice: Gillian McGuire / The Infatuation (EN) — confirmed fetchable, May 2025, Osteria Giorgione
- Trieste: Enrico Scoccimarro / Scatti di Gusto (IT) — confirmed fetchable, Sep 2025, Da Siora Rosa

**7 confirmed ready sources (2026-05-04):** Rome/Puntarella Rossa/Guerrini, Venice/Infatuation/McGuire, Trieste/Scatti di Gusto/Scoccimarro, Madrid/ABC Salsa de Chiles/Maribona, Madrid/Complicidad Gastronómica/Agüero, Barcelona/Observación Gastronómica/Regol, Turin/ilGolosario.it/Massobrio. All confirmed fetchable with named bylines and pack overlap verified.

**3 fetch-limitation candidates (2026-05-04):** Madrid/La Razón/Ferrandis (site-blocked, Muck Rack URLs confirmed), Málaga/Sur/Bellver (not indexed, user-accessible likely), A Coruña+Vigo/La Voz de Galicia/Campos (paywalled). Add as DIRECT_FETCH_SOURCES with null article_url and fetch limitation documented.

**Massobrio qualifying source:** ilGolosario.it (Comunicare srl, his own publishing house) — not La Stampa. La Stampa is paywalled. ilGolosario.it has fetchable named-byline restaurant reviews. Add ilGolosario.it as DIRECT_FETCH_SOURCE for Turin.

**Enrique Bellver spelling:** Full name Enrique Bellver López (earlier sessions had "Belber" — typo). @Gastrobellver. "Málaga en la Mesa" supplement at Diario SUR. Premio Enrique Mapelli winner.

**Palermo structural gap confirmed:** All 18 Palermo restaurants single-source. Requires editorial rebuild. Cronache di Gusto (director: Fabrizio Carrera; "dove mangio" writer: Clara Minissale) is the strongest Palermo-based candidate — active 2024-2025, independent publisher, pack overlap unconfirmed (covers contemporary openings; pack likely anchored in traditional trattorias). Add as candidate in Palermo Part 1 rebuild. Also attempt Giornale di Sicilia in Phase 1.

**Thin city risk for Italy:** Bari, Lecce, Catania, Trieste at risk of falling below ≥10R threshold. Run last within batch.

**git add with 2>/dev/null masks fatal errors:** Do not use `2>/dev/null` on git add commands. Use explicit file lists; run `git status` before committing.

**postrun.js version string — RESOLVED 2026-04-29:** Runtime correctly shows v3.4.

**`city_name` compaction reconstruction variant:** Auto-repaired by postrun.js Step 1 (Fix A, 2026-04-29).

**Italian viewer language support:** `poolLabel` and `langLabel` maps include Italian. The language filter dropdown has been replaced by a consensus picks toggle button as of 2026-05-04. All Italian cities display correctly.

**Italian city sources list vs dict:** Viewer handles both formats (fixed 2026-04-29). Postrun auto-repair (Fix 2) pending implementation. Only manually convert if visibly broken.

**Milan source id fields — FIXED 2026-05-04:** All 10 Milan source objects were missing `id` and `source_id` fields, causing `currentSources` lookups to fail silently — chips not rendering on any Milan card. Fix: `id` field added equal to dict key for each source object. Fleet-wide check confirmed Milan-only issue. Commit: c8520d5.

**source_count field — null across fleet 2026-05-04:** `source_count` is null for all 1,288 restaurants. The viewer sort uses `sources.length` as fallback when `source_count` is null. Sort order: both-pool first → sources.length desc → A-Z. Commit: 3c0156a.

**CiboToday vs Cibo Today naming inconsistency:** Modena uses "Cibo Today" (two words), other cities use "CiboToday" (one word). These are treated as different publications in the CP computation. Verify if same publisher — if so, fix Modena's publication name to match fleet standard. Data cleanup at next rebuild.

**signature_dish vs dishes field:** The viewer reads only `signature_dish` (string). Rome's pipeline used `dishes` (array) — none displayed. Fixed by taking `dishes[0]`. Coverage gaps (Naples 4/62, Milan 17/60) are pipeline extraction failures.

**approve-centroids TypeError — FIXED 2026-04-29 (Fix B):** `null_coord_restaurants` TypeError guard added.

**Both-pool rate as leading indicator of pre-research quality:** Low CP despite multiple sources = sources covering different restaurant segments = Part 1 problem.

**Wieteska (Roam & Thrive) as default Pugliese EN source:** Confirmed in Bari and Lecce. Prioritise second EN source for future Pugliese cities.

**Rate limit resume behaviour — known inefficiency:** Resumed sessions restart Phase 1. Provide confirmed source list explicitly to skip Phase 1 re-run.

**Italian ownership groups — fixed reference 2026-05-04:** Never add two papers from the same group to the same city.
- **GEDI:** La Stampa (Turin). Il Secolo XIX (Genoa) was GEDI but acquired by Blue Media Srl (MSC group) September 2024 — now independent of GEDI.
- **RCS (Cairo Communication):** Corriere della Sera (Milan) + all regional Corriere editions (Florence, Venice, Bologna, Naples).
- **Caltagirone:** Il Messaggero (Rome), Il Mattino (Naples), Il Gazzettino (Venice), Quotidiano di Puglia (Lecce/Bari).
- **Monrif/QN:** La Nazione (Florence), Il Resto del Carlino (Bologna), Il Giorno (Milan), Gazzetta di Modena.

**Spanish ownership — Vocento group — fixed reference 2026-05-04:** Vocento owns ABC plus: El Correo (Bilbao), El Diario Vasco (San Sebastián), La Rioja (Logroño), El Norte de Castilla (Valladolid), Las Provincias (Valencia), La Verdad (Murcia), Ideal (Granada), Sur (Málaga), Hoy, El Diario Montañés, El Comercio. All existing LocalBite pack sources are independent of Vocento. Adding one Vocento paper per city is safe — never add two Vocento papers to the same city.

**Engineering backlog — pending fixes:**
- **P0 — Fix 2:** postrun.js Step 1.5 sources list→dict auto-repair (~50 min). Implement before next pipeline batch.
- **P0 — Fix 3:** geocode.js landmark/street false positive detection, Italian cities only (~90 min). Implement before next pipeline batch.
- **P1 — Fix 4:** Nominatim centroid query uses `quartiere ${nb}, ${city}` prefix for Italian cities (~40 min).
- **P1 — Fix 5:** pre-postrun-check.py diagnostic script (~90 min).
- **P1 — Pre-research template:** Add Search 8 and Search 9 to localbite-part1-preresearch-template.txt (~30 min). Do before next pre-research session. Search 8: `[city] critico gastronomico ristoranti nome giornalista sito 2024 2025` (Italian) or `[city] newspaper food critic named 2024 2025` (non-Italian). Search 9: `[country] national food column restaurant [city] 2024 2025`. Note: include "sito" in Italian queries to capture both newspaper and independent web coverage.

**DONE — Both-pool definition changes 2026-05-04:** (a) postrun.js Step 1.5 updated to publisher-diversity logic; (b) pipeline template both-pool rule updated; (c) recomputation script run across all 41 cities. Fleet CP: 119 → 233. All three simultaneous changes applied, verified, committed.

**Viewer smoke test — required workflow:** After every new city commit, run a 5-item smoke test: (1) city loads without error, (2) restaurant cards appear with quotes, (3) source chips appear on cards, (4) Sources panel opens and shows writer names and article links, (5) consensus pick badge displays correctly. 2 minutes per city.

**CP terminology — established 2026-05-01:** "Consensus pick" (CP) is the preferred term in all documentation. "Both-pool" (BP) is deprecated in docs but the code fields (`both_pool`, `language_pool`) stay unchanged until Next.js migration.

**Source verification methodology — publication-first:** Fetch the candidate publication's content section, scan for pack restaurant name matches. Restaurant-anchored searches are systematically incomplete — a publication covering 15 pack restaurants is only found if that specific restaurant is tested. Established 2026-05-01.

**Italian regional newspaper gap — systematic:** No Italian regional newspaper in the fleet across all 15 Italian cities. Most Italian regional newspapers do NOT have named food critics writing editorial prose restaurant reviews — the pipeline's failure to find them is accurate. Independent food sites (Cronache di Gusto, ilGolosario.it) fill this role instead. Independent candidates for future research: Il Mattino (Naples), La Sicilia (Catania/Palermo), Giornale di Sicilia (Palermo), Il Piccolo (Trieste), Messaggero Veneto (Trieste), L'Adige (Verona). Check ownership conflicts against Italian ownership groups map before any verification session.

**Sources panel UX gap — outstanding:** Under the new publisher-independence definition, consensus picks may show only same-language sources. The Sources panel needs explicit copy: "recommended by [N] editorially independent sources from different publishers." This copy update has not yet been implemented.

**Source tier classification:**
- **Local:** Writer lives in / habitually covers that specific city. Fully consistent with LocalBite identity.
- **Regional:** Covers a region, city-primary. Consistent if regional counts as local.
- **National:** Named writers travel across the country. El Comidista excluded by writer locality decision.
- **International:** Occasional city visits. Weakest product alignment. Deferred.

**New source systematic gap:** Pre-research template was missing two searches (Search 8 and 9). Add before next pre-research session.

---

## Viewer UI — Current State (as of 2026-05-04)

**Consensus picks badge:** "Consensus pick" (changed from "Two languages" — commit 5f1b1ca)

**Source chips:** All sources shown as chips on every card. Chips are `<a>` links when article_url exists, `<span>` when null. Source ↗ link removed. CSS: `a.source-chip` with hover state. Note: language dot on chips (7px colour circle per language) was in the original spec but NOT implemented — deferred.

**Writer attribution line:** Removed from cards (commit bb984a9). Writer credit lives in Sources panel and chips only. `primaryId`, `primarySrc`, `sourceUrl`, `writerLabel` JS variables removed from cardHTML.

**About this writer:** Removed from cards (commit 9805e8c). Writer profiles remain in Sources panel only.

**Language filter dropdown:** Removed. Replaced by Consensus picks toggle button (commit 4ef9eb5).

**Consensus picks toggle:** Pill-shaped button. Hidden for cities with 0 consensus picks. Resets on city switch and filter-clear. State: `let consensusOnly = false`.

**Sort order:** Fixed permanently: both-pool first → sources.length desc → A-Z tiebreaker. Uses `sources.length` as fallback when `source_count` is null (commit 3c0156a).

**City banner:** "Green border = consensus pick" (changed from "confirmed in two languages").

**Tooltip:** "This restaurant was recommended by two or more editorially independent sources from different publishers. Publisher independence — not language — is the signal. This cross-publisher confirmation is the strongest quality signal on LocalBite."

**Map popup:** "Consensus pick" badge (changed from "Two languages").

**Filter row (current):** Neighbourhood dropdown, Price dropdown, Consensus picks toggle.

**Viewer filter IDs:** `f-neighbourhood`, `f-price` (active). `f-pool` removed entirely.

**Outstanding viewer items:**
- Sources panel UX gap: needs "recommended by [N] editorially independent sources from different publishers" copy
- Language dot on chips: deferred (not implemented)
- Address display (Change 5): tabled

---

## Source Quality Rules

- Named human author required — byline must appear in the article OR confirmed via About page on single-author sites
- Article must be dated 2023 or later (city-dependent — check Part 1 YEAR_RANGE)
- Source must be independently produced — no aggregators, no booking platforms, no tourism boards, no hotel-owned content
- **Consensus pick (confirmed 2026-05-04):** requires different publishers AND publisher independence. Same-publisher editions do not qualify regardless of language.
- writer_profile is user-facing — no pipeline notes, no fetch data, no operational information. Viewer shows writer profiles in Sources panel only (not on cards).
- Time Out commercial conflict: Flag with ⚠ coi in writer profile. Do not reject — include transparently.
- Gambero Rosso: standard named-author source. No COI. Do not flag.
- Concentration cap: if any single source exceeds 30% of single-source Tier B entries, auto-reject lowest-confidence entries until within cap. Exception: when high concentration is structural — document and accept with audit note.
- Single-author sites: confirm named author from About page; apply single-author site rule.

---

## Geocoding Policy

- Nominatim → Photon (in that order)
- HERE API excluded permanently (ToS prohibits permanent storage)
- Always validate coordinates against city bounding box
- Geocoder uses case-insensitive CITY_BOXES lookup (fixed 2026-04-21)
- Both accented and unaccented city name variants must be present in CITY_BOXES (fixed 2026-04-24)
- Neighbourhood centroid Nominatim queries also validated against city bounding box — out-of-bounds results rejected (fixed 2026-04-23)
- False positives are common — verify coordinates match expected neighbourhood
- geo_skip: true flag prevents a restaurant from being re-geocoded in future postrun runs
- geo_skip: true is now set automatically by geocode.js for restaurants not found by either geocoder after first postrun run (fixed 2026-04-22)
- For flagship cities where automated rate falls below 50%, cannot do manual lookups
- New restaurant openings (2025+) are systematically underrepresented in OSM — cannot do manual lookups for recent openings
- Medium-confidence geocoding matches where geo_matched_name is null should be nulled and geo_skip flagged before committing
- Medium-confidence matches with a plausible named match (geo_matched_name present and overlapping) are kept and show solid pins in the viewer
- Levenshtein distance check (edit distance ≤ 2, tokens ≥ 4 chars) prevents false auto-null on single-character spelling variants (fixed 2026-04-24)
- When nulling a geocoded restaurant that was the sole contributor to a neighbourhood centroid, also remove that centroid from the JSON
- HIGH SPREAD centroid warnings (lat spread > 0.05) indicate a bad geocode is dragging the centroid. Identify and null the outlier restaurant before accepting the centroid.
- Reverse geocoding: NOT being implemented. Must filter to geo_confidence = 'high' only if ever used — centroid-geocoded restaurants produce wrong addresses.
- Italy CITY_BOXES: 15 cities added 2026-04-27. Venice bounding box covers islands + outer lagoon; Mestre excluded.
- Street/landmark false positives: always null medium-confidence matches to streets (Via [Name]), piazzas, churches, museums, or the city name itself. Engineering fix pending (Fix 3). Known false positives: Naples (Via Attilio Micheluzzi, Via Alfredo Capelli, Via Gaetano Manfredi, Villa Pignatelli, Napoli); Venice (Antico Cimitero ebraico, Teatro La Fenice); Palermo (Via Archestrato di Gela); Genoa (Ponte Embriaco, Chiesa, Piazzetta Barisone, Casa di cura Villa Montallegro); Bari (Antica Santa Lucia wrong area); Lecce (Osteria di Lecce, Trattoria San Carlino).
- CITY_BOUNDS in index.html: postrun generates CITY_BOUNDS with pad=0 — matches geocoder bbox exactly (Fix 1, 2026-04-29). No manual widening required for new cities.

---

## Token Capture

Token capture is handled in two ways:

**Pipeline metrics node command:** Writes city, date, sources, restaurants, both-pool, searches_run, open_status_check to localbite-run-metrics.log at pipeline end.

**postrun.js STEP 5.5:** Updates the existing metrics log entry with run_time_seconds and tool_uses. City matching uses normalised comparison with startsWith fallback (fixed 2026-04-23).

**Known limitation:** Token counts remain null for compacting runs. run_time_seconds may be implausible when pipelines restart mid-session.

---

## Pipeline Launch — Correct Method

Open a fresh terminal tab and launch Claude Code without piping:

```
cd /Users/harryenchin/Documents/GitHub/localbite
claude --dangerously-skip-permissions
```

At the Claude Code prompt, type:

```
Read localbite-prompt-v71-[city]-italy-full.txt and run the full pipeline now.
```

**Do NOT pipe the prompt file via stdin.** Launch Claude Code first, then give the instruction at the prompt. Validated 2026-04-21.

With PHASE1_AUTO_PROCEED: YES and UNATTENDED_MODE: YES, the pipeline runs fully unattended. The required human steps after the pipeline completes:

```
# Step 0 — city_name→city auto-repair now handled by postrun.js Fix A (2026-04-29)
# Manual fix kept as fallback only

# Step 1 — geocoding + schema validation + profile enrichment + centroids + index update
node localbite-postrun.js localbite-[city]-italy-2023-2026.json

# Step 2 — verify language_pool publisher-diversity logic worked
# Check all restaurants with 2+ distinct publications show language_pool='both'

# Step 3 — check for neighbourhood dropout
python3 hood-check.py localbite-[city]-italy-2023-2026.json
# If None count > 5, neighbourhood dropout occurred — apply fix script

# Step 4 — verify STEP 5.5 fired and captured run_time/tool_uses
tail -1 localbite-run-metrics.log

# Step 5 — check for CENTROIDS naming collision before committing

# Step 6 — review medium-confidence matches; null wrong ones and set geo_skip: true
# Street names (Via, Viale, Piazza, Ponte), churches, museums, city name itself
# Also check: HIGH SPREAD centroids — find and null the outlier geocode

# Step 7 — CITY_BOUNDS: postrun generates correct bounds (pad=0). Verify looks correct.

# Step 8 — verify article_url for all sources (postrun.js will warn if missing)
# Null homepage URLs; null category pages; null fabricated URLs

# Step 9 — check sources field type; if list, convert to dict before committing
# (Fix 2 pending — until implemented, manual conversion required if visibly broken)

# Step 10 — check for Michelin-starred restaurants in the pack

# Step 11 — viewer smoke test (2 min, 5 items)

# Step 12 — approve centroids (run AFTER geocode nulling)
node localbite-approve-centroids.js localbite-[city]-italy-2023-2026.json --auto-accept

# Step 13 — commit (explicit file list — do NOT use 2>/dev/null)
git add localbite-[city]-italy-2023-2026.json index.html localbite-index.json localbite-run-metrics.log localbite-[city]-italy-search-log.txt localbite-[city]-italy-fetch-log.txt localbite-[city]-italy-search-plan.txt localbite-[city]-italy-audit.txt
git status  # verify all intended files staged
git commit -m "data: [City] v7.1 — N restaurants, N sources, N both-pool"
git push
```

**Critical terminal discipline:**
- Never chain `approve-centroids` with git commands in the same paste
- Never run postrun.js from the monitoring terminal (T5) — use T6 only
- Do NOT use `2>/dev/null` on git add commands

---

## Terminal Discipline for Batch Runs

**Fixed terminal assignment (3-city batch):**
- **T1:** Claude Code — City A pipeline only
- **T2:** Claude Code — City B pipeline only (launch 20 min after T1)
- **T3:** Claude Code — City C pipeline only (launch 20 min after T2)
- **T5:** Monitoring only — NEVER postrun from here
- **T6:** postrun + git — sequential, one city at a time

**Rate limit rules:**
- Maximum 3–4 concurrent Claude Code sessions
- postrun.js always sequential
- 20-minute stagger between pipeline launches
- Hard stopping rule: no new pipeline work after hour 4 of a session

---

## File and Commit Conventions

**Always create downloadable files** for documents, scripts, and prompt files — not inline code blocks.

**Always provide complete files** — never just a delta or list of changes.

**Script standard:** Every Python command goes in a script file. No `-c` one-liners. Save directly to `/Users/harryenchin/Documents/GitHub/localbite/`.

**Fix scripts must use dry-run-first pattern:** Verify target strings exist exactly once before modifying any file.

**Always re-read a file after any modification before writing another script targeting that file.**

**Prompt files follow the two-part structure:**
- Part 1: city variables
- Part 2: pipeline engine
- Full prompt = `python3 combine-italy-prompts.py localbite-prompt-v7-template.txt`

**Output file naming:**
- Raw extraction: `localbite-[city]-italy-raw.json`
- Final pack: `localbite-[city]-italy-2023-2026.json`
- Search log: `localbite-[city]-italy-search-log.txt`
- Search plan: `localbite-[city]-italy-search-plan.txt`
- Fetch log: `localbite-[city]-italy-fetch-log.txt`

**Commit messages follow conventional commits:**
- `feat:` — new viewer feature
- `fix:` — bug fix
- `docs:` — documentation
- `data:` — city pack additions or updates
- `refactor:` — code restructuring

**Never commit:** `.DS_Store`, image files, intermediate working files, superseded prompt variants, geocoding backup files, full pipeline prompt files (`*-italy-full.txt`).

---

## Session Protocol

**At the start of each session:**
- Run the fleet script to check current state
- Verify what is and isn't already in the repo
- Check engineering backlog — implement P0 items before launching new pipelines
- Launch Claude Code with: `claude --dangerously-skip-permissions` (no pipe)

```bash
cat > /tmp/fleet.py << 'ENDOFSCRIPT'
import json, glob
cities = []
for f in sorted(glob.glob('localbite-*-2023-2026.json') + glob.glob('localbite-*-2025-2026.json')):
    try:
        d = json.load(open(f))
        r = d.get('restaurants', [])
        cities.append({'city': d.get('city','?'), 'file': f, 'r': len(r),
            'bp': sum(1 for x in r if x.get('language_pool')=='both'),
            'pipeline': d.get('pipeline','?')})
    except: pass
print(f'Fleet: {len(cities)} files, {sum(c["r"] for c in cities)} restaurants')
for c in cities: print(f'  {c["city"]}: {c["r"]}R, {c["bp"]}BP — {c["pipeline"]} ({c["file"]})')
ENDOFSCRIPT
python3 /tmp/fleet.py
```

**At the end of each session, always produce:**
1. A journal entry
2. A list of all files needing to go into the repo
3. Git commands as a single copy-paste block
4. Current fleet state
5. Complete updated global instructions as a downloadable file
6. Next session plan as a downloadable file

**After every postrun, verify STEP 5.5 fired:**
```
tail -1 localbite-run-metrics.log
```

**After every Italian city postrun, check for neighbourhood dropout:**
```bash
python3 hood-check.py localbite-[city]-italy-2023-2026.json
```

**Before committing any new city, check for CENTROIDS collision.**

**After committing a new city, run viewer smoke test (2 min):**
(1) city loads without error, (2) cards appear with quotes, (3) source chips visible and clickable, (4) Sources panel shows writer names + links, (5) consensus pick badge correct.

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

- **Do not retroactively rebuild existing city packs.** Document quality issues and wait for the natural rebuild trigger. Exception: if git history audit confirms a regression is a pipeline search failure.

- **Do not produce inline code blocks for files that need to be committed.** Always create actual files.

- **Do not produce `-c` one-liners.** Every Python command goes in a script file. This is the standard, always, without exception.

- **Do not re-open fixed decisions** listed in the Fixed Definitions section unless explicitly asked to reconsider.

- **Do not produce multiple questions at once.** Ask one clarifying question at a time.

- **Do not accept a consensus pick regression without checking git history.**

- **Do not infer, pattern-match, or fabricate article_url values.** If not confirmed from fetch, set null.

- **Do not suggest HERE API, Google Maps API, or any geocoding service other than Nominatim and Photon** for programmatic geocoding.

- **Do not suggest Google Maps deep links, reverse geocoding, or navigation links** for the address field use case. These are not being implemented.

- **Do not use Node.js inline one-liners with `!` characters.**

- **Do not run postrun.js on old pipeline cities** without explicit instruction.

- **Do not chain approve-centroids with git commands in the same paste.**

- **Do not run postrun from the monitoring terminal (T5).**

- **Do not add new cities with neighbourhood names already present in CENTROIDS** until the naming collision architectural fix is applied.

- **Do not suggest setting up self-hosted Nominatim or Photon** without explicit instruction.

- **Do not write fix scripts that assume file state from earlier in the conversation.** Always read the exact target strings from the file before writing any script.

- **Do not accept CosasDeCome directory entries as qualifying quotes.**

- **Do not null article_urls that return 403 without first verifying in a browser.**

- **Do not describe the Part 1 pre-research session as "Phase 0 automation" or "enhanced Phase 0."**

- **Do not apply the 2023-2026 year range to pre-research web search queries.**

- **Do not suggest Supabase, a database backend, or server-side rendering** without explicit instruction.

- **Do not suggest bundling city JSON files in the native app binary.**

- **Do not launch Italian city pipelines without confirming the full prompt file exists locally.**

- **Do not apply reverse geocoding to centroid-geocoded restaurants.**

- **Do not use restaurant-anchored searches for source discovery.** Use publication-first methodology.

- **Do not conflate cross-city application of existing fleet sources with genuinely new sources.**

- **Do not implement any further both-pool definition changes** — the definition was confirmed and implemented 2026-05-04.

- **Do not add El Comidista or other national food column critics to any Part 1 file.** Writer locality is confirmed: city-based only. National critics excluded permanently.

- **Do not rename the `language_pool` field** without coordinated update of all 41 city JSONs, index.html, postrun.js, and the pipeline template. Rename scheduled for Next.js migration only.

- **Do not add COI flags to Gambero Rosso.**

- **Do not null medium-confidence geocode matches without checking geo_matched_name.**

- **Do not use `2>/dev/null` on git add commands.**

- **Do not apply the manual language_pool patch to Italian cities unless postrun.js has a new edge case.** The publisher-diversity logic handles this.

- **Do not exclude Michelin-starred restaurants only if the article predates the star.**

- **Do not retroactively convert Italian cities' sources list to dict** unless cards are visibly broken.

- **Do not run further pipeline batches before implementing Fix 2 and Fix 3.**

- **Do not skip the viewer smoke test after committing a new city.**

- **Do not start new pipeline work after hour 4 of a long session.**

- **Do not assume a pipeline resume will pick up where it left off.**

- **Do not place pipeline internals in writer_profile fields.** User-facing only. Writer profiles now appear in Sources panel only — not on cards.

- **Do not suggest Change 5 (address field display) without first confirming a viable path to broad address coverage.** Change 5 is tabled.

- **Do not add two papers from the same Italian ownership group to the same city.** Check GEDI, RCS, Caltagirone, and Monrif conflict maps before any source selection.

- **Do not add two Vocento papers to the same Spanish city.**

---

## Known Permanent Decisions Reference

| Decision | Resolution |
|----------|-----------|
| Geocoding API | Nominatim + Photon only. HERE excluded permanently. |
| Geocoder lookup | Case-insensitive CITY_BOXES lookup (fixed 2026-04-21). |
| Accented city names | Both accented and unaccented variants in CITY_BOXES (fixed 2026-04-24). |
| Consensus pick definition | Publisher independence only. Language irrelevant. Confirmed 2026-05-04. |
| Writer locality | City-based only. National critics excluded. El Comidista permanently excluded. Confirmed 2026-05-04. |
| Pipeline pause | Always after Phase 1, before Phase 2. PHASE1_AUTO_PROCEED: YES skips pause. |
| writer_profile | User-facing only. No pipeline internals. Sources panel only (not on cards). Additional repairs 2026-05-04. |
| Forum queries | Eliminated. 0% success rate confirmed. |
| React migration | At 2,500 lines of index.html. Current: 2,348 lines. |
| Results per query | 10 per query. Hard tool limit. |
| Phase 0 vs Phase 1 | Phase 0 = known sources (retrieval). Phase 1 = unknown sources (discovery). |
| City pack rebuilds | Only at natural trigger OR confirmed pipeline failure. |
| v7.1 trigger | Implemented and committed. v7.1 is current standard. |
| article_url | Never inferred or fabricated. Null if not confirmed from fetch. |
| Shell one-liners | Always Python. Never Node -e with ! characters. |
| Script standard | All Python commands as script files. No -c one-liners. Confirmed 2026-05-04. |
| Pipeline launch | No pipe. Launch Claude Code, then type instruction at prompt. |
| geo_skip flag | Set geo_skip: true + null coords for wrong geocoding matches. Auto-set after first failed geocoding. |
| source_id field | Auto-repair normalises source_id → id in postrun.js Step 1.5. |
| city_name field | Auto-repair normalises city_name → city in postrun.js Step 1 (Fix A, 2026-04-29). |
| CENTROIDS collision | Resolved for v7.1 cities via JSON-first centroid lookup. |
| Medium confidence pins | isHighConfidence() includes medium + geo_matched_name. |
| Street/landmark false positives | Null geocodes matching streets, piazzas, churches, museums, city name. Fix 3 pending. |
| Self-hosted geocoding | Deferred. |
| Batch pipeline | Max 3–4 concurrent. 20-min stagger. Sequential postrun. Hard stop hour 4. |
| approve-centroids | Never chain with git. --auto-accept standard. |
| Fix scripts | Dry-run-first always. |
| language_pool derivation | Publisher-diversity logic. `language_pool = 'both'` means cross-publisher as of 2026-05-04. |
| language_pool semantic | Field means cross-publisher, not cross-language. Rename to publisher_pool at Next.js migration. |
| neighbourhood dropout | Template fix (neighbourhood-first). hood-check.py diagnostic. |
| hood-check.py | Reusable diagnostic. Committed 2026-04-29. |
| price_level dropout | Template allows inference from context. 8 cities with structural null prices. |
| CITY_BOUNDS auto-generation | pad=0 — matches geocoder bbox exactly (Fix 1, 2026-04-29). |
| Quote field dropout | Repair from working.json. Known compaction pattern. |
| Quote field dropout — description variant | May write 'description' instead of 'quote'. Repair: map description→quote from working.json. |
| Multiple postrun runs | 2-3 runs correct for cities with wrong geocode outliers. geo_skip prevents redundant API calls. |
| Infatuation + Culinary Backstreets JS-only | SPA shells — functional in browser. Do not null article_urls. |
| Auto-null spelling variants | Levenshtein distance check prevents false auto-null. |
| YEAR_RANGE for all rebuilds | All cities use 2023-2026. |
| Rebuild regressions | Check git history before accepting. |
| Part 1 quality | Primary quality lever. Known sources → DIRECT_FETCH_SOURCES. |
| Single-author sites | Confirm author from About page. Apply single-author site rule. |
| Geography disambiguation | Known: Córdoba/Argentina, El Ejido/Almería, Naples/Naples Florida. |
| Git history QA | Before accepting CP regression, check old source list via git history. |
| CosasDeCome format | Directory format — no editorial prose. Reject. Permanent exclusion. |
| Michelin exclusion | Blanket rule. All starred restaurants excluded regardless of article date. |
| Paywall structural gap | Toronto, Portugal. No workaround. |
| HIGH SPREAD centroids | Identify and null outlier geocode before accepting. |
| writer_profile contamination | Fixed 2026-04-26 + 2026-05-04 (Bologna, Genoa, Modena). |
| 451 geo-blocking | Permanent access barriers. Document per city. |
| 403 geo-blocks vs broken links | 403 from fetch ≠ broken for users. Browser-verify before nulling. |
| article_url specificity | Must link to the article containing the mention. |
| Fleet-wide URL verification | Periodic health check. Baseline: 128 URLs, 88 OK. |
| Fetch log template | Implemented 2026-04-27. |
| Part 1 pre-research session | Lightweight pre-pipeline research. Not Phase 0. |
| Pre-research year terms | "2024 2025" for discovery. YEAR_RANGE: 2023-2026 for pipeline window. |
| Publish threshold | ≥10R minimum. Below = coming_soon. |
| Address field | Change 5 tabled. Option C1 (pipeline extraction) valid for future rebuilds. No Google Maps links, no reverse geocoding. |
| Italy full prompt files | Generated by combine-italy-prompts.py locally. Not committed. |
| Incremental Next.js | Chosen front-end direction. No database, no server. |
| App strategy | PWA → TWA → Capacitor iOS → React Native. Download-and-cache data. |
| Gambero Rosso COI | No COI. Standard named-author source. |
| Concentration cap — contextual | 30% cap is a safeguard, not a hard rule. Rome v7.1 Katie Parla 64% accepted as structural. |
| Italy pipeline | COMPLETE — 15 cities. Trento + Matera parked. |
| Katie Parla category page URLs | katieparla.com/restaurants/[city]/ = category page — null. Guide articles = valid. |
| git add with 2>/dev/null | Do NOT use. Silently masks fatal errors. |
| postrun.js version string | v3.4 header and runtime consistent. Fixed 2026-04-29. |
| city_name compaction variant | Auto-repaired by postrun.js Step 1 (Fix A, 2026-04-29). |
| Italian viewer language support | poolLabel, langLabel include Italian. Language filter replaced by consensus picks toggle 2026-05-04. |
| Italian sources list vs dict | Viewer handles both formats (fixed 2026-04-29). Only manually convert if visibly broken. |
| signature_dish vs dishes | Viewer reads only signature_dish (string). |
| approve-centroids null_coord_restaurants | TypeError fixed (Fix B, 2026-04-29). |
| Viewer sources list/dict | loadCity() handles both via Array.isArray() (commit 767a1bb, 2026-04-29). |
| source_count field | Null across fleet. Sort uses sources.length as fallback (fixed 2026-05-04). |
| Milan source id fields | Fixed 2026-05-04. All source objects now have id field. |
| CiboToday vs Cibo Today | Modena naming inconsistency noted. Data cleanup at next rebuild. |
| Viewer source chips | Clickable `<a>` when article_url exists, `<span>` when null. Show for all sources (fixed 2026-05-04). Language dot deferred. |
| Writer attribution line | Removed from cards 2026-05-04. Writer credit in Sources panel and chips only. |
| About this writer | Removed from cards 2026-05-04. Writer profiles in Sources panel only. |
| Consensus picks toggle | Replaces language filter dropdown. Hidden for 0-CP cities. Resets on city switch. (2026-05-04) |
| Sort order | Fixed: both-pool first → sources.length desc → A-Z. (2026-05-04) |
| Badge text | "Consensus pick" (changed from "Two languages" — 2026-05-04). |
| Sources panel UX gap | Outstanding — needs "recommended by [N] editorially independent sources" copy. Not yet implemented. |
| B1 source discovery methodology | Correct: publication-first. Wrong: restaurant-anchored. |
| New source tiers | Local → Regional → National → International. |
| Pre-research template fix | Search 8 and Search 9 still needed. P1. |
| El Comidista qualification | Excluded permanently by writer locality decision 2026-05-04. |
| Writer locality product decision | CONFIRMED: city-based only. National critics excluded. 2026-05-04. |
| Italy batch plan | COMPLETE — 15 cities. |
| Both-pool rate as quality signal | Low CP despite multiple sources = Part 1 problem. |
| Wieteska as Pugliese EN default | Confirmed in Bari and Lecce. |
| Rate limit resume | Resumed sessions restart Phase 1. Provide confirmed source list explicitly. |
| Engineering backlog | P0: Fix 2 (sources list→dict), Fix 3 (false positive geocode). P1: Fix 4, Fix 5, pre-research template. Both-pool changes DONE. |
| Viewer smoke test | 5-item, 2-min check after every city commit. |
| Session hard stop | No new pipeline work after hour 4. |
| Both-pool definition change | CONFIRMED and IMPLEMENTED 2026-05-04. Three simultaneous changes applied. |
| Source verification methodology | Publication-first. Not restaurant-anchored. |
| Italian regional newspaper gap | Systematic. Most have no named food critics. Independent food sites fill the role. |
| Italian ownership groups | GEDI, RCS, Caltagirone, Monrif. Il Secolo XIX now MSC/Blue Media (Sep 2024). Never add two papers from same group to same city. |
| Spanish ownership — Vocento | ABC + 10 regional papers. Never add two Vocento papers to same city. |
| Il Secolo XIX ownership | MSC/Blue Media (Sep 2024). No longer GEDI. La Stampa and Il Secolo XIX now independent. |
| Massobrio qualifying source | ilGolosario.it (not La Stampa). Fetchable, named bylines. Add as DIRECT_FETCH_SOURCE for Turin. |
| Enrique Bellver spelling | Bellver (not Belber). Full name Enrique Bellver López. @Gastrobellver. |
| 7 confirmed ready sources | Rome/Guerrini, Venice/McGuire, Trieste/Scoccimarro, Madrid/Maribona, Madrid/Agüero, Barcelona/Regol, Turin/Massobrio. |
| 3 fetch-limitation candidates | Madrid/Ferrandis, Málaga/Bellver, A Coruña+Vigo/Campos. Add with null article_url. |
| Cronache di Gusto / Palermo | Strong Palermo candidate. Pack overlap unconfirmed. Add as candidate in Palermo Part 1 rebuild. |
| CP evidence base | COMPLETE 2026-05-04. Confirmed and implemented. |

---

## Current Pipeline Status

**v7.1 template: implemented and committed. Current standard for all city runs.**
**neighbourhood-first working file structure: applied 2026-04-28. All 15 Italy full prompts regenerated.**
**postrun.js v3.4: publisher-diversity logic for language_pool (Fix 4, 2026-05-04). Runtime version string fixed. city_name→city auto-repair (Fix A). CITY_BOUNDS pad=0 (Fix 1). Fix 2 (sources list→dict) still P0 pending.**
**approve-centroids.js: null_coord_restaurants TypeError guard added (Fix B, 2026-04-29).**

**Engineering backlog (P0 — implement before next pipeline batch):**
- Fix 2: postrun.js Step 1.5 sources list→dict auto-repair (~50 min)
- Fix 3: geocode.js landmark/street false positive detection, Italian cities only (~90 min)

**Italy pipeline status:** COMPLETE as of 2026-04-30. 15 cities. All active or smoke test pending.

**Viewer UI — latest commits (2026-05-04):**
- bb984a9: Remove writer attribution from cards
- c8520d5: Fix Milan source id fields
- 3c0156a: Fix sort using sources.length fallback
- 4ef9eb5: Consensus picks toggle, remove language filter, fixed sort order
- d24e7a4: Fix banner alignment
- 3fe9d73: Fix alignment + tooltip text
- 9805e8c: Clickable chips, remove Source arrow and About this writer
- 5f1b1ca: Badge text Two languages → Consensus pick
- 280b0de: Both-pool definition change — all 41 cities recomputed

**Known outstanding items:**

*Data fixes:*
- Rome: Antico Caffè Greco permanently closed Oct 8, 2025 — remove before next commit
- Trieste: viewer smoke test pending
- Valencia Ojo al Plato: both article_urls return homepage (paywall/moved)
- Valladolid Recomiendo Valladolid: single review URL used for 7 restaurants — wrong URL specificity
- Barcelona: Eixample centroid HIGH SPREAD — natural rebuild trigger
- Valencia: Russafa and Gran Vía HIGH SPREAD — natural rebuild trigger
- Vigo: all article_urls null — check before rebuild
- Rome: Katie Parla concentration 64% — flag for rebuild
- CiboToday vs Cibo Today: Modena naming inconsistency — data cleanup at next rebuild

*Viewer:*
- Sources panel UX gap: needs "recommended by [N] editorially independent sources from different publishers" copy
- Language dot on chips: deferred — not yet implemented

*Pipeline (when ready):*
- Rome: add Puntarella Rossa (Guerrini/IT) to Part 1, rebuild
- Madrid: add Maribona + Agüero + Ferrandis (fetch-limitation) to Part 1, rebuild
- Barcelona: add Regol to Part 1, rebuild — fix Eixample HIGH SPREAD
- Venice: add The Infatuation (McGuire/EN) to Part 1, rebuild
- Trieste: add Scatti di Gusto (Scoccimarro/IT) to Part 1, rebuild
- Turin: add ilGolosario.it (Massobrio/IT) to Part 1, rebuild
- Málaga: add Bellver/Sur (fetch-limitation) to Part 1, rebuild
- A Coruña + Vigo: add Campos/La Voz (paywall risk) to Part 1, rebuild
- Palermo: editorial rebuild — Cronache di Gusto + Giornale di Sicilia attempt

*Engineering P0 (before next pipeline batch):*
- Fix 2: postrun.js sources list→dict auto-repair
- Fix 3: geocode.js false positive detection
- Pre-research template: Add Search 8 and 9

---

## Fleet State (as of 2026-05-04)

*Data sourced from actual JSON files via fleet script. Verify at next session start.*
*Note: Antico Caffè Greco (Rome) pending removal — permanently closed Oct 8, 2025. Fleet will be 1,287R after removal.*

### v7.1 Cities (Current Standard)

| City | Country | R | CP | CP% | Sources | Notes |
|------|---------|---|----|----|---------|-------|
| A Coruña | Spain | 25 | 11 | 44% | 5 | Campos/La Voz pending |
| Alicante | Spain | 9 | 1 | 11% | 7 | |
| Barcelona | Spain | 110 | 15 | 14% | 9 | Eixample centroid HIGH SPREAD; Regol pending |
| Bilbao | Spain | 23 | 4 | 17% | 6 | |
| Córdoba | Spain | 40 | 9 | 23% | 8 | |
| Granada | Spain | 4 | 2 | 50% | 4 | Very thin |
| Logroño | Spain | 15 | 2 | 13% | 6 | |
| Madrid | Spain | 116 | 19 | 16% | 9 | Maribona + Agüero + Ferrandis pending |
| Málaga | Spain | 34 | 5 | 15% | 6 | Bellver/Sur pending |
| Murcia | Spain | 10 | 3 | 30% | 9 | |
| Palma de Mallorca | Spain | 33 | 7 | 21% | 6 | |
| Pamplona | Spain | 24 | 3 | 13% | 4 | |
| San Sebastián | Spain | 24 | 9 | 38% | 6 | |
| Santiago de Compostela | Spain | 27 | 8 | 30% | 6 | |
| Seville | Spain | 22 | 0 | 0% | 5 | Structural — CosasDeCome exclusion |
| Toronto | Canada | 52 | 0 | 0% | 4 | Paywall gap structural |
| Valencia | Spain | 78 | 11 | 14% | 5 | Russafa/Gran Vía HIGH SPREAD; Ojo al Plato URL P1 |
| Valladolid | Spain | 30 | 3 | 10% | 5 | Recomiendo Valladolid URL issue |
| Vigo | Spain | 10 | 2 | 20% | 3 | All article_urls null; Campos/La Voz pending |
| Zaragoza | Spain | 39 | 5 | 13% | 7 | |
| Fes | Morocco | 21 | 5 | 24% | 4 | |
| Marrakesh | Morocco | 42 | 8 | 19% | 6 | |
| Rabat | Morocco | 5 | 1 | 20% | 2 | |
| Chefchaouen | Morocco | 2 | 0 | 0% | 1 | Structural — single source |
| Lisbon | Portugal | 24 | 9 | 38% | 6 | |
| Porto | Portugal | 17 | 2 | 12% | 4 | |
| Rome | Italy | 64 | 8 | 13% | 4 | Antico Caffè Greco pending removal; Katie Parla 64% concentration; Puntarella Rossa pending |
| Milan | Italy | 60 | 9 | 15% | 10 | Source id fields fixed 2026-05-04 |
| Florence | Italy | 42 | 9 | 21% | 5 | |
| Naples | Italy | 62 | 8 | 13% | 5 | |
| Bologna | Italy | 20 | 10 | 50% | 7 | 50% CP rate — fleet high |
| Turin | Italy | 23 | 6 | 26% | 4 | ilGolosario.it/Massobrio pending |
| Venice | Italy | 21 | 5 | 24% | 6 | Infatuation/McGuire pending |
| Palermo | Italy | 18 | 0 | 0% | 7 | All 18 restaurants single-source — structural; Cronache di Gusto candidate |
| Verona | Italy | 35 | 7 | 20% | 6 | |
| Genoa | Italy | 27 | 5 | 19% | 4 | |
| Modena | Italy | 10 | 2 | 20% | 4 | Cibo Today naming inconsistency |
| Bari | Italy | 14 | 7 | 50% | 3 | 50% CP rate — fleet high |
| Lecce | Italy | 26 | 6 | 23% | 6 | Bros' excluded (Michelin 1★) |
| Catania | Italy | 16 | 3 | 19% | 4 | |
| Trieste | Italy | 14 | 4 | 29% | 6 | Viewer smoke test pending; Scoccimarro/Scatti di Gusto pending |

**Fleet totals: 41 v7.1 cities active, 41 files, 1,288R, 233 CP (18.1%)**
**Italy: COMPLETE — 15 cities (Trento + Matera parked)**

**Next pipeline direction:** Engineering P0 fixes first (Fix 2, Fix 3). Then Part 1 updates for Rome, Madrid, Barcelona. Pipeline rebuilds for those three cities. Venice, Trieste, Turin, Málaga, A Coruña, Vigo, Palermo deferred — lower priority.

---

*Last updated: 2026-05-04 — Session: "Both-pool definition confirmed, 119→233 consensus picks, Objective 3 UI complete". Definition change confirmed and implemented (publisher independence only). All 41 cities recomputed. postrun.js Fix 4 + pipeline template + recomputation script — three simultaneous changes applied. Full Objective 3 UI shipped: consensus picks toggle, clickable chips, writer attribution removed, badge text updated, sort fixed. Milan source id fix. Writer profile contamination repaired (Bologna, Genoa, Modena). Italian and Spanish ownership maps finalised. index.html: 2,348 lines.*
