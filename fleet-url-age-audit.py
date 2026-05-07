import json, glob, re
from collections import defaultdict, Counter
from datetime import datetime

BASE = '/Users/harryenchin/Documents/GitHub/localbite/'
FILES = sorted(glob.glob(BASE + 'localbite-*-2023-2026.json') +
               glob.glob(BASE + 'localbite-*-2025-2026.json'))

# ── Known bad URL patterns ─────────────────────────────────────────────────────
HOMEPAGE_PATTERNS = [
    r'^https?://[^/]+/?$',                        # bare domain
    r'^https?://[^/]+/[a-z]{2}/?$',               # domain/en or domain/fr
    r'eater\.com/[a-z-]+/?$',                     # eater city pages
    r'timeout\.com/[a-z-]+/restaurants/?$',       # timeout city restaurant pages
    r'timeout\.com/[a-z]+/restaurants/?$',
    r'katieparla\.com/restaurants/[a-z-]+/?$',    # katie parla category pages
    r'theinfatuation\.com/[a-z-]+/guides/?$',
]

def is_homepage(url):
    if not url:
        return False
    for pat in HOMEPAGE_PATTERNS:
        if re.search(pat, url, re.IGNORECASE):
            return True
    return False

# ── Report 2: article_url specificity ─────────────────────────────────────────
print('=' * 60)
print('REPORT 2 — article_url specificity audit')
print('=' * 60)

url_issues = []

for path in FILES:
    try:
        d = json.load(open(path))
    except:
        continue
    city = d.get('city', '?')
    sources = d.get('sources', {})
    if isinstance(sources, list):
        src_list = sources
    else:
        src_list = list(sources.values())

    # Check 1: homepage/category page URLs at source level
    for s in src_list:
        url = s.get('article_url')
        if url and is_homepage(url):
            url_issues.append({
                'city': city,
                'type': 'homepage/category',
                'writer': s.get('writer', '?'),
                'publication': s.get('publication', '?'),
                'url': url
            })

    # Check 2: same article_url used for multiple restaurants (per source)
    restaurants = d.get('restaurants', [])
    url_to_names = defaultdict(list)
    for r in restaurants:
        # Check restaurant-level article_url if present
        r_url = r.get('article_url')
        if r_url:
            url_to_names[r_url].append(r['name'])

    for url, names in url_to_names.items():
        if len(names) > 1 and not is_homepage(url):
            url_issues.append({
                'city': city,
                'type': f'single-review used for {len(names)} restaurants',
                'writer': '—',
                'publication': '—',
                'url': url,
                'restaurants': names
            })

if not url_issues:
    print('✓ No article_url specificity issues found.')
else:
    print(f'Found {len(url_issues)} issue(s):\n')
    for issue in url_issues:
        print(f'  [{issue["type"]}] {issue["city"]}')
        if issue["writer"] != '—':
            print(f'    {issue["publication"]} / {issue["writer"]}')
        print(f'    {issue["url"]}')
        if 'restaurants' in issue:
            print(f'    Used for: {", ".join(issue["restaurants"])}')
        print()

# ── Report 3: source age distribution ─────────────────────────────────────────
print('=' * 60)
print('REPORT 3 — source age distribution by city')
print('=' * 60)
print(f'{"City":<28} {"Oldest":>10} {"Newest":>10} {"All 2023":>9} {"Pre-2025":>9} {"2025+":>7}')
print('-' * 75)

city_ages = []

for path in FILES:
    try:
        d = json.load(open(path))
    except:
        continue
    city = d.get('city', '?')
    restaurants = d.get('restaurants', [])

    dates = []
    for r in restaurants:
        date = r.get('article_date', '')
        if date and date != 'undated' and len(date) >= 4:
            try:
                year = int(date[:4])
                if 2020 <= year <= 2026:
                    dates.append(year)
            except:
                pass

    if not dates:
        continue

    oldest = min(dates)
    newest = max(dates)
    all_2023 = all(y == 2023 for y in dates)
    pre_2025 = sum(1 for y in dates if y < 2025)
    post_2025 = sum(1 for y in dates if y >= 2025)
    total = len(dates)

    city_ages.append((city, oldest, newest, all_2023, pre_2025, post_2025, total, path))
    flag = ' ← all 2023' if all_2023 else (' ← no 2025+ sources' if post_2025 == 0 else '')
    print(f'  {city:<26} {oldest:>10} {newest:>10} {"YES" if all_2023 else "no":>9} {pre_2025:>4}/{total:<4} {post_2025:>4}/{total}{flag}')

print()
all_2023_cities = [c[0] for c in city_ages if c[3]]
no_2025_cities = [c[0] for c in city_ages if c[5] == 0 and not c[3]]

if all_2023_cities:
    print(f'Cities with ALL 2023 sources ({len(all_2023_cities)}): {", ".join(all_2023_cities)}')
if no_2025_cities:
    print(f'Cities with NO 2025+ sources ({len(no_2025_cities)}): {", ".join(no_2025_cities)}')
