import { cn } from "@/lib/utils";

/**
 * Défilement texte en boucle, premium et sans couture (contenu dupliqué → -50%).
 * - Fondu dégradé sur les bords (mask) → le texte apparaît/disparaît en douceur,
 *   quel que soit le fond (le mask rend transparent, il ne repose pas sur une couleur).
 * - Séparateurs ✦ terracotta entre les éléments.
 * - Pause au survol, vitesse + sens réglables, désactivé en reduced-motion (via CSS).
 *
 * `className`   : la bande (fond, padding, couleur de texte héritée par les items).
 * `itemClassName` : style typographique des éléments (taille, serif/italic, casse…).
 */
export function Marquee({
  items,
  className,
  itemClassName,
  separator = "✦",
  separatorClassName,
  duration = 38,
  reverse = false,
}: {
  items: React.ReactNode[];
  className?: string;
  itemClassName?: string;
  separator?: React.ReactNode;
  separatorClassName?: string;
  duration?: number;
  reverse?: boolean;
}) {
  return (
    <div
      className={cn("group relative flex overflow-hidden", className)}
      style={{
        WebkitMaskImage:
          "linear-gradient(to right, transparent, #000 7%, #000 93%, transparent)",
        maskImage:
          "linear-gradient(to right, transparent, #000 7%, #000 93%, transparent)",
      }}
    >
      <div
        className="flex w-max shrink-0 animate-marquee items-center whitespace-nowrap will-change-transform group-hover:[animation-play-state:paused] motion-reduce:animate-none"
        style={{ animationDuration: `${duration}s`, animationDirection: reverse ? "reverse" : "normal" }}
      >
        {[0, 1].map((group) => (
          <ul key={group} aria-hidden={group === 1} className="flex shrink-0 items-center">
            {items.map((it, i) => (
              <li key={i} className="flex items-center">
                <span className={cn("px-8", itemClassName)}>{it}</span>
                <span
                  aria-hidden
                  className={cn("select-none text-terracotta/80", separatorClassName)}
                >
                  {separator}
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
