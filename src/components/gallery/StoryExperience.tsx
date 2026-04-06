"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Observer } from "gsap/all";
import { useRouter } from "next/navigation";
import { SLIDES, FINALE_SCROLL_RANGE, ENTRANCE_ROUTE } from "@/data/galleryData";
import { DepthGalleryCanvas } from "@/components/gallery/DepthGalleryCanvas";
import { GalleryOverlay } from "@/components/gallery/GalleryOverlay";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Observer);
}

export const StoryExperience = () => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const [showGallery, setShowGallery] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [finaleProgress, setFinaleProgress] = useState(0);
  const isAnimating = useRef(false);
  const observerRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current || showGallery) return;

    // --- SETUP ANIMATION CONTEXT ---
    const ctx = gsap.context(() => {
      // 1. Scene 0 Initial Load
      gsap.fromTo(".intro-text", { opacity: 0, scale: 0.9, y: 30 }, { 
        opacity: 1, scale: 1, y: 0, 
        duration: 2, 
        ease: "power3.out", 
        stagger: 0.2 
      });

      gsap.fromTo(".intro-floating", { opacity: 0, scale: 0.5 }, { 
        opacity: 0.7, scale: 1, 
        duration: 1.5, 
        ease: "back.out(1.5)", 
        delay: 0.5, 
        stagger: 0.1 
      });

      // 2. Ambient Floating
      gsap.to(".floating-asset", {
        y: "random(-25, 25)",
        rotate: "random(-8, 8)",
        duration: "random(3, 5)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: { each: 0.3, from: "random" }
      });

      // 3. Transition to Gallery
      const transitionToGallery = () => {
        isAnimating.current = true;
        
        const tl = gsap.timeline({
          onComplete: () => {
             setShowGallery(true);
             isAnimating.current = false;
          }
        });

        // Flash/Reveal effect
        tl.to(".intro-content", {
          opacity: 0,
          y: -50,
          scale: 0.95,
          duration: 1,
          ease: "power3.inOut"
        });

        tl.fromTo(".transition-curtain", {
           scaleY: 0
        }, {
           scaleY: 1,
           transformOrigin: "bottom center",
           duration: 1.2,
           ease: "expo.inOut"
        }, "-=0.8");

        tl.set(".intro-content", { display: "none" });

        tl.to(".transition-curtain", {
           scaleY: 0,
           transformOrigin: "top center",
           duration: 1.2,
           ease: "expo.inOut"
        });
      };

      // 4. Setup Custom Scroller (Observer)
      observerRef.current = Observer.create({
        target: window,
        type: "wheel,touch,pointer",
        onDown: () => {
          if (!isAnimating.current && !showGallery) {
             transitionToGallery();
          }
        },
        tolerance: 20,
        preventDefault: true
      });
    }, containerRef);

    return () => {
      ctx.revert();
      if (observerRef.current) observerRef.current.kill();
    };
  }, [showGallery]);

  return (
    <div ref={containerRef} className="relative h-screen w-screen bg-black overflow-hidden font-sans selection:bg-gold-modern/20">
      
      {/* Cinematic Transition Curtain */}
      <div className="transition-curtain fixed inset-0 z-[100] bg-[#1a1a1a] scale-y-0 pointer-events-none" />

      {!showGallery ? (
        <div className="absolute inset-0 z-0">
          <div className="intro-bg-overlay absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(43,30,22,1)_0%,rgba(0,0,0,1)_100%)]" />
          <div className="noise-overlay absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none" />

          {/* Cinematic Vignette */}
          <div className="absolute inset-0 z-50 pointer-events-none shadow-[inset_0_0_120px_rgba(0,0,0,1)]" />

          {/* SCENE 0: INTRO */}
          <div ref={introRef} className="absolute inset-0 z-20 flex flex-col items-center justify-center">
            <div className="intro-content relative flex flex-col items-center text-center">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[#f4d08a]/5 blur-[200px] rounded-full z-0" />
              
              <h1 className="intro-text text-white font-serif text-[12vw] md:text-[10vw] font-black tracking-tighter leading-none mb-4 z-10 transition-transform duration-1000">
                PMCPL
              </h1>
              
              <div className="intro-text flex flex-col gap-2 uppercase tracking-[0.6em] text-[#f4d08a]/70 text-[0.7rem] md:text-sm font-bold z-10 transition-transform duration-1000">
                 <span>Est. 1996</span>
                 <div className="h-px w-12 bg-[#f4d08a]/40 mx-auto" />
                 <span>From paper to platforms</span>
              </div>

              <div className="absolute inset-[-100vw] z-0">
                 {[...Array(8)].map((_, i) => (
                    <div 
                      key={i} 
                      className="intro-floating floating-asset absolute bg-white/5 border border-white/10 backdrop-blur-sm rounded-sm p-4 w-24 h-32 md:w-36 md:h-48 shadow-2xl"
                      style={{ 
                        top: `${Math.random() * 60 + 20}%`, 
                        left: `${Math.random() * 80 + 10}%`,
                        transform: `rotate(${Math.random() * 40 - 20}deg)`,
                      }}
                    >
                       <div className="w-full h-2 bg-white/10 mb-2" />
                       <div className="w-2/3 h-1 bg-white/5 mb-1" />
                       <div className="w-full h-1 bg-white/10" />
                    </div>
                 ))}
              </div>
            </div>
            
            <div className="absolute bottom-12 text-[#f4d08a]/40 uppercase tracking-[0.4em] text-[0.6rem] font-black animate-bounce">
               Swipe to Enter
            </div>
          </div>
        </div>
      ) : (
        <main className="relative h-screen w-screen overflow-hidden bg-[#1a1a1a] text-[#e8dcc4] animate-in fade-in duration-1000">
          <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#1a1a1a]">
            <div className="absolute inset-[-15%] scale-110 bg-cover bg-center bg-no-repeat opacity-[0.35] blur-[60px] transition-opacity duration-1000" style={{ backgroundImage: "url('/fullnewspaper.jpg')" }} />
            <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/80 via-transparent to-[#1a1a1a]/85" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_100%_at_50%_45%,rgba(50,50,50,0.1)_0%,rgba(20,20,20,0.4)_60%,rgba(10,10,10,0.7)_100%)]" />
          </div>

          <DepthGalleryCanvas 
            slides={SLIDES}
            finaleScrollRange={FINALE_SCROLL_RANGE}
            entranceRoute={ENTRANCE_ROUTE}
            onActiveIndexChange={setActiveIndex}
            onProgressChange={setProgress}
            onFinaleProgressChange={setFinaleProgress}
          />

          <div aria-hidden className="pointer-events-none fixed inset-0 z-[7] bg-[#ffffff] transition-opacity duration-300 ease-out" style={{ opacity: finaleProgress * 0.25 }} />
          <div className="noise-overlay opacity-[0.05]" /> 
          <div className="vignette opacity-[0.45]" /> 

          <GalleryOverlay 
            activeIndex={activeIndex}
            progress={progress}
            finaleProgress={finaleProgress}
          />
        </main>
      )}
    </div>
  );
};
