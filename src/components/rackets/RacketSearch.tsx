"use client";
import { useState } from "react";
import { Racket } from "@/types/racket";
import RacketGrid from "./RacketGrid";

const formatKebab = (value: string) =>
  value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("-");

export default function RacketSearch({ rackets }: { rackets: Racket[] }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Racket | null>(null);

  const filtered = rackets.filter((r) =>
    r.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <input
        type="text"
        placeholder="Search Rackets"
        className="w-full mb-6 p-3 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-accent"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <RacketGrid rackets={filtered} onSelect={setSelected} />

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-xl mx-4 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm"
              aria-label="Close details"
            >
              ✕
            </button>

            <div className="pt-6 px-6 pb-3 flex justify-center">
              <img
                src={selected.imageUrl}
                alt={selected.name}
                className="max-h-64 object-contain"
              />
            </div>

            <div className="px-6 pb-6 space-y-4">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold">{selected.name}</h2>
                <p className="text-sm text-slate-300">{selected.brand}</p>
                <p className="text-base font-semibold text-slate-50">
                  ₹{selected.price}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 text-sm">
                <span className="px-2 py-1 rounded bg-slate-700">
                  <span className="font-semibold text-emerald-300">Weight:</span>{" "}
                  {selected.weight}
                </span>
                <span className="px-2 py-1 rounded bg-slate-700">
                  <span className="font-semibold text-emerald-300">Balance:</span>{" "}
                  {formatKebab(selected.balance)}
                </span>
                <span className="px-2 py-1 rounded bg-slate-700">
                  <span className="font-semibold text-emerald-300">Flex:</span>{" "}
                  {formatKebab(selected.flex)}
                </span>
                <span className="px-2 py-1 rounded bg-slate-700">
                  <span className="font-semibold text-emerald-300">Level:</span>{" "}
                  {formatKebab(selected.playerLevel)}
                </span>
                <span className="px-2 py-1 rounded bg-slate-700">
                  <span className="font-semibold text-emerald-300">
                    Rating:
                  </span>{" "}
                  {selected.reviewScore} ⭐
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h3 className="font-semibold mb-1 text-emerald-300">Pros</h3>
                  <ul className="list-disc list-inside text-slate-200 space-y-1">
                    {selected.pros.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-rose-300">Cons</h3>
                  <ul className="list-disc list-inside text-slate-200 space-y-1">
                    {selected.cons.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="text-sm text-slate-200">
                <span className="font-semibold text-emerald-300">
                  Best For:{" "}
                </span>
                <span>
                  {selected.bestFor.map((b) => formatKebab(b)).join(", ")}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
