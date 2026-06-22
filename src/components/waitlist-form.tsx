"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";
import { CheckCircle } from "@phosphor-icons/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Capture email pour la précommande. Poste vers /api/newsletter (→ Loops).
 * `tone="light"` pour fond clair, `tone="onAccent"` pour fond sauge.
 * `source` = d'où vient l'inscription (hero, produit, exit-intent…) pour la mesure.
 */
export function WaitlistForm({
  tone = "light",
  cta = "Je réserve ma place (-15%)",
  source = "inconnu",
  properties,
  onSuccess,
  className,
}: {
  tone?: "light" | "onAccent";
  cta?: string;
  source?: string;
  /** Propriétés à enregistrer dans Loops (réponses diagnostic) pour segmentation. */
  properties?: Record<string, string>;
  /** Appelé après une inscription réussie (ex. révéler le résultat du diagnostic). */
  onSuccess?: () => void;
  className?: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source, properties }),
      });
      if (!res.ok) throw new Error();
      track("waitlist_signup", { source });
      setStatus("done");
      setEmail("");
      onSuccess?.();
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div
        className={cn(
          "flex items-center gap-3 rounded-xl border px-4 py-3.5 text-sm",
          tone === "onAccent"
            ? "border-cream/30 bg-cream/10 text-cream"
            : "border-sage/30 bg-sage/[0.06] text-ink",
          className,
        )}
      >
        <CheckCircle size={22} weight="light" className="shrink-0" />
        <p>C&apos;est noté. Surveille ta boîte mail pour ton code -15%.</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
        <Input
          type="email"
          required
          placeholder="ton@email.fr"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Ton adresse email"
          className={tone === "onAccent" ? "border-cream/30 bg-cream/95" : "bg-cream"}
        />
        <Button
          type="submit"
          disabled={status === "loading"}
          className={cn(
            "shrink-0",
            tone === "onAccent" && "bg-cream text-ink hover:bg-sand",
          )}
        >
          {status === "loading" ? "…" : cta}
        </Button>
      </form>
      {status === "error" && (
        <p className={cn("mt-2 text-sm", tone === "onAccent" ? "text-cream/90" : "text-terracotta")}>
          Inscription impossible pour le moment. Réessaie.
        </p>
      )}
      <p className={cn("mt-2.5 text-xs", tone === "onAccent" ? "text-cream/70" : "text-stone")}>
        Pas de spam. Désinscription en un clic.
      </p>
    </div>
  );
}
