# Fix 8 — Acceptance Test Plan
**Date:** 2026-05-07  
**Scope:** localbite-postrun.js Fix 8 + Fix 9  
**Must pass before:** any France city commit, any new pipeline batch

---

## Pre-flight

Save both scripts to repo root and confirm:
```bash
cd /Users/harryenchin/Documents/GitHub/localbite
ls localbite-apply-fix8.py localbite-schema-diag.py
```

---

## Step 0 — Dry run (no changes yet)

```bash
python3 localbite-apply-fix8.py
```

**Expected output:**
- "All 4 anchors verified."
- 4 patch lines: "Patch 1 applied ... Patch 2 applied ... Patch 3 applied ... Patch 4 applied"
- "DRY RUN complete. All 4 anchors verified. All 4 patches ready."
- Line count summary showing roughly +150-180 lines added

**If any anchor fails:** stop. Do not apply. Report the failing anchor.

---

## Step 1 — Apply the patch

```bash
python3 localbite-apply-fix8.py --apply
```

**Expected:** Same output as dry run but ending with "✓ localbite-postrun.js patched."  
**Verify backup written:** `ls -la localbite-postrun.js.fix8-backup`

---

## Step 2 — Pre-condition verification (confirm drifted packs diverge)

Run schema-diag on both drifted packs BEFORE recovery. Both must show DIVERGES.
Without this, we cannot confirm Fix 8 is actually fixing anything.

```bash
python3 localbite-schema-diag.py _drift-recovery/localbite-lyon-france-2023-2026.json.broken
python3 localbite-schema-diag.py _drift-recovery/localbite-marseille-france-2023-2026.json
```

**Expected:** Both output `✗ DIVERGES` with a list of issues including `geo_lat`, `geo_lng`, `writers`, etc. for Lyon and `geo`, `description`, `confidence` etc. for Marseille.  
**If either shows CONFORMS:** the pack was already repaired. Check _drift-recovery/ contents.

---

## Step 3 — Hard-fail trigger test

Confirm the hard-fail actually fires on a deliberately broken pack. Tests acceptance criteria #4.

```bash
python3 -c "
import json
d = json.load(open('localbite-paris-france-2023-2026.json'))
del d['city_slug']
json.dump(d, open('/tmp/test-hardfail.json','w'), indent=2)
"
node localbite-postrun.js /tmp/test-hardfail.json
echo "Exit code: $?"
rm /tmp/test-hardfail.json
```

**Expected:**  
- postrun prints `✗ HARD-FAIL — 1 schema error(s) remain after auto-repair:`  
- prints `• top-level: missing city_slug`  
- prints "This pack will not be committed. Park in _drift-recovery/ and investigate."  
- Exit code: 1  
- **Critical:** index.html must NOT be modified by this run. Verify: `git diff index.html` should show no changes.

**If hard-fail does not trigger:** Do not proceed. Fix the hard-fail block.

---

## Test 3 — Paris no-op (known-good pack, must not break)

This is the regression guard. Run on Paris FIRST because it's the France reference pack.

```bash
node localbite-postrun.js localbite-paris-france-2023-2026.json 2>&1 | tee /tmp/paris-fix8.log
```

**Expected in log:**
- `⚠  Auto-repaired N field(s)` — autoRepaired WILL be > 0 (Fix 8d adds ~10 new defaults per restaurant × 51 restaurants ≈ 500+ increments). This is EXPECTED and correct behaviour.
- `✓ Schema conformance check passed (51 restaurants, 4 sources)`
- No `✗ HARD-FAIL`
- No `entries renamed to restaurants` (Paris was not drifted)
- CITY_CENTRES: `✓ CITY_CENTRES — 'Paris' already present.` (not re-added)

**Noise field check — must be zero:**
```bash
python3 -c "
import json
d = json.load(open('localbite-paris-france-2023-2026.json'))
noise = ['geo_lat','geo_lng','writers','article_urls','tdl_rating','address','postcode','cuisine','flag','neighbourhood_hint','run_metrics','geo_centre','geo_bbox']
found = {f for r in d.get('restaurants',[]) for f in noise if f in r}
top_found = {f for f in noise if f in d}
print('Restaurant noise fields:', found or 'NONE')
print('Top-level noise fields: ', top_found or 'NONE')
"
```
**Expected:** Both lines show `NONE`

**Schema diagnostic:**
```bash
python3 localbite-schema-diag.py localbite-paris-france-2023-2026.json localbite-paris-france-2023-2026.json
```
**Expected:** `✓ CONFORMS` (comparing against itself — sanity check)

**Viewer check:** Open https://localbiteadmin.github.io/localbite/ — Paris should still load correctly. (Paris is already deployed — this confirms the file on disk hasn't been corrupted.)

**Do not commit.** Paris is already at the correct committed state.

---

## Test 1 — Lyon broken drift recovery

```bash
cp _drift-recovery/localbite-lyon-france-2023-2026.json.broken localbite-lyon-france-2023-2026.json
node localbite-postrun.js localbite-lyon-france-2023-2026.json 2>&1 | tee /tmp/lyon-fix8.log
```

**Expected in log:**
- `Auto-repaired N field(s)` where N is large (many drift fixes)
- `✓ Schema conformance check passed (43 restaurants, 4 sources)`
- No `✗ HARD-FAIL`
- geocoding runs (43 restaurants — geocode.js will re-geocode since lat/lng were absent in broken file)
- CITY_CENTRES: `✓ CITY_CENTRES — 'Lyon' already present.` (was corrected to [45.7640, 4.8357] last session)

**Noise field check — must be zero:**
```bash
python3 -c "
import json
d = json.load(open('localbite-lyon-france-2023-2026.json'))
noise = ['geo_lat','geo_lng','writers','article_urls','tdl_rating','address','postcode','cuisine','flag','neighbourhood_hint','run_metrics','geo_centre','geo_bbox','run_date']
found = {f for r in d.get('restaurants',[]) for f in noise if f in r}
top_found = {f for f in noise if f in d}
print('Restaurant noise fields:', found or 'NONE')
print('Top-level noise fields: ', top_found or 'NONE')
print('Restaurants:', len(d.get('restaurants',[])))
print('date_generated:', d.get('date_generated'))
"
```
**Expected:** Both noise field lines show `NONE`. Restaurants: 43. date_generated: present.

**Schema diagnostic:**
```bash
python3 localbite-schema-diag.py localbite-lyon-france-2023-2026.json
```
**Expected:** `✓ CONFORMS`

**If CONFORMS:** Lyon is ready for the standard postrun workflow continuation:
- Review geocode false positives (same items from last session: Le Petit Abuluzi, Majorelle, Daniel et Denise)
- Verify CITY_CENTRES [45.7640, 4.8357] is in index.html
- `node localbite-approve-centroids.js localbite-lyon-france-2023-2026.json --auto-accept`
- `python3 localbite-sync-bothpool.py localbite-lyon-france-2023-2026.json`
- Smoke test → commit

**If DIVERGES:** Note which fields are still unexpected. Do not commit. Investigate and fix the patch.

---

## Test 2 — Marseille broken drift recovery

```bash
cp _drift-recovery/localbite-marseille-france-2023-2026.json localbite-marseille-france-2023-2026.json
node localbite-postrun.js localbite-marseille-france-2023-2026.json 2>&1 | tee /tmp/marseille-fix8.log
```

**Expected in log:**
- `Auto-repaired N field(s)`
- `✓ Schema conformance check passed (30 restaurants, 5 sources)`
- No `✗ HARD-FAIL`
- CITY_CENTRES: `✓ CITY_CENTRES — 'Marseille' already present.` (was corrected to [43.2965, 5.3698])

**Noise field check:**
```bash
python3 -c "
import json
d = json.load(open('localbite-marseille-france-2023-2026.json'))
noise = ['geo_lat','geo_lng','writers','article_urls','geo','confidence','description','cuisine','address','extraction_date','centroids_proposed']
found = {f for r in d.get('restaurants',[]) for f in noise if f in r}
top_found = {f for f in ['extraction_date','centroids_proposed','language','price_currency'] if f in d}
print('Restaurant noise fields:', found or 'NONE')
print('Top-level noise fields: ', top_found or 'NONE')
print('Restaurants:', len(d.get('restaurants',[])))
"
```
**Expected:** Both noise field lines show `NONE`. Restaurants: 30.

Note: `centroids_proposed` is NORMAL postrun output (added by Step 2) — it appears after postrun and gets converted to `centroids` by approve-centroids. Do not flag it.

**Schema diagnostic:**
```bash
python3 localbite-schema-diag.py localbite-marseille-france-2023-2026.json
```
**Expected:** `✓ CONFORMS`

**If CONFORMS:** Marseille recovery continues:
- Review Marseille bad geocodes (from last session: La Chapelle, Sur le Pouce, Treiz'envie, L'Original, Forest, Luna Piena, Rotisserie Joyau) — null + geo_skip: true
- Re-run postrun to recalculate centroids after nulling
- approve-centroids → sync-bothpool → smoke test → commit

---

## Test 4 — Regression: existing fleet cities

Run on two existing committed cities. These should NOT produce hard-fail, should produce CONFORMS diagnostic, and the viewer must still render them correctly.

```bash
node localbite-postrun.js localbite-rome-italy-2023-2026.json 2>&1 | tee /tmp/rome-fix8.log
python3 localbite-schema-diag.py localbite-rome-italy-2023-2026.json
node localbite-postrun.js localbite-madrid-spain-2023-2026.json 2>&1 | tee /tmp/madrid-fix8.log
python3 localbite-schema-diag.py localbite-madrid-spain-2023-2026.json
```

**Expected for both:**
- `⚠  Auto-repaired N field(s)` — N will be > 0 because Fix 8d adds new default fields to every restaurant. This is expected and correct. No alarm needed.
- `✓ Schema conformance check passed`
- No `✗ HARD-FAIL`
- `✓ CONFORMS` from schema-diag

**Viewer check:** Open Rome and Madrid in the viewer after re-running postrun (note: postrun updates index.json, so the live deployed viewer is unaffected until you git push — don't push during testing). The local index.html/JSON should still render correctly when served locally.

**Important:** Do NOT commit Rome or Madrid. We are only running postrun to verify it doesn't break existing packs. After testing, restore from git:
```bash
git checkout -- localbite-rome-italy-2023-2026.json localbite-madrid-spain-2023-2026.json index.html localbite-index.json localbite-run-metrics.log
```

---

## Test 5 — Bordeaux drift check

Bordeaux was produced by a pipeline that did not compact+resume. Run the diagnostic before postrun to see if it needs schema repair:

```bash
python3 localbite-schema-diag.py localbite-bordeaux-france-2023-2026.json
```

**If CONFORMS:** Bordeaux schema is clean. Proceed directly to Le Cent 33 exclusion → postrun → standard workflow.  
**If DIVERGES:** Note which fields differ. Postrun with Fix 8 should handle it. Run postrun and check again.

---

## Pass Criteria Summary

| Test | Criterion | Pass |
|------|-----------|------|
| Step 0 (dry run) | 4 anchors verified, 4 patches ready | |
| Step 1 (apply) | "✓ patched" + backup exists | |
| Step 2 (pre-conditions) | Lyon broken → DIVERGES, Marseille → DIVERGES | |
| Step 3 (hard-fail) | Fires on deleted city_slug, exit 1, index.html unchanged | |
| Test 3 (Paris) | No hard-fail, CONFORMS, no noise fields, viewer loads | |
| Test 1 (Lyon) | No hard-fail, CONFORMS, no noise fields, 43R | |
| Test 2 (Marseille) | No hard-fail, CONFORMS, no noise fields, 30R | |
| Test 4 (Rome) | No hard-fail, CONFORMS, no viewer breakage | |
| Test 4 (Madrid) | No hard-fail, CONFORMS, no viewer breakage | |
| Test 5 (Bordeaux) | Diagnostic result documented | |

**All pass → Fix 8 is production-ready.**  
**Any fail → Do not proceed. Investigate and fix.**

---

## Rollback

If any test fails after applying:
```bash
cp localbite-postrun.js.fix8-backup localbite-postrun.js
```
