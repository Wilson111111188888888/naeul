import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { buttonClasses } from "@/components/ui/button";
import { FaqAccordion } from "@/components/faq-accordion";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Questions fréquentes sur naeul : quand sort le sérum, pourquoi la peau grasse, peaux sensibles, comment être au courant du lancement.",
  alternates: { canonical: "/faq" },
};

const FAQ: { q: string; a: string }[] = [
  {
    q: "Quand sort le premier produit ?",
    a: "Notre premier produit — un sérum régulateur à la niacinamide pour peau grasse — arrive prochainement. Les personnes inscrites à l'avant-première seront au courant avant tout le monde.",
  },
  {
    q: "Que signifie « naeul » ?",
    a: "Naeul signifie « devenir meilleure » en coréen. C'est l'idée derrière la marque : accompagner ta peau, en douceur, sans la juger.",
  },
  {
    q: "Pourquoi spécifiquement la peau grasse ?",
    a: "Parce que la plupart des marques cherchent à plaire à toutes les peaux, et finissent par n'en servir vraiment aucune. naeul fait le choix inverse : se concentrer sur les peaux grasses, mixtes et à pores apparents.",
  },
  {
    q: "Le sérum convient-il aux peaux sensibles ?",
    a: "Oui. La formule reste douce — sans parfum, apaisée par la Centella — et évite les actifs trop agressifs. Si ta peau est réactive, commence un jour sur deux la première semaine, puis tous les jours.",
  },
  {
    q: "Le sérum est-il vegan et sans parfum ?",
    a: "Oui : vegan, sans parfum et sans gluten, formulé dans un laboratoire certifié ISO 22716 et ECOCERT.",
  },
  {
    q: "Le produit est-il déclaré aux autorités (CPNP) ?",
    a: "Notre formulation est en cours d'enregistrement au portail CPNP (Cosmetic Products Notification Portal) auprès des autorités européennes. Le numéro sera affiché au lancement officiel.",
  },
  {
    q: "C'est quoi la précommande et le -15% ?",
    a: "En t'inscrivant maintenant, tu rejoins la liste d'avant-première. Tu reçois un code -15% à utiliser sur ta première commande au lancement, et tu es au courant en priorité dès que le produit est disponible.",
  },
  {
    q: "Comment être au courant du lancement ?",
    a: "Laisse ton email sur la page d'accueil. C'est tout. Pas de spam : tu reçois seulement les étapes importantes et ton code de bienvenue.",
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
            Écris-nous
          </Link>
          .
        </p>
      </header>

      <FaqAccordion items={FAQ} className="mt-12 max-w-2xl" />

      <div className="mt-12">
        <Link href="/#precommande" className={buttonClasses({ size: "lg" })}>
          Je réserve ma place (-15%)
        </Link>
      </div>
    </Container>
  );
}
