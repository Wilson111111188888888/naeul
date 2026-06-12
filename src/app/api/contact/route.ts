import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(2000),
});

const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

const TO = process.env.CONTACT_TO ?? "contact@naeul.com";
const FROM = process.env.CONTACT_FROM ?? "NAEUL <onboarding@resend.dev>";

export async function POST(request: Request) {
  let data;
  try {
    data = schema.parse(await request.json());
  } catch {
    return NextResponse.json({ error: "Formulaire invalide." }, { status: 400 });
  }

  // Sans clé Resend configurée, on log et on simule l'envoi pour ne pas bloquer le flux.
  if (!resend) {
    console.info("[contact] (simulé — RESEND_API_KEY absente)", data);
    return NextResponse.json({ ok: true, simulated: true });
  }

  try {
    await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: data.email,
      subject: `Contact NAEUL — ${data.name}`,
      text: `De : ${data.name} <${data.email}>\n\n${data.message}`,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Resend error:", err);
    return NextResponse.json({ error: "Envoi impossible pour le moment." }, { status: 500 });
  }
}
