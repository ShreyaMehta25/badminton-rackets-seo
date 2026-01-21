"use client";

import { motion } from "framer-motion";

const articles = [
  {
    title: "Why Racket Weight Matters More Than You Think",
    excerpt:
      "The difference between a 3U and 5U racket isn't just grams — it fundamentally changes how you play. Heavier rackets generate more momentum for powerful smashes, while lighter ones allow faster reactions and reduce fatigue during long matches.",
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
          strokeWidth={1.5}
          d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
        />
      </svg>
    ),
    color: "emerald",
  },
  {
    title: "Common Mistakes Players Make When Buying a Racket",
    excerpt:
      "Buying the most expensive racket won't make you a better player. Many beginners choose rackets that are too stiff or head-heavy, leading to poor technique development and even injuries. Learn what specifications actually matter for your skill level.",
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
          strokeWidth={1.5}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
    ),
    color: "amber",
  },
  {
    title: "How String Tension Changes Your Game",
    excerpt:
      "String tension is often overlooked but significantly impacts power and control. Lower tension (20-24 lbs) provides a larger sweet spot and more power, while higher tension (26-30 lbs) offers better control but requires precise hitting.",
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
          strokeWidth={1.5}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    color: "blue",
  },
];

const colorClasses = {
  emerald: {
    bg: "bg-emerald-400",
    border: "border-emerald-200 hover:border-emerald-300",
    icon: "bg-emerald-100 text-emerald-600",
  },
  amber: {
    bg: "bg-amber-500",
    border: "border-amber-200 hover:border-amber-300",
    icon: "bg-amber-100 text-amber-600",
  },
  blue: {
    bg: "bg-blue-500",
    border: "border-blue-200 hover:border-blue-300",
    icon: "bg-blue-100 text-blue-600",
  },
};

// export default function EducationalContent() {
//   return (
//     <section className="py-12 bg-emerald-900">
//       <div className="max-w-7xl mx-auto px-6">
//         {/* Section Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.5 }}
//           className="text-center mb-14"
//         >
//           <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-right">
//             Learn Before You Buy
//           </h2>
//           <p className="text-med text-slate-600 max-w-lg ml-auto text-right">
//             Make smarter purchasing decisions with our expert guides and
//             insights. Knowledge is the first step to finding your perfect
//             racket.
//           </p>
//         </motion.div>

//         {/* Articles Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {articles.map((article, index) => {
//             const colors =
//               colorClasses[article.color as keyof typeof colorClasses];
//             return (
//               <motion.article
//                 key={article.title}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 className={`${colors.bg} ${colors.border} border  p-6 hover:shadow-lg min-h-[360px] transition-all duration-300`}
//               >
//                 {/* Icon */}
//                 <div className="mb-4">
//                   <div
//                     className={`${colors.icon} w-12 h-12 rounded-xl flex items-center justify-center`}
//                   >
//                     {article.icon}
//                   </div>
//                 </div>

//                 {/* Title */}
//                 <h3 className="text-lg font-bold text-slate-900 mb-3">
//                   {article.title}
//                 </h3>

//                 {/* Excerpt */}
//                 <p className="text-med text-white leading-relaxed">
//                   {article.excerpt}
//                 </p>
//               </motion.article>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }
export default function EducationalContent() {
  return (
    <div className="bg-white md:pt-5">
      <section className="mt-7 md:mt-24 py-8 bg-emerald-900">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold italic text-black mb-4 text-right">
              Learn Before You Buy
            </h2>
            <p className="text-lg text-slate-900 max-w-xl ml-auto text-right">
              Make smarter purchasing decisions with our expert guides and
              insights. Knowledge is the first step to finding your perfect
              racket.
            </p>
          </motion.div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
            {articles.map((article, index) => {
              const colors =
                colorClasses[article.color as keyof typeof colorClasses];
              return (
                <motion.article
                  key={article.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`${colors.bg} ${colors.border} border border-slate-800 p-6 hover:shadow-lg min-h-[360px] transition-all duration-300 `}
                >
                  <div className="mb-4">
                    <div
                      className={`${colors.icon} w-12 h-12 rounded-xl flex items-center justify-center`}
                    >
                      {article.icon}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-3">
                    {article.title}
                  </h3>

                  <p className="text-med text-white leading-relaxed">
                    {article.excerpt}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
