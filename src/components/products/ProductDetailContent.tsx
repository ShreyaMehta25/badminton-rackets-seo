"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

interface Product {
  name: string;
  price: number;
  rating: number;
  review_count: number;
  product_url: string;
  id: string;
  imageurl?: string;
  description?: string;
  brand?: string;
  gender?: string;
  speed?: string;
}

const getRatingLabel = (score: number): string => {
  if (score >= 4.5) return "ELITE RATING";
  if (score >= 4.0) return "PRO RATING";
  if (score >= 3.5) return "PREMIUM RATING";
  return "GOOD RATING";
};

function calculateSimilarityScore(
  current: Product,
  candidate: Product,
): number {
  let score = 0;

  // Price similarity
  const priceDiff = Math.abs(current.price - candidate.price);
  if (priceDiff < 500) score += 3;
  else if (priceDiff < 1000) score += 2;
  else if (priceDiff < 2000) score += 1;

  // Rating similarity
  if (Math.abs(current.rating - candidate.rating) < 0.5) score += 2;

  return score;
}

function getSimilarProducts(
  currentProduct: Product,
  allProducts: Product[],
): Product[] {
  const priceMin = currentProduct.price * 0.7;
  const priceMax = currentProduct.price * 1.5;

  return allProducts
    .filter((p) => {
      if (p.id === currentProduct.id) return false;
      if (p.price < priceMin || p.price > priceMax) return false;
      return true;
    })
    .sort(
      (a, b) =>
        calculateSimilarityScore(currentProduct, b) -
        calculateSimilarityScore(currentProduct, a),
    )
    .filter((p, i, arr) => arr.findIndex((x) => x.id === p.id) === i)
    .slice(0, 4);
}

export default function ProductDetailContent({
  product,
  allProducts,
  category,
}: {
  product: Product;
  allProducts: Product[];
  category: "shoes" | "strings" | "grips" | "shuttlecock";
}) {
  const router = useRouter();
  const similarProducts = getSimilarProducts(product, allProducts);

  const [showFullDescription, setShowFullDescription] = useState(false);

  const categoryLabels = {
    shoes: "Shoes",
    strings: "Strings",
    grips: "Grips",
    shuttlecock: "Shuttlecocks",
  };

  return (
    <div className="bg-white text-slate-800">
      {/* Back */}
      <div className="w-full px-4 pt-4 pb-2">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm font-medium hover:text-emerald-600"
        >
          ← Back to Search Results
        </button>
      </div>

      <main className="w-full px-4 pb-6">
        {/* HERO */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="flex justify-center">
            <div className="w-full max-w-sm bg-slate-50 border border-slate-200 rounded-lg p-3">
              <div className="aspect-square flex items-center justify-center overflow-hidden">
                {product.imageurl ? (
                  <img
                    src={product.imageurl}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="text-slate-300 text-sm">Product Image</div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {product.rating > 0 && (
              <div className="flex justify-end">
                <span className="px-3 py-1 text-xs font-bold bg-emerald-100 text-emerald-700 rounded-md">
                  {product.rating.toFixed(1)}/5 {getRatingLabel(product.rating)}
                </span>
              </div>
            )}

            <h1 className="text-3xl md:text-4xl font-extrabold">
              {product.name}
            </h1>

            {product.review_count > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-amber-500">★</span>
                <span className="text-sm text-slate-600">
                  {product.rating.toFixed(1)} ({product.review_count} reviews)
                </span>
              </div>
            )}

            {/* Brand (plain text, safe if empty string) */}
            {product.brand !== undefined && (
              <div>
                <p className="text-xs uppercase text-slate-500">Brand</p>
                <p className="text-sm font-medium text-slate-700">
                  {product.brand || ""}
                </p>
              </div>
            )}

            {/* Capsule-style attributes */}
            <div className="flex flex-wrap gap-2">
              {product.gender && (
                <span className="px-3 py-1 text-sm bg-slate-100 border border-slate-200 rounded-md capitalize">
                  Gender: {product.gender}
                </span>
              )}

              {product.speed && (
                <span className="px-3 py-1 text-sm bg-slate-100 border border-slate-200 rounded-md">
                  Speed: {product.speed}
                </span>
              )}
            </div>
            <div>
              <p className="text-xs uppercase text-slate-500">Price</p>
              <p className="text-xl font-bold text-emerald-600">
                ₹{product.price.toLocaleString()}
              </p>
            </div>
            {/* DESCRIPTION (moved above button) */}
            {product.description && (
              <div className="space-y-1">
                <p
                  className={`text-sm text-slate-600 leading-relaxed ${
                    showFullDescription ? "" : "line-clamp-3"
                  }`}
                >
                  {product.description}
                </p>

                {product.description.length > 150 && (
                  <button
                    onClick={() => setShowFullDescription((prev) => !prev)}
                    className="text-xs font-semibold text-emerald-600 hover:underline"
                  >
                    {showFullDescription ? "Show less" : "Show more"}
                  </button>
                )}
              </div>
            )}

            <a
              href={product.product_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex justify-center px-6 py-2 rounded-md bg-emerald-600 text-white font-semibold hover:bg-emerald-500"
            >
              Add to Arsenel
            </a>
          </div>
        </section>

        {/* DESCRIPTION */}

        {/* SIMILAR PRODUCTS */}
        {similarProducts.length >= 2 && (
          <section>
            <h2 className="text-sm font-bold uppercase mb-4 text-center">
              Similar {categoryLabels[category]} You May Like
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {similarProducts.map((p) => (
                <Link
                  key={p.id}
                  href={`/${category}/${p.id}`}
                  className="border border-slate-200 rounded-md hover:border-emerald-300 p-3 flex flex-col"
                >
                  <div className="aspect-square flex items-center justify-center overflow-hidden mb-2 bg-slate-50 rounded">
                    {p.imageurl ? (
                      <img
                        src={p.imageurl}
                        alt={p.name}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="text-slate-300 text-xs">Image</div>
                    )}
                  </div>

                  <p className="text-sm font-semibold line-clamp-2 text-center">
                    {p.name}
                  </p>
                  <p className="text-xs text-emerald-600 font-bold text-center">
                    ₹{p.price.toLocaleString()}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
