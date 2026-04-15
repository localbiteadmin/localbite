#!/usr/bin/env python3
"""
LocalBite v7 — Prior Knowledge Exclusion Verifier
Checks the Madrid v7 search plan for queries that use
proper nouns or named entities not provided in Part 1 variables.

Usage: python3 localbite-prior-knowledge-check.py \
         localbite-madrid-v7-search-plan.txt

Run this AFTER the search plan is written but BEFORE
any searches execute. If violations are found, the
pipeline must rewrite the flagged queries before proceeding.
"""

import sys
import re

# ─────────────────────────────────────────────────────────────
# ALLOWLIST — terms explicitly permitted in Phase 1 queries
# Derived directly from Part 1 variables. Any proper noun or
# named entity NOT in this list appearing in a query is a
# prior knowledge violation.
# ─────────────────────────────────────────────────────────────

# City and country
CITY_TERMS = {
    "madrid", "spain", "españa", "spanish", "español", "española"
}

# Neighbourhood names from GEOGRAPHIC_BOUNDARY_INCLUDE
NEIGHBOURHOOD_TERMS = {
    "centro", "sol", "austrias", "palacio",
    "latina", "la latina",
    "lavapiés", "lavapies",
    "malasaña", "malasana",
    "chueca",
    "salamanca",
    "chamberí", "chamberi",
    "retiro",
    "arganzuela",
    "carabanchel",
    "usera",
    "vallecas",
    "moncloa", "aravaca", "moncloa-aravaca",
    "tetuán", "tetuan",
    "hortaleza",
    "chamartín", "chamartin",
    "ibiza",
    "huertas",
    "embajadores",
    "ópera", "opera",
    "ponzano",
}

# Award names from NAMED_AWARDS
AWARD_TERMS = {
    "academia madrileña de gastronomía",
    "academia madrilena de gastronomia",
    "premios de la academia",
    "premios academia madrileña",
    "academia madrileña",
    "soles repsol",
    "sol repsol",
    "guía repsol",
    "guia repsol",
    "repsol",
    "premios metrópoli",
    "premios metropoli",
    "metrópoli",
    "metropoli",
}

# Source category terms from SOURCE_EXAMPLES (categories only)
SOURCE_CATEGORY_TERMS = {
    "el comidista", "comidista",       # listed explicitly in DIRECT_FETCH_SOURCES
    "guía repsol", "guia repsol",      # listed explicitly in DIRECT_FETCH_SOURCES
    "time out",                         # listed in SOURCE_EXAMPLES
    "the infatuation",                  # listed in SOURCE_EXAMPLES
    "condé nast", "conde nast",         # listed in SECONDARY_SOURCES
    "lonely planet",                    # listed in SECONDARY_SOURCES
    "the guardian",                     # listed in SECONDARY_SOURCES
    "el país", "el pais",              # parent of El Comidista — acceptable
    "el mundo",                         # parent of Metrópoli — acceptable
    "abc",                              # listed in SOURCE_EXAMPLES as ABC Gastro
    "7 caníbales", "7 canibales",      # listed in SOURCE_EXAMPLES
}

# Generic food writing terms — permitted anywhere
GENERIC_TERMS = {
    # English
    "best", "restaurants", "restaurant", "food", "writer", "writers",
    "critic", "critics", "guide", "local", "recommendations",
    "recommendation", "journalist", "journalists", "blog", "blogger",
    "bloggers", "editorial", "independent", "review", "reviews",
    "where", "eat", "eating", "dining", "cuisine", "scene",
    "new", "openings", "opening", "awards", "award", "recognised",
    "recognition", "named", "author", "byline", "picks",
    "personal", "honest", "community", "expat", "expats",
    "residents", "resident", "magazine", "press", "media",
    "international", "immigrant", "chinese", "latin", "american",
    "asian", "african", "neighbourhood", "neighborhoods",
    "emerging", "hidden", "gems", "casual", "upscale", "fine",
    "dining", "tapas", "bar", "bars", "traditional", "modern",
    "contemporary", "fresh", "market", "seasonal",
    # Spanish / general Spanish food terms
    "mejores", "restaurantes", "restaurante", "comida", "gastronomía",
    "gastronomia", "guía", "guia", "periodista", "periodistas",
    "escritor", "escritores", "crítica", "critica", "crítico",
    "critico", "recomendaciones", "recomendación", "recomendacion",
    "donde", "comer", "dónde", "gastrónomo", "gastronomo",
    "independiente", "local", "locales", "cocina", "chef",
    "nueva", "nuevos", "nueva", "apertura", "aperturas",
    "premios", "premio", "reconocimiento", "galardonado",
    "blogger", "bloguero", "bloguera", "periodismo", "artículo",
    "articulo", "revista", "suplemento", "sección", "seccion",
    "comunidad", "barrio", "barrios", "vecinos", "vecindario",
    "taberna", "tasca", "tasquita", "tasquitas", "tabernas", "tascas",
    "guiso", "guisos", "cocido", "vermú", "vermu", "tapeo",
    "barra", "barras", "aperitivo", "pincho", "pinchos",
    "ración", "racion", "raciones", "menú", "menu",
    "mercado", "temporada", "casa de comidas",
    "asiático", "asiatico", "chino", "china", "latino", "latina",
    "latinoamericano", "latinoamericana", "africano", "africana",
    "internacional", "inmigrante", "fusión", "fusion",
    # Years and generic year terms
    "2023", "2024", "2025", "2026",
    # Common connectors and prepositions
    "de", "en", "los", "las", "un", "una", "con", "por", "del",
    "al", "el", "la", "y", "o", "a", "e", "que", "se", "su",
    "the", "a", "an", "in", "of", "and", "or", "for", "with",
    "by", "at", "to", "from",
}

# LOCAL_FOOD_VOCABULARY terms — permitted in queries
VOCAB_TERMS = {
    "taberna", "tasca", "tasquita", "tasquitas",
    "guiso", "guisos", "cocido", "vermú", "vermu", "tapeo",
    "casa de comidas", "barra",
    "menú del día", "menu del dia",
    "menú de mercado", "menu de mercado",
}

# Combine all permitted terms
ALL_PERMITTED = (
    CITY_TERMS |
    NEIGHBOURHOOD_TERMS |
    AWARD_TERMS |
    SOURCE_CATEGORY_TERMS |
    GENERIC_TERMS |
    VOCAB_TERMS
)

# ─────────────────────────────────────────────────────────────
# PATTERNS THAT SIGNAL PRIOR KNOWLEDGE USE
# These patterns catch common forms of prior knowledge
# injection regardless of exact wording.
# ─────────────────────────────────────────────────────────────

# A proper noun pattern: capitalised word(s) not at start of
# sentence and not in the allowlist. This catches writer names
# (e.g. "Carlos García"), restaurant names (e.g. "DiverXO"),
# and publication names (e.g. "Metrópoli" when not on the list).
# Note: this is heuristic — Spanish capitalises nouns differently
# from English. Flag for human review rather than hard reject.

SUSPICIOUS_PATTERNS = [
    # Two capitalised words together mid-sentence — likely a
    # person's name (First Last format)
    r'\b[A-ZÁÉÍÓÚÑÜ][a-záéíóúñü]+\s+[A-ZÁÉÍÓÚÑÜ][a-záéíóúñü]+\b',
    # A capitalised word following a comma or "by" — likely
    # a writer name attribution
    r'(?:by|por|de)\s+[A-ZÁÉÍÓÚÑÜ][a-záéíóúñü]+',
    # URL fragments that indicate a specific site being named
    r'site:[a-z]+\.[a-z]+',
]

# ─────────────────────────────────────────────────────────────
# KNOWN FALSE POSITIVES
# Capitalised terms that match the suspicious pattern but are
# permitted because they appear in Part 1 variables.
# ─────────────────────────────────────────────────────────────

FALSE_POSITIVES = {
    # Award names that are two capitalised words
    "Guía Repsol", "Soles Repsol", "Sol Repsol",
    "Time Out", "El País", "El Mundo", "El Comidista",
    "Condé Nast", "Lonely Planet", "The Guardian",
    "The Infatuation", "7 Caníbales",
    # Neighbourhood names with articles
    "La Latina", "La Malasaña",
    # Generic award terms
    "Michelin Guide", "Guía Michelin",
}

# ─────────────────────────────────────────────────────────────
# PARSER
# ─────────────────────────────────────────────────────────────

def extract_queries(filepath):
    """
    Extract individual queries from the search plan file.
    Returns list of (label, query_text) tuples.
    Handles formats like:
      Q1: "query text"
      A1. query text
      [angle-A1] query text
    """
    queries = []
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Match lines that look like search queries
    # Format 1: Q1: "..."  or  Q1 [tag]: "..."
    # Format 2: A1. query text
    # Format 3: [phase-1-A1] "query" → result (search log format)
    # Format 4: bare query lines in angle sections

    patterns = [
        # Labelled queries with quotes
        r'(Q\d+|[A-O]\d+)[:\.\s]+["\u201c]([^"\u201d\n]+)["\u201d]',
        # Labelled queries without quotes
        r'(Q\d+|[A-O]\d+)[:\.\s]+"?([^"\n]{10,80})"?',
        # Phase log format
        r'\[(phase[^\]]+)\]\s+"?([^"\n→]{10,80})"?',
    ]

    for pattern in patterns:
        matches = re.findall(pattern, content, re.IGNORECASE)
        for label, query in matches:
            query = query.strip().strip('"').strip('\u201c').strip('\u201d')
            if len(query) > 8:
                queries.append((label.strip(), query))

    # Deduplicate while preserving order
    seen = set()
    unique = []
    for label, query in queries:
        key = query.lower()
        if key not in seen:
            seen.add(key)
            unique.append((label, query))

    return unique


def check_query(label, query):
    """
    Check a single query for prior knowledge violations.
    Returns list of (violation_type, flagged_text, severity) tuples.
    severity: 'VIOLATION' = definite, 'REVIEW' = possible, needs human check
    """
    violations = []
    query_lower = query.lower()

    # Check 1: suspicious patterns (proper nouns, name attributions)
    for pattern in SUSPICIOUS_PATTERNS:
        matches = re.findall(pattern, query, re.IGNORECASE)
        for match in matches:
            # Check if it's a known false positive
            is_false_positive = any(
                fp.lower() in match.lower() or match.lower() in fp.lower()
                for fp in FALSE_POSITIVES
            )
            # Check if all words are in the allowlist
            words = match.lower().split()
            all_permitted = all(
                word in ALL_PERMITTED or
                any(word in term for term in ALL_PERMITTED)
                for word in words
            )
            if not is_false_positive and not all_permitted:
                violations.append((
                    'POSSIBLE_PROPER_NOUN',
                    match,
                    'REVIEW'
                ))

    # Check 2: specific writer name patterns (First Last, no comma)
    # Heuristic: two consecutive title-case words not in allowlist
    title_case_pairs = re.findall(
        r'\b([A-ZÁÉÍÓÚÑÜ][a-záéíóúñü]{2,})\s+([A-ZÁÉÍÓÚÑÜ][a-záéíóúñü]{2,})\b',
        query
    )
    for first, last in title_case_pairs:
        combined = f"{first} {last}"
        combined_lower = combined.lower()
        if combined_lower not in {fp.lower() for fp in FALSE_POSITIVES} and \
           combined_lower not in ALL_PERMITTED and \
           first.lower() not in ALL_PERMITTED and \
           last.lower() not in ALL_PERMITTED:
            violations.append((
                'POSSIBLE_WRITER_NAME',
                combined,
                'REVIEW'
            ))

    # Check 3: restaurant name patterns
    # Restaurants often appear in quotes, or as standalone capitalised
    # names. Hard to detect without a known restaurant list, so flag
    # any quoted term that isn't a known permitted phrase.
    quoted = re.findall(r'"([^"]{3,40})"', query)
    for q in quoted:
        q_lower = q.lower()
        if q_lower not in ALL_PERMITTED and \
           not any(q_lower in fp.lower() for fp in FALSE_POSITIVES):
            # Check if it's a plausible restaurant name
            # (title case, short, no generic food terms)
            words = q.split()
            if len(words) <= 4 and q[0].isupper():
                generic_count = sum(
                    1 for w in words if w.lower() in GENERIC_TERMS
                )
                if generic_count < len(words):
                    violations.append((
                        'POSSIBLE_RESTAURANT_NAME',
                        q,
                        'REVIEW'
                    ))

    return violations


def check_search_plan(filepath):
    """
    Main check function. Parses the search plan file,
    checks each query, and reports violations.
    """
    print(f"\nLocalBite Prior Knowledge Exclusion Check")
    print(f"File: {filepath}")
    print("=" * 60)

    try:
        queries = extract_queries(filepath)
    except FileNotFoundError:
        print(f"ERROR: File not found: {filepath}")
        sys.exit(1)

    if not queries:
        print("WARNING: No queries found in file.")
        print("Check that the search plan has been written before running this check.")
        sys.exit(1)

    print(f"Queries found: {len(queries)}\n")

    violations_found = []
    clean_queries = []

    for label, query in queries:
        violations = check_query(label, query)
        if violations:
            violations_found.append((label, query, violations))
        else:
            clean_queries.append((label, query))

    # Report
    if not violations_found:
        print(f"✓ ALL {len(queries)} QUERIES PASSED")
        print("\nNo prior knowledge violations detected.")
        print("All proper nouns and named entities found are")
        print("on the permitted list from Part 1 variables.")
        print("\nPROCEED TO PHASE 1 SEARCHES.")
    else:
        print(f"✗ {len(violations_found)} QUERIES FLAGGED FOR REVIEW")
        print(f"✓ {len(clean_queries)} queries passed\n")
        print("-" * 60)

        for label, query, violations in violations_found:
            print(f"\nQuery {label}: \"{query}\"")
            for v_type, v_text, severity in violations:
                marker = "⚠ REVIEW" if severity == "REVIEW" else "✗ VIOLATION"
                print(f"  {marker}: [{v_type}] \"{v_text}\"")

        print("\n" + "-" * 60)
        print("\nACTION REQUIRED:")
        print("Review each flagged query above.")
        print("For each flagged term, determine:")
        print("  (a) Is it in Part 1 variables? → PERMITTED, ignore flag")
        print("  (b) Is it a generic food/restaurant term? → PERMITTED, ignore flag")
        print("  (c) Is it a specific writer, restaurant, or publication")
        print("      not in Part 1 variables? → VIOLATION")
        print("      Rewrite the query to remove the specific named entity.")
        print("\nDO NOT PROCEED to Phase 1 searches until all")
        print("VIOLATION flags are resolved.")
        print("\nFlagged queries that are REVIEW only (no definite")
        print("violations) may proceed after human inspection.")

    print("\n" + "=" * 60)

    # Summary counts for runbook recording
    review_count = sum(
        1 for _, _, vs in violations_found
        if all(v[2] == 'REVIEW' for v in vs)
    )
    violation_count = sum(
        1 for _, _, vs in violations_found
        if any(v[2] == 'VIOLATION' for v in vs)
    )

    print(f"\nSUMMARY")
    print(f"Total queries checked:     {len(queries)}")
    print(f"Clean (no flags):          {len(clean_queries)}")
    print(f"Flagged for review:        {review_count}")
    print(f"Definite violations:       {violation_count}")

    if violation_count > 0:
        sys.exit(2)  # Exit code 2 = definite violations found
    elif review_count > 0:
        sys.exit(1)  # Exit code 1 = review needed
    else:
        sys.exit(0)  # Exit code 0 = all clear


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python3 localbite-prior-knowledge-check.py <search-plan-file>")
        print("Example: python3 localbite-prior-knowledge-check.py localbite-madrid-v7-search-plan.txt")
        sys.exit(1)

    check_search_plan(sys.argv[1])
