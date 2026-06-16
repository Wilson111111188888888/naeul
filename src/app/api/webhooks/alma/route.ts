import { NextResponse } from "next/server";
import { getAlmaPayment, almaConfigured } from "@/lib/alma";
import { getVariant, HERO_PRODUCT } from "@/lib/products";
import { SHIPPING_DATE } from "@/lib/preorder";
import { sendOrderConfirmation } from "@/lib/order-email";

/**
 * Webhook (IPN) Alma. À paramétrer dans le dashboard Alma → Webhooks, URL =
 * /api/webhooks/alma. Alma POST l'id du paiement ; on le re-récupère via l'API
 * (source de vérité) et, s'il est "paid", on envoie l'email de confirmation.
 */
export async function POST(request: Request) {
  if (!almaConfigured) {
    return NextResponse.json({ error: "Webhook Alma non configuré." }, { status: 503 });
  }

  let paymentId: string | undefined;
  try {
    const body = await request.json();
    // Alma envoie selon les cas `payment_id` ou `id`.
    paymentId = body.payment_id ?? body.id;
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }
  if (!paymentId) {
    return NextResponse.json({ error: "payment_id manquant." }, { status: 400 });
  }

  try {
    const payment = await getAlmaPayment(paymentId);
    if (payment.state === "paid") {
      const email = payment.customer?.email;
      const firstName = payment.customer?.first_name ?? "";
      const total = (payment.purchase_amount / 100).toFixed(2).replace(".", ",");

      const meta = payment.custom_data ?? {};
      const resolved = meta.variantId ? getVariant(meta.variantId) : undefined;
      const lineLabel = resolved
        ? `${resolved.variant.label} — ${resolved.product.name} (Édition Fondatrices)`
        : `${HERO_PRODUCT.name} (Édition Fondatrices)`;

      if (email) {
        await sendOrderConfirmation({
          email,
          firstName,
          lineLabel,
          total,
          shippingDate: SHIPPING_DATE,
          paymentNote: "payé en 3× avec Alma",
        });
      }
    }
  } catch (err) {
    console.error("[webhook/alma] erreur:", err);
    // 200 quand même : on évite que Alma rejoue l'IPN en boucle.
  }

  return NextResponse.json({ received: true });
}
