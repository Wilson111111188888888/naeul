import Link from "next/link";
import { InstagramLogo, TiktokLogo } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui/container";
import { Wordmark } from "@/components/wordmark";

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
        <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1fr]">
          <div className="max-w-xs">
            <Wordmark className="text-2xl" hangulClassName="text-[0.6rem] tracking-[0.3em]" />
            <p className="mt-5 text-sm leading-relaxed text-stone">
              K-beauty pour peau grasse, sans agresser. Notre premier sérum arrive bientôt —
              inscris-toi pour être prévenue en avant-première.
            </p>
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

        <div className="mt-14 border-t border-line pt-6 text-xs text-stone">
          <p>© {new Date().getFullYear()} naeul. Tous droits réservés.</p>
        </div>
      </Container>
    </footer>
  );
}
