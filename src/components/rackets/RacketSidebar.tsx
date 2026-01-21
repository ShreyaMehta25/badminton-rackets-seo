"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import rackets from "@/data/rackets.json";
import { Racket } from "@/types/racket";
import { useSort } from "@/contexts/SortContext";

const normalize = (v: string) => v.toLowerCase().trim().replace(/\s+/g, "-");
const formatLabel = (v: string) =>
  v
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export default function RacketSidebar() {
  const pathname = usePathname();
  const data = rackets as Racket[];
  const { sortOrder, setSortOrder } = useSort();

  const brands = [...new Set(data.map((r) => normalize(r.brand)))];
  const levels = [...new Set(data.map((r) => normalize(r.playerLevel)))];
  const balances = [...new Set(data.map((r) => normalize(r.balance)))];
  const bestFor = [...new Set(data.flatMap((r) => r.bestFor.map(normalize)))];

  const activeFilters = (() => {
    const segments = pathname.split("/").filter(Boolean);
    const idx = segments.indexOf("rackets");
    if (idx === -1) return [];
    return segments
      .slice(idx + 1)
      .map((s) => decodeURIComponent(s.toLowerCase()));
  })();

  const buildPath = (filters: string[]) =>
    filters.length ? `/rackets/${filters.join("/")}` : "/rackets";

  const Section = ({ title, items }: { title: string; items: string[] }) => (
    <div className="mb-8">
      <h3 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wider flex items-center gap-2">
        <span className="w-1 h-4 bg-gradient-to-b from-emerald-400 to-emerald-500 rounded-full"></span>
        {title}
      </h3>
      <div className="flex flex-wrap gap-2.5 px-1">
        {items.map((item) => {
          const isActive = activeFilters.includes(item);
          const nextAdd = Array.from(new Set([...activeFilters, item]));
          const nextRemove = activeFilters.filter((f) => f !== item);

          if (isActive) {
            return (
              <div
                key={item}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg border border-emerald-400/30 hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <span className="font-semibold">{formatLabel(item)}</span>
                <Link
                  href={buildPath(nextRemove)}
                  className="ml-1 px-2 py-0.5 rounded-lg bg-emerald-700/80 hover:bg-emerald-800 transition-all duration-200 text-xs font-bold hover:scale-110"
                  aria-label={`Remove ${formatLabel(item)} filter`}
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
              className="px-4 py-2 rounded-xl text-sm bg-gradient-to-br from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-100 border border-slate-600/50 text-slate-500 font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-slate-500"
            >
              {formatLabel(item)}
            </Link>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2 sidebar-scroll">
      {/* Price Sort Section - Above Brand */}
      <div className="mb-8">
        <label
          htmlFor="price-sort-sidebar"
          className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wider flex items-center gap-2"
        >
          <span className="w-1 h-4 bg-gradient-to-b from-emerald-400 to-emerald-500 rounded-full"></span>
          Sort by Price
        </label>
        <select
          id="price-sort-sidebar"
          value={sortOrder}
          onChange={(e) =>
            setSortOrder(e.target.value as "low-to-high" | "high-to-low")
          }
          className="w-full px-4 py-2.5 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-600/50 text-slate-500 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all hover:from-slate-200 hover:to-slate-100 mt-4"
          aria-label="Sort rackets by price"
        >
          <option value="low-to-high">Low to High</option>
          <option value="high-to-low">High to Low</option>
        </select>
      </div>

      <Section title="Brand" items={brands} />
      <Section title="Skill Level" items={levels} />
      <Section title="Balance" items={balances} />
      <Section title="Best For" items={bestFor} />
    </div>
  );
}
