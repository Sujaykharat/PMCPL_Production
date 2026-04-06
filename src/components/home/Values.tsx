import { Container } from "@/components/ui/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { companyData } from "@/data/companyData";

export const Values = () => {
  return (
    <SectionWrapper id="values" className="bg-slate-50 border-y border-slate-100">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-20 animate-reveal">
          <h2 className="text-4xl font-bold text-[#0f172a] mb-6">{companyData.values.title}</h2>
          <p className="text-slate-600">Our core values define every interaction we have with our clients and candidates.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {companyData.values.items.map((val, i) => (
            <div key={i} className="animate-reveal group p-8 rounded-2xl bg-white border border-slate-100 transition-all hover:shadow-xl hover:-translate-y-2">
              <div className="text-4xl font-black text-[#c5a059]/20 mb-4 group-hover:text-[#c5a059]/40 transition-colors">{val.id}</div>
              <h3 className="text-lg font-bold text-[#0f172a] mb-3">{val.label}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{val.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
};
