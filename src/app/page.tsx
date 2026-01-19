import Script from "next/script";
import HeroSection from "@/components/landing/HeroSection";
import ValueProps from "@/components/landing/ValueProps";
import HowItWorks from "@/components/landing/HowItWorks";
import FeatureShowcase from "@/components/landing/FeatureShowcase";
import EmotionalSection from "@/components/landing/EmotionalSection";
import FinalCTA from "@/components/landing/FinalCTA";
// import Footer from "@/components/landing/Footer";

export default function HomePage() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://badminton-rackets-seo-fdn9.vercel.app";

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Badminton Rackets Directory",
    url: siteUrl,
    logo: `${siteUrl}/favicon.ico`,
    description:
      "A data-driven directory to compare badminton rackets by specs, player level, brand, and price.",
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Badminton Rackets Directory",
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/rackets?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
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
      <div className="bg-slate-900 text-white">
        <HeroSection />
        <ValueProps />
        <HowItWorks />
        <FeatureShowcase />
        <EmotionalSection />
        <FinalCTA />
        {/* <Footer /> */}
      </div>
    </>
  );
}
