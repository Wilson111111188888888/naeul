"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { track } from "@vercel/analytics";

type EventData = Record<string, string | number | boolean | null>;

/**
 * Lien qui remonte un event Vercel Analytics au clic. Pour mesurer la conversion
 * des CTA (hero, cercle, produit…). Rend un <Link> standard.
 */
export function TrackedLink({
  href,
  event,
  data,
  className,
  children,
}: {
  href: string;
  event: string;
  data?: EventData;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={className} onClick={() => track(event, data)}>
      {children}
    </Link>
  );
}

/**
 * Mesure la profondeur de scroll d'une page et émet `scroll_depth` à 50% et 90%
 * (une seule fois chacun). À placer une fois par page à mesurer.
 */
export function ScrollDepth({ page }: { page: string }) {
  const fired = useRef<Set<number>>(new Set());
  useEffect(() => {
    function onScroll() {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const pct = ((doc.scrollTop || window.scrollY) / max) * 100;
      for (const m of [50, 90]) {
        if (pct >= m && !fired.current.has(m)) {
          fired.current.add(m);
          track("scroll_depth", { page, depth: m });
        }
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [page]);
  return null;
}

/** Émet un event une seule fois au montage (ex. conversion confirmée). */
export function TrackOnMount({ event, data }: { event: string; data?: EventData }) {
  const done = useRef(false);
  useEffect(() => {
    if (done.current) return;
    done.current = true;
    track(event, data);
  }, [event, data]);
  return null;
}
