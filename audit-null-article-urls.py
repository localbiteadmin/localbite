import json, glob

results = []

for path in sorted(glob.glob('/Users/harryenchin/Documents/GitHub/localbite/localbite-*-2023-2026.json') +
                   glob.glob('/Users/harryenchin/Documents/GitHub/localbite/localbite-*-2025-2026.json')):
    try:
        d = json.load(open(path))
    except Exception as e:
        print(f'ERROR reading {path}: {e}')
        continue

    city = d.get('city', '?')
    sources = d.get('sources', {})

    # Handle both list and dict formats
    if isinstance(sources, list):
        source_list = sources
    elif isinstance(sources, dict):
        source_list = list(sources.values())
    else:
        continue

    null_sources = []
    for s in source_list:
        if not isinstance(s, dict):
            continue
        url = s.get('article_url')
        if not url:
            null_sources.append({
                'id': s.get('id', s.get('source_id', '?')),
                'publication': s.get('publication', '?'),
                'writer': s.get('writer', '?'),
            })

    if null_sources:
        results.append({'city': city, 'file': path.split('/')[-1], 'null_sources': null_sources})

# Report
if not results:
    print('✓ No null article_url sources found across fleet.')
else:
    total = sum(len(r['null_sources']) for r in results)
    print(f'Found {total} source(s) with null article_url across {len(results)} city/cities:\n')
    for r in results:
        print(f'  {r["city"]} ({r["file"]}):')
        for s in r['null_sources']:
            print(f'    • {s["publication"]} / {s["writer"]}  [id: {s["id"]}]')
    print(f'\nTotal: {total} null article_url source(s) in {len(results)} city/cities')
