# LocalBite Pipeline — Quick Start

Human-in-the-loop research pipeline. Runs in your terminal, makes real API calls, outputs a verified JSON city pack.

---

## Setup

**1. Install Node.js 18+**
Check your version: `node --version`
Download if needed: https://nodejs.org

**2. Install the Anthropic SDK**
```bash
npm install @anthropic-ai/sdk
```

**3. Set your API key**
```bash
export ANTHROPIC_API_KEY=your-key-here
```
Get a key at: https://console.anthropic.com

---

## Run

**Standard Claude Code launch command (use this for all pipeline runs):**
```bash
cd /Users/harryenchin/Documents/GitHub/localbite
claude --dangerously-skip-permissions
```

Then paste the full contents of the city prompt file (e.g. `localbite-prompt-v6-barcelona.txt`) into the Claude Code session.

The `--dangerously-skip-permissions` flag suppresses all mid-run approval prompts (file writes, Jina fetches, tool calls). Without it, every file write and URL fetch pauses for approval, significantly slowing pipeline execution.

**Do not use without this flag** — it is the standard for all city pipeline runs.

---

## Post-pipeline sequence

After the pipeline produces its review table and you have accepted or removed entries:

```bash
bash localbite-post-pipeline.sh [city-slug]
```

Example:
```bash
bash localbite-post-pipeline.sh barcelona
```

This chains: JSON validation → geocoding → viewer update → index update → commit.

---

## Token and performance capture — mandatory

When a pipeline run completes, the completion banner shows total tokens, tool uses, and run time. **Read and record this before scrolling** — it scrolls off and cannot be recovered.

Format to record:
```
Tokens: [X]k in / [Y]k out | Tool uses: [N] | Duration: [Xm Ys]
```

Add to the journal entry for the session. Token counts are the primary metric for planning 5x vs 20x Claude plan usage.

**Benchmark guidance:**
- Single city run (European, v6): ~140–230k tokens, 85–130 tool uses, 28–37 min
- Two-city staggered batch: ~280–460k tokens total
- 5x plan: sufficient for two-city staggered batches
- 20x plan: needed for three-city batches or pipeline + geocoding + viewer in one session

---

## What happens (v6 pipeline)

```
Phase 0 — Directly fetches known high-quality sources (Phase 0 list)
Phase 1 — 30 structured searches across 9 angles (A–I)
Phase 1B — 4–6 writer-first supplement queries
Phase 2 — Fetches and extracts restaurants from all verified sources
Phase 3 — Tiers, scores, publisher/COI checks, presents review table
Export — Writes raw JSON and final JSON; post-pipeline script runs
```

---

## Output format (v6)

```json
{
  "city": "Barcelona",
  "country": "Spain",
  "city_slug": "barcelona-spain",
  "built": "2026-04-08",
  "source_recency": "2023-2026",
  "pipeline": "localbite-strategy-c-v6",
  "confidence_tiers": {
    "auto_approved": 13,
    "reviewed_kept": 73,
    "user_removed": 0,
    "auto_rejected": 15,
    "concentration_cap_applied": 0
  },
  "sources": [...],
  "restaurants": [
    {
      "name": "Bornès",
      "neighbourhood": "El Born",
      "cuisine": "Mediterranean",
      "price_level": 2,
      "price_currency": "EUR",
      "signature_dish": "natural wines and small plates",
      "quote": "A minimal, buzzy spot in El Born beloved by locals...",
      "language_pool": "both",
      "source_count": 2,
      "sources": ["src-beteve", "src-culinary-backstreets"],
      "confidence_tier": "A",
      "lat": 41.3851,
      "lng": 2.1815,
      "geo_source": "nominatim",
      "geo_confidence": "high"
    }
  ]
}
```

**Important:** `city` and `country` must be top-level fields (not nested under `meta`). If the pipeline outputs them under `meta`, fix in the v6 template before the next run.

---

## Tips

- **Approve sources carefully.** Reject anything without a named author or with an article date before the year range.

- **Both-pool entries are the most trustworthy.** These appear in both English and local-language sources from different publishers independently. Same-publisher cross-language editions (e.g. Time Out EN + Time Out ES) do NOT qualify.

- **COI sources are included, not excluded.** If a source has a commercial conflict (e.g. Time Out Market), flag with ⚠ coi and include. Never exclude on COI grounds alone.

- **Price levels:** 1 = € (under €15pp), 2 = €€ (€15–40pp), 3 = €€€ (€40–80pp), 4 = €€€€ (over €80pp)

- **Jina fetch failures** are usually paywalls or heavily JS-rendered pages. Sources that return 400/422 are actively blocking Jina — do not attempt workarounds, log as failed and continue.

---

## Geocoding

Run after pipeline export:

```bash
node localbite-geocode.js localbite-[city]-2023-2026.json
```

The script uses Nominatim → Photon. No API key required. Bounding box validation is active for all configured cities — coordinates outside the box are rejected.

**Before running geocoding on any new city:**
1. Confirm the city is in `CITY_BOXES` in `localbite-geocode.js`
2. Confirm the JSON has `city` and `country` at the top level (or under `meta` — geocoder handles both)
3. If bounding box says "not configured for this city" — add the entry to `CITY_BOXES` via sed and re-run

**No manual lookups policy:** Accept null coordinates for unresolved restaurants. The viewer handles nulls gracefully with neighbourhood centroid fallback pins.

---

## Limitations

- Guía Repsol and similar JS-rendered sites often fail to fetch. Use their article URL rather than a search results page.
- Paywalled sources (Substack paid, newspaper subscriptions) will fail silently with short content.
- New restaurant openings (2024–2025) are systematically underrepresented in OSM — expect 20–30% null coordinates for recent-opening-heavy packs.
- Mesa Marcada (Portugal) — strong independent food platform but Jina does not expose article-level bylines. Blocked at Phase 1 named-author rule. Known gap — Firecrawl test recommended before next PT city run.

---

## Troubleshooting

**"No JSON in API response"** — Usually a network issue or the model returned an explanation instead of JSON. Re-run the script; it's usually transient.

**"Jina returned 403"** — The site is blocking the fetch. Try a different article URL from the same publication.

**"ANTHROPIC_API_KEY not set"** — Run `export ANTHROPIC_API_KEY=your-key` before running the script.

**"Bounding box: not configured for this city"** — The city name in the JSON doesn't match a key in `CITY_BOXES`. Check for accent differences (e.g. `Málaga` vs `Malaga`) and add the entry if missing.

**"city: undefined"** — The geocoder can't read the city name. Check whether the JSON has `city` at top level or under `meta`. The geocoder handles both, but confirm the fix is in the version running.

**Very few restaurants extracted** — Check the fetch quality reported in Phase 2. If it says `partial`, the article may be behind a paywall or JS-rendered.
