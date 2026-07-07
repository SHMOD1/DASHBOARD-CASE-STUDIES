/** Approximate cubic-bezier equivalents for GSAP-style easing names, used by Framer Motion variants. */
export const EASING_CURVES: Record<string, [number, number, number, number]> = {
  "power1.out": [0.25, 0.46, 0.45, 0.94],
  "power2.out": [0.19, 0.84, 0.36, 1],
  "power3.out": [0.22, 1, 0.36, 1],
  "power4.out": [0.19, 1, 0.22, 1],
  "expo.out": [0.16, 1, 0.3, 1],
  "circ.out": [0, 0.55, 0.45, 1],
  "sine.inOut": [0.37, 0, 0.63, 1],
};

export function toFramerEasing(name: string): [number, number, number, number] {
  return EASING_CURVES[name] ?? EASING_CURVES["power3.out"];
}
