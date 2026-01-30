import shuttlecocks from "@/data/shuttlecock.json";
import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import ProductDetailContent from "@/components/products/ProductDetailContent";
import { addIdsToProducts, parseShuttlecockPrice } from "@/utils/productHelpers";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://badminton-rackets-seo-fdn9.vercel.app";

type Props = {
  params: Promise<{ id: string }>;
};

// Transform shuttlecock data to match expected format
const transformedShuttlecocks = shuttlecocks.map((item: any) => ({
  name: item.name,
  price: typeof item.price === 'string' ? parseShuttlecockPrice(item.price) : item.price,
  rating: typeof item.reviewscore === 'string' ? (item.reviewscore === '' ? 0 : parseFloat(item.reviewscore)) : (item.reviewscore || 0),
  review_count: 0,
  product_url: item.id,
  imageurl: item.imageurl,
  description: item.description,
  speed: item.speed,
  brand: item.brand,
}));

const allShuttlecocks = addIdsToProducts(transformedShuttlecocks);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const shuttle = allShuttlecocks.find((s) => s.id === id);

  if (!shuttle) {
    return {
      title: "Shuttlecock Not Found",
    };
  }

  const title = `${shuttle.name} | Badminton Shuttlecock Review & Price`;
  const description = `${shuttle.name} - ₹${shuttle.price.toLocaleString()}. ${
    shuttle.rating > 0 ? `Rating: ${shuttle.rating}/5` : ""
  }. Find the perfect badminton shuttlecocks for your game.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/shuttlecock/${id}`,
    },
    openGraph: {
      title,
      description,
      url: `/shuttlecock/${id}`,
      siteName: "Badminton Rackets Directory",
      type: "article",
    },
  };
}

export default async function ShuttlecockPage({ params }: Props) {
  const { id } = await params;
  const shuttle = allShuttlecocks.find((s) => s.id === id);

  if (!shuttle) {
    notFound();
  }

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${SITE_URL}/shuttlecock/${id}#product`,
    name: shuttle.name,
    description: `${shuttle.name} badminton shuttlecock`,
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: shuttle.price,
      availability: "https://schema.org/InStock",
      url: shuttle.product_url,
      priceValidUntil: "2026-12-31",
    },
    ...(shuttle.rating > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: shuttle.rating,
        reviewCount: shuttle.review_count,
        bestRating: "5",
        worstRating: "1",
      },
    }),
    sku: shuttle.id,
    mpn: shuttle.id,
  };

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
        name: "Shuttlecocks",
        item: `${SITE_URL}/shuttlecock`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: shuttle.name,
        item: `${SITE_URL}/shuttlecock/${id}`,
      },
    ],
  };

  const faqs = [
    {
      question: `What speed rating is ${shuttle.name}?`,
      answer: `Shuttlecock speed is indicated by numbers (75, 76, 77, 78, 79) where higher numbers indicate slower shuttles. Speed 77 is standard for sea-level play, 76 for higher altitudes, and 78-79 for warmer climates. Check ${shuttle.name} specifications for its speed rating to match your playing conditions.`,
    },
    {
      question: `Is ${shuttle.name} made with feather or nylon?`,
      answer: `Feather shuttlecocks provide superior flight characteristics and are used in tournaments but are less durable. Nylon/plastic shuttlecocks are more durable and cost-effective for practice and recreational play. ${shuttle.name} product details will specify the material type.`,
    },
    {
      question: `How many games can I play with ${shuttle.name}?`,
      answer: `Feather shuttlecocks typically last 1-3 games in competitive play, while plastic shuttlecocks can last 10-20 games. Durability depends on playing intensity, smash power, and shuttle quality. Premium feather shuttles like ${shuttle.name} may last longer than economy options.`,
    },
    {
      question: `Is ${shuttle.name} suitable for tournament play?`,
      answer: `Tournament-grade shuttlecocks must be feather shuttles that meet BWF specifications for flight stability and speed consistency. ${shuttle.name} suitability for tournaments depends on its construction quality and speed rating. Check product specifications for tournament certification details.`,
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

      <main className="max-w-[1920px] mx-auto px-4 md:px-6 py-6 md:py-10 space-y-8 md:space-y-10">
        <ProductDetailContent
          product={shuttle}
          allProducts={allShuttlecocks}
          category="shuttlecock"
        />

        <section className="max-w-[1920px] mx-auto">
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-slate-700">
            Frequently Asked Questions
          </h2>

          <div className="space-y-3 md:space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="group p-3 md:p-4">
                <summary className="cursor-pointer text-sm md:text-base font-medium text-slate-600">
                  {faq.question}
                </summary>
                <p className="mt-2 text-xs md:text-sm text-slate-500">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
