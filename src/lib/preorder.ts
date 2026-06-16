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

/** Limite réelle du premier lot (Selfnamed). Rareté honnête, pas de faux compteur. */
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

/**
 * PAIEMENT EN 3× (Alma) — option « payer en 3 fois ».
 *
 * Piloté par NEXT_PUBLIC_ALMA_ENABLED. Indépendant de Stripe : le client peut
 * choisir 1× (Stripe) ou 3× (Alma). Tant que le flag n'est pas "true", aucune
 * mention 3× n'apparaît.
 *
 * Pour activer (côté Vercel → Environment Variables) :
 *   - ALMA_API_KEY = clé API Alma (sk_test_… en sandbox, sk_live_… en prod)
 *   - NEXT_PUBLIC_ALMA_ENABLED = true
 * puis redéployer. Le compte Alma se crée sur getalma.com (étape à ta charge).
 */
export const ALMA_ENABLED = process.env.NEXT_PUBLIC_ALMA_ENABLED === "true";

/** Nombre d'échéances pour le paiement fractionné (3×). */
export const ALMA_INSTALLMENTS = 3;

/**
 * Montant d'une échéance affiché à titre indicatif (total / 3, arrondi au
 * centime supérieur). Le calcul exact des échéances reste fait par Alma.
 */
export function installmentAmount(total: number): number {
  return Math.ceil((total / ALMA_INSTALLMENTS) * 100) / 100;
}
