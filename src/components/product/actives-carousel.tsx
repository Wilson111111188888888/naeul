import { Drop, Sparkle, Leaf, FlowerLotus, ShieldCheck, Sun } from "@phosphor-icons/react/dist/ssr";
import { AutoScrollRow } from "@/components/auto-scroll-row";

const ICONS = [Drop, Sparkle, Leaf, FlowerLotus, ShieldCheck, Sun];

type Active = { name: string; role: string };

/**
 * Carrousel d'actifs. Une carte pleine largeur à la fois sur mobile (défilement
 * auto + manuel, pas de texte coupé), grille 3 colonnes sur desktop.
 */
export function ActivesCarousel({ actives }: { actives: Active[] }) {
  return (
    <AutoScrollRow className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 scrollbar-hide md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:pb-0">
      {actives.map((active, i) => {
        const Icon = ICONS[i % ICONS.length];
        return (
          <div
            key={active.name}
            className="flex w-full shrink-0 snap-center flex-col rounded-2xl border border-line bg-sand p-6 transition-colors hover:border-sage/40 md:w-auto"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sage/10 text-sage">
              <Icon size={20} />
            </span>
            <h3 className="mt-4 font-serif text-lg">{active.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-stone">{active.role}</p>
          </div>
        );
      })}
    </AutoScrollRow>
  );
}
