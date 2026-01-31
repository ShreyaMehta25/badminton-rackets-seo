"use client";

import { useRouter, usePathname } from "next/navigation";
import { useMemo, useRef, useContext } from "react";
import { SortContext } from "@/contexts/SortContext";

interface Product {
  name: string;
  brand: string;
  price: number;
  imageurl: string;
  reviewscore: number | string;
  speed?: string;
  id: string;
}

interface CategoryFilterSidebarProps {
  products: Product[];
  category: "shoes" | "strings" | "grips" | "shuttlecock";
}

const formatLabel = (v: string) =>
  v
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

const normalize = (v: string) => v.toLowerCase().trim().replace(/\s+/g, "-");

export default function CategoryFilterSidebar({
  products,
  category,
}: CategoryFilterSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const sortContext = useContext(SortContext);
  const sortOrder = sortContext?.sortOrder || "low-to-high";
  const setSortOrder = sortContext?.setSortOrder || (() => {});

  // Parse active filters from URL
  const activeFilters = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);
    const idx = segments.indexOf(category);
    if (idx === -1) return [];
    return segments
      .slice(idx + 1)
      .filter((s) => s !== "filter")
      .map((s) => decodeURIComponent(s));
  }, [pathname, category]);

  /* ---------- DATA ---------- */

  const brands = useMemo(
    () =>
      Array.from(new Set(products.map((p) => normalize(p.brand)))).sort(),
    [products],
  );

  const priceRanges = useMemo(() => {
    // Define price ranges based on category
    if (category === "shoes") {
      return [
        { label: "Under 2000", value: "under-2000" },
        { label: "Under 3000", value: "under-3000" },
        { label: "Under 5000", value: "under-5000" },
      ];
    } else if (category === "strings") {
      return [
        { label: "Under 500", value: "under-500" },
        { label: "Under 1000", value: "under-1000" },
        { label: "Under 1500", value: "under-1500" },
      ];
    } else if (category === "grips") {
      return [
        { label: "Under 200", value: "under-200" },
        { label: "Under 300", value: "under-300" },
        { label: "Under 400", value: "under-400" },
      ];
    } else if (category === "shuttlecock") {
      return [
        { label: "Under 500", value: "under-500" },
        { label: "Under 1000", value: "under-1000" },
        { label: "Under 2000", value: "under-2000" },
      ];
    }
    return [];
  }, [category]);

  const speeds = useMemo(() => {
    if (category !== "shuttlecock") return [];
    return Array.from(
      new Set(
        products
          .map((p) => p.speed?.split(",")[0]?.trim())
          .filter(Boolean) as string[],
      ),
    ).sort();
  }, [products, category]);

  const ratingOptions = [
    { value: "rating-45", label: "4.5+" },
    { value: "rating-40", label: "4.0+" },
    { value: "rating-35", label: "3.5+" },
  ];

  /* ---------- FILTER NAVIGATION ---------- */

  const buildPath = (filters: string[]) =>
    filters.length ? `/${category}/${filters.join("/")}` : `/${category}`;

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

  /* ---------- UI ---------- */

  const FilterChip = ({ item, detailsRef }: { item: string; detailsRef: React.RefObject<HTMLDetailsElement> }) => (
    <button
      onClick={() => toggleFilter(item, detailsRef.current)}
      className="flex items-center gap-1 px-2 md:px-3 py-1 md:py-1.5 rounded-xl bg-emerald-500 text-white text-xs md:text-sm"
    >
      {formatLabel(item)}
      <span className="text-xs bg-emerald-600 px-1 md:px-1.5 rounded">✕</span>
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
    values,
  }: {
    title: string;
    values: Array<{ value: string; label?: string }>;
  }) => {
    const detailsRef = useRef<HTMLDetailsElement>(null);
    const activeInSection = activeFilters.filter((f) =>
      values.some((v) => v.value === f),
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
            {values.map((v) => (
              <FilterButton key={v.value} item={v.value} detailsRef={detailsRef} />
            ))}
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

      {/* Sort by Price */}
      {sortContext && (
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

      {/* Brand */}
      {brands.length > 1 && (
        <Section title="Brand" values={brands.map((b) => ({ value: b }))} />
      )}

      {/* Gender for shoes */}
      {category === "shoes" && (
        <Section
          title="Gender"
          values={[
            { value: "men", label: "Men" },
            { value: "women", label: "Women" },
          ]}
        />
      )}

      {/* Price */}
      {priceRanges.length > 0 && (
        <Section
          title="Price Range"
          values={priceRanges.map((p) => ({ value: p.value, label: p.label }))}
        />
      )}

      {/* Rating */}
      <Section title="Rating" values={ratingOptions} />

      {/* Speed */}
      {category === "shuttlecock" && speeds.length > 0 && (
        <Section
          title="Speed"
          values={speeds.map((s) => ({ value: normalize(s), label: s }))}
        />
      )}
    </div>
  );
}
