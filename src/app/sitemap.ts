import { MetadataRoute } from "next";
import { FILTER_MAPPINGS } from "@/seo/filterMappings";
import { ALLOWED_COMBINATIONS } from "@/seo/allowedCombinations";
import {
  isIndexableFilterPage,
  type ParsedFilters,
} from "@/seo/eligibility";
import rackets from "@/data/rackets.json";
import { Racket } from "@/types/racket";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";

/* -------------------------------
   UTILITIES
-------------------------------- */

/**
 * Get unique brands from dataset
 */
function getAllBrands(): string[] {
  const brands = new Set<string>();
  (rackets as Racket[]).forEach((racket) => {
    brands.add(racket.brand.toLowerCase());
  });
  return Array.from(brands).sort();
}

/**
 * Constructs canonical URL with fixed filter order:
 * playerLevel → priceSlabs → weight → brand
 */
function buildCanonicalUrlFromFilters(parsedFilters: ParsedFilters): string {
  const canonicalParts: string[] = [];

  // Fixed order: playerLevel → priceSlabs → weight → brand
  if (parsedFilters.playerLevel) {
    const slug =
      FILTER_MAPPINGS.playerLevel[
        parsedFilters.playerLevel as keyof typeof FILTER_MAPPINGS.playerLevel
      ];
    canonicalParts.push(slug);
  }

  if (parsedFilters.priceSlabs) {
    const slug =
      FILTER_MAPPINGS.priceSlabs[
        parsedFilters.priceSlabs as keyof typeof FILTER_MAPPINGS.priceSlabs
      ];
    canonicalParts.push(slug);
  }

  if (parsedFilters.weight) {
    const slug =
      FILTER_MAPPINGS.weight[
        parsedFilters.weight as keyof typeof FILTER_MAPPINGS.weight
      ];
    canonicalParts.push(slug);
  }

  if (parsedFilters.brand) {
    canonicalParts.push(parsedFilters.brand);
  }

  return canonicalParts.join("-");
}

/* -------------------------------
   FILTER COMBINATION GENERATION
-------------------------------- */

/**
 * Generates all valid filter combinations based on ALLOWED_COMBINATIONS
 */
function generateFilterCombinations(): ParsedFilters[] {
  const combinations: ParsedFilters[] = [];
  const allBrands = getAllBrands();

  // Get all possible filter values
  const filterValues = {
    playerLevel: Object.keys(FILTER_MAPPINGS.playerLevel),
    priceSlabs: Object.keys(FILTER_MAPPINGS.priceSlabs),
    weight: Object.keys(FILTER_MAPPINGS.weight),
    brand: allBrands,
  };

  // Generate combinations for each allowed combination pattern
  for (const allowedPattern of ALLOWED_COMBINATIONS) {
    if (allowedPattern.length === 1) {
      // Single filter combinations
      const filterType = allowedPattern[0] as keyof typeof filterValues;
      const values = filterValues[filterType];

      for (const value of values) {
        const parsedFilters: ParsedFilters = {
          [filterType]: value,
        };
        combinations.push(parsedFilters);
      }
    } else if (allowedPattern.length === 2) {
      // Two filter combinations
      const [firstType, secondType] = allowedPattern as [
        keyof typeof filterValues,
        keyof typeof filterValues
      ];
      const firstValues = filterValues[firstType];
      const secondValues = filterValues[secondType];

      // Generate all permutations
      for (const firstValue of firstValues) {
        for (const secondValue of secondValues) {
          const parsedFilters: ParsedFilters = {
            [firstType]: firstValue,
            [secondType]: secondValue,
          };
          combinations.push(parsedFilters);
        }
      }
    }
  }

  return combinations;
}

/* -------------------------------
   SITEMAP GENERATION
-------------------------------- */

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = [];
  const now = new Date();

  // Add core pages
  sitemapEntries.push({
    url: SITE_URL,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 1.0,
  });

  sitemapEntries.push({
    url: `${SITE_URL}/rackets`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  });

  // Generate all filter combinations
  const filterCombinations = generateFilterCombinations();

  // Process each combination
  for (const parsedFilters of filterCombinations) {
    // Build canonical URL first
    const canonicalPath = buildCanonicalUrlFromFilters(parsedFilters);
    
    // Check eligibility using shared eligibility module (SINGLE SOURCE OF TRUTH)
    // This ensures sitemap and page logic are perfectly aligned
    if (!isIndexableFilterPage(canonicalPath)) {
      continue;
    }

    const fullUrl = `${SITE_URL}/rackets/${canonicalPath}`;

    // Count active filters for priority
    const activeFilterCount = Object.keys(parsedFilters).filter(
      (key) => parsedFilters[key as keyof ParsedFilters] !== undefined
    ).length;

    // Determine priority based on filter count
    const priority = activeFilterCount === 1 ? 0.9 : 0.8;

    sitemapEntries.push({
      url: fullUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority,
    });
  }

  return sitemapEntries;
}
