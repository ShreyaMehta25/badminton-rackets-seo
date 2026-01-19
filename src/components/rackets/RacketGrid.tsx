import { Racket } from "@/types/racket";
import RacketCard from "./RacketCard";

export default function RacketGrid({
  rackets,
}: {
  rackets: Racket[];
}) {
  // Remove duplicates by ID to prevent React key conflicts
  const uniqueRackets = Array.from(
    new Map(rackets.map((racket) => [racket.id, racket])).values()
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {uniqueRackets.map((racket) => (
        <RacketCard key={racket.id} racket={racket} />
      ))}
    </div>
  );
}
