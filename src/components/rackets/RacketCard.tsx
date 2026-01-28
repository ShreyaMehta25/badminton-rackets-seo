// import { Racket } from "@/types/racket";
// import Link from "next/link";

// const levelColor = {
//   beginner: "bg-green-50 text-green-700 border-green-200",
//   intermediate: "bg-amber-50 text-amber-700 border-amber-200",
//   advanced: "bg-red-50 text-red-700 border-red-200",
// };

// const balanceColor = {
//   "head-heavy": "bg-purple-50 text-purple-700 border-purple-200",
//   "head-light": "bg-blue-50 text-blue-700 border-blue-200",
//   "even": "bg-slate-50 text-slate-700 border-slate-200",
// };

// export default function RacketCard({
//   racket,
// }: {
//   racket: Racket;
// }) {
//   return (
//     <Link
//       href={`/rackets/${racket.id}`}
//       className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 block border border-slate-200 hover:border-emerald-300 hover:-translate-y-1"
//     >
//       {/* Image Area */}
//       <div className="aspect-square bg-slate-50 relative overflow-hidden rounded-t-2xl">
//         <img
//           src={racket.imageUrl}
//           alt={racket.name}
//           className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-300"
//         />
//       </div>

//       {/* Content Area */}
//       <div className="p-5 space-y-3">
//         {/* Title & Brand */}
//         <div>
//           <h3 className="text-base font-semibold leading-tight text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2">
//             {racket.name}
//           </h3>
//           <p className="text-xs text-slate-500 mt-1 uppercase tracking-wide">{racket.brand}</p>
//         </div>

//         {/* Price - Prominent */}
//         <div className="pt-1">
//           <span className="text-2xl font-bold text-emerald-600">₹{racket.price.toLocaleString()}</span>
//         </div>

//         {/* Tags/Capsules */}
//         <div className="flex flex-wrap gap-1.5">
//           <span
//             className={`px-2.5 py-1 text-xs font-medium rounded-full border ${levelColor[racket.playerLevel]}`}
//           >
//             {racket.playerLevel}
//           </span>
//           <span
//             className={`px-2.5 py-1 text-xs font-medium rounded-full border ${balanceColor[racket.balance] || "bg-slate-50 text-slate-700 border-slate-200"}`}
//           >
//             {racket.balance}
//           </span>
//         </div>

//         {/* Why this racket - Description hint */}
//         {racket.bestFor && racket.bestFor.length > 0 && (
//           <div className="pt-2 border-t border-slate-100">
//             <p className="text-xs text-slate-600 leading-snug">
//               <span className="font-medium text-slate-700">Why this racket: </span>
//               {racket.bestFor.slice(0, 2).join(", ")}
//             </p>
//           </div>
//         )}
//       </div>
//     </Link>
//   );
// }
import { Racket } from "@/types/racket";
import Link from "next/link";

const levelColor = {
  beginner: "bg-green-50 text-green-700 border-green-200",
  intermediate: "bg-amber-50 text-amber-700 border-amber-200",
  advanced: "bg-red-50 text-red-700 border-red-200",
};

const balanceColor = {
  "head-heavy": "bg-purple-50 text-purple-700 border-purple-200",
  "head-light": "bg-blue-50 text-blue-700 border-blue-200",
  even: "bg-slate-50 text-slate-700 border-slate-200",
};

// ✅ ONLY ADDITION: formatter
const formatLabel = (value: string) =>
  value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("-");

export default function RacketCard({ racket }: { racket: Racket }) {
  return (
    <Link
      href={`/rackets/${racket.id}`}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 block border border-slate-200 hover:border-emerald-300 hover:-translate-y-1"
    >
      {/* Image Area */}
      <div className="h-32 md:h-44 bg-slate-50 relative overflow-hidden rounded-t-2xl">
        <img
          src={racket.imageUrl}
          alt={racket.name}
          className="w-full h-full object-contain p-1.5 md:p-2 group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content Area */}
      <div className="p-2 md:p-3 space-y-1.5 md:space-y-2">
        {/* Title & Brand */}
        <div>
          <h3 className="text-xs md:text-sm font-medium leading-tight text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2">
            {racket.name}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5 md:mt-1 uppercase tracking-wide">
            {racket.brand}
          </p>
        </div>

        {/* Price */}
        <div className="pt-0.5 md:pt-1">
          <span className="text-sm md:text-base font-bold text-slate-600">
            ₹{racket.price.toLocaleString()}
          </span>
        </div>

        {/* Tags/Capsules */}
        <div className="flex flex-wrap gap-1">
          <span
            className={`px-1.5 md:px-2.5 py-0.5 md:py-1 text-xs font-medium rounded-full border ${levelColor[racket.playerLevel]}`}
          >
            {formatLabel(racket.playerLevel)}
          </span>

          <span
            className={`px-1.5 md:px-2.5 py-0.5 md:py-1 text-xs font-medium rounded-full border ${
              balanceColor[racket.balance] ||
              "bg-slate-50 text-slate-700 border-slate-200"
            }`}
          >
            {formatLabel(racket.balance)}
          </span>
        </div>

        {/* Why this racket */}
        {racket.bestFor && racket.bestFor.length > 0 && (
          <div className="pt-1.5 md:pt-2 border-t border-slate-100">
            <p className="text-xs text-slate-600 leading-snug line-clamp-2">
              <span className="font-medium text-slate-700">
                Why:{" "}
              </span>
              {racket.bestFor.slice(0, 2).map(formatLabel).join(", ")}
            </p>
          </div>
        )}
      </div>
    </Link>
  );
}
