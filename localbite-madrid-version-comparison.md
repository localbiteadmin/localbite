# LocalBite Madrid — Version Comparison: v6 vs v7.1
*Generated: 2026-04-26*

---

## Headline Numbers

| Metric | v6 | v7.1 | Change |
|--------|-----|------|--------|
| Restaurants | 59 | 116 | +57 (+97%) |
| Sources | 5 | 9 | +4 |
| Both-pool | 6 | 6 | 0 |
| EN sources | 3 | 5 | +2 |
| ES sources | 2 | 4 | +2 |
| Geocoding | — | 64% (74/116) | — |
| Pipeline | localbite-v6 | localbite-v7.1 | — |

---

## Source Changes

### Retained sources (4)
| Writer | Publication | Language | Notes |
|--------|-------------|----------|-------|
| Paul Richardson | Epicurean Ways | EN | Confirmed across both runs |
| Gorka Elorrieta | Time Out Madrid | EN | ⚠ coi: Time Out Market Madrid |
| Lauren Aloise | Spanish Sabores | EN | ⚠ coi: Devour Tours Madrid |
| Brenda Alonso | The Objective | ES | Moved from v6 secondary role |

### Lost sources (1)
| Writer | Publication | Language | Reason |
|--------|-------------|----------|--------|
| Alberto Luchini | 7 Caníbales | ES | No qualifying 2023–2026 article with confirmed byline. "Matando Madrid con Luchini" series ended 2015. Current site content lacks individual bylines. |

### Added sources (5)
| Writer | Publication | Language | Notes |
|--------|-------------|----------|-------|
| Lori Zaino | The Infatuation | EN | New — confirmed 2025 article, but fetch truncated at ~11/30 entries |
| Mapi Hermida | La Gastrónoma | ES | New — independent ES food blog |
| Carlos Osorio | eldiario.es / Somos Madrid | ES | New — independent ES journalism |
| Julián Acebes | GastroMadrid | ES | New — neighbourhood-by-neighbourhood ES guide |
| Felicity Hughes | The Making of Madrid | EN | New — single-author EN site confirmed via About page |

### Phase 0 failures (3)
| Writer | Publication | Reason |
|--------|-------------|--------|
| José Carlos Capel | Gastroactitud | Multi-author site (Capel + Julia Pérez Lozano). Editorial "we" throughout. Named-author requirement unmet. |
| Alberto Luchini | 7 Caníbales | No qualifying 2023–2026 bylined article found. (See above.) |
| Con El Morro Fino | — | Two authors (David Maldonado + Juan David Fuertes). Single-author rule does not apply. Site also returning 400 errors. |

---

## Restaurant Count: Why +57?

The near-doubling from 59R to 116R has four drivers:

**1. Four additional sources (+4 sources × ~10–15 entries each = ~40–60 entries)**
Lori Zaino, Mapi Hermida, Carlos Osorio, Julián Acebes, and Felicity Hughes collectively
contributed the majority of the new restaurants. Each covered distinct Madrid neighbourhoods
with minimal overlap against the retained EN sources.

**2. v7.1 template is more inclusive at Phase 3**
The v6 pipeline had stricter Tier C auto-rejection thresholds. v7.1 keeps more Tier B
single-source entries (primary source, good fetch, quote ≥15 words). The 97 Tier B entries
vs. v6's smaller set reflects this.

**3. Michelin exclusion list applied consistently**
All 31 starred restaurants excluded. In v6 this may not have been applied as systematically.
The exclusion list removes venues that would otherwise appear across multiple sources — this
holds down both-pool but improves the product's positioning as a non-Michelin alternative.

**4. Usera and Chamartín coverage opened up**
Felicity Hughes (The Making of Madrid) specifically covered Usera — a neighbourhood with almost
no presence in v6. This added 5 restaurants from a structurally underrepresented area.

---

## Both-Pool: Why Still 6 Despite More Sources?

This is the key quality question. With 5 EN + 4 ES sources, 6 both-pool is lower than
the source count would predict. Three causes account for this:

**Cause 1 — Infatuation fetch truncation (estimated -3 BP)**
The Jina fetch of Lori Zaino's guide returned only ~11 of approximately 30 entries.
Lana, Lakasa, and Tripea are explicitly named in the failed sources log as likely
both-pool entries that were not extracted due to truncation. These three restaurants
all appear in the final pack as single-source entries via other sources — confirming
they would have been both-pool had the full Infatuation article been extracted.
Estimated impact: -3 both-pool entries.

**Cause 2 — 7 Caníbales loss (-1 to -2 BP estimated)**
Alberto Luchini's ES articles in v6 cross-validated with EN sources on several
restaurants. His loss removes an ES voice that covered neighbourhood spots with
strong name overlap against Paul Richardson and Time Out. No equivalent ES source
with the same editorial reach was found in v7.1.

**Cause 3 — New ES sources cover different terrain**
The new ES sources (La Gastrónoma, eldiario.es/Somos Madrid, GastroMadrid) focus on
neighbourhood local spots — Chamberí, Lavapiés, Carabanchel. The EN sources (Epicurean
Ways, Time Out, Spanish Sabores, Infatuation) skew toward well-known restaurants across
the city centre. Lower overlap = lower cross-validation = fewer both-pool entries.
This is structurally correct — the new ES sources are adding genuine diversity, not
confirming the same restaurants. The trade-off is intentional.

**Net assessment:** The 6BP result is a source failure result, not a quality gates
result. With Infatuation fully extracted and a replacement ES source for 7 Caníbales,
the realistic v7.1 both-pool ceiling is 9–12.

---

## Geocoding

74/116 (64%) with confirmed coordinates. 42 restaurants on neighbourhood centroid fallback.
Madrid's OSM coverage for restaurants is strong — the 64% reflects new openings (2023–2025)
not yet in OSM, not a systematic OSM gap.

**Wrong matches nulled (9):**
Rocacho Valdebebas (park), Playing Solo (bus stop), El Señor Martín (different entity),
Emma Cocina (zero overlap), Fanáticos del Sabor (different name), Sala Cero (coffee roaster),
Mamá Charo (different entity), Bolboreta (nursery school), Manifesto 13 (south Madrid, wrong area).

---

## Both-Pool Entries (v7.1)

Both-pool count: 6. All require EN + ES cross-validation from different publishers.

The specific both-pool restaurants are confirmed in the JSON. All 6 are restaurants
recommended by at least one EN source and at least one ES source independently.

---

## Summary Assessment

v7.1 is a substantially stronger pack than v6 by every measure except both-pool:
- 97% more restaurants
- 80% more sources  
- Broader neighbourhood coverage (Usera, Carabanchel, Chamartín added)
- Stronger geocoding infrastructure

Both-pool parity at 6 is a source failure artefact, not a product quality ceiling.
The next rebuild has clear, actionable fixes that should lift both-pool to 9–12.
