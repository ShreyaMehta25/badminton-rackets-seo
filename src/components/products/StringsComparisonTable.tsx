"use client";

import { StringProduct } from "@/types/strings";
import { useRouter } from "next/navigation";
import { addIdsToProducts } from "@/utils/productHelpers";

export default function StringsComparisonTable({ strings }: { strings: StringProduct[] }) {
  const router = useRouter();
  const stringsWithIds = addIdsToProducts(strings);

  return (
    <>
      {/* Desktop Table - visible on md+ only */}
      <div className="hidden md:block overflow-x-auto border border-slate-200 bg-white shadow-md rounded-lg">
        <table className="min-w-full text-xs md:text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-3 md:px-6 py-3 md:py-4 text-left font-semibold text-slate-700 text-xs md:text-sm">
                String
              </th>
              <th className="px-3 md:px-6 py-3 md:py-4 text-center font-semibold text-slate-700 text-xs md:text-sm">
                Brand
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
            {stringsWithIds.map((str, index) => (
              <tr
                key={str.id}
                onClick={() => router.push(`/strings/${str.id}`)}
                className="border-t border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
                style={{ animationDelay: `${index * 50}ms` }}
                role="button"
                tabIndex={0}
              >
                {/* String */}
                <td className="px-3 md:px-6 py-4 md:py-5 font-medium text-slate-800">
                  <div className="flex items-center gap-2 md:gap-4">
                    <img
                      src={str.imageurl}
                      alt={str.name}
                      className="w-10 h-10 md:w-14 md:h-14 object-contain rounded-md border border-slate-200 bg-white shadow-sm flex-shrink-0"
                    />
                    <span className="text-xs md:text-sm">{str.name}</span>
                  </div>
                </td>

                {/* Brand */}
                <td className="px-3 md:px-6 py-4 md:py-5 text-center">
                  <span className="px-2 md:px-3 py-0.5 md:py-1 text-xs rounded-md bg-purple-50 text-purple-700 border border-purple-200 font-medium">
                    {str.brand}
                  </span>
                </td>

                {/* Score */}
                <td className="px-3 md:px-6 py-4 md:py-5 text-center">
                  <span className="inline-flex items-center gap-0.5 md:gap-1 px-2 md:px-3 py-0.5 md:py-1 rounded-md bg-yellow-50 border border-yellow-200 text-yellow-700 font-semibold text-xs md:text-sm">
                    ⭐ {str.reviewscore}
                  </span>
                </td>

                {/* Price */}
                <td className="px-3 md:px-6 py-4 md:py-5 text-center">
                  <span className="font-bold text-slate-800 text-xs md:text-sm">₹{str.price}</span>
                </td>

                {/* Buy - strings don't have affiliate URL in the data, so we'll use a placeholder */}
                <td className="px-3 md:px-6 py-4 md:py-5">
                  <button
                    className="inline-block px-3 md:px-5 py-1.5 md:py-2 rounded-md bg-slate-400 hover:bg-slate-300 text-white font-semibold transition text-xs md:text-sm whitespace-nowrap"
                  >
                    Buy Now
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View - visible on mobile only */}
      <div className="md:hidden space-y-4">
        {stringsWithIds.map((str, index) => (
          <div
            key={str.id}
            onClick={() => router.push(`/strings/${str.id}`)}
            className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            role="button"
            tabIndex={0}
          >
            {/* Header with Image and Name */}
            <div className="p-4 bg-slate-50 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <img
                  src={str.imageurl}
                  alt={str.name}
                  className="w-16 h-16 object-contain rounded-md border border-slate-200 bg-white shadow-sm flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-slate-800 line-clamp-2">
                    {str.name}
                  </h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-base font-bold text-slate-800">
                      ₹{str.price}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-yellow-50 border border-yellow-200 text-yellow-700 font-semibold text-xs">
                      ⭐ {str.reviewscore}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              {/* Brand */}
              <div>
                <h4 className="text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">
                  Brand
                </h4>
                <span className="px-2 py-1 text-xs rounded-md bg-purple-50 text-purple-700 border border-purple-200 font-medium">
                  {str.brand}
                </span>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">
                  Description
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {str.description}
                </p>
              </div>

              {/* Buy Button */}
              <div className="pt-2">
                <button
                  className="block w-full text-center px-4 py-2.5 rounded-md bg-slate-400 hover:bg-slate-300 text-white font-semibold transition text-sm"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
