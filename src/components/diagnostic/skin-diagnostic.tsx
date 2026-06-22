"use client";

import { useState } from "react";
import Link from "next/link";
import { track } from "@vercel/analytics";
import { ArrowRight, ArrowLeft, Check, ShieldCheck, Sun, Moon } from "@phosphor-icons/react";
import { QUESTIONS, PROFILES, computeProfile, type ProfileKey } from "@/lib/diagnostic";
import { Container } from "@/components/ui/container";
import { Button, buttonClasses } from "@/components/ui/button";
import { WaitlistForm } from "@/components/waitlist-form";
import { cn } from "@/lib/utils";

type Step = "intro" | number | "gate" | "result";

// Réponses → propriétés de contact Loops (segmentation post-lancement).
function diagnosticProperties(
  answers: Record<string, number | number[]>,
  profile: ProfileKey,
): Record<string, string> {
  const props: Record<string, string> = { skinProfile: PROFILES[profile].title };
  for (const q of QUESTIONS) {
    const a = answers[q.id];
    let val = "";
    if (Array.isArray(a)) val = a.map((i) => q.options[i]?.label).filter(Boolean).join(", ");
    else if (typeof a === "number") val = q.options[a]?.label ?? "";
    if (val) props[`dx_${q.id}`] = val.slice(0, 200);
  }
  return props;
}

export function SkinDiagnostic({ embedded = false }: { embedded?: boolean }) {
  const [step, setStep] = useState<Step>("intro");
  const [answers, setAnswers] = useState<Record<string, number | number[]>>({});
  // h1 sur /diagnostic ; h2 quand embarqué sur la home (SEO : un seul h1 par page).
  const Heading = embedded ? "h2" : "h1";

  function start() {
    track("quiz_started", {});
    setStep(0);
  }

  function answerSingle(qid: string, optIndex: number) {
    setAnswers((a) => ({ ...a, [qid]: optIndex }));
  }
  function toggleMulti(qid: string, optIndex: number) {
    setAnswers((a) => {
      const cur = Array.isArray(a[qid]) ? (a[qid] as number[]) : [];
      const next = cur.includes(optIndex) ? cur.filter((i) => i !== optIndex) : [...cur, optIndex];
      return { ...a, [qid]: next };
    });
  }

  function next() {
    if (typeof step !== "number") return;
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      const profile = computeProfile(answers);
      track("quiz_completed", { profile });
      setStep("gate");
    }
  }
  function back() {
    if (step === 0) setStep("intro");
    else if (typeof step === "number") setStep(step - 1);
  }

  // ----- INTRO -----
  if (step === "intro") {
    return (
      <Container className="py-16 md:py-24">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-stone">Diagnostic peau · gratuit</p>
          <Heading className="mt-3 text-balance text-3xl leading-tight md:text-5xl">
            Quel est ton vrai type de peau grasse ?
          </Heading>
          <p className="mt-5 leading-relaxed text-stone">
            60 secondes pour découvrir ta routine K-beauty personnalisée et recevoir -15% sur ta
            première commande.
          </p>
          <ul className="mx-auto mt-8 flex max-w-sm flex-col gap-2.5 text-left">
            {[
              "100% gratuit, pas d'engagement",
              "Personnalisé selon ton profil exact",
              "Des conseils valables même si tu n'achètes pas",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2.5 text-sm text-ink/85">
                <Check size={17} weight="bold" className="mt-0.5 shrink-0 text-sage" />
                {t}
              </li>
            ))}
          </ul>
          <Button size="lg" className="mt-9" onClick={start}>
            Commencer mon diagnostic
            <ArrowRight size={18} />
          </Button>
        </div>
      </Container>
    );
  }

  // ----- GATE (email obligatoire pour révéler le résultat complet) -----
  if (step === "gate") {
    const profile: ProfileKey = computeProfile(answers);
    const p = PROFILES[profile];
    const props = diagnosticProperties(answers, profile);
    return (
      <Container className="py-16 md:py-24">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-stone">Ton diagnostic est prêt</p>
          <Heading className="mt-3 text-balance text-3xl leading-tight md:text-4xl">{p.title}</Heading>
          <ul className="mx-auto mt-5 flex flex-wrap justify-center gap-2">
            {p.traits.map((t) => (
              <li
                key={t}
                className="rounded-full border border-terracotta/40 bg-cream px-3 py-1 text-xs text-stone"
              >
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-2xl border border-sage/30 bg-sage/[0.05] p-6">
            <p className="font-serif text-xl text-ink">Ta routine personnalisée + ton code -15%</p>
            <p className="mt-2 text-sm leading-relaxed text-stone">
              Laisse ton email : tu vois ton résultat détaillé tout de suite, et on t&apos;envoie ta
              routine matin/soir + ton code -15% en avant-première.
            </p>
            <WaitlistForm
              source={`diagnostic_${profile}`}
              properties={props}
              cta="Voir mon résultat"
              onSuccess={() => setStep("result")}
              className="mx-auto mt-5 max-w-md text-left"
            />
          </div>

          <button
            type="button"
            onClick={() => setStep(QUESTIONS.length - 1)}
            className="mt-5 text-sm text-stone underline-offset-4 hover:text-ink hover:underline"
          >
            Revenir aux questions
          </button>
        </div>
      </Container>
    );
  }

  // ----- RESULT -----
  if (step === "result") {
    const profile: ProfileKey = computeProfile(answers);
    const p = PROFILES[profile];
    return (
      <Container className="py-16 md:py-24">
        <div className="mx-auto max-w-2xl">
          <p className="text-center text-xs uppercase tracking-[0.25em] text-stone">Ton profil</p>
          <Heading className="mt-3 text-center text-balance text-3xl leading-tight md:text-4xl">{p.title}</Heading>
          <p className="mt-5 leading-relaxed text-stone">{p.intro}</p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {p.traits.map((t) => (
              <li
                key={t}
                className="rounded-full border border-terracotta/40 bg-cream px-3 py-1 text-xs text-stone"
              >
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-2xl border border-line bg-cream p-6">
            <p className="text-sm font-medium text-ink">Ce qu'il te faut</p>
            <p className="mt-2 text-sm leading-relaxed text-stone">{p.needs}</p>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-line bg-sand p-5">
              <p className="flex items-center gap-2 text-sm font-medium text-ink">
                <Sun size={18} className="text-sage" /> Matin
              </p>
              <p className="mt-2 text-sm leading-relaxed text-stone">{p.routine.matin}</p>
            </div>
            <div className="rounded-2xl border border-line bg-sand p-5">
              <p className="flex items-center gap-2 text-sm font-medium text-ink">
                <Moon size={18} className="text-sage" /> Soir
              </p>
              <p className="mt-2 text-sm leading-relaxed text-stone">{p.routine.soir}</p>
            </div>
          </div>

          {p.note && (
            <p className="mt-5 flex items-start gap-2 rounded-xl bg-sand px-4 py-3 text-xs leading-relaxed text-stone">
              <ShieldCheck size={16} className="mt-0.5 shrink-0 text-sage" />
              {p.note}
            </p>
          )}

          {/* Email déjà collecté au gate — confirmation honnête. */}
          <div className="mt-8 flex items-start gap-3 rounded-2xl border border-sage/30 bg-sage/[0.05] p-5">
            <Check size={20} weight="bold" className="mt-0.5 shrink-0 text-sage" />
            <p className="text-sm leading-relaxed text-stone">
              C&apos;est noté — ton profil détaillé et ton code -15% arrivent par email, en
              avant-première du lancement. Surveille ta boîte de réception.
            </p>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/le-produit"
              onClick={() => track("quiz_cta_clicked", { profile })}
              className={buttonClasses({ size: "lg" })}
            >
              Découvrir le sérum
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </Container>
    );
  }

  // ----- QUESTIONS -----
  const q = QUESTIONS[step];
  const total = QUESTIONS.length;
  const isMulti = q.type === "multi";
  const cur = answers[q.id];
  const answered = isMulti ? Array.isArray(cur) && cur.length > 0 : typeof cur === "number";

  return (
    <Container className="py-12 md:py-20">
      <div className="mx-auto max-w-xl">
        {/* Progression */}
        <div className="flex items-center gap-3">
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-line">
            <div
              className="h-full rounded-full bg-sage transition-all duration-300"
              style={{ width: `${((step + 1) / total) * 100}%` }}
            />
          </div>
          <span className="shrink-0 text-xs tabular-nums text-stone">
            {step + 1} / {total}
          </span>
        </div>

        <h2 className="mt-8 text-balance text-2xl leading-snug md:text-3xl">{q.text}</h2>
        {isMulti && <p className="mt-2 text-sm text-stone">Plusieurs réponses possibles.</p>}

        <ul className="mt-6 space-y-3">
          {q.options.map((opt, i) => {
            const on = isMulti ? Array.isArray(cur) && cur.includes(i) : cur === i;
            return (
              <li key={opt.label}>
                <button
                  type="button"
                  onClick={() => (isMulti ? toggleMulti(q.id, i) : answerSingle(q.id, i))}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl border p-4 text-left text-sm transition-colors",
                    on ? "border-sage bg-sage/[0.06] text-ink" : "border-ink/12 bg-cream text-ink hover:border-ink/25",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-5 w-5 shrink-0 items-center justify-center border-2 transition-colors",
                      isMulti ? "rounded-md" : "rounded-full",
                      on ? "border-sage bg-sage" : "border-ink/25",
                    )}
                  >
                    {on && <Check size={12} weight="bold" className="text-cream" />}
                  </span>
                  {opt.label}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-8 flex items-center justify-between">
          <button
            type="button"
            onClick={back}
            className="flex items-center gap-1.5 text-sm text-stone transition-colors hover:text-ink"
          >
            <ArrowLeft size={16} /> Retour
          </button>
          <Button onClick={next} disabled={!answered}>
            {step === total - 1 ? "Voir mon résultat" : "Suivant"}
            <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </Container>
  );
}
