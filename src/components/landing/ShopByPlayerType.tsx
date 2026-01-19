"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const playerTypes = [
  {
    title: "Beginner Players",
    description: "Just starting your badminton journey? Find forgiving, easy-to-handle rackets that help you develop proper technique.",
    filterUrl: "/rackets/for-beginners",
    icon: "🌱",
    gradient: "from-green-500 to-emerald-600",
    bgGradient: "from-green-50 to-emerald-50",
  },
  {
    title: "Intermediate Players",
    description: "Ready to level up? Discover rackets that offer more control and help refine your skills for competitive play.",
    filterUrl: "/rackets/for-intermediate",
    icon: "📈",
    gradient: "from-blue-500 to-cyan-600",
    bgGradient: "from-blue-50 to-cyan-50",
  },
  {
    title: "Advanced Players",
    description: "Tournament-ready performance. High-end rackets with specialized features for maximum competitive advantage.",
    filterUrl: "/rackets/for-advanced",
    icon: "🏆",
    gradient: "from-amber-500 to-orange-600",
    bgGradient: "from-amber-50 to-orange-50",
  },
  {
    title: "Power Attackers",
    description: "Dominate with explosive smashes. Head-heavy rackets designed for aggressive singles play and powerful shots.",
    filterUrl: "/rackets/for-advanced",
    icon: "💥",
    gradient: "from-red-500 to-rose-600",
    bgGradient: "from-red-50 to-rose-50",
  },
  {
    title: "Control Specialists",
    description: "Precision over power. Even-balance rackets for tactical players who value accuracy and placement.",
    filterUrl: "/rackets/for-intermediate",
    icon: "🎯",
    gradient: "from-purple-500 to-violet-600",
    bgGradient: "from-purple-50 to-violet-50",
  },
];

export default function ShopByPlayerType() {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Shop by Player Type
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Find rackets curated for your skill level and playing style. 
            Click to explore recommendations tailored just for you.
          </p>
        </motion.div>

        {/* Player Type Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {playerTypes.map((type, index) => (
            <motion.div
              key={type.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Link
                href={type.filterUrl}
                className={`group block h-full bg-gradient-to-br ${type.bgGradient} rounded-2xl p-6 border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-300`}
              >
                {/* Icon */}
                <div className="text-4xl mb-4">{type.icon}</div>
                
                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">
                  {type.title}
                </h3>
                
                {/* Description */}
                <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                  {type.description}
                </p>
                
                {/* CTA */}
                <div className={`inline-flex items-center gap-2 text-sm font-semibold bg-gradient-to-r ${type.gradient} bg-clip-text text-transparent group-hover:gap-3 transition-all`}>
                  Browse Rackets
                  <svg className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
