import type Lenis from "lenis";

// The smooth-scroll instance is created once in SmoothScrollProvider. Anything that needs to
// freeze the page (like the mobile menu) reaches it here instead of fighting it from outside.
let instance: Lenis | null = null;

export const setLenis = (lenis: Lenis | null) => {
  instance = lenis;
};
export const getLenis = () => instance;
