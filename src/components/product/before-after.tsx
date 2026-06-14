"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowsLeftRight } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const PAIRS = [
  {
    label: "Grain & pores",
    avant: "/images/naeul-resultat-1-avant.jpg",
    apres: "/images/naeul-resultat-1-apres.jpg",
    alt: "Joue : grain de peau et pores avant / après 4 semaines avec le sérum naeul",
  },
  {
    label: "Teint net",
    avant: "/images/naeul-resultat-2-avant.jpg",
    apres: "/images/naeul-resultat-2-apres.jpg",
    alt: "Peau mate : teint plus net avant / après 4 semaines avec le sérum naeul",
  },
];

/**
 * Avant/après interactif : on glisse la poignée pour révéler la transformation.
 * Base = après (droite), recouvert par l'avant (gauche) découpé jusqu'à la poignée.
 */
export function BeforeAfter() {
  const [active, setActive] = useState(0);
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  function moveTo(clientX: number) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)));
  }

  const pair = PAIRS[active];

  return (
    <div className="mx-auto mt-10 max-w-md">
      <div
        ref={ref}
        onPointerDown={(e) => {
          dragging.current = true;
          ref.current?.setPointerCapture(e.pointerId);
          moveTo(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && moveTo(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
        className="relative aspect-[772/855] w-full touch-none select-none overflow-hidden rounded-2xl border border-line"
        role="slider"
        aria-label="Comparateur avant / après — glisse pour révéler"
        aria-valuenow={Math.round(pos)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        {/* Base : après */}
        <Image
          src={pair.apres}
          alt={pair.alt}
          fill
          sizes="(max-width: 768px) 100vw, 448px"
          className="object-cover"
          draggable={false}
        />
        {/* Recouvrement : avant, découpé de la gauche jusqu'à la poignée */}
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Image
            src={pair.avant}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 448px"
            className="object-cover"
            draggable={false}
          />
        </div>

        {/* Étiquettes */}
        <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-ink/55 px-2.5 py-1 text-[0.6rem] uppercase tracking-wider text-cream backdrop-blur-sm">
          Avant
        </span>
        <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-ink/55 px-2.5 py-1 text-[0.6rem] uppercase tracking-wider text-cream backdrop-blur-sm">
          Après
        </span>

        {/* Poignée */}
        <div
          className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-cream/90"
          style={{ left: `${pos}%` }}
        >
          <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-cream text-ink shadow-lg">
            <ArrowsLeftRight size={18} />
          </span>
        </div>
      </div>

      {/* Sélecteur de résultat — onglets étiquetés (montre clairement qu'il y a 2 résultats) */}
      {PAIRS.length > 1 && (
        <div className="mt-5">
          <p className="mb-2.5 text-center text-[0.7rem] uppercase tracking-[0.2em] text-stone/70">
            {PAIRS.length} résultats · choisis
          </p>
          <div className="flex justify-center gap-2">
            {PAIRS.map((p, i) => (
              <button
                key={p.label}
                type="button"
                onClick={() => {
                  setActive(i);
                  setPos(50);
                }}
                aria-pressed={i === active}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-xs font-medium transition-colors",
                  i === active
                    ? "border-sage bg-sage text-cream"
                    : "border-line bg-cream text-stone hover:border-sage/50",
                )}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
