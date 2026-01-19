"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import rackets from "@/data/rackets.json";
import { Racket } from "@/types/racket";

// Get top-rated rackets from the data
const getExpertPicks = (): (Racket & { expertNote: string; idealFor: string })[] => {
  const allRackets = rackets as Racket[];
  
  // Select diverse expert picks - top rated from different categories
  const picks = [
    {
      racket: allRackets.find(r => r.id === "yonex-astrox-100zz"),
      expertNote: "The gold standard for power players. Used by Viktor Axelsen.",
      idealFor: "Advanced players seeking maximum smash power",
    },
    {
      racket: allRackets.find(r => r.id === "yonex-nanoflare-1000z"),
      expertNote: "Fastest racket in its class. Record-breaking shuttle speed.",
      idealFor: "Speed-focused players and doubles specialists",
    },
    {
      racket: allRackets.find(r => r.playerLevel === "intermediate" && r.price < 8000),
      expertNote: "Best value for developing players. Great all-round performance.",
      idealFor: "Intermediate players on a budget",
    },
    {
      racket: allRackets.find(r => r.playerLevel === "beginner"),
      expertNote: "Perfect entry point. Forgiving sweet spot and easy handling.",
      idealFor: "New players learning the fundamentals",
    },
  ].filter(p => p.racket) as { racket: Racket; expertNote: string; idealFor: string }[];

  return picks.map(p => ({ ...p.racket!, expertNote: p.expertNote, idealFor: p.idealFor }));
};

export default function ExpertPicks() {
  const expertPicks = getExpertPicks();

  if (expertPicks.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-sm font-semibold mb-4">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Editor's Choice
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Expert Picks & Top Recommendations
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Hand-selected rackets that consistently deliver exceptional performance. 
            These are our most recommended choices for 2026.
          </p>
        </motion.div>

        {/* Expert Picks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {expertPicks.map((pick, index) => (
            <motion.article
              key={pick.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <Link
                href={`/rackets/${pick.id}`}
                className="block h-full bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Image Container */}
                <div className="aspect-square bg-gradient-to-br from-slate-50 to-slate-100 relative overflow-hidden p-6">
                  <img
                    src={pick.imageUrl}
                    alt={pick.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 rounded-lg bg-white/90 backdrop-blur-sm shadow-sm">
                    <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm font-semibold text-slate-700">{pick.reviewScore}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Brand & Name */}
                  <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-1">
                    {pick.brand}
                  </p>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors line-clamp-1">
                    {pick.name}
                  </h3>

                  {/* Expert Note */}
                  <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                    {pick.expertNote}
                  </p>

                  {/* Specs Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-slate-100 text-slate-600">
                      {pick.weight}
                    </span>
                    <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-slate-100 text-slate-600">
                      {pick.balance}
                    </span>
                    <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-slate-100 text-slate-600">
                      {pick.playerLevel}
                    </span>
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-slate-900">
                      ₹{pick.price.toLocaleString()}
                    </span>
                    <span className="text-sm font-semibold text-emerald-600 group-hover:underline">
                      View Details →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
