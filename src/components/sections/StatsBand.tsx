"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import Counter from "@/components/ui/Counter";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { stats } from "@/lib/content";

export default function StatsBand() {
  const sectionRef = useRef<HTMLElement>(null);
  const slabRef = useRef<HTMLDivElement>(null);
  const [lead, ...rest] = stats;
  const [scrubbed, setHours] = useState(0);
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const hours = reduced ? lead.value : scrubbed;

  useEffect(() => {
    if (prefersReducedMotion()) {
      gsap.set(slabRef.current, { clipPath: "inset(0 0% 0 0)" });
      return;
    }
    const ctx = gsap.context(() => {
      // The slab opens like the hero's wipe, then the hours accrue as you scroll through it:
      // the number answers "how long are we on?" by actually running up the clock.
      gsap.fromTo(
        slabRef.current,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1,
          ease: "power3.inOut",
          scrollTrigger: { trigger: slabRef.current, start: "top 80%", toggleActions: "play none none none" },
        }
      );
      const clock = { h: 0 };
      gsap.to(clock, {
        h: lead.value,
        ease: "none",
        onUpdate: () => setHours(Math.round(clock.h)),
        scrollTrigger: { trigger: slabRef.current, start: "top 70%", end: "bottom 45%", scrub: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [lead.value]);

  const [women, pipeline, judgment] = rest;

  return (
    <section ref={sectionRef} aria-label="By the numbers" className="relative py-20 md:py-32">
      <div
        ref={slabRef}
        className="relative overflow-hidden bg-blush text-ink md:mr-[9vw]"
        style={{ clipPath: "inset(0 100% 0 0)" }}
      >
        <p className="font-display px-6 pt-8 text-xl italic md:absolute md:right-10 md:top-10 md:max-w-[14ch] md:px-0 md:pt-0 md:text-right md:text-3xl">
          {lead.label}
        </p>
        <p
          aria-label={`${lead.value}${lead.suffix} ${lead.label}`}
          className="font-display select-none whitespace-nowrap pl-4 text-[46vw] font-medium leading-[0.74] tracking-[-0.06em] md:pl-8 md:text-[30vw]"
        >
          <span aria-hidden="true" className="tabular-nums">
            {hours}
            {lead.suffix}
          </span>
        </p>
      </div>

      <dl className="mt-16 grid grid-cols-1 gap-y-14 px-6 md:mt-24 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5 md:col-start-2">
          <dt className="font-display text-2xl italic text-bone/70 md:text-3xl">{women.label}</dt>
          <dd className="font-display mt-2 text-[28vw] font-medium leading-[0.85] tracking-[-0.05em] md:text-[12vw]">
            <Counter value={women.value} suffix={women.suffix} />
          </dd>
        </div>

        <div className="md:col-span-4 md:col-start-8 md:mt-24">
          <dd className="font-display text-7xl font-medium leading-none tracking-[-0.04em] md:text-8xl">
            <Counter value={pipeline.value} suffix={pipeline.suffix} />
          </dd>
          <dt className="mt-3 text-sm text-bone/60 md:text-base">{pipeline.label}</dt>
        </div>

        <div className="flex items-baseline gap-5 font-display text-5xl leading-none tracking-[-0.03em] md:col-span-6 md:col-start-4 md:text-6xl">
          <dd className="underline decoration-blush decoration-[0.08em] underline-offset-[0.14em]">
            <Counter value={judgment.value} suffix={judgment.suffix} />
          </dd>
          <dt className="italic text-bone/80">{judgment.label}</dt>
        </div>
      </dl>

      {/* The pricing promise, set as the last statement of the band: the number is the headline. */}
      <p className="font-display mt-24 px-6 md:mt-40 md:px-10">
        <span className="block text-2xl italic text-bone/70 md:ml-[8vw] md:text-3xl">
          Honest and straightforward cut:
        </span>
        <span className="mt-2 block text-[20vw] font-medium leading-[0.85] tracking-[-0.05em] md:ml-[8vw] md:text-[13vw]">
          40%
        </span>
        <span className="mt-3 block text-3xl italic text-bone/80 md:ml-[30vw] md:text-5xl">
          lower than 99% of the agencies.
        </span>
      </p>
    </section>
  );
}
