import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { buttonClasses } from "@/components/ui/button";
import { TestersWall } from "@/components/sections/testers-wall";
import { TESTERS } from "@/lib/testers";
import { PREORDER_ENABLED } from "@/lib/preorder";

export const metadata: Metadata = {
  title: "Retours de nos testeuses",
  description:
    "Les retours de nos testeuses sur le sérum naeul pour peau grasse : produit reçu en avant-première, 4 semaines de test. Résultats individuels, non garantis.",
  alternates: { canonical: "/testeuses" },
};

export default function TesteusesPage() {
  return (
    <>
      <TestersWall showFilters />
      <section className="border-t border-line bg-cream">
        <Container className="flex flex-col items-center gap-4 py-16 text-center md:py-20">
          <h2 className="max-w-xl text-balance font-serif text-2xl md:text-3xl">
            Rejoins les prochaines à essayer naeul.
          </h2>
          <Link
            href={PREORDER_ENABLED ? "/le-produit#acheter" : "/#precommande"}
            className={buttonClasses({ size: "lg" })}
          >
            Je réserve ma place (-15%)
          </Link>
          <p className="text-xs text-stone/70">
            {TESTERS.length} retours de testeuses · produit reçu en avant-première, pas un achat.
          </p>
        </Container>
      </section>
    </>
  );
}
