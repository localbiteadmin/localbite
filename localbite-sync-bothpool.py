import json, sys

FILE = sys.argv[1] if len(sys.argv) > 1 else 'localbite-barcelona-2023-2026.json'
data = json.load(open(FILE, encoding='utf-8'))

fixed = 0
for r in data['restaurants']:
    correct = r.get('language_pool') == 'both'
    if r.get('both_pool') != correct:
        r['both_pool'] = correct
        fixed += 1
        print(f'  Fixed: {r["name"]} → both_pool={correct}')

if fixed == 0:
    print('No inconsistencies found.')
else:
    with open(FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f'\n✓ {fixed} restaurant(s) fixed in {FILE}')
