# Déploiement naeul — guide pas à pas

Le projet est prêt à déployer (build vérifié, 34 pages, sitemap + robots OK). Compte ~10-15 min.
Les étapes qui demandent **tes** comptes/clés ne peuvent pas être automatisées — suis-les toi-même.

---

## 1. Mettre le code sur GitHub

Le repo est déjà initialisé en local (branche `main`, commits faits). Il manque juste un remote.

1. Crée un repo **vide** sur github.com (ex. `naeul`, privé de préférence — pas de README/gitignore auto).
2. Dans le dossier `naeul/`, relie et pousse :

```bash
git remote add origin https://github.com/<ton-compte>/naeul.git
git push -u origin main
```

> Astuce : si tu as la CLI GitHub (`gh auth login` puis `gh repo create naeul --private --source=. --push`), ça fait tout d'un coup.

---

## 2. Déployer sur Vercel

1. Va sur **vercel.com**, connecte-toi avec GitHub.
2. **Add New… → Project** → importe le repo `naeul`. Next.js est détecté automatiquement (rien à configurer côté build).
3. Avant de cliquer **Deploy**, ouvre **Environment Variables** et ajoute au minimum :

| Name | Value | Note |
|------|-------|------|
| `NEXT_PUBLIC_SITE_URL` | `https://naeul.com` | (ou l'URL Vercel temporaire au début) |
| `LOOPS_API_KEY` | *(ta clé Loops)* | active la collecte d'emails |
| `RESEND_API_KEY` | *(ta clé Resend)* | formulaire de contact |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | `naeul.com` | analytics (optionnel) |

4. **Deploy.** Tu obtiens une URL `…vercel.app` live en ~1 min.

> Tant qu'une clé manque, la fonctionnalité se dégrade proprement (message clair, pas de crash).

---

## 3. Brancher le domaine naeul.com

1. Achète `naeul.com` (OVH, Namecheap… ~12 €/an). *(Achat = paiement, à faire toi-même.)*
2. Vercel → projet → **Settings → Domains → Add** → `naeul.com` (+ `www.naeul.com`).
3. Suis les enregistrements DNS indiqués par Vercel (A / CNAME) chez ton registrar.
4. Une fois le domaine actif, mets `NEXT_PUBLIC_SITE_URL=https://naeul.com` puis **Redeploy** (pour que sitemap, canoniques et Open Graph utilisent la bonne URL).

---

## 4. Google Search Console + sitemap

### Vérifier la propriété
1. Va sur **search.google.com/search-console** → **Ajouter une propriété** → **Préfixe d'URL** → `https://naeul.com`.
2. Choisis la méthode **Balise HTML**. Google donne un token (`content="..."`).
3. Dans Vercel → Environment Variables, ajoute :
   - `GOOGLE_SITE_VERIFICATION` = *(le token, sans la balise `<meta>`, juste la valeur de `content`)*
4. **Redeploy**. Le site insère alors `<meta name="google-site-verification">` automatiquement.
5. Reviens dans Search Console → **Valider**.

### Soumettre le sitemap
1. Search Console → **Sitemaps** (menu de gauche).
2. Saisis `sitemap.xml` → **Envoyer**. (URL complète : `https://naeul.com/sitemap.xml`)
3. Le sitemap liste la home, le produit, le blog et les 12 articles. Robots.txt l'autorise déjà.

### (Bonus SEO)
- Crée un **Google Business Profile** (impact SEO local).
- Mets le lien `naeul.com` dans les bios **TikTok** et **Instagram**.

---

## 5. Checklist post-déploiement

- [ ] Le site `…vercel.app` ou `naeul.com` répond, pages OK.
- [ ] Inscription précommande → contact bien créé dans Loops.
- [ ] `https://naeul.com/sitemap.xml` et `/robots.txt` accessibles.
- [ ] Propriété vérifiée dans Search Console + sitemap soumis.
- [ ] `NEXT_PUBLIC_SITE_URL` pointe sur le domaine final.
- [ ] Mentions légales complétées (raison sociale, SIRET, adresse) — voir `<Todo>` dans le code.

---

## Phase 2 (plus tard, quand le produit est en stock)
Le code e-commerce (panier, checkout Stripe, page produit avec achat) est déjà présent en dormance.
Au moment voulu : ajouter les clés Stripe, configurer le webhook (`/api/webhooks/stripe`), réintégrer
les routes commerce à la navigation. Voir `README.md`.
