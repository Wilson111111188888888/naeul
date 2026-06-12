import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CookieBanner } from "@/components/cookie-banner";

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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://naeul.fr";

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
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="flex min-h-dvh flex-col bg-sand text-ink">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
