import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY;

/**
 * Client Stripe serveur. `null` si la clé n'est pas encore configurée
 * (permet au dev de tourner sans bloquer ; le checkout renvoie alors une erreur claire).
 */
export const stripe = key ? new Stripe(key) : null;
