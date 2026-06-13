import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { AnnouncementBar } from "@/components/announcement-bar";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CookieBanner } from "@/components/cookie-banner";
import { ExitIntent } from "@/components/exit-intent";

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
    default: "naeul — K-beauty pour peau grasse, sans agresser",
    template: "%s — naeul",
  },
  description:
    "naeul est une marque K-beauty française qui propose des soins doux et efficaces pour les peaux grasses, mixtes et à pores. Lancement bientôt — inscris-toi pour -15%.",
  keywords: ["K-beauty", "peau grasse", "sérum", "niacinamide", "exosomes", "soin coréen", "naeul"],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "naeul",
    title: "naeul — K-beauty pour peau grasse, sans agresser",
    description:
      "Soins K-beauty doux et efficaces pour les peaux grasses. Lancement bientôt — inscris-toi pour -15%.",
    url: SITE_URL,
    images: ["/images/naeul-produit-avec-box.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "naeul — K-beauty pour peau grasse, sans agresser",
    description:
      "Soins K-beauty doux et efficaces pour les peaux grasses. Lancement bientôt — inscris-toi pour -15%.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="flex min-h-dvh flex-col bg-sand text-ink">
        <AnnouncementBar />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieBanner />
        <ExitIntent />
        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN && (
          <Script
            defer
            data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
            src="https://plausible.io/js/script.js"
          />
        )}
      </body>
    </html>
  );
}
