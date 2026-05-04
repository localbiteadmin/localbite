# LocalBite — Next Session Plan
*Following session: "Both-pool definition confirmed, 119→233 consensus picks, Objective 3 UI complete"*
*Prepared: 2026-05-04*

---

## Suggested Session Title
"Engineering P0 fixes + Part 1 prep for Rome, Madrid, Barcelona rebuilds"

---

## Context — What This Session Completed

- Both-pool definition confirmed and implemented: publisher independence only, language irrelevant
- Fleet recomputed: 119BP (9.2%) → 233BP (18.1%), net +114 consensus picks
- postrun.js Fix 4, pipeline template, and all 41 city JSONs updated simultaneously
- Full Objective 3 UI shipped: consensus picks toggle, clickable chips, writer attribution removed, badge text updated, sort fixed
- Milan source id fix, writer profile contamination repaired (Bologna, Genoa, Modena)
- index.html: 2,348 lines (was 2,380, net -32)

---

## Pre-Session Checklist

```bash
cd /Users/harryenchin/Documents/GitHub/localbite
python3 /tmp/fleet.py
wc -l index.html
grep -n "Fix 2\|Fix 3\|sources list\|landmark" localbite-postrun.js | head -10
```

Verify:
- Fleet shows 41 cities, 1,288R, 233BP
- index.html under 2,500 lines
- Fix 2 and Fix 3 status confirmed before any pipeline work

---

## Session Objectives — Priority Order

### Objective 1 — Engineering P0 fixes (implement before any pipeline run)

**Fix 2 (~50 min): postrun.js Step 1.5 sources list→dict auto-repair**

When the pipeline compacts and reconstructs, sources may be written as a list instead of the required dict. Currently requires manual detection and conversion. Fix: postrun.js Step 1.5 detects list format and converts to dict automatically before processing.

Implementation: after the existing `sourcesArray` normalization, add:
```javascript
if (Array.isArray(data.sources)) {
  const srcDict = {};
  data.sources.forEach(s => { const k = s.id || s.source_id; if (k) srcDict[k] = s; });
  data.sources = srcDict;
  autoRepaired++;
}
```

Test: run postrun on a city with known list-format sources (check git history for Venice or Palermo compaction artifacts).

**Fix 3 (~90 min): geocode.js landmark/street false positive detection (Italian cities only)**

Common false positives: Via [Name], Piazza [Name], church names, museum names, city name itself. Current workflow requires manual review and nulling after every Italian postrun.

Implementation: after geocoding, if geo_matched_name matches patterns (Via, Viale, Piazza, Ponte, Chiesa, Museo, Villa + city name itself), auto-null and set geo_skip: true.

Note: universal (all-country) implementation deferred — Italian city false positive patterns are well-documented and distinct.

Test: run geocode.js on Naples or Genoa data and verify known false positives (Via Attilio Micheluzzi, Villa Pignatelli, etc.) are auto-nulled.

**Pre-research template fix (~30 min): Add Search 8 and Search 9**

Add to localbite-part1-preresearch-template.txt:
- Search 8: `[city] critico gastronomico ristoranti nome giornalista sito 2024 2025` (for Italian cities) OR `[city] newspaper food critic named 2024 2025` (for non-Italian)
- Search 9: `[country] national food column restaurant [city] 2024 2025`

Note: these searches target both newspaper critics AND local food sites — include "sito" in Italian queries.

---

### Objective 2 — Data fixes

**Rome: Remove Antico Caffè Greco (permanently closed Oct 8, 2025)**

Simple JSON edit — remove the restaurant entry. Run postrun after to update index. Verify fleet drops to 1,287R.

```bash
# After removing from JSON:
node localbite-postrun.js localbite-rome-italy-2023-2026.json
python3 /tmp/fleet.py  # should show 1,287R
git add localbite-rome-italy-2023-2026.json localbite-index.json
git commit -m "data: remove Antico Caffè Greco — permanently closed Oct 2025"
```

**Trieste: Viewer smoke test**

5-item check: city loads, cards appear, chips visible, Sources panel opens, consensus pick badge correct.

**CiboToday vs Cibo Today naming inconsistency**

Modena uses "Cibo Today" (two words), other cities use "CiboToday" (one word). These are treated as different publications in the both_pool computation. Check if they are genuinely the same publisher — if so, fix Modena's publication name to match the fleet standard.

---

### Objective 3 — Part 1 file updates for justified rebuilds

Only three cities justify a rebuild now:

**Rome:**
- Add Puntarella Rossa / Veronica Guerrini as DIRECT_FETCH_SOURCE (independent IT publisher, article fetchable Oct 2024, Grappolo d'Oro confirmed)
- Kate Parla 64% concentration — rebuild trigger already documented
- Expected gain: several new IT/EN consensus picks

**Madrid:**
- Add ABC Salsa de Chiles / Carlos Maribona (Vocento, ES, 403 geo-block note, user-accessible) as DIRECT_FETCH_SOURCE
- Add Complicidad Gastronómica / Isaac Agüero Fuentes (independent, ES, fetchable) as DIRECT_FETCH_SOURCE
- Add La Razón / Tatiana Ferrandis (site-blocked, null article_url, fetch limitation documented) as DIRECT_FETCH_SOURCE
- Expected gain: 5-8 new consensus picks (Haramboure, La Tasquita, Sacha confirmed overlap)
- Vocento conflict check: clear — no other Vocento source in Madrid pack

**Barcelona:**
- Add Observación Gastronómica / Philippe Regol (independent, ES, fetchable) as DIRECT_FETCH_SOURCE — 4 pack restaurants confirmed: Franca, Arraval, Casa Fiero, Finorri
- Eixample centroid HIGH SPREAD — rebuild trigger already documented
- Expected gain: 4+ new consensus picks immediately from confirmed overlap

**Do NOT update Part 1 files for:** Venice, Trieste, Turin, Málaga — effort-to-gain ratio too low for single-source additions.

**Write Part 1 updates and commit as docs (no pipeline runs in this session).**

---

### Objective 4 — Pipeline batch planning (plan only, don't launch)

After Part 1 files are written, plan the pipeline batch:

- Rome and Barcelona can run simultaneously (different source languages, different search volumes)
- Madrid is heavier (3 new sources + existing 9 sources = high search volume) — run separately
- Stagger launches by 20 minutes
- postrun.js must run sequentially after each city completes

Estimated: 2 pipeline sessions (Rome + Barcelona together, Madrid separately).

---

## Risks and Mitigations

| Risk | Mitigation |
|------|-----------|
| Fix 2 or Fix 3 have edge cases | Test on known-problematic cities before fleet-wide use |
| Rome rebuild loses existing BP | Check git history before accepting any regression |
| Madrid concentration cap triggered by 3 new sources | Document if any source exceeds 30% — don't trim blindly |
| Barcelona rebuild disrupts Eixample centroid | Run hood-check.py after postrun |
| CiboToday / Cibo Today are genuinely different publishers | Verify before standardising name |

---

## Session Hard Stop Rules

- No new pipeline work after hour 4
- Do not start a pipeline run if P0 fixes are not complete
- If Fix 2 or Fix 3 take longer than estimated, defer Part 1 updates to a subsequent session

---

## Files to Have Ready

- localbite-part1-preresearch-template.txt (for Search 8/9 addition)
- localbite-rome-italy-2023-2026.json (for Antico Caffè Greco removal)
- localbite-prompt-v71-rome-italy-part1.txt (for Puntarella Rossa addition)
- localbite-prompt-v71-madrid-part1.txt (for new sources)
- localbite-prompt-v71-barcelona-part1.txt (for Regol addition)
