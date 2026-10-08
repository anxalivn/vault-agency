"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

interface MaskRevealProps {
  children: ReactNode;
  className?: string;
  from?: "left" | "bottom";
}

// Unmasks its content once as it scrolls into view. Used for photographs, where a wipe
// reads as a page being uncovered rather than as an element "animating in".
export default function MaskReveal({ children, className = "", from = "left" }: MaskRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const hidden = from === "left" ? "inset(0 100% 0 0)" : "inset(100% 0 0 0)";
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { clipPath: hidden },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.2,
          ease: "power4.inOut",
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [from]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
