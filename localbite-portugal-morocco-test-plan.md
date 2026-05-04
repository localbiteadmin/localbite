# LocalBite — Portugal & Morocco Writer Discovery Test Plan
*Mirrors the Italy test (2026-05-01). Run extract script first, upload JSON, then execute phases.*

---

## Cities in Scope

| City | Country | R | BP | BP% | Sources | Notes |
|------|---------|---|----|----|---------|-------|
| Lisbon | Portugal | 24 | 3 | 13% | 6 | → 38% after def change |
| Porto | Portugal | 17 | 0 | 0% | 4 | 0BP despite 4 sources — likely all EN |
| Fes | Morocco | 21 | 3 | 14% | 4 | Arabic gap structural |
| Marrakesh | Morocco | 42 | 5 | 12% | 6 | Arabic gap structural |
| Rabat | Morocco | 5 | 0 | 0% | 2 | Too thin for Phase C |
| Chefchaouen | Morocco | 2 | 0 | 0% | 1 | Too thin for Phase C |

**Fleet total for these 6 cities: 111R, 11BP (9.9%)**

---

## Step 0 — Run the Extract Script

```bash
cd /Users/harryenchin/Documents/GitHub/localbite
python3 extract-portugal-morocco.py
```

Upload `localbite-portugal-morocco-extract.json` to Claude.

---

## Key Differences from Italy Test

### Morocco
- **Language landscape**: EN + FR (visitor writers) + Arabic (confirmed structural gap)
- **Both-pool under current definition**: EN + FR = cross-language = BP ✓
- **Both-pool under new definition**: Publisher independence only — EN and FR from independent publishers still creates BP, so the definition change has minimal impact on Morocco's BP count
- **Arabic gap**: Confirmed closed — Hespress/Goud.ma returned no food content across multiple pipeline attempts. Phase B for Arabic press is informational only, not expected to yield actionable sources.
- **Thin cities**: Rabat (5R) and Chefchaouen (2R) — run Phase B only for context; skip Phase C entirely
- **French sources skew visitor**: Current FR sources (Nos Voyages Heureux, Luxe Infinity Maroc, Miss Konfidentielle) are French tourist bloggers, not Morocco-resident writers. The priority is finding Moroccan-based FR writers or Moroccan French-language media.

### Portugal
- **Language landscape**: EN (travel writers) + PT (Portuguese press)
- **Both-pool under current definition**: EN + PT = cross-language = BP ✓
- **Porto at 0BP**: With 4 sources and 0BP, Porto's sources are almost certainly all EN — confirms there is no PT source in the pack. Definition change to publisher independence: if all 4 Porto sources are EN from different publishers, they all become BP. Porto could jump from 0% to a high BP% on definition change alone.
- **Público/Fugas**: 451 geo-blocked, confirmed permanent access barrier — do not attempt
- **Known PT press**: Time Out Lisboa (PT edition), Observador, Visão, Jornal de Notícias, Público (paywall/451), Eater Portugal (does it exist?)

---

## Phase A — Country-Level Named Critics

### Portugal searches (2)
1. `Portugal food critic named journalist restaurant review 2024 2025`
2. `crítico gastronómico Portugal jornal restaurante Lisboa Porto 2024 2025`

**Looking for**: Named PT-language food critics at Observador, Jornal de Notícias, Visão, Time Out PT, or independent PT food publications. Goal: populate DIRECT_FETCH_SOURCES for Porto (which has no PT source).

### Morocco searches (2)
1. `Morocco food writer restaurant critic French named 2024 2025`
2. `journaliste gastronomique Maroc restaurant Fes Marrakech 2024 2025`

**Looking for**: Morocco-resident FR-language food writers or Moroccan French-language media (TelQuel, Le360, Médias24 food sections) with named bylines. These would be local voices, not French tourist bloggers.

---

## Phase B — City-Level Regional Press

### Portugal — Lisbon (6 sources, 3BP)

**Already in pack**: 6 sources identified. Lisbon is relatively well-served. Phase B focus: find PT-language sources not already in the pack.

| Publication to check | Language | Independence check |
|---------------------|----------|-------------------|
| Observador food section | PT | Independent digital — not in any pack |
| Time Out Lisboa (PT ed.) | PT | Same publisher as Time Out EN — check if both in pack |
| Jornal de Notícias | PT | Regional press — independent |
| Público (Fugas section) | PT | ❌ 451 geo-blocked, confirmed permanent barrier |

**Search**: `"Time Out Lisboa" OR "Observador" restaurantes Lisboa crítico gastronomico nome 2024 2025`

### Portugal — Porto (4 sources, 0BP)

Porto is the diagnostic priority. 0BP from 4 sources = almost certainly all-EN pack. Any PT source covering the same restaurants creates immediate BP under current definition.

| Publication to check | Language | Notes |
|---------------------|----------|-------|
| Fugas/Público Porto | PT | ❌ 451 geo-blocked |
| Porto. food magazine | PT/EN | Independent Porto food publication? |
| Observador Porto | PT | Worth checking |
| Boa Cama Boa Mesa | PT | Portuguese restaurant guide (Expresso) |

**Searches**:
1. `Porto restaurantes crítico gastronomico nome jornal artigo 2024 2025`
2. `"Boa Cama Boa Mesa" OR "Observador" melhores restaurantes Porto 2024 2025`

### Morocco — Fes (4 sources, 3BP)

Fes original pipeline found only EN + FR. Phase B: check for any named-byline Moroccan French-language press covering Fes restaurants.

| Publication to check | Language | Notes |
|---------------------|----------|-------|
| TelQuel food section | FR | Major Moroccan French magazine |
| Le360 lifestyle | FR | Moroccan news site, FR edition |
| Médias24 | FR | Moroccan business/lifestyle |
| Hespress food | AR | ❌ Confirmed structural gap |
| Goud.ma | AR | ❌ Confirmed 404 |

**Search**: `TelQuel OR Le360 OR Médias24 restaurant Fès gastronomie nom auteur 2024 2025`

### Morocco — Marrakesh (6 sources, 5BP)

Marrakesh is relatively strong. Phase B: same Moroccan press check + look for any new EN sources not already in the pack.

**Search**: `TelQuel OR Le360 restaurant Marrakech gastronomie nom journaliste 2024 2025`

### Morocco — Rabat & Chefchaouen (informational only)

Phase B for context only — these cities are too thin for actionable results.

**Search (combined)**: `restaurant Rabat OR Chefchaouen critique gastronomique nom auteur 2024 2025`

---

## Phase C — Restaurant-Anchored Searches

### Portugal — Porto (top priority)

Porto's non-BP restaurants are the key Phase C target. Every multi-source Porto restaurant should be checked for PT-language coverage, since any PT source touching a Porto restaurant = immediate BP under current definition.

**Target pattern**: For each Porto restaurant with 2+ sources (all likely EN), search for PT-language coverage.

**Searches**: 1 per top restaurant, up to 5 restaurants:
`"[Restaurant Name]" Porto restaurante crítico OR recomendação portugues 2024 2025`

### Portugal — Lisbon

Lisbon has 3BP from 6 sources. Phase C targets: non-BP restaurants with 2+ sources.

**Searches**: For non-BP Lisbon restaurants with 2+ sources (up to 3):
`"[Restaurant Name]" Lisboa crítico gastronómico português 2024 2025`

### Morocco — Fes

Fes has 3BP from 4 sources, 21 restaurants total. Phase C targets: non-BP Fes restaurants with 2+ sources.

**Searches**: For non-BP Fes restaurants with 2+ sources (up to 3):
`"[Restaurant Name]" Fès restaurant critique auteur 2024 2025`

### Morocco — Marrakesh

Marrakesh has 5BP from 6 sources, 42 restaurants. Phase C targets: non-BP restaurants with highest source counts.

**Searches**: For non-BP Marrakesh restaurants with 2+ sources (up to 4):
`"[Restaurant Name]" Marrakech restaurant critique auteur 2024 2025`

### Skip
- **Rabat**: 5R, 2 sources, 0BP — skip Phase C
- **Chefchaouen**: 2R, 1 source, 0BP — skip Phase C

---

## Expected Findings

### Portugal — most likely outcomes

**Lisbon**: Probably has a PT source already in the pack given 3BP. Phase B may surface additional PT sources not in pack but impact on BP count will be marginal.

**Porto**: 
- Under definition change: If all 4 sources are from different EN publishers → all become both-pool. Porto could jump from 0%→high% purely from definition change. This is the key diagnostic.
- Under current definition: Needs a PT source covering the same restaurants as existing EN sources. If found → immediate BP. If not found → 0BP stays until definition change.

### Morocco — most likely outcomes

**Fes + Marrakesh**: The definition change has little impact (EN+FR is already cross-language). New sources need to be genuinely new publishers covering the same restaurants. Moroccan-resident FR-language writers would be the highest value find.

**Arabic press**: Expected to confirm the pipeline's finding — no actionable Arabic-language sources findable via search. Worth one search to confirm, but not worth extended effort.

**TelQuel / Le360**: The most promising Moroccan press leads. If they have named food writers covering specific Fes or Marrakesh restaurants from 2023-2026, this is the best new source candidate for Morocco.

---

## Definition Change Impact Estimate

| City | Cur BP | Est BP (new def) | Est% | Key change |
|------|--------|-----------------|------|-----------|
| Lisbon | 3 | 9 | 38% | Most non-BP restaurants have different-publisher pairs |
| Porto | 0 | ? | ? | Unknown — depends on source language mix (extract will reveal) |
| Fes | 3 | 3-4 | 14-19% | EN+FR already cross-language; marginal gain from same-lang pairs |
| Marrakesh | 5 | 6-8 | 14-19% | Same as Fes |
| Rabat | 0 | 0-1 | 0-20% | Too thin |
| Chefchaouen | 0 | 0 | 0% | Single source — no change |

*Exact estimates will be refined once extract JSON is available and source language pairs confirmed.*

---

## Search Budget

| Phase | Searches | Cities |
|-------|----------|--------|
| Phase A | 4 | Country-level |
| Phase B | 8 | All 6 cities |
| Phase C | ~12 | Porto, Lisbon, Fes, Marrakesh |
| **Total** | **~24** | |

Manageable in a single session, well within rate limits.
