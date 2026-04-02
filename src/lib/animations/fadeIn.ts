import { gsap, registerGsapPlugins } from "@/lib/animations/gsapConfig";
import { defaultScrollTrigger } from "@/lib/animations/scrollTrigger";

export type FadeInOptions = {
  from?: GSAPTweenVars;
  to?: GSAPTweenVars;
  trigger?: Parameters<typeof defaultScrollTrigger>[1];
};

export function fadeInOnScroll(element: Element, options?: FadeInOptions) {
  registerGsapPlugins();

  const from: GSAPTweenVars = {
    autoAlpha: 0,
    y: 24,
    ...options?.from,
  };

  const to: GSAPTweenVars = {
    autoAlpha: 1,
    y: 0,
    duration: 0.8,
    ease: "power2.out",
    ...options?.to,
    scrollTrigger: defaultScrollTrigger(element, options?.trigger),
  };

  return gsap.fromTo(element, from, to);
}

