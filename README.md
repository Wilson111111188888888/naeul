# naeul — site

K-beauty pour peau grasse, sans agresser. Site **Next.js 16** (App Router) + Tailwind v4.
Phase actuelle : **pré-lancement / précommande** (capture email -15%, pas de paiement).

## Démarrage

```bash
npm install
cp .env.example .env.local   # renseignez vos clés
npm run dev                  # http://localhost:3001
```

## Produit

Sérum aux exosomes et à la niacinamide — 30 ml airless — 32,90 € (packs 59,90 / 84,90).
Fournisseur Selfnamed (Lettonie, UE). CPNP EU 5853763. ISO 22716, ECOCERT, Vegan.
Données : `src/lib/products.ts`. Photos : `public/images/naeul-produit-*.jpg`.

## Pages

| Route | Contenu |
|-------|---------|
| `/` | Landing précommande : hero waitlist, piliers, teaser produit, preuves de confiance, avis, CTA |
| `/le-produit` | Page produit anticipée : photos, actifs, différenciateur, conformité, waitlist (pas d'achat) |
| `/a-propos`, `/faq`, `/contact` | Marque, FAQ, formulaire |
| `/mentions-legales`, `/confidentialite` | Légal FR/UE |

Le e-commerce (`/produits/[slug]`, `/panier`, checkout Stripe, `/cgv`, `/retours`) est **en dormance**
pour la Phase 2 : présent dans le repo mais hors navigation, hors sitemap, bloqué dans robots.txt.

## Avis

`src/lib/reviews.ts` est **vide volontairement** : on n'affiche que des avis réels et vérifiés.
Les faux avis sont interdits (Code conso. L121-2). Tant qu'il n'y en a pas, `<Reviews>` affiche un
état honnête. Ajoutez de vrais avis (testeuses avec accord) dans `REVIEWS`, ou branchez Junip/Loox en Phase 2.

## Variables d'environnement

Voir `.env.example`. Tout se dégrade proprement sans clé (message clair, pas de crash).

| Variable | Rôle | Phase |
|----------|------|-------|
| `LOOPS_API_KEY` | Inscriptions précommande (waitlist) | **1** |
| `RESEND_API_KEY` | Emails (formulaire contact) | 1 |
| `NEXT_PUBLIC_SITE_URL` | URL publique (SEO, OG) | 1 |
| `STRIPE_SECRET_KEY` / `STRIPE_WEBHOOK_SECRET` | Paiement | 2 |

## Activer la collecte d'emails (Loops) — 5 min

1. Créez un compte sur **loops.so** (gratuit).
2. Settings → API → générez une clé.
3. Collez-la dans `.env.local` : `LOOPS_API_KEY=...`
4. Redémarrez `npm run dev`. Les inscriptions arrivent dans Loops (Audience).
5. Créez le loop **Welcome** (déclencheur : nouveau contact) avec le code `BIENVENUE15`,
   puis les emails J+7 / J+14 / J+21 et l'email de lancement.

## Déploiement (Vercel) — 10 min

1. Poussez ce dossier sur un repo GitHub.
2. Sur **vercel.com** : New Project → importez le repo (Next.js auto-détecté).
3. Ajoutez les variables d'environnement (au moins `LOOPS_API_KEY`, `NEXT_PUBLIC_SITE_URL`).
4. Deploy.
5. Domaine : achetez `naeul.fr` (OVH/Namecheap ~12 €/an), puis Project → Settings → Domains →
   ajoutez `naeul.fr` et suivez les enregistrements DNS indiqués.
6. Mettez `NEXT_PUBLIC_SITE_URL=https://naeul.fr` puis redéployez.

## À compléter avant lancement

Cherchez `À compléter` dans le code (composant `<Todo>`) — infos d'immatriculation :
raison sociale, SIRET, adresse. Dépôt INPI marque « NAEUL » classe 3 recommandé.
