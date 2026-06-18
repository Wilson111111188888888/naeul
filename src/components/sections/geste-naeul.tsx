import { Container } from "@/components/ui/container";

// Le geste naeul (rituel signature). Réutilisé home + produit.
const GESTE = [
  { n: "01", t: "Tu pompes", d: "Trois pompes du sérum dans le creux de la paume. Pas plus. Pas moins." },
  {
    n: "02",
    t: "Tu déposes",
    d: "Tu tapotes le sérum sur le visage propre. Du centre vers l'extérieur. Tu n'étales pas — tu déposes.",
  },
  {
    n: "03",
    t: "Tu attends",
    d: "Deux minutes. Pendant que le sérum pénètre, tu te regardes dans le miroir. Et tu arrêtes de te juger.",
  },
];

export function GesteNaeul({
  className,
  variant = "cards",
}: {
  className?: string;
  /** "cards" = 3 cartes (home) · "accordion" = étapes repliables compactes (produit). */
  variant?: "cards" | "accordion";
}) {
  return (
    <section className={className}>
      <Container className="py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-stone">Le geste naeul</p>
          <h2 className="mt-3 text-balance font-serif text-3xl md:text-4xl">
            Trois pompes. Deux minutes. Et tu lâches.
          </h2>
        </div>

        {variant === "accordion" ? (
          <ol className="mx-auto mt-10 max-w-2xl divide-y divide-line border-y border-line">
            {GESTE.map((g) => (
              <li key={g.n}>
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center gap-4 py-4 text-left">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-sage font-serif text-sm text-sage">
                      {g.n}
                    </span>
                    <span className="flex-1 font-medium text-ink">{g.t}</span>
                    <span className="text-stone transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="pb-4 pl-13 text-sm leading-relaxed text-stone">{g.d}</p>
                </details>
              </li>
            ))}
          </ol>
        ) : (
          <ol className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-3">
            {GESTE.map((g) => (
              <li key={g.n} className="flex flex-col items-center text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-sage font-serif text-sage">
                  {g.n}
                </span>
                <h3 className="mt-4 text-lg">{g.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone">{g.d}</p>
              </li>
            ))}
          </ol>
        )}

        <p className="mx-auto mt-10 max-w-xl text-center font-serif text-lg italic text-ink">
          La peau réconciliée commence dans la tête.
        </p>
      </Container>
    </section>
  );
}
