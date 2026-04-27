#!/usr/bin/env python3
"""
Three targeted fixes to localbite-postrun.js:
  Fix 1: Version string v3.0 → v3.3
  Fix 2: Add review_quote → quote mapping in restaurant field repairs (Step 1.5)
  Fix 3: Add fetch log to next-steps git add command
Dry-run first — type YES to apply.
"""
import sys

path = 'localbite-postrun.js'
content = open(path, encoding='utf-8').read()

# ── Fix 1: version string ──────────────────────────────────────────────────────
OLD_VER = '// LocalBite Post-Pipeline Script v3.0'
NEW_VER = '// LocalBite Post-Pipeline Script v3.3'

# ── Fix 2: review_quote → quote mapping ───────────────────────────────────────
# Insert after the existing restaurant field name variants block.
# Anchor: the restaurant_name repair line which is unique.
OLD_R_FIELD = "    if ('restaurant_name' in r && !('name' in r))   { r.name = r.restaurant_name; delete r.restaurant_name; autoRepaired++; }"
NEW_R_FIELD  = """    if ('restaurant_name' in r && !('name' in r))   { r.name = r.restaurant_name; delete r.restaurant_name; autoRepaired++; }
    // Compaction-reconstruction field variants for the quote field
    if ('review_quote' in r && !('quote' in r))     { r.quote = r.review_quote; delete r.review_quote; autoRepaired++; }
    if ('description'  in r && !('quote' in r))     { r.quote = r.description;  delete r.description;  autoRepaired++; }"""

# ── Fix 3: fetch log in next-steps git add ────────────────────────────────────
# The next-steps block currently prints:
#   git add ${file} index.html localbite-index.json
# We need it to also include the search log and fetch log.
# Anchor on the two step lines (with and without approve-centroids).
OLD_STEPS = """  const steps = missingCount > 0
    ? [`1. node localbite-approve-centroids.js ${file} --auto-accept`, `2. git add ${file} index.html localbite-index.json`]
    : [`1. git add ${file} index.html localbite-index.json`];"""

NEW_STEPS = """  const citySlugForLog = citySlug || 'city';
  const searchLogFile = `localbite-${citySlugForLog}-search-log.txt`;
  const fetchLogFile  = `localbite-${citySlugForLog}-fetch-log.txt`;
  const pipelineDocFiles = `${file} index.html localbite-index.json localbite-run-metrics.log ${searchLogFile} ${fetchLogFile}`;
  const steps = missingCount > 0
    ? [`1. node localbite-approve-centroids.js ${file} --auto-accept`, `2. git add ${pipelineDocFiles}`]
    : [`1. git add ${pipelineDocFiles}`];"""

# ── Validate all anchors exist exactly once ───────────────────────────────────
errors = []
for label, old in [('Fix 1 (version)', OLD_VER),
                   ('Fix 2 (restaurant_name line)', OLD_R_FIELD),
                   ('Fix 3 (steps block)', OLD_STEPS)]:
    count = content.count(old)
    if count == 0:
        errors.append(f'ERROR: {label} — anchor not found')
    elif count > 1:
        errors.append(f'ERROR: {label} — anchor appears {count} times (expected 1)')

if errors:
    for e in errors:
        print(e)
    print('\nAborting — no files modified.')
    sys.exit(1)

# Check nothing already applied
already = []
if NEW_VER in content:          already.append('Fix 1 (version string already v3.3)')
if 'review_quote' in content:   already.append('Fix 2 (review_quote mapping already present)')
if 'fetchLogFile' in content:   already.append('Fix 3 (fetch log already in next steps)')
if already:
    for a in already:
        print(f'NOTE: {a}')

# ── Dry run ────────────────────────────────────────────────────────────────────
print('DRY RUN — all three anchors found exactly once.\n')
print('Fix 1: version string v3.0 → v3.3')
print('Fix 2: add review_quote → quote and description → quote mappings for restaurant fields')
print('Fix 3: expand git add in next-steps to include search-log and fetch-log files\n')

answer = input('Proceed? Type YES to apply: ').strip()
if answer != 'YES':
    print('Aborted.')
    sys.exit(0)

# ── Apply ──────────────────────────────────────────────────────────────────────
content = content.replace(OLD_VER,     NEW_VER,     1)
content = content.replace(OLD_R_FIELD, NEW_R_FIELD, 1)
content = content.replace(OLD_STEPS,   NEW_STEPS,   1)

open(path, 'w', encoding='utf-8').write(content)
print('Done. postrun.js updated.')
