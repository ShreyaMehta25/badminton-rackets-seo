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

      <main className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 animate-fade-in">
          {/* Left side - Image */}
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-md">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-blue-500/10 to-purple-500/20 rounded-2xl blur-xl -z-10"></div>
              {/* Image container */}
              <div className="relative bg-gradient-to-br from-slate-800/80 via-slate-800/60 to-slate-900/80 backdrop-blur-sm rounded-2xl p-5 border border-slate-700/50 shadow-2xl">
                <img
                  src={racket.imageUrl}
                  alt={racket.name}
                  className="w-full h-[300px] object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </div>

          {/* Right side - Details */}
          <div className="space-y-4 animate-slide-in">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-slate-100 via-emerald-200 to-slate-100 bg-clip-text text-transparent">
                {racket.name}
              </h1>
              <p className="text-lg text-slate-300 font-medium">{racket.brand}</p>
              <div className="flex items-center gap-3">
                <p className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
                  ₹{racket.price}
                </p>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
                  ⭐ {racket.reviewScore}
                </span>
              </div>
            </div>

            {/* Specification chips */}
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 rounded-lg bg-gradient-to-br from-slate-800 to-slate-700 border border-slate-600/50 shadow-md hover:shadow-lg transition-all hover:scale-105 text-sm">
                <span className="font-semibold text-emerald-300">Weight:</span>{" "}
                <span className="text-slate-50 font-medium">{racket.weight}</span>
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-gradient-to-br from-slate-800 to-slate-700 border border-slate-600/50 shadow-md hover:shadow-lg transition-all hover:scale-105 text-sm">
                <span className="font-semibold text-emerald-300">Balance:</span>{" "}
                <span className="text-slate-50 font-medium">
                  {formatKebab(racket.balance)}
                </span>
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-gradient-to-br from-slate-800 to-slate-700 border border-slate-600/50 shadow-md hover:shadow-lg transition-all hover:scale-105 text-sm">
                <span className="font-semibold text-emerald-300">Flex:</span>{" "}
                <span className="text-slate-50 font-medium">
                  {formatKebab(racket.flex)}
                </span>
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-gradient-to-br from-slate-800 to-slate-700 border border-slate-600/50 shadow-md hover:shadow-lg transition-all hover:scale-105 text-sm">
                <span className="font-semibold text-emerald-300">Level:</span>{" "}
                <span className="text-slate-50 font-medium">
                  {formatKebab(racket.playerLevel)}
                </span>
              </span>
            </div>

            {/* Pros and Cons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 rounded-xl p-4 border border-emerald-500/20 shadow-lg">
                <h3 className="font-bold mb-2 text-emerald-300 text-lg flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Pros
                </h3>
                <ul className="list-disc list-inside text-slate-200 space-y-1.5 text-sm">
                  {racket.pros.map((p) => (
                    <li key={p} className="leading-relaxed">{p}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-to-br from-rose-500/10 to-rose-600/5 rounded-xl p-4 border border-rose-500/20 shadow-lg">
                <h3 className="font-bold mb-2 text-rose-300 text-lg flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse"></span>
                  Cons
                </h3>
                <ul className="list-disc list-inside text-slate-200 space-y-1.5 text-sm">
                  {racket.cons.map((c) => (
                    <li key={c} className="leading-relaxed">{c}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Best For */}
            <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-xl p-4 border border-slate-700/50 shadow-lg">
              <span className="font-bold text-emerald-300 text-base block mb-2">
                Best For
              </span>
              <div className="flex flex-wrap gap-2">
                {racket.bestFor.map((b) => (
                  <span
                    key={b}
                    className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600/20 to-emerald-500/20 border border-emerald-500/30 text-emerald-200 text-sm font-medium"
                  >
                    {formatKebab(b)}
                  </span>
                ))}
              </div>
            </div>

            {/* Buy Now Button */}
            <div>
              <a
                href={racket.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-block w-full md:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black font-bold transition-all duration-300 text-center shadow-lg hover:shadow-2xl hover:scale-105 transform text-sm"
              >
                <span className="relative z-10">Buy Now on Official Store</span>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-0"></div>
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
