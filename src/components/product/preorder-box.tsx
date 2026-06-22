"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";
import { Check, ShieldCheck, Truck, Lock, Package } from "@phosphor-icons/react";
import type { Product } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { formatPrice, cn } from "@/lib/utils";
import {
  foundersPrice,
  FOUNDERS_LIMIT,
  SHIPPING_DATE,
  ALMA_ENABLED,
  ALMA_INSTALLMENTS,
  installmentAmount,
} from "@/lib/preorder";
import {
  SUBSCRIPTION_ENABLED,
  REFILL_INTERVAL_MONTHS,
  REFILL_DISCOUNT,
  refillPrice,
} from "@/lib/membership";

export function PreorderBox({ product }: { product: Product }) {
  const def = product.variants.find((v) => v.highlight) ?? product.variants[0];
  const [selectedId, setSelectedId] = useState(def.id);
  const [subscribe, setSubscribe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading3x, setLoading3x] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selected = product.variants.find((v) => v.id === selectedId) ?? def;
  const selectedFounders = foundersPrice(selected.price);
  // Prix payé : refill (-10 %) si abonnement, sinon prix fondateur.
  const payPrice = subscribe ? refillPrice(selectedFounders) : selectedFounders;

  // Lance un paiement (Stripe 1×/abonnement ou Alma 3×) et redirige.
  async function checkout(endpoint: string, setBusy: (v: boolean) => void, mode: string) {
    setBusy(true);
    setError(null);
    track("begin_preorder", { variant: selected.id, price: payPrice, mode });
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ variantId: selected.id, subscribe }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.assign(data.url);
        return;
      }
      setError(data.error ?? "Une erreur est survenue.");
      setBusy(false);
    } catch {
      setError("Connexion impossible. Réessaie dans un instant.");
      setBusy(false);
    }
  }

  const precommander = () =>
    checkout("/api/preorder", setLoading, subscribe ? "stripe_refill" : "stripe_1x");
  const payer3x = () => checkout("/api/preorder/alma", setLoading3x, "alma_3x");

  const busy = loading || loading3x;
  const perInstallment = installmentAmount(payPrice);

  return (
    <div id="acheter" className="scroll-mt-24">
      {/* Bandeau Édition limitée */}
      <div className="mb-5 flex items-center gap-2 rounded-full border border-terracotta/40 bg-terracotta/[0.08] px-3 py-1.5 text-xs font-medium text-ink">
        <Package size={15} className="text-terracotta" />
        Édition limitée — premier lot limité à {FOUNDERS_LIMIT} flacons
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

      {/* Achat unique vs abonnement refill (-10 %, livré tous les 2 mois) */}
      {SUBSCRIPTION_ENABLED && (
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setSubscribe(false)}
            aria-pressed={!subscribe}
            className={cn(
              "rounded-xl border p-3 text-left text-sm transition-colors",
              !subscribe ? "border-sage bg-sage/[0.06]" : "border-ink/12 bg-cream hover:border-ink/25",
            )}
          >
            <span className="font-medium text-ink">Achat unique</span>
          </button>
          <button
            type="button"
            onClick={() => setSubscribe(true)}
            aria-pressed={subscribe}
            className={cn(
              "rounded-xl border p-3 text-left text-sm transition-colors",
              subscribe ? "border-sage bg-sage/[0.06]" : "border-ink/12 bg-cream hover:border-ink/25",
            )}
          >
            <span className="font-medium text-ink">
              Abonnement -{Math.round(REFILL_DISCOUNT * 100)} %
            </span>
            <span className="mt-0.5 block text-[0.65rem] leading-snug text-stone">
              Livré tous les {REFILL_INTERVAL_MONTHS} mois · sans engagement, annulable
            </span>
          </button>
        </div>
      )}

      <p className="mt-3 rounded-lg bg-sand px-3 py-2 text-xs leading-relaxed text-stone">
        Ta peau met 6 à 8 semaines à se réguler. La plupart des fondatrices prennent 2 ou 3 flacons
        pour ne pas s&apos;arrêter en plein milieu — et payer moins cher le flacon.
      </p>

      <Button size="lg" className="mt-6 w-full" onClick={precommander} disabled={busy}>
        {loading
          ? "Redirection vers le paiement…"
          : subscribe
            ? `M'abonner — ${formatPrice(payPrice)} / ${REFILL_INTERVAL_MONTHS} mois`
            : `Précommander — ${formatPrice(payPrice)}`}
      </Button>

      {ALMA_ENABLED && !subscribe && (
        <>
          <Button
            variant="secondary"
            size="lg"
            className="mt-3 w-full"
            onClick={payer3x}
            disabled={busy}
          >
            {loading3x
              ? "Redirection vers Alma…"
              : `Payer en ${ALMA_INSTALLMENTS}× — ${ALMA_INSTALLMENTS} × ${formatPrice(perInstallment)}`}
          </Button>
          <p className="mt-2 text-center text-xs text-stone">
            Paiement en {ALMA_INSTALLMENTS} fois avec Alma · sans frais
          </p>
        </>
      )}

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
          Livraison offerte pour les fondatrices · Mondial Relay, expédition sous 5 à 7 jours ouvrés
        </p>
        <p className="flex items-center gap-2.5">
          <Lock size={18} className="shrink-0 text-sage" />
          Paiement sécurisé Stripe · Apple Pay & Google Pay
        </p>
      </div>
    </div>
  );
}
