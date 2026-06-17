import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { AnnouncementBar } from "@/components/announcement-bar";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CookieBanner } from "@/components/cookie-banner";
import { ExitIntent } from "@/components/exit-intent";
import { DiagnosticBubble } from "@/components/diagnostic-bubble";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://naeul.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "naeul · K-beauty française pour peau grasse · Sans agresser",
    template: "%s — naeul",
  },
  description:
    "Le sérum K-beauty pensé pour les peaux grasses françaises. Niacinamide, AHA doux, sans alcool. Édition fondatrice, sortie juillet 2026.",
  keywords: [
    "K-beauty française",
    "peau grasse",
    "sérum peau grasse",
    "sérum niacinamide",
    "pores",
    "sébum",
    "soin peau grasse",
    "naeul",
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "naeul",
    title: "naeul · K-beauty française pour peau grasse · Sans agresser",
    description:
      "Le sérum K-beauty pensé pour les peaux grasses françaises. Niacinamide, AHA doux, sans alcool. Édition fondatrice, sortie juillet 2026.",
    url: SITE_URL,
    images: ["/images/naeul-produit-avec-box.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "naeul · K-beauty française pour peau grasse · Sans agresser",
    description:
      "Le sérum K-beauty pensé pour les peaux grasses françaises. Niacinamide, AHA doux, sans alcool. Édition fondatrice, sortie juillet 2026.",
    images: ["/images/naeul-produit-avec-box.jpg"],
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  // Vérification Google Search Console : coller le token (méthode balise HTML) dans
  // GOOGLE_SITE_VERIFICATION (Vercel → Environment Variables), puis redéployer.
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "naeul",
      url: SITE_URL,
      logo: `${SITE_URL}/icon.svg`,
      description:
        "Marque K-beauty française de soins pour peau grasse, mixte et à pores — réguler le sébum et les pores en douceur, sans agresser.",
      slogan: "K-beauty pour peau grasse, sans agresser.",
      sameAs: [
        "https://www.instagram.com/naeul_by_kbeauty",
        "https://www.tiktok.com/@naeul.bykbeauty",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "naeul",
      inLanguage: "fr-FR",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="flex min-h-dvh flex-col bg-sand text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <AnnouncementBar />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieBanner />
        <ExitIntent />
        <DiagnosticBubble />
        <Analytics />
      </body>
    </html>
  );
}
