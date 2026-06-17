"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";
import { Plus } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

type Item = { q: string; a: string };

/**
 * Accordéon FAQ animé. Ouverture/fermeture fluide via grid-template-rows
 * (0fr → 1fr), une seule réponse ouverte à la fois. Le texte des réponses reste
 * dans le DOM (overflow caché), donc lisible par les moteurs de recherche.
 */
export function FaqAccordion({ items, className }: { items: Item[]; className?: string }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className={cn("divide-y divide-line border-y border-line", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => {
                setOpen(isOpen ? null : i);
                if (!isOpen) track("faq_open", { q: item.q });
              }}
              aria-expanded={isOpen}
              className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left text-base font-medium text-ink transition-colors hover:text-sage"
            >
              <span>{item.q}</span>
              <span
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                  isOpen
                    ? "rotate-45 border-sage bg-sage/10 text-sage"
                    : "border-line text-stone",
                )}
              >
                <Plus size={15} weight="bold" />
              </span>
            </button>
            <div
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className="pb-5 text-sm leading-relaxed text-stone">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
