"use client";

import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type ScopeRef = RefObject<HTMLElement | null>;

/**
 * Runs a GSAP setup function scoped to `scope`, wrapped in gsap.context for
 * automatic cleanup (kills tweens + ScrollTriggers on unmount / dependency change).
 */
export function useScrollTrigger(
  scope: ScopeRef,
  setup: (gsapInstance: typeof gsap, ScrollTriggerInstance: typeof ScrollTrigger) => void,
  deps: unknown[] = []
) {
  useLayoutEffect(() => {
    if (!scope.current) return;
    const ctx = gsap.context(() => {
      setup(gsap, ScrollTrigger);
    }, scope);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
