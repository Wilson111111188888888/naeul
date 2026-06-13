import Image from "next/image";

/**
 * Bande « sensorialité » : la vraie macro de la texture du sérum + 3 descripteurs.
 * Descripteurs alignés sur les attributs réels (texture légère, absorption rapide,
 * fini non gras).
 */
const POINTS = [
  { t: "Texture légère", d: "Un sérum fluide, jamais gras." },
  { t: "Absorption rapide", d: "Pénètre vite, sans film collant." },
  { t: "Fini non gras", d: "La peau respire, le maquillage tient." },
];

export function SensorialStrip() {
  return (
    <div className="mt-10 grid items-center gap-10 md:grid-cols-2 md:gap-16">
      <figure className="overflow-hidden rounded-2xl border border-line">
        <Image
          src="/images/naeul-texture-macro.jpg"
          alt="Macro de la texture du sérum naeul : une goutte fluide et légère sur la peau"
          width={1254}
          height={1254}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="aspect-square h-full w-full object-cover"
        />
      </figure>
      <ul className="space-y-6">
        {POINTS.map((p) => (
          <li key={p.t} className="border-l-2 border-sage/30 pl-5">
            <p className="font-serif text-xl text-ink">{p.t}</p>
            <p className="mt-1 text-sm leading-relaxed text-stone">{p.d}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
