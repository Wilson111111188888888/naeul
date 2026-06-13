import type { Metadata } from "next";
import { ContentPage, Todo } from "@/components/content-page";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Comment naeul traite vos données personnelles, dans le respect du RGPD.",
  alternates: { canonical: "/confidentialite" },
};

export default function ConfidentialitePage() {
  return (
    <ContentPage
      title="Politique de confidentialité"
      intro="Nous traitons vos données dans le respect du RGPD."
      updated="12 juin 2026"
    >
      <h2>Responsable du traitement</h2>
      <p>
        Le responsable du traitement est <Todo>raison sociale</Todo>, joignable à hello@naeul.com.
      </p>

      <h2>Données collectées</h2>
      <ul>
        <li>Adresse email lors d'une inscription à la précommande / liste d'avant-première.</li>
        <li>Nom, email et message lorsque vous utilisez le formulaire de contact.</li>
        <li>Données de navigation anonymisées via Vercel Analytics (sans cookie).</li>
      </ul>

      <h2>Finalités</h2>
      <ul>
        <li>Vous prévenir du lancement et vous envoyer votre code de bienvenue.</li>
        <li>Répondre à vos demandes via le formulaire de contact.</li>
        <li>Améliorer le site et mesurer son audience de façon agrégée et anonyme.</li>
      </ul>

      <h2>Base légale</h2>
      <p>
        Consentement (inscription à la liste, contact) et intérêt légitime (mesure d'audience
        anonyme).
      </p>

      <h2>Sous-traitants</h2>
      <p>
        Resend (emails transactionnels), Loops (email marketing et liste d'avant-première), Vercel
        (hébergement), Vercel Analytics (mesure d'audience). Ces prestataires présentent des garanties
        conformes au RGPD.
      </p>

      <h2>Durée de conservation</h2>
      <p>
        Données de la liste d'avant-première : jusqu'à votre désinscription. Messages de contact :
        le temps nécessaire au traitement de votre demande.
      </p>

      <h2>Vos droits</h2>
      <p>
        Vous disposez d'un droit d'accès, de rectification, d'effacement, d'opposition, de limitation
        et de portabilité. Pour les exercer, écrivez à hello@naeul.com. Vous pouvez introduire une
        réclamation auprès de la CNIL (cnil.fr).
      </p>

      <h2>Cookies</h2>
      <p>
        Le site n'utilise pas de cookies publicitaires. La mesure d'audience (Vercel Analytics) fonctionne
        sans cookie. Un consentement vous est demandé pour tout traceur non essentiel.
      </p>
    </ContentPage>
  );
}
