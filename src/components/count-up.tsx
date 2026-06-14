"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Compteur animé (count-up) déclenché à l'entrée dans le viewport.
 * Respecte prefers-reduced-motion (affiche directement la valeur finale).
 */
export function CountUp({
  to,
  duration = 1300,
  suffix = "",
  className,
}: {
  to: number;
  duration?: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // reduced-motion : on affiche directement la valeur finale (pas d'animation).
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVal(to);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            let raf = 0;
            const start = performance.now();
            const tick = (now: number) => {
              const p = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - p, 3);
              setVal(Math.round(eased * to));
              if (p < 1) raf = requestAnimationFrame(tick);
            };
            raf = requestAnimationFrame(tick);
            io.disconnect();
            return () => cancelAnimationFrame(raf);
          }
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);

  return (
    <span ref={ref} className={className}>
      {val}
      {suffix}
    </span>
  );
}
