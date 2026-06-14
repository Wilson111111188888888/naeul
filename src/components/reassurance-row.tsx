import { ShieldCheck, SealCheck, Lock, Truck } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";

/**
 * Rangée de réassurance à placer près des CTA. Tout est factuel (garantie 30j,
 * certifications réelles, prestataire de paiement, transporteur) — aucun faux.
 * `tone="onAccent"` pour fond sombre/sauge, "light" pour fond clair.
 */
const ITEMS = [
  { Icon: ShieldCheck, label: "Garantie 30 jours" },
  { Icon: SealCheck, label: "Vegan · ECOCERT" },
  { Icon: Lock, label: "Paiement sécurisé Stripe" },
  { Icon: Truck, label: "Livraison Mondial Relay" },
];

export function ReassuranceRow({
  tone = "light",
  className,
}: {
  tone?: "light" | "onAccent";
  className?: string;
}) {
  return (
    <ul className={cn("grid grid-cols-2 gap-x-4 gap-y-2.5 sm:grid-cols-4", className)}>
      {ITEMS.map(({ Icon, label }) => (
        <li
          key={label}
          className={cn(
            "flex items-center gap-2 text-xs",
            tone === "onAccent" ? "text-cream/80" : "text-stone",
          )}
        >
          <Icon
            size={16}
            className={cn("shrink-0", tone === "onAccent" ? "text-cream" : "text-sage")}
          />
          {label}
        </li>
      ))}
    </ul>
  );
}
