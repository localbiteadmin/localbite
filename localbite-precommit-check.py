"""
localbite-precommit-check.py
Consolidated pre-commit diagnostic for LocalBite city pack JSON files.
Run AFTER postrun.js, BEFORE git commit.

Usage: python3 localbite-precommit-check.py localbite-[city]-2023-2026.json

Checks:
  1. Schema — sources format, required fields, pipeline version
  2. Neighbourhood dropout — restaurants missing neighbourhood
  3. Geocoding — medium-confidence matches, false positive patterns, high-spread centroids
  4. Article URLs — null counts, homepage URLs, known category page patterns
  5. Language pool — both_pool consistency with language_pool field
  6. Reminders — Michelin check, smoke test
"""

import json
import sys
import re
import math
from collections import defaultdict
from urllib.parse import urlparse

# ── CONFIG ──────────────────────────────────────────────────────────────────

HIGH_SPREAD_THRESHOLD = 0.05   # lat degrees — flag centroids wider than this
NEIGHBOURHOOD_DROPOUT_WARN = 5 # flag if more than this many restaurants lack neighbourhood

# False positive patterns mirroring geocode.js NON_RESTAURANT_PATTERNS
# Tuples of (regex_pattern, label)
FALSE_POSITIVE_PATTERNS = [
    # Italian
    (r'^Via [A-Z]',                      'IT street (Via)'),
    (r'^Viale ',                          'IT avenue (Viale)'),
    (r'^Vicolo ',                         'IT alley (Vicolo)'),
    (r'^Corso [A-Z]',                     'IT boulevard (Corso)'),
    (r'^Lungotevere ',                    'IT riverside road'),
    (r'^Lungarno ',                       'IT riverside road'),
    (r'^Lungomare ',                      'IT seafront road'),
    (r'^Piazza (di |del |della |d\')',    'IT square (Piazza)'),
    (r'^Piazzale ',                       'IT large square (Piazzale)'),
    (r'^Piazzetta ',                      'IT small square (Piazzetta)'),
    (r'^Ponte [A-Z]',                     'IT bridge (Ponte)'),
    (r'^Chiesa',                          'IT church (Chiesa)'),
    (r'^Basilica',                        'IT basilica'),
    (r'^Duomo',                           'IT cathedral (Duomo)'),
    (r'^Cattedrale',                      'IT cathedral (Cattedrale)'),
    (r'^Museo (di |del |della |d\')',     'IT museum (Museo)'),
    (r'^Villa [A-Z]',                     'IT villa (Villa)'),
    (r'^Palazzo (di |del |della |d\')',   'IT palace (Palazzo)'),
    (r'^Teatro (?!del |della |degli |delle )', 'IT theatre (Teatro)'),
    (r'(?i)\bCimitero\b',                 'IT cemetery (Cimitero)'),
    (r'^Casa di cura',                    'IT clinic (Casa di cura)'),
    (r'^Parco (di |del |della |d\')',     'IT park (Parco)'),
    (r'^Giardini',                        'IT gardens (Giardini)'),
    (r'^Contrada ',                       'IT historic district (Contrada)'),
    # Spanish
    (r'^Calle (de |del |de la |de los )', 'ES street (Calle)'),
    (r'^Plaza (de |del |de la |de los )', 'ES square (Plaza)'),
    (r'^Avenida ',                        'ES avenue (Avenida)'),
    (r'^Paseo (de |del )',                'ES boulevard (Paseo)'),
    (r'^Puente (de |del |de la )',        'ES bridge (Puente)'),
    (r'^Parque (de |del |de la )',        'ES park (Parque)'),
    (r'^Iglesia (de |del |de la )',       'ES church (Iglesia)'),
    (r'^Museo (de |del |de la )',         'ES museum (Museo)'),
    (r'^Palacio (de |del |de la )',       'ES palace (Palacio)'),
    (r'^Torre (de |del |de la )',         'ES tower (Torre)'),
    # Portuguese
    (r'^Rua (de |do |da |dos |das )',     'PT street (Rua)'),
    (r'^Praça (de |do |da )',             'PT square (Praça)'),
    # French
    (r'^Rue (de |du |des |de la )',       'FR street (Rue)'),
    (r'^Place (de |du |des |de la )',     'FR square (Place)'),
    # General
    (r'(?i)\bHospital\b',                'hospital'),
    (r'(?i)\bMusée\b',                   'FR museum'),
    (r'(?i)\bStation\b',                 'station'),
    (r'(?i)\bAirport\b',                 'airport'),
    (r'(?i)\bAeropuerto\b',              'airport (ES)'),
    (r'(?i)\bUniversit',                 'university'),
]

# Known category page URL patterns — not specific articles
CATEGORY_PAGE_PATTERNS = [
    r'katieparla\.com/restaurants/',
    r'/category/',
    r'/tag/',
    r'/topic/',
    r'/guide/',
]

# ── HELPERS ─────────────────────────────────────────────────────────────────

def is_false_positive(matched_name):
    """Return (True, label) if matched_name matches a non-restaurant pattern."""
    if not matched_name:
        return False, None
    for pattern, label in FALSE_POSITIVE_PATTERNS:
        if re.search(pattern, matched_name):
            return True, label
    return False, None

def is_homepage_url(url):
    """
    Classify a source URL by article path depth.

    Returns (severity, reason) where severity is:
      'error'   — 0 path segments: definite homepage or root URL.
                  Example: https://eater.com  or  https://katieparla.com/
                  Action: null the article_url.
      'warning' — 1 path segment: ambiguous. Could be a section/city index
                  page (e.g. eater.com/toronto) OR a valid short article URL
                  (e.g. katieparla.com/where-to-eat-drink-shop-rome/).
                  Action: human review required — check the URL in a browser.
      None      — 2+ path segments: almost certainly a specific article.
                  No action needed.
    Returns (None, None) when URL is clean or cannot be parsed.
    """
    if not url:
        return None, None
    try:
        parsed = urlparse(url)
        path = parsed.path.rstrip('/')
        segments = [s for s in path.split('/') if s]
        if len(segments) == 0:
            return 'error', 'root URL — no article path'
        if len(segments) == 1:
            return 'warning', '1-segment path — may be section page, not a specific article'
        return None, None
    except Exception:
        return None, None

def is_category_page_url(url):
    """True if URL matches a known category page pattern."""
    if not url:
        return False
    for pattern in CATEGORY_PAGE_PATTERNS:
        if re.search(pattern, url):
            return True
    return False

def latlon_spread(coords):
    """Return (lat_spread, lng_spread) for a list of (lat, lng) tuples."""
    if len(coords) < 2:
        return 0.0, 0.0
    lats = [c[0] for c in coords]
    lngs = [c[1] for c in coords]
    return max(lats) - min(lats), max(lngs) - min(lngs)

# ── MAIN ────────────────────────────────────────────────────────────────────

def run_checks(filepath):
    with open(filepath) as f:
        data = json.load(f)

    city        = data.get('city', '?')
    pipeline    = data.get('pipeline', '?')
    restaurants = data.get('restaurants', [])
    sources_raw = data.get('sources', {})

    n_r = len(restaurants)
    n_cp = sum(1 for r in restaurants if r.get('language_pool') == 'both')
    n_geo = sum(1 for r in restaurants if r.get('lat') is not None)

    warnings = 0
    errors   = 0

    def warn(msg):
        nonlocal warnings
        warnings += 1
        print(f'  ⚠  {msg}')

    def error(msg):
        nonlocal errors
        errors += 1
        print(f'  ✗  {msg}')

    def ok(msg):
        print(f'  ✓  {msg}')

    print()
    print(f'LOCALBITE PRE-COMMIT DIAGNOSTIC — {city}')
    print('═' * 54)
    print(f'  File:        {filepath}')
    print(f'  Pipeline:    {pipeline}')
    print(f'  Restaurants: {n_r}   CPs: {n_cp} ({100*n_cp//n_r if n_r else 0}%)')
    print(f'  Geocoded:    {n_geo}/{n_r} ({100*n_geo//n_r if n_r else 0}%)')

    # ── 1. SCHEMA ────────────────────────────────────────────────────────────
    print()
    print('── 1. SCHEMA ──────────────────────────────────────────')

    # Sources format
    if isinstance(sources_raw, list):
        error(f'sources field is a LIST ({len(sources_raw)} items) — Fix 2 should have converted this in postrun. Convert manually before committing.')
    else:
        n_sources = len(sources_raw)
        ok(f'sources field: dict format ({n_sources} sources)')

    # Sources have id field
    if isinstance(sources_raw, dict):
        missing_id = [k for k, v in sources_raw.items() if 'id' not in v]
        if missing_id:
            error(f'{len(missing_id)} source(s) missing id field: {missing_id}')
        else:
            ok('all sources have id field')

    # Required restaurant fields
    missing_name  = [r.get('name','?') for r in restaurants if not r.get('name')]
    missing_quote = [r.get('name','?') for r in restaurants if not r.get('quote')]
    missing_srcs  = [r.get('name','?') for r in restaurants if not r.get('sources')]

    if missing_name:
        error(f'{len(missing_name)} restaurant(s) missing name: {missing_name[:5]}')
    else:
        ok('all restaurants have name field')

    if missing_quote:
        warn(f'{len(missing_quote)} restaurant(s) missing quote: {[x[:40] for x in missing_quote[:5]]}')
    else:
        ok('all restaurants have quote field')

    if missing_srcs:
        error(f'{len(missing_srcs)} restaurant(s) missing sources: {missing_srcs[:5]}')
    else:
        ok('all restaurants have sources field')

    # ── 2. NEIGHBOURHOOD ─────────────────────────────────────────────────────
    print()
    print('── 2. NEIGHBOURHOOD ───────────────────────────────────')

    no_hood = [r['name'] for r in restaurants if not r.get('neighbourhood')]
    if len(no_hood) == 0:
        ok('all restaurants have neighbourhood assigned')
    elif len(no_hood) <= NEIGHBOURHOOD_DROPOUT_WARN:
        warn(f'{len(no_hood)} restaurant(s) have null neighbourhood ({100*len(no_hood)//n_r}%): {no_hood[:8]}')
    else:
        error(f'{len(no_hood)} restaurant(s) have null neighbourhood ({100*len(no_hood)//n_r}%) — neighbourhood dropout likely. Run hood-check.py')

    # ── 3. GEOCODING ─────────────────────────────────────────────────────────
    print()
    print('── 3. GEOCODING ───────────────────────────────────────')

    medium = [r for r in restaurants if r.get('geo_confidence') == 'medium' and r.get('lat') is not None]
    if not medium:
        ok('no medium-confidence geocodes')
    else:
        fp_count = 0
        print(f'  Medium-confidence matches ({len(medium)}) — review recommended:')
        for r in medium:
            mn = r.get('geo_matched_name') or ''
            is_fp, fp_label = is_false_positive(mn)
            if is_fp:
                fp_count += 1
                error(f'  {r["name"][:38]} → "{mn}" [{fp_label}] — NULL THIS')
            elif mn:
                warn(f'  {r["name"][:38]} → "{mn}" — spot-check')
            else:
                warn(f'  {r["name"][:38]} → no matched name — hollow pin, consider nulling')
        if fp_count == 0:
            ok(f'no obvious false positives in medium-confidence matches')

    # High-spread centroids — calculated from restaurant coordinates per neighbourhood
    nb_coords = defaultdict(list)
    for r in restaurants:
        nb = r.get('neighbourhood')
        lat = r.get('lat')
        lng = r.get('lng')
        if nb and lat is not None and lng is not None:
            nb_coords[nb].append((lat, lng))

    high_spread = []
    for nb, coords in nb_coords.items():
        if len(coords) < 2:
            continue
        lat_spread, _ = latlon_spread(coords)
        if lat_spread > HIGH_SPREAD_THRESHOLD:
            high_spread.append((nb, lat_spread, len(coords)))

    if not high_spread:
        ok('no high-spread centroids detected')
    else:
        for nb, spread, count in sorted(high_spread, key=lambda x: -x[1]):
            error(f'HIGH SPREAD: "{nb}" lat spread {spread:.4f} across {count} restaurants — find and null the outlier geocode')

    # ── 4. ARTICLE URLS ──────────────────────────────────────────────────────
    print()
    print('── 4. ARTICLE URLS ────────────────────────────────────')

    sources_list = list(sources_raw.values()) if isinstance(sources_raw, dict) else sources_raw
    null_urls    = [s.get('writer','?') for s in sources_list if not s.get('article_url')]
    homepage_errors   = []
    homepage_warnings = []
    category_urls     = []

    for s in sources_list:
        url = s.get('article_url')
        if not url:
            continue
        severity, reason = is_homepage_url(url)
        if severity == 'error':
            homepage_errors.append((s.get('writer','?'), url))
        elif severity == 'warning':
            homepage_warnings.append((s.get('writer','?'), url))
        if is_category_page_url(url):
            category_urls.append((s.get('writer','?'), url))

    if null_urls:
        warn(f'{len(null_urls)} source(s) with null article_url: {null_urls}')
    else:
        ok('all sources have article_url')

    if not homepage_errors and not homepage_warnings:
        ok('no homepage URLs detected')
    else:
        for writer, url in homepage_errors:
            error(f'Root homepage URL (null this): {writer} → {url}')
        for writer, url in homepage_warnings:
            warn(f'1-segment URL — review (may be section page, not a specific article): {writer} → {url}')

    if category_urls:
        for writer, url in category_urls:
            error(f'Category page URL (null this): {writer} → {url}')
    else:
        ok('no category page URLs detected')

    # ── 5. LANGUAGE POOL ─────────────────────────────────────────────────────
    print()
    print('── 5. LANGUAGE POOL ───────────────────────────────────')

    pool_issues = [
        r['name'] for r in restaurants
        if r.get('both_pool') is True and r.get('language_pool') != 'both'
    ]
    if pool_issues:
        error(f'{len(pool_issues)} both_pool restaurants with language_pool ≠ "both": {pool_issues[:5]}')
    else:
        ok('all both_pool restaurants have language_pool="both"')

    single_issues = [
        r['name'] for r in restaurants
        if r.get('both_pool') is not True and r.get('language_pool') == 'both'
    ]
    if single_issues:
        warn(f'{len(single_issues)} non-both_pool restaurants with language_pool="both": {single_issues[:5]}')
    else:
        ok('language_pool="both" only on both_pool restaurants')

    # ── 6. REMINDERS ─────────────────────────────────────────────────────────
    print()
    print('── 6. REMINDERS ───────────────────────────────────────')
    print('  ⚑  Check for Michelin-starred restaurants in the pack (manual — not automated)')
    print('  ⚑  Run viewer smoke test after committing (5 items, 2 min)')
    print('  ⚑  Verify STEP 5.5 fired: tail -1 localbite-run-metrics.log')
    if isinstance(sources_raw, dict):
        print(f'  ⚑  Confirm centroids: node localbite-approve-centroids.js {filepath} --auto-accept')

    # ── SUMMARY ──────────────────────────────────────────────────────────────
    print()
    print('═' * 54)
    if errors == 0 and warnings == 0:
        print(f'  ✓ CLEAN — {city} ready to commit')
    elif errors == 0:
        print(f'  ⚠ {warnings} warning(s), 0 errors — review warnings before committing')
    else:
        print(f'  ✗ {errors} error(s), {warnings} warning(s) — fix errors before committing')
    print()


if __name__ == '__main__':
    if len(sys.argv) < 2:
        print('Usage: python3 localbite-precommit-check.py localbite-[city]-2023-2026.json')
        sys.exit(1)
    run_checks(sys.argv[1])
