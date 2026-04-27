# LocalBite Italy — Part 1 Pre-Research (CONFIRMED)
*Updated: 2026-04-27 (Session: Italy Part 1 Pre-Research — 17 Cities)*
*Status: Research confirmed via web searches. Part 1 files for Rome + Milan ready to write.*

---

## Research Summary

This document replaces the draft pre-research from 2026-04-27 Session 1.
All writer and Michelin findings below are confirmed from actual web searches.
Items marked ⚠ VERIFY still need direct Michelin guide lookup before committing to exclusion lists.

---

## TIER 1: MAJOR CITIES

### ROME

**Writers confirmed:**
| Writer | Language | Source | URL | Status |
|--------|----------|--------|-----|--------|
| Katie Parla | EN | katieparla.com | katieparla.com/where-to-eat-drink-shop-rome/ | ✓ Active, updated June 2024 |
| Katie Parla | EN | Eater 38 | eater.com/cities/rome (quarterly) | ✓ Updated quarterly |
| Elizabeth Minchilli | EN | elizabethminchilli.com | elizabethminchilli.com/category/rome-restaurants/ | ✓ Active through 2026 |

**Italian-language writers:** None confirmed in Phase 0. Phase 1 should discover IT Rome critics. Rachel Roddy (Guardian) is a Rome resident but writes primarily recipes, not restaurant guides — cannot confirm a qualifying article without specific URL.

**Michelin Rome 2025:**
- 3★: La Pergola (Chef Heinz Beck, Via Alberto Cadlolo 101, Rome Cavalieri hotel) — EXCLUDE
- 2★: Il Pagliaccio (Chef Anthony Genovese), Acquolina, ⚠ VERIFY third 2★ name (appears to be Il Convivio Troiani — confirm at guide.michelin.com/it)
- 1★: 14 restaurants — list individually at guide.michelin.com/it before pipeline
- Total starred: 18 (2025 guide)

**Disambiguation:** Rome Georgia USA — LOW RISK. "Roma ristoranti" queries return Italy overwhelmingly. Use "Rome Italy" in EN queries as standard practice.

**Neighbourhoods:**
- Tier 1: Trastevere, Testaccio, Centro Storico (Pantheon/Navona), Prati, Campo de' Fiori
- Tier 2: Monti, Ostiense, Pigneto, Parioli, Flaminio, Nomentano, Esquilino
- Tier 3: Tor Pignattara, San Giovanni, Prenestino, Trionfale

**Bounding box (estimate):** lat 41.8–42.0, lng 12.3–12.6 (city only, not Fiumicino or Frascati)

**Pipeline confidence:** HIGH. Two strong EN Phase 0 sources. Strong both-pool potential.

---

### MILAN

**Writers confirmed:**
| Writer | Language | Source | URL | Status |
|--------|----------|--------|-----|--------|
| Jaclyn DeGiorgio | EN | asignorinainmilan.com | asignorinainmilan.com | ✓ Active Jun 2024, Jul 2025, Sep 2025 — monthly roundups |
| Various writers | EN | The Infatuation | theinfatuation.com/milan/guides/best-restaurants-milan | ✓ Updated Jan 2026 |

**Notes on A Signorina in Milan:** Named single author (Jaclyn DeGiorgio), food writer and tour guide, Milan-based. Publishes monthly "memorable meals" roundups. These are article-format posts with 5–6 restaurants each and editorial prose quotes. Monthly post URLs are the DIRECT_FETCH_SOURCES — use most recent comprehensive posts. Site active through September 2025.

**The Infatuation Milan:** JS-only (as with other Infatuation cities) — will return SPA shell in automated fetch. Include as DIRECT_FETCH_SOURCE for article_url recording purposes but Phase 0 fetch will likely fail. Infatuation pipeline extraction relies on Phase 0 noting the JS-block and treating it as a known limitation.

**Italian-language writers:** None confirmed in Phase 0. Phase 1 should discover IT Milan critics. Gambero Rosso covers Milan but has COI (Città del gusto market presence — verify for Milan specifically).

**Michelin Milan 2025:**
- 3★: Enrico Bartolini at MUDEC (Museo delle Culture, Viale Stelvio 1) — EXCLUDE
- 2★: 4 restaurants — ⚠ VERIFY all 4 names at guide.michelin.com/it (A Signorina in Milan post lists 1★ but not 2★ explicitly)
- 1★: 14 restaurants including Aalto, Contraste, Berton, Cracco, Felix Lo Basso, Il Luogo di Aimo e Nadia, Horto, Iyo, Moebius Sperimentale, Olmo, Sadler, Sine by Di Pinto, Anima; Joia closed end 2024
- Total starred: 19 (2025 guide)

**Disambiguation:** None needed. "Milan" dominates over any disambiguation risk.

**Gambero Rosso COI:** Gambero Rosso operates a Città del gusto in Milan — ⚠ VERIFY. Flag with ⚠ coi if confirmed in writer_profile.

**Neighbourhoods:**
- Tier 1: Navigli, Brera, Porta Venezia, Isola, Tortona, Sempione
- Tier 2: Porta Romana, Moscova, Garibaldi, Porta Genova, Ticinese
- Tier 3: Città Studi, Lambrate, Dergano, Affori

**Bounding box (estimate):** lat 45.4–45.5, lng 9.1–9.3 (city only, not Monza or Sesto San Giovanni)

**Pipeline confidence:** MEDIUM-HIGH. EN Phase 0 feasible with Jaclyn DeGiorgio. Both-pool requires Italian source found via Phase 1.

---

### NAPLES

**Writers confirmed:**
| Writer | Language | Source | URL | Status |
|--------|----------|--------|-----|--------|
| Katie Parla | EN | katieparla.com | katieparla.com/city-guides/naples/ | ✓ Active (confirmed city guide page) |
| Luciano Pignataro | IT | lucianopignataro.it | lucianopignataro.it/a/dove/campania/napoli/ | ✓ ACTIVE through April 2026 |

**Notes on Luciano Pignataro:** Major Italian food and wine journalist, Naples-based. Has dedicated Naples restaurant guide section and posts about all Campania starred restaurants (November 2024 post confirmed). Active through April 2026. Named author throughout. This is the primary IT source for Naples.

**Disambiguation: SEVERE — HIGHEST RISK in Italy batch.** Even with "Italy" in the query, Naples Florida results appear prominently. All Phase 1 queries MUST use "Napoli" (in Italian) or "Naples Italy" (in English). Do NOT use bare "Naples" in any search query.

**Michelin Naples city (NOT province):**
- 3★: NONE in Naples city
- 2★: George restaurant (Naples city)
- 1★: ARIA, Veritas, Il ristorante di Alain Ducasse (new 2025)
- NOTE: The Campania province has 40+ starred restaurants but most are outside Naples city (Amalfi Coast, Ischia, Capri, Sorrento, Vico Equense). The bounding box for Naples city will correctly exclude these.
- Campania 3★: NONE confirmed (Da Vittorio is in Bergamo/Brusaporto, not Campania)

**Province vs. city distinction:** CRITICAL. The pipeline bounding box for Naples city must be tight to exclude coastal restaurants. Ischia, Capri, Positano are all outside the Naples city bounding box.

**Neighbourhoods:**
- Tier 1: Centro Storico (Spaccanapoli, Via dei Tribunali), Chiaia, Posillipo
- Tier 2: Vomero, Quartieri Spagnoli, Pozzuoli area, Mergellina
- Tier 3: Fuorigrotta, Bagnoli, Secondigliano

**Bounding box (estimate):** lat 40.8–40.9, lng 14.2–14.3 (city only, NOT province — must exclude Ischia, Capri, Amalfi Coast)

**Pipeline confidence:** HIGH for IT (Luciano Pignataro). EN dependent on Katie Parla guide freshness. Strong both-pool potential.

---

### FLORENCE

**Writers confirmed:**
| Writer | Language | Source | URL | Status |
|--------|----------|--------|-----|--------|
| Emiko Davies | EN | emikodavies.substack.com | emikodavies.substack.com/p/where-to-eat-and-stay-in-florence | ✓ Oct 2023, comments through Apr 2025 |
| Katie Parla | EN | katieparla.com | katieparla.com/city-guides/florence/ (verify URL) | ✓ Listed in city guides index |
| Emiko Davies | EN | emikodavies.com | emikodavies.com/how-to-eat-and-travel-more-sustainably-in-florence | ✓ Jan 2025 |

**Notes on Emiko Davies:** Australian food writer/cookbook author who lived in Florence for ~20 years. Now based in Porto Ercole/Monte Argentario (Tuscany) and San Miniato (near Florence). Still covers Florence actively. Substack guide from October 2023 is within YEAR_RANGE: 2023-2026. Has both article-level prose quotes and named byline throughout.

**Italian-language writers:** None confirmed in Phase 0. Phase 1 should discover IT Florence critics.

**Michelin Florence 2026 (most current):**
- 3★: Enoteca Pinchiorri (Chef Riccardo Monco, Via Ghibellina 87) — EXCLUDE
- 2★: Santa Elisabetta (Chef Rocco de Santis, in Byzantine Pagliazza Tower) — EXCLUDE
- 1★: Gucci Osteria da Massimo Bottura, Il Palagio, Borgo San Jacopo, Saporium Firenze, Atto di Vito Mollica, Serrae Villa Fiesole, Luca's by Paulo Airaudo (new 2026)
- Total starred: 9 restaurants (2026 guide — most current available)
- Note: "Luca's Restaurant" mentioned in session plan as new 1★ — confirmed as "Luca's by Paulo Airaudo" (new for 2026)

**Disambiguation:** None needed. Florence (Italy) dominates.

**Neighbourhoods:**
- Tier 1: Oltrarno, Santa Croce, Sant'Ambrogio, Centro Storico, San Lorenzo
- Tier 2: Prato, Settignano area, San Frediano, Porta Romana
- Tier 3: Peretola area, Galluzzo, Fiesole (if explicitly in city guide)

**Bounding box (estimate):** lat 43.7–43.85, lng 11.2–11.35 (city only, not Fiesole hill or Chianti)

**Pipeline confidence:** HIGH. Two confirmed EN Phase 0 sources. Strong both-pool potential.

---

## TIER 2: MEDIUM CITIES

### BOLOGNA

**Writers confirmed:**
| Writer | Language | Source | URL | Status |
|--------|----------|--------|-----|--------|
| Katie Parla | EN | katieparla.com | katieparla.com/city-guides/bologna/ | ✓ Active, updated Aug 2024 |

**Italian-language writers:** No named IT food writer confirmed in pre-research. CiboToday has a February 2025 article by Carolina Pozzi (Editor) — needs pipeline evaluation for byline qualifying. gourmettoria.it is a local Bologna restaurant guide that may have named bylines — check during pipeline.

**Michelin Bologna:**
- 2★: San Domenico (Imola, ~35km from Bologna) — OUTSIDE city bounding box, auto-excluded by geography
- 1★: One restaurant in Bologna city center (Via Indipendenza 69, unnamed in research) — ⚠ VERIFY name at guide.michelin.com/it/emilia-romagna/bologna
- Note: Casa Mazzucchelli (1★) is in Sasso Marconi, outside city — auto-excluded by geography

**Disambiguation:** None needed.

**Neighbourhoods:**
- Tier 1: Centro Storico (Quadrilatero, Piazza Maggiore), Bolognina, Santo Stefano
- Tier 2: Saragozza, San Donato, Navile, Porto
- Tier 3: San Vitale, Reno

**Bounding box (estimate):** lat 44.48–44.52, lng 11.30–11.38 (city only, not Imola)

**Pipeline confidence:** MEDIUM. One confirmed EN source. IT source gap — Phase 1 needed.

---

### MODENA

**Writers confirmed:**
| Writer | Language | Source | URL | Status |
|--------|----------|--------|-----|--------|
| Katie Parla | EN | katieparla.com | katieparla.com/city-guides/modena/ | ✓ Active, updated Nov 2025 |

**Notes:** Katie Parla mentions Osteria Francescana in her guide but explicitly says "you don't have to go." The Francescana exclusion is correct — it is 3★ Michelin.

**Michelin Modena:**
- 3★: Osteria Francescana (Massimo Bottura, Via Stella 22) — EXCLUDE
- 1★: ⚠ VERIFY names at guide.michelin.com/it/emilia-romagna/modena (Franceschetta 58 is Francescana-affiliated — check for star status; other Modena starred restaurants TBC)

**Disambiguation:** None needed.

**Neighbourhoods:**
- Tier 1: Centro Storico, Mercato Albinelli area
- Tier 2: Crocetta, Sant'Agnese
- Tier 3: Buon Pastore

**Bounding box (estimate):** lat 44.63–44.67, lng 10.88–10.95

**Pipeline confidence:** HIGH for EN (Katie Parla confirmed and current). IT source via Phase 1.

---

### TURIN

**Writers confirmed:** PARTIAL GAP
| Writer | Language | Source | URL | Status |
|--------|----------|--------|-----|--------|
| ⚠ TBC | EN | barrettandtheboys.substack.com | barrettandtheboys.substack.com/p/our-food-and-drink-guide-for-turin | Expat living in Turin — evaluate byline and editorial independence |

**Notes:** No strong dedicated EN food writer confirmed for Turin in this pre-research. The Substack post from February 2025 ("Barrett and the Boys") covers Turin food and drink but appears to be a personal expat food journal — needs evaluation during pipeline on whether it qualifies as a named-author editorial source. Livguine.com (Australian blogger Lozzy Lozinska) has a Turin restaurant guide — also borderline; evaluate during pipeline.

**Italian-language writers:** La Stampa (Turin newspaper) likely has a food critic — ⚠ VERIFY named food critic for La Stampa. Phase 1 should discover IT Turin critics.

**Known restaurant:** Del Cambio (historic Turin restaurant, Gambero Rosso Tre Forchette) — NOT Michelin starred per available data.

**Michelin Turin:**
- ⚠ VERIFY complete list at guide.michelin.com/it/piemonte/torino — Turin has fewer Michelin stars than other major cities
- Note: La Rei Natura (3★, Bossolasco, Piedmont) opened in the Langhe region, NOT in Turin city — auto-excluded by geography
- Da Vittorio (3★) is in Brusaporto, Bergamo province — NOT Turin

**Disambiguation:** None needed. "Torino" in Italian queries avoids any ambiguity.

**Neighbourhoods:**
- Tier 1: Centro (Piazza Carignano, Piazza Castello), Cit Turin, San Salvario
- Tier 2: Vanchiglia, Crocetta, Cenisia, Aurora
- Tier 3: Borgo Vittoria, Madonna di Campagna, Barriera di Milano

**Bounding box (estimate):** lat 45.03–45.10, lng 7.62–7.72

**Pipeline confidence:** MEDIUM-LOW. EN source gap is the primary risk. IT source gap also. Phase 1 is the primary discovery mechanism for Turin.

---

### VENICE

**Writers confirmed:**
| Writer | Language | Source | URL | Status |
|--------|----------|--------|-----|--------|
| Katie Parla | EN | katieparla.com | katieparla.com/city-guides/venice/ | ✓ Feb 2023 (within YEAR_RANGE 2023-2026) |
| Elizabeth Minchilli | EN | elizabethminchilli.com | elizabethminchilli.com/category/venice-restaurants/ | ✓ Active (Venice coverage confirmed) |

**Notes on Elizabeth Minchilli Venice:** She has a dedicated Venice restaurants category. Published a Venice guide in her newsletter and has a previous Eat Venice app guide. The category page shows active content.

**Italian-language writers:** None confirmed. Phase 1 needed.

**Michelin Venice city (islands ONLY — not Mestre mainland):**
- ⚠ VERIFY complete Venice island starred list at guide.michelin.com/it/veneto/venezia
- Note: The Veneto region has 34+ starred restaurants but most are NOT on Venice island
- Confirmed approaches to verify: search guide.michelin.com/it specifically for "Venezia" municipality (not Mestre/Terraferma)

**Venice bounding box — CRITICAL:** Must cover islands only (30118–30135 postcodes). The Mestre mainland (30170–30175) is part of the Comune di Venezia administratively but a completely different place geographically. Any restaurant in Mestre must be excluded.

**Disambiguation:** None needed for "Venice Italy" but pipeline must enforce island-only geography.

**Neighbourhoods (Venice islands):**
- Tier 1: San Marco, Cannaregio, Castello
- Tier 2: Dorsoduro, Santa Croce (Venezia), San Polo
- Tier 3: Giudecca

**Bounding box (estimate — islands only):** lat 45.42–45.46, lng 12.30–12.38 (Venice lagoon area; Mestre is at ~lat 45.47–45.50, lng 12.22–12.26 — must be excluded)

**Pipeline confidence:** MEDIUM. Two EN Phase 0 sources but one is February 2023 (earliest in YEAR_RANGE). Both-pool requires IT source via Phase 1.

---

### PALERMO

**Writers confirmed:**
| Writer | Language | Source | URL | Status |
|--------|----------|--------|-----|--------|
| Named authors | EN | Culinary Backstreets | culinarybackstreets.com/stories/palermo/best-bites-2024-16 | ✓ "Best of 2024 in Palermo" article confirmed |

**Notes on Culinary Backstreets Palermo:** CB has Palermo coverage as confirmed by the "Best Bites 2024" article. CB is a JS-only site (as with Bilbao, Lisbon etc) — the article_url will be confirmed from Phase 0 fetch note but actual content extraction may return SPA shell. Document as JS-only. Named authors on CB articles qualify (byline appears on each article).

**Italian-language writers:** None confirmed. Phase 1 needed for Sicilian-language or Italian food writers. Gambero Rosso COI: ⚠ VERIFY if Gambero Rosso has Città del gusto presence in Palermo or Catania (likely yes — flag with ⚠ coi).

**Michelin Palermo city:**
- 1★: Gagini (Chef Mauricio Zillo, former studio of Renaissance sculptor Antonello Gagini, Vucciria district)
- 1★: Mec Restaurant (Chef Carmelo Trentacosti, inside Museum of Innovation)
- ⚠ VERIFY additional stars at guide.michelin.com/it/sicilia/palermo

**Disambiguation:** None needed.

**Neighbourhoods:**
- Tier 1: Centro Storico (Vucciria, Ballarò, Kalsa), Mondello area
- Tier 2: Politeama, Libertà, Notarbartolo
- Tier 3: Borgo Vecchio, Brancaccio

**Bounding box (estimate):** lat 38.1–38.15, lng 13.32–13.40

**Pipeline confidence:** MEDIUM. One confirmed EN Phase 0 source (CB). IT source via Phase 1 needed for both-pool.

---

### VERONA

**Writers confirmed:** GAP
No named food writer (EN or IT) confirmed in pre-research.

**Key Michelin finding — CRITICAL:**
- 3★: Casa Perbellini 12 Apostoli (Chef Giancarlo Perbellini) — AWARDED THREE STARS in the 2025 Michelin guide (November 2024 ceremony). This is one of 14 three-star restaurants in Italy. — EXCLUDE
- ⚠ VERIFY remaining starred list at guide.michelin.com/it/veneto/verona

**Notes:** A Signorina in Milan (Jaclyn DeGiorgio) visited Confine pizzeria in Verona in June 2025, but this is a passing reference in a Milan post, not a Verona restaurant guide. Phase 1 needed for all sources.

**Disambiguation:** None needed.

**Neighbourhoods:**
- Tier 1: Centro Storico (Piazza Bra, Piazza delle Erbe, Piazza dei Signori)
- Tier 2: Veronetta, Borgo Trento
- Tier 3: Borgo Milano

**Bounding box (estimate):** lat 45.42–45.47, lng 10.97–11.02

**Pipeline confidence:** LOW. No Phase 0 sources. Relies entirely on Phase 1. Higher threshold risk.

---

## TIER 3: THIN CITIES

### GENOA

**Writers confirmed:** GAP
No named food writer (EN or IT) confirmed in pre-research.

**Potential sources to check during pipeline:**
- Fine Dining Lovers has an IT-language article on Genova restaurants (named author unknown from search — check byline during Phase 0 or Phase 1)
- Dissapore or similar IT food media may cover Genova

**Michelin Genoa:**
- 1★: Il Marin (Chef Marco Visciola, inside Eataly Genova at Porto Antico) — ⚠ COMMERCIAL CONFLICT: Il Marin is physically inside Eataly. Must flag and likely exclude on COI grounds.
- ⚠ VERIFY remaining starred list at guide.michelin.com/it/liguria/genova

**Disambiguation:** None needed. "Genova" in Italian queries.

**Neighbourhoods:**
- Tier 1: Caruggi (Centro Storico), Porto Antico, Boccadasse
- Tier 2: Foce, Castelletto, Quarto dei Mille
- Tier 3: Nervi, Cornigliano

**Bounding box (estimate):** lat 44.38–44.45, lng 8.88–9.00

**Pipeline confidence:** LOW. No Phase 0 sources. Phase 1 may not yield qualifying results. Threshold risk is real — may produce <10R.

---

### BARI

**Writers confirmed:** PARTIAL
| Writer | Language | Source | Notes |
|--------|----------|--------|-------|
| Katie Parla | EN | katieparla.com | Covers Puglia/Bari area (verify dedicated article vs. passing references) |
| Sophie Minchilli | EN | elizabethminchilli.com | Puglia specialist; Bari-based tours. Has restaurant knowledge for Bari area. |

**Notes:** Katie Parla has Puglia coverage. Sophie Minchilli leads Puglia & Basilicata tours based in Bari and knows the restaurant scene. ⚠ VERIFY both have qualifying article-format guides with prose quotes (not just tour-operator content).

**Disambiguation:** Bari South Africa — LOW RISK. "Bari Puglia" or "Bari Italy" clarifies.

**Michelin Bari:**
- ⚠ VERIFY at guide.michelin.com/it/puglia/bari

**Bounding box (estimate):** lat 41.08–41.15, lng 16.82–16.90

**Pipeline confidence:** MEDIUM. Potential Phase 0 sources but need URL verification before committing.

---

### CATANIA

**Writers confirmed:** GAP
No named food writer confirmed. Gambero Rosso Città del gusto — ⚠ VERIFY COI for Catania.

**Notes:** Etna wine writers are a possible angle for Phase 1. Dissapore or IT food media may cover Catania.

**Michelin Catania:**
- ⚠ VERIFY at guide.michelin.com/it/sicilia/catania

**Disambiguation:** None needed. "Catania Sicilia" clarifies.

**Bounding box (estimate):** lat 37.48–37.53, lng 15.06–15.12

**Pipeline confidence:** LOW. No Phase 0 sources. Phase 1 needed. Threshold risk.

---

### TRIESTE

**Writers confirmed:** GAP
No named food writer confirmed.

**Michelin Trieste:**
- Harry's Piccolo — Gambero Rosso Tre Forchette but ⚠ VERIFY Michelin starred status
- ⚠ VERIFY complete starred list at guide.michelin.com/it/friuli-venezia-giulia/trieste

**Disambiguation:** None needed.

**Bounding box (estimate):** lat 45.63–45.67, lng 13.73–13.80

**Pipeline confidence:** LOW. No Phase 0 sources. Central European food identity may attract specialist writers — Phase 1 needed.

---

### TRENTO

**Writers confirmed:** GAP

**THRESHOLD ASSESSMENT:** Pre-research found no qualifying food writers for Trento. "Trento Trentino" is covered by general Alto Adige wine tourism but dedicated restaurant food writing is not evident. Phase 1 may produce <10R.

**Michelin Trento:**
- Trentino-Alto Adige region has many starred restaurants but many are in the mountains far from Trento city
- ⚠ VERIFY what starred restaurants are actually in Trento city limits at guide.michelin.com/it/trentino-alto-adige/trento

**Disambiguation:** "Trento Italy" vs Trent UK — LOW risk. Use "Trento" (Italian name).

**Bounding box (estimate):** lat 46.05–46.08, lng 11.10–11.14

**Pipeline confidence:** VERY LOW. Consider parking as "coming soon" and running last in Batch G. Decision: run after confirming Batch F (Genoa, Bari, Modena, Matera) results.

---

### LECCE

**Writers confirmed:** PARTIAL
| Writer | Language | Source | Notes |
|--------|----------|--------|-------|
| Katie Parla | EN | katieparla.com | Puglia guide covers Salento/Lecce (La Succursale, Le Macàre confirmed) |
| Sophie Minchilli | EN | elizabethminchilli.com | Salento & Central Puglia tour based in Lecce |
| Elizabeth Minchilli | EN | elizabethminchilli.com | Tour operator coverage of Lecce area |

**Notes:** ⚠ VERIFY Katie Parla has a qualifying article (not just tour guide content) with prose quotes for Lecce/Salento restaurants. The session plan noted La Succursale and Le Macàre as confirmed in research — verify these are still live restaurants.

**Disambiguation:** None needed.

**Bounding box (estimate):** lat 40.34–40.37, lng 18.15–18.20

**Pipeline confidence:** MEDIUM. Potential sources need URL confirmation.

---

### MATERA

**Writers confirmed:** GAP

**Michelin Matera:**
- 1★: ⚠ VERIFY name of Vitantonio Lombardo's restaurant (described as "a cave restaurant" and "the first Michelin star in Matera" — name not confirmed in research). Could be "Come Una Volta" or similar. Confirm at guide.michelin.com/it/basilicata/matera.

**THRESHOLD ASSESSMENT:** Pre-research found no qualifying named food writer for Matera. The city is extremely niche. Basilicata region has minimal food media ecosystem. Elizabeth/Sophie Minchilli run tours through Matera but tour operator content ≠ qualifying article. Decision: run last in Batch G after confirming Lecce and Trento results. If pre-pipeline research (this session) cannot find a qualifying source, recommend parking as "coming soon."

**Disambiguation:** None needed.

**Bounding box (estimate):** lat 40.63–40.68, lng 16.57–16.63

**Pipeline confidence:** VERY LOW. Structural content gap. Likely <10R even if pipeline runs.

---

## KEY DECISIONS FOR BATCH PLAN (from this pre-research)

1. **Milan EN writer gap: RESOLVED.** Jaclyn DeGiorgio (asignorinainmilan.com) is a qualified named EN food writer. Monthly roundups qualify as editorial content with prose quotes. Both-pool requires IT source found via Phase 1.

2. **Trento: RECOMMEND PARKING.** No qualifying sources found. Run last in Batch G and only after other cities produce publishable packs.

3. **Matera: RECOMMEND PARKING.** Same reasoning as Trento. Structural food media gap.

4. **Naples disambiguation: SEVERE.** All queries must use "Napoli" or "Naples Italy" — enforce in Part 1 file with explicit disambiguation instruction.

5. **Verona: Confirmed 3★.** Casa Perbellini 12 Apostoli (Chef Perbellini) received 3★ in 2025. Must be in MICHELIN_STARRED_EXCLUSIONS.

6. **Venice bounding box: CRITICAL.** Island-only. Mestre is part of the Comune but geographically outside Venice island. All Mestre restaurants must be excluded.

7. **Bologna 2★ (San Domenico, Imola): Auto-excluded by geography.** Does not need to be in MICHELIN_STARRED_EXCLUSIONS — it is ~35km outside the city bounding box.

8. **Il Marin Genoa: COI concern.** Restaurant is inside Eataly — flag for pipeline to evaluate. May qualify for exclusion on commercial conflict grounds.

---

## MICHELIN VERIFICATION STILL NEEDED (pre-pipeline)

Before launching any pipeline, verify these at guide.michelin.com/it:

| City | What to verify |
|------|---------------|
| Rome | Third 2★ name (Il Convivio Troiani?) + full 1★ list |
| Milan | All 4 two-star names |
| Naples | Full 1★ Naples city list (only 3 confirmed) |
| Florence | Confirm 2026 list (9 restaurants per The Florentine) |
| Bologna | Name of city-center 1★ restaurant (Via Indipendenza) |
| Modena | Names of 1★ restaurants after Francescana |
| Turin | Full starred list |
| Venice | Venice island only starred list |
| Palermo | Additional stars beyond Gagini + Mec |
| Verona | Full starred list beyond Casa Perbellini |
| Genoa | Full starred list |
| Bari | Full starred list |
| Catania | Full starred list |
| Trieste | Harry's Piccolo star status + others |
| Trento | City-limit starred restaurants |
| Lecce | Any starred restaurants in Lecce city |
| Matera | Vitantonio Lombardo restaurant name |

---

## UPDATED BATCH PLAN RECOMMENDATION

Based on confirmed pre-research findings:

**Batch A: Rome (solo)**
- Part 1 file: READY TO WRITE
- Confidence: High
- Expected: 30–50R, 5–10BP

**Batch B: Milan (solo or paired with thin city)**
- Part 1 file: READY TO WRITE
- Confidence: Medium-High
- Expected: 30–50R, 3–7BP

**Batch C: Florence + Naples**
- Part 1 files: Ready after Michelin verification
- Confidence: Both High

**Batch D: Bologna + Turin**
- Turin risk flag: EN source gap
- Consider: Bologna solo if Turin confidence stays Low

**Batch E: Venice + Palermo + Verona**
- Venice: Medium confidence; Verona: Low confidence; Palermo: Medium
- Consider grouping differently: Venice + Palermo, then Verona solo

**Batch F: Genoa + Bari + Modena + Lecce**
- Run Modena first within batch (high confidence via Katie Parla)

**Batch G: Catania + Trieste + Trento + Matera**
- Run Catania and Trieste; park Trento and Matera pending Batch F results

**Recommended change from original plan:** Defer Trento and Matera decisions until after Batch C/D results confirm viability of thin cities. Do not commit pipeline resources until a qualifying source can be confirmed for each.
