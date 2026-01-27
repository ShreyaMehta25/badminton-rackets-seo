"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const comparisonFeatures = [
  {
    icon: (
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
          d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
        />
      </svg>
    ),
    title: "Weight Categories",
    description: "Compare 3U, 4U, and 5U weight classes",
  },
  {
    icon: (
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
          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
        />
      </svg>
    ),
    title: "Balance Points",
    description: "Head-heavy, even, or head-light options",
  },
  {
    icon: (
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
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
    title: "Skill Levels",
    description: "Beginner to advanced classifications",
  },
  {
    icon: (
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
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "Price Ranges",
    description: "Filter by budget from ₹2,000 to ₹20,000+",
  },
];

export default function ComparisonPreview() {
  return (
    <section className="pt-36 bg-white">
      {/* Full-width wrapper with equal gutters */}
      <div className="w-full px-8">
        {/* Balanced content rail */}
        <div className="max-w-[1680px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {/* Badge */}
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-semibold mb-3">
                Smart Comparison
              </span>

              {/* Heading */}
              <h2 className="text-3xl md:text-4xl font-bold  text-slate-800 mb-6">
                Compare Rackets Side by Side
              </h2>

              {/* Description */}
              <p className="text-lg text-slate-500 mb-8 leading-relaxed max-w-2xl">
                Our intelligent filtering system helps you narrow down choices
                based on what matters most. Compare specifications, read
                reviews, and find the perfect match for your playing style.
              </p>

              {/* Feature List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                {comparisonFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                      {feature.icon}
                    </div>
                    <div className="leading-tight">
                      <h3 className="text-sm font-semibold text-slate-800">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-slate-500">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <Link
                href="/rackets"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-xl border border-slate-300 bg-slate-200 text-slate-800 font-semibold hover:bg-slate-300 transition-colors"
              >
                Start Comparing
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
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </motion.div>

            {/* Right: Visual Preview */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative w-full"
            >
              <div className="relative p-6 rounded-2xl bg-white">
                {/* Header */}
                <div className="flex justify-end mb-6">
                  <span className="flex items-center gap-2 text-emerald-400 text-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Live Data
                  </span>
                </div>

                {/* Comparison Bars */}
                <div className="space-y-6 mt-20">
                  {[
                    { label: "Power", values: [92, 78, 85] },
                    { label: "Control", values: [75, 95, 88] },
                    { label: "Speed", values: [70, 88, 92] },
                    { label: "Durability", values: [90, 85, 82] },
                  ].map((metric, idx) => (
                    <div key={metric.label}>
                      <span className="text-sm font-medium text-slate-500 block mb-2">
                        {metric.label}
                      </span>
                      <div className="flex gap-2">
                        {metric.values.map((value, i) => (
                          <div
                            key={i}
                            className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden"
                          >
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${value}%` }}
                              viewport={{ once: true }}
                              transition={{
                                duration: 0.8,
                                delay: idx * 0.15 + i * 0.1,
                              }}
                              className={`h-full rounded-full ${
                                i === 0
                                  ? "bg-emerald-500"
                                  : i === 1
                                    ? "bg-blue-500"
                                    : "bg-amber-500"
                              }`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Legend */}
                <div className="flex justify-center gap-6 mt-8 pt-6 border-t border-slate-200">
                  {[
                    { color: "bg-emerald-500", label: "Astrox 100ZZ" },
                    { color: "bg-blue-500", label: "Nanoflare 1000Z" },
                    { color: "bg-amber-500", label: "Arcsaber 11 Pro" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2">
                      <span className={`w-3 h-3 rounded-full ${item.color}`} />
                      <span className="text-sm text-slate-500">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
