"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { site } from "@/lib/content";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const slabRef = useRef<HTMLSpanElement>(null);
  const coverTextRef = useRef<HTMLSpanElement>(null);
  const youRef = useRef<HTMLSpanElement>(null);
  const weRef = useRef<HTMLSpanElement>(null);
  const supportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = headlineRef.current?.querySelectorAll<HTMLElement>(".reveal-inner");

      if (prefersReducedMotion()) {
        // Final composition, no motion: slab already covering, everything visible.
        gsap.set(slabRef.current, { clipPath: "inset(0 0% 0 0)" });
        gsap.set(coverTextRef.current, { color: "#000000" });
        return;
      }

      // The headline says "cover": lines rise out of their masks, then a blush slab
      // wipes across "the rest." and the type flips to black as it passes under.
      const tl = gsap.timeline({ delay: 0.2 });
      if (lines?.length) {
        tl.fromTo(lines, { yPercent: 105 }, { yPercent: 0, duration: 1, ease: "power4.out", stagger: 0.12 });
      }
      tl.fromTo(
        slabRef.current,
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 0.9, ease: "power3.inOut" },
        "-=0.1"
      );
      tl.to(coverTextRef.current, { color: "#000000", duration: 0.2, ease: "none" }, "<0.4");
      tl.fromTo(
        supportRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
        "-=0.3"
      );

      // As you scroll, "You create." and "We cover" drift apart: the work and the cover.
      const scrub = { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true };
      gsap.to(youRef.current, { xPercent: 14, ease: "none", scrollTrigger: scrub });
      gsap.to(weRef.current, { xPercent: -8, ease: "none", scrollTrigger: scrub });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-10 pt-32 md:pb-14"
    >
      <p className="absolute right-4 top-1/2 hidden origin-center -translate-y-1/2 rotate-90 whitespace-nowrap text-xs tracking-[0.2em] text-bone/50 lg:block">
        Woman-owned &middot; Fansly &amp; OnlyFans Management
      </p>

      <h1 ref={headlineRef} className="font-display px-6 md:px-10">
        <span className="sr-only">You create. We cover the rest.</span>
        <span aria-hidden="true" className="block">
          <span className="split-line">
            <span ref={youRef} className="block pb-[0.08em] text-[11vw] italic leading-none text-bone/60 md:text-[6vw]">
              <span className="reveal-inner inline-block">You create.</span>
            </span>
          </span>

          <span className="split-line -mt-[0.02em]">
            <span ref={weRef} className="block text-[24vw] font-medium leading-[0.84] tracking-[-0.04em] text-bone md:text-[17vw]">
              <span className="reveal-inner inline-block">We cover</span>
            </span>
          </span>

          <span className="split-line md:ml-[14vw]">
            <span className="block text-[24vw] font-medium leading-[0.9] tracking-[-0.04em] md:text-[17vw]">
              <span className="reveal-inner relative inline-block">
                <span
                  ref={slabRef}
                  className="absolute -inset-x-[0.04em] inset-y-[0.08em] bg-blush"
                  style={{ clipPath: "inset(0 100% 0 0)" }}
                />
                <span ref={coverTextRef} className="relative text-bone">
                  the rest.
                </span>
              </span>
            </span>
          </span>
        </span>
      </h1>

      <div
        ref={supportRef}
        className="mt-10 grid gap-8 px-6 md:mt-14 md:grid-cols-12 md:px-10"
      >
        <p className="max-w-xs text-lg text-bone/75 md:col-span-4 md:col-start-1 md:text-xl">
          24-hour chat coverage, editing, and growth — for every creator.
        </p>

        <div className="flex flex-col items-start gap-5 md:col-span-6 md:col-start-7 md:flex-row md:items-center md:gap-8">
          <a
            href="#cta"
            className="bg-bone px-7 py-4 text-sm font-semibold text-ink transition-colors duration-200 hover:bg-blush focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blush focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            Book a Free Call
          </a>
          <a
            href="#services"
            className="text-sm font-semibold text-bone underline decoration-blush decoration-2 underline-offset-8 transition-[text-underline-offset] duration-200 hover:underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blush focus-visible:ring-offset-4 focus-visible:ring-offset-ink"
          >
            See What&rsquo;s Included
          </a>
        </div>

        <p className="text-sm text-bone/55 md:col-span-12">{site.responsePromise}</p>
      </div>
    </section>
  );
}
