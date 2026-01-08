import { Racket } from "@/types/racket";

const levelColor = {
  beginner: "bg-green-500",
  intermediate: "bg-yellow-500",
  advanced: "bg-red-500",
};

export default function RacketCard({ racket }: { racket: Racket }) {
  return (
    <div className="group bg-slate-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition">
      <div className="aspect-square bg-slate-800">
        <img
          src={racket.imageUrl}
          alt={racket.name}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition"
        />
      </div>
      <div className="p-4 space-y-2"></div>
      <h3 className="text-lg font-bold">{racket.name}</h3>
      <p className="text-sm text-slate-400">{racket.brand}</p>
      <div className="flex flex-wrap gap-2 mt-2">
        <span className="px-2 py-1 text-xs rounded bg-slate-700">
          ₹{racket.price}
        </span>
        <span
          className={`px-2 py-1 text-xs rounded ${
            levelColor[racket.playerLevel]
          }`}
        >
          {racket.playerLevel}
        </span>

        <span className="px-2 py-1 text-xs rounded bg-blue-500">
          {racket.balance}
        </span>
      </div>
    </div>
  );
}
