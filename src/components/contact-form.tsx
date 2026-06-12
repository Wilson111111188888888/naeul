"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle } from "@phosphor-icons/react";
import { Input, Textarea, Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const schema = z.object({
  name: z.string().min(2, "Indiquez votre nom."),
  email: z.string().email("Email invalide."),
  message: z.string().min(10, "Votre message est un peu court."),
});

type FormValues = z.infer<typeof schema>;

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    setError,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Envoi impossible.");
      }
      reset();
    } catch (err) {
      setError("root", {
        message: err instanceof Error ? err.message : "Une erreur est survenue.",
      });
    }
  }

  if (isSubmitSuccessful) {
    return (
      <div className="flex flex-col items-start gap-3 rounded-2xl border border-line bg-cream p-8">
        <CheckCircle size={36} weight="light" className="text-sage" />
        <h2 className="text-xl">Message envoyé</h2>
        <p className="text-sm leading-relaxed text-stone">
          Merci, nous revenons vers vous sous 24-48h ouvrées à l'adresse indiquée.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div>
        <Label htmlFor="name">Nom</Label>
        <Input id="name" autoComplete="name" {...register("name")} aria-invalid={!!errors.name} />
        {errors.name && <p className="mt-1.5 text-sm text-terracotta">{errors.name.message}</p>}
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" autoComplete="email" {...register("email")} aria-invalid={!!errors.email} />
        {errors.email && <p className="mt-1.5 text-sm text-terracotta">{errors.email.message}</p>}
      </div>
      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" {...register("message")} aria-invalid={!!errors.message} />
        {errors.message && <p className="mt-1.5 text-sm text-terracotta">{errors.message.message}</p>}
      </div>

      {errors.root && <p className="text-sm text-terracotta">{errors.root.message}</p>}

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? "Envoi…" : "Envoyer le message"}
      </Button>
    </form>
  );
}
