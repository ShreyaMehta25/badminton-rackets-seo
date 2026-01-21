"use client";

import { useState, useEffect } from "react";
import rackets from "@/data/rackets.json";
import Link from "next/link";
import { Racket } from "@/types/racket";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Type-safe playstyle definitions
type PlaystyleKey = "smash" | "control" | "speed";
type RacketMetaPlaystyle = "power" | "control" | "speed";

const PLAYSTYLE_TO_META: Record<PlaystyleKey, RacketMetaPlaystyle> = {
  smash: "power",
  control: "control",
  speed: "speed",
};

const ITEMS_PER_PAGE = 4;

// Ultra-compact RacketCard for carousel
const levelColor = {
  beginner: "bg-green-50 text-green-700 border-green-200",
  intermediate: "bg-amber-50 text-amber-700 border-amber-200",
  advanced: "bg-red-50 text-red-700 border-red-200",
};

const balanceColor = {
  "head-heavy": "bg-purple-50 text-purple-700 border-purple-200",
  "head-light": "bg-blue-50 text-blue-700 border-blue-200",
  even: "bg-slate-50 text-slate-700 border-slate-200",
};

function CompactRacketCard({ racket }: { racket: Racket }) {
  return (
    <Link
      href={`/rackets/${racket.id}`}
      className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 block border border-slate-200 hover:border-emerald-300 hover:-translate-y-0.5 flex-shrink-0 w-full"
    >
      {/* Ultra-compact Image Area */}
      <div className="h-36 bg-slate-50 relative overflow-hidden">
        <img
          src={racket.imageUrl}
          alt={racket.name}
          className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Compact Content Area */}
      <div className="p-2 space-y-1.5 ">
        {/* Title & Brand */}
        <div>
          <h3 className="text-sm font-medium leading-tight text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2">
            {racket.name}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5 uppercase tracking-wide">
            {racket.brand}
          </p>
        </div>

        {/* Price */}
        <div>
          <span className="text-base font-bold text-emerald-600">
            ₹{racket.price.toLocaleString()}
          </span>
        </div>

        {/* Tags/Capsules */}
        <div className="flex flex-wrap gap-1">
          <span
            className={`px-2 py-0.5 text-xs font-medium rounded-full border ${levelColor[racket.playerLevel]}`}
          >
            {racket.playerLevel}
          </span>
          <span
            className={`px-2 py-0.5 text-xs font-medium rounded-full border ${balanceColor[racket.balance] || "bg-slate-50 text-slate-700 border-slate-200"}`}
          >
            {racket.balance}
          </span>
        </div>

        {/* Why this racket */}
        {racket.bestFor && racket.bestFor.length > 0 && (
          <div className="pt-1.5 border-t border-slate-100">
            <p className="text-xs text-slate-600 leading-snug">
              <span className="font-medium text-slate-700">Why: </span>
              {racket.bestFor.slice(0, 2).join(", ")}
            </p>
          </div>
        )}
      </div>
    </Link>
  );
}

export default function PlayStyleGuide() {
  const [selectedPlaystyle, setSelectedPlaystyle] =
    useState<PlaystyleKey>("smash");
  const [page, setPage] = useState(0);

  // Reset page when playstyle changes
  useEffect(() => {
    setPage(0);
  }, [selectedPlaystyle]);

  // Array-safe filtering using .includes()
  const filteredRackets = (rackets as Racket[]).filter((racket) =>
    racket.playStyles.includes(PLAYSTYLE_TO_META[selectedPlaystyle]),
  );

  // Deduplication using Map (O(n), not O(n²))
  const uniqueRackets = Array.from(
    new Map(filteredRackets.map((r) => [r.id, r])).values(),
  )
    .sort((a, b) => b.reviewScore - a.reviewScore)
    .slice(0, 20); // Limit to top 20 for performance

  // Paginated subset
  const paginatedRackets = uniqueRackets.slice(
    page * ITEMS_PER_PAGE,
    (page + 1) * ITEMS_PER_PAGE,
  );

  // Pagination controls
  const totalPages = Math.ceil(uniqueRackets.length / ITEMS_PER_PAGE);
  const canGoPrev = page > 0;
  const canGoNext = page < totalPages - 1;

  return (
    <section className="py-2 bg-white">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Header */}
        <div className="space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold italic text-slate-900">
            Your style. Your racket.
          </h2>
          <p className="text-lg text-slate-600">
            Find rackets engineered for the way you play
          </p>
        </div>

        {/* Playstyle Capsule Filters */}
        {/* <div className="flex gap-2 mt-4 overflow-x-auto pb-2 ml-6">
          <button
            onClick={() => setSelectedPlaystyle("smash")}
            className={`
              px-6 py-3 rounded-full font-semibold text-sm whitespace-nowrap
              transition-all duration-300
              ${
                selectedPlaystyle === "smash"
                  ? "bg-red-500 text-white shadow-lg scale-105"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }
            `}
          >
            Smash-Focused
          </button>

          <button
            onClick={() => setSelectedPlaystyle("control")}
            className={`
              px-6 py-3 rounded-full font-semibold text-sm whitespace-nowrap
              transition-all duration-300
              ${
                selectedPlaystyle === "control"
                  ? "bg-blue-500 text-white shadow-lg scale-105"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }
            `}
          >
            Control-Focused
          </button>

          <button
            onClick={() => setSelectedPlaystyle("speed")}
            className={`
              px-6 py-3 rounded-full font-semibold text-sm whitespace-nowrap
              transition-all duration-300
              ${
                selectedPlaystyle === "speed"
                  ? "bg-purple-500 text-white shadow-lg scale-105"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }
            `}
          >
            Speed
          </button>
        </div> */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2 ml-6">
          <button
            onClick={() => setSelectedPlaystyle("smash")}
            className={`
      px-6 py-3 rounded-full font-medium text-sm whitespace-nowrap
      transition-all duration-200
      border
      ${
        selectedPlaystyle === "smash"
          ? "border-black text-black bg-red-200"
          : "border-transparent text-slate-600 bg-slate-100 hover:border-slate-300"
      }
    `}
          >
            Smash-Focused
          </button>

          <button
            onClick={() => setSelectedPlaystyle("control")}
            className={`
      px-6 py-3 rounded-full font-medium text-sm whitespace-nowrap
      transition-all duration-200
      border
      ${
        selectedPlaystyle === "control"
          ? "border-black text-black bg-blue-200"
          : "border-transparent text-slate-600 bg-slate-100 hover:border-slate-300"
      }
    `}
          >
            Control-Focused
          </button>

          <button
            onClick={() => setSelectedPlaystyle("speed")}
            className={`
      px-6 py-3 rounded-full font-medium text-sm whitespace-nowrap
      transition-all duration-200
      border
      ${
        selectedPlaystyle === "speed"
          ? "border-black text-black bg-yellow-200"
          : "border-transparent text-slate-600 bg-slate-100 hover:border-slate-300"
      }
    `}
          >
            Speed
          </button>
        </div>

        {/* Horizontal Carousel */}
        <div className="relative mt-6">
          {/* Left Arrow */}
          {canGoPrev && (
            <button
              onClick={() => setPage((p) => p - 1)}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white hover:bg-slate-50 text-slate-700 p-2.5 rounded-full shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* Cards Container */}
          <div
            key={`${selectedPlaystyle}-${page}`}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fadeIn"
          >
            {paginatedRackets.map((racket) => (
              <CompactRacketCard key={racket.id} racket={racket} />
            ))}
          </div>

          {/* Right Arrow */}
          {canGoNext && (
            <button
              onClick={() => setPage((p) => p + 1)}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white hover:bg-slate-50 text-slate-700 p-2.5 rounded-full shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next page"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Pagination Indicator */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-1.5 mt-4">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setPage(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === page
                    ? "bg-emerald-600 w-6"
                    : "bg-slate-300 hover:bg-slate-400"
                }`}
                aria-label={`Go to page ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* View All Link */}
        <div className="text-center mt-4">
          <a
            href={`/rackets/playStyles=${PLAYSTYLE_TO_META[selectedPlaystyle]}`}
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
          >
            View all {PLAYSTYLE_TO_META[selectedPlaystyle]} rackets
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
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
