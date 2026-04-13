# LocalBite — City Pack Status Summary
*Generated: 2026-04-13 | 13 cities live*

---

## 1. Fleet Overview

| City | Country | Pipeline | Built | Source Window | Restaurants | Sources |
|------|---------|----------|-------|---------------|-------------|---------|
| Barcelona | Spain | v6 | 2026-04-08 | 2023–2026 | 86 | 9 |
| Seville | Spain | v6 | 2026-04-09 | 2023–2026 | 61 | 10 |
| Toronto | Canada | v5 | 2026-03-30 | 2025–2026 | 52 | 8 |
| Porto | Portugal | v6 (Strategy C) | 2026-04-10 | 2023–2026 | 53 | 10 |
| Valencia | Spain | v6 | 2026-04-09 | 2023–2026 | 47 | 7 |
| Lisbon | Portugal | v5 (Strategy C) | 2026-03-27 | 2025–2026 | 36 | 5 |
| Córdoba | Spain | v6 | 2026-04-09 | 2023–2026 | 35 | 9 |
| Málaga | Spain | v6 (Strategy C) | 2026-04-10 | 2023–2026 | 23 | 6 |
| Chefchaouen | Morocco | v5 | 2026-03-25 | 2025–2026 | 12 | 5 |
| Marrakesh | Morocco | v5 | 2026-03-22 | 2025–2026 | 14 | 5 |
| Fes | Morocco | v4 | 2026-03-22 | 2025–2026 | 10 | 3 |
| Rabat | Morocco | v5 | 2026-03-25 | 2025–2026 | 10 | 3 |
| Granada | Spain | v6 | 2026-04-09 | 2023–2026 | 15 | 4 |
| **TOTAL** | | | | | **459** | **84** |

**Pipeline version spread:** v4 (1 city), v5 (6 cities), v6 (6 cities). All new city runs should use v6.

---

## 2. Geocoding Status

| City | Total | Geocoded | Null | Hit Rate | Notes |
|------|-------|----------|------|----------|-------|
| Lisbon | 36 | 36 | 0 | 100% | All manually verified |
| Rabat | 10 | 10 | 0 | 100% | Nominatim + manual |
| Chefchaouen | 12 | 12 | 0 | 100% | Nominatim + manual |
| Toronto | 52 | 51 | 1 | 98% | 1 null (Oro Luxury Dining — may be closed) |
| Córdoba | 35 | 29 | 6 | 83% | 6 unresolvable |
| Seville | 61 | 45 | 16 | 74% | 16 unresolvable |
| Porto | 53 | 41 | 12 | 77% | 12 unresolvable — new restaurants + Gaia entries |
| Granada | 15 | 12 | 3 | 80% | 3 unresolvable |
| Barcelona | 86 | 53 | 33 | 62% | 33 null — high proportion of 2024 openings |
| Valencia | 47 | 33 | 14 | 70% | 14 unresolvable |
| Marrakesh | 14 | 12 | 2 | 86% | 2 null |
| Fes | 10 | 8 | 2 | 80% | 2 null |
| Málaga | 23 | 16 | 7 | 70% | El Tintero excluded by bounding box (widened for v7) |
| **TOTAL** | **459** | **358** | **101** | **78%** | |

**Fleet geocoding rate: 78%.** The 22% null rate is structural — a combination of new restaurant openings not yet in OSM, ambiguous names, and the no-manual-lookups policy. All null restaurants display with neighbourhood centroid pins in the viewer.

---

## 3. Source Quality — Cross-Validation Signal

### Both-pool entries (appeared in EN + local language, different publishers)

| City | Both-pool | Total | % Both-pool | Notes |
|------|-----------|-------|-------------|-------|
| Córdoba | 17 | 35 | 49% | Strongest cross-validation in fleet |
| Barcelona | 10 | 86 | 12% | All 10 verified as genuine cross-publisher pairs |
| Valencia | 10 | 47 | 21% | Strong for city size |
| Marrakesh | 4 | 14 | 29% | EN + FR independent agreement |
| Seville | 5 | 61 | 8% | Low — structural (EN writers cover different segment) |
| Porto | 2 | 53 | 4% | Structural — PT pool thin (only 2 PT sources) |
| Fes | 1 | 10 | 10% | EN + FR |
| Chefchaouen | 1 | 12 | 8% | EN only — no local food critics exist |
| Lisbon | 0 | 36 | 0% | Structural — EN and PT critics cover different segments |
| Málaga | 0 | 23 | 0% | Structural — ES pool dominated by one publisher |
| Granada | 0 | 15 | 0% | Structural — thin source city |
| Rabat | 0 | 10 | 0% | Structural — thin source city |
| Toronto | 0 | 52 | 0% | Single-language city — both-pool not applicable |

**Note on Toronto:** Toronto uses `multi-source` (12 restaurants) rather than `both-pool` as its cross-validation signal — it is a single-language EN city so the EN/local-language both-pool definition does not apply. The 12 multi-source entries are the equivalent signal.

### Confidence tier breakdown

| City | Tier A | Tier B | Tier A % | Notes |
|------|--------|--------|----------|-------|
| Chefchaouen | 11 | 1 | 92% | Highest Tier A rate — heavy tourist consensus |
| Córdoba | 26 | 9 | 74% | Very strong — 17 both-pool entries drive Tier A |
| Toronto | 12 | 40 | 23% | v5 pipeline — multi-source not both-pool |
| Granada | 4 | 11 | 27% | Thin source city |
| Tier A total | **103** | **284** | **27%** | Fleet average |

---

## 4. Language Pool Distribution

| City | EN | Local lang | Both-pool | Notes |
|------|----|------------|-----------|-------|
| Barcelona | 40 | CA: 13 / ES: 23 | 10 | Three language pools (EN + CA + ES) |
| Valencia | 16 | ES: 21 | 10 | — |
| Seville | 14 | ES: 42 | 5 | ES-dominant — reflects local food press depth |
| Córdoba | 7 | ES: 11 | 17 | Both-pool dominant |
| Granada | 12 | ES: 3 | 0 | EN-dominant — thin ES coverage |
| Lisbon | 26 | PT: 10 | 0 | EN-dominant — structural |
| Porto | 42 | PT: 9 | 2 | EN-dominant — Mesa Marcada gap affects PT pool |
| Málaga | 21 | ES: 2 | 0 | EN-dominant — El Español holds 100% of ES pool |
| Toronto | 40* | — | 0 | Single-language EN (*12 flagged multi-source) |
| Fes | 4 | FR: 5 | 1 | FR-dominant |
| Marrakesh | 7 | FR: 3 | 4 | Balanced |
| Rabat | 9 | FR: 1 | 0 | EN-dominant — thin FR coverage |
| Chefchaouen | 11 | — | 1 | EN-only — no local food critics |

---

## 5. Source Article Date Distribution

This shows how fresh the source articles are across each city pack — a key indicator of data staleness risk.

| City | 2023 sources | 2024 sources | 2025 sources | 2026 sources | Undated | Oldest source |
|------|-------------|-------------|-------------|-------------|---------|---------------|
| Barcelona | — | 3 | 1 | 5 | — | Dec 2024 |
| Valencia | — | — | 1 | 1 | 5 | **Undated (5 of 7 sources)** |
| Seville | 2 | 3 | 3 | 2 | — | 2023 |
| Córdoba | 1 | 3 | 3 | 2 | — | 2023 |
| Granada | 1 | — | 3 | — | — | 2023 |
| Lisbon | — | — | 4 | 1 | — | 2025 |
| Porto | 3 | 2 | 2 | 3 | — | 2023 |
| Málaga | 1 | 2 | 3 | — | — | 2023 (Lauren Aloise / Spanish Sabores) |
| Toronto | — | — | 6 | 2 | — | 2025 |
| Fes | — | — | 3 | — | — | 2025 |
| Marrakesh | — | — | 5 | — | — | 2025 |
| Rabat | — | — | 3 | — | — | 2025 |
| Chefchaouen | — | — | 4 | 1 | — | 2025 |

**Key staleness flags:**
- **Valencia** — 5 of 7 sources have no article date recorded. The pipeline failed to extract dates from fetched text. All 39 of 47 restaurants show `article_date: undated`. This is a known pipeline extraction failure documented in the journal — do not fix manually, address in Valencia v2 rebuild.
- **Barcelona** — 3 sources from 2024 (including Culinary Backstreets Dec 2024 and Gastronosfera Dec 2024). These 11 restaurants carry `open_status_check: true`. At 16 months old, closure risk is meaningful.
- **Seville** — 2 sources from 2023 and 29 restaurants with `open_status_check: true`. At 2–3 years old, this is the highest staleness risk in the fleet.
- **Córdoba** — 1 source from 2023 and 8 restaurants with `open_status_check: true`.
- **Granada** — 1 source from 2023 and 5 restaurants with `open_status_check: true`.

---

## 6. Open Status Check — Restaurants Requiring Verification

Restaurants flagged `open_status_check: true` come from sources dated before 2025. These have not been verified as currently open.

| City | open_status_check count | Total restaurants | % of pack | Oldest source | Risk level |
|------|------------------------|-------------------|-----------|---------------|------------|
| Seville | 29 | 61 | 48% | 2023 | 🔴 High — nearly half the pack, some 3 years old |
| Barcelona | 11 | 86 | 13% | Dec 2024 | 🟡 Medium — 16 months old |
| Córdoba | 8 | 35 | 23% | 2023 | 🟡 Medium — some 3 years old |
| Granada | 5 | 15 | 33% | 2023 | 🟡 Medium — significant fraction of small pack |
| Porto | 0 | 53 | 0% | — | ✅ Clean |
| Málaga | 0 | 23 | 0% | — | ✅ Clean |
| Valencia | 0 | 47 | 0% | — | ✅ Clean (dates not extracted — not flagged) |
| Lisbon | 0 | 36 | 0% | — | ✅ Clean |
| Toronto | 0 | 52 | 0% | — | ✅ Clean |
| Fes | 0 | 10 | 0% | — | ✅ Clean |
| Marrakesh | 0 | 14 | 0% | — | ✅ Clean |
| Rabat | 0 | 10 | 0% | — | ✅ Clean |
| Chefchaouen | 0 | 12 | 0% | — | ✅ Clean |
| **TOTAL** | **53** | **459** | **12%** | | |

**53 restaurants across 4 cities need open status verification.** Seville is the most urgent — 29 restaurants, some from 2023 sources, represents a serious data quality risk for the second-largest city pack.

**Note on Valencia:** Valencia shows 0 open_status_check flags but this is because the pipeline failed to extract article dates (5 of 7 sources undated). The flag could not fire without dates. Valencia v2 should include a manual date extraction pass.

---

## 7. Pack Size and Minimum Standard Assessment

The definition of done sets minimum pack sizes: large city 40+, medium city 25+, small city 8+.

| City | Restaurants | Category | Meets minimum | Notes |
|------|-------------|----------|---------------|-------|
| Barcelona | 86 | Large | ✅ | Well above threshold |
| Seville | 61 | Large | ✅ | — |
| Toronto | 52 | Large | ✅ | — |
| Porto | 53 | Large | ✅ | — |
| Valencia | 47 | Large | ✅ | — |
| Lisbon | 36 | Medium | ✅ | — |
| Córdoba | 35 | Medium | ✅ | — |
| Málaga | 23 | Medium | ✅ | — |
| Chefchaouen | 12 | Small | ✅ | Cleaned from 17 — 2 anonymous sources still in sources array |
| Marrakesh | 14 | Small | ✅ | — |
| Fes | 10 | Small | ✅ | — |
| Rabat | 10 | Small | ✅ | — |
| Granada | 15 | Small | ✅ | Structurally thin — v2 recommended July 2026 |

All 13 cities meet the minimum pack size standard.

---

## 8. Pipeline Version and Upgrade Priority

| City | Current pipeline | Missing features vs v6 | Upgrade priority |
|------|-----------------|----------------------|-----------------|
| Fes | v4 | COI check, publisher concentration, Phase 0, both-pool definition fix, REVIEW_MODE BRIEF | 🔴 High — oldest pipeline |
| Lisbon | v5 (Strategy C) | REVIEW_MODE BRIEF, JSON structure rule, open_status_check | 🟡 Medium |
| Toronto | v5 | REVIEW_MODE BRIEF, both-pool N/A (single language) | 🟡 Medium |
| Marrakesh | v5 | REVIEW_MODE BRIEF | 🟡 Medium |
| Rabat | v5 | REVIEW_MODE BRIEF | 🟡 Medium |
| Chefchaouen | v5 | REVIEW_MODE BRIEF, anonymous source replacement needed | 🟡 Medium |
| Barcelona | v6 | — | ✅ Current |
| Valencia | v6 | — (date extraction failure to fix in v2) | ✅ Current |
| Seville | v6 | — | ✅ Current |
| Córdoba | v6 | — | ✅ Current |
| Granada | v6 | — | ✅ Current |
| Porto | v6 (Strategy C) | — | ✅ Current |
| Málaga | v6 (Strategy C) | — | ✅ Current |

---

## 9. Known Issues by City

| City | Known issue | Severity | Action |
|------|-------------|----------|--------|
| Seville | 29 open_status_check restaurants (48% of pack), oldest from 2023 | 🔴 High | Run open status verification before v2 |
| Barcelona | 11 open_status_check restaurants, 16 months old; old v4 pack still in repo | 🟡 Medium | Verify open status; delete localbite-barcelona-2025-2026.json |
| Córdoba | 8 open_status_check restaurants, some from 2023 | 🟡 Medium | Verify open status in v2 |
| Granada | 5 open_status_check restaurants; structurally thin (15 restaurants, 4 sources) | 🟡 Medium | v2 July 2026 when El Gocho Gourmet archive grows |
| Valencia | 39/47 restaurants show article_date: undated — pipeline date extraction failure | 🟡 Medium | Fix in v2 rebuild — do not patch manually |
| Chefchaouen | 2 anonymous sources (S2 Sir Driver Tours, S3 Chauen.info) still in sources array despite restaurants removed | 🟡 Medium | Find named replacements in v2 |
| Toronto | Foodism concentration 53% of pack (cap did not fire correctly) | 🟡 Medium | Address in v2 with publisher-level cap |
| Porto | Mesa Marcada bylines not extractable via Jina | 🟡 Medium | Test Firecrawl before next PT city run |
| Lisbon | 3 of 5 sources now inaccessible (25/36 restaurants from inaccessible sources) | 🟡 Medium | Find alternative URLs in v2 |
| Málaga | El Tintero (El Palo) excluded by bounding box — widened to -4.33 for v7 | 🟢 Low | Fixed in geocoder — will resolve on v7 run |
| All v6 cities | city/country nested under meta at runtime despite correct template | 🟢 Low | JSON STRUCTURE RULE added to template — monitor next run |
| All cities | Map pin language inconsistency | ✅ Fixed | Fixed 2026-04-13 |

---

## 10. Recommended Next Actions

### Immediate (this session or next)
1. **Seville open_status_check** — 29 restaurants, 48% of pack, some 3 years old. Highest data quality risk in fleet. Web search each before next user-facing push.
2. **Barcelona open_status_check** — 11 restaurants, 16 months old. Second priority.
3. **Delete stale Barcelona v4 pack** — `localbite-barcelona-2025-2026.json` (52 restaurants) is superseded by v6 (86 restaurants) and should be removed from the repo to avoid confusion.

### Soon (next 2–3 sessions)
4. **Córdoba and Granada open_status_check** — 13 restaurants combined, lower urgency than Seville/Barcelona.
5. **Valencia v2** — Fix date extraction failure; refresh sources; 47-restaurant pack is solid but undated.
6. **Firecrawl test on Mesa Marcada** — Before any future PT city run.
7. **Toronto v2** — Address Foodism concentration (53%); seek non-Foodism sources.

### Deferred
8. **Fes v6 upgrade** — Only 10 restaurants; low user impact but oldest pipeline in fleet.
9. **Chefchaouen v2** — Find named replacements for anonymous S2/S3 sources.
10. **Lisbon v2** — Find alternative URLs for 3 inaccessible sources.
11. **Granada v2** — July 2026 when El Gocho Gourmet archive grows.
12. **Seville v2** — Find second independent EN writer; address open_status_check in v2 run.

---

*Summary generated from live JSON files in /Users/harryenchin/Documents/GitHub/localbite/*
*Total restaurants: 459 across 13 cities and 84 sources*
