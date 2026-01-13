import { Racket } from "@/types/racket";
import RacketCard from "./RacketCard";

export default function RacketGrid({
  rackets,
  onSelect,
}: {
  rackets: Racket[];
  onSelect?: (racket: Racket) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {rackets.map((racket) => (
        <RacketCard
          key={racket.id}
          racket={racket}
          onClick={onSelect ? () => onSelect(racket) : undefined}
        />
      ))}
    </div>
  );
}
