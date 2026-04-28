# LocalBite — Next Session Plan
## Italy Batch D: Bologna + Turin
*Prepared: 2026-04-28*

---

## State Entering Next Session

- 30 cities live, 1064R
- Milan, Florence, Naples v7.1 complete and pushed (763bd46 latest)
- 11 Italian cities remaining: Bologna, Turin, Venice, Palermo, Verona, Genoa, Bari, Modena, Lecce, Catania, Trieste
- All 15 Part 1 files committed
- Full pipeline prompts on disk (regenerated with price_level fix today)
- CITY_BOUNDS fix applied to all 4 Italian cities in index.html

---

## Step 0 — Session Start (5 min)

```bash
cd /Users/harryenchin/Documents/GitHub/localbite
python3 /tmp/fleet.py
ls localbite-prompt-v71-*-italy-full.txt | wc -l
```

Should show 30 cities, 1064R, 11 full prompt files remaining (Bologna, Turin, Venice, Palermo, Verona, Genoa, Bari, Modena, Lecce, Catania, Trieste). If prompts not present, regenerate:

```bash
python3 combine-italy-prompts.py localbite-prompt-v7-template.txt
```

---

## Pre-Launch Fix: neighbourhood dropout prevention

Before launching any pipeline, add explicit neighbourhood-first instruction to the v7.1 template. This prevents the 30-restaurant neighbourhood dropout observed in Naples.

In the extraction block of localbite-prompt-v7-template.txt, the neighbourhood field must be the FIRST field written for each restaurant — before quote, before sources, before any other field. This makes it compaction-resistant. Write a fix script and apply it before launching any pipeline.

---

## Batch D — Bologna

**Expected:** ~35–40 searches, 25–45 restaurants
**Full prompt:** localbite-prompt-v71-bologna-italy-full.txt
**Phase 0:** Katie Parla (bologna city guide)
**Key facts:**
- Ahimè: Bib Gourmand + Green Star ONLY — not excluded (confirmed pre-research)
- San Domenico (Imola, 2★) will appear in searches — bounding box excludes it; reject at extraction too
- 1★ in city: I Portici only
- Both-pool potential: moderate — depends on IT source found in Phase 1

**Launch (T1):**
```bash
echo -e "\033]0;T1-Bologna\007" && cd /Users/harryenchin/Documents/GitHub/localbite
claude --dangerously-skip-permissions
# At prompt:
# Read localbite-prompt-v71-bologna-italy-full.txt and run the full pipeline now.
```

---

## Batch D — Turin

**Expected:** ~35–45 searches, 25–50 restaurants
**Full prompt:** localbite-prompt-v71-turin-italy-full.txt
**Phase 0:** Mimi Thorisson (Airmail News, May 2025 — named author, not single-author site)
**Key facts:**
- IT source gap — Phase 1 primary for IT language
- 1★ in city (8): Andrea Larossa, Cannavacciuolo Bistrot, Condividere, Del Cambio, Vintage 1997, Carignano, Piano35, Unforgettable
- Magorabin CLOSED Feb 2025 — dropped from 2026 guide
- Langhe wine region restaurants will appear in searches — bounding box excludes them; reject at extraction
- Both-pool potential: lower — depends on IT source found in Phase 1

**Launch (T2, 20 min after Bologna):**
```bash
echo -e "\033]0;T2-Turin\007" && cd /Users/harryenchin/Documents/GitHub/localbite
claude --dangerously-skip-permissions
# At prompt:
# Read localbite-prompt-v71-turin-italy-full.txt and run the full pipeline now.
```

---

## Terminal Setup

```bash
# T1 — Bologna pipeline (launch first)
echo -e "\033]0;T1-Bologna\007" && cd /Users/harryenchin/Documents/GitHub/localbite

# T2 — Turin pipeline (launch 20 min after T1)
echo -e "\033]0;T2-Turin\007" && cd /Users/harryenchin/Documents/GitHub/localbite

# T5 — Monitoring only
echo -e "\033]0;T5-Monitor\007" && cd /Users/harryenchin/Documents/GitHub/localbite

# T6 — postrun + git (sequential, never simultaneous)
echo -e "\033]0;T6-postrun\007" && cd /Users/harryenchin/Documents/GitHub/localbite
```

---

## Monitoring (T5)

```bash
wc -l localbite-bologna-italy-search-log.txt 2>/dev/null
wc -c localbite-bologna-italy-working.json 2>/dev/null
ls -la localbite-bologna-italy-2023-2026.json 2>/dev/null
wc -l localbite-turin-italy-search-log.txt 2>/dev/null
wc -c localbite-turin-italy-working.json 2>/dev/null
ls -la localbite-turin-italy-2023-2026.json 2>/dev/null
```

---

## Post-Pipeline Checklist (T6) — Apply to Each City

Run sequentially. Never two postruns simultaneously.

```bash
# Step 1 — postrun
node localbite-postrun.js localbite-[city]-italy-2023-2026.json

# Step 2 — fix language_pool bug (always required after compaction)
python3 -c "
import json
d = json.load(open('localbite-[city]-italy-2023-2026.json'))
fixed = []
for r in d.get('restaurants', []):
    if r.get('both_pool') == True and r.get('language_pool') != 'both':
        r['language_pool'] = 'both'
        fixed.append(r.get('name'))
print('Fixed:', fixed)
with open('localbite-[city]-italy-2023-2026.json', 'w') as f:
    json.dump(d, f, indent=2, ensure_ascii=False)
"

# Step 3 — check for neighbourhood dropout
python3 -c "
import json
from collections import Counter
d = json.load(open('localbite-[city]-italy-2023-2026.json'))
hoods = Counter(r.get('neighbourhood') for r in d.get('restaurants', []))
print('Neighbourhood distribution:')
for h, c in hoods.most_common():
    print(f'  {h}: {c}')
"
# If 'None' or 'unknown' is large (>5), neighbourhood dropout occurred — apply fix

# Step 4 — check for HIGH SPREAD and wrong geocodes
# Run hood_check script

# Step 5 — verify article_urls
python3 -c "
import json
d = json.load(open('localbite-[city]-italy-2023-2026.json'))
sources = d.get('sources', [])
if isinstance(sources, dict): sources = list(sources.values())
for s in sources:
    print(s.get('writer'), '|', s.get('article_url'))
"

# Step 6 — verify CITY_BOUNDS match geocoder bbox
grep "'Bologna'\|'Turin'" index.html | grep minLat

# Step 7 — approve centroids (separately from git)
node localbite-approve-centroids.js localbite-[city]-italy-2023-2026.json --auto-accept

# Step 8 — commit
git add localbite-[city]-italy-2023-2026.json index.html localbite-index.json localbite-run-metrics.log localbite-[city]-italy-search-log.txt localbite-[city]-italy-fetch-log.txt localbite-[city]-italy-search-plan.txt localbite-[city]-italy-audit.txt localbite-[city]-italy-failed-sources.txt 2>/dev/null
git commit -m "data: [City] v7.1 — N restaurants, N sources, N both-pool"
git push
```

---

## Known Issues to Watch

**From this session — new patterns to catch early:**

1. **language_pool bug** — always check after postrun for both_pool=True restaurants with wrong language_pool. Fix before committing.

2. **neighbourhood dropout** — if hood_check shows large 'unknown' bucket, apply coordinate-based assignment. The fix-naples-geocodes-hoods.py pattern is reusable.

3. **Street/landmark false positives** — medium-confidence geocodes matching "Via [Name]", "Piazza [Name]", church names, museum names, or the city name itself are wrong geocodes. Null them.

4. **CITY_BOUNDS tighter than geocoder** — after postrun adds new CITY_BOUNDS to index.html, compare against geocode.js bounding boxes and widen if needed.

5. **Katie Parla category page URLs** — katieparla.com/restaurants/[city]/ is NOT an article_url. Null it. Her specific guide URLs (e.g. katieparla.com/city-guide-bologna/) are valid if confirmed from fetch.

---

## Outstanding Non-Batch Items (handle opportunistically)

- **language_pool bug fix in postrun.js** — STEP 1.5 should correctly handle list-format sources for language_pool recalculation
- **neighbourhood field compaction resistance** — add to template extraction instructions
- **Valladolid article_url specificity** — recomiendovalladolid.com/flamma/ used for 7 restaurants
- **Málaga EWN redirect** — 2 restaurants affected
- **Barcelona Eixample centroid HIGH SPREAD** — fix at rebuild
- **Valencia Russafa + Gran Vía HIGH SPREAD** — fix at rebuild
- **postrun.js version string** — update header from v3.0 to v3.3

---

## Suggested Next Session Title

**"LocalBite — Italy Batch D (Bologna + Turin)"**

Or if running Batch E too: **"LocalBite — Italy Batch D+E (Bologna + Turin + Venice + Palermo + Verona)"**
