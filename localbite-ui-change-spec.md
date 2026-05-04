# LocalBite UI Change Spec
*Targeted edits to index.html — ready to implement after source discovery session*

---

## Overview

Five targeted changes to the existing viewer. Nothing structural changes — same layout, same component hierarchy, same mobile/desktop behaviour. All changes are surgical edits to index.html.

**Prerequisite:** Both-pool definition must be confirmed before implementing change 1 (badge text). Changes 2–5 are definition-independent and can land any time.

---

## Change 1 — Badge text: "Two languages" → "Consensus pick"

**What:** The badge shown on both-pool restaurant cards changes from language framing to publisher framing.

**Grep target in index.html:**
```
'both': 'Two languages'
```
or equivalent in the `poolLabel` map. Also check `poolOptions` filter dropdown and any tooltip text referencing "two languages" or "cross-language".

**Change:**
```js
// poolLabel map
'both': 'Consensus pick'

// poolOptions filter — this entry is being removed (see Change 3)
// so no update needed there
```

**Also check:** Any legend text near the city header that reads "Green border = confirmed in two languages" — update to "Green border = consensus pick (endorsed by independent sources from different publishers)."

**Dependency:** Confirm both-pool definition change before deploying. If definition is confirmed simultaneously, also update any Sources panel copy that describes what both-pool means.

---

## Change 2 — Source chips: add article links + language dot

**What:** Source chips (publication name pills at the bottom of each card) become tappable links to `article_url`. A small language-coded dot is added inside each chip. Chips with null `article_url` remain visually identical but are non-interactive.

**Current chip render (approximate):**
```js
// Currently renders something like:
`<span class="source-chip">${source.publication}</span>`
```

**New chip render:**
```js
const dot = `<span class="lang-dot lang-${source.language || 'en'}"></span>`;
const label = source.publication || source.writer || '';

if (source.article_url) {
  return `<a class="source-chip source-chip--linked" 
              href="${source.article_url}" 
              target="_blank" 
              rel="noopener noreferrer">${dot}${label}</a>`;
} else {
  return `<span class="source-chip source-chip--dead">${dot}${label}</span>`;
}
```

**CSS additions:**
```css
.source-chip--linked {
  cursor: pointer;
  text-decoration: none;
  /* inherits all existing source-chip styles */
}
.source-chip--linked:hover {
  background: var(--color-background-tertiary);
}
.source-chip--dead {
  opacity: 0.5;
  cursor: default;
}
.lang-dot {
  display: inline-block;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-right: 3px;
  vertical-align: middle;
}
.lang-en { background: #378ADD; }
.lang-es { background: #BA7517; }
.lang-it { background: #D85A30; }
.lang-fr { background: #534AB7; }
.lang-pt { background: #1D9E75; }
.lang-ar { background: #888780; }
/* add further language codes as needed */
```

**Note:** The language dot is the only remaining language signal visible to users anywhere in the card UI. No other language references on the card.

---

## Change 3 — Filter bar: remove "Source language", add "Sort"

**What:** The "Source language" dropdown is removed. A "Sort" dropdown replaces it in the same position. All other filter controls (search, List/Map toggle, All neighbourhoods, Any price, All cuisines, Sources button) are unchanged and stay in their current horizontal positions.

**Grep target — remove:**
```
poolOptions
```
or the `<select>` element building the source language dropdown. Find the filter bar render function and remove the language select entirely.

**Add Sort select in its place:**
```html
<select id="sort-select" onchange="handleSortChange(this.value)">
  <option value="endorsed">Most endorsed</option>
  <option value="alpha">A–Z</option>
  <option value="neighbourhood">By neighbourhood</option>
</select>
```

**Sort logic to add:**
```js
function handleSortChange(value) {
  currentSort = value;
  renderCards();
}

// In renderCards(), before rendering, sort filteredRestaurants:
if (currentSort === 'endorsed') {
  // both_pool first, then by source_count descending
  filtered.sort((a, b) => {
    if (a.both_pool && !b.both_pool) return -1;
    if (!a.both_pool && b.both_pool) return 1;
    return (b.source_count || 1) - (a.source_count || 1);
  });
} else if (currentSort === 'alpha') {
  filtered.sort((a, b) => a.name.localeCompare(b.name));
} else if (currentSort === 'neighbourhood') {
  filtered.sort((a, b) => (a.neighbourhood || '').localeCompare(b.neighbourhood || ''));
}
```

**Default:** "Most endorsed" — consensus picks and highest source-count restaurants float to the top automatically. This is the correct default since it surfaces the product's core signal without requiring any user action.

**Note:** The existing `poolOptions` filter logic that filtered cards by language pool is removed entirely. No replacement filter — sorting by endorsement is the substitution.

---

## Change 4 — Remove "About this writer" from cards

**What:** The "About this writer ↓" link is removed from all restaurant cards. Writer profiles remain accessible via the Sources panel (Sources button in city header), which is the correct home for writer information.

**Grep target:**
```
About this writer
```

Remove the element and its click handler from the card render function. Do not remove from the Sources panel — it stays there.

**Note:** With multiple sources per card, "About this writer" was ambiguous (which writer?). The Sources panel lists all writers for the city and is the correct entry point for writer profiles. The Source ↗ link on each chip handles the "read the article" use case.

---

## Change 5 — Address field: display when available

**What:** When a restaurant JSON object has a non-null `address` field, display it as plain text on the card. Shown as a new row between the chips row and the bottom of the card (where "About this writer" was). No link — plain text only.

**Render logic:**
```js
const addressRow = restaurant.address
  ? `<div class="card-address">${restaurant.address}</div>`
  : '';
```

**CSS:**
```css
.card-address {
  font-size: 11px;
  color: var(--color-text-tertiary);
  padding-top: 7px;
  border-top: 0.5px solid var(--color-border-tertiary);
  margin-top: 4px;
}
```

**When populated:** Only for restaurants where the pipeline has extracted a street address. Initially zero restaurants (no existing city JSON has the address field). Populates automatically as future pipeline runs include the field, and on any city rebuild.

**Pipeline template change required (separate task):** Add `"address": "street address if mentioned in article, else null"` to the Phase 2 extraction prompt. One line addition. This is the Option C1 change — low effort, accumulates value with every future run.

---

## Implementation Order

Recommended deployment order given the definition dependency:

| # | Change | Dependency | Effort |
|---|--------|-----------|--------|
| 2 | Source chips → article links + language dot | None | ~45 min |
| 3 | Remove language filter, add Sort | None | ~30 min |
| 4 | Remove "About this writer" | None | ~15 min |
| 5 | Address field display | None (pipeline change separate) | ~20 min |
| 1 | Badge text → "Consensus pick" | Both-pool definition confirmed | ~30 min |

Changes 2–5 are safe to implement before the definition is confirmed. Change 1 should land simultaneously with the both-pool definition change and recomputation script, so badge text and data are consistent across the fleet.

**Total estimated implementation time:** ~2.5 hours for changes 2–5. Change 1 adds ~30 min but must be coordinated with postrun.js and recomputation.

---

## Pipeline Template Change (separate task, not index.html)

**File:** localbite-prompt-v7-part1-template.txt (or equivalent Part 2 engine file)

**Change:** In the Phase 2 restaurant extraction block, add one field:

```
"address": "street address as written in the article if explicitly mentioned, else null — do not infer or guess",
```

**Placement:** After `neighbourhood`, before `cuisine` (or equivalent position in extraction schema).

**Scope:** Applies to all future pipeline runs and rebuilds. Does not backfill existing 41 city JSONs. EN-primary sources (The Infatuation, Eater, Culinary Backstreets, Time Out) almost always include full street addresses. ES/IT/FR sources variable.

---

## What Does Not Change

To be explicit — nothing else in the current viewer is touched:

- Card layout and structure: unchanged
- Writer name + publication + Source ↗ link row: unchanged  
- Quote display: unchanged
- Signature dish bullet: unchanged
- Neighbourhood / cuisine / price metadata line: unchanged
- Map view: unchanged
- Search box: unchanged
- List/Map toggle: unchanged
- All neighbourhoods dropdown: unchanged
- Any price dropdown: unchanged
- All cuisines dropdown: unchanged
- Sources button and Sources panel: unchanged
- "About this writer" in Sources panel: unchanged
- Green card border for consensus picks: unchanged
- Mobile layout: unchanged (all changes are content/logic, not structural)
- City header stats line: unchanged
