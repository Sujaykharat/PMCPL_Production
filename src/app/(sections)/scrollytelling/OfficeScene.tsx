"use client";

import { useEffect, useRef } from "react";

interface SceneProps {
  scrollX: React.RefObject<{ currentX: number; targetX: number }>;
}

export function OfficeScene({ scrollX }: SceneProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    const update = () => {
      if (scrollX.current && contentRef.current && bgRef.current) {
        
        // Progress for background (image) fully tracks the 0.5 to 1.0 window
        const bgProgress = Math.min(Math.max((scrollX.current.currentX - window.innerWidth * 0.5) / (window.innerWidth * 0.5), 0), 1);
        
        // Progress for text: Starts much later! From 0.7 to 1.0 window
        // This ensures the image arrives first, and THEN the text smoothly animates in
        const textProgress = Math.min(Math.max((scrollX.current.currentX - window.innerWidth * 0.7) / (window.innerWidth * 0.3), 0), 1);

        // Smooth sine ease-in-out for text animation
        const easedProgress = -(Math.cos(Math.PI * textProgress) - 1) / 2;
        
        // Reveal content based on delayed progress
        contentRef.current.style.opacity = easedProgress.toString();
        contentRef.current.style.transform = `translateY(${(1 - easedProgress) * 80}px)`;
        
        // Parallax for background image
        bgRef.current.style.transform = `scale(${1.2 - bgProgress * 0.2}) translateX(${(1 - bgProgress) * 50}px)`;
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
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-[0.4] grayscale-[0.5] sepia-[0.3]"
        style={{ backgroundImage: `url('/interview.jpg')` }}
      />
      <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#2b2b2b_100%)]" />

      <div 
        ref={contentRef}
        className="relative z-20 h-full flex flex-col justify-center items-start p-10 md:p-32"
      >
        <span className="text-sm tracking-[0.4em] uppercase mb-4 text-[#eadcc3] opacity-60">
          Scene II: Recruitment Office, Mumbai
        </span>
        <h2 className="text-5xl md:text-7xl font-serif text-[#eadcc3] max-w-4xl leading-[1.1]">
          The Ambience of <br/> Hard Work & Hustle
        </h2>
        <div className="mt-12 space-y-6 max-w-2xl text-[#eadcc3]/80 font-serif text-xl leading-relaxed italic">
          <p>
            The clicking of typewriters, the aroma of cutting-chai, and the endless files. 
            This is where dreams were cataloged in wooden cabinets.
          </p>
          <p>
            In 1995, every handshake held the weight of a lifelong career. 
            We were there, bridging the gap between talent and the tomorrow.
          </p>
        </div>
        
        <button className="mt-16 px-10 py-4 border-2 border-[#eadcc3] text-[#eadcc3] uppercase tracking-widest text-sm hover:mix-blend-difference transition-all transform hover:scale-105">
          Enter Now
        </button>
      </div>

    </section>
  );
}
