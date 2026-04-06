import Link from "next/link";
import { companyData } from "@/data/companyData";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white pt-20 pb-12 overflow-hidden relative border-t border-white/5">
      <Container className="relative z-10">
        {/* Top Row: Social Icons and Legal Links */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
          <div className="flex items-center gap-6">
            <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </Link>
            <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </Link>
            <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
            </Link>
          </div>
          
          <div className="flex gap-8 text-xs font-medium tracking-tight text-white/50">
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </div>

        {/* Separator */}
        <div className="h-px w-full bg-white/5 mb-16" />

        {/* Bottom Row: Copyright and Large Background Text */}
        <div className="flex flex-col items-center">
          <p className="text-sm font-medium text-white/20 mb-8 tracking-wide">
            &copy; Copyright 2025 PMCPL. All rights reserved.
          </p>
          
          <div className="w-full text-center pointer-events-none select-none">
            <h2 className="text-[14vw] md:text-[18vw] font-black leading-none tracking-tight text-white/[0.03] uppercase">
              PMCPL
            </h2>
          </div>
        </div>
      </Container>
    </footer>
  );
}

