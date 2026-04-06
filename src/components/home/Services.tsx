import { Container } from "@/components/ui/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { companyData } from "@/data/companyData";

export const Services = () => {
  return (
    <SectionWrapper id="services" className="bg-white scroll-mt-20">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20 animate-reveal">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0f172a] mb-6">Expertise Across Sectors</h2>
            <p className="text-lg text-slate-600">Specializing in recruitment services for Manufacturing and Non-IT industries.</p>
          </div>
          <a href="#contact" className="text-[#c5a059] font-bold uppercase tracking-widest text-xs border-b-2 border-[#c5a059]/30 pb-2 hover:border-[#c5a059] transition-all">
            Request a Consultation
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {companyData.services.map((service, i) => (
            <div key={i} className="animate-reveal flex flex-col p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-[#c5a059]/30 transition-all group">
              <div className="h-12 w-12 rounded-2xl bg-[#0f172a] text-[#c5a059] flex items-center justify-center mb-8 shadow-lg shadow-[#0f172a]/10 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              </div>
              <h3 className="text-xl font-bold text-[#0f172a] mb-4">{service.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
};
