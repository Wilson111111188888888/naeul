import type { Metadata } from "next";
import Link from "next/link";
import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui/container";
import { buttonClasses } from "@/components/ui/button";

export const metadata: Metadata = { title: "FAQ" };

const FAQ: { q: string; a: string }[] = [
  {
    q: "Quand sort le premier produit ?",
    a: "Notre premier produit — un sérum aux exosomes et à la niacinamide — arrive prochainement. Les personnes inscrites à la précommande seront les premières prévenues, avant tout le monde.",
  },
  {
    q: "Que signifie « naeul » ?",
    a: "Naeul (나을) signifie « devenir meilleure » en coréen. C'est l'idée derrière la marque : accompagner votre peau, en douceur, sans la juger.",
  },
  {
    q: "Pourquoi spécifiquement la peau grasse ?",
    a: "Parce que la plupart des marques cherchent à plaire à toutes les peaux, et finissent par n'en servir vraiment aucune. naeul fait le choix inverse : se concentrer sur les peaux grasses, mixtes et à pores apparents.",
  },
  {
    q: "Pourquoi un sérum est-il adapté à la peau grasse ?",
    a: "La plupart des soins « peau grasse » assèchent — et la peau répond en produisant encore plus de sébum. Notre sérum fait l'inverse : texture légère, fini non gras, niacinamide pour réguler et acide hyaluronique pour hydrater. On équilibre sans dessécher.",
  },
  {
    q: "Où sont fabriqués les produits ?",
    a: "Designed in France, Made in EU (Lettonie), dans un laboratoire certifié ISO 22716 et ECOCERT. Vegan, sans parfum, sans gluten. Notification cosmétique EU (CPNP) en règle.",
  },
  {
    q: "C'est quoi la précommande et le -15% ?",
    a: "En vous inscrivant maintenant, vous rejoignez la liste d'avant-première. Vous recevez un code -15% à utiliser sur votre première commande au lancement, et vous êtes prévenue en priorité dès que le produit est disponible.",
  },
  {
    q: "Comment être prévenue du lancement ?",
    a: "Laissez votre email sur la page d'accueil. C'est tout. Pas de spam : vous recevez seulement les étapes importantes et votre code de bienvenue.",
  },
];

export default function FaqPage() {
  return (
    <Container className="py-16 md:py-24">
      <header className="max-w-2xl">
        <h1 className="text-4xl md:text-5xl">Questions fréquentes</h1>
        <p className="mt-4 text-lg leading-relaxed text-stone">
          Tout ce qu&apos;il faut savoir sur naeul et la précommande. Une autre question ?{" "}
          <Link href="/contact" className="text-sage underline underline-offset-4">
            Écrivez-nous
          </Link>
          .
        </p>
      </header>

      <div className="mt-12 max-w-2xl divide-y divide-line border-y border-line">
        {FAQ.map((item) => (
          <details key={item.q} className="group py-5">
            <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-medium text-ink marker:content-none">
              {item.q}
              <CaretDown
                size={18}
                className="shrink-0 text-stone transition-transform group-open:rotate-180"
              />
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-stone">{item.a}</p>
          </details>
        ))}
      </div>

      <div className="mt-12">
        <Link href="/#precommande" className={buttonClasses({ size: "lg" })}>
          Rejoindre la précommande -15%
        </Link>
      </div>
    </Container>
  );
}
