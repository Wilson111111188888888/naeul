import Link from "next/link";
import { Container } from "@/components/ui/container";
import { buttonClasses } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center py-32 text-center">
      <p className="font-serif text-6xl text-terracotta">404</p>
      <h1 className="mt-4 text-3xl">Cette page a disparu</h1>
      <p className="mt-3 max-w-sm text-stone">
        Le lien est peut-être ancien. Revenons à l'essentiel.
      </p>
      <Link href="/" className={buttonClasses({ size: "lg", className: "mt-8" })}>
        Retour à l'accueil
      </Link>
    </Container>
  );
}
