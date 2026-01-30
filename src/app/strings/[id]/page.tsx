import strings from "@/data/strings.json";
import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import ProductDetailContent from "@/components/products/ProductDetailContent";
import { addIdsToProducts } from "@/utils/productHelpers";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://badminton-rackets-seo-fdn9.vercel.app";

type Props = {
  params: Promise<{ id: string }>;
};

// Transform strings data to match expected format
const transformedStrings = strings.map((item: any) => ({
  name: item.name,
  price: item.price,
  rating: typeof item.reviewscore === 'number' ? item.reviewscore : 0,
  review_count: 0,
  product_url: `https://example.com/strings/${item.id}`,
  imageurl: item.imageurl,
  description: item.description,
  brand: item.brand,
}));

const allStrings = addIdsToProducts(transformedStrings);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const string = allStrings.find((s) => s.id === id);

  if (!string) {
    return {
      title: "String Not Found",
    };
  }

  const title = `${string.name} | Badminton String Review & Price`;
  const description = `${string.name} - ₹${string.price.toLocaleString()}. ${
    string.rating > 0 ? `Rating: ${string.rating}/5` : ""
  }. Find the perfect badminton string for your racket.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/strings/${id}`,
    },
    openGraph: {
      title,
      description,
      url: `/strings/${id}`,
      siteName: "Badminton Rackets Directory",
      type: "article",
    },
  };
}

export default async function StringPage({ params }: Props) {
  const { id } = await params;
  const string = allStrings.find((s) => s.id === id);

  if (!string) {
    notFound();
  }

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${SITE_URL}/strings/${id}#product`,
    name: string.name,
    description: `${string.name} badminton string`,
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: string.price,
      availability: "https://schema.org/InStock",
      url: string.product_url,
      priceValidUntil: "2026-12-31",
    },
    ...(string.rating > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: string.rating,
        reviewCount: string.review_count,
        bestRating: "5",
        worstRating: "1",
      },
    }),
    sku: string.id,
    mpn: string.id,
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
        name: "Strings",
        item: `${SITE_URL}/strings`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: string.name,
        item: `${SITE_URL}/strings/${id}`,
      },
    ],
  };

  const faqs = [
    {
      question: `What tension should I use with ${string.name}?`,
      answer: `For ${string.name}, beginners should use 20-22 lbs tension for better control and durability. Intermediate players can use 22-25 lbs, while advanced players may go up to 26-28 lbs for maximum repulsion and feel. Always consult your racket's recommended tension range.`,
    },
    {
      question: `What gauge is ${string.name}?`,
      answer: `Badminton strings typically range from 0.66mm to 0.70mm in gauge. Thinner strings (0.66-0.67mm) provide better repulsion and feel, while thicker strings (0.69-0.70mm) offer more durability. Check the product specifications for the exact gauge of ${string.name}.`,
    },
    {
      question: `How long does ${string.name} last?`,
      answer: `String durability depends on playing frequency and tension. ${string.name} typically lasts 1-3 months for regular players (3-4 times per week). Competitive players may need restringing every 2-4 weeks. Signs for restringing include loss of tension, fraying, or reduced repulsion.`,
    },
    {
      question: `Is ${string.name} suitable for powerful smashes?`,
      answer: `String performance for smashes depends on the string type and tension. Thinner gauge strings generally provide better repulsion for powerful smashes. ${string.name} can be strung at higher tensions (24-28 lbs) for players seeking maximum power in their smashes.`,
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
          product={string}
          allProducts={allStrings}
          category="strings"
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
