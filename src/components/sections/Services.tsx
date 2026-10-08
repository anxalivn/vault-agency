import RevealText from "@/components/ui/RevealText";
import { services } from "@/lib/content";

// The service names are the layout: set huge, indented unevenly, and left to run wide.
// Hovering a row wipes a blush slab behind its name (the hero's gesture, repeated on purpose).
const indents = ["", "md:ml-[12vw]", "md:ml-[4vw]", "md:ml-[20vw]"];

export default function Services() {
  return (
    <section id="services" className="relative pb-24 pt-8 md:pb-44 md:pt-16">
      <div className="grid gap-12 px-6 md:grid-cols-12 md:gap-0 md:px-10">
        <div className="md:sticky md:top-28 md:col-span-3 md:self-start">
          <p className="font-display text-lg italic text-bone/50">What we do</p>
          <RevealText
            as="h2"
            className="font-display mt-3 max-w-[16ch] text-2xl leading-snug text-bone md:text-3xl"
          >
            {"Everything your\naccount needs to grow."}
          </RevealText>
        </div>

        <ul className="md:col-span-9 md:-mr-10">
          {services.map((service, i) => (
            <li
              key={service.title}
              className={`group grid gap-4 border-t border-white/15 py-8 md:grid-cols-9 md:gap-6 md:py-12 ${indents[i % indents.length]}`}
              data-cursor-hover
            >
              <div className="relative md:col-span-6">
                <span
                  aria-hidden="true"
                  className="absolute -inset-x-[0.06em] inset-y-[0.12em] bg-blush transition-[clip-path] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] [clip-path:inset(0_100%_0_0)] group-hover:[clip-path:inset(0_0_0_0)]"
                />
                <RevealText
                  as="h3"
                  className="font-display relative text-[13vw] font-medium leading-[0.95] tracking-[-0.04em] transition-colors duration-200 group-hover:text-ink md:text-[6vw]"
                >
                  {service.title}
                </RevealText>
              </div>

              <div className="md:col-span-3 md:self-end md:pb-2">
                <p className="font-display text-lg italic text-bone/50">{service.subtitle}</p>
                <p className="mt-2 max-w-[28ch] text-bone/75">{service.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
