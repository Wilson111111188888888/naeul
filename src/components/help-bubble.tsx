"use client";

import { useState } from "react";
import Link from "next/link";
import { ChatCircle, X, CaretRight, EnvelopeSimple } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/faq", label: "Questions fréquentes" },
  { href: "/le-produit", label: "Découvrir le sérum" },
  { href: "/contact", label: "Nous écrire" },
];

/**
 * Bulle d'aide flottante. Honnête : pas de faux « agent en ligne » — on oriente
 * vers la FAQ, le produit et le contact, avec un délai de réponse réaliste.
 */
export function HelpBubble() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-20 right-4 z-40 md:bottom-6 md:right-6">
      {/* Panneau */}
      <div
        className={cn(
          "absolute bottom-full right-0 mb-3 w-[19rem] origin-bottom-right overflow-hidden rounded-2xl border border-line bg-sand shadow-xl shadow-ink/10 transition-all duration-200",
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-2 scale-95 opacity-0",
        )}
      >
        <div className="flex items-center justify-between bg-sage px-5 py-4 text-cream">
          <div>
            <p className="font-serif text-lg leading-none">Besoin d&apos;aide ?</p>
            <p className="mt-1 text-xs text-cream/80">On te répond vite.</p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Fermer l'aide"
            className="rounded-md p-1 text-cream/80 transition-colors hover:text-cream"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-5">
          <p className="text-sm leading-relaxed text-stone">
            Une question sur le sérum, ta peau ou la précommande ? Commence par ici :
          </p>
          <ul className="mt-4 space-y-2">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between gap-2 rounded-xl border border-line bg-cream px-4 py-2.5 text-sm text-ink transition-colors hover:border-sage/40"
                >
                  {l.label}
                  <CaretRight size={15} className="shrink-0 text-stone" />
                </Link>
              </li>
            ))}
          </ul>
          <a
            href="mailto:hello@naeul.com"
            className="mt-4 flex items-center gap-2 text-sm text-sage underline-offset-4 hover:underline"
          >
            <EnvelopeSimple size={16} />
            hello@naeul.com
          </a>
          <p className="mt-3 text-[0.7rem] text-stone/80">Réponse par email sous 24-48 h ouvrées.</p>
        </div>
      </div>

      {/* Bouton */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Fermer l'aide" : "Besoin d'aide ?"}
        aria-expanded={open}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-sage text-cream shadow-lg shadow-sage/25 transition-transform hover:scale-105 active:scale-95"
      >
        {open ? <X size={24} /> : <ChatCircle size={24} weight="fill" />}
      </button>
    </div>
  );
}
