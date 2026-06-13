import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getVariant } from "@/lib/products";
import { PREORDER_ENABLED, foundersPrice, SHIPPING_DATE } from "@/lib/preorder";

/**
 * Crée une session Stripe Checkout pour une pré-commande (Édition Fondatrices).
 * Prix Founders (-15 %), livraison offerte pour les fondatrices, date d'expédition
 * annoncée. Débit immédiat (mode "payment").
 */
export async function POST(request: Request) {
  if (!PREORDER_ENABLED) {
    return NextResponse.json({ error: "La pré-commande n'est pas encore ouverte." }, { status: 503 });
  }
  if (!stripe) {
    return NextResponse.json(
      { error: "Paiement non configuré. Ajoute STRIPE_SECRET_KEY." },
      { status: 503 },
    );
  }

  let variantId: string;
  try {
    const body = await request.json();
    variantId = body.variantId;
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const resolved = getVariant(variantId);
  if (!resolved) {
    return NextResponse.json({ error: "Format introuvable." }, { status: 400 });
  }
  const { product, variant } = resolved;
  const price = foundersPrice(variant.price);

  const origin =
    request.headers.get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "eur",
            unit_amount: Math.round(price * 100),
            product_data: {
              name: `${product.name} — ${variant.label} · Édition Fondatrices`,
              description: `Pré-commande — expédition prévue ${SHIPPING_DATE}. ${product.format}, ${product.volume}.`,
            },
          },
          quantity: 1,
        },
      ],
      locale: "fr",
      billing_address_collection: "required",
      shipping_address_collection: { allowed_countries: ["FR", "BE", "LU", "MC"] },
      phone_number_collection: { enabled: true },
      metadata: {
        preorder: "true",
        variantId: variant.id,
        flacons: String(variant.flacons),
        shippingDate: SHIPPING_DATE,
      },
      success_url: `${origin}/commande/confirmee?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/le-produit`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[preorder] Stripe error:", err);
    return NextResponse.json(
      { error: "Impossible de créer la session de paiement." },
      { status: 500 },
    );
  }
}
