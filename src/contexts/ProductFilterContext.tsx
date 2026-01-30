"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ProductFilterContextType {
  priceRange: [number, number] | null;
  ratingFilter: number | null;
  brandFilter: string[];
  speedFilter: string | null;
  sortOrder: "low-to-high" | "high-to-low";
  setPriceRange: (range: [number, number] | null) => void;
  setRatingFilter: (rating: number | null) => void;
  setBrandFilter: (brands: string[]) => void;
  setSpeedFilter: (speed: string | null) => void;
  setSortOrder: (order: "low-to-high" | "high-to-low") => void;
  clearFilters: () => void;
}

const ProductFilterContext = createContext<
  ProductFilterContextType | undefined
>(undefined);

export function ProductFilterProvider({ children }: { children: ReactNode }) {
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [brandFilter, setBrandFilter] = useState<string[]>([]);
  const [speedFilter, setSpeedFilter] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"low-to-high" | "high-to-low">(
    "low-to-high",
  );

  const clearFilters = () => {
    setPriceRange(null);
    setRatingFilter(null);
    setBrandFilter([]);
    setSpeedFilter(null);
  };

  return (
    <ProductFilterContext.Provider
      value={{
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
        clearFilters,
      }}
    >
      {children}
    </ProductFilterContext.Provider>
  );
}

export function useProductFilter() {
  const context = useContext(ProductFilterContext);
  if (!context) {
    throw new Error(
      "useProductFilter must be used within ProductFilterProvider",
    );
  }
  return context;
}
