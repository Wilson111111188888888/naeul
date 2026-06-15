import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import Image from "next/image";
import heroLifestyle from "../../public/images/naeul-hero.jpg";
import {
  Sparkle,
  Drop,
  Aperture,
  ArrowRight,
  Tag,
  Package,
  PenNib,
  UsersThree,
  Gift,
  ShieldCheck,
  Check,
  X,
} from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui/container";
import { WaitlistForm } from "@/components/waitlist-form";
import { buttonClasses } from "@/components/ui/button";
import { TrustStrip } from "@/components/trust-strip";
import { SkinSelector } from "@/components/home/skin-selector";
import { SwipeCarousel } from "@/components/swipe-carousel";
import { Marquee } from "@/components/marquee";
import { LifestyleGrid } from "@/components/lifestyle-grid";
import { WaitlistCount } from "@/components/waitlist-count";
import { StickyCta } from "@/components/sticky-cta";
import { ReassuranceRow } from "@/components/reassurance-row";
import { Reviews } from "@/components/reviews";
import { HERO_PRODUCT } from "@/lib/products";
import { PREORDER_ENABLED, foundersPrice } from "@/lib/preorder";
import { formatPrice } from "@/lib/utils";

const PILLARS = [
  {
    icon: Drop,
    title: "Le meilleur des deux mondes",
    text: "La douceur de la K-beauty, adaptée à la peau d'ici : pas d'alcool dénaturé, pas de BHA forts, rien d'introuvable.",
  },
  {
    icon: Sparkle,
    title: "Une seule peau, une seule expertise",
    text: "On ne cherche pas à plaire à toutes les peaux. Une seule cible : la peau grasse, mixte à grasse et grasse sensible.",
  },
  {
    icon: ShieldCheck,
    title: "Transparence française",
    text: "Certifié ECOCERT et ISO 22716, liste complète des actifs, SAV en français, livraison 48-72h. Tu sais ce que tu mets.",
  },
];

const TRUST_BADGES = ["Sans parfum", "Vegan ECOCERT", "Livraison 48-72h", "Satisfait remboursé 30j"];

// Ruban de perks de l'Édition Fondatrices (défilement premium).
const FOUNDERS_PERKS = [
  "Accès prioritaire",
  "-15 % sur ta 1ʳᵉ commande",
  "Édition limitée · 200 flacons",
  "Livraison offerte",
  "Garantie 30 jours",
  "Servi·es en priorité",
];

// Bande typographique de marque (grand défilement, en transition vers le CTA final).
const BRAND_WORDS = ["naeul", "나을", "K-beauty pour peau grasse", "sans agresser"];

// Bénéfices en langage clair (placés tôt, plus parlants que les noms d'actifs).
const BENEFITS = [
  { Icon: Drop, t: "Moins de brillances" },
  { Icon: Aperture, t: "Pores resserrés" },
  { Icon: Sparkle, t: "Peau plus nette" },
];

// Comparatif naeul vs K-beauty importée (différenciation). rival: true=oui, false=non, string=nuance.
const COMPARISON: { label: string; rival: boolean | string }[] = [
  { label: "Spécialiste de la peau grasse", rival: "Tout type" },
  { label: "Pensé pour la peau d'ici", rival: "Peau asiatique" },
  { label: "Approche K-beauty douce", rival: true },
  { label: "SAV en français", rival: false },
  { label: "Garantie 30 jours satisfait ou remboursé", rival: false },
  { label: "Livraison 48-72h", rival: "2-3 semaines" },
  { label: "Certifié ECOCERT · ISO 22716", rival: "Variable" },
];

// Notre méthode — 4 étapes (autorité). Aligné sur ce qui est déjà affirmé sur le site.
const METHOD = [
  {
    t: "Actifs ciblés",
    d: "Six actifs K-beauty choisis pour la peau grasse : niacinamide, acide lactique, Centella, acide hyaluronique.",
  },
  {
    t: "Formulation douce",
    d: "Sans alcool dénaturé, sans BHA forts, sans parfum. On régule le sébum sans faire tirailler la peau.",
  },
  {
    t: "Fabrication certifiée",
    d: "Laboratoire certifié ECOCERT et ISO 22716, dans l'Union européenne. Conformité cosmétique européenne.",
  },
];

// Les 200 Fondateur·rices — promesses réelles (l'utilisateur s'engage à les tenir).
const FOUNDERS_PROMISES = [
  {
    icon: Package,
    title: "Ton flacon numéroté à la main",
    text: "De 001 à 200. Une seule fois dans l'histoire de naeul — le tien porte ton numéro.",
  },
  {
    icon: PenNib,
    title: "Une carte signée, avec ton prénom",
    text: "Un vrai mot écrit à la main, pas un message générique. Pour toi.",
  },
  {
    icon: Tag,
    title: "-15% sur ta première commande",
    text: "Code envoyé par email le jour du lancement, valable sur le premier lot.",
  },
  {
    icon: UsersThree,
    title: "Le Cercle des Fondateur·rices",
    text: "Un groupe privé où tu co-construis le prochain soin : textures, votes, avant-premières.",
  },
  {
    icon: Gift,
    title: "Le prochain soin en mini-format, offert",
    text: "Six mois après ton flacon, tu testes le produit 2 avant tout le monde.",
  },
];

export default function Home() {
  // Les sections lifestyle n'apparaissent que si l'image existe dans public/images.
  const hasImage = (name: string) => fs.existsSync(path.join(process.cwd(), "public/images", name));
  const hasPortrait = hasImage("naeul-texture-macro.jpg");
  const hasLifestyleGrid = hasImage("naeul-lifestyle-1.jpg");
  const hasResultats = hasImage("naeul-resultats-8sem.jpg");
  const hasCouple = hasImage("naeul-rituel-couple.jpg");

  return (
    <>
      {/* HERO — plein écran cinématique */}
      <section className="relative flex min-h-[80svh] items-end overflow-hidden sm:min-h-[calc(100dvh-4rem)] sm:items-center">
        <Image
          src={heroLifestyle}
          alt="Sérum K-beauty naeul tenu en main dans une lumière dorée"
          fill
          priority
          quality={90}
          placeholder="blur"
          sizes="100vw"
          className="animate-kenburns object-cover object-center"
        />
        {/* Voile dégradé pour la lisibilité (bas sur mobile, gauche sur desktop) */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/40 to-ink/5 sm:bg-gradient-to-r sm:from-ink/80 sm:via-ink/35 sm:to-transparent" />

        <Container className="relative w-full py-12 md:py-20">
          <div className="max-w-xl animate-fade-up [animation-delay:120ms]">
            <p className="text-[0.7rem] uppercase tracking-[0.2em] text-cream/70">
              {PREORDER_ENABLED
                ? "K-beauty française · Édition Fondatrices"
                : "K-beauty française · Avant-première"}
            </p>
            <h1 className="mt-4 text-balance font-serif text-3xl font-normal italic leading-tight text-cream md:text-5xl">
              Moins de brillances. Pores affinés. Sans assécher.
            </h1>

            {PREORDER_ENABLED ? (
              <>
                <p className="mt-5 max-w-md leading-relaxed text-cream/85">
                  L&apos;Édition Fondatrices est ouverte : <strong className="font-medium text-cream">-15%</strong>,
                  livraison offerte et garantie 30 jours. Premier lot limité à 200 flacons.
                </p>
                <Link
                  href="/le-produit#acheter"
                  className={buttonClasses({ size: "lg", className: "mt-6 w-full sm:w-auto" })}
                >
                  Précommander (-15%)
                  <ArrowRight size={18} />
                </Link>
                <p className="mt-3 text-xs text-cream/70">
                  Pas encore décidé·e ?{" "}
                  <Link href="#precommande" className="text-cream underline underline-offset-4">
                    Rejoins la liste d&apos;avant-première
                  </Link>
                </p>
              </>
            ) : (
              <>
                <p className="mt-5 max-w-md leading-relaxed text-cream/85">
                  Notre premier sérum arrive bientôt. Inscris-toi pour être prévenu·e en
                  avant-première et recevoir <strong className="font-medium text-cream">-15%</strong>{" "}
                  sur ta première commande.
                </p>
                <WaitlistForm tone="onAccent" source="hero" className="mt-6 max-w-md" />
              </>
            )}

            {/* Trust badges */}
            <ul className="mt-7 grid max-w-md grid-cols-2 gap-x-4 gap-y-2.5">
              {TRUST_BADGES.map((t) => (
                <li key={t} className="flex items-center gap-2 text-[0.7rem] text-cream/80">
                  <Check size={14} weight="bold" className="shrink-0 text-cream" />
                  {t}
                </li>
              ))}
            </ul>

            <WaitlistCount tone="onDark" className="mt-7 justify-start" />
          </div>
        </Container>
      </section>

      {/* BÉNÉFICES — en clair, tout de suite */}
      <section className="border-b border-line bg-cream">
        <Container className="py-10 md:py-12">
          <ul className="grid grid-cols-3 gap-3 text-center sm:gap-8">
            {BENEFITS.map((b) => (
              <li key={b.t} className="flex flex-col items-center">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sage/10 text-sage">
                  <b.Icon size={20} />
                </span>
                <p className="mt-3 text-sm font-medium text-ink md:text-base">{b.t}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* POURQUOI NAEUL — Mission Section */}
      <section className="border-y border-line bg-cream">
        <Container className="py-16 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-stone">Notre conviction</p>
            <p className="mt-6 text-balance font-serif text-2xl leading-snug text-ink md:text-[2rem]">
              Les peaux grasses n&apos;ont pas besoin d&apos;être décapées. Elles ont besoin
              d&apos;être comprises.
            </p>
            <p className="mx-auto mt-5 max-w-xl leading-relaxed text-stone">
              On a appris aux peaux grasses à se combattre — à coups d&apos;alcool, d&apos;acides
              forts et de matifiants qui dessèchent et relancent le sébum. Nous, on travaille
              <em> avec</em> ta peau, pas contre elle.
            </p>
          </div>
          {/* 3 raisons — swipe + points sur mobile, grille sur desktop */}
          <SwipeCarousel className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 scrollbar-hide sm:mx-auto sm:mt-12 sm:grid sm:max-w-4xl sm:grid-cols-3 sm:gap-8 sm:overflow-visible">
            {PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className="w-full shrink-0 snap-center text-center sm:w-auto"
              >
                <span className="mx-auto inline-flex h-11 w-11 items-center justify-center rounded-xl bg-sage/10 text-sage">
                  <pillar.icon size={22} />
                </span>
                <h3 className="mt-4 text-base">{pillar.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-stone">{pillar.text}</p>
              </div>
            ))}
          </SwipeCarousel>
        </Container>
      </section>

      {/* LES 200 PREMIÈRES (Édition Fondatrices) — bande sombre compacte */}
      <section className="bg-ink text-cream">
        {/* Ruban premium des avantages fondatrices */}
        <Marquee
          items={FOUNDERS_PERKS}
          duration={40}
          className="border-b border-cream/10 py-3.5"
          itemClassName="font-serif text-base italic text-cream/85 tracking-wide"
        />
        <Container className="py-14 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[0.7rem] uppercase tracking-[0.25em] text-cream/60">Édition limitée</p>
            <h2 className="mt-2 font-serif text-3xl text-cream md:text-5xl">Les 200 Fondateur·rices</h2>
            <p className="mt-4 leading-relaxed text-cream/75">
              Le tout premier lot de naeul n&apos;existera qu&apos;une fois. 200 flacons, 200
              personnes, un lancement qu&apos;on vit ensemble.
            </p>
          </div>

          <ol className="mx-auto mt-12 grid max-w-3xl gap-x-10 gap-y-8 sm:grid-cols-2">
            {FOUNDERS_PROMISES.map((p) => (
              <li key={p.title} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cream/10 text-terracotta">
                  <p.icon size={20} />
                </span>
                <div>
                  <h3 className="text-base font-medium text-cream">{p.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-cream/65">{p.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-12 flex flex-col items-center text-center">
            <Link
              href="/#precommande"
              className={buttonClasses({ size: "lg", className: "bg-cream text-ink hover:bg-sand" })}
            >
              Je rejoins les 200
              <ArrowRight size={18} />
            </Link>
            <p className="mt-3 max-w-sm text-xs leading-relaxed text-cream/60">
              Inscription gratuite, sans engagement d&apos;achat. Tu reçois ton numéro de réservation
              par email.
            </p>
          </div>
        </Container>
      </section>

      {/* LE PRODUIT QUI ARRIVE */}
      <section>
        <Container className="py-16 md:py-20">
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

      {/* NOTRE APPROCHE K-BEAUTY (portrait éditorial) */}
      {hasPortrait && (
        <section className="border-y border-line bg-cream">
          <Container className="py-16 md:py-20">
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

      {/* AU QUOTIDIEN (couple) — imagerie lifestyle neutre, pas de fondateurs */}
      {hasCouple && (
        <section className="border-t border-line">
          <Container className="py-16 md:py-20">
            <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-stone">Au quotidien</p>
                <h2 className="mt-3 text-3xl md:text-4xl">Un geste simple, à intégrer à ta routine.</h2>
                <p className="mt-5 leading-relaxed text-stone">
                  Quelques gouttes le matin et/ou le soir, sur peau propre, avant ta crème. Pas de
                  routine compliquée — un seul sérum, pensé pour réguler le sébum sans agresser.
                </p>
                <Link
                  href="/le-produit"
                  className={buttonClasses({ variant: "secondary", size: "lg", className: "mt-8" })}
                >
                  Voir comment l&apos;utiliser
                </Link>
              </div>
              <figure className="overflow-hidden rounded-2xl">
                <Image
                  src="/images/naeul-rituel-couple.jpg"
                  alt="Le sérum naeul intégré à une routine du quotidien, dans la salle de bain"
                  width={1086}
                  height={1448}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="aspect-[3/4] h-full w-full object-cover"
                />
              </figure>
            </div>
          </Container>
        </section>
      )}

      {/* TOUTES LES CARNATIONS (grille lifestyle) — imagerie neutre, pas d'avis */}
      {hasLifestyleGrid && (
        <section className="border-t border-line">
          <Container className="py-16 md:py-24">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs uppercase tracking-[0.25em] text-stone">
                Pour toutes les peaux grasses
              </p>
              <h2 className="mt-3 text-3xl md:text-4xl">La peau grasse, sous toutes ses carnations</h2>
              <p className="mt-4 leading-relaxed text-stone">
                La peau grasse n&apos;a pas un seul visage. Un même geste pour réguler le sébum sans
                agresser — quels que soient ton teint, ton âge, ton genre ou ton histoire. Une
                marque, une seule peau : la tienne.
              </p>
            </div>
            <LifestyleGrid className="mx-auto mt-10 max-w-2xl" />
            <div className="mt-10 text-center">
              <Link href="/#precommande" className={buttonClasses({ size: "lg" })}>
                Je rejoins la liste (-15%)
              </Link>
            </div>
          </Container>
        </section>
      )}

      {/* NOTRE MÉTHODE — 4 étapes numérotées (autorité) */}
      <section className="border-t border-line">
        <Container className="py-16 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-stone">Notre méthode</p>
            <h2 className="mt-3 text-3xl md:text-4xl">Trois exigences, une formule</h2>
          </div>
          <SwipeCarousel
            as="ol"
            className="mt-10 flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto pb-2 scrollbar-hide sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible"
          >
            {METHOD.map((step, i) => (
              <li
                key={step.t}
                className="flex w-full shrink-0 snap-center flex-col rounded-2xl border border-line bg-cream p-6 sm:w-auto"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-sage font-serif text-sm text-sage">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-base">{step.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-stone">{step.d}</p>
              </li>
            ))}
          </SwipeCarousel>
        </Container>
      </section>

      {/* COMPARATIF — naeul vs K-beauty importée (différenciation) */}
      <section className="border-t border-line bg-cream">
        <Container className="py-16 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-stone">La différence</p>
            <h2 className="mt-3 text-3xl md:text-4xl">naeul vs K-beauty importée</h2>
          </div>
          <div className="mx-auto mt-10 max-w-2xl overflow-hidden rounded-2xl border border-line bg-sand">
            <div className="grid grid-cols-[1.6fr_1fr_1fr] border-b border-line text-[0.65rem] font-semibold uppercase tracking-wide">
              <span className="px-4 py-3" />
              <span className="px-2 py-3 text-center text-sage">naeul</span>
              <span className="px-2 py-3 text-center text-stone">K-beauty importée</span>
            </div>
            <ul className="divide-y divide-line">
              {COMPARISON.map((row) => (
                <li key={row.label} className="grid grid-cols-[1.6fr_1fr_1fr] items-center">
                  <span className="px-4 py-3 text-sm leading-snug text-ink">{row.label}</span>
                  <span className="flex justify-center px-2 py-3">
                    <Check size={18} weight="bold" className="text-sage" />
                  </span>
                  <span className="px-2 py-3 text-center text-xs leading-snug text-stone">
                    {row.rival === true ? (
                      <Check size={16} className="mx-auto text-stone/50" />
                    ) : row.rival === false ? (
                      <X size={16} className="mx-auto text-stone/40" />
                    ) : (
                      row.rival
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <p className="mx-auto mt-5 max-w-2xl text-center text-xs text-stone/80">
            On ne nomme personne : on cadre simplement le choix. Pour une peau normale ou sèche, une
            K-beauty généraliste reste un très bon choix.
          </p>
        </Container>
      </section>

      {/* RÉSULTATS — avant/après 8 semaines (image composée, telle quelle) */}
      {hasResultats && (
        <section className="border-t border-line">
          <Container className="py-16 md:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs uppercase tracking-[0.25em] text-stone">Résultats</p>
              <h2 className="mt-3 text-3xl md:text-4xl">Avant / après, 8 semaines</h2>
            </div>
            <figure className="mx-auto mt-8 max-w-3xl overflow-hidden rounded-2xl border border-line">
              <Image
                src="/images/naeul-resultats-8sem.jpg"
                alt="Avant / après 8 semaines avec le sérum naeul : grain de peau plus net, moins de brillances"
                width={1536}
                height={1024}
                sizes="(max-width: 768px) 100vw, 768px"
                className="w-full"
              />
            </figure>
            <p className="mx-auto mt-4 max-w-2xl text-center text-xs leading-relaxed text-stone/80">
              Résultats observés après 8 semaines d&apos;utilisation. Résultats individuels, non
              garantis.
            </p>
          </Container>
        </section>
      )}

      {/* NOTRE HISTOIRE */}
      <section className="border-y border-line bg-cream">
        <Container className="py-16 text-center md:py-20">
          <div className="mx-auto max-w-2xl">
            <p className="text-xs uppercase tracking-[0.25em] text-stone">Notre histoire</p>
            <p className="mt-6 text-balance font-serif text-2xl leading-relaxed text-ink md:text-3xl">
              naeul, créé par un couple qui galérait avec la peau grasse.
            </p>
            <p className="mt-6 leading-relaxed text-stone">
              Les classiques de pharmacie décapaient. Les « bio » ne donnaient rien. Les K-beauty
              importées étaient excellentes — mais pensées pour la peau asiatique, sans SAV français.
              Personne ne faisait spécifiquement la peau grasse, en français, avec une vraie approche
              douce. Alors on l&apos;a fait.
            </p>
            <Link
              href="/a-propos"
              className={buttonClasses({ variant: "secondary", size: "lg", className: "mt-8" })}
            >
              Notre histoire complète
              <ArrowRight size={18} />
            </Link>
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

      {/* BANDE DE MARQUE — défilement typographique premium */}
      <Marquee
        items={BRAND_WORDS}
        duration={52}
        reverse
        className="border-y border-line py-6 md:py-8"
        itemClassName="font-serif text-lg italic text-ink/90 md:text-2xl"
        separatorClassName="text-sm md:text-base text-terracotta/70"
      />

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
                Sois prévenu·e en avant-première.
              </h2>
              <p className="max-w-md leading-relaxed text-cream/80">
                Rejoins la liste : tu reçois ton code -15% et tu es la première informée du
                lancement.
              </p>
              <WaitlistForm tone="onAccent" source="home_cta" className="w-full max-w-md" />
              <ReassuranceRow tone="onAccent" className="mt-2 max-w-md" />
            </>
          )}
        </Container>
      </section>

      {/* CTA sticky mobile — se révèle au scroll, s'efface près du bas */}
      <StickyCta
        href={PREORDER_ENABLED ? "/le-produit#acheter" : "#precommande"}
        label={PREORDER_ENABLED ? "Précommander (-15%)" : "Je rejoins la liste (-15%)"}
        event={PREORDER_ENABLED ? "sticky_preorder_click" : "sticky_waitlist_click"}
      />
    </>
  );
}
