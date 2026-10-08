import type { Metadata } from "next";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import MagneticButton from "@/components/ui/MagneticButton";
import { navLinks } from "@/lib/content";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist or may have moved.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[90vh] flex-col justify-end overflow-hidden pb-16 pt-32 md:pb-24">
      <div className="mb-6 px-6 md:px-10">
        <Breadcrumbs items={[{ label: "Page Not Found", href: "/404" }]} />
      </div>

      {/* The numeral is cropped by the right edge on purpose: the page is literally missing. */}
      <span
        aria-hidden="true"
        className="font-display -mr-[8vw] block select-none whitespace-nowrap pl-4 text-[52vw] font-medium leading-[0.74] tracking-[-0.07em] text-blush md:pl-8 md:text-[40vw]"
      >
        404
      </span>

      <div className="mt-10 grid gap-8 px-6 md:grid-cols-12 md:px-10">
        <div className="md:col-span-6">
          <h1 className="font-display text-4xl md:text-6xl">This page took the day off.</h1>
          <p className="mt-4 max-w-md text-bone/70">
            That page doesn&rsquo;t exist. Let&rsquo;s get you back on track.
          </p>
        </div>

        <div className="flex flex-col items-start gap-6 md:col-span-4 md:col-start-8 md:justify-end">
          <div className="flex flex-wrap items-center gap-8">
            <MagneticButton href="/">Back to Home</MagneticButton>
            <MagneticButton href="/#cta" variant="outline">
              Book a Call Instead
            </MagneticButton>
          </div>
          <nav aria-label="Popular pages" className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={`/${link.href}`}
                className="rounded-sm text-bone/70 underline decoration-transparent decoration-2 underline-offset-4 transition-colors hover:decoration-blush focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blush"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}
