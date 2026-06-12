"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getVariant } from "@/lib/products";

export type CartLine = {
  /** Identifiant de variante (cf. products.ts). */
  variantId: string;
  quantity: number;
};

type CartState = {
  lines: CartLine[];
  add: (variantId: string, quantity?: number) => void;
  setQuantity: (variantId: string, quantity: number) => void;
  remove: (variantId: string) => void;
  clear: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      add: (variantId, quantity = 1) =>
        set((state) => {
          const existing = state.lines.find((l) => l.variantId === variantId);
          if (existing) {
            return {
              lines: state.lines.map((l) =>
                l.variantId === variantId ? { ...l, quantity: l.quantity + quantity } : l,
              ),
            };
          }
          return { lines: [...state.lines, { variantId, quantity }] };
        }),
      setQuantity: (variantId, quantity) =>
        set((state) => ({
          lines:
            quantity <= 0
              ? state.lines.filter((l) => l.variantId !== variantId)
              : state.lines.map((l) =>
                  l.variantId === variantId ? { ...l, quantity } : l,
                ),
        })),
      remove: (variantId) =>
        set((state) => ({ lines: state.lines.filter((l) => l.variantId !== variantId) })),
      clear: () => set({ lines: [] }),
    }),
    { name: "naeul-cart" },
  ),
);

/** Détail enrichi d'une ligne (produit + variante + sous-total). */
export function resolveLines(lines: CartLine[]) {
  return lines
    .map((line) => {
      const resolved = getVariant(line.variantId);
      if (!resolved) return null;
      return {
        ...line,
        product: resolved.product,
        variant: resolved.variant,
        subtotal: resolved.variant.price * line.quantity,
      };
    })
    .filter((l): l is NonNullable<typeof l> => l !== null);
}

export function cartCount(lines: CartLine[]) {
  return lines.reduce((sum, l) => sum + l.quantity, 0);
}

export function cartTotal(lines: CartLine[]) {
  return resolveLines(lines).reduce((sum, l) => sum + l.subtotal, 0);
}
