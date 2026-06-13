import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkle,
  Drop,
  Leaf,
  ArrowRight,
  Star,
  Tag,
  Package,
  ShieldCheck,
} from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui/container";
import { Wordmark } from "@/components/wordmark";
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
    text: "Une marque qui ne cherche pas à plaire à toutes les peaux. Une seule, la tienne.",
  },
  {
    icon: Leaf,
    title: "Clean & vegan",
    text: "Certifiée ECOCERT et ISO 22716. Vegan, sans parfum, sans gluten.",
  },
];

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
    text: "Seulement 200 flacons pour le tout premier batch.",
  },
];

export default function Home() {
  // Les sections lifestyle n'apparaissent que si l'image existe dans public/images.
  const hasImage = (name: string) => fs.existsSync(path.join(process.cwd(), "public/images", name));
  const hasDuo = hasImage("naeul-application.jpg");
  const hasPortrait = hasImage("naeul-texture-macro.jpg");

  return (
    <>
      {/* HERO */}
      <section className="flex min-h-[calc(100dvh-4rem)] items-center">
        <Container className="flex flex-col items-center py-16 text-center">
          <Wordmark className="text-7xl sm:text-8xl" hangulClassName="text-base tracking-[0.4em]" />
          <h1 className="mt-10 max-w-xl text-balance font-serif text-2xl italic font-normal leading-snug text-ink sm:text-3xl">
            K-beauty pour peau grasse, sans agresser.
          </h1>
          {PREORDER_ENABLED ? (
            <>
              <p className="mt-5 max-w-md leading-relaxed text-stone">
                L&apos;Édition Fondatrices est ouverte : <strong className="text-ink">-15%</strong>,
                livraison offerte et garantie 30 jours. Premier batch limité à 200 flacons.
              </p>
              <Link
                href="/le-produit#acheter"
                className={buttonClasses({ size: "lg", className: "mt-8" })}
              >
                Précommander (-15%)
                <ArrowRight size={18} />
              </Link>
              <WaitlistCount className="mt-6" />
              <p className="mt-4 text-sm text-stone">
                Pas encore prête ?{" "}
                <Link href="#precommande" className="text-sage underline underline-offset-4">
                  Rejoins la liste d&apos;avant-première
                </Link>
              </p>
            </>
          ) : (
            <>
              <p className="mt-5 max-w-md leading-relaxed text-stone">
                Notre premier sérum arrive bientôt. Inscris-toi pour être prévenue en
                avant-première et obtenir <strong className="text-ink">-15%</strong> au lancement.
              </p>
              <WaitlistForm className="mt-8 w-full max-w-md" />
              <WaitlistCount className="mt-6" />
            </>
          )}
          <p className="mt-5 text-[0.7rem] uppercase tracking-[0.25em] text-stone/70">
            Vegan · ECOCERT · Sans parfum
          </p>
        </Container>
      </section>

      {/* POURQUOI NAEUL */}
      <section className="border-y border-line bg-cream">
        <Container className="py-20 md:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-stone">Pourquoi naeul</p>
            <h2 className="mt-3 text-3xl md:text-4xl">Une marque, une intention</h2>
          </div>
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {PILLARS.map((pillar) => (
              <div key={pillar.title} className="text-center md:text-left">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-sage/10 text-sage">
                  <pillar.icon size={24} />
                </span>
                <h3 className="mt-5 text-lg">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone">{pillar.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* LES 200 PREMIÈRES (Édition Fondatrices) */}
      <section className="border-b border-line">
        <Container className="py-20 md:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-stone">Édition Fondatrices</p>
            <h2 className="mt-3 text-3xl md:text-4xl">Les 200 premières</h2>
            <p className="mt-4 leading-relaxed text-stone">
              Le tout premier batch est limité à 200 flacons. Rejoins-le maintenant : tu fais partie
              des fondatrices qui vivent le lancement en avant-première, avec -15% sur ta première
              commande.
            </p>
          </div>
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {FOUNDERS.map((f) => (
              <div key={f.title} className="text-center md:text-left">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-sage/10 text-sage">
                  <f.icon size={24} />
                </span>
                <h3 className="mt-5 text-lg">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone">{f.text}</p>
              </div>
            ))}
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
                  alt="Une femme à la peau lumineuse applique le sérum naeul"
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
                  alt="Macro de la texture du sérum naeul : une goutte fluide et légère"
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

      {/* CAPTURE FINALE */}
      <section id="precommande" className="scroll-mt-20 border-y border-line bg-cream">
        <Container className="flex flex-col items-center gap-6 py-20 text-center md:py-28">
          <h2 className="max-w-xl text-balance text-3xl md:text-4xl">
            Sois prévenue en avant-première. -15% au lancement.
          </h2>
          <p className="max-w-md leading-relaxed text-stone">
            Rejoins la liste. Tu recevras ton code et seras la première informée du lancement.
          </p>
          <WaitlistForm className="w-full max-w-md" />
          <WaitlistCount />
        </Container>
      </section>
    </>
  );
}
