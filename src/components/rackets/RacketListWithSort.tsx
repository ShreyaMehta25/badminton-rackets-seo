"use client";

import { Racket } from "@/types/racket";
import ComparisonTable from "./ComparisonTable";
import { useSort } from "@/contexts/SortContext";

type RacketListWithSortProps = {
  rackets: Racket[];
};

export default function RacketListWithSort({ rackets }: RacketListWithSortProps) {
  const { sortOrder } = useSort();

  // Sort rackets based on selected order from context
  const sortedRackets = [...rackets].sort((a, b) => {
    if (sortOrder === "low-to-high") {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  return <ComparisonTable rackets={sortedRackets} />;
}
