import { Container } from "@/components/ui/container";

/**
 * Premières testeuses. Tant qu'on n'a pas de vrais retours, on affiche un
 * placeholder honnête (aucun faux témoignage). À remplacer par les vraies cartes
 * (photo + prénom + citation vérifiée) une fois le gifting nano récupéré.
 */
export function FirstTesters({ className }: { className?: string }) {
  return (
    <section className={className}>
      <Container className="py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-stone">Premières testeuses</p>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl">
            Elles ont essayé naeul avant tout le monde.
          </h2>
          <p className="mt-5 leading-relaxed text-stone">
            On a envoyé les tout premiers flacons à des peaux grasses françaises avant le lancement
            public. Pas de partenariat payant. Juste un produit et la liberté de dire ce qu&apos;elles
            en pensent.
          </p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col gap-4 rounded-2xl border border-dashed border-line bg-sand p-6"
            >
              <div className="aspect-square w-16 rounded-xl bg-line/60" />
              <p className="text-sm leading-relaxed text-stone/70">
                Les retours arrivent. Premières testeuses en cours, témoignages publiés vérifiés dès
                réception.
              </p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-xl text-center text-xs leading-relaxed text-stone/70">
          Témoignages reçus avant lancement. Aucune contrepartie financière. Aucune retouche, aucun
          mot modifié.
        </p>
      </Container>
    </section>
  );
}
