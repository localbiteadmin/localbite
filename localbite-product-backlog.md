# LocalBite — Product Backlog
## Created: 2026-04-09
## Last updated: 2026-04-15
## Status: Active — batch processing complete, 13 cities live

---

## Context

Items identified during the April 9 session and expanded through subsequent
sessions. Batch processing is complete and validated — 13 cities, 480
restaurants live. User feedback and analytics data should still inform
prioritisation before building viewer features.

### Completed since April 9
- Item 1 (viewer part) — article date and title display in sources panel ✅ (April 14)
- Item 1 (pipeline part) — article_title extraction in v6 template ✅ (April 14)
- Item 2 (Option D) — bottom sheet for map pins ✅ (April 15)

---

## USER-INITIATED IDEAS

### 1. Article date and title in source display ✅ COMPLETE

**Current state:** Sources panel now shows publication name, writer, article
title (when available), and article date (when available).

**Completed:** April 14. article_date display live for all cities. article_title
in v6 template — accumulates naturally as cities rebuild. Backfill script
built but deferred (unreliable title tag extraction).

---

### 2. List ↔ Map cross-navigation — PARTIALLY COMPLETE

**Current state:** Bottom sheet (Option D) built and live April 15. Tapping a
map pin slides up a full restaurant card from the bottom. All gate tests passed.

**Remaining:** List-to-map direction — tapping a card in list view to show
that restaurant's pin on the map. Deferred. Architecture is ready (bottom sheet
exists). Estimated effort: 60–90 min.

**Options evaluated:** A (split view), B (linked toggle), C (expanded popups),
D (bottom sheet). Option D selected and built. Option B (list→map direction)
remains as follow-on.

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
across cities. Note: Seville currently has 29 open_status_check entries
(48% of pack) from 2023 sources — approaching the threshold where this
script becomes essential.

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

### 17. v7 Pipeline — Extraction quality improvements

**Added:** April 15, 2026
**Design document:** `localbite-v7-extraction-quality.md`
**Category:** Pipeline / Data quality

**Problem identified:** Training knowledge contamination found in Valencia
city pack — La Salita listed as "1 Michelin star" and Ricard Camarena as
"2 Michelin stars" despite neither being mentioned in the source articles.
Three additional extraction issues identified:
- Incidental restaurant mentions extracted as genuine recommendations
- Signature dish selected editorially by pipeline rather than by writer
- Cuisine labels invented from training knowledge when articles are ambiguous

**Three agreed prompt changes for v7 template:**

**Change 1 — Signature dish constraint** (~25 min)
Add `dishes_mentioned` array: all dish names explicitly in article text.
Set `signature_dish` only if the article itself singles one dish out.
Never select from dishes_mentioned — the article must do the selecting.
Requires schema addition: `dishes_mentioned` array field.

**Change 2 — Cuisine instruction tightening** (~20 min)
Standard category used when article maps clearly. Article's own language
used when it doesn't map cleanly. Null if article has no cuisine description.
Never use training knowledge for cuisine if article is silent on it.

**Change 3 — Mention quality test on source text** (~25 min)
Before extracting, confirm source text contains specific positive language:
a dish praised, an experience described, or a specific quality named.
Incidental mentions (passing reference, no evaluative content) → skip and log.
Test applied to source text, not the extracted quote.

**Viewer change required:** Display `dishes_mentioned` when `signature_dish`
is null — ~30–45 min. Separate task, not blocking.

**Total implementation time:** ~80 min prompt changes + one test run + 45 min
viewer update = ~3 hours total.

**Implementation trigger:** Next new city run or next city rebuild.
Seville v2 is the natural first candidate.

**Existing city packs:** Do not rebuild retroactively. Fix Valencia
specifically — manually null Michelin fields not in source articles (30 min
targeted audit). Barcelona: audit top 10 highest-profile restaurants before
next share.

**Known remaining limitations after v7:**
- Training knowledge contamination for famous restaurants — reduced not
  eliminated (fundamental architectural limitation)
- Partial fetch truncation loses tail-of-article content
- Casual local restaurants structurally absent from food press sources
- Paraphrase strips writer voice — accepted copyright trade-off

---

## PRIORITISATION (updated April 15)

### Do first (low effort, high impact):
- Analytics (14) — informs everything else ← still not done
- "New this month" filter (10) — existing data, quick win
- Feedback mechanism (13) — data quality, low effort
- List-to-map direction (2, Option B follow-on) — architecture ready, 60–90 min

### Do second (medium effort, clear value):
- Custom domain (15)
- v7 extraction quality prompt changes (17) — implement on next city run
- List sort by neighbourhood/recommended (3) — neighbourhood sort ~1 hr
- Price tier tooltip — small viewer change, sets correct user expectation

### Do later (higher effort or needs more data):
- Compact card mode (3)
- Closure detection script (4) — more urgent as open_status_check count grows
- dishes_mentioned viewer display (17, viewer part) — after v7 pipeline runs
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

- Analytics (14) remains the highest-priority unbuilt item — all viewer
  decisions are currently made without data
- Bottom sheet (item 2, Option D) built and live April 15
- v7 extraction quality (item 17) should be implemented on the next city
  run — Seville v2 is the natural trigger
- Seville open_status_check (29 restaurants, 48% of pack, some from 2023)
  is the most urgent data quality issue in the fleet — not in this backlog
  but tracked in the pipeline journal outstanding items
- User feedback from real usage should continue to drive viewer prioritisation
