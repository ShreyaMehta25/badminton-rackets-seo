// 'use client';

// import rackets from '@/data/rackets.json';
// import RacketCarousel from './RacketCarousel';
// import Link from 'next/link';

// export default function ShopByPlayingStyle() {
//   // Filter rackets by playing style
//   const attackingRackets = rackets
//     .filter(r => r.balance === 'head-heavy' || r.bestFor.some(tag => tag.toLowerCase().includes('power') || tag.toLowerCase().includes('attacking')))
//     .sort((a, b) => b.reviewScore - a.reviewScore)
//     .slice(0, 8);

//   const defensiveRackets = rackets
//     .filter(r => r.balance === 'head-light' || r.bestFor.some(tag => tag.toLowerCase().includes('control') || tag.toLowerCase().includes('defensive')))
//     .sort((a, b) => b.reviewScore - a.reviewScore)
//     .slice(0, 8);

//   const allAroundRackets = rackets
//     .filter(r => r.balance === 'even' || r.bestFor.some(tag => tag.toLowerCase().includes('all-round') || tag.toLowerCase().includes('versatile')))
//     .sort((a, b) => b.reviewScore - a.reviewScore)
//     .slice(0, 8);

//   return (
//     <section className="py-16 bg-slate-900/50">
//       <div className="max-w-7xl mx-auto px-6 space-y-16">
//         {/* Section Header */}
//         <div className="text-center space-y-3">
//           <h2 className="text-3xl md:text-4xl font-bold text-slate-100">
//             Shop by Playing Style
//           </h2>
//           <p className="text-slate-400 max-w-2xl mx-auto">
//             Find rackets tailored to your playing style, from aggressive smashes to defensive control
//           </p>
//         </div>

//         {/* Attacking/Power Rackets */}
//         <div className="space-y-6">
//           <div className="space-y-3">
//             <h3 className="text-2xl md:text-3xl font-bold text-slate-100">
//               Attacking & Power Rackets
//             </h3>
//             <p className="text-slate-400 max-w-3xl">
//               Head-heavy rackets designed for aggressive players. Generate maximum power on smashes and clears with extra weight in the head.
//             </p>
//           </div>

//           <RacketCarousel
//             rackets={attackingRackets}
//             showPagination={true}
//             cardsPerView={{ desktop: 4, tablet: 2, mobile: 1.5 }}
//           />

//           <div className="text-center">
//             <Link
//               href="/rackets?bestFor=power"
//               className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
//             >
//               View All Attacking Rackets
//               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//               </svg>
//             </Link>
//           </div>
//         </div>

//         {/* Defensive/Control Rackets */}
//         <div className="space-y-6">
//           <div className="space-y-3">
//             <h3 className="text-2xl md:text-3xl font-bold text-slate-100">
//               Defensive & Control Rackets
//             </h3>
//             <p className="text-slate-400 max-w-3xl">
//               Head-light rackets for quick reactions and precise shots. Perfect for defensive play, doubles, and players who prioritize control over power.
//             </p>
//           </div>

//           <RacketCarousel
//             rackets={defensiveRackets}
//             showPagination={true}
//             cardsPerView={{ desktop: 4, tablet: 2, mobile: 1.5 }}
//           />

//           <div className="text-center">
//             <Link
//               href="/rackets?bestFor=control"
//               className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
//             >
//               View All Defensive Rackets
//               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//               </svg>
//             </Link>
//           </div>
//         </div>

//         {/* All-Around Rackets */}
//         <div className="space-y-6">
//           <div className="space-y-3">
//             <h3 className="text-2xl md:text-3xl font-bold text-slate-100">
//               All-Around & Versatile Rackets
//             </h3>
//             <p className="text-slate-400 max-w-3xl">
//               Even-balanced rackets offering the best of both worlds. Great for players who want flexibility in their game or are still developing their style.
//             </p>
//           </div>

//           <RacketCarousel
//             rackets={allAroundRackets}
//             showPagination={true}
//             cardsPerView={{ desktop: 4, tablet: 2, mobile: 1.5 }}
//           />

//           <div className="text-center">
//             <Link
//               href="/rackets?balance=even"
//               className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
//             >
//               View All All-Around Rackets
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
