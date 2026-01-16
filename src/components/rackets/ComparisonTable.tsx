"use client";

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
    <div className="overflow-x-auto rounded-2xl border border-slate-700/50 shadow-2xl bg-gradient-to-br from-slate-900 to-slate-950">
      <table className="min-w-full text-sm">
        <thead className="bg-gradient-to-r from-slate-800 via-slate-800 to-slate-800 border-b border-slate-700/50">
          <tr>
            <th className="px-6 py-4 text-left font-bold text-slate-200">Racket</th>
            <th className="px-6 py-4 text-center font-bold text-slate-200">Pros</th>
            <th className="px-6 py-4 text-center font-bold text-slate-200">Cons</th>
            <th className="px-6 py-4 text-center font-bold text-slate-200">Best For</th>
            <th className="px-6 py-4 text-center font-bold text-slate-200">Score</th>
            <th className="px-6 py-4 text-center font-bold text-slate-200">Price</th>
            <th className="px-6 py-4 text-center font-bold text-slate-200"></th>
          </tr>
        </thead>

        <tbody>
          {rackets.map((r, index) => (
            <tr
              key={r.id}
              onClick={() => router.push(`/rackets/${r.id}`)}
              className="border-t border-slate-800/50 hover:bg-gradient-to-r hover:from-slate-800/50 hover:to-slate-800/30 transition-all duration-300 group cursor-pointer"
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
              <td className="px-6 py-5 font-semibold">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-emerald-500/20 rounded-xl blur-md group-hover:blur-lg transition-all opacity-0 group-hover:opacity-100"></div>
                    <img
                      src={r.imageUrl}
                      alt={r.name}
                      className="w-14 h-14 object-contain rounded-lg relative z-10 border border-slate-700/50 shadow-lg group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <span className="text-slate-200 group-hover:text-emerald-300 transition-colors">{r.name}</span>
                </div>
              </td>

              <td className="px-6 py-5">
                <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                  {r.pros.map((p) => (
                    <li key={p} className="leading-relaxed">{p}</li>
                  ))}
                </ul>
              </td>

              <td className="px-6 py-5">
                <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
                  {r.cons.map((c) => (
                    <li key={c} className="leading-relaxed">{c}</li>
                  ))}
                </ul>
              </td>

              {/* <td className="px-4 py-4 flex flex-wrap gap-1">
                {r.bestFor.map((b) => (
                  <span
                    key={b}
                    className="px-2 py-1 text-xs rounded bg-slate-700"
                  >
                    {formatBestForLabel(b)}
                  </span>
                ))}
              </td> */}
              <td className="px-6 py-5">
                <div className="flex flex-wrap justify-center items-center gap-2 min-h-[2.5rem]">
                  {r.bestFor.map((b) => (
                    <span
                      key={b}
                      className="px-3 py-1.5 text-xs rounded-lg bg-gradient-to-r from-emerald-600/20 to-emerald-500/20 border border-emerald-500/30 text-emerald-200 font-medium shadow-md"
                    >
                      {formatBestForLabel(b)}
                    </span>
                  ))}
                </div>
              </td>

              <td className="px-6 py-5 text-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-yellow-500/20 to-yellow-400/20 border border-yellow-500/30 text-yellow-200 font-bold">
                  ⭐ {r.reviewScore}
                </span>
              </td>

              <td className="px-6 py-5 text-center">
                <span className="font-bold text-lg bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
                  ₹{r.price}
                </span>
              </td>

              <td className="px-6 py-5">
                <a
                  href={r.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="group/btn inline-block px-5 py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
                >
                  Buy Now
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
