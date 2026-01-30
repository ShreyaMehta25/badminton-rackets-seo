// Generate a unique ID from product name
export function generateProductId(name: string, index: number): string {
  if (!name || typeof name !== "string") {
    console.warn(`Invalid name at index ${index}:`, name);
    return `product-${index}`;
  }

  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .trim();

  return `${slug}-${index}`;
}

// Add IDs to products array
export function addIdsToProducts<T extends { name: string }>(
  products: T[],
): (T & { id: string })[] {
  return products.map((product, index) => ({
    ...product,
    id: generateProductId(product.name, index),
  }));
}

// Extract brand from product name
export function extractBrandFromName(name: string): string {
  const lowerName = name.toLowerCase();

  const brands = [
    "yonex",
    "li-ning",
    "victor",
    "apacs",
    "arrowmax",
    "puma",
    "nike",
    "adidas",
    "ashaway",
    "carlton",
    "forza",
    "kawasaki",
    "nalky",
    "acers",
    "sterling",
    "hipkoo",
    "nongi",
    "funex",
    "forgesy",
    "activityy",
    "steffer",
    "mekkokart",
    "impetus",
    "yordey",
    "slovic",
    "burraq",
    "panko",
    "paul star",
    "vlnn",
    "spocco",
    "strive fit",
    "hk sport",
  ];

  for (const brand of brands) {
    if (lowerName.includes(brand)) {
      return brand
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }
  }

  // Fallback: return first word capitalized
  const firstWord = name.split(" ")[0];
  return firstWord.charAt(0).toUpperCase() + firstWord.slice(1);
}

// Parse shuttlecock price string (e.g., "₹1,115₹1,51526% off" -> 1115)
// export function parseShuttlecockPrice(priceStr: string): number {
//   if (typeof priceStr !== 'string') {
//     return typeof priceStr === 'number' ? priceStr : 0;
//   }

//   // Extract first price (current/discounted price)
//   const match = priceStr.match(/₹([\d,]+)/);
//   if (match) {
//     return parseInt(match[1].replace(/,/g, ''), 10);
//   }

//   return 0;
// }
export function parseShuttlecockPrice(
  priceStr: string | number | null | undefined,
): number {
  // If already a number, return directly
  if (typeof priceStr === "number") {
    return priceStr;
  }

  // If empty or invalid
  if (!priceStr || typeof priceStr !== "string") {
    return 0;
  }

  // Extract first price (current/discounted price)
  const match = priceStr.match(/₹\s*([\d,]+)/);

  if (match) {
    return parseInt(match[1].replace(/,/g, ""), 10);
  }

  return 0;
}
