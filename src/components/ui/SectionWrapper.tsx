import type { ReactNode } from "react";

import { cn } from "@/lib/utils/helpers";

type SectionWrapperProps = {
  id?: string;
  children: ReactNode;
  className?: string;
};

export function SectionWrapper({ id, children, className }: SectionWrapperProps) {
  return (
    <section id={id} className={cn("py-20 sm:py-28", className)}>
      {children}
    </section>
  );
}

