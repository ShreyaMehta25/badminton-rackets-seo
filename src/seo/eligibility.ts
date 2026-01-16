import rackets from "@/data/rackets.json";
import { Racket } from "@/types/racket";
import { PAGE_RULES } from "@/seo/pageRules";
import { FILTER_MAPPINGS } from "@/seo/filterMappings";
import { ALLOWED_COMBINATIONS } from "@/seo/allowedCombinations";

/* -------------------------------
   TYPES
-------------------------------- */

export type ParsedFilters = {
  playerLevel?: string;
  priceSlabs?: string;
  weight?: string;
  brand?: string;
};

/* -------------------------------
   FILTER PARSING
-------------------------------- */

/**
 * Parses filterPath string and identifies filter types based on FILTER_MAPPINGS
 * Splits filterPath by "-" and matches segments against FILTER_MAPPINGS values
 */
export function parseFilters(filterPath: string): ParsedFilters {
  const parsed: ParsedFilters = {};
  const allBrands = new Set(
    (rackets as Racket[]).map((r) => r.brand.toLowerCase())
  );

  // Split filterPath by "-" to get individual segments
  const segments = filterPath.split("-").filter(Boolean);

  // Reconstruct potential filter values by joining segments
  // This handles cases like "for-beginners" which is one filter value
  const possibleFilters: string[] = [];

  // Add individual segments
  segments.forEach((seg) => possibleFilters.push(seg));

  // Add combinations of consecutive segments (for multi-word filters like "for-beginners")
  for (let i = 0; i < segments.length; i++) {
    for (let j = i + 1; j <= segments.length; j++) {
      const combined = segments.slice(i, j).join("-");
      if (combined !== segments[i]) {
        possibleFilters.push(combined);
      }
    }
  }

  // Remove duplicates and sort by length (longer matches first)
  const uniqueFilters = Array.from(new Set(possibleFilters)).sort(
    (a, b) => b.length - a.length
  );

  // Track which segments have been matched to avoid duplicate matches
  const matchedSegments = new Set<string>();

  for (const filter of uniqueFilters) {
    const normalized = decodeURIComponent(filter).toLowerCase();

    // Skip if this filter is a substring of an already matched filter
    if (
      Array.from(matchedSegments).some(
        (matched) => matched.includes(normalized) && matched !== normalized
      )
    ) {
      continue;
    }

    let matched = false;

    // Check playerLevel mappings
    if (!matched && !parsed.playerLevel) {
      for (const [key, slug] of Object.entries(FILTER_MAPPINGS.playerLevel)) {
        if (normalized === slug || normalized === key) {
          parsed.playerLevel = key;
          matched = true;
          matchedSegments.add(normalized);
          break;
        }
      }
    }

    // Check priceSlabs mappings
    if (!matched && !parsed.priceSlabs) {
      for (const [key, slug] of Object.entries(FILTER_MAPPINGS.priceSlabs)) {
        if (normalized === slug || normalized === key) {
          parsed.priceSlabs = key;
          matched = true;
          matchedSegments.add(normalized);
          break;
        }
      }
    }

    // Check weight mappings
    if (!matched && !parsed.weight) {
      for (const [key, slug] of Object.entries(FILTER_MAPPINGS.weight)) {
        if (normalized === slug || normalized === key.toLowerCase()) {
          parsed.weight = key;
          matched = true;
          matchedSegments.add(normalized);
          break;
        }
      }
    }

    // Check if it's a brand name
    if (!matched && !parsed.brand && allBrands.has(normalized)) {
      parsed.brand = normalized;
      matched = true;
      matchedSegments.add(normalized);
    }
  }

  return parsed;
}

/* -------------------------------
   FILTER VALIDATION
-------------------------------- */

/**
 * Validates if the parsed filters match any allowed combination
 * Order should NOT matter
 */
export function isAllowedCombination(filters: ParsedFilters): boolean {
  const activeFilterKeys = Object.keys(filters).filter(
    (key) => filters[key as keyof ParsedFilters] !== undefined
  );

  // Check if the active filters match any allowed combination
  return ALLOWED_COMBINATIONS.some((allowed) => {
    if (allowed.length !== activeFilterKeys.length) return false;
    // Order doesn't matter - check if all keys match
    return allowed.every((key) => activeFilterKeys.includes(key));
  });
}

/* -------------------------------
   PRODUCT FILTERING
-------------------------------- */

/**
 * Filters products based on parsed filters
 */
export function filterProductsByParsedFilters(
  parsedFilters: ParsedFilters
): Racket[] {
  return (rackets as Racket[]).filter((racket) => {
    // Check playerLevel
    if (parsedFilters.playerLevel) {
      if (
        racket.playerLevel.toLowerCase() !==
        parsedFilters.playerLevel.toLowerCase()
      ) {
        return false;
      }
    }

    // Check priceSlabs
    if (parsedFilters.priceSlabs) {
      const price = racket.price;
      const priceSlab = parsedFilters.priceSlabs;
      if (priceSlab === "under-5000" && price >= 5000) return false;
      if (priceSlab === "under-8000" && price >= 8000) return false;
      if (priceSlab === "under-15000" && price >= 15000) return false;
      if (priceSlab === "under-20000" && price >= 20000) return false;
    }

    // Check weight
    if (parsedFilters.weight) {
      if (racket.weight.toLowerCase() !== parsedFilters.weight.toLowerCase()) {
        return false;
      }
    }

    // Check brand
    if (parsedFilters.brand) {
      if (racket.brand.toLowerCase() !== parsedFilters.brand.toLowerCase()) {
        return false;
      }
    }

    return true;
  });
}

/* -------------------------------
   ELIGIBILITY CHECK (SINGLE SOURCE OF TRUTH)
-------------------------------- */

/**
 * Constructs canonical URL with fixed filter order:
 * playerLevel → priceSlabs → weight → brand
 */
export function buildCanonicalUrl(parsedFilters: ParsedFilters): string {
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

/**
 * Determines if a filter page is indexable
 * This is the SINGLE SOURCE OF TRUTH for page eligibility
 * 
 * @param filterPath - The filter path string (e.g., "for-beginners-under-5000")
 * @returns true if the page should be indexed, false otherwise
 */
export function isIndexableFilterPage(filterPath: string): boolean {
  // Parse filters from filterPath
  const parsedFilters = parseFilters(filterPath);

  // Check if combination is allowed
  if (!isAllowedCombination(parsedFilters)) {
    return false;
  }

  // Filter products using parsed filters
  const filteredRackets = filterProductsByParsedFilters(parsedFilters);

  // Check if product count meets minimum
  if (filteredRackets.length < PAGE_RULES.MIN_PRODUCTS) {
    return false;
  }

  return true;
}
