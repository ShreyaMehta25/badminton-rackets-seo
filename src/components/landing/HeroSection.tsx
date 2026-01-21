"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import rackets from "@/data/rackets.json";

export default function HeroSection() {
  // Get top-rated racket for hero image
  const heroRacket = rackets
    .sort((a, b) => b.reviewScore - a.reviewScore)[0];

  return (
    <section className="relative min-h-[105vh] flex flex-col bg-[linear-gradient(180deg,#F8FAFC_0%,#CBD5E1_55%,#F8FAFC_100%)] overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(16,185,129,0.08),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(16,185,129,0.06),transparent_40%)]" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        // style={{
        //   backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg fill='%23000000'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        // }}
      />

      {/* Header – DARK */}
      <header className="relative z-10 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-5">
          <Link
            href="/"
            className="text-white text-xl font-bold tracking-tight"
          >
            Best Badminton Rackets Directory
          </Link>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-6xl mx-auto px-6 text-center z-10 relative">
        {/* Hero Racket Image (Desktop) */}
        {heroRacket && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 pointer-events-none"
          >
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-transparent rounded-full blur-3xl" />
              <img
                src={heroRacket.imageUrl}
                alt={heroRacket.name}
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </div>
          </motion.div>
        )}

        {/* Headline – slightly smaller */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.15] tracking-tight text-slate-800 mb-6 max-w-3xl"
        >
          Find the Perfect{" "}
          <span className="text-emerald-400">Badminton Racket</span>
          <br className="hidden sm:block" />
          for Your Playing Style
        </motion.h1>

        {/* Subheadline – higher contrast */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed mb-10"
        >
          Expert-curated badminton rackets analyzed by weight, balance,
          flexibility, and skill level — helping you choose with confidence.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center mb-16"
        >
          <Link
            href="/rackets"
            className="group h-14 px-10 rounded-xl bg-emerald-600 text-white font-semibold text-lg hover:bg-emerald-700 transition-all duration-300 shadow-lg shadow-emerald-600/25 hover:shadow-xl hover:shadow-emerald-600/30 flex items-center gap-2"
          >
            Find My Ideal Racket
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </motion.div>

        {/* Stats row (kept) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto"
        >
          {[
            { value: "50+", label: "Racket Models" },
            { value: "7", label: "Top Brands" },
            { value: "4.8", label: "Avg Rating" },
            { value: "100%", label: "Expert Verified" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-slate-800">
                {stat.value}
              </div>
              <div className="text-sm text-slate-700 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
