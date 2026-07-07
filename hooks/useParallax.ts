"use client";

import { useRef } from "react";
import { useScrollTrigger } from "@/hooks/useScrollTrigger";

/**
 * Applies a vertical parallax translate to `layerRef` as `containerRef` moves
 * through the viewport. `strength` is 0-100, mapped to a percentage of travel.
 */
export function useParallax(
  containerRef: React.RefObject<HTMLElement | null>,
  layerRef: React.RefObject<HTMLElement | null>,
  strength: number,
  enabled: boolean
) {
  useScrollTrigger(
    containerRef,
    (gsap, ScrollTrigger) => {
      if (!enabled || !layerRef.current) return;
      const distance = (strength / 100) * 220;
      gsap.fromTo(
        layerRef.current,
        { yPercent: -distance / 4 },
        {
          yPercent: distance / 4,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        }
      );
    },
    [strength, enabled]
  );
}
