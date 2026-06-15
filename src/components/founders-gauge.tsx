import { WAITLIST_COUNT } from "@/components/waitlist-count";
import { FOUNDERS_LIMIT } from "@/lib/preorder";
import { cn } from "@/lib/utils";

/**
 * « Bocal » de rareté : un vase qui se remplit (en rosé, la couleur du produit)
 * selon le nombre de places déjà réservées sur le premier lot de 200.
 * Chiffres réels (WAITLIST_COUNT / FOUNDERS_LIMIT) — aucun faux. Crée le FOMO :
 * « plus que X places ».
 */
export function FoundersGauge({ className }: { className?: string }) {
  const reserved = Math.min(WAITLIST_COUNT, FOUNDERS_LIMIT);
  const remaining = Math.max(0, FOUNDERS_LIMIT - reserved);
  const pct = Math.round((reserved / FOUNDERS_LIMIT) * 100);

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div
        className="relative h-44 w-28 overflow-hidden rounded-[1.75rem] border-2 border-rose/50 bg-cream"
        role="img"
        aria-label={`${reserved} places réservées sur ${FOUNDERS_LIMIT}`}
      >
        {/* Remplissage rosé (couleur produit) */}
        <div
          className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-rose to-rose/75"
          style={{ height: `${pct}%` }}
        >
          <span className="absolute inset-x-0 top-0 h-1.5 bg-cream/30" />
        </div>
        {/* Compteur */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-serif text-4xl leading-none text-ink">{reserved}</span>
          <span className="mt-1 text-[0.65rem] uppercase tracking-[0.2em] text-stone">
            / {FOUNDERS_LIMIT}
          </span>
        </div>
      </div>
      <p className="mt-4 text-sm text-cream/85">
        <strong className="font-medium text-rose">Plus que {remaining} places</strong> sur le premier lot
      </p>
    </div>
  );
}
