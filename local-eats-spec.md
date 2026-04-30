# Project Specification: LocalBite
### Writer-Curated Restaurant Recommendations by City

---

## 1. Project Overview

**LocalBite** is a public, free web application that surfaces restaurant recommendations written by local journalists, food writers, and bloggers — not algorithms or anonymous reviewers. Users search for a city and discover where locals actually eat, with the original writer's voice front and center.

**Core Value Proposition:** Authentic, prose-based recommendations from real local writers, aggregated into a searchable, filterable experience.

---

## 2. Tech Stack

| Layer | Technology | Rationale |
|---|---|---|
| Frontend | Next.js 14 (App Router) | SSR/SSG for SEO, fast page loads, great DX |
| Styling | Tailwind CSS | Rapid UI development |
| Database | Supabase (PostgreSQL) | Free tier, built-in auth for admin, easy querying |
| File Storage | Supabase Storage | Restaurant photos |
| AI Extraction | Anthropic Claude API (`claude-sonnet-4-20250514`) | Extract structured restaurant data from article URLs |
| Maps | Google Maps JavaScript API + Places API | Interactive map, lat/lng geocoding, hours lookup |
| Hosting | Vercel | Zero-config Next.js deployment |
| Admin Auth | Supabase Auth (email + password, single user) | Simple password-protected admin section |

---

## 3. Database Schema

### `cities`
| Column | Type | Notes |
|---|---|---|
| id | uuid (PK) | |
| name | text | e.g. "Toronto" |
| country | text | e.g. "Canada" |
| slug | text (unique) | e.g. "toronto" — used in URL |
| description | text | Short editorial intro to the city's food scene |
| created_at | timestamptz | |

### `neighborhoods`
| Column | Type | Notes |
|---|---|---|
| id | uuid (PK) | |
| city_id | uuid (FK → cities) | |
| name | text | e.g. "Kensington Market" |
| slug | text | |

### `writers`
| Column | Type | Notes |
|---|---|---|
| id | uuid (PK) | |
| name | text | |
| publication | text | e.g. "The Infatuation", "Toronto Life" |
| publication_scope | text | `"local"` or `"national"` — used to badge local outlets differently |
| city_id | uuid (FK → cities, nullable) | The city this writer is local to |
| local_credential | text | Short human-readable credential, e.g. "Lives in Seville", "Seville-based food writer", "10 years covering Seville's food scene" — written by admin, displayed on cards and writer profile |
| bio | text | Short description |
| url | text | Writer's profile or homepage |

### `sources`
| Column | Type | Notes |
|---|---|---|
| id | uuid (PK) | |
| writer_id | uuid (FK → writers) | |
| article_url | text | Original article URL |
| article_title | text | |
| published_date | date | |
| created_at | timestamptz | |

### `restaurants`
| Column | Type | Notes |
|---|---|---|
| id | uuid (PK) | |
| city_id | uuid (FK → cities) | |
| neighborhood_id | uuid (FK → neighborhoods, nullable) | |
| name | text | |
| address | text | Full street address |
| latitude | float | Geocoded from address |
| longitude | float | Geocoded from address |
| cuisine_type | text | e.g. "Japanese", "Italian", "Bakery" |
| price_range | integer | 1–4 ($, $$, $$$, $$$$) |
| phone | text | nullable |
| website | text | nullable |
| google_maps_url | text | Generated from lat/lng |
| hours | jsonb | `{ "Monday": "11am–10pm", ... }` from Google Places |
| featured | boolean | Default false — for "Best Of" lists |
| status | text | "published" or "draft" |
| created_at | timestamptz | |
| updated_at | timestamptz | |

### `recommendations`
Links a restaurant to a source, with the writer's quote.

| Column | Type | Notes |
|---|---|---|
| id | uuid (PK) | |
| restaurant_id | uuid (FK → restaurants) | |
| source_id | uuid (FK → sources) | |
| quote | text | The writer's exact words about the restaurant |
| created_at | timestamptz | |

### `photos`
| Column | Type | Notes |
|---|---|---|
| id | uuid (PK) | |
| restaurant_id | uuid (FK → restaurants) | |
| storage_url | text | Supabase Storage URL |
| caption | text | nullable |
| is_primary | boolean | One photo marked as the hero image |
| sort_order | integer | |

---

## 4. Application Pages & Routes

### Public-Facing

#### `/` — Homepage
- Hero section with search bar (search by city name)
- "Featured Cities" grid (manually curated, pulled from cities with `featured = true`)
- Tagline/mission statement: what makes LocalBite different

#### `/[city-slug]` — City Page
- City name, editorial description
- Filterable, searchable list of restaurants for that city
- **Filters (sidebar or top bar):**
  - Neighborhood (multi-select dropdown)
  - Price range ($ / $$ / $$$ / $$$$)
  - "Best Of" toggle (shows only `featured = true` restaurants)
- **Interactive map** (Google Maps) showing all visible restaurants as pins; pins update in real time as filters change; clicking a pin highlights the corresponding card
- Restaurant cards (see Section 5)
- Writer filter: optionally filter by a specific writer

#### `/[city-slug]/[restaurant-slug]` — Restaurant Detail Page
- Full restaurant info (name, address, cuisine, price, hours, phone, website)
- All writer quotes/recommendations for this restaurant, each attributed to writer + publication + link to original article
- Photo gallery
- Embedded Google Map centered on restaurant
- "More in [City]" section: 4–6 related restaurant cards

#### `/writers/[writer-slug]` — Writer Profile Page
- Writer name, publication, bio
- All restaurants they've recommended (cards grid)

### Admin (password-protected, `/admin/*`)

#### `/admin` — Dashboard
- Stats: total cities, restaurants, sources, recommendations
- Recent activity feed

#### `/admin/ingest` — AI Article Ingestion (core admin tool)
- Input field: paste one or more article URLs
- Select or create writer + publication
- Click "Extract" → calls Claude API with the article content
- AI returns structured JSON of extracted restaurants (see Section 6)
- Admin reviews each extracted restaurant in a checklist UI:
  - Confirm or edit: name, address, cuisine, price, quote
  - Accept / Skip each item
- On confirm: restaurants + recommendations are written to the database
- Geocoding runs automatically on save

#### `/admin/restaurants` — Restaurant List
- Table of all restaurants with search, filter by city, filter by status
- Quick edit inline for `featured`, `status`, `neighborhood`
- Link to full edit page

#### `/admin/restaurants/[id]` — Restaurant Edit
- Full form: all fields
- Photo upload (to Supabase Storage)
- Linked recommendations (view/delete)

#### `/admin/cities` — City Management
- Add/edit cities and neighborhoods
- Set featured cities

#### `/admin/writers` — Writer Management
- Add/edit writers and publications

---

## 5. Restaurant Card Component

Each card displays:
- Primary photo (if available, else a cuisine-based placeholder)
- Restaurant name
- Neighborhood + cuisine type + price range (e.g. "Kensington Market · Japanese · $$")
- **Writer count badge** (primary signal): e.g. "Recommended by 3 local writers" — displayed prominently below the restaurant name using a styled pill/badge. Always include the word "local" in this badge.
- Writer quote (truncated to ~2 lines with "read more" expansion)
- **Writer attribution line:** "[Writer Name], [Publication]" with link to original article, followed by the writer's `local_credential` in muted text — e.g. "Colin Ngai, Cozymeal · Lives in Seville". If `publication_scope` is `"local"`, render a small "Local publication" badge beside the publication name.
- **Google rating** (secondary signal): small muted text — e.g. "4.3 ★ Google" — shown beside the writer count badge. Tertiary text colour, never competing with editorial content.
- Google Maps link ("Get Directions")

**Design intent — three layers of local proof:**
1. **Writer count** ("Recommended by 2 local writers") — primary trust signal; "local" always present in the label
2. **Publication scope badge** — "Local publication" pill shown beside local outlets, distinguishing insider coverage from national publications passing through
3. **Writer credential** — short human-readable proof beneath each attribution: "Lives in Seville", "Seville-based food writer", "10 years covering Seville's food scene" — set by admin, displayed in muted tertiary text

None of these layers should visually dominate. Together they build a cumulative sense of local authority without feeling like a checklist.

Cards are used on: city page grid, restaurant detail "More in City" section, writer profile page.

---

## 6. AI Article Ingestion (Claude API Integration)

This is the core data-entry workflow. When the admin pastes an article URL:

1. **Fetch article content** server-side (Next.js API route), strip HTML to plain text
2. **Call Claude API** with a structured prompt:

```
You are a data extraction assistant. Given the following article text, extract all restaurant recommendations mentioned. For each restaurant return a JSON array with objects containing:
- name (string)
- address (string, best guess from context — may be partial)
- cuisine_type (string)
- price_range (integer 1–4, infer from context if possible, else null)
- quote (string — the exact sentence(s) where the writer recommends this restaurant)

Return ONLY a valid JSON array. No preamble. No markdown. No explanation.

Article:
[ARTICLE TEXT]
```

3. **Parse response** into a review UI (see `/admin/ingest` above)
4. On admin confirmation, **geocode each address** using Google Maps Geocoding API to populate `latitude` and `longitude`
5. **Look up hours + phone** from Google Places API using restaurant name + address
6. Write to database

**Deduplication:** Before inserting, check if a restaurant with the same name and city already exists. If so, offer to add the new quote as an additional recommendation to the existing record rather than creating a duplicate.

---

## 7. Map Integration

- Use **Google Maps JavaScript API** on city pages and restaurant detail pages
- On city page: render all restaurants as markers; clicking a marker scrolls to and highlights the corresponding card in the list (and vice versa — hovering a card highlights its map pin)
- Custom pin style: small circular pins in brand color
- On restaurant detail page: single pin centered on restaurant with info window

---

## 8. Search Behavior

- Homepage search: type a city name → autocomplete suggests matching cities in the database → navigates to `/[city-slug]`
- City page: a secondary search bar filters the restaurant list by name in real time (client-side)
- If a searched city doesn't exist in the database, show a friendly "We don't have [City] yet — check back soon" message

---

## 9. SEO & Performance

- All public pages are server-side rendered (SSR) or statically generated (SSG) via Next.js
- Each city page and restaurant detail page has:
  - `<title>`: e.g. "Best Restaurants in Toronto, Recommended by Local Writers | LocalBite"
  - `<meta description>`: auto-generated from city description or first writer quote
  - Open Graph tags (og:title, og:description, og:image using primary restaurant photo)
- `sitemap.xml` auto-generated for all public city and restaurant pages
- Images served via Next.js `<Image>` component with lazy loading and responsive sizing

---

## 10. URL Structure

| Route | Example |
|---|---|
| Homepage | `/` |
| City page | `/toronto` |
| Restaurant detail | `/toronto/canoe-restaurant` |
| Writer profile | `/writers/ivy-knight` |
| Admin dashboard | `/admin` |
| Admin ingest | `/admin/ingest` |
| Admin restaurants | `/admin/restaurants` |
| Admin cities | `/admin/cities` |
| Admin writers | `/admin/writers` |

Restaurant slugs are auto-generated from restaurant name (lowercase, hyphenated).

---

## 11. Environment Variables Required

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ANTHROPIC_API_KEY=
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
GOOGLE_PLACES_API_KEY=
```

---

## 12. Project File Structure

```
/
├── app/
│   ├── page.tsx                        # Homepage
│   ├── [city]/
│   │   ├── page.tsx                    # City page
│   │   └── [restaurant]/
│   │       └── page.tsx                # Restaurant detail
│   ├── writers/
│   │   └── [writer]/
│   │       └── page.tsx                # Writer profile
│   └── admin/
│       ├── layout.tsx                  # Admin auth wrapper
│       ├── page.tsx                    # Dashboard
│       ├── ingest/page.tsx             # AI ingestion tool
│       ├── restaurants/
│       │   ├── page.tsx
│       │   └── [id]/page.tsx
│       ├── cities/page.tsx
│       └── writers/page.tsx
├── components/
│   ├── RestaurantCard.tsx
│   ├── CityMap.tsx
│   ├── RestaurantMap.tsx
│   ├── FilterBar.tsx
│   ├── SearchBar.tsx
│   ├── WriterAttribution.tsx
│   └── PhotoGallery.tsx
├── lib/
│   ├── supabase.ts                     # Supabase client
│   ├── claude.ts                       # Anthropic API wrapper
│   ├── geocode.ts                      # Google Maps geocoding
│   ├── places.ts                       # Google Places hours/phone lookup
│   └── slugify.ts                      # Slug generation utility
├── app/api/
│   ├── ingest/route.ts                 # Article fetch + Claude extraction
│   └── geocode/route.ts                # Server-side geocoding
└── types/
    └── index.ts                        # Shared TypeScript types
```

---

## 13. MVP Scope (Phase 1)

Build in this order:

1. Database setup (Supabase schema, seed with 1 test city + 5 restaurants)
2. Public city page with restaurant cards and filters
3. Restaurant detail page
4. Interactive map on city page
5. Homepage with city search
6. Admin auth + basic CRUD for restaurants/cities/writers
7. AI ingestion tool (`/admin/ingest`)
8. SEO metadata + sitemap
9. Writer profile pages
10. Photo upload + gallery

---

## 14. Out of Scope (Future Phases)

- User accounts, saved lists, or favorites
- User-submitted recommendations
- Email newsletter or notifications
- Native mobile app
- Monetization / ads
- Restaurant owner claiming/editing listings
- Reviews or ratings from users
