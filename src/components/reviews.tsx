import Link from "next/link";
import { Star, SealCheck, ChatCircle } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui/container";
import { REVIEWS, reviewStats } from "@/lib/reviews";
import { buttonClasses } from "@/components/ui/button";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 text-terracotta" aria-label={`${rating} sur 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={16} weight={i <= rating ? "fill" : "regular"} />
      ))}
    </div>
  );
}

export function Reviews() {
  const { count, average } = reviewStats(REVIEWS);

  return (
    <section className="border-t border-line">
      <Container className="py-20 md:py-28">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.25em] text-stone">Avis vérifiés</p>
          <h2 className="mt-3 text-3xl md:text-4xl">La parole aux peaux grasses</h2>
        </div>

        {count === 0 ? (
          // État honnête tant qu'il n'y a pas d'avis réels (produit pas encore livré).
          <div className="mt-10 flex flex-col items-start gap-5 rounded-2xl border border-dashed border-line bg-cream p-8 md:p-12">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-sage/10 text-sage">
              <ChatCircle size={24} />
            </span>
            <div className="max-w-xl">
              <h3 className="text-lg">Les avis arrivent avec les premières commandes</h3>
              <p className="mt-2 leading-relaxed text-stone">
                Nous n&apos;affichons que des avis réels et vérifiés. Le sérum n&apos;étant pas
                encore lancé, il n&apos;y en a pas encore — et nous n&apos;en inventerons jamais.
                Inscris-toi : les premières inscrites seront aussi les premières à pouvoir
                donner leur avis.
              </p>
            </div>
            <Link href="/#precommande" className={buttonClasses({ size: "lg" })}>
              Je veux être prévenue (-15%)
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-6 flex items-center gap-3">
              <Stars rating={Math.round(average)} />
              <span className="text-sm text-stone">
                {average.toFixed(1)} / 5 · {count} avis vérifiés
              </span>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {REVIEWS.map((r) => (
                <figure key={`${r.author}-${r.date}`} className="rounded-xl border border-line bg-sand p-6">
                  <Stars rating={r.rating} />
                  {r.title && <figcaption className="mt-3 text-base font-medium text-ink">{r.title}</figcaption>}
                  <blockquote className="mt-2 text-sm leading-relaxed text-stone">{r.body}</blockquote>
                  <div className="mt-4 flex items-center gap-2 text-xs text-stone">
                    <span className="font-medium text-ink">{r.author}</span>
                    {r.skinType && <span>· {r.skinType}</span>}
                    {r.verified && (
                      <span className="ml-auto inline-flex items-center gap-1 text-sage">
                        <SealCheck size={14} weight="fill" /> Achat vérifié
                      </span>
                    )}
                  </div>
                </figure>
              ))}
            </div>
          </>
        )}
      </Container>
    </section>
  );
}
