import { Racket } from "@/types/racket";

const formatBestForLabel = (label: string) =>
  label
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("-");

export default function ComparisonTable({ rackets }: { rackets: Racket[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-800">
      <table className="min-w-full text-sm bg-slate-900">
        <thead className="bg-slate-800 text-slate-300">
          <tr>
            <th className="px-4 py-3 text-left">Racket</th>
            <th className="px-4 py-3">Pros</th>
            <th className="px-4 py-3">Cons</th>
            <th className="px-4 py-3">Best For</th>
            <th className="px-4 py-3">Score</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>

        <tbody>
          {rackets.map((r) => (
            <tr
              key={r.id}
              className="border-t border-slate-800 hover:bg-slate-800 transition"
            >
              <td className="px-4 py-4 font-semibold flex items-center gap-3">
                <img
                  src={r.imageUrl}
                  alt={r.name}
                  className="w-12 h-12 object-contain rounded"
                />
                {r.name}
              </td>

              <td className="px-4 py-4">
                <ul className="list-disc pl-4 space-y-1">
                  {r.pros.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </td>

              <td className="px-4 py-4">
                <ul className="list-disc pl-4 space-y-1 text-slate-400">
                  {r.cons.map((c) => (
                    <li key={c}>{c}</li>
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
              <td className="px-4 py-4">
                <div className="flex flex-wrap justify-center items-center gap-1 min-h-[2.5rem]">
                  {r.bestFor.map((b) => (
                    <span
                      key={b}
                      className="px-2 py-1 text-xs rounded bg-slate-700"
                    >
                      {formatBestForLabel(b)}
                    </span>
                  ))}
                </div>
              </td>

              <td className="px-4 py-4 font-semibold">⭐ {r.reviewScore}</td>

              <td className="px-4 py-4 font-semibold">₹{r.price}</td>

              <td className="px-4 py-4">
                <a
                  href={r.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 rounded bg-emerald-500 hover:bg-emerald-400 text-black font-semibold"
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
