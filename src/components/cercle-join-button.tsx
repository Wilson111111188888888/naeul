"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";
import { Button } from "@/components/ui/button";
import { CERCLE_PRICE } from "@/lib/membership";

/** Bouton d'adhésion au Cercle → Stripe Checkout (abonnement annuel). */
export function CercleJoinButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function join() {
    setLoading(true);
    setError(null);
    track("cercle_join", {});
    try {
      const res = await fetch("/api/cercle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "{}",
      });
      const data = await res.json();
      if (data.url) {
        window.location.assign(data.url);
        return;
      }
      setError(data.error ?? "Une erreur est survenue.");
      setLoading(false);
    } catch {
      setError("Connexion impossible. Réessaie dans un instant.");
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center">
      <Button size="lg" onClick={join} disabled={loading}>
        {loading ? "Redirection…" : `Rejoindre Le Cercle — ${CERCLE_PRICE} €/an`}
      </Button>
      {error && <p className="mt-3 text-sm text-terracotta">{error}</p>}
    </div>
  );
}
