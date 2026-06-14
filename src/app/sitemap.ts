import type { MetadataRoute } from "next";
import { getAllPostsMeta } from "@/lib/blog";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://naeul.com";

// Phase 1 (pré-lancement) : pages publiques + blog SEO.
// Les routes e-commerce (panier, checkout) restent en dormance, non listées.
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/le-produit",
    "/diagnostic",
    "/blog",
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

  const posts = getAllPostsMeta().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.updated ?? post.date,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...posts];
}
