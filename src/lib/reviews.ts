/**
 * Avis clients.
 *
 * ⚠️ N'AJOUTEZ ICI QUE DES AVIS RÉELS ET VÉRIFIÉS (clientes ou testeuses ayant
 * réellement reçu le produit, avec leur accord). Les faux avis sont une pratique
 * commerciale trompeuse interdite en France/UE (Code de la consommation L121-2).
 *
 * En Phase 2, ces avis peuvent être alimentés automatiquement par un service
 * d'avis vérifiés (Junip, Loox, Avis Vérifiés…). En attendant le lancement,
 * laissez le tableau vide : le composant <Reviews> affiche un état honnête.
 */

export type Review = {
  /** Prénom + initiale, ex. « Camille L. ». */
  author: string;
  /** Note sur 5. */
  rating: 1 | 2 | 3 | 4 | 5;
  /** Type de peau de la cliente, ex. « Peau grasse ». */
  skinType?: string;
  title?: string;
  body: string;
  /** Date ISO (AAAA-MM-JJ). */
  date: string;
  /** Achat confirmé (affiche le badge « Achat vérifié »). */
  verified?: boolean;
};

export const REVIEWS: Review[] = [];

export function reviewStats(reviews: Review[]) {
  if (reviews.length === 0) return { count: 0, average: 0 };
  const sum = reviews.reduce((s, r) => s + r.rating, 0);
  return { count: reviews.length, average: Math.round((sum / reviews.length) * 10) / 10 };
}
