import type { Metadata } from "next";
import Image from "next/image";
import {
  Check,
  X,
  Drop,
  Sparkle,
  ShieldCheck,
  Leaf,
  FlowerLotus,
  Sun,
} from "@phosphor-icons/react/dist/ssr";
import { HERO_PRODUCT } from "@/lib/products";
import { Container } from "@/components/ui/container";
import { WaitlistForm } from "@/components/waitlist-form";
import { Reviews } from "@/components/reviews";
import { formatPrice } from "@/lib/utils";

const product = HERO_PRODUCT;

export const metadata: Metadata = {
  title: "Sérum aux exosomes et à la niacinamide pour peau grasse",
  description:
    "Sérum K-beauty pour peau grasse : niacinamide, exosomes, acide hyaluronique. Régule le sébum, apaise sans dessécher. Made in EU, vegan. Précommande -15%.",
  alternates: { canonical: "/le-produit" },
};

const ACTIVE_ICONS = [Drop, Sparkle, Leaf, FlowerLotus, ShieldCheck, Sun];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Brand",
      name: "naeul",
      slogan: "K-beauty pour peau grasse, sans agresser.",
    },
    {
      "@type": "Product",
      name: product.name,
      description: product.shortDescription,
      brand: { "@type": "Brand", name: "naeul" },
      image: product.photos.map((p) => `https://naeul.fr${p.src}`),
      category: "Soin du visage / Sérum",
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "EUR",
        lowPrice: Math.min(...product.variants.map((v) => v.price)),
        highPrice: Math.max(...product.variants.map((v) => v.price)),
        offerCount: product.variants.length,
        availability: "https://schema.org/PreOrder",
      },
      // Pas d'aggregateRating tant qu'il n'y a pas d'avis réels (sinon publicité trompeuse).
    },
    {
      "@type": "FAQPage",
      mainEntity: product.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function LeProduitPage() {
  const [hero, ...gallery] = product.photos;

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* HERO */}
      <Container className="grid gap-10 py-12 md:grid-cols-2 md:gap-16 md:py-20">
        <div className="md:sticky md:top-24 md:self-start">
          <div className="overflow-hidden rounded-2xl bg-rose/30">
            <Image
              src={hero.src}
              alt={hero.alt}
              width={1200}
              height={1500}
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-sage/30 bg-sage/[0.06] px-3 py-1 text-xs font-medium text-sage">
            Bientôt disponible · précommande -15%
          </span>
          <h1 className="mt-4 text-balance text-4xl leading-tight md:text-5xl">{product.name}</h1>
          <p className="mt-4 text-lg leading-relaxed text-stone">{product.tagline}</p>
          <p className="mt-4 leading-relaxed text-ink/80">{product.shortDescription}</p>

          <p className="mt-6 text-sm text-stone">
            {product.format} — {product.volume}
          </p>

          {/* Prix (info, pas d'achat en Phase 1) */}
          <div className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-sm text-stone">À partir de</span>
            <span className="font-serif text-3xl text-ink">{formatPrice(product.unitPrice)}</span>
            <span className="text-sm text-stone">
              · packs jusqu&apos;à {formatPrice(product.variants[2].price / product.variants[2].flacons)} le flacon
            </span>
          </div>

          {/* Certifications */}
          <ul className="mt-5 flex flex-wrap gap-2">
            {product.certifications.map((c) => (
              <li
                key={c}
                className="rounded-full border border-terracotta/40 px-3 py-1 text-xs text-stone"
              >
                {c}
              </li>
            ))}
          </ul>

          {/* Waitlist */}
          <div className="mt-8 rounded-2xl border border-line bg-cream p-6">
            <p className="text-sm font-medium text-ink">
              Le sérum arrive bientôt. Soyez prévenue en avant-première.
            </p>
            <p className="mt-1 text-xs text-stone">
              Premier batch limité — les inscrites sont prévenues et servies en priorité.
            </p>
            <WaitlistForm className="mt-4" cta="Je veux -15%" />
          </div>
        </div>
      </Container>

      {/* DIFFÉRENCIATEUR */}
      <section className="border-y border-line bg-cream">
        <Container className="py-16 md:py-24">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.25em] text-stone">La différence naeul</p>
            <h2 className="mt-3 text-3xl md:text-4xl">On ne vous assèche pas.</h2>
            <p className="mt-6 text-lg leading-relaxed text-stone">{product.differentiator}</p>
          </div>
        </Container>
      </section>

      {/* ACTIFS */}
      <Container className="py-16 md:py-24">
        <SectionHeading eyebrow="La formule" title="Six actifs, une intention" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
      </Container>

      {/* CE QUE ÇA FAIT / NE FAIT PAS */}
      <section className="border-y border-line bg-cream">
        <Container className="py-16 md:py-24">
          <SectionHeading eyebrow="Promesse honnête" title="Ce que ça fait — et ce que ça ne fait pas" />
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <Card title="Ce que ça fait" items={product.does} tone="positive" />
            <Card title="Ce que ça ne fait pas" items={product.doesNot} tone="negative" />
          </div>
        </Container>
      </section>

      {/* ROUTINE */}
      <Container className="py-16 md:py-24">
        <SectionHeading eyebrow="La routine" title="Comment l'utiliser" />
        <ol className="mt-10 max-w-2xl space-y-5">
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

      {/* GALERIE */}
      <section className="border-t border-line bg-cream">
        <Container className="py-16 md:py-24">
          <SectionHeading eyebrow="En images" title="Le sérum, en situation" />
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {gallery.map((photo) => (
              <div key={photo.src} className="overflow-hidden rounded-xl bg-rose/30">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={800}
                  height={1000}
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="aspect-[4/5] h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CONFORMITÉ */}
      <Container className="py-16 md:py-24">
        <SectionHeading eyebrow="Transparence" title="Origine & conformité" />
        <dl className="mt-10 max-w-2xl divide-y divide-line rounded-xl border border-line bg-sand">
          <Row label="Origine" value={product.origin} />
          <Row label="Notification cosmétique" value={product.cpnp} />
          <Row label="Certifications" value={product.certifications.join(" · ")} />
          <Row label="Fabricant" value="Selfnamed (Cosmetics Nord), Riga, Lettonie — UE" />
        </dl>
      </Container>

      {/* FAQ */}
      <section className="border-t border-line bg-cream">
        <Container className="py-16 md:py-24">
          <SectionHeading eyebrow="Questions fréquentes" title="Avant le lancement" />
          <div className="mt-10 max-w-2xl divide-y divide-line border-y border-line">
            {product.faq.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-medium text-ink marker:content-none">
                  {item.q}
                  <span className="text-stone transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-stone">{item.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {/* AVIS */}
      <Reviews />

      {/* CTA FINAL */}
      <section id="precommande" className="scroll-mt-20 bg-sage">
        <Container className="flex flex-col items-center gap-6 py-20 text-center md:py-24">
          <h2 className="max-w-xl text-balance text-3xl text-cream md:text-4xl">
            Soyez la première à l&apos;essayer. -15% sur votre précommande.
          </h2>
          <WaitlistForm tone="onAccent" cta="Je veux -15%" className="w-full max-w-md" />
        </Container>
      </section>
    </div>
  );
}

/* ---------- sous-composants ---------- */

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

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
      <dt className="text-sm font-medium text-ink">{label}</dt>
      <dd className="text-sm text-stone sm:text-right">{value}</dd>
    </div>
  );
}
