"use client";

import ProductCard from "./ProductCard";
import { useProductFilter } from "@/contexts/ProductFilterContext";
import { useMemo } from "react";

interface Product {
  name: string;
  brand: string;
  price: number;
  imageurl: string;
  reviewscore: number | string;
  speed?: string;
  id: string;
}

interface ProductGridProps {
  products: Product[];
  category: "shoes" | "strings" | "grips" | "shuttlecock";
}

export default function ProductGrid({ products, category }: ProductGridProps) {
  const { priceRange, ratingFilter, brandFilter, speedFilter, sortOrder } =
    useProductFilter();

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    // Apply price filter
    if (priceRange) {
      filtered = filtered.filter(
        (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
      );
    }

    // Apply rating filter
    if (ratingFilter !== null) {
      filtered = filtered.filter((p) => {
        const score = typeof p.reviewscore === 'string'
          ? (p.reviewscore === '' ? 0 : parseFloat(p.reviewscore))
          : (p.reviewscore || 0);
        return score >= ratingFilter;
      });
    }

    // Apply brand filter
    if (brandFilter.length > 0) {
      filtered = filtered.filter((p) => brandFilter.includes(p.brand));
    }

    // Apply speed filter (for shuttlecock)
    if (speedFilter && category === 'shuttlecock') {
      filtered = filtered.filter((p) => p.speed?.includes(speedFilter));
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortOrder === "low-to-high") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });

    return filtered;
  }, [products, priceRange, ratingFilter, brandFilter, speedFilter, sortOrder, category]);

  if (filteredAndSortedProducts.length === 0) {
    return (
      <div className="col-span-full py-12 text-center">
        <p className="text-slate-600 text-lg">
          No products match your filters. Try adjusting your selection.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-3 md:gap-4 lg:gap-6">
      {filteredAndSortedProducts.map((product, index) => (
        <ProductCard key={index} product={product} category={category} />
      ))}
    </div>
  );
}
