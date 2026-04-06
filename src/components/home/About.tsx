import { Container } from "@/components/ui/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { companyData } from "@/data/companyData";

export const About = () => {
  return (
    <>
      <div className="bg-[#0f172a] border-y border-white/5 py-12">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {companyData.about.stats.map((stat, i) => (
              <div key={i} className="animate-reveal text-center">
                <div className="text-3xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-xs uppercase tracking-widest text-[#c5a059] font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </div>

      <SectionWrapper id="about" className="bg-white scroll-mt-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="animate-reveal">
              <h2 className="text-4xl md:text-5xl font-bold text-[#0f172a] mb-8 leading-tight">
                {companyData.about.headline}
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-8">
                {companyData.about.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 italic text-slate-600">
                  "Thoughtful and responsible approach to talent acquisition."
                </div>
                <div className="p-6 rounded-2xl bg-[#c5a059]/5 border border-[#c5a059]/10 text-[#8b6d3b] font-medium">
                  Headquartered in Navi Mumbai, serving India's top industries.
                </div>
              </div>
            </div>
            <div className="animate-reveal relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-[#0f172a]/10 group">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0f172a]/40 to-transparent z-10" />
              <img 
                src="/interview.jpg" 
                alt="Pioneer Management Team" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
              />
              <div className="absolute bottom-8 left-8 z-20">
                <div className="text-white font-bold text-2xl">Established 1996</div>
                <div className="text-white/80 text-sm italic">Building bridges for 28+ years</div>
              </div>
            </div>
          </div>
        </Container>
      </SectionWrapper>
    </>
  );
};
