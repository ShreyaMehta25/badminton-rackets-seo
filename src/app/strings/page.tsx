"use client";

// import strings from "@/data/strings.json";
// import ProductGrid from "@/components/products/ProductGrid";
// import CategoryFilterSidebar from "@/components/products/CategoryFilterSidebar";
// import { ProductFilterProvider } from "@/contexts/ProductFilterContext";
// import { addIdsToProducts } from "@/utils/productHelpers";
// import Script from "next/script";

// const SITE_URL =
//   process.env.NEXT_PUBLIC_SITE_URL ||
//   "https://badminton-rackets-seo-fdn9.vercel.app";

// export default function StringsPage() {
//   const allStrings = addIdsToProducts(strings as Array<{
//     name: string;
//     brand: string;
//     price: number;
//     imageurl: string;
//     reviewscore: number;
//     description: string;
//   }>);

//   const collectionSchema = {
//     "@context": "https://schema.org",
//     "@type": "CollectionPage",
//     name: "Badminton Strings Directory",
//     description: "Complete collection of badminton strings",
//     mainEntity: {
//       "@type": "ItemList",
//       numberOfItems: allStrings.length,
//       itemListElement: allStrings.slice(0, 10).map((string, index) => ({
//         "@type": "ListItem",
//         position: index + 1,
//         item: {
//           "@type": "Product",
//           name: string.name,
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
//               <CategoryFilterSidebar products={allStrings} category="strings" />
//             </aside>

//             <div className="animate-fade-in">
//               {/* Header */}
//               <div className="relative mb-6 md:mb-8">
//                 <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 md:mb-3 text-slate-900">
//                   Badminton Strings
//                 </h1>

//                 <h2 className="text-sm md:text-med lg:text-lg text-slate-700 mb-3 md:mb-4">
//                   Find the perfect strings for your racket
//                 </h2>

//                 <div className="absolute -bottom-2 left-0 w-32 md:w-48 h-0.5 bg-slate-500/70 rounded-full"></div>
//               </div>

//               <ProductGrid products={allStrings} category="strings" />
//             </div>
//           </div>
//         </div>
//       </main>
//     </ProductFilterProvider>
//   );
// }

import strings from "@/data/strings.json";
import ProductGrid from "@/components/products/ProductGrid";
import CategoryFilterSidebar from "@/components/products/CategoryFilterSidebar";
import { ProductFilterProvider } from "@/contexts/ProductFilterContext";
import { addIdsToProducts } from "@/utils/productHelpers";
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

export default function StringsPage() {
  /* ✅ IDs added first, then duplicates removed */
  const allStrings = getUniqueProducts(
    addIdsToProducts(
      strings as Array<{
        name: string;
        brand: string;
        price: number;
        imageurl: string;
        reviewscore: number;
        description: string;
      }>,
    ),
  );

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Badminton Strings Directory",
    description: "Complete collection of badminton strings",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: allStrings.length,
      itemListElement: allStrings.slice(0, 10).map((string, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: string.name,
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
              <CategoryFilterSidebar products={allStrings} category="strings" />
            </aside>

            <div className="animate-fade-in">
              {/* Header */}
              <div className="relative mb-6 md:mb-8">
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 md:mb-3 text-slate-900">
                  Badminton Strings
                </h1>

                <h2 className="text-sm md:text-med lg:text-lg text-slate-700 mb-3 md:mb-4">
                  Find the perfect strings for your racket
                </h2>

                <div className="absolute -bottom-2 left-0 w-32 md:w-48 h-0.5 bg-slate-500/70 rounded-full" />
              </div>

              <ProductGrid products={allStrings} category="strings" />
            </div>
          </div>
        </div>
      </main>
    </ProductFilterProvider>
  );
}
