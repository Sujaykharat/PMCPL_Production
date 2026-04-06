import Link from "next/link";

import { companyData } from "@/data/companyData";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="bg-[#0f172a] text-white py-16 border-t border-white/5">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <Link href="/home" className="flex items-center gap-2 mb-6">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-gradient-to-br from-[#c5a059] to-[#8b6d3b] text-white font-bold text-sm">
                P
              </div>
              <span className="text-xl font-bold tracking-tight">PMCPL</span>
            </Link>
            <p className="text-white/60 max-w-sm text-sm leading-relaxed">
              {companyData.fullName} is a premier recruitment consultancy dedicated to connecting excellence with opportunity since 1996.
            </p>
          </div>
          
          <div>
            <h4 className="text-[#c5a059] font-bold text-sm uppercase tracking-wider mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {companyData.navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-[#c5a059] font-bold text-sm uppercase tracking-wider mb-6">Contact</h4>
            <address className="not-italic text-sm text-white/60 space-y-4">
              <p>{companyData.footer.address}</p>
              <p>Email: contact@pmcpl-india.com</p>
              <p>Phone: +91 (22) Corporate Office</p>
            </address>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-white/40">{companyData.footer.copyright}</p>
          <div className="flex gap-6 text-xs text-white/40">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

