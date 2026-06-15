import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { Check } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { HERO_PRODUCT } from "@/lib/products";
import { Container } from "@/components/ui/container";
import { WaitlistForm } from "@/components/waitlist-form";
import { Reviews } from "@/components/reviews";
import { ProductCarousel } from "@/components/product/product-carousel";
import { ActivesCarousel } from "@/components/product/actives-carousel";
import { GalleryCarousel } from "@/components/product/gallery-carousel";
import { BeforeAfter } from "@/components/product/before-after";
import { SwipeCarousel } from "@/components/swipe-carousel";
import { PreorderBox } from "@/components/product/preorder-box";
import { FaqAccordion } from "@/components/faq-accordion";
import { WaitlistCount } from "@/components/waitlist-count";
import { StickyCta } from "@/components/sticky-cta";
import { ReassuranceRow } from "@/components/reassurance-row";
import { LifestyleGrid } from "@/components/lifestyle-grid";
import { Marquee } from "@/components/marquee";
import { ListAccordion } from "@/components/list-accordion";
import { PREORDER_ENABLED, SHIPPING_DATE } from "@/lib/preorder";
import { buttonClasses } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

const product = HERO_PRODUCT;

const GALLERY = [
  {
    src: "/images/naeul-texture-macro.jpg",
    alt: "Macro de la texture du sérum naeul : une goutte fluide et légère sur la peau",
    title: "Texture légère",
    desc: "Un sérum fluide et non gras, qui pénètre vite.",
  },
  {
    src: "/images/naeul-application.jpg",
    alt: "Une personne à la peau lumineuse applique le sérum naeul sur le dos de sa main",
    title: "En 2-3 gouttes",
    desc: "Matin et/ou soir, sur peau propre, avant ta crème.",
  },
  {
    src: "/images/naeul-produit-minimal.jpg",
    alt: "Le flacon airless du sérum naeul, composition minimaliste",
    title: "Flacon airless 30 ml",
    desc: "Protège les actifs de l'air et de la lumière.",
  },
  {
    src: "/images/naeul-produit-lifestyle.jpg",
    alt: "Le sérum naeul dans une ambiance végétale",
    title: "Une routine douce",
    desc: "Un seul geste, pensé pour la peau grasse.",
  },
];

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
  const hasAvantApres = fs.existsSync(
    path.join(process.cwd(), "public/images/naeul-avant-apres.jpg"),
  );
  const hasLifestyle = fs.existsSync(
    path.join(process.cwd(), "public/images/naeul-lifestyle-1.jpg"),
  );
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

          {/* Bénéfices clairs, près du CTA */}
          <ul className="mt-6 space-y-2.5">
            {product.does.map((d) => (
              <li key={d} className="flex items-start gap-2.5 text-sm text-ink/85">
                <Check size={17} weight="bold" className="mt-0.5 shrink-0 text-sage" />
                {d}
              </li>
            ))}
          </ul>

          {/* Specs + certifications */}
          <div className="mt-7 border-t border-line pt-5">
            <p className="text-sm text-stone">
              {product.format} · {product.volume}
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {product.certifications.map((c) => (
                <li
                  key={c}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-cream px-3 py-1 text-xs text-stone"
                >
                  <Check size={12} weight="bold" className="text-sage" />
                  {c}
                </li>
              ))}
            </ul>
          </div>

          {PREORDER_ENABLED ? (
            /* PRÉ-COMMANDE — Édition Fondateur·rices */
            <div className="mt-8">
              <PreorderBox product={product} />
            </div>
          ) : (
            /* WAITLIST — mode pré-lancement (avant activation du paiement) */
            <>
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

              <div className="mt-8 rounded-2xl border border-line bg-cream p-6">
                <p className="text-sm font-medium text-ink">
                  Le sérum arrive en juillet 2026. Sois prévenu·e en avant-première.
                </p>
                <p className="mt-1 text-xs text-stone">
                  Premier lot limité à 200 flacons — les inscrit·es sont prévenu·es et servi·es en priorité.
                </p>
                <WaitlistForm source="produit_haut" className="mt-4" />
                <WaitlistCount className="mt-4 justify-start" />
                <ReassuranceRow className="mt-4 border-t border-line pt-4" />
                <p className="mt-3 text-[0.7rem] text-stone/80">
                  Inscription gratuite · pas de spam · ton code -15% par email.
                </p>
              </div>
            </>
          )}
        </div>
      </Container>

      {/* RÉSULTATS — avant/après (proof early) */}
      {hasAvantApres && (
        <Container className="py-16 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-stone">Test interne</p>
            <h2 className="mt-3 text-3xl md:text-4xl">Le grain de peau, en 4 semaines</h2>
            <p className="mt-4 leading-relaxed text-stone">
              Pores resserrés, peau plus lisse et moins brillante — observés lors de notre test
              interne sur peau grasse, avant lancement.
            </p>
          </div>
          <BeforeAfter />
          <p className="mt-4 text-center text-xs text-stone">
            Glisse pour comparer · test interne sur peau grasse, 4 semaines (pas un avis client).
            Résultats individuels, non garantis.
          </p>
        </Container>
      )}

      {/* DIFFÉRENCIATEUR */}
      <section className="border-y border-line bg-cream">
        <Container className="py-16 md:py-24">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.25em] text-stone">La différence naeul</p>
            <h2 className="mt-3 text-3xl md:text-4xl">Réguler, pas dessécher.</h2>
            <p className="mt-6 text-lg leading-relaxed text-stone">{product.differentiator}</p>
          </div>
        </Container>
      </section>

      {/* ACTIFS — la formule */}
      <Container className="py-16 md:py-24">
        <SectionHeading eyebrow="La formule" title="Six actifs, une intention" />
        <ActivesCarousel actives={product.actives} />
      </Container>

      {/* Ruban d'ingrédients — défilement premium pleine largeur */}
      <Marquee
        items={product.actives.map((a) => a.name)}
        duration={44}
        className="border-y border-line bg-cream py-6"
        itemClassName="font-serif text-2xl italic text-ink md:text-3xl"
      />

      {/* TIMELINE — de la formule à ta peau */}
      <section className="border-t border-line">
        <Container className="py-16 md:py-24">
          <SectionHeading eyebrow="Notre démarche" title="De la formule à ta peau" />
          <SwipeCarousel
            as="ol"
            className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 scrollbar-hide sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 sm:overflow-visible lg:grid-cols-4"
          >
            {[
              {
                t: "La formule",
                d: "Six actifs dosés juste, pensés pour la peau grasse — sans alcool dénaturé ni BHA forts.",
              },
              {
                t: "Le laboratoire",
                d: "Formulée dans un laboratoire certifié ISO 22716 et ECOCERT, dans l'Union européenne.",
              },
              {
                t: "Les contrôles",
                d: "Conformité cosmétique européenne, notification CPNP en cours d'enregistrement.",
              },
              {
                t: "Chez toi",
                d: "Édition Fondateur·rices à 200 flacons, livraison Mondial Relay, garantie 30 jours.",
              },
            ].map((step, i, arr) => (
              <li key={step.t} className="relative w-full shrink-0 snap-center sm:w-auto">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-sage font-serif text-sm text-sage">
                    {i + 1}
                  </span>
                  {i < arr.length - 1 && (
                    <span className="hidden h-px flex-1 bg-line lg:block" aria-hidden="true" />
                  )}
                </div>
                <h3 className="mt-4 text-base">{step.t}</h3>
                <p className="mt-1 text-sm leading-relaxed text-stone">{step.d}</p>
              </li>
            ))}
          </SwipeCarousel>
        </Container>
      </section>

      {/* L'EXPÉRIENCE — galerie */}
      <section className="border-y border-line bg-cream">
        <Container className="py-16 md:py-24">
          <SectionHeading eyebrow="L'expérience" title="Le sérum, en gestes" />
          <GalleryCarousel cards={GALLERY} />
        </Container>
      </section>

      {/* ROUTINE */}
      <Container className="py-16 md:py-24">
        <SectionHeading eyebrow="La routine" title="Comment l'utiliser" />
        <SwipeCarousel
          as="ol"
          className="mt-10 flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto pb-2 scrollbar-hide"
        >
          {product.steps.map((step, i) => (
            <li
              key={step.title}
              className="flex w-full shrink-0 snap-center flex-col rounded-2xl border border-line bg-sand p-6 sm:w-[45%] lg:w-[31%]"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-sage font-serif text-sm text-sage">
                {i + 1}
              </span>
              <h3 className="mt-4 text-base">{step.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-stone">{step.detail}</p>
            </li>
          ))}
        </SwipeCarousel>
      </Container>

      {/* COMPARAISON */}
      <section className="border-y border-line bg-cream">
        <Container className="py-16 md:py-24">
          <SectionHeading eyebrow="La différence, concrètement" title="naeul vs un sérum « peau grasse » classique" />
          <div className="mt-10 max-w-2xl overflow-hidden rounded-2xl border border-line">
            <div className="grid grid-cols-[1.5fr_1fr_1fr] bg-sand text-xs font-medium uppercase tracking-wider text-stone">
              <span className="p-4" />
              <span className="p-4 text-center text-sage">naeul</span>
              <span className="p-4 text-center">Sérums classiques</span>
            </div>
            {[
              { c: "Approche", a: "Équilibre en douceur", b: "Dessèche" },
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
      </section>

      {/* L'ESSENTIEL — ce que ça fait/pas + pour qui, en accordéon compact */}
      <section className="border-y border-line bg-cream">
        <Container className="py-16 md:py-24">
          <SectionHeading eyebrow="En clair" title="L'essentiel, sans détour" />
          <ListAccordion
            className="mt-10 max-w-2xl"
            rows={[
              { title: "Ce que ça fait", items: product.does, tone: "positive" },
              { title: "Ce que ça ne fait pas", items: product.doesNot, tone: "negative" },
              { title: "Pour toi si…", items: product.forWho, tone: "positive" },
              { title: "Sans doute pas pour toi si…", items: product.notForWho, tone: "negative" },
            ]}
          />
        </Container>
      </section>

      {/* EN SITUATION — grille lifestyle (imagerie neutre) */}
      {hasLifestyle && (
        <section className="border-t border-line">
          <Container className="py-16 md:py-24">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs uppercase tracking-[0.25em] text-stone">En situation</p>
              <h2 className="mt-3 text-3xl md:text-4xl">Un geste, toutes les peaux grasses</h2>
              <p className="mt-4 leading-relaxed text-stone">
                Le même sérum, la même promesse — réguler le sébum sans agresser, quels que soient
                ta carnation et ton genre.
              </p>
            </div>
            <LifestyleGrid className="mx-auto mt-10 max-w-2xl" />
          </Container>
        </section>
      )}

      {/* AVIS */}
      <Reviews />

      {/* FAQ — déplacée ici, juste avant le CTA final */}
      <section className="border-t border-line">
        <Container className="py-16 md:py-24">
          <SectionHeading eyebrow="Questions fréquentes" title="Avant le lancement" />
          <FaqAccordion items={product.faq} className="mt-10 max-w-2xl" />
        </Container>
      </section>

      {/* CTA FINAL */}
      <section id="precommande" className="scroll-mt-20 border-t border-line bg-cream">
        <Container className="flex flex-col items-center gap-6 py-20 text-center md:py-24">
          {PREORDER_ENABLED ? (
            <>
              <h2 className="max-w-xl text-balance text-3xl md:text-4xl">
                Rejoins les fondatrices de naeul.
              </h2>
              <p className="max-w-md leading-relaxed text-stone">
                -15% sur l&apos;Édition Fondateur·rices, livraison offerte, garantie 30 jours.
                Expédition prévue {SHIPPING_DATE}.
              </p>
              <Link href="#acheter" className={buttonClasses({ size: "lg" })}>
                Précommander (-15%)
              </Link>
              <p className="text-sm text-stone">
                Pas encore décidé·e ?{" "}
                <Link href="/#precommande" className="text-sage underline underline-offset-4">
                  Rejoins la liste et reçois des nouvelles
                </Link>
                .
              </p>
            </>
          ) : (
            <>
              <h2 className="max-w-xl text-balance text-3xl md:text-4xl">
                Sois la première à l&apos;essayer. -15% au lancement.
              </h2>
              <p className="max-w-md leading-relaxed text-stone">
                Rejoins la liste d&apos;avant-première : tu reçois ton code -15% et tu es prévenu·e
                dès l&apos;ouverture des précommandes.
              </p>
              <WaitlistForm source="produit_bas" className="w-full max-w-md" />
              <WaitlistCount />
            </>
          )}
        </Container>
      </section>

      {/* CTA sticky mobile — se révèle au scroll, s'efface près du bas */}
      <StickyCta
        href={PREORDER_ENABLED ? "#acheter" : "#precommande"}
        label={PREORDER_ENABLED ? "Précommander (-15%)" : "Je réserve ma place (-15%)"}
        event={PREORDER_ENABLED ? "sticky_preorder_click" : "sticky_waitlist_click"}
      />
    </div>
  );
}

/* ---------- sous-composants ---------- */

function SectionHeading({ eyebrow, title }: { eyebrow?: string; title: string }) {
  return (
    <div className="max-w-2xl">
      {eyebrow && <p className="text-xs uppercase tracking-[0.25em] text-stone">{eyebrow}</p>}
      <h2 className={`text-3xl md:text-4xl${eyebrow ? " mt-3" : ""}`}>{title}</h2>
    </div>
  );
}

