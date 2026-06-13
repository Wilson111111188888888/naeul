import type { Metadata } from "next";
import {
  EnvelopeSimple,
  Clock,
  InstagramLogo,
  TiktokLogo,
} from "@phosphor-icons/react/dist/ssr";
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
          <p className="text-xs uppercase tracking-[0.25em] text-stone">Contact</p>
          <h1 className="mt-3 text-4xl md:text-5xl">Nous écrire</h1>
          <p className="mt-4 leading-relaxed text-stone">
            Une question sur la marque, le sérum ou ton inscription ? On te répond personnellement.
          </p>

          <div className="mt-8 space-y-5">
            <div className="flex items-start gap-3.5">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sage/10 text-sage">
                <EnvelopeSimple size={18} />
              </span>
              <div>
                <p className="text-sm font-medium text-ink">Email</p>
                <a
                  href="mailto:hello@naeul.com"
                  className="text-sm text-stone underline-offset-4 hover:text-sage hover:underline"
                >
                  hello@naeul.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sage/10 text-sage">
                <Clock size={18} />
              </span>
              <div>
                <p className="text-sm font-medium text-ink">Délai de réponse</p>
                <p className="text-sm text-stone">Sous 24-48 h ouvrées.</p>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-line pt-6">
            <p className="text-sm text-stone">Suis-nous</p>
            <div className="mt-3 flex gap-3">
              <a
                href="https://www.instagram.com/naeul_by_kbeauty"
                aria-label="naeul sur Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-ink transition-colors hover:border-sage hover:text-sage"
              >
                <InstagramLogo size={18} />
              </a>
              <a
                href="https://www.tiktok.com/@naeul.bykbeauty"
                aria-label="naeul sur TikTok"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-ink transition-colors hover:border-sage hover:text-sage"
              >
                <TiktokLogo size={18} />
              </a>
            </div>
          </div>
        </div>

        <ContactForm />
      </div>
    </Container>
  );
}
