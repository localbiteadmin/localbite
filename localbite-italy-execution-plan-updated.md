# LocalBite Italy — Execution Plan (UPDATED)
*Updated: 2026-04-27 (Session: Italy Part 1 Pre-Research — 17 Cities)*
*Supersedes: localbite-italy-execution-plan.md from Session 1 2026-04-27*

---

## Status

Pre-research searches completed for all 17 cities.
Rome and Milan Part 1 files are ready to launch.
Remaining Part 1 files (Florence, Naples, and below) pending final Michelin verification.

---

## Key Changes from Previous Draft

1. **Milan EN writer gap: RESOLVED.** Jaclyn DeGiorgio (asignorinainmilan.com) confirmed as qualified named EN food writer with monthly roundups from 2024–2025.

2. **Trento and Matera: RECOMMEND PARKING.** No qualifying sources found in pre-research for either city. Threshold risk is very high. Decision: run last, only after confirming earlier batches produce publishable packs.

3. **Naples disambiguation: UPGRADED TO SEVERE.** Confirmed empirically — Naples Florida contamination occurs even with "Italy" in query. All queries MUST use "Napoli" or "Naples Italy."

4. **Verona 3★ confirmed.** Casa Perbellini 12 Apostoli received 3 stars in November 2024 Michelin ceremony. Must be in MICHELIN_STARRED_EXCLUSIONS.

5. **Venice bounding box critical.** Must cover islands only — Mestre (administratively part of Comune di Venezia but geographically separate) must be excluded.

6. **Bologna 2★ (San Domenico, Imola) auto-excluded by geography.** ~35km outside Bologna city bounding box.

---

## City Status Summary

| City | Batch | Writers (EN) | Writers (IT) | Michelin 3★ | Confidence | Status |
|------|-------|-------------|-------------|-------------|-----------|--------|
| Rome | A | Katie Parla, Elizabeth Minchilli | Phase 1 | La Pergola | HIGH | Part 1 READY |
| Milan | B | Jaclyn DeGiorgio, The Infatuation | Phase 1 | Enrico Bartolini (MUDEC) | MED-HIGH | Part 1 READY |
| Florence | C | Emiko Davies, Katie Parla | Phase 1 | Enoteca Pinchiorri | HIGH | Needs Michelin verify |
| Naples | C | Katie Parla | Luciano Pignataro | None (city) | HIGH | Needs Michelin verify |
| Bologna | D | Katie Parla | Phase 1 | None (city) | MEDIUM | Needs Michelin verify |
| Turin | D | TBC (gap) | Phase 1 | None confirmed | MED-LOW | Needs writer confirm |
| Venice | E | Katie Parla, Elizabeth Minchilli | Phase 1 | None (island) | MEDIUM | Needs bounding box |
| Palermo | E | Culinary Backstreets | Phase 1 | None confirmed (2★) | MEDIUM | Needs Michelin verify |
| Verona | E | Phase 1 only | Phase 1 | Casa Perbellini (3★) | LOW | Needs sources |
| Modena | F | Katie Parla | Phase 1 | Osteria Francescana | HIGH | Needs Michelin verify |
| Genoa | F | Phase 1 only | Phase 1 | None confirmed (COI 1★) | LOW | Gap |
| Bari | F | Katie Parla (verify), Sophie Minchilli (verify) | Phase 1 | TBC | MED-LOW | Needs URL confirm |
| Lecce | F | Katie Parla (verify), Sophie Minchilli (verify) | Phase 1 | TBC | MEDIUM | Needs URL confirm |
| Catania | G | Phase 1 only | Phase 1 | TBC | LOW | Gap |
| Trieste | G | Phase 1 only | Phase 1 | TBC | LOW | Gap |
| Trento | G | None | None | TBC | VERY LOW | ⚠ PARK? |
| Matera | G | None | None | 1★ (1 restaurant) | VERY LOW | ⚠ PARK? |

---

## Batch Sequence

### Batch A — Rome (solo)
**Session:** 1 Claude Code session
**Pipeline:** Single 3-hour run expected
**Terminal assignment:** T1: Rome pipeline
**When:** First available session after Part 1 files complete
**Part 1:** READY (localbite-prompt-v71-rome-italy-part1.txt)
**Outstanding before launch:**
- [ ] Verify 3rd Rome 2★ name at guide.michelin.com/it/lazio/roma
- [ ] Verify full Rome 1★ list (14 restaurants) at guide.michelin.com/it
- [ ] Add all verified Rome starred names to Part 1 MICHELIN_STARRED_EXCLUSIONS
- [ ] Add Rome bounding box to geocode.js CITY_BOXES

---

### Batch B — Milan (solo)
**Session:** 1 Claude Code session (launch 20 min after Rome if running same session, or separate session)
**Pipeline:** Single 3-hour run expected
**Terminal assignment:** T2: Milan pipeline (or T1 if separate session)
**When:** After Rome is complete or in parallel
**Part 1:** READY (localbite-prompt-v71-milan-italy-part1.txt)
**Outstanding before launch:**
- [ ] Verify all 4 Milan 2★ names at guide.michelin.com/it/lombardia/milano
- [ ] Verify Olmo address (Cornaredo vs. Milan city)
- [ ] Verify Gambero Rosso COI status for Milan (Città del gusto presence)
- [ ] Add verified Milan starred names to Part 1 MICHELIN_STARRED_EXCLUSIONS
- [ ] Add Milan bounding box to geocode.js CITY_BOXES

---

### Batch C — Florence + Naples
**Session:** 2 Claude Code sessions (stagger 20 min apart)
**Terminal assignment:** T1: Florence, T2: Naples
**When:** After Batch A/B postrun complete
**Part 1 files:** To write (after Michelin verification)
**Outstanding before writing Part 1:**
- [ ] Verify Florence full starred list 2026 (9 restaurants confirmed)
- [ ] Verify Naples city 1★ list (ARIA, Veritas, Alain Ducasse confirmed; check for others)
- [ ] Add Florence + Naples bounding boxes to geocode.js

---

### Batch D — Bologna + Turin
**Session:** 2 Claude Code sessions (stagger 20 min apart)
**Terminal assignment:** T1: Bologna, T2: Turin
**Risk flag:** Turin EN writer gap. If no qualifying EN source is confirmed in pre-pipeline research, consider running Turin as IT-only or pairing Turin with a different city later.
**Outstanding before writing Part 1:**
- [ ] Verify Bologna city 1★ restaurant name (Via Indipendenza 69)
- [ ] Find Turin named writer (EN or IT) — critical gap
- [ ] Research La Stampa food critic name for Turin
- [ ] Verify Turin full Michelin list
- [ ] Add bounding boxes

---

### Batch E — Venice + Palermo + Verona
**Session:** 3 Claude Code sessions (stagger 20 min each)
**Terminal assignment:** T1: Venice, T2: Palermo, T3: Verona
**Risk flag:** Venice bounding box must be islands-only. Verona is the lowest-confidence city in this batch.
**Outstanding before writing Part 1:**
- [ ] Verify Venice island starred list (NOT Mestre/Terraferma)
- [ ] Verify Palermo full starred list (beyond Gagini + Mec)
- [ ] Verify Verona full starred list (Casa Perbellini 3★ confirmed)
- [ ] Find any Palermo IT food writer — critical for both-pool
- [ ] Add bounding boxes (Venice islands-only bounding box is critical)

---

### Batch F — Genoa + Bari + Modena + Lecce
**Session:** 4 Claude Code sessions (stagger 20 min each)
**Terminal assignment:** T1: Modena, T2: Bari, T3: Lecce, T4: Genoa
**Launch order:** Start with Modena (highest confidence), then Bari, then Lecce, then Genoa
**Note:** Modena + Bari + Lecce are feasible. Genoa is the genuine question mark in this batch.
**Outstanding before writing Part 1:**
- [ ] Verify Bari + Lecce: confirm Katie Parla and Sophie Minchilli have qualifying article URLs for these cities
- [ ] Find Genoa named IT food writer — currently a gap
- [ ] Verify Modena full starred list (beyond Osteria Francescana)
- [ ] Verify Il Marin Genoa COI situation (inside Eataly)
- [ ] Add bounding boxes

---

### Batch G — Catania + Trieste + (Trento?) + (Matera?)
**Session:** 2–4 Claude Code sessions depending on Trento/Matera decision
**Terminal assignment:** T1: Catania, T2: Trieste, T3: Trento (if running), T4: Matera (if running)
**Decision point for Trento/Matera:** After Batch F results are assessed
  - If thin cities (Genoa, Verona) produce ≥10R → proceed with Trento + Matera
  - If thin cities produce <10R consistently → park Trento and Matera as "coming soon"
**Outstanding:**
- [ ] Find any Catania food writer (IT or EN)
- [ ] Find any Trieste food writer (IT or EN)
- [ ] Make final Trento/Matera decision after Batch F results
- [ ] Verify Matera starred restaurant name (Vitantonio Lombardo)
- [ ] Add bounding boxes

---

## geocode.js CITY_BOXES Required

All 17 cities need bounding boxes added to geocode.js before their respective pipelines run.
The pipeline will fail geocoding validation without them.

Priority additions (before Batch A/B):
```
// Italy — verified bounding boxes (estimated — verify against OSM before committing)
'rome-italy':    { min_lat: 41.80, max_lat: 42.00, min_lng: 12.30, max_lng: 12.60 },
'milan-italy':   { min_lat: 45.40, max_lat: 45.52, min_lng: 9.10,  max_lng: 9.30  },
'naples-italy':  { min_lat: 40.80, max_lat: 40.92, min_lng: 14.18, max_lng: 14.33 },
'florence-italy':{ min_lat: 43.70, max_lat: 43.85, min_lng: 11.19, max_lng: 11.35 },
'bologna-italy': { min_lat: 44.47, max_lat: 44.53, min_lng: 11.29, max_lng: 11.40 },
'modena-italy':  { min_lat: 44.62, max_lat: 44.68, min_lng: 10.87, max_lng: 10.96 },
'turin-italy':   { min_lat: 45.02, max_lat: 45.11, min_lng: 7.61,  max_lng: 7.73  },
// Venice — ISLANDS ONLY. Mestre is excluded.
'venice-italy':  { min_lat: 45.41, max_lat: 45.46, min_lng: 12.30, max_lng: 12.39 },
'palermo-italy': { min_lat: 38.08, max_lat: 38.16, min_lng: 13.31, max_lng: 13.42 },
'verona-italy':  { min_lat: 45.41, max_lat: 45.48, min_lng: 10.96, max_lng: 11.03 },
'genoa-italy':   { min_lat: 44.38, max_lat: 44.46, min_lng: 8.87,  max_lng: 9.01  },
'bari-italy':    { min_lat: 41.07, max_lat: 41.16, min_lng: 16.81, max_lng: 16.91 },
'catania-italy': { min_lat: 37.47, max_lat: 37.55, min_lng: 15.04, max_lng: 15.14 },
'trieste-italy': { min_lat: 45.62, max_lat: 45.68, min_lng: 13.72, max_lng: 13.81 },
'trento-italy':  { min_lat: 46.04, max_lat: 46.09, min_lng: 11.09, max_lng: 11.15 },
'lecce-italy':   { min_lat: 40.33, max_lat: 40.38, min_lng: 18.14, max_lng: 18.21 },
'matera-italy':  { min_lat: 40.62, max_lat: 40.69, min_lng: 16.56, max_lng: 16.64 },
```

⚠ VERIFY all bounding boxes against OpenStreetMap before committing to geocode.js.
The Venice bounding box above (islands only) is especially critical — verify it does not
include Mestre (lat ~45.47–45.50, lng ~12.22–12.26).

---

## Publish Threshold Reminder

≥10R minimum before publishing any city pack.
Cities below threshold → mark "coming soon" in localbite-index.json.

Risk cities for threshold: Verona, Genoa, Trieste, Catania, Trento, Matera.
Do not commit to publishing these until actual restaurant count is confirmed.

---

## Pre-Launch Checklist (Required Before ANY Italian Pipeline)

- [ ] geocode.js CITY_BOXES updated for target city — committed to repo
- [ ] Michelin starred list complete for target city — all stars in Part 1
- [ ] DIRECT_FETCH_SOURCES have confirmed, working article-level URLs
- [ ] Geography disambiguation instructions present (Naples = mandatory)
- [ ] Part 1 file complete and combined with v7.1 template
- [ ] localbite-index.json has an entry with "coming_soon": true for the city
- [ ] CITY_CENTRES and CITY_BOUNDS entries planned for postrun to add to index.html
