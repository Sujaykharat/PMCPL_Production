import { Container } from "@/components/ui/Container";
import { companyData } from "@/data/companyData";

export const Hero = () => {
  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#0f172a]">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f172a]/50 to-[#0f172a]" />
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#c5a059]/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#1e293b]/30 blur-[100px] rounded-full" />
      </div>

      <Container className="relative z-10 pt-20">
        <div className="max-w-4xl">
          <span className="animate-reveal inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#c5a059] text-xs font-bold uppercase tracking-[0.3em] mb-6">
            {companyData.hero.eyebrow}
          </span>
          <h1 className="animate-reveal text-5xl md:text-8xl font-bold text-white tracking-tight leading-[0.95] mb-8">
            {companyData.hero.headline.split(' ').map((word, i) => (
              <span key={i} className={i > 4 ? "text-gradient block" : ""}>{word} </span>
            ))}
          </h1>
          <p className="animate-reveal text-lg md:text-xl text-white/60 mb-12 max-w-2xl leading-relaxed">
            {companyData.hero.subheadline}
          </p>
          <div className="animate-reveal flex flex-wrap gap-6">
            <a href={companyData.hero.primaryCta.href} className="group relative px-8 py-4 bg-white text-[#0f172a] font-bold rounded-full transition-all hover:scale-105 active:scale-95 shadow-xl shadow-white/5">
              {companyData.hero.primaryCta.label}
            </a>
            <a href={companyData.hero.secondaryCta.href} className="group px-8 py-4 border border-white/20 text-white font-bold rounded-full transition-all hover:bg-white/5 active:scale-95">
              {companyData.hero.secondaryCta.label}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
};
