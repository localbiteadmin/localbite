# LocalBite — Next Session Plan
## Italy Pipeline Batches B–G
*Prepared: 2026-04-27*

---

## State Entering Next Session

- 27 cities live, ~900R
- Rome v7.1 complete and pushed (8367ee9)
- 15 Italy Part 1 files committed
- 15 full pipeline prompts on disk at /Users/harryenchin/Documents/GitHub/localbite/
- CITY_BOXES, index entries, fetch log — all done

---

## Step 0 — Session Start (5 min)

Run fleet script to verify state:

```bash
cd /Users/harryenchin/Documents/GitHub/localbite
cat > /tmp/fleet.py << 'ENDOFSCRIPT'
import json, glob
cities = []
for f in sorted(glob.glob('localbite-*-2023-2026.json') + glob.glob('localbite-*-2025-2026.json')):
    try:
        d = json.load(open(f))
        r = d.get('restaurants', [])
        cities.append({'city': d.get('city','?'), 'file': f, 'r': len(r),
            'bp': sum(1 for x in r if x.get('language_pool')=='both'),
            'pipeline': d.get('pipeline','?')})
    except: pass
print(f'Fleet: {len(cities)} files, {sum(c["r"] for c in cities)} restaurants')
for c in cities: print(f'  {c["city"]}: {c["r"]}R, {c["bp"]}BP — {c["pipeline"]} ({c["file"]})')
ENDOFSCRIPT
python3 /tmp/fleet.py
```

Verify full prompts exist:
```bash
ls localbite-prompt-v71-*-italy-full.txt | wc -l
```
Should return 15. If not (e.g. after a fresh clone or machine change), regenerate:
```bash
python3 combine-italy-prompts.py localbite-prompt-v7-template.txt
```

---

## Batch B — Milan

**Expected:** ~40–50 searches, 50–80 restaurants, strong both-pool potential (EN + IT writers confirmed)
**Full prompt:** localbite-prompt-v71-milan-italy-full.txt
**Key Phase 0 sources:** Jaclyn DeGiorgio (asignorinainmilan.com, EN), Katie Parla (milan city guide), Elizabeth Minchilli (milan category)
**Watch for:** Jaclyn DeGiorgio is the gap-resolver for Milan EN — her monthly roundups at asignorinainmilan.com are the confirmed source. If her site is 403'd or content is too thin, Phase 1 becomes the primary mechanism.

**Launch (T1):**
```bash
echo -e "\033]0;T1-Milan\007" && cd /Users/harryenchin/Documents/GitHub/localbite
claude --dangerously-skip-permissions
# At prompt:
# Read localbite-prompt-v71-milan-italy-full.txt and run the full pipeline now.
```

**Post-pipeline (T6):**
```bash
echo -e "\033]0;T6-postrun\007" && cd /Users/harryenchin/Documents/GitHub/localbite
node localbite-postrun.js localbite-milan-italy-2023-2026.json
tail -1 localbite-run-metrics.log
# Review medium-confidence geocodes
# Run approve-centroids separately:
node localbite-approve-centroids.js localbite-milan-italy-2023-2026.json --auto-accept
# Then verify article_urls:
python3 -c "
import json
d = json.load(open('localbite-milan-italy-2023-2026.json'))
sources = d.get('sources', {})
if isinstance(sources, dict): sources = list(sources.values())
for s in sources:
    print(s.get('writer'), '|', s.get('article_url'))
"
# Then commit:
git add localbite-milan-italy-2023-2026.json index.html localbite-index.json localbite-run-metrics.log localbite-milan-italy-search-log.txt localbite-milan-italy-fetch-log.txt localbite-milan-italy-search-plan.txt localbite-milan-italy-audit.txt localbite-milan-italy-failed-sources.txt
git commit -m "data: Milan v7.1 — N restaurants, N sources, N both-pool"
git push
```

---

## Batch C — Florence + Naples (launch 20 min apart)

**Florence expected:** ~35–45 searches, 40–60 restaurants
- Phase 0: Emiko Davies (emikodavies.substack.com), Leonardo Romanelli (leonardoromanelli.it — check as potential IT Phase 0)
- Both-pool potential: Emiko Davies (EN) + Leonardo Romanelli (IT) if he qualifies

**Naples expected:** ~40–50 searches, 40–70 restaurants
- CRITICAL: All queries must use "Napoli" (IT) or "Naples Italy" (EN) — NEVER bare "Naples"
- Phase 0: Katie Parla (naples city guide), Luciano Pignataro (lucianopignataro.it)
- Both-pool potential: Strong (Katie Parla EN + Luciano Pignataro IT)

**Launch Florence first (T1), Naples 20 min later (T2):**
```bash
# T1 — Florence
echo -e "\033]0;T1-Florence\007" && cd /Users/harryenchin/Documents/GitHub/localbite
claude --dangerously-skip-permissions
# Read localbite-prompt-v71-florence-italy-full.txt and run the full pipeline now.

# T2 — Naples (20 min after T1)
echo -e "\033]0;T2-Naples\007" && cd /Users/harryenchin/Documents/GitHub/localbite
claude --dangerously-skip-permissions
# Read localbite-prompt-v71-naples-italy-full.txt and run the full pipeline now.
```

**Post-pipeline:** Run postrun sequentially (Florence first, then Naples). Never simultaneously.

---

## Batch D — Bologna + Turin (launch 20 min apart)

**Bologna expected:** ~30–40 searches, 25–45 restaurants
- Phase 0: Katie Parla (bologna city guide)
- Ahimè is NOT excluded (Bib Gourmand + Green Star only, confirmed)
- San Domenico (Imola, 2★) will appear in searches — bounding box excludes it, but reject at extraction too

**Turin expected:** ~35–45 searches, 25–50 restaurants
- Phase 0: Mimi Thorisson (airmail.news/arts-intel/highlights/mimi-thorissons-guide-to-turin)
- IT source gap — Phase 1 primary for IT language
- Mimi Thorisson is NOT a single-author site; standard editorial rules apply (not the single-author bonus)

---

## Batch E — Venice + Palermo + Verona

**Venice:** ~35–45 searches
- Phase 0: Katie Parla (venice guide), Elizabeth Minchilli (venice category)
- CRITICAL: Mestre is excluded — mainland accessible by car/bus/tram, not boat
- Both-pool potential: Good (EN + IT if IT source found)

**Palermo:** ~30–40 searches
- Phase 0: Culinary Backstreets (palermo category — multi-author, require named byline per article)
- Only 1 starred restaurant in city (Mec Restaurant) — many Bagheria restaurants will appear in searches; reject

**Verona:** ~30–40 searches
- NO Phase 0 sources — Phase 1 primary from the start
- Casa Perbellini 3★ confirmed — exclude
- Province contamination risk: Valpolicella + Lake Garda restaurants appear in Verona guides frequently

**Rate limit note:** Three cities in one batch = treat as 3-city load. If all three are heavy (40+ searches each), stagger carefully or split into two sub-batches.

---

## Batch F — Genoa + Bari + Modena + Lecce

**Run order within batch:** Genoa → Modena → Lecce → Bari (Bari last — thin city risk)

**Genoa:** ~30–40 searches. No Phase 0. The Cook lost its star 2026 — can appear as non-starred recommendation.

**Modena:** ~30–40 searches. Phase 0: Katie Parla (modena guide). Osteria Francescana 3★ and Al Gatto Verde 1★ both excluded. Franceschetta 58 (Bottura's brasserie) is NOT starred — can be included.

**Lecce:** ~25–35 searches. No Phase 0. Bros' lost star 2026 — can appear if writer recommends for food quality (not just for former star). Thin city risk — review R count before committing to index.

**Bari:** ~25–35 searches. No Phase 0. ZERO starred restaurants in city — unique in fleet. Thin city risk — run last, review R count carefully.

---

## Batch G — Catania + Trieste

**Catania:** ~30–40 searches. No Phase 0. Two 1★ in city (Coria + Sapio — both excluded). Taormina (5★) will appear in searches — bounding box excludes but reject at extraction too.

**Trieste:** ~25–35 searches. No Phase 0. Harry's Piccolo 2★ only exclusion. Habsburg/Central European food culture — pipeline should target buffet triestino, osmize. Thin city risk.

---

## Post-Batch Tasks

After each batch completes and is pushed:

1. **Verify index.html line count** — approaching 2,500 triggers React migration
2. **Run fleet script** — verify restaurant count and both-pool counts
3. **Check thin cities** — Bari, Lecce, Catania, Trieste: if <10R, mark as coming_soon not published

---

## Outstanding Non-Italy Items (handle opportunistically)

- **Valladolid article_url specificity** — recomiendovalladolid.com/flamma/ used as source for 7 restaurants. Fix script needed.
- **Málaga EWN redirect** — Beluga + El Pimpi affected. Null or update article_url.
- **Barcelona Eixample centroid HIGH SPREAD** — identify outlier geocode, null it, recalculate centroid.
- **Valencia Russafa + Gran Vía HIGH SPREAD** — same fix.
- **postrun.js version string** — update header from v3.0 to v3.3.

---

## Suggested Next Session Title

**"LocalBite — Italy Batch B (Milan) + Batch C (Florence + Naples)"**

Or if running solo: **"LocalBite — Italy Milan Pipeline"**
