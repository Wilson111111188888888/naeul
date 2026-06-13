import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Image from "next/image";
import { Check, X } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { HERO_PRODUCT } from "@/lib/products";
import { Container } from "@/components/ui/container";
import { WaitlistForm } from "@/components/waitlist-form";
import { Reviews } from "@/components/reviews";
import { ProductCarousel } from "@/components/product/product-carousel";
import { ActivesCarousel } from "@/components/product/actives-carousel";
import { buttonClasses } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

const product = HERO_PRODUCT;

export const metadata: Metadata = {
  title: "Sérum aux exosomes et à la niacinamide pour peau grasse",
  description:
    "Sérum K-beauty pour peau grasse : niacinamide, exosomes, acide hyaluronique. Régule le sébum, apaise sans dessécher. Vegan, ECOCERT. Précommande -15%.",
  alternates: { canonical: "/le-produit" },
};

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
      image: product.photos.map((p) => `https://naeul.com${p.src}`),
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
  const hasMosaic = fs.existsSync(path.join(process.cwd(), "public/images/naeul-communaute.jpg"));
  return (
    <div className="pb-20 md:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* HERO */}
      <Container className="grid gap-10 py-12 md:grid-cols-2 md:gap-16 md:py-20">
        <ProductCarousel photos={product.photos} />

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
          <div className="mt-6">
            <ul className="divide-y divide-line overflow-hidden rounded-xl border border-line">
              {product.variants.map((v) => (
                <li key={v.id} className="flex items-center justify-between gap-4 px-4 py-3">
                  <span className="text-sm text-ink">{v.label}</span>
                  <span className="flex items-baseline gap-2">
                    {v.saving > 0 && (
                      <span className="text-xs font-medium text-sage">
                        économise {formatPrice(v.saving)}
                      </span>
                    )}
                    <span className="font-serif text-lg text-ink">{formatPrice(v.price)}</span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-xs text-stone">
              Livraison Mondial Relay 3,50 € — offerte dès 50 €.
            </p>
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
              Le sérum arrive bientôt. Sois prévenue en avant-première.
            </p>
            <p className="mt-1 text-xs text-stone">
              Premier batch limité à 200 flacons — les inscrites sont prévenues et servies en priorité.
            </p>
            <WaitlistForm className="mt-4" />
            <p className="mt-3 text-[0.7rem] text-stone/80">
              Inscription gratuite · pas de spam · ton code -15% par email.
            </p>
          </div>
        </div>
      </Container>

      {/* DIFFÉRENCIATEUR */}
      <section className="border-y border-line bg-cream">
        <Container className="py-16 md:py-24">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.25em] text-stone">La différence naeul</p>
            <h2 className="mt-3 text-3xl md:text-4xl">Hydrater, pas décaper.</h2>
            <p className="mt-6 text-lg leading-relaxed text-stone">{product.differentiator}</p>
          </div>
        </Container>
      </section>

      {/* COMPARAISON */}
      <Container className="py-16 md:py-24">
        <SectionHeading eyebrow="La différence, concrètement" title="naeul vs un sérum « peau grasse » classique" />
        <div className="mt-10 max-w-2xl overflow-hidden rounded-2xl border border-line">
          <div className="grid grid-cols-[1.5fr_1fr_1fr] bg-cream text-xs font-medium uppercase tracking-wider text-stone">
            <span className="p-4" />
            <span className="p-4 text-center text-sage">naeul</span>
            <span className="p-4 text-center">Sérums classiques</span>
          </div>
          {[
            { c: "Approche", a: "Équilibre en douceur", b: "Décape" },
            { c: "Alcool dénaturé, BHA forts", a: "Jamais", b: "Souvent" },
            { c: "ECOCERT · ISO 22716 · Vegan", a: "Oui", b: "Variable" },
            { c: "Pensé pour la peau grasse", a: "Uniquement", b: "Toutes peaux" },
            { c: "Transparence (INCI, actifs)", a: "Totale", b: "Variable" },
          ].map((row) => (
            <div key={row.c} className="grid grid-cols-[1.5fr_1fr_1fr] border-t border-line text-sm">
              <span className="p-4 text-ink/85">{row.c}</span>
              <span className="bg-rose/20 p-4 text-center font-medium text-ink">{row.a}</span>
              <span className="p-4 text-center text-stone">{row.b}</span>
            </div>
          ))}
        </div>
      </Container>

      {/* ACTIFS */}
      <Container className="pb-16 md:pb-24">
        <SectionHeading eyebrow="La formule" title="Six actifs, une intention" />
        <ActivesCarousel actives={product.actives} />
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

      {/* EN SITUATION — le problème, et notre réponse (à la place de l'ancienne FAQ) */}
      {hasMosaic && (
        <section className="border-t border-line bg-cream">
          <Container className="py-16 md:py-24">
            <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
              <figure className="order-2 md:order-1">
                <div className="overflow-hidden rounded-2xl bg-rose/30">
                  <Image
                    src="/images/naeul-communaute.jpg"
                    alt="Quatre femmes aux carnations variées avec le sérum naeul"
                    width={1100}
                    height={1100}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="aspect-square h-full w-full object-cover"
                  />
                </div>
                <figcaption className="mt-2 text-xs text-stone">Visuel d&apos;inspiration</figcaption>
              </figure>
              <div className="order-1 md:order-2">
                <p className="text-xs uppercase tracking-[0.25em] text-stone">En situation</p>
                <h2 className="mt-3 text-3xl md:text-4xl">Le problème, et notre réponse.</h2>
                <p className="mt-6 leading-relaxed text-stone">
                  Milieu de journée : la zone T brille, les pores se voient, le maquillage glisse. Le
                  réflexe — décaper, matifier — assèche la peau, qui réagit en produisant encore plus
                  de sébum.
                </p>
                <p className="mt-4 leading-relaxed text-stone">
                  naeul casse ce cercle : on régule le sébum <em>et</em> on hydrate en même temps,
                  avec des actifs doux. La peau s&apos;équilibre, au lieu de sur-réagir.
                </p>
                <Link
                  href="#precommande"
                  className={buttonClasses({ size: "lg", className: "mt-8" })}
                >
                  Je veux être prévenue (-15%)
                </Link>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* AVIS */}
      <Reviews />

      {/* FAQ — déplacée ici, juste avant le CTA final */}
      <section className="border-t border-line">
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

      {/* CTA FINAL */}
      <section id="precommande" className="scroll-mt-20 border-t border-line bg-cream">
        <Container className="flex flex-col items-center gap-6 py-20 text-center md:py-24">
          <h2 className="max-w-xl text-balance text-3xl md:text-4xl">
            Sois la première à l&apos;essayer. -15% au lancement.
          </h2>
          <p className="max-w-md leading-relaxed text-stone">
            Rejoins la liste d&apos;avant-première : tu reçois ton code -15% et tu es prévenue dès
            l&apos;ouverture des précommandes.
          </p>
          <WaitlistForm className="w-full max-w-md" />
          <p className="text-[0.7rem] text-stone/80">
            Inscription gratuite · pas de spam · désinscription en un clic.
          </p>
        </Container>
      </section>

      {/* CTA sticky mobile */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-sand/95 p-3 backdrop-blur-md md:hidden">
        <Link href="#precommande" className={buttonClasses({ size: "lg", className: "w-full" })}>
          Je veux être prévenue (-15%)
        </Link>
      </div>
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
