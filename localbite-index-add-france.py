"""
localbite-index-add-france.py
Add 10 France cities as coming_soon entries to localbite-index.json.
Dry-run-first pattern.
"""
import json
import sys
from datetime import date

FILE = 'localbite-index.json'
DRY_RUN = '--dry-run' in sys.argv

FRANCE_CITIES = [
    { "city": "Biarritz",    "city_slug": "biarritz-france",    "file": "localbite-biarritz-france-2023-2026.json" },
    { "city": "Bordeaux",    "city_slug": "bordeaux-france",    "file": "localbite-bordeaux-france-2023-2026.json" },
    { "city": "Lyon",        "city_slug": "lyon-france",        "file": "localbite-lyon-france-2023-2026.json" },
    { "city": "Marseille",   "city_slug": "marseille-france",   "file": "localbite-marseille-france-2023-2026.json" },
    { "city": "Montpellier", "city_slug": "montpellier-france", "file": "localbite-montpellier-france-2023-2026.json" },
    { "city": "Nantes",      "city_slug": "nantes-france",      "file": "localbite-nantes-france-2023-2026.json" },
    { "city": "Nice",        "city_slug": "nice-france",        "file": "localbite-nice-france-2023-2026.json" },
    { "city": "Paris",       "city_slug": "paris-france",       "file": "localbite-paris-france-2023-2026.json" },
    { "city": "Strasbourg",  "city_slug": "strasbourg-france",  "file": "localbite-strasbourg-france-2023-2026.json" },
    { "city": "Toulouse",    "city_slug": "toulouse-france",    "file": "localbite-toulouse-france-2023-2026.json" },
]

def make_entry(c):
    return {
        "city": c["city"],
        "country": "France",
        "city_slug": c["city_slug"],
        "pipeline": "localbite-v7.1",
        "built": str(date.today()),
        "restaurant_count": 0,
        "both_pool_count": 0,
        "source_count": 0,
        "file": c["file"],
        "status": "coming_soon",
        "open_status_check_count": 0,
        "notes": "France batch — pipeline pending"
    }

def main():
    with open(FILE, encoding='utf-8') as f:
        data = json.load(f)

    existing_slugs = {c['city_slug'] for c in data['cities']}

    to_add = []
    for c in FRANCE_CITIES:
        if c['city_slug'] in existing_slugs:
            print(f'SKIP: {c["city"]} already in index')
        else:
            to_add.append(make_entry(c))

    if not to_add:
        print('Nothing to add.')
        return

    if DRY_RUN:
        print(f'DRY RUN — would add {len(to_add)} cities:')
        for e in to_add:
            print(f'  {e["city"]} ({e["city_slug"]}) — {e["status"]}')
        return

    data['cities'].extend(to_add)
    data['last_updated'] = str(date.today())

    with open(FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f'Added {len(to_add)} France cities to {FILE}.')
    for e in to_add:
        print(f'  {e["city"]}')

if __name__ == '__main__':
    main()
