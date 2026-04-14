# Toronto Photon Test — 2026-04-14

Tested Photon geocoder against 16 null-coordinate Toronto restaurants.

Result: 13/16 "found" — but 12 of 13 are false positives.
- Ayla, Bernhardt's, Bonito's, Casa Morales, Harlem, Linny's → all matched "Fran's Restaurant" (OSM catch-all)
- Aera → "Arada Bar and Restaurant" (name similarity only)
- Blue Bovine → "Blue Fig Middleterranean Restaurant" (matched on "Blue")
- Lunch Lady → "Evivva Restaurant Breakfast & Lunch" (wrong)
- Mott 32 → "Dumpling House Restaurant" (wrong)
- Takja BBQ → "New Hong Fatt BBQ Restaurant" (matched on "BBQ")
- Estiatorio Milos Toronto → "Tasty BBQ Seafood Restaurant" lat 43.794 (north of Eglinton, wrong)
- Osteria Giulia → "Osteria Giulia" exact match, lat 43.674 — PLAUSIBLE, verify manually

True misses (not in OSM): Animl Steakhouse, Daphne, Frenchy Bar et Brasserie

Conclusion: Photon draws from OSM like Nominatim. All 16 nulls are
2024-2025 new openings not yet in OSM. Photon adds no value for this
cohort. Null coordinates are correct — do not run Photon on Toronto.
Osteria Giulia worth a manual Google Maps check before next Toronto rebuild.
