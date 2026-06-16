import { NextResponse } from "next/server";
import { createAlmaPayment, almaConfigured } from "@/lib/alma";
import { getVariant } from "@/lib/products";
import { PREORDER_ENABLED, ALMA_ENABLED, ALMA_INSTALLMENTS, foundersPrice } from "@/lib/preorder";

/**
 * Crée un paiement Alma en 3× pour une pré-commande (Édition Fondatrices).
 * Même prix Founders (-15 %) que le paiement Stripe 1×. Renvoie l'URL de la
 * page de paiement Alma vers laquelle rediriger le client.
 */
export async function POST(request: Request) {
  if (!PREORDER_ENABLED || !ALMA_ENABLED) {
    return NextResponse.json({ error: "Le paiement en 3× n'est pas disponible." }, { status: 503 });
  }
  if (!almaConfigured) {
    return NextResponse.json(
      { error: "Paiement 3× non configuré. Ajoute ALMA_API_KEY." },
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
    const { url } = await createAlmaPayment({
      amountCents: Math.round(price * 100),
      installments: ALMA_INSTALLMENTS,
      returnUrl: `${origin}/commande/confirmee`,
      cancelUrl: `${origin}/le-produit`,
      ipnUrl: `${origin}/api/webhooks/alma`,
      customData: {
        preorder: "true",
        variantId: variant.id,
        flacons: String(variant.flacons),
        product: product.slug,
      },
    });
    return NextResponse.json({ url });
  } catch (err) {
    console.error("[preorder/alma] error:", err);
    return NextResponse.json(
      { error: "Impossible de créer le paiement en 3×." },
      { status: 500 },
    );
  }
}
