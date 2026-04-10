#!/usr/bin/env python3
"""
localbite-centroids-patch.py
Adds missing neighbourhood centroid entries to index.html.
Appends Rabat, Chefchaouen, Lisbon sections in the existing flat format.
Also adds 4 missing Toronto neighbourhoods.

Run from ~/Documents/GitHub/localbite/:
    python3 localbite-centroids-patch.py

Safe to inspect output before committing:
    grep -A 40 "// Rabat" index.html
"""

import sys
import os

INDEX_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'index.html')

# ── New entries to add ──
# Coordinates verified via Nominatim/OpenStreetMap.
# Toronto entries: 4 neighbourhoods present in localbite-toronto-2025-2026.json
# but missing from the CENTROIDS block.

TORONTO_ADDITIONS = """
  // Toronto (additions)
  'Bloor West Village': [43.6502, -79.4805],
  'Greektown (Danforth)': [43.6781, -79.3498],
  'Scarborough': [43.7730, -79.2576],
  'Weston': [43.7000, -79.5128],"""

RABAT_BLOCK = """
  // Rabat
  'Agdal': [33.9983, -6.8543],
  'Hassan': [34.0139, -6.8256],
  'Medina': [34.0194, -6.8278],
  'Souissi': [33.9688, -6.8348],"""

CHEFCHAOUEN_BLOCK = """
  // Chefchaouen
  'Medina': [35.1694, -5.2613],
  'Place Uta el-Hammam': [35.1694, -5.2686],"""

LISBON_BLOCK = """
  // Lisbon
  'Alc\u00e2ntara': [38.7039, -9.1824],
  'Alfama': [38.7118, -9.1284],
  'Alvalade': [38.7473, -9.1396],
  'Amoreiras': [38.7221, -9.1609],
  'Anjos': [38.7239, -9.1345],
  'Avenida da Liberdade': [38.7248, -9.1497],
  'Avenidas Novas': [38.7364, -9.1498],
  'Bairro Alto': [38.7134, -9.1456],
  'Baixa': [38.7101, -9.1370],
  'Bel\u00e9m': [38.7055, -9.2132],
  'Cais do Sodr\u00e9': [38.7062, -9.1468],
  'Campo Pequeno': [38.7426, -9.1456],
  'Campo de Ourique': [38.7153, -9.1679],
  'Chiado': [38.7103, -9.1405],
  'Estefânia': [38.7228, -9.1356],
  'Gra\u00e7a': [38.7188, -9.1292],
  'Intendente': [38.7232, -9.1352],
  'Lapa': [38.7119, -9.1596],
  'Marvila': [38.7460, -9.1056],
  'Pa\u00e7o da Rainha': [38.7235, -9.1382],
  'Pr\u00edncipe Real': [38.7159, -9.1483],
  'Santa Apol\u00f3nia': [38.7127, -9.1218],
  'Santos': [38.7073, -9.1519],
  'S\u00e3o Bento': [38.7137, -9.1548],"""

def main():
    if not os.path.exists(INDEX_PATH):
        print(f'ERROR: index.html not found at {INDEX_PATH}')
        sys.exit(1)

    with open(INDEX_PATH, 'r', encoding='utf-8') as f:
        content = f.read()

    # ── Verify we're looking at the right structure ──
    CENTROIDS_MARKER = '// ── NEIGHBOURHOOD CENTROIDS ──'
    CENTROIDS_CLOSE  = '\n};'

    if CENTROIDS_MARKER not in content:
        print('ERROR: Could not find NEIGHBOURHOOD CENTROIDS marker in index.html')
        sys.exit(1)

    # Find the exact closing }; of the CENTROIDS block.
    # CENTROIDS block starts at CENTROIDS_MARKER.
    # We find the FIRST standalone "};" after that marker.
    centroids_start = content.index(CENTROIDS_MARKER)
    # Search for closing }; from just after the marker
    search_from = centroids_start + len(CENTROIDS_MARKER)
    close_idx = content.find('\n};', search_from)

    if close_idx == -1:
        print('ERROR: Could not find closing }; for CENTROIDS block')
        sys.exit(1)

    # ── Sanity check: show what comes just before the closing }; ──
    preview_start = max(search_from, close_idx - 100)
    preview = content[preview_start:close_idx]
    print('Last ~100 chars before CENTROIDS closing };:')
    print(repr(preview))
    print()

    # ── Check which sections are already present ──
    sections_to_add = []

    # Toronto additions (check if Bloor West Village is already there)
    if "'Bloor West Village'" not in content and '"Bloor West Village"' not in content:
        sections_to_add.append(('Toronto additions', TORONTO_ADDITIONS))
    else:
        print('INFO: Toronto additions already present — skipping')

    if '// Rabat' not in content:
        sections_to_add.append(('Rabat', RABAT_BLOCK))
    else:
        print('INFO: Rabat section already present — skipping')

    if '// Chefchaouen' not in content:
        sections_to_add.append(('Chefchaouen', CHEFCHAOUEN_BLOCK))
    else:
        print('INFO: Chefchaouen section already present — skipping')

    if '// Lisbon' not in content:
        sections_to_add.append(('Lisbon', LISBON_BLOCK))
    else:
        print('INFO: Lisbon section already present — skipping')

    if not sections_to_add:
        print('All sections already present. Nothing to do.')
        sys.exit(0)

    # ── Build insertion string ──
    insertion = ''
    for name, block in sections_to_add:
        insertion += block
        print(f'Adding: {name}')

    # ── Insert before the closing }; ──
    new_content = content[:close_idx] + insertion + content[close_idx:]

    # ── Write back ──
    with open(INDEX_PATH, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print()
    print('Done. index.html updated.')
    print()
    print('Verify with:')
    print('  grep -n "// Rabat" index.html')
    print('  grep -n "// Chefchaouen" index.html')
    print('  grep -n "// Lisbon" index.html')
    print('  grep -n "Bloor West" index.html')
    print()
    print('Then check CITY_BOUNDS is intact:')
    print('  grep -n "const CITY_BOUNDS" index.html')
    print()
    print('Do NOT commit yet — run localbite-viewer-update.js tests first.')

if __name__ == '__main__':
    main()
