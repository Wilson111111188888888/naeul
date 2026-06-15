import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { getAllPostsMeta, getCategories } from "@/lib/blog";
import { Container } from "@/components/ui/container";
import { PREORDER_ENABLED } from "@/lib/preorder";

export const metadata: Metadata = {
  title: "Journal — K-beauty & peau grasse",
  description:
    "Le journal naeul : guides K-beauty, actifs expliqués, routines pour peau grasse. Réguler sans agresser.",
  alternates: { canonical: "/blog" },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

export default function BlogIndexPage() {
  const posts = getAllPostsMeta();
  const categories = getCategories();
  const [featured, ...rest] = posts;

  return (
    <Container className="py-16 md:py-24">
      <header className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.25em] text-stone">Le journal</p>
        <h1 className="mt-3 text-4xl md:text-5xl">K-beauty & peau grasse</h1>
        <p className="mt-4 text-lg leading-relaxed text-stone">
          Comprendre sa peau grasse, choisir les bons actifs, construire une routine douce.
          Sans jargon, sans promesse magique.
        </p>
      </header>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_240px]">
        <div>
          {/* Article à la une */}
          {featured && (
            <Link
              href={`/blog/${featured.slug}`}
              className="group block rounded-2xl border border-line bg-cream p-8 transition-colors hover:border-sage/40 md:p-10"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-terracotta">{featured.category}</p>
              <h2 className="mt-3 font-serif text-2xl leading-tight text-ink md:text-3xl">
                {featured.title}
              </h2>
              <p className="mt-3 leading-relaxed text-stone">{featured.description}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-sage">
                Lire l&apos;article
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          )}

          {/* Liste */}
          <div className="mt-6 divide-y divide-line border-t border-line">
            {rest.map((post) => (
              <article key={post.slug} className="py-6">
                <Link href={`/blog/${post.slug}`} className="group block">
                  <div className="flex items-center gap-3 text-xs text-stone">
                    <span className="uppercase tracking-[0.2em] text-terracotta">{post.category}</span>
                    <span>·</span>
                    <span>{formatDate(post.date)}</span>
                    <span>·</span>
                    <span>{post.readingTime}</span>
                  </div>
                  <h2 className="mt-2 text-xl text-ink transition-colors group-hover:text-sage">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-stone">{post.description}</p>
                </Link>
              </article>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-line bg-cream p-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-stone">Catégories</h2>
            <ul className="mt-4 space-y-2">
              {categories.map((cat) => (
                <li key={cat.name} className="flex items-center justify-between text-sm">
                  <span className="text-ink">{cat.name}</span>
                  <span className="text-stone">{cat.count}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-5 rounded-2xl border border-line bg-sage p-6 text-cream">
            <p className="font-serif text-lg">-15 % {PREORDER_ENABLED ? "Édition Fondateur·rices" : "au lancement"}</p>
            <p className="mt-2 text-sm text-cream/80">
              {PREORDER_ENABLED
                ? "Précommande ouverte — premier lot limité à 200 flacons."
                : "Inscris-toi pour être prévenu·e en avant-première."}
            </p>
            <Link
              href={PREORDER_ENABLED ? "/le-produit#acheter" : "/#precommande"}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-cream underline underline-offset-4"
            >
              {PREORDER_ENABLED ? "Précommander (-15%)" : "Je réserve ma place (-15%)"}
              <ArrowRight size={14} />
            </Link>
          </div>
        </aside>
      </div>
    </Container>
  );
}
