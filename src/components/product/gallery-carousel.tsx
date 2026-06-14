import Image from "next/image";
import { SwipeCarousel } from "@/components/swipe-carousel";

export type GalleryCard = {
  src: string;
  alt: string;
  title: string;
  desc: string;
};

/**
 * Carrousel de cartes : image + titre + description. Une carte pleine largeur à la
 * fois sur mobile (défilement auto + manuel, pas de texte coupé), plusieurs sur desktop.
 */
export function GalleryCarousel({ cards }: { cards: GalleryCard[] }) {
  return (
    <SwipeCarousel className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 scrollbar-hide">
      {cards.map((c) => (
        <figure
          key={c.title}
          className="w-full shrink-0 snap-center sm:w-[54%] lg:w-[31%]"
        >
          <div className="overflow-hidden rounded-2xl border border-line">
            <Image
              src={c.src}
              alt={c.alt}
              width={900}
              height={1125}
              sizes="(max-width: 640px) 78vw, (max-width: 1024px) 54vw, 31vw"
              className="aspect-[4/5] h-full w-full object-cover"
            />
          </div>
          <figcaption className="mt-4">
            <p className="font-serif text-lg text-ink">{c.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-stone">{c.desc}</p>
          </figcaption>
        </figure>
      ))}
    </SwipeCarousel>
  );
}
