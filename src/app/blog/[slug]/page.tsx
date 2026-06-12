import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { ArrowRight, CalendarBlank, Clock } from "@phosphor-icons/react/dist/ssr";
import { getPost, getPostSlugs, getAllPostsMeta } from "@/lib/blog";
import { Container } from "@/components/ui/container";
import { buttonClasses } from "@/components/ui/button";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://naeul.fr";

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const { meta } = post;
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      title: meta.title,
      description: meta.description,
      publishedTime: meta.date,
      modifiedTime: meta.updated ?? meta.date,
    },
  };
}

// Composants MDX : liens internes via <Link>, styles hérités de .prose-naeul
const mdxComponents = {
  a: ({ href = "", children }: { href?: string; children?: React.ReactNode }) =>
    href.startsWith("/") ? (
      <Link href={href}>{children}</Link>
    ) : (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const { meta, body } = post;

  const { content } = await compileMDX({
    source: body,
    components: mdxComponents,
  });

  const related = getAllPostsMeta()
    .filter((p) => meta.related.includes(p.slug))
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.description,
    datePublished: meta.date,
    dateModified: meta.updated ?? meta.date,
    author: { "@type": "Organization", name: "naeul" },
    publisher: { "@type": "Organization", name: "naeul", url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/blog/${slug}`,
    keywords: meta.keyword,
  };

  return (
    <Container className="py-16 md:py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto max-w-2xl">
        <Link href="/blog" className="text-sm text-sage underline-offset-4 hover:underline">
          ← Tous les articles
        </Link>

        <p className="mt-6 text-xs uppercase tracking-[0.25em] text-stone">{meta.category}</p>
        <h1 className="mt-3 text-balance text-4xl leading-tight md:text-5xl">{meta.title}</h1>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-stone">
          <span className="inline-flex items-center gap-1.5">
            <CalendarBlank size={14} /> {formatDate(meta.date)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock size={14} /> {meta.readingTime} de lecture
          </span>
          <span>par l&apos;équipe naeul</span>
        </div>

        <article className="prose-naeul mt-10">{content}</article>

        {/* CTA */}
        <div className="mt-12 rounded-2xl border border-line bg-cream p-8 text-center">
          <h2 className="text-xl">Notre sérum arrive bientôt</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-stone">
            K-beauty pour peau grasse, sans agresser. Inscris-toi pour être prévenue en
            avant-première et obtenir -15 %.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link href="/#precommande" className={buttonClasses({ size: "lg" })}>
              Je veux être prévenue (-15%)
            </Link>
            <Link href="/le-produit" className={buttonClasses({ variant: "secondary", size: "lg" })}>
              En savoir plus
            </Link>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-14">
            <h2 className="text-lg">À lire aussi</h2>
            <ul className="mt-5 space-y-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/blog/${r.slug}`}
                    className="group flex items-center justify-between gap-4 rounded-xl border border-line bg-sand p-4 transition-colors hover:border-sage/40"
                  >
                    <span className="text-sm font-medium text-ink">{r.title}</span>
                    <ArrowRight size={16} className="shrink-0 text-stone transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Container>
  );
}
