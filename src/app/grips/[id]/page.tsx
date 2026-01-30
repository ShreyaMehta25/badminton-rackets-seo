import grips from "@/data/grip.json";
import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import ProductDetailContent from "@/components/products/ProductDetailContent";
import { addIdsToProducts } from "@/utils/productHelpers";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://badminton-rackets-seo-fdn9.vercel.app";

type Props = {
  params: Promise<{ id: string }>;
};

// Transform grips data to match expected format
const transformedGrips = grips.map((item: any) => ({
  name: item.name,
  price: item.price,
  rating: typeof item.reviewscore === 'number' ? item.reviewscore : 0,
  review_count: 0,
  product_url: item.id,
  imageurl: item.imageurl,
  description: item.description,
  brand: item.brand,
}));

const allGrips = addIdsToProducts(transformedGrips);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const grip = allGrips.find((g) => g.id === id);

  if (!grip) {
    return {
      title: "Grip Not Found",
    };
  }

  const title = `${grip.name} | Badminton Grip Review & Price`;
  const description = `${grip.name} - ₹${grip.price.toLocaleString()}. ${
    grip.rating > 0 ? `Rating: ${grip.rating}/5` : ""
  }. Find the perfect badminton grip for your racket.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/grips/${id}`,
    },
    openGraph: {
      title,
      description,
      url: `/grips/${id}`,
      siteName: "Badminton Rackets Directory",
      type: "article",
    },
  };
}

export default async function GripPage({ params }: Props) {
  const { id } = await params;
  const grip = allGrips.find((g) => g.id === id);

  if (!grip) {
    notFound();
  }

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${SITE_URL}/grips/${id}#product`,
    name: grip.name,
    description: `${grip.name} badminton grip`,
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: grip.price,
      availability: "https://schema.org/InStock",
      url: grip.product_url,
      priceValidUntil: "2026-12-31",
    },
    ...(grip.rating > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: grip.rating,
        reviewCount: grip.review_count,
        bestRating: "5",
        worstRating: "1",
      },
    }),
    sku: grip.id,
    mpn: grip.id,
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
        name: "Grips",
        item: `${SITE_URL}/grips`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: grip.name,
        item: `${SITE_URL}/grips/${id}`,
      },
    ],
  };

  const faqs = [
    {
      question: `What type of grip is ${grip.name}?`,
      answer: `Badminton grips come in different types: replacement grips (base layer) and overgrips (top layer). Replacement grips are thicker and replace the original grip, while overgrips are thinner and wrap over the existing grip for added comfort and sweat absorption. Check the product description to determine which type ${grip.name} is.`,
    },
    {
      question: `How thick is ${grip.name}?`,
      answer: `Grip thickness affects racket handle size and feel. Replacement grips typically range from 1.6mm to 1.9mm, while overgrips are usually 0.5mm to 0.75mm. Thicker grips provide more cushioning and comfort, while thinner grips maintain the original handle size for better control.`,
    },
    {
      question: `Does ${grip.name} absorb sweat well?`,
      answer: `Sweat absorption is crucial for maintaining grip during intense play. Towel grips and perforated grips offer superior sweat absorption but may wear faster. Tacky grips provide excellent grip but moderate absorption. ${grip.name} should specify its absorption characteristics in the product details.`,
    },
    {
      question: `How long does ${grip.name} last?`,
      answer: `Grip durability depends on playing frequency and sweat levels. Overgrips typically last 1-4 weeks with regular play (3-4 times per week), while replacement grips can last 2-6 months. Replace grips when they become slippery, worn, or lose their tackiness for optimal performance and injury prevention.`,
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
          product={grip}
          allProducts={allGrips}
          category="grips"
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
