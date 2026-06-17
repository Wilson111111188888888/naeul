import { Users } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui/container";

/**
 * Premières testeuses. Tant qu'on n'a pas de vrais retours, on affiche une
 * bannière sobre (aucun faux témoignage, pas de cartes vides qui font « remplissage »).
 * À remplacer par une vraie grille de cartes (photo + prénom + citation vérifiée)
 * une fois le gifting nano récupéré.
 */
export function FirstTesters({ className }: { className?: string }) {
  return (
    <section className={className}>
      <Container className="py-14 md:py-16">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 rounded-2xl border border-line bg-sand px-6 py-8 text-center md:flex-row md:gap-6 md:text-left">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sage/10 text-sage">
            <Users size={24} />
          </span>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-stone">Premières testeuses</p>
            <h2 className="mt-1.5 font-serif text-xl md:text-2xl">
              Elles essaient naeul avant tout le monde.
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-stone">
              Les tout premiers flacons partent à des peaux grasses françaises, sans partenariat
              payant. Leurs retours — vérifiés, jamais retouchés — seront publiés ici dès réception.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
