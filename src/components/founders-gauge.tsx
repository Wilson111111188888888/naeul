import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { WAITLIST_COUNT } from "@/components/waitlist-count";
import { FOUNDERS_LIMIT } from "@/lib/preorder";
import { cn } from "@/lib/utils";

/**
 * Jauge de rareté compacte : un petit flacon qui se remplit (en rosé, la couleur
 * du produit) selon les places réservées sur le premier lot. Chiffres réels.
 * Crée le FOMO : « plus que X places ». Pensé pour fond sombre.
 *
 * Si `href` est fourni, toute la jauge devient cliquable (lift au survol +
 * repère « Réserver ma place ») et mène à la précommande / liste d'avant-première.
 */
export function FoundersGauge({ className, href }: { className?: string; href?: string }) {
  const reserved = Math.min(WAITLIST_COUNT, FOUNDERS_LIMIT);
  const remaining = Math.max(0, FOUNDERS_LIMIT - reserved);
  const pct = Math.round((reserved / FOUNDERS_LIMIT) * 100);

  const inner = (
    <>
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
        {href && (
          <span className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-cream/80 underline-offset-4 group-hover:text-cream group-hover:underline">
            Réserver ma place
            <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
          </span>
        )}
      </div>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        aria-label={`Réserver ma place — plus que ${remaining} places sur ${FOUNDERS_LIMIT}`}
        className={cn(
          "group flex items-center justify-center gap-4 rounded-2xl p-2 transition-transform hover:-translate-y-0.5",
          className,
        )}
      >
        {inner}
      </Link>
    );
  }

  return <div className={cn("flex items-center justify-center gap-4", className)}>{inner}</div>;
}
