"use client";

// import { useState, useEffect } from "react";
// import rackets from "@/data/rackets.json";
// import Link from "next/link";
// import { Racket } from "@/types/racket";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// // Weight types
// type WeightKey = "3U" | "4U" | "5U";

// const ITEMS_PER_PAGE = 4;

// export default function WeightGuide() {
//   const [selectedWeight, setSelectedWeight] = useState<WeightKey>("4U");
//   const [page, setPage] = useState(0);

//   useEffect(() => {
//     setPage(0);
//   }, [selectedWeight]);

//   // Filter by weight
//   const filteredRackets = (rackets as Racket[]).filter(
//     (racket) => racket.weight === selectedWeight,
//   );

//   // Deduplicate + sort
//   const uniqueRackets = Array.from(
//     new Map(filteredRackets.map((r) => [r.id, r])).values(),
//   ).slice(0, 20);

//   const paginatedRackets = uniqueRackets.slice(
//     page * ITEMS_PER_PAGE,
//     (page + 1) * ITEMS_PER_PAGE,
//   );

//   const totalPages = Math.ceil(uniqueRackets.length / ITEMS_PER_PAGE);
//   const canGoPrev = page > 0;
//   const canGoNext = page < totalPages - 1;

//   return (
//     <section className="py-10 bg-white">
//       <div className="max-w-[1400px] mx-auto px-6">
//         {/* RIGHT-ALIGNED HEADER */}
//         <div className="flex flex-col   space-y-2">
//           <h2 className="text-3xl md:text-4xl font-bold italic text-slate-900">
//             Find Your Perfect Weight
//           </h2>
//           <p className="text-med text-slate-600 max-w-2xl">
//             Choose the racket weight that matches your strength, speed, and
//             playing style , from lightning-fast to power-packed.
//           </p>
//         </div>

//         {/* RIGHT-ALIGNED WEIGHT FILTERS */}
//         <div className="flex  gap-2 mt-4 overflow-x-auto pb-2">
//           {(["3U", "4U", "5U"] as WeightKey[]).map((weight) => (
//             <button
//               key={weight}
//               onClick={() => setSelectedWeight(weight)}
//               className={`
//                 px-6 py-3 rounded-full font-medium text-sm whitespace-nowrap
//                 transition-all duration-200 border
//                 ${
//                   selectedWeight === weight
//                     ? "border-black border-2 text-black bg-slate-100"
//                     : "border-transparent text-slate-600 bg-slate-100 hover:border-slate-300"
//                 }
//               `}
//             >
//               {weight} Weight
//             </button>
//           ))}
//         </div>

//         {/* CAROUSEL */}
//         <div className="relative mt-6">
//           {canGoPrev && (
//             <button
//               onClick={() => setPage((p) => p - 1)}
//               className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white hover:bg-slate-50 text-slate-700 p-2.5 rounded-full shadow-lg"
//             >
//               <ChevronLeft className="w-5 h-5" />
//             </button>
//           )}

//           <div
//             key={`${selectedWeight}-${page}`}
//             className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fadeIn"
//           >
//             {paginatedRackets.map((racket) => (
//               <Link
//                 key={racket.id}
//                 href={`/rackets/${racket.id}`}
//                 className="bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition"
//               >
//                 <div className="h-36 bg-slate-50 flex items-center justify-center">
//                   <img
//                     src={racket.imageUrl}
//                     alt={racket.name}
//                     className="h-full object-contain p-2"
//                   />
//                 </div>
//                 <div className="p-3">
//                   <h3 className="text-sm font-medium text-slate-900 line-clamp-2">
//                     {racket.name}
//                   </h3>
//                   <p className="text-xs text-slate-500">{racket.brand}</p>
//                   <p className="text-emerald-600 font-bold mt-1">
//                     ₹{racket.price.toLocaleString()}
//                   </p>
//                 </div>
//               </Link>
//             ))}
//           </div>

//           {canGoNext && (
//             <button
//               onClick={() => setPage((p) => p + 1)}
//               className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white hover:bg-slate-50 text-slate-700 p-2.5 rounded-full shadow-lg"
//             >
//               <ChevronRight className="w-5 h-5" />
//             </button>
//           )}
//         </div>

//         {/* VIEW ALL */}
//         <div className="flex justify-center mt-4">
//           <a
//             href={`/rackets/${selectedWeight}`}
//             className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold"
//           >
//             View all {selectedWeight} rackets →
//           </a>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         .animate-fadeIn {
//           animation: fadeIn 0.4s ease-out;
//         }
//       `}</style>
//     </section>
//   );
// }

import { useState, useEffect } from "react";
import rackets from "@/data/rackets.json";
import Link from "next/link";
import { Racket } from "@/types/racket";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Weight types
type WeightKey = "3U" | "4U" | "5U";

const ITEMS_PER_PAGE = 4;

// ✅ helper for capitalization (same as PlayStyleGuide)
const formatLabel = (value: string) =>
  value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("-");

// Same tag colors
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

export default function WeightGuide() {
  const [selectedWeight, setSelectedWeight] = useState<WeightKey>("3U");
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [selectedWeight]);

  const filteredRackets = (rackets as Racket[]).filter(
    (racket) => racket.weight === selectedWeight,
  );

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
    <section className="bg-white pb-12 md:pb-24 lg:pb-36">
      <div className="w-full px-4 md:px-6">
        {/* Header */}
        <div className="space-y-1 md:space-y-2">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900">
            Find Your Perfect Weight
          </h2>
          <p className="text-sm md:text-med text-slate-600 max-w-2xl">
            Choose the racket weight that matches your strength, speed, and
            playing style — from lightning-fast to power-packed.
          </p>
        </div>

        {/* Weight Filters */}
        <div className="flex gap-2 mt-3 md:mt-4 overflow-x-auto pb-2 scrollbar-hide">
          {(["3U", "4U", "5U"] as WeightKey[]).map((weight) => (
            <button
              key={weight}
              onClick={() => setSelectedWeight(weight)}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-medium text-xs md:text-sm whitespace-nowrap transition-all duration-200 border ${
                selectedWeight === weight
                  ? "border-black border-2 text-black bg-slate-200"
                  : "border-transparent text-slate-600 bg-slate-100 hover:border-slate-300"
              }`}
            >
              {weight} Weight
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="relative mt-4 md:mt-6">
          {canGoPrev && (
            <button
              onClick={() => setPage((p) => p - 1)}
              className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white border border-slate-200 p-2.5 rounded-full shadow-lg hover:shadow-xl transition-shadow"
            >
              <ChevronLeft className="w-5 h-5 text-slate-300" />
            </button>
          )}

          <div
            key={`${selectedWeight}-${page}`}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 animate-fadeIn"
          >
            {paginatedRackets.map((racket) => (
              <Link
                key={racket.id}
                href={`/rackets/${racket.id}`}
                className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 block border border-slate-200 hover:border-emerald-300 hover:-translate-y-0.5"
              >
                {/* Image */}
                <div className="h-44 bg-slate-50 relative overflow-hidden">
                  <img
                    src={racket.imageUrl}
                    alt={racket.name}
                    className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-3 space-y-2">
                  <div>
                    <h3 className="text-sm font-medium leading-tight text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2">
                      {racket.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5 uppercase tracking-wide">
                      {racket.brand}
                    </p>
                  </div>

                  <div>
                    <span className="text-base font-bold text-slate-600">
                      ₹{racket.price.toLocaleString()}
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    <span
                      className={`px-2 py-0.5 text-xs font-medium rounded-full border ${levelColor[racket.playerLevel]}`}
                    >
                      {formatLabel(racket.playerLevel)}
                    </span>

                    <span
                      className={`px-2 py-0.5 text-xs font-medium rounded-full border ${
                        balanceColor[racket.balance] ||
                        "bg-slate-50 text-slate-700 border-slate-200"
                      }`}
                    >
                      {formatLabel(racket.balance)}
                    </span>
                  </div>

                  {/* Why */}
                  {racket.bestFor?.length > 0 && (
                    <div className="pt-1.5 border-t border-slate-100">
                      <p className="text-xs text-slate-600 leading-snug">
                        <span className="font-medium text-slate-700">
                          Why:{" "}
                        </span>
                        {racket.bestFor.slice(0, 2).map(formatLabel).join(", ")}
                      </p>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {canGoNext && (
            <button
              onClick={() => setPage((p) => p + 1)}
              className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white border border-slate-200 p-2.5 rounded-full shadow-lg hover:shadow-xl transition-shadow"
            >
              <ChevronRight className="w-5 h-5 text-slate-300" />
            </button>
          )}
        </div>

        {/* View All */}
        <div className="flex justify-center mt-3 md:mt-4">
          <a
            href={`/rackets/${selectedWeight}`}
            className="inline-flex items-center gap-2 text-sm md:text-base text-emerald-600 hover:text-emerald-700 font-semibold"
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
