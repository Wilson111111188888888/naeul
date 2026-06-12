"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CheckCircle } from "@phosphor-icons/react";
import { useCart } from "@/lib/store/cart";
import { Container } from "@/components/ui/container";
import { buttonClasses } from "@/components/ui/button";

export default function OrderConfirmedPage() {
  const clear = useCart((s) => s.clear);

  // Le paiement a réussi : on vide le panier.
  useEffect(() => {
    clear();
  }, [clear]);

  return (
    <Container className="flex flex-col items-center py-28 text-center">
      <CheckCircle size={56} weight="light" className="text-sage" />
      <h1 className="mt-6 text-4xl">Merci pour votre commande</h1>
      <p className="mt-4 max-w-md leading-relaxed text-stone">
        Votre paiement a bien été reçu. Vous allez recevoir un email de confirmation,
        puis un suivi dès l'expédition de vos pads.
      </p>
      <p className="mt-6 max-w-md text-sm text-stone">
        Premier conseil : commencez un soir sur deux la première semaine si votre peau
        n'a jamais été exfoliée. Et n'oubliez pas le SPF 30 le matin.
      </p>
      <Link href="/" className={buttonClasses({ size: "lg", className: "mt-8" })}>
        Retour à l'accueil
      </Link>
    </Container>
  );
}
