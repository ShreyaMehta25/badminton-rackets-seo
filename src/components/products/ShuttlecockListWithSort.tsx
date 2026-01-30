"use client";

import { Shuttlecock } from "@/types/shuttlecock";
import ShuttlecockComparisonTable from "./ShuttlecockComparisonTable";
import { useSort } from "@/contexts/SortContext";

type ShuttlecockListWithSortProps = {
  shuttlecocks: Shuttlecock[];
};

export default function ShuttlecockListWithSort({ shuttlecocks }: ShuttlecockListWithSortProps) {
  const { sortOrder } = useSort();

  // Sort shuttlecocks based on selected order from context
  const sortedShuttlecocks = [...shuttlecocks].sort((a, b) => {
    if (sortOrder === "low-to-high") {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  return <ShuttlecockComparisonTable shuttlecocks={sortedShuttlecocks} />;
}
