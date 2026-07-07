import type Lenis from "lenis";

let instance: Lenis | null = null;

export function setLenisInstance(lenis: Lenis | null) {
  instance = lenis;
}

export function getLenisInstance() {
  return instance;
}

export function scrollToSection(target: string | HTMLElement, offset = 0) {
  if (instance) {
    instance.scrollTo(target, { offset, duration: 1.4 });
  } else if (typeof target !== "string") {
    target.scrollIntoView({ behavior: "smooth" });
  }
}
