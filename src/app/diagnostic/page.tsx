import type { Metadata } from "next";
import { SkinDiagnostic } from "@/components/diagnostic/skin-diagnostic";

export const metadata: Metadata = {
  title: "Diagnostic peau grasse gratuit (60 sec)",
  description:
    "Découvre ton profil peau grasse en 60 secondes : routine K-beauty personnalisée + -15% sur ta première commande. Gratuit, sans engagement.",
  alternates: { canonical: "/diagnostic" },
};

export default function DiagnosticPage() {
  return <SkinDiagnostic />;
}
