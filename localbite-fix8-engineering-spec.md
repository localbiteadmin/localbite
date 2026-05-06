# Fix 8 — Comprehensive Schema Normalization in postrun.js

**Status:** P0 — blocks all France pipeline resumption
**Estimated effort:** 3–4 hours including testing
**Date specced:** 2026-05-06
**Triggered by:** Lyon and Marseille pipelines (2026-05-06) producing schema-divergent JSON; Lyon production push broke the viewer
**Reference reproductions:** `_drift-recovery/localbite-lyon-france-2023-2026.json.broken`, `_drift-recovery/localbite-marseille-france-2023-2026.json`

---

## Problem statement

Postrun.js Step 1.5 currently auto-repairs a known set of compaction-reconstruction drift patterns. The repair set is incomplete: today's two compacted+resumed pipelines (Lyon and Marseille) produced JSON with field-name and field-shape divergence that postrun did not catch. Lyon shipped to production with these unfixed drifts and the viewer broke. Marseille's drift was severe enough at the top level (`entries` instead of `restaurants`) that postrun aborted before any auto-repair fired.

The current behavior also has no hard-fail on residual schema divergence — postrun reports "Auto-repaired N field(s)" and proceeds even when the JSON still doesn't conform to the viewer-required schema.

This fix closes both gaps:
1. Expand auto-repair to cover all known drift patterns observed across Italy, Spain, France, Morocco, Portugal pipelines.
2. After auto-repair, run a strict conformance check; abort with a useful error message if the JSON still doesn't conform.

---

## Current auto-repair coverage (postrun.js v3.4)

For reference, what's already handled in Step 1.5:

**Top-level:**
- `city_name` → `city` (Fix A)
- `sources` list → dict keyed by id/source_id (Fix 2)

**Source field-level:**
- `source_id` → `id` (preserved both)
- `publisher` → `publication`
- `author_name` → `writer`
- Writer surname fallback from source_id (e.g. `src-tdl-mailhes` → writer="Mailhes")
- `url` → `article_url`
- `title` → `article_title`
- `date` → `article_date`
- `lang` / `language_code` → `language`
- `coi` → `commercial_conflict`
- Default: `commercial_conflict = false` if missing
- Default: `commercial_conflict_note = null` if missing
- Default: `writer_profile = "{writer} writes for {publication}."` if missing/short

**Restaurant field-level:**
- `restaurant_name` → `name`
- `venue_name` → `name`
- `review_quote` → `quote`
- `description` → `quote` (only if `quote` not already present)
- `pool` / `lang_pool` → `language_pool`
- `tier` → `confidence_tier`

**Other:**
- `language_pool` recalculation from publisher diversity (Fix 4, 2026-05-04)

---

## Drift patterns Fix 8 must add

Cross-referenced against the two reference reproductions in `_drift-recovery/`.

### A. Top-level field renames

| Drift variant | Canonical | Source |
|---|---|---|
| `extraction_date` | `date_generated` | Marseille |
| `run_date` | `date_generated` | Lyon |

### B. Top-level pipeline-internal noise to remove

These fields are pipeline working-state, not pack data. Strip on postrun.

| Field | Source |
|---|---|
| `run_metrics` | Lyon |
| `geo_centre` | Lyon |
| `geo_bbox` | Lyon |
| `language` (top-level) | Marseille |
| `price_currency` (top-level) | Marseille |
| `raw_extractions` | (some pipeline working states) |
| `year_range` (if `source_recency` already present and identical) | optional |

`centroids_proposed` is NORMAL postrun output (added by Step 2). Do not strip — gets converted to `centroids` after approve-centroids.

### C. Top-level fields to derive (if missing)

| Field | Derivation |
|---|---|
| `final_entries` | `len(restaurants)` |
| `sources_confirmed` | `len(sources)` (dict keys count after Fix 2) |
| `both_pool` | count of restaurants with `language_pool == 'both'` |
| `tier_a` | count of restaurants with `confidence_tier == 'A'` |
| `tier_b` | count of restaurants with `confidence_tier == 'B'` |
| `tier_c` | count of restaurants with `confidence_tier == 'C'` |
| `date_generated` | today's date in YYYY-MM-DD if `extraction_date` and `run_date` are both missing |

These are denormalized counts for index.json + analytics. Required by the viewer's metadata header.

### D. Restaurant field-level renames + reshapes

| Drift variant | Canonical | Notes | Source |
|---|---|---|---|
| `geo_lat` (number) | `lat` (number) | Flat field rename | Lyon |
| `geo_lng` (number) | `lng` (number) | Flat field rename | Lyon |
| `geo: { lat, lng }` (object) | flat `lat`, `lng` (numbers); delete `geo` | Extract nested → flat | Marseille |
| `writers` (list[str]) | `writer` (str) | Take first; delete `writers` | Lyon |
| `article_urls` (list[str]) | `article_url` (str) | Take first; delete `article_urls` | Lyon |
| `confidence` (str) | `geo_confidence` (str) | Field rename | Marseille |
| `notable_dishes` (list[str]) | `dishes` (list[str]) | Field rename | Lyon |
| `tdl_article_date` | `article_date` (per-restaurant; or null if sources have it) | Lyon-specific drift | Lyon |
| `dishes_mentioned` | `dishes` | Alternate variant seen in working.json | (general) |

### E. Restaurant fields to add with defaults (if missing)

| Field | Default / derivation |
|---|---|
| `id` | slugify(name) — kebab-case, lowercase, no diacritics |
| `arrondissement` | extract from `postcode` if format matches `750NN` (Paris) or `690NN` (Lyon) etc. — see arrondissement extractor below; else null |
| `quote_en` | null |
| `publisher` | from `sources[0]` lookup → `sources[<id>].publication` |
| `year` | parse year from `article_date` field if present, else from sources[0].article_date, else null |
| `price_range` | null |
| `open_status` | preserve from `open_status_check` if present (rename), else null |
| `dishes` | empty list if missing and not derivable from `notable_dishes` |
| `signature_dish` | `dishes[0]` if `dishes` present and non-empty, else null |
| `geo_skip` | false if missing |
| `both_pool` | derived: `language_pool == 'both'` |

### F. Restaurant pipeline-internal noise to remove

| Field | Source / reason |
|---|---|
| `tdl_rating` | Tribune de Lyon scraping artifact | Lyon |
| `address` | Pipeline working data (if not stored elsewhere) | Both |
| `postcode` | Pipeline working data (extract `arrondissement` first if needed) | Lyon |
| `country` | Top-level only | Lyon |
| `cuisine` | Pipeline working data | Both |
| `flag` | Pipeline working data | Lyon |
| `neighbourhood_hint` | Pipeline working data | Lyon |
| `city` | Top-level only | Lyon |
| `open_status_check` | Renamed to `open_status` (E above), then deleted | Both |
| `description` (after copy to `quote` if quote is missing) | Always delete if quote present | Marseille |
| `confidence_tier` (the older `tier` already renamed) | Keep `confidence_tier` |

Note on `open_status_check`: in v7.1 schema it appears at top level as a count, not per restaurant. Per-restaurant `open_status_check` is drift. Rename to `open_status` per restaurant, increment top-level count separately if needed.

### G. Arrondissement extractor (helper)

For French cities with arrondissement-encoding postcodes:
```js
function extractArrondissement(postcode, city) {
  if (!postcode || typeof postcode !== 'string') return null;
  const match = postcode.match(/^(75|69|13)0(\d\d)$/);
  if (!match) return null;
  const cityCode = match[1];
  const arr = parseInt(match[2], 10);
  if (cityCode === '75' && city === 'Paris' && arr >= 1 && arr <= 20) return arr;
  if (cityCode === '69' && city === 'Lyon' && arr >= 1 && arr <= 9) return arr;
  if (cityCode === '13' && city === 'Marseille' && arr >= 1 && arr <= 16) return arr;
  return null;
}
```

For non-arrondissement French cities (Bordeaux, Nice, Toulouse, etc.), `arrondissement` stays null. Spanish/Italian cities don't use this — they leave it null.

---

## Implementation

### Where to add

Single block in postrun.js Step 1.5, AFTER the existing `Fix 2: sources list → dict` block and BEFORE the existing `Fix 3 — exhaustive field name variants from compaction drift` block. Keep all changes inside the `autoRepaired` counter so the existing summary line continues to work.

Pseudo-structure:
```js
// ── Fix 8a — Top-level field renames + noise removal ──
if ('extraction_date' in data && !('date_generated' in data)) { ... }
if ('run_date' in data && !('date_generated' in data)) { ... }
['run_metrics','geo_centre','geo_bbox','language','price_currency'].forEach(f => {
  if (f in data) { delete data[f]; autoRepaired++; }
});

// ── Fix 8b — Restaurant field renames + reshapes ──
for (const r of data.restaurants) {
  // geo_lat/geo_lng flat → lat/lng flat
  if ('geo_lat' in r && !('lat' in r)) { r.lat = r.geo_lat; delete r.geo_lat; autoRepaired++; }
  if ('geo_lng' in r && !('lng' in r)) { r.lng = r.geo_lng; delete r.geo_lng; autoRepaired++; }
  // geo: {lat, lng} nested → flat
  if (typeof r.geo === 'object' && r.geo !== null) {
    if (!('lat' in r) && 'lat' in r.geo) { r.lat = r.geo.lat; autoRepaired++; }
    if (!('lng' in r) && 'lng' in r.geo) { r.lng = r.geo.lng; autoRepaired++; }
    delete r.geo;
    autoRepaired++;
  }
  // writers (list) → writer (str)
  if (Array.isArray(r.writers) && !('writer' in r)) { r.writer = r.writers[0] || null; delete r.writers; autoRepaired++; }
  // article_urls (list) → article_url (str)
  if (Array.isArray(r.article_urls) && !('article_url' in r)) { r.article_url = r.article_urls[0] || null; delete r.article_urls; autoRepaired++; }
  // confidence → geo_confidence
  if ('confidence' in r && !('geo_confidence' in r)) { r.geo_confidence = r.confidence; delete r.confidence; autoRepaired++; }
  // notable_dishes → dishes
  if (Array.isArray(r.notable_dishes) && !('dishes' in r)) { r.dishes = r.notable_dishes; delete r.notable_dishes; autoRepaired++; }
  // dishes_mentioned → dishes
  if (Array.isArray(r.dishes_mentioned) && !('dishes' in r)) { r.dishes = r.dishes_mentioned; delete r.dishes_mentioned; autoRepaired++; }
  // open_status_check → open_status (per-restaurant only)
  if ('open_status_check' in r && !('open_status' in r)) { r.open_status = r.open_status_check; delete r.open_status_check; autoRepaired++; }
  // description (after quote already set) → delete
  if ('description' in r && 'quote' in r) { delete r.description; autoRepaired++; }
  // tdl_article_date → article_date
  if ('tdl_article_date' in r && !('article_date' in r)) { r.article_date = r.tdl_article_date; delete r.tdl_article_date; autoRepaired++; }
}

// ── Fix 8c — Restaurant pipeline-internal noise removal ──
const NOISE_FIELDS = ['tdl_rating','address','postcode','country','cuisine','flag','neighbourhood_hint','city','dishes_mentioned'];
for (const r of data.restaurants) {
  // Arrondissement extraction from postcode BEFORE postcode is stripped
  if (!('arrondissement' in r) || r.arrondissement === null) {
    const arr = extractArrondissement(r.postcode, data.city);
    if (arr !== null) { r.arrondissement = arr; autoRepaired++; }
  }
  for (const f of NOISE_FIELDS) {
    if (f in r) { delete r[f]; autoRepaired++; }
  }
}

// ── Fix 8d — Restaurant field defaults ──
const sourceLookup = data.sources; // already dict after Fix 2
for (const r of data.restaurants) {
  if (!('id' in r) || !r.id) {
    r.id = slugify(r.name);
    autoRepaired++;
  }
  if (!('quote_en' in r))      { r.quote_en = null; autoRepaired++; }
  if (!('price_range' in r))   { r.price_range = null; autoRepaired++; }
  if (!('open_status' in r))   { r.open_status = null; autoRepaired++; }
  if (!('arrondissement' in r)){ r.arrondissement = null; autoRepaired++; }
  if (!('geo_skip' in r))      { r.geo_skip = false; autoRepaired++; }
  if (!('dishes' in r))        { r.dishes = []; autoRepaired++; }
  if (!('signature_dish' in r) && Array.isArray(r.dishes) && r.dishes.length > 0) {
    r.signature_dish = r.dishes[0]; autoRepaired++;
  } else if (!('signature_dish' in r)) {
    r.signature_dish = null; autoRepaired++;
  }
  // publisher lookup from sources[0]
  if (!('publisher' in r) && Array.isArray(r.sources) && r.sources.length > 0) {
    const firstSrcId = typeof r.sources[0] === 'string' ? r.sources[0] : (r.sources[0].source_id || r.sources[0].id);
    const firstSrc = sourceLookup[firstSrcId];
    if (firstSrc && firstSrc.publication) { r.publisher = firstSrc.publication; autoRepaired++; }
    else { r.publisher = null; autoRepaired++; }
  }
  // year from article_date or sources[0].article_date
  if (!('year' in r) || r.year === null) {
    const candidates = [r.article_date];
    if (Array.isArray(r.sources)) {
      const firstSrcId = typeof r.sources[0] === 'string' ? r.sources[0] : (r.sources[0]?.source_id || r.sources[0]?.id);
      const firstSrc = sourceLookup[firstSrcId];
      if (firstSrc) candidates.push(firstSrc.article_date);
    }
    for (const d of candidates) {
      if (typeof d === 'string') {
        const m = d.match(/^(\d{4})/);
        if (m) { r.year = parseInt(m[1], 10); autoRepaired++; break; }
      }
    }
    if (!('year' in r)) { r.year = null; autoRepaired++; }
  }
  // both_pool derived from language_pool
  if (!('both_pool' in r)) { r.both_pool = (r.language_pool === 'both'); autoRepaired++; }
  // writer (per restaurant) lookup if missing
  if (!('writer' in r) && Array.isArray(r.sources) && r.sources.length > 0) {
    const firstSrcId = typeof r.sources[0] === 'string' ? r.sources[0] : (r.sources[0].source_id || r.sources[0].id);
    const firstSrc = sourceLookup[firstSrcId];
    if (firstSrc && firstSrc.writer) { r.writer = firstSrc.writer; autoRepaired++; }
    else { r.writer = null; autoRepaired++; }
  }
}

// ── Fix 8e — Top-level derivations + date_generated default ──
if (!('final_entries' in data))   { data.final_entries = data.restaurants.length; autoRepaired++; }
if (!('sources_confirmed' in data)){ data.sources_confirmed = Object.keys(data.sources || {}).length; autoRepaired++; }
if (!('both_pool' in data))       { data.both_pool = data.restaurants.filter(r => r.language_pool === 'both').length; autoRepaired++; }
if (!('tier_a' in data))          { data.tier_a = data.restaurants.filter(r => r.confidence_tier === 'A').length; autoRepaired++; }
if (!('tier_b' in data))          { data.tier_b = data.restaurants.filter(r => r.confidence_tier === 'B').length; autoRepaired++; }
if (!('tier_c' in data))          { data.tier_c = data.restaurants.filter(r => r.confidence_tier === 'C').length; autoRepaired++; }
if (!('date_generated' in data))  { data.date_generated = new Date().toISOString().slice(0, 10); autoRepaired++; }
```

### Hard-fail block (after autoRepair complete)

After all autoRepair runs and the file is written, validate against a strict required-field schema. Abort with non-zero exit code if any restaurant still lacks required fields.

```js
const HARD_REQUIRED_RESTAURANT_FIELDS = ['name', 'neighbourhood', 'quote', 'sources', 'language_pool'];
const HARD_REQUIRED_TOP_LEVEL = ['city', 'country', 'city_slug', 'pipeline', 'sources', 'restaurants', 'date_generated'];

const topErrors = HARD_REQUIRED_TOP_LEVEL.filter(k => !(k in data));
const restErrors = [];
data.restaurants.forEach((r, i) => {
  HARD_REQUIRED_RESTAURANT_FIELDS.forEach(f => {
    if (!(f in r)) restErrors.push(`restaurant[${i}] (${r.name || '<unnamed>'}): missing ${f}`);
  });
});

if (topErrors.length > 0 || restErrors.length > 0) {
  console.log(`\n✗ HARD-FAIL — ${topErrors.length + restErrors.length} schema error(s) remain after auto-repair:\n`);
  topErrors.forEach(e => console.log(`  • top-level: missing ${e}`));
  restErrors.slice(0, 20).forEach(e => console.log(`  • ${e}`));
  if (restErrors.length > 20) console.log(`  ... +${restErrors.length - 20} more`);
  console.log(`\nThis pack will not be committed. Investigate the pipeline output for compaction-reconstruction drift.`);
  console.log(`Reference repro: _drift-recovery/`);
  process.exit(1);
}
```

The hard-fail must run BEFORE Step 4 (CITY_CENTRES + CITY_BOUNDS) and Step 5 (centroids → index.html), so a divergent pack never modifies index.html.

---

## Test plan

Three test cases must pass:

### Test 1 — Lyon broken (drift A: flat geo_lat/geo_lng + writers/article_urls plurals + missing top-level metadata)

Input: `_drift-recovery/localbite-lyon-france-2023-2026.json.broken`
Expected after `node localbite-postrun.js`:
- All 43 restaurants have `lat`, `lng`, `writer`, `article_url`, `arrondissement` (or null), `publisher`, `year`, `price_range` (null), `open_status`, `dishes`, `signature_dish`, `id`, `geo_skip`, `both_pool`, `quote_en`
- No `geo_lat`, `geo_lng`, `writers`, `article_urls`, `tdl_rating`, `tdl_article_date`, `notable_dishes`, `address`, `postcode`, `country`, `city`, `cuisine`, `flag`, `neighbourhood_hint`, `open_status_check` fields anywhere
- Top-level has `final_entries=43`, `sources_confirmed=4`, `both_pool=4`, `tier_a/b/c` derived, `date_generated`
- No top-level `run_date`, `run_metrics`, `geo_centre`, `geo_bbox`
- Sources are dict (already by Fix 2)
- Hard-fail does not trigger
- Diagnostic script confirms zero schema divergence vs Paris reference

### Test 2 — Marseille broken (drift B: nested geo object + description + extraction_date)

Input: `_drift-recovery/localbite-marseille-france-2023-2026.json` (top-level `entries→restaurants` already repaired by /tmp/repair-marseille.py earlier today)
Expected after postrun:
- All 30 restaurants have `lat`, `lng` extracted from `geo`, no `geo` field
- All restaurants have `geo_confidence` (renamed from `confidence`)
- All restaurants have `quote` (already populated; `description` deleted)
- All restaurants have `id`, `writer`, `publisher`, `arrondissement` (Marseille 1er-16e if postcode parses), `year`, etc.
- Top-level has `date_generated` (renamed from `extraction_date`)
- Top-level has derived metadata
- Hard-fail does not trigger
- Diagnostic script confirms zero schema divergence vs Paris reference

### Test 3 — Paris (known good — must be no-op)

Input: `localbite-paris-france-2023-2026.json` (working production pack)
Expected after postrun:
- `autoRepaired` count is 0 or near-0 (only profile-enrichment touches if needed)
- File diff before/after is minimal
- Hard-fail does not trigger
- No regressions

---

## Diagnostic script for verification

Save as `localbite-schema-diag.py` (gitignored under `localbite-*-france-*.py` if needed, otherwise add to gitignore). Reusable.

```python
#!/usr/bin/env python3
"""Compare a city pack JSON against Paris reference for schema divergence."""
import json, sys, os

if len(sys.argv) < 2:
    print("Usage: python3 localbite-schema-diag.py <city-pack.json> [reference-pack.json]")
    sys.exit(1)

target = sys.argv[1]
ref = sys.argv[2] if len(sys.argv) > 2 else 'localbite-paris-france-2023-2026.json'

with open(target) as f: t = json.load(f)
with open(ref) as f: p = json.load(f)

tk, pk = set(t.keys()), set(p.keys())
diff_top = (tk - pk, pk - tk)
type_mismatch = [(k, type(t[k]).__name__, type(p[k]).__name__) for k in tk & pk if type(t[k]).__name__ != type(p[k]).__name__]

tf, pf = set(), set()
for r in t.get('restaurants', []): tf.update(r.keys())
for r in p.get('restaurants', []): pf.update(r.keys())
diff_rest = (tf - pf, pf - tf)

ok = not (diff_top[0] or diff_top[1] or type_mismatch or diff_rest[0] or diff_rest[1])
print(f"=== {os.path.basename(target)} vs {os.path.basename(ref)} ===")
print(f"Restaurants: {len(t.get('restaurants', []))} vs {len(p.get('restaurants', []))}")
print(f"Top-level extra:    {sorted(diff_top[0])}")
print(f"Top-level missing:  {sorted(diff_top[1])}")
for k, tt, pt in type_mismatch:
    print(f"Top-level type mismatch: {k}: {tt} vs {pt}")
print(f"Restaurant extra:   {sorted(diff_rest[0])}")
print(f"Restaurant missing: {sorted(diff_rest[1])}")
print(f"\n{'✓ CONFORMS' if ok else '✗ DIVERGES'}")
sys.exit(0 if ok else 1)
```

---

## Out of scope (deferred to later fixes)

- **Fix 9 (separate)** — postrun.js bbox-midpoint CITY_CENTRES warning + manual correction prompt. Three confirmed wrong-centre cases (Paris, Lyon, Marseille). Should detect asymmetric bboxes (e.g., bbox covers more than 1.5× the actual urban area) and warn or prompt.
- **Fix 7 (separate)** — neighbourhood-first template fix verification + hood-check.py as automatic postrun gate.
- **Strengthened pre-research template** — separate document, not engineering.
- Pipeline-side prevention of compaction-reconstruction drift — would be ideal but is upstream of postrun and outside this fix's scope.

---

## Acceptance criteria

1. All three test cases pass (Lyon broken, Marseille drifted, Paris reference).
2. `localbite-schema-diag.py` returns "CONFORMS" for Lyon, Marseille, Bordeaux, and Paris after postrun.
3. Smoke test: viewer loads each city without errors after postrun.
4. Hard-fail triggers correctly on intentional drift (manually corrupt a test JSON to verify).
5. No regression on any existing v7.1 city pack — run postrun on three random fleet cities (e.g., Rome, Bologna, Madrid) and verify autoRepaired count is near zero and diagnostic returns CONFORMS.

---

## Migration plan after Fix 8 ships

Order matters — re-postrun the parked drift packs in this order:

1. Run `localbite-schema-diag.py` against Paris (sanity check — should CONFORM)
2. Restore Lyon: `cp _drift-recovery/localbite-lyon-france-2023-2026.json.broken localbite-lyon-france-2023-2026.json`
3. Run postrun on Lyon → verify CONFORMS → review false positives (12 geo_skip restaurants are pre-known) → approve-centroids → sync-bothpool → smoke test → commit
4. Restore Marseille: `cp _drift-recovery/localbite-marseille-france-2023-2026.json localbite-marseille-france-2023-2026.json`
5. Run postrun on Marseille → verify CONFORMS → null bad geocodes (La Chapelle, Sur le Pouce, Treiz'envie, L'Original, Forest, Luna Piena, Rotisserie Joyau, others) → re-postrun → approve-centroids → sync-bothpool → smoke test → commit
6. Bordeaux drift check first: `python3 localbite-schema-diag.py localbite-bordeaux-france-2023-2026.json`
7. If Bordeaux CONFORMS already (no compaction): exclude Le Cent 33 (Michelin 1★ blanket exclusion) → postrun → approve-centroids → sync-bothpool → smoke test → commit
8. If Bordeaux DIVERGES: same path as Lyon/Marseille
