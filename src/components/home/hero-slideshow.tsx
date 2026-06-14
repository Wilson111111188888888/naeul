"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Diaporama hero : crossfade lent entre plusieurs vraies photos (effet « vidéo »
 * sans vidéo). Zoom Ken Burns sur chaque image. Respecte prefers-reduced-motion
 * (reste sur la 1re image, fixe).
 */
const SLIDES = [
  { src: "/images/naeul-hero.jpg", alt: "Sérum K-beauty naeul tenu en main dans une lumière dorée" },
  { src: "/images/naeul-application.jpg", alt: "Application du sérum naeul pour peau grasse" },
  {
    src: "/images/naeul-produit-lifestyle.jpg",
    alt: "Le sérum naeul à la niacinamide dans une ambiance végétale",
  },
];

export function HeroSlideshow() {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setI((p) => (p + 1) % SLIDES.length), 4500);
    return () => window.clearInterval(id);
  }, []);

  return (
    <>
      {SLIDES.map((s, idx) => (
        <Image
          key={s.src}
          src={s.src}
          alt={idx === 0 ? s.alt : ""}
          fill
          priority={idx === 0}
          quality={88}
          sizes="(max-width: 768px) 100vw, 50vw"
          className={cn(
            "animate-kenburns object-cover object-center transition-opacity duration-1000 ease-in-out",
            idx === i ? "opacity-100" : "opacity-0",
          )}
        />
      ))}
    </>
  );
}
