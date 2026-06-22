import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  source: z.string().max(60).optional(),
  // Réponses du diagnostic → propriétés de contact Loops (pour la segmentation).
  properties: z.record(z.string().max(40), z.string().max(200)).optional(),
});

const LOOPS_API_KEY = process.env.LOOPS_API_KEY;

/**
 * Inscription newsletter → ajout du contact dans Loops.
 * Le welcome email avec code -15% est déclenché côté Loops (loop « Welcome »).
 */
export async function POST(request: Request) {
  let email: string;
  let source = "website";
  let properties: Record<string, string> = {};
  try {
    const parsed = schema.parse(await request.json());
    email = parsed.email;
    if (parsed.source) source = parsed.source;
    if (parsed.properties) properties = parsed.properties;
  } catch {
    return NextResponse.json({ error: "Email invalide." }, { status: 400 });
  }

  if (!LOOPS_API_KEY) {
    console.info("[newsletter] (simulé — LOOPS_API_KEY absente)", email);
    return NextResponse.json({ ok: true, simulated: true });
  }

  try {
    const res = await fetch("https://app.loops.so/api/v1/contacts/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LOOPS_API_KEY}`,
      },
      body: JSON.stringify({ email, source, subscribed: true, ...properties }),
    });
    if (!res.ok) {
      const detail = await res.text();
      console.error("[newsletter] Loops error:", res.status, detail);
      // Contact déjà existant : on considère l'inscription comme réussie.
      if (res.status === 409) return NextResponse.json({ ok: true });
      throw new Error("Loops error");
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[newsletter]", err);
    return NextResponse.json({ error: "Inscription impossible pour le moment." }, { status: 500 });
  }
}
