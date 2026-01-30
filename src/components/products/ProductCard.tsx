import Link from "next/link";

interface Product {
  name: string;
  brand: string;
  price: number;
  imageurl: string;
  reviewscore: number | string;
  id: string;
}

interface ProductCardProps {
  product: Product;
  category: "shoes" | "strings" | "grips" | "shuttlecock";
}

export default function ProductCard({ product, category }: ProductCardProps) {
  // Parse reviewscore to number if it's a string, handle empty strings
  const reviewScore = typeof product.reviewscore === 'string'
    ? (product.reviewscore === '' ? 0 : parseFloat(product.reviewscore))
    : (product.reviewscore || 0);

  return (
    <Link
      href={`/${category}/${product.id}`}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 block border border-slate-200 hover:border-emerald-300 hover:-translate-y-1"
    >
      {/* Image Area - EXACT MATCH to RacketCard */}
      <div className="h-32 md:h-44 bg-slate-50 relative overflow-hidden rounded-t-2xl">
        <img
          src={product.imageurl}
          alt={product.name}
          className="w-full h-full object-contain p-1.5 md:p-2 group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content Area - EXACT MATCH to RacketCard */}
      <div className="p-2 md:p-3 space-y-1.5 md:space-y-2">
        {/* Title & Brand */}
        <div>
          <h3 className="text-xs md:text-sm font-medium leading-tight text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2">
            {product.name}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5 md:mt-1 uppercase tracking-wide">
            {product.brand}
          </p>
        </div>

        {/* Price */}
        <div className="pt-0.5 md:pt-1">
          <span className="text-sm md:text-base font-bold text-slate-600">
            ₹{product.price.toLocaleString()}
          </span>
        </div>

        {/* Review Score */}
        {reviewScore > 0 && (
          <div className="flex items-center gap-1">
            <span className="text-amber-500 text-sm">★</span>
            <span className="text-xs md:text-sm font-medium text-slate-700">
              {reviewScore.toFixed(1)}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
