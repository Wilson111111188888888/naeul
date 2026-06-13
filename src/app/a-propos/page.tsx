import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Eye, Sparkle, Leaf } from "@phosphor-icons/react/dist/ssr";
import { buttonClasses } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "naeul, « devenir meilleure » en coréen. Une marque K-beauty française pensée pour les peaux grasses, sans les agresser.",
  alternates: { canonical: "/a-propos" },
};

const VALUES = [
  { icon: Eye, t: "Transparence", d: "On dit ce qu'on fait, et ce qu'on ne fait pas. Pas de promesse magique." },
  { icon: Sparkle, t: "Efficacité", d: "Une marque utile, pensée pour un besoin précis : la peau grasse." },
  { icon: Leaf, t: "Simplicité", d: "Des gestes simples, une routine claire. Le superflu, on le laisse de côté." },
];

export default function AProposPage() {
  return (
    <>
      {/* Manifeste */}
      <section className="border-b border-line">
        <Container className="py-20 md:py-28">
          <p className="text-xs uppercase tracking-[0.25em] text-stone">나을 · naeul</p>
          <h1 className="mt-5 max-w-3xl text-balance text-4xl leading-tight md:text-6xl">
            « Devenir meilleure. »
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-stone">
            Naeul, qui signifie « devenir meilleure » en coréen. Une marque K-beauty pensée
            pour un seul type de peau : la peau grasse.
          </p>
        </Container>
        <div className="relative aspect-[16/7] w-full overflow-hidden">
          <Image
            src="/images/naeul-produit-bois.jpg"
            alt="naeul — le sérum, ambiance éditoriale"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* Pourquoi + fondatrice */}
      <Container className="py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-2 md:gap-20">
          <div>
            <h2 className="text-3xl">Pourquoi une seule peau ?</h2>
            <div className="mt-6 space-y-4 leading-relaxed text-stone">
              <p>
                La plupart des marques K-beauty veulent plaire à toutes les peaux. Résultat : des
                propositions qui ne ciblent vraiment personne.
              </p>
              <p>
                naeul fait l&apos;inverse. Nous avons choisi la peau grasse — celle qui brille en
                milieu de journée, dont les pores se voient, sur laquelle le maquillage glisse. Une
                peau exigeante, longtemps mal conseillée.
              </p>
              <p>
                Nous construisons la marque avec exigence et sans précipitation. Notre premier
                produit arrive bientôt ; les inscrites seront les premières informées.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-3xl">La fondatrice</h2>
            <div className="mt-6 space-y-4 leading-relaxed text-stone">
              <p>
                naeul est née d&apos;une frustration personnelle. La peau grasse depuis
                l&apos;adolescence, sa fondatrice a passé des années à tester des produits trop
                agressifs — alcool, acides forts, formules « matifiantes » — qui asséchaient sa peau
                sans jamais l&apos;équilibrer.
              </p>
              <p>
                C&apos;est en découvrant la K-beauty qu&apos;elle comprend qu&apos;une autre approche
                existe : prendre soin de la peau grasse avec douceur, au lieu de la décaper. naeul
                est née de cette conviction — créer le soin qu&apos;elle aurait voulu trouver, pensé
                pour un seul type de peau, le sien.
              </p>
              <p>
                Aujourd&apos;hui, elle porte la marque avec une règle simple : ne proposer que ce en
                quoi elle croit vraiment.
              </p>
            </div>
          </div>
        </div>
      </Container>

      {/* Valeurs */}
      <section className="border-y border-line bg-cream">
        <Container className="py-20 md:py-28">
          <h2 className="text-3xl">Nos valeurs</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {VALUES.map((item) => (
              <div key={item.t}>
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-sage/10 text-sage">
                  <item.icon size={22} />
                </span>
                <h3 className="mt-4 text-lg">{item.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone">{item.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 max-w-2xl text-sm leading-relaxed text-stone">
            En toute transparence : notre formulation est en cours d&apos;enregistrement au portail
            CPNP (Cosmetic Products Notification Portal) auprès des autorités européennes. Le numéro
            sera affiché au lancement officiel.
          </p>
        </Container>
      </section>

      {/* CTA */}
      <Container className="flex flex-col items-center gap-6 py-20 text-center">
        <h2 className="max-w-xl text-balance text-3xl md:text-4xl">
          Sois là dès le premier jour.
        </h2>
        <p className="max-w-md leading-relaxed text-stone">
          Rejoins la liste d&apos;avant-première et obtiens -15% au lancement.
        </p>
        <Link href="/#precommande" className={buttonClasses({ size: "lg" })}>
          Je veux être prévenue (-15%)
        </Link>
      </Container>
    </>
  );
}
