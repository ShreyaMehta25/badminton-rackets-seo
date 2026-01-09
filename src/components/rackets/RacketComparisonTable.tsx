import { Racket } from "@/types/racket";
export default function RacketComparisonTable({
  rackets,
}: {
  rackets: Racket[];
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-800">
      <table className="min-w-full bg-slate-900 text-sm">
        <thead className="bg-slate-800 text-slate-300">
          <tr>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Price</th>
            <th className="px-4 py-3 text-left">Rating</th>
            <th className="px-4 py-3 text-left">Best For</th>
          </tr>
        </thead>
        <tbody>
          {rackets.map((racket) => (
            <tr
              key={racket.id}
              className="border-t border-slate-800 hover:bg-slate-800 transition"
            >
              <td className="px-4 py-3 font-medium">{racket.name}</td>
              <td className="px-4 py-3">₹{racket.price}</td>
              <td className="px-4 py-3">{racket.reviewScore} ⭐</td>
              <td className="px-4 py-3 flex gap-2 flex-wrap">
                {racket.bestFor.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 rounded bg-slate-700 text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
