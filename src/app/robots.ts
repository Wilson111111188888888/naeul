import type { MetadataRoute } from "next";
import { PREORDER_ENABLED } from "@/lib/preorder";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://naeul.com";

export default function robots(): MetadataRoute.Robots {
  // En pré-commande, les pages légales d'achat (CGV, retours) deviennent accessibles.
  // /produits et /panier restent dormants (le parcours passe par /le-produit + Stripe).
  const disallow = PREORDER_ENABLED
    ? ["/api/", "/produits", "/panier", "/commande/"]
    : ["/api/", "/produits", "/panier", "/commande/", "/cgv", "/retours"];

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow,
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
