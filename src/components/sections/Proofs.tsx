"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import RevealText from "@/components/ui/RevealText";
import { proofs } from "@/lib/content";

type Proof = (typeof proofs)[number];

function Shot({ proof, index }: { proof: Proof; index: number }) {
  return (
    <Image
      src={proof.src}
      alt={`Earnings statistics screenshot ${index + 1} of ${proofs.length}`}
      width={3024}
      height={1964}
      sizes="(min-width: 768px) 55vw, 100vw"
      // Remote URLs from the env vars aren't in next.config's allow-list, so skip the optimizer for them.
      unoptimized={/^https?:\/\//.test(proof.src)}
      className="h-full w-full object-cover"
    />
  );
}

const Heading = () => (
  <>
    <p className="font-display text-lg italic text-bone/50">Receipts</p>
    <RevealText
      as="h2"
      className="font-display mt-2 text-4xl font-medium leading-[0.98] tracking-[-0.03em] md:text-6xl"
    >
      {"Real earnings.\nReal creators."}
    </RevealText>
  </>
);

const Footnote = ({ className = "" }: { className?: string }) => (
  <p className={`max-w-xs text-sm text-bone/60 ${className}`}>
    Screenshots added as our creators hit new milestones — with consent, always anonymized on
    request.
  </p>
);

// The section pins when it reaches the top of the screen and your scroll turns the
// receipts over, one wipe at a time, until the last one. Then the page carries on.
export default function Proofs() {
  const reduced = useReducedMotion();
  const pinRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [changed, setChanged] = useState(false);
  const activeRef = useRef(0);

  useEffect(() => {
    const el = pinRef.current;
    if (!el || prefersReducedMotion()) return;
    const n = proofs.length;

    const show = (i: number) => {
      if (i === activeRef.current) return;
      setPrev(activeRef.current);
      activeRef.current = i;
      setActive(i);
      setChanged(true);
    };

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        // Every receipt, the last one included, gets its own full slot of scrolling.
        end: () => `+=${Math.round(window.innerHeight * 0.9 * n)}`,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          show(Math.min(n - 1, Math.floor(self.progress * n)));
          if (barRef.current) barRef.current.style.transform = `scaleX(${self.progress})`;
        },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  // Reduced motion: no pin, no wipes. All the receipts, one after another.
  if (reduced) {
    return (
      <section id="proofs" className="relative px-6 py-24 md:px-10 md:py-40">
        <Heading />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {proofs.map((proof, i) => (
            <div key={proof.id} className="aspect-[3024/1964] overflow-hidden bg-bone/[0.06]">
              <Shot proof={proof} index={i} />
            </div>
          ))}
        </div>
        <Footnote className="mt-10" />
      </section>
    );
  }

  return (
    <section id="proofs" className="relative">
      <div
        ref={pinRef}
        className="grid min-h-[100svh] content-center gap-8 py-24 md:grid-cols-12 md:items-center md:gap-0 md:py-16"
      >
        <div className="px-6 md:col-span-5 md:pl-10 md:pr-10">
          <Heading />

          <span aria-hidden="true" className="mt-8 block h-px w-full max-w-xs bg-bone/15 md:mt-10">
            <span ref={barRef} className="block h-full origin-left scale-x-0 bg-blush" />
          </span>

          <Footnote className="mt-5 md:mt-6" />
        </div>

        <div className="px-6 md:col-span-7 md:pl-0 md:pr-10">
          <div className="relative aspect-[3024/1964] w-full overflow-hidden bg-bone/[0.06] md:max-w-[min(100%,calc(66svh*1.54))]">
            {prev !== null && prev !== active && (
              <div className="absolute inset-0" aria-hidden="true">
                <Shot proof={proofs[prev]} index={prev} />
              </div>
            )}
            <motion.div
              key={active}
              className="absolute inset-0"
              initial={changed ? { clipPath: "inset(0 100% 0 0)" } : false}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            >
              <Shot proof={proofs[active]} index={active} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
