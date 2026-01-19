"use client";

import { motion } from "framer-motion";

const guideCards = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
    title: "Racket Weight",
    subtitle: "3U, 4U, 5U Explained",
    content: [
      { label: "3U (85-89g)", desc: "Best for power players who want maximum smash force. Requires good technique and strength." },
      { label: "4U (80-84g)", desc: "Most popular choice. Balanced weight for all-round play, suitable for most players." },
      { label: "5U (75-79g)", desc: "Ultra-light for fast reactions and quick defense. Ideal for doubles and beginners." },
    ],
    tip: "Start with 4U if unsure — it offers the best versatility.",
    color: "emerald",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    title: "Balance Type",
    subtitle: "Where the weight sits",
    content: [
      { label: "Head-Heavy", desc: "Weight towards the head for powerful smashes. Best for aggressive singles players." },
      { label: "Even Balance", desc: "Weight distributed evenly. Versatile for both attack and defense." },
      { label: "Head-Light", desc: "Weight towards handle for quick maneuverability. Perfect for doubles and fast rallies." },
    ],
    tip: "Singles players often prefer head-heavy; doubles players prefer head-light.",
    color: "blue",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Shaft Flexibility",
    subtitle: "Stiff vs Flexible",
    content: [
      { label: "Stiff Shaft", desc: "More control and precision. Requires faster swing speed. Best for advanced players." },
      { label: "Medium Flex", desc: "Good balance of power and control. Suitable for intermediate players." },
      { label: "Flexible Shaft", desc: "Generates power with slower swings. Forgiving and beginner-friendly." },
    ],
    tip: "Beginners should start with flexible shafts for easier power generation.",
    color: "amber",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    title: "Skill Level",
    subtitle: "Match your experience",
    content: [
      { label: "Beginner", desc: "Focus on lightweight, flexible rackets with larger sweet spots for easier hits." },
      { label: "Intermediate", desc: "Transition to medium-stiff rackets. Develop technique with balanced specs." },
      { label: "Advanced", desc: "Choose based on playing style. Stiff, specialized rackets for maximum performance." },
    ],
    tip: "Be honest about your level — the right racket accelerates improvement.",
    color: "purple",
  },
];

const colorClasses = {
  emerald: {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    icon: "bg-emerald-100 text-emerald-600",
    label: "text-emerald-700",
    tip: "bg-emerald-100 text-emerald-800",
  },
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    icon: "bg-blue-100 text-blue-600",
    label: "text-blue-700",
    tip: "bg-blue-100 text-blue-800",
  },
  amber: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    icon: "bg-amber-100 text-amber-600",
    label: "text-amber-700",
    tip: "bg-amber-100 text-amber-800",
  },
  purple: {
    bg: "bg-purple-50",
    border: "border-purple-200",
    icon: "bg-purple-100 text-purple-600",
    label: "text-purple-700",
    tip: "bg-purple-100 text-purple-800",
  },
};

export default function HowToChoose() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            How to Choose the Right Badminton Racket
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Understanding these four key factors will help you make an informed decision 
            and find a racket that matches your playing style.
          </p>
        </motion.div>

        {/* Guide Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {guideCards.map((card, index) => {
            const colors = colorClasses[card.color as keyof typeof colorClasses];
            return (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`${colors.bg} ${colors.border} border rounded-2xl p-6 md:p-8`}
              >
                {/* Card Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className={`${colors.icon} w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0`}>
                    {card.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{card.title}</h3>
                    <p className="text-sm text-slate-500">{card.subtitle}</p>
                  </div>
                </div>

                {/* Content List */}
                <div className="space-y-4 mb-6">
                  {card.content.map((item) => (
                    <div key={item.label}>
                      <span className={`text-sm font-semibold ${colors.label}`}>{item.label}</span>
                      <p className="text-sm text-slate-600 mt-0.5">{item.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Pro Tip */}
                <div className={`${colors.tip} rounded-lg p-3 text-sm`}>
                  <span className="font-semibold">Pro Tip:</span> {card.tip}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
