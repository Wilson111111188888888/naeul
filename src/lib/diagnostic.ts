// Diagnostic peau — questions, scoring et profils. Natif (pas de Tally).
// Le -15% est délivré par email (Loops), pas de code factice tant que le checkout
// n'est pas live. Aucun chiffre inventé. Voix : tutoiement, anonyme.

export type Option = { label: string; score?: number; key?: string };
export type Question = {
  id: string;
  text: string;
  type: "single" | "multi";
  scored?: boolean; // entre dans le calcul du profil
  options: Option[];
};

export const QUESTIONS: Question[] = [
  {
    id: "q1",
    text: "Au toucher, comment décrirais-tu ta peau ?",
    type: "single",
    scored: true,
    options: [
      { label: "Grasse partout, visiblement brillante", score: 4 },
      { label: "Mixte : grasse sur la zone T, normale ailleurs", score: 2 },
      { label: "Grasse zone T, parfois sèche sur les joues", score: 3 },
      { label: "Très grasse, avec imperfections fréquentes", score: 5 },
    ],
  },
  {
    id: "q2",
    text: "À quel moment de la journée ta peau brille ?",
    type: "single",
    scored: true,
    options: [
      { label: "Dès le réveil", score: 5 },
      { label: "En milieu de matinée", score: 4 },
      { label: "Milieu de journée (midi-14h)", score: 3 },
      { label: "Fin de journée seulement", score: 2 },
    ],
  },
  {
    id: "q3",
    text: "Tes pores sont…",
    type: "single",
    scored: true,
    options: [
      { label: "Très visibles partout", score: 4 },
      { label: "Visibles sur la zone T (front, nez, menton)", score: 3 },
      { label: "Légèrement visibles", score: 2 },
      { label: "Je ne sais pas vraiment", score: 2 },
    ],
  },
  {
    id: "q4",
    text: "Tu as des imperfections en ce moment ? (plusieurs choix possibles)",
    type: "multi",
    options: [
      { label: "Acné active (boutons rouges, inflammés)", key: "A" },
      { label: "Boutons occasionnels (règles, stress)", key: "B" },
      { label: "Points noirs (nez, menton)", key: "C" },
      { label: "Marques post-acné (taches)", key: "D" },
      { label: "Aucune imperfection", key: "E" },
    ],
  },
  {
    id: "q5",
    text: "Ta peau réagit-elle à certains produits ?",
    type: "single",
    scored: true,
    options: [
      { label: "Oui, très souvent (rougeurs, tiraillements)", score: 5 },
      { label: "Parfois, sur certains actifs (rétinol, vitamine C)", score: 3 },
      { label: "Rarement", score: 1 },
      { label: "Jamais", score: 0 },
    ],
  },
  {
    id: "q6",
    text: "Quelle est ta routine peau actuelle ?",
    type: "single",
    options: [
      { label: "Juste de l'eau ou du savon" },
      { label: "Nettoyant + crème simple" },
      { label: "Routine 3-4 produits" },
      { label: "Routine K-beauty complète (5+ étapes)" },
      { label: "Je teste plein de marques sans logique" },
    ],
  },
  {
    id: "q7",
    text: "Ton objectif principal ?",
    type: "single",
    options: [
      { label: "Réduire mes brillances" },
      { label: "Resserrer mes pores" },
      { label: "Une peau plus nette (moins de boutons)" },
      { label: "Affiner mon grain de peau" },
      { label: "Une peau plus saine en général" },
    ],
  },
  {
    id: "q8",
    text: "Ta peau brille mais tiraille parfois ?",
    type: "single",
    scored: true,
    options: [
      { label: "Oui, tout le temps", score: 5 },
      { label: "Oui, surtout l'hiver ou après nettoyage", score: 3 },
      { label: "Rarement", score: 1 },
      { label: "Non, jamais", score: 0 },
    ],
  },
  {
    id: "q9",
    text: "Ton âge ?",
    type: "single",
    options: [
      { label: "Moins de 20 ans" },
      { label: "20-25 ans" },
      { label: "26-30 ans" },
      { label: "31-40 ans" },
      { label: "Plus de 40 ans" },
    ],
  },
];

export type ProfileKey = "brillante" | "mixte" | "sensitive" | "acneique";

export type Profile = {
  key: ProfileKey;
  title: string;
  intro: string;
  traits: string[];
  needs: string;
  routine: { matin: string; soir: string };
  note?: string;
};

export const PROFILES: Record<ProfileKey, Profile> = {
  brillante: {
    key: "brillante",
    title: "Peau grasse « Brillante »",
    intro:
      "Ta peau produit un excès de sébum, surtout sur la zone T, avec des pores visibles et un fini huileux dès le milieu de journée. Pas de sensibilité ni d'imperfection majeure.",
    traits: ["Brillances dès la matinée", "Pores dilatés sur la zone T", "Texture grasse en fin de journée"],
    needs:
      "Une régulation du sébum sans assécher la peau. La niacinamide à dose efficace est ton actif n°1 ; les BHA agressifs sont à éviter (ils relancent la production de sébum).",
    routine: {
      matin: "Nettoyage doux → sérum naeul → crème légère matifiante",
      soir: "Démaquillage huileux → nettoyage → sérum naeul → hydratant léger",
    },
  },
  mixte: {
    key: "mixte",
    title: "Peau mixte à tendance grasse",
    intro:
      "Ta peau est grasse sur la zone T (front, nez, menton) mais reste équilibrée ou parfois sèche sur les joues. Le profil le plus courant — et le plus mal compris des marques.",
    traits: ["Brillances localisées zone T", "Joues normales à légèrement sèches", "Pores variables selon les zones"],
    needs:
      "Un soin qui régule la zone T sans dessécher les joues. La plupart des sérums « peau grasse » sont trop agressifs : naeul est formulé sans alcool ni BHA forts.",
    routine: {
      matin: "Nettoyage doux → sérum naeul (toute la peau) → hydratant léger",
      soir: "Démaquillage → nettoyage → sérum naeul → crème nuit légère",
    },
  },
  sensitive: {
    key: "sensitive",
    title: "Peau grasse sensible (ou déshydratée)",
    intro:
      "Tu as une peau grasse qui, paradoxalement, tiraille, rougit ou réagit à beaucoup de produits. C'est typique d'une peau grasse déshydratée : elle produit du sébum pour compenser un manque d'hydratation.",
    traits: ["Brillances + tiraillements", "Sensibilité à certains actifs", "Rougeurs occasionnelles"],
    needs:
      "Un soin doux qui régule le sébum ET hydrate en profondeur. Niacinamide + acide hyaluronique + Centella forment ton trio. À éviter : alcool dénaturé, BHA forts, parfum.",
    routine: {
      matin: "Nettoyage très doux → sérum naeul → crème hydratante",
      soir: "Démaquillage huileux → nettoyage doux → sérum naeul → hydratant riche",
    },
    note: "La plupart des marques « peau grasse » empirent ce profil en l'asséchant davantage.",
  },
  acneique: {
    key: "acneique",
    title: "Peau grasse à imperfections",
    intro:
      "Ta peau combine excès de sébum et imperfections récurrentes. Acide lactique (AHA doux), niacinamide et Centella aident à réguler le sébum, désincruster les pores et apaiser.",
    traits: ["Brillances + boutons / points noirs", "Pores souvent obstrués", "Marques post-acné possibles"],
    needs:
      "Une approche douce mais efficace. Pas de stripping (assèchement violent) qui aggrave le rebond séborrhéique : la régulation passe par l'équilibre, pas par l'agression.",
    routine: {
      matin: "Nettoyage doux → sérum naeul → hydratant non-comédogène + SPF",
      soir: "Démaquillage huileux → nettoyage doux → sérum naeul → hydratant léger",
    },
    note: "Si ton acné est sévère ou inflammatoire, naeul ne remplace pas une consultation dermatologique — c'est un soutien cosmétique, pas un traitement. En cas de traitement en cours (Roaccutane, antibiotiques…), demande l'avis de ton dermatologue.",
  },
};

/** Détermine le profil à partir des réponses (priorité : acnéique > sensible > brillante > mixte). */
export function computeProfile(answers: Record<string, number | number[]>): ProfileKey {
  const s = (id: string) => {
    const a = answers[id];
    if (typeof a !== "number") return 0;
    const q = QUESTIONS.find((x) => x.id === id);
    return q?.options[a]?.score ?? 0;
  };
  const q123 = s("q1") + s("q2") + s("q3");
  const q5 = s("q5");
  const q8 = s("q8");
  const q4 = Array.isArray(answers["q4"]) ? (answers["q4"] as number[]) : [];
  const q4Keys = q4.map((i) => QUESTIONS.find((x) => x.id === "q4")?.options[i]?.key);
  const hasAcne = q4Keys.includes("A");

  if (hasAcne || q4.length >= 3) return "acneique";
  if (q5 >= 4 || q8 >= 4) return "sensitive";
  if (q123 >= 10 && q5 <= 2 && q8 <= 1) return "brillante";
  return "mixte";
}
