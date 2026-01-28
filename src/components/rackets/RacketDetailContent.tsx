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

function calculateSimilarityScore(current: Racket, candidate: Racket): number {
  let score = 0;

  score +=
    candidate.bestFor.filter((bf) => current.bestFor.includes(bf)).length * 2;
  if (candidate.balance === current.balance) score += 3;
  if (candidate.weight === current.weight) score += 3;
  if (candidate.brand === current.brand) score += 1;

  return score;
}

function getSimilarRackets(
  currentRacket: Racket,
  allRackets: Racket[],
): Racket[] {
  const priceMin = currentRacket.price * 0.8;
  const priceMax = currentRacket.price * 1.2;

  return allRackets
    .filter((r) => {
      if (r.id === currentRacket.id) return false;
      if (r.playerLevel !== currentRacket.playerLevel) return false;
      if (r.price < priceMin || r.price > priceMax) return false;

      return (
        r.bestFor.some((bf) => currentRacket.bestFor.includes(bf)) ||
        r.balance === currentRacket.balance ||
        r.weight === currentRacket.weight
      );
    })
    .sort(
      (a, b) =>
        calculateSimilarityScore(currentRacket, b) -
        calculateSimilarityScore(currentRacket, a),
    )
    .filter((r, i, arr) => arr.findIndex((x) => x.id === r.id) === i)
    .slice(0, 4);
}

function ExpandableDescription({ description }: { description: string }) {
  const [expanded, setExpanded] = useState(false);
  const [showToggle, setShowToggle] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const lh = parseFloat(getComputedStyle(ref.current).lineHeight);
    const full = ref.current.scrollHeight;
    if (full > lh * 2) setShowToggle(true);
  }, [description]);

  return (
    <div className="space-y-1">
      <p
        ref={ref}
        className={`text-med text-slate-600 leading-relaxed ${
          !expanded && showToggle ? "line-clamp-2" : ""
        }`}
      >
        {description}
      </p>
      {showToggle && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-emerald-600 text-sm font-medium"
        >
          {expanded ? "Show less" : "Show more"}
        </button>
      )}
    </div>
  );
}

export default function RacketDetailContent({
  racket,
  associatedPlayers,
  allRackets,
}: {
  racket: Racket;
  associatedPlayers: Player[];
  allRackets: Racket[];
}) {
  const router = useRouter();
  const similarRackets = getSimilarRackets(racket, allRackets);

  return (
    <div className="bg-white text-slate-800">
      {/* Back */}
      <div className="w-full px-4 pt-4 pb-2">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm font-medium hover:text-emerald-600"
        >
          ← Back to Search Results
        </button>
      </div>

      <main className="w-full px-4 pb-6">
        {/* HERO */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="flex justify-center">
            <div className="w-full max-w-sm bg-slate-50 border border-slate-200 rounded-lg p-3">
              <div className="aspect-square flex items-center justify-center overflow-hidden">
                <img
                  src={racket.imageUrl}
                  alt={racket.name}
                  className="max-h-[80%] w-auto object-contain"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-end">
              <span className="px-3 py-1 text-xs font-bold bg-emerald-100 text-emerald-700 rounded-md">
                {racket.reviewScore}/5 {getRatingLabel(racket.reviewScore)}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold">
              {racket.brand} {racket.name.replace(racket.brand, "")}
            </h1>

            <div className="flex flex-wrap gap-2">
              {[
                `Weight: ${racket.weight}`,
                `Balance: ${formatKebab(racket.balance)}`,
                `Flex: ${formatKebab(racket.flex)}`,
              ].map((v) => (
                <span
                  key={v}
                  className="px-3 py-1 text-sm bg-slate-100 border border-slate-200 rounded-md"
                >
                  {v}
                </span>
              ))}
            </div>

            <div>
              <p className="text-xs uppercase text-slate-500">Price</p>
              <p className="text-xl font-bold text-emerald-600">
                ₹{racket.price.toLocaleString()}
              </p>
            </div>

            <ExpandableDescription
              description={
                racket.description ||
                `Premium ${racket.brand} racket for ${racket.playerLevel} players.`
              }
            />

            <a
              href={racket.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex justify-center px-6 py-2 rounded-md bg-emerald-600 text-white font-semibold hover:bg-emerald-500"
            >
              Add to Arsenal
            </a>
          </div>
        </section>

        {/* PLAYERS */}
        {associatedPlayers.length > 0 && (
          <section className="mb-8">
            <h2 className="text-sm font-bold uppercase mb-4 text-center">
              Trusted by Professionals
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {associatedPlayers.map((p) => (
                <Link
                  key={p.id}
                  href={`/players/${p.id}`}
                  className="p-3 border border-slate-200 rounded-md hover:border-emerald-300"
                >
                  <p className="text-xs text-emerald-600 font-semibold">
                    {getPlayerRole(p)}
                  </p>
                  <p className="font-bold">{p.name}</p>
                  <p className="text-xs text-slate-500">{p.country}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* SIMILAR
        {similarRackets.length >= 2 && (
          <section>
            <h2 className="text-sm font-bold uppercase mb-4 text-center">
              Similar Rackets You May Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {similarRackets.map((r) => (
                <Link
                  key={r.id}
                  href={`/rackets/${r.id}`}
                  className="p-3 border border-slate-200 rounded-md hover:border-emerald-300"
                >
                  <img
                    src={r.imageUrl}
                    alt={r.name}
                    className="aspect-square object-contain mb-2"
                  />
                  <p className="text-sm font-semibold line-clamp-2">{r.name}</p>
                  <p className="text-xs text-emerald-600 font-bold">
                    ₹{r.price.toLocaleString()}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )} */}
        {similarRackets.length >= 2 && (
          <section>
            <h2 className="text-sm font-bold uppercase mb-4 text-center">
              Similar Rackets You May Like
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {similarRackets.map((r) => (
                <Link
                  key={r.id}
                  href={`/rackets/${r.id}`}
                  className="border border-slate-200 rounded-md hover:border-emerald-300 p-3 flex flex-col"
                >
                  {/* ✅ SQUARE IMAGE BOX */}
                  <div className="aspect-square flex items-center justify-center overflow-hidden mb-2 bg-slate-50 rounded">
                    <img
                      src={r.imageUrl}
                      alt={r.name}
                      loading="lazy"
                      className="max-h-full w-auto object-contain"
                    />
                  </div>

                  <p className="text-sm font-semibold line-clamp-2 text-center">
                    {r.name}
                  </p>
                  <p className="text-xs text-emerald-600 font-bold text-center">
                    ₹{r.price.toLocaleString()}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
