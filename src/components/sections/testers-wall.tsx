"use client";

import { useState } from "react";
import Link from "next/link";
import { TESTERS, type SkinType } from "@/lib/testers";
import { Container } from "@/components/ui/container";
import { buttonClasses } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const FILTERS: { key: SkinType | "all"; label: string }[] = [
  { key: "all", label: "Tous les retours" },
  { key: "grasse", label: "Peau grasse" },
  { key: "mixte", label: "Peau mixte" },
  { key: "sensible", label: "Peau sensible" },
];

/**
 * Mur de retours de testeuses RÉELLES (cf. lib/testers). Honnête :
 * « Testeuse · reçu en avant-première » (pas « achat vérifié »), aucune stat
 * d'efficacité inventée, mention « résultats individuels, non garantis ».
 * `limit` = aperçu (home), sinon mur complet. `showFilters` = filtres par peau.
 */
export function TestersWall({
  limit,
  showFilters = false,
  className,
}: {
  limit?: number;
  showFilters?: boolean;
  className?: string;
}) {
  const [filter, setFilter] = useState<SkinType | "all">("all");
  const filtered = filter === "all" ? TESTERS : TESTERS.filter((t) => t.type === filter);
  const shown = limit ? filtered.slice(0, limit) : filtered;

  return (
    <section className={className}>
      <Container className="py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-stone">Premières testeuses</p>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl">
            Elles ont testé naeul avant tout le monde.
          </h2>
          <p className="mt-4 leading-relaxed text-stone">
            {TESTERS.length} testeuses, 4 semaines, en avant-première. Voici leurs retours — produit
            reçu pour tester, pas acheté. Résultats individuels, non garantis.
          </p>
        </div>

        {showFilters && (
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setFilter(f.key)}
                aria-pressed={filter === f.key}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-xs font-medium transition-colors",
                  filter === f.key
                    ? "border-sage bg-sage text-cream"
                    : "border-line bg-cream text-stone hover:border-sage/50",
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        )}

        <ul className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((t, i) => (
            <li key={`${t.name}-${i}`} className="flex flex-col rounded-2xl border border-line bg-cream p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose/40 font-serif text-ink">
                  {t.name[0]}
                </span>
                <div>
                  <p className="text-sm font-medium text-ink">{t.name}</p>
                  <p className="text-xs text-stone">
                    {t.city} · {t.age} ans
                  </p>
                </div>
              </div>
              <span className="mt-4 inline-flex w-fit rounded-full bg-sand px-2.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wide text-stone">
                {t.tag}
              </span>
              <p className="mt-3 font-serif text-base italic text-ink">« {t.title} »</p>
              <p className="mt-2 text-sm leading-relaxed text-stone">{t.body}</p>
              {t.highlight && (
                <p className="mt-3 border-l-2 border-terracotta/50 pl-3 text-sm italic text-ink">
                  {t.highlight}
                </p>
              )}
              <span className="mt-4 text-[0.65rem] font-medium uppercase tracking-wide text-sage">
                Testeuse · reçu en avant-première
              </span>
            </li>
          ))}
        </ul>

        {limit && filtered.length > limit && (
          <div className="mt-10 text-center">
            <Link href="/testeuses" className={buttonClasses({ variant: "secondary", size: "lg" })}>
              Voir les {TESTERS.length} retours
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
}
