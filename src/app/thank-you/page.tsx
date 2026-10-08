import type { Metadata } from "next";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import MagneticButton from "@/components/ui/MagneticButton";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Thank You",
  description: "Your call is booked — here's what happens next.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/thank-you" },
};

export default function ThankYouPage() {
  return (
    <section className="relative flex min-h-[90vh] flex-col justify-end overflow-hidden px-6 pb-16 pt-32 md:px-10 md:pb-24">
      <div className="mb-10">
        <Breadcrumbs items={[{ label: "Thank You", href: "/thank-you" }]} />
      </div>

      <h1 className="font-display text-[19vw] font-medium leading-[0.84] tracking-[-0.05em] md:text-[13vw]">
        You&rsquo;re all
        <br />
        <span className="italic underline decoration-blush decoration-[0.05em] underline-offset-[0.1em] md:ml-[12vw]">
          booked.
        </span>
      </h1>

      <div className="mt-12 grid gap-8 md:grid-cols-12">
        <div className="md:col-span-4 md:col-start-8">
          <p className="text-lg text-bone/80">Check your inbox for a calendar invite.</p>
          <p className="mt-2 text-bone/60">{site.responsePromise}</p>
        </div>
        <div className="flex flex-wrap items-center gap-8 md:col-span-4 md:col-start-1 md:row-start-1">
          <MagneticButton href="/">Back to Home</MagneticButton>
          <MagneticButton href={`mailto:${site.email}`} variant="outline">
            Email Us Instead
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
