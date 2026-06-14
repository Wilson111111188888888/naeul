"use client";

import Link from "next/link";
import { useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { Wordmark } from "@/components/wordmark";
import { buttonClasses } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PREORDER_ENABLED } from "@/lib/preorder";

const NAV = [
  { href: "/le-produit", label: "Le produit" },
  { href: "/diagnostic", label: "Diagnostic peau" },
  { href: "/blog", label: "Journal" },
  { href: "/a-propos", label: "À propos" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

const CTA_HREF = PREORDER_ENABLED ? "/le-produit#acheter" : "/#precommande";
const CTA_LABEL = PREORDER_ENABLED ? "Précommander (-15%)" : "Je veux être prévenue (-15%)";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-sand/85 backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" aria-label="naeul — accueil">
            <Wordmark className="text-xl" hangulClassName="text-[0.55rem] tracking-[0.3em]" />
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-stone transition-colors hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
            <Link href={CTA_HREF} className={buttonClasses({ size: "sm" })}>
              {CTA_LABEL}
            </Link>
          </nav>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-ink transition-colors hover:bg-ink/[0.04] md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <List size={20} />}
          </button>
        </div>
      </Container>

      {/* Menu mobile */}
      <div
        className={cn(
          "overflow-hidden border-t border-line/70 bg-sand/95 backdrop-blur-md transition-[max-height] duration-300 ease-out md:hidden",
          open ? "max-h-80" : "max-h-0 border-t-0",
        )}
      >
        <Container>
          <nav className="flex flex-col py-2">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-line/50 py-2.5 text-[0.95rem] text-stone transition-colors last:border-0 hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={CTA_HREF}
              onClick={() => setOpen(false)}
              className={buttonClasses({ size: "sm", className: "mt-3 w-full" })}
            >
              {CTA_LABEL}
            </Link>
          </nav>
        </Container>
      </div>
    </header>
  );
}
