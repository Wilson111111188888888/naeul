import { Resend } from "resend";

/**
 * Email de confirmation de pré-commande (Édition Fondatrices), partagé entre les
 * webhooks Stripe (1×) et Alma (3×). Centralisé ici pour rester cohérent.
 */

const resendKey = process.env.RESEND_API_KEY;
const resend = resendKey ? new Resend(resendKey) : null;
const FROM = process.env.ORDER_FROM ?? "naeul <onboarding@resend.dev>";

export type OrderMailData = {
  email: string;
  firstName: string;
  lineLabel: string;
  /** Total payé, déjà formaté (ex. "27,96"). */
  total: string;
  shippingDate: string;
  /** Mention du mode de paiement (ex. "en 3× avec Alma"), optionnelle. */
  paymentNote?: string;
};

/**
 * Envoie l'email de confirmation. No-op (log) si RESEND_API_KEY est absente, pour
 * ne pas bloquer le dev. Ne lève jamais : on évite de faire échouer le webhook.
 */
export async function sendOrderConfirmation(data: OrderMailData): Promise<void> {
  if (!resend) {
    console.info("[order-email] (simulé — RESEND_API_KEY absente)", {
      email: data.email,
      total: data.total,
    });
    return;
  }
  try {
    await resend.emails.send({
      from: FROM,
      to: data.email,
      replyTo: process.env.CONTACT_TO ?? "hello@naeul.com",
      subject: "Bienvenue chez les fondatrices de naeul",
      text: confirmationText(data),
      html: confirmationHtml(data),
    });
  } catch (err) {
    console.error("[order-email] envoi échoué:", err);
  }
}

function confirmationText({ firstName, lineLabel, total, shippingDate, paymentNote }: OrderMailData): string {
  return [
    `Bonjour ${firstName},`,
    "",
    "Tu fais désormais partie des fondatrices de naeul. Merci de nous accorder ta confiance avant même le lancement officiel.",
    "",
    "Récap de ta commande :",
    `- ${lineLabel}`,
    `- Total : ${total} €${paymentNote ? ` (${paymentNote})` : ""}`,
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

function confirmationHtml({ firstName, lineLabel, total, shippingDate, paymentNote }: OrderMailData): string {
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
              Total : <strong>${total} €</strong>${paymentNote ? ` (${paymentNote})` : ""}<br/>
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
