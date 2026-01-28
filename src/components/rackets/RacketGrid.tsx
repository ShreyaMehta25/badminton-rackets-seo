"use client";

import { Racket } from "@/types/racket";
import RacketCard from "./RacketCard";
import { useSort } from "@/contexts/SortContext";

export default function RacketGrid({ rackets }: { rackets: Racket[] }) {
  const { sortOrder } = useSort();

  // Remove duplicates by ID to prevent React key conflicts
  const uniqueRackets = Array.from(
    new Map(rackets.map((racket) => [racket.id, racket])).values(),
  );

  // Apply sorting based on selected order from context
  const sortedRackets = [...uniqueRackets].sort((a, b) => {
    if (sortOrder === "low-to-high") {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4 md:gap-6">
      {sortedRackets.map((racket) => (
        <RacketCard key={racket.id} racket={racket} />
      ))}
    </div>
  );
}
