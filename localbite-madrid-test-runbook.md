# LocalBite — Madrid v6 vs v7 Search Quality Test
## Runbook — April 2026

---

## Purpose

Test whether the v7 search composition (35 queries, 30 results per
query, revised angle distribution, no forum queries, vocabulary and
community angles, named awards, tiered neighbourhood coverage) produces
meaningfully better results than the v6 template (30 queries, 10
results per query, standard 9-angle distribution) on a city with no
prior pipeline history.

Madrid is the test city. Neither run has prior pipeline knowledge.
The comparison is clean.

---

## What Is Being Tested

| Variable | v6 (control) | v7 (test) |
|----------|-------------|-----------|
| Total queries | 30 | 35 (32 pre-written + 3 Phase 1B) |
| Results per query | 10 | 30 |
| Forum queries | 3 | 0 |
| City-wide generic | 9 | 5 |
| Neighbourhood queries | ~6 (pipeline chooses areas) | 16 (6 named areas, 3 tiers) |
| Named awards | 0 | 3 (specific Madrid awards) |
| Vocabulary-specific | 0 | 2 (ES casual register) |
| Cuisine/community | 0 | 2 (Usera focus) |
| Cross-validation Phase 1B | 0 | 3 (post Phase 0, responsive) |
| Prior knowledge in queries | Pipeline discretion | Explicitly prohibited |

Both runs use the same v6 Part 2 engine. Both use the same
Phase 0 DIRECT_FETCH_SOURCES (El Comidista, Guía Repsol).
Both use the same geographic boundary, price levels, and
source quality rules.

---

## Files Required Before Starting

| File | Location | Status |
|------|----------|--------|
| localbite-prompt-v6-madrid-part1.txt | ~/localbite/ | Ready |
| localbite-prompt-v7-madrid-part1.txt | ~/localbite/ | Ready |
| localbite-prompt-v6-template.txt | ~/localbite/ | Existing |
| localbite-prior-knowledge-check.py | ~/localbite/ | Ready |

**Setup — build runnable prompts**

```bash
cd ~/localbite

# Build full prompts
cat localbite-prompt-v6-madrid-part1.txt localbite-prompt-v6-template.txt \
  > localbite-prompt-v6-madrid.txt

cat localbite-prompt-v7-madrid-part1.txt localbite-prompt-v6-template.txt \
  > localbite-prompt-v7-madrid.txt

# Verify both files exist and are non-empty
wc -l localbite-prompt-v6-madrid.txt localbite-prompt-v7-madrid.txt
```

The prior knowledge check script runs automatically as part of
the v7 pipeline — the pipeline calls it after writing the search
plan and will not proceed to searches unless it passes. You do
not need to run it manually, but it is available for inspection:

```bash
python3 localbite-prior-knowledge-check.py localbite-madrid-v7-search-plan.txt
```

---

## Session Setup

Run both pipelines in the same day to minimise search landscape
drift between runs. v6 first, v7 second. Each run in a fresh
Claude Code session — do not continue from the previous session.

Recommended session timing:
- v6 run: start of session, full rate limit available
- v7 run: new session, same day, after v6 is fully complete
  and all measurements recorded

Before each run:
1. Open a fresh Claude Code terminal session
2. Navigate to ~/localbite
3. Verify no output files from previous runs exist with
   conflicting names (v6 outputs use localbite-madrid-*,
   v7 outputs use localbite-madrid-v7-*)
4. Record the start time

---

## Step-by-Step Procedure

### RUN 1 — v6 Control

**Step 1 — Start fresh session and run Phase 0 + Phase 1**
```
claude --dangerously-skip-permissions
```
Paste the full localbite-prompt-v6-madrid.txt content.

The pipeline will:
- Run Phase 0 (fetch El Comidista and Guía Repsol directly)
- Write the search plan to localbite-madrid-search-plan.txt
- Execute all 30 searches
- Present the Phase 1 source report and PAUSE

**Step 2 — Record Phase 1 measurements (BEFORE proceeding)**

When the pipeline pauses after Phase 1, immediately record:

```
V6 PHASE 1 MEASUREMENTS
Date/time: 
Sources found total: 
Sources selected for fetching:
  [list each: publication | language | URL | found via angle]
Sources rejected:
  [list each: publication | rejection reason]
Queries returning nothing: 
  [list query labels]
```

Save this to a text file before typing anything else.

**Step 3 — Proceed to Phase 2 and Phase 3**
Type: `proceed to Phase 2`

Allow the pipeline to run to completion including the review table.

**Step 4 — Record completion banner immediately**
Before scrolling, record:
```
V6 COMPLETION
Token count: 
Tool uses: 
Run time: 
```

**Step 5 — Accept review table**
Accept the pipeline's recommended removals without additional
user removals. The review decision must be consistent between
v6 and v7 to keep the comparison clean. If a removal is
genuinely wrong (e.g. a restaurant outside Madrid), note it
but still accept — do not introduce asymmetry.

**Step 6 — Record final pack measurements**
```
V6 FINAL PACK MEASUREMENTS
Total restaurants: 
Both-pool entries: 
Multi-source entries (2+ sources): 
Tier A (auto-approved): 
Tier B (reviewed, kept): 
Tier C (auto-rejected): 
Concentration cap fired: Y/N, count
Sources in final pack: [list]
```

**Step 7 — Archive v6 files**
```bash
# Files should already be named localbite-madrid-* 
# Verify they exist:
ls localbite-madrid-*.json
ls localbite-madrid-search-log.txt
ls localbite-madrid-search-plan.txt
```

Exit Claude Code completely.

---

### RUN 2 — v7 Test

**Step 1 — Start fresh session**
New terminal. New Claude Code session. Do not continue from v6.

```
claude --dangerously-skip-permissions
```
Paste the full localbite-prompt-v7-madrid.txt content.

The pipeline will:
- Run Phase 0 (fetch El Comidista and Guía Repsol directly)
- Identify the 3 most-mentioned restaurants from Phase 0 sources
  (for cross-validation Phase 1B queries)
- Write the search plan to localbite-madrid-v7-search-plan.txt
- Execute all 32 pre-written queries (angles A–N) at 30 results each
- Execute 3 Phase 1B cross-validation queries (angle O)
- Present the Phase 1 source report and PAUSE

**Step 2 — Record Phase 1 measurements (BEFORE proceeding)**

When the pipeline pauses after Phase 1, immediately record:

```
V7 PHASE 1 MEASUREMENTS
Date/time: 
Sources found total: 
Sources selected for fetching:
  [list each: publication | language | URL | found via angle]
Sources rejected:
  [list each: publication | rejection reason]
Queries returning nothing:
  [list query labels]
Sources found at positions 11–30 (would have been missed at 10):
  [list each: publication | query | position]
Cross-validation queries:
  [query 1 | restaurant targeted | source found / not]
  [query 2 | restaurant targeted | source found / not]
  [query 3 | restaurant targeted | source found / not]
```

Save this before typing anything else.

**Step 3 — Proceed to Phase 2 and Phase 3**
Type: `proceed to Phase 2`

**Step 4 — Record completion banner immediately**
```
V7 COMPLETION
Token count: 
Tool uses: 
Run time: 
```

**Step 5 — Accept review table**
Same rule as v6: accept the pipeline's recommended removals
without additional user decisions. Consistency between runs
is essential.

**Step 6 — Record final pack measurements**
```
V7 FINAL PACK MEASUREMENTS
Total restaurants: 
Both-pool entries: 
Multi-source entries (2+ sources): 
Tier A (auto-approved): 
Tier B (reviewed, kept): 
Tier C (auto-rejected): 
Concentration cap fired: Y/N, count
Sources in final pack: [list]
```

**Step 7 — Archive v7 files**
```bash
ls localbite-madrid-v7-*.json
ls localbite-madrid-v7-search-log.txt
ls localbite-madrid-v7-search-plan.txt
```

Exit Claude Code.

---

## Comparison Framework

Fill this table after both runs are complete.

### Primary metrics (your goal — multi-source entries)

| Metric | v6 | v7 | Difference | Signal |
|--------|----|----|-----------|--------|
| Multi-source entries (2+ sources) | | | | |
| Both-pool entries (EN + ES independent) | | | | |
| Total sources found Phase 1 | | | | |
| Sources found only by v7, not v6 | | | | |
| Sources found only by v6, not v7 | | | | |

### Secondary metrics (overall pack quality)

| Metric | v6 | v7 | Difference |
|--------|----|----|-----------|
| Total restaurants in final pack | | | |
| Tier A count | | | |
| Tier C rejections | | | |
| Concentration cap fired | | | |

### Process metrics (diagnose where differences come from)

| Metric | v6 | v7 |
|--------|----|----|
| Sources found at positions 11–30 | n/a | |
| Cross-validation queries: sources found | n/a | |
| Queries returning nothing | | |
| Forum queries: sources found | | n/a |
| Vocabulary queries: sources found | n/a | |
| Emerging neighbourhood queries: sources found | n/a | |
| Token count | | |
| Run time | | |

### Source-level comparison

List every source found by each run. Mark overlap and exclusives.

| Source | v6 | v7 | Found via (v7) |
|--------|----|----|---------------|
| | | | |

---

## Decision Criteria

### v7 passes if:

**Primary test:**
v7 finds ≥2 sources not found by v6 in Phase 1, AND at least
1 of those sources is a genuine independent voice (primary
source type, named author, not an aggregator).

**Secondary test:**
v7 produces ≥10% more multi-source entries in the final pack
than v6 (e.g. if v6 has 20 multi-source entries, v7 needs ≥22).

Both criteria should be met for a clear pass. If primary passes
but secondary doesn't, the new sources were found but didn't
overlap with existing sources — worth understanding why.
If secondary passes but primary doesn't, the improvement came
from elsewhere (better extraction, different review decisions) —
not from search changes. This would be a confounded result.

### v7 fails if:

v7 finds the same sources as v6 in Phase 1 (≤1 exclusive to v7).
This would indicate the composition changes did not add
meaningful discovery value over the standard template.

### Borderline result:

v7 finds exactly 1–2 new exclusive sources. Record which angles
found them. If the cross-validation or vocabulary angles found
them, that's evidence for those specific innovations. If the
new sources came only from the expanded result set (positions
11–30), that's evidence for the results-per-query change
independently of composition changes.

---

## What to Do With the Results

**If v7 passes:** Commit v7 as the new standard template.
The Madrid v7 pack becomes the live Madrid city pack.
Update localbite-prompt-v6-template.txt to v7 spec for
all future city runs.

**If v7 fails:** Keep v6 as the standard template. The
Madrid v6 pack becomes the live Madrid city pack.
Document specifically which v7 angles added nothing — this
is valuable for future template iterations.

**If borderline:** Retain v6 as standard. Run a targeted
follow-up test on one specific angle (e.g. vocabulary-specific
ES only) on the next city rebuild before committing any changes.

In all cases, the Madrid pack that produced more multi-source
entries becomes the live city pack — the test has value
regardless of which version wins.

---

## Notes and Reminders

- Record the completion banner token count BEFORE scrolling
  or doing anything else. This has been missed in prior sessions.
- If an API 500 error interrupts either run, use /clear and
  restart. The pipeline detects existing output files and
  recovers cleanly.
- Both runs should be done within the same day. If a multi-day
  gap is unavoidable, note it in the comparison — search result
  rankings can shift meaningfully over days.
- The v7 prior knowledge exclusion is self-enforcing in the
  prompt but not technically enforced. If the pipeline appears
  to be using training knowledge in queries (e.g. naming specific
  writers or restaurants not provided in Part 1 variables), note
  it in the comparison record. Do not restart the run — document
  the deviation and factor it into the result interpretation.

---

*Runbook version: 1.0*
*Prepared: 2026-04-15*
*Test cities: Madrid (v6 control, v7 test)*
*Files: localbite-prompt-v6-madrid-part1.txt,*
*       localbite-prompt-v7-madrid-part1.txt*
