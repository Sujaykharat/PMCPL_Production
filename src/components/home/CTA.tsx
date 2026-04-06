import { Container } from "@/components/ui/Container";

export const CTA = () => {
  return (
    <section id="contact" className="py-24 bg-[#0f172a] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.08)_0%,transparent_70%)]" />
      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-reveal">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">Ready to Build the Future?</h2>
          <p className="text-xl text-white/50 mb-12">Connect with our consultants today and find the right bridge for your talent requirements.</p>
          <div className="inline-flex p-1 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm">
            <a href="mailto:contact@pmcpl-india.com" className="px-10 py-5 bg-[#c5a059] text-[#0f172a] font-black rounded-full hover:bg-[#d4af37] transition-all hover:scale-105 shadow-xl shadow-[#c5a059]/20">
              Email Our Experts
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
};
