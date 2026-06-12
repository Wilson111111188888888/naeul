/**
 * Catalogue NAEUL — un seul produit hero.
 * Source de vérité : page produit anticipée (Phase 1) + commerce dormant (Phase 2).
 */

export type Variant = {
  id: string;
  flacons: 1 | 2 | 3;
  label: string;
  price: number;
  saving: number;
  highlight?: boolean;
};

export type Active = {
  name: string;
  role: string;
};

export type ProductPhoto = {
  src: string;
  alt: string;
};

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  shortDescription: string;
  differentiator: string;
  unitPrice: number;
  format: string;
  volume: string;
  origin: string;
  cpnp: string;
  certifications: string[];
  actives: Active[];
  variants: Variant[];
  photos: ProductPhoto[];
  forWho: string[];
  notForWho: string[];
  does: string[];
  doesNot: string[];
  steps: { title: string; detail: string }[];
  priceBreakdown: { label: string; value: string }[];
  faq: { q: string; a: string }[];
};

export const HERO_PRODUCT: Product = {
  slug: "serum-exosomes-niacinamide",
  name: "Sérum aux exosomes et à la niacinamide",
  tagline: "Régule le sébum et les pores, apaise sans dessécher.",
  shortDescription:
    "Un sérum K-beauty pensé pour la peau grasse, sans l'agresser. Texture légère, fini non gras, six actifs ciblés pour équilibrer, hydrater et affiner le grain de peau.",
  differentiator:
    "La majorité des soins « peau grasse » agressent : alcool dénaturé, BHA forts. La peau s'assèche en surface, se rebelle, et produit encore plus de sébum. naeul fait l'inverse : on équilibre en douceur, on hydrate sans graisser, on régule sans dessécher.",
  unitPrice: 32.9,
  format: "Flacon pompe airless, verre transparent",
  volume: "30 ml / 1.01 fl oz",
  origin: "Designed in France · Made in EU (Lettonie)",
  cpnp: "EU CPNP No 5853763",
  certifications: ["ISO 22716", "ECOCERT", "Vegan", "Sans parfum", "Sans gluten"],
  actives: [
    { name: "Niacinamide", role: "Régule la production de sébum, équilibre la peau" },
    { name: "Acide lactique (AHA)", role: "Exfolie en douceur, affine le grain" },
    { name: "Acide hyaluronique", role: "Hydrate sans graisser" },
    { name: "Centella Asiatica", role: "Apaise et restaure" },
    { name: "Ferments du microbiome", role: "Renforcent la barrière cutanée" },
    { name: "Exosomes (extrait de pomme)", role: "Favorisent le renouvellement cellulaire" },
  ],
  variants: [
    { id: "naeul-serum-1", flacons: 1, label: "1 flacon", price: 32.9, saving: 0 },
    { id: "naeul-serum-2", flacons: 2, label: "2 flacons", price: 59.9, saving: 5.9, highlight: true },
    { id: "naeul-serum-3", flacons: 3, label: "3 flacons", price: 84.9, saving: 13 },
  ],
  photos: [
    { src: "/images/naeul-produit-avec-box.jpg", alt: "Sérum naeul et sa boîte vert sauge" },
    { src: "/images/naeul-produit-lifestyle.jpg", alt: "Sérum naeul avec feuillage vert" },
    { src: "/images/naeul-produit-bois.jpg", alt: "Sérum naeul sur ambiance bois" },
    { src: "/images/naeul-produit-minimal.jpg", alt: "Sérum naeul, composition minimaliste" },
    { src: "/images/naeul-produit-bath.jpg", alt: "Sérum naeul dans une salle de bain" },
    { src: "/images/naeul-produit-dos.jpg", alt: "Dos de la boîte naeul avec la liste INCI" },
  ],
  forWho: [
    "Peau grasse, mixte ou à pores visibles",
    "Brillances et sébum en cours de journée",
    "Peau qui réagit mal aux exfoliants agressifs",
    "Envie d'une routine douce, qui n'assèche pas",
  ],
  notForWho: [
    "Recherche d'un traitement médical anti-acné",
    "Attente d'un résultat dès la première application",
  ],
  does: [
    "Régule le sébum et resserre l'apparence des pores",
    "Apaise et renforce la barrière cutanée",
    "Hydrate sans effet gras",
    "Affine le grain de peau en douceur",
  ],
  doesNot: [
    "N'assèche pas la peau — au contraire",
    "Ne traite pas l'acné active sévère",
    "Ne remplace pas la protection solaire",
    "N'agit pas en une nuit (régularité : 3-4 semaines)",
  ],
  steps: [
    { title: "Matin et/ou soir", detail: "Sur peau propre et sèche, après le nettoyage." },
    { title: "2 à 3 pressions", detail: "La pompe airless préserve les actifs et dose juste." },
    { title: "Faire pénétrer", detail: "Massez doucement jusqu'à absorption complète." },
    { title: "Hydratez par-dessus", detail: "Une crème légère pour sceller l'hydratation." },
    { title: "SPF le matin", detail: "Non négociable : la protection solaire protège vos résultats." },
  ],
  priceBreakdown: [
    { label: "Formulation laboratoire EU (ISO 22716, ECOCERT)", value: "Actifs dosés, pas de remplissage" },
    { label: "Six actifs ciblés dont des exosomes", value: "Une formule premium, pas un sérum générique" },
    { label: "Flacon airless 30 ml", value: "Protège les actifs de l'air et de la lumière" },
    { label: "Vendu en direct", value: "Sans marge d'intermédiaire" },
  ],
  faq: [
    {
      q: "Pourquoi un sérum est-il adapté à la peau grasse ?",
      a: "Parce qu'il est léger et pénètre vite, sans laisser de film gras. La niacinamide régule le sébum pendant que l'acide hyaluronique hydrate — la peau grasse a besoin d'hydratation, pas d'assèchement.",
    },
    {
      q: "Quand puis-je l'utiliser ?",
      a: "Matin et/ou soir, sur peau propre, avant la crème hydratante. Le matin, terminez toujours par un SPF.",
    },
    {
      q: "Où est-il fabriqué ?",
      a: "Designed in France, Made in EU (Lettonie), dans un laboratoire certifié ISO 22716 et ECOCERT. Vegan, sans parfum, sans gluten.",
    },
    {
      q: "Au bout de combien de temps voit-on un résultat ?",
      a: "La peau paraît plus équilibrée et plus lisse en 3 à 4 semaines d'usage régulier. La régularité compte plus que la quantité.",
    },
  ],
};

export const PRODUCTS: Product[] = [HERO_PRODUCT];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getVariant(id: string): { product: Product; variant: Variant } | undefined {
  for (const product of PRODUCTS) {
    const variant = product.variants.find((v) => v.id === id);
    if (variant) return { product, variant };
  }
  return undefined;
}
