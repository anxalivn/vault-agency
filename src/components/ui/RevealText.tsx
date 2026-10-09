"use client";

import { useEffect, useRef, type ElementType, type Ref } from "react";
import { gsap } from "@/lib/gsap";

interface RevealTextProps {
  children: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  start?: string;
}

export default function RevealText({
  children,
  as: Tag = "div",
  className = "",
  delay = 0,
  stagger = 0.08,
  start = "top 85%",
}: RevealTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const lines = children.split("\n");

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const targets = el.querySelectorAll<HTMLElement>(".reveal-inner");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.1,
          ease: "power4.out",
          stagger,
          delay,
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: "play none none reverse",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [delay, stagger, start]);

  return (
    <Tag ref={containerRef as Ref<HTMLElement>} className={className}>
      {lines.map((line, i) => (
        <span className="split-line" key={i}>
          <span className="reveal-inner inline-block">{line}</span>
        </span>
      ))}
    </Tag>
  );
}
