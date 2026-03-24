# LocalBite

Restaurant recommendations from local food writers — not algorithms, not aggregators.

**Live viewer:** https://localbiteadmin.github.io/localbite/

## What is LocalBite?

LocalBite surfaces restaurant recommendations from named local food writers and journalists, sourced from articles published in 2025 and 2026 only. Every recommendation links back to the original article so you can read the writer's full context.

The key signal is the **two-language confirmation** — restaurants recommended independently by writers in two different languages (for example an English food writer and a French or Spanish food writer both naming the same place). This cross-language agreement is a stronger quality signal than any single-source recommendation.

## Cities

| City | Country | Restaurants | Sources | Pipeline |
|------|---------|-------------|---------|----------|
| Barcelona | Spain | 52 | 9 | v4 |
| Valencia | Spain | 62 | 6 | v3 |
| Fes | Morocco | 10 | 3 | v4 |
| Marrakesh | Morocco | 14 | 5 | v5 |

## How it works

Each city pack is built by a research pipeline that:
1. Searches for food writers and journalists covering the city in English, the local language, and where applicable French or Arabic
2. Fetches and reads each article directly — no inferred data
3. Extracts only restaurants explicitly named in the article text
4. Scores each entry by confidence — number of independent sources, language diversity, quote quality
5. Produces a verified JSON city pack

## Data

All city packs are in the repository as JSON files. The schema includes restaurant name, neighbourhood, cuisine, price level, a quote from the writer, source attribution, and a language pool indicator.

## Source transparency

Every restaurant card in the viewer links to the original article. The Sources panel in the viewer lists every writer and publication used for each city, with their language, editorial independence, and a link to their work.

## Status

Early research phase. Four cities complete. Lisbon in progress.
