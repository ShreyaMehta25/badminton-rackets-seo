import Script from "next/script";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com"
  ),
  title: {
    default:
      "Badminton Rackets Directory 2026 | Compare Prices, Ratings & Reviews",
    template: "%s | Badminton Rackets Directory",
  },
  description:
    "Compare the best badminton rackets in 2026. Find rackets by brand, skill level, balance, and price. Expert reviews, ratings, pros & cons for Yonex, Li-Ning, Victor, and more.",
  keywords: [
    "badminton rackets",
    "badminton racquets",
    "yonex badminton rackets",
    "best badminton rackets",
    "badminton racket reviews",
    "badminton racket comparison",
    "badminton racket prices",
    "professional badminton rackets",
  ],
  authors: [{ name: "Badminton Rackets Directory" }],
  creator: "Badminton Rackets Directory",
  publisher: "Badminton Rackets Directory",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Badminton Rackets Directory",
    title:
      "Badminton Rackets Directory 2026 | Compare Prices, Ratings & Reviews",
    description:
      "Compare the best badminton rackets in 2026. Find rackets by brand, skill level, balance, and price. Expert reviews, ratings, pros & cons.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Badminton Rackets Directory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Badminton Rackets Directory 2026",
    description:
      "Compare the best badminton rackets in 2026. Find rackets by brand, skill level, balance, and price.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://badminton-rackets-seo-fdn9.vercel.app";

  const organizationIdentitySchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}#organization`,
    name: "Badminton Rackets Directory",
    url: siteUrl,
    logo: `${siteUrl}/favicon.ico`,
    description:
      "Badminton Rackets Directory is a data-driven platform to compare badminton rackets by brand, player level, playing style, and price.",
  };
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* ✅ GLOBAL ORGANIZATION IDENTITY SCHEMA */}
        <Script
          id="organization-identity-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationIdentitySchema),
          }}
        />

        {children}
      </body>
    </html>
  );
}
