import type { Metadata } from "next";
import { ContentPage } from "@/components/content-page";

export const metadata: Metadata = { title: "Retours & remboursements" };

export default function RetoursPage() {
  return (
    <ContentPage
      title="Retours & remboursements"
      intro="30 jours pour changer d'avis, même produit ouvert et utilisé."
      updated="12 juin 2026"
    >
      <h2>Notre engagement : 30 jours</h2>
      <p>
        Nous savons qu'une routine met quelques semaines à montrer ses effets. C'est pourquoi NAEUL
        va au-delà du droit de rétractation légal de 14 jours : vous disposez de{" "}
        <strong>30 jours</strong> à compter de la réception pour demander un remboursement, même si
        le produit a été ouvert et utilisé.
      </p>

      <h2>Comment procéder</h2>
      <ol>
        <li>Écrivez à contact@naeul.fr en indiquant votre numéro de commande.</li>
        <li>Nous vous envoyons les instructions de retour sous 24-48h ouvrées.</li>
        <li>Renvoyez le produit (même entamé) à l'adresse indiquée.</li>
        <li>Le remboursement est effectué sous 14 jours après réception, sur le moyen de paiement initial.</li>
      </ol>

      <h2>Frais de retour</h2>
      <p>
        Les frais de retour sont à votre charge, sauf en cas de produit défectueux ou d'erreur de
        notre part — auquel cas nous prenons tout en charge.
      </p>

      <h2>Produit défectueux</h2>
      <p>
        Si votre commande arrive endommagée, envoyez-nous une photo à contact@naeul.fr : nous
        réexpédions ou remboursons immédiatement, sans retour nécessaire.
      </p>
    </ContentPage>
  );
}
