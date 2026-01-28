"use client";

// // import { motion } from "framer-motion";
// // import rackets from "@/data/rackets.json";
// // import { Racket } from "@/types/racket";
// // import RacketCarousel from "./RacketCarousel";

// // export default function ExpertPicks() {
// //   // Get top-rated rackets (4.5+ rating)
// //   const expertPicks = Array.from(
// //     new Map(
// //       (rackets as Racket[])
// //         .filter((r) => r.reviewScore >= 4.5)
// //         .map((r) => [r.id, r]), // or r.slug if available
// //     ).values(),
// //   )
// //     .sort((a, b) => b.reviewScore - a.reviewScore)
// //     .slice(0, 10);

// //   if (expertPicks.length === 0) return null;

// //   return (
// //     <section className="py-12 bg-slate-50">
// //       <div className="max-w-[1400px] mx-auto px-6 space-y-6">
// //         {/* Section Header */}
// //         <motion.div
// //           initial={{ opacity: 0, y: 20 }}
// //           whileInView={{ opacity: 1, y: 0 }}
// //           viewport={{ once: true }}
// //           transition={{ duration: 0.5 }}
// //         >
// //           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-sm font-semibold mb-3">
// //             <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
// //               <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
// //             </svg>
// //             Editor's Choice
// //           </div>
// //           <h2 className="text-3xl md:text-4xl font-bold italic text-slate-900 mb-3">
// //             Expert Picks & Top Recommendations
// //           </h2>
// //           <p className="text-lg text-slate-600">
// //             Top-rated rackets with 4.5+ stars. Hand-selected for exceptional
// //             performance and value.
// //           </p>
// //         </motion.div>

// //         {/* Expert Picks Carousel */}
// //         <RacketCarousel
// //           rackets={expertPicks}
// //           showPagination={true}
// //           cardsPerView={{ desktop: 4, tablet: 2, mobile: 1.5 }}
// //         />
// //       </div>
// //     </section>
// //   );
// // }

// import { motion } from "framer-motion";
// import rackets from "@/data/rackets.json";
// import { Racket } from "@/types/racket";
// import RacketCarousel from "./RacketCarousel";

// export default function ExpertPicks() {
//   const expertPicks = Array.from(
//     new Map(
//       (rackets as Racket[])
//         .filter((r) => r.reviewScore >= 4.5)
//         .map((r) => [r.id, r]),
//     ).values(),
//   )
//     .sort((a, b) => b.reviewScore - a.reviewScore)
//     .slice(0, 10);

//   if (expertPicks.length === 0) return null;

//   return (
//     <section className="py-10 bg-slate-50">
//       <div className="max-w-[1400px] mx-auto px-6 space-y-5">
//         {/* Section Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 16 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.45 }}
//         >
//           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-sm font-semibold mb-2">
//             <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//               <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//             </svg>
//             Editor’s Choice
//           </div>

//           <h2 className="text-3xl md:text-[2.2rem] font-bold italic text-slate-900 mb-2">
//             Expert Picks & Top Recommendations
//           </h2>

//           <p className="text-base text-slate-600 max-w-3xl">
//             Top-rated rackets with 4.5+ stars. Hand-selected for exceptional
//             performance and value.
//           </p>
//         </motion.div>

//         {/* Carousel */}
//         <RacketCarousel
//           rackets={expertPicks}
//           showPagination
//           cardsPerView={{
//             desktop: 4, // 👈 key change: visually shortens cards
//             tablet: 2,
//             mobile: 1.5,
//           }}
//           // className="mt-2"
//         />
//       </div>
//     </section>
//   );
// }

import { useState } from "react";
import rackets from "@/data/rackets.json";
import Link from "next/link";
import { Racket } from "@/types/racket";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* ---------- constants ---------- */

const ITEMS_PER_PAGE = 4;

/* ---------- helpers ---------- */

const formatLabel = (value: string) =>
  value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("-");

/* ---------- compact card ---------- */

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
      className="group bg-white rounded-lg overflow-hidden shadow-sm  hover:shadow-md  duration-300 block border border-slate-200 hover:border-emerald-300hover:shadow-md transition-all hover:-translate-y-0.5"
    >
      {/* Image */}
      <div className="h-44 bg-slate-50 flex items-center justify-center">
        <img
          src={racket.imageUrl}
          alt={racket.name}
          className="h-full object-contain p-2 group-hover:scale-105 transition-transform"
        />
      </div>

      {/* Content */}
      <div className="p-3 space-y-2">
        <h3 className="text-sm font-medium leading-tight  text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2">
          {racket.name}
        </h3>

        <p className="text-xs uppercase tracking-wide text-slate-500">
          {racket.brand}
        </p>

        <div className="text-base font-bold text-slate-600">
          ₹{racket.price.toLocaleString()}
        </div>

        <div className="flex flex-wrap gap-1">
          <span
            className={`px-2 py-0.5 text-xs rounded-full border ${levelColor[racket.playerLevel]}`}
          >
            {formatLabel(racket.playerLevel)}
          </span>

          <span
            className={`px-2 py-0.5 text-xs rounded-full border ${
              balanceColor[racket.balance] ??
              "bg-slate-50 text-slate-700 border-slate-200"
            }`}
          >
            {formatLabel(racket.balance)}
          </span>
        </div>

        {racket.bestFor?.length > 0 && (
          <p className="text-xs text-slate-600 pt-1 border-t border-slate-100">
            <span className="font-medium">Why:</span>{" "}
            {racket.bestFor.slice(0, 2).map(formatLabel).join(", ")}
          </p>
        )}
      </div>
    </Link>
  );
}

/* ---------- Expert Picks ---------- */

export default function ExpertPicks() {
  const [page, setPage] = useState(0);

  const expertPicks = Array.from(
    new Map(
      (rackets as Racket[])
        .filter((r) => r.reviewScore >= 4.5)
        .map((r) => [r.id, r]),
    ).values(),
  )
    .sort((a, b) => b.reviewScore - a.reviewScore)
    .slice(0, 20);

  if (expertPicks.length === 0) return null;

  const totalPages = Math.ceil(expertPicks.length / ITEMS_PER_PAGE);

  const paginated = expertPicks.slice(
    page * ITEMS_PER_PAGE,
    (page + 1) * ITEMS_PER_PAGE,
  );

  return (
    <section className="py-12 md:py-24 lg:py-36 bg-white">
      <div className="px-4 md:px-6">
        {/* Header */}
        <div className="mb-4 md:mb-6">
          <div className="inline-flex items-center gap-2 px-2.5 md:px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs md:text-sm font-semibold mb-2">
            ★ Editor's Choice
          </div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900">
            Expert Picks & Top Recommendations
          </h2>

          <p className="text-sm md:text-base text-slate-600 mt-1">
            Top-rated rackets with 4.5+ stars. Hand-selected for exceptional
            performance and value.
          </p>
        </div>

        {/* Cards + arrows */}
        <div className="relative mt-4 md:mt-6">
          {page > 0 && (
            <button
              onClick={() => setPage((p) => p - 1)}
              className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white border border-slate-200 p-2 rounded-full shadow hover:shadow-lg transition-shadow"
            >
              <ChevronLeft className="w-5 h-5 text-slate-300" />
            </button>
          )}

          <div
            key={page}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 animate-fadeIn"
          >
            {paginated.map((racket) => (
              <CompactRacketCard key={racket.id} racket={racket} />
            ))}
          </div>

          {page < totalPages - 1 && (
            <button
              onClick={() => setPage((p) => p + 1)}
              className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white border border-slate-200 p-2 rounded-full shadow hover:shadow-lg transition-shadow"
            >
              <ChevronRight className="w-5 h-5 text-slate-300" />
            </button>
          )}
        </div>

        {/* Dots */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-1.5 md:gap-2 mt-3 md:mt-4">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`h-2 rounded-full transition-all ${
                  i === page
                    ? "bg-emerald-600 w-6 md:w-8"
                    : "bg-slate-300 hover:bg-slate-400 w-2"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.35s ease-out;
        }
      `}</style>
    </section>
  );
}
