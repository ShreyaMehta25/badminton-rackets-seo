"use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import rackets from "@/data/rackets.json";
// import { Racket } from "@/types/racket";
// import { useSort } from "@/contexts/SortContext";

// const normalize = (v: string) => v.toLowerCase().trim().replace(/\s+/g, "-");
// const formatLabel = (v: string) =>
//   v
//     .split("-")
//     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//     .join(" ");

// export default function RacketSidebar() {
//   const pathname = usePathname();
//   const data = rackets as Racket[];
//   const { sortOrder, setSortOrder } = useSort();

//   const brands = [...new Set(data.map((r) => normalize(r.brand)))];
//   const levels = [...new Set(data.map((r) => normalize(r.playerLevel)))];
//   const balances = [...new Set(data.map((r) => normalize(r.balance)))];
//   const bestFor = [...new Set(data.flatMap((r) => r.bestFor.map(normalize)))];

//   const activeFilters = (() => {
//     const segments = pathname.split("/").filter(Boolean);
//     const idx = segments.indexOf("rackets");
//     if (idx === -1) return [];
//     return segments
//       .slice(idx + 1)
//       .map((s) => decodeURIComponent(s.toLowerCase()));
//   })();

//   const buildPath = (filters: string[]) =>
//     filters.length ? `/rackets/${filters.join("/")}` : "/rackets";

//   const Section = ({ title, items }: { title: string; items: string[] }) => (
//     <details className="mb-4">
//       <summary className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wider flex items-center justify-between gap-2 cursor-pointer">
//         <div className="flex items-center gap-2">
//           <span className="w-1 h-4 bg-gradient-to-b from-emerald-400 to-emerald-500 rounded-full"></span>
//           {title}
//         </div>
//         <span className="transition-transform duration-200" style={{ display: 'inline-block' }}>▼</span>
//       </summary>
//       <div className="flex flex-wrap gap-2.5">
//         {items.map((item) => {
//           const isActive = activeFilters.includes(item);
//           const nextAdd = Array.from(new Set([...activeFilters, item]));
//           const nextRemove = activeFilters.filter((f) => f !== item);

//           if (isActive) {
//             return (
//               <div
//                 key={item}
//                 className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg border border-emerald-400/30 hover:shadow-xl transition-all duration-300 hover:scale-105"
//               >
//                 <span className="font-semibold">{formatLabel(item)}</span>
//                 <Link
//                   href={buildPath(nextRemove)}
//                   className="ml-1 px-2 py-0.5 rounded-lg bg-emerald-700/80 hover:bg-emerald-800 transition-all duration-200 text-xs font-bold hover:scale-110"
//                   aria-label={`Remove ${formatLabel(item)} filter`}
//                 >
//                   ✕
//                 </Link>
//               </div>
//             );
//           }

//           return (
//             <Link
//               key={item}
//               href={buildPath(nextAdd)}
//               className="px-4 py-2 rounded-xl text-sm bg-gradient-to-br from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-100 border border-slate-600/50 text-slate-500 font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-slate-500"
//             >
//               {formatLabel(item)}
//             </Link>
//           );
//         })}
//       </div>
//     </details>
//   );

//   return (
//     <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-6 border-r border-slate-200">
//       <style>{`
//         details > summary::-webkit-details-marker { display: none; }
//         details > summary { list-style: none; }
//         details[open] > summary span:last-child { transform: rotate(180deg); }
//       `}</style>

//       <details className="mb-4">
//         <summary className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wider flex items-center justify-between gap-2 cursor-pointer">
//           <div className="flex items-center gap-2">
//             <span className="w-1 h-4 bg-gradient-to-b from-emerald-400 to-emerald-500 rounded-full"></span>
//             Sort by Price
//           </div>
//           <span className="transition-transform duration-200" style={{ display: 'inline-block' }}>▼</span>
//         </summary>
//         <select
//           id="price-sort-sidebar"
//           value={sortOrder}
//           onChange={(e) =>
//             setSortOrder(e.target.value as "low-to-high" | "high-to-low")
//           }
//           className="w-full px-4 py-2.5 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-600/50 text-slate-500 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all hover:from-slate-200 hover:to-slate-100 mt-4"
//           aria-label="Sort rackets by price"
//         >
//           <option value="low-to-high">Low to High</option>
//           <option value="high-to-low">High to Low</option>
//         </select>
//       </details>

//       <Section title="Brand" items={brands} />
//       <Section title="Skill Level" items={levels} />
//       <Section title="Balance" items={balances} />
//       <Section title="Best For" items={bestFor} />
//     </div>
//   );
// }

import Link from "next/link";
import { usePathname } from "next/navigation";
import rackets from "@/data/rackets.json";
import { Racket } from "@/types/racket";
import { useContext } from "react";
import { SortContext } from "@/contexts/SortContext";

const normalize = (v: string) => v.toLowerCase().trim().replace(/\s+/g, "-");
const formatLabel = (v: string) =>
  v
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

// Make showSort optional prop - default to true
export default function RacketSidebar({ showSort = true }: { showSort?: boolean }) {
  const pathname = usePathname();
  const data = rackets as Racket[];

  // Safely get sort context - may be undefined in mobile menu
  const sortContext = useContext(SortContext);
  const sortOrder = sortContext?.sortOrder || "low-to-high";
  const setSortOrder = sortContext?.setSortOrder || (() => {});

  const brands = [...new Set(data.map((r) => normalize(r.brand)))];
  const levels = [...new Set(data.map((r) => normalize(r.playerLevel)))];
  const balances = [...new Set(data.map((r) => normalize(r.balance)))];
  const bestFor = [...new Set(data.flatMap((r) => r.bestFor.map(normalize)))];

  const activeFilters = (() => {
    const segments = pathname.split("/").filter(Boolean);
    const idx = segments.indexOf("rackets");
    if (idx === -1) return [];
    return segments.slice(idx + 1).map((s) => decodeURIComponent(s));
  })();

  const buildPath = (filters: string[]) =>
    filters.length ? `/rackets/${filters.join("/")}` : "/rackets";

  const Section = ({ title, items }: { title: string; items: string[] }) => (
    <details className="mb-6 lg:mb-10">
      <summary className="text-xs md:text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center justify-between cursor-pointer py-2">
        <div className="flex items-center gap-2">
          <span className="w-1 h-3 md:h-4 bg-slate-500 rounded-full" />
          {title}
        </div>
        <span className="transition-transform duration-200 inline-block text-xs">
          ▼
        </span>
      </summary>

      <div className="flex flex-wrap gap-1.5 md:gap-2 pt-2">
        {items.map((item) => {
          const isActive = activeFilters.includes(item);
          const nextAdd = Array.from(new Set([...activeFilters, item]));
          const nextRemove = activeFilters.filter((f) => f !== item);

          if (isActive) {
            return (
              <div
                key={item}
                className="flex items-center gap-1 md:gap-1.5 px-2 md:px-3 py-1 md:py-1.5 rounded-xl text-xs md:text-sm bg-emerald-500 text-white"
              >
                <span className="font-medium">{formatLabel(item)}</span>
                <Link
                  href={buildPath(nextRemove)}
                  className="px-1 md:px-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-xs"
                >
                  ✕
                </Link>
              </div>
            );
          }

          return (
            <Link
              key={item}
              href={buildPath(nextAdd)}
              className="px-2 md:px-3 py-1 md:py-1.5 rounded-xl text-xs md:text-sm bg-slate-100 border border-slate-300 text-slate-600 hover:bg-slate-200 transition"
            >
              {formatLabel(item)}
            </Link>
          );
        })}
      </div>
    </details>
  );

  return (
    <div className="lg:sticky lg:top-24 max-h-none lg:max-h-[calc(100vh-8rem)] overflow-y-visible lg:overflow-y-auto lg:border-r border-slate-200 lg:pr-4">
      <style>{`
        details > summary::-webkit-details-marker { display: none; }
        details > summary { list-style: none; }
        details[open] > summary span:last-child { transform: rotate(180deg); }
      `}</style>

      {/* SORT - only show if showSort prop is true and context is available */}
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

      <Section title="Brand" items={brands} />
      <Section title="Skill Level" items={levels} />
      <Section title="Balance" items={balances} />
      <Section title="Best For" items={bestFor} />
    </div>
  );
}
