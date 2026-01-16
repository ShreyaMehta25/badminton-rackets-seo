"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="py-32 bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-emerald-500/5"></div>
      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-8"
        >
          Ready to upgrade your game?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-slate-400 text-xl mb-12 max-w-xl mx-auto"
        >
          Join 15,000+ players using data to find their competitive edge.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link
            href="/rackets"
            className="inline-block bg-emerald-500 text-white text-xl font-bold h-16 px-12 rounded-2xl hover:scale-105 transition-transform shadow-2xl shadow-emerald-500/30"
          >
            Start Your Discovery
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
