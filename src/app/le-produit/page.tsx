import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Check, X, ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import { HERO_PRODUCT } from "@/lib/products";
import { Container } from "@/components/ui/container";
import { WaitlistForm } from "@/components/waitlist-form";
import { ProductCarousel } from "@/components/product/product-carousel";
import { ActivesCarousel } from "@/components/product/actives-carousel";
import { BeforeAfter } from "@/components/product/before-after";
import { SwipeCarousel } from "@/components/swipe-carousel";
import { PreorderBox } from "@/components/product/preorder-box";
import { FaqAccordion } from "@/components/faq-accordion";
import { StickyCta } from "@/components/sticky-cta";
import { ReassuranceRow } from "@/components/reassurance-row";
import { Marquee } from "@/components/marquee";
import { MethodStrates } from "@/components/sections/method-strates";
import { GesteNaeul } from "@/components/sections/geste-naeul";
import { TestersWall } from "@/components/sections/testers-wall";
import { PREORDER_ENABLED, SHIPPING_DATE } from "@/lib/preorder";
import { buttonClasses } from "@/components/ui/button";
import { formatPrice, cn } from "@/lib/utils";

const product = HERO_PRODUCT;

// Pour qui c'est fait — et pour qui ce n'est pas (qualification + déqualification).
const FOR_YOU = [
  "Tu as la peau grasse, mixte à grasse, ou grasse sensible",
  "Tu en as marre des produits agressifs qui assèchent",
  "Tu cherches une approche douce mais efficace",
  "Tu acceptes que les vrais résultats prennent 6 à 8 semaines",
];
const NOT_FOR_YOU = [
  "Tu as la peau sèche ou très sèche",
  "Tu cherches un effet matifiant instantané",
  "Tu attends un miracle en 7 jours",
  "Tu es enceinte ou allaitante (consulte d'abord)",
];

export const metadata: Metadata = {
  title: "Sérum régulateur à la niacinamide pour peau grasse",
  description:
    "Sérum K-beauty pour peau grasse : niacinamide 5%, acide lactique, Centella, acide hyaluronique. Régule le sébum, apaise sans dessécher. Vegan, ECOCERT.",
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
  return (
    <div className="pb-20 md:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1 — HERO PRODUIT (packshot + prix/bundles + CTA + mini-trust) */}
      <Container className="grid gap-10 py-12 md:grid-cols-2 md:gap-16 md:py-20">
        <ProductCarousel photos={product.photos} />

        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-sage/30 bg-sage/[0.06] px-3 py-1 text-xs font-medium text-sage">
            Bientôt disponible · Édition fondatrice -15%
          </span>
          <h1 className="mt-4 text-balance text-4xl leading-tight md:text-5xl">{product.name}</h1>
          <p className="mt-4 text-lg leading-relaxed text-stone">{product.tagline}</p>
          <p className="mt-4 leading-relaxed text-ink/80">{product.shortDescription}</p>

          <ul className="mt-6 space-y-2.5">
            {product.does.map((d) => (
              <li key={d} className="flex items-start gap-2.5 text-sm text-ink/85">
                <Check size={17} weight="bold" className="mt-0.5 shrink-0 text-sage" />
                {d}
              </li>
            ))}
          </ul>

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
            <div className="mt-8">
              <PreorderBox product={product} />
            </div>
          ) : (
            <>
              <div className="mt-6">
                <ul className="divide-y divide-line overflow-hidden rounded-xl border border-line">
                  {product.variants.map((v) => (
                    <li
                      key={v.id}
                      className={cn(
                        "flex items-center justify-between gap-4 px-4 py-3",
                        v.flacons === 3 && "bg-sage/[0.06]",
                      )}
                    >
                      <span>
                        <span className="flex items-center gap-2 text-sm text-ink">
                          {v.label}
                          {v.flacons === 3 && (
                            <span className="rounded-full bg-sage px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wide text-cream">
                              Meilleure valeur
                            </span>
                          )}
                          {v.flacons === 2 && (
                            <span className="rounded-full bg-sand px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wide text-stone">
                              Le plus pris
                            </span>
                          )}
                        </span>
                        <span className="mt-0.5 block text-xs text-stone">
                          {formatPrice(v.price / v.flacons)} / flacon
                        </span>
                      </span>
                      <span className="flex items-baseline gap-2">
                        {v.saving > 0 && (
                          <span className="text-xs font-medium text-sage">
                            -{formatPrice(v.saving)}
                          </span>
                        )}
                        <span className="font-serif text-lg text-ink">{formatPrice(v.price)}</span>
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-xs text-stone">
                  Expédition sous 5 à 7 jours ouvrés · Mondial Relay, offerte dès 50 €.
                </p>
              </div>

              <div className="mt-8 rounded-2xl border border-line bg-cream p-6">
                <p className="text-sm font-medium text-ink">
                  Le sérum arrive en août 2026. Sois au courant en avant-première.
                </p>
                <p className="mt-1 text-xs text-stone">
                  Édition fondatrice limitée à 200 flacons — les premières inscrites sont prévenues et
                  servies en priorité.
                </p>
                <WaitlistForm source="produit_haut" className="mt-4" />
                <p className="mt-4 text-xs uppercase tracking-[0.15em] text-stone/70">
                  Inscriptions en cours · Lancement août 2026
                </p>
                <ReassuranceRow className="mt-4 border-t border-line pt-4" />
                <p className="mt-3 text-[0.7rem] text-stone/80">
                  Inscription gratuite · pas de spam · ton code -15% par email.
                </p>
              </div>
            </>
          )}
        </div>
      </Container>

      {/* 2 — DIFFÉRENCIATEUR */}
      <section className="border-y border-line bg-cream">
        <Container className="py-16 md:py-24">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.25em] text-stone">La différence naeul</p>
            <h2 className="mt-3 text-3xl md:text-4xl">Réguler, pas dessécher.</h2>
            <p className="mt-6 text-lg leading-relaxed text-stone">{product.differentiator}</p>
          </div>
          <figure className="mx-auto mt-10 max-w-md overflow-hidden rounded-2xl">
            <Image
              src="/images/naeul-texture.jpg"
              alt="Texture du sérum naeul : fluide, légère, non grasse, absorption rapide, effet peau nue"
              width={880}
              height={1100}
              sizes="(max-width: 768px) 100vw, 448px"
              className="h-auto w-full"
            />
          </figure>
        </Container>
      </section>

      {/* RÉSULTATS — avant/après interactif (test interne) */}
      <section className="border-b border-line">
        <Container className="py-16 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-stone">Résultats · test interne</p>
            <h2 className="mt-3 text-3xl md:text-4xl">Le grain de peau, en 4 semaines</h2>
            <p className="mt-4 leading-relaxed text-stone">
              Pores resserrés, peau plus lisse et moins brillante — observés lors de notre test
              interne sur peau grasse, avant lancement.
            </p>
          </div>
          <BeforeAfter />
          <p className="mx-auto mt-4 max-w-xl text-center text-xs leading-relaxed text-stone">
            Glisse pour comparer · test interne sur peau grasse, 4 semaines (pas un avis client).
            Résultats individuels, non garantis.
          </p>
        </Container>
      </section>

      {/* 3 — LA MÉTHODE DES TROIS STRATES */}
      <MethodStrates className="border-b border-line" />

      {/* 4 — LES ACTIFS */}
      <Container className="py-16 md:py-24">
        <SectionHeading eyebrow="La formule" title="Cinq actifs, une intention" />
        <ActivesCarousel actives={product.actives} />
      </Container>

      {/* Ruban d'ingrédients — défilement premium pleine largeur */}
      <Marquee
        items={product.actives.map((a) => a.name)}
        duration={44}
        className="border-y border-line bg-cream py-6"
        itemClassName="font-serif text-2xl italic text-ink md:text-3xl"
      />

      {/* 5 — TRANSPARENCE / INCI */}
      <section className="border-b border-line">
        <Container className="py-16 md:py-24">
          <SectionHeading eyebrow="Transparence totale" title="Ce qu'il y a dedans" />
          <div className="mt-8 max-w-2xl rounded-2xl border border-line bg-cream p-6 md:p-8">
            <p className="leading-relaxed text-stone">
              On ne cache rien. Tu retrouveras la liste INCI complète au dos du flacon (visible sur
              les photos ci-dessus). La formule finale étant en cours de verrouillage avant lancement,
              on publiera ici la liste INCI exacte, intégrale, le jour de la sortie — sans rien
              retirer ni embellir.
            </p>
            <details className="group mt-5 border-t border-line pt-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-ink transition-colors hover:text-sage">
                Voir les 6 actifs et leur rôle
                <span className="text-stone transition-transform group-open:rotate-45">+</span>
              </summary>
              <ul className="mt-4 space-y-3">
                {product.actives.map((a) => (
                  <li key={a.name}>
                    <p className="text-sm font-medium text-ink">{a.name}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-stone">{a.role}</p>
                  </li>
                ))}
              </ul>
            </details>
          </div>
        </Container>
      </section>

      {/* 6 — LE GESTE NAEUL */}
      <GesteNaeul variant="accordion" className="border-b border-line bg-cream" />

      {/* 7 — POUR QUI C'EST FAIT / PAS FAIT */}
      <section className="border-b border-line">
        <Container className="py-16 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance font-serif text-3xl md:text-4xl">
              Pour qui c&apos;est fait. Et pour qui ce n&apos;est pas.
            </h2>
          </div>
          <div className="mx-auto mt-10 grid max-w-3xl gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-sage/30 bg-sage/[0.06] p-6">
              <p className="font-medium text-ink">Fait pour toi si :</p>
              <ul className="mt-4 space-y-3">
                {FOR_YOU.map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink/85">
                    <Check size={16} weight="bold" className="mt-0.5 shrink-0 text-sage" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-line bg-sand p-6">
              <p className="font-medium text-ink">Pas fait pour toi si :</p>
              <ul className="mt-4 space-y-3">
                {NOT_FOR_YOU.map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-sm leading-relaxed text-stone">
                    <X size={16} weight="bold" className="mt-0.5 shrink-0 text-stone/50" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* 8 — PRODUCTION · CERTIFICATIONS · TRAÇABILITÉ */}
      <section className="border-b border-line bg-cream">
        <Container className="py-16 md:py-24">
          <SectionHeading eyebrow="Production · certifications · traçabilité" title="De la formule à ta peau" />
          <SwipeCarousel
            as="ol"
            className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 scrollbar-hide sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 sm:overflow-visible lg:grid-cols-4"
          >
            {[
              {
                t: "La formule",
                d: "Cinq actifs dosés juste, pensés pour la peau grasse — sans alcool dénaturé ni BHA forts.",
              },
              {
                t: "Le laboratoire",
                d: "Formulée dans un laboratoire certifié ISO 22716 et ECOCERT, en Union européenne (Riga, Lettonie).",
              },
              {
                t: "Les contrôles",
                d: "Conformité cosmétique européenne, notification CPNP en cours d'enregistrement.",
              },
              {
                t: "Chez toi",
                d: "Édition fondatrice de 200 flacons, expédition sous 5 à 7 jours ouvrés (Mondial Relay), garantie 30 jours.",
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

      {/* 9 — COMPARAISON (vs sérum « peau grasse » classique) */}
      <section className="border-b border-line">
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

      {/* 10 — PREMIÈRES TESTEUSES */}
      <TestersWall limit={5} carousel className="border-b border-line bg-cream" />

      {/* 11 — GARANTIE 30 JOURS */}
      <section className="border-b border-line">
        <Container className="py-16 md:py-20">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 rounded-2xl border border-sage/30 bg-sage/[0.05] p-8 text-center md:p-10">
            <ShieldCheck size={32} weight="light" className="text-sage" />
            <h2 className="text-balance font-serif text-2xl md:text-3xl">
              Trente jours pour tester. Sans aucun risque.
            </h2>
            <p className="max-w-md leading-relaxed text-stone">
              Si naeul ne te convient pas, on te rembourse intégralement — même flacon entamé. Tu
              n&apos;as rien à prouver, rien à renvoyer en parfait état. Tu nous écris, on rembourse.
            </p>
            <p className="mt-1 text-xs text-stone/70">
              Garantie 30 jours à compter de la réception. Remboursement intégral, frais d&apos;envoi
              inclus.
            </p>
          </div>
        </Container>
      </section>

      {/* TEASER — Le Cercle (suivi) */}
      <section className="border-b border-line bg-ink text-cream">
        <Container className="flex flex-col items-center gap-4 py-14 text-center md:py-16">
          <p className="text-[0.7rem] uppercase tracking-[0.25em] text-cream/60">Le Cercle</p>
          <h2 className="max-w-xl text-balance font-serif text-2xl text-cream md:text-3xl">
            Et si quelqu&apos;un s&apos;occupait de ta peau grasse avec toi ?
          </h2>
          <p className="max-w-md leading-relaxed text-cream/75">
            Une experte à ton écoute, un suivi photo, -15 % toute l&apos;année. Le sérum n&apos;est
            que le début.
          </p>
          <Link
            href="/cercle"
            className={buttonClasses({ size: "lg", className: "mt-2 bg-cream text-ink hover:bg-sand" })}
          >
            Découvrir Le Cercle
          </Link>
        </Container>
      </section>

      {/* 12 — FAQ PRODUIT */}
      <section className="border-b border-line bg-cream">
        <Container className="py-16 md:py-24">
          <SectionHeading eyebrow="Questions fréquentes" title="Avant le lancement" />
          <FaqAccordion items={product.faq} className="mt-10 max-w-2xl" />
        </Container>
      </section>

      {/* CTA FINAL */}
      <section id="precommande" className="scroll-mt-20 bg-cream">
        <Container className="flex flex-col items-center gap-6 py-20 text-center md:py-24">
          {PREORDER_ENABLED ? (
            <>
              <h2 className="max-w-xl text-balance text-3xl md:text-4xl">
                Rejoins les fondatrices de naeul.
              </h2>
              <p className="max-w-md leading-relaxed text-stone">
                -15% sur l&apos;Édition fondatrice, livraison offerte, garantie 30 jours. Expédition
                prévue {SHIPPING_DATE}.
              </p>
              <Link href="#acheter" className={buttonClasses({ size: "lg" })}>
                Précommander (-15%)
              </Link>
              <p className="text-sm text-stone">
                Encore un doute ?{" "}
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
                Rejoins la liste d&apos;avant-première : tu reçois ton code -15% et tu es au courant
                dès l&apos;ouverture des précommandes.
              </p>
              <WaitlistForm source="produit_bas" className="w-full max-w-md" />
              <p className="text-xs uppercase tracking-[0.15em] text-stone/70">
                Inscriptions en cours · Lancement août 2026
              </p>
            </>
          )}
        </Container>
      </section>

      {/* CTA sticky mobile */}
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
