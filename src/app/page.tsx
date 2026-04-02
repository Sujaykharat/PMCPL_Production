"use client";

import { useEffect, useRef, useState } from "react";
import { NewspaperScene } from "@/app/(sections)/scrollytelling/NewspaperScene";
import { OfficeScene } from "@/app/(sections)/scrollytelling/OfficeScene";
import { SuccessScene } from "@/app/(sections)/scrollytelling/SuccessScene";
import { CrashScene } from "@/app/(sections)/scrollytelling/CrashScene";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const scrollData = useRef({
    targetX: 0,
    currentX: 0,
    ease: 0.08, // slower lerp for cinematic feel
  });

  useEffect(() => {
    // Intro animation trigger
    const timer = setTimeout(() => setIsLoaded(true), 200);

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault(); // Lock native scroll
      scrollData.current.targetX += e.deltaY;
      
      const maxScroll = window.innerWidth * 3.05; // 4 scenes - slightly more for buffer
      scrollData.current.targetX = Math.max(0, Math.min(scrollData.current.targetX, maxScroll));
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    let animationFrameId: number;
    const update = () => {
      const { targetX, currentX, ease } = scrollData.current;
      
      const nextX = currentX + (targetX - currentX) * ease;
      scrollData.current.currentX = nextX;

      if (containerRef.current) {
        containerRef.current.style.transform = `translateX(-${nextX}px)`;
      }

      animationFrameId = requestAnimationFrame(update);
    };

    update();

    return () => {
      window.removeEventListener("wheel", handleWheel);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timer);
    };
  }, []);

  return (
    <main className={`relative h-screen w-screen overflow-hidden transition-opacity duration-[2000ms] ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0 bg-black'}`}>
      {/* Intro Overlay Text */}
      {!isLoaded && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center bg-black text-[#eadcc3]">
          <span className="text-sm tracking-[0.6em] animate-pulse">PREPARING MEMORY...</span>
        </div>
      )}

      {/* Visual Overlays */}
      <div className="noise-overlay" />
      <div className="vignette" />

      <div ref={containerRef} className="horizontal-container" style={{ width: "400vw" }}>
        <NewspaperScene scrollX={scrollData} />
        <OfficeScene scrollX={scrollData} />
        <SuccessScene scrollX={scrollData} />
        <CrashScene scrollX={scrollData} />
      </div>
    </main>
  );
}
