"use client";

import { Shoe } from "@/types/shoes";
import { useRouter } from "next/navigation";
import { addIdsToProducts } from "@/utils/productHelpers";

export default function ShoesComparisonTable({ shoes }: { shoes: Shoe[] }) {
  const router = useRouter();
  const shoesWithIds = addIdsToProducts(shoes);

  return (
    <>
      {/* Desktop Table - visible on md+ only */}
      <div className="hidden md:block overflow-x-auto border border-slate-200 bg-white shadow-md rounded-lg">
        <table className="min-w-full text-xs md:text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-3 md:px-6 py-3 md:py-4 text-left font-semibold text-slate-700 text-xs md:text-sm">
                Shoe
              </th>
              <th className="px-3 md:px-6 py-3 md:py-4 text-center font-semibold text-slate-700 text-xs md:text-sm">
                Gender
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
            {shoesWithIds.map((shoe, index) => (
              <tr
                key={shoe.id}
                onClick={() => router.push(`/shoes/${shoe.id}`)}
                className="border-t border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
                style={{ animationDelay: `${index * 50}ms` }}
                role="button"
                tabIndex={0}
              >
                {/* Shoe */}
                <td className="px-3 md:px-6 py-4 md:py-5 font-medium text-slate-800">
                  <div className="flex items-center gap-2 md:gap-4">
                    <img
                      src={shoe.imageurl}
                      alt={shoe.name}
                      className="w-10 h-10 md:w-14 md:h-14 object-contain rounded-md border border-slate-200 bg-white shadow-sm flex-shrink-0"
                    />
                    <span className="text-xs md:text-sm max-w-[220px] break-words leading-snug">
                      {shoe.name}
                    </span>
                  </div>
                </td>

                {/* Gender */}
                <td className="px-3 md:px-6 py-4 md:py-5 text-center">
                  <span className="px-2 md:px-3 py-0.5 md:py-1 text-xs rounded-md bg-blue-50 text-blue-700 border border-blue-200 font-medium capitalize">
                    {shoe.gender}
                  </span>
                </td>

                {/* Brand */}
                <td className="px-3 md:px-6 py-4 md:py-5 text-center">
                  <span className="px-2 md:px-3 py-0.5 md:py-1 text-xs rounded-md bg-purple-50 text-purple-700 border border-purple-200 font-medium">
                    {shoe.brand}
                  </span>
                </td>

                {/* Score */}
                <td className="px-3 md:px-6 py-4 md:py-5 text-center">
                  <span className="inline-flex items-center gap-0.5 md:gap-1 px-2 md:px-3 py-0.5 md:py-1 rounded-md bg-yellow-50 border border-yellow-200 text-yellow-700 font-semibold text-xs md:text-sm">
                    ⭐ {shoe.reviewscore}
                  </span>
                </td>

                {/* Price */}
                <td className="px-3 md:px-6 py-4 md:py-5 text-center">
                  <span className="font-bold text-slate-800 text-xs md:text-sm">
                    ₹{shoe.price}
                  </span>
                </td>

                {/* Buy */}
                <td className="px-3 md:px-6 py-4 md:py-5">
                  <a
                    href={shoe.id}
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
        {shoesWithIds.map((shoe, index) => (
          <div
            key={shoe.id}
            onClick={() => router.push(`/shoes/${shoe.id}`)}
            className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            role="button"
            tabIndex={0}
          >
            {/* Header with Image and Name */}
            <div className="p-4 bg-slate-50 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <img
                  src={shoe.imageurl}
                  alt={shoe.name}
                  className="w-16 h-16 object-contain rounded-md border border-slate-200 bg-white shadow-sm flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-slate-800 line-clamp-2">
                    {shoe.name}
                  </h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-base font-bold text-slate-800">
                      ₹{shoe.price}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-yellow-50 border border-yellow-200 text-yellow-700 font-semibold text-xs">
                      ⭐ {shoe.reviewscore}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              {/* Gender */}
              <div>
                <h4 className="text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">
                  Gender
                </h4>
                <span className="px-2 py-1 text-xs rounded-md bg-blue-50 text-blue-700 border border-blue-200 font-medium capitalize">
                  {shoe.gender}
                </span>
              </div>

              {/* Brand */}
              <div>
                <h4 className="text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">
                  Brand
                </h4>
                <span className="px-2 py-1 text-xs rounded-md bg-purple-50 text-purple-700 border border-purple-200 font-medium">
                  {shoe.brand}
                </span>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">
                  Description
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {shoe.description}
                </p>
              </div>

              {/* Buy Button */}
              <div className="pt-2">
                <a
                  href={shoe.id}
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
