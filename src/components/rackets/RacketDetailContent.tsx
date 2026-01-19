"use client";

import { Racket } from "@/types/racket";
import { Player } from "@/data/players";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

const formatKebab = (value: string) =>
  value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const getRatingLabel = (score: number): string => {
  if (score >= 4.5) return "ELITE RATING";
  if (score >= 4.0) return "PRO RATING";
  return "PREMIUM RATING";
};

const getPlayerRole = (player: Player): string => {
  // Generate role based on player category and play style
  if (
    player.category === "mens-singles" ||
    player.category === "womens-singles"
  ) {
    if (player.playStyle.includes("power")) return "POWER SPECIALIST";
    if (player.playStyle.includes("control")) return "CONTROL EXPERT";
    return "SINGLES CHAMPION";
  }
  if (
    player.category === "mens-doubles" ||
    player.category === "womens-doubles"
  ) {
    return "DOUBLES MASTER";
  }
  return "PRO PLAYER";
};

/**
 * Get similar rackets based on similarity criteria
 * PRIMARY: Same playerLevel (required)
 * SECONDARY: At least ONE of: same bestFor (any overlap), same balance, same weight
 * PRICE: Within ±20% of current racket
 */
function getSimilarRackets(
  currentRacket: Racket,
  allRackets: Racket[]
): Racket[] {
  const priceMin = currentRacket.price * 0.8;
  const priceMax = currentRacket.price * 1.2;

  const similar = allRackets
    .filter((r) => {
      // Exclude current racket
      if (r.id === currentRacket.id) return false;

      // PRIMARY MATCH: Same playerLevel (required)
      if (r.playerLevel !== currentRacket.playerLevel) return false;

      // PRICE CONSTRAINT: Within ±20%
      if (r.price < priceMin || r.price > priceMax) return false;

      // SECONDARY MATCH: At least ONE must match
      const hasBestForOverlap = r.bestFor.some((bf) =>
        currentRacket.bestFor.includes(bf)
      );
      const hasSameBalance = r.balance === currentRacket.balance;
      const hasSameWeight = r.weight === currentRacket.weight;

      return hasBestForOverlap || hasSameBalance || hasSameWeight;
    })
    .sort((a, b) => {
      // Sort by relevance: more matches = higher priority
      const scoreA = calculateSimilarityScore(currentRacket, a);
      const scoreB = calculateSimilarityScore(currentRacket, b);
      return scoreB - scoreA;
    })
    // Remove any duplicates by ID to avoid React key collisions
    .reduce<Racket[]>((acc, racket) => {
      if (!acc.find((item) => item.id === racket.id)) {
        acc.push(racket);
      }
      return acc;
    }, [])
    .slice(0, 4); // Max 4 rackets (after de-duplication)

  return similar;
}

/**
 * Calculate similarity score for sorting
 * Higher score = more similar
 */
function calculateSimilarityScore(current: Racket, candidate: Racket): number {
  let score = 0;

  // BestFor overlap (each match = +2)
  const bestForMatches = candidate.bestFor.filter((bf) =>
    current.bestFor.includes(bf)
  ).length;
  score += bestForMatches * 2;

  // Same balance (+3)
  if (candidate.balance === current.balance) score += 3;

  // Same weight (+3)
  if (candidate.weight === current.weight) score += 3;

  // Same brand (+1)
  if (candidate.brand === current.brand) score += 1;

  return score;
}

export type RacketDetailContentProps = {
  racket: Racket;
  associatedPlayers: Player[];
  allRackets: Racket[];
};

// Component for expandable description
function ExpandableDescription({ description }: { description: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showToggle, setShowToggle] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (textRef.current) {
      // Check if content height exceeds 2 lines
      // Compare scrollHeight (full content) with clientHeight (visible content)
      const lineHeight = parseFloat(
        getComputedStyle(textRef.current).lineHeight
      );
      const twoLineHeight = lineHeight * 2;

      // Temporarily remove line-clamp to measure full height
      const originalClass = textRef.current.className;
      textRef.current.classList.remove("line-clamp-2");
      const fullHeight = textRef.current.scrollHeight;
      textRef.current.className = originalClass;

      if (fullHeight > twoLineHeight) {
        setShowToggle(true);
      }
    }
  }, [description]);

  return (
    <div className="space-y-2">
      <p
        ref={textRef}
        className={`text-white/80 text-sm leading-relaxed transition-all duration-300 ${
          !isExpanded && showToggle ? "line-clamp-2" : ""
        }`}
      >
        {description}
      </p>
      {showToggle && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors flex items-center gap-1 mt-1"
        >
          {isExpanded ? (
            <>
              <span>Show less</span>
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </>
          ) : (
            <>
              <span>Show more</span>
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </>
          )}
        </button>
      )}
    </div>
  );
}

export default function RacketDetailContent({
  racket,
  associatedPlayers,
  allRackets,
}: RacketDetailContentProps) {
  const router = useRouter();

  // Use actual description if available, otherwise generate from pros
  const description =
    racket.description ||
    (racket.pros.length > 0
      ? racket.pros[0] +
        (racket.pros.length > 1 ? ` ${racket.pros.slice(1).join(". ")}.` : ".")
      : `Premium ${racket.brand} racket designed for ${racket.playerLevel} players.`);

  // Get similar rackets
  const similarRackets = getSimilarRackets(racket, allRackets);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Back Navigation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-5xl mx-auto px-4 pt-6 pb-3"
      >
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors group"
        >
          <svg
            className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="font-medium">Back to Search Results</span>
        </button>
      </motion.div>

      <main className="max-w-5xl mx-auto px-4 pb-12">
        {/* Hero Product Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 pt-4">
          {/* Left - Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center relative"
          >
            <div className="relative w-full max-w-sm  ">
              {/* Radial glow effect */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.3),transparent_70%)] rounded-xl blur-xl -z-10"></div>
              {/* Image container */}
              <div className="relative bg-slate-900/80 backdrop-blur-md rounded-xl p-4 border border-slate-800/50 shadow-lg aspect-square flex items-center justify-center">
                <motion.img
                  src={racket.imageUrl}
                  alt={racket.name}
                  className="w-full h-full object-contain drop-shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </motion.div>

          {/* Right - Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col justify-center space-y-6"
          >
            {/* Rating Badge - Top Right */}
            <div className="flex justify-end">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-500/30 flex items-center gap-1.5"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {racket.reviewScore}/5 {getRatingLabel(racket.reviewScore)}
              </motion.span>
            </div>

            {/* Brand */}
            {/* <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-white/60 font-bold text-xs uppercase tracking-[0.15em]"
            >
              {racket.brand.toUpperCase()}
            </motion.p> */}

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl md:text-3xl lg:text-4xl font-black leading-tight"
            >
              <span className="text-white">{racket.brand.toUpperCase()}</span>
              <br />
              <span className="text-emerald-400">
                {racket.name.replace(racket.brand, "").trim().toUpperCase()}
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-white/60 font-bold text-xs uppercase tracking-[0.15em]"
            >
              {racket.brand.toUpperCase()}
            </motion.p>
            {/* Description - moved below price */}

            {/* Attribute Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-2"
            >
              <span className="px-3 py-2 rounded-lg bg-slate-900/50 border border-slate-800 text-xs font-semibold uppercase tracking-wide backdrop-blur-sm">
                <span className="text-white/60">WEIGHT</span>{" "}
                <span className="text-white">{racket.weight}</span>
              </span>
              <span className="px-3 py-2 rounded-lg bg-slate-900/50 border border-slate-800 text-xs font-semibold uppercase tracking-wide backdrop-blur-sm">
                <span className="text-white/60">BALANCE</span>{" "}
                <span className="text-white">
                  {formatKebab(racket.balance).toUpperCase()}
                </span>
              </span>
              <span className="px-3 py-2 rounded-lg bg-slate-900/50 border border-slate-800 text-xs font-semibold uppercase tracking-wide backdrop-blur-sm">
                <span className="text-white/60">FLEX</span>{" "}
                <span className="text-white">
                  {formatKebab(racket.flex).toUpperCase()}
                </span>
              </span>
            </motion.div>

            {/* Price */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="space-y-1"
            >
              <p className="text-white/60 text-xs uppercase tracking-wide">
                PRICE
              </p>
              <p className="text-xl font-black text-white">
                ₹{racket.price.toLocaleString()}
              </p>
            </motion.div>

            {/* Description - Below Price */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 }}
              className="space-y-2 max-w-lg"
            >
              <p className="text-white/60 text-xs uppercase tracking-wide">
                DESCRIPTION
              </p>
              <ExpandableDescription description={description} />
            </motion.div>

            {/* Primary CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <a
                href={racket.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center w-full md:w-auto px-6 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/40 hover:scale-105"
              >
                Add to Arsenal
              </a>
            </motion.div>
          </motion.div>
        </section>

        {/* Player Association Section - ONLY if players exist */}
        {associatedPlayers.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
              <h2 className="text-lg font-black uppercase tracking-wider whitespace-nowrap">
                Trusted by Professionals
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {associatedPlayers.map((player, index) => (
                <motion.div
                  key={player.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Link
                    href={`/players/${player.id}`}
                    className="group block relative p-4 rounded-xl bg-slate-900/50 border border-slate-800/50 hover:border-emerald-500/50 transition-all backdrop-blur-sm overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative">
                      <p className="text-emerald-400/60 text-xs font-bold uppercase tracking-widest mb-1">
                        {getPlayerRole(player)}
                      </p>
                      <p className="text-base font-black text-white group-hover:text-emerald-400 transition-colors">
                        {player.name.toUpperCase()}
                      </p>
                      <p className="text-xs text-white/60 mt-1">
                        {player.country}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Pros / Cons & Best For Section */}
        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            {/* Pros Card - "THE EDGE" */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group relative p-6 rounded-xl bg-slate-900/50 border border-emerald-500/20 backdrop-blur-sm hover:border-emerald-500/40 transition-all"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-emerald-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-black text-lg uppercase tracking-wide">
                  The Edge
                </h3>
              </div>
              <ul className="space-y-3">
                {racket.pros.map((pro, index) => (
                  <motion.li
                    key={pro}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 text-white/90 text-sm"
                  >
                    <span className="text-emerald-400 font-black text-base">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1">{pro}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Cons Card - "LIMITS" */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group relative p-6 rounded-xl bg-slate-900/50 border border-rose-500/20 backdrop-blur-sm hover:border-rose-500/40 transition-all"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-rose-500/20 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-rose-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <h3 className="font-black text-lg uppercase tracking-wide">
                  Limits
                </h3>
              </div>
              <ul className="space-y-3">
                {racket.cons.map((con, index) => (
                  <motion.li
                    key={con}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 text-white/90 text-sm"
                  >
                    <span className="text-rose-400 font-black text-base">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1">{con}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Best For Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {racket.bestFor.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative p-6 rounded-xl bg-slate-900/50 border border-slate-800/50 hover:border-emerald-500/30 transition-all backdrop-blur-sm overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <h4 className="font-black text-base uppercase tracking-wide mb-2 text-white">
                    {formatKebab(item).toUpperCase()}
                  </h4>
                  <p className="text-white/70 text-xs leading-relaxed">
                    {item === "power"
                      ? "Engineered for steep, explosive downward force."
                      : item === "control"
                      ? "Tactical baseline command with effortless clears."
                      : item === "speed"
                      ? "Lightning-fast reactions and rapid court coverage."
                      : `Optimized for ${formatKebab(
                          item
                        ).toLowerCase()} play style.`}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Similar Rackets Section - ONLY if 2+ similar rackets exist */}
        {similarRackets.length >= 2 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
              <h2 className="text-lg font-black uppercase tracking-wider whitespace-nowrap">
                Similar Rackets You May Like
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {similarRackets.map((similarRacket, index) => (
                <motion.div
                  key={similarRacket.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Link
                    href={`/rackets/${similarRacket.id}`}
                    className="group block relative p-4 rounded-xl bg-slate-900/50 border border-slate-800/50 hover:border-emerald-500/50 transition-all backdrop-blur-sm overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative">
                      {/* Image */}
                      <div className="relative w-full aspect-square mb-3 bg-slate-800/50 rounded-lg overflow-hidden">
                        <img
                          src={similarRacket.imageUrl}
                          alt={similarRacket.name}
                          className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      {/* Name */}
                      <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors mb-1 line-clamp-2">
                        {similarRacket.name}
                      </h3>
                      {/* Price */}
                      <p className="text-xs text-emerald-400 font-semibold mb-2">
                        ₹{similarRacket.price.toLocaleString()}
                      </p>
                      {/* Rating */}
                      {similarRacket.reviewScore && (
                        <div className="flex items-center gap-1 mb-2">
                          <svg
                            className="w-3 h-3 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-xs text-white/70">
                            {similarRacket.reviewScore}
                          </span>
                        </div>
                      )}
                      {/* Best For Tags */}
                      <div className="flex flex-wrap gap-1">
                        {similarRacket.bestFor.slice(0, 2).map((bf) => (
                          <span
                            key={bf}
                            className="px-2 py-0.5 rounded text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          >
                            {formatKebab(bf)}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Footer Quote Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center py-10 border-t border-slate-800"
        >
          {/* <p className="text-lg md:text-xl font-light italic leading-relaxed text-white/90 mb-4">
            Chosen by{" "}
            <span className="font-bold not-italic">professionals</span>.
            Designed for{" "}
            <span className="font-bold not-italic text-emerald-400">
              serious players
            </span>
            .
          </p> */}
          {/* <div className="flex flex-wrap justify-center gap-4 text-xs text-white/60 uppercase tracking-wider">
            <span>BWF Approved</span>
            <span>•</span>
            <span>{racket.brand} Certified</span>
            <span>•</span>
            <span>Pro Series</span>
          </div> */}
        </motion.section>
      </main>
    </div>
  );
}
