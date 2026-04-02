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
        const progress = Math.min(scrollX.current.currentX / window.innerWidth, 1);
        
        // Ensure image doesn't scale to avoid cropping (teammate's change)
        imageRef.current.style.transform = 'none';
        
        // Parallax and fade for text
        textRef.current.style.opacity = (1 - progress * 1.5).toString();
        textRef.current.style.transform = `translateY(${progress * -80}px) scale(${1 - progress * 0.2})`;
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
        className="absolute inset-0 z-0 bg-[length:100%_100%] bg-no-repeat grayscale-[0.2] sepia-[0.3]"
        style={{ backgroundImage: `url('/newspaper.jpg')` }}
      />
      
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#eadcc3]/80 via-transparent to-black/20" />
      
      <div 
        ref={textRef}
        className="relative z-20 h-full flex flex-col items-center justify-center text-center p-6 md:p-10"
      >
        <div className="backdrop-blur-[2px] bg-white/5 border border-white/10 p-12 rounded-sm shadow-2xl">
          <span className="text-xs tracking-[0.5em] uppercase mb-6 block text-[#2b2b2b]/60 font-medium">
            Bombay Gazette • April 1995
          </span>
          <h1 className="text-5xl md:text-8xl font-serif text-[#2b2b2b] max-w-4xl leading-[0.9] tracking-tighter drop-shadow-sm">
            THE OPPORTUNITY <br/> <span className="italic block mt-2 text-4xl md:text-7xl opacity-90">of a Generation</span>
          </h1>
          <div className="mt-10 h-[1px] w-24 bg-black/20 mx-auto" />
          <p className="mt-8 font-serif text-lg md:text-xl italic text-[#2b2b2b]/70 tracking-wide">
            Scroll to step back in time...
          </p>
        </div>
      </div>
    </section>
  );
}
