import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { Resend } from "resend";
import { stripe } from "@/lib/stripe";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const resendKey = process.env.RESEND_API_KEY;
const resend = resendKey ? new Resend(resendKey) : null;
const FROM = process.env.ORDER_FROM ?? "NAEUL <onboarding@resend.dev>";

/**
 * Webhook Stripe. Sur paiement réussi, envoie l'email de confirmation via Resend.
 * Configurer l'endpoint dans le dashboard Stripe : /api/webhooks/stripe
 * et renseigner STRIPE_WEBHOOK_SECRET.
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
    const name = session.customer_details?.name ?? "";
    const total = ((session.amount_total ?? 0) / 100).toFixed(2);

    if (email && resend) {
      try {
        await resend.emails.send({
          from: FROM,
          to: email,
          subject: "Votre commande NAEUL est confirmée",
          text: [
            `Bonjour ${name},`,
            "",
            "Merci pour votre commande chez NAEUL. Votre paiement a bien été reçu.",
            `Montant : ${total} €`,
            "",
            "Vous recevrez un email dès l'expédition de vos pads.",
            "",
            "Premier conseil : commencez un soir sur deux la première semaine, et n'oubliez pas le SPF 30 le matin.",
            "",
            "L'équipe NAEUL",
          ].join("\n"),
        });
      } catch (err) {
        console.error("[webhook] envoi email échoué:", err);
        // On renvoie 200 quand même : l'événement Stripe est traité, on ne veut pas de retry en boucle.
      }
    }
  }

  return NextResponse.json({ received: true });
}
