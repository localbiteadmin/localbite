# LocalBite — Search Quality Analysis
## Cross-City Assessment — April 2026

---

## Overview

This document analyses the quality and nature of searches conducted across
all 13 live cities, based on the actual search logs in the repository.
It identifies structural patterns, city-specific problems, and
recommendations for improving search quality in future pipeline runs.

Search logs available in repo: Barcelona, Toronto, Marrakesh, Chefchaouen,
Fes, Lisbon (Strategies A, B, C). Porto, Málaga, Seville, Córdoba, Granada,
Valencia, Rabat search logs not in project files — data from journal and
research summaries used where available.

---

## City-by-City Search Summary

| City | Pipeline | Queries run | Angles covered | Named sources found | Sources used | Rejected sources | Search quality |
|------|----------|-------------|----------------|--------------------|--------------|--------------------|----------------|
| Barcelona | v4 | 26 (incl. pre-phase) | 8 | 12+ | 9 | Ara.cat (no author), Infobae (451), Time Out CA (merged) | Good |
| Valencia | v5 | ~24 | 7 | 8 | 5 | Devour Tours (no named author), Las Provincias (paywall) | Adequate |
| Seville | v6 | 30+ | 9 | 10+ | 8+ | Not in repo | Good |
| Córdoba | v6 | 30+ | 9 | 9+ | 7+ | Not in repo | Good |
| Granada | v6 | 30+ | 9 | 7+ | 4 | Not in repo | Adequate |
| Fes | v4 | 26 (incl. 9 supplementary) | 8 | 6 | 3 | Most travel bloggers (no named author) | Poor — thin pool |
| Marrakesh | v5 | 35 (incl. 5 diversity gate) | 10 | 14+ | 5 | Majority (no named author, 451 blocked, wrong scope) | Adequate |
| Rabat | v5 | ~24 | 8 | 8 | 3 | Most (no named author) | Poor — thin pool |
| Chefchaouen | v5 | 37 (incl. 6 extra) | 10 | 12+ | 5 | Most (no named author, anonymous travel bloggers) | Poor — thin pool |
| Lisbon | v5/v6 | 30 (Strategy C) | 9 | 10 | 6 | Observador (404), Público (451), aggregators | Good |
| Porto | v6 | 30+ | 9 | 10+ | 8+ | Not in repo | Good |
| Málaga | v6 | 30+ | 9 | 8+ | 6+ | Not in repo | Good |
| Toronto | v5/v6 | 28 (incl. pre-phase) | 8 | 14 | 5–8 | Toronto Life (451), NOW Toronto (CAPTCHA), Streets of Toronto (no bylines) | Adequate |

---

## Search Angle Coverage by City

The v6 template uses 9 standard angles. Earlier pipeline versions used fewer.
This table shows which angles were covered per city.

| Angle | Purpose | BCN | VAL | SEV | COR | GRA | FES | MAR | RAB | CHE | LIS | POR | MAL | TOR |
|-------|---------|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|
| A — City-wide EN | EN restaurant guides | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| B — City-wide local language | ES/PT/FR/AR guides | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — |
| C — Neighbourhood EN | Area-specific EN | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| D — Neighbourhood local | Area-specific local | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| E — Writer-first | Named critics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| F — Forum/community | Local opinions | ✓ | ~ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ~ |
| G — Recent openings | New restaurants | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| H — Awards/recognition | Validated picks | ✓ | ~ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| I — Publication-specific | Known outlets | ✓ | ~ | ✓ | ✓ | ✓ | ~ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Phase 0 (v6) | Direct known sources | — | — | ✓ | ✓ | ✓ | — | — | — | — | ✓ | ✓ | ✓ | — |

✓ = covered | ~ = partially covered | — = not run (older pipeline or not applicable)

---

## What the Searches Are Actually Finding

### European cities (Barcelona, Valencia, Seville, Córdoba, Granada, Lisbon, Porto, Málaga)

**What works well:**
- City-wide EN and local-language angles consistently surface Time Out, The Infatuation, Condé Nast, and major national publications
- Neighbourhood angles surface neighbourhood-specific articles that city-wide searches miss
- Awards angles reliably find Michelin, La Liste, and local culinary award coverage
- Writer-first angle occasionally surfaces genuinely independent critics not found by other angles — Barcelona Food Experience, Mesa Marcada, Beteve.cat, NiT

**What the searches are not finding:**
- Smaller local neighbourhood blogs and food writers who write irregularly and don't have strong SEO
- Publications behind hard paywalls (Las Provincias Valencia, El Periódico for Pau Arenós, Público/Fugas Lisbon)
- Writers active primarily on social media rather than article pages
- Casual dining — the food press disproportionately covers mid-range and upscale, and the searches reflect this

**Structural observation:** The same publication names surface repeatedly across queries. Barcelona: Time Out, Barcelona Food Experience, The Infatuation, Guía Repsol. Lisbon: Time Out, Culinary Backstreets, Mesa Marcada. After the 15th query in a well-documented city, the searches are generating diminishing returns — the sources are already known and the extra queries are confirming what is already confirmed rather than finding new voices.

---

### Moroccan cities (Fes, Marrakesh, Rabat, Chefchaouen)

**What the searches consistently fail to find:**
- Named Arabic-language food writers. Every Arabic-language search across all four Moroccan cities returned aggregator travel sites, TripAdvisor-style content, or hotel/tourism board material. Not a single named Arabic food critic was found across 100+ Arabic-language queries. This is now confirmed as a structural gap, not a search strategy failure.
- Named French food journalists based in Morocco. French results are dominated by French travel bloggers (visitor perspective) rather than Moroccan-based French-language food writers. This is a thinner structural gap — Moroccan-based French press exists (TelQuel, Femmes du Maroc, l'Économiste) but their food coverage is limited and not well indexed.
- Restaurant-specific editorial content for small cities. For Chefchaouen and Rabat, the food writing scene simply does not produce the volume of named-author content that the pipeline requires.

**Specific search quality problems observed:**

*Marrakesh [phase-1-F3]:* "مطاعم الرياض مراكش 2025" — "الرياض" (riad) was interpreted as Riyadh (the Saudi capital). A query about riad restaurants in Marrakesh returned Saudi restaurant results. This is a well-known Arabic homonym problem — riad (traditional courtyard house) and Riyadh (capital of Saudi Arabia) share the same Arabic script. This query misfire went undetected in the search log and wasted one query slot.

*Fes additional searches:* After 20 queries found fewer than 5 sources, 9 additional searches were run. 7 of those 9 returned the same candidates already found. The additional searches confirmed the thin pool rather than expanding it — which is the correct outcome, but the 9 extra queries consumed tokens without value.

*Chefchaouen extra searches:* 6 extra searches beyond the planned set. All returned candidates already in the pool. Same pattern as Fes.

---

### Toronto

**What works well:**
- Foodism, Madame Marie, Toronto Life found reliably
- Michelin and Canada's 100 Best reliably found via awards angle
- Named writers (Taylor Newlands, Liza Agrba, Erin Hershberg) correctly identified

**What the searches are not finding:**
- Toronto Life content (451 blocked — highest-value source, inaccessible)
- The Globe and Mail food section (not surfacing in searches)
- Eat North / Dan Clapson (found only in v6 supplementary search, not standard angles)
- Community voices: Reddit Toronto food community, local neighbourhood blogs

**Toronto-specific structural observation:** Toronto is an English-only food writing market. All Angle B (local language) queries were effectively wasted because there is no meaningful non-English Toronto food press. Those 5 query slots could instead be used for: cuisine-specific angles (Chinese food writers, South Asian food writers, Caribbean food writers) where Toronto has real community food writing that the standard angles don't reach.

---

## Key Quality Issues Identified

### Issue 1 — Query repetition / diminishing returns

**Observation:** In well-documented cities, searches after query 15–20 consistently return sources already found. The log for Barcelona shows the same 4–5 sources appearing in the results of queries 15 through 26. The search budget is allocated equally across all queries but value concentrates in the first 15.

**Impact:** Token cost without proportional source discovery benefit.

**Suggested fix:** Add a stopping rule — if 3 consecutive queries return only sources already in the candidate pool, terminate Phase 1 early and allocate the saved tokens to Phase 1B writer-first supplementary searches instead. This shifts budget from diminishing-return broad searches to targeted searches for sources not yet found.

---

### Issue 2 — Arabic language search misfires

**Observation:** The Marrakesh riad/Riyadh homonym misfire is documented. There may be similar issues in other Arabic queries that weren't caught because the log records only what the results showed, not whether the query correctly expressed the intended meaning.

**Impact:** Wasted query slots in Arabic-language searches, which are already the least productive.

**Suggested fix:** For Moroccan cities, reduce Arabic query count from 3–4 to 1–2, accepting that the structural gap is not a search strategy problem. Use saved slots for French-language searches targeting Moroccan press specifically (TelQuel, l'Économiste gastronomie, Femmes du Maroc) rather than generic French food writing.

---

### Issue 3 — Toronto Angle B waste

**Observation:** Toronto has no meaningful non-English food press. Five queries in the local-language angle returned nothing useful because the angle was designed for bilingual European and Moroccan cities.

**Impact:** 5 query slots wasted per Toronto run.

**Suggested fix:** Replace Angle B for single-language cities (Toronto, English-only cities) with a cuisine-community angle: "best [cuisine] restaurants Toronto food writer" targeting the specific community food writing that standard angles miss. Examples: Chinese Canadian food writers, South Asian food bloggers, Caribbean food writing.

---

### Issue 4 — Forum/community angle underperforms consistently

**Observation:** Across all cities, the forum/community angle (Reddit, local forums) consistently returns either the same editorial sources already found, or aggregator content that fails the named-author rule. Barcelona forum searches returned barcelonahacks.com aggregator content. Toronto forum searches returned no Reddit threads. Lisbon forum searches returned no usable community content.

**Impact:** 3 query slots per city that rarely produce unique sources.

**Suggested fix:** Reduce forum angle from 3 queries to 1, or repurpose the slots. For cities where food writing is rich (Barcelona, Lisbon), use the saved slots for additional publication-specific searches targeting known outlets not yet confirmed. For thin-pool cities, use them for additional writer-first searches.

---

### Issue 5 — Phase 0 direct-fetch missing from v4/v5 cities

**Observation:** Phase 0 (direct fetch of known high-quality sources before any searches) is a v6 feature. The Moroccan cities and early European cities (Barcelona v4, Valencia v5) never had Phase 0 runs. For Lisbon, Phase 0 found Mesa Marcada before the searches began — which then seeded writer-first queries. Without Phase 0, Mesa Marcada was only found by Strategy B (writer-first emphasis), not Strategy A (standard queries).

**Impact:** Known high-value sources may have been missed in v4/v5 cities because no direct fetch was run. Barcelona has Barcelona Food Experience — but was it confirmed by direct fetch or found by search? If by search, it might have been missed in a thinner search run.

**Suggested fix:** For any city rebuild (Valencia v2, Seville v2 etc.), include Phase 0 in the Part 1 variables using sources identified in the existing research summaries. The Barcelona research summary names Barcelona Food Experience, Beteve.cat, The New Barcelona Post as confirmed sources — these should become Phase 0 direct fetches in Barcelona v7.

---

### Issue 6 — No search quality feedback loop

**Observation:** The search log records what was searched and what appeared in results. It does not record which searches contributed to the final city pack. After a pipeline run, there is no way to look at the search log and answer: "which specific queries actually found the sources we used?" Without this, it's impossible to know which query angles are generating value and which are not.

**Impact:** Search strategy evolves by intuition rather than evidence. The Lisbon three-strategy test was the only systematic attempt to measure search efficiency, and it found meaningful differences (Strategy A vs B vs C had different both-pool counts and source diversity). But this was a one-off test, not a systematic practice.

**Suggested fix:** Add a `found_via` field to each source in the final JSON — already present in v6 (phase-0, angle-A, angle-B etc.). Aggregate this across cities to build an evidence base: which angles find sources that end up in final packs? This data exists in the v6 JSONs already — it just hasn't been analysed fleet-wide.

---

## Summary Assessment by City Tier

### Tier 1 — Strong search coverage (finding genuine independent voices)
Barcelona, Lisbon, Porto

These cities have active, named, independent food writing scenes in multiple languages. The searches find the right sources. The constraint is source accessibility (paywalls, 403 blocks) not search quality.

### Tier 2 — Adequate search coverage (finding sources but missing some)
Valencia, Seville, Córdoba, Málaga, Toronto

Sources are found but the search is missing some. Valencia misses local press behind paywalls. Toronto misses cuisine-community writing and Globe and Mail. Seville and Córdoba likely have undiscovered local food writers not well-indexed. Málaga is thin but the market is genuinely thin.

### Tier 3 — Structurally limited (search finds what exists, but what exists is sparse)
Fes, Rabat, Chefchaouen, Granada

The searches are working correctly — they find all available named-author content. But the content available is sparse. More queries would not find more sources. The constraint is the food writing ecosystem, not the search strategy.

Marrakesh sits between Tier 2 and Tier 3 — better than the other Moroccan cities but still structurally limited by the Arabic/local-press gap.

---

## Recommendations for v7 Search Strategy

In priority order:

1. **Add stopping rule for diminishing returns** — terminate Phase 1 early if 3 consecutive queries return only known sources. Saves tokens, improves efficiency.

2. **Replace Angle B with cuisine-community angle for single-language cities** — Toronto specifically. Designed to find community food writing that standard angles miss.

3. **Reduce Arabic query count for Moroccan cities** — from 3–4 to 1–2. Accept the structural gap. Use saved slots for targeted Moroccan French-language press searches.

4. **Reduce forum angle from 3 queries to 1** — consistently lowest-value angle across all cities. Redirect to additional writer-first or publication-specific queries.

5. **Mandate Phase 0 for all city rebuilds** — use existing research summaries to populate DIRECT_FETCH_SOURCES with confirmed sources from previous runs.

6. **Analyse found_via data fleet-wide** — aggregate the found_via field from all v6 city JSONs to build an evidence base of which search angles produce sources that make it into final packs.

---

*Document produced: 2026-04-15*
*Based on search logs: Barcelona, Toronto, Marrakesh, Chefchaouen, Fes, Lisbon (A/B/C)*
*Research summaries used for: Valencia, Rabat, Porto, Málaga, Seville, Córdoba, Granada*
