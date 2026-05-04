#!/usr/bin/env python3
"""
LocalBite — Portugal & Morocco extract generator
Run from: /Users/harryenchin/Documents/GitHub/localbite
Output:   localbite-portugal-morocco-extract.json

Usage:
    python3 extract-portugal-morocco.py

Matches the format of localbite-italy-extract.json used in the Italy
writer discovery test. Upload the output JSON back to Claude to run
Phase A/B/C analysis.
"""

import json
import glob
import os
from collections import Counter

# ── City targets ──────────────────────────────────────────────────────────────
TARGETS = {
    "Portugal": ["lisbon", "porto"],
    "Morocco":  ["fes", "marrakesh", "rabat", "chefchaouen"],
}

# ── File discovery ────────────────────────────────────────────────────────────
def find_city_file(city_slug):
    """Find the JSON file for a given city slug, trying all known patterns."""
    patterns = [
        f"localbite-{city_slug}-2023-2026.json",
        f"localbite-{city_slug}-2025-2026.json",
        f"localbite-{city_slug}-morocco-2023-2026.json",
        f"localbite-{city_slug}-morocco-2025-2026.json",
        f"localbite-{city_slug}-portugal-2023-2026.json",
    ]
    for pattern in patterns:
        matches = glob.glob(pattern)
        if matches:
            return matches[0]
    # fallback: wider glob
    matches = glob.glob(f"localbite-{city_slug}*2023*.json") + \
              glob.glob(f"localbite-{city_slug}*2025*.json")
    matches = [m for m in matches if "raw" not in m and "working" not in m]
    return matches[0] if matches else None

# ── Source extraction ─────────────────────────────────────────────────────────
def extract_sources(data):
    """
    Extract distinct sources from a city JSON.
    Handles both dict and list formats for the sources field.
    Returns list of {writer, publication, language} dicts, deduplicated by publication.
    """
    sources_raw = data.get("sources", [])
    if isinstance(sources_raw, dict):
        sources_raw = list(sources_raw.values())

    seen_pubs = {}
    for s in sources_raw:
        pub = s.get("publication") or s.get("url") or "unknown"
        writer = s.get("writer") or s.get("name") or None
        lang = s.get("language") or "?"
        if pub not in seen_pubs:
            seen_pubs[pub] = {"writer": writer, "publication": pub, "language": lang}
    return list(seen_pubs.values())

# ── Restaurant source-count analysis ─────────────────────────────────────────
def top_restaurants(data, n=10):
    """
    Return top N restaurants by source count, with both_pool flag.
    Handles sources as list of strings or list of dicts.
    """
    restaurants = data.get("restaurants", [])
    results = []
    for r in restaurants:
        srcs = r.get("sources", [])
        # sources can be list of str IDs or list of dicts
        count = len(srcs) if isinstance(srcs, list) else 1
        # also check source_count field if present
        count = r.get("source_count", count)
        results.append({
            "name": r.get("name", "?"),
            "neighbourhood": r.get("neighbourhood"),
            "source_count": count,
            "both_pool": r.get("both_pool", False) or r.get("language_pool") == "both",
        })
    results.sort(key=lambda x: x["source_count"], reverse=True)
    return results[:n]

# ── Main ──────────────────────────────────────────────────────────────────────
def main():
    output = {"cities": []}
    missing = []

    for country, slugs in TARGETS.items():
        for slug in slugs:
            fpath = find_city_file(slug)
            if not fpath:
                missing.append(slug)
                print(f"  ✗ {slug} — no file found")
                continue

            with open(fpath, encoding="utf-8") as f:
                data = json.load(f)

            city_name = data.get("city", slug.title())
            restaurants = data.get("restaurants", [])
            total_r = len(restaurants)
            total_bp = sum(
                1 for r in restaurants
                if r.get("both_pool") or r.get("language_pool") == "both"
            )
            pipeline = data.get("pipeline", "?")

            sources = extract_sources(data)
            top10 = top_restaurants(data, n=10)

            city_entry = {
                "city": city_name,
                "country": country,
                "file": fpath,
                "pipeline": pipeline,
                "total_r": total_r,
                "total_bp": total_bp,
                "sources": sources,
                "top10_restaurants": top10,
            }
            output["cities"].append(city_entry)

            bp_pct = round(total_bp / total_r * 100) if total_r else 0
            print(f"  ✓ {city_name} ({country}): {total_r}R, {total_bp}BP ({bp_pct}%), "
                  f"{len(sources)} distinct publishers — {fpath}")

    if missing:
        print(f"\n  Missing files for: {', '.join(missing)}")
        print("  Check that these JSON files exist in the current directory.")

    out_path = "localbite-portugal-morocco-extract.json"
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)

    print(f"\n✓ Wrote {out_path} ({len(output['cities'])} cities)")
    print("  Upload this file to Claude to continue the Phase A/B/C analysis.")

if __name__ == "__main__":
    print("LocalBite — Portugal & Morocco extract generator")
    print("=" * 55)
    main()
