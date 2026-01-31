"use client";

import { usePathname, useRouter } from "next/navigation";
import shuttlecockData from "@/data/shuttlecock.json";
import { Shuttlecock } from "@/types/shuttlecock";
import { useContext, useMemo, useRef } from "react";
import { SortContext } from "@/contexts/SortContext";

const normalize = (v: string) => v.toLowerCase().trim().replace(/\s+/g, "-");
const formatLabel = (v: string) =>
  v
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

// Filter function matching the page logic
function applyFilters(shuttlecocks: Shuttlecock[], filterPath: string[]): Shuttlecock[] {
  let filtered = [...shuttlecocks];
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

  // Filter by rating
  if (filterString.includes("rating-45")) {
    filtered = filtered.filter((s) => parseFloat(s.reviewscore) >= 4.5);
  } else if (filterString.includes("rating-40")) {
    filtered = filtered.filter((s) => parseFloat(s.reviewscore) >= 4.0);
  } else if (filterString.includes("rating-35")) {
    filtered = filtered.filter((s) => parseFloat(s.reviewscore) >= 3.5);
  }

  return filtered;
}

export default function ShuttlecockSidebar({ showSort = true }: { showSort?: boolean }) {
  const pathname = usePathname();
  const router = useRouter();
  const allData = shuttlecockData as Shuttlecock[];

  const sortContext = useContext(SortContext);
  const sortOrder = sortContext?.sortOrder || "low-to-high";
  const setSortOrder = sortContext?.setSortOrder || (() => {});

  // Parse active filters from URL
  const activeFilters = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);
    const idx = segments.indexOf("shuttlecock");
    if (idx === -1) return [];
    return segments
      .slice(idx + 1)
      .filter((s) => s !== "filter")
      .map((s) => decodeURIComponent(s));
  }, [pathname]);

  // Get all unique values from full dataset
  const allSpeeds = useMemo(() => {
    const speeds = [...new Set(allData
      .map((s) => {
        if (!s.speed) return null;
        const speedMatch = s.speed.match(/^([^,]+)/);
        return speedMatch ? normalize(speedMatch[1].trim()) : null;
      })
      .filter((s): s is string => s !== null)
    )];
    return speeds.sort();
  }, []);

  const allPriceRanges = ["under-500", "under-1000", "under-2000"];
  const allRatings = [
    { value: "rating-45", label: "4.5+" },
    { value: "rating-40", label: "4.0+" },
    { value: "rating-35", label: "3.5+" },
  ];

  const buildPath = (filters: string[]) =>
    filters.length ? `/shuttlecock/${filters.join("/")}` : "/shuttlecock";

  const toggleFilter = (item: string, detailsElement: HTMLDetailsElement | null) => {
    const isActive = activeFilters.includes(item);
    const newFilters = isActive
      ? activeFilters.filter((f) => f !== item)
      : [...activeFilters, item];

    // Close the accordion after selection
    if (detailsElement && !isActive) {
      setTimeout(() => {
        detailsElement.open = false;
      }, 100);
    }

    router.push(buildPath(newFilters));
  };

  const FilterChip = ({ item, detailsRef }: { item: string; detailsRef: React.RefObject<HTMLDetailsElement> }) => (
    <button
      onClick={() => toggleFilter(item, detailsRef.current)}
      className="flex items-center gap-1 md:gap-1.5 px-2 md:px-3 py-1 md:py-1.5 rounded-xl text-xs md:text-sm bg-emerald-500 text-white hover:bg-emerald-600 transition"
    >
      <span className="font-medium">{formatLabel(item)}</span>
      <span className="px-1 md:px-1.5 rounded bg-emerald-600 text-xs">✕</span>
    </button>
  );

  const FilterButton = ({ item, detailsRef }: { item: string; detailsRef: React.RefObject<HTMLDetailsElement> }) => {
    const isActive = activeFilters.includes(item);

    if (isActive) return null;

    return (
      <button
        onClick={() => toggleFilter(item, detailsRef.current)}
        className="px-2 md:px-3 py-1 md:py-1.5 rounded-xl text-xs md:text-sm transition bg-slate-100 border border-slate-300 text-slate-600 hover:bg-slate-200"
      >
        {formatLabel(item)}
      </button>
    );
  };

  const Section = ({
    title,
    items,
  }: {
    title: string;
    items: Array<{ value: string; label?: string }>;
  }) => {
    const detailsRef = useRef<HTMLDetailsElement>(null);
    const activeInSection = activeFilters.filter((f) =>
      items.some((item) => {
        const value = typeof item === "string" ? item : item.value;
        return value === f;
      }),
    );

    return (
      <details className="mb-6 lg:mb-10" ref={detailsRef}>
        <summary className="text-xs md:text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center justify-between cursor-pointer py-2">
          <div className="flex items-center gap-2">
            <span className="w-1 h-3 md:h-4 bg-slate-500 rounded-full" />
            {title}
          </div>
          <span className="transition-transform duration-200 inline-block text-xs">
            ▼
          </span>
        </summary>

        <div className="pt-2">
          {activeInSection.length > 0 && (
            <div className="flex flex-wrap gap-1.5 md:gap-2 mb-2">
              {activeInSection.map((f) => (
                <FilterChip key={f} item={f} detailsRef={detailsRef} />
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-1.5 md:gap-2">
            {items.map((item) => {
              const value = typeof item === "string" ? item : item.value;
              return <FilterButton key={value} item={value} detailsRef={detailsRef} />;
            })}
          </div>
        </div>
      </details>
    );
  };

  return (
    <div className="lg:sticky lg:top-24 max-h-none lg:max-h-[calc(100vh-8rem)] overflow-y-visible lg:overflow-y-auto lg:border-r border-slate-200 lg:pr-4">
      <style>{`
        details > summary::-webkit-details-marker { display: none; }
        details > summary { list-style: none; }
        details[open] > summary span:last-child { transform: rotate(180deg); }
      `}</style>

      {showSort && sortContext && (
        <details className="mb-6 lg:mb-10">
          <summary className="text-xs md:text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center justify-between cursor-pointer py-2">
            <div className="flex items-center gap-2">
              <span className="w-1 h-3 md:h-4 bg-slate-500 rounded-full" />
              Sort by Price
            </div>
            <span className="transition-transform duration-200 inline-block text-xs">
              ▼
            </span>
          </summary>

          <select
            value={sortOrder}
            onChange={(e) =>
              setSortOrder(e.target.value as "low-to-high" | "high-to-low")
            }
            className="w-full px-2 md:px-3 py-1.5 md:py-2 rounded-xl bg-slate-100 border border-slate-300 text-slate-600 text-xs md:text-sm mt-2"
          >
            <option value="low-to-high">Low to High</option>
            <option value="high-to-low">High to Low</option>
          </select>
        </details>
      )}

      <Section title="Speed" items={allSpeeds.map((s) => ({ value: s }))} />
      <Section title="Price Range" items={allPriceRanges.map((p) => ({ value: p }))} />
      <Section title="Rating" items={allRatings} />
    </div>
  );
}
