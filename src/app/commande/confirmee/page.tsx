import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, Package, EnvelopeSimple, ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui/container";
import { buttonClasses } from "@/components/ui/button";
import { SHIPPING_DATE } from "@/lib/preorder";

export const metadata: Metadata = {
  title: "Pré-commande confirmée",
  robots: { index: false, follow: false },
};

export default function OrderConfirmedPage() {
  return (
    <Container className="flex flex-col items-center py-24 text-center md:py-28">
      <CheckCircle size={56} weight="light" className="text-sage" />
      <h1 className="mt-6 text-4xl">Bienvenue chez les fondatrices</h1>
      <p className="mt-4 max-w-md leading-relaxed text-stone">
        Ta pré-commande est confirmée. Tu fais désormais partie des premières à porter naeul —
        merci pour ta confiance avant même le lancement officiel.
      </p>

      <div className="mt-9 w-full max-w-sm space-y-4 rounded-2xl border border-line bg-cream p-6 text-left text-sm">
        <p className="flex items-start gap-3 text-stone">
          <Package size={20} className="mt-0.5 shrink-0 text-sage" />
          <span>
            <strong className="text-ink">Expédition prévue</strong> : {SHIPPING_DATE}. Tu recevras
            un suivi Mondial Relay dès l&apos;envoi de ton flacon.
          </span>
        </p>
        <p className="flex items-start gap-3 text-stone">
          <EnvelopeSimple size={20} className="mt-0.5 shrink-0 text-sage" />
          <span>
            <strong className="text-ink">Un email de confirmation</strong> arrive dans quelques
            minutes, avec le récapitulatif de ta commande.
          </span>
        </p>
        <p className="flex items-start gap-3 text-stone">
          <ShieldCheck size={20} className="mt-0.5 shrink-0 text-sage" />
          <span>
            <strong className="text-ink">30 jours pour tester</strong> dès réception. Si naeul ne te
            convient pas, on te rembourse intégralement, même flacon entamé.
          </span>
        </p>
      </div>

      <p className="mt-8 max-w-md text-sm text-stone">
        Une question ? Écris-nous à{" "}
        <a href="mailto:hello@naeul.com" className="text-sage underline underline-offset-4">
          hello@naeul.com
        </a>
        , on te répond personnellement.
      </p>

      <Link href="/" className={buttonClasses({ size: "lg", className: "mt-8" })}>
        Retour à l&apos;accueil
      </Link>
    </Container>
  );
}
