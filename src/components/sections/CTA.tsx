"use client";

import dynamic from "next/dynamic";
import RevealText from "@/components/ui/RevealText";
import MaskReveal from "@/components/ui/MaskReveal";
import { useCalendlyEventListener } from "react-calendly";
import { sendGAEvent } from "@next/third-parties/google";
import { site } from "@/lib/content";

const InlineWidget = dynamic(
  () => import("react-calendly").then((mod) => mod.InlineWidget),
  { ssr: false }
);

// The page closes on a single blush field. The booking sheet is laid across the bottom of
// the headline and runs off the right edge, so the question and the answer are one picture.
export default function CTA() {
  // A booked call is the conversion. No-op when GA isn't loaded (no NEXT_PUBLIC_GA_ID).
  useCalendlyEventListener({
    onEventScheduled: () => {
      if (site.gaId) sendGAEvent("event", "generate_lead", { method: "calendly" });
    },
  });

  return (
    <section id="cta" className="relative overflow-hidden bg-blush py-20 text-ink md:py-32">
      <h2 className="font-display px-6 text-[15vw] font-medium leading-[0.86] tracking-[-0.05em] md:px-10 md:text-[10.5vw]">
        <RevealText as="span" className="block">
          Ready to stop
        </RevealText>
        <RevealText as="span" className="block italic md:ml-[9vw]" delay={0.15}>
          doing it alone?
        </RevealText>
      </h2>

      <div className="relative z-10 mt-10 grid grid-cols-1 gap-10 px-6 md:-mt-[1vw] md:grid-cols-12 md:gap-8 md:pl-10 md:pr-0">
        <div className="md:col-span-3 md:self-end md:pb-6">
          <p className="font-display text-2xl leading-snug md:text-3xl">
            Book a free, no-pressure strategy call.
          </p>
          <p className="mt-8 text-sm">
            Prefer email?
            <br />
            <a
              href={`mailto:${site.email}`}
              className="font-display text-xl underline decoration-2 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-blush"
              data-cursor-hover
            >
              {site.email}
            </a>
          </p>
        </div>

        <MaskReveal from="bottom" className="md:col-span-9 md:-mr-px">
          <div className="h-[650px] w-full overflow-hidden bg-bone">
            <InlineWidget
              url={site.calendlyUrl}
              styles={{ height: "100%", width: "100%" }}
              pageSettings={{
                backgroundColor: "faf7f8",
                primaryColor: "f588d8",
                textColor: "0a0a0a",
                hideEventTypeDetails: false,
                hideLandingPageDetails: false,
              }}
            />
          </div>
        </MaskReveal>
      </div>
    </section>
  );
}
