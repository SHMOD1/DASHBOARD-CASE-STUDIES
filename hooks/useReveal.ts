import type { AnimationConfig } from "@/types/content";
import { buildRevealVariants } from "@/animations/variants";

/** Returns ready-to-spread Framer Motion props for a section's configured reveal. */
export function useReveal(animation: AnimationConfig) {
  const variants = buildRevealVariants(animation);
  return {
    variants,
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, margin: "-10% 0px -10% 0px", amount: 0.3 },
  } as const;
}
