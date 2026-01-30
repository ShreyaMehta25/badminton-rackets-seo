"use client";

import { Grip } from "@/types/grip";
import GripsComparisonTable from "./GripsComparisonTable";
import { useSort } from "@/contexts/SortContext";

type GripsListWithSortProps = {
  grips: Grip[];
};

export default function GripsListWithSort({ grips }: GripsListWithSortProps) {
  const { sortOrder } = useSort();

  // Sort grips based on selected order from context
  const sortedGrips = [...grips].sort((a, b) => {
    if (sortOrder === "low-to-high") {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  return <GripsComparisonTable grips={sortedGrips} />;
}
