"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { buttonClasses } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Module interactif : la cliente sélectionne ce qui l'embête, on lui montre la
 * réponse de naeul + les actifs concernés. Compact (chips + un panneau), stylé,
 * pensé conversion. Contenu honnête, aligné sur les actions réelles du sérum.
 */
const CONCERNS = [
  {
    id: "brillances",
    chip: "Brillances en journée",
    response:
      "La niacinamide aide à réguler le sébum pour une peau plus équilibrée — sans jamais l'assécher.",
    actives: ["Niacinamide"],
  },
  {
    id: "pores",
    chip: "Pores visibles",
    response:
      "On affine l'apparence des pores avec l'AHA lactique doux et la niacinamide, progressivement.",
    actives: ["Acide lactique", "Niacinamide"],
  },
  {
    id: "tiraille",
    chip: "Peau qui tiraille",
    response:
      "Fini les actifs agressifs : on hydrate avec l'acide hyaluronique et on apaise avec la Centella.",
    actives: ["Acide hyaluronique", "Centella"],
  },
  {
    id: "grain",
    chip: "Grain irrégulier",
    response:
      "L'exfoliation douce de l'AHA lactique lisse le grain de peau, semaine après semaine.",
    actives: ["Acide lactique"],
  },
  {
    id: "reactive",
    chip: "Peau réactive",
    response:
      "Sans parfum, apaisée par la Centella et renforcée par les ferments du microbiome.",
    actives: ["Centella", "Ferments du microbiome"],
  },
];

export function SkinSelector() {
  const [id, setId] = useState(CONCERNS[0].id);
  const active = CONCERNS.find((c) => c.id === id) ?? CONCERNS[0];

  return (
    <section className="border-y border-line bg-cream">
      <Container className="py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-stone">Ta peau, notre réponse</p>
          <h2 className="mt-3 text-3xl md:text-4xl">Qu&apos;est-ce qui t&apos;embête le plus ?</h2>
        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          {/* Sélecteurs */}
          <div className="flex flex-wrap justify-center gap-2.5">
            {CONCERNS.map((c) => {
              const on = c.id === id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setId(c.id)}
                  aria-pressed={on}
                  className={cn(
                    "cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors duration-200",
                    on
                      ? "border-sage bg-sage text-cream"
                      : "border-line bg-sand text-stone hover:border-sage/50 hover:text-ink",
                  )}
                >
                  {c.chip}
                </button>
              );
            })}
          </div>

          {/* Panneau réponse — se ré-anime à chaque sélection */}
          <div
            key={id}
            className="mt-8 animate-fade-up rounded-2xl border border-line bg-sand p-8 text-center md:p-12"
          >
            <p className="mx-auto max-w-xl text-balance font-serif text-xl leading-relaxed text-ink md:text-2xl">
              {active.response}
            </p>
            <ul className="mt-6 flex flex-wrap justify-center gap-2">
              {active.actives.map((a) => (
                <li
                  key={a}
                  className="rounded-full border border-terracotta/40 bg-cream px-3 py-1 text-xs text-stone"
                >
                  {a}
                </li>
              ))}
            </ul>
            <Link href="/le-produit" className={buttonClasses({ size: "lg", className: "mt-8" })}>
              Découvrir le sérum
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
