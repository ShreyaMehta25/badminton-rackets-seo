const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";
import shuttlecockData from "@/data/shuttlecock.json";
import { Shuttlecock } from "@/types/shuttlecock";
import ShuttlecockListWithSort from "@/components/products/ShuttlecockListWithSort";
import ShuttlecockSidebar from "@/components/products/ShuttlecockSidebar";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ filterPath: string[] }>;
};

// Basic filter function for shuttlecocks
function filterShuttlecocks(shuttlecocks: Shuttlecock[], filterPath: string[]): Shuttlecock[] {
  let filtered = [...shuttlecocks];

  // Join filter segments
  const filterString = filterPath.join("-").toLowerCase();

  // Filter by speed
  if (filterString.includes("slow")) {
    filtered = filtered.filter((s) => s.speed.toLowerCase().includes("slow"));
  } else if (filterString.includes("medium")) {
    filtered = filtered.filter((s) => s.speed.toLowerCase().includes("medium"));
  } else if (filterString.includes("fast")) {
    filtered = filtered.filter((s) => s.speed.toLowerCase().includes("fast"));
  }

  // Filter by brand (extracted from name)
  const brands = ["yonex", "li-ning", "li ning", "steffer", "impetus", "nongi", "spocco", "slovic", "acers", "arrowmax"];
  for (const brand of brands) {
    if (filterString.includes(brand.replace(" ", "-"))) {
      filtered = filtered.filter((s) => s.name.toLowerCase().includes(brand));
    }
  }

  // Filter by price ranges
  if (filterString.includes("under-500")) {
    filtered = filtered.filter((s) => s.price < 500);
  } else if (filterString.includes("under-1000")) {
    filtered = filtered.filter((s) => s.price < 1000);
  } else if (filterString.includes("under-2000")) {
    filtered = filtered.filter((s) => s.price < 2000);
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
    title: `Best ${titleText} Badminton Shuttlecocks`,
    description: `Explore the best ${titleText} badminton shuttlecocks with prices, ratings, and comparisons.`,
  };
}

export default async function FilteredShuttlecockPage({ params }: Props) {
  const { filterPath } = await params;

  // Handle middleware rewrite: if first segment is "filter", remove it
  const actualFilters =
    filterPath[0] === "filter" ? filterPath.slice(1) : filterPath;

  const allShuttlecocks = shuttlecockData as Shuttlecock[];
  const filteredShuttlecocks = filterShuttlecocks(allShuttlecocks, actualFilters);

  // Default sort: low to high
  const sortedShuttlecocks = [...filteredShuttlecocks].sort((a, b) => a.price - b.price);

  // Generate heading
  const heading = actualFilters.length > 0
    ? `Badminton Shuttlecocks for ${actualFilters.join(" ").replace(/-/g, " ")}`
    : "Badminton Shuttlecocks";

  return (
    <main className="max-w-[1920px] mx-auto px-4 md:px-6 py-6 md:py-10">
      {/* Desktop: 2-column with sidebar | Mobile: 1-column without sidebar */}
      <div className="grid grid-cols-1 sm:grid-cols-[280px_1fr] gap-6 sm:gap-8">
        {/* Sidebar - hidden on mobile (<640px), visible on sm+ (iPad mini, tablets, desktop) */}
        <aside className="hidden sm:block">
          <ShuttlecockSidebar />
        </aside>

        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-3 md:mb-4 text-slate-700">
            {heading}
          </h1>

          <p className="text-sm md:text-base text-slate-400 mb-6 md:mb-8">
            Showing {filteredShuttlecocks.length} shuttlecocks.
          </p>

          {filteredShuttlecocks.length === 0 ? (
            <div className="text-sm md:text-base text-slate-400">
              No shuttlecocks found for this combination.
            </div>
          ) : (
            <div className="max-w-full">
              <ShuttlecockListWithSort shuttlecocks={filteredShuttlecocks} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
