# 🧭 Ce que vous gérez de votre côté (toi + ta femme)

Tout ce qui ci-dessous **ne peut pas être codé** : ça passe par vos comptes, votre identité,
votre argent, le vrai produit. Le site, lui, est prêt (voir `LANCEMENT.md` pour le branchement technique).

Légende priorité :
- 🔴 **Bloquant** : indispensable AVANT d'encaisser le 1er euro
- 🟡 **Avant le lancement public**
- 🟢 **En continu** (pendant/après le lancement)

> Note : l'entreprise et Stripe seront au nom de **ta femme** (française). Tout doit être cohérent
> à son nom : auto-entreprise, pièce d'identité Stripe, IBAN, compte bancaire.

---

## 1. Juridique & administratif

- [ ] 🔴 **Créer l'auto-entreprise** au nom de ta femme — autoentrepreneur.urssaf.fr (gratuit, 1-3 j).
      Activité : vente de cosmétiques / commerce de détail.
- [ ] 🔴 **Récupérer le SIRET** (et le nom officiel / adresse).
- [ ] 🔴 Me transmettre : **raison sociale (nom), SIRET, adresse, n° CPNP, personne responsable UE**
      → je remplis les pages /mentions-legales et /confidentialite (placeholders actuels).
- [ ] 🟡 **Faire relire les CGV** (pré-commande) — idéalement par un pro. Je les ai rédigées solides,
      mais je ne suis pas avocat.
- [ ] 🟢 TVA : en franchise en base au début (pas de TVA à facturer), surveiller les seuils.

---

## 2. Comptes & accès

- [ ] 🔴 **Compte Stripe** (au nom de ta femme) : identité + IBAN → clés API (voir `LANCEMENT.md` ét. 1-2).
- [ ] 🔴 **Boîte mail `hello@naeul.com`** qui fonctionne (ou redirection) — c'est l'adresse de contact
      partout sur le site et dans les emails.
- [ ] 🟡 **Resend** : vérifier le domaine `naeul.com` (DNS Gandi) pour envoyer depuis hello@naeul.com.
- [ ] 🟡 **Vercel** : coller les variables d'environnement (Stripe, date, flag) — `LANCEMENT.md` ét. 3-4-7.
- [ ] 🟡 **Loops** : créer les flows d'emails (textes déjà écrits dans `marketing/loops-emails.md`).
- [ ] 🟡 **Comptes sociaux** @naeul (Instagram / TikTok) — les liens sont déjà dans le footer du site.
- [ ] 🟢 (Optionnel) Dépôt de la **marque naeul à l'INPI** (classe 3 — cosmétiques).

---

## 3. Argent

- [ ] 🔴 **Compte bancaire dédié** à l'activité (au nom de ta femme).
- [ ] 🔴 **Fixer la date d'expédition** à annoncer (obligation légale). Conseil : J+50 mini après lancement,
      pour avoir de la marge sur le batch Selfnamed. → tu me la donnes / tu la mets dans Vercel.
- [ ] 🟢 **Ne pas dépenser l'argent des pré-commandes** avant d'avoir livré : il sert à payer le batch.
- [ ] 🟢 Garder un œil sur les **frais Stripe** (~1,4 % + 0,25 € par vente EU) et la compta.

---

## 4. Produit & logistique

- [ ] 🔴 **Commander le sample** chez Selfnamed et le **tester** (ta femme + 2-3 proches).
- [ ] 🔴 **Valider la conformité** du produit reçu (formule, étiquetage, INCI, CPNP).
- [ ] 🟡 **Définir le volume du batch initial** (selon les pré-commandes) et le commander chez Selfnamed
      (délai prod ~2-3 semaines).
- [ ] 🟡 **Emballage d'expédition** (carton, protection, éventuel petit mot « fondatrice »).
- [ ] 🟡 **Compte Mondial Relay** (ou solution d'envoi) pour expédier.
- [ ] 🟢 **Expédier** chaque commande + envoyer le **numéro de suivi** (manuel au début, OK).

---

## 5. Contenu réel (à me transmettre, je l'intègre)

> Règle qu'on garde : **rien de faux**. Pas de faux avis, pas de fausse photo « résultat ».

- [ ] 🟡 **Photos macro / texture** réelles du sérum (un shoot smartphone suffit) → remplacent mes visuels déco.
- [ ] 🟡 **Vidéo produit 15-30 s** (flacon, pompe, application, texture) → je la mets en page produit.
- [ ] 🟡 **Photo fondatrice / couple** (authentique) → section « La fondatrice » sur /a-propos.
- [ ] 🟢 **Testimonials réels** (3-4 personnes, vrai prénom + âge + type de peau) → je les ajoute aux avis.

---

## 6. Communication / marketing

- [ ] 🟡 **Préparer la com' pré-lancement** (TikTok / Instagram) avec ta femme.
- [ ] 🟡 **Annonce d'ouverture** des pré-commandes (story, post, lien vers naeul.com/le-produit).
- [ ] 🟢 **Contenu régulier** pendant la phase pré-commande (2 vidéos/jour conseillé dans le doc).
- [ ] 🟢 **Collecter de l'UGC** (avis, photos clientes) après réception.

---

## 7. Service client (dès la 1re vente)

- [ ] 🟢 **Surveiller hello@naeul.com** et répondre vite.
- [ ] 🟢 Gérer les **rétractations 14 j** (remboursement produit + livraison aller) et la **garantie 30 j**.
- [ ] 🟢 En cas de **retard** : communiquer TÔT et clairement (un retard non communiqué = avis négatif).

---

## 8. Risques à garder en tête

- **Cash flow** : l'argent encaissé doit financer le batch, pas être dépensé.
- **Retard / non-livraison** : promesse non tenue = remboursement obligatoire + risque DGCCRF.
- **Conformité produit** : tester le sample sérieusement avant d'ouvrir les ventes.
- **Réputation** : sur-communiquer plutôt que sous-communiquer. Dépasser les attentes.

---

## Ordre conseillé (le chemin le plus court)

1. 🔴 Auto-entreprise (ta femme) → SIRET
2. 🔴 Compte bancaire + Stripe (au nom de ta femme)
3. 🔴 Sample Selfnamed commandé + testé
4. 🔴 Fixer la date d'expédition + me donner les infos légales (je remplis le site)
5. 🟡 Brancher Stripe/Resend/Vercel en **test** (`LANCEMENT.md`) → tester une commande
6. 🟡 Photos/vidéo/avis réels → je les intègre
7. 🟡 Passer Stripe en **live** + ouvrir les pré-commandes
8. 🟡 Annonce TikTok / Insta
9. 🟢 Expéditions, service client, suivi

---

### Pour mémoire — ce que MOI je fais (côté code), quand tu me donnes la matière
Mentions légales/CPNP remplies · intégration photos/vidéo/avis réels · ajustement date/prix/textes ·
design · nouvelles sections · emails. Tu me dis, je fais.
