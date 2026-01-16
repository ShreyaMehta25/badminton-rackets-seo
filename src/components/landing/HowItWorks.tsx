"use client";

import { motion } from "framer-motion";

const steps = [
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </svg>
    ),
    title: "Input Playstyle",
    description:
      "Describe your game. Whether you're an aggressive smasher or a tactical net player, we need to know your DNA.",
    isActive: true,
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
    title: "Analyze Specs",
    description:
      "Our algorithm matches you with the best frames across all major brands like Yonex, Victor, and Li-Ning.",
    isActive: false,
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    title: "Smash the Competition",
    description:
      "Receive your curated list of recommendations and dominate the court with gear built for your victory.",
    isActive: false,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-32 bg-slate-900 border-y border-slate-800">
      <div className="max-w-4xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center mb-20 uppercase tracking-[0.2em] text-slate-500"
        >
          The Discovery Process
        </motion.h2>

        <div className="space-y-0">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="grid grid-cols-[80px_1fr] gap-4"
            >
              <div className="flex flex-col items-center">
                <div
                  className={`size-12 rounded-full border flex items-center justify-center ${
                    step.isActive
                      ? "border-emerald-500 text-emerald-400 bg-emerald-500/5"
                      : "border-slate-700 text-slate-500 bg-slate-800"
                  }`}
                >
                  {step.icon}
                </div>
                {index < steps.length - 1 && (
                  <div className="w-[1px] h-24 bg-gradient-to-b from-emerald-500/50 to-slate-700"></div>
                )}
              </div>
              <div className={`pt-2 ${index < steps.length - 1 ? "pb-16" : ""}`}>
                <h4
                  className={`text-xl font-bold mb-2 ${
                    step.isActive ? "text-emerald-400" : ""
                  }`}
                >
                  {step.title}
                </h4>
                <p className="text-slate-400">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
