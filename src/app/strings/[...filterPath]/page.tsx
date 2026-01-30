const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";
import stringsData from "@/data/strings.json";
import { StringProduct } from "@/types/strings";
import StringsListWithSort from "@/components/products/StringsListWithSort";
import StringsSidebar from "@/components/products/StringsSidebar";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ filterPath: string[] }>;
};

// Basic filter function for strings
function filterStrings(strings: StringProduct[], filterPath: string[]): StringProduct[] {
  let filtered = [...strings];

  // Join filter segments
  const filterString = filterPath.join("-").toLowerCase();

  // Filter by brand
  const brands = ["yonex", "li-ning", "apacs", "arrowmax"];
  for (const brand of brands) {
    if (filterString.includes(brand)) {
      filtered = filtered.filter((s) => s.brand.toLowerCase() === brand);
    }
  }

  // Filter by price ranges
  if (filterString.includes("under-500")) {
    filtered = filtered.filter((s) => s.price < 500);
  } else if (filterString.includes("under-1000")) {
    filtered = filtered.filter((s) => s.price < 1000);
  } else if (filterString.includes("under-1500")) {
    filtered = filtered.filter((s) => s.price < 1500);
  }

  return filtered;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { filterPath } = await params;

  // Handle middleware rewrite: if first segment is "filter", remove it
  const actualFilters =
    filterPath[0] === "filter" ? filterPath.slice(1) : filterPath;

  const titleText = actualFilters
    .map((f) => decodeURIComponent(f))
    .join(" · ")
    .replace(/-/g, " ");

  return {
    title: `Best ${titleText} Badminton Strings`,
    description: `Explore the best ${titleText} badminton strings with prices, ratings, and comparisons.`,
  };
}

export default async function FilteredStringsPage({ params }: Props) {
  const { filterPath } = await params;

  // Handle middleware rewrite: if first segment is "filter", remove it
  const actualFilters =
    filterPath[0] === "filter" ? filterPath.slice(1) : filterPath;

  const allStrings = stringsData as StringProduct[];
  const filteredStrings = filterStrings(allStrings, actualFilters);

  // Default sort: low to high
  const sortedStrings = [...filteredStrings].sort((a, b) => a.price - b.price);

  // Generate heading
  const heading = actualFilters.length > 0
    ? `Badminton Strings for ${actualFilters.join(" ").replace(/-/g, " ")}`
    : "Badminton Strings";

  return (
    <main className="max-w-[1920px] mx-auto px-4 md:px-6 py-6 md:py-10">
      {/* Desktop: 2-column with sidebar | Mobile: 1-column without sidebar */}
      <div className="grid grid-cols-1 sm:grid-cols-[280px_1fr] gap-6 sm:gap-8">
        {/* Sidebar - hidden on mobile (<640px), visible on sm+ (iPad mini, tablets, desktop) */}
        <aside className="hidden sm:block">
          <StringsSidebar />
        </aside>

        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-3 md:mb-4 text-slate-700">
            {heading}
          </h1>

          <p className="text-sm md:text-base text-slate-400 mb-6 md:mb-8">
            Showing {filteredStrings.length} strings.
          </p>

          {filteredStrings.length === 0 ? (
            <div className="text-sm md:text-base text-slate-400">
              No strings found for this combination.
            </div>
          ) : (
            <div className="max-w-full">
              <StringsListWithSort strings={filteredStrings} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
