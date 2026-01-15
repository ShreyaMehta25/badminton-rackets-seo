"use client";
import { useState } from "react";
import { Racket } from "@/types/racket";
import RacketGrid from "./RacketGrid";

export default function RacketSearch({ rackets }: { rackets: Racket[] }) {
  const [query, setQuery] = useState("");

  const filtered = rackets.filter((r) =>
    r.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <div className="relative mb-8 group">
        <input
          type="text"
          placeholder="Search Rackets..."
          className="w-full p-4 pl-12 rounded-xl bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300 text-slate-100 placeholder:text-slate-500 shadow-lg hover:shadow-xl"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-400 transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <RacketGrid rackets={filtered} />
    </>
  );
}
