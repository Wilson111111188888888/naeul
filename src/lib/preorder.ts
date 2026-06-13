/**
 * Configuration PRÉ-COMMANDE (Édition Fondatrices).
 *
 * Tout le parcours d'achat payant est piloté par PREORDER_ENABLED. Tant que ce
 * flag n'est pas à "true", le site reste en mode waitlist (aucun paiement exposé).
 *
 * Pour passer en pré-commande LIVE, il faut (côté Vercel → Environment Variables) :
 *   - STRIPE_SECRET_KEY / STRIPE_PUBLIC_KEY (clés Stripe live, ajoutées par toi)
 *   - NEXT_PUBLIC_SHIPPING_DATE = la vraie date d'expédition (obligation légale)
 *   - NEXT_PUBLIC_PREORDER_ENABLED = true
 * puis redéployer.
 */

export const PREORDER_ENABLED = process.env.NEXT_PUBLIC_PREORDER_ENABLED === "true";

/** Remise Édition Fondatrices appliquée automatiquement (pas de code à taper). */
export const FOUNDERS_DISCOUNT = 0.15;

/** Limite réelle du premier batch (Selfnamed). Rareté honnête, pas de faux compteur. */
export const FOUNDERS_LIMIT = 200;

/**
 * Date d'expédition prévisionnelle — OBLIGATION LÉGALE de l'afficher avant toute
 * vente en pré-commande (Code de la consommation). À définir via la variable
 * d'environnement NEXT_PUBLIC_SHIPPING_DATE (ex. "15 septembre 2026").
 */
export const SHIPPING_DATE = process.env.NEXT_PUBLIC_SHIPPING_DATE ?? "à confirmer";

/** Prix Édition Fondatrices = -15 %, arrondi au centime inférieur. */
export function foundersPrice(price: number): number {
  return Math.floor(price * (1 - FOUNDERS_DISCOUNT) * 100) / 100;
}
