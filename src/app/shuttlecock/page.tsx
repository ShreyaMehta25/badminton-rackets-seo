"use client";

// import shuttlecocks from "@/data/shuttlecock.json";
// import ProductGrid from "@/components/products/ProductGrid";
// import CategoryFilterSidebar from "@/components/products/CategoryFilterSidebar";
// import { ProductFilterProvider } from "@/contexts/ProductFilterContext";
// import { addIdsToProducts, extractBrandFromName, parseShuttlecockPrice } from "@/utils/productHelpers";
// import Script from "next/script";

// const SITE_URL =
//   process.env.NEXT_PUBLIC_SITE_URL ||
//   "https://badminton-rackets-seo-fdn9.vercel.app";

// // Placeholder image for shuttlecocks
// const PLACEHOLDER_IMAGE = "https://via.placeholder.com/400x400/f8fafc/64748b?text=Shuttlecock";

// export default function ShuttlecockPage() {
//   // Transform shuttlecock data to match expected format
//   const rawShuttlecocks = shuttlecocks as Array<{
//     name: string;
//     price: string;
//     reviewscore: string;
//     speed?: string;
//   }>;

//   const transformedShuttlecocks = rawShuttlecocks.map((shuttle) => ({
//     name: shuttle.name,
//     brand: extractBrandFromName(shuttle.name),
//     price: parseShuttlecockPrice(shuttle.price),
//     imageurl: PLACEHOLDER_IMAGE,
//     reviewscore: shuttle.reviewscore,
//     speed: shuttle.speed || "",
//   }));

//   const allShuttlecocks = addIdsToProducts(transformedShuttlecocks);

//   const collectionSchema = {
//     "@context": "https://schema.org",
//     "@type": "CollectionPage",
//     name: "Badminton Shuttlecocks Directory",
//     description: "Complete collection of badminton shuttlecocks",
//     mainEntity: {
//       "@type": "ItemList",
//       numberOfItems: allShuttlecocks.length,
//       itemListElement: allShuttlecocks.slice(0, 10).map((shuttle, index) => ({
//         "@type": "ListItem",
//         position: index + 1,
//         item: {
//           "@type": "Product",
//           name: shuttle.name,
//         },
//       })),
//     },
//   };

//   return (
//     <ProductFilterProvider>
//       <Script
//         id="collection-schema"
//         type="application/ld+json"
//         strategy="afterInteractive"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify(collectionSchema),
//         }}
//       />

//       <main className="py-6 md:py-10 bg-white">
//         <div className="max-w-[1920px] mx-auto px-4 md:px-6">
//           {/* Desktop: 2-column with sidebar | Mobile: 1-column without sidebar */}
//           <div className="grid grid-cols-1 sm:grid-cols-[280px_1fr] gap-6">
//             {/* Sidebar - hidden on mobile (<640px), visible on sm+ (iPad mini, tablets, desktop) */}
//             <aside className="hidden sm:block">
//               <CategoryFilterSidebar products={allShuttlecocks} category="shuttlecock" />
//             </aside>

//             <div className="animate-fade-in">
//               {/* Header */}
//               <div className="relative mb-6 md:mb-8">
//                 <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 md:mb-3 text-slate-900">
//                   Badminton Shuttlecocks
//                 </h1>

//                 <h2 className="text-sm md:text-med lg:text-lg text-slate-700 mb-3 md:mb-4">
//                   Find the perfect shuttles for your game
//                 </h2>

//                 <div className="absolute -bottom-2 left-0 w-32 md:w-48 h-0.5 bg-slate-500/70 rounded-full"></div>
//               </div>

//               <ProductGrid products={allShuttlecocks} category="shuttlecock" />
//             </div>
//           </div>
//         </div>
//       </main>
//     </ProductFilterProvider>
//   );
// }

import shuttlecocks from "@/data/shuttlecock.json";
import ProductGrid from "@/components/products/ProductGrid";
import CategoryFilterSidebar from "@/components/products/CategoryFilterSidebar";
import { ProductFilterProvider } from "@/contexts/ProductFilterContext";
import {
  addIdsToProducts,
  extractBrandFromName,
  parseShuttlecockPrice,
} from "@/utils/productHelpers";
import Script from "next/script";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://badminton-rackets-seo-fdn9.vercel.app";

/* ✅ Deduplicate by brand + name */
function getUniqueProducts<T extends { name: string; brand: string }>(
  products: T[],
): T[] {
  const seen = new Set<string>();

  return products.filter((product) => {
    const key = `${product.brand.toLowerCase()}-${product.name.toLowerCase()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export default function ShuttlecockPage() {
  // Transform shuttlecock data to match expected format
  const rawShuttlecocks = shuttlecocks as Array<{
    name: string;
    price: number;
    reviewscore: string;
    speed?: string;
    imageurl: string;
  }>;

  const transformedShuttlecocks = rawShuttlecocks.map((shuttle) => ({
    name: shuttle.name,
    brand: extractBrandFromName(shuttle.name),
    price: parseShuttlecockPrice(shuttle.price),
    imageurl: shuttle.imageurl,
    reviewscore: shuttle.reviewscore,
    speed: shuttle.speed || "",
  }));

  /* ✅ IDs added first, then duplicates removed */
  const allShuttlecocks = getUniqueProducts(
    addIdsToProducts(transformedShuttlecocks),
  );

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Badminton Shuttlecocks Directory",
    description: "Complete collection of badminton shuttlecocks",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: allShuttlecocks.length,
      itemListElement: allShuttlecocks.slice(0, 10).map((shuttle, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: shuttle.name,
        },
      })),
    },
  };

  return (
    <ProductFilterProvider>
      <Script
        id="collection-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionSchema),
        }}
      />

      <main className="py-6 md:py-10 bg-white">
        <div className="max-w-[1920px] mx-auto px-4 md:px-6">
          {/* Desktop: 2-column with sidebar | Mobile: 1-column without sidebar */}
          <div className="grid grid-cols-1 sm:grid-cols-[280px_1fr] gap-6">
            {/* Sidebar - hidden on mobile (<640px), visible on sm+ */}
            <aside className="hidden sm:block">
              <CategoryFilterSidebar
                products={allShuttlecocks}
                category="shuttlecock"
              />
            </aside>

            <div className="animate-fade-in">
              {/* Header */}
              <div className="relative mb-6 md:mb-8">
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 md:mb-3 text-slate-900">
                  Badminton Shuttlecocks
                </h1>

                <h2 className="text-sm md:text-med lg:text-lg text-slate-700 mb-3 md:mb-4">
                  Find the perfect shuttles for your game
                </h2>

                <div className="absolute -bottom-2 left-0 w-32 md:w-48 h-0.5 bg-slate-500/70 rounded-full" />
              </div>

              <ProductGrid products={allShuttlecocks} category="shuttlecock" />
            </div>
          </div>
        </div>
      </main>
    </ProductFilterProvider>
  );
}
