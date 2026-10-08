import Image from "next/image";
import RevealText from "@/components/ui/RevealText";
import MaskReveal from "@/components/ui/MaskReveal";
import { proofs } from "@/lib/content";

// Plain scrolling, nothing held in place: the receipts sit one after another, stepping
// across the page, and each is unmasked once as it arrives.
const placement = [
  "md:col-span-7 md:col-start-1",
  "md:col-span-7 md:col-start-6",
  "md:col-span-7 md:col-start-3",
];

export default function Proofs() {
  return (
    <section id="proofs" className="relative py-24 md:py-40">
      <div className="grid gap-8 px-6 md:grid-cols-12 md:items-end md:gap-x-8 md:px-10">
        <div className="md:col-span-7">
          <p className="font-display text-lg italic text-bone/50">Receipts</p>
          <RevealText
            as="h2"
            className="font-display mt-2 text-5xl font-medium leading-[0.98] tracking-[-0.03em] md:text-7xl"
          >
            {"Real earnings.\nReal creators."}
          </RevealText>
        </div>
        <p className="max-w-xs text-sm text-bone/60 md:col-span-4 md:col-start-9">
          Screenshots added as our creators hit new milestones — with consent, always anonymized on
          request.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-12 px-6 md:mt-24 md:grid-cols-12 md:gap-x-8 md:gap-y-24 md:px-10">
        {proofs.map((proof, i) => (
          <MaskReveal
            key={proof.id}
            from={i % 2 ? "bottom" : "left"}
            className={placement[i % placement.length]}
          >
            <div className="aspect-[3024/1964] w-full overflow-hidden bg-bone/[0.06]">
              <Image
                src={proof.src}
                alt={`Earnings statistics screenshot ${i + 1} of ${proofs.length}`}
                width={3024}
                height={1964}
                sizes="(min-width: 768px) 58vw, 100vw"
                // Remote URLs from the env vars aren't in next.config's allow-list, so skip the optimizer for them.
                unoptimized={/^https?:\/\//.test(proof.src)}
                className="h-full w-full object-cover"
              />
            </div>
          </MaskReveal>
        ))}
      </div>
    </section>
  );
}
