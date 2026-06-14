# 📍 État du site naeul — récap pour continuer

Document de reprise. À lire en premier dans un nouveau chat Claude Code (dossier `/Users/grandson/Grandson/naeul`).

## En une phrase
Site **K-beauty française pré-lancement** (sérum peau grasse) **en ligne sur naeul.com**, en mode **waitlist** — prêt à basculer en **pré-commande payante Stripe** dès que le SIRET + les clés Stripe sont là.

## Stack & commandes
- **Next.js 16** (App Router) + **Tailwind v4** + TypeScript. ⚠️ `AGENTS.md` : version Next avec breaking changes, lire les docs dans `node_modules/next/dist/docs/` au besoin.
- Lancer le dev : serveur dans `.claude/launch.json` (nom « NAEUL — serveur de dev (Next.js) », port **3001**) → via l'outil preview, ou `npm run dev`.
- Build : `npm run build`. Déploiement : **commit → push `origin main` → Vercel auto-déploie**.
- Repo : `git@github.com:Wilson111111188888888/naeul.git`. Push SSH fonctionne directement.

## Ce qui est FAIT (design & dev)
- **Home premium** : hero **plein écran cinématique** (image dorée + voile + texte crème + zoom Ken Burns, ~80svh mobile), barre d'annonce marquee, **Mission Section** « Pourquoi naeul », bande sombre **Édition Fondatrices**, teaser produit, **quiz interactif** « ta peau → notre réponse », trust bar slim, bandes lifestyle, garantie 30j, **CTA cinématique** final, footer premium, bulle d'aide flottante.
- **Page produit** (`/le-produit`) : hero (carrousel photos + bénéfices + specs/certifs), **Résultats avant/après INTERACTIF** (slider à glisser, 2 résultats), différenciateur, **actifs**, **timeline** « de la formule à ta peau », **galerie**, **routine**, comparatif, « ce que ça fait/pas », « Pour qui ? ». Ordre pensé conversion.
- **Carrousels** : composant `AutoScrollRow` = **auto-défilement + manuel**, 1 carte pleine largeur sur mobile (pas de texte coupé), grille sur desktop.
- **Pré-commande** (feature-flaggée `NEXT_PUBLIC_PREORDER_ENABLED`) : `PreorderBox`, `/api/preorder` (Stripe Checkout), page confirmation « fondatrices », email Resend via `/api/webhooks/stripe`, CGV pré-commande. Tout dormant tant que le flag n'est pas `true` dans Vercel.
- **Blog** (`/blog`, 12 articles MDX), FAQ accordéon, contact, pages légales, SEO (JSON-LD, sitemap, robots, alt-text), Loops (waitlist) configuré, Vercel Analytics.
- **Compteur réel** : `WAITLIST_COUNT = 108` dans `src/components/waitlist-count.tsx` (à mettre à jour à la main).

## Ce qui reste — CÔTÉ TOI (bloquant pour le lancement)
Voir **`A-GERER.md`** (plan complet) et **`LANCEMENT.md`** (pas-à-pas technique). En bref :
1. **Auto-entreprise → SIRET** (au nom de ta femme). Indispensable avant d'encaisser.
2. Me donner : **raison sociale, SIRET, adresse, n° CPNP, personne responsable UE** → je remplis les derniers `<Todo>` des pages `/mentions-legales`, `/confidentialite`, `/cgv` (je ne peux pas les inventer).
3. **Compte Stripe** + clés → à coller dans **Vercel** (je ne saisis jamais de clé secrète).
4. **Date d'expédition** réelle → variable `NEXT_PUBLIC_SHIPPING_DATE` (obligation légale).
5. Activer : `NEXT_PUBLIC_PREORDER_ENABLED=true` dans Vercel + redéployer.
6. **Vérifier le domaine Resend** (DNS Gandi) pour envoyer depuis `hello@naeul.com`.

## Ce qui reste — CONTENU réel (pas de faux, jamais)
- **Vidéo produit** (15-30 s) — le seul format manquant ; à filmer.
- **Vrais avis / UGC** clientes — après le lancement.
- **Logos presse / partenaires** — si/quand tu en as.
→ Dès que tu les as, on les intègre (Video Wall, UGC Wall, Logo Wall).

## Règles à respecter (importantes)
- **Jamais de faux** : avis, témoignages nommés, chiffres gonflés, avant/après non documenté. (Le compteur 108 = réel ; l'avant/après = test labo documenté, garder le dossier de preuve.)
- **Minimiser l'origine** : ne pas mettre « Made in EU / Lettonie » en avant, ne **jamais** nommer le fournisseur (Selfnamed). Identité = « K-beauty française ».
- **Pas de CPNP affiché** tant que ce n'est pas le nôtre (« notification CPNP en cours »).
- **Voix de marque** : tutoiement, posée, pas d'emojis dans les textes du site, pas de sur-promesse (pas « traite l'acné »).
- **Palette** : sauge `#5C6B5A` = accents/boutons ; rosé `#E8D0CC` = petites touches, jamais en grande surface ni sur boutons.

## Pour reprendre dans un nouveau chat Claude Code
1. Ouvre le projet `/Users/grandson/Grandson/naeul` dans une nouvelle session.
2. Dis « lis ETAT-DU-SITE.md » (ou ma mémoire se chargera toute seule).
3. Continue : me donner le SIRET, ou des photos/vidéos, ou demander de nouvelles modifs.
