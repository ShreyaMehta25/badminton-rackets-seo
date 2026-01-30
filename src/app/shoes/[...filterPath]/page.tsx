const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";
import shoesData from "@/data/shoes.json";
import { Shoe } from "@/types/shoes";
import ShoesListWithSort from "@/components/products/ShoesListWithSort";
import ShoesSidebar from "@/components/products/ShoesSidebar";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ filterPath: string[] }>;
};

// Basic filter function for shoes
function filterShoes(shoes: Shoe[], filterPath: string[]): Shoe[] {
  let filtered = [...shoes];

  // Join filter segments
  const filterString = filterPath.join("-").toLowerCase();

  // Filter by gender
  if (filterString.includes("men") && !filterString.includes("women")) {
    filtered = filtered.filter((s) => s.gender.toLowerCase() === "men");
  } else if (filterString.includes("women")) {
    filtered = filtered.filter((s) => s.gender.toLowerCase() === "women");
  }

  // Filter by brand
  const brands = ["puma", "li-ning", "yonex", "nike", "apacs"];
  for (const brand of brands) {
    if (filterString.includes(brand)) {
      filtered = filtered.filter((s) => s.brand.toLowerCase() === brand);
    }
  }

  // Filter by price ranges
  if (filterString.includes("under-2000")) {
    filtered = filtered.filter((s) => s.price < 2000);
  } else if (filterString.includes("under-3000")) {
    filtered = filtered.filter((s) => s.price < 3000);
  } else if (filterString.includes("under-5000")) {
    filtered = filtered.filter((s) => s.price < 5000);
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
    title: `Best ${titleText} Badminton Shoes`,
    description: `Explore the best ${titleText} badminton shoes with prices, ratings, and comparisons.`,
  };
}

export default async function FilteredShoesPage({ params }: Props) {
  const { filterPath } = await params;

  // Handle middleware rewrite: if first segment is "filter", remove it
  const actualFilters =
    filterPath[0] === "filter" ? filterPath.slice(1) : filterPath;

  const allShoes = shoesData as Shoe[];
  const filteredShoes = filterShoes(allShoes, actualFilters);

  // Default sort: low to high
  const sortedShoes = [...filteredShoes].sort((a, b) => a.price - b.price);

  // Generate heading
  const heading = actualFilters.length > 0
    ? `Badminton Shoes for ${actualFilters.join(" ").replace(/-/g, " ")}`
    : "Badminton Shoes";

  return (
    <main className="max-w-[1920px] mx-auto px-4 md:px-6 py-6 md:py-10">
      {/* Desktop: 2-column with sidebar | Mobile: 1-column without sidebar */}
      <div className="grid grid-cols-1 sm:grid-cols-[280px_1fr] gap-6 sm:gap-8">
        {/* Sidebar - hidden on mobile (<640px), visible on sm+ (iPad mini, tablets, desktop) */}
        <aside className="hidden sm:block">
          <ShoesSidebar />
        </aside>

        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-3 md:mb-4 text-slate-700">
            {heading}
          </h1>

          <p className="text-sm md:text-base text-slate-400 mb-6 md:mb-8">
            Showing {filteredShoes.length} shoes.
          </p>

          {filteredShoes.length === 0 ? (
            <div className="text-sm md:text-base text-slate-400">
              No shoes found for this combination.
            </div>
          ) : (
            <div className="max-w-full">
              <ShoesListWithSort shoes={filteredShoes} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
