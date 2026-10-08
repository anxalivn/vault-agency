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
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
          className="fixed bottom-0 right-0 z-40 md:hidden"
        >
          <a
            href="#cta"
            className="block bg-blush pb-[max(1.25rem,env(safe-area-inset-bottom))] pl-7 pr-6 pt-5 text-sm font-semibold text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ink"
          >
            Book a Call
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
