#!/usr/bin/env python3
"""
Generic neighbourhood dropout diagnostic.
Usage: python3 hood-check.py localbite-[city]-italy-2023-2026.json
"""
import json, sys
from collections import Counter

if len(sys.argv) < 2:
    print("Usage: python3 hood-check.py <city-json-file>")
    sys.exit(1)

f = sys.argv[1]
d = json.load(open(f))
restaurants = d.get('restaurants', [])

hoods = Counter(r.get('neighbourhood') for r in restaurants)
null_count = hoods.get(None, 0) + hoods.get('unknown', 0)
total = len(restaurants)

print(f"\nNeighbourhood distribution — {d.get('city', f)} ({total} restaurants):")
for h, c in hoods.most_common():
    flag = " ⚠" if h is None else ""
    print(f"  {str(h):30s} {c}{flag}")

print(f"\nNull/unknown: {null_count}/{total} ({100*null_count//total}%)")
if null_count > 5:
    print("⚠  DROPOUT DETECTED — coordinate-based repair required")
else:
    print("✓  Within acceptable range")

# Also show restaurants with null neighbourhood and valid coords (fixable)
fixable = [r for r in restaurants if not r.get('neighbourhood') and r.get('lat')]
if fixable:
    print(f"\nFixable via coordinates ({len(fixable)} restaurants with null hood but valid coords):")
    for r in fixable:
        print(f"  {r['name']:40s} lat={r.get('lat')} lng={r.get('lng')}")
