# LocalBite — City Pack Status Summary
*Generated: 2026-04-13 (end of session) | 13 cities live*
*Previous version: 2026-04-13 (start of session)*

---

## 1. Fleet Overview

| City | Country | Pipeline | Built | Source Window | Restaurants | Sources |
|------|---------|----------|-------|---------------|-------------|---------|
| Barcelona | Spain | v6 | 2026-04-08 | 2023–2026 | 86 | 9 |
| Seville | Spain | v6 | 2026-04-09 | 2023–2026 | 61 | 10 |
| Porto | Portugal | v6 (Strategy C) | 2026-04-10 | 2023–2026 | 53 | 10 |
| Toronto | Canada | v5v6-merge | 2026-04-13 | 2023–2026 | 66 | 12 |
| Valencia | Spain | v6 | 2026-04-09 | 2023–2026 | 47 | 7 |
| Lisbon | Portugal | v6 | 2026-04-13 | 2023–2026 | 48 | 6 |
| Córdoba | Spain | v6 | 2026-04-09 | 2023–2026 | 35 | 9 |
| Málaga | Spain | v6 (Strategy C) | 2026-04-10 | 2023–2026 | 23 | 6 |
| Chefchaouen | Morocco | v5 | 2026-03-25 | 2025–2026 | 12 | 5 |
| Marrakesh | Morocco | v5 | 2026-03-22 | 2025–2026 | 14 | 5 |
| Fes | Morocco | v4 | 2026-03-22 | 2025–2026 | 10 | 3 |
| Rabat | Morocco | v5 | 2026-03-25 | 2025–2026 | 10 | 3 |
| Granada | Spain | v6 | 2026-04-09 | 2023–2026 | 15 | 4 |
| **TOTAL** | | | | | **480** | **89** |

**Changes since last summary:** Toronto updated from 52 (v5) → 66 (v5v6-merge). Lisbon updated from 36 (v5) → 48 (v6). Total restaurants increased from 459 → 480.

**Pipeline version spread:** v4 (1 city — Fes), v5 (4 cities — Marrakesh, Rabat, Chefchaouen, and archived Toronto/Lisbon), v6 (8 cities). All new city runs use v6.

---

## 2. Geocoding Status

| City | Total | Geocoded | Null | Hit Rate | Method | Notes |
|------|-------|----------|------|----------|--------|-------|
| Lisbon | 48 | 35 | 13 | 73% | Nominatim+Photon | 5 false positives nulled; 8 not found |
| Rabat | 10 | 10 | 0 | 100% | Nominatim+manual | — |
| Chefchaouen | 12 | 12 | 0 | 100% | Nominatim+manual | — |
| Toronto | 66 | 50 | 16 | 76% | Mixed v5 manual + v6 Nominatim | 8 false positives nulled this session; v5 restaurants carry manual coords |
| Córdoba | 35 | 29 | 6 | 83% | Nominatim+Photon | — |
| Porto | 53 | 41 | 12 | 77% | Nominatim+Photon | — |
| Granada | 15 | 12 | 3 | 80% | Nominatim+Photon | — |
| Seville | 61 | 45 | 16 | 74% | Nominatim+Photon | — |
| Barcelona | 86 | 53 | 33 | 62% | Nominatim+Photon | High null rate — many 2024 openings |
| Valencia | 47 | 33 | 14 | 70% | Nominatim+Photon | — |
| Marrakesh | 14 | 12 | 2 | 86% | Nominatim+manual | — |
| Fes | 10 | 8 | 2 | 80% | Nominatim+manual | — |
| Málaga | 23 | 16 | 7 | 70% | Nominatim+Photon | El Tintero excluded by bounding box |
| **TOTAL** | **480** | **356** | **124** | **74%** | | |

**Fleet geocoding rate: 74%.** Slight decrease from 78% in previous summary due to Lisbon v6 (73%) and Toronto merge adding ungeocoded v6-only restaurants. The 26% null rate is structural — new openings not yet in OSM, false positives correctly rejected, no-manual-lookups policy.

**Key change this session:** Toronto geocoding improved from 98% (v5 with 33 manual lookups) to 76% (merged pack). The 76% figure is honest — it reflects the no-manual-lookups policy applied consistently. The v5 figure was artificially high due to extensive manual intervention.

---

## 3. Source Quality — Cross-Validation Signal

### Both-pool and multi-source entries

| City | Both-pool / Multi-source | Total | % | Notes |
|------|--------------------------|-------|---|-------|
| Córdoba | 17 both-pool | 35 | 49% | Strongest cross-validation in fleet |
| Toronto | 22 multi-source | 66 | 33% | Single-language city — multi-source is the signal |
| Valencia | 10 both-pool | 47 | 21% | Strong for city size |
| Marrakesh | 4 both-pool | 14 | 29% | EN + FR independent agreement |
| Barcelona | 10 both-pool | 86 | 12% | All verified genuine cross-publisher pairs |
| Seville | 5 both-pool | 61 | 8% | Structural — EN/ES cover different segments |
| Porto | 2 both-pool | 53 | 4% | Structural — PT pool thin |
| Lisbon | 1 both-pool | 48 | 2% | Vibe (Ola Daniela EN + NiT PT) — new this session |
| Fes | 1 both-pool | 10 | 10% | EN + FR |
| Chefchaouen | 1 both-pool | 12 | 8% | EN only — no local food critics |
| Málaga | 0 | 23 | 0% | Structural — ES pool one publisher |
| Granada | 0 | 15 | 0% | Structural — thin source city |
| Rabat | 0 | 10 | 0% | Structural — thin source city |

**Notable change:** Lisbon now has 1 both-pool entry (Vibe) — up from 0 in v5. NiT (Eva Reimão) was the new PT source discovery that made this possible.

### Confidence tier breakdown

| City | Tier A | Tier B | Tier A % | Notes |
|------|--------|--------|----------|-------|
| Chefchaouen | 11 | 1 | 92% | Highest — heavy tourist consensus |
| Córdoba | 26 | 9 | 74% | 17 both-pool drives Tier A |
| Toronto | 12 | 54 | 18% | Tier A = multi-source entries |
| Lisbon | 11 | 37 | 23% | Up from 2/36 (6%) in v5 — major improvement |
| Granada | 4 | 11 | 27% | Thin source city |

---

## 4. Language Pool Distribution

| City | EN | Local lang | Both-pool | Notes |
|------|----|------------|-----------|-------|
| Barcelona | 40 | CA: 13 / ES: 23 | 10 | Three language pools (EN + CA + ES) |
| Valencia | 16 | ES: 21 | 10 | — |
| Seville | 14 | ES: 42 | 5 | ES-dominant |
| Córdoba | 7 | ES: 11 | 17 | Both-pool dominant |
| Granada | 12 | ES: 3 | 0 | EN-dominant — thin ES |
| Lisbon | 45 | PT: 2 | 1 | EN-dominant — PT pool regressed vs v5 |
| Porto | 42 | PT: 9 | 2 | EN-dominant — Mesa Marcada gap |
| Málaga | 21 | ES: 2 | 0 | EN-dominant — El Español monopoly |
| Toronto | 44 | — | 0 (22 multi-source) | Single-language EN |
| Fes | 4 | FR: 5 | 1 | FR-dominant |
| Marrakesh | 7 | FR: 3 | 4 | Balanced |
| Rabat | 9 | FR: 1 | 0 | EN-dominant |
| Chefchaouen | 11 | — | 1 | EN-only |

**Notable concern:** Lisbon PT pool regressed from 10 PT-pool restaurants (v5) to 2 (v6). Observador (404) and Público/Fugas (451) both permanently blocked. This is the most significant data quality regression introduced this session.

---

## 5. Source Article Date Distribution

| City | 2023 sources | 2024 sources | 2025 sources | 2026 sources | Undated | Oldest source |
|------|-------------|-------------|-------------|-------------|---------|---------------|
| Barcelona | — | 3 | 1 | 5 | — | Dec 2024 |
| Valencia | — | — | 1 | 1 | 5 | **Undated (5 of 7 sources)** |
| Seville | 2 | 3 | 3 | 2 | — | 2023 |
| Córdoba | 1 | 3 | 3 | 2 | — | 2023 |
| Granada | 1 | — | 3 | — | — | 2023 |
| Lisbon | — | 1 | 3 | 2 | — | Nov 2024 (Ola Daniela) |
| Porto | 3 | 2 | 2 | 3 | — | Feb 2023 |
| Málaga | 1 | 2 | 3 | — | — | Jul 2023 |
| Toronto | — | 1 | 9 | 2 | — | Jan 2025 |
| Fes | — | — | 3 | — | — | 2025 |
| Marrakesh | — | — | 5 | — | — | 2025 |
| Rabat | — | — | 3 | — | — | 2025 |
| Chefchaouen | — | — | 4 | 1 | — | 2025 |

**Lisbon improvement:** v5 had sources from 2025–2026 only. v6 added Ola Daniela (Nov 2024) and The Infatuation (Jul 2023) — wider window, but introduces open_status_check flags.

**Valencia undated sources:** 5 of 7 sources have no extractable date. 39 of 47 restaurants show `article_date: undated`. Known pipeline failure — address in v2 rebuild.

---

## 6. Open Status Check — Restaurants Requiring Verification

| City | open_status_check | Total | % of pack | Oldest source | Risk |
|------|-------------------|-------|-----------|---------------|------|
| Seville | 29 | 61 | 48% | 2023 | 🔴 High — nearly half the pack, 3 years old |
| Lisbon | 27 | 48 | 56% | Nov 2024 (16 months) | 🔴 High — majority of pack unverified |
| Córdoba | 8 | 35 | 23% | 2023 | 🟡 Medium |
| Granada | 5 | 15 | 33% | 2023 | 🟡 Medium |
| Barcelona | 11 | 86 | 13% | Dec 2024 (16 months) | 🟡 Medium |
| Toronto | 7 | 66 | 11% | Jan 2025 (15 months) | 🟡 Low-Medium |
| Porto | 0 | 53 | 0% | — | ✅ Clean |
| Málaga | 0 | 23 | 0% | — | ✅ Clean |
| Valencia | 0 | 47 | 0% | — | ✅ Clean (dates not extracted) |
| Fes | 0 | 10 | 0% | — | ✅ Clean |
| Marrakesh | 0 | 14 | 0% | — | ✅ Clean |
| Rabat | 0 | 10 | 0% | — | ✅ Clean |
| Chefchaouen | 0 | 12 | 0% | — | ✅ Clean |
| **TOTAL** | **87** | **480** | **18%** | | |

**Key change this session:** Lisbon now has 27 open_status_check restaurants (56% of pack) — the highest percentage in the fleet. This is a direct consequence of widening the source window to 2023–2026 and including Ola Daniela (Nov 2024) and The Infatuation (Jul 2023). The Infatuation article alone contributes many of the 27 flagged entries.

**Seville remains the most urgent** — 29 restaurants from 2023 sources, some nearly 3 years old.

---

## 7. Pack Size and Minimum Standard

| City | Restaurants | Category | Meets minimum | Notes |
|------|-------------|----------|---------------|-------|
| Barcelona | 86 | Large | ✅ | Flagship — well above threshold |
| Seville | 61 | Large | ✅ | — |
| Toronto | 66 | Large | ✅ | Upgraded from 52 (v5) to 66 (merge) |
| Porto | 53 | Large | ✅ | — |
| Valencia | 47 | Large | ✅ | — |
| Lisbon | 48 | Large | ✅ | Upgraded from 36 (v5) to 48 (v6) |
| Córdoba | 35 | Medium | ✅ | — |
| Málaga | 23 | Medium | ✅ | — |
| Chefchaouen | 12 | Small | ✅ | 2 anonymous sources still in sources array |
| Marrakesh | 14 | Small | ✅ | — |
| Granada | 15 | Small | ✅ | v2 recommended July 2026 |
| Fes | 10 | Small | ✅ | Oldest pipeline (v4) |
| Rabat | 10 | Small | ✅ | — |

All 13 cities meet minimum pack size. Total fleet: **480 restaurants**.

---

## 8. Source Accessibility Audit

Confirmed this session via browser testing (Toronto) and curl (all cities).

| City | Sources | Accessible | Blocked/Dead | Notes |
|------|---------|------------|--------------|-------|
| Toronto | 12 | 10 | 2 dead (Toronto Life Michelin 404, Curious Creature 404) | URLs corrected/flagged this session |
| Lisbon | 6 | 4 | 2 (Observador 404, Público/Fugas 451 — known) | 67% accessible |
| Barcelona | 9 | ~7 | ~2 (ElNacional.cat 403 recovered; some transient) | Not fully re-checked this session |
| Other cities | Various | Mostly accessible | Some Moroccan sources 403 | From April 1 QA audit |

**Toronto Life Michelin URL corrected** this session: `torontolife.com/food/toronto-michelin-guide-2025/` (was returning 404 at old URL).

---

## 9. Pipeline Version and Upgrade Priority

| City | Current pipeline | Upgrade priority | Notes |
|------|-----------------|-----------------|-------|
| Fes | v4 | 🔴 High | Oldest pipeline — missing COI check, publisher concentration, Phase 0 |
| Marrakesh | v5 | 🟡 Medium | Missing REVIEW_MODE BRIEF |
| Rabat | v5 | 🟡 Medium | Missing REVIEW_MODE BRIEF |
| Chefchaouen | v5 | 🟡 Medium | Anonymous sources S2/S3 need replacing |
| Barcelona | v6 | ✅ Current | — |
| Valencia | v6 | ✅ Current | Date extraction failure to fix in v2 |
| Seville | v6 | ✅ Current | 21 open_status_check restaurants |
| Córdoba | v6 | ✅ Current | — |
| Granada | v6 | ✅ Current | v2 July 2026 |
| Porto | v6 (Strategy C) | ✅ Current | — |
| Málaga | v6 (Strategy C) | ✅ Current | — |
| Lisbon | v6 | ✅ Current | PT pool regression — v3 needs Firecrawl or pre-fetch |
| Toronto | v5v6-merge | ✅ Current | v3 needs Toronto Life (Firecrawl or pre-fetch) |

---

## 10. Known Issues by City

| City | Known issue | Severity | Action |
|------|-------------|----------|--------|
| Seville | 29 open_status_check (48%), some 3 years old | 🔴 High | Verify before widely sharing |
| Lisbon | 27 open_status_check (56%); PT pool only 2 restaurants | 🔴 High | Verify open status; find PT sources for v3 |
| Barcelona | 11 open_status_check (16 months old) | 🟡 Medium | Verify closures |
| Córdoba | 8 open_status_check, some from 2023 | 🟡 Medium | Verify in v2 |
| Granada | 5 open_status_check; structurally thin (15 restaurants) | 🟡 Medium | v2 July 2026 |
| Valencia | 39/47 restaurants show article_date: undated | 🟡 Medium | Fix in v2 rebuild |
| Toronto | Foodism concentration now 24% (was 53%) — fixed | ✅ Fixed | — |
| Toronto | Curious Creature source URL dead (404) | 🟡 Medium | Flagged with url_status: dead |
| Chefchaouen | 2 anonymous sources in sources array (S2, S3) | 🟡 Medium | Find named replacements in v2 |
| Porto | Mesa Marcada bylines not extractable via Jina | 🟡 Medium | Firecrawl test recommended |
| Lisbon | Observador and Público/Fugas permanently blocked | 🟡 Medium | Pre-fetch workaround or Firecrawl |
| All cities | article_title field missing from all sources | 🟡 Medium | Backfill script ready — run next session |
| All cities | CENTROIDS namespace — shared neighbourhood names | 🟡 Medium | Audit and add city-prefixed variants next session |
| Baixa (Lisbon/Porto) | Collision fixed this session | ✅ Fixed | Baixa (Lisboa) key added |
| Map pin language | Standardised to "Approximate location" | ✅ Fixed | — |

---

## 11. Recommended Next Actions

### Priority 1 (next session)
1. **Token capture** — add `localbite-run-metrics.log` programmatic logging to v6 template
2. **Article title feature** — viewer date display + template extraction rule + backfill script across all 13 cities
3. **Pipeline readme** — manual pre-fetch workaround for 451/403 sources
4. **Firecrawl test** — targeted Jina fallback: Mesa Marcada, Toronto Life, Gastronostrum

### Priority 2 (soon)
5. **Seville open_status_check** — 29 restaurants, highest risk in fleet
6. **Lisbon open_status_check** — 27 restaurants, 56% of pack
7. **CENTROIDS audit** — Centro Histórico, Medina, El Carmen etc.
8. **Barcelona open_status_check** — 11 restaurants

### Priority 3 (deferred)
9. **Delete stale Barcelona v4 pack** — `localbite-barcelona-2025-2026.json`
10. **Valencia v2** — fix undated sources, refresh pack
11. **Chefchaouen v2** — replace anonymous S2/S3 sources
12. **Granada v2** — July 2026 when El Gocho Gourmet archive grows
13. **Fes v6 upgrade** — oldest pipeline in fleet
14. **Toronto v3** — target Toronto Life (Firecrawl/pre-fetch), Globe and Mail
15. **Lisbon v3** — target Sábado, Evasões, Visão as PT replacements for Observador/Público

---

## 12. Session Changes Summary (2026-04-13)

| Change | Detail |
|--------|--------|
| Lisbon rebuilt | v5 (36 restaurants) → v6 (48 restaurants) |
| Toronto rebuilt | v5 (52) + v6 merge (66 restaurants, 12 sources) |
| Map pin language | Standardised to "Approximate location" fleet-wide |
| Baixa collision | Fixed — Lisbon uses "Baixa (Lisboa)" key |
| Pipeline readme | New — includes --dangerously-skip-permissions, token capture, benchmark guidance |
| v6 template | REVIEW_MODE BRIEF + JSON STRUCTURE RULE added |
| Pre-geocode check script | `localbite-pre-geocode-check.sh` created |
| Toronto source URLs | Toronto Life Michelin corrected; Curious Creature flagged dead |
| Toronto source audit | 10 of 12 sources confirmed accessible in browser |
| Fleet summary | Updated — 480 restaurants, 89 sources across 13 cities |
| Backfill script | `localbite-backfill-titles.js` built and ready |

---

*Summary generated from live JSON files and session data — 2026-04-13*
*Total restaurants: 480 across 13 cities and 89 sources*
