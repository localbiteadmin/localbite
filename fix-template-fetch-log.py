#!/usr/bin/env python3
"""
Add OUTPUT_FETCH_LOG variable and FETCH LOG instruction to v7.1 template.
Dry-run first — type YES to apply.
"""
import sys

path = 'localbite-prompt-v7-template.txt'
content = open(path, encoding='utf-8').read()

# ── Fix 1: add OUTPUT_FETCH_LOG to the variable list ──────────────────────────
OLD_VARS = '  OUTPUT_FAILED_SOURCES'
NEW_VARS  = '  OUTPUT_FAILED_SOURCES\n  OUTPUT_FETCH_LOG'

if OLD_VARS not in content:
    print('ERROR: could not find OUTPUT_FAILED_SOURCES in variable list — aborting.')
    sys.exit(1)
if content.count(OLD_VARS) > 1:
    print('ERROR: OUTPUT_FAILED_SOURCES appears more than once — aborting.')
    sys.exit(1)
if 'OUTPUT_FETCH_LOG' in content:
    print('NOTE: OUTPUT_FETCH_LOG already present in template.')
    fix1_needed = False
else:
    fix1_needed = True

# ── Fix 2: add FETCH LOG section after the SEARCH LOG section ─────────────────
OLD_SEARCH_LOG_END = '''Do this in real time. Do not reconstruct from memory at the end.'''

NEW_FETCH_LOG_SECTION = '''Do this in real time. Do not reconstruct from memory at the end.

════════════════════════════════════════
FETCH LOG
════════════════════════════════════════

After every fetch attempt (Phase 0 direct fetches, Phase 1B verification
fetches, Phase 2 source fetches), immediately append one line to
OUTPUT_FETCH_LOG using this format:

  [phase] "URL or domain" → [HTTP status] | [chars returned] | [OUTCOME] — one sentence reason

HTTP status values: 200, 200+PAYWALL, 200+CAPTCHA, 200+DYNAMIC, 400,
403, 404, 410, 451, TIMEOUT, SIZE

Outcome values: ACCEPTED, REJECTED-byline, REJECTED-date, REJECTED-quote,
REJECTED-geo, SKIPPED, PARTIAL, FAILED

Examples:
  [p0] "epicureanways.com/madrid-guide" → 200 | 45312ch | ACCEPTED — Paul Richardson, named author confirmed, 2024 article
  [p0] "gastroactitud.com" → 200 | 23150ch | REJECTED-byline — editorial "we" throughout, multi-author site
  [p0] "theobjective.com/article-x" → 404 | —ch | FAILED — URL dead, attempting Wayback
  [p2] "theinfatuation.com/madrid/guides/where-to-eat-madrid" → 200+DYNAMIC | 48231ch | PARTIAL — scroll-load truncation, 11/~30 entries extracted

Do this in real time after every fetch. Do not reconstruct from memory at the end.'''

if OLD_SEARCH_LOG_END not in content:
    print('ERROR: could not find SEARCH LOG end anchor — aborting.')
    sys.exit(1)
if content.count(OLD_SEARCH_LOG_END) > 1:
    print('ERROR: SEARCH LOG end anchor appears more than once — aborting.')
    sys.exit(1)
if 'FETCH LOG' in content:
    print('NOTE: FETCH LOG section already present in template.')
    fix2_needed = False
else:
    fix2_needed = True

if not fix1_needed and not fix2_needed:
    print('Nothing to do — template already up to date.')
    sys.exit(0)

# ── Dry run ────────────────────────────────────────────────────────────────────
print('DRY RUN\n')
if fix1_needed:
    print('Fix 1: Add OUTPUT_FETCH_LOG to variable list')
    print(f'  OLD: {OLD_VARS!r}')
    print(f'  NEW: {NEW_VARS!r}\n')
if fix2_needed:
    print('Fix 2: Add FETCH LOG section after SEARCH LOG section')
    print('  (inserts ~25 lines after the SEARCH LOG discipline instruction)\n')

answer = input('Proceed? Type YES to apply: ').strip()
if answer != 'YES':
    print('Aborted.')
    sys.exit(0)

# ── Apply ──────────────────────────────────────────────────────────────────────
if fix1_needed:
    content = content.replace(OLD_VARS, NEW_VARS, 1)
if fix2_needed:
    content = content.replace(OLD_SEARCH_LOG_END, NEW_FETCH_LOG_SECTION, 1)

open(path, 'w', encoding='utf-8').write(content)
print('Done. Template updated.')
