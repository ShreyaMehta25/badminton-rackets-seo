const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";
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
  const pageUrl = `/rackets/${filterPath.join("/")}`;

  // Get first racket image for OG if available
  const filters = filterPath.map((f) => decodeURIComponent(f).toLowerCase());
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
  const ogImage = filteredRackets.length > 0 ? filteredRackets[0].imageUrl : undefined;

  return {
    title,
    description,
    keywords: [
      readableFilter,
      "badminton rackets",
      "badminton racquets",
      `${readableFilter} badminton rackets`,
      "badminton racket comparison",
      "badminton racket reviews",
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: "Badminton Rackets Directory",
      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: `${readableFilter} badminton rackets`,
            },
          ]
        : [],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : [],
    },
  };
}

/* -------------------------------
   PAGE RENDER
-------------------------------- */
export default async function FilteredRacketsPage({ params }: Props) {
  const { filterPath } = await params;

  // Handle middleware rewrite: if first segment is "filter", remove it
  const actualFilters = filterPath[0] === "filter" ? filterPath.slice(1) : filterPath;

  // Convert URL segments → normalized filters
  const filters = actualFilters.map((f) => decodeURIComponent(f).toLowerCase());

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
  
  // Product schema for each racket
  const productSchema = sortedRackets.map((r) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    name: r.name,
    image: r.imageUrl,
    description: `${r.name} by ${r.brand}. ${r.pros.join(" ")}`,
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
      priceValidUntil: "2026-12-31",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: r.reviewScore,
      reviewCount: Math.floor(r.reviewScore * 20),
      bestRating: "5",
      worstRating: "1",
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Weight",
        value: r.weight,
      },
      {
        "@type": "PropertyValue",
        name: "Balance",
        value: r.balance,
      },
      {
        "@type": "PropertyValue",
        name: "Flex",
        value: r.flex,
      },
      {
        "@type": "PropertyValue",
        name: "Player Level",
        value: r.playerLevel,
      },
    ],
  }));

  // Breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Rackets",
        item: `${SITE_URL}/rackets`,
      },
      ...filterPath.map((f, index) => ({
        "@type": "ListItem",
        position: index + 3,
        name: decodeURIComponent(f).replace(/-/g, " "),
        item: `${SITE_URL}/rackets/${filterPath.slice(0, index + 1).join("/")}`,
      })),
    ],
  };

  // CollectionPage schema for filtered results
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Best ${heading} Badminton Rackets`,
    description: `Compare the top badminton rackets for ${heading}`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: sortedRackets.length,
      itemListElement: sortedRackets.map((racket, index) => ({
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
    <main className="max-w-7xl mx-auto px-6 py-10">
      <Script
        id="product-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
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
