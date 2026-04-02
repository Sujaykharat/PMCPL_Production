"use client";

import Link from "next/link";

import { companyData } from "@/data/companyData";
import { cn } from "@/lib/utils/helpers";
import { Container } from "@/components/ui/Container";

type NavbarProps = {
  className?: string;
};

export function Navbar({ className }: NavbarProps) {
  return (
    <header className={cn("sticky top-0 z-50 border-b border-foreground/10 bg-background/80 backdrop-blur", className)}>
      <Container className="flex h-16 items-center justify-between">
        <Link href="#hero" className="text-sm font-semibold tracking-wide">
          {companyData.siteName}
        </Link>
        <nav aria-label="Primary">
          <ul className="flex items-center gap-6">
            {companyData.navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-foreground/80 hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

