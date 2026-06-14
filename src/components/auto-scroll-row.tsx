"use client";

import { useEffect, useRef } from "react";

type Props = {
  as?: "div" | "ol" | "ul";
  className?: string;
  interval?: number;
  children: React.ReactNode;
};

/**
 * Rangée horizontale qui défile AUTOMATIQUEMENT (une carte à la fois) tout en
 * restant librement déroulable au doigt/souris. Au moindre geste, l'auto se met
 * en pause puis reprend après quelques secondes d'inactivité. Ne fait rien quand
 * le conteneur n'est pas scrollable (ex. grille sur desktop) ni en reduced-motion.
 */
export function AutoScrollRow({ as = "div", className, interval = 3000, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let paused = false;
    let resumeT = 0;
    const onInteract = () => {
      paused = true;
      window.clearTimeout(resumeT);
      resumeT = window.setTimeout(() => {
        paused = false;
      }, 6000);
    };
    el.addEventListener("pointerdown", onInteract, { passive: true });
    el.addEventListener("wheel", onInteract, { passive: true });
    el.addEventListener("touchmove", onInteract, { passive: true });

    const id = window.setInterval(() => {
      if (paused) return;
      if (el.scrollWidth <= el.clientWidth + 4) return; // pas scrollable (grille)
      const kids = el.children;
      const step =
        kids.length > 1
          ? (kids[1] as HTMLElement).offsetLeft - (kids[0] as HTMLElement).offsetLeft
          : el.clientWidth;
      const max = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft >= max - 4) el.scrollTo({ left: 0, behavior: "smooth" });
      else el.scrollBy({ left: step, behavior: "smooth" });
    }, interval);

    return () => {
      window.clearInterval(id);
      window.clearTimeout(resumeT);
      el.removeEventListener("pointerdown", onInteract);
      el.removeEventListener("wheel", onInteract);
      el.removeEventListener("touchmove", onInteract);
    };
  }, [interval]);

  const Tag = as;
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={className}>
      {children}
    </Tag>
  );
}
