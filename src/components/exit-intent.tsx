"use client";

import { useEffect, useState } from "react";
import { X } from "@phosphor-icons/react";
import { WaitlistForm } from "@/components/waitlist-form";
import { Wordmark } from "@/components/wordmark";

const STORAGE_KEY = "naeul-exit-seen";

/**
 * Popup exit-intent minimaliste. S'affiche une seule fois par navigateur :
 * - desktop : quand la souris quitte le haut de la fenêtre
 * - mobile : après un défilement significatif puis remontée rapide
 * Respecte le choix : ne réapparaît pas si déjà vu / fermé / inscrit.
 */
export function ExitIntent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;

    let armed = false;
    const timer = window.setTimeout(() => {
      armed = true;
    }, 6000); // ne pas surgir trop tôt

    function trigger() {
      if (!armed || localStorage.getItem(STORAGE_KEY)) return;
      setOpen(true);
      localStorage.setItem(STORAGE_KEY, "1");
      cleanup();
    }

    function onMouseOut(e: MouseEvent) {
      if (e.clientY <= 0 && !e.relatedTarget) trigger();
    }

    // Repli mobile : remontée rapide après avoir scrollé
    let lastY = window.scrollY;
    function onScroll() {
      const y = window.scrollY;
      if (lastY > 600 && lastY - y > 80) trigger();
      lastY = y;
    }

    function cleanup() {
      document.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(timer);
    }

    document.addEventListener("mouseout", onMouseOut);
    window.addEventListener("scroll", onScroll, { passive: true });
    return cleanup;
  }, []);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/40 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Offre de bienvenue"
      onClick={() => setOpen(false)}
    >
      <div
        className="relative w-full max-w-md rounded-2xl border border-line bg-sand p-8 text-center shadow-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Fermer"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg text-stone transition-colors hover:bg-ink/[0.05] hover:text-ink"
        >
          <X size={18} />
        </button>

        <div className="flex justify-center">
          <Wordmark className="text-3xl" hangulClassName="text-[0.55rem] tracking-[0.3em]" />
        </div>
        <h2 className="mt-5 text-2xl">Avant de partir…</h2>
        <p className="mt-2 text-sm leading-relaxed text-stone">
          Prends <strong className="text-ink">-15 %</strong> sur ta première commande. Inscris-toi et
          sois prévenu·e en avant-première du lancement.
        </p>
        <WaitlistForm source="exit_intent" className="mt-5" />
      </div>
    </div>
  );
}
