import Image from "next/image";
import RevealText from "@/components/ui/RevealText";
import MaskReveal from "@/components/ui/MaskReveal";
import { audiences, site } from "@/lib/content";

// A magazine spread: tall portrait on the left, the headline set at pull-quote scale beside
// it, the small print tucked into the lower right.
export default function About() {
  return (
    <section id="about" className="relative overflow-hidden py-24 md:py-40">
      <div className="grid grid-cols-1 gap-10 px-6 md:grid-cols-12 md:gap-x-8 md:gap-y-0 md:px-10">
        <MaskReveal className="md:col-span-4 md:col-start-1 md:row-span-2 md:row-start-1">
          {site.aboutImage ? (
            <Image
              src={site.aboutImage}
              alt={`Founder of ${site.name}`}
              width={1080}
              height={1080}
              sizes="(min-width: 768px) 33vw, 100vw"
              // Remote URLs from the env var aren't in next.config's allow-list, so skip the optimizer for them.
              unoptimized={/^https?:\/\//.test(site.aboutImage)}
              className="aspect-[3/4] w-full object-cover object-[55%_40%]"
            />
          ) : (
            <div className="flex aspect-[3/4] w-full items-end bg-bone/[0.07] p-5">
              <p className="font-display text-lg italic text-bone/35">Founder / team photo goes here</p>
            </div>
          )}
        </MaskReveal>

        <div className="relative z-10 md:col-span-8 md:col-start-5 md:row-start-1 md:mt-[6vw]">
          <p className="font-display text-lg italic text-bone/50 md:ml-[2vw]">Woman-owned &amp; operated</p>
          <h2 className="font-display mt-2 text-[12vw] font-medium leading-[0.9] tracking-[-0.045em] md:text-[6.8vw]">
            <RevealText as="span" className="block md:ml-[2vw]">
              Built by a woman
            </RevealText>
            <RevealText as="span" className="block italic text-bone/70" delay={0.15}>
              for every creator.
            </RevealText>
          </h2>
        </div>

        <div className="md:col-span-5 md:col-start-8 md:row-start-2 md:mt-14 md:self-end">
          <p className="text-lg text-bone/80 md:text-xl">
            Starting from zero or switching from an agency that undersold you —{" "}
            <span className="text-bone underline decoration-blush decoration-2 underline-offset-[6px]">
              you belong here.
            </span>{" "}
            No judgment, no cookie-cutter scripts.
          </p>

          <p className="font-display mt-10 text-2xl leading-snug text-bone md:text-3xl">
            Honest and straightforward cut: 40% lower than 99% of the agencies.
          </p>

          <p className="font-display mt-8 text-xl italic leading-snug text-bone/60 md:text-2xl">
            <span className="sr-only">Who we work with: </span>
            {audiences.join(", ")}.
          </p>
        </div>
      </div>
    </section>
  );
}
