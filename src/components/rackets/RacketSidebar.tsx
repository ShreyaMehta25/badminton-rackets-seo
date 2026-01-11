import Link from "next/link";
import rackets from "@/data/rackets.json";
import { Racket } from "@/types/racket";

const normalize = (v: string) => v.toLowerCase().trim().replace(/\s+/g, "-");

export default function RacketSidebar() {
  const data = rackets as Racket[];

  const brands = [...new Set(data.map((r) => normalize(r.brand)))];
  const levels = [...new Set(data.map((r) => normalize(r.playerLevel)))];
  const balances = [...new Set(data.map((r) => normalize(r.balance)))];
  const bestFor = [...new Set(data.flatMap((r) => r.bestFor.map(normalize)))];

  const Section = ({ title, items }: { title: string; items: string[] }) => (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-slate-400 mb-3 uppercase">
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <Link
            key={item}
            href={`/rackets/${item}`}
            className="px-3 py-1 rounded-full text-sm bg-slate-800 hover:bg-slate-700 transition"
          >
            {item.replace(/-/g, " ")}
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <div className="sticky top-24">
      <Section title="Brand" items={brands} />
      <Section title="Skill Level" items={levels} />
      <Section title="Balance" items={balances} />
      <Section title="Best For" items={bestFor} />
    </div>
  );
}
