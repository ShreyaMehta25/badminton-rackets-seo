"use client";

import { Shoe } from "@/types/shoes";
import ShoesComparisonTable from "./ShoesComparisonTable";
import { useSort } from "@/contexts/SortContext";

type ShoesListWithSortProps = {
  shoes: Shoe[];
};

export default function ShoesListWithSort({ shoes }: ShoesListWithSortProps) {
  const { sortOrder } = useSort();

  // Sort shoes based on selected order from context
  const sortedShoes = [...shoes].sort((a, b) => {
    if (sortOrder === "low-to-high") {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  return <ShoesComparisonTable shoes={sortedShoes} />;
}
