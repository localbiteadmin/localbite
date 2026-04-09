# LocalBite — Product Backlog
## Created: 2026-04-09
## Status: Parked — revisit after first batch processing experience

---

## Context

These items were identified during the April 9 session. Deliberately deferred
until after batch processing is validated and more cities are live. User
feedback and analytics data should inform prioritisation before any of these
are built.

---

## USER-INITIATED IDEAS

### 1. Article date and title in source display

**Current state:** Sources panel shows publication name and writer only.

**Proposed:** Each source shows the article title and date alongside the
publication and writer name. Example:
> *Barcelona Food Experience — Maria*
> *"The Best New Restaurants in Barcelona Right Now" — Feb 2026*

**Why it matters:** Direct trust signal — readers can see exactly which
article a recommendation came from and how recent it is, then click through
to verify.

**Two pieces of work:**
- **Viewer change** — display `article_date` from existing JSON. Low effort.
  Pre-v6 cities may show "undated" — handle gracefully.
- **Pipeline change** — add `article_title` field to v6 template. Extract
  from fetched page `<h1>` or first heading. Jina returns this reliably.
  Small prompt addition, applies to future cities only.

**Effort:** Viewer change ~2 hours. Pipeline change ~30 minutes.
**Dependency:** None — article_date already in v6 JSON.

---

### 2. List ↔ Map cross-navigation

**Current state:** List view and map view are separate modes with no
connection between them.

**Proposed:** A restaurant in list view should be viewable on the map, and
a pin on the map should show the full card details.

**Options evaluated:**

**Option A — Split view (side by side)**
List left, map right simultaneously. Clicking a card highlights the pin;
clicking a pin highlights and scrolls to the card.
- Best for desktop, unusable on mobile
- Requires significant layout restructure
- Most powerful — no mode switching

**Option B — Linked toggle with scroll-to** ← Recommended now
Keep current toggle but make views aware of each other. Clicking a list card
switches to map and centres on that pin. Clicking a map pin switches to list
and scrolls to that card with a brief highlight.
- Works on mobile and desktop
- Minimal layout change, builds on existing architecture
- Mode switch is slightly jarring but fast

**Option C — Expanded map pin popups**
Map pin popups show full card content — quote, price, cuisine, source
credits, article link. Map becomes self-contained.
- Clean on mobile, no mode switching needed
- Pin popups currently show minimal info — expanding is straightforward
- Risk: popups get crowded on dense city maps
- Good middle ground before investing in Option D

**Option D — Bottom sheet / hover panel** ← Recommended later
Tapping a pin slides up a card from the bottom (mobile) or opens a side
panel (desktop). The Google Maps pattern — already familiar to users.
- Best mobile UX of any option
- Most build effort — needs responsive layout logic
- Gold standard when map is the primary experience

**Recommendation:** Build Option B now (low effort, fixes core problem).
Build Option D when map is a first-class experience — probably after 15+
cities live.

**Effort:** Option B ~3 hours. Option D ~1–2 days.

---

### 3. List view presentation — sort and layout improvements

**Current state:** List sorted by confidence tier (both-pool first, then
source count) — a pipeline concept meaningless to users. At 86 restaurants
in Barcelona, an undifferentiated scroll.

**Sort options (dropdown):**
- By neighbourhood — most useful for someone planning a specific area
- By price — obvious utility
- By most recommended — source_count descending, surfaces most
  cross-validated picks. Meaningful signal currently buried.
- Alphabetical — least useful but expected
- By cuisine type — works once cuisine is consistently populated (v6+)

**Layout options:**

**Grouped by neighbourhood**
Restaurants under collapsible neighbourhood headers with counts.
Works well paired with map — selecting a neighbourhood collapses others.
Requires handling null-neighbourhood restaurants gracefully.

**Compact card mode**
Show only name, neighbourhood, price, cuisine by default. Tap to expand
for full card. 3x more restaurants visible before scrolling. The Airbnb
pattern — dense scannable list that expands on demand.

**Curated collections**
Pre-defined filter presets above the list: Most recommended (both-pool),
Best value (price 1–2), Fine dining (price 3–4), By cuisine. Data already
supports these. More meaningful at 15+ restaurants per filter.

**Recommendation:**
1. Add neighbourhood sort — 1 hour, transforms navigability immediately
2. Compact card mode — 2–3 hours, reduces scroll fatigue
3. Grouped by neighbourhood — most powerful for a city guide, solve
   null-neighbourhood problem first

**Effort:** Sort dropdown ~1 hour. Compact mode ~2–3 hours. Grouped ~1 day.

---

## ADDITIONAL SUGGESTIONS

### 4. Restaurant closure detection (Item G from automation backlog)

Script reads city JSON, finds all `open_status_check: true` entries, runs
web search for each (`[name] [city] closed`), reports confirmed open /
confirmed closed / unknown. Confirmed closures auto-flagged for removal.

Becomes more valuable as the dataset ages — a 2023 article recommendation
has a real chance of being closed by the time someone reads it.

**Effort:** 2–3 hours. **Priority:** Build after 200+ flagged restaurants
across cities.

---

### 5. Photo integration

Currently no images. Even one photo per restaurant (sourced from the
article, not scraped) would dramatically improve browsing experience.
Pipeline could extract a featured image URL from fetched article.

**Effort:** Medium — pipeline change + viewer display + image hosting
considerations. **Priority:** After core UX is stable.

---

### 6. Opening hours

Not currently extracted. High user value — "is it open now" is often the
first question. Jina fetches often include hours if in the article. Pipeline
would need to extract and store. Hours go stale quickly — needs a freshness
strategy.

**Effort:** Pipeline change ~1 hour. Viewer display ~1 hour.
**Dependency:** Hours are often not in food writer articles — may have low
yield.

---

### 7. Address field

Currently missing. Users who want to navigate must click through to source
article. Street address or postcode would be useful. Could be extracted from
article or added during geocoding (reverse geocode the coordinates).

**Effort:** Low if derived from geocoding. Medium if extracted from articles.

---

### 8. Source freshness decay

A restaurant recommended once in 2023 by a single source should carry less
weight than one recommended in 2026 by three sources. Currently source_count
and language_pool are the only quality signals — recency not factored in.

Could be implemented as a `freshness_score` field combining source_count,
article recency, and language_pool signal.

**Effort:** Medium — pipeline change + viewer display logic.
**Priority:** After more cities and longer time horizon.

---

### 9. Writer profile enrichment

Currently writer profiles are 2–3 sentence pipeline-generated summaries.
Linking to the writer's social media or personal site would let users follow
writers they trust — which is the whole point of LocalBite's named-author
premise.

**Effort:** Low for adding URL field. Medium for displaying it well.

---

### 10. "New this month" signal

Highlighting restaurants from articles published in the last 60 days. High
value for repeat visitors who've already seen the full list. `article_date`
field already supports this — viewer filter only.

**Effort:** Low — viewer filter change only.

---

### 11. User saves / favourites

Letting users bookmark restaurants across cities. Two approaches:
- localStorage — session/device only, no backend, simple
- Login system — persistent across devices, significant infrastructure

**Effort:** localStorage version ~1 day. Login system = major project.
**Priority:** After 15+ cities and evidence of repeat usage.

---

### 12. Shareable city packs

Clean printable or shareable version of a city's restaurant list.
"Here's my Barcelona list" as a link or PDF. Low infrastructure, high
social value — aligns with how food recommendations actually spread.

**Effort:** Low for a print stylesheet. Medium for shareable links.

---

### 13. Feedback mechanism

Simple "this restaurant is closed" or "this restaurant has moved" button.
Crowdsourced data quality without building a full review system. Submissions
could go to a simple form or email — no backend needed initially.

**Effort:** Low — form submission, no backend required.
**Priority:** High relative to effort — directly addresses data quality
problem that grows as dataset ages.

---

### 14. Analytics

Currently no visibility into which cities get traffic, which restaurants
get clicked, whether people use map or list. Without this, all viewer
decisions are made in the dark.

Options: Plausible or Fathom (privacy-friendly, no cookie banner needed,
~$9/month). Google Analytics (free, more complex, cookie considerations).

**Effort:** ~1 hour to add tracking script.
**Priority:** Should be first — informs all other decisions.

---

### 15. Custom domain

Still outstanding. Candidates: localbite.app, getlocalbite.com,
localbite.co. GitHub Pages supports custom domains via CNAME record.
Simplest trust signal for the product.

**Effort:** ~2 hours including DNS propagation wait.
**Cost:** ~$15–20/year.
**Priority:** After first batch run, before sharing widely.

---

### 16. SEO — sitemap and structured data

GitHub Pages serves the site but there's no sitemap, no meta descriptions,
no structured data. A restaurant guide is exactly the kind of content that
could rank for "[city] best restaurants food writer" queries. Structured
data (schema.org/Restaurant) would also enable rich results in Google.

**Effort:** Medium — sitemap generation + meta tags + structured data markup.
**Priority:** After custom domain is set up.

---

## PRIORITISATION (when ready to revisit)

### Do first (low effort, high impact):
- Analytics (14) — informs everything else
- Article date display in viewer (1, viewer part) — existing data, quick win
- "New this month" filter (10) — existing data, quick win
- Feedback mechanism (13) — data quality, low effort

### Do second (medium effort, clear value):
- Custom domain (15)
- List sort by neighbourhood/price/recommended (3)
- Linked toggle navigation (2, Option B)
- Article title in pipeline (1, pipeline part)

### Do later (higher effort or needs more data):
- Compact card mode (3)
- Expanded map popups or bottom sheet (2, Options C/D)
- Closure detection script (4)
- Writer profile enrichment (9)
- Address field (7)

### Do when scale justifies (significant effort):
- Photo integration (5)
- Opening hours (6)
- Source freshness decay (8)
- User saves (11)
- Shareable packs (12)
- SEO (16)

---

## Notes

- All items deferred until after first batch processing experience
- Analytics should be added before sharing the viewer URL widely
- User feedback from real usage should drive prioritisation when the time comes
