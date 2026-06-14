"use client";

import { useState } from "react";
import { Plus, Check, X } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

export type AccordionRow = { title: string; items: string[]; tone: "positive" | "negative" };

/**
 * Accordéon de listes (titre → liste à puces ✓/✗). Compacte plusieurs blocs de
 * type « ce que ça fait / pour qui » en rangées repliables. Une seule ouverte à la
 * fois ; le contenu reste dans le DOM (SEO). Même mécanique que la FAQ.
 */
export function ListAccordion({
  rows,
  className,
  defaultOpen = 0,
}: {
  rows: AccordionRow[];
  className?: string;
  defaultOpen?: number | null;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <div className={cn("divide-y divide-line border-y border-line", className)}>
      {rows.map((row, i) => {
        const isOpen = open === i;
        const Icon = row.tone === "positive" ? Check : X;
        return (
          <div key={row.title}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left text-base font-medium text-ink transition-colors hover:text-sage"
            >
              <span>{row.title}</span>
              <span
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                  isOpen ? "rotate-45 border-sage bg-sage/10 text-sage" : "border-line text-stone",
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
                <ul className="space-y-2.5 pb-5">
                  {row.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink/85">
                      <Icon
                        size={17}
                        weight="bold"
                        className={cn(
                          "mt-0.5 shrink-0",
                          row.tone === "positive" ? "text-sage" : "text-terracotta",
                        )}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
