"use client";

import type { TimelineEntry } from "@/types/timeline.types";
import { TimelineCard } from "@/components/timeline/TimelineCard";
import { YearBadge } from "@/components/timeline/YearBadge";
import { useScrollAnimation } from "@/lib/hooks/useScrollAnimation";

type TimelineItemProps = {
  entry: TimelineEntry;
};

export function TimelineItem({ entry }: TimelineItemProps) {
  const ref = useScrollAnimation<HTMLDivElement>();

  return (
    <div ref={ref} className="opacity-0 will-change-transform">
      <TimelineCard
        title={entry.title}
        description={entry.description}
        image={entry.image}
        headerSlot={<YearBadge year={entry.year} />}
      />
    </div>
  );
}

