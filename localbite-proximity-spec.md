# LocalBite Proximity Feature — Build Spec
### Version 1.1 — 2026-03-31

---

## 1. Overview

Add a **Find Me** button to the map view that:
1. Requests the user's geolocation (one-shot)
2. Places a blue dot on the map at their location
3. Calculates distance from the user to every restaurant with verified coordinates
4. Sorts the card list by distance ascending
5. Shows a distance badge on each card with a verified coordinate
6. Shows a toast if the user is outside the city bounding box
7. Toggles off on second tap, restoring default sort order

**Target file:** `~/Documents/GitHub/localbite/index.html`
**Viewer:** Static GitHub Pages — no build step, no dependencies to add
**Leaflet:** Already loaded — `L` is available globally

---

## 2. Decisions Recorded

| Question | Decision |
|----------|----------|
| User not in city | Show non-blocking toast; still sort by distance |
| Sort behaviour | Toggle: active button replaces default sort; tap again resets |
| Centroid-only restaurants | Show last, no distance badge |
| Map recentre | Recentre on user only if within city bounding box |
| Location method | One-shot `getCurrentPosition` — no live tracking |
| Location method rationale | `watchPosition` adds cleanup complexity and moving-dot distraction with no meaningful UX benefit for a browse-and-plan use case |

---

## 3. New Variables

Add at the module level alongside `leafletMap` (line 1418) and `currentView` (line 1420):

```javascript
let userLocationMarker = null;   // Leaflet circle marker for blue dot
let proximityMode = false;       // Whether proximity sort is currently active
let userLatLng = null;           // { lat, lng } — stored for re-sort on filter change
```

---

## 4. City Bounding Boxes

A `CITY_BOUNDS` lookup is needed to:
- Validate that the user is within the city before recentring the map
- Determine the "outside city" toast condition

Add alongside the existing `CITY_CENTRES` object:

```javascript
const CITY_BOUNDS = {
  'Barcelona':    { minLat: 41.32, maxLat: 41.47, minLng: 2.05,  maxLng: 2.23  },
  'Valencia':     { minLat: 39.42, maxLat: 39.53, minLng: -0.43, maxLng: -0.31 },
  'Lisbon':       { minLat: 38.69, maxLat: 38.80, minLng: -9.23, maxLng: -9.09 },
  'Fes':          { minLat: 33.97, maxLat: 34.08, minLng: -5.03, maxLng: -4.95 },
  'Marrakesh':    { minLat: 31.60, maxLat: 31.66, minLng: -8.03, maxLng: -7.96 },
  'Rabat':        { minLat: 33.96, maxLat: 34.04, minLng: -6.88, maxLng: -6.80 },
  'Chefchaouen':  { minLat: 35.16, maxLat: 35.18, minLng: -5.27, maxLng: -5.25 },
  'Toronto':      { minLat: 43.58, maxLat: 43.86, minLng: -79.64, maxLng: -79.12 },
};
```

Helper function to check if a coordinate is within a city's bounding box:

```javascript
function isWithinCityBounds(lat, lng, cityName) {
  const bounds = CITY_BOUNDS[cityName];
  if (!bounds) return true; // Unknown city — don't block
  return lat >= bounds.minLat && lat <= bounds.maxLat &&
         lng >= bounds.minLng && lng <= bounds.maxLng;
}
```

---

## 5. Haversine Distance Function

Add as a standalone utility function:

```javascript
function haversineKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng/2) * Math.sin(dLng/2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}
```

---

## 6. Toast Function

A lightweight non-blocking toast — reusable for both the "outside city" message and geolocation errors. Add as a standalone function:

```javascript
function showToast(message, durationMs = 4000) {
  const existing = document.getElementById('localbite-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'localbite-toast';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--charcoal);
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    padding: 10px 18px;
    border-radius: 20px;
    z-index: 9999;
    pointer-events: none;
    opacity: 1;
    transition: opacity 0.4s;
  `;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 400);
  }, durationMs);
}
```

---

## 7. Find Me Button — HTML

Inject the button into `<div id="map">` immediately after the map div is referenced, or add it directly in the HTML at line 928:

```html
<div id="map">
  <button id="find-me-btn" title="Sort by distance from my location">
    ◎ Near me
  </button>
</div>
```

---

## 8. Find Me Button — CSS

Add to the `/* ── MAP VIEW ── */` CSS section alongside `.view-btn`:

```css
#find-me-btn {
  position: absolute;
  bottom: 16px;
  right: 10px;
  z-index: 1000;
  font-family: 'DM Sans', sans-serif;
  font-size: 12px;
  font-weight: 500;
  padding: 5px 12px;
  border-radius: 20px;
  border: 1px solid var(--border);
  background: var(--cream);
  color: var(--muted);
  cursor: pointer;
  transition: all 0.15s;
  display: none; /* shown only in map view — see Section 10 */
}

#find-me-btn.active {
  background: var(--charcoal);
  color: #fff;
  border-color: var(--charcoal);
}

#find-me-btn.loading {
  opacity: 0.6;
  cursor: default;
}
```

Also add `position: relative` to the existing `#map` rule (line 718) so the absolute-positioned button anchors correctly inside it:

```css
#map {
  position: relative;   /* ADD THIS LINE */
  height: 520px;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  z-index: 1;
}
```

**Leaflet zoom controls** default to top-left — no collision with bottom-right button placement.

**Mobile (600px breakpoint):** `#map` is 380px tall at this breakpoint (line 773). Bottom-right placement remains clear. No additional mobile CSS needed.

---

## 9. Core Find Me Logic

Add as a standalone function `handleFindMe()`:

```javascript
function handleFindMe() {
  const btn = document.getElementById('find-me-btn');

  // Toggle off if already active
  if (proximityMode) {
    proximityMode = false;
    userLatLng = null;
    btn.classList.remove('active');
    btn.textContent = '◎ Near me';
    if (userLocationMarker && leafletMap) {
      leafletMap.removeLayer(userLocationMarker);
      userLocationMarker = null;
    }
    renderCards(getFilteredRestaurants());
    return;
  }

  // Prevent double-tap while loading
  if (btn.classList.contains('loading')) return;

  btn.classList.add('loading');
  btn.textContent = '◎ Locating…';

  if (!navigator.geolocation) {
    showToast('Geolocation is not supported by your browser.');
    btn.classList.remove('loading');
    btn.textContent = '◎ Near me';
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude: lat, longitude: lng } = position.coords;
      const cityName = currentCityData ? currentCityData.city : null;

      // Place blue dot
      if (userLocationMarker && leafletMap) {
        leafletMap.removeLayer(userLocationMarker);
      }
      userLocationMarker = L.circleMarker([lat, lng], {
        radius: 8,
        fillColor: '#4A90E2',
        fillOpacity: 1,
        color: '#fff',
        weight: 2
      }).addTo(leafletMap);

      // Recentre map only if within city bounding box
      if (cityName && isWithinCityBounds(lat, lng, cityName)) {
        leafletMap.setView([lat, lng], leafletMap.getZoom());
      } else {
        showToast('Showing distances from your current location.');
      }

      // Activate proximity sort
      userLatLng = { lat, lng };
      proximityMode = true;
      btn.classList.remove('loading');
      btn.classList.add('active');
      btn.textContent = '◎ Near me ✕';

      renderCards(getFilteredRestaurants());
    },
    (error) => {
      btn.classList.remove('loading');
      btn.textContent = '◎ Near me';
      if (error.code === error.PERMISSION_DENIED) {
        showToast('Location access denied. Enable it in your browser settings.');
      } else {
        showToast('Could not get your location. Please try again.');
      }
    },
    { timeout: 10000, maximumAge: 60000 }
  );
}
```

**Notes on `getCurrentPosition` options:**
- `timeout: 10000` — fail after 10 seconds rather than hanging indefinitely
- `maximumAge: 60000` — accept a cached position up to 60 seconds old; avoids re-requesting GPS on quick re-taps

---

## 10. Button Visibility — Show Only in Map View

The Find Me button should only be visible in map view. Hook into the existing view-switch function at line 1431.

Find the existing view switch logic and add show/hide for the button:

```javascript
// Existing pattern (line 1431):
currentView = view;

// Add immediately after:
const findMeBtn = document.getElementById('find-me-btn');
if (findMeBtn) {
  findMeBtn.style.display = view === 'map' ? 'block' : 'none';
}
```

Also wire up the click handler once on page load (alongside other event listener setup):

```javascript
document.getElementById('find-me-btn').addEventListener('click', handleFindMe);
```

---

## 11. Sort Logic — Modify `renderCards`

The existing sort comparator at line 1247 runs unconditionally. Modify it to check `proximityMode`:

```javascript
const sorted = [...restaurants].sort((a, b) => {
  if (proximityMode && userLatLng) {
    const aHasCoords = a.lat != null && a.lng != null;
    const bHasCoords = b.lat != null && b.lng != null;

    // Restaurants without verified coords always sort last
    if (aHasCoords && !bHasCoords) return -1;
    if (!aHasCoords && bHasCoords) return 1;
    if (!aHasCoords && !bHasCoords) return 0;

    // Both have verified coords — sort by distance
    const aDist = haversineKm(userLatLng.lat, userLatLng.lng, a.lat, a.lng);
    const bDist = haversineKm(userLatLng.lat, userLatLng.lng, b.lat, b.lng);
    return aDist - bDist;
  }

  // Default sort — both-pool first, then source_count descending
  const ap = (a.language_pool==='both'||a.language_pool==='both-pool'||a.language_pool==='multi-source') ? 0 : 1;
  const bp = (b.language_pool==='both'||b.language_pool==='both-pool'||b.language_pool==='multi-source') ? 0 : 1;
  if (ap !== bp) return ap - bp;
  return (b.source_count||0) - (a.source_count||0);
});
```

**Centroid detection:** JSON schema confirmed. Coordinate fields are `lat` and `lng`. Restaurants without verified coordinates have `"lat": null, "lng": null`. The `null` check is the correct and only signal needed — there is no `coordinate_source: "centroid"` value in the schema.

---

## 12. Distance Badge — Modify `cardHTML`

Add a distance badge to the card when proximity mode is active and the restaurant has verified coordinates. Find the `cardHTML` function (line 1263) and add the badge to the card HTML output:

```javascript
// At the top of cardHTML(r), compute distance string:
let distanceBadge = '';
if (proximityMode && userLatLng && r.lat != null && r.lng != null) {
  const km = haversineKm(userLatLng.lat, userLatLng.lng, r.lat, r.lng);
  const distStr = km < 1 ? `${Math.round(km * 1000)}m` : `${km.toFixed(1)}km`;
  distanceBadge = `<span class="distance-badge">${distStr}</span>`;
}
```

Insert `${distanceBadge}` into the card HTML at a natural position — alongside the neighbourhood or price level display.

Add CSS for the badge in the card styles section:

```css
.distance-badge {
  font-family: 'DM Sans', sans-serif;
  font-size: 11px;
  font-weight: 500;
  color: #4A90E2;
  background: #EBF4FF;
  border-radius: 10px;
  padding: 2px 8px;
  margin-left: 6px;
  white-space: nowrap;
}
```

---

## 13. Cleanup on City Switch

When a city is switched, `loadCity()` calls `leafletMap.remove()` (line 1619), which destroys the map and all its layers including `userLocationMarker`. However the module-level state variables must also be reset. Add to the top of `loadCity()` alongside the existing `currentCityData = null` (line 1056):

```javascript
proximityMode = false;
userLatLng = null;
userLocationMarker = null;
const findMeBtn = document.getElementById('find-me-btn');
if (findMeBtn) {
  findMeBtn.classList.remove('active', 'loading');
  findMeBtn.textContent = '◎ Near me';
}
```

---

## 14. Filter Interaction

When filters change, `renderCards(getFilteredRestaurants())` is called (line 1214). Because `proximityMode` and `userLatLng` are module-level, the proximity sort automatically applies to the new filtered set — no additional code needed. This is the correct behaviour: proximity sort persists across filter changes.

---

## 15. Pre-Implementation Check — Completed

JSON schema verified against `localbite-fes-2025-2026.json`. Findings:

- Coordinate fields are `lat` and `lng` (not `latitude`/`longitude`)
- Restaurants without verified coordinates have `"lat": null, "lng": null`
- `geo_source` values observed: `"nominatim"`, `"manual"` — no `"centroid"` value exists
- `geo_confidence` values observed: numeric strings (e.g. `"0.0001"`) and `"high"`
- Null `lat`/`lng` is the correct and only signal for unverified coordinates

No further pre-implementation checks required. All code in this spec uses the confirmed field names.

---

## 16. Implementation Order

1. Add `position: relative` to `#map` CSS
2. Add `CITY_BOUNDS` and `isWithinCityBounds()`
3. Add `haversineKm()`
4. Add `showToast()`
5. Add new module-level variables
6. Add Find Me button HTML inside `#map`
7. Add Find Me button CSS
8. Add `handleFindMe()` function
9. Wire click handler and view-switch show/hide
10. Modify `renderCards` sort comparator
11. Add distance badge to `cardHTML`
12. Add distance badge CSS
13. Add city-switch cleanup to `loadCity()`
14. Test: in-city user, out-of-city user, permission denied, null-coord restaurants, filter change while proximity active, city switch while proximity active

---

## 17. Out of Scope for This Build

- Radius filter (show only restaurants within X km) — deferred
- Distance sort in list view — map view only for now
- Persistent location across page reload
- Live tracking (`watchPosition`)
