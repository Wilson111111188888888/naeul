import { Container } from "@/components/ui/container";

export function ContentPage({
  title,
  intro,
  updated,
  children,
}: {
  title: string;
  intro?: string;
  updated?: string;
  children: React.ReactNode;
}) {
  return (
    <Container className="py-16 md:py-24">
      <header className="max-w-2xl">
        <h1 className="text-4xl md:text-5xl">{title}</h1>
        {intro && <p className="mt-4 text-lg leading-relaxed text-stone">{intro}</p>}
        {updated && (
          <p className="mt-4 text-xs uppercase tracking-wider text-stone">
            Dernière mise à jour : {updated}
          </p>
        )}
      </header>
      <article className="prose-naeul mt-10">{children}</article>
    </Container>
  );
}

/** Encadré « à compléter » visible pour les infos légales en attente d'immatriculation. */
export function Todo({ children }: { children: React.ReactNode }) {
  return (
    <mark className="rounded bg-terracotta/25 px-1.5 py-0.5 text-ink">[À compléter — {children}]</mark>
  );
}
