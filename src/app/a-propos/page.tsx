import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Eye, Sparkle, Leaf } from "@phosphor-icons/react/dist/ssr";
import { buttonClasses } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Notre histoire — naeul, K-beauty française",
  description:
    "naeul est né du parcours d'un couple qui en avait marre des marques agressives et des K-beauty importées sans SAV. Découvre notre histoire et notre méthode.",
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
            L&apos;histoire de naeul, en vrai.
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-stone">
            On n&apos;est pas une grosse marque avec un département marketing. On est un couple qui
            en avait marre de chercher une marque honnête pour peau grasse. Alors on l&apos;a créée.
          </p>
        </Container>
        <div className="relative aspect-[16/7] w-full overflow-hidden">
          <Image
            src="/images/naeul-duo-femmes.jpg"
            alt="Deux femmes à la peau grasse tiennent le sérum naeul, lumière douce"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* Le récit */}
      <Container className="py-20 md:py-28">
        <div className="mx-auto max-w-2xl space-y-14">
          <div>
            <h2 className="text-3xl">Le problème.</h2>
            <div className="mt-6 space-y-4 leading-relaxed text-stone">
              <p>
                Une peau grasse depuis l&apos;adolescence : brillances en milieu de journée, pores
                visibles, boutons réguliers, maquillage qui glisse. Comme beaucoup, on a tout essayé.
              </p>
              <p>
                Les classiques de pharmacie — efficaces à court terme, mais ça finit par décaper la
                peau, et le sébum revient encore plus fort. Les « naturels » et « bio » français —
                doux, mais souvent sans résultat visible. La K-beauty importée (du type Beauty of
                Joseon ou COSRX) — d&apos;excellentes formulations, mais pensées pour la peau
                asiatique, sans SAV en français, sans garantie, et des semaines de livraison.
              </p>
              <p className="font-medium text-ink">
                À chaque fois, le même constat : personne ne fait spécifiquement la peau grasse, en
                français, avec une vraie approche douce.
              </p>
            </div>
          </div>

          {/* Citation */}
          <figure className="border-l-2 border-terracotta/50 pl-6">
            <blockquote className="text-balance font-serif text-2xl leading-relaxed text-ink md:text-3xl">
              « On ne te vendra jamais un produit qu&apos;on ne mettrait pas sur notre propre peau. »
            </blockquote>
            <figcaption className="mt-4 text-sm text-stone">— Les fondateurs de naeul</figcaption>
          </figure>

          <div>
            <h2 className="text-3xl">La décision.</h2>
            <div className="mt-6 space-y-4 leading-relaxed text-stone">
              <p>
                On a creusé. Les études sur la niacinamide, la logique de la routine coréenne, les
                différences entre peau asiatique et peau européenne, la réglementation cosmétique.
                Conclusion : la K-beauty a une vraie avance sur la formulation douce — mais personne
                ne l&apos;adapte aux peaux grasses d&apos;ici, avec la transparence qu&apos;on
                attendait.
              </p>
              <p>Alors on l&apos;a fait.</p>
            </div>
          </div>

          <div>
            <h2 className="text-3xl">Comment naeul est né.</h2>
            <div className="mt-6 space-y-4 leading-relaxed text-stone">
              <p>
                On a sélectionné des actifs validés sur la peau grasse — niacinamide, acide lactique,
                Centella Asiatica, acide hyaluronique. Trouvé un laboratoire certifié ECOCERT et ISO
                22716, dans l&apos;Union européenne. Refusé les formulations qui ne tenaient pas la
                promesse. Et fait valider le produit avant de le proposer.
              </p>
              <p>
                Le résultat : un sérum K-beauty français pour peau grasse. Et bientôt, une routine
                complète.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-3xl">Notre promesse.</h2>
            <ul className="mt-6 space-y-3 leading-relaxed text-stone">
              <li>On ne fera jamais de promesses qu&apos;on ne peut pas prouver.</li>
              <li>On te répondra personnellement quand tu nous écriras — c&apos;est nous derrière l&apos;email.</li>
              <li>Si ton sérum ne te convient pas, on te rembourse — même flacon entamé.</li>
              <li>Une seule expertise : la peau grasse. Si ta peau est sèche, on te le dira.</li>
            </ul>
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
        <h2 className="max-w-xl text-balance text-3xl md:text-4xl">Sois là dès le premier jour.</h2>
        <p className="max-w-md leading-relaxed text-stone">
          Rejoins la liste d&apos;avant-première et obtiens -15% au lancement.
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Link href="/#precommande" className={buttonClasses({ size: "lg" })}>
            Je rejoins la liste (-15%)
          </Link>
          <Link
            href="/diagnostic"
            className={buttonClasses({ variant: "secondary", size: "lg" })}
          >
            Faire mon diagnostic peau
          </Link>
        </div>
      </Container>
    </>
  );
}
