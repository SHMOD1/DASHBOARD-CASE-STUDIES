import type { Variants } from "framer-motion";
import type { AnimationConfig } from "@/types/content";
import { toFramerEasing } from "@/animations/easings";

const OFFSET = 64;

function offsetFor(direction: AnimationConfig["slideDirection"]) {
  switch (direction) {
    case "up":
      return { x: 0, y: OFFSET };
    case "down":
      return { x: 0, y: -OFFSET };
    case "left":
      return { x: OFFSET, y: 0 };
    case "right":
      return { x: -OFFSET, y: 0 };
    default:
      return { x: 0, y: OFFSET };
  }
}

/** Builds Framer Motion variants (hidden/visible) from a section's animation config. */
export function buildRevealVariants(animation: AnimationConfig): Variants {
  const ease = toFramerEasing(animation.easing);
  const transition = {
    duration: animation.duration,
    delay: animation.delay,
    ease,
  };

  if (!animation.enabled || animation.reveal === "none") {
    return {
      hidden: {},
      visible: { transition },
    };
  }

  switch (animation.reveal) {
    case "slide": {
      const { x, y } = offsetFor(animation.slideDirection);
      return {
        hidden: { opacity: 0, x, y },
        visible: { opacity: 1, x: 0, y: 0, transition },
      };
    }
    case "scale":
      return {
        hidden: { opacity: 0, scale: 0.88 },
        visible: { opacity: 1, scale: 1, transition },
      };
    case "mask":
      return {
        hidden: { opacity: 0, scale: 1.08 },
        visible: { opacity: 1, scale: 1, transition: { ...transition, duration: animation.duration * 1.2 } },
      };
    case "parallax":
    case "fade":
    default:
      return {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition },
      };
  }
}

export const staggerContainer = (stagger = 0.08): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger } },
});

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};
