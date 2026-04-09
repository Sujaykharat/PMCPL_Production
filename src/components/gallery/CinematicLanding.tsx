"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useRouter } from "next/navigation";

export const CinematicLanding = () => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const newspaperRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    // Initial Load Animation
    const ctx = gsap.context(() => {
      // Fade in background + grain
      gsap.fromTo(".bg-overlay", { opacity: 0 }, { opacity: 1, duration: 1.5, ease: "power2.inOut" });

      // Newspaper fade in + motion
      gsap.fromTo(newspaperRef.current, 
        { opacity: 0, y: 50, rotate: -12 }, 
        { 
          opacity: 1, 
          y: 0, 
          rotate: -8, 
          duration: 1.8, 
          ease: "power3.out",
          delay: 0.4
        }
      );

      // Intro text fade in
      gsap.fromTo(introRef.current, 
        { opacity: 0, y: -20 }, 
        { opacity: 1, y: 0, duration: 1.2, ease: "power2.out", delay: 0.2 }
      );

      // Card fade in
      gsap.fromTo(cardRef.current, 
        { opacity: 0, x: 50 }, 
        { opacity: 1, x: 0, duration: 1.5, ease: "power3.out", delay: 0.8 }
      );

      // Floating elements delay
      gsap.fromTo(".floating-item", 
        { opacity: 0, scale: 0.8 }, 
        { opacity: 1, scale: 1, duration: 1, stagger: 0.2, ease: "back.out(1.7)", delay: 1.2 }
      );

      // Ambient floating motions
      gsap.to(newspaperRef.current, {
        y: "-=15",
        rotate: "+=1.5",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      gsap.to(".floating-item", {
        y: "random(-20, 20)",
        rotate: "random(-5, 5)",
        duration: "random(2.5, 4.5)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          each: 0.2,
          from: "random"
        }
      });
    }, containerRef);

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 20 && !hasScrolled) {
        setHasScrolled(true);
        triggerExitTransition();
      }
    };

    const triggerExitTransition = () => {
      const tl = gsap.timeline({
        onComplete: () => {
          setTimeout(() => {
            router.push("/depth-gallery");
          }, 400);
        }
      });

      // Newspaper sticks to notice board (fast motion)
      tl.to(newspaperRef.current, {
        x: "-45%",
        y: "-15%",
        scale: 0.85,
        rotate: -2,
        duration: 0.7,
        ease: "power4.inOut"
      });

      // Move card away
      tl.to(cardRef.current, {
        x: "110%",
        opacity: 0,
        duration: 0.6,
        ease: "power3.in"
      }, 0);

      // Floating elements fade out
      tl.to(".floating-item", {
        opacity: 0,
        scale: 0.5,
        y: -100,
        duration: 0.5,
        stagger: 0.05,
        ease: "power2.in"
      }, 0);

      // Fade out background slightly to transition
      tl.to(containerRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut"
      }, 0.5);
    };

    window.addEventListener("wheel", handleWheel);
    return () => {
      ctx.revert();
      window.removeEventListener("wheel", handleWheel);
    };
  }, [router, hasScrolled]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100] h-screen w-screen overflow-hidden bg-black font-sans selection:bg-[#f4d08a]/30">
      {/* Background Gradient & Grain */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(43,30,22,1)_0%,rgba(0,0,0,1)_100%)]" />
      <div className="bg-overlay absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay" 
           style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
      
      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none z-10 shadow-[inset_0_0_150px_rgba(0,0,0,1)]" />

      {/* Intro Text */}
      <div ref={introRef} className="absolute top-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-[#f4d08a]/60 uppercase tracking-[0.4em] text-[0.6rem] font-bold">
        <span>PMCPL — Est. 1996</span>
        <div className="h-px w-8 bg-[#f4d08a]/30" />
        <span>From paper to platforms.</span>
      </div>

      <div className="relative flex h-full items-center justify-between px-10 md:px-24">
        
        {/* Floating Elements Mid-Layer */}
        <div ref={floatingRef} className="absolute inset-0 pointer-events-none z-0">
          <img src="/assets/floating_assets.png" alt="floating paper asset" className="floating-item absolute top-[15%] left-[25%] w-12 opacity-45 grayscale sepia" style={{ transform: 'rotate(15deg)' }} />
          <img src="/assets/floating_assets.png" alt="floating paper asset" className="floating-item absolute bottom-[20%] left-[35%] w-16 opacity-30 blur-[2px]" />
          <img src="/assets/floating_assets.png" alt="floating paper asset" className="floating-item absolute top-[40%] left-[10%] w-8 opacity-60" style={{ transform: 'rotate(-45deg)' }} />
          <img src="/assets/floating_assets.png" alt="floating paper asset" className="floating-item absolute bottom-[35%] left-[20%] w-20 opacity-20 blur-[4px]" />
        </div>

        {/* Newspaper Foreground */}
        <div className="relative flex-1 flex justify-center lg:justify-start">
          <div 
            ref={newspaperRef}
            className="relative w-[min(32rem,85vw)] aspect-[3/4] preserve-3d"
          >
            {/* Soft Shadow below */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[90%] h-12 bg-black/60 blur-[40px] rounded-full" />
            
            {/* The Newspaper */}
            <div 
              className="w-full h-full rounded-sm overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.8)] border border-white/5"
              style={{
                backgroundImage: 'url("/assets/newspaper.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: '0 50px 100px -20px rgba(0,0,0,0.7), 0 30px 60px -30px rgba(0,0,0,0.8)'
              }}
            />
            
            {/* Lighting Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/10 mix-blend-overlay pointer-events-none" />
            <div className="absolute inset-0 pointer-events-none border border-white/10 rounded-sm" />
          </div>
        </div>

        {/* Text Card Center-Right */}
        <div className="relative flex-1 flex justify-center lg:justify-end">
          <div className="relative">
            {/* Golden Glow background */}
            <div className="absolute -inset-10 bg-[#f4d08a]/15 blur-[80px] rounded-full animate-pulse z-0" />
            
            <div 
              ref={cardRef}
              className="relative z-10 glass max-w-md p-8 md:p-12 rounded-[2rem] border border-white/10 bg-black/40 backdrop-blur-3xl shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="h-[2px] w-12 bg-[#f4d08a]" />
                <span className="text-[#f4d08a] text-[0.7rem] uppercase font-black tracking-[0.3em]">Hiring Archives</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight mb-6 tracking-normal">
                1995 — Hiring wave begins
              </h2>
              
              <p className="text-white/60 text-base md:text-lg leading-relaxed font-light mb-8">
                Classifieds and walk-in interviews marked the first hiring push. A time when local connections and paper trails were the pulse of PMCPL.
              </p>

              <div className="flex items-center gap-2 text-[0.6rem] text-white/30 uppercase tracking-[0.2em]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#f4d08a] animate-ping" />
                <span>Scroll to dive into history</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      <style jsx>{`
        .glass {
          background: rgba(0, 0, 0, 0.45);
          backdrop-filter: blur(40px);
          -webkit-backdrop-filter: blur(40px);
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
      `}</style>
    </div>
  );
};
