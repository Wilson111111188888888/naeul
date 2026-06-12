import Link from "next/link";

/** Bandeau d'annonce fin, en haut de page. Adapté à la phase pré-lancement. */
export function AnnouncementBar() {
  return (
    <div className="bg-ink text-center text-cream">
      <Link
        href="/#precommande"
        className="block px-4 py-2 text-xs tracking-wide transition-opacity hover:opacity-90"
      >
        Précommande ouverte — <strong className="font-medium">-15 %</strong> en avant-première
        <span className="mx-2 text-cream/40">·</span>
        Made in EU
      </Link>
    </div>
  );
}
