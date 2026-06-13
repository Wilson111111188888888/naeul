import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { Resend } from "resend";
import { stripe } from "@/lib/stripe";
import { getVariant, HERO_PRODUCT } from "@/lib/products";
import { SHIPPING_DATE } from "@/lib/preorder";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const resendKey = process.env.RESEND_API_KEY;
const resend = resendKey ? new Resend(resendKey) : null;
const FROM = process.env.ORDER_FROM ?? "naeul <onboarding@resend.dev>";

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

    if (email && resend) {
      try {
        await resend.emails.send({
          from: FROM,
          to: email,
          replyTo: process.env.CONTACT_TO ?? "hello@naeul.com",
          subject: "Bienvenue chez les fondatrices de naeul",
          text: confirmationText({ firstName, lineLabel, total, shippingDate }),
          html: confirmationHtml({ firstName, lineLabel, total, shippingDate }),
        });
      } catch (err) {
        console.error("[webhook] envoi email échoué:", err);
        // On renvoie 200 quand même : l'événement est traité, on évite les retries en boucle.
      }
    } else if (!resend) {
      console.info("[webhook] (email simulé — RESEND_API_KEY absente)", { email, total });
    }
  }

  return NextResponse.json({ received: true });
}

type MailData = { firstName: string; lineLabel: string; total: string; shippingDate: string };

function confirmationText({ firstName, lineLabel, total, shippingDate }: MailData): string {
  return [
    `Bonjour ${firstName},`,
    "",
    "Tu fais désormais partie des fondatrices de naeul. Merci de nous accorder ta confiance avant même le lancement officiel.",
    "",
    "Récap de ta commande :",
    `- ${lineLabel}`,
    `- Total payé : ${total} €`,
    `- Expédition prévue : ${shippingDate}`,
    "",
    "Ce qui se passe maintenant :",
    "- Tu recevras des nouvelles régulières (coulisses, test produit, dates de livraison).",
    "- Dès que ton flacon est expédié, tu reçois un suivi.",
    "- À réception, tu as 30 jours pour tester. Si naeul ne te convient pas, on rembourse tout, même entamé.",
    "",
    "Une question ? Réponds à cet email, je te lis personnellement.",
    "",
    "naeul · 나을",
    "hello@naeul.com",
  ].join("\n");
}

function confirmationHtml({ firstName, lineLabel, total, shippingDate }: MailData): string {
  return `<!doctype html>
<html lang="fr"><body style="margin:0;background:#f5efe5;font-family:Georgia,'Times New Roman',serif;color:#2b2620;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5efe5;padding:32px 0;">
    <tr><td align="center">
      <table role="presentation" width="100%" style="max-width:520px;background:#faf7f2;border:1px solid #e7ded0;border-radius:16px;overflow:hidden;">
        <tr><td style="padding:32px 32px 8px;">
          <p style="margin:0;font-style:italic;font-size:26px;color:#2b2620;">naeul</p>
          <p style="margin:2px 0 0;font-size:11px;letter-spacing:3px;color:#6b5e52;">나을</p>
        </td></tr>
        <tr><td style="padding:16px 32px 0;">
          <h1 style="margin:0 0 12px;font-size:22px;font-weight:500;">Bienvenue chez les fondatrices</h1>
          <p style="margin:0 0 16px;font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;color:#6b5e52;">
            Bonjour ${firstName}, tu fais désormais partie des fondatrices de naeul. Merci de nous accorder ta confiance avant même le lancement officiel.
          </p>
          <table role="presentation" width="100%" style="background:#f5efe5;border-radius:12px;margin:8px 0 16px;">
            <tr><td style="padding:16px 18px;font-family:Helvetica,Arial,sans-serif;font-size:14px;line-height:1.7;color:#2b2620;">
              <strong>Récap de ta commande</strong><br/>
              ${lineLabel}<br/>
              Total payé : <strong>${total} €</strong><br/>
              Expédition prévue : <strong>${shippingDate}</strong>
            </td></tr>
          </table>
          <p style="margin:0 0 6px;font-family:Helvetica,Arial,sans-serif;font-size:14px;line-height:1.7;color:#6b5e52;">
            <strong style="color:#2b2620;">Ce qui se passe maintenant</strong><br/>
            Des nouvelles régulières (coulisses, test produit, dates de livraison).<br/>
            Un suivi dès que ton flacon est expédié.<br/>
            30 jours pour tester à réception — remboursement intégral si ça ne te convient pas, même entamé.
          </p>
          <p style="margin:18px 0 0;font-family:Helvetica,Arial,sans-serif;font-size:14px;line-height:1.6;color:#6b5e52;">
            Une question ? Réponds simplement à cet email, je te lis personnellement.
          </p>
        </td></tr>
        <tr><td style="padding:24px 32px 32px;border-top:1px solid #e7ded0;">
          <p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:12px;color:#6b5e52;">
            naeul · 나을 — <a href="mailto:hello@naeul.com" style="color:#5c6b5a;">hello@naeul.com</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}
