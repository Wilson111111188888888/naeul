"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Rangée déroulable MANUELLEMENT (pas d'auto-défilement) avec des points
 * de pagination cliquables sur mobile — pour que l'utilisatrice voie qu'il y a
 * d'autres cartes et navigue d'elle-même. Les points héritent de la couleur de
 * texte courante (bg-current), donc utilisable sur fond clair comme sombre.
 * Quand le conteneur n'est pas déroulable (grille desktop), les points disparaissent.
 */
export function SwipeCarousel({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [scrollable, setScrollable] = useState(false);
  const count = Array.isArray(children) ? children.length : 1;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const kids = el.children;
      if (kids.length < 2) return;
      const step =
        (kids[1] as HTMLElement).offsetLeft - (kids[0] as HTMLElement).offsetLeft;
      setActive(step > 0 ? Math.round(el.scrollLeft / step) : 0);
      setScrollable(el.scrollWidth > el.clientWidth + 4);
    };
    // Pas d'appel synchrone ici : le ResizeObserver déclenche update() au montage.
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, []);

  function goTo(i: number) {
    const el = ref.current;
    if (!el) return;
    const kids = el.children;
    const step =
      kids.length > 1
        ? (kids[1] as HTMLElement).offsetLeft - (kids[0] as HTMLElement).offsetLeft
        : el.clientWidth;
    el.scrollTo({ left: step * i, behavior: "smooth" });
  }

  return (
    <div>
      <ul ref={ref} className={className}>
        {children}
      </ul>
      {count > 1 && scrollable && (
        <div className="mt-5 flex justify-center gap-2 sm:hidden">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Aller à la carte ${i + 1}`}
              aria-current={i === active}
              className={cn(
                "h-1.5 rounded-full bg-current transition-all duration-300",
                i === active ? "w-5 opacity-100" : "w-1.5 opacity-40",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
