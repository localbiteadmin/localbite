import json, os

REPO = '/Users/harryenchin/Documents/GitHub/localbite'

files = [
    'localbite-rome-italy-2023-2026.json',
    'localbite-milan-italy-2023-2026.json',
    'localbite-florence-italy-2023-2026.json',
    'localbite-naples-italy-2023-2026.json',
    'localbite-bologna-italy-2023-2026.json',
    'localbite-turin-italy-2023-2026.json',
    'localbite-venice-italy-2023-2026.json',
    'localbite-palermo-italy-2023-2026.json',
    'localbite-verona-italy-2023-2026.json',
    'localbite-genoa-italy-2023-2026.json',
    'localbite-modena-italy-2023-2026.json',
    'localbite-bari-italy-2023-2026.json',
    'localbite-lecce-italy-2023-2026.json',
    'localbite-catania-italy-2023-2026.json',
    'localbite-trieste-italy-2023-2026.json',
]

output = {'cities': []}

for fname in files:
    fpath = os.path.join(REPO, fname)
    if not os.path.exists(fpath):
        print(f'MISSING: {fname}')
        continue
    try:
        d = json.load(open(fpath))
    except Exception as e:
        print(f'ERROR {fname}: {e}')
        continue

    restaurants = d.get('restaurants', [])
    sources = d.get('sources', {})
    if isinstance(sources, list):
        sources = {s.get('id') or s.get('source_id') or str(i): s
                   for i, s in enumerate(sources)}

    for r in restaurants:
        sids = r.get('sources') or r.get('source_ids') or []
        if isinstance(sids, str):
            sids = [sids]
        r['_sc'] = len(sids)

    top10 = sorted(restaurants, key=lambda r: r['_sc'], reverse=True)[:10]

    src_list = []
    for sid, s in sources.items():
        src_list.append({
            'id': sid,
            'writer': s.get('writer') or s.get('author'),
            'publication': s.get('publication') or s.get('source_name'),
            'language': s.get('language') or s.get('lang'),
        })

    rest_list = []
    for r in top10:
        sids = r.get('sources') or r.get('source_ids') or []
        if isinstance(sids, str):
            sids = [sids]
        rest_list.append({
            'name': r.get('name'),
            'neighbourhood': r.get('neighbourhood'),
            'source_count': r['_sc'],
            'both_pool': r.get('both_pool') or r.get('language_pool') == 'both',
            'source_ids': sids,
        })

    output['cities'].append({
        'city': d.get('city'),
        'country': d.get('country'),
        'file': fname,
        'pipeline': d.get('pipeline'),
        'total_r': len(restaurants),
        'sources': src_list,
        'top10_restaurants': rest_list,
    })

out_path = os.path.join(REPO, 'localbite-italy-extract.json')
with open(out_path, 'w') as f:
    json.dump(output, f, ensure_ascii=False, indent=2)

total_r = sum(c['total_r'] for c in output['cities'])
for c in output['cities']:
    bp = sum(1 for r in c['top10_restaurants'] if r['both_pool'])
    print(f"  {c['city']}: {c['total_r']}R, {len(c['sources'])} sources, top-10 BP: {bp}")

print(f'\nExtracted {len(output["cities"])} cities, {total_r} restaurants')
print(f'Saved to: {out_path}')
print(f'File size: {os.path.getsize(out_path)/1024:.0f} KB')
