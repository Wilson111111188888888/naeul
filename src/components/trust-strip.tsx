import { SealCheck, Leaf, Certificate } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui/container";

const ITEMS = [
  { icon: SealCheck, label: "ISO 22716 · ECOCERT" },
  { icon: Leaf, label: "Vegan · sans parfum · sans gluten" },
  { icon: Certificate, label: "Conforme aux normes EU · CPNP en cours" },
];

/** Bande de réassurance slim — preuves réelles, sur une seule ligne. */
export function TrustStrip() {
  return (
    <section className="border-y border-line bg-cream">
      <Container className="flex flex-col items-center justify-center gap-4 py-5 text-center sm:flex-row sm:gap-10">
        {ITEMS.map((item) => (
          <span key={item.label} className="inline-flex items-center gap-2 text-sm text-stone">
            <item.icon size={18} weight="regular" className="shrink-0 text-sage" />
            {item.label}
          </span>
        ))}
      </Container>
    </section>
  );
}
