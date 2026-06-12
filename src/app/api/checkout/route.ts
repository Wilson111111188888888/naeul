import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { getVariant } from "@/lib/products";
import type { CartLine } from "@/lib/store/cart";

export async function POST(request: Request) {
  if (!stripe) {
    return NextResponse.json(
      { error: "Paiement non configuré. Ajoutez STRIPE_SECRET_KEY dans .env.local." },
      { status: 503 },
    );
  }

  let lines: CartLine[];
  try {
    const body = await request.json();
    lines = body.lines;
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  if (!Array.isArray(lines) || lines.length === 0) {
    return NextResponse.json({ error: "Le panier est vide." }, { status: 400 });
  }

  const lineItems: { price_data: Stripe.Checkout.SessionCreateParams.LineItem["price_data"]; quantity: number }[] = [];

  for (const line of lines) {
    const resolved = getVariant(line.variantId);
    if (!resolved) continue;
    const { product, variant } = resolved;
    const quantity = Math.max(1, Math.min(10, Math.floor(line.quantity)));
    lineItems.push({
      price_data: {
        currency: "eur",
        unit_amount: Math.round(variant.price * 100),
        product_data: {
          name: `${product.name} — ${variant.label}`,
          description: product.format,
        },
      },
      quantity,
    });
  }

  if (lineItems.length === 0) {
    return NextResponse.json({ error: "Aucun article valide dans le panier." }, { status: 400 });
  }

  const origin =
    request.headers.get("origin") ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    "http://localhost:3001";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      locale: "fr",
      billing_address_collection: "required",
      shipping_address_collection: { allowed_countries: ["FR", "BE", "LU", "MC"] },
      phone_number_collection: { enabled: true },
      success_url: `${origin}/commande/confirmee?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/panier`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[checkout] Stripe error:", err);
    return NextResponse.json(
      { error: "Impossible de créer la session de paiement." },
      { status: 500 },
    );
  }
}
