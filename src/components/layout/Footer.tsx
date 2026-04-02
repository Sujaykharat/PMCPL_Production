import Link from "next/link";

import { companyData } from "@/data/companyData";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="border-t border-foreground/10 py-10">
      <Container className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-foreground/70">{companyData.footer.copyright}</div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {companyData.navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-foreground/70 hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </footer>
  );
}

