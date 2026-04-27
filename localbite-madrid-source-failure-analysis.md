# LocalBite Madrid — Source Failure Analysis
*Generated: 2026-04-26 | Applies to: Madrid v7.1 rebuild (next session)*

---

## Overview

Three source failures limited the Madrid v7.1 both-pool result to 6 (floor).
Each failure has a distinct cause and a specific fix for the next rebuild.

---

## Failure 1 — Gastroactitud / José Carlos Capel

**Classification:** Permanent exclusion — named-author rule

**What happened:**
Gastroactitud.com is co-authored by José Carlos Capel and Julia Pérez Lozano.
Restaurant recommendation articles use first-person plural throughout ("Hemos
seleccionado", "nos gusta", "preferimos"). No individual byline appears on Madrid
restaurant articles — only the site masthead credits both authors jointly.

The pipeline attempted Phase 0 fetch and Phase 1 search confirmation. Both confirmed
the multi-author, editorial-we structure. Named-author requirement cannot be met
at the article level. No workaround exists within current quality gates.

**Root cause of Part 1 error:**
The Part 1 file included Gastroactitud as a DIRECT_FETCH source based on José Carlos
Capel's prominence as a food critic (longtime El País restaurant reviewer). The
assumption was that it was a single-author site. This was incorrect — the site
was always co-authored. The pipeline correctly rejected it.

**Fix for next rebuild:**
- Remove Gastroactitud from DIRECT_FETCH_SOURCES
- Add note: "Multi-author site (Capel + Julia Pérez Lozano). Editorial-we. Fails named-author rule. Do not include."
- Add El País Gastro as a replacement DIRECT_FETCH target — Capel published there for decades and the section still runs named-author restaurant criticism. Verify current named critic.
- Alternative: Search for Capel's individual bylined articles on third-party publications (El Mundo, ABC, etc.) where he may contribute as a guest critic.

**Both-pool impact:** Estimated -2 to -3 entries. Capel covered premium neighbourhood
restaurants that would have cross-validated against EN sources.

---

## Failure 2 — 7 Caníbales / Alberto Luchini

**Classification:** Source evolution failure — byline no longer present

**What happened:**
Alberto Luchini's "Matando Madrid con Luchini" series — the source used in v6 — last
published in 2015. The current 7canibales.com guide content ("Guías Caníbales") does
not carry individual bylines on restaurant articles. The pipeline found multiple
7 Caníbales articles in Phase 0 and Phase 1 but none had a confirmed Luchini byline.

The v6 run used a bylined Luchini article that either no longer exists at the same
URL, has been updated without a byline, or was from an archived section that has
since been removed or restructured.

**Root cause of Part 1 error:**
The Part 1 file listed 7 Caníbales as a DIRECT_FETCH source based on the v6 result.
The v6 result is now two years old. The site's editorial structure changed. This is
a source evolution failure — the source was valid in v6 and is now invalid.

**Fix for next rebuild:**
- Remove 7 Caníbales from DIRECT_FETCH_SOURCES
- Add note: "Luchini byline absent from current site content. 'Matando Madrid' series ended 2015."
- Add Phase 1 writer-first search: "Alberto Luchini Madrid restaurantes 2024 2025 site:" — find where Luchini currently publishes. Check El Confidencial, El Español, or his own social media/Substack for current editorial home.
- Luchini may have a newsletter, podcast, or social platform with qualifying content that the pipeline could reach.

**Both-pool impact:** Estimated -2 entries. Luchini's v6 articles cross-validated
with Paul Richardson and Time Out on several central Madrid restaurants.

---

## Failure 3 — The Infatuation / Lori Zaino (truncation)

**Classification:** Fetch quality failure — recoverable

**What happened:**
The Jina fetch of Lori Zaino's Infatuation guide (theinfatuation.com/madrid/guides/where-to-eat-madrid)
returned approximately 11 entries from an article containing approximately 30. The
failed sources log explicitly names Lana, Lakasa, and Tripea as restaurants likely
in the full article that were not extracted due to truncation.

All three appear in the final Madrid pack as single-source Tier B entries from other
sources — confirming they are real Madrid restaurants that Zaino recommended, and
that they would have become both-pool had the full extraction succeeded.

**Root cause:**
The Infatuation's Madrid guide is a long-form article. The Jina fetch truncated at
approximately 50,000 characters — the standard pipeline limit. The article exceeds
this limit. This is a systematic fetch constraint, not a one-time error.

**Fix for next rebuild — three options in priority order:**

Option A (try first): Paginated fetch
Theinfatuation.com sometimes loads additional content via scroll/pagination. The
Part 1 file should instruct the pipeline to attempt a second fetch of the same URL
with a "?page=2" or similar parameter, or to fetch the mobile version of the article.

Option B (fallback): Direct URL segments
The Infatuation's guide structure sometimes splits into neighbourhood sections with
distinct URLs (e.g. /guides/best-restaurants-madrid-midtown). Search for and fetch
segment URLs independently rather than the single guide URL.

Option C (manual supplement): Accept truncation, note in Part 1
If fetch options A and B fail, accept that ~11 Infatuation entries is the extractable
floor and note this explicitly in the Part 1 file. Prioritise finding a second strong
EN source (Culinary Backstreets Madrid, The Local Spain with named author) to compensate
for the cross-validation loss.

**Both-pool impact:** Confirmed -3 entries (Lana, Lakasa, Tripea). Highest-value
fix of the three failures — it requires no new source discovery, only better extraction.

---

## Combined Impact Estimate

| Failure | Estimated BP loss | Fix complexity | Priority |
|---------|------------------|----------------|----------|
| Infatuation truncation | -3 (confirmed) | Low — fetch strategy | 1 |
| 7 Caníbales evolution | -2 (estimated) | Medium — find new Luchini home | 2 |
| Gastroactitud exclusion | -2 to -3 (estimated) | Medium — find El País Gastro named critic | 3 |
| **Total** | **-7 to -8** | | |

Current both-pool: 6. With all three fixes: estimated 13–14 both-pool.
With fix 1 only (Infatuation): estimated 9 both-pool.

---

## Part 1 Changes for Next Madrid Rebuild

```
REMOVE from DIRECT_FETCH_SOURCES:
- Gastroactitud / José Carlos Capel
  Reason: Multi-author site (Capel + Julia Pérez Lozano). Editorial-we. Fails named-author rule.
- 7 Caníbales / Alberto Luchini
  Reason: Byline absent from current content. "Matando Madrid" series ended 2015.

ADD to DIRECT_FETCH_SOURCES:
- El País Gastro — check for named Madrid restaurant critic
  Site: elpais.com/gastronomia
  Note: Capel published here for decades. Verify current named critic.
- Alberto Luchini — writer-first Phase 1 search (not Phase 0)
  Query: "Alberto Luchini Madrid restaurantes" — find current editorial home

UPDATE in DIRECT_FETCH_SOURCES:
- The Infatuation / Lori Zaino
  Add: FETCH_NOTE: Article truncates at ~11 entries. Attempt paginated fetch or
  segment URLs before accepting partial extraction.
```

---

## Monitoring Trigger for Next Rebuild

Both-pool below 9 after next rebuild = at least one of the three fixes failed.
Check failed sources log before accepting result.
