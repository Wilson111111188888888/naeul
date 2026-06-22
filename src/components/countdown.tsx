"use client";

import { useEffect, useState } from "react";
import { Hourglass } from "@phosphor-icons/react";
import { LAUNCH_DATE } from "@/lib/preorder";
import { cn } from "@/lib/utils";

/**
 * Compte à rebours honnête jusqu'au lancement (date réelle, LAUNCH_DATE).
 * Affiche les jours restants. Rendu seulement côté client (évite le mismatch
 * d'hydratation lié à la date). `tone` adapte la couleur au fond.
 */
export function Countdown({ tone = "light", className }: { tone?: "light" | "onDark"; className?: string }) {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    const target = new Date(LAUNCH_DATE).getTime();
    const update = () => {
      const diff = target - Date.now();
      setDays(diff > 0 ? Math.ceil(diff / 86_400_000) : 0);
    };
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  if (days === null) return null;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium",
        tone === "onDark" ? "border-cream/25 text-cream/90" : "border-line text-stone",
        className,
      )}
    >
      <Hourglass size={14} className={tone === "onDark" ? "text-cream/80" : "text-sage"} />
      {days > 0 ? (
        <>
          Lancement dans <strong className={tone === "onDark" ? "text-cream" : "text-ink"}>{days} jours</strong>
        </>
      ) : (
        <strong className={tone === "onDark" ? "text-cream" : "text-ink"}>C&apos;est lancé</strong>
      )}
    </span>
  );
}
