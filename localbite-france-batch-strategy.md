# France — Batch Strategy & Detailed Batch Assignments
# localbite-france-batch-strategy.md
# Produced: 2026-05-05

---

## Overview

10 cities. 4 batches. All FR-primary. 5 bilingual (FR+EN), 5 FR-only.
Estimated total searches: ~330 across all cities.
Estimated total restaurants: 400-600.

---

## Pre-Batch Fixes Required (do BEFORE any batch launches)

These are blocking. Do not launch any France pipeline without completing all three.

### Fix FR-1 — postrun.js: add 'fr' to language_pool both condition
Script: localbite-postrun-add-fr.py
Time: ~10 min (run script + verify + commit)
Why blocking: Without this, ALL French cities will have 0 consensus picks.

### Fix FR-2 — geocode.js: add France CITY_BOXES
Script: localbite-geocode-add-france.py
Time: ~10 min (run script + verify + commit)
Why blocking: Without this, geocoder cannot validate French restaurant coordinates.

### Fix FR-3 — viewer: add French language labels to index.html
Manual fix required. Add to loadCity() / filter functions:
  - poolLabel: 'fr': 'French'
  - langLabel: 'fr': 'FR'
  - poolOptions: ['fr', 'French sources']
Time: ~15 min (edit + verify in browser + commit)
Why blocking: Without this, French source chips show blank, pool filter broken.

### Fix FR-4 — index.json: add all 10 France cities as coming_soon
Time: ~15 min
Why blocking: Without index entries, viewer will 404 when city packs are committed.

### Fix FR-5 — .gitignore: add France file patterns
Add to .gitignore:
  localbite-paris-*.py
  localbite-lyon-*.py
  localbite-bordeaux-*.py
  localbite-marseille-*.py
  localbite-nice-*.py
  localbite-toulouse-*.py
  localbite-strasbourg-*.py
  localbite-nantes-*.py
  localbite-montpellier-*.py
  localbite-biarritz-*.py
Time: ~10 min

Total pre-batch fix time: ~60 min. Complete all before launching Batch A.

---

## Batch Assignments

### BATCH A — Paris (solo run)
Cities: Paris
Launch: Solo (no concurrent runs)
Stagger: N/A
Expected searches: ~36 (bilingual, many angles)
Expected restaurants: 100-150 (largest city, many sources)
Expected CPs: 15-30 (EN + FR sources available)
Part 1 file: localbite-prompt-v71-paris-france-part1.txt
Full prompt: localbite-paris-france-full.txt
Output: localbite-paris-france-2023-2026.json

Rationale: Paris requires solo run because:
1. Expected >100 restaurants — compaction risk is high if run with another city
2. Most complex source pool (6 DIRECT_FETCH_SOURCES, multiple national publications)
3. 100+ Michelin-starred restaurants to cross-check and exclude
4. Risk of rate limit exhaustion if paired with another heavy city
5. Any issues with the first France run should be isolated to one city

Launch instructions:
  cd /Users/harryenchin/Documents/GitHub/localbite
  python3 combine-france-prompts.py localbite-prompt-v7-template.txt --city paris
  claude --dangerously-skip-permissions
  > Read localbite-paris-france-full.txt and run the full pipeline now.

Post-run steps:
  node postrun.js localbite-paris-france-2023-2026.json
  node approve-centroids.js localbite-paris-france-2023-2026.json
  python3 localbite-sync-bothpool.py localbite-paris-france-2023-2026.json
  git add localbite-paris-france-2023-2026.json localbite-paris-france-audit.txt
  git commit -m "data: Paris v7.1 — NR/NCP/Nsrc"
  git push

---

### BATCH B — Lyon + Marseille + Bordeaux (three major food cities)
Cities: Lyon, Marseille, Bordeaux
Launch: 3 concurrent sessions, staggered 20 min
Expected searches: ~108 (36 each × 3)
Expected restaurants: 120-180 total (40-60 each)
Expected CPs: Lyon 8-15, Marseille 8-15, Bordeaux 6-12

Launch order and timing:
  T+0 min: Lyon
  T+20 min: Marseille
  T+40 min: Bordeaux

Part 1 files:
  localbite-prompt-v71-lyon-france-part1.txt
  localbite-prompt-v71-marseille-france-part1.txt
  localbite-prompt-v71-bordeaux-france-part1.txt

Rationale:
- These are the three cities with confirmed, strong named FR sources
  (Mailhes/TdL for Lyon, Psaltis/Grand Pastis for Marseille, Lataillade/P&P for Bordeaux)
- All three are bilingual — expected CP production
- Best quality batch after Paris
- Running these together maximises the strongest France cities

Full prompt generation:
  python3 combine-france-prompts.py localbite-prompt-v7-template.txt --city lyon
  python3 combine-france-prompts.py localbite-prompt-v7-template.txt --city marseille
  python3 combine-france-prompts.py localbite-prompt-v7-template.txt --city bordeaux

---

### BATCH C — Nice + Toulouse + Strasbourg
Cities: Nice, Toulouse, Strasbourg
Launch: 3 concurrent sessions, staggered 20 min
Expected searches: ~96 (Nice ~36 bilingual, Toulouse ~30 FR-only, Strasbourg ~30 FR-only)
Expected restaurants: 75-115 total
Expected CPs: Nice 5-12, Toulouse 0 (structural), Strasbourg 0 (structural)

Launch order and timing:
  T+0 min: Nice
  T+20 min: Toulouse
  T+40 min: Strasbourg

Part 1 files:
  localbite-prompt-v71-nice-france-part1.txt
  localbite-prompt-v71-toulouse-france-part1.txt
  localbite-prompt-v71-strasbourg-france-part1.txt

Rationale:
- Nice has a confirmed named critic (Jacques Gantié/Table Libre)
- Toulouse and Strasbourg are discovery-dependent but have distinctive food cultures
  (Basque/SW cuisine for Toulouse; Alsatian winstubs for Strasbourg)
- Manageable batch — Nice adds bilingual weight, T+S are leaner FR-only runs
- Toulouse and Strasbourg run last in their stagger as discovery-dependent
  (lower risk if they encounter rate limits)

Risk: Toulouse and Strasbourg have no confirmed DIRECT_FETCH_SOURCES.
  Pipeline relies entirely on Phase 1 discovery. If less than 10R found for either,
  mark as coming_soon and rebuild with better Part 1 at next session.

---

### BATCH D — Nantes + Montpellier + Biarritz/Bayonne
Cities: Nantes, Montpellier, Biarritz
Launch: 3 concurrent sessions, staggered 20 min
Expected searches: ~90 (30 each, all FR-only)
Expected restaurants: 60-100 total
Expected CPs: 0 for all three (structural — FR-only)

Launch order and timing:
  T+0 min: Nantes
  T+20 min: Montpellier
  T+40 min: Biarritz

Part 1 files:
  localbite-prompt-v71-nantes-france-part1.txt
  localbite-prompt-v71-montpellier-france-part1.txt
  localbite-prompt-v71-biarritz-france-part1.txt

Rationale:
- These are the three smaller cities with no confirmed sources
- All FR-only — straightforward single-language pipelines
- Lowest risk batch — failures here don't affect the main France presence
- Montpellier and Biarritz have thin-city risk; run them last to manage expectations
- Nantes launches first as it has the most developed food scene

Risk: All three may produce <20R. Set coming_soon threshold at <10R.
  Montpellier and Biarritz are most at risk.

---

## Session Sequence Recommendation

### Preparation session (current session — 2026-05-05)
✓ Web research for named critics (complete)
✓ Geocode patch script (localbite-geocode-add-france.py) — complete
✓ postrun.js fix script (localbite-postrun-add-fr.py) — complete
✓ combine-france-prompts.py — complete
✓ All 10 Part 1 files — complete
✓ Media ownership notes — complete
✓ Batch strategy — complete

### Session N+1 (next session — start of France work)
Phase A: Pre-batch fixes (60 min)
  1. Apply localbite-geocode-add-france.py
  2. Apply localbite-postrun-add-fr.py (with --dry-run first)
  3. Viewer FR language labels fix
  4. Add 10 France cities to index.json as coming_soon
  5. Update .gitignore
  6. Generate full prompts: python3 combine-france-prompts.py localbite-prompt-v7-template.txt
  7. Commit all: "chore: France prep — geocode boxes, postrun fr, viewer labels, index entries"

Phase B: Batch A — Paris (3-4 hours, solo run)
  8. Launch Paris pipeline (see instructions above)
  9. Post-run: postrun, approve-centroids, sync-bothpool, commit, push
  10. Smoke test Paris

Phase C: Batch B — Lyon + Marseille + Bordeaux (3-4 hours, staggered)
  11. Launch 3 pipelines with 20-min stagger
  12. Post-run each in order, commit each, push
  13. Smoke test each

Session N+2 (if Batches A and B complete):
  Phase D: Batch C — Nice + Toulouse + Strasbourg
  Phase E: Batch D — Nantes + Montpellier + Biarritz

---

## Expected France Fleet State After All Batches

| City | Expected R | Expected CPs | CPs Structural |
|------|-----------|-------------|----------------|
| Paris | 100-150 | 15-30 | Possible |
| Lyon | 40-60 | 8-15 | Possible |
| Bordeaux | 35-50 | 6-12 | Possible |
| Marseille | 40-60 | 8-15 | Possible |
| Nice | 30-40 | 5-12 | Possible |
| Toulouse | 30-40 | 0 | FR-only gap |
| Strasbourg | 25-35 | 0 | FR-only gap |
| Nantes | 25-35 | 0 | FR-only gap |
| Montpellier | 20-30 | 0 | FR-only gap |
| Biarritz | 20-30 | 0 | FR-only gap |

Total estimated: 365-530R, 42-84 CPs
Fleet impact: grows from 1,224R to ~1,600-1,750R (31-43% growth)

---

## Files Produced in This Preparation

| File | Purpose |
|------|---------|
| localbite-geocode-add-france.py | Patch CITY_BOXES in geocode.js |
| localbite-postrun-add-fr.py | Add 'fr' to language_pool both condition |
| combine-france-prompts.py | Generate full prompts from Part 1 + template |
| localbite-prompt-v71-paris-france-part1.txt | Paris Part 1 |
| localbite-prompt-v71-lyon-france-part1.txt | Lyon Part 1 |
| localbite-prompt-v71-bordeaux-france-part1.txt | Bordeaux Part 1 |
| localbite-prompt-v71-marseille-france-part1.txt | Marseille Part 1 |
| localbite-prompt-v71-nice-france-part1.txt | Nice Part 1 |
| localbite-prompt-v71-toulouse-france-part1.txt | Toulouse Part 1 |
| localbite-prompt-v71-strasbourg-france-part1.txt | Strasbourg Part 1 |
| localbite-prompt-v71-nantes-france-part1.txt | Nantes Part 1 |
| localbite-prompt-v71-montpellier-france-part1.txt | Montpellier Part 1 |
| localbite-prompt-v71-biarritz-france-part1.txt | Biarritz/Bayonne Part 1 |
| localbite-france-prep-notes.md | Media ownership + named writer research |
| localbite-france-batch-strategy.md | This file |
