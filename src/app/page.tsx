import Script from "next/script";
import type { Metadata } from "next";
import IkeaHeader from "@/components/landing/IkeaHeader";
import CompactHero from "@/components/landing/CompactHero";
import BrandCarousel from "@/components/landing/BrandCarousel";
import SkillLevelGuide from "@/components/landing/SkillLevelGuide";
import PlayStyleGuide from "@/components/landing/PlayStyleGuide";
import PlayerInspiration from "@/components/landing/PlayerInspiration";
import ExpertPicks from "@/components/landing/ExpertPicks";
import EducationalContent from "@/components/landing/EducationalContent";
import ComparisonPreview from "@/components/landing/ComparisonPreview";
import FAQSection from "@/components/landing/FAQSection";
import ShopByWeight from "@/components/landing/ShopByWeight";
import ShopByBudget from "@/components/landing/ShopByBudget";
import FinalCTA from "@/components/landing/FinalCTA";

export const metadata: Metadata = {
  title: "Best Badminton Rackets 2026 | Expert Reviews & Comparison Guide",
  description:
    "Find the perfect badminton racket with our expert-curated directory. Compare 50+ rackets by weight, balance, skill level, and price. Trusted by 15,000+ players.",
  keywords: [
    "badminton rackets",
    "best badminton racket",
    "badminton racket comparison",
    "yonex badminton rackets",
    "li-ning badminton",
    "badminton racket for beginners",
    "badminton racket guide",
  ],
  openGraph: {
    title: "Best Badminton Rackets 2026 | Expert Comparison Guide",
    description:
      "Find the perfect badminton racket with our expert-curated directory. Compare specs, prices, and reviews from top brands.",
    type: "website",
  },
};

export default function HomePage() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://badminton-rackets-seo-fdn9.vercel.app";

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Best Badminton Rackets Directory",
    url: siteUrl,
    logo: `${siteUrl}/favicon.ico`,
    description:
      "A data-driven directory to compare badminton rackets by specs, player level, brand, and price.",
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Best Badminton Rackets Directory",
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/rackets?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Which badminton racket is best for beginners?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For beginners, we recommend lightweight rackets (4U or 5U) with flexible shafts and even or slightly head-light balance. These are more forgiving and help develop proper technique without straining your arm.",
        },
      },
      {
        "@type": "Question",
        name: "What racket weight should I choose?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "3U (85-89g) is best for power players with good technique. 4U (80-84g) is the most versatile choice, suitable for most players. 5U (75-79g) is ideal for beginners, doubles players, or those who prefer quick maneuverability.",
        },
      },
      {
        "@type": "Question",
        name: "Head-heavy vs head-light: which is better?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Neither is universally better — it depends on your playing style. Head-heavy rackets generate more power for smashes, ideal for aggressive singles players. Head-light rackets offer faster handling and quick reactions, perfect for doubles and defensive play.",
        },
      },
      {
        "@type": "Question",
        name: "Does expensive mean better performance?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Not necessarily. A racket matching your skill level will perform better for you than an expensive pro racket. Focus on specifications that match your playing style and skill level rather than price alone.",
        },
      },
    ],
  };

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />

      <Script
        id="website-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
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

      <>
        {/* IKEA-Style Header */}
        <IkeaHeader />

        <main>
          {/* Compact Hero - Just the heading */}
          <CompactHero />
          {/* Flipkart-Style Auto-Banner Carousel - IMMEDIATELY below hero */}
          <BrandCarousel />

          {/* Expert Picks - Top-rated rackets */}
          <ExpertPicks />
          {/* Skill Level Guide - 3 Tiles (NO product cards) */}
          <SkillLevelGuide />
          <PlayStyleGuide />
          <ShopByWeight />
          {/* Player Inspiration - Auto-rotating carousel */}
          <ShopByBudget />
          <PlayerInspiration />
          {/* Educational Content Block */}
          <EducationalContent />
          {/* Comparison Preview Section */}
          <ComparisonPreview />
          {/* FAQ Section - SEO + UX */}
          <FAQSection />
          {/* Final CTA */}
          {/* <FinalCTA /> */}
        </main>
      </>
    </>
  );
}
