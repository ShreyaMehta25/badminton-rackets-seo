// 'use client';

// import rackets from '@/data/rackets.json';
// import RacketCarousel from './RacketCarousel';
// import Link from 'next/link';

// export default function ShopByBudget() {
//   // Filter rackets by price ranges
//   const budgetRackets = rackets
//     .filter(r => r.price < 5000)
//     .sort((a, b) => b.reviewScore - a.reviewScore)
//     .slice(0, 6);

//   const midRangeRackets = rackets
//     .filter(r => r.price >= 5000 && r.price < 8000)
//     .sort((a, b) => b.reviewScore - a.reviewScore)
//     .slice(0, 6);

//   const premiumRackets = rackets
//     .filter(r => r.price >= 8000 && r.price < 15000)
//     .sort((a, b) => b.reviewScore - a.reviewScore)
//     .slice(0, 6);

//   const professionalRackets = rackets
//     .filter(r => r.price >= 15000)
//     .sort((a, b) => b.reviewScore - a.reviewScore)
//     .slice(0, 6);

//   const totalBudget = rackets.filter(r => r.price < 5000).length;
//   const totalMidRange = rackets.filter(r => r.price >= 5000 && r.price < 8000).length;
//   const totalPremium = rackets.filter(r => r.price >= 8000 && r.price < 15000).length;
//   const totalProfessional = rackets.filter(r => r.price >= 15000).length;

//   return (
//     <section className="py-16 bg-slate-950">
//       <div className="max-w-7xl mx-auto px-6 space-y-16">
//         {/* Section Header */}
//         <div className="text-center space-y-3">
//           <h2 className="text-3xl md:text-4xl font-bold text-slate-100">
//             Shop by Budget
//           </h2>
//           <p className="text-slate-400 max-w-2xl mx-auto">
//             Quality rackets at every price point. Find the perfect balance between performance and value.
//           </p>
//         </div>

//         {/* Under ₹5,000 */}
//         <div className="space-y-6">
//           <div className="space-y-3">
//             <h3 className="text-2xl md:text-3xl font-bold text-slate-100">
//               Under ₹5,000 <span className="text-lg text-emerald-400 font-normal">Best Value</span>
//             </h3>
//             <p className="text-slate-400 max-w-3xl">
//               Affordable rackets perfect for beginners and recreational players. Great quality without breaking the bank.
//             </p>
//           </div>

//           <RacketCarousel
//             rackets={budgetRackets}
//             showPagination={true}
//             cardsPerView={{ desktop: 3, tablet: 2, mobile: 1.5 }}
//           />

//           <div className="text-center">
//             <Link
//               href="/rackets/under-5000"
//               className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
//             >
//               View All Budget Rackets ({totalBudget})
//               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//               </svg>
//             </Link>
//           </div>
//         </div>

//         {/* ₹5,000 - ₹8,000 */}
//         <div className="space-y-6">
//           <div className="space-y-3">
//             <h3 className="text-2xl md:text-3xl font-bold text-slate-100">
//               ₹5,000 - ₹8,000 <span className="text-lg text-blue-400 font-normal">Mid-Range</span>
//             </h3>
//             <p className="text-slate-400 max-w-3xl">
//               Great balance of performance and price. Ideal for intermediate players and club-level competition.
//             </p>
//           </div>

//           <RacketCarousel
//             rackets={midRangeRackets}
//             showPagination={true}
//             cardsPerView={{ desktop: 3, tablet: 2, mobile: 1.5 }}
//           />

//           <div className="text-center">
//             <Link
//               href="/rackets/5000-to-8000"
//               className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
//             >
//               View All Mid-Range Rackets ({totalMidRange})
//               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//               </svg>
//             </Link>
//           </div>
//         </div>

//         {/* ₹8,000 - ₹15,000 */}
//         <div className="space-y-6">
//           <div className="space-y-3">
//             <h3 className="text-2xl md:text-3xl font-bold text-slate-100">
//               ₹8,000 - ₹15,000 <span className="text-lg text-purple-400 font-normal">Premium</span>
//             </h3>
//             <p className="text-slate-400 max-w-3xl">
//               High-performance rackets for serious players. Advanced materials and technology for competitive edge.
//             </p>
//           </div>

//           <RacketCarousel
//             rackets={premiumRackets}
//             showPagination={true}
//             cardsPerView={{ desktop: 3, tablet: 2, mobile: 1.5 }}
//           />

//           <div className="text-center">
//             <Link
//               href="/rackets/8000-to-15000"
//               className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
//             >
//               View All Premium Rackets ({totalPremium})
//               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//               </svg>
//             </Link>
//           </div>
//         </div>

//         {/* Over ₹15,000 */}
//         <div className="space-y-6">
//           <div className="space-y-3">
//             <h3 className="text-2xl md:text-3xl font-bold text-slate-100">
//               Over ₹15,000 <span className="text-lg text-amber-400 font-normal">Professional</span>
//             </h3>
//             <p className="text-slate-400 max-w-3xl">
//               Top-tier professional rackets used by elite players. Cutting-edge technology and maximum performance.
//             </p>
//           </div>

//           <RacketCarousel
//             rackets={professionalRackets}
//             showPagination={true}
//             cardsPerView={{ desktop: 3, tablet: 2, mobile: 1.5 }}
//           />

//           <div className="text-center">
//             <Link
//               href="/rackets/above-15000"
//               className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
//             >
//               View All Professional Rackets ({totalProfessional})
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
import Link from "next/link";
import styles from "./PriceQuickFilter.module.css";
export default function PriceQuickFilter() {
  return (
    <section className="relative overflow-hidden border-y border-slate-200 bg-gradient-to-r from-amber-800 via-amber-700 to-amber-900 animate-gradient-x mt-8">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-glow" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-4">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            {/* Left Text */}
            <p className="text-slate-200 text-3xl font-black ">
              Looking for rackets within your budget?
            </p>

            {/* Right Buttons */}
            <div className="flex flex-wrap gap-2">
              <Link
                href="/rackets/under-5000"
                className="px-4 py-2 rounded-full text-sm font-semibold 
                         bg-slate-100 text-slate-700 border border-slate-200 
                         hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300
                         transition"
              >
                Under ₹5,000
              </Link>

              <Link
                href="/rackets/under-8000"
                className="px-4 py-2 rounded-full text-sm font-semibold 
                         bg-slate-100 text-slate-700 border border-slate-200 
                         hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300
                         transition"
              >
                Under ₹8,000
              </Link>

              <Link
                href="/rackets/under-15000"
                className="px-4 py-2 rounded-full text-sm font-semibold 
                         bg-slate-100 text-slate-700 border border-slate-200 
                         hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300
                         transition"
              >
                Under ₹15,000
              </Link>

              <Link
                href="/rackets/under-20000"
                className="px-4 py-2 rounded-full text-sm font-semibold 
                         bg-slate-100 text-slate-700 border border-slate-200 
                         hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300
                         transition"
              >
                Under ₹20,000
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
