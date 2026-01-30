"use client";

import { useProductFilter } from "@/contexts/ProductFilterContext";
import { useMemo, useState } from "react";

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

export default function CategoryFilterSidebar({
  products,
  category,
}: CategoryFilterSidebarProps) {
  const {
    priceRange,
    ratingFilter,
    brandFilter,
    speedFilter,
    sortOrder,
    setPriceRange,
    setRatingFilter,
    setBrandFilter,
    setSpeedFilter,
    setSortOrder,
  } = useProductFilter();

  /* ---------- ACCORDION STATE ---------- */
  const [open, setOpen] = useState<Record<string, boolean>>({});

  const toggleSection = (key: string) =>
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));

  /* ---------- DATA ---------- */

  const brands = useMemo(
    () => Array.from(new Set(products.map((p) => p.brand))).sort(),
    [products],
  );

  const priceRanges = useMemo(() => {
    const prices = products.map((p) => p.price).filter((p) => p > 0);
    if (!prices.length) return [];

    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const step = Math.ceil((max - min) / 4);

    return [
      {
        label: `Under ₹${min + step}`,
        range: [0, min + step] as [number, number],
      },
      {
        label: `₹${min + step} - ₹${min + step * 2}`,
        range: [min + step, min + step * 2] as [number, number],
      },
      {
        label: `₹${min + step * 2} - ₹${min + step * 3}`,
        range: [min + step * 2, min + step * 3] as [number, number],
      },
      {
        label: `Over ₹${min + step * 3}`,
        range: [min + step * 3, Infinity] as [number, number],
      },
    ];
  }, [products]);

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

  const ratingOptions = [4, 3, 2, 1];

  /* ---------- UI ---------- */

  const Section = ({
    id,
    title,
    children,
  }: {
    id: string;
    title: string;
    children: React.ReactNode;
  }) => (
    <div className="mb-8">
      <button
        onClick={() => toggleSection(id)}
        className="w-full flex items-center justify-between text-xs md:text-sm font-bold text-slate-800 uppercase tracking-wider py-2"
      >
        <div className="flex items-center gap-2">
          <span className="w-1 h-3 md:h-4 bg-slate-500 rounded-full" />
          {title}
        </div>
        <span
          className={`text-xs transition-transform ${
            open[id] ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      {open[id] && <div className="pt-2">{children}</div>}
    </div>
  );

  const Capsule = ({
    active,
    label,
    onClick,
  }: {
    active: boolean;
    label: string;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs transition ${
        active
          ? "bg-emerald-500 text-white"
          : "bg-slate-100 border border-slate-300 text-slate-600 hover:bg-slate-200"
      }`}
    >
      {label}
      {active && <span className="ml-1 bg-emerald-600 px-1 rounded">✕</span>}
    </button>
  );

  return (
    <div className="lg:sticky lg:top-24 lg:border-r border-slate-200 lg:pr-4">
      {/* Sort */}
      <Section id="sort" title="Sort by Price">
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
      </Section>

      {/* Brand */}
      {brands.length > 1 && (
        <Section id="brand" title="Brand">
          <div className="flex flex-wrap gap-2">
            {brands.map((b) => (
              <Capsule
                key={b}
                label={formatLabel(b)}
                active={brandFilter.includes(b)}
                onClick={() =>
                  brandFilter.includes(b)
                    ? setBrandFilter(brandFilter.filter((x) => x !== b))
                    : setBrandFilter([...brandFilter, b])
                }
              />
            ))}
          </div>
        </Section>
      )}

      {/* Price */}
      {priceRanges.length > 0 && (
        <Section id="price" title="Price Range">
          <div className="flex flex-col gap-2">
            {priceRanges.map((r, i) => {
              const active =
                priceRange &&
                priceRange[0] === r.range[0] &&
                priceRange[1] === r.range[1];

              return (
                <Capsule
                  key={i}
                  label={r.label}
                  active={!!active}
                  onClick={() => setPriceRange(active ? null : r.range)}
                />
              );
            })}
          </div>
        </Section>
      )}

      {/* Rating */}
      <Section id="rating" title="Review Score">
        <div className="flex flex-col gap-2">
          {ratingOptions.map((r) => (
            <Capsule
              key={r}
              label={`${r}+ Stars`}
              active={ratingFilter === r}
              onClick={() => setRatingFilter(ratingFilter === r ? null : r)}
            />
          ))}
        </div>
      </Section>

      {/* Speed */}
      {category === "shuttlecock" && speeds.length > 0 && (
        <Section id="speed" title="Speed">
          <div className="flex flex-wrap gap-2">
            {speeds.map((s) => (
              <Capsule
                key={s}
                label={s}
                active={speedFilter === s}
                onClick={() => setSpeedFilter(speedFilter === s ? null : s)}
              />
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}
