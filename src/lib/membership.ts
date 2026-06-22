/**
 * RÉCURRENCE (Degré 4) — deux briques, chacune derrière un flag, inactives tant
 * que Stripe n'est pas configuré (STRIPE_SECRET_KEY) et le flag mis à "true".
 *
 *   1. REFILL — abonnement au sérum : -10 %, livré tous les 2 mois.
 *   2. LE CERCLE — membership 49 €/an (service, pas un produit).
 *
 * Pas besoin de créer des Price IDs côté Stripe : on utilise des prix récurrents
 * inline (price_data + recurring) en mode Checkout "subscription".
 */

/** Abonnement refill du sérum (toggle sur la page produit). */
export const SUBSCRIPTION_ENABLED = process.env.NEXT_PUBLIC_SUBSCRIPTION_ENABLED === "true";
/** Remise abonnement refill. */
export const REFILL_DISCOUNT = 0.1;
/** Cadence de livraison du refill, en mois (durée réelle d'un flacon). */
export const REFILL_INTERVAL_MONTHS = 2;

/** Prix refill = -10 % sur le prix de base, arrondi au centime inférieur. */
export function refillPrice(price: number): number {
  return Math.floor(price * (1 - REFILL_DISCOUNT) * 100) / 100;
}

/** Membership « Le Cercle » (page /cercle). */
export const CERCLE_ENABLED = process.env.NEXT_PUBLIC_CERCLE_ENABLED === "true";
/** Prix annuel du membership, en euros. */
export const CERCLE_PRICE = 49;

/** Avantages du Cercle — service réel (pas un club marketing). */
export const CERCLE_PERKS: { title: string; detail: string }[] = [
  {
    title: "Une experte à ton écoute",
    detail: "Une question par mois à une experte peau grasse, réponse sous 48 h.",
  },
  {
    title: "Suivi photo trimestriel",
    detail: "Tu envoies tes photos, on te renvoie des ajustements de routine personnalisés.",
  },
  {
    title: "-15 % en permanence",
    detail: "Sur le sérum et tous les prochains soins, toute l'année.",
  },
  {
    title: "Priorité sur les nouveautés",
    detail: "Accès en avant-première aux nouveaux produits et aux éditions limitées.",
  },
];
