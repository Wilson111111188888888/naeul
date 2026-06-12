"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="border-t border-line bg-cream">
      <div className="mx-auto w-full max-w-2xl px-5 py-16 text-center sm:px-8">
        <p className="text-xs uppercase tracking-[0.25em] text-stone">-15% sur votre première commande</p>
        <h2 className="mt-3 text-3xl">Rejoignez NAEUL</h2>
        <p className="mt-3 leading-relaxed text-stone">
          Conseils peau grasse, lancements et votre code de bienvenue -15%. Pas de spam.
        </p>

        {status === "done" ? (
          <p className="mt-6 rounded-xl border border-sage/30 bg-sage/[0.06] px-4 py-3 text-sm text-ink">
            Merci ! Vérifiez votre boîte mail pour votre code de bienvenue.
          </p>
        ) : (
          <form onSubmit={submit} className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
            <Input
              type="email"
              required
              placeholder="votre@email.fr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Votre adresse email"
              className="bg-sand"
            />
            <Button type="submit" disabled={status === "loading"} className="shrink-0">
              {status === "loading" ? "…" : "Je m'inscris"}
            </Button>
          </form>
        )}
        {status === "error" && (
          <p className="mt-3 text-sm text-terracotta">Inscription impossible pour le moment.</p>
        )}
      </div>
    </section>
  );
}
