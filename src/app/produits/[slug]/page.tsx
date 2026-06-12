import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, X, CaretDown, Drop, Sparkle, ShieldCheck, Leaf } from "@phosphor-icons/react/dist/ssr";
import { getProduct, PRODUCTS } from "@/lib/products";
import { Container } from "@/components/ui/container";
import { ProductVisual } from "@/components/product/product-visual";
import { BuyBox } from "@/components/product/buy-box";
import { formatPrice } from "@/lib/utils";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.shortDescription,
  };
}

const ACTIVE_ICONS = [Sparkle, Drop, ShieldCheck, Leaf];

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    brand: { "@type": "Brand", name: "NAEUL" },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "EUR",
      lowPrice: Math.min(...product.variants.map((v) => v.price)),
      highPrice: Math.max(...product.variants.map((v) => v.price)),
      offerCount: product.variants.length,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <div className="pb-24 md:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* HERO */}
      <Container className="grid gap-10 py-12 md:grid-cols-2 md:gap-16 md:py-20">
        <div className="md:sticky md:top-24 md:self-start">
          <ProductVisual />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-stone">
            Produit hero · peau grasse & mixte
          </p>
          <h1 className="mt-4 text-balance text-4xl leading-tight md:text-5xl">{product.name}</h1>
          <p className="mt-4 text-lg leading-relaxed text-stone">{product.tagline}</p>
          <p className="mt-4 leading-relaxed text-ink/80">{product.shortDescription}</p>
          <p className="mt-5 text-sm text-stone">{product.format}</p>

          <div className="mt-8">
            <BuyBox product={product} />
          </div>
        </div>
      </Container>

      {/* POUR QUI */}
      <SectionBand>
        <div className="grid gap-8 md:grid-cols-2">
          <Card title="Pour qui c'est" items={product.forWho} tone="positive" />
          <Card title="Pour qui ce n'est pas" items={product.notForWho} tone="negative" />
        </div>
      </SectionBand>

      {/* CE QUE ÇA FAIT */}
      <Container className="py-16 md:py-24">
        <SectionHeading
          eyebrow="Promesse honnête"
          title="Ce que ça fait — et ce que ça ne fait pas"
        />
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <Card title="Ce que ça fait" items={product.does} tone="positive" />
          <Card title="Ce que ça ne fait pas" items={product.doesNot} tone="negative" />
        </div>
      </Container>

      {/* ACTIFS */}
      <SectionBand>
        <SectionHeading eyebrow="La formule" title="Les actifs, expliqués" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {product.actives.map((active, i) => {
            const Icon = ACTIVE_ICONS[i % ACTIVE_ICONS.length];
            return (
              <div key={active.name} className="rounded-xl border border-line bg-sand p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-sage/10 text-sage">
                  <Icon size={20} />
                </span>
                <h3 className="mt-4 text-base">{active.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone">{active.role}</p>
              </div>
            );
          })}
        </div>
      </SectionBand>

      {/* COMMENT L'UTILISER */}
      <Container className="py-16 md:py-24">
        <SectionHeading eyebrow="La routine" title="Comment l'utiliser" />
        <ol className="mt-10 space-y-5">
          {product.steps.map((step, i) => (
            <li key={step.title} className="flex gap-5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-sage font-serif text-sm text-sage">
                {i + 1}
              </span>
              <div className="pt-1">
                <h3 className="text-base">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-stone">{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>

      {/* POURQUOI LE PRIX */}
      <SectionBand>
        <SectionHeading
          eyebrow="Transparence"
          title={`Pourquoi ${formatPrice(product.unitPrice)}`}
        />
        <div className="mt-10 max-w-2xl divide-y divide-line rounded-xl border border-line bg-sand">
          {product.priceBreakdown.map((row) => (
            <div key={row.label} className="flex flex-col gap-1 p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
              <p className="text-sm font-medium text-ink">{row.label}</p>
              <p className="text-sm text-stone sm:text-right">{row.value}</p>
            </div>
          ))}
        </div>
      </SectionBand>

      {/* FAQ PRODUIT */}
      <Container className="py-16 md:py-24">
        <SectionHeading eyebrow="Questions fréquentes" title="Avant de commander" />
        <div className="mt-10 max-w-2xl divide-y divide-line border-y border-line">
          {product.faq.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-medium text-ink marker:content-none">
                {item.q}
                <CaretDown
                  size={18}
                  className="shrink-0 text-stone transition-transform group-open:rotate-180"
                />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-stone">{item.a}</p>
            </details>
          ))}
        </div>
      </Container>

      {/* REVIEWS PLACEHOLDER */}
      <SectionBand>
        <SectionHeading eyebrow="Avis vérifiés" title="La parole aux peaux grasses" />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-xl border border-dashed border-line bg-sand/60 p-6">
              <div className="flex gap-1 text-terracotta">
                {"★★★★★".split("").map((s, j) => (
                  <span key={j}>{s}</span>
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-stone">
                Les avis clients vérifiés apparaîtront ici après les premières commandes
                (intégration Junip / Loox prévue en V2).
              </p>
            </div>
          ))}
        </div>
      </SectionBand>
    </div>
  );
}

/* ---------- Sous-composants de présentation ---------- */

function SectionBand({ children }: { children: React.ReactNode }) {
  return (
    <section className="border-y border-line bg-cream">
      <Container className="py-16 md:py-24">{children}</Container>
    </section>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="max-w-2xl">
      <p className="text-xs uppercase tracking-[0.25em] text-stone">{eyebrow}</p>
      <h2 className="mt-3 text-3xl md:text-4xl">{title}</h2>
    </div>
  );
}

function Card({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: "positive" | "negative";
}) {
  const Icon = tone === "positive" ? Check : X;
  return (
    <div className="rounded-xl border border-line bg-sand p-7">
      <h3 className="text-lg">{title}</h3>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink/85">
            <Icon
              size={18}
              weight="bold"
              className={tone === "positive" ? "mt-0.5 shrink-0 text-sage" : "mt-0.5 shrink-0 text-terracotta"}
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
