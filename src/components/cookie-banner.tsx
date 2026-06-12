"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "naeul-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
  }, []);

  function decide(choice: "accepted" | "refused") {
    localStorage.setItem(STORAGE_KEY, choice);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-2xl rounded-2xl border border-line bg-cream/95 p-5 shadow-sm backdrop-blur-md">
      <p className="text-sm leading-relaxed text-stone">
        Nous utilisons uniquement des données nécessaires au fonctionnement du site et une mesure
        d'audience anonyme (sans cookie publicitaire). Tu gardes le contrôle.{" "}
        <Link href="/confidentialite" className="text-sage underline underline-offset-2">
          En savoir plus
        </Link>
      </p>
      <div className="mt-4 flex gap-3">
        <Button size="sm" onClick={() => decide("accepted")}>
          Accepter
        </Button>
        <Button size="sm" variant="secondary" onClick={() => decide("refused")}>
          Refuser le non-essentiel
        </Button>
      </div>
    </div>
  );
}
