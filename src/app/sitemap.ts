import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://naeul.fr";

// Phase 1 (pré-lancement) : on n'indexe que les pages publiques actuelles.
// Les routes e-commerce (produit, panier, checkout) restent en dormance, non listées.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/le-produit",
    "/a-propos",
    "/faq",
    "/contact",
    "/mentions-legales",
    "/confidentialite",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.6,
  }));
}
