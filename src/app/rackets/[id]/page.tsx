import rackets from "@/data/rackets.json";
import { Racket } from "@/types/racket";
import { players } from "@/data/players";
import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import RacketDetailContent from "@/components/rackets/RacketDetailContent";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const racket = (rackets as Racket[]).find((r) => r.id === id);

  if (!racket) {
    return {
      title: "Racket Not Found",
    };
  }

  const title = `${racket.name} by ${racket.brand} | Badminton Racket Review & Price`;
  const description = `${racket.name} by ${racket.brand} - ₹${
    racket.price
  }. ${racket.pros.join(". ")}. Rating: ${
    racket.reviewScore
  }/5. Best for: ${racket.bestFor.join(", ")}.`;

  return {
    title,
    description,
    keywords: [
      racket.name,
      racket.brand,
      "badminton racket",
      `${racket.brand} ${racket.name}`,
      "badminton racket review",
      "badminton racket price",
      racket.playerLevel,
      racket.balance,
    ],
    alternates: {
      canonical: `${SITE_URL}/rackets/${id}`,
    },
    openGraph: {
      title,
      description,
      url: `/rackets/${id}`,
      siteName: "Badminton Rackets Directory",
      images: [
        {
          url: racket.imageUrl,
          width: 1200,
          height: 630,
          alt: racket.name,
        },
      ],
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [racket.imageUrl],
    },
  };
}

export default async function RacketPage({ params }: Props) {
  const { id } = await params;
  const racket = (rackets as Racket[]).find((r) => r.id === id);

  if (!racket) {
    notFound();
  }

  // Get players who use this racket
  const racketWithPlayers = rackets as Array<Racket & { usedByPlayers?: string[] }>;
  const racketData = racketWithPlayers.find((r) => r.id === id);
  const playerIds = racketData?.usedByPlayers || [];
  const associatedPlayers = players.filter(
    (p) => p.isActive && playerIds.includes(p.id)
  );

  // Product schema
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: racket.name,
    image: racket.imageUrl,
    description: `${racket.name} by ${racket.brand}. ${racket.pros.join(". ")}`,
    brand: {
      "@type": "Brand",
      name: racket.brand,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: racket.price,
      availability: "https://schema.org/InStock",
      url: racket.affiliateUrl,
      priceValidUntil: "2026-12-31",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: racket.reviewScore,
      reviewCount: Math.floor(racket.reviewScore * 20),
      bestRating: "5",
      worstRating: "1",
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Weight",
        value: racket.weight,
      },
      {
        "@type": "PropertyValue",
        name: "Balance",
        value: racket.balance,
      },
      {
        "@type": "PropertyValue",
        name: "Flex",
        value: racket.flex,
      },
      {
        "@type": "PropertyValue",
        name: "Player Level",
        value: racket.playerLevel,
      },
      {
        "@type": "PropertyValue",
        name: "Best For",
        value: racket.bestFor.join(", "),
      },
    ],
  };

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
      {
        "@type": "ListItem",
        position: 3,
        name: racket.name,
        item: `${SITE_URL}/rackets/${id}`,
      },
    ],
  };

  return (
    <>
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
      <RacketDetailContent
        racket={racket}
        associatedPlayers={associatedPlayers}
        allRackets={rackets as Racket[]}
      />
    </>
  );
}
