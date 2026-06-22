import type { Metadata } from "next";
import { Check } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui/container";
import { WaitlistForm } from "@/components/waitlist-form";
import { CercleJoinButton } from "@/components/cercle-join-button";
import { CERCLE_ENABLED, CERCLE_PRICE, CERCLE_PERKS } from "@/lib/membership";

export const metadata: Metadata = {
  title: "Le Cercle — le suivi peau grasse de naeul",
  description:
    "Le Cercle naeul : une experte peau grasse à ton écoute, un suivi photo trimestriel, -15 % permanent et la priorité sur les nouveautés. Membership annuel.",
  alternates: { canonical: "/cercle" },
};

export default function CerclePage() {
  return (
    <Container className="py-16 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-stone">Le Cercle</p>
        <h1 className="mt-3 text-balance font-serif text-4xl leading-tight md:text-5xl">
          Le sérum, c&apos;est le début. Le suivi, c&apos;est la marque.
        </h1>
        <p className="mt-5 leading-relaxed text-stone">
          The Ordinary te vend un flacon et te laisse te débrouiller. Le Cercle, c&apos;est
          l&apos;inverse : quelqu&apos;un s&apos;occupe de ta peau grasse <em>avec</em>{" "}toi, toute
          l&apos;année.
        </p>
      </div>

      <ul className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-2">
        {CERCLE_PERKS.map((p) => (
          <li key={p.title} className="flex gap-3 rounded-2xl border border-line bg-cream p-6">
            <Check size={20} weight="bold" className="mt-0.5 shrink-0 text-sage" />
            <div>
              <p className="font-medium text-ink">{p.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-stone">{p.detail}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mx-auto mt-12 flex max-w-md flex-col items-center gap-4 text-center">
        {CERCLE_ENABLED ? (
          <>
            <p className="font-serif text-3xl text-ink">
              {CERCLE_PRICE} € <span className="text-base text-stone">/ an</span>
            </p>
            <CercleJoinButton />
            <p className="text-xs leading-relaxed text-stone/70">
              Sans engagement, annulable à tout moment. Le -15 % se rentabilise dès 3-4 flacons par
              an.
            </p>
          </>
        ) : (
          <>
            <p className="font-serif text-2xl text-ink">Le Cercle ouvre avec le lancement.</p>
            <p className="text-sm leading-relaxed text-stone">
              Laisse ton email : tu seras prévenue en avant-première, et les fondatrices auront une
              place réservée.
            </p>
            <WaitlistForm source="cercle" cta="Me prévenir pour Le Cercle" className="w-full" />
          </>
        )}
      </div>
    </Container>
  );
}
