"use client";

import { useRef, type ReactNode, type ComponentPropsWithoutRef, type MouseEvent } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import clsx from "clsx";

interface MagneticButtonProps extends ComponentPropsWithoutRef<"a"> {
  children: ReactNode;
  variant?: "solid" | "outline";
}

// Internal, same-origin paths (e.g. "/", "/#cta") get client-side navigation via next/link.
// Same-page hash anchors ("#cta"), mailto:, and external URLs stay plain <a> tags.
function isInternalPath(href?: string) {
  return !!href && href.startsWith("/") && !href.startsWith("//");
}

export default function MagneticButton({
  children,
  className,
  variant = "solid",
  href,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, { x: x * 0.35, y: y * 0.5, duration: 0.5, ease: "power3.out" });
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
  };

  const classes = clsx(
    "group relative inline-flex items-center gap-2 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blush focus-visible:ring-offset-2 focus-visible:ring-offset-ink",
    variant === "solid"
      ? "bg-bone px-7 py-4 text-ink transition-colors duration-200 hover:bg-blush"
      : "py-2 text-bone underline decoration-blush decoration-2 underline-offset-8 transition-[text-underline-offset] duration-200 hover:underline-offset-4",
    className
  );

  if (isInternalPath(href)) {
    return (
      <Link
        ref={ref}
        href={href as string}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className={classes}
        {...props}
      >
        {children}
      </Link>
    );
  }

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={classes}
      {...props}
    >
      {children}
    </a>
  );
}
