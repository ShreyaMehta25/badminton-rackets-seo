import rackets from "@/data/rackets.json";
import RacketSearch from "@/components/rackets/RacketSearch";
import { Racket } from "@/types/racket";

export default function RacketsPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-extrabold mb-2">🏸 Badminton Rackets</h1>
      <p className="text-slate-400 mb-8">
        Explore our complete collection of professional and beginner rackets.
      </p>
      <RacketSearch rackets={rackets as Racket[]} />
    </main>
  );
}
