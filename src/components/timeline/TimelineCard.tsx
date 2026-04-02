import Image from "next/image";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils/helpers";

type TimelineCardProps = {
  title: string;
  description: string;
  image: string;
  className?: string;
  headerSlot?: ReactNode;
};

export function TimelineCard({
  title,
  description,
  image,
  className,
  headerSlot,
}: TimelineCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-foreground/10 bg-background shadow-sm",
        className,
      )}
    >
      <div className="aspect-[16/9] w-full overflow-hidden bg-foreground/5">
        <Image
          src={image}
          alt={title}
          width={1200}
          height={675}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          priority={false}
        />
      </div>
      <div className="space-y-3 p-6">
        {headerSlot}
        <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
        <p className="text-sm leading-6 text-foreground/70">{description}</p>
      </div>
    </div>
  );
}

