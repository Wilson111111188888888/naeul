import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://naeul.fr";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Dormant en Phase 1 (pré-lancement) : non indexé.
      disallow: ["/api/", "/produits", "/panier", "/commande/", "/cgv", "/retours"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
