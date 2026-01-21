"use client";

import { useState, useEffect } from "react";
import rackets from "@/data/rackets.json";
import Link from "next/link";
import { Racket } from "@/types/racket";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Weight types
type WeightKey = "3U" | "4U" | "5U";

const ITEMS_PER_PAGE = 4;

export default function WeightGuide() {
  const [selectedWeight, setSelectedWeight] = useState<WeightKey>("4U");
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [selectedWeight]);

  // Filter by weight
  const filteredRackets = (rackets as Racket[]).filter(
    (racket) => racket.weight === selectedWeight,
  );

  // Deduplicate + sort
  const uniqueRackets = Array.from(
    new Map(filteredRackets.map((r) => [r.id, r])).values(),
  ).slice(0, 20);

  const paginatedRackets = uniqueRackets.slice(
    page * ITEMS_PER_PAGE,
    (page + 1) * ITEMS_PER_PAGE,
  );

  const totalPages = Math.ceil(uniqueRackets.length / ITEMS_PER_PAGE);
  const canGoPrev = page > 0;
  const canGoNext = page < totalPages - 1;

  return (
    <section className="py-10 bg-white">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* RIGHT-ALIGNED HEADER */}
        <div className="flex flex-col items-end text-right space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold italic text-slate-900">
            Find Your Perfect Weight
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl">
            Choose the racket weight that matches your strength, speed, and
            playing style , from lightning-fast to power-packed.
          </p>
        </div>

        {/* RIGHT-ALIGNED WEIGHT FILTERS */}
        <div className="flex justify-end gap-2 mt-4 overflow-x-auto pb-2">
          {(["3U", "4U", "5U"] as WeightKey[]).map((weight) => (
            <button
              key={weight}
              onClick={() => setSelectedWeight(weight)}
              className={`
                px-6 py-3 rounded-full font-medium text-sm whitespace-nowrap
                transition-all duration-200 border
                ${
                  selectedWeight === weight
                    ? "border-black text-black bg-slate-100"
                    : "border-transparent text-slate-600 bg-slate-100 hover:border-slate-300"
                }
              `}
            >
              {weight} Weight
            </button>
          ))}
        </div>

        {/* CAROUSEL */}
        <div className="relative mt-6">
          {canGoPrev && (
            <button
              onClick={() => setPage((p) => p - 1)}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white hover:bg-slate-50 text-slate-700 p-2.5 rounded-full shadow-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          <div
            key={`${selectedWeight}-${page}`}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fadeIn"
          >
            {paginatedRackets.map((racket) => (
              <Link
                key={racket.id}
                href={`/rackets/${racket.id}`}
                className="bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition"
              >
                <div className="h-36 bg-slate-50 flex items-center justify-center">
                  <img
                    src={racket.imageUrl}
                    alt={racket.name}
                    className="h-full object-contain p-2"
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-medium text-slate-900 line-clamp-2">
                    {racket.name}
                  </h3>
                  <p className="text-xs text-slate-500">{racket.brand}</p>
                  <p className="text-emerald-600 font-bold mt-1">
                    ₹{racket.price.toLocaleString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {canGoNext && (
            <button
              onClick={() => setPage((p) => p + 1)}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white hover:bg-slate-50 text-slate-700 p-2.5 rounded-full shadow-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* VIEW ALL */}
        <div className="flex justify-center mt-4">
          <a
            href={`/rackets/${selectedWeight}`}
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold"
          >
            View all {selectedWeight} rackets →
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
      `}</style>
    </section>
  );
}
