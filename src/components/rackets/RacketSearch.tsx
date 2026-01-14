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
      <input
        type="text"
        placeholder="Search Rackets"
        className="w-full mb-6 p-3 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-accent"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <RacketGrid rackets={filtered} />
    </>
  );
}
