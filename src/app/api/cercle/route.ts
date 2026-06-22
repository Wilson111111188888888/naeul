import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { CERCLE_ENABLED, CERCLE_PRICE } from "@/lib/membership";

/**
 * Abonnement « Le Cercle » (membership 49 €/an) → Stripe Checkout en mode
 * subscription, prix récurrent annuel inline. Actif si NEXT_PUBLIC_CERCLE_ENABLED=true
 * et STRIPE_SECRET_KEY configurée.
 */
export async function POST(request: Request) {
  if (!CERCLE_ENABLED) {
    return NextResponse.json({ error: "Le Cercle n'est pas encore ouvert." }, { status: 503 });
  }
  if (!stripe) {
    return NextResponse.json(
      { error: "Paiement non configuré. Ajoute STRIPE_SECRET_KEY." },
      { status: 503 },
    );
  }

  const origin =
    request.headers.get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price_data: {
            currency: "eur",
            unit_amount: Math.round(CERCLE_PRICE * 100),
            recurring: { interval: "year", interval_count: 1 },
            product_data: {
              name: "Le Cercle naeul — membership annuel",
              description:
                "Accès à une experte peau grasse, suivi photo trimestriel, -15 % permanent, priorité sur les nouveautés.",
            },
          },
          quantity: 1,
        },
      ],
      locale: "fr",
      billing_address_collection: "required",
      metadata: { membership: "cercle" },
      success_url: `${origin}/commande/confirmee?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cercle`,
    });
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[cercle] Stripe error:", err);
    return NextResponse.json(
      { error: "Impossible de créer l'abonnement." },
      { status: 500 },
    );
  }
}
