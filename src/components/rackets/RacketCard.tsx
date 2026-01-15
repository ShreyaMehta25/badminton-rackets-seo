import { Racket } from "@/types/racket";
import Link from "next/link";

const levelColor = {
  beginner: "bg-green-500",
  intermediate: "bg-yellow-500",
  advanced: "bg-red-500",
};

export default function RacketCard({
  racket,
}: {
  racket: Racket;
}) {
  return (
    <Link
      href={`/rackets/${racket.id}`}
      className="group relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 block border border-slate-700/50 hover:border-emerald-500/50 hover:-translate-y-1"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-emerald-500/0 to-emerald-500/0 group-hover:from-emerald-500/5 group-hover:via-emerald-500/5 group-hover:to-emerald-500/5 transition-all duration-300 pointer-events-none"></div>
      
      <div className="aspect-square bg-gradient-to-br from-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <img
          src={racket.imageUrl}
          alt={racket.name}
          className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-500 relative z-10"
        />
      </div>
      <div className="p-6 space-y-3 relative z-10">
        <div>
          <h3 className="text-lg font-bold leading-tight text-slate-100 group-hover:text-emerald-300 transition-colors">
            {racket.name}
          </h3>
          <p className="text-sm text-slate-400 mt-1">{racket.brand}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg">
            ₹{racket.price}
          </span>
          <span
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg text-white shadow-lg ${levelColor[racket.playerLevel]}`}
          >
            {racket.playerLevel}
          </span>
          <span className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg">
            {racket.balance}
          </span>
        </div>
      </div>
    </Link>
  );
}
