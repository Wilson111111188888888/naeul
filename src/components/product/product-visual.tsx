import { cn } from "@/lib/utils";

/**
 * Visuel produit placeholder — pot de pads stylisé dans la palette NAEUL.
 * À remplacer par la photographie éditoriale (cf. brand pack, section Photographie).
 */
export function ProductVisual({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative aspect-square w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#efe7d8] to-[#e3d6c2]",
        className,
      )}
    >
      {/* Halo lumière latérale douce */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_25%_20%,rgba(255,255,255,0.55),transparent_55%)]" />

      <svg
        viewBox="0 0 320 320"
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label="Pot de 60 pads exfoliants NAEUL"
      >
        {/* Ombre portée */}
        <ellipse cx="160" cy="262" rx="78" ry="14" fill="#2b2620" opacity="0.10" />

        {/* Corps du pot */}
        <rect x="98" y="120" width="124" height="138" rx="16" fill="#faf7f2" />
        <rect x="98" y="120" width="124" height="138" rx="16" fill="url(#jarShade)" opacity="0.6" />

        {/* Couvercle */}
        <rect x="92" y="92" width="136" height="40" rx="14" fill="#5c6b5a" />
        <rect x="92" y="92" width="136" height="18" rx="9" fill="#697a66" />

        {/* Étiquette */}
        <rect x="118" y="160" width="84" height="70" rx="6" fill="#f5efe5" stroke="#e0d4c0" strokeWidth="1" />
        <text x="160" y="188" textAnchor="middle" fill="#2b2620" fontFamily="Georgia, serif" fontSize="15" letterSpacing="3">
          NAEUL
        </text>
        <text x="160" y="204" textAnchor="middle" fill="#6b5e52" fontFamily="Georgia, serif" fontSize="8" letterSpacing="2">
          나을
        </text>
        <line x1="132" y1="214" x2="188" y2="214" stroke="#c9a586" strokeWidth="1" />
        <text x="160" y="224" textAnchor="middle" fill="#6b5e52" fontFamily="sans-serif" fontSize="6" letterSpacing="1">
          AHA · BHA · NIACINAMIDE
        </text>

        <defs>
          <linearGradient id="jarShade" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.4" />
            <stop offset="1" stopColor="#d8c9b3" stopOpacity="0.5" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
