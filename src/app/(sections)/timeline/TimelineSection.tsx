"use client";

import { companyData } from "@/data/companyData";
import { timelineData } from "@/data/timelineData";
import { Container } from "@/components/ui/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

import { TimelineItem } from "./TimelineItem";

export function TimelineSection() {
  return (
    <SectionWrapper id="timeline">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold tracking-[0.24em] text-foreground/70">
            {companyData.timeline.eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            {companyData.timeline.headline}
          </h2>
          <p className="mt-4 text-sm leading-6 text-foreground/70 sm:text-base">
            {companyData.timeline.subheadline}
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {timelineData.map((entry) => (
            <TimelineItem key={`${entry.year}-${entry.title}`} entry={entry} />
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}

