import Link from "next/link";
import Image from "next/image";
import heroLifestyle from "../../public/images/naeul-hero.jpg";
import {
  ArrowRight,
  Check,
  SealCheck,
  Leaf,
  ShieldCheck,
  Lock,
  Package,
  PenNib,
  Tag,
  UsersThree,
  Gift,
} from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui/container";
import { WaitlistForm } from "@/components/waitlist-form";
import { buttonClasses } from "@/components/ui/button";
import { MethodStrates } from "@/components/sections/method-strates";
import { GesteNaeul } from "@/components/sections/geste-naeul";
import { SwipeCarousel } from "@/components/swipe-carousel";
import { FirstTesters } from "@/components/sections/first-testers";
import { FaqAccordion } from "@/components/faq-accordion";
import { StickyCta } from "@/components/sticky-cta";
import { Countdown } from "@/components/countdown";
import { SkinDiagnostic } from "@/components/diagnostic/skin-diagnostic";
import { BeforeAfter } from "@/components/product/before-after";
import { TrackedLink, ScrollDepth } from "@/components/analytics";
import { HERO_PRODUCT } from "@/lib/products";
import { PREORDER_ENABLED, FOUNDERS_LIMIT } from "@/lib/preorder";
import { WAITLIST_COUNT } from "@/components/waitlist-count";

// Trust bar — 5 réassurances factuelles (juste après le hero).
const TRUST_BAR = [
  { Icon: SealCheck, label: "ISO 22716 · Cosmétique certifié" },
  { Icon: Leaf, label: "ECOCERT · Vegan" },
  { Icon: ShieldCheck, label: "CPNP en cours · Conformité EU" },
  { Icon: Check, label: "Satisfait remboursé 30 jours" },
  { Icon: Lock, label: "Paiement sécurisé Stripe" },
];

// Les 6 actifs, en clair (transparence — fini le « +2 actifs »).
const ACTIVES = [
  { name: "Niacinamide 5%", role: "Régule la production de sébum. Réduit l'apparence des pores." },
  {
    name: "Acide lactique",
    role: "AHA doux. Exfolie sans piquer. Choisi contre le BHA salicylique qu'on trouve partout ailleurs.",
  },
  { name: "Acide hyaluronique", role: "Hydrate sans alourdir. La peau grasse a soif aussi." },
  { name: "Centella Asiatica", role: "Apaise. Calme l'inflammation post-imperfection." },
  {
    name: "Ferments microbiome",
    role: "Renforce la barrière cutanée. Une barrière saine produit moins de sébum.",
  },
  {
    name: "Exosomes d'extrait de pomme",
    role: "Soutien au renouvellement cellulaire. La biotech derrière le grain de peau lisse.",
  },
];

// Le Cercle des 200 — bénéfices réels.
const CERCLE = [
  { icon: Package, t: "Ton flacon numéroté à la main", d: "De 001 à 200. Une seule fois dans l'histoire de naeul." },
  { icon: PenNib, t: "Une carte signée, avec ton prénom", d: "Un mot écrit à la main. Pas un message générique." },
  { icon: Tag, t: "-15% sur ta première commande", d: "Code envoyé par email le jour du lancement." },
  { icon: UsersThree, t: "Accès au Cercle privé", d: "Un groupe où tu co-construis le prochain soin." },
  { icon: Gift, t: "Le prochain soin offert en mini-format", d: "Six mois après ton flacon, tu testes le produit 2 avant tout le monde." },
];

// naeul vs marques généralistes nommées (Typology · La Rosée · The Ordinary).
// Comparaison sur infos publiques uniquement, sans claim non vérifiable.
const COMPARISON: { label: string; naeul: string; rival: string }[] = [
  { label: "Spécialité", naeul: "Peau grasse uniquement", rival: "Tous types de peau" },
  { label: "Niacinamide", naeul: "5% (dosée pour la tolérance)", rival: "Variable — ex. The Ordinary 10%" },
  { label: "Exfoliation", naeul: "AHA lactique doux, sans BHA fort ni alcool", rival: "Variable" },
  { label: "SAV & garantie 30 j en français", naeul: "Oui", rival: "Variable" },
  { label: "Concentrations affichées", naeul: "Oui", rival: "Variable" },
  { label: "Certifications", naeul: "ISO 22716 · ECOCERT", rival: "Variable" },
  { label: "Prix indicatif (30 ml)", naeul: "32,90 €", rival: "Très variable" },
];

// Comment se mesure le résultat (remplace l'avant/après — honnêteté radicale).
const MESURE = [
  { t: "Semaine 2", d: "La peau tire moins. Tu sens que ton sérum ne te punit plus." },
  { t: "Semaine 4", d: "Le sébum se régule progressivement. Moins de brillance en milieu de journée." },
  { t: "Semaine 8", d: "Le grain de peau s'affine. Les pores paraissent moins visibles à la lumière naturelle." },
];

// FAQ critique — 5 questions qui lèvent les freins à l'achat.
const HOME_FAQ = [
  {
    q: "J'ai la peau grasse ET acnéique. naeul est fait pour moi ?",
    a: "Oui — si ton acné est légère à modérée (microkystes, boutons inflammatoires occasionnels). La niacinamide et l'acide lactique aident à équilibrer le sébum et à affiner le grain de peau, ce qui réduit le terrain des imperfections. Si ton acné est sévère ou kystique, parles-en à un dermatologue. Aucun cosmétique ne remplace un traitement médical.",
  },
  {
    q: "Combien de temps avant de voir un résultat ?",
    a: "Sois patiente avec ta peau. La plupart des utilisatrices remarquent une peau moins tiraillée dès la deuxième semaine, et une régulation du sébum visible à six-huit semaines. C'est plus lent qu'un BHA fort. C'est aussi plus durable.",
  },
  {
    q: "Je peux utiliser naeul avec ma routine actuelle ?",
    a: "Oui, à condition que ta routine n'inclue pas déjà un acide fort (BHA salicylique, AHA glycolique au-dessus de 8%, rétinol à dose élevée). Si c'est le cas, espace les applications de 24h. naeul s'utilise le matin et/ou le soir, avant ta crème hydratante.",
  },
  {
    q: "Où est fabriqué naeul ?",
    a: "Dans un laboratoire certifié ISO 22716 et ECOCERT, basé à Riga, en Lettonie (Union européenne). On a choisi ce partenaire parce qu'il respecte la réglementation cosmétique européenne stricte et qu'il nous permet de produire sans surstock. Pensé en France. Fabriqué en UE. Pour ta peau.",
  },
  {
    q: "Quand arrive ma commande ?",
    a: "Le sérum est expédié sous 5 à 7 jours ouvrés depuis notre laboratoire EU, en Mondial Relay, livraison offerte dès 50€. On produit à la demande — pas de chimie qui dort dans un entrepôt. C'est plus long, c'est plus frais.",
  },
];

// FAQ structurée (rich results Google + réponses IA) — bâtie depuis HOME_FAQ.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: HOME_FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Home() {
  // CTA principal : pointe vers la précommande si le flag est actif, sinon l'inscription.
  const ctaHref = PREORDER_ENABLED ? "/le-produit#acheter" : "#precommande";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ScrollDepth page="home" />

      {/* 1 — HERO (split 60/40 : texte + visage de la marque) */}
      <section className="border-b border-line bg-cream">
        <Container className="grid items-center gap-10 py-12 md:grid-cols-5 md:gap-14 md:py-20">
          <div className="order-2 animate-fade-up md:order-1 md:col-span-3">
            <p className="text-[0.7rem] uppercase tracking-[0.25em] text-sage">
              K-beauty française · Avant-première
            </p>
            <h1 className="mt-4 text-balance font-serif text-4xl font-normal italic leading-[1.05] text-ink md:text-6xl">
              Ta peau grasse
              <br />
              n&apos;est pas ton ennemie.
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-stone md:text-xl">
              Le sérum K-beauty que je cherchais pour ma peau grasse. Mon mari l&apos;a formulé, je
              l&apos;ai testé sur ma peau. Sans alcool dénaturé, sans BHA agressifs, sans représailles.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Countdown />
              <span className="text-[0.8rem] uppercase tracking-[0.15em] text-stone/80">
                -15% pour les 200 premières · Édition numérotée
              </span>
            </div>

            {/* Compteur RÉEL (108 inscrites vérifiées, pas un faux compteur) */}
            <div className="mt-5 max-w-sm">
              <div className="flex items-baseline justify-between text-sm">
                <span className="font-medium text-ink">
                  {WAITLIST_COUNT} <span className="text-stone">/ {FOUNDERS_LIMIT} places réservées</span>
                </span>
                <span className="text-xs text-stone">Plus que {FOUNDERS_LIMIT - WAITLIST_COUNT}</span>
              </div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-line">
                <div
                  className="h-full rounded-full bg-sage transition-all"
                  style={{ width: `${(WAITLIST_COUNT / FOUNDERS_LIMIT) * 100}%` }}
                />
              </div>
            </div>
            {PREORDER_ENABLED ? (
              <>
                <TrackedLink
                  href={ctaHref}
                  event="cta_click"
                  data={{ location: "hero" }}
                  className={buttonClasses({ size: "lg", className: "mt-7 w-full sm:w-auto" })}
                >
                  Précommander (-15%)
                  <ArrowRight size={18} />
                </TrackedLink>
                <p className="mt-3 text-xs text-stone/70">
                  Paiement aujourd&apos;hui pour réserver ton flacon numéroté.
                </p>
              </>
            ) : (
              <>
                <WaitlistForm
                  tone="light"
                  source="hero"
                  cta="Je rejoins les 200 premières"
                  className="mt-7 max-w-md"
                />
                <p className="mt-2 text-xs text-stone/70">
                  Pas de pré-paiement. Ton code -15% arrive le jour J.
                </p>
              </>
            )}
          </div>

          <div className="order-1 md:order-2 md:col-span-2">
            <figure className="overflow-hidden rounded-2xl">
              <Image
                src={heroLifestyle}
                alt="Le sérum K-beauty naeul tenu en main, dans une lumière naturelle"
                priority
                quality={90}
                placeholder="blur"
                sizes="(max-width: 768px) 100vw, 40vw"
                className="aspect-[4/5] h-full w-full object-cover"
              />
            </figure>
          </div>
        </Container>
      </section>

      {/* 2 — DIAGNOSTIC PEAU (générateur de leads principal) */}
      <section id="diagnostic" className="scroll-mt-20 border-b border-line bg-cream">
        <SkinDiagnostic embedded />
      </section>

      {/* 2bis — TU TE RECONNAIS ? (coût émotionnel — l'identification avant les actifs) */}
      <section className="border-b border-line">
        <Container className="py-16 md:py-24">
          <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
            <figure className="mx-auto w-full max-w-sm overflow-hidden rounded-2xl bg-sand">
              <Image
                src="/images/naeul-miroir.jpg"
                alt="Femme à la peau grasse qui examine son grain de peau dans le miroir"
                width={900}
                height={1125}
                sizes="(max-width: 768px) 100vw, 40vw"
                className="aspect-[4/5] h-full w-full object-cover"
              />
            </figure>
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-stone">Tu te reconnais ?</p>
              <h2 className="mt-3 text-balance font-serif text-3xl leading-snug md:text-4xl">
                Le vrai problème n&apos;est pas ton sébum. C&apos;est ce qu&apos;il te fait
                ressentir.
              </h2>
              <ul className="mt-7 space-y-4">
                {[
                  "Je brille sur toutes les photos.",
                  "Je me lave le visage, et deux heures après, ça recommence.",
                  "Je vérifie mon reflet dès que je passe devant une vitre.",
                ].map((t) => (
                  <li
                    key={t}
                    className="border-l-2 border-terracotta/50 pl-4 font-serif text-lg italic leading-relaxed text-ink"
                  >
                    « {t} »
                  </li>
                ))}
              </ul>
              <p className="mt-7 leading-relaxed text-stone">
                On ne parle pas que de pores et de pourcentages. On parle de cette fatigue-là — celle
                de surveiller sa peau toute la journée. naeul existe pour que tu arrêtes.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 3 — NOTRE HISTOIRE (la fondatrice) */}
      <section className="border-b border-line">
        <Container className="py-16 md:py-24">
          <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
            <figure className="overflow-hidden rounded-2xl bg-sand">
              <Image
                src="/images/naeul-histoire.jpg"
                alt="Le sérum naeul posé sur le marbre d'une salle de bain, dans la lumière du matin"
                width={1086}
                height={1448}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="aspect-[4/5] h-full w-full object-cover"
              />
            </figure>
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-stone">Notre histoire</p>
              <h2 className="mt-3 text-balance font-serif text-3xl md:text-4xl">
                On a créé la marque qu&apos;on n&apos;a pas pu acheter.
              </h2>
              <div className="mt-6 space-y-4 leading-relaxed text-stone">
                <p>J&apos;ai la peau grasse depuis mes douze ans.</p>
                <p>
                  Pendant douze ans, on m&apos;a vendu des produits qui assèchent, des acides qui
                  décapent, des matifiants qui font ressortir le sébum dès quatorze heures.
                </p>
                <p>
                  À chaque nouveau produit, le même cycle : trois semaines de mieux, puis ma peau se
                  rebellait, plus grasse qu&apos;avant.
                </p>
                <p>
                  J&apos;ai cherché une K-beauty pensée pour ma peau. Les marques coréennes étaient
                  excellentes — mais conçues pour le climat de Séoul, sans interlocuteur en France.
                </p>
                <p>Les pharmaciennes me parlaient comme à une ado en crise d&apos;acné.</p>
                <p>Alors on s&apos;y est mis : mon mari a creusé les formules, j&apos;ai testé chaque version sur ma peau.</p>
                <p className="text-ink">
                  naeul, c&apos;est le sérum que j&apos;aurais voulu il y a dix ans.
                </p>
              </div>
              <p className="mt-6 font-serif text-sm italic text-stone">— La fondatrice de naeul</p>
              <Link
                href="/a-propos"
                className="mt-5 inline-flex items-center gap-1.5 text-sm text-sage underline underline-offset-4 hover:text-sage-dark"
              >
                Lire l&apos;histoire complète
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* 3 — TRUST BAR */}
      <section className="border-b border-line bg-cream">
        <Container className="py-6">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 lg:grid-cols-5">
            {TRUST_BAR.map(({ Icon, label }) => (
              <li key={label} className="flex items-center gap-2 text-xs text-stone">
                <Icon size={16} weight="regular" className="shrink-0 text-sage" />
                {label}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 4 — LA CONVICTION */}
      <section className="border-b border-line bg-sage/[0.08]">
        <Container className="py-20 text-center md:py-28">
          <div className="mx-auto max-w-2xl">
            <p className="text-xs uppercase tracking-[0.25em] text-stone">Notre combat</p>
            <h2 className="mt-6 text-balance font-serif text-3xl leading-snug text-sage-dark md:text-[2.6rem]">
              On déclare la fin de la guerre contre le sébum.
            </h2>
            <div className="mt-8 space-y-4 leading-relaxed text-stone">
              <p>
                Depuis toujours, on t&apos;apprend à <em>combattre</em>{" "}ta peau grasse : décaper,
                assécher, matifier. Plus tu l&apos;attaques, plus elle se défend — et plus elle
                graisse. C&apos;est une guerre que tu ne peux pas gagner, parce que ton sébum
                n&apos;est pas ton ennemi.
              </p>
              <p className="text-ink">
                Nous, on choisit l&apos;inverse : travailler <em>avec</em>{" "}ta peau. Réguler, apaiser,
                renforcer — et la laisser retrouver son équilibre. C&apos;est plus lent qu&apos;un BHA
                fort. C&apos;est durable.
              </p>
            </div>
            <p className="mt-9 font-serif text-2xl italic text-sage-dark md:text-3xl">
              Peau grasse, peau respectée.
            </p>
          </div>
        </Container>
      </section>

      {/* 5 — LE PRODUIT (prix + bundles visibles) */}
      <section className="border-b border-line">
        <Container className="py-16 md:py-24">
          <div className="grid items-start gap-12 md:grid-cols-2 md:gap-16">
            <figure className="overflow-hidden rounded-2xl bg-rose/20 md:sticky md:top-24 md:self-start">
              <Image
                src={HERO_PRODUCT.photos[0].src}
                alt={HERO_PRODUCT.photos[0].alt}
                width={1100}
                height={1375}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="aspect-[4/5] h-full w-full object-cover"
              />
            </figure>
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-[0.25em] text-stone">Le sérum</p>
              <h2 className="mt-3 text-balance font-serif text-3xl md:text-4xl">
                Six actifs choisis. Aucun ingrédient pour faire joli.
              </h2>
              <p className="mt-4 leading-relaxed text-stone">
                Notre premier soin. Trente millilitres pour soixante applications. Texture légère,
                finition non grasse. Une seule mission : équilibrer le sébum sans agresser.
              </p>

              <div className="mt-8 border-t border-line pt-6 text-stone">
                <SwipeCarousel
                  as="ul"
                  className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 scrollbar-hide sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-4 sm:overflow-visible sm:pb-0"
                >
                  {ACTIVES.map((a) => (
                    <li
                      key={a.name}
                      className="w-[78%] shrink-0 snap-center rounded-xl border border-line bg-sand p-4 sm:w-auto sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0"
                    >
                      <p className="text-sm font-medium text-ink">{a.name}</p>
                      <p className="mt-0.5 text-sm leading-relaxed text-stone">{a.role}</p>
                    </li>
                  ))}
                </SwipeCarousel>
              </div>

              {/* Bloc prix — visible, assumé, hiérarchisé (prix au flacon = ancrage valeur) */}
              <div className="mt-8 overflow-hidden rounded-2xl border border-line">
                <div className="flex items-center justify-between gap-3 px-5 py-4">
                  <span className="min-w-0">
                    <span className="block text-sm text-ink">1 flacon</span>
                    <span className="block text-xs text-stone">32,90 € / flacon</span>
                  </span>
                  <span className="shrink-0 whitespace-nowrap font-serif text-lg text-ink">32,90 €</span>
                </div>
                <div className="flex items-center justify-between gap-3 border-t border-line px-5 py-4">
                  <span className="min-w-0">
                    <span className="text-sm text-ink">2 flacons</span>
                    <span className="ml-2 rounded-full bg-sand px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wide text-stone">
                      Le plus pris
                    </span>
                    <span className="mt-0.5 block text-xs text-stone">29,95 € / flacon</span>
                  </span>
                  <span className="shrink-0 whitespace-nowrap text-right">
                    <span className="mr-1.5 text-xs text-stone line-through">65,80 €</span>
                    <span className="font-serif text-lg text-ink">59,90 €</span>
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3 border-t border-line bg-sage/[0.06] px-5 py-4">
                  <span className="min-w-0">
                    <span className="text-sm text-ink">3 flacons</span>
                    <span className="ml-2 rounded-full bg-sage px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wide text-cream">
                      Meilleure valeur
                    </span>
                    <span className="mt-0.5 block text-xs text-stone">28,30 € / flacon · livraison offerte</span>
                  </span>
                  <span className="shrink-0 whitespace-nowrap text-right">
                    <span className="mr-1.5 text-xs text-stone line-through">98,70 €</span>
                    <span className="font-serif text-lg text-ink">84,90 €</span>
                  </span>
                </div>
              </div>

              <TrackedLink
                href={ctaHref}
                event="cta_click"
                data={{ location: "product" }}
                className={buttonClasses({ size: "lg", className: "mt-6 w-full" })}
              >
                {PREORDER_ENABLED ? "Je réserve mon flacon (-15%)" : "Je réserve ma place (-15%)"}
                <ArrowRight size={18} />
              </TrackedLink>
              <p className="mt-3 text-center text-xs text-stone">
                Code BIENVENUE15 envoyé à l&apos;inscription. Édition fondatrice limitée à 200 flacons.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* RÉSULTATS (test interne) — remonté juste après le produit */}
      <section className="border-b border-line bg-cream">
        <Container className="py-16 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-stone">Résultats · test interne</p>
            <h2 className="mt-3 text-balance font-serif text-3xl md:text-4xl">
              Le grain de peau, en 4 semaines.
            </h2>
            <p className="mt-5 leading-relaxed text-stone">
              Pores resserrés, peau plus lisse et moins brillante — observés lors de notre test
              interne sur peau grasse, avant lancement. Pas un avis client : les vrais avant/après
              vérifiés arriveront avec les premières clientes, datés et jamais retouchés.
            </p>
          </div>
          <BeforeAfter />
          <p className="mx-auto mt-4 max-w-xl text-center text-xs leading-relaxed text-stone">
            Glisse pour comparer · test interne sur peau grasse, 4 semaines (pas un avis client).
            Résultats individuels, non garantis.
          </p>
          {/* Paliers de résultat — carrousel (défilable + points sur mobile) */}
          <SwipeCarousel
            as="ol"
            className="mx-auto mt-10 flex max-w-4xl snap-x snap-mandatory gap-4 overflow-x-auto pb-2 scrollbar-hide md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:pb-0"
          >
            {MESURE.map((m) => (
              <li
                key={m.t}
                className="w-[80%] shrink-0 snap-center rounded-2xl border border-line bg-sand p-6 text-center md:w-auto"
              >
                <p className="font-serif text-xl text-sage">{m.t}</p>
                <p className="mt-3 text-sm leading-relaxed text-stone">{m.d}</p>
              </li>
            ))}
          </SwipeCarousel>
        </Container>
      </section>

      {/* LA MÉTHODE DES TROIS STRATES */}
      <MethodStrates className="border-b border-line" />

      {/* 7 — LE GESTE NAEUL */}
      <GesteNaeul className="border-b border-line" />

      {/* 8 — PREMIÈRES TESTEUSES (placeholder honnête en attendant les vrais retours) */}
      <FirstTesters className="border-b border-line bg-cream" />

      {/* 9 — LE CERCLE DES 200 (scarcity légitime, sans faux compteur) */}
      <section className="bg-ink text-cream">
        <Container className="py-16 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[0.7rem] uppercase tracking-[0.25em] text-cream/60">Édition fondatrice</p>
            <h2 className="mt-2 font-serif text-3xl text-cream md:text-5xl">Le Cercle des 200.</h2>
            <p className="mt-4 leading-relaxed text-cream/75">
              Le premier lot de naeul n&apos;existera qu&apos;une fois. Deux cents flacons numérotés,
              deux cents personnes, un lancement qu&apos;on vit ensemble.
            </p>
          </div>
          <SwipeCarousel
            as="ul"
            className="mx-auto mt-12 flex max-w-4xl snap-x snap-mandatory gap-4 overflow-x-auto pb-2 scrollbar-hide text-cream sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:pb-0 lg:grid-cols-3"
          >
            {CERCLE.map((b) => (
              <li
                key={b.t}
                className="w-[80%] shrink-0 snap-center rounded-2xl border border-cream/10 bg-cream/[0.04] p-6 sm:w-auto"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-cream/10 text-terracotta">
                  <b.icon size={20} />
                </span>
                <h3 className="mt-4 text-sm font-medium leading-snug text-cream">{b.t}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-cream/65">{b.d}</p>
              </li>
            ))}
          </SwipeCarousel>
          <div className="mt-12 flex flex-col items-center text-center">
            <p className="text-[0.75rem] uppercase tracking-[0.2em] text-cream/55">
              Édition fondatrice · 200 flacons numérotés · le premier lot ne reviendra jamais
            </p>
            <TrackedLink
              href="#precommande"
              event="cta_click"
              data={{ location: "cercle" }}
              className={buttonClasses({ size: "lg", className: "mt-5 bg-cream text-ink hover:bg-sand" })}
            >
              Je rejoins le Cercle
              <ArrowRight size={18} />
            </TrackedLink>
            <p className="mt-3 max-w-sm text-xs leading-relaxed text-cream/60">
              Inscription gratuite, sans engagement d&apos;achat. Tu reçois ton numéro de réservation
              par email.
            </p>
          </div>
        </Container>
      </section>

      {/* 10 — NAEUL VS ALTERNATIVES */}
      <section className="border-b border-line bg-cream">
        <Container className="py-16 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-stone">Le choix</p>
            <h2 className="mt-3 text-balance font-serif text-3xl md:text-4xl">
              naeul vs les généralistes
            </h2>
            <p className="mt-5 leading-relaxed text-stone">
              Typology, La Rosée, The Ordinary : d&apos;excellentes marques — mais généralistes, pour
              tous les types de peau. naeul fait le choix d&apos;une seule peau. Voilà la différence,
              sur des faits publics.
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-2xl overflow-hidden rounded-2xl border border-line bg-sand">
            <div className="grid grid-cols-[1.3fr_1fr_1fr] border-b border-line text-[0.65rem] font-semibold uppercase tracking-wide">
              <span className="px-4 py-3" />
              <span className="px-2 py-3 text-center text-sage">naeul</span>
              <span className="px-2 py-3 text-center text-stone">Généralistes*</span>
            </div>
            <ul className="divide-y divide-line">
              {COMPARISON.map((row) => (
                <li key={row.label} className="grid grid-cols-[1.3fr_1fr_1fr] items-center">
                  <span className="px-4 py-3 text-sm leading-snug text-ink">{row.label}</span>
                  <span className="px-2 py-3 text-center text-xs font-medium leading-snug text-ink">
                    {row.naeul}
                  </span>
                  <span className="px-2 py-3 text-center text-xs leading-snug text-stone">
                    {row.rival}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <p className="mx-auto mt-4 max-w-2xl text-center text-xs leading-relaxed text-stone/70">
            *Typology · La Rosée · The Ordinary. Comparaison établie sur des informations publiques
            (sites des marques), août 2026. Ces marques restent d&apos;excellents choix pour une peau
            normale ou sèche.
          </p>
        </Container>
      </section>

      {/* FAQ CRITIQUE */}
      <section className="border-b border-line bg-cream">
        <Container className="py-16 md:py-24">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-center font-serif text-3xl md:text-4xl">
              Les questions qu&apos;on nous pose le plus.
            </h2>
            <FaqAccordion items={HOME_FAQ} className="mt-10" />
          </div>
        </Container>
      </section>

      {/* 13 — GARANTIE 30 JOURS */}
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

      {/* 14 — CTA FINAL */}
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
          <h2 className="max-w-2xl text-balance font-serif text-3xl text-cream md:text-5xl">
            Tu rejoins les 200 premières ?
          </h2>
          <p className="max-w-md leading-relaxed text-cream/80">
            naeul sort en août 2026. Édition fondatrice limitée à 200 flacons numérotés. -15% pour
            les inscrites en avant-première.
          </p>
          {PREORDER_ENABLED ? (
            <Link href="/le-produit#acheter" className={buttonClasses({ size: "lg", className: "mt-2" })}>
              Précommander (-15%)
              <ArrowRight size={18} />
            </Link>
          ) : (
            <WaitlistForm tone="onAccent" source="home_cta" className="w-full max-w-md" />
          )}
          <p className="max-w-md text-xs leading-relaxed text-cream/60">
            Inscription gratuite. Pas de spam. Désinscription en un clic.
          </p>
        </Container>
      </section>

      {/* 15 — STICKY CTA mobile */}
      <StickyCta
        href={ctaHref}
        label="Édition fondatrice -15% · Je réserve ma place"
        event={PREORDER_ENABLED ? "sticky_preorder_click" : "sticky_waitlist_click"}
      />
    </>
  );
}
