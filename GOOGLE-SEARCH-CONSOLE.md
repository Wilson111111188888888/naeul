# Débloquer l'indexation Google — pas à pas (naeul.com)

But : faire en sorte que Google **trouve, indexe et affiche** naeul.com.
Aujourd'hui le site n'est pas indexé → tant que cette étape n'est pas faite, le SEO reste invisible.

Répartition : **toi** = tout ce qui touche ton compte Google. **Claude** = Vercel + le code.

---

## Étape 1 — Créer la propriété (toi)
1. Va sur **https://search.google.com/search-console** et connecte-toi avec ton compte Google.
2. « Ajouter une propriété » → choisis **« Préfixe de l'URL »** (la colonne de droite).
3. Saisis exactement : `https://naeul.com`
4. Dans les méthodes de validation, déplie **« Balise HTML »**.
5. Tu verras une balise du type :
   `<meta name="google-site-verification" content="XXXXXXXXXXXX" />`
   → copie **uniquement la valeur `content`** (le `XXXXXXXXXXXX`).
6. **Colle-moi cette valeur ici dans le chat.** ⚠️ Ne clique PAS encore sur « Valider ».

## Étape 2 — Mettre le token dans Vercel (Claude)
- Je place `GOOGLE_SITE_VERIFICATION = <ta valeur>` dans Vercel (Production) et je redéploie.
- Le code injecte déjà la balise automatiquement (`src/app/layout.tsx`).
- Je te dis quand le déploiement est en ligne (~1-2 min).

## Étape 3 — Valider (toi)
- Retourne dans Search Console → clique **« Valider »**.
- Ça doit afficher « Propriété validée ». (Si ça échoue, on attend 2 min de plus que le déploiement soit propagé et on réessaie.)

## Étape 4 — Soumettre le sitemap (toi)
- Menu gauche → **Sitemaps**.
- Dans « Ajouter un sitemap », tape : `sitemap.xml` → Envoyer.
  (URL complète = https://naeul.com/sitemap.xml — il existe déjà, ~20 pages.)

## Étape 5 — Demander l'indexation des pages clés (toi)
- En haut, barre **« Inspection de l'URL »**.
- Colle l'URL, puis clique **« Demander l'indexation »**. À faire pour :
  - `https://naeul.com/`
  - `https://naeul.com/le-produit`
  - 2-3 articles, ex. `https://naeul.com/blog/niacinamide-peau-grasse`

## Étape 6 — Bonus rapide
- **Bing Webmaster Tools** (https://www.bing.com/webmasters) : tu peux importer directement depuis Search Console en 2 clics. Couvre Bing + ChatGPT search.

---

## Après
- L'indexation prend de quelques jours à ~2 semaines.
- Search Console devient ton vrai tableau de bord SEO : requêtes réelles, positions, clics.
- Reviens me voir avec ces données → j'optimise le contenu sur ce qui remonte vraiment.
