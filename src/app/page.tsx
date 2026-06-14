import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import Image from "next/image";
import { HeroSlideshow } from "@/components/home/hero-slideshow";
import {
  Sparkle,
  Drop,
  Leaf,
  ArrowRight,
  Star,
  Tag,
  Package,
  ShieldCheck,
  Check,
} from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui/container";
import { WaitlistForm } from "@/components/waitlist-form";
import { buttonClasses } from "@/components/ui/button";
import { TrustStrip } from "@/components/trust-strip";
import { SkinSelector } from "@/components/home/skin-selector";
import { WaitlistCount } from "@/components/waitlist-count";
import { Reviews } from "@/components/reviews";
import { HERO_PRODUCT } from "@/lib/products";
import { PREORDER_ENABLED, foundersPrice } from "@/lib/preorder";
import { formatPrice } from "@/lib/utils";

const PILLARS = [
  {
    icon: Drop,
    title: "K-beauty",
    text: "On équilibre la peau grasse sans l'agresser : pas d'alcool dénaturé, pas de BHA forts.",
  },
  {
    icon: Sparkle,
    title: "La peau grasse, spécifiquement",
    text: "Pensée pour les peaux grasses, mixtes et à pores visibles — on connaît la tienne.",
  },
  {
    icon: Leaf,
    title: "Clean & vegan",
    text: "Certifiée ECOCERT et ISO 22716. Vegan, sans parfum, sans gluten.",
  },
];

const TRUST_BADGES = ["Sans parfum", "Vegan ECOCERT", "Livraison 48-72h", "Satisfait remboursé 30j"];

const FOUNDERS = [
  {
    icon: Star,
    title: "Accès prioritaire",
    text: "Tu es prévenue et servie avant tout le monde, dès l'ouverture.",
  },
  {
    icon: Tag,
    title: "-15% sur ta 1ʳᵉ commande",
    text: "La remise Édition Fondatrices, appliquée automatiquement.",
  },
  {
    icon: Package,
    title: "Édition limitée",
    text: "Seulement 200 flacons pour le tout premier lot.",
  },
];

export default function Home() {
  // Les sections lifestyle n'apparaissent que si l'image existe dans public/images.
  const hasImage = (name: string) => fs.existsSync(path.join(process.cwd(), "public/images", name));
  const hasDuo = hasImage("naeul-application.jpg");
  const hasPortrait = hasImage("naeul-texture-macro.jpg");

  return (
    <>
      {/* HERO — split-screen */}
      <section className="grid items-stretch md:min-h-[calc(100dvh-4rem)] md:grid-cols-2">
        {/* Image — diaporama crossfade */}
        <div className="relative h-60 w-full overflow-hidden bg-rose/20 sm:h-80 md:h-auto">
          <HeroSlideshow />
        </div>

        {/* Contenu */}
        <div className="flex items-center bg-sand px-6 py-9 md:px-12 md:py-14">
          <div className="mx-auto w-full max-w-[480px] animate-fade-up [animation-delay:150ms]">
            <p className="text-[0.7rem] uppercase tracking-[0.2em] text-stone">
              {PREORDER_ENABLED ? "K-beauty · Édition Fondatrices" : "K-beauty · Avant-première"}
            </p>
            <h1 className="mt-5 text-balance font-serif text-[1.75rem] font-normal italic leading-tight text-ink md:text-[2.5rem]">
              K-beauty pour peau grasse, sans agresser.
            </h1>

            {PREORDER_ENABLED ? (
              <>
                <p className="mt-5 text-sm leading-relaxed text-ink md:text-[0.95rem]">
                  L&apos;Édition Fondatrices est ouverte : <strong className="font-medium">-15%</strong>,
                  livraison offerte et garantie 30 jours. Premier lot limité à 200 flacons.
                </p>
                <Link
                  href="/le-produit#acheter"
                  className={buttonClasses({ size: "lg", className: "mt-6 w-full sm:w-auto" })}
                >
                  Précommander (-15%)
                  <ArrowRight size={18} />
                </Link>
                <p className="mt-3 text-xs text-stone">
                  Pas encore prête ?{" "}
                  <Link href="#precommande" className="text-sage underline underline-offset-4">
                    Rejoins la liste d&apos;avant-première
                  </Link>
                </p>
              </>
            ) : (
              <>
                <p className="mt-5 text-sm leading-relaxed text-ink md:text-[0.95rem]">
                  Notre premier sérum arrive bientôt. Inscris-toi pour être prévenue en
                  avant-première et recevoir <strong className="font-medium">-15%</strong> sur ta
                  première commande.
                </p>
                <WaitlistForm className="mt-6" />
              </>
            )}

            {/* Trust badges 2x2 */}
            <ul className="mt-7 grid grid-cols-2 gap-x-4 gap-y-2.5">
              {TRUST_BADGES.map((t) => (
                <li key={t} className="flex items-center gap-2 text-[0.7rem] text-stone">
                  <Check size={14} weight="bold" className="shrink-0 text-sage" />
                  {t}
                </li>
              ))}
            </ul>

            <WaitlistCount className="mt-7 justify-start" />
          </div>
        </div>
      </section>

      {/* POURQUOI NAEUL — Mission Section */}
      <section className="border-y border-line bg-cream">
        <Container className="py-16 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-stone">Pourquoi naeul</p>
            <p className="mt-6 text-balance font-serif text-2xl leading-snug text-ink md:text-[2rem]">
              Une marque qui ne cherche pas à plaire à toutes les peaux. Une seule&nbsp;: la peau
              grasse — qu&apos;on équilibre en douceur, jamais en agressant.
            </p>
          </div>
          {/* 3 raisons — swipe sur mobile, grille sur desktop */}
          <div className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 scrollbar-hide sm:mx-auto sm:mt-12 sm:grid sm:max-w-4xl sm:grid-cols-3 sm:gap-8 sm:overflow-visible">
            {PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className="min-w-[80%] shrink-0 snap-start text-center sm:min-w-0"
              >
                <span className="mx-auto inline-flex h-11 w-11 items-center justify-center rounded-xl bg-sage/10 text-sage">
                  <pillar.icon size={22} />
                </span>
                <h3 className="mt-4 text-base">{pillar.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-stone">{pillar.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* LES 200 PREMIÈRES (Édition Fondatrices) — bande sombre compacte */}
      <section className="bg-ink text-cream">
        <Container className="py-14 md:py-16">
          <div className="grid gap-10 md:grid-cols-[1fr_1.5fr] md:items-center md:gap-16">
            <div>
              <p className="text-[0.7rem] uppercase tracking-[0.25em] text-cream/60">
                Édition Fondatrices
              </p>
              <h2 className="mt-2 font-serif text-3xl text-cream md:text-4xl">Les 200 premières</h2>
              <p className="mt-3 text-sm leading-relaxed text-cream/75">
                Le tout premier lot est limité à 200 flacons. Rejoins les fondatrices qui vivent
                le lancement en avant-première.
              </p>
            </div>
            <ul className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-1 scrollbar-hide sm:grid sm:grid-cols-3 sm:gap-7 sm:overflow-visible">
              {FOUNDERS.map((f) => (
                <li
                  key={f.title}
                  className="min-w-[72%] shrink-0 snap-start border-l border-cream/15 pl-4 sm:min-w-0 sm:border-l-0 sm:pl-0"
                >
                  <f.icon size={22} className="text-terracotta" />
                  <p className="mt-3 font-medium text-cream">{f.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-cream/65">{f.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* LE PRODUIT QUI ARRIVE */}
      <section>
        <Container className="py-20 md:py-28">
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
            <Link
              href="/le-produit"
              aria-label="Voir le produit"
              className="group block overflow-hidden rounded-2xl bg-rose/30"
            >
              <Image
                src={HERO_PRODUCT.photos[0].src}
                alt={HERO_PRODUCT.photos[0].alt}
                width={1100}
                height={1400}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </Link>
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-stone">Le produit qui arrive</p>
              <h2 className="mt-3 text-3xl md:text-4xl">{HERO_PRODUCT.name}</h2>
              <p className="mt-4 leading-relaxed text-stone">{HERO_PRODUCT.shortDescription}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {HERO_PRODUCT.actives.slice(0, 4).map((a) => (
                  <li
                    key={a.name}
                    className="rounded-full border border-line bg-cream px-3 py-1 text-xs text-stone"
                  >
                    {a.name}
                  </li>
                ))}
                <li className="rounded-full border border-line bg-cream px-3 py-1 text-xs text-stone">
                  +2 actifs
                </li>
              </ul>
              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
                <Link
                  href={PREORDER_ENABLED ? "/le-produit#acheter" : "/le-produit"}
                  className={buttonClasses({ size: "lg" })}
                >
                  {PREORDER_ENABLED ? "Précommander (-15%)" : "En savoir plus"}
                  <ArrowRight size={18} />
                </Link>
                <span className="text-sm text-stone">
                  {PREORDER_ENABLED ? (
                    <>
                      Édition Fondatrices · dès{" "}
                      {formatPrice(foundersPrice(HERO_PRODUCT.variants[0].price))}
                    </>
                  ) : (
                    <>À partir de {formatPrice(HERO_PRODUCT.variants[0].price)}</>
                  )}
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* TA PEAU, NOTRE RÉPONSE (module interactif) */}
      <SkinSelector />

      {/* PREUVES DE CONFIANCE */}
      <TrustStrip />

      {/* POUR TOUTES LES PEAUX GRASSES (communauté duo) */}
      {hasDuo && (
        <section>
          <Container className="py-20 md:py-28">
            <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
              <figure className="order-2 overflow-hidden rounded-2xl md:order-1">
                <Image
                  src="/images/naeul-application.jpg"
                  alt="Application du sérum naeul pour peau grasse sur peau mixte lumineuse"
                  width={1122}
                  height={1402}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="aspect-[4/5] h-full w-full object-cover"
                />
              </figure>
              <div className="order-1 md:order-2">
                <p className="text-xs uppercase tracking-[0.25em] text-stone">
                  Pour toutes les peaux grasses
                </p>
                <h2 className="mt-3 text-3xl md:text-4xl">Tu peux t&apos;y reconnaître.</h2>
                <p className="mt-5 leading-relaxed text-stone">
                  La peau grasse n&apos;a pas un seul visage. naeul s&apos;adresse à toutes celles
                  qui brillent en milieu de journée — quels que soient ton teint, ton âge ou ton
                  histoire. Une marque, une seule peau : la tienne.
                </p>
                <Link href="/#precommande" className={buttonClasses({ size: "lg", className: "mt-8" })}>
                  Je veux être prévenue (-15%)
                </Link>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* NOTRE APPROCHE K-BEAUTY (portrait éditorial) */}
      {hasPortrait && (
        <section className="border-y border-line bg-cream">
          <Container className="py-20 md:py-28">
            <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
              <figure className="order-2 overflow-hidden rounded-2xl">
                <Image
                  src="/images/naeul-texture-macro.jpg"
                  alt="Texture légère et non grasse du sérum naeul à la niacinamide pour peau grasse"
                  width={1254}
                  height={1254}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="aspect-square h-full w-full object-cover"
                />
              </figure>
              <div className="order-1">
                <p className="text-xs uppercase tracking-[0.25em] text-stone">Notre approche K-beauty</p>
                <h2 className="mt-3 text-3xl md:text-4xl">Équilibrer, pas agresser.</h2>
                <p className="mt-5 leading-relaxed text-stone">
                  La douceur d&apos;abord. On régule le sébum et on resserre l&apos;apparence des
                  pores avec des actifs justes — niacinamide, AHA doux, Centella — au lieu de
                  décaper la peau. Le résultat se construit semaine après semaine.
                </p>
                <Link
                  href="/le-produit"
                  className={buttonClasses({ variant: "secondary", size: "lg", className: "mt-8" })}
                >
                  En savoir plus
                </Link>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* NOTRE HISTOIRE */}
      <section className="border-y border-line bg-cream">
        <Container className="py-20 text-center md:py-28">
          <div className="mx-auto max-w-2xl">
            <p className="text-xs uppercase tracking-[0.25em] text-stone">Notre histoire</p>
            <p className="mt-6 text-balance font-serif text-2xl leading-relaxed text-ink md:text-3xl">
              « Naeul » signifie « devenir meilleure » en coréen. Une marque pensée pour
              accompagner ta peau, pas pour la juger.
            </p>
            <p className="mt-6 leading-relaxed text-stone">
              On construit naeul pas à pas, avec exigence et transparence. Les premières
              inscrites seront aux premières loges — et les premières servies.
            </p>
          </div>
        </Container>
      </section>

      {/* AVIS */}
      <Reviews />

      {/* GARANTIE 30 JOURS */}
      <section className="border-t border-line">
        <Container className="py-16 md:py-20">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 rounded-2xl border border-line bg-cream p-8 text-center md:p-10">
            <ShieldCheck size={32} weight="light" className="text-sage" />
            <h2 className="text-2xl md:text-3xl">30 jours pour tester. Sans risque.</h2>
            <p className="max-w-md leading-relaxed text-stone">
              Si naeul ne te convient pas, on te rembourse intégralement — même flacon entamé. Notre
              seul critère : ta satisfaction.
            </p>
          </div>
        </Container>
      </section>

      {/* CAPTURE FINALE — Cinematic CTA */}
      <section id="precommande" className="relative scroll-mt-20 overflow-hidden">
        <Image
          src="/images/naeul-produit-bois.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-ink/75" />
        <Container className="relative flex flex-col items-center gap-6 py-24 text-center md:py-32">
          {PREORDER_ENABLED ? (
            <>
              <h2 className="max-w-2xl text-balance font-serif text-3xl text-cream md:text-5xl">
                Rejoins les fondatrices de naeul.
              </h2>
              <p className="max-w-md leading-relaxed text-cream/80">
                -15%, livraison offerte, garantie 30 jours. Premier lot limité à 200 flacons.
              </p>
              <Link href="/le-produit#acheter" className={buttonClasses({ size: "lg", className: "mt-2" })}>
                Précommander (-15%)
                <ArrowRight size={18} />
              </Link>
            </>
          ) : (
            <>
              <h2 className="max-w-2xl text-balance font-serif text-3xl text-cream md:text-5xl">
                Sois prévenue en avant-première.
              </h2>
              <p className="max-w-md leading-relaxed text-cream/80">
                Rejoins la liste : tu reçois ton code -15% et tu es la première informée du
                lancement.
              </p>
              <WaitlistForm tone="onAccent" className="w-full max-w-md" />
            </>
          )}
        </Container>
      </section>
    </>
  );
}
