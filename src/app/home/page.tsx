"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { cn } from "@/lib/utils/helpers";

// Modular Components
import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { Values } from "@/components/home/Values";
import { Services } from "@/components/home/Services";
import { CTA } from "@/components/home/CTA";

export default function RedesignedHomePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    // Bidirectional handoff: Scroll Up at top -> Gallery
    const handleScroll = (e: WheelEvent) => {
      if (window.scrollY === 0 && e.deltaY < -15 && !isExiting) {
        setIsExiting(true);
        setTimeout(() => {
          router.push("/depth-gallery?mode=reverse");
        }, 300);
      }
    };

    window.addEventListener("wheel", handleScroll, { passive: true });

    // Simple intersection observer for reveal animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-reveal').forEach(el => observer.observe(el));
    
    return () => {
      observer.disconnect();
      window.removeEventListener("wheel", handleScroll);
    };
  }, [router, isExiting]);

  return (
    <main className={cn(
      "relative min-h-screen transition-opacity duration-700 ease-in-out",
      (isLoaded && !isExiting) ? "opacity-100" : "opacity-0"
    )}>
      <Navbar />

      <Hero />
      <About />
      <Values />
      <Services />
      <CTA />

      <Footer />
    </main>
  );
}
