"use client";

// // // import { motion } from "framer-motion";
// // // import { useState } from "react";

// // // const faqs = [
// // //   {
// // //     question: "Which badminton racket is best for beginners?",
// // //     answer:
// // //       "For beginners, we recommend lightweight rackets (4U or 5U) with flexible shafts and even or slightly head-light balance. These are more forgiving and help develop proper technique without straining your arm. Popular choices include the Yonex Nanoray series and Li-Ning entry-level rackets. Budget around ₹2,000-5,000 for a quality beginner racket.",
// // //   },
// // //   {
// // //     question: "What racket weight should I choose?",
// // //     answer:
// // //       "Racket weight depends on your playing style and physical strength. 3U (85-89g) is best for power players with good technique. 4U (80-84g) is the most versatile choice, suitable for most players. 5U (75-79g) is ideal for beginners, doubles players, or those who prefer quick maneuverability. If unsure, start with 4U.",
// // //   },
// // //   {
// // //     question: "Head-heavy vs head-light: which is better?",
// // //     answer:
// // //       "Neither is universally 'better' — it depends on your playing style. Head-heavy rackets generate more power for smashes, ideal for aggressive singles players. Head-light rackets offer faster handling and quick reactions, perfect for doubles and defensive play. Even-balance rackets provide versatility for all-round performance.",
// // //   },
// // //   {
// // //     question: "Does expensive mean better performance?",
// // //     answer:
// // //       "Not necessarily. Expensive rackets offer premium materials and cutting-edge technology, but they're often designed for advanced players who can fully utilize these features. A ₹5,000 racket matching your skill level will perform better for you than a ₹15,000 pro racket. Focus on specifications that match your playing style and skill level.",
// // //   },
// // //   {
// // //     question: "How do I know when to upgrade my racket?",
// // //     answer:
// // //       "Consider upgrading when: (1) Your technique has significantly improved, (2) You feel limited by your current racket's capabilities, (3) Your playing style has changed, or (4) Your racket shows signs of wear affecting performance. Generally, intermediate players can benefit from upgrading after 1-2 years of consistent play.",
// // //   },
// // //   {
// // //     question: "What's the difference between 3U, 4U, and 5U?",
// // //     answer:
// // //       "These denote weight categories: 3U (85-89g), 4U (80-84g), 5U (75-79g). Lower numbers mean heavier rackets. Heavier rackets (3U) provide more power but require more strength and technique. Lighter rackets (5U) offer speed and ease of handling. 4U is the most popular as it balances power and maneuverability.",
// // //   },
// // // ];

// // // export default function FAQSection() {
// // //   const [openIndex, setOpenIndex] = useState<number | null>(0);

// // //   return (
// // //     <section className="py-20 bg-white">
// // //       <div className="max-w-4xl mx-auto px-3">
// // //         {/* Section Header */}
// // //         <motion.div
// // //           initial={{ opacity: 0, y: 20 }}
// // //           whileInView={{ opacity: 1, y: 0 }}
// // //           viewport={{ once: true }}
// // //           transition={{ duration: 0.5 }}
// // //           className="text-center mb-12"
// // //         >
// // //           <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
// // //             Frequently Asked Questions
// // //           </h2>
// // //           <p className="text-lg text-slate-600">
// // //             Quick answers to common questions about choosing badminton rackets.
// // //           </p>
// // //         </motion.div>

// // //         {/* FAQ Accordion */}
// // //         <div className="space-y-3">
// // //           {faqs.map((faq, index) => (
// // //             <motion.div
// // //               key={index}
// // //               initial={{ opacity: 0, y: 10 }}
// // //               whileInView={{ opacity: 1, y: 0 }}
// // //               viewport={{ once: true }}
// // //               transition={{ duration: 0.4, delay: index * 0.05 }}
// // //             >
// // //               <button
// // //                 onClick={() => setOpenIndex(openIndex === index ? null : index)}
// // //                 className={`w-full text-left p-5 rounded-xl border transition-all duration-200 ${
// // //                   openIndex === index
// // //                     ? "bg-emerald-50 border-emerald-200"
// // //                     : "bg-slate-50 border-slate-200 hover:border-slate-300"
// // //                 }`}
// // //                 aria-expanded={openIndex === index}
// // //                 aria-controls={`faq-answer-${index}`}
// // //               >
// // //                 <div className="flex items-center justify-between gap-4">
// // //                   <h3
// // //                     className={`font-semibold ${
// // //                       openIndex === index
// // //                         ? "text-emerald-700"
// // //                         : "text-slate-900"
// // //                     }`}
// // //                   >
// // //                     {faq.question}
// // //                   </h3>
// // //                   <span
// // //                     className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
// // //                       openIndex === index
// // //                         ? "bg-emerald-200 text-emerald-700 rotate-180"
// // //                         : "bg-slate-200 text-slate-500"
// // //                     }`}
// // //                   >
// // //                     <svg
// // //                       className="w-5 h-5"
// // //                       fill="none"
// // //                       viewBox="0 0 24 24"
// // //                       stroke="currentColor"
// // //                     >
// // //                       <path
// // //                         strokeLinecap="round"
// // //                         strokeLinejoin="round"
// // //                         strokeWidth={2}
// // //                         d="M19 9l-7 7-7-7"
// // //                       />
// // //                     </svg>
// // //                   </span>
// // //                 </div>
// // //                 <div
// // //                   id={`faq-answer-${index}`}
// // //                   className={`overflow-hidden transition-all duration-300 ${
// // //                     openIndex === index ? "max-h-96 mt-4" : "max-h-0"
// // //                   }`}
// // //                 >
// // //                   <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
// // //                 </div>
// // //               </button>
// // //             </motion.div>
// // //           ))}
// // //         </div>
// // //       </div>
// // //     </section>
// // //   );
// // // }

// // import { motion } from "framer-motion";
// // import { useState } from "react";

// // const faqs = [
// //   {
// //     question: "Which badminton racket is best for beginners?",
// //     answer:
// //       "For beginners, we recommend lightweight rackets (4U or 5U) with flexible shafts and even or slightly head-light balance. These are more forgiving and help develop proper technique without straining your arm.",
// //   },
// //   {
// //     question: "What racket weight should I choose?",
// //     answer:
// //       "Racket weight depends on your playing style and physical strength. 3U offers more power, 4U is versatile, and 5U is ideal for speed and beginners.",
// //   },
// //   {
// //     question: "Head-heavy vs head-light: which is better?",
// //     answer:
// //       "Head-heavy rackets provide power, while head-light rackets offer speed and control. Choose based on your playing style.",
// //   },
// //   // {
// //   //   question: "Does expensive mean better performance?",
// //   //   answer:
// //   //     "Not necessarily. A racket that matches your skill level performs better than an expensive pro racket.",
// //   // },
// //   {
// //     question: "How do I know when to upgrade my racket?",
// //     answer:
// //       "Upgrade when your skills improve, your racket limits you, or it shows wear affecting performance.",
// //   },
// //   {
// //     question: "What's the difference between 3U, 4U, and 5U?",
// //     answer:
// //       "These are weight categories: 3U (heaviest), 4U (balanced), 5U (lightest).",
// //   },
// // ];

// // export default function FAQSection() {
// //   const [openIndex, setOpenIndex] = useState<number | null>(0);

// //   return (
// //     <section className="py-2 bg-slate-100">
// //       <div className="max-w-7xl mx-auto px-6">
// //         {/* Header */}
// //         <motion.div
// //           initial={{ opacity: 0, y: 16 }}
// //           whileInView={{ opacity: 1, y: 0 }}
// //           viewport={{ once: true }}
// //           transition={{ duration: 0.4 }}
// //           className="text-center mb-8"
// //         >
// //           <h2 className="text-3xl md:text-4xl font-bold text-slate-900 ">
// //             Frequently Asked Questions
// //           </h2>
// //           <p className="text-slate-600 text-med mt-1 ">
// //             Quick answers to common questions about choosing badminton rackets.
// //           </p>
// //         </motion.div>

// //         {/* 30 / 70 Layout */}
// //         <div className="grid grid-cols-1 md:grid-cols-[30%_70%] gap-8 items-start py--7">
// //           {/* Left Image */}
// //           <motion.div
// //             initial={{ opacity: 0, x: -30 }}
// //             whileInView={{ opacity: 1, x: 0 }}
// //             viewport={{ once: true }}
// //             transition={{ duration: 0.5 }}
// //             className="h-[340px] bg-slate-100 rounded-xl overflow-hidden"
// //           >
// //             <img
// //               src="https://cdn.pixabay.com/photo/2015/11/03/08/56/question-mark-1019820_1280.jpg"
// //               alt="FAQ illustration"
// //               className="w-full h-full object-cover"
// //             />
// //           </motion.div>

// //           {/* FAQ List */}
// //           <div>
// //             {faqs.map((faq, index) => {
// //               const isLast = index === faqs.length - 1;
// //               const isOpen = openIndex === index;

// //               return (
// //                 <motion.div
// //                   key={index}
// //                   initial={{ opacity: 0, x: 40 }}
// //                   whileInView={{ opacity: 1, x: 0 }}
// //                   viewport={{ once: true }}
// //                   transition={{
// //                     duration: 0.45,
// //                     ease: "easeOut",
// //                     delay: index * 0.08,
// //                   }}
// //                   className={`${!isLast ? "border-b border-slate-200" : ""}`}
// //                 >
// //                   <button
// //                     onClick={() => setOpenIndex(isOpen ? null : index)}
// //                     className="w-full text-left py-4 flex items-start justify-between gap-4"
// //                     aria-expanded={isOpen}
// //                   >
// //                     <h3 className="text-sm md:text-base font-semibold text-slate-900">
// //                       {faq.question}
// //                     </h3>

// //                     <span
// //                       className={`transition-transform mt-1 ${
// //                         isOpen ? "rotate-180" : ""
// //                       }`}
// //                     >
// //                       <svg
// //                         className="w-5 h-5 text-slate-500"
// //                         fill="none"
// //                         viewBox="0 0 24 24"
// //                         stroke="currentColor"
// //                       >
// //                         <path
// //                           strokeLinecap="round"
// //                           strokeLinejoin="round"
// //                           strokeWidth={2}
// //                           d="M19 9l-7 7-7-7"
// //                         />
// //                       </svg>
// //                     </span>
// //                   </button>

// //                   <div
// //                     className={`overflow-hidden transition-all duration-300 ${
// //                       isOpen ? "max-h-96 pb-4" : "max-h-0"
// //                     }`}
// //                   >
// //                     <p className="text-sm text-slate-600 leading-relaxed pr-6">
// //                       {faq.answer}
// //                     </p>
// //                   </div>
// //                 </motion.div>
// //               );
// //             })}
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }

// import { motion } from "framer-motion";
// import { useState } from "react";

// const faqs = [
//   {
//     question: "Which badminton racket is best for beginners?",
//     answer:
//       "For beginners, we recommend lightweight rackets (4U or 5U) with flexible shafts and even or slightly head-light balance. These are more forgiving and help develop proper technique without straining your arm.",
//   },
//   {
//     question: "What racket weight should I choose?",
//     answer:
//       "Racket weight depends on your playing style and physical strength. 3U offers more power, 4U is versatile, and 5U is ideal for speed and beginners.",
//   },
//   {
//     question: "Head-heavy vs head-light: which is better?",
//     answer:
//       "Head-heavy rackets provide power, while head-light rackets offer speed and control. Choose based on your playing style.",
//   },
//   {
//     question: "How do I know when to upgrade my racket?",
//     answer:
//       "Upgrade when your skills improve, your racket limits you, or it shows wear affecting performance.",
//   },
//   {
//     question: "What's the difference between 3U, 4U, and 5U?",
//     answer:
//       "These are weight categories: 3U (heaviest), 4U (balanced), 5U (lightest).",
//   },
// ];

// export default function FAQSection() {
//   const [openIndex, setOpenIndex] = useState<number | null>(0);

//   return (
//     <section className="pt-12 md:pt-24 lg:pt-36 bg-white">
//       <div className="max-w-9xl px-4 md:px-6">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 16 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.4 }}
//           className="mb-4 md:mb-6"
//         >
//           <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900">
//             Frequently Asked Questions
//           </h2>
//           <p className="text-slate-600 text-sm md:text-med mt-1 md:mt-2 mb-2">
//             Quick answers to common questions about choosing badminton rackets.
//           </p>
//         </motion.div>

//         {/* FAQ List */}
//         <div className="w-full">
//           {faqs.map((faq, index) => {
//             const isLast = index === faqs.length - 1;
//             const isOpen = openIndex === index;

//             return (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, x: 40 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 viewport={{ once: true }}
//                 transition={{
//                   duration: 0.45,
//                   ease: "easeOut",
//                   delay: index * 0.08,
//                 }}
//                 className={`${!isLast ? "border-b border-slate-200" : ""}`}
//               >
//                 <button
//                   onClick={() => setOpenIndex(isOpen ? null : index)}
//                   className="w-full text-left py-3 md:py-4 flex items-start gap-2 md:gap-3"
//                   aria-expanded={isOpen}
//                 >
//                   {/* Arrow (LEFT) */}
//                   <span
//                     className={`mt-0.5 md:mt-1 transition-transform duration-300 flex-shrink-0 ${
//                       isOpen ? "rotate-90" : ""
//                     }`}
//                   >
//                     <svg
//                       className="w-3.5 h-3.5 md:w-4 md:h-4 text-slate-500"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M9 5l7 7-7 7"
//                       />
//                     </svg>
//                   </span>

//                   {/* Question */}
//                   <h3 className="flex-1 text-sm md:text-med lg:text-base font-semibold text-slate-900">
//                     {faq.question}
//                   </h3>
//                 </button>

//                 {/* Answer */}
//                 <div
//                   className={`overflow-hidden transition-all duration-300 ${
//                     isOpen ? "max-h-96 pb-3 md:pb-4" : "max-h-0"
//                   }`}
//                 >
//                   <p className="text-sm md:text-med text-slate-700 leading-relaxed pl-5 md:pl-7 pr-1">
//                     {faq.answer}
//                   </p>
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }

import { motion } from "framer-motion";
import { useState } from "react";

const faqs = [
  {
    question: "Which badminton racket is best for beginners?",
    answer:
      "For beginners, we recommend lightweight rackets (4U or 5U) with flexible shafts and even or slightly head-light balance. These are more forgiving and help develop proper technique without straining your arm.",
  },
  {
    question: "What racket weight should I choose?",
    answer:
      "Racket weight depends on your playing style and physical strength. 3U offers more power, 4U is versatile, and 5U is ideal for speed and beginners.",
  },
  {
    question: "Head-heavy vs head-light: which is better?",
    answer:
      "Head-heavy rackets provide power, while head-light rackets offer speed and control. Choose based on your playing style.",
  },
  {
    question: "How do I know when to upgrade my racket?",
    answer:
      "Upgrade when your skills improve, your racket limits you, or it shows wear affecting performance.",
  },
  {
    question: "What's the difference between 3U, 4U, and 5U?",
    answer:
      "These are weight categories: 3U (heaviest), 4U (balanced), 5U (lightest).",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="pt-12 md:pt-24 lg:pt-36 bg-white">
      <div className="max-w-9xl px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-4 md:mb-6"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm md:text-med mt-1 md:mt-2 mb-2">
            Quick answers to common questions about choosing badminton rackets.
          </p>
        </motion.div>

        {/* 70 / 30 Layout */}
        <div className="grid grid-cols-1 md:grid-cols-[70%_30%] gap-6 md:gap-10 items-start">
          {/* FAQ LIST (70%) */}
          <div className="w-full">
            {faqs.map((faq, index) => {
              const isLast = index === faqs.length - 1;
              const isOpen = openIndex === index;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.45,
                    ease: "easeOut",
                    delay: index * 0.08,
                  }}
                  className={`${!isLast ? "border-b border-slate-200" : ""}`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full text-left py-3 md:py-4 flex items-start gap-2 md:gap-3"
                    aria-expanded={isOpen}
                  >
                    {/* Arrow */}
                    <span
                      className={`mt-0.5 md:mt-1 transition-transform duration-300 flex-shrink-0 ${
                        isOpen ? "rotate-90" : ""
                      }`}
                    >
                      <svg
                        className="w-3.5 h-3.5 md:w-4 md:h-4 text-slate-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>

                    <h3 className="flex-1 text-sm md:text-med lg:text-base font-semibold text-slate-900">
                      {faq.question}
                    </h3>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? "max-h-96 pb-3 md:pb-4" : "max-h-0"
                    }`}
                  >
                    <p className="text-sm md:text-med text-slate-700 leading-relaxed pl-5 md:pl-7 pr-1">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* IMAGE (30%) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full h-[180px] md:h-[260px] lg:h-[300px] rounded-xl overflow-hidden"
          >
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/015/877/238/small/faq-speech-bubble-icon-in-flat-style-question-illustration-on-white-isolated-background-communication-sign-business-concept-vector.jpg"
              alt="Badminton FAQ"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
