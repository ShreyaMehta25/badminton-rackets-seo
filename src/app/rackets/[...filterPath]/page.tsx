const SITE_URL = "https://yourdomain.com";
import rackets from "@/data/rackets.json";
import Script from "next/script";
import { Racket } from "@/types/racket";
import ComparisonTable from "@/components/rackets/ComparisonTable";
import RacketComparisonTable from "@/components/rackets/RacketComparisonTable";
import type { Metadata } from "next";

const matchesRating = (filter: string, rating: number) => {
  if (!filter.startsWith("rating-")) return false;

  const value = Number(filter.replace("rating-", "")) / 10;
  return rating >= value;
};

type Props = {
  params: Promise<{ filterPath: string[] }>;
};

/* -------------------------------
   SEO METADATA
-------------------------------- */
// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const { filterPath } = await params;

//   const titleText = filterPath
//     .map((f) => decodeURIComponent(f))
//     .join(" · ")
//     .replace(/-/g, " ");

//   return {
//     title: `Best ${titleText} Badminton Rackets`,
//     description: `Explore the best ${titleText} badminton rackets with prices, ratings, and comparisons.`,
//   };
// }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { filterPath } = await params;

  const readableFilter = filterPath
    .map((f) => decodeURIComponent(f))
    .join(" ")
    .replace(/-/g, " ");

  const title = `Best ${readableFilter} Badminton Rackets – 2026 Directory`;

  const description = `Compare the top badminton rackets for ${readableFilter}. View prices, pros, cons, and expert ratings in our 2026 racket directory.`;

  const canonicalUrl = `${SITE_URL}/rackets/${filterPath.join("/")}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

/* -------------------------------
   PAGE RENDER
-------------------------------- */
export default async function FilteredRacketsPage({ params }: Props) {
  const { filterPath } = await params;

  // Convert URL segments → normalized filters
  const filters = filterPath.map((f) => decodeURIComponent(f).toLowerCase());

  // AND-based filtering (multi-segment support)
  const filteredRackets = (rackets as Racket[]).filter((r) =>
    filters.every(
      (filter) =>
        r.brand.toLowerCase() === filter ||
        r.playerLevel.toLowerCase() === filter ||
        r.balance.toLowerCase() === filter ||
        r.bestFor.map((b) => b.toLowerCase()).includes(filter) ||
        matchesRating(filter, r.reviewScore)
    )
  );
  const sortedRackets = [...filteredRackets].sort((a, b) => a.price - b.price);

  const heading = filters.join(" · ").replace(/-/g, " ");
  const productSchema = sortedRackets.map((r) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    name: r.name,
    image: r.imageUrl,
    brand: {
      "@type": "Brand",
      name: r.brand,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: r.price,
      availability: "https://schema.org/InStock",
      url: r.affiliateUrl,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: r.reviewScore,
      reviewCount: Math.floor(r.reviewScore * 20),
    },
  }));

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <Script
        id="product-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />

      <h1 className="text-4xl font-extrabold mb-4 capitalize">
        Best {heading} Badminton Rackets
      </h1>

      <p className="text-slate-400 mb-8">
        Showing {filteredRackets.length} rackets.
      </p>

      {filteredRackets.length === 0 ? (
        <div className="text-slate-400">
          No rackets found for this combination.
        </div>
      ) : (
        <ComparisonTable rackets={sortedRackets} />
      )}
    </main>
  );
}
