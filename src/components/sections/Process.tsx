"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import RevealText from "@/components/ui/RevealText";
import { processSteps } from "@/lib/content";

// Four steps descend like a staircase. Each numeral starts as an outline and fills in as it
// crosses the middle of the screen, so scrolling is literally working through the steps.
// Only the last one fills blush: that's where the client actually arrives.
export default function Process() {
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const numerals = list.querySelectorAll<HTMLElement>("[data-numeral]");

    const ctx = gsap.context(() => {
      numerals.forEach((n) => {
        gsap.to(n, {
          color: n.dataset.fill,
          ease: "none",
          scrollTrigger: { trigger: n, start: "top 75%", end: "top 40%", scrub: true },
        });
      });
    }, list);
    return () => ctx.revert();
  }, []);

  return (
    <section id="process" className="relative py-24 md:py-40">
      <div className="px-6 md:px-10">
        <p className="font-display text-lg italic text-bone/50">How it works</p>
        <RevealText
          as="h2"
          className="font-display mt-3 max-w-[14ch] text-4xl leading-[1.02] tracking-[-0.02em] sm:text-5xl md:text-7xl"
        >
          {"From first call\nto full coverage."}
        </RevealText>
      </div>

      <ol ref={listRef} className="mt-16 md:mt-28 md:[--stair:9vw]">
        {processSteps.map((item, i) => {
          const last = i === processSteps.length - 1;
          return (
            <li
              key={item.step}
              className="flex flex-col gap-2 px-6 md:flex-row md:items-end md:gap-10 md:px-10"
              style={{ marginLeft: `calc(var(--stair, 0vw) * ${i})` }}
            >
              <span
                data-numeral
                data-fill={last ? "#ffb3e7" : "#faf7f8"}
                aria-hidden="true"
                className="font-display select-none text-[34vw] font-medium leading-[0.8] tracking-[-0.06em] text-transparent [-webkit-text-stroke:1.5px_rgba(250,247,248,0.45)] md:text-[17vw]"
              >
                {item.step}
              </span>
              <div className="max-w-xs pb-2 md:pb-[1.5vw]">
                <h3 className="font-display text-2xl md:text-3xl">
                  <span className="sr-only">Step {item.step}: </span>
                  {item.title}
                </h3>
                <p className="mt-2 text-bone/70">{item.description}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
