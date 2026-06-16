/**
 * Client Alma (paiement en plusieurs fois) — minimal, côté serveur uniquement.
 *
 * `ALMA_API_KEY` : clé API Alma. Le mode (sandbox / live) est déduit du préfixe :
 *   - sk_test_… → sandbox (https://api.sandbox.getalma.eu)
 *   - sk_live_… → production (https://api.getalma.eu)
 *
 * Doc : https://docs.almapay.com/reference/payments
 */

const key = process.env.ALMA_API_KEY;

const BASE = key?.includes("_live_")
  ? "https://api.getalma.eu"
  : "https://api.sandbox.getalma.eu";

/** Renvoie true si Alma est configuré (clé présente). */
export const almaConfigured = Boolean(key);

type CreatePaymentInput = {
  /** Montant total TTC en centimes. */
  amountCents: number;
  /** Nombre d'échéances (ex. 3). */
  installments: number;
  /** URL de retour après paiement réussi. */
  returnUrl: string;
  /** URL si le client annule. */
  cancelUrl: string;
  /** URL IPN (webhook) confirmant le paiement. */
  ipnUrl?: string;
  /** Métadonnées libres (variantId, etc.). */
  customData?: Record<string, string>;
};

/**
 * Crée un paiement Alma et renvoie l'URL de la page de paiement hébergée.
 * Lève une erreur si la clé manque ou si l'API répond en erreur.
 */
export async function createAlmaPayment(input: CreatePaymentInput): Promise<{ url: string }> {
  if (!key) throw new Error("ALMA_API_KEY manquante.");

  const res = await fetch(`${BASE}/v1/payments`, {
    method: "POST",
    headers: {
      Authorization: `Alma-Auth ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      payment: {
        purchase_amount: input.amountCents,
        installments_count: input.installments,
        return_url: input.returnUrl,
        customer_cancel_url: input.cancelUrl,
        ipn_callback_url: input.ipnUrl,
        locale: "fr",
        custom_data: input.customData,
      },
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Alma ${res.status}: ${detail.slice(0, 300)}`);
  }

  const data = (await res.json()) as { url?: string };
  if (!data.url) throw new Error("Réponse Alma sans URL de paiement.");
  return { url: data.url };
}

export type AlmaPayment = {
  id: string;
  state: string; // "paid" quand le paiement est validé
  purchase_amount: number; // centimes
  customer?: { email?: string; first_name?: string; last_name?: string };
  custom_data?: Record<string, string>;
};

/**
 * Récupère un paiement Alma par son id (source de vérité côté serveur pour
 * confirmer un paiement reçu via IPN). Lève si la clé manque ou en cas d'erreur.
 */
export async function getAlmaPayment(id: string): Promise<AlmaPayment> {
  if (!key) throw new Error("ALMA_API_KEY manquante.");
  const res = await fetch(`${BASE}/v1/payments/${id}`, {
    headers: { Authorization: `Alma-Auth ${key}` },
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Alma ${res.status}: ${detail.slice(0, 300)}`);
  }
  return (await res.json()) as AlmaPayment;
}
