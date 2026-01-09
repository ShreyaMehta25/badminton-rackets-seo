import rackets from "@/data/rackets.json";
import { Racket } from "@/types/racket";
import RacketComparisonTable from "@/components/rackets/RacketComparisonTable";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ filterPath: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { filterPath } = await params;
  const filter = decodeURIComponent(filterPath).toLowerCase();

  return {
    title: `Best ${filter.replace(/-/g, " ")} Badminton Rackets`,
    description: `Explore the best ${filter} badminton rackets with prices, ratings, and comparisons.`,
  };
}
export default async function FilteredRacketsPage({ params }: Props) {
  const { filterPath } = await params;
  const filter = decodeURIComponent(filterPath).toLowerCase();
  const filteredRackets = (rackets as Racket[]).filter((r) => {
    return (
      r.brand.toLowerCase() === filter ||
      r.playerLevel.toLowerCase() == filter ||
      r.balance.toLowerCase() === filter ||
      r.bestFor.map((b) => b.toLowerCase()).includes(filter)
    );
  });
  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-extrabold mb-4 capitalize">
        Best {filter.replace("-", " ")} Badminton Rackets
      </h1>
      <p className="text-slate-400 mb-8">
        Showing {filteredRackets.length} rackets matching “{filter}”.
      </p>
      {filteredRackets.length === 0 ? (
        <div className="text-slate-400">No rackets found for this filter.</div>
      ) : (
        <RacketComparisonTable rackets={filteredRackets} />
      )}
    </main>
  );
}
