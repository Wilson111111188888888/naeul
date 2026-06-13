import type { Metadata } from "next";
import { ContentPage, Todo } from "@/components/content-page";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site naeul.com : éditeur, hébergeur, personne responsable cosmétique, médiation.",
  alternates: { canonical: "/mentions-legales" },
};

export default function MentionsLegalesPage() {
  return (
    <ContentPage title="Mentions légales" updated="12 juin 2026">
      <p>
        Conformément à la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l&apos;économie
        numérique (LCEN), voici les informations relatives à l&apos;éditeur et à l&apos;hébergeur
        du site naeul.com.
      </p>

      <h2>Éditeur du site</h2>
      <p>
        Le site naeul.com est édité par <Todo>Prénom NOM</Todo>, entrepreneur individuel exerçant
        sous le régime de la micro-entreprise, sous l&apos;enseigne commerciale «&nbsp;naeul&nbsp;».
      </p>
      <ul>
        <li>Adresse : <Todo>adresse complète du siège</Todo></li>
        <li>SIRET : <Todo>numéro SIRET à 14 chiffres</Todo></li>
        <li>Numéro de TVA intracommunautaire : non applicable — TVA non applicable, article 293 B du CGI (franchise en base)</li>
        <li>Email : hello@naeul.com</li>
        <li>Directeur / Directrice de la publication : <Todo>Prénom NOM</Todo></li>
      </ul>

      <h2>Hébergement</h2>
      <p>
        Le site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis —{" "}
        <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">vercel.com</a>.
      </p>

      <h2>Produits cosmétiques — personne responsable</h2>
      <p>
        Conformément au règlement (CE) n° 1223/2009 relatif aux produits cosmétiques, chaque produit
        commercialisé dispose d&apos;une personne responsable établie dans l&apos;Union européenne et
        d&apos;une notification au portail CPNP.
      </p>
      <ul>
        <li>Fabrication : laboratoire partenaire certifié ISO 22716 et ECOCERT, établi dans l&apos;Union européenne</li>
        <li>Notification CPNP : <Todo>numéro CPNP du produit</Todo></li>
        <li>Personne responsable UE : <Todo>nom et adresse de la personne responsable</Todo></li>
      </ul>

      <h2>Propriété intellectuelle</h2>
      <p>
        L&apos;ensemble des éléments du site (marque «&nbsp;naeul&nbsp;», logo, textes, visuels,
        photographies, mise en page) est protégé par le droit de la propriété intellectuelle et
        demeure la propriété exclusive de l&apos;éditeur, sauf mention contraire. Toute
        reproduction, représentation ou diffusion, totale ou partielle, sans autorisation écrite
        préalable est interdite.
      </p>

      <h2>Données personnelles & cookies</h2>
      <p>
        Le traitement de vos données personnelles est décrit dans notre{" "}
        <a href="/confidentialite">politique de confidentialité</a>. Le site n&apos;utilise pas de
        cookie publicitaire ; la mesure d&apos;audience est anonyme.
      </p>

      <h2>Médiation de la consommation</h2>
      <p>
        Conformément à l&apos;article L612-1 du Code de la consommation, le consommateur peut
        recourir gratuitement à un médiateur de la consommation en vue de la résolution amiable d&apos;un
        litige : <Todo>nom et coordonnées du médiateur</Todo>. Plateforme européenne de règlement en
        ligne des litiges :{" "}
        <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">
          ec.europa.eu/consumers/odr
        </a>
        .
      </p>

      <h2>Droit applicable</h2>
      <p>
        Le présent site et les présentes mentions légales sont soumis au droit français. Pour toute
        question, écrivez-nous à hello@naeul.com.
      </p>
    </ContentPage>
  );
}
