export const companyData = {
  siteName: "PMCPL Storytelling",
  tagline: "A high-end storytelling starter built for motion.",
  navLinks: [
    { label: "Hero", href: "#hero" },
    { label: "Timeline", href: "#timeline" },
    { label: "Outro", href: "#outro" },
  ],
  hero: {
    eyebrow: "Scroll-driven narrative",
    headline: "Stories that unfold with motion and meaning.",
    subheadline:
      "A clean Next.js 14 starter for editorial storytelling—structured sections, reusable UI, and GSAP-ready animation utilities.",
    primaryCta: { label: "Explore the timeline", href: "#timeline" },
    secondaryCta: { label: "Contact", href: "#outro" },
  },
  timeline: {
    eyebrow: "A timeline of moments",
    headline: "The story in chapters",
    subheadline:
      "This section maps through structured data—perfect for expanding into richer narrative beats, media, and GSAP timelines.",
  },
  outro: {
    headline: "Ready to tell your next story?",
    subheadline:
      "Swap the data, refine the visuals, and start animating. This architecture stays clean as the story grows.",
    cta: { label: "Start a new chapter", href: "#hero" },
  },
  footer: {
    copyright: `© ${new Date().getFullYear()} PMCPL. All rights reserved.`,
  },
} as const;

