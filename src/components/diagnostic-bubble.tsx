"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { track } from "@vercel/analytics";
import { Gift, X } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

/**
 * Widget flottant permanent « Diagnostic de ta peau » (remplace l'ancienne bulle
 * d'aide). Crée le sentiment d'offre/cadeau et pousse vers le quiz « Ta peau,
 * notre réponse » (#diagnostic). Repliable en une pastille cadeau, jamais cachée.
 * Icône cadeau (pas d'emoji — règle de marque). Tutoiement.
 */
export function DiagnosticBubble() {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();

  // Inutile (et gênant) sur la page diagnostic elle-même.
  if (pathname === "/diagnostic") return null;

  return (
    <div className="fixed bottom-6 right-4 z-40 hidden md:block md:right-6">
      {open ? (
        <div className="relative w-[17.5rem] max-w-[calc(100vw-2rem)]">
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Réduire le diagnostic"
            className="absolute -right-2 -top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-line bg-cream text-stone shadow-sm transition-colors hover:text-ink"
          >
            <X size={14} weight="bold" />
          </button>
          <Link
            href="/diagnostic"
            onClick={() => track("diagnostic_click", { source: "bubble" })}
            className="flex items-center gap-3 rounded-2xl bg-ink py-3 pl-5 pr-3 text-cream shadow-xl shadow-ink/25 ring-1 ring-cream/10 transition-transform hover:-translate-y-0.5"
          >
            <span className="min-w-0 flex-1">
              <span className="block font-medium leading-tight">Diagnostic de ta peau</span>
              <span className="mt-1 block text-xs italic leading-snug text-cream/70">
                Découvre ce dont ta peau a besoin · -15%
              </span>
            </span>
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cream">
              <Gift size={26} weight="fill" className="text-terracotta" />
            </span>
          </Link>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Diagnostic de ta peau"
          className={cn(
            "flex h-14 w-14 items-center justify-center rounded-full bg-ink text-cream shadow-lg shadow-ink/25 ring-1 ring-cream/10",
            "transition-transform hover:scale-105 active:scale-95",
          )}
        >
          <Gift size={24} weight="fill" className="text-terracotta" />
        </button>
      )}
    </div>
  );
}
