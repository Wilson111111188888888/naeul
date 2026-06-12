import Link from "next/link";
import Image from "next/image";
import { Sparkle, Drop, MapPin, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui/container";
import { Wordmark } from "@/components/wordmark";
import { WaitlistForm } from "@/components/waitlist-form";
import { buttonClasses } from "@/components/ui/button";
import { TrustStrip } from "@/components/trust-strip";
import { Reviews } from "@/components/reviews";
import { HERO_PRODUCT } from "@/lib/products";
import { formatPrice } from "@/lib/utils";

const PILLARS = [
  {
    icon: Drop,
    title: "K-beauty douce",
    text: "On équilibre la peau grasse sans l'agresser : pas d'alcool dénaturé, pas de BHA forts.",
  },
  {
    icon: Sparkle,
    title: "La peau grasse, spécifiquement",
    text: "Une marque qui ne cherche pas à plaire à toutes les peaux. Une seule, la vôtre.",
  },
  {
    icon: MapPin,
    title: "Pensé en France, fait en UE",
    text: "Formulation française, fabrication européenne certifiée ISO 22716 et ECOCERT.",
  },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="flex min-h-[calc(100dvh-4rem)] items-center">
        <Container className="flex flex-col items-center py-16 text-center">
          <Wordmark className="text-7xl sm:text-8xl" hangulClassName="text-base tracking-[0.4em]" />
          <h1 className="mt-10 max-w-xl text-balance font-serif text-2xl italic font-normal leading-snug text-ink sm:text-3xl">
            K-beauty pour peau grasse, sans agresser.
          </h1>
          <p className="mt-5 max-w-md leading-relaxed text-stone">
            Notre premier sérum arrive bientôt. Inscrivez-vous pour être prévenue en
            avant-première et obtenir <strong className="text-ink">-15%</strong> sur votre
            précommande.
          </p>
          <WaitlistForm className="mt-8 w-full max-w-md" />
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

      {/* LE PRODUIT QUI ARRIVE */}
      <section>
        <Container className="py-20 md:py-28">
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
            <div className="overflow-hidden rounded-2xl bg-rose/30">
              <Image
                src={HERO_PRODUCT.photos[0].src}
                alt={HERO_PRODUCT.photos[0].alt}
                width={1100}
                height={1400}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="h-full w-full object-cover"
              />
            </div>
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
                <Link href="/le-produit" className={buttonClasses({ size: "lg" })}>
                  Découvrir le produit
                  <ArrowRight size={18} />
                </Link>
                <span className="text-sm text-stone">
                  Dès {formatPrice(HERO_PRODUCT.unitPrice)} · lancement bientôt
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* PREUVES DE CONFIANCE */}
      <TrustStrip />

      {/* NOTRE HISTOIRE */}
      <section className="border-y border-line bg-cream">
        <Container className="py-20 text-center md:py-28">
          <div className="mx-auto max-w-2xl">
            <p className="text-xs uppercase tracking-[0.25em] text-stone">나을 · Notre histoire</p>
            <p className="mt-6 text-balance font-serif text-2xl leading-relaxed text-ink md:text-3xl">
              « Naeul » signifie « devenir meilleure » en coréen. Une marque pensée pour
              accompagner votre peau, pas pour la juger.
            </p>
            <p className="mt-6 leading-relaxed text-stone">
              Nous construisons naeul pas à pas, avec exigence et transparence. Les premières
              inscrites seront aux premières loges — et les premières servies.
            </p>
          </div>
        </Container>
      </section>

      {/* AVIS */}
      <Reviews />

      {/* CAPTURE FINALE */}
      <section id="precommande" className="scroll-mt-20 border-t border-line bg-sage">
        <Container className="flex flex-col items-center gap-6 py-20 text-center md:py-28">
          <h2 className="max-w-xl text-balance text-3xl text-cream md:text-4xl">
            Soyez prévenue en avant-première. -15% sur votre précommande.
          </h2>
          <p className="max-w-md leading-relaxed text-cream/80">
            Rejoignez la liste. Vous recevrez votre code et serez la première informée du lancement.
          </p>
          <WaitlistForm tone="onAccent" className="w-full max-w-md" />
        </Container>
      </section>
    </>
  );
}
