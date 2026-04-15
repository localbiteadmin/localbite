import sys

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

old = """document.getElementById('sheet-close').addEventListener('click', closeSheet);
document.getElementById('sheet-overlay').addEventListener('click', closeSheet);
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && selectedRestaurant) closeSheet();
});"""

new = """// Sheet dismiss listeners attached after DOM ready (elements are at end of body)"""

old2 = """document.addEventListener('DOMContentLoaded', function() {
  const sel = document.getElementById('city-select');
  if (sel) sel.addEventListener('change', resetMap);
});"""

new2 = """document.addEventListener('DOMContentLoaded', function() {
  const sel = document.getElementById('city-select');
  if (sel) sel.addEventListener('change', resetMap);
  document.getElementById('sheet-close').addEventListener('click', closeSheet);
  document.getElementById('sheet-overlay').addEventListener('click', closeSheet);
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && selectedRestaurant) closeSheet();
  });
});"""

count1 = content.count(old)
count2 = content.count(old2)

if count1 != 1:
    print(f'ERROR: first target found {count1} times (expected 1)')
    sys.exit(1)
if count2 != 1:
    print(f'ERROR: second target found {count2} times (expected 1)')
    sys.exit(1)

content = content.replace(old, new, 1)
content = content.replace(old2, new2, 1)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print('SUCCESS — sheet dismiss listeners moved inside DOMContentLoaded')
