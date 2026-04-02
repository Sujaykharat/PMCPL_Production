"use client";

import { useEffect, useRef } from "react";

interface SceneProps {
  scrollX: React.RefObject<{ currentX: number; targetX: number }>;
}

export function SuccessScene({ scrollX }: SceneProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    const update = () => {
      if (scrollX.current && contentRef.current && bgRef.current) {
        // progress relative to this scene's start (200vw)
        const progress = Math.min(Math.max((scrollX.current.currentX - window.innerWidth * 1.5) / (window.innerWidth * 0.5), 0), 1);
        
        contentRef.current.style.opacity = progress.toString();
        contentRef.current.style.transform = `scale(${0.9 + progress * 0.1}) translateY(${(1 - progress) * 30}px)`;
        bgRef.current.style.filter = `blur(${(1-progress) * 10}px) grayscale(${(1-progress) * 0.5})`;
      }
      animationFrameId = requestAnimationFrame(update);
    };

    update();
    return () => cancelAnimationFrame(animationFrameId);
  }, [scrollX]);

  return (
    <section className="scene bg-[#eadcc3]">
      <div 
        ref={bgRef}
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/success.jpg')` }}
      />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#eadcc3] via-transparent to-transparent opacity-80" />

      <div 
        ref={contentRef}
        className="relative z-20 h-full flex flex-col justify-center items-end text-right p-10 md:p-32"
      >
        <span className="text-xs tracking-[0.5em] uppercase mb-4 text-[#2b2b2b]/60">The Handshake</span>
        <h2 className="text-5xl md:text-7xl font-serif text-[#2b2b2b] max-w-2xl leading-none">
          Where Futures <br/> <span className="italic">Begin.</span>
        </h2>
        <p className="mt-8 font-serif text-xl text-[#2b2b2b]/80 max-w-md italic">
          From a tiny ad in the Gazette to a corner office in the city. The journey of a thousand miles always begins with a single selection.
        </p>
        
        <div className="mt-16 flex gap-6">
           <button className="px-8 py-3 bg-[#2b2b2b] text-[#eadcc3] font-serif tracking-widest hover:bg-[#444] transition-colors rounded-sm uppercase text-xs">
            Join the Legacy
          </button>
        </div>
      </div>
    </section>
  );
}
