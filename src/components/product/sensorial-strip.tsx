/**
 * Bande « sensorialité » : trois visuels ABSTRAITS (dégradés SVG), purement
 * décoratifs — ils n'ont pas vocation à représenter la texture réelle du sérum.
 * Les descripteurs sont des attributs déjà annoncés ailleurs (texture légère,
 * absorption rapide, fini non gras). Aucun visuel macro fabriqué/trompeur.
 */
const TILES = [
  {
    from: "#faf2ef",
    to: "#e8d0cc",
    label: "Texture légère",
    sub: "Un sérum fluide, jamais gras.",
  },
  {
    from: "#eef1ea",
    to: "#c2cbbb",
    label: "Absorption rapide",
    sub: "Pénètre vite, sans film collant.",
  },
  {
    from: "#f6ede0",
    to: "#d8c3a9",
    label: "Fini non gras",
    sub: "La peau respire, le maquillage tient.",
  },
];

function Swatch({ from, to, id }: { from: string; to: string; id: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className="aspect-square h-full w-full"
      role="presentation"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={id} cx="38%" cy="32%" r="80%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="42%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </radialGradient>
      </defs>
      <rect width="200" height="200" fill={`url(#${id})`} />
      {/* reflets « gel » abstraits */}
      <ellipse cx="68" cy="58" rx="30" ry="20" fill="#ffffff" opacity="0.35" />
      <circle cx="138" cy="128" r="11" fill="#ffffff" opacity="0.25" />
      <circle cx="150" cy="70" r="5" fill="#ffffff" opacity="0.3" />
    </svg>
  );
}

export function SensorialStrip() {
  return (
    <div className="mt-10 grid gap-5 sm:grid-cols-3">
      {TILES.map((t, i) => (
        <figure key={t.label}>
          <div className="overflow-hidden rounded-2xl border border-line">
            <Swatch from={t.from} to={t.to} id={`swatch-${i}`} />
          </div>
          <figcaption className="mt-3">
            <span className="block font-serif text-lg text-ink">{t.label}</span>
            <span className="mt-1 block text-sm leading-relaxed text-stone">{t.sub}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
