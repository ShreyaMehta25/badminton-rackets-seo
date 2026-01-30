const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";
import gripsData from "@/data/grip.json";
import { Grip } from "@/types/grip";
import GripsListWithSort from "@/components/products/GripsListWithSort";
import GripsSidebar from "@/components/products/GripsSidebar";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ filterPath: string[] }>;
};

// Basic filter function for grips
function filterGrips(grips: Grip[], filterPath: string[]): Grip[] {
  let filtered = [...grips];

  // Join filter segments
  const filterString = filterPath.join("-").toLowerCase();

  // Filter by brand
  const brands = ["yonex", "li-ning", "arrowmax", "acers", "sterling"];
  for (const brand of brands) {
    if (filterString.includes(brand)) {
      filtered = filtered.filter((g) => g.brand.toLowerCase() === brand);
    }
  }

  // Filter by price ranges
  if (filterString.includes("under-200")) {
    filtered = filtered.filter((g) => g.price < 200);
  } else if (filterString.includes("under-300")) {
    filtered = filtered.filter((g) => g.price < 300);
  } else if (filterString.includes("under-400")) {
    filtered = filtered.filter((g) => g.price < 400);
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
    title: `Best ${titleText} Badminton Grips`,
    description: `Explore the best ${titleText} badminton grips with prices, ratings, and comparisons.`,
  };
}

export default async function FilteredGripsPage({ params }: Props) {
  const { filterPath } = await params;

  // Handle middleware rewrite: if first segment is "filter", remove it
  const actualFilters =
    filterPath[0] === "filter" ? filterPath.slice(1) : filterPath;

  const allGrips = gripsData as Grip[];
  const filteredGrips = filterGrips(allGrips, actualFilters);

  // Default sort: low to high
  const sortedGrips = [...filteredGrips].sort((a, b) => a.price - b.price);

  // Generate heading
  const heading = actualFilters.length > 0
    ? `Badminton Grips for ${actualFilters.join(" ").replace(/-/g, " ")}`
    : "Badminton Grips";

  return (
    <main className="max-w-[1920px] mx-auto px-4 md:px-6 py-6 md:py-10">
      {/* Desktop: 2-column with sidebar | Mobile: 1-column without sidebar */}
      <div className="grid grid-cols-1 sm:grid-cols-[280px_1fr] gap-6 sm:gap-8">
        {/* Sidebar - hidden on mobile (<640px), visible on sm+ (iPad mini, tablets, desktop) */}
        <aside className="hidden sm:block">
          <GripsSidebar />
        </aside>

        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-3 md:mb-4 text-slate-700">
            {heading}
          </h1>

          <p className="text-sm md:text-base text-slate-400 mb-6 md:mb-8">
            Showing {filteredGrips.length} grips.
          </p>

          {filteredGrips.length === 0 ? (
            <div className="text-sm md:text-base text-slate-400">
              No grips found for this combination.
            </div>
          ) : (
            <div className="max-w-full">
              <GripsListWithSort grips={filteredGrips} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
