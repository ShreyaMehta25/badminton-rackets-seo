"use client";

// import { Racket } from "@/types/racket";
// import { useRouter } from "next/navigation";

// const formatBestForLabel = (label: string) =>
//   label
//     .split("-")
//     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//     .join("-");

// export default function ComparisonTable({ rackets }: { rackets: Racket[] }) {
//   const router = useRouter();
//   return (
//     <div className="overflow-x-auto rounded-2xl border border-slate-700/50 shadow-2xl bg-gradient-to-br from-slate-900 to-slate-950">
//       <table className="min-w-full text-sm">
//         <thead className="bg-gradient-to-r from-slate-800 via-slate-800 to-slate-800 border-b border-slate-700/50">
//           <tr>
//             <th className="px-6 py-4 text-left font-bold text-slate-200">Racket</th>
//             <th className="px-6 py-4 text-center font-bold text-slate-200">Pros</th>
//             <th className="px-6 py-4 text-center font-bold text-slate-200">Cons</th>
//             <th className="px-6 py-4 text-center font-bold text-slate-200">Best For</th>
//             <th className="px-6 py-4 text-center font-bold text-slate-200">Score</th>
//             <th className="px-6 py-4 text-center font-bold text-slate-200">Price</th>
//             <th className="px-6 py-4 text-center font-bold text-slate-200"></th>
//           </tr>
//         </thead>

//         <tbody>
//           {rackets.map((r, index) => (
//             <tr
//               key={r.id}
//               onClick={() => router.push(`/rackets/${r.id}`)}
//               className="border-t border-slate-800/50 hover:bg-gradient-to-r hover:from-slate-800/50 hover:to-slate-800/30 transition-all duration-300 group cursor-pointer"
//               style={{ animationDelay: `${index * 50}ms` }}
//               role="button"
//               tabIndex={0}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter" || e.key === " ") {
//                   e.preventDefault();
//                   router.push(`/rackets/${r.id}`);
//                 }
//               }}
//             >
//               <td className="px-6 py-5 font-semibold">
//                 <div className="flex items-center gap-4">
//                   <div className="relative">
//                     <div className="absolute inset-0 bg-emerald-500/20 rounded-xl blur-md group-hover:blur-lg transition-all opacity-0 group-hover:opacity-100"></div>
//                     <img
//                       src={r.imageUrl}
//                       alt={r.name}
//                       className="w-14 h-14 object-contain rounded-lg relative z-10 border border-slate-700/50 shadow-lg group-hover:scale-110 transition-transform"
//                     />
//                   </div>
//                   <span className="text-slate-200 group-hover:text-emerald-300 transition-colors">{r.name}</span>
//                 </div>
//               </td>

//               <td className="px-6 py-5">
//                 <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
//                   {r.pros.map((p) => (
//                     <li key={p} className="leading-relaxed">{p}</li>
//                   ))}
//                 </ul>
//               </td>

//               <td className="px-6 py-5">
//                 <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
//                   {r.cons.map((c) => (
//                     <li key={c} className="leading-relaxed">{c}</li>
//                   ))}
//                 </ul>
//               </td>

//               {/* <td className="px-4 py-4 flex flex-wrap gap-1">
//                 {r.bestFor.map((b) => (
//                   <span
//                     key={b}
//                     className="px-2 py-1 text-xs rounded bg-slate-700"
//                   >
//                     {formatBestForLabel(b)}
//                   </span>
//                 ))}
//               </td> */}
//               <td className="px-6 py-5">
//                 <div className="flex flex-wrap justify-center items-center gap-2 min-h-[2.5rem]">
//                   {r.bestFor.map((b) => (
//                     <span
//                       key={b}
//                       className="px-3 py-1.5 text-xs rounded-lg bg-gradient-to-r from-emerald-600/20 to-emerald-500/20 border border-emerald-500/30 text-emerald-200 font-medium shadow-md"
//                     >
//                       {formatBestForLabel(b)}
//                     </span>
//                   ))}
//                 </div>
//               </td>

//               <td className="px-6 py-5 text-center">
//                 <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-yellow-500/20 to-yellow-400/20 border border-yellow-500/30 text-yellow-200 font-bold">
//                   ⭐ {r.reviewScore}
//                 </span>
//               </td>

//               <td className="px-6 py-5 text-center">
//                 <span className="font-bold text-lg bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
//                   ₹{r.price}
//                 </span>
//               </td>

//               <td className="px-6 py-5">
//                 <a
//                   href={r.affiliateUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   onClick={(e) => e.stopPropagation()}
//                   className="group/btn inline-block px-5 py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
//                 >
//                   Buy Now
//                 </a>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

import { Racket } from "@/types/racket";
import { useRouter } from "next/navigation";

const formatBestForLabel = (label: string) =>
  label
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("-");

export default function ComparisonTable({ rackets }: { rackets: Racket[] }) {
  const router = useRouter();

  return (
    <>
      {/* Desktop Table - visible on md+ only */}
      <div className="hidden md:block overflow-x-auto border border-slate-200 bg-white shadow-md rounded-lg">
        <table className="min-w-full text-xs md:text-sm">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="px-3 md:px-6 py-3 md:py-4 text-left font-semibold text-slate-700 text-xs md:text-sm">
              Racket
            </th>
            <th className="px-3 md:px-6 py-3 md:py-4 text-center font-semibold text-slate-700 text-xs md:text-sm">
              Pros
            </th>
            <th className="px-3 md:px-6 py-3 md:py-4 text-center font-semibold text-slate-700 text-xs md:text-sm">
              Cons
            </th>
            <th className="px-3 md:px-6 py-3 md:py-4 text-center font-semibold text-slate-700 text-xs md:text-sm">
              Best For
            </th>
            <th className="px-3 md:px-6 py-3 md:py-4 text-center font-semibold text-slate-700 text-xs md:text-sm">
              Score
            </th>
            <th className="px-3 md:px-6 py-3 md:py-4 text-center font-semibold text-slate-700 text-xs md:text-sm">
              Price
            </th>
            <th className="px-3 md:px-6 py-3 md:py-4"></th>
          </tr>
        </thead>

        <tbody>
          {rackets.map((r, index) => (
            <tr
              key={r.id}
              onClick={() => router.push(`/rackets/${r.id}`)}
              className="border-t border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
              style={{ animationDelay: `${index * 50}ms` }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  router.push(`/rackets/${r.id}`);
                }
              }}
            >
              {/* Racket */}
              <td className="px-3 md:px-6 py-4 md:py-5 font-medium text-slate-800">
                <div className="flex items-center gap-2 md:gap-4">
                  <img
                    src={r.imageUrl}
                    alt={r.name}
                    className="w-10 h-10 md:w-14 md:h-14 object-contain rounded-md border border-slate-200 bg-white shadow-sm flex-shrink-0"
                  />
                  <span className="text-xs md:text-sm">{r.name}</span>
                </div>
              </td>

              {/* Pros */}
              <td className="px-3 md:px-6 py-4 md:py-5">
                <ul className="list-disc pl-4 md:pl-5 space-y-0.5 md:space-y-1 text-slate-600 text-xs md:text-sm">
                  {r.pros.map((p) => (
                    <li key={p} className="leading-relaxed">
                      {p}
                    </li>
                  ))}
                </ul>
              </td>

              {/* Cons */}
              <td className="px-3 md:px-6 py-4 md:py-5">
                <ul className="list-disc pl-4 md:pl-5 space-y-0.5 md:space-y-1 text-slate-500 text-xs md:text-sm">
                  {r.cons.map((c) => (
                    <li key={c} className="leading-relaxed">
                      {c}
                    </li>
                  ))}
                </ul>
              </td>

              {/* Best For */}
              <td className="px-3 md:px-6 py-4 md:py-5">
                <div className="flex flex-wrap justify-center gap-1 md:gap-2">
                  {r.bestFor.map((b) => (
                    <span
                      key={b}
                      className="px-2 md:px-3 py-0.5 md:py-1 text-xs rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium"
                    >
                      {formatBestForLabel(b)}
                    </span>
                  ))}
                </div>
              </td>

              {/* Score */}
              <td className="px-3 md:px-6 py-4 md:py-5 text-center">
                <span className="inline-flex items-center gap-0.5 md:gap-1 px-2 md:px-3 py-0.5 md:py-1 rounded-md bg-yellow-50 border border-yellow-200 text-yellow-700 font-semibold text-xs md:text-sm">
                  ⭐ {r.reviewScore}
                </span>
              </td>

              {/* Price */}
              <td className="px-3 md:px-6 py-4 md:py-5 text-center">
                <span className="font-bold text-slate-800 text-xs md:text-sm">₹{r.price}</span>
              </td>

              {/* Buy */}
              <td className="px-3 md:px-6 py-4 md:py-5">
                <a
                  href={r.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-block px-3 md:px-5 py-1.5 md:py-2 rounded-md bg-slate-400 hover:bg-slate-300 text-white font-semibold transition text-xs md:text-sm whitespace-nowrap"
                >
                  Buy Now
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

      {/* Mobile Card View - visible on mobile only */}
      <div className="md:hidden space-y-4">
        {rackets.map((r, index) => (
          <div
            key={r.id}
            onClick={() => router.push(`/rackets/${r.id}`)}
            className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                router.push(`/rackets/${r.id}`);
              }
            }}
          >
            {/* Header with Image and Name */}
            <div className="p-4 bg-slate-50 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <img
                  src={r.imageUrl}
                  alt={r.name}
                  className="w-16 h-16 object-contain rounded-md border border-slate-200 bg-white shadow-sm flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-slate-800 line-clamp-2">
                    {r.name}
                  </h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-base font-bold text-slate-800">
                      ₹{r.price}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-yellow-50 border border-yellow-200 text-yellow-700 font-semibold text-xs">
                      ⭐ {r.reviewScore}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              {/* Pros */}
              <div>
                <h4 className="text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">
                  Pros
                </h4>
                <ul className="list-disc pl-4 space-y-0.5 text-slate-600 text-xs">
                  {r.pros.map((p) => (
                    <li key={p} className="leading-relaxed">
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cons */}
              <div>
                <h4 className="text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">
                  Cons
                </h4>
                <ul className="list-disc pl-4 space-y-0.5 text-slate-500 text-xs">
                  {r.cons.map((c) => (
                    <li key={c} className="leading-relaxed">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Best For */}
              <div>
                <h4 className="text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">
                  Best For
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {r.bestFor.map((b) => (
                    <span
                      key={b}
                      className="px-2 py-1 text-xs rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium"
                    >
                      {formatBestForLabel(b)}
                    </span>
                  ))}
                </div>
              </div>

              {/* Buy Button */}
              <div className="pt-2">
                <a
                  href={r.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="block w-full text-center px-4 py-2.5 rounded-md bg-slate-400 hover:bg-slate-300 text-white font-semibold transition text-sm"
                >
                  Buy Now
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
