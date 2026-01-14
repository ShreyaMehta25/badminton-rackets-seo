import rackets from "@/data/rackets.json";
import RacketSearch from "@/components/rackets/RacketSearch";
import { Racket } from "@/types/racket";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Badminton Rackets Directory 2026",
  description:
    "Browse our complete collection of professional and beginner badminton rackets. Compare prices, ratings, and features from top brands like Yonex, Li-Ning, Victor, and more.",
  openGraph: {
    title: "Badminton Rackets Directory 2026 | Compare All Rackets",
    description:
      "Browse our complete collection of professional and beginner badminton rackets. Compare prices, ratings, and features.",
    url: "/rackets",
  },
  alternates: {
    canonical: "/rackets",
  },
};

export default function RacketsPage() {
  const allRackets = rackets as Racket[];
  
  // Organization schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Badminton Rackets Directory",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com",
    description: "Comprehensive directory of badminton rackets with reviews, ratings, and comparisons",
  };

  // CollectionPage schema
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Badminton Rackets Directory",
    description: "Complete collection of badminton rackets with detailed comparisons",
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
        id="organization-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <Script
        id="collection-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionSchema),
        }}
      />
      <main className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-extrabold mb-2">🏸 Badminton Rackets</h1>
        <p className="text-slate-400 mb-8">
          Explore our complete collection of professional and beginner rackets.
        </p>
        <RacketSearch rackets={allRackets} />
      </main>
    </>
  );
}
