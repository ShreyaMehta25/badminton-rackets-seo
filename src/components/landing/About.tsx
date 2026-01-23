"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold italic text-slate-900 mb-8 -ml-10">
          About This Platform
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
          {/* Left paragraph */}
          <p className="text-med text-slate-700 leading-relaxed -ml-10">
            SmashSelect is a badminton-focused discovery platform built to
            simplify one of the most confusing decisions for players — choosing
            the right racket. With hundreds of models, technical specifications,
            and marketing claims, finding a racket that truly fits your game can
            feel overwhelming. We cut through that noise by translating complex
            data into clear, practical insights that players can actually
            understand and use.
            <br />
            <br />
            Our platform focuses on how rackets behave on court — how balance,
            weight, flexibility, and construction influence power, control,
            speed, and comfort — so you’re not just comparing numbers, but
            making decisions based on real playing experience.
          </p>

          {/* Right paragraph */}
          <p className="text-med text-slate-700 leading-relaxed -mr-10">
            Unlike traditional catalog or e-commerce sites, SmashSelect does not
            prioritize promotions, sponsorships, or brand-driven
            recommendations. Every comparison and filter is designed around the
            player — their skill level, play style, physical comfort, and
            performance goals.
            <br />
            <br />
            Whether you’re a beginner building consistency, an intermediate
            player refining technique, or an advanced athlete seeking precision,
            SmashSelect helps you explore, compare, and understand rackets in a
            structured, unbiased way. Our goal is simple: to help you make
            confident, informed choices that genuinely improve how you play on
            court.
          </p>
        </div>
      </div>
    </section>
  );
}
