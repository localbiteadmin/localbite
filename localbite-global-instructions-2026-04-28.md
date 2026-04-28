# LocalBite — Global Instructions for Claude

---

## Project Identity

LocalBite is a restaurant recommendation web app surfacing recommendations from named local food writers only — not aggregators, not PR, not anonymous editorial teams. The core quality signal is independent cross-validation: restaurants recommended by multiple genuinely independent sources.

**Stack:** Vanilla JS single-file index.html (current), migrating to Next.js static export. GitHub Pages deployment, Claude Code pipeline for city pack generation.

**Repo:** github.com/localbiteadmin/localbite
**Local:** /Users/harryenchin/Documents/GitHub/localbite
**Plan:** Claude Max 5x ($100/month)

**Current fleet:** 30 v7.1 cities active, 30 files total. Pipeline version: v7.1. index.html migration trigger to React at 2,500 lines. Fleet restaurants: ~1064R (verify with fleet script at next session start).

---

## Fixed Definitions — Do Not Re-open

These decisions are closed. Do not revisit unless explicitly asked.

**Both-pool:** A restaurant recommended by two editorially independent organisations from different publishers writing in different languages. Same-publisher cross-language editions (e.g. Time Out EN + Time Out PT) do not qualify regardless of whether the editorial teams differ. This definition is fixed.

**Named author:** A specific human's name appearing as a byline in the article. Anonymous editorial team credits do not qualify. This applies even to high-credibility publications — Ara.cat was correctly rejected on this basis despite being a major Catalan newspaper.

**Single-author site rule:** Some sites (e.g. piccavey.com) are single-author sites where the author attribution appears on the About page but not on individual article headers. These qualify as named-author sources. The pipeline must confirm the author from the About page and then apply the single-author site rule — all articles from that site are accepted as from that named author. Do not reject single-author sites for missing article-level bylines. Document in Part 1 file when this applies.

**Geocoding stack:** Nominatim + Photon only. HERE ToS prohibits permanent storage of geocoded results and is permanently excluded. Google Maps API is not used programmatically. Manual Google Maps lookups are not permitted for restaurants that automated geocoding cannot resolve.

**Bounding box validation:** Always validate geocoded coordinates against the city's bounding box. False positives occur regularly — a Rabat restaurant was matched to Ghana. Every coordinate must be verified within the expected geographic area. The geocoder performs case-insensitive CITY_BOXES lookup — "Santiago De Compostela" and "Santiago de Compostela" both resolve correctly. Bounding box validation also applies to neighbourhood centroid Nominatim queries — coordinates outside the city bounding box are rejected and treated as not-found (fixed 2026-04-23).

**Accented city names in CITY_BOXES:** Both accented and unaccented variants must be present in geocode.js CITY_BOXES for any city with accented characters. Known pairs: Málaga/Malaga, Córdoba/Cordoba, Logroño/Logrono, A Coruña/A Coruna, San Sebastián/San Sebastian. When adding new accented cities, add both variants. The accent-stripping in the case-insensitive lookup does not handle accent variants (fixed 2026-04-24).

**Pipeline pause point:** Always pause after Phase 1 source selection before any fetching or extraction. Never run Phase 1 through to Phase 2 without a pause and source list review. PHASE1_AUTO_PROCEED: YES overrides this pause — use only in validated unattended runs.

**writer_profile field:** User-facing only. Never include pipeline internals, fetch quality notes, tier assignments, rejection counts, or any operational data in this field. It is read by end users in the Sources panel.

**React migration trigger:** 2,500 lines of index.html. Current: ~2,296 lines.

**Phase 0 vs Phase 1 distinction:** Phase 0 is retrieval — direct fetching of known high-quality sources. Phase 1 is discovery — searching for unknown sources. Named-writer and named-publication queries belong in Phase 0 for rebuilds, not in Phase 1 search queries.

**Forum queries:** Eliminated from v7 template. Confirmed 0% success rate across all cities and all runs. Do not suggest re-adding them.

**Results per query:** 10 per query. This is the hard tool limit and cannot be overridden. Do not reference positions beyond 10 or claim results were found at positions 11–30.

**article_url field:** Required in v7.1 JSON schema. MUST be confirmed from an actual successful fetch response during extraction — never inferred, pattern-matched, or fabricated from article titles or publisher patterns. If not confirmed from a fetch, set null. This applies especially after compaction-reconstruction: the pipeline may generate plausible-looking but incorrect URLs that 404. Null article_url shows a broken link icon in the viewer — this is honest. A fabricated URL that 404s is worse than null. postrun.js warns loudly if article_url is missing or null but will not block the commit. Source ↗ links do not display in the viewer for sources with null article_url. Homepage URLs (e.g. eater.com/toronto) are not article URLs — null these too.

**article_url specificity:** article_url must link to the specific article that contains the restaurant mention — not a single-restaurant review page used for multiple restaurants, and not an evergreen guide landing page. A single-restaurant review (e.g. recomiendovalladolid.com/flamma/) cannot serve as the article_url for other restaurants — clicking ↗ on a different restaurant lands on the wrong content. A dated article that permanently redirects to an evergreen landing page (e.g. Euro Weekly News) is also not a valid article_url. In both cases, find the correct guide article URL or null. This is a link destination quality rule, separate from the confirmed-from-fetch rule. Identified via fleet-wide URL verification 2026-04-26.

**Katie Parla category page URLs:** katieparla.com/restaurants/[city]/ is a category page, not an article URL — null it. Her specific guide articles (e.g. katieparla.com/where-to-eat-drink-shop-rome/) are valid article_urls if confirmed from fetch. The distinction: a category page lists many articles; a guide article IS the content containing the restaurant mention. Fixed definition established 2026-04-28.

**Shell one-liners:** Always use Python for shell one-liners. Never use Node.js inline via `node -e` with `!` characters — zsh interprets `!` as history expansion and the command fails. Python does not have this issue.

**CENTROIDS naming collision:** The CENTROIDS object in index.html uses bare neighbourhood names as keys. Multiple cities share neighbourhood names (Casco Antiguo, Ensanche, Centro, Casco Viejo, Medina, Centro Storico, Porta Romana). For v7.1 cities this is resolved automatically: the viewer checks `currentCityData.centroids[nb]` (city JSON) FIRST before falling back to global `CENTROIDS[nb]`. The city JSON centroids field covers all null-coord restaurant neighbourhoods, so v7.1 cities never reach the global dict. The global CENTROIDS dict is now legacy-only for pre-v7.1 cities. Do not add new cities with neighbourhood names already in CENTROIDS until all old cities are rebuilt to v7.1. Fixed definition established 2026-04-28.

**CITY_BOUNDS auto-generation tighter than geocoder:** When postrun auto-generates CITY_BOUNDS for a new city, it uses a tightened version of the geocoder bbox. This can clip legitimate edge restaurants. After postrun adds CITY_BOUNDS for any new Italian city, compare against the geocoder bounding boxes in localbite-geocode.js CITY_BOXES and widen if needed. Fixed: Rome, Milan, Florence, Naples — all widened to match geocoder boxes on 2026-04-28.

**Medium confidence geocoding pins:** The viewer's `isHighConfidence()` function returns true for `geo_confidence === 'high'`, `'verified'`, AND `'medium'` when `geo_matched_name` is not null. Medium confidence with a named match shows a solid pin. Medium confidence without a named match (geo_matched_name is null) stays hollow. This reflects the distinction between a plausible name-matched geocode and an unvalidated Photon coordinate.

**Street/landmark false positive geocodes:** Nominatim frequently matches restaurant names to streets (Via [Name]), piazzas, churches, museums, or the city name itself. These appear as medium-confidence matches in postrun output. Always null these regardless of whether the coordinates are in-bounds. Common patterns: geo_matched_name = "Via [PersonName]", "Piazza [Name]", "[City]", "Villa [Name]", "[ChurchName]". Confirmed false positives in Naples: Attilio → Via Attilio Micheluzzi; Da Alfredo → Via Alfredo Capelli; Manfredi → Via Gaetano Manfredi; Ostaria Pignatelli → Villa Pignatelli; Al 53 → Napoli. Fixed definition established 2026-04-28.

**price_level dropout on Italian cities:** When the pipeline extracts restaurants from sources that do not explicitly state prices (Katie Parla, The Infatuation, most EN food guides), price_level will be null in the output. The v7.1 template extraction instruction (line 638) now includes inference from cuisine/neighbourhood/dishes context. If a city's restaurants all have null price_level after pipeline run, a manual patch script assigning price levels from context is required. Repair pattern: use name, neighbourhood, cuisine, dishes, quote to assign 1–4 per city's PRICE_LEVELS scale. Fixed 2026-04-28.

**neighbourhood dropout on compaction-reconstruction:** When the pipeline compacts during Phase 2/3, the neighbourhood field may drop for many or most restaurants — up to 50% of the city pack. This was first observed at scale in Naples (30/62 restaurants lost neighbourhood). Diagnosis: run hood_check after postrun and look for a large 'unknown' or None bucket. Repair: coordinate-based neighbourhood assignment script + explicit overrides for restaurants whose coordinates were also nulled. The fix is documented in fix-naples-geocodes-hoods.py which is a reusable pattern. The pipeline template should be updated to write neighbourhood as the FIRST field for each restaurant during extraction, making it compaction-resistant. This change is pending. Established 2026-04-28.

**language_pool bug on compaction-reconstruction:** After compaction-reconstruction, both_pool=True restaurants will show wrong language_pool (e.g. 'es', 'en') rather than 'both'. postrun.js STEP 1.5 language_pool recalculation fails for list-format sources (the format used by compacted Italian city pipelines). Standard repair after every Italian city postrun: check all both_pool=True restaurants and patch language_pool='both'. This must be done BEFORE running approve-centroids. Established 2026-04-28 (observed Milan, Florence, Naples).

**Self-hosted geocoding:** Deferred. Nominatim (1 req/sec) and Photon (similar) rate limits apply to public APIs. Self-hosted Nominatim + Photon via Docker would eliminate these limits but the throughput gain (~2 extra cities per 3-hour session) does not justify the setup cost (~27GB disk, 4–8 hour one-time import) at current fleet size. Revisit if a ToS block occurs in practice or fleet exceeds 50 cities.

**Batch pipeline architecture:** Maximum 3–4 simultaneous Claude Code sessions on Max 5x plan (4 confirmed in Morocco batch 2026-04-23). Rate limits are shared across all sessions on the same account. Always stagger pipeline launches by 20 minutes to avoid simultaneous Phase 1 searches. Batch by total expected search volume, not just city count — pairing two heavy cities (e.g. Lisbon 48 searches + Porto 81 searches) is effectively a 4-heavy-city batch and will exhaust the rate limit window. postrun.js must run sequentially — never two simultaneous postrun instances (Nominatim ToS: 1 req/sec per IP). See Terminal Discipline below.

**Language pool derivation:** postrun.js STEP 1.5 always recalculates language_pool from source languages when positive evidence is available, overriding pipeline-set defaults. Handles both string source IDs and object-format sources `[{source_id, quote, ...}]`. The object format occurs when the pipeline compacts during Phase 2 and reconstructs from transcript — previously caused all restaurants to show 'es' as the default. Fixed 2026-04-23.

**Quote field dropout on compaction-reconstruction:** If the pipeline compacts during Phase 2 and reconstructs from transcript during Phase 3, the final JSON may be missing the quote field for all restaurants despite working.json containing correct quotes. Repair pattern: build name→quote map from working.json, patch final.json, re-run postrun. Observed in Marrakesh v7.1 rebuild (2026-04-23).

**Auto-null word overlap for spelling variants:** The geocoder's auto-null logic now includes a Levenshtein distance check (edit distance ≤ 2, tokens ≥ 4 chars) as a supplement to word overlap. Single-character spelling differences (e.g. "Casa Aladdin" vs "Casa Aladin") are now preserved rather than auto-nulled. Fixed 2026-04-24.

**Geography disambiguation:** City names that collide with prominent international toponyms cause systematic search result contamination. Known collisions: Córdoba (Spain vs Argentina — all queries must include "España" or "Spain"), El Ejido (Málaga neighbourhood vs Almería city), Naples (Italy vs Naples Florida — all queries must use "Napoli" or "Naples Italy"). Part 1 files for affected cities must include explicit disambiguation instructions. Add new collisions to the Part 1 file as discovered.

**Part 1 file quality as primary quality lever:** The quality of the Part 1 file is the primary determinant of pipeline output quality. Known named-author sources must be listed as DIRECT_FETCH_SOURCES. Known geography collisions must be flagged. Known byline edge cases (single-author sites, About-page-only attribution) must be documented. The pipeline cannot compensate for a weak Part 1 file. Demonstrated: Córdoba with weak Part 1 produced 2 both-pool; with corrected Part 1 produced 6 both-pool from 8 sources.

**Git history QA for regression analysis:** Before accepting a both-pool regression as "quality gates working correctly," check the old pack's source list via git history. If old sources have named authors that pass current quality gates, the regression is a pipeline search failure — not quality improvement. Rebuild with an updated Part 1 file. Command: `git log --oneline -- localbite-[city]-2023-2026.json` then `git show [hash]:localbite-[city]-2023-2026.json`.

**Bonfim centroid derived from wrong match:** When a centroid is derived from a geocoded restaurant that is later nulled as a wrong match, the centroid must also be removed. Centroid accuracy depends on the underlying geocodes being correct.

**CosasDeCome directory format:** The CosasDeCome platform (sevilla.cosasdecome.es) publishes restaurant lists in directory format — name, location, price range, reader vote counts — with no editorial prose quotes. All entries from this source must be rejected under the 15-word actual-quote rule regardless of editorial quality or author prominence (Pepe Monforte is a legitimate named local journalist). This is a quote quality rejection, not a named-author rejection. The old v7 Seville "quotes" from CosasDeCome were pipeline-generated descriptions, not Monforte's actual words — this inflated the v7 both-pool artificially. Do not attempt Wayback Machine fallback (451 confirmed). Document in Part 1 files for any city where CosasDeCome is a candidate source. Fixed definition established 2026-04-25.

**Michelin exclusion is a blanket rule:** All Michelin-starred restaurants are excluded from city packs. This is applied consistently — if one starred restaurant is excluded in a city, all starred restaurants in that city must be excluded. Part 1 files must list all known starred restaurants explicitly in MICHELIN_STARRED_EXCLUSIONS. An omission from the exclusion list (e.g. Choco in Córdoba) is a pipeline error to be corrected, not a deliberate product decision. Fixed definition established 2026-04-25.

**Paywall structural gap:** Some cities have their best food journalism behind paywalls that the pipeline cannot access. Known cases: Toronto (Globe and Mail, Toronto Life); Portugal (Público/Fugas — geo-blocked 451). These are structural gaps with no programmatic workaround. Document per city in Part 1 files. Investigate non-paywalled syndication (Substack, personal sites) for affected named writers before rebuild. Do not treat as pipeline failures — they are access barriers.

**writer_profile contamination on compaction-reconstruction:** When the pipeline compacts during Phase 2/3 and reconstructs writer_profile fields from transcript, it bleeds operational context (tier assignments, fetch quality notes, phase references, concentration cap decisions) into the user-facing field. Postrun Step 2b enrichment has the same failure mode — the Claude API enrichment model sees operational fields in the source object and incorporates their language into the generated profile. Prohibited terms include: "PRIMARY source", "SECONDARY source", "Tier A/B/C", "Phase 0/1", "fetch quality", "confirmed byline", "cap applied", "sibling edition check". The v7.1 template and postrun.js Step 2b include explicit prohibited-terms instructions and a post-Step-2b validation scan. Fixed 2026-04-26. Fleet-wide repair confirmed 2026-04-25/26.

**451 geo-blocking as access barrier:** The 451 HTTP status code (Unavailable For Legal Reasons) is used increasingly by European media to restrict non-regional IP access. Known affected sources: Público/Fugas (Portugal), ElNacional.cat specific articles (Catalonia), CosasDeCome Wayback fallback. 451 errors are permanent access barriers — unlike 404 (URL moved) they cannot be circumvented programmatically. Document per city in Part 1 files. Do not spend multiple Phase 0 fetch attempts on a source confirmed to return 451. Fixed definition established 2026-04-25.

**403 geo-blocks vs broken links:** A 403 response from a fetch does not necessarily mean the link is broken for real users. Known geo-block patterns confirmed in fleet-wide URL verification (2026-04-26): National Geographic España (viajes.nationalgeographic.com.es) returns 403 from non-Spanish IPs but is accessible in Spain — do NOT null these article_urls. metropolitano.gal, navarracapital.es, aragondigital.es, hoyaragon.es, artandthensome.com — same pattern. Before nulling any article_url that returns 403 in automated fetch, verify in a browser. If accessible to human users, document as fetch-limitation only and keep the article_url. Only null if confirmed broken for real users. This rule is distinct from 451 (which is a legal block and permanent).

**Fleet-wide URL verification:** The standard method for checking source link health across the whole fleet is: (1) extract all unique article_urls from all city JSONs via Python script; (2) fetch each via web_fetch with small token limit to check status; (3) for any returning homepage-only content, check for subscription wall or URL change; (4) produce a report with per-city and global summaries. Should be run periodically and before any major rebuild batch. Established 2026-04-26. Known baseline: 128 unique URLs, 88 OK, 10 JS-only (functional in browser), 4 redirect, 12 403, 4 fetch error, 10 null. The JS-only category (Culinary Backstreets, The Infatuation) is functional for users and requires no action.

**Fetch log template change — implemented:** The v7.1 template now captures OUTPUT_FETCH_LOG (added to localbite-prompt-v7-part1-template.txt, 2026-04-27). All Italy Part 1 files include OUTPUT_FETCH_LOG. The fetch log captures per-fetch outcome (HTTP status, chars returned, accept/reject reason) in real time. Rome v7.1 was the first run with a functioning fetch log.

**Part 1 pre-research session:** A lightweight research session (20–30 minutes per city) that runs BEFORE the Part 1 file is written — not before Phase 0. Phase 0 is a pipeline execution step that fetches DIRECT_FETCH_SOURCES already listed in Part 1. The pre-research session is what populates DIRECT_FETCH_SOURCES in the first place. These are entirely different steps in the workflow: [Pre-research → Part 1 file] → Phase 0 → Phase 1 → Phase 2 → Phase 3. Template: localbite-part1-preresearch-template.txt. Runs 7 web searches per city (writer discovery EN + local language, Michelin status, disambiguation, COI, bounding box). Do not describe this as "Phase 0 automation" or "enhanced Phase 0." Established 2026-04-27.

**Pre-research search query year terms vs YEAR_RANGE field:** These are different things with different correct values. Pre-research web searches for writer discovery use "2024 2025" as date terms — finding currently active writers is the goal, and recent content is the strongest signal. YEAR_RANGE: 2023-2026 is the pipeline's article acceptance window (fixed for all cities). Do not mechanically apply 2023-2026 to pre-research search queries. Fixed definition established 2026-04-27.

**Publish threshold:** ≥10R minimum before publishing any city pack. Cities below threshold are marked "coming soon" in localbite-index.json rather than published with a sub-threshold pack. Applies to all future cities including Italian cities. Thin cities (expected <10R) should be run last within a batch and reviewed before committing to the index. Established 2026-04-27.

**Navigation deep link for address/navigation use case:** For any geocoded restaurant, a Google Maps deep link (maps.google.com/maps?q={lat},{lon}) solves the user navigation need directly — opens native map app on mobile, requires no new data, works for all geocoded restaurants (71% of current fleet). This is the correct first implementation for backlog item 7 (address field). Text address extraction (reverse geocoding or article extraction) is secondary to the navigation link. Reverse geocoding must be filtered to geo_confidence = 'high' only — centroid restaurants produce wrong addresses. Do not apply reverse geocoding to centroid-geocoded restaurants. Established 2026-04-27.

**Incremental Next.js approach:** The chosen front-end direction, replacing the current vanilla JS index.html. Key constraints: pipeline JSON format frozen (unchanged), GitHub Pages stays, Leaflet/OSM stays, both-pool is first-class. Build phases: Phase 1 (Next.js setup + data layer + viewer rebuild — highest risk), Phase 2 (landing page + country/city navigation), Phase 3 (writer profile pages — data already in JSON, lowest effort, highest product identity impact), Phase 4 (restaurant detail pages + SEO — optional). Admin workflow change: git push → 3–5 minute GitHub Actions build delay (was ~30 seconds). All pipeline steps identical. Do not suggest Supabase, database backend, or server-side rendering without explicit instruction. Decision established 2026-04-27.

**App strategy:** PWA first (service worker + manifest, +1–2 weeks on Next.js build), then Google Play TWA (Trusted Web Activity, +1–2 weeks after PWA, listed in Google Play), then Capacitor iOS only with validated user demand (requires Mac, Apple Developer Program $99/yr, App Store review cycles), then React Native only with substantial proven traction (separate codebase, separate product). Data architecture for any native app: download-and-cache (Strategy C) — app fetches city JSONs from GitHub Pages CDN on launch, caches locally, serves from cache offline. This preserves the pipeline's rapid deploy cycle (new cities propagate on next app launch without store re-submission) and enables genuine offline access (required for Apple App Store under Guideline 4.2). Do not suggest bundling city data in the app binary (requires store re-submission per city addition) or a backend API (contradicts no-server constraint). Established 2026-04-27.

**Gambero Rosso is not a COI source:** Gambero Rosso operates the Città del gusto cooking school network in Italy. A cooking school does not create a commercial conflict of interest with restaurant recommendations — it does not create a financial relationship with the restaurants being reviewed. This is entirely different from Time Out's food markets (direct commercial competitor to the restaurants being recommended). Gambero Rosso is treated as a standard named-author source across all cities. Do not add COI flags to Gambero Rosso for any city. Fixed definition established 2026-04-27.

**Concentration cap — contextual application:** The 30% concentration cap exists to prevent a single low-quality or aggregator source from dominating a pack. It is a quality safeguard, not a hard rule. When a single high-quality named-author source has deep city coverage (e.g. Katie Parla's Rome guide covering 130+ venues across all neighbourhoods), and the high concentration is a structural consequence of other qualifying sources being inaccessible (403 blocks, anonymous bylines), the cap may be accepted with documentation. Document in the audit file and note as a rebuild trigger. Do not retroactively trim entries when the peripheral neighbourhood coverage would be entirely lost. Established from Rome v7.1 (2026-04-27).

**Italy pipeline status:** 15 Part 1 files committed (Batches A–G). Bounding boxes added to geocode.js. Index entries added as coming_soon. Full pipeline prompts generated locally (regenerated 2026-04-28 with price_level fix). Rome, Milan, Florence, Naples v7.1 complete. Remaining: Bologna + Turin (Batch D) → Venice + Palermo + Verona (Batch E) → Genoa + Bari + Modena + Lecce (Batch F) → Catania + Trieste (Batch G). Trento and Matera parked (no qualifying sources found). Established 2026-04-27, updated 2026-04-28.

**Thin city risk for Italy:** Bari (zero starred restaurants, limited EN media), Lecce (small city, ~90k population), Catania (limited EN media), Trieste (small city) are all at risk of falling below the ≥10R publish threshold. Run each last within its batch. Review restaurant count before committing to index. Document as coming_soon if below threshold. Established 2026-04-27.

---

## Source Quality Rules

- Named human author required — byline must appear in the article OR confirmed via About page on single-author sites
- Article must be dated 2023 or later (city-dependent — check Part 1 YEAR_RANGE)
- Source must be independently produced — no aggregators, no booking platforms, no tourism boards, no hotel-owned content
- Both-pool requires different publishers and different languages — same publisher in two languages does not qualify
- writer_profile is user-facing — no pipeline notes, no fetch data, no operational information
- Time Out commercial conflict: Time Out operates food markets in several cities (Lisbon, Madrid). Flag with ⚠ coi in writer profile. Do not reject — include transparently.
- Gambero Rosso: standard named-author source. No COI. Do not flag.
- Concentration cap: if any single source exceeds 30% of single-source Tier B entries, auto-reject lowest-confidence entries until within cap. Report in AUTO-REJECTED section. Exception: when high concentration is structural (other sources blocked/anonymous) and trimming would eliminate peripheral neighbourhood coverage — document and accept with audit note.
- Single-author sites: confirm named author from About page; apply single-author site rule; do not reject for missing article-level byline.

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
- Reverse geocoding (Nominatim reverse API) must be filtered to geo_confidence = 'high' only before applying address data — centroid-geocoded restaurants produce wrong addresses if reverse geocoded
- Italy CITY_BOXES: 15 cities added 2026-04-27. Venice bounding box covers islands + outer lagoon (Murano, Burano); Mestre (lat 45.47–45.50, lng 12.22–12.26) is excluded.
- Street/landmark false positives: always null medium-confidence matches to streets (Via [Name]), piazzas, churches, museums, or the city name itself — these are wrong geocodes regardless of in-bounds status (fixed 2026-04-28).
- CITY_BOUNDS in index.html: after postrun auto-generates CITY_BOUNDS for a new city, compare against geocode.js CITY_BOXES and widen if needed — postrun may generate tighter bounds that clip edge restaurants (fixed for Rome, Milan, Florence, Naples 2026-04-28).

---

## Token Capture

Token capture is handled in two ways:

**Pipeline metrics node command:** Writes city, date, sources, restaurants, both-pool, searches_run, open_status_check to localbite-run-metrics.log at pipeline end. Token counts (tokens, input_tokens, output_tokens) are captured from session-meta when available.

**postrun.js STEP 5.5:** Updates the existing metrics log entry for the city with run_time_seconds (derived from search log file timestamps: start = log birthtime, end = log mtime) and tool_uses (search log line count). Source fields run_time_source and tool_uses_source are set to indicate provenance. City matching uses normalised comparison with startsWith fallback — handles city slug variants like "logrono" vs "logrono-spain" (fixed 2026-04-23).

**Known limitation:** Token counts remain null for compacting runs — Claude Code does not write session-meta during compaction. run_time and tool_uses from STEP 5.5 are available for all runs regardless of compaction. run_time_seconds calculation may produce implausible values (~millions of seconds) when pipelines restart mid-session — the file birthtimes become unreliable. Document as known limitation, not a blocker.

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

**Do NOT pipe the prompt file via stdin** (`< localbite-prompt-v71-[city].txt`). Piping causes Claude Code to display the prompt and ask "what do you want to do?" rather than executing it. Launch Claude Code first, then give the instruction at the prompt. This method was validated on Santiago de Compostela and Murcia (2026-04-21).

With PHASE1_AUTO_PROCEED: YES and UNATTENDED_MODE: YES, the pipeline runs fully unattended. The required human steps after the pipeline completes:

```
# Step 1 — geocoding + schema validation + profile enrichment + centroids + index update
node localbite-postrun.js localbite-[city]-italy-2023-2026.json

# Step 2 — fix language_pool bug (always required after Italian city compaction)
python3 -c "
import json
d = json.load(open('localbite-[city]-italy-2023-2026.json'))
fixed = []
for r in d.get('restaurants', []):
    if r.get('both_pool') == True and r.get('language_pool') != 'both':
        r['language_pool'] = 'both'
        fixed.append(r.get('name'))
print('Fixed:', fixed)
with open('localbite-[city]-italy-2023-2026.json', 'w') as f:
    json.dump(d, f, indent=2, ensure_ascii=False)
"

# Step 3 — check for neighbourhood dropout
python3 -c "
import json
from collections import Counter
d = json.load(open('localbite-[city]-italy-2023-2026.json'))
hoods = Counter(r.get('neighbourhood') for r in d.get('restaurants', []))
print(dict(hoods.most_common()))
"
# If None count > 5, neighbourhood dropout occurred — apply fix script

# Step 4 — verify STEP 5.5 fired and captured run_time/tool_uses
tail -1 localbite-run-metrics.log

# Step 5 — check for CENTROIDS naming collision before committing
# v7.1 cities use JSON centroids — verify null-coord neighbourhoods are all covered:
python3 -c "
import json
d = json.load(open('localbite-[city]-italy-2023-2026.json'))
c = d.get('centroids', {})
null_hoods = set(r.get('neighbourhood') for r in d.get('restaurants',[]) if not r.get('lat') and r.get('neighbourhood'))
missing = null_hoods - set(c.keys())
print('Missing from JSON centroids:', sorted(missing) if missing else 'None — all clear')
"

# Step 6 — review medium-confidence matches; null wrong ones and set geo_skip: true
#          especially: street names, piazzas, churches, museums, city name itself
#          also check: if nulled restaurant was sole contributor to a centroid, remove that centroid
#          also check: HIGH SPREAD centroids — find and null the outlier geocode pulling them off-centre

# Step 7 — approve centroids (run SEPARATELY from git commands — never chain)
node localbite-approve-centroids.js localbite-[city]-italy-2023-2026.json --auto-accept

# Step 8 — verify CITY_BOUNDS match geocoder bbox
grep "'[City]'" index.html | grep minLat
# Compare against CITY_BOXES in localbite-geocode.js — widen if postrun generated tighter bounds

# Step 9 — verify article_url for all sources (postrun.js will warn if missing)
#          null homepage URLs; null category pages (e.g. katieparla.com/restaurants/[city]/)
python3 -c "
import json
d = json.load(open('localbite-[city]-italy-2023-2026.json'))
sources = d.get('sources', [])
if isinstance(sources, dict): sources = list(sources.values())
for s in sources:
    print(s.get('writer'), '|', s.get('article_url'))
"

# Step 10 — commit (run AFTER approve-centroids finishes, in a separate command)
git add localbite-[city]-italy-2023-2026.json index.html localbite-index.json localbite-run-metrics.log localbite-[city]-italy-search-log.txt localbite-[city]-italy-fetch-log.txt localbite-[city]-italy-search-plan.txt localbite-[city]-italy-audit.txt localbite-[city]-italy-failed-sources.txt 2>/dev/null
git commit -m "data: [City] v7.1 — N restaurants, N sources, N both-pool"
git push
```

**Critical terminal discipline:**
- Never chain `approve-centroids` with git commands in the same paste — the Unicode box-drawing output fills the terminal buffer and git output is lost
- Run approve-centroids alone, verify it completed, then run git commands separately
- Never run postrun.js from the monitoring terminal — use T6 (dedicated postrun/git terminal) only

---

## Terminal Discipline for Batch Runs

**Fixed terminal assignment (3-city batch):**
- **T1:** Claude Code — City A pipeline only
- **T2:** Claude Code — City B pipeline only (launch 20 min after T1)
- **T3:** Claude Code — City C pipeline only (launch 20 min after T2, if running 3 cities)
- **T5:** Monitoring only — `wc -l`, `ls -la`, `tail -1` — NEVER postrun from here
- **T6:** postrun + git — sequential, one city at a time

**Label each terminal immediately on opening:**
```bash
echo -e "\033]0;T1-[CityName]\007" && cd /Users/harryenchin/Documents/GitHub/localbite
```

**Rate limit rules:**
- Maximum 3–4 concurrent Claude Code sessions (4 confirmed on Max 5x)
- postrun.js always sequential — never two instances simultaneously
- 20-minute stagger between pipeline launches
- Batch by total expected search volume, not city count — two heavy cities (each with 50+ searches) count as a 4-city batch for rate limit purposes
- If a pipeline exits mid-run due to rate limit, wait for full reset (shown in plan usage screen), then relaunch from the same terminal with the same instruction — the pipeline will find existing partial output and may attempt to resume

---

## File and Commit Conventions

**Always create downloadable files** for documents, scripts, and prompt files — not inline code blocks. The project accumulates many files and inline content is lost in conversation history.

**Always provide complete files in downloadable format** — never just a delta or list of changes. The user always needs the complete current version of any document that is being updated.

**Fix scripts must use dry-run-first pattern:** Every fix script must verify target strings exist exactly once before modifying any file. If any target is missing or ambiguous, exit with no files modified.

**Always re-read a file after any modification before writing another script targeting that file.** Never use a cached mental model of file state.

**Prompt files follow the two-part structure:**
- Part 1: city variables (changes per city)
- Part 2: pipeline engine (unchanged between cities)
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
- `docs:` — documentation, journal, research files
- `data:` — city pack additions or updates
- `refactor:` — code restructuring without feature change

**Never commit:**
- `.DS_Store` (in .gitignore)
- Image files — `*.png`, `*.jpg`, `*.jpeg`, `*.gif`, `*.webp` (in .gitignore)
- Intermediate working files (`localbite-*-working.json`)
- Superseded prompt variants unless explicitly requested
- Geocoding backup/stats files (`*-geocoded-backup.json`, `*-geocoding-stats.json`)
- Full pipeline prompt files (`*-italy-full.txt`) — these are generated artefacts

---

## Session Protocol

**At the start of each session:**
- Run the fleet script to check current state — never rely on global instructions fleet table alone
- Verify what is and isn't already in the repo before producing files
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
1. A journal entry covering: decisions made, key findings, files produced, outstanding items
2. A list of all files needing to go into the repo with status (new / updated / superseded)
3. Git commands as a single copy-paste block — not scattered through the conversation
4. Current fleet state: city count, restaurant count, index.html line count
5. Complete updated global instructions as a downloadable file — never just a delta

**After every postrun, verify STEP 5.5 fired:**
```
tail -1 localbite-run-metrics.log
```
Check that run_time_seconds and tool_uses are populated. If null, STEP 5.5 city matching failed — document the mismatch.

**After every Italian city postrun, fix language_pool bug:**
```bash
python3 -c "
import json
d = json.load(open('localbite-[city]-italy-2023-2026.json'))
fixed = []
for r in d.get('restaurants', []):
    if r.get('both_pool') == True and r.get('language_pool') != 'both':
        r['language_pool'] = 'both'
        fixed.append(r.get('name'))
print('Fixed:', fixed)
with open('localbite-[city]-italy-2023-2026.json', 'w') as f:
    json.dump(d, f, indent=2, ensure_ascii=False)
"
```

**After every Italian city postrun, check for neighbourhood dropout:**
```bash
python3 -c "
import json
from collections import Counter
d = json.load(open('localbite-[city]-italy-2023-2026.json'))
hoods = Counter(r.get('neighbourhood') for r in d.get('restaurants', []))
print(dict(hoods.most_common()))
"
```
If None count > 5, neighbourhood dropout occurred — apply coordinate-based assignment fix.

**Before committing any new city, check for CENTROIDS collision:**
```bash
python3 -c "
import json
d = json.load(open('localbite-[city]-italy-2023-2026.json'))
c = d.get('centroids', {})
null_hoods = set(r.get('neighbourhood') for r in d.get('restaurants',[]) if not r.get('lat') and r.get('neighbourhood'))
missing = null_hoods - set(c.keys())
print('Missing from JSON centroids:', sorted(missing) if missing else 'None — all clear')
"
```

**After committing a rebuild, verify article_url for all sources:**
```bash
python3 -c "
import json
d = json.load(open('localbite-[city]-2023-2026.json'))
sources = d.get('sources', [])
if isinstance(sources, dict): sources = list(sources.values())
for s in sources:
    print(s.get('writer'), '|', s.get('article_url'))
"
```
Test any URL that looks inferred (pattern-matched from title/publisher). If it 404s, null it and recommit. Also null any homepage URL (domain root without a path to a specific article). Also null category pages (e.g. katieparla.com/restaurants/[city]/). Also check article_url SPECIFICITY — if a URL is a single-restaurant review being used as source for multiple restaurants, it must be replaced with the guide article URL or nulled.

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

- **Do not retroactively rebuild existing city packs.** Document quality issues and wait for the natural rebuild trigger (v2, v3 etc.). Exception: if git history audit confirms old sources pass current quality gates and a regression is a pipeline search failure, rebuild immediately with a corrected Part 1 file.

- **Do not produce inline code blocks for files that need to be committed.** Always create actual files.

- **Do not add extra removal decisions during test run review tables.** During controlled tests (e.g. Madrid v6 vs v7), accept the pipeline's recommended removals without additional user decisions. Consistency between runs matters more than perfection in individual entries.

- **Do not re-open fixed decisions** listed in the Fixed Definitions section above unless explicitly asked to reconsider.

- **Do not produce multiple questions at once.** Ask one clarifying question at a time.

- **Do not accept a both-pool regression without checking git history.** Before concluding that a regression is correct, run `git log --oneline -- localbite-[city]-2023-2026.json` and check the old source list. If old sources have named authors, the regression is a pipeline failure.

- **Do not infer, pattern-match, or fabricate article_url values.** If the URL was not confirmed from an actual fetch response, set null. No exceptions. This applies even after compaction-reconstruction. Homepage URLs are not article URLs. Category pages are not article URLs.

- **Do not suggest HERE API, Google Maps API, or any geocoding service other than Nominatim and Photon** for programmatic geocoding.

- **Do not use Node.js inline one-liners with `!` characters.** zsh history expansion breaks these. Use Python one-liners instead.

- **Do not run postrun.js on old pipeline cities (Lisbon, etc.)** without explicit instruction — it will attempt to re-geocode all restaurants and hit Nominatim rate limits. Barcelona and Valencia are now v7.1 and postrun can be run on them safely.

- **Do not chain approve-centroids with git commands in the same paste.** The Unicode output fills the terminal buffer and git output is lost. Always run them separately.

- **Do not run postrun from the monitoring terminal (T5).** It must run from T6 (postrun/git terminal) only. Running postrun twice simultaneously violates Nominatim ToS.

- **Do not add new cities with neighbourhood names already present in CENTROIDS** until the naming collision architectural fix (city-qualified keys) is applied. Note: for v7.1 cities this is already resolved via JSON-first centroid lookup.

- **Do not suggest setting up self-hosted Nominatim or Photon** without explicit instruction. This decision has been evaluated and deferred.

- **Do not write fix scripts that assume file state from earlier in the conversation.** Always read the exact target strings from the file before writing any script. File state changes with every fix applied.

- **Do not accept CosasDeCome directory entries as qualifying quotes.** CosasDeCome uses a directory format without editorial prose. Pipeline-generated descriptions of CosasDeCome content are not quotes. Reject regardless of author prominence.

- **Do not null article_urls that return 403 without first verifying in a browser.** NatGeo España, metropolitano.gal, navarracapital.es, aragondigital.es, hoyaragon.es and similar sites return 403 to automated fetches but may be fully accessible to human users. A 403 from fetch does not mean the link is broken. Browser verification is required before nulling. This is different from 451 errors, which are permanent legal barriers.

- **Do not describe the Part 1 pre-research session as "Phase 0 automation" or "enhanced Phase 0."** Phase 0 already exists, is already automated, and is unchanged. The pre-research session runs before the Part 1 file is written — a completely different step in the workflow.

- **Do not apply the 2023-2026 year range to pre-research web search queries.** Search queries for writer discovery correctly use "2024 2025" as date terms. YEAR_RANGE: 2023-2026 belongs in the Part 1 VARIABLES output block, not in discovery searches.

- **Do not suggest Supabase, a database backend, or server-side rendering** for the front-end without explicit instruction.

- **Do not suggest bundling city JSON files in the native app binary.** Every new city addition would require an App Store re-submission. The download-and-cache strategy is the correct architecture.

- **Do not launch Italian city pipelines without confirming the full prompt file exists locally.** Full prompts are generated by combine-italy-prompts.py and are not committed to the repo.

- **Do not apply reverse geocoding to centroid-geocoded restaurants.** Reverse geocoding must be filtered to geo_confidence = 'high' only — centroids produce wrong addresses.

- **Do not produce just a delta of changes to global instructions or any other document.** Always produce the complete current version of any document being updated, in downloadable format.

- **Do not add COI flags to Gambero Rosso.** A cooking school is not a conflict of interest. Gambero Rosso is a standard named-author source. This decision is fixed.

- **Do not null medium-confidence geocode matches without checking geo_matched_name.** Medium confidence with a plausible geo_matched_name (restaurant name matches) is acceptable. Medium confidence where geo_matched_name is a street, piazza, church, museum, or the city name is a wrong geocode — null it.

- **Do not accept language_pool='en' or 'es' for both_pool=True restaurants.** All both_pool=True restaurants must have language_pool='both'. After any Italian city postrun, run the language_pool fix before approve-centroids.

- **Do not trust CITY_BOUNDS auto-generated by postrun without verifying against geocoder bbox.** Postrun may generate tighter bounds that clip edge restaurants. Always compare and widen if needed.

---

## Known Permanent Decisions Reference

| Decision | Resolution |
|----------|-----------|
| Geocoding API | Nominatim + Photon only. HERE excluded permanently. |
| Geocoder lookup | Case-insensitive CITY_BOXES lookup (fixed 2026-04-21). |
| Accented city names | Both accented and unaccented variants in CITY_BOXES (fixed 2026-04-24). |
| Both-pool definition | Different publishers + different languages + editorially independent. Same-publisher cross-language = not both-pool. |
| Pipeline pause | Always after Phase 1, before Phase 2. PHASE1_AUTO_PROCEED: YES skips pause. |
| writer_profile | User-facing only. No pipeline internals. Prohibited terms in template + postrun. Fixed 2026-04-26. |
| Forum queries | Eliminated. 0% success rate confirmed. |
| React migration | At 2,500 lines of index.html. Current: ~2,296 lines. |
| Results per query | 10 per query. Hard tool limit. Cannot be overridden. |
| Phase 0 vs Phase 1 | Phase 0 = known sources (retrieval). Phase 1 = unknown sources (discovery). |
| Test run review decisions | Accept pipeline recommendations without additional user removals. |
| City pack rebuilds | Only at natural trigger OR when git history confirms regression is pipeline failure (not quality gates). |
| v7.1 trigger | Implemented and committed. v7.1 is current standard. |
| article_url | Never inferred or fabricated. Null if not confirmed from fetch. Homepage URLs are not article URLs — null these too. Category pages (katieparla.com/restaurants/[city]/) are not article URLs — null. Specificity rule: must link to the article containing the mention, not a single-restaurant review used for multiple restaurants. Non-blocking warning in postrun.js. Source ↗ link hidden in viewer when null. |
| Shell one-liners | Always Python. Never Node -e with ! characters (zsh history expansion). |
| Pipeline launch | No pipe. Launch Claude Code, then type instruction at prompt. Validated 2026-04-21. |
| geo_skip flag | Set geo_skip: true + null coords for wrong geocoding matches. Also auto-set by geocode.js after first failed geocoding attempt (fixed 2026-04-22). |
| source_id field | Auto-repair normalises source_id → id in postrun.js Step 1.5. |
| CENTROIDS collision | Resolved for v7.1 cities via JSON-first centroid lookup. All null-coord restaurant neighbourhoods must be in city JSON centroids. Global CENTROIDS dict is legacy-only for pre-v7.1 cities. Fixed 2026-04-28. |
| Medium confidence pins | isHighConfidence() includes medium + geo_matched_name. Medium without named match stays hollow. Fixed 2026-04-22. |
| Street/landmark false positives | Null geocodes matching streets, piazzas, churches, museums, city name. Fixed definition 2026-04-28. |
| Self-hosted geocoding | Deferred. Marginal throughput gain (~2 cities/session) does not justify setup cost at current fleet size. |
| Batch pipeline | Max 3–4 concurrent Claude Code sessions (4 confirmed 2026-04-23). 20-min launch stagger. Batch by total search volume not city count. postrun always sequential. |
| approve-centroids | Never chain with git commands. Run separately. --auto-accept is the standard flag. Writes to both JSON and index.html. |
| Fix scripts | Dry-run-first always. Verify target strings exist exactly once before any write. |
| Language pool derivation | Always recalculate from source languages. Handle both string and object source formats. Pipeline defaults overridden when positive evidence available. Fixed 2026-04-23. |
| language_pool bug on compaction | both_pool=True restaurants show wrong language_pool after compaction. Standard repair: patch language_pool='both' for all both_pool=True restaurants after every Italian city postrun. Established 2026-04-28. |
| neighbourhood dropout on compaction | neighbourhood field may drop for many restaurants when pipeline compacts. Diagnosis: large None bucket in hood_check. Repair: coordinate-based assignment script. Template fix pending. Established 2026-04-28. |
| price_level dropout | Occurs when sources (EN guides) don't state prices explicitly. Template now allows inference from context. Repair for already-run cities: manual assignment script. Fixed 2026-04-28. |
| CITY_BOUNDS auto-generation | Postrun generates tighter bounds than geocoder bbox. Always compare and widen. Fixed for Rome/Milan/Florence/Naples 2026-04-28. |
| Quote field dropout | Repair from working.json when postrun reports missing quote fields. Known compaction-reconstruction pattern (observed Marrakesh 2026-04-23). |
| Auto-null spelling variants | Levenshtein distance check (edit distance ≤ 2, tokens ≥ 4 chars) prevents false auto-null. Fixed 2026-04-24. |
| YEAR_RANGE for all rebuilds | All cities use 2023-2026 regardless of previous year range. |
| Rebuild regressions | Check git history before accepting as correct. If old sources pass current quality gates, the regression is a pipeline failure — rebuild with corrected Part 1 file. |
| Part 1 quality | Primary quality lever. Known sources → DIRECT_FETCH_SOURCES. Known collisions → disambiguation instructions. Known byline edge cases → documented. |
| Single-author sites | Confirm author from About page. Apply single-author site rule. Do not reject for missing article-level byline. |
| Geography disambiguation | Cities with toponym collisions require disambiguation in all queries. Known: Córdoba/Argentina, El Ejido/Almería, Naples/Naples Florida. Document in Part 1 GEOGRAPHY_DISAMBIGUATION. |
| Git history QA | Before accepting both-pool regression, check old source list via git history. Regression is correct only if old sources fail current quality gates. |
| CosasDeCome format | Directory format — no editorial prose quotes. Reject per 15-word rule regardless of author. Wayback 451. Permanent exclusion. Fixed 2026-04-25. |
| Michelin exclusion | Blanket rule applied consistently to all starred restaurants in a city. Part 1 files must list all known starred restaurants explicitly. Fixed 2026-04-25. |
| Paywall structural gap | Toronto (Globe and Mail, Toronto Life) and Portugal (Público/Fugas) inaccessible. No workaround. Investigate non-paywalled syndication for affected named writers. Fixed 2026-04-25. |
| HIGH SPREAD centroids | Identify outlier geocode pulling centroid off-centre. Null the outlier before accepting centroid. |
| writer_profile contamination | Fixed 2026-04-26. Template + postrun Step 2b include prohibited-terms list and post-Step-2b validation scan. Fleet-wide repair confirmed. |
| 451 geo-blocking | Permanent access barriers — do not retry. Document per city. Known: Público/Fugas (PT), ElNacional.cat articles (CA), CosasDeCome Wayback. Fixed definition 2026-04-25. |
| Quote field dropout — description variant | When pipeline compacts and reconstructs, may write 'description' instead of 'quote'. Repair: map description→quote from working.json. Standard repair pattern confirmed Barcelona 2026-04-25. |
| Multiple postrun runs | For large cities with wrong geocode outliers, 2-3 postrun runs may be required and are correct. geo_skip flags prevent redundant geocoding API calls on subsequent runs. |
| 403 geo-blocks vs broken links | 403 from fetch ≠ broken for real users. NatGeo España, metropolitano.gal, navarracapital.es, aragondigital.es, hoyaragon.es confirmed geo/bot-blocks. Browser-verify before nulling. Different from 451 (legal barrier). Fixed definition 2026-04-26. |
| article_url specificity | Must link to the article containing the restaurant mention. Single-restaurant review URLs used for multiple restaurants are wrong — find guide article or null. Dated articles redirecting to evergreen pages are wrong — update or null. Identified fleet-wide 2026-04-26. |
| Fleet-wide URL verification | Periodic health check of all source article_urls. Extract unique URLs → web_fetch each → check status and content → report. Baseline established 2026-04-26: 128 URLs, 88 OK, 10 JS-only (functional), 4 redirect, 12 403, 4 error, 10 null. |
| Fetch log template change | Implemented 2026-04-27. OUTPUT_FETCH_LOG in localbite-prompt-v7-part1-template.txt and all Italy Part 1 files. Rome v7.1 first run with functioning fetch log. |
| Infatuation + Culinary Backstreets JS-only | Both return SPA shells via automated fetch. Work correctly in browser. No action needed — not broken links. Do not null these article_urls. |
| Part 1 pre-research session | Lightweight pre-pipeline research (20–30 min/city). Produces draft DIRECT_FETCH_SOURCES and VARIABLES block. Distinct from Phase 0 (pipeline execution). Template: localbite-part1-preresearch-template.txt. Established 2026-04-27. |
| Pre-research search query year terms | "2024 2025" for writer discovery (active signal). YEAR_RANGE: 2023-2026 for pipeline acceptance window. Different things, both correct. Fixed 2026-04-27. |
| Publish threshold | ≥10R minimum before publishing any city pack. Below threshold → "coming soon" in localbite-index.json. Established 2026-04-27. |
| Navigation deep link | maps.google.com/maps?q={lat},{lon} for geocoded restaurants. Zero effort, zero new data. First implementation for address/navigation use case. Do before any text address extraction. Established 2026-04-27. |
| Incremental Next.js | Chosen front-end direction. GitHub Pages, Leaflet/OSM, JSON format all unchanged. Four build phases. Admin workflow: 3–5 min build delay only change. No database, no server. Established 2026-04-27. |
| App strategy | PWA → Google Play TWA → Capacitor iOS (validated demand) → React Native (substantial traction). Download-and-cache data architecture. No binary bundling, no backend API. Established 2026-04-27. |
| Address field (backlog item 7) | Navigation deep link first. Template change second (next pipeline run). Reverse geocoding (high-confidence only, amenity name validation) optional. Targeted extraction script not recommended. Established 2026-04-27. |
| Italy batch plan | 15 cities, 7 pipeline batches. Part 1 files all committed. CITY_BOXES added. Index entries added. Full prompts generated locally. Rome, Milan, Florence, Naples v7.1 complete. Remaining: Bologna+Turin → Venice+Palermo+Verona → Genoa+Bari+Modena+Lecce → Catania+Trieste. Trento + Matera parked. Updated 2026-04-28. |
| Reverse geocoding quality constraint | Must filter to geo_confidence = 'high' only. Centroid-geocoded restaurants produce wrong addresses — never apply reverse geocoding to centroids. Amenity name match is a reliability indicator. Established 2026-04-27. |
| Global instructions format | Always produce complete updated document in downloadable format. Never just a delta. Established 2026-04-27. |
| Gambero Rosso COI | No COI. Cooking school ≠ commercial conflict with restaurant recommendations. Standard named-author source. Fixed 2026-04-27. |
| Concentration cap — contextual | 30% cap is a quality safeguard, not a hard rule. May be accepted with documentation when structural (other sources blocked/anonymous) and trimming would eliminate peripheral neighbourhood coverage. Rome v7.1 Katie Parla 64% accepted. Established 2026-04-27. |
| Italy full prompt files | Generated by combine-italy-prompts.py locally. Not committed to repo (generated artefacts). Regenerate with: python3 combine-italy-prompts.py localbite-prompt-v7-template.txt. Established 2026-04-27. |
| Italy thin city risk | Bari, Lecce, Catania, Trieste at risk of <10R. Run last within batch. Review before committing to index. Established 2026-04-27. |
| Katie Parla category page URLs | katieparla.com/restaurants/[city]/ is a category page — not an article_url. Null it. Her specific guide articles are valid. Fixed 2026-04-28. |

---

## Current Pipeline Status

**v7.1 template: implemented and committed. Current standard for all city runs.**
**price_level inference instruction added to template 2026-04-28. All 15 Italy full prompts regenerated.**

**postrun.js capabilities (as of 2026-04-26):** [unchanged — see previous version]

**geocode.js v8.1 capabilities (as of 2026-04-24):** [unchanged — see previous version]

**localbite-approve-centroids.js capabilities (as of 2026-04-23):** [unchanged — see previous version]

**Italy pipeline status (as of 2026-04-28):**
- 15 Part 1 files committed (Batches A–G)
- 15 CITY_BOXES entries in localbite-geocode.js
- 15 coming_soon entries in localbite-index.json
- 15 full pipeline prompts regenerated locally (price_level fix applied 2026-04-28)
- Rome v7.1: 64R, 4 sources, 1 both-pool, 72% geocoded (7 wrong geocodes nulled, price patched)
- Milan v7.1: 60R, 10 sources, 3 both-pool, 67% geocoded — pushed 6160584
- Florence v7.1: 42R, 5 sources, 5 both-pool, 88% geocoded — pushed 13fb5c0
- Naples v7.1: 62R, 5 sources, 6 both-pool, 81% geocoded — pushed 987cf1f
- Remaining batch order: Bologna+Turin → Venice+Palermo+Verona → Genoa+Bari+Modena+Lecce → Catania+Trieste

**Known outstanding issues:**
- **language_pool bug in postrun.js STEP 1.5** — recalculation fails for list-format sources (Italian city compacted pipelines). Manual repair required after every Italian city postrun. Fix needed in postrun.js.
- **neighbourhood field compaction resistance** — template should write neighbourhood as first field per restaurant. Pending template change.
- **Rome: Gambero Rosso 403 structural gap** — Gambero Rosso articles return 403 to non-Italian IPs. Structural barrier for Rome rebuild; no workaround.
- **Rome: Puntarella Rossa anonymous bylines** — Major Rome food publication uses "Redazione" collective byline. Cannot qualify. Structural barrier.
- **Rome: Elizabeth Minchilli 2023+ content absent** — Category page shows only 2016-2019 posts. Investigate pagination or paywall before Rome rebuild.
- **Rome: Camilla Baresani article_url null** — Correct per rules. 5 individual article URLs exist in audit file but no single canonical source URL was confirmed via fetch.
- **Rome: Katie Parla concentration 64%** — Accepted as structural limitation. Flag for rebuild when additional IT sources become accessible.
- **Rome: Antico Caffè Greco lease dispute** — Verify still open before rebuild.
- **Naples: Santa di Salvo duplicate source entry** — appears twice (one null URL, one single-restaurant review URL). Compaction artifact. Review at rebuild.
- **Barcelona: Eixample centroid HIGH SPREAD** — lat spread 0.26 indicates an outlier geocode pulling centroid ~20km east. Fix at next rebuild.
- **Valencia: Russafa and Gran Vía HIGH SPREAD** — Fix at next rebuild.
- **Valladolid: Recomiendo Valladolid article_url specificity** — recomiendovalladolid.com/flamma/ used for 7 other restaurants. Fix at next rebuild.
- **Málaga: Euro Weekly News redirect** — Fix at next rebuild.
- **postrun.js version string** — header still shows v3.0, effectively v3.3. Update at next opportunity.

---

## Fleet State (as of 2026-04-28)

*Data sourced from actual JSON files via fleet script. Verify at next session start.*

### v7.1 Cities (Current Standard)

| City | Country | R | BP | Sources | Geo% | Notes |
|------|---------|---|----|---------|----|-------|
| San Sebastián | Spain | 24 | 2 | 6 | 88% | |
| Zaragoza | Spain | 39 | 0 | 7 | 62% | |
| Valladolid | Spain | 30 | 0 | 5 | 80% | article_url specificity issue (7R) |
| Alicante | Spain | 9 | 1 | 7 | 44% | |
| Santiago de Compostela | Spain | 27 | 3 | 6 | 93% | |
| Murcia | Spain | 10 | 0 | 9 | 30% | |
| Pamplona | Spain | 24 | 1 | 4 | 54% | |
| Logroño | Spain | 15 | 1 | 6 | 80% | Casco Antiguo centroid missing |
| Vigo | Spain | 10 | 0 | 3 | 80% | ALL article_urls null |
| Palma de Mallorca | Spain | 33 | 5 | 6 | 58% | |
| A Coruña | Spain | 25 | 0 | 5 | 80% | |
| Bilbao | Spain | 23 | 3 | 6 | 91% | 4 source URLs null (confirmed broken) |
| Córdoba | Spain | 40 | 6 | 8 | 71% | |
| Granada | Spain | 4 | 2 | 4 | 75% | Very thin |
| Málaga | Spain | 34 | 2 | 6 | 71% | EWN redirect (2R) |
| Seville | Spain | 22 | 0 | 5 | 68% | |
| Barcelona | Spain | 110 | 10 | 9 | 51% | Eixample centroid HIGH SPREAD |
| Valencia | Spain | 78 | 8 | 5 | 62% | Russafa/Gran Vía HIGH SPREAD |
| Madrid | Spain | 116 | 6 | 9 | 71% | |
| Fes | Morocco | 21 | 3 | 4 | 71% | |
| Marrakesh | Morocco | 42 | 5 | 6 | 62% | |
| Rabat | Morocco | 5 | 0 | 2 | 60% | |
| Chefchaouen | Morocco | 2 | 0 | 1 | 50% | |
| Lisbon | Portugal | 24 | 3 | 6 | 88% | |
| Porto | Portugal | 17 | 0 | 4 | 65% | |
| Toronto | Canada | 52 | 0 | 4 | 52% | Paywall gap structural |
| Rome | Italy | 64 | 1 | 4 | 72% | Katie Parla 64% concentration; 7 geocodes nulled; price patched |
| Milan | Italy | 60 | 3 | 10 | 67% | Strongest Italian source pool |
| Florence | Italy | 42 | 5 | 5 | 88% | Best Italian geocoding rate |
| Naples | Italy | 62 | 6 | 5 | 81% | 30R neighbourhood dropout repaired |

**Fleet totals: 30 v7.1 cities active, 30 files, 1064R**

**Italy coming_soon (11 cities remaining in localbite-index.json):**
Bologna, Turin, Venice, Palermo, Verona, Genoa, Bari, Modena, Lecce, Catania, Trieste (+ Trento and Matera parked)

**Next pipeline:** Bologna + Turin (Batch D) — full prompts ready locally

---

*Last updated: 2026-04-28 (Milan + Florence + Naples v7.1 complete; Rome QA fixes; price filter fix; centroid collision resolution; CITY_BOUNDS fix for 4 Italian cities)*
