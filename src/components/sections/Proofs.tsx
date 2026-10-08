"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import RevealText from "@/components/ui/RevealText";
import { proofs } from "@/lib/content";

type Proof = (typeof proofs)[number];

function Shot({ proof }: { proof: Proof }) {
  if (!proof.src) {
    return (
      <p className="flex h-full w-full items-end bg-bone/[0.06] p-5 font-display text-lg italic text-bone/35">
        Desktop screenshot goes here
      </p>
    );
  }
  return (
    <Image
      src={proof.src}
      alt={`Earnings statistics screenshot: ${proof.caption}`}
      width={3024}
      height={1964}
      sizes="(min-width: 768px) 55vw, 100vw"
      // Remote URLs from the env vars aren't in next.config's allow-list, so skip the optimizer for them.
      unoptimized={/^https?:\/\//.test(proof.src)}
      className="h-full w-full object-cover"
    />
  );
}

// The section pins when it reaches the top of the screen and your scroll turns the
// receipts over, one wipe at a time, until the last one. Then the page carries on.
export default function Proofs() {
  const reduced = useReducedMotion();
  const pinRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [changed, setChanged] = useState(false);

  const show = (i: number) => {
    if (i === activeRef.current) return;
    setPrev(activeRef.current);
    activeRef.current = i;
    setActive(i);
    setChanged(true);
  };

  useEffect(() => {
    const el = pinRef.current;
    if (!el || prefersReducedMotion()) return;
    const n = proofs.length;

    const ctx = gsap.context(() => {
      triggerRef.current = ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: () => `+=${Math.round(window.innerHeight * 0.75 * (n - 1)) + window.innerHeight * 0.25}`,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          show(Math.min(n - 1, Math.floor(self.progress * n)));
          if (barRef.current) barRef.current.style.transform = `scaleX(${self.progress})`;
        },
      });
    }, el);
    return () => {
      triggerRef.current = null;
      ctx.revert();
    };
  }, []);

  // With the pin, a caption jumps the page to that receipt's slot; without it, it just swaps.
  const choose = (i: number) => {
    const st = triggerRef.current;
    if (!st) return show(i);
    const n = proofs.length;
    window.scrollTo({ top: st.start + ((i + 0.5) / n) * (st.end - st.start) });
  };

  return (
    <section id="proofs" className="relative">
      <div
        ref={pinRef}
        className="grid min-h-[100svh] content-center gap-8 py-24 md:grid-cols-12 md:items-center md:gap-0 md:py-16"
      >
        <div className="px-6 md:col-span-5 md:pl-10 md:pr-10">
          <p className="font-display text-lg italic text-bone/50">Receipts</p>
          <RevealText
            as="h2"
            className="font-display mt-2 text-4xl font-medium leading-[0.98] tracking-[-0.03em] md:text-6xl"
          >
            {"Real earnings.\nReal creators."}
          </RevealText>

          <div role="group" aria-label="Choose a screenshot" className="mt-6 flex flex-col items-start md:mt-10">
            {proofs.map((proof, i) => (
              <button
                key={proof.id}
                type="button"
                aria-pressed={i === active}
                onClick={() => choose(i)}
                data-cursor-hover
                className={`rounded-sm py-0.5 text-left font-display text-xl italic underline decoration-2 underline-offset-[7px] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blush focus-visible:ring-offset-2 focus-visible:ring-offset-ink md:py-1 md:text-2xl ${
                  i === active
                    ? "text-bone decoration-blush"
                    : "text-bone/50 decoration-transparent hover:text-bone"
                }`}
              >
                {proof.caption}
              </button>
            ))}
          </div>

          <span aria-hidden="true" className="mt-6 block h-px w-full max-w-xs bg-bone/15 md:mt-8">
            <span ref={barRef} className="block h-full origin-left scale-x-0 bg-blush" />
          </span>

          <p className="mt-5 max-w-xs text-sm text-bone/60 md:mt-6">
            Screenshots added as our creators hit new milestones — with consent, always anonymized on
            request.
          </p>
        </div>

        <div className="px-6 md:col-span-7 md:pl-0 md:pr-10">
          <div
            className="relative aspect-[3024/1964] w-full overflow-hidden bg-bone/[0.06] md:max-w-[min(100%,calc(66svh*1.54))]"
          >
            {prev !== null && prev !== active && (
              <div className="absolute inset-0" aria-hidden="true">
                <Shot proof={proofs[prev]} />
              </div>
            )}
            <motion.div
              key={active}
              className="absolute inset-0"
              initial={changed && !reduced ? { clipPath: "inset(0 100% 0 0)" } : false}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            >
              <Shot proof={proofs[active]} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
