"use client";

// import { usePathname, useRouter } from "next/navigation";
// import shoesData from "@/data/shoes.json";
// import { Shoe } from "@/types/shoes";
// import { useContext, useMemo } from "react";
// import { SortContext } from "@/contexts/SortContext";

// const normalize = (v: string) => v.toLowerCase().trim().replace(/\s+/g, "-");
// const formatLabel = (v: string) =>
//   v
//     .split("-")
//     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//     .join(" ");

// // Filter function matching the page logic
// function applyFilters(shoes: Shoe[], filterPath: string[]): Shoe[] {
//   let filtered = [...shoes];
//   const filterString = filterPath.join("-").toLowerCase();

//   // Filter by gender
//   if (filterString.includes("men") && !filterString.includes("women")) {
//     filtered = filtered.filter((s) => s.gender.toLowerCase() === "men");
//   } else if (filterString.includes("women")) {
//     filtered = filtered.filter((s) => s.gender.toLowerCase() === "women");
//   }

//   // Filter by brand
//   const brands = ["puma", "li-ning", "yonex", "nike", "apacs"];
//   for (const brand of brands) {
//     if (filterString.includes(brand)) {
//       filtered = filtered.filter((s) => s.brand.toLowerCase() === brand);
//     }
//   }

//   // Filter by price ranges
//   if (filterString.includes("under-2000")) {
//     filtered = filtered.filter((s) => s.price < 2000);
//   } else if (filterString.includes("under-3000")) {
//     filtered = filtered.filter((s) => s.price < 3000);
//   } else if (filterString.includes("under-5000")) {
//     filtered = filtered.filter((s) => s.price < 5000);
//   }

//   // Filter by rating
//   if (filterString.includes("rating-45")) {
//     filtered = filtered.filter((s) => parseFloat(s.reviewscore) >= 4.5);
//   } else if (filterString.includes("rating-40")) {
//     filtered = filtered.filter((s) => parseFloat(s.reviewscore) >= 4.0);
//   } else if (filterString.includes("rating-35")) {
//     filtered = filtered.filter((s) => parseFloat(s.reviewscore) >= 3.5);
//   }

//   return filtered;
// }

// export default function ShoesSidebar({ showSort = true }: { showSort?: boolean }) {
//   const pathname = usePathname();
//   const router = useRouter();
//   const allData = shoesData as Shoe[];

//   const sortContext = useContext(SortContext);
//   const sortOrder = sortContext?.sortOrder || "low-to-high";
//   const setSortOrder = sortContext?.setSortOrder || (() => {});

//   // Parse active filters from URL
//   const activeFilters = useMemo(() => {
//     const segments = pathname.split("/").filter(Boolean);
//     const idx = segments.indexOf("shoes");
//     if (idx === -1) return [];
//     return segments.slice(idx + 1).map((s) => decodeURIComponent(s));
//   }, [pathname]);

//   // Get all unique values from full dataset
//   const allBrands = useMemo(() => [...new Set(allData.map((s) => normalize(s.brand)))].sort(), []);
//   const allGenders = useMemo(() => [...new Set(allData.map((s) => normalize(s.gender)))].sort(), []);
//   const allPriceRanges = ["under-2000", "under-3000", "under-5000"];
//   const allRatings = [
//     { value: "rating-45", label: "4.5+" },
//     { value: "rating-40", label: "4.0+" },
//     { value: "rating-35", label: "3.5+" },
//   ];

//   // Helper to check if adding a filter would return results
//   const hasResults = (filterToAdd: string) => {
//     const testFilters = activeFilters.includes(filterToAdd)
//       ? activeFilters
//       : [...activeFilters, filterToAdd];
//     return applyFilters(allData, testFilters).length > 0;
//   };

//   const buildPath = (filters: string[]) =>
//     filters.length ? `/shoes/${filters.join("/")}` : "/shoes";

//   const handleFilterClick = (item: string) => {
//     const isActive = activeFilters.includes(item);
//     const newFilters = isActive
//       ? activeFilters.filter((f) => f !== item)
//       : [...activeFilters, item];
//     router.push(buildPath(newFilters));
//   };

//   const FilterButton = ({ item, disabled = false }: { item: string; disabled?: boolean }) => {
//     const isActive = activeFilters.includes(item);

//     if (isActive) {
//       return (
//         <button
//           onClick={() => handleFilterClick(item)}
//           className="flex items-center gap-1 md:gap-1.5 px-2 md:px-3 py-1 md:py-1.5 rounded-xl text-xs md:text-sm bg-emerald-500 text-white hover:bg-emerald-600 transition"
//         >
//           <span className="font-medium">{formatLabel(item)}</span>
//           <span className="px-1 md:px-1.5 rounded bg-emerald-600 text-xs">✕</span>
//         </button>
//       );
//     }

//     return (
//       <button
//         onClick={() => !disabled && handleFilterClick(item)}
//         disabled={disabled}
//         className={`px-2 md:px-3 py-1 md:py-1.5 rounded-xl text-xs md:text-sm transition ${
//           disabled
//             ? "bg-slate-50 border border-slate-200 text-slate-300 cursor-not-allowed"
//             : "bg-slate-100 border border-slate-300 text-slate-600 hover:bg-slate-200"
//         }`}
//       >
//         {formatLabel(item)}
//       </button>
//     );
//   };

//   const Section = ({
//     title,
//     items,
//   }: {
//     title: string;
//     items: Array<{ value: string; label?: string }>;
//   }) => (
//     <details className="mb-6 lg:mb-10" open>
//       <summary className="text-xs md:text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center justify-between cursor-pointer py-2">
//         <div className="flex items-center gap-2">
//           <span className="w-1 h-3 md:h-4 bg-slate-500 rounded-full" />
//           {title}
//         </div>
//         <span className="transition-transform duration-200 inline-block text-xs">
//           ▼
//         </span>
//       </summary>

//       <div className="flex flex-wrap gap-1.5 md:gap-2 pt-2">
//         {items.map((item) => {
//           const value = typeof item === "string" ? item : item.value;
//           const label = typeof item === "string" ? formatLabel(item) : item.label || formatLabel(item.value);
//           const disabled = !hasResults(value);

//           return (
//             <FilterButton key={value} item={value} disabled={disabled} />
//           );
//         })}
//       </div>
//     </details>
//   );

//   return (
//     <div className="lg:sticky lg:top-24 max-h-none lg:max-h-[calc(100vh-8rem)] overflow-y-visible lg:overflow-y-auto lg:border-r border-slate-200 lg:pr-4">
//       <style>{`
//         details > summary::-webkit-details-marker { display: none; }
//         details > summary { list-style: none; }
//         details[open] > summary span:last-child { transform: rotate(180deg); }
//       `}</style>

//       {showSort && sortContext && (
//         <details className="mb-6 lg:mb-10" open>
//           <summary className="text-xs md:text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center justify-between cursor-pointer py-2">
//             <div className="flex items-center gap-2">
//               <span className="w-1 h-3 md:h-4 bg-slate-500 rounded-full" />
//               Sort by Price
//             </div>
//             <span className="transition-transform duration-200 inline-block text-xs">
//               ▼
//             </span>
//           </summary>

//           <select
//             value={sortOrder}
//             onChange={(e) =>
//               setSortOrder(e.target.value as "low-to-high" | "high-to-low")
//             }
//             className="w-full px-2 md:px-3 py-1.5 md:py-2 rounded-xl bg-slate-100 border border-slate-300 text-slate-600 text-xs md:text-sm mt-2"
//           >
//             <option value="low-to-high">Low to High</option>
//             <option value="high-to-low">High to Low</option>
//           </select>
//         </details>
//       )}

//       <Section title="Brand" items={allBrands.map((b) => ({ value: b }))} />
//       <Section title="Gender" items={allGenders.map((g) => ({ value: g }))} />
//       <Section title="Price Range" items={allPriceRanges.map((p) => ({ value: p }))} />
//       <Section title="Rating" items={allRatings} />
//     </div>
//   );
// }

import { usePathname, useRouter } from "next/navigation";
import shoesData from "@/data/shoes.json";
import { Shoe } from "@/types/shoes";
import { useContext, useMemo, useState } from "react";
import { SortContext } from "@/contexts/SortContext";

const normalize = (v: string) => v.toLowerCase().trim().replace(/\s+/g, "-");
const formatLabel = (v: string) =>
  v
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

function applyFilters(shoes: Shoe[], filterPath: string[]): Shoe[] {
  let filtered = [...shoes];
  const filterString = filterPath.join("-").toLowerCase();

  if (filterString.includes("men") && !filterString.includes("women")) {
    filtered = filtered.filter((s) => s.gender.toLowerCase() === "men");
  } else if (filterString.includes("women")) {
    filtered = filtered.filter((s) => s.gender.toLowerCase() === "women");
  }

  const brands = ["puma", "li-ning", "yonex", "nike", "apacs"];
  for (const brand of brands) {
    if (filterString.includes(brand)) {
      filtered = filtered.filter((s) => s.brand.toLowerCase() === brand);
    }
  }

  if (filterString.includes("under-2000")) {
    filtered = filtered.filter((s) => s.price < 2000);
  } else if (filterString.includes("under-3000")) {
    filtered = filtered.filter((s) => s.price < 3000);
  } else if (filterString.includes("under-5000")) {
    filtered = filtered.filter((s) => s.price < 5000);
  }

  if (filterString.includes("rating-45")) {
    filtered = filtered.filter((s) => parseFloat(s.reviewscore) >= 4.5);
  } else if (filterString.includes("rating-40")) {
    filtered = filtered.filter((s) => parseFloat(s.reviewscore) >= 4.0);
  } else if (filterString.includes("rating-35")) {
    filtered = filtered.filter((s) => parseFloat(s.reviewscore) >= 3.5);
  }

  return filtered;
}

export default function ShoesSidebar({
  showSort = true,
}: {
  showSort?: boolean;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const allData = shoesData as Shoe[];

  const sortContext = useContext(SortContext);
  const sortOrder = sortContext?.sortOrder || "low-to-high";
  const setSortOrder = sortContext?.setSortOrder || (() => {});

  const activeFilters = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);
    const idx = segments.indexOf("shoes");
    if (idx === -1) return [];
    return segments.slice(idx + 1).map((s) => decodeURIComponent(s));
  }, [pathname]);

  const buildPath = (filters: string[]) =>
    filters.length ? `/shoes/${filters.join("/")}` : "/shoes";

  const toggleFilter = (item: string) => {
    const isActive = activeFilters.includes(item);
    const newFilters = isActive
      ? activeFilters.filter((f) => f !== item)
      : [...activeFilters, item];
    router.push(buildPath(newFilters));
  };

  const hasResults = (filterToAdd: string) => {
    const testFilters = activeFilters.includes(filterToAdd)
      ? activeFilters
      : [...activeFilters, filterToAdd];
    return applyFilters(allData, testFilters).length > 0;
  };

  const allBrands = useMemo(
    () => [...new Set(allData.map((s) => normalize(s.brand)))].sort(),
    [],
  );
  const allGenders = useMemo(
    () => [...new Set(allData.map((s) => normalize(s.gender)))].sort(),
    [],
  );

  const allPriceRanges = ["under-2000", "under-3000", "under-5000"];
  const allRatings = [
    { value: "rating-45", label: "4.5+" },
    { value: "rating-40", label: "4.0+" },
    { value: "rating-35", label: "3.5+" },
  ];

  const FilterChip = ({ item }: { item: string }) => (
    <button
      onClick={() => toggleFilter(item)}
      className="flex items-center gap-1 px-2 py-1 rounded-xl bg-emerald-500 text-white text-xs"
    >
      {formatLabel(item)}
      <span className="text-xs bg-emerald-600 px-1 rounded">✕</span>
    </button>
  );

  const FilterButton = ({ item }: { item: string }) => {
    const isActive = activeFilters.includes(item);
    const disabled = !hasResults(item);

    if (isActive) return null;

    return (
      <button
        disabled={disabled}
        onClick={() => toggleFilter(item)}
        className={`px-2 py-1 rounded-xl text-xs transition ${
          disabled
            ? "bg-slate-50 border border-slate-200 text-slate-300 cursor-not-allowed"
            : "bg-slate-100 border border-slate-300 text-slate-600 hover:bg-slate-200"
        }`}
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
    const activeInSection = activeFilters.filter((f) =>
      values.some((v) => v.value === f),
    );

    return (
      <div className="mb-8">
        <div className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2 mb-2">
          <span className="w-1 h-4 bg-slate-500 rounded-full" />
          {title}
        </div>

        {activeInSection.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {activeInSection.map((f) => (
              <FilterChip key={f} item={f} />
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {values.map((v) => (
            <FilterButton key={v.value} item={v.value} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="lg:sticky lg:top-24 lg:border-r border-slate-200 lg:pr-4">
      {showSort && sortContext && (
        <div className="mb-8">
          <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
            Sort by Price
          </div>
          <select
            value={sortOrder}
            onChange={(e) =>
              setSortOrder(e.target.value as "low-to-high" | "high-to-low")
            }
            className="w-full px-3 py-2 rounded-xl bg-slate-100 border border-slate-300 text-slate-600 text-sm"
          >
            <option value="low-to-high">Low to High</option>
            <option value="high-to-low">High to Low</option>
          </select>
        </div>
      )}

      <Section title="Brand" values={allBrands.map((b) => ({ value: b }))} />
      <Section title="Gender" values={allGenders.map((g) => ({ value: g }))} />
      <Section
        title="Price Range"
        values={allPriceRanges.map((p) => ({ value: p }))}
      />
      <Section title="Rating" values={allRatings} />
    </div>
  );
}
