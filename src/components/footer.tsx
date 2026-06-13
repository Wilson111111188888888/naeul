import Link from "next/link";
import { InstagramLogo, TiktokLogo, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui/container";
import { Wordmark } from "@/components/wordmark";
import { buttonClasses } from "@/components/ui/button";

const LEGAL = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/confidentialite", label: "Confidentialité" },
];

const NAV = [
  { href: "/le-produit", label: "Le produit" },
  { href: "/blog", label: "Journal" },
  { href: "/a-propos", label: "À propos" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-cream">
      <Container className="py-16">
        {/* Bande CTA — présente sur toutes les pages */}
        <div className="flex flex-col items-start gap-6 border-b border-line pb-12 md:flex-row md:items-center md:justify-between">
          <div className="max-w-md">
            <h2 className="font-serif text-2xl text-ink md:text-3xl">
              Sois prévenue en avant-première.
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-stone">
              -15% au lancement, accès prioritaire au premier batch. Inscription gratuite, pas de spam.
            </p>
          </div>
          <Link href="/#precommande" className={buttonClasses({ size: "lg" })}>
            Je veux être prévenue (-15%)
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="mt-12 grid gap-12 md:grid-cols-[1.6fr_1fr_1fr]">
          <div className="max-w-xs">
            <Wordmark className="text-2xl" hangulClassName="text-[0.6rem] tracking-[0.3em]" />
            <p className="mt-5 text-sm leading-relaxed text-stone">
              K-beauty pour peau grasse, sans agresser. Notre premier sérum arrive bientôt —
              inscris-toi pour être prévenue en avant-première.
            </p>
            <a
              href="mailto:hello@naeul.com"
              className="mt-4 inline-block text-sm text-ink/80 underline underline-offset-4 transition-colors hover:text-sage"
            >
              hello@naeul.com
            </a>
            <div className="mt-5 flex gap-3">
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

          <div>
            <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-stone">
              La marque
            </h3>
            <ul className="mt-4 space-y-3">
              {NAV.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-ink/80 transition-colors hover:text-sage">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-stone">
              Informations
            </h3>
            <ul className="mt-4 space-y-3">
              {LEGAL.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-ink/80 transition-colors hover:text-sage">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 text-xs text-stone md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} naeul. Tous droits réservés.</p>
          <p className="tracking-wide text-stone/80">
            K-beauty française · Vegan · ECOCERT · sans parfum
          </p>
        </div>
      </Container>
    </footer>
  );
}
