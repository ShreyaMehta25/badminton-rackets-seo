const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";
import rackets from "@/data/rackets.json";
import Script from "next/script";
import { Racket } from "@/types/racket";
import ComparisonTable from "@/components/rackets/ComparisonTable";
import RacketComparisonTable from "@/components/rackets/RacketComparisonTable";
import RacketListWithSort from "@/components/rackets/RacketListWithSort";
import RacketSidebar from "@/components/rackets/RacketSidebar";
import type { Metadata } from "next";
import { PAGE_RULES } from "@/seo/pageRules";
import { FILTER_MAPPINGS } from "@/seo/filterMappings";
import { ALLOWED_COMBINATIONS } from "@/seo/allowedCombinations";
import {
  parseFilters,
  isAllowedCombination,
  filterProductsByParsedFilters,
  isIndexableFilterPage,
  buildCanonicalUrl,
  type ParsedFilters,
} from "@/seo/eligibility";
import Link from "next/link";

const matchesRating = (filter: string, rating: number) => {
  if (!filter.startsWith("rating-")) return false;

  const value = Number(filter.replace("rating-", "")) / 10;
  return rating >= value;
};

/* -------------------------------
   SEO FILTER PARSING & VALIDATION
-------------------------------- */

/* -------------------------------
   INTERNAL LINKING CONFIGURATION
-------------------------------- */

// Get unique brands from dataset
const getAllBrands = (): string[] => {
  const brands = new Set<string>();
  (rackets as Racket[]).forEach((racket) => {
    brands.add(racket.brand.toLowerCase());
  });
  return Array.from(brands).sort();
};

// Define linkable filter options
const LINKABLE_FILTERS = {
  playerLevel: ["beginner", "intermediate", "advanced"],
  priceSlabs: ["under-5000", "under-8000", "under-15000", "under-20000"],
  weight: ["3U", "4U", "5U"],
  brand: getAllBrands(),
  playStyles: ["speed", "control", "power"],
};

/* -------------------------------
   SEO METADATA GENERATION HELPERS
-------------------------------- */

/**
 * Converts filter values to human-readable labels
 */
function getHumanReadableLabel(
  filterType: keyof ParsedFilters,
  value: string,
): string {
  switch (filterType) {
    case "playerLevel":
      if (value === "beginner") return "Beginners";
      if (value === "intermediate") return "Intermediate Players";
      if (value === "advanced") return "Advanced Players";
      return value.charAt(0).toUpperCase() + value.slice(1);

    case "priceSlabs":
      if (value === "under-5000") return "Under ₹5000";
      if (value === "under-8000") return "Under ₹8000";
      if (value === "under-15000") return "Under ₹15000";
      if (value === "under-20000") return "Under ₹20000";
      return value;

    case "weight":
      if (value === "3U") return "3U Heavyweight";
      if (value === "4U") return "4U Lightweight";
      if (value === "5U") return "5U Ultra-Lightweight";
      return value;

    case "brand":
      // Capitalize brand name (e.g., "yonex" -> "Yonex")
      return value.charAt(0).toUpperCase() + value.slice(1);

    default:
      return value;
  }
}

/**
 * Gets all active filter labels in a readable format
 */
function getActiveFilterLabels(parsedFilters: ParsedFilters): string[] {
  const labels: string[] = [];

  // Fixed order: playerLevel → priceSlabs → weight → brand
  if (parsedFilters.playerLevel) {
    labels.push(
      getHumanReadableLabel("playerLevel", parsedFilters.playerLevel),
    );
  }

  if (parsedFilters.priceSlabs) {
    labels.push(getHumanReadableLabel("priceSlabs", parsedFilters.priceSlabs));
  }

  if (parsedFilters.weight) {
    labels.push(getHumanReadableLabel("weight", parsedFilters.weight));
  }

  if (parsedFilters.brand) {
    labels.push(getHumanReadableLabel("brand", parsedFilters.brand));
  }

  return labels;
}

/**
 * Generates SEO title based on active filters
 */
function generateSEOTitle(parsedFilters: ParsedFilters): string {
  const filterLabels = getActiveFilterLabels(parsedFilters);

  if (filterLabels.length === 0) {
    return "Best Badminton Rackets (2026)";
  }

  if (filterLabels.length === 1) {
    return `Best Badminton Rackets for ${filterLabels[0]} (2026)`;
  }

  // 2 or more filters
  return `Best Badminton Rackets for ${filterLabels.join(" ")} (2026)`;
}

/**
 * Generates SEO meta description
 */
function generateSEODescription(parsedFilters: ParsedFilters): string {
  const filterLabels = getActiveFilterLabels(parsedFilters);

  if (filterLabels.length === 0) {
    return "Explore the best badminton rackets in India. Compare weight, balance, reviews, and prices to find the perfect racket for your playing style.";
  }

  const filterText = filterLabels.join(", ").toLowerCase();

  return `Explore the best badminton rackets for ${filterText} in India. Compare weight, balance, reviews, and prices to find the perfect racket for your playing style.`;
}

/* -------------------------------
   SCHEMA GENERATION
-------------------------------- */

/**
 * Generates consolidated schema for indexable pages
 * Returns null if page is not indexable
 */
function generateConsolidatedSchema(
  parsedFilters: ParsedFilters,
  rackets: Racket[],
  canonicalPath: string,
  pageTitle: string,
  pageDescription: string,
): object | null {
  if (rackets.length < PAGE_RULES.MIN_PRODUCTS) {
    return null;
  }

  if (!isAllowedCombination(parsedFilters)) {
    return null;
  }

  // Build breadcrumb using canonical path
  const canonicalSegments = canonicalPath.split("-").filter(Boolean);
  const breadcrumbItems = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Rackets",
      item: `${SITE_URL}/rackets`,
    },
  ];

  // Add filter segments to breadcrumb
  let currentPath = "";
  canonicalSegments.forEach((segment, index) => {
    currentPath += (currentPath ? "-" : "") + segment;
    breadcrumbItems.push({
      "@type": "ListItem",
      position: index + 3,
      name: decodeURIComponent(segment).replace(/-/g, " "),
      item: `${SITE_URL}/rackets/${currentPath}`,
    });
  });

  // Build ItemList with Product objects
  const itemListElements = rackets.map((racket, index) => {
    const product: any = {
      "@type": "Product",
      name: racket.name,
      image: racket.imageUrl,
      brand: {
        "@type": "Brand",
        name: racket.brand,
      },
      offers: {
        "@type": "Offer",
        priceCurrency: "INR",
        price: racket.price,
        availability: "https://schema.org/InStock",
        url: racket.affiliateUrl,
      },
    };

    // Only add aggregateRating if rating exists
    if (racket.reviewScore && racket.reviewScore > 0) {
      product.aggregateRating = {
        "@type": "AggregateRating",
        ratingValue: racket.reviewScore,
        reviewCount: Math.floor(racket.reviewScore * 20),
        bestRating: "5",
        worstRating: "1",
      };
    }

    return {
      "@type": "ListItem",
      position: index + 1,
      item: product,
    };
  });

  // Consolidated schema: CollectionPage with embedded ItemList and BreadcrumbList
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: pageTitle,
        description: pageDescription,
        url: `${SITE_URL}/rackets/${canonicalPath}`,
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: rackets.length,
          itemListElement: itemListElements,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbItems,
      },
    ],
  };
}

/* -------------------------------
   INTERNAL LINKING LOGIC
-------------------------------- */

type InternalLink = {
  url: string;
  label: string;
};

/**
 * Validates if a filter combination is indexable
 * Uses shared eligibility module for consistency
 */
function isIndexableLink(parsedFilters: ParsedFilters): boolean {
  const canonicalPath = buildCanonicalUrl(parsedFilters);
  return isIndexableFilterPage(canonicalPath);
}

/**
 * Builds URL path from parsed filters
 */
function buildFilterUrl(parsedFilters: ParsedFilters): string {
  const urlParts: string[] = [];

  // Fixed order: playerLevel → priceSlabs → weight → brand
  if (parsedFilters.playerLevel) {
    const slug =
      FILTER_MAPPINGS.playerLevel[
        parsedFilters.playerLevel as keyof typeof FILTER_MAPPINGS.playerLevel
      ];
    urlParts.push(slug);
  }

  if (parsedFilters.priceSlabs) {
    const slug =
      FILTER_MAPPINGS.priceSlabs[
        parsedFilters.priceSlabs as keyof typeof FILTER_MAPPINGS.priceSlabs
      ];
    urlParts.push(slug);
  }

  if (parsedFilters.weight) {
    const slug =
      FILTER_MAPPINGS.weight[
        parsedFilters.weight as keyof typeof FILTER_MAPPINGS.weight
      ];
    urlParts.push(slug);
  }

  if (parsedFilters.brand) {
    urlParts.push(parsedFilters.brand);
  }

  return urlParts.join("-");
}

/**
 * Generates SEO-friendly link label from parsed filters
 */
function getLinkLabel(parsedFilters: ParsedFilters): string {
  const filterLabels = getActiveFilterLabels(parsedFilters);

  if (filterLabels.length === 0) {
    return "Badminton Rackets";
  }

  // Format: "Badminton Rackets for {filters}"
  if (filterLabels.length === 1) {
    return `Badminton Rackets for ${filterLabels[0]}`;
  }

  return `Badminton Rackets for ${filterLabels.join(" ")}`;
}

/**
 * Generates internal links based on current filters
 */
function generateInternalLinks(
  currentFilters: ParsedFilters,
  currentPageUrl?: string,
): InternalLink[] {
  const links: InternalLink[] = [];
  const currentFilterKeys = Object.keys(currentFilters).filter(
    (key) => currentFilters[key as keyof ParsedFilters] !== undefined,
  );
  const currentFilterCount = currentFilterKeys.length;
  const currentUrl = currentPageUrl || buildFilterUrl(currentFilters);

  // Strategy 1: Remove one filter (if current has 2 filters)
  if (currentFilterCount === 2) {
    for (const key of currentFilterKeys) {
      const newFilters: ParsedFilters = { ...currentFilters };
      delete newFilters[key as keyof ParsedFilters];

      if (isIndexableLink(newFilters)) {
        const url = buildFilterUrl(newFilters);
        // Skip if this is the current page
        if (url === currentUrl) continue;
        const label = getLinkLabel(newFilters);
        links.push({ url: `/rackets/${url}`, label });
      }
    }
  }

  // Strategy 2: Add one filter (if current has 1 filter and total would be <= 2)
  if (currentFilterCount === 1) {
    const currentKey = currentFilterKeys[0] as keyof ParsedFilters;

    // Try adding each possible filter type
    for (const [filterType, values] of Object.entries(LINKABLE_FILTERS)) {
      // Skip if this filter type is already present
      if (filterType === currentKey) continue;

      // Skip if adding this would exceed MAX_FILTERS
      if (currentFilterCount + 1 > PAGE_RULES.MAX_FILTERS) continue;

      // Try each value for this filter type
      for (const value of values) {
        const newFilters: ParsedFilters = {
          ...currentFilters,
          [filterType]: value,
        };

        // Check if this combination is allowed
        if (isIndexableLink(newFilters)) {
          const url = buildFilterUrl(newFilters);
          // Skip if this is the current page
          if (url === currentUrl) continue;
          const label = getLinkLabel(newFilters);
          links.push({ url: `/rackets/${url}`, label });
        }
      }
    }
  }

  // Strategy 3: Single filter pages (no filters currently)
  if (currentFilterCount === 0) {
    // Generate links for each single filter option
    for (const [filterType, values] of Object.entries(LINKABLE_FILTERS)) {
      for (const value of values) {
        const newFilters: ParsedFilters = {
          [filterType]: value,
        };

        if (isIndexableLink(newFilters)) {
          const url = buildFilterUrl(newFilters);
          const label = getLinkLabel(newFilters);
          links.push({ url: `/rackets/${url}`, label });
        }
      }
    }
  }

  // Remove duplicates and limit to 8
  const uniqueLinks = Array.from(
    new Map(links.map((link) => [link.url, link])).values(),
  ).slice(0, 8);

  return uniqueLinks;
}

type Props = {
  params: Promise<{ filterPath: string[] }>;
};

/* -------------------------------
   SEO METADATA
-------------------------------- */
// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const { filterPath } = await params;

//   const titleText = filterPath
//     .map((f) => decodeURIComponent(f))
//     .join(" · ")
//     .replace(/-/g, " ");

//   return {
//     title: `Best ${titleText} Badminton Rackets`,
//     description: `Explore the best ${titleText} badminton rackets with prices, ratings, and comparisons.`,
//   };
// }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { filterPath } = await params;

  // Handle middleware rewrite: if first segment is "filter", remove it
  const actualFilters =
    filterPath[0] === "filter" ? filterPath.slice(1) : filterPath;

  // 1. Parse filters from params.filterPath
  // Process each segment individually first (they're already separated in URL)
  // Then also try parsing the joined string as fallback
  const parsedFilters: ParsedFilters = {};

  // Process each URL segment individually
  for (const segment of actualFilters) {
    const decoded = decodeURIComponent(segment);
    const segmentParsed = parseFilters(decoded);
    // Merge results (later segments override earlier ones if same filter type)
    if (segmentParsed.playerLevel)
      parsedFilters.playerLevel = segmentParsed.playerLevel;
    if (segmentParsed.priceSlabs)
      parsedFilters.priceSlabs = segmentParsed.priceSlabs;
    if (segmentParsed.weight) parsedFilters.weight = segmentParsed.weight;
    if (segmentParsed.brand) parsedFilters.brand = segmentParsed.brand;
  }

  // Also try parsing the joined string to catch any filters that span segments
  const filterPathString = actualFilters.join("-");
  const joinedParsed = parseFilters(filterPathString);
  // Merge joined results (only if not already set)
  if (joinedParsed.playerLevel && !parsedFilters.playerLevel)
    parsedFilters.playerLevel = joinedParsed.playerLevel;
  if (joinedParsed.priceSlabs && !parsedFilters.priceSlabs)
    parsedFilters.priceSlabs = joinedParsed.priceSlabs;
  if (joinedParsed.weight && !parsedFilters.weight)
    parsedFilters.weight = joinedParsed.weight;
  if (joinedParsed.brand && !parsedFilters.brand)
    parsedFilters.brand = joinedParsed.brand;

  // 2. Check eligibility using shared eligibility module (SINGLE SOURCE OF TRUTH)
  const filterPathForEligibility =
    buildCanonicalUrl(parsedFilters) || filterPathString;
  const shouldIndex = isIndexableFilterPage(filterPathForEligibility);

  // 3. Filter products from dataset using parsed filters (for display)
  const filteredRackets = filterProductsByParsedFilters(parsedFilters);

  // Generate dynamic SEO title and description
  // (Generated even for NOINDEX pages for consistency)
  const title = generateSEOTitle(parsedFilters);
  const description = generateSEODescription(parsedFilters);

  // 5. Construct canonical URL with fixed order (only if indexable)
  const canonicalPath = shouldIndex
    ? buildCanonicalUrl(parsedFilters)
    : filterPath.join("/");
  const canonicalUrl = `${SITE_URL}/rackets/${canonicalPath}`;
  const pageUrl = `/rackets/${filterPath.join("/")}`;

  const ogImage =
    filteredRackets.length > 0 ? filteredRackets[0].imageUrl : undefined;

  // Get filter labels for alt text and keywords
  const filterLabels = getActiveFilterLabels(parsedFilters);
  const filterText =
    filterLabels.length > 0
      ? filterLabels.join(" ").toLowerCase()
      : "badminton rackets";

  return {
    title,
    description,
    keywords: [
      filterText,
      "badminton rackets",
      "badminton racquets",
      `${filterText} badminton rackets`,
      "badminton racket comparison",
      "badminton racket reviews",
    ],
    robots: shouldIndex
      ? { index: true, follow: true }
      : { index: false, follow: true },
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: "Badminton Rackets Directory",
      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: `${filterText} badminton rackets`,
            },
          ]
        : [],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : [],
    },
  };
}

/* -------------------------------
   PAGE RENDER
-------------------------------- */
export default async function FilteredRacketsPage({ params }: Props) {
  const { filterPath } = await params;

  // Handle middleware rewrite: if first segment is "filter", remove it
  const actualFilters =
    filterPath[0] === "filter" ? filterPath.slice(1) : filterPath;

  // 1. Parse filters from params.filterPath
  // Process each segment individually first (they're already separated in URL)
  // Then also try parsing the joined string as fallback
  const parsedFilters: ParsedFilters = {};

  // Process each URL segment individually
  for (const segment of actualFilters) {
    const decoded = decodeURIComponent(segment);
    const segmentParsed = parseFilters(decoded);
    // Merge results (later segments override earlier ones if same filter type)
    if (segmentParsed.playerLevel)
      parsedFilters.playerLevel = segmentParsed.playerLevel;
    if (segmentParsed.priceSlabs)
      parsedFilters.priceSlabs = segmentParsed.priceSlabs;
    if (segmentParsed.weight) parsedFilters.weight = segmentParsed.weight;
    if (segmentParsed.brand) parsedFilters.brand = segmentParsed.brand;
  }

  // Also try parsing the joined string to catch any filters that span segments
  const filterPathString = actualFilters.join("-");
  const joinedParsed = parseFilters(filterPathString);
  // Merge joined results (only if not already set)
  if (joinedParsed.playerLevel && !parsedFilters.playerLevel)
    parsedFilters.playerLevel = joinedParsed.playerLevel;
  if (joinedParsed.priceSlabs && !parsedFilters.priceSlabs)
    parsedFilters.priceSlabs = joinedParsed.priceSlabs;
  if (joinedParsed.weight && !parsedFilters.weight)
    parsedFilters.weight = joinedParsed.weight;
  if (joinedParsed.brand && !parsedFilters.brand)
    parsedFilters.brand = joinedParsed.brand;

  // 2. Check eligibility using shared eligibility module (SINGLE SOURCE OF TRUTH)
  const filterPathForEligibility =
    buildCanonicalUrl(parsedFilters) || filterPathString;
  const shouldIndex = isIndexableFilterPage(filterPathForEligibility);

  // 3. Filter products from dataset using parsed filters (for display)
  const filteredRackets = filterProductsByParsedFilters(parsedFilters);

  // Default sort: low to high (will be handled by client component)
  const sortedRackets = [...filteredRackets].sort((a, b) => a.price - b.price);

  // Generate heading: "Badminton Rackets for [filter labels]"
  const filterLabels = getActiveFilterLabels(parsedFilters);
  const heading =
    filterLabels.length > 0
      ? `Badminton Rackets for ${filterLabels.join(" ")}`
      : "Badminton Rackets";

  // Build canonical URL for breadcrumb
  const canonicalPath = shouldIndex
    ? buildCanonicalUrl(parsedFilters)
    : filterPath.join("/");

  // Generate schema only for indexable pages
  const pageTitle = generateSEOTitle(parsedFilters);
  const pageDescription = generateSEODescription(parsedFilters);
  const schema = shouldIndex
    ? generateConsolidatedSchema(
        parsedFilters,
        sortedRackets,
        canonicalPath,
        pageTitle,
        pageDescription,
      )
    : null;

  return (
    <main className="w-full px-4 md:px-6 py-6 md:py-10">
      {/* Consolidated schema - only for indexable pages */}
      {schema && (
        <Script
          id="consolidated-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      )}

      {/* Desktop: 2-column with sidebar | Mobile: 1-column without sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-8">
        {/* Sidebar - hidden on mobile, visible on lg+ */}
        <aside className="hidden lg:block">
          <RacketSidebar />
        </aside>

        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-3 md:mb-4 text-slate-700">
            {heading}
          </h1>

          <p className="text-sm md:text-base text-slate-400 mb-6 md:mb-8">
            Showing {filteredRackets.length} rackets.
          </p>

          {filteredRackets.length === 0 ? (
            <div className="text-sm md:text-base text-slate-400">
              No rackets found for this combination.
            </div>
          ) : (
            <div className="max-w-full">
              <RacketListWithSort rackets={filteredRackets} />
            </div>
          )}

          {/* Internal Links Section */}
          {(() => {
            const currentPageUrl = buildFilterUrl(parsedFilters);
            const internalLinks = generateInternalLinks(
              parsedFilters,
              currentPageUrl,
            );

            if (internalLinks.length >= 3) {
              return (
                <section className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-slate-200">
                  <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-slate-700">
                    Related Badminton Racket Categories
                  </h2>
                  <ul className="flex flex-wrap gap-2 md:gap-3">
                    {internalLinks.map((link) => (
                      <li key={link.url}>
                        <Link
                          href={link.url}
                          className="text-sm md:text-base text-blue-600 hover:text-blue-800 underline"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            }
            return null;
          })()}
        </div>
      </div>
    </main>
  );
}
