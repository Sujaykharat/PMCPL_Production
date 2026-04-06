"use client";

import { useEffect, useRef } from "react";

interface SceneProps {
  scrollX: React.RefObject<{ currentX: number; targetX: number }>;
}

export function NewspaperScene({ scrollX }: SceneProps) {
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    const update = () => {
      if (scrollX.current && imageRef.current && textRef.current) {
        const progress = Math.max(0, Math.min(scrollX.current.currentX / window.innerWidth, 1));

        // Scroll the background vertically to display the full newspaper without blank areas below
        imageRef.current.style.backgroundPositionY = `${progress * 100}%`;
        imageRef.current.style.transform = `scale(${1 - progress * 0.02})`;

        // 4: Keep text stable, gently fading out & following the upward section move
        textRef.current.style.opacity = (1 - progress * 1.5).toString();
        textRef.current.style.transform = `translateY(${progress * -100}%) scale(${1 - progress * 0.02})`;
      }
      animationFrameId = requestAnimationFrame(update);
    };

    update();
    return () => cancelAnimationFrame(animationFrameId);
  }, [scrollX]);

  return (
    <section className="scene bg-[#eadcc3]">
      {/* Background with sepia tint and grain */}
      <div
        ref={imageRef}
        className="absolute inset-0 z-0 bg-[length:100%_auto] bg-top bg-no-repeat grayscale-[0.2] sepia-[0.3]"
        style={{ backgroundImage: `url('/newspaper.jpg')` }}
      />

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#eadcc3]/80 via-transparent to-black/20" />

      <div
        ref={textRef}
        className="relative z-20 h-full w-full pointer-events-none flex flex-col justify-between"
      >
        {/* Cinematic Top Bar with Elegant Moving Ticker */}
        <div className="w-full h-12 md:h-16 bg-gradient-to-r from-[#1a1a1a] via-[#333333] to-[#1a1a1a] border-b border-[#eadcc3]/30 flex items-center overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.6)] z-30">
          <div className="flex w-[200vw] text-[#eadcc3]">
            <div className="animate-marquee whitespace-nowrap text-xs md:text-sm font-sans tracking-[0.6em] uppercase opacity-70 pt-1">
              THE STORY BEGINS ✦ PIONEERING EXCELLENCE ✦ ESTABLISHED 1995 ✦ EMBRACING THE DIGITAL FUTURE ✦ THE STORY BEGINS ✦ PIONEERING EXCELLENCE ✦ ESTABLISHED 1995 ✦ EMBRACING THE DIGITAL FUTURE ✦&nbsp;
            </div>
            <div className="animate-marquee whitespace-nowrap text-xs md:text-sm font-sans tracking-[0.6em] uppercase opacity-70 pt-1">
              THE STORY BEGINS ✦ PIONEERING EXCELLENCE ✦ ESTABLISHED 1995 ✦ EMBRACING THE DIGITAL FUTURE ✦ THE STORY BEGINS ✦ PIONEERING EXCELLENCE ✦ ESTABLISHED 1995 ✦ EMBRACING THE DIGITAL FUTURE ✦&nbsp;
            </div>
          </div>
        </div>

        {/* Cinematic Bottom Bar with Elegant Moving Ticker */}
        <div className="w-full h-12 md:h-16 bg-gradient-to-r from-[#1a1a1a] via-[#333333] to-[#1a1a1a] border-t border-[#eadcc3]/30 flex items-center overflow-hidden shadow-[0_-10px_30px_rgba(0,0,0,0.6)] z-30">
          <div className="flex w-[200vw] text-[#eadcc3]">
            <div className="animate-marquee whitespace-nowrap text-xs md:text-sm font-sans tracking-[0.6em] uppercase opacity-70 pt-1">
              THE STORY BEGINS ✦ PIONEERING EXCELLENCE ✦ ESTABLISHED 1995 ✦ EMBRACING THE DIGITAL FUTURE ✦ THE STORY BEGINS ✦ PIONEERING EXCELLENCE ✦ ESTABLISHED 1995 ✦ EMBRACING THE DIGITAL FUTURE ✦&nbsp;
            </div>
            <div className="animate-marquee whitespace-nowrap text-xs md:text-sm font-sans tracking-[0.6em] uppercase opacity-70 pt-1">
              THE STORY BEGINS ✦ PIONEERING EXCELLENCE ✦ ESTABLISHED 1995 ✦ EMBRACING THE DIGITAL FUTURE ✦ THE STORY BEGINS ✦ PIONEERING EXCELLENCE ✦ ESTABLISHED 1995 ✦ EMBRACING THE DIGITAL FUTURE ✦&nbsp;
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
