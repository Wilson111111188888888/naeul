import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Grille 2×2 de portraits lifestyle (le sérum en situation, carnations variées).
 * Images plein cadre (aspect carré) → net sur mobile. Imagerie neutre, pas d'avis.
 * Réutilisable (home, page produit). Gérer l'affichage conditionnel côté appelant
 * (hasImage), comme les autres bandes lifestyle.
 */
const PHOTOS = [
  { src: "/images/naeul-lifestyle-1.jpg", alt: "Le sérum naeul tenu près du visage, peau mate lumineuse" },
  { src: "/images/naeul-lifestyle-2.jpg", alt: "Le sérum naeul en main, peau claire au fini frais" },
  { src: "/images/naeul-lifestyle-3.jpg", alt: "Le sérum naeul présenté près de la joue, peau nette" },
  { src: "/images/naeul-lifestyle-4.jpg", alt: "Application du sérum naeul du bout des doigts, peau métissée" },
];

export function LifestyleGrid({ className }: { className?: string }) {
  return (
    <div className={cn("grid grid-cols-2 gap-2 sm:gap-3", className)}>
      {PHOTOS.map((p) => (
        <div key={p.src} className="overflow-hidden rounded-xl border border-line">
          <Image
            src={p.src}
            alt={p.alt}
            width={627}
            height={627}
            sizes="(max-width: 768px) 45vw, 320px"
            className="aspect-square h-full w-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}
