import rackets from "@/data/rackets.json";
import RacketGrid from "@/components/rackets/RacketGrid";
import RacketSidebar from "@/components/rackets/RacketSidebar";
import { Racket } from "@/types/racket";
import type { Metadata } from "next";
import Script from "next/script";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://badminton-rackets-seo-fdn9.vercel.app";

export const metadata: Metadata = {
  title: "Badminton Rackets in 2026 | Compare All Models & Prices",
  description:
    "Browse 50+ badminton rackets across brands, prices and skill levels. Filter by balance, weight and play style to find the right racket for you.",
  openGraph: {
    title: "Badminton Rackets in 2026 | Compare Prices & Reviews",
    description:
      "Compare the best badminton rackets in 2026 by price, brand, weight and skill level. Reviews and ratings from top brands.",
    images: [
      {
        url: "/og-badminton-rackets.jpg",
        width: 1200,
        height: 630,
        alt: "Best Badminton Rackets in 2026",
      },
    ],
    url: "/rackets",
  },
  alternates: {
    canonical: `${SITE_URL}/rackets`,
  },
};

export default function RacketsPage() {
  const allRackets = rackets as Racket[];

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Badminton Rackets Directory",
    description:
      "Complete collection of badminton rackets with detailed comparisons",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: allRackets.length,
      itemListElement: allRackets.slice(0, 10).map((racket, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: racket.name,
          brand: racket.brand,
          image: racket.imageUrl,
        },
      })),
    },
  };

  return (
    <>
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
            {/* Sidebar - hidden on mobile (<640px), visible on sm+ (iPad mini, tablets, desktop) */}
            <aside className="hidden sm:block">
              <RacketSidebar />
            </aside>

            <div className="animate-fade-in">
              {/* Header */}
              <div className="relative mb-6 md:mb-8">
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 md:mb-3 text-slate-900">
                  Best Badminton Rackets in 2026
                </h1>

                <h2 className="text-sm md:text-med lg:text-lg text-slate-700 mb-3 md:mb-4">
                  Compare Professional & Beginner Badminton Rackets
                </h2>

                <div className="absolute -bottom-2 left-0 w-32 md:w-48 h-0.5 bg-slate-500/70 rounded-full"></div>
              </div>

              <RacketGrid rackets={allRackets} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
