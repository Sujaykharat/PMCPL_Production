"use client";

import { companyData } from "@/data/companyData";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { useScrollAnimation } from "@/lib/hooks/useScrollAnimation";

export function HeroSection() {
  const ref = useScrollAnimation<HTMLDivElement>({
    from: { y: 18 },
    trigger: { start: "top 92%" },
  });

  return (
    <SectionWrapper id="hero" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(0,0,0,0.06)_0%,rgba(0,0,0,0)_70%)] dark:bg-[radial-gradient(60%_50%_at_50%_0%,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_70%)]" />
      <Container>
        <div ref={ref} className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold tracking-[0.24em] text-foreground/70">
            {companyData.hero.eyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
            {companyData.hero.headline}
          </h1>
          <p className="mt-6 text-base leading-7 text-foreground/70 sm:text-lg">
            {companyData.hero.subheadline}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href={companyData.hero.primaryCta.href} variant="primary">
              {companyData.hero.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={companyData.hero.secondaryCta.href} variant="secondary">
              {companyData.hero.secondaryCta.label}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}

