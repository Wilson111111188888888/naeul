"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { track } from "@vercel/analytics";
import { Minus, Plus, Trash, Bag } from "@phosphor-icons/react";
import { useCart, resolveLines, cartTotal } from "@/lib/store/cart";
import { Container } from "@/components/ui/container";
import { Button, buttonClasses } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { lines, setQuantity, remove } = useCart();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // panier persisté (zustand) : on attend le montage client pour éviter le flash d'hydratation.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="py-24" />; // évite le flash d'hydratation
  }

  const resolved = resolveLines(lines);
  const total = cartTotal(lines);
  const freeShipping = total >= 50;

  async function checkout() {
    setLoading(true);
    setError(null);
    track("begin_checkout", { total: cartTotal(lines), items: lines.length });
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lines }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur de paiement.");
      window.location.assign(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue.");
      setLoading(false);
    }
  }

  if (resolved.length === 0) {
    return (
      <Container className="flex flex-col items-center py-28 text-center">
        <Bag size={40} className="text-stone" />
        <h1 className="mt-6 text-3xl">Ton panier est vide</h1>
        <p className="mt-3 max-w-sm text-stone">
          K-beauty pour peau grasse, sans agresser. Découvre notre sérum.
        </p>
        <Link href="/le-produit" className={buttonClasses({ size: "lg", className: "mt-8" })}>
          En savoir plus
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-16 md:py-20">
      <h1 className="text-3xl md:text-4xl">Ton panier</h1>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_360px]">
        {/* Lignes */}
        <ul className="divide-y divide-line border-y border-line">
          {resolved.map((line) => (
            <li key={line.variantId} className="flex gap-4 py-6">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-cream text-sage">
                <Bag size={24} />
              </div>
              <div className="flex flex-1 flex-col">
                <div className="flex justify-between gap-4">
                  <div>
                    <h2 className="text-base font-medium text-ink">{line.product.name}</h2>
                    <p className="mt-0.5 text-sm text-stone">{line.variant.label}</p>
                  </div>
                  <p className="font-serif text-lg text-ink">{formatPrice(line.subtotal)}</p>
                </div>
                <div className="mt-auto flex items-center justify-between pt-4">
                  <div className="flex items-center rounded-lg border border-ink/15">
                    <button
                      type="button"
                      onClick={() => setQuantity(line.variantId, line.quantity - 1)}
                      className="flex h-9 w-9 items-center justify-center text-ink hover:text-sage"
                      aria-label="Diminuer la quantité"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center text-sm tabular-nums">{line.quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(line.variantId, line.quantity + 1)}
                      className="flex h-9 w-9 items-center justify-center text-ink hover:text-sage"
                      aria-label="Augmenter la quantité"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(line.variantId)}
                    className="flex items-center gap-1.5 text-sm text-stone transition-colors hover:text-terracotta"
                  >
                    <Trash size={15} /> Retirer
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Récapitulatif */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-line bg-cream p-6">
            <h2 className="text-lg">Récapitulatif</h2>
            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between text-stone">
                <dt>Sous-total</dt>
                <dd className="text-ink">{formatPrice(total)}</dd>
              </div>
              <div className="flex justify-between text-stone">
                <dt>Livraison</dt>
                <dd className={freeShipping ? "text-sage" : "text-ink"}>
                  {freeShipping ? "Offerte" : "Calculée au paiement"}
                </dd>
              </div>
            </dl>
            {!freeShipping && (
              <p className="mt-3 rounded-lg bg-sand px-3 py-2 text-xs text-stone">
                Plus que {formatPrice(50 - total)} pour la livraison offerte.
              </p>
            )}
            <div className="mt-5 flex justify-between border-t border-line pt-5">
              <span className="font-medium text-ink">Total</span>
              <span className="font-serif text-xl text-ink">{formatPrice(total)}</span>
            </div>

            <Button size="lg" className="mt-6 w-full" onClick={checkout} disabled={loading}>
              {loading ? "Redirection…" : "Passer au paiement"}
            </Button>
            {error && <p className="mt-3 text-sm text-terracotta">{error}</p>}

            <p className="mt-4 text-center text-xs text-stone">
              Paiement sécurisé Stripe · CB, Apple Pay, Google Pay
            </p>
          </div>

          <Link
            href="/produits/pads-exfoliants"
            className="mt-4 block text-center text-sm text-sage underline-offset-4 hover:underline"
          >
            ← Continuer mes achats
          </Link>
        </aside>
      </div>
    </Container>
  );
}
