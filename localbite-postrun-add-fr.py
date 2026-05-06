"""
localbite-postrun-add-fr.py
Add 'fr' (French) to the language_pool both-pool condition in postrun.js.
Without this fix, French cities cannot produce consensus picks (CPs).

Dry-run-first pattern. Run --dry-run first to verify, then without flag to apply.

Usage:
    python3 localbite-postrun-add-fr.py --dry-run
    python3 localbite-postrun-add-fr.py
"""
import sys

FILE = 'localbite-postrun.js'
DRY_RUN = '--dry-run' in sys.argv

# The both-pool condition in postrun.js v3.4 added 'it'.
# Pattern we expect to find (adjust if actual content differs):
# This targets the language_pool derivation logic.
# We look for the condition that checks for 'it' and add 'fr' alongside it.

# Try common patterns — the exact string depends on postrun.js v3.4 implementation.
# Pattern 1: checks language codes inline
CANDIDATES = [
    # Pattern: array of non-EN language codes checked for both-pool
    ("['es', 'pt', 'it']", "['es', 'pt', 'it', 'fr']"),
    ("['es','pt','it']",   "['es','pt','it','fr']"),
    # Pattern: individual checks
    ("=== 'it' || lang === 'es' || lang === 'pt'",
     "=== 'it' || lang === 'fr' || lang === 'es' || lang === 'pt'"),
    # Pattern: includes check
    ("['es', 'pt', 'it'].includes",
     "['es', 'pt', 'it', 'fr'].includes"),
    ("['es','pt','it'].includes",
     "['es','pt','it','fr'].includes"),
    # Pattern: set membership
    ("new Set(['es', 'pt', 'it'])",
     "new Set(['es', 'pt', 'it', 'fr'])"),
]

def main():
    with open(FILE, encoding='utf-8') as f:
        content = f.read()

    applied = None
    for old, new in CANDIDATES:
        count = content.count(old)
        if count == 1:
            applied = (old, new)
            break
        elif count > 1:
            print(f'WARN: pattern found {count} times — skipping: {old[:50]}')

    if applied is None:
        print('ERROR: no matching pattern found in postrun.js.')
        print('Manual fix required. Search for language_pool both condition and add "fr".')
        print()
        print('Candidate patterns searched:')
        for old, _ in CANDIDATES:
            print(f'  {old}')
        print()
        print('Grep postrun.js for the language_pool derivation:')
        print("  grep -n 'both\\|language_pool\\|es.*pt\\|it.*es' postrun.js | head -20")
        sys.exit(1)

    old_str, new_str = applied

    if DRY_RUN:
        print('DRY RUN — no files modified.')
        print(f'Found pattern: {old_str}')
        print(f'Would replace with: {new_str}')
        return

    new_content = content.replace(old_str, new_str, 1)

    with open(FILE, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print(f'Written. Added "fr" to language_pool both condition in {FILE}.')
    print(f'Pattern matched: {old_str}')

    # Verify
    with open(FILE, encoding='utf-8') as f:
        verify = f.read()
    if new_str in verify:
        print('Verification: "fr" confirmed present in updated file.')
    else:
        print('WARNING: could not verify update — check postrun.js manually.')

if __name__ == '__main__':
    main()
