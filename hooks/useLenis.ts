"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setLenisInstance } from "@/lib/lenis";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** Wires Lenis smooth-scroll into GSAP's ticker/ScrollTrigger so both stay in sync. */
export function useLenis() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const lenis = new Lenis({
      duration: prefersReducedMotion ? 0.4 : 1.2,
      easing: (t: number) => Math.min(1, 1 - Math.pow(2, -10 * t)),
      smoothWheel: !prefersReducedMotion,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    });

    setLenisInstance(lenis);

    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      setLenisInstance(null);
    };
  }, []);
}
