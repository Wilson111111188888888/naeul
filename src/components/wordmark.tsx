import { cn } from "@/lib/utils";

/**
 * Wordmark NAEUL — « naeul » en Fraunces italic editorial + 나을 en dessous.
 * Reproduit le logo livré ; vivant (scalable, thémable). Pour remplacer par un
 * fichier, déposer le SVG dans /public et l'importer ici.
 */
export function Wordmark({
  className,
  hangul = true,
  hangulClassName,
}: {
  className?: string;
  hangul?: boolean;
  hangulClassName?: string;
}) {
  return (
    <span className="inline-flex flex-col items-center leading-none">
      <span className={cn("font-serif italic font-medium lowercase text-ink", className)}>
        naeul
      </span>
      {hangul && (
        <span
          className={cn(
            "mt-1 tracking-[0.35em] text-stone",
            hangulClassName ?? "text-[0.5em]",
          )}
        >
          나을
        </span>
      )}
    </span>
  );
}
