import Link from "next/link";
import { Marquee } from "@/components/marquee";
import { PREORDER_ENABLED } from "@/lib/preorder";

// Messages de conversion (sans « Made in EU » — on en parle le moins possible).
const MESSAGES = PREORDER_ENABLED
  ? [
      "Précommande ouverte · Édition Fondateur·rices -15 %",
      "Premier lot limité à 200 flacons",
      "Livraison offerte pour les fondatrices",
      "Satisfait ou remboursé 30 jours",
    ]
  : [
      "Avant-première ouverte · -15 % au lancement",
      "Premier lot limité à 200 flacons",
      "Livraison offerte dès 50 €",
      "Satisfait ou remboursé 30 jours",
    ];

/** Bandeau d'annonce défilant (marquee premium), en haut de page. */
export function AnnouncementBar() {
  return (
    <div className="bg-ink text-cream">
      <Link
        href="/#precommande"
        aria-label="Précommande ouverte — -15 % en avant-première"
        className="block py-2"
      >
        <Marquee
          items={MESSAGES}
          duration={46}
          itemClassName="text-[0.7rem] uppercase tracking-[0.22em] text-cream/85"
          separatorClassName="text-[0.6rem] text-terracotta/80"
        />
      </Link>
    </div>
  );
}
