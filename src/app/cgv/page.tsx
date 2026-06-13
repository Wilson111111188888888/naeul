import type { Metadata } from "next";
import { ContentPage, Todo } from "@/components/content-page";

export const metadata: Metadata = { title: "Conditions générales de vente" };

export default function CgvPage() {
  return (
    <ContentPage
      title="Conditions générales de vente"
      intro="Les présentes CGV régissent les ventes réalisées sur naeul.com."
      updated="12 juin 2026"
    >
      <h2>1. Objet</h2>
      <p>
        Les présentes conditions s'appliquent à toute commande passée sur le site naeul.com par un
        consommateur. Le vendeur est <Todo>raison sociale</Todo>.
      </p>

      <h2>2. Produits</h2>
      <p>
        Les produits proposés sont des cosmétiques. Les photographies et descriptifs sont les plus
        fidèles possibles mais n'engagent pas le vendeur au-delà des mentions obligatoires.
      </p>

      <h2>3. Prix</h2>
      <p>
        Les prix sont indiqués en euros toutes taxes comprises. Les frais de livraison sont précisés
        avant la validation de la commande. Livraison Mondial Relay 3,50 €, offerte dès 50 €.
      </p>

      <h2>4. Commande et paiement</h2>
      <p>
        Le paiement s'effectue en ligne via Stripe (carte bancaire, Apple Pay, Google Pay). La
        commande est confirmée par email après acceptation du paiement.
      </p>

      <h2>5. Pré-commande — Édition Fondatrices</h2>
      <p>
        Certains produits sont proposés en <strong>pré-commande</strong>. La commande porte alors sur
        un produit dont la fabrication ou la disponibilité est à venir, dans la limite du premier
        batch (édition limitée à 200 unités).
      </p>
      <ul>
        <li>
          <strong>Date d'expédition prévisionnelle</strong> : elle est affichée sur la page produit
          avant la commande et rappelée dans l'email de confirmation. En cas de dépassement
          significatif de cette date, vous pouvez demander le remboursement intégral.
        </li>
        <li>
          <strong>Paiement</strong> : vous êtes débité(e) au moment de la commande, afin de réserver
          votre flacon.
        </li>
        <li>
          <strong>Délai maximal de livraison</strong> : conformément aux articles L216-1 et suivants
          du Code de la consommation, à défaut de livraison dans le délai annoncé, vous pouvez
          résoudre la vente et être remboursé(e). En tout état de cause, le remboursement intégral
          est dû en cas de non-livraison sous 90 jours.
        </li>
        <li>
          Le <strong>droit de rétractation de 14 jours</strong> et la{" "}
          <strong>garantie satisfait ou remboursé 30 jours</strong> s'appliquent à compter de la
          réception (voir ci-dessous).
        </li>
      </ul>

      <h2>6. Livraison</h2>
      <p>
        Les produits sont livrés en France métropolitaine et dans l'Union européenne (FR, BE, LU, MC)
        sous 48 à 72 heures ouvrées après expédition. Tout retard anormal sera signalé.
      </p>

      <h2>7. Droit de rétractation (14 jours)</h2>
      <p>
        Conformément aux articles L221-18 et suivants du Code de la consommation, vous disposez d'un
        délai de <strong>14 jours</strong> à compter de la réception pour exercer votre droit de
        rétractation, sans avoir à justifier de motif. Pour l'exercer, contactez-nous à
        hello@naeul.com. Les frais de retour sont à votre charge, sauf produit défectueux.
      </p>
      <p>
        Au-delà du droit légal, NAEUL applique une politique de retour étendue de 30 jours
        (voir la page <a href="/retours">Retours &amp; remboursements</a>).
      </p>

      <h2>8. Garanties légales</h2>
      <p>
        Tous les produits bénéficient de la garantie légale de conformité (art. L217-3 et suivants)
        et de la garantie contre les vices cachés (art. 1641 et suivants du Code civil).
      </p>

      <h2>9. Données personnelles</h2>
      <p>
        Le traitement de vos données est décrit dans notre{" "}
        <a href="/confidentialite">politique de confidentialité</a>.
      </p>

      <h2>10. Droit applicable</h2>
      <p>Les présentes CGV sont soumises au droit français.</p>
    </ContentPage>
  );
}
