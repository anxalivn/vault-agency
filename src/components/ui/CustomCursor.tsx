"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useMediaQuery } from "@/lib/useMediaQuery";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const isFinePointer = useMediaQuery("(pointer: fine)");
  // The dot/ring only mount — and the native cursor is only hidden — once we've confirmed
  // a fine pointer. It starts `false` on the server and on first client render (matching),
  // so there's no hydration mismatch.
  const active = isFinePointer;

  useEffect(() => {
    if (!active) return;

    document.body.classList.add("cursor-none-active");

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const onEnterInteractive = () => {
      gsap.to(ring, { scale: 2.4, backgroundColor: "rgba(255,179,231,0.15)", duration: 0.35, ease: "power3.out" });
      gsap.to(dot, { scale: 0, duration: 0.2 });
    };
    const onLeaveInteractive = () => {
      gsap.to(ring, { scale: 1, backgroundColor: "rgba(255,179,231,0)", duration: 0.35, ease: "power3.out" });
      gsap.to(dot, { scale: 1, duration: 0.2 });
    };

    const interactiveEls = document.querySelectorAll("a, button, [data-cursor-hover]");
    interactiveEls.forEach((el) => {
      el.addEventListener("mouseenter", onEnterInteractive);
      el.addEventListener("mouseleave", onLeaveInteractive);
    });

    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      document.body.classList.remove("cursor-none-active");
      window.removeEventListener("mousemove", onMove);
      interactiveEls.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterInteractive);
        el.removeEventListener("mouseleave", onLeaveInteractive);
      });
    };
  }, [active]);

  if (!active) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[70] hidden md:block" aria-hidden="true">
      <div
        ref={ringRef}
        className="fixed left-0 top-0 h-9 w-9 rounded-full border border-blush"
        style={{ backgroundColor: "rgba(255,179,231,0)" }}
      />
      <div ref={dotRef} className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-blush" />
    </div>
  );
}
