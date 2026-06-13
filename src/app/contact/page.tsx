import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Une question sur la marque naeul, le sérum ou la précommande ? Écris-nous.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <Container className="py-16 md:py-24">
      <div className="grid gap-12 md:grid-cols-2 md:gap-20">
        <div>
          <h1 className="text-4xl md:text-5xl">Nous écrire</h1>
          <p className="mt-4 leading-relaxed text-stone">
            Une question sur la marque, le sérum ou ton inscription ? On te répond sous
            24-48h ouvrées.
          </p>
          <dl className="mt-8 space-y-4 text-sm">
            <div>
              <dt className="font-medium text-ink">Email</dt>
              <dd className="text-stone">hello@naeul.com</dd>
            </div>
            <div>
              <dt className="font-medium text-ink">Précommande</dt>
              <dd className="text-stone">
                Inscris-toi sur la{" "}
                <a href="/#precommande" className="text-sage underline underline-offset-2">
                  page d&apos;accueil
                </a>{" "}
                pour être prévenue en avant-première.
              </dd>
            </div>
          </dl>
        </div>

        <ContactForm />
      </div>
    </Container>
  );
}
