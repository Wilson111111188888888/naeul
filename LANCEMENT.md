# 🚀 Lancement de la pré-commande naeul — guide pas à pas

Ce guide te fait passer le site de **waitlist** à **pré-commande payante**, dans l'ordre.
Coche au fur et à mesure. Fais tout en **mode test** d'abord (étapes 1→6), puis passe en **live** (étape 7).

> Rappel : le code est déjà prêt. Tout est piloté par une variable `NEXT_PUBLIC_PREORDER_ENABLED`.
> Tant qu'elle n'est pas sur `true` dans Vercel, le site reste en waitlist (aucun risque).

---

## ÉTAPE 0 — Avant tout : ton auto-entreprise (obligatoire)

Encaisser le moindre paiement sans SIRET = exercice illégal d'activité commerciale.

- [ ] Créer l'auto-entreprise sur **autoentrepreneur.urssaf.fr** (gratuit, 1 à 3 jours).
      Activité : « commerce de détail / vente de cosmétiques ».
- [ ] Noter ton **SIRET** dès réception.
- [ ] Ouvrir (ou dédier) un **compte bancaire** pour l'activité. ⚠️ L'argent des pré-commandes
      sert à payer le batch Selfnamed — ne pas le dépenser avant d'avoir livré.

Quand tu as le SIRET, remplis les placeholders légaux du site (je peux le faire pour toi si tu me donnes les infos) :
- raison sociale / nom, SIRET, adresse → pages **/mentions-legales** et **/confidentialite**
- numéro CPNP du produit + personne responsable UE → **/mentions-legales**

---

## ÉTAPE 1 — Créer le compte Stripe

- [ ] Aller sur **stripe.com** → S'inscrire.
- [ ] Email : `hello@naeul.com` · Pays : **France**.
- [ ] Renseigner l'entreprise : **auto-entrepreneur**, ton **SIRET**, pièce d'identité, **IBAN**.
- [ ] Activer les moyens de paiement : **Carte**, **Apple Pay**, **Google Pay** (Klarna/3x optionnel).

Tu peux déjà tout tester AVANT l'activation complète, grâce au **mode test** (interrupteur en haut à droite du dashboard Stripe).

---

## ÉTAPE 2 — Récupérer les clés Stripe de TEST

Dans le dashboard Stripe, en **mode test** : Développeurs → Clés API.

- [ ] Copier la **clé secrète test** : commence par `sk_test_…`
- [ ] Copier la **clé publiable test** : commence par `pk_test_…`

---

## ÉTAPE 3 — Mettre les variables dans Vercel (mode test)

Vercel → projet **naeul** → Settings → **Environment Variables**. Pour chaque variable :
nom + valeur, environnement **Production** (et Preview), puis **Save**.

| Variable | Valeur (test) |
|---|---|
| `STRIPE_SECRET_KEY` | ta clé `sk_test_…` |
| `STRIPE_PUBLISHABLE_KEY` | ta clé `pk_test_…` |
| `NEXT_PUBLIC_SITE_URL` | `https://naeul.com` (déjà là normalement) |
| `NEXT_PUBLIC_SHIPPING_DATE` | la **vraie date d'expédition**, ex. `15 septembre 2026` |
| `NEXT_PUBLIC_PREORDER_ENABLED` | `true` |

- [ ] Variables ajoutées.
- [ ] **Redéployer** (Vercel → Deployments → ⋯ → Redeploy) pour que les `NEXT_PUBLIC_*` soient prises en compte.

> ⚠️ `NEXT_PUBLIC_SHIPPING_DATE` est une **obligation légale** : la date d'expédition doit
> être affichée. Mets une date réaliste (le doc conseille J+50 minimum après le lancement).

---

## ÉTAPE 4 — Brancher le webhook Stripe (mode test)

Le webhook permet d'envoyer l'email de confirmation après paiement.

- [ ] Dashboard Stripe (mode **test**) → Développeurs → **Webhooks** → « Ajouter un endpoint ».
- [ ] URL : `https://naeul.com/api/webhooks/stripe`
- [ ] Événement à écouter : **`checkout.session.completed`**
- [ ] Créer, puis copier le **secret de signature** : commence par `whsec_…`
- [ ] Ajouter dans Vercel : `STRIPE_WEBHOOK_SECRET` = `whsec_…` → Save → Redéployer.

---

## ÉTAPE 5 — Tester une commande de bout en bout (mode test)

- [ ] Aller sur **https://naeul.com/le-produit** → choisir un format → **Précommander**.
- [ ] Sur la page Stripe, payer avec la **carte de test** : `4242 4242 4242 4242`,
      date future quelconque, CVC `123`, code postal quelconque.
- [ ] Vérifier la redirection vers la page **« Bienvenue chez les fondatrices »**.
- [ ] Vérifier la réception de l'**email de confirmation**.
- [ ] Vérifier dans Stripe (mode test) que le paiement apparaît.

Si l'email n'arrive pas → vérifier `RESEND_API_KEY` et le webhook (étape 4).

---

## ÉTAPE 6 — Resend : envoyer depuis hello@naeul.com

Par défaut les emails partent d'une adresse de test. Pour envoyer depuis ton domaine :

- [ ] Compte **resend.com** → Domains → ajouter `naeul.com`.
- [ ] Ajouter chez **Gandi** les enregistrements DNS indiqués par Resend (SPF, DKIM).
- [ ] Une fois « Verified », ajouter dans Vercel : `ORDER_FROM` = `naeul <hello@naeul.com>` → Redéployer.
- [ ] (Optionnel) `CONTACT_FROM` = `naeul <hello@naeul.com>` pour le formulaire de contact.

---

## ÉTAPE 7 — Passer en LIVE 🎉

Une fois les tests OK :

- [ ] Dans Stripe, basculer en **mode live** (interrupteur en haut à droite).
- [ ] Récupérer les **clés live** : `sk_live_…` et `pk_live_…`.
- [ ] Recréer le **webhook en mode live** (même URL, même événement) → nouveau `whsec_…`.
- [ ] Dans Vercel, **remplacer** les valeurs test par les valeurs **live** :
      `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`.
- [ ] **Redéployer**.
- [ ] Faire **une vraie petite commande** (toi) pour valider, puis te rembourser depuis Stripe.

C'est en ligne. Les pré-commandes sont ouvertes.

---

## ÉTAPE 8 — Emails de suivi (Loops)

Les textes sont déjà rédigés dans `marketing/loops-emails.md`. Dans le dashboard **Loops** :

- [ ] Vérifier que `LOOPS_API_KEY` est bien dans Vercel (✅ déjà fait).
- [ ] Créer le flow de bienvenue (déclencheur « contact ajouté ») avec les emails fournis.
- [ ] (Optionnel) emails coulisses J+3 / J+7, etc.

> Les inscrites « waitlist » (celles qui ne précommandent pas tout de suite) continuent d'arriver
> dans Loops via le formulaire d'inscription — garde-les chaudes pour le lancement.

---

## ÉTAPE 9 — Après les premières ventes

- [ ] À l'expédition : email + numéro de suivi Mondial Relay (peut être manuel au début).
- [ ] À J+7 après réception : demander un avis (Loops).
- [ ] **Avis réels uniquement** : quand tu en as, envoie-les moi, je les ajoute (le système d'avis est prêt et honnête).
- [ ] Photos/vidéos réelles du produit + testimonials réels → me les envoyer pour intégration.

---

## Récap des variables d'environnement (Vercel)

```
# Paiement
STRIPE_SECRET_KEY=sk_live_…
STRIPE_PUBLISHABLE_KEY=pk_live_…
STRIPE_WEBHOOK_SECRET=whsec_…

# Emails
RESEND_API_KEY=re_…
ORDER_FROM=naeul <hello@naeul.com>
LOOPS_API_KEY=…            # déjà configuré

# Site / pré-commande
NEXT_PUBLIC_SITE_URL=https://naeul.com
NEXT_PUBLIC_SHIPPING_DATE=15 septembre 2026   # ← ta vraie date
NEXT_PUBLIC_PREORDER_ENABLED=true
```

## Pour repasser en waitlist (au cas où)

Mettre `NEXT_PUBLIC_PREORDER_ENABLED` sur `false` (ou la supprimer) dans Vercel → redéployer.
Le site revient instantanément en mode waitlist, sans rien casser.

---

## Ce que je peux faire pour toi (dis-le moi)
- Remplir les mentions légales / CPNP / personne responsable dès que tu me donnes les infos.
- Intégrer tes vraies photos / vidéos / avis quand tu les as.
- Ajuster la date, les prix, les textes, le design — à tout moment.

## Ce que je ne peux pas faire (login / secrets / paiement)
- Créer ton auto-entreprise, ton compte Stripe, saisir tes clés secrètes, faire un paiement.
  Ces étapes passent par tes comptes personnels — c'est à toi de les faire (guide ci-dessus).
