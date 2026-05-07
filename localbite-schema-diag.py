#!/usr/bin/env python3
"""
localbite-schema-diag.py
Compare a city pack JSON against a reference pack (default: Paris) for schema divergence.
Run BEFORE postrun on drifted packs to confirm divergence.
Run AFTER postrun on recovered packs to confirm conformance.

Usage:
  python3 localbite-schema-diag.py <city-pack.json>
  python3 localbite-schema-diag.py <city-pack.json> <reference-pack.json>

Exit code: 0 = CONFORMS, 1 = DIVERGES
"""
import json, sys, os

if len(sys.argv) < 2:
    print("Usage: python3 localbite-schema-diag.py <city-pack.json> [reference.json]")
    sys.exit(1)

target_file = sys.argv[1]
ref_file    = sys.argv[2] if len(sys.argv) > 2 else 'localbite-paris-france-2023-2026.json'

if not os.path.exists(target_file):
    print(f"ERROR: target not found: {target_file}")
    sys.exit(1)
if not os.path.exists(ref_file):
    print(f"ERROR: reference not found: {ref_file}")
    print("  Default reference: localbite-paris-france-2023-2026.json (must be in current directory)")
    sys.exit(1)

with open(target_file) as f:
    t = json.load(f)
with open(ref_file) as f:
    p = json.load(f)

print(f"=== Schema Diagnostic ===")
print(f"Target:    {os.path.basename(target_file)} ({os.path.getsize(target_file):,} bytes)")
print(f"Reference: {os.path.basename(ref_file)}")
print()

issues  = []
notices = []

# ─────────────────────────────────────────────────────────────────────────────
# TOP-LEVEL FIELD COMPARISON
# ─────────────────────────────────────────────────────────────────────────────

tk, pk = set(t.keys()), set(p.keys())

# Fields postrun adds during its run — OK to be present in either target or ref:
POSTRUN_ADDED_TOP = {
    'centroids',           # written by approve-centroids
    'centroids_proposed',  # written by Step 2 (centroids calc), converted by approve-centroids
    'bounding_box',
    'source_recency',      # corrected by Step 1.6
    # Fix 8e fields — postrun now derives these; OK to be absent from old ref packs:
    'final_entries', 'sources_confirmed', 'both_pool',
    'tier_a', 'tier_b', 'tier_c', 'date_generated',
}
# Optional fields (vary by city, not structural):
OPTIONAL_TOP = {'notes', 'open_status_check_count', 'built', 'both_pool_count', 'source_count'}

# Known noise fields that must NOT be in a committed pack:
NOISE_TOP = {
    'run_metrics', 'geo_centre', 'geo_bbox', 'raw_extractions',
    'language',          # top-level string from Marseille drift
    'price_currency',    # top-level from Marseille drift
    'extraction_date',   # drift variant of date_generated
    'run_date',          # drift variant of date_generated
    'entries',           # drift variant of restaurants (before Fix 8a-0)
}

extra_top   = tk - pk - POSTRUN_ADDED_TOP - OPTIONAL_TOP
missing_top = pk - tk - POSTRUN_ADDED_TOP - OPTIONAL_TOP

if extra_top:
    issues.append(f"TOP-LEVEL EXTRA fields (in target, not in reference): {sorted(extra_top)}")
if missing_top:
    notices.append(f"Top-level missing fields (reference has, target lacks): {sorted(missing_top)}")

for f in NOISE_TOP:
    if f in t:
        issues.append(f"TOP-LEVEL NOISE field present: '{f}' — must be removed before commit")

for k in tk & pk:
    if k in OPTIONAL_TOP | POSTRUN_ADDED_TOP:
        continue
    tt, pt = type(t[k]).__name__, type(p[k]).__name__
    if tt != pt:
        issues.append(f"TOP-LEVEL TYPE MISMATCH: '{k}' is {tt} in target vs {pt} in reference")

print(f"Top-level:   target has {len(tk)} fields, reference has {len(pk)} fields")

# ─────────────────────────────────────────────────────────────────────────────
# RESTAURANT FIELD COMPARISON
# ─────────────────────────────────────────────────────────────────────────────

t_rests = t.get('restaurants', t.get('entries', []))
p_rests = p.get('restaurants', [])

print(f"Restaurants: target has {len(t_rests)}, reference has {len(p_rests)}")
print()

if not t_rests:
    issues.append("NO RESTAURANTS: 'restaurants' key missing or empty (also checked 'entries')")
else:
    tf, pf = set(), set()
    for r in t_rests: tf.update(r.keys())
    for r in p_rests: pf.update(r.keys())

    # Fields postrun adds per-restaurant — OK to differ between target and ref:
    POSTRUN_ADDED_R = {
        'lat', 'lng', 'geo_confidence', 'geo_matched_name', 'geo_skip',
        'confidence_tier',
        'source_count', 'article_date',
        'language_pool',   # set by Fix 4
        # Fix 8d fields — now added by postrun, may be absent from old ref packs:
        'id', 'quote_en', 'price_range', 'open_status', 'arrondissement',
        'dishes', 'signature_dish', 'both_pool', 'publisher', 'year',
        # open_status_check is valid per-restaurant (pipeline sets it, postrun reads it):
        'open_status_check',
    }

    # Known noise fields that must NOT be in a committed pack:
    NOISE_R = {
        'tdl_rating', 'address', 'postcode', 'country', 'city', 'cuisine',
        'flag', 'neighbourhood_hint', 'raw_text', 'extraction_notes',
        'geo_lat', 'geo_lng',     # Fix 8c drift: flat geo variants
        'geo',                    # Fix 8c drift: nested geo object
        'writers',                # Fix 8c drift: plural writers list
        'article_urls',           # Fix 8c drift: plural article URLs list
        'confidence',             # Fix 8c drift: should be geo_confidence
        'notable_dishes',         # Fix 8c drift: should be dishes
        'dishes_mentioned',       # Fix 8c drift: should be dishes
        'tdl_article_date',       # Fix 8c drift: should be article_date
        'neighbourhood_hint',     # Fix 8c drift: pipeline working data
    }

    extra_r   = tf - pf - POSTRUN_ADDED_R
    missing_r = pf - tf - POSTRUN_ADDED_R

    if extra_r:
        issues.append(f"RESTAURANT EXTRA fields (in target, not in reference): {sorted(extra_r)}")
    if missing_r:
        notices.append(f"Restaurant missing fields (reference has, target lacks): {sorted(missing_r)}")

    for noise_f in NOISE_R:
        examples = [r.get('name', '?') for r in t_rests if noise_f in r][:3]
        if examples:
            count = sum(1 for r in t_rests if noise_f in r)
            issues.append(f"RESTAURANT NOISE field '{noise_f}' in {count} restaurant(s) — e.g.: {examples}")

    # Hard-required field presence check (matches postrun hard-fail logic)
    HARD_REQUIRED = ['name', 'neighbourhood', 'quote', 'sources', 'language_pool']
    missing_required = []
    for i, r in enumerate(t_rests):
        for f in HARD_REQUIRED:
            if f not in r:  # presence only — null is valid
                missing_required.append(f"  restaurant[{i}] ({r.get('name','?')}): field '{f}' absent")
    if missing_required:
        issues.append(f"HARD-REQUIRED FIELDS ABSENT ({len(missing_required)} violation(s)):")
        issues.extend(missing_required[:10])
        if len(missing_required) > 10:
            issues.append(f"  ... +{len(missing_required)-10} more")

    # Sources structure check
    src = t.get('sources')
    if isinstance(src, list):
        issues.append("SOURCES IS LIST not dict — Fix 2 in postrun.js should convert this")
    elif isinstance(src, dict):
        src_ids = set(src.keys())
        orphan_refs = set()
        for r in t_rests:
            for sid in (r.get('sources') or []):
                if isinstance(sid, str) and sid not in src_ids:
                    orphan_refs.add(sid)
        if orphan_refs:
            issues.append(f"ORPHAN SOURCE IDS in restaurants (not in sources dict): {sorted(orphan_refs)}")

# ─────────────────────────────────────────────────────────────────────────────
# RESULTS
# ─────────────────────────────────────────────────────────────────────────────

ok = len(issues) == 0

print("=== Results ===")
if issues:
    print(f"\u2717 DIVERGES \u2014 {len(issues)} issue(s):")
    for issue in issues:
        print(f"  \u2022 {issue}")
else:
    print(f"\u2713 CONFORMS \u2014 no structural divergence detected")

if notices:
    print(f"\n  Notices (informational, not blocking):")
    for n in notices:
        print(f"  \u26a0 {n}")

print()
sys.exit(0 if ok else 1)
