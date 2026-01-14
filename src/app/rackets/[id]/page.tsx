import rackets from "@/data/rackets.json";
import { Racket } from "@/types/racket";
import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";

const formatKebab = (value: string) =>
  value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("-");

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

  const levelColor = {
    beginner: "bg-green-500",
    intermediate: "bg-yellow-500",
    advanced: "bg-red-500",
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

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left side - Image */}
          <div className="flex items-center justify-center">
            {/* <div className="w-full max-w-md bg-slate-800 rounded-xl p-8"> */}
            <img
              src={racket.imageUrl}
              alt={racket.name}
              className="w-full h-[400px] object-contain"
            />
            {/* </div> */}
          </div>

          {/* Right side - Details */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-extrabold">{racket.name}</h1>
              <p className="text-lg text-slate-300">{racket.brand}</p>
              <p className="text-2xl font-semibold text-slate-50">
                ₹{racket.price}
              </p>
            </div>

            {/* Specification chips */}
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="px-3 py-1.5 rounded bg-slate-700">
                <span className="font-semibold text-emerald-300">Weight:</span>{" "}
                <span className="text-slate-50">{racket.weight}</span>
              </span>
              <span className="px-3 py-1.5 rounded bg-slate-700">
                <span className="font-semibold text-emerald-300">Balance:</span>{" "}
                <span className="text-slate-50">
                  {formatKebab(racket.balance)}
                </span>
              </span>
              <span className="px-3 py-1.5 rounded bg-slate-700">
                <span className="font-semibold text-emerald-300">Flex:</span>{" "}
                <span className="text-slate-50">
                  {formatKebab(racket.flex)}
                </span>
              </span>
              <span className="px-3 py-1.5 rounded bg-slate-700">
                <span className="font-semibold text-emerald-300">Level:</span>{" "}
                <span className="text-slate-50">
                  {formatKebab(racket.playerLevel)}
                </span>
              </span>
              <span className="px-3 py-1.5 rounded bg-slate-700">
                <span className="font-semibold text-emerald-300">Rating:</span>{" "}
                <span className="text-slate-50">{racket.reviewScore} ⭐</span>
              </span>
            </div>

            {/* Pros and Cons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3 text-emerald-300 text-lg">
                  Pros
                </h3>
                <ul className="list-disc list-inside text-slate-200 space-y-2 text-base">
                  {racket.pros.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-rose-300 text-lg">
                  Cons
                </h3>
                <ul className="list-disc list-inside text-slate-200 space-y-2 text-base">
                  {racket.cons.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Best For */}
            <div>
              <span className="font-semibold text-emerald-300 text-lg">
                Best For:{" "}
              </span>
              <span className="text-slate-200 text-base">
                {racket.bestFor.map((b) => formatKebab(b)).join(", ")}
              </span>
            </div>

            {/* Buy Now Button */}
            <div className="pt-4">
              <a
                href={racket.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-semibold transition text-center"
              >
                Buy Now on Official Store
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
