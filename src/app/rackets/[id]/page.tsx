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
  const racketWithPlayers = rackets as Array<
    Racket & { usedByPlayers?: string[] }
  >;
  const racketData = racketWithPlayers.find((r) => r.id === id);
  const playerIds = racketData?.usedByPlayers || [];
  const associatedPlayers = players.filter(
    (p) => p.isActive && playerIds.includes(p.id)
  );

  // Product schema
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${SITE_URL}/rackets/${id}#product`,
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
    sku: racket.id,
    mpn: racket.id,
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

  const faqs = [
    {
      question: `Is ${racket.name} suitable for ${racket.playerLevel} players?`,
      answer: `Yes, the ${racket.name} is designed for ${racket.playerLevel} players. It offers a ${racket.balance} balance and ${racket.flex} shaft, making it suitable for players looking to improve their performance.`,
    },
    {
      question: `What playing style is ${racket.name} best for?`,
      answer: `The ${racket.name} is best suited for ${racket.bestFor.join(
        ", "
      )} play styles. It performs well for players who prefer ${
        racket.balance
      } rackets.`,
    },
    // {
    //   question: `Is ${racket.name} good for singles or doubles?`,
    //   answer: `The ${racket.name} works well in ${
    //     racket.playStyles?.includes("singles") ? "singles matches" : "both singles and doubles"
    //   } due to its balance and maneuverability.`,
    // },
    {
      question: `What is the weight and balance of ${racket.name}?`,
      answer: `The ${racket.name} comes in ${racket.weight} weight category and has a ${racket.balance} balance, offering a good mix of control and power.`,
    },
    {
      question: `Is ${
        racket.name
      } worth buying in ${new Date().getFullYear()}?`,
      answer: `Yes, the ${
        racket.name
      } remains a strong choice in ${new Date().getFullYear()} thanks to its solid build quality, good reviews, and value for money in its price range.`,
    },
  ];
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
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
      <Script
        id="faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      {/* <main className="max-w-7xl mx-auto px-6 py-10">
        <RacketDetailContent
          racket={racket}
          associatedPlayers={associatedPlayers}
          allRackets={rackets as Racket[]}
        />
        <section className="mt-0">
          <h2 className="text-2xl font-bold mb-6">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group rounded-lg border border-slate-700 p-4"
              >
                <summary className="cursor-pointer font-medium text-slate-200">
                  {faq.question}
                </summary>
                <p className="mt-2 text-slate-400">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main> */}
      <main className="max-w-7xl mx-auto px-6 py-10 space-y-10">
        <RacketDetailContent
          racket={racket}
          associatedPlayers={associatedPlayers}
          allRackets={rackets as Racket[]}
        />

        <section>
          <h2 className="text-2xl font-bold mb-6">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group rounded-lg border border-slate-700 p-4"
              >
                <summary className="cursor-pointer font-medium text-slate-200">
                  {faq.question}
                </summary>
                <p className="mt-2 text-slate-400">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
