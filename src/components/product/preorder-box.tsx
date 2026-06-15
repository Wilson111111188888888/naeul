"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";
import { Check, ShieldCheck, Truck, Lock, Package } from "@phosphor-icons/react";
import type { Product } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { formatPrice, cn } from "@/lib/utils";
import { foundersPrice, FOUNDERS_LIMIT, SHIPPING_DATE } from "@/lib/preorder";

export function PreorderBox({ product }: { product: Product }) {
  const def = product.variants.find((v) => v.highlight) ?? product.variants[0];
  const [selectedId, setSelectedId] = useState(def.id);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selected = product.variants.find((v) => v.id === selectedId) ?? def;

  async function precommander() {
    setLoading(true);
    setError(null);
    track("begin_preorder", { variant: selected.id, price: selectedFounders });
    try {
      const res = await fetch("/api/preorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ variantId: selected.id }),
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

  const selectedFounders = foundersPrice(selected.price);

  return (
    <div id="acheter" className="scroll-mt-24">
      {/* Bandeau Édition Fondateur·rices */}
      <div className="mb-5 flex items-center gap-2 rounded-full border border-terracotta/40 bg-terracotta/[0.08] px-3 py-1.5 text-xs font-medium text-ink">
        <Package size={15} className="text-terracotta" />
        Édition Fondateur·rices — premier lot limité à {FOUNDERS_LIMIT} flacons
      </div>

      {/* Sélecteur de format */}
      <fieldset className="space-y-3">
        <legend className="mb-3 text-sm font-medium text-ink">Choisis ton format</legend>
        {product.variants.map((variant) => {
          const active = variant.id === selectedId;
          const fp = foundersPrice(variant.price);
          const perBox = fp / variant.flacons;
          return (
            <label
              key={variant.id}
              className={cn(
                "flex cursor-pointer items-center justify-between gap-4 rounded-xl border p-4 transition-colors",
                active ? "border-sage bg-sage/[0.06]" : "border-ink/12 bg-cream hover:border-ink/25",
              )}
            >
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors",
                    active ? "border-sage bg-sage" : "border-ink/25",
                  )}
                >
                  {active && <Check size={11} weight="bold" className="text-cream" />}
                </span>
                <input
                  type="radio"
                  name="variant"
                  value={variant.id}
                  checked={active}
                  onChange={() => setSelectedId(variant.id)}
                  className="sr-only"
                />
                <div>
                  <p className="text-sm font-medium text-ink">{variant.label}</p>
                  <p className="text-xs text-stone">
                    {formatPrice(perBox)} / flacon
                  </p>
                </div>
              </div>
              <div className="text-right">
                {variant.highlight && (
                  <span className="mb-1 block text-[0.625rem] font-semibold uppercase tracking-wider text-terracotta">
                    Le plus choisi
                  </span>
                )}
                <span className="flex items-baseline justify-end gap-1.5">
                  <span className="text-xs text-stone line-through">{formatPrice(variant.price)}</span>
                  <span className="font-serif text-lg text-ink">{formatPrice(fp)}</span>
                </span>
              </div>
            </label>
          );
        })}
      </fieldset>

      <Button size="lg" className="mt-6 w-full" onClick={precommander} disabled={loading}>
        {loading ? "Redirection vers le paiement…" : `Précommander — ${formatPrice(selectedFounders)}`}
      </Button>

      {error && <p className="mt-3 text-center text-sm text-terracotta">{error}</p>}

      <p className="mt-3 text-center text-xs text-stone">
        Paiement aujourd&apos;hui pour réserver ton flacon · expédition prévue {SHIPPING_DATE}
      </p>

      {/* Garantie mise en avant (technique valeur perçue) */}
      <div className="mt-6 rounded-2xl border border-sage/30 bg-sage/[0.05] p-5">
        <p className="flex items-center gap-2 font-medium text-ink">
          <ShieldCheck size={20} className="shrink-0 text-sage" />
          30 jours pour tester, sans risque
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-stone">
          Si naeul ne te convient pas, on te rembourse intégralement — même flacon entamé. Notre
          seul critère : ta satisfaction.
        </p>
      </div>

      {/* Trust signals (sans mention d'origine — choix de marque) */}
      <div className="mt-5 space-y-2.5 text-sm text-stone">
        <p className="flex items-center gap-2.5">
          <Truck size={18} className="shrink-0 text-sage" />
          Livraison offerte pour les fondatrices · Mondial Relay 48-72 h
        </p>
        <p className="flex items-center gap-2.5">
          <Lock size={18} className="shrink-0 text-sage" />
          Paiement sécurisé Stripe · Apple Pay & Google Pay
        </p>
      </div>
    </div>
  );
}
