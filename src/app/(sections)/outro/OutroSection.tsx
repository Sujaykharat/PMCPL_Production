"use client";

import { companyData } from "@/data/companyData";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { useScrollAnimation } from "@/lib/hooks/useScrollAnimation";

export function OutroSection() {
  const ref = useScrollAnimation<HTMLDivElement>({ from: { y: 18 } });

  return (
    <SectionWrapper id="outro" className="border-t border-foreground/10">
      <Container>
        <div ref={ref} className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {companyData.outro.headline}
          </h2>
          <p className="mt-4 text-sm leading-6 text-foreground/70 sm:text-base">
            {companyData.outro.subheadline}
          </p>
          <div className="mt-8">
            <ButtonLink href={companyData.outro.cta.href} variant="primary">
              {companyData.outro.cta.label}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}

