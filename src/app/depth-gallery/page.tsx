// @ts-nocheck
"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { SLIDES, FINALE_SCROLL_RANGE, ENTRANCE_ROUTE } from "@/data/galleryData";
import { DepthGalleryCanvas } from "@/components/gallery/DepthGalleryCanvas";
import { GalleryOverlay } from "@/components/gallery/GalleryOverlay";
import { Suspense } from "react";

function GalleryContent() {
  const searchParams = useSearchParams();
  const isReverse = searchParams.get("mode") === "reverse";

  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [finaleProgress, setFinaleProgress] = useState(0);

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-[#1a1a1a] text-[#e8dcc4]">
      {/* High-Visibility Greyscale Background */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#1a1a1a]"
      >
        <div
          className="absolute inset-[-15%] scale-110 bg-cover bg-center bg-no-repeat opacity-[0.35] blur-[60px] transition-opacity duration-1000"
          style={{ backgroundImage: "url('/fullnewspaper.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/80 via-transparent to-[#1a1a1a]/85" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_100%_at_50%_45%,rgba(50,50,50,0.1)_0%,rgba(20,20,20,0.4)_60%,rgba(10,10,10,0.7)_100%)]" />
      </div>

      <DepthGalleryCanvas 
        isReverse={isReverse}
        slides={SLIDES}
        finaleScrollRange={FINALE_SCROLL_RANGE}
        entranceRoute={ENTRANCE_ROUTE}
        onActiveIndexChange={setActiveIndex}
        onProgressChange={setProgress}
        onFinaleProgressChange={setFinaleProgress}
      />

      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[7] bg-[#ffffff] transition-opacity duration-300 ease-out"
        style={{ opacity: finaleProgress * 0.25 }}
      />
      
      <div className="noise-overlay opacity-[0.05]" /> 
      <div className="vignette opacity-[0.45]" /> 

      <GalleryOverlay 
        activeIndex={activeIndex}
        progress={progress}
        finaleProgress={finaleProgress}
      />
    </main>
  );
}

export default function DepthGalleryPage() {
  return (
    <Suspense fallback={<div className="h-screen w-screen bg-[#1a1a1a] flex items-center justify-center text-[#c5a059] font-bold tracking-widest">LOADING ARCHIVE...</div>}>
      <GalleryContent />
    </Suspense>
  );
}
