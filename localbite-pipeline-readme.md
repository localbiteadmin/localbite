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
- Mesa Marcada (Portugal) — strong independent food platform. Jina renders the page but bylines are not consistently exposed. Use the manual pre-fetch workaround for future PT city runs requiring Mesa Marcada content.

---

## Troubleshooting

**"No JSON in API response"** — Usually a network issue or the model returned an explanation instead of JSON. Re-run the script; it's usually transient.

**"Jina returned 403"** — The site is blocking the fetch. Try a different article URL from the same publication.

**"ANTHROPIC_API_KEY not set"** — Run `export ANTHROPIC_API_KEY=your-key` before running the script.

**"Bounding box: not configured for this city"** — The city name in the JSON doesn't match a key in `CITY_BOXES`. Check for accent differences (e.g. `Málaga` vs `Malaga`) and add the entry if missing.

**"city: undefined"** — The geocoder can't read the city name. Check whether the JSON has `city` at top level or under `meta`. The geocoder handles both, but confirm the fix is in the version running.

**Very few restaurants extracted** — Check the fetch quality reported in Phase 2. If it says `partial`, the article may be behind a paywall or JS-rendered.


---

## Workaround for 451/403 blocked sources

Some high-value sources return 451 or 403 to Jina but load fine in
a real browser. Use this manual pre-fetch approach — it takes 3-5
minutes per source and requires no tools or accounts.

When to use:
- Source returns 451 (legal/geo block) or 403 (bot detection) to Jina
- Source loads fine in your browser
- Source is important enough to justify the manual step

When NOT to use:
- Source returns 404 (article deleted — no workaround exists)
- Source is behind a paywall you do not subscribe to
- Source is blocked in your browser too

Procedure:

1. Open the article URL in Safari or Chrome
2. Wait for the page to fully load
3. Select all: Cmd+A, then copy: Cmd+C
4. Paste to a local file in your terminal:
   pbpaste > localbite-prefetch-[source-slug].txt

5. In the pipeline Part 1, add a PREFETCHED_SOURCES section:

   PREFETCHED_SOURCES:
   localbite-prefetch-toronto-life-bnr-2025.txt
     - Toronto Life Best New Restaurants 2025
     - writer: Liza Agrba, Caroline Aksich, Erin Hershberg
     - article_date: 2025-05-12
     - url: https://torontolife.com/food/these-are-torontos-best-new-restaurants-of-2025/

6. In Phase 0, add this instruction:
   For PREFETCHED_SOURCES: read the local .txt file using the
   Read tool. Do not attempt a Jina fetch. Treat as a successful
   Phase 0 fetch. Log as:
   [phase-0] PREFETCHED [publication] -- [date] -- [quality]

Known sources requiring this workaround:
- Toronto Life (all articles) -- 403 to Jina, accessible in browser
- The Guardian travel articles -- 451 to Jina, accessible in browser
- Publico/Fugas -- 451 to Jina, accessible in browser

Permanently inaccessible (no workaround):
- Observador -- 404 on all URLs, articles deleted. Remove from all
  PT city prompts permanently.

---

## Wayback Machine fallback for moved or deleted articles

When a source URL returns 404, try the Wayback Machine before
giving up. Add this to the Phase 2 fetch sequence in the prompt:

  If Jina returns 404 for a source URL, retry once using:
  https://r.jina.ai/https://web.archive.org/web/2026/[ORIGINAL_URL]
  If Wayback also fails, mark as failed and continue.
  Log: [phase-2] WAYBACK [publication] -- [result]

To test manually from terminal:
  curl "https://r.jina.ai/https://web.archive.org/web/2026/[URL]" | head -c 2000

Known use case in the fleet:
- The Curious Creature (Toronto) -- article deleted post-pipeline.
  Try: https://web.archive.org/web/2025/https://thecuriouscreature.com/best-new-restaurants-toronto-2024/

Limitations:
- Very recent content (under 30 days) may not be archived yet
- Paywall articles are archived in blocked form
- Works best for articles from 2023-2025 that have since moved

---

## Note on Jina and bot detection

Jina deliberately does not bypass bot detection -- this is their
stated policy. Upgrading to a paid Jina API key does NOT grant
access to blocked sites. The 403/451 failures are permanent for
those sources regardless of Jina tier.

Jina does render JavaScript (pages are fetched via a headless
browser), so JS-rendered content is generally accessible. The
failures are specifically bot-detection blocks and legal/geo
restrictions, not JS rendering limitations.

Alternatives evaluated and rejected for LocalBite's use case:
Firecrawl (credit-limited), Playwright (Node integration issues,
stealth patching needed), Crawl4AI (Python env, supply chain
incident in v0.8.5). Manual pre-fetch is the correct approach
at LocalBite's current scale.
