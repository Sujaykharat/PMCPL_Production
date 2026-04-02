import type { FadeInOptions } from "@/lib/animations/fadeIn";
import { fadeInOnScroll } from "@/lib/animations/fadeIn";

export function animateTimelineItem(element: Element, options?: FadeInOptions) {
  return fadeInOnScroll(element, options);
}

