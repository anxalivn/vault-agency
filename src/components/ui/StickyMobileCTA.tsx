"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function StickyMobileCTA() {
  const [pastHero, setPastHero] = useState(false);
  const [nearCta, setNearCta] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Hide once the real booking section (with its own CTA) is on screen, so this bar
    // never sits on top of the Calendly embed or the footer.
    const ctaEl = document.getElementById("cta");
    let observer: IntersectionObserver | undefined;
    if (ctaEl) {
      observer = new IntersectionObserver(([entry]) => setNearCta(entry.isIntersecting), {
        rootMargin: "0px 0px -20% 0px",
      });
      observer.observe(ctaEl);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer?.disconnect();
    };
  }, []);

  const visible = pastHero && !nearCta;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 md:hidden"
        >
          <a
            href="#cta"
            className="flex w-full items-center bg-blush px-6 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 text-sm font-semibold text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ink"
          >
            Book a Free Call
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
