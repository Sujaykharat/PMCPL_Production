export type ScrollTriggerOptions = Omit<ScrollTrigger.Vars, "trigger"> & {
  trigger?: Element | string;
};

export function defaultScrollTrigger(
  trigger: Element,
  options?: ScrollTriggerOptions,
): ScrollTrigger.Vars {
  return {
    trigger,
    start: "top 85%",
    end: "bottom 20%",
    ...options,
  };
}

