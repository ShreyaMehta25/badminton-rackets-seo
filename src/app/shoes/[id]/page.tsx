import shoes from "@/data/shoes.json";
import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import ProductDetailContent from "@/components/products/ProductDetailContent";
import { addIdsToProducts } from "@/utils/productHelpers";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://badminton-rackets-seo-fdn9.vercel.app";

type Props = {
  params: Promise<{ id: string }>;
};

// Transform shoes data to match expected format
const transformedShoes = shoes.map((item: any) => ({
  name: item.name,
  price: item.price,
  rating: typeof item.reviewscore === 'string' ? (item.reviewscore === '' ? 0 : parseFloat(item.reviewscore)) : (item.reviewscore || 0),
  review_count: 0,
  product_url: item.id,
  imageurl: item.imageurl,
  description: item.description,
  brand: item.brand,
  gender: item.gender,
}));

const allShoes = addIdsToProducts(transformedShoes);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const shoe = allShoes.find((s) => s.id === id);

  if (!shoe) {
    return {
      title: "Shoe Not Found",
    };
  }

  const title = `${shoe.name} | Badminton Shoes Review & Price`;
  const description = `${shoe.name} - ₹${shoe.price.toLocaleString()}. ${
    shoe.rating > 0 ? `Rating: ${shoe.rating}/5` : ""
  }. Find the perfect badminton shoes for your game.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/shoes/${id}`,
    },
    openGraph: {
      title,
      description,
      url: `/shoes/${id}`,
      siteName: "Badminton Rackets Directory",
      type: "article",
    },
  };
}

export default async function ShoePage({ params }: Props) {
  const { id } = await params;
  const shoe = allShoes.find((s) => s.id === id);

  if (!shoe) {
    notFound();
  }

  // Product schema
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${SITE_URL}/shoes/${id}#product`,
    name: shoe.name,
    description: `${shoe.name} badminton shoes`,
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: shoe.price,
      availability: "https://schema.org/InStock",
      url: shoe.product_url,
      priceValidUntil: "2026-12-31",
    },
    ...(shoe.rating > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: shoe.rating,
        reviewCount: shoe.review_count,
        bestRating: "5",
        worstRating: "1",
      },
    }),
    sku: shoe.id,
    mpn: shoe.id,
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
        name: "Shoes",
        item: `${SITE_URL}/shoes`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: shoe.name,
        item: `${SITE_URL}/shoes/${id}`,
      },
    ],
  };

  const faqs = [
    {
      question: `What size should I choose for ${shoe.name}?`,
      answer: `Badminton shoes typically run true to size. For ${shoe.name}, we recommend ordering your regular shoe size. If you prefer a looser fit or plan to wear thicker socks, consider going half a size up.`,
    },
    {
      question: `Are ${shoe.name} suitable for all court types?`,
      answer: `${shoe.name} are designed for indoor badminton courts with proper grip and cushioning. They provide excellent traction on wooden and synthetic court surfaces. Avoid using them on outdoor courts to maintain their performance and longevity.`,
    },
    {
      question: `How durable are ${shoe.name}?`,
      answer: `The durability of ${shoe.name} depends on frequency of use and playing intensity. With proper care and regular indoor court use, these shoes typically last 6-12 months for recreational players and 3-6 months for competitive players.`,
    },
    {
      question: `Do ${shoe.name} provide good ankle support?`,
      answer: `${shoe.name} are designed with badminton-specific requirements in mind, offering a balance between flexibility and support. They provide adequate ankle stability for quick lateral movements while maintaining the lightweight feel needed for agile footwork.`,
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
          product={shoe}
          allProducts={allShoes}
          category="shoes"
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
