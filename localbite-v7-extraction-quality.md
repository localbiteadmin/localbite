# LocalBite v7 Extraction Quality Improvements
## Design Document — April 2026

---

## Background and Problem Statement

The LocalBite pipeline uses Claude Code to fetch source articles and extract restaurant data. During a quality review in April 2026, two specific problems were identified in the Valencia city pack:

1. La Salita listed as "1 Michelin star" — not mentioned in the source article
2. Ricard Camarena listed as "2 Michelin stars" — not mentioned in the source article

Investigation revealed these were instances of **training knowledge contamination**: Claude's prior knowledge about these internationally recognised restaurants leaked into the extracted data despite the pipeline rule "do not use training knowledge."

This document describes the agreed approach to reducing (not eliminating) this problem in v7, the reasoning behind each decision, what was considered and rejected, and what known limitations remain.

---

## What Was Considered and Rejected

Three "quality gates" were initially proposed. Each was assessed carefully before a decision was made.

### Rejected — Gate 1: Self-Verification Confidence Scoring

**What it was:** After extracting each restaurant, the pipeline would ask itself "does the source text directly support this extraction?" and score Yes / Partial / No, auto-rejecting No entries.

**Why rejected:** This is asking the model to grade its own homework. The same process that produced the contaminated extraction does the verification. If training knowledge leaked into the quote, that same training knowledge is active during the confidence check. The model would likely score "Yes" with high confidence precisely for contaminated entries — because from its perspective, the claim *is* supported, it simply cannot distinguish between "supported by article text" and "supported by prior knowledge."

This gate would produce logged confidence scores that look rigorous but aren't. It might be worse than no gate at all because it creates false assurance.

**Decision: Do not implement.**

---

### Rejected — Gate 2 (full version): Exact Phrase Anchoring for All Fields

**What it was:** For every structured field — cuisine, signature dish — the pipeline must quote the exact article phrase that supports the value, or leave the field null.

**Why rejected in full form:**

Risk 1 — Cuisine consistency breaks down. Cuisine fields currently use standardised categories useful for filtering and display. Free-text anchoring produces "creative Catalan cooking" in Barcelona, "market-driven Mediterranean" in Valencia, "contemporary Portuguese fine dining" in Lisbon — inconsistent across cities and unusable for any future filter feature.

Risk 2 — Null rate climbs significantly. Many articles describe restaurants without naming their cuisine explicitly. A writer saying "the kind of place where you eat with your hands and order everything twice" provides no quotable cuisine phrase. Under full anchoring, this field becomes null. Across a 60-restaurant city pack, 25-30 null cuisine fields would be likely.

Risk 3 — Signature dish gets worse not better. Full anchoring would record the first dish mentioned in article text rather than the one the writer singled out. Positional selection is arguably less accurate than editorial selection.

**Decision: Reject full form. Accept modified form for signature dish only — see below.**

---

### Rejected — Gate 3: Grammatical Subject Test

**What it was:** Before extracting a restaurant, the pipeline checks whether the source text contains at least one sentence where the restaurant is the grammatical subject of a positive evaluative statement.

**Why rejected:** The failure modes are asymmetric and systematic in the wrong direction. Personal, situated food writing — the type LocalBite most wants to surface — is often structured around the writer's experience rather than the restaurant as grammatical subject. "We ended up at Bar Cañete after a long afternoon and it was exactly what we needed — a cold vermouth, the anchovies, that particular light" would fail the grammatical subject test. "Bar Cañete is a must-visit for vermouth" would pass. The test systematically penalises personal recommendation in favour of generic listicle language. This is backwards for LocalBite's purpose.

**Decision: Do not implement. Replace with content test — see below.**

---

## What Was Agreed: Three Targeted Instruction Changes

These are tighter rules applied at the extraction step in Phase 2 of the pipeline. They are not architectural gates. They will reduce leakage and invention at the margin but will not eliminate them.

---

### Change 1 — Signature Dish Constraint

**Current rule:**
```
signature dish (if mentioned)
```

**Problem:** "If mentioned" allows the pipeline to select one dish from a list of dishes mentioned in the article, presenting that selection as "the" signature dish. This is editorial selection disguised as extraction — the writer never identified that dish as distinctive.

**New rule:**
```
dishes_mentioned: record all dish names explicitly named in the
article text as an array. Leave empty array if none named.

signature_dish: set ONLY if the article explicitly identifies one
dish as distinctive, exemplary, the thing to order, or otherwise
singles it out above others. If the article mentions multiple dishes
without singling one out, leave null. Do not select from the
dishes_mentioned array — the article must do the selecting.
```

**What this changes:** Signature dish becomes null far more often. Dishes_mentioned becomes a new field carrying the raw article evidence. The card display may need updating to show dishes_mentioned when signature_dish is null — that is a viewer change to handle separately.

**What this does not change:** It does not prevent training knowledge from contaminating dishes_mentioned if the pipeline adds dishes it knows about but the article didn't mention. The instruction "only dishes explicitly named in the article text" is the guard, and it has the same limitation as all "do not use training knowledge" instructions — it reduces leakage but cannot eliminate it for famous restaurants.

**Estimated implementation time:** 15 minutes — prompt edit only.

**Risk:** Low. The new field (dishes_mentioned) needs to be added to the JSON schema. The viewer needs a decision about whether to display it. Both are small downstream changes.

---

### Change 2 — Cuisine Instruction Tightening

**Current rule:**
```
cuisine type (from article text)
```

**Problem:** "From article text" is too loose. When article language doesn't map cleanly to a standard category, the pipeline invents a label using training knowledge about that type of restaurant. "Creative Valencian cooking rooted in the market" becomes "Contemporary Spanish" — a category the article never used.

**New rule:**
```
cuisine: use the article's description as the basis.
- If it maps clearly to a standard category (Japanese, Contemporary
  Spanish, Traditional Moroccan, etc.) use that standard category.
- If the article's description does not map cleanly to a standard
  category, use the article's own language as the cuisine value
  rather than inventing a label. Example: "creative market cooking"
  is a valid cuisine value if that is what the article conveys.
- If the article contains no cuisine description at all, leave null.
- Never use training knowledge about what type of food a restaurant
  serves. If you know a restaurant is Japanese from training data
  but the article does not describe the cuisine, leave null.
```

**What this changes:** Cuisine values will be slightly less consistent across cities for edge cases. Famous restaurants with a well-known cuisine type will have null cuisine if the article doesn't mention it, rather than a training-knowledge value. This is the correct trade — accuracy over consistency.

**What this does not change:** Standard cases (Japanese, Italian, etc.) remain consistent and unchanged. The majority of cuisine values will be unaffected.

**Estimated implementation time:** 20 minutes — prompt edit only.

**Risk:** Low. Marginal consistency impact on edge cases only. No schema change required.

---

### Change 3 — Mention Quality Test on Source Text

**Current rule:**
```
Only include restaurants explicitly named in fetched article text.
Do not include if only evidence is a list title or section header.
```

**Problem:** The current rule guards against list titles and headers but not against incidental mentions — restaurants named in passing without any evaluative content. "You could also try Casa Montaña nearby" technically names the restaurant in article text and passes the current rule, but it is not a recommendation.

**New rule:**
```
Before extracting a restaurant, confirm the source text contains
specific positive language about it beyond simply naming it.
"Specific positive language" means at least one of:
- A specific dish praised or described
- A specific experience at the restaurant described
- A specific quality of the restaurant named (atmosphere, service,
  a particular characteristic)

If the only evidence is the restaurant's name in a list, a passing
mention, or a subordinate clause without evaluative content, do not
extract. Log as: [skipped — incidental mention] [restaurant name]

This test is applied to the SOURCE TEXT, not to the extracted quote.
The question is: did the writer say something specific and positive
about this restaurant? Not: can we construct a 15-word quote?
```

**What this changes:** Some restaurants currently included will be excluded. The impact is highest for secondary sources (aggregator-style articles that list many restaurants briefly) and for articles that name restaurants in passing while focused on something else. It reduces pack size marginally but improves the quality signal of every included restaurant.

**What this does not change:** Personal, narrative food writing is explicitly protected by the "specific experience described" criterion. "We ended up at Bar Cañete after a long afternoon and it was exactly what we needed — a cold vermouth, the anchovies, that particular light" passes the test because a specific experience is described. The grammatical subject test would have rejected this; the content test correctly accepts it.

**Estimated implementation time:** 25 minutes — prompt edit plus testing the instruction wording carefully.

**Risk:** Medium. The line between "incidental mention" and "genuine recommendation" is a judgment call the pipeline must make for each restaurant. The instruction reduces ambiguity but does not eliminate it. Some genuine recommendations in terse or unconventional writing styles may be incorrectly excluded. This risk is accepted as preferable to the current risk of including incidental mentions.

---

## Implementation Plan

### When to implement

These changes should be made to the v6 template as a named v7 revision. They should not be applied retroactively to existing city packs — the changes affect extraction decisions and would require re-running city pipelines to take effect.

The natural trigger is the next new city pipeline run, or a planned rebuild of an existing city (e.g. Seville v2, Valencia v2).

### How to implement

All three changes are prompt edits to `localbite-prompt-v6-template.txt`. They are concentrated in the Phase 2 extraction rules section.

The `dishes_mentioned` field requires a schema addition to the JSON structure in the same template. The viewer may need a small update to display `dishes_mentioned` when `signature_dish` is null — that is a separate task estimated at 30–45 minutes.

### Sequencing

| Step | Task | Time | Risk |
|------|------|------|------|
| 1 | Edit Phase 2 extraction rules — all three changes | 45 min | Low |
| 2 | Add dishes_mentioned to JSON schema | 10 min | Low |
| 3 | Test on one city run (recommend Seville v2 as first use) | Pipeline run time | Medium |
| 4 | Review output — check that null rates and exclusions are reasonable | 20 min | Low |
| 5 | Adjust instruction wording if test reveals misfires | 20 min | Low |
| 6 | Commit as v7 template | 5 min | None |
| 7 | Viewer update — display dishes_mentioned when signature_dish null | 30–45 min | Low |

**Total estimated time:** 2.5–3 hours including one test pipeline run.

---

## Known Limitations That These Changes Do Not Fix

These are documented transparently as accepted limitations, not oversight.

**Training knowledge contamination for famous restaurants remains.**
The "do not use training knowledge" instruction is the primary defence and it has real but bounded effectiveness. For internationally recognised restaurants (Michelin-starred venues, restaurants that appear in major travel guides), Claude's prior knowledge is strong and active during extraction. The three changes above reduce the surface area for leakage but do not eliminate it. This is a fundamental architectural limitation of using a large language model with strong training priors for strict extraction tasks.

**Partial fetches lose tail-of-article content.**
When Jina returns a partial fetch (1,000–3,000 chars), the pipeline sees only the beginning of the article. Restaurants mentioned in the second half of long articles are silently lost. The pipeline reports fetch quality but there is no mechanism to flag which specific restaurants were missed due to truncation. This is a Jina architectural limitation with no current solution.

**Casual local restaurants are structurally underrepresented.**
The source selection process favours named food writers at established publications. Restaurants that locals return to weekly but that have never been covered by food press are invisible to the pipeline — not because of extraction failure but because they are absent from the sources the pipeline can access. This is a coverage gap inherent to the approach, not fixable by pipeline changes.

**Quote register stripping is inherent to paraphrase.**
The pipeline paraphrases writers' quotes rather than reproducing them directly. This is correct practice given copyright considerations but it strips the writer's voice and replaces it with a neutral editorial summary. "That particular light" becomes "pleasant atmosphere." The attribution is technically correct — the writer recommended the restaurant — but the specific quality of their observation is lost. This is an accepted trade-off between copyright compliance and fidelity to voice.

**Self-verification is unreliable.**
The pipeline cannot reliably verify its own extractions. Any instruction asking the model to confirm that its output is grounded in source text rather than training knowledge is asking the model to make a distinction it cannot reliably make. Programmatic verification — storing source excerpts and running a separate verification step outside the model — would be more reliable but adds process complexity not currently warranted at LocalBite's scale.

---

## What Would Require Re-Running Existing City Packs

The three changes above affect extraction decisions. They do not retroactively fix existing city pack data. If the quality problems are considered serious enough to fix in existing packs, the options are:

**Option A — Targeted manual audit of high-risk entries.**
For each city, identify the restaurants most likely to have training knowledge contamination (internationally recognised venues, Michelin-starred restaurants, venues with strong Wikipedia presence). Check each against the source article manually. Correct or null any fields not supported by the article. This does not require re-running the pipeline.

Estimated time: 30–60 minutes per city for a targeted audit of the top 10 highest-risk restaurants. 13 cities × 45 minutes = approximately 10 hours total.

**Option B — Full city pack rebuild on v7.**
Re-run the pipeline for affected cities using the v7 template. This produces a new city pack with correct extraction from source. Existing coordinates, centroids, and viewer integrations carry over. Estimated time: one full pipeline run per city (~35 minutes each) plus post-pipeline processing.

**Option C — Accept existing packs, apply v7 to new cities only.**
The known contamination issues (Michelin stars in Valencia) are corrected manually as a one-off fix. All future city runs use v7. Existing packs are not rebuilt. This is the lowest effort option and is appropriate if the contamination in existing packs is limited to a small number of fields.

**Recommended approach:** Option C for now, with a targeted audit of Valencia specifically (known problem) and Barcelona (highest concentration of internationally recognised restaurants). Full rebuild deferred until a city reaches its natural rebuild point (v2, v3 etc).

---

## Summary

| Change | Problem addressed | Implementation | Risk | Time |
|--------|------------------|----------------|------|------|
| Signature dish constraint | Editorial selection disguised as extraction | Phase 2 prompt + schema | Low | 25 min |
| Cuisine tightening | Training knowledge filling ambiguous labels | Phase 2 prompt | Low | 20 min |
| Mention quality test | Incidental mentions extracted as recommendations | Phase 2 prompt | Medium | 25 min |
| dishes_mentioned field | No evidence trail for dish claims | JSON schema | Low | 10 min |

**Total prompt change time: ~80 minutes**
**Total with test run and viewer update: ~3 hours**

**Known remaining limitations:** Training knowledge contamination for famous restaurants; partial fetch truncation; casual restaurant structural absence; paraphrase register stripping. All documented and accepted.

---

*Document produced: 2026-04-15*
*Status: Design approved, implementation deferred to next city rebuild or new city run*
*Owner: LocalBite pipeline*
