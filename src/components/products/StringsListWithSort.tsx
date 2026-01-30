"use client";

import { StringProduct } from "@/types/strings";
import StringsComparisonTable from "./StringsComparisonTable";
import { useSort } from "@/contexts/SortContext";

type StringsListWithSortProps = {
  strings: StringProduct[];
};

export default function StringsListWithSort({ strings }: StringsListWithSortProps) {
  const { sortOrder } = useSort();

  // Sort strings based on selected order from context
  const sortedStrings = [...strings].sort((a, b) => {
    if (sortOrder === "low-to-high") {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  return <StringsComparisonTable strings={sortedStrings} />;
}
