import sys

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

errors = []
changes = []

def replace_once(old, new, label):
    global content
    count = content.count(old)
    if count == 0:
        errors.append(f'NOT FOUND: {label}')
        return
    elif count > 1:
        errors.append(f'AMBIGUOUS ({count} matches): {label}')
        return
    content = content.replace(old, new, 1)
    changes.append(f'OK: {label}')

# 1 — Remove overlay CSS block (inset: 0 version — confirmed in file)
replace_once(
    '''  .sheet-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.25);
    z-index: 1000;
    display: none;
    opacity: 0;
    transition: opacity 0.28s ease;
    -webkit-tap-highlight-color: transparent;
  }
  .sheet-overlay.visible {
    display: block;
    opacity: 1;
  }''',
    '  /* sheet-overlay removed — dismissal handled by map-container click */',
    'CSS: remove overlay styles'
)

# 2 — Remove overlay show in openSheet()
replace_once(
    "  document.getElementById('sheet-overlay').classList.add('visible');",
    '',
    'JS openSheet: remove overlay show'
)

# 3 — Remove overlay hide in closeSheet()
replace_once(
    "  document.getElementById('sheet-overlay').classList.remove('visible');",
    '',
    'JS closeSheet: remove overlay hide'
)

# 4 — Replace overlay click listener with map-container click listener
replace_once(
    "  document.getElementById('sheet-overlay').addEventListener('click', closeSheet);",
    """  document.getElementById('map-container').addEventListener('click', function(e) {
    if (selectedRestaurant && e.target === this) closeSheet();
  });""",
    'JS: map-container empty-space click dismissal'
)

# 5 — Remove overlay HTML element
replace_once(
    '<div id="sheet-overlay" class="sheet-overlay"></div>\n',
    '',
    'HTML: remove overlay element'
)

print(f'Changes attempted: {len(changes) + len(errors)}')
print(f'Succeeded: {len(changes)}')
print(f'Failed: {len(errors)}')
print()
for c in changes:
    print(f'  {c}')
for e in errors:
    print(f'  FAIL: {e}')

if errors:
    print('\nNO CHANGES WRITTEN — file untouched')
    sys.exit(1)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print('\nSUCCESS — overlay removed; map-container handles empty-space dismissal')
print('Bugs resolved: filter clear, city selector, pin switching, Near me button')
