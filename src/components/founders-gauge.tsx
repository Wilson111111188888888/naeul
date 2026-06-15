import { WAITLIST_COUNT } from "@/components/waitlist-count";
import { FOUNDERS_LIMIT } from "@/lib/preorder";
import { cn } from "@/lib/utils";

/**
 * Jauge de rareté compacte : un petit flacon qui se remplit (en rosé, la couleur
 * du produit) selon les places réservées sur le premier lot. Chiffres réels.
 * Crée le FOMO : « plus que X places ». Pensé pour fond sombre.
 */
export function FoundersGauge({ className }: { className?: string }) {
  const reserved = Math.min(WAITLIST_COUNT, FOUNDERS_LIMIT);
  const remaining = Math.max(0, FOUNDERS_LIMIT - reserved);
  const pct = Math.round((reserved / FOUNDERS_LIMIT) * 100);

  return (
    <div className={cn("flex items-center justify-center gap-4", className)}>
      <div
        className="relative h-20 w-12 shrink-0 overflow-hidden rounded-xl border border-rose/50 bg-cream/95"
        role="img"
        aria-label={`${reserved} places réservées sur ${FOUNDERS_LIMIT}`}
      >
        <div
          className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-rose to-rose/70"
          style={{ height: `${pct}%` }}
        >
          <span className="absolute inset-x-0 top-0 h-px bg-cream/50" />
        </div>
      </div>
      <div className="text-left">
        <p className="font-serif text-2xl leading-none text-cream">
          {reserved}
          <span className="ml-1 text-base text-cream/45">/ {FOUNDERS_LIMIT}</span>
        </p>
        <p className="mt-1.5 text-sm font-medium text-rose">Plus que {remaining} places</p>
      </div>
    </div>
  );
}
