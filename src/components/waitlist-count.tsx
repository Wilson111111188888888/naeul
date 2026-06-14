import { cn } from "@/lib/utils";
import { CountUp } from "@/components/count-up";

/**
 * Nombre réel d'inscrits sur la liste d'avant-première.
 * ⚠️ À mettre à jour à la main avec le vrai chiffre (ne jamais gonfler).
 */
export const WAITLIST_COUNT = 108;

const DOTS = [
  "var(--color-sage)",
  "var(--color-terracotta)",
  "var(--color-rose)",
  "var(--color-stone)",
];

/** Preuve sociale : « 108 inscrites attendent déjà le lancement » (chiffre réel). */
export function WaitlistCount({
  className,
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "onDark";
}) {
  const onDark = tone === "onDark";
  return (
    <div className={cn("flex items-center justify-center gap-3", className)}>
      <div className="flex -space-x-2" aria-hidden="true">
        {DOTS.map((c, i) => (
          <span
            key={i}
            className={cn(
              "inline-block h-7 w-7 rounded-full border-2",
              onDark ? "border-ink/30" : "border-sand",
            )}
            style={{ backgroundColor: c }}
          />
        ))}
      </div>
      <p className={cn("text-sm", onDark ? "text-cream/85" : "text-stone")}>
        <CountUp
          to={WAITLIST_COUNT}
          className={cn("font-medium", onDark ? "text-cream" : "text-ink")}
        />{" "}
        inscrites attendent déjà le lancement
      </p>
    </div>
  );
}
