"use client";

import { useEffect, useRef } from "react";
import { Drop, Sparkle, Leaf, FlowerLotus, ShieldCheck, Sun } from "@phosphor-icons/react";

const ICONS = [Drop, Sparkle, Leaf, FlowerLotus, ShieldCheck, Sun];

type Active = { name: string; role: string };

/**
 * Carrousel d'actifs. Sur mobile, il défile tout seul (lentement) pour que la
 * cliente n'ait pas à scroller — et reste libre de défiler à la main : dès
 * qu'elle interagit, le défilement automatique s'arrête. Sur desktop, c'est une
 * grille statique. Respecte prefers-reduced-motion.
 */
export function ActivesCarousel({ actives }: { actives: Active[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isDesktop = window.matchMedia("(min-width: 768px)");
    if (reduced) return;

    let paused = false;
    const stop = () => {
      paused = true;
    };
    // Toute interaction utilisateur coupe le défilement automatique.
    el.addEventListener("pointerdown", stop, { passive: true });
    el.addEventListener("wheel", stop, { passive: true });
    el.addEventListener("touchmove", stop, { passive: true });

    const id = window.setInterval(() => {
      if (paused || isDesktop.matches) return;
      const max = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft >= max - 8) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: Math.round(el.clientWidth * 0.82), behavior: "smooth" });
      }
    }, 2800);

    return () => {
      window.clearInterval(id);
      el.removeEventListener("pointerdown", stop);
      el.removeEventListener("wheel", stop);
      el.removeEventListener("touchmove", stop);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 scrollbar-hide md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:pb-0"
    >
      {actives.map((active, i) => {
        const Icon = ICONS[i % ICONS.length];
        return (
          <div
            key={active.name}
            className="flex min-w-[78%] shrink-0 snap-start flex-col rounded-2xl border border-line bg-sand p-6 transition-colors hover:border-sage/40 sm:min-w-[46%] md:min-w-0"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sage/10 text-sage">
              <Icon size={20} />
            </span>
            <h3 className="mt-4 font-serif text-lg">{active.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-stone">{active.role}</p>
          </div>
        );
      })}
    </div>
  );
}
