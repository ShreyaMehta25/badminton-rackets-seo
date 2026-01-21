# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build and Development Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Production build (also runs next-sitemap via postbuild)
npm run lint     # Run ESLint
npm run start    # Start production server
```

## Architecture Overview

This is a Next.js 16 application (App Router) for a badminton racket comparison directory. It's heavily SEO-focused with dynamic filter pages and structured data.

### Core Data Flow

- **Static Data**: Racket data lives in `src/data/rackets.json` (typed via `src/types/racket.ts`). Player data in `src/data/players.ts`.
- **Path Alias**: Use `@/*` for imports from `src/*`.

### Routing Structure

- `/` - Landing page with multiple marketing sections
- `/rackets` - Main racket listing
- `/rackets/[id]` - Individual racket detail page
- `/rackets/[...filterPath]` - Dynamic SEO filter pages (e.g., `/rackets/for-beginners-under-5000`)
- `/players/[playerId]` - Player profile pages

### SEO Filter System

The `src/seo/` directory contains the filter page eligibility logic:

- **`eligibility.ts`** - Single source of truth for page indexability. Contains `parseFilters()`, `isIndexableFilterPage()`, `buildCanonicalUrl()`, and `filterProductsByParsedFilters()`.
- **`filterMappings.ts`** - Maps filter keys to URL slugs (e.g., `beginner` → `for-beginners`).
- **`allowedCombinations.ts`** - Defines which filter combinations are indexable (max 2 filters).
- **`pageRules.ts`** - Constants like `MIN_PRODUCTS: 5` and `MAX_FILTERS: 2`.

URL filter order is enforced as: `playerLevel → priceSlabs → weight → brand`

### Middleware

`src/middleware.ts` distinguishes between racket IDs and filter paths. Single-segment paths that aren't valid racket IDs get rewritten to `/rackets/filter/{segment}` to match the catch-all filter route.

### Components

- **Landing** (`src/components/landing/`): Homepage marketing sections (HeroSection, FAQSection, etc.)
- **Rackets** (`src/components/rackets/`): Racket display components (RacketCard, RacketGrid, RacketDetailContent, etc.)

### State Management

`src/contexts/SortContext.tsx` provides client-side sort state for racket listings.
