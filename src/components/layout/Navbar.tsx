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
    <header className={cn(
      "sticky top-0 z-[100] w-full border-b border-white/10 bg-[#0f172a]/70 backdrop-blur-md transition-all duration-300",
      className
    )}>
      <Container className="flex h-20 items-center justify-between">
        <Link href="/home" className="group flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#c5a059] to-[#8b6d3b] text-white font-bold shadow-lg shadow-[#c5a059]/20 transition-transform group-hover:scale-110">
            P
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-white leading-none">PMCPL</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#c5a059] font-medium">Consulting</span>
          </div>
        </Link>
        
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {companyData.navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="relative text-sm font-medium text-white/70 hover:text-[#c5a059] transition-colors py-2 group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#c5a059] transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <Link 
            href="#contact" 
            className="hidden sm:inline-flex items-center justify-center rounded-full bg-[#c5a059] px-6 py-2.5 text-sm font-semibold text-[#0f172a] hover:bg-[#d4af37] transition-all hover:shadow-[0_0_20px_rgba(197,160,89,0.4)] active:scale-95"
          >
            Get in Touch
          </Link>
          
          {/* Mobile Menu Placeholder (Would add a toggle here for a real prod app) */}
          <button className="md:hidden text-white p-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>
          </button>
        </div>
      </Container>
    </header>
  );
}
