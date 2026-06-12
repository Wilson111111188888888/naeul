"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Truck, ArrowsClockwise } from "@phosphor-icons/react";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/store/cart";
import { Button } from "@/components/ui/button";
import { formatPrice, cn } from "@/lib/utils";

export function BuyBox({ product }: { product: Product }) {
  const add = useCart((s) => s.add);
  const defaultVariant = product.variants.find((v) => v.highlight) ?? product.variants[0];
  const [selectedId, setSelectedId] = useState(defaultVariant.id);
  const [justAdded, setJustAdded] = useState(false);

  const selected = product.variants.find((v) => v.id === selectedId) ?? defaultVariant;

  function handleAdd() {
    add(selected.id, 1);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 2200);
  }

  return (
    <div>
      {/* Sélecteur de pack */}
      <fieldset className="space-y-3">
        <legend className="mb-3 text-sm font-medium text-ink">Choisissez votre format</legend>
        {product.variants.map((variant) => {
          const active = variant.id === selectedId;
          const perBox = variant.price / variant.flacons;
          return (
            <label
              key={variant.id}
              className={cn(
                "flex cursor-pointer items-center justify-between gap-4 rounded-xl border p-4 transition-colors",
                active
                  ? "border-sage bg-sage/[0.06]"
                  : "border-ink/12 bg-cream hover:border-ink/25",
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
                    {variant.saving > 0 && (
                      <span className="ml-2 text-sage">· économie {formatPrice(variant.saving)}</span>
                    )}
                  </p>
                </div>
              </div>
              <div className="text-right">
                {variant.highlight && (
                  <span className="mb-1 block text-[0.625rem] font-semibold uppercase tracking-wider text-terracotta">
                    Le plus choisi
                  </span>
                )}
                <span className="font-serif text-lg text-ink">{formatPrice(variant.price)}</span>
              </div>
            </label>
          );
        })}
      </fieldset>

      <Button size="lg" className="mt-6 w-full" onClick={handleAdd}>
        {justAdded ? (
          <>
            <Check size={18} weight="bold" /> Ajouté au panier
          </>
        ) : (
          <>Ajouter au panier — {formatPrice(selected.price)}</>
        )}
      </Button>

      {justAdded && (
        <Link
          href="/panier"
          className="mt-3 block text-center text-sm text-sage underline-offset-4 hover:underline"
        >
          Voir le panier →
        </Link>
      )}

      {/* Réassurance */}
      <div className="mt-6 space-y-2.5 border-t border-line pt-5 text-sm text-stone">
        <p className="flex items-center gap-2.5">
          <Truck size={18} className="shrink-0 text-sage" />
          Livraison France 48-72h · offerte dès 2 boîtes
        </p>
        <p className="flex items-center gap-2.5">
          <ArrowsClockwise size={18} className="shrink-0 text-sage" />
          Retour & remboursement sous 30 jours, même ouvert
        </p>
      </div>

      {/* Sticky CTA mobile */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-sand/95 p-3 backdrop-blur-md md:hidden">
        <div className="flex items-center gap-3">
          <div className="leading-tight">
            <p className="text-xs text-stone">{selected.label}</p>
            <p className="font-serif text-base text-ink">{formatPrice(selected.price)}</p>
          </div>
          <Button className="flex-1" onClick={handleAdd}>
            {justAdded ? "Ajouté ✓" : "Ajouter au panier"}
          </Button>
        </div>
      </div>
    </div>
  );
}
