"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Result = { src: string; alt: string };

/**
 * Carrousel des avant/après : défilement automatique (une image à la fois) +
 * puces de navigation cliquables. S'arrête à l'interaction, respecte
 * prefers-reduced-motion.
 */
export function ResultsCarousel({ items }: { items: Result[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  function goTo(i: number) {
    const el = ref.current;
    if (!el) return;
    const card = el.children[i] as HTMLElement | undefined;
    if (card) el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: "smooth" });
  }

  useEffect(() => {
    const el = ref.current;
    if (!el || items.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let paused = false;
    const stop = () => {
      paused = true;
    };
    el.addEventListener("pointerdown", stop, { passive: true });
    el.addEventListener("touchmove", stop, { passive: true });

    const id = window.setInterval(() => {
      if (paused) return;
      setActive((a) => {
        const next = (a + 1) % items.length;
        const card = el.children[next] as HTMLElement | undefined;
        if (card) el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: "smooth" });
        return next;
      });
    }, 4000);

    return () => {
      window.clearInterval(id);
      el.removeEventListener("pointerdown", stop);
      el.removeEventListener("touchmove", stop);
    };
  }, [items.length]);

  function onScroll() {
    const el = ref.current;
    if (!el) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    if (i !== active) setActive(Math.min(items.length - 1, Math.max(0, i)));
  }

  return (
    <div className="mx-auto mt-10 max-w-3xl">
      <div
        ref={ref}
        onScroll={onScroll}
        className="flex snap-x snap-mandatory overflow-x-auto scrollbar-hide"
      >
        {items.map((r) => (
          <figure key={r.src} className="min-w-full shrink-0 snap-center px-0.5">
            <div className="overflow-hidden rounded-2xl border border-line">
              <Image
                src={r.src}
                alt={r.alt}
                width={1540}
                height={1027}
                sizes="(max-width: 768px) 100vw, 768px"
                className="h-full w-full object-cover"
              />
            </div>
          </figure>
        ))}
      </div>

      <div className="mt-5 flex justify-center gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              setActive(i);
              goTo(i);
            }}
            aria-label={`Voir le résultat ${i + 1}`}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              i === active ? "w-6 bg-sage" : "w-2 bg-line hover:bg-stone/40",
            )}
          />
        ))}
      </div>
    </div>
  );
}
