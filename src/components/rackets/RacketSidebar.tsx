"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import rackets from "@/data/rackets.json";
import { Racket } from "@/types/racket";

const normalize = (v: string) => v.toLowerCase().trim().replace(/\s+/g, "-");
const formatLabel = (v: string) =>
  v
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export default function RacketSidebar() {
  const pathname = usePathname();
  const data = rackets as Racket[];

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
    <div className="mb-6">
      <h3 className="text-sm font-bold text-white mb-3 uppercase">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => {
          const isActive = activeFilters.includes(item);
          const nextAdd = Array.from(new Set([...activeFilters, item]));
          const nextRemove = activeFilters.filter((f) => f !== item);

          if (isActive) {
            return (
              <div
                key={item}
                className="flex items-center gap-2 px-3 py-1 rounded-full text-sm bg-emerald-700 text-white"
              >
                <span>{formatLabel(item)}</span>
                <Link
                  href={buildPath(nextRemove)}
                  className="ml-1 px-1.5 py-0.5 rounded-full bg-emerald-900/80 hover:bg-emerald-950 transition text-xs"
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
              className="px-3 py-1 rounded-full text-sm bg-slate-800 hover:bg-slate-700 transition text-slate-100"
            >
              {formatLabel(item)}
            </Link>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="sticky top-24">
      <Section title="Brand" items={brands} />
      <Section title="Skill Level" items={levels} />
      <Section title="Balance" items={balances} />
      <Section title="Best For" items={bestFor} />
    </div>
  );
}
