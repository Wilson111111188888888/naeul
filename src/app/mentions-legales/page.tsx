import type { Metadata } from "next";
import { ContentPage, Todo } from "@/components/content-page";

export const metadata: Metadata = { title: "Mentions légales" };

export default function MentionsLegalesPage() {
  return (
    <ContentPage title="Mentions légales" updated="12 juin 2026">
      <h2>Éditeur du site</h2>
      <p>
        Le site naeul.fr est édité par <Todo>raison sociale</Todo>, société{" "}
        <Todo>forme juridique (SAS, SASU…)</Todo> au capital de <Todo>montant</Todo> €.
      </p>
      <ul>
        <li>Siège social : <Todo>adresse complète</Todo></li>
        <li>SIRET : <Todo>n° SIRET</Todo></li>
        <li>RCS : <Todo>ville + n°</Todo></li>
        <li>TVA intracommunautaire : <Todo>n° TVA</Todo></li>
        <li>Directeur de la publication : <Todo>nom du représentant légal</Todo></li>
        <li>Contact : contact@naeul.fr</li>
      </ul>

      <h2>Hébergement</h2>
      <p>
        Le site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis —
        vercel.com.
      </p>

      <h2>Personne responsable (cosmétiques)</h2>
      <p>
        Conformément au règlement (CE) n° 1223/2009, la personne responsable des produits
        cosmétiques commercialisés est <Todo>nom et adresse de la personne responsable UE</Todo>.
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L'ensemble des éléments du site (marque NAEUL, textes, visuels, logo) est protégé.
        Toute reproduction sans autorisation est interdite.
      </p>

      <h2>Médiation de la consommation</h2>
      <p>
        En cas de litige, le consommateur peut recourir gratuitement au médiateur de la
        consommation <Todo>nom du médiateur</Todo> ou à la plateforme européenne de règlement en
        ligne des litiges : <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">ec.europa.eu/consumers/odr</a>.
      </p>
    </ContentPage>
  );
}
