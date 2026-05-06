"""
localbite-geocode-add-france.py
Add France city bounding boxes to localbite-geocode.js.
Dry-run-first pattern: verifies target string exists exactly once before modifying.

Usage:
    python3 localbite-geocode-add-france.py [--dry-run]
"""
import sys
import re

FILE = 'localbite-geocode.js'
DRY_RUN = '--dry-run' in sys.argv

# Anchor: the last entry before the closing brace of CITY_BOXES.
# We look for the Toronto entry (or whatever is last) and insert after it.
# Safer: insert before the closing '};' of the CITY_BOXES block.
# The exact anchor is the last closing entry of the CITY_BOXES object.
ANCHOR = "  'Toronto':      { latMin: 43.58, latMax: 43.86, lngMin: -79.64, lngMax: -79.11 },"

FRANCE_BOXES = """
  // France — added localbite-geocode-add-france.py 2026-05-05
  'Paris':       { latMin: 48.815, latMax: 49.005, lngMin:  2.225, lngMax:  2.465 },
  'Lyon':        { latMin: 45.700, latMax: 45.830, lngMin:  4.790, lngMax:  4.940 },
  'Bordeaux':    { latMin: 44.795, latMax: 44.930, lngMin: -0.640, lngMax: -0.510 },
  'Marseille':   { latMin: 43.200, latMax: 43.410, lngMin:  5.280, lngMax:  5.565 },
  'Nice':        { latMin: 43.640, latMax: 43.760, lngMin:  7.185, lngMax:  7.325 },
  'Toulouse':    { latMin: 43.530, latMax: 43.680, lngMin:  1.330, lngMax:  1.515 },
  'Strasbourg':  { latMin: 48.510, latMax: 48.630, lngMin:  7.670, lngMax:  7.840 },
  'Nantes':      { latMin: 47.175, latMax: 47.305, lngMin: -1.625, lngMax: -1.475 },
  'Montpellier': { latMin: 43.560, latMax: 43.670, lngMin:  3.795, lngMax:  3.935 },
  'Biarritz':    { latMin: 43.440, latMax: 43.540, lngMin: -1.620, lngMax: -1.400 },"""

def main():
    with open(FILE, encoding='utf-8') as f:
        content = f.read()

    # Dry-run check
    count = content.count(ANCHOR)
    if count != 1:
        print(f'ERROR: anchor found {count} times (expected exactly 1). Aborting.')
        sys.exit(1)

    # Check none of the France cities already exist
    for city in ['Paris', 'Lyon', 'Bordeaux', 'Marseille', 'Nice', 'Toulouse',
                 'Strasbourg', 'Nantes', 'Montpellier', 'Biarritz']:
        if f"'{city}':" in content:
            print(f'WARNING: {city} already exists in CITY_BOXES — skipping insert.')
            sys.exit(0)

    new_content = content.replace(ANCHOR, ANCHOR + FRANCE_BOXES)

    if DRY_RUN:
        print('DRY RUN — no files modified.')
        print(f'Would insert after: {ANCHOR[:60]}...')
        print(f'Insertion:\n{FRANCE_BOXES}')
        return

    with open(FILE, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print(f'Written. Added 10 France city boxes to {FILE}.')

    # Verify
    with open(FILE, encoding='utf-8') as f:
        verify = f.read()
    added = sum(1 for c in ['Paris', 'Lyon', 'Bordeaux', 'Marseille', 'Nice',
                             'Toulouse', 'Strasbourg', 'Nantes', 'Montpellier', 'Biarritz']
                if f"'{c}':" in verify)
    print(f'Verification: {added}/10 France cities found in updated file.')

if __name__ == '__main__':
    main()
