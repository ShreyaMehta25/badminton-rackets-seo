"use client";

import { motion } from "framer-motion";

export default function EmotionalSection() {
  return (
    <section className="py-48 bg-slate-900 flex items-center justify-center">
      <div className="max-w-5xl px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl lg:text-7xl font-light italic leading-tight text-slate-200"
        >
          Because the{" "}
          <span className="text-emerald-400 font-bold not-italic">
            right racket
          </span>{" "}
          changes everything.
        </motion.h2>
      </div>
    </section>
  );
}
