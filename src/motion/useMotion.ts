import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "../hooks/useMediaQuery";

gsap.registerPlugin(ScrollTrigger);
export { gsap, ScrollTrigger };

// Scope all selectors and tweens to the owning component. Preference changes
// revert the previous scene before constructing the next one.
export function useMotion<T extends HTMLElement>(
  ref: RefObject<T | null>,
  setup: (root: T) => void,
) {
  const reduced = usePrefersReducedMotion();
  useLayoutEffect(() => {
    if (reduced || !ref.current) return;
    const context = gsap.context(() => setup(ref.current!), ref);
    return () => context.revert();
  }, [ref, setup, reduced]);
}

export function revealChildren(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => {
    gsap.from(element, {
      y: 38,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: element, start: "top 92%", once: true },
    });
  });
}
