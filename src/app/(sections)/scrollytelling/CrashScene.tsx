"use client";

import { useEffect, useRef } from "react";

interface SceneProps {
  scrollX: React.RefObject<{ currentX: number; targetX: number }>;
}

export function CrashScene({ scrollX }: SceneProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    const update = () => {
      if (scrollX.current && contentRef.current && bgRef.current) {
        // progress relative to this scene's start (300vw)
        const progress = Math.min(Math.max((scrollX.current.currentX - window.innerWidth * 2.5) / (window.innerWidth * 0.5), 0), 1);

        contentRef.current.style.opacity = progress.toString();
        contentRef.current.style.transform = `scale(${0.9 + progress * 0.1}) translateY(${(1 - progress) * 30}px)`;
        // Add a scale to the background as well to ensure it fully covers and we crop out the baked-in image borders/text
        bgRef.current.style.filter = `blur(${(1 - progress) * 10}px) grayscale(${(1 - progress) * 0.3})`;
        bgRef.current.style.transform = `scale(${1.2 - progress * 0.05})`;
      }
      animationFrameId = requestAnimationFrame(update);
    };

    update();
    return () => cancelAnimationFrame(animationFrameId);
  }, [scrollX]);

  return (
    <section className="scene bg-[#2b2b2b]">
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-[0.8]"
        style={{
          backgroundImage: `url('/crash.jpg')`,
          backgroundPosition: 'center 30%', // Shift slightly up to push the bottom text out of view
        }}
      />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#2b2b2b] via-[#2b2b2b]/40 to-transparent opacity-90" />

      <div
        ref={contentRef}
        className="relative z-20 h-full flex flex-col justify-end items-center text-center p-10 md:p-32 pb-24"
      >
        <span className="text-xs tracking-[0.5em] uppercase mb-4 text-[#eadcc3]/60 font-bold">2001-2003 - Post-dot-com slowdown</span>
        <h2 className="text-5xl md:text-7xl font-serif text-[#eadcc3] max-w-3xl leading-none">
          Dot-com dreams <br /> <span className="italic opacity-80">shattered...</span>
        </h2>
        <p className="mt-8 font-serif text-xl text-[#eadcc3]/80 max-w-xl italic font-medium">
          The bubble burst, leaving empty offices and canceled projects. But from the ashes of the crash, true resilience was born.
        </p>
      </div>
    </section>
  );
}
