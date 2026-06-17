import { Container } from "@/components/ui/container";

// La méthode des trois strates (mécanisme propriétaire). Réutilisée home + produit.
const STRATES = [
  {
    n: "01",
    t: "Apaiser",
    d: "Centella Asiatica calme. Acide hyaluronique hydrate. Avant de rééquilibrer, on arrête l'inflammation.",
  },
  {
    n: "02",
    t: "Équilibrer",
    d: "Niacinamide à 5%. Acide lactique en douceur. On régule le sébum et on affine le grain de peau sans déclencher la machine à excès.",
  },
  {
    n: "03",
    t: "Renforcer",
    d: "Ferments microbiome. Exosomes de pomme. On reconstruit la barrière cutanée. Une barrière saine produit moins.",
  },
];

export function MethodStrates({ className }: { className?: string }) {
  return (
    <section className={className}>
      <Container className="py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-stone">Notre méthode</p>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl">La méthode des trois strates.</h2>
          <p className="mt-5 leading-relaxed text-stone">
            On a refusé de mélanger tous les actifs au hasard. naeul agit en trois temps, dans cet
            ordre, pour réconcilier ta peau avec elle-même.
          </p>
        </div>
        <ol className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-3">
          {STRATES.map((s) => (
            <li key={s.n} className="rounded-2xl border border-line bg-sand p-6">
              <span className="font-serif text-sm text-sage">{s.n}</span>
              <h3 className="mt-2 text-lg uppercase tracking-wide">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone">{s.d}</p>
            </li>
          ))}
        </ol>
        <p className="mx-auto mt-10 max-w-xl text-center font-serif text-lg italic text-ink">
          C&apos;est l&apos;inverse des sérums « peau grasse » classiques : on attaque la cause, pas
          le symptôme.
        </p>
      </Container>
    </section>
  );
}
