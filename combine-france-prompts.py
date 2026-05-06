"""
combine-france-prompts.py
Combines a France Part 1 city variables file with the v7.1 pipeline template
to produce a full runnable prompt file.

Usage:
    python3 combine-france-prompts.py localbite-prompt-v7-template.txt
    python3 combine-france-prompts.py localbite-prompt-v7-template.txt --city paris
    python3 combine-france-prompts.py localbite-prompt-v7-template.txt --all

Without --city or --all, generates full prompts for all 10 France cities.
"""
import sys
import os

TEMPLATE_FILE = sys.argv[1] if len(sys.argv) > 1 else 'localbite-prompt-v7-template.txt'

FRANCE_CITIES = [
    'paris',
    'lyon',
    'bordeaux',
    'marseille',
    'nice',
    'toulouse',
    'strasbourg',
    'nantes',
    'montpellier',
    'biarritz',
]

def get_cities():
    if '--city' in sys.argv:
        idx = sys.argv.index('--city')
        return [sys.argv[idx + 1].lower()]
    return FRANCE_CITIES

def main():
    if not os.path.exists(TEMPLATE_FILE):
        print(f'ERROR: template not found: {TEMPLATE_FILE}')
        sys.exit(1)

    with open(TEMPLATE_FILE, encoding='utf-8') as f:
        template = f.read()

    cities = get_cities()
    generated = []
    skipped = []

    for city in cities:
        part1_file = f'localbite-prompt-v71-{city}-france-part1.txt'
        output_file = f'localbite-{city}-france-full.txt'

        if not os.path.exists(part1_file):
            print(f'SKIP: {part1_file} not found')
            skipped.append(city)
            continue

        with open(part1_file, encoding='utf-8') as f:
            part1 = f.read()

        full_prompt = part1.rstrip() + '\n\n' + '=' * 72 + '\n' + template.lstrip()

        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(full_prompt)

        chars = len(full_prompt)
        print(f'Generated: {output_file} ({chars:,} chars)')
        generated.append(output_file)

    print()
    print(f'Generated: {len(generated)} / Skipped: {len(skipped)} / Total: {len(cities)}')
    if skipped:
        print(f'Missing Part 1 files: {skipped}')

if __name__ == '__main__':
    main()
