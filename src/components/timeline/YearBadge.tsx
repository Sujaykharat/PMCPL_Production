import { cn } from "@/lib/utils/helpers";

type YearBadgeProps = {
  year: string;
  className?: string;
};

export function YearBadge({ year, className }: YearBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-foreground/15 bg-background px-3 py-1 text-xs font-semibold tracking-wider text-foreground/80",
        className,
      )}
    >
      {year}
    </div>
  );
}

