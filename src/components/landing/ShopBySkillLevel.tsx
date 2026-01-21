// 'use client';

// import rackets from '@/data/rackets.json';
// import RacketCarousel from './RacketCarousel';
// import Link from 'next/link';

// export default function ShopBySkillLevel() {
//   // Filter rackets by skill level
//   const beginnerRackets = rackets
//     .filter(r => r.playerLevel === 'beginner')
//     .sort((a, b) => b.reviewScore - a.reviewScore)
//     .slice(0, 8);

//   const intermediateRackets = rackets
//     .filter(r => r.playerLevel === 'intermediate')
//     .sort((a, b) => b.reviewScore - a.reviewScore)
//     .slice(0, 8);

//   const advancedRackets = rackets
//     .filter(r => r.playerLevel === 'advanced')
//     .sort((a, b) => b.reviewScore - a.reviewScore)
//     .slice(0, 8);

//   const totalBeginner = rackets.filter(r => r.playerLevel === 'beginner').length;
//   const totalIntermediate = rackets.filter(r => r.playerLevel === 'intermediate').length;
//   const totalAdvanced = rackets.filter(r => r.playerLevel === 'advanced').length;

//   return (
//     <section className="py-16 bg-slate-950">
//       <div className="max-w-7xl mx-auto px-6 space-y-16">
//         {/* Beginner Rackets */}
//         <div className="space-y-6">
//           <div className="space-y-3">
//             <h3 className="text-2xl md:text-3xl font-bold text-slate-100">
//               Best Badminton Rackets for Beginners
//             </h3>
//             <p className="text-slate-400 max-w-3xl">
//               Lightweight, forgiving rackets (4U-5U) with even balance. Perfect for learning proper technique and building control without strain.
//             </p>
//           </div>

//           <RacketCarousel
//             rackets={beginnerRackets}
//             showPagination={true}
//             cardsPerView={{ desktop: 4, tablet: 2, mobile: 1.5 }}
//           />

//           <div className="text-center">
//             <Link
//               href="/rackets/for-beginners"
//               className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
//             >
//               View All Beginner Rackets ({totalBeginner})
//               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//               </svg>
//             </Link>
//           </div>
//         </div>

//         {/* Intermediate Rackets */}
//         <div className="space-y-6">
//           <div className="space-y-3">
//             <h3 className="text-2xl md:text-3xl font-bold text-slate-100">
//               Best Badminton Rackets for Intermediate Players
//             </h3>
//             <p className="text-slate-400 max-w-3xl">
//               Balanced rackets with moderate flex, ideal for players developing their playing style and improving shot consistency.
//             </p>
//           </div>

//           <RacketCarousel
//             rackets={intermediateRackets}
//             showPagination={true}
//             cardsPerView={{ desktop: 4, tablet: 2, mobile: 1.5 }}
//           />

//           <div className="text-center">
//             <Link
//               href="/rackets/for-intermediate"
//               className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
//             >
//               View All Intermediate Rackets ({totalIntermediate})
//               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//               </svg>
//             </Link>
//           </div>
//         </div>

//         {/* Advanced Rackets */}
//         <div className="space-y-6">
//           <div className="space-y-3">
//             <h3 className="text-2xl md:text-3xl font-bold text-slate-100">
//               Best Badminton Rackets for Advanced Players
//             </h3>
//             <p className="text-slate-400 max-w-3xl">
//               High-performance rackets with specialized characteristics. Designed for competitive players who have mastered fundamental techniques.
//             </p>
//           </div>

//           {/* <RacketCarousel */}
//             rackets={advancedRackets}
//             showPagination={true}
//             cardsPerView={{ desktop: 4, tablet: 2, mobile: 1.5 }}
//           />

//           <div className="text-center">
//             <Link
//               href="/rackets/for-advanced"
//               className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
//             >
//               View All Advanced Rackets ({totalAdvanced})
//               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//               </svg>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
