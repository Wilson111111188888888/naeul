import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { buttonClasses } from "@/components/ui/button";
import { Todo } from "@/components/content-page";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "naeul, « devenir meilleure » en coréen. Une marque K-beauty française pensée pour les peaux grasses, sans les agresser.",
  alternates: { canonical: "/a-propos" },
};

const VALUES = [
  { t: "Transparence", d: "On dit ce qu'on fait, et ce qu'on ne fait pas. Pas de promesse magique." },
  { t: "Efficacité", d: "Une marque utile, pensée pour un besoin précis : la peau grasse." },
  { t: "Simplicité", d: "Des gestes simples, une routine claire. Le superflu, on le laisse de côté." },
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
            alt="Sérum naeul, ambiance éditoriale"
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
                naeul est née d&apos;une frustration personnelle : <Todo>prénom de la fondatrice</Todo>,
                la peau grasse depuis l&apos;adolescence, ne trouvait pas de marque pensée pour elle.
              </p>
              <p>
                <Todo>1-2 phrases sur son parcours et son rapport à la K-beauty</Todo>.
              </p>
              <p>
                Aujourd&apos;hui, elle porte la marque avec une conviction simple : proposer
                seulement ce en quoi elle croit vraiment.
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
                <h3 className="text-lg">{item.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone">{item.d}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <Container className="flex flex-col items-center gap-6 py-20 text-center">
        <h2 className="max-w-xl text-balance text-3xl md:text-4xl">
          Soyez là dès le premier jour.
        </h2>
        <p className="max-w-md leading-relaxed text-stone">
          Rejoignez la précommande et obtenez -15% sur votre première commande.
        </p>
        <Link href="/#precommande" className={buttonClasses({ size: "lg" })}>
          Rejoindre la précommande
        </Link>
      </Container>
    </>
  );
}
