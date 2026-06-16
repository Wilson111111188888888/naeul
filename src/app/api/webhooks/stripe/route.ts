import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { getVariant, HERO_PRODUCT } from "@/lib/products";
import { SHIPPING_DATE } from "@/lib/preorder";
import { sendOrderConfirmation } from "@/lib/order-email";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

/**
 * Webhook Stripe. Sur paiement réussi (checkout.session.completed), envoie l'email
 * de confirmation de pré-commande via Resend.
 * Dashboard Stripe → Developers → Webhooks → endpoint = /api/webhooks/stripe,
 * événement checkout.session.completed, puis renseigner STRIPE_WEBHOOK_SECRET.
 */
export async function POST(request: Request) {
  if (!stripe || !webhookSecret) {
    return NextResponse.json({ error: "Webhook non configuré." }, { status: 503 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Signature manquante." }, { status: 400 });
  }

  const payload = await request.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (err) {
    console.error("[webhook] signature invalide:", err);
    return NextResponse.json({ error: "Signature invalide." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_details?.email;
    const fullName = session.customer_details?.name ?? "";
    const firstName = fullName.split(" ")[0] || "";
    const total = ((session.amount_total ?? 0) / 100).toFixed(2).replace(".", ",");

    const meta = session.metadata ?? {};
    const shippingDate = meta.shippingDate || SHIPPING_DATE;
    const resolved = meta.variantId ? getVariant(meta.variantId) : undefined;
    const lineLabel = resolved
      ? `${resolved.variant.label} — ${resolved.product.name} (Édition Fondatrices)`
      : `${HERO_PRODUCT.name} (Édition Fondatrices)`;

    if (email) {
      await sendOrderConfirmation({ email, firstName, lineLabel, total, shippingDate });
    }
  }

  return NextResponse.json({ received: true });
}
