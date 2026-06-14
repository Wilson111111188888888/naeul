"use client";

import { useEffect, useState } from "react";
import { track } from "@vercel/analytics";
import { buttonClasses } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Barre CTA collante en bas, MOBILE uniquement. Se révèle après un début de
 * défilement (pour ne pas doublonner avec le CTA déjà visible en haut) et
 * s'efface près du bas de page (où le CTA final est déjà à l'écran).
 * `href` pointe vers une ancre de la page (#precommande, #acheter…).
 */
export function StickyCta({
  href,
  label,
  event,
}: {
  href: string;
  label: string;
  event: string;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      const nearBottom =
        window.innerHeight + y >= document.documentElement.scrollHeight - 560;
      setShow(y > 560 && !nearBottom);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden={!show}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-line bg-sand/95 p-3 backdrop-blur-md transition-transform duration-300 ease-out md:hidden",
        show ? "translate-y-0" : "pointer-events-none translate-y-full",
      )}
    >
      <a
        href={href}
        onClick={() => track(event)}
        tabIndex={show ? 0 : -1}
        className={buttonClasses({ size: "lg", className: "w-full" })}
      >
        {label}
      </a>
    </div>
  );
}
