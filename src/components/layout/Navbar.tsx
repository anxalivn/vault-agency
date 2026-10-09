"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, site } from "@/lib/content";
import { getLenis } from "@/lib/lenis";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blush focus-visible:ring-offset-2 focus-visible:ring-offset-ink";

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  // Slides away while you read downward, comes back the moment you scroll up.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - last) > 6) setHidden(y > last && y > 240);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // While the menu is open the page behind it must not move: stop Lenis (wheel) and lock the
  // root and body overflow (touch, which Lenis leaves native). Escape closes it.
  useEffect(() => {
    if (!open) return;
    const lenis = getLenis();
    lenis?.stop();
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    root.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      root.style.overflow = prevOverflow;
      document.body.style.overflow = prevBodyOverflow;
      lenis?.start();
    };
  }, [open]);

  const show = !hidden || open;

  return (
    <>
      {/* Wordmark and links have no bar behind them; difference blending keeps them legible
          over both black and the blush slabs. */}
      <header
        className={`fixed inset-x-0 top-0 z-50 text-white mix-blend-difference transition-transform duration-500 ${
          show ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex items-start justify-between px-6 py-6 md:px-10 md:py-8">
          <a href="#top" aria-label={`${site.name}, back to top`} className={`block rounded-sm ${focusRing}`} data-cursor-hover>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo/lexmanages-logo.svg" alt="" width={955} height={197} className="h-6 w-auto md:h-7" />
          </a>

          <nav aria-label="Primary" className="hidden items-baseline gap-9 pr-36 text-sm md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`rounded-sm underline decoration-transparent decoration-2 underline-offset-[6px] transition-[text-decoration-color,text-underline-offset] duration-200 hover:decoration-current hover:underline-offset-4 ${focusRing}`}
                data-cursor-hover
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            className={`rounded-sm text-sm underline underline-offset-4 md:hidden ${focusRing}`}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      {/* The single blush tab, hung from the top-right corner. */}
      <a
        href="#cta"
        className={`fixed right-0 top-0 z-50 hidden bg-blush px-7 pb-5 pt-7 text-sm font-semibold text-ink transition-transform duration-500 hover:pb-7 md:block ${focusRing} ${
          show ? "translate-y-0" : "-translate-y-full"
        }`}
        data-cursor-hover
      >
        Book a Call
      </a>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            data-lenis-prevent
            className="fixed inset-0 z-[45] flex flex-col justify-end overflow-y-auto overscroll-contain bg-ink px-6 pb-10 pt-28 md:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col">
              {navLinks.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`font-display border-b border-white/10 py-3 text-[15vw] leading-none tracking-[-0.03em] ${i % 2 ? "pl-[12vw] italic" : ""} ${focusRing}`}
                >
                  {link.label}
                </a>
              ))}
            </nav>
            {/* The one blush moment in the menu: the booking link is a blush band, set at the
                same display scale as the page links above it. */}
            <a
              href="#cta"
              onClick={() => setOpen(false)}
              className={`font-display -mx-6 mt-6 bg-blush px-6 py-5 text-[11vw] font-medium italic leading-none tracking-[-0.03em] text-ink focus-visible:ring-inset focus-visible:ring-ink ${focusRing}`}
            >
              Book a free call
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
