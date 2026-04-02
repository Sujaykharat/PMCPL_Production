"use client";

import { useEffect, useRef } from "react";

import type { FadeInOptions } from "@/lib/animations/fadeIn";
import { fadeInOnScroll } from "@/lib/animations/fadeIn";

export function useScrollAnimation<T extends HTMLElement>(options?: FadeInOptions) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tween = fadeInOnScroll(el, options);
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
    // Intentionally only on mount for stable animations.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}

