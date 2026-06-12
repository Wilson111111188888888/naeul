import { SealCheck, Leaf, Certificate, MapPin } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui/container";
import { HERO_PRODUCT } from "@/lib/products";

const ITEMS = [
  { icon: SealCheck, label: "ISO 22716 & ECOCERT", sub: "Laboratoire certifié" },
  { icon: Leaf, label: "Vegan, sans parfum", sub: "Sans gluten" },
  { icon: Certificate, label: "CPNP enregistré", sub: HERO_PRODUCT.cpnp },
  { icon: MapPin, label: "Designed in France", sub: "Made in EU (Lettonie)" },
];

/** Preuves de confiance réelles — substitut honnête aux avis avant lancement. */
export function TrustStrip() {
  return (
    <section className="border-y border-line bg-cream">
      <Container className="py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((item) => (
            <div key={item.label} className="flex items-start gap-3">
              <item.icon size={24} className="mt-0.5 shrink-0 text-sage" />
              <div>
                <p className="text-sm font-medium text-ink">{item.label}</p>
                <p className="text-xs text-stone">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
