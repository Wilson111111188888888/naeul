import { cn } from "@/lib/utils";

const DOTS = [
  "var(--color-sage)",
  "var(--color-terracotta)",
  "var(--color-rose)",
  "var(--color-stone)",
];

/**
 * Preuve sociale honnête, SANS chiffre annoncé (évite tout risque d'allégation
 * trompeuse tant qu'il n'y a pas de compteur réel relié à Loops).
 */
export function WaitlistCount({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-3", className)}>
      <div className="flex -space-x-2" aria-hidden="true">
        {DOTS.map((c, i) => (
          <span
            key={i}
            className="inline-block h-7 w-7 rounded-full border-2 border-sand"
            style={{ backgroundColor: c }}
          />
        ))}
      </div>
      <p className="text-sm text-stone">Les premières inscrites attendent déjà le lancement.</p>
    </div>
  );
}
