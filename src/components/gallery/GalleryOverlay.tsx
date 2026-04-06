import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { SLIDES } from "@/data/galleryData";

interface GalleryOverlayProps {
  activeIndex: number;
  progress: number;
  finaleProgress: number;
}

export const GalleryOverlay = ({ activeIndex, progress, finaleProgress }: GalleryOverlayProps) => {
  const [internalIndex, setInternalIndex] = useState(activeIndex);
  const articleRef = useRef<HTMLElement>(null);
  const isInitialMount = useRef(true);
  
  const activeSlide = SLIDES[internalIndex];
  const heroOnLeft = internalIndex % 2 === 1;

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (articleRef.current) {
      gsap.to(articleRef.current, {
        opacity: 0,
        y: 8,
        scale: 0.98,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => {
          setInternalIndex(activeIndex);
          gsap.to(articleRef.current, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
            delay: 0.05
          });
        }
      });
    }
  }, [activeIndex]);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-5 sm:p-8 md:p-10 transition-opacity duration-500 ease-out"
      style={{ opacity: Math.max(0, 1 - finaleProgress * 1.15) }}
    >
      <header className="flex justify-between text-[0.6rem] sm:text-[0.7rem] tracking-[0.32em] uppercase text-white/40">
        <span className="font-bold">PMCPL Est. 1996</span>
        <span className="font-bold">CURATED STORY ARCHIVE</span>
      </header>

      <div className="flex min-h-0 flex-1 items-center py-4">
        <div
          className={`flex w-full ${
            heroOnLeft ? "justify-start pl-0 sm:pl-4" : "justify-end pr-0 sm:pr-4"
          } transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]`}
        >
          <article 
            ref={articleRef as any}
            className="max-w-[min(38rem,calc(100vw-3rem))] rounded-[2.5rem] border border-white/[0.08] bg-[#1a1a1a]/75 p-8 shadow-[0_40px_120px_rgba(0,0,0,0.7)] ring-1 ring-white/[0.04] backdrop-blur-2xl md:p-12"
          >
            <div className="flex items-center gap-4 mb-5">
              <div className="h-[2px] w-10 bg-[#c5a059]/60" />
              <p className="text-[0.65rem] tracking-[0.3em] uppercase text-[#c5a059] font-bold">
                CHAPTER 0{internalIndex + 1}
              </p>
            </div>
            
            <h2 className="font-serif text-3xl leading-[1.05] text-white md:text-5xl tracking-normal">
              {activeSlide.title}
            </h2>
            
            <p className="mt-8 text-sm leading-relaxed text-[#e8dcc4]/80 md:text-[1.15rem] font-light tracking-wide">
              {activeSlide.copy}
            </p>
            
            <div className="mt-10 relative h-[3px] w-full overflow-hidden rounded-full bg-white/[0.05]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#8b6d3b] via-[#c5a059] to-[#8b6d3b] transition-[width] duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)]"
                style={{
                  width: `${Math.max(
                    1,
                    (progress * (1 - finaleProgress) + finaleProgress) * 100
                  )}%`,
                }}
              />
            </div>

            {internalIndex === SLIDES.length - 1 && (
              <div className="mt-10 animate-pulse flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-[#c5a059] shadow-[0_0_12px_rgba(197,160,89,0.8)]" />
                <p className="text-[0.7rem] tracking-[0.18em] uppercase text-[#c5a059] font-black">
                  Dive into history below
                </p>
              </div>
            )}
          </article>
        </div>
      </div>

      <div className="flex justify-between items-center text-[0.6rem] uppercase tracking-[0.3em] text-white/30 font-bold">
        <span>{internalIndex === SLIDES.length - 1 ? "ENTER SITE" : "SWIPE TO EXPLORE"}</span>
        <div className="flex gap-3">
          {SLIDES.map((_, i) => (
            <div key={i} className={`h-1.5 w-6 rounded-full transition-all duration-500 ${i === activeIndex ? "bg-[#c5a059] w-12" : "bg-white/10"}`} />
          ))}
        </div>
      </div>
    </div>
  );
};
