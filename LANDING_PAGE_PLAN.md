# Landing Page Redesign: IKEA + Flipkart Style with Players & Auto-Pagination

## Executive Summary

Transform the landing page (`src/app/page.tsx`) into a comprehensive, image-rich catalogue following IKEA's clean editorial style and Flipkart's ecommerce density. Add professional player section, auto-rotating brand carousels, and update navigation to match reference images.

---

## Critical Files to Modify

### Primary Files
- `src/app/page.tsx` - Main landing page structure and section order
- `src/components/landing/Navigation.tsx` - Update to brand name + search bar layout

### New Components to Create
- `src/components/landing/PlayerShowcase.tsx` - Professional players section
- `src/components/landing/BrandCarousel.tsx` - Auto-rotating brand showcase with pagination
- `src/components/landing/RacketCarousel.tsx` - Reusable horizontal carousel for racket sections
- `src/components/ui/SearchBar.tsx` - Search input for navigation

### Components to Enhance (Add Images)
- `src/components/landing/HeroSection.tsx` - Add hero racket images
- `src/components/landing/ShopByPlayerType.tsx` - Add player type imagery
- `src/components/landing/ExpertPicks.tsx` - Convert to image-rich carousel
- `src/components/landing/HowToChoose.tsx` - Add spec diagrams/images

---

## Phase 1: Navigation Bar Redesign

### Current State
- Logo in center
- Links: Discover, Pro Gears, Compare
- Get Started button

### New Requirements (Based on Reference Images)
```
┌────────────────────────────────────────────────────────────┐
│ [BRAND LOGO]              [What are you looking for? 🔍]   │
│  Badminton Rackets        [Search input with icon    ]     │
└────────────────────────────────────────────────────────────┘
```

### Implementation Details
- **Left**: Brand name "Badminton Rackets Directory" with logo
- **Right**: Search bar component
  - Placeholder: "What are you looking for?"
  - Search icon inside input (right side)
  - Auto-complete dropdown (optional Phase 2)
  - On submit: Navigate to `/rackets` with search query
- **Middle**: Remove center navigation links (simplify like IKEA)
- **Sticky behavior**: Remains fixed on scroll with backdrop blur (keep current)
- **Styling**: Dark background (slate-900) matching current theme

---

## Phase 2: Landing Page Section Structure (Top to Bottom)

### Section A: Hero Section (Enhanced with Images)
**Current**: Text-heavy hero
**New**: Image-rich hero with featured racket

**Layout**:
```
┌─────────────────────────────────────────────┐
│  [Large Hero Image: Featured Racket]        │
│                                              │
│  H1: Find Your Perfect Badminton Racket    │
│  Subtext: Expert reviews, comparisons...    │
│                                              │
│  [Beginner] [Attacking] [Compare]           │
└─────────────────────────────────────────────┘
```

**Images**:
- Hero racket image (use top-rated racket's imageUrl)
- Background: Subtle gradient overlay
- Product image floats on right (desktop) or top (mobile)

---

### Section B: Trust Strip
**Keep existing** - No changes needed

---

### Section C: How to Choose Guide (Add Diagrams)
**Current**: Text-only 3-column grid
**New**: Add visual diagrams

**Enhancements**:
- **Skill Level column**: Icon showing player progression (beginner → advanced)
- **Playing Style column**: Diagram showing balance points (head-heavy vs head-light)
- **Specs column**: Weight comparison visual (3U, 4U, 5U rackets side-by-side)

**Images**: Simple SVG diagrams or existing racket images with annotations

---

### Section D: Shop by Skill Level (Image-Rich Carousels)

**NEW STRUCTURE** - Horizontal auto-scrolling carousels with pagination

#### D1: Beginner Rackets
```
H3: Best Badminton Rackets for Beginners
Paragraph: "Lightweight, forgiving rackets (4U-5U)..."

[← Carousel with 8 racket cards →]
[◀ ● ● ○ ○ ▶]  ← Flipkart-style pagination dots

CTA: View All Beginner Rackets (23) →
```

**Carousel Features**:
- Show 4 cards on desktop, 2 on tablet, 1.5 on mobile
- Navigation arrows (left/right)
- Pagination dots below (active dot highlighted)
- Each card shows: Image, Name, Price, Rating, Skill badge
- Horizontal scroll with smooth animation

#### D2: Intermediate Rackets
Same carousel structure as D1

**Filter**: `playerLevel === "intermediate"`
**Display**: 8 rackets in carousel

#### D3: Advanced Rackets
Same carousel structure as D1

---

### Section E: Shop by Playing Style (Image Carousels)

#### E1: Attacking/Power Rackets
**Carousel with images** - head-heavy rackets
**Filter**: `balance === "head-heavy"` OR `bestFor.includes("power")`

#### E2: Defensive/Control Rackets
**Carousel with images** - head-light rackets
**Filter**: `balance === "head-light"` OR `bestFor.includes("control")`

#### E3: All-Around Rackets
**Carousel with images** - even balance
**Filter**: `balance === "even"`

---

### Section F: **NEW - Professional Players Showcase**

**Purpose**: Show professional players and the rackets they use
**Data Source**: `src/data/players.ts` (10 active players available)

**Layout**:
```
H2: Rackets Used by Professional Players

[Grid of Player Cards - 3 columns desktop, 1 mobile]

┌───────────────────┬───────────────────┬───────────────────┐
│ [Player Image]    │ [Player Image]    │ [Player Image]    │
│ Viktor Axelsen    │ PV Sindhu         │ Lakshya Sen      │
│ 🇩🇰 Denmark       │ 🇮🇳 India         │ 🇮🇳 India        │
│ Men's Singles     │ Women's Singles   │ Men's Singles    │
│                   │                   │                   │
│ Uses: Yonex       │ Uses: Li-Ning     │ Uses: Victor     │
│ Astrox 100ZZ      │ Axforce 100       │ Thruster K      │
│ [View Profile →]  │ [View Profile →]  │ [View Profile →] │
└───────────────────┴───────────────────┴───────────────────┘
```

**Each Player Card Contains**:
- **Player image** (placeholder for now - you'll add images later)
  - Fallback: Use first letter of name in colored circle if no image
- **Player name** (bold, 18px)
- **Country flag emoji** + country name
- **Category badge** (Men's Singles, Women's Singles, Doubles, etc.)
- **Play style tags** (e.g., "Power", "Attacking", "Control")
- **Current racket used** (linked to racket detail page)
- **CTA**: "View Player Profile →" links to `/players/{playerId}`

**Player Selection**:
- Show top 6-9 active players (filtered by `isActive: true`)
- Prioritize diverse categories (mix of men's/women's, singles/doubles)
- Sort by prominence or manually curate

**Data Flow**:
```typescript
// In PlayerShowcase.tsx
import { players } from '@/data/players';
import rackets from '@/data/rackets.json';

const activePlayers = players.filter(p => p.isActive).slice(0, 9);

// For each player, get their current racket
const currentRacket = player.racketsUsed.find(r => r.usageType === 'current');
const racketData = rackets.find(r => r.id === currentRacket.racketId);
```

**Responsive**:
- Desktop: 3 players per row
- Tablet: 2 players per row
- Mobile: 1 player per row

---

### Section G: Shop by Budget (Image Carousels)

Convert to horizontal carousels with racket images:

#### G1: Under ₹5,000
**Carousel**: 6 budget rackets with images
**Pagination**: Flipkart-style dots

#### G2: ₹5,000 - ₹8,000
**Carousel**: 6 mid-range rackets

#### G3: ₹8,000 - ₹15,000
**Carousel**: 6 premium rackets

#### G4: Over ₹15,000
**Carousel**: 6 professional rackets

---

### Section H: **NEW - Auto-Rotating Brand Showcase**

**Purpose**: Showcase brands with auto-pagination (like Flipkart product carousels)

**Layout**:
```
H2: Shop by Brand

[Auto-rotating carousel showing 3-4 brand sections at once]

┌──────────────────────────────────────────────────────────┐
│  [YONEX SECTION]     [LI-NING SECTION]    [VICTOR SECTION]│
│  ┌──────────────┐   ┌──────────────┐    ┌──────────────┐ │
│  │ [Racket Img] │   │ [Racket Img] │    │ [Racket Img] │ │
│  │ [Racket Img] │   │ [Racket Img] │    │ [Racket Img] │ │
│  │ [Racket Img] │   │ [Racket Img] │    │ [Racket Img] │ │
│  └──────────────┘   └──────────────┘    └──────────────┘ │
│  23 rackets         18 rackets          15 rackets        │
│  [Explore Yonex→]   [Explore Li-Ning→]  [Explore Victor→]│
└──────────────────────────────────────────────────────────┘
         [◀  ● ○ ○ ▶]  ← Auto-pagination controls
```

**Auto-Pagination Features**:
- **Auto-advance**: Carousel rotates every 5 seconds
- **Manual controls**: Arrow buttons (left/right)
- **Pagination dots**: Show current slide (Flipkart pattern)
- **Pause on hover**: Stop auto-rotation when user hovers
- **Each brand card shows**:
  - Brand logo (if available) or name
  - 3-4 thumbnail racket images in grid
  - Racket count (e.g., "23 Yonex Rackets")
  - CTA button: "Explore {Brand} →" links to `/rackets/{brand}`

**Brand Data**:
```typescript
// Dynamically extract brands from rackets.json
const brands = [...new Set(rackets.map(r => r.brand))];
// Expected: ["Yonex", "Li-Ning", "Victor", "Apacs", etc.]

// For each brand, get top 3-4 rackets by rating
const topRackets = rackets
  .filter(r => r.brand === brandName)
  .sort((a, b) => b.reviewScore - a.reviewScore)
  .slice(0, 4);
```

**Implementation**:
- Use `setInterval` for auto-advance (5s)
- Framer Motion for smooth slide transitions
- Touch/swipe support on mobile

---

### Section I: Expert Picks (Convert to Image Carousel)

**Current**: Static grid
**New**: Horizontal carousel with large product images

**Layout**: Similar to skill level carousels
- Show 8-10 top-rated rackets (`reviewScore >= 4.5`)
- Large product images with hover zoom effect
- Navigation arrows + pagination dots

---

### Section J: Understanding Specs (Add Visual Diagrams)

**Enhancements**:
- **Weight section**: Side-by-side images of 3U, 4U, 5U rackets
- **Balance section**: Diagram showing balance point on racket shaft
- **Flex section**: Animation showing stiff vs flexible shaft bending

**Images**: Educational diagrams (can use annotated racket images)

---

### Section K: Comparison Tool Preview
**Keep existing** - Maybe add preview images of compared rackets

---

### Section L: FAQ
**Keep existing** - Text-focused section (no images needed)

---

### Section M: Final CTA
**Keep existing** - Call-to-action section

---

## Phase 3: Reusable Components Architecture

### Component 1: RacketCarousel
**Purpose**: Horizontal scrolling carousel for racket sections

**Props**:
```typescript
interface RacketCarouselProps {
  rackets: Racket[];
  title?: string;
  showPagination?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number; // ms
  cardsPerView?: { desktop: number; tablet: number; mobile: number };
}
```

**Features**:
- Responsive cards per view
- Arrow navigation (left/right)
- Pagination dots (optional)
- Auto-play (optional)
- Smooth Framer Motion animations
- Touch/drag support

**Styling**:
- Card: White background, shadow on hover (IKEA style)
- Spacing: 20px gap between cards
- Navigation: Emerald-colored arrows

---

### Component 2: BrandCarousel
**Purpose**: Auto-rotating brand showcase

**Props**:
```typescript
interface BrandCarouselProps {
  autoPlayInterval?: number; // Default: 5000ms
}
```

**Features**:
- Auto-advance every 5s
- Pause on hover
- Manual arrow controls
- Flipkart-style pagination dots
- Show 3 brand cards at once (desktop), 1 on mobile

---

### Component 3: PlayerShowcase
**Purpose**: Grid of professional player cards

**Props**:
```typescript
interface PlayerShowcaseProps {
  maxPlayers?: number; // Default: 9
}
```

**Features**:
- Fetches active players from `players.ts`
- Gets current racket for each player
- Links to `/players/{playerId}` and racket pages
- Responsive grid (3 cols → 2 cols → 1 col)

---

### Component 4: SearchBar
**Purpose**: Navigation search input

**Props**:
```typescript
interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}
```

**Features**:
- Controlled input with state
- Search icon (right side)
- On Enter or button click: navigate to `/rackets?search={query}`
- Auto-focus on `/` key press (optional)
- Styled to match IKEA/Flipkart reference

---

## Phase 4: Image Strategy

### Image Sources

#### Racket Images
- **Source**: Existing `imageUrl` field in `rackets.json`
- **Usage**: All carousel cards, hero section, comparison previews
- **Optimization**: Next.js `<Image>` component with lazy loading

#### Player Images
- **Source**: NEW field needed - `imageUrl` in `players.ts`
- **Fallback**: Letter avatar (first letter of name in colored circle)
- **Note**: User will add actual player images later

#### Brand Logos
- **Source**: Static assets in `/public/brands/` (create this folder)
- **Format**: SVG or PNG logos
- **Fallback**: Text-based brand name if logo missing

#### Educational Diagrams
- **Source**: New SVG diagrams or annotated racket images
- **Create**: Balance point diagram, weight comparison chart
- **Location**: `/public/diagrams/`

### Image Optimization
- Use Next.js `<Image>` component everywhere
- Lazy load below-fold images
- WebP format with PNG fallback
- Responsive sizes: `sizes="(max-width: 768px) 100vw, 33vw"`

---

## Phase 5: Pagination Implementation (Flipkart Style)

### Pagination Dots Component
```typescript
interface PaginationDotsProps {
  total: number;        // Total slides
  current: number;      // Current active slide (0-indexed)
  onDotClick?: (index: number) => void;
}
```

**Visual**:
```
[◀ ● ● ○ ○ ▶]
```
- Active dot: Filled circle (emerald-500)
- Inactive dots: Outline circle (slate-400)
- Arrows: Emerald-500, disabled state when at edges

**Behavior**:
- Click dot → jump to that slide
- Click arrow → advance/go back one slide
- Auto-advance (brand carousel only)

---

## Phase 6: Data Flow (No Backend Changes)

### Product Reuse Pattern

**Example: Yonex Astrox 99 Pro appears in:**
1. **Advanced Rackets** - `playerLevel === "advanced"`
2. **Attacking Rackets** - `balance === "head-heavy"`
3. **Premium Budget** - `price >= 15000`
4. **Expert Picks** - `reviewScore >= 4.5`
5. **Yonex Brand** - `brand === "Yonex"`
6. **Viktor Axelsen's Profile** - `usedByPlayers.includes("viktor-axelsen")`

**Implementation** (client-side filtering):
```typescript
// BeginnerRackets section
const beginnerRackets = rackets
  .filter(r => r.playerLevel === 'beginner')
  .sort((a, b) => b.reviewScore - a.reviewScore)
  .slice(0, 8);

<RacketCarousel rackets={beginnerRackets} title="For Beginners" />
```

### Player-Racket Linking
```typescript
// PlayerShowcase component
const player = players.find(p => p.id === 'viktor-axelsen');
const currentRacketId = player.racketsUsed.find(r => r.usageType === 'current')?.racketId;
const racket = rackets.find(r => r.id === currentRacketId);

// Display: "Uses: {racket.name}"
```

---

## Phase 7: Styling Guidelines (IKEA + Flipkart)

### IKEA Patterns
- **Typography**: Clean sans-serif (Inter), bold headings
- **Whitespace**: Generous padding (40px between sections)
- **Cards**: White background, subtle shadow, rounded corners (8px)
- **Colors**: Neutral palette (white, slate-100, slate-900) with emerald accent

### Flipkart Patterns
- **Density**: Spec badges, price prominence, rating stars
- **Carousels**: Horizontal scroll with arrows
- **Pagination**: Dot indicators with auto-advance
- **CTAs**: Bold buttons with hover effects

### Color Palette (Existing Theme)
- Background: `slate-50` (light) / `slate-950` (dark)
- Text: `slate-900` (headings) / `slate-600` (body)
- Accent: `emerald-500` (CTAs, active states)
- Cards: `white` with `slate-200` border

### Component Spacing
- Section padding: `py-16` (64px vertical)
- Card gap: `gap-5` (20px)
- Container: `max-w-7xl mx-auto px-6`

---

## Phase 8: Responsive Behavior

### Breakpoints (Tailwind)
- **Mobile**: `< 768px` (sm)
- **Tablet**: `768px - 1024px` (md)
- **Desktop**: `> 1024px` (lg)

### Carousel Cards Per View
| Section | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| Skill Level Carousels | 4 | 2 | 1.5 (peek) |
| Playing Style | 4 | 2 | 1.5 |
| Budget Carousels | 3 | 2 | 1.5 |
| Brand Carousel | 3 brands | 2 brands | 1 brand |
| Player Grid | 3 | 2 | 1 |

### Navigation Bar
- Desktop: Brand name + full search bar
- Mobile: Hamburger menu (optional) + compact search

---

## Phase 9: Animation & Interactions (Framer Motion)

### Carousel Animations
```typescript
// Slide transition
const slideVariants = {
  enter: { x: 100, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: -100, opacity: 0 }
};
```

### Card Hover Effects
- Lift: `hover:scale-105` (subtle)
- Shadow: `hover:shadow-xl`
- Transition: `transition-all duration-300`

### Auto-Play Brand Carousel
```typescript
useEffect(() => {
  const interval = setInterval(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, 5000);

  return () => clearInterval(interval);
}, [totalSlides]);
```

---

## Phase 10: SEO Considerations

### Structured Data (Existing)
- Keep existing product schema in carousels
- Add Organization schema to navigation
- FAQ schema (already present)

### Image Alt Text
- Rackets: `"{racket.name} badminton racket by {racket.brand}"`
- Players: `"{player.name}, professional {player.category} player from {player.country}"`
- Diagrams: Descriptive alt (e.g., "Racket balance point diagram")

### Internal Linking
Every carousel has "View All" CTA linking to:
- Skill levels: `/rackets/for-{level}`
- Playing styles: Custom filter URLs
- Brands: `/rackets/{brand}`
- Players: `/players/{playerId}`

---

## Implementation Order

### Step 1: Update Navigation (1 component)
- Modify `Navigation.tsx`
- Create `SearchBar.tsx`
- Test responsive behavior

### Step 2: Create Reusable Components (3 components)
- `RacketCarousel.tsx` (with pagination)
- `BrandCarousel.tsx` (auto-play)
- `PlayerShowcase.tsx`

### Step 3: Update Landing Page Sections (Sequential)
1. HeroSection - add hero image
2. HowToChoose - add diagrams
3. Shop by Skill Level (3 sub-sections) - add carousels
4. Shop by Playing Style (3 sub-sections) - add carousels
5. **NEW** PlayerShowcase section
6. Shop by Budget (4 sub-sections) - add carousels
7. **NEW** BrandCarousel section
8. ExpertPicks - convert to carousel
9. Understanding Specs - add diagrams

### Step 4: Polish & Optimize
- Image optimization (Next.js Image component)
- Lazy loading below fold
- Animation tuning
- Mobile responsiveness testing

---

## Testing & Verification

### Functional Testing
1. **Navigation**:
   - Search bar submits to `/rackets?search={query}`
   - Brand logo links to home
   - Sticky behavior works on scroll

2. **Carousels**:
   - Arrow navigation works (left/right)
   - Pagination dots update correctly
   - Auto-play on brand carousel (5s interval)
   - Pause on hover works
   - Touch/swipe on mobile

3. **Player Section**:
   - Player cards link to `/players/{playerId}`
   - Current racket links to `/rackets/{racketId}`
   - Fallback avatars show when no image

4. **Responsive**:
   - Cards per view adjust correctly
   - Mobile: 1.5 cards with peek effect
   - Tablet: 2 cards
   - Desktop: 3-4 cards

### Visual Testing
- Compare against reference images (image.png, image1.png)
- IKEA-style whitespace and clean cards
- Flipkart-style pagination dots and density
- Consistent emerald accent color

### Performance Testing
- Lighthouse score > 90
- Images lazy load
- Auto-play doesn't cause jank
- Smooth 60fps animations

---

## Summary of Changes

### New Sections
1. **Professional Players Showcase** (Grid with player cards)
2. **Auto-Rotating Brand Carousel** (Flipkart-style with pagination)

### Enhanced Sections (Added Images)
1. Hero - Hero racket image
2. How to Choose - Educational diagrams
3. All skill level sections - Horizontal carousels with racket images
4. Playing style sections - Image carousels
5. Budget sections - Image carousels
6. Expert Picks - Image carousel
7. Understanding Specs - Visual diagrams

### Updated Components
1. Navigation - Brand name left, search bar right

### New Reusable Components
1. RacketCarousel - Horizontal scrolling racket display
2. BrandCarousel - Auto-playing brand showcase
3. PlayerShowcase - Professional player grid
4. SearchBar - Navigation search input

---

## File Structure After Implementation

```
src/
├── app/
│   └── page.tsx (MODIFIED - new section order with carousels)
├── components/
│   ├── landing/
│   │   ├── Navigation.tsx (MODIFIED - brand + search layout)
│   │   ├── HeroSection.tsx (MODIFIED - add hero image)
│   │   ├── HowToChoose.tsx (MODIFIED - add diagrams)
│   │   ├── PlayerShowcase.tsx (NEW)
│   │   ├── BrandCarousel.tsx (NEW)
│   │   ├── RacketCarousel.tsx (NEW)
│   │   ├── ExpertPicks.tsx (MODIFIED - convert to carousel)
│   │   └── ... (existing components)
│   └── ui/
│       └── SearchBar.tsx (NEW)
└── data/
    ├── rackets.json (NO CHANGES)
    └── players.ts (NO CHANGES - will add imageUrl later)
```

---

## Notes
- All racket images already exist in `rackets.json` (`imageUrl` field)
- Player images will be added later (use fallback avatars initially)
- Brand logos can be added to `/public/brands/` directory
- No backend/API changes required (pure client-side filtering)
- Auto-pagination uses client-side timers (no server polling)
