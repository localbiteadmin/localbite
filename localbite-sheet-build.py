import sys

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

original = content
changes = []
errors = []

def replace_once(old, new, label):
    global content
    count = content.count(old)
    if count == 0:
        errors.append(f'NOT FOUND: {label}')
    elif count > 1:
        errors.append(f'AMBIGUOUS ({count} matches): {label}')
    else:
        content = content.replace(old, new, 1)
        changes.append(f'OK: {label}')

# ══════════════════════════════════════════════════════
# CHANGE 1 — HTML: sheet overlay and bottom sheet
# ══════════════════════════════════════════════════════
replace_once(
    '</body>',
    '''<div id="sheet-overlay" class="sheet-overlay"></div>
<div id="bottom-sheet" class="bottom-sheet">
  <div class="sheet-handle-bar"></div>
  <button class="sheet-close" id="sheet-close" aria-label="Close">✕</button>
  <div class="sheet-content" id="sheet-content"></div>
</div>
</body>''',
    'HTML: sheet overlay and bottom sheet elements'
)

# ══════════════════════════════════════════════════════
# CHANGE 2 — CSS: sheet styles
# Insertion point: after .credit-date closing brace
# ══════════════════════════════════════════════════════
replace_once(
    '''  .credit-date {
    font-size: 11px;
    color: var(--muted);
    margin-bottom: 4px;
  }''',
    '''  .credit-date {
    font-size: 11px;
    color: var(--muted);
    margin-bottom: 4px;
  }

  /* ── BOTTOM SHEET ── */
  .sheet-overlay {
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
  }
  .bottom-sheet {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: var(--warm-white);
    border-radius: 16px 16px 0 0;
    box-shadow: 0 -4px 24px rgba(0,0,0,0.12);
    z-index: 1001;
    max-height: 80vh;
    max-height: 80dvh;
    overflow-y: auto;
    overflow-x: hidden;
    transform: translateY(100%);
    transition: transform 0.28s ease;
    padding: 0 16px 48px;
    -webkit-overflow-scrolling: touch;
  }
  .bottom-sheet.open {
    transform: translateY(0);
  }
  .sheet-handle-bar {
    width: 36px;
    height: 4px;
    background: var(--border);
    border-radius: 2px;
    margin: 12px auto 8px;
  }
  .sheet-close {
    position: absolute;
    top: 8px;
    right: 12px;
    background: none;
    border: none;
    font-size: 18px;
    color: var(--mid);
    cursor: pointer;
    padding: 8px;
    line-height: 1;
    -webkit-tap-highlight-color: transparent;
  }
  .sheet-close:hover { color: var(--charcoal); }
  .sheet-content {
    max-width: 600px;
    margin: 0 auto;
  }''',
    'CSS: bottom sheet styles'
)

# ══════════════════════════════════════════════════════
# CHANGE 3 — JS: state variables and core functions
# Insertion point: after let userLatLng = null;
# ══════════════════════════════════════════════════════
replace_once(
    'let userLatLng = null;',
    '''let userLatLng = null;

// ── BOTTOM SHEET STATE ──
let selectedRestaurant = null;
let sheetOpenTimeout = null;

function openSheet(r) {
  selectedRestaurant = r;
  const content = document.getElementById('sheet-content');
  content.innerHTML = cardHTML(r);
  // Reattach interactive elements — update if cardHTML gains new handlers
  content.querySelectorAll('.writer-profile-toggle').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const el = this.nextElementSibling;
      const isOpen = el.classList.toggle('open');
      this.textContent = isOpen ? 'Hide writer ↑' : 'About this writer ↓';
    });
  });
  document.getElementById('bottom-sheet').classList.add('open');
  document.getElementById('sheet-overlay').classList.add('visible');
  // Scroll lock — prevents map scroll bleeding through sheet on mobile.
  // Note: overflow:hidden can cause page-top jump on iOS if page is scrolled.
  // Acceptable for map view. Upgrade to position:fixed approach if sheet
  // becomes accessible from list view in future.
  document.body.style.overflow = 'hidden';
}

function closeSheet() {
  if (!selectedRestaurant) return;
  selectedRestaurant = null;
  if (sheetOpenTimeout) { clearTimeout(sheetOpenTimeout); sheetOpenTimeout = null; }
  document.getElementById('bottom-sheet').classList.remove('open');
  document.getElementById('sheet-overlay').classList.remove('visible');
  document.body.style.overflow = '';
}

document.getElementById('sheet-close').addEventListener('click', closeSheet);
document.getElementById('sheet-overlay').addEventListener('click', closeSheet);
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && selectedRestaurant) closeSheet();
});''',
    'JS: sheet state variables and core functions'
)

# ══════════════════════════════════════════════════════
# CHANGE 4 — JS: map marker click handler
# Remove bindPopup, add sheet click handler
# ══════════════════════════════════════════════════════
replace_once(
    '''    const marker = L.marker([r.lat, r.lng], { icon })
      .addTo(leafletMap)
      .bindPopup(popupContent, { maxWidth: 240 });

    mapMarkers.push(marker);''',
    '''    const marker = L.marker([r.lat, r.lng], { icon })
      .addTo(leafletMap)
      .on('click', function() {
        if (sheetOpenTimeout) clearTimeout(sheetOpenTimeout);
        if (selectedRestaurant) {
          closeSheet();
          sheetOpenTimeout = setTimeout(function() {
            openSheet(r);
            sheetOpenTimeout = null;
          }, 280);
        } else {
          openSheet(r);
        }
      });

    mapMarkers.push(marker);''',
    'JS: marker click opens sheet instead of popup'
)

# ══════════════════════════════════════════════════════
# CHANGE 5 — JS: applyFilters — close sheet on filter change
# ══════════════════════════════════════════════════════
replace_once(
    '''function applyFilters() {
  renderCards(getFilteredRestaurants());
  maybeUpdateMap();
}''',
    '''function applyFilters() {
  closeSheet();
  renderCards(getFilteredRestaurants());
  maybeUpdateMap();
}''',
    'JS: applyFilters closes sheet'
)

# ══════════════════════════════════════════════════════
# CHANGE 6 — JS: filter-clear handler — close sheet + fix missing maybeUpdateMap
# ══════════════════════════════════════════════════════
replace_once(
    """document.getElementById('filter-clear').addEventListener('click', () => {
  resetFilters();
  renderCards(allRestaurants);
});""",
    """document.getElementById('filter-clear').addEventListener('click', () => {
  closeSheet();
  resetFilters();
  renderCards(allRestaurants);
  maybeUpdateMap();
});""",
    'JS: filter-clear closes sheet and fixes missing maybeUpdateMap'
)

# ══════════════════════════════════════════════════════
# CHANGE 7 — JS: resetMap — close sheet first
# ══════════════════════════════════════════════════════
replace_once(
    '''function resetMap() {
  if (leafletMap) {
    leafletMap.remove();
    leafletMap = null;
  }
  mapMarkers = [];
  setView('list');
}''',
    '''function resetMap() {
  closeSheet();
  if (leafletMap) {
    leafletMap.remove();
    leafletMap = null;
  }
  mapMarkers = [];
  setView('list');
}''',
    'JS: resetMap closes sheet first'
)

# ══════════════════════════════════════════════════════
# CHANGE 8 — JS: view toggle handlers — close sheet on switch
# ══════════════════════════════════════════════════════
replace_once(
    """document.getElementById('btn-list').addEventListener('click', function() {
  setView('list');
});
document.getElementById('btn-map').addEventListener('click', function() {
  setView('map');
});""",
    """document.getElementById('btn-list').addEventListener('click', function() {
  closeSheet();
  setView('list');
});
document.getElementById('btn-map').addEventListener('click', function() {
  closeSheet();
  setView('map');
});""",
    'JS: view toggles close sheet'
)

# ══════════════════════════════════════════════════════
# CHANGE 9 — JS: handleFindMe toggle-off — close sheet
# ══════════════════════════════════════════════════════
replace_once(
    '''    proximityMode = false;
    userLatLng = null;
    btn.classList.remove('active');
    btn.textContent = '◎ Near me';
    if (userLocationMarker && leafletMap) {
      leafletMap.removeLayer(userLocationMarker);
      userLocationMarker = null;
    }
    renderCards(getFilteredRestaurants());
    return;''',
    '''    proximityMode = false;
    userLatLng = null;
    btn.classList.remove('active');
    btn.textContent = '◎ Near me';
    if (userLocationMarker && leafletMap) {
      leafletMap.removeLayer(userLocationMarker);
      userLocationMarker = null;
    }
    closeSheet();
    renderCards(getFilteredRestaurants());
    return;''',
    'JS: handleFindMe toggle-off closes sheet'
)

# ══════════════════════════════════════════════════════
# CHANGE 10 — JS: handleFindMe toggle-on — close sheet
# ══════════════════════════════════════════════════════
replace_once(
    '''      proximityMode = true;
      btn.classList.remove('loading');
      btn.classList.add('active');
      btn.textContent = '◎ Near me ✕';

      renderCards(getFilteredRestaurants());''',
    '''      proximityMode = true;
      btn.classList.remove('loading');
      btn.classList.add('active');
      btn.textContent = '◎ Near me ✕';

      closeSheet();
      renderCards(getFilteredRestaurants());''',
    'JS: handleFindMe toggle-on closes sheet'
)

# ══════════════════════════════════════════════════════
# RESULTS
# ══════════════════════════════════════════════════════
print(f'\nTotal changes attempted: {len(changes) + len(errors)}')
print(f'Succeeded: {len(changes)}')
print(f'Failed: {len(errors)}')
print()
for c in changes:
    print(f'  OK: {c}')
for e in errors:
    print(f'  FAIL: {e}')

if errors:
    print('\nNO CHANGES WRITTEN — file untouched')
    sys.exit(1)
else:
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    added = len(content) - len(original)
    print(f'\nSUCCESS — index.html updated (+{added} chars)')
