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
        // Add a scale to the background as well to ensure it fully covers and we crop out the baked-in image borders/text
        bgRef.current.style.filter = `blur(${(1-progress) * 10}px) grayscale(${(1-progress) * 0.5})`;
        bgRef.current.style.transform = `scale(${1.2 - progress * 0.05})`;
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
        className="absolute inset-0 z-0 bg-cover bg-no-repeat"
        style={{ 
          backgroundImage: `url('/dotcom.jpg')`,
          backgroundPosition: 'center 30%', // Shift slightly up to push the bottom text out of view
        }}
      />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#eadcc3] via-[#eadcc3]/20 to-[#eadcc3]/80 opacity-90" />

      <div 
        ref={contentRef}
        className="relative z-20 h-full flex flex-col justify-center items-end text-right p-10 md:p-32"
      >
        <span className="text-xs tracking-[0.5em] uppercase mb-4 text-[#2b2b2b] font-bold">1999 - Dot-com boom</span>
        <h2 className="text-5xl md:text-7xl font-serif text-[#2b2b2b] max-w-2xl leading-none">
          When IT became <br/> <span className="italic">the dream job...</span>
        </h2>
        <p className="mt-8 font-serif text-xl text-[#2b2b2b]/90 max-w-md italic font-medium">
          From a tiny ad in the Gazette to the digital revolution. The turn of the millennium brought endless possibilities.
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
