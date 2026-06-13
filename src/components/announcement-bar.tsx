import Link from "next/link";
import { PREORDER_ENABLED } from "@/lib/preorder";

// Messages de conversion (sans « Made in EU » — on en parle le moins possible).
const MESSAGES = PREORDER_ENABLED
  ? [
      "Précommande ouverte · Édition Fondatrices -15 %",
      "Premier batch limité à 200 flacons",
      "Livraison offerte pour les fondatrices",
      "Satisfait ou remboursé 30 jours",
    ]
  : [
      "Avant-première ouverte · -15 % au lancement",
      "Premier batch limité à 200 flacons",
      "Livraison offerte dès 50 €",
      "Satisfait ou remboursé 30 jours",
    ];

/** Bandeau d'annonce défilant (marquee), en haut de page. */
export function AnnouncementBar() {
  return (
    <div className="bg-ink text-cream">
      <Link
        href="/#precommande"
        aria-label="Précommande ouverte — -15 % en avant-première"
        className="block overflow-hidden py-2"
      >
        <div className="flex w-max animate-marquee whitespace-nowrap">
          {[0, 1].map((group) => (
            <ul key={group} className="flex shrink-0" aria-hidden={group === 1}>
              {MESSAGES.map((m, i) => (
                <li key={i} className="flex items-center text-xs tracking-wide">
                  <span className="mx-6">{m}</span>
                  <span className="text-cream/40">·</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </Link>
    </div>
  );
}
