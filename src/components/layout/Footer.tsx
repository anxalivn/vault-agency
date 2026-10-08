import { site, navLinks } from "@/lib/content";

const link =
  "rounded-sm underline decoration-transparent decoration-2 underline-offset-[6px] transition-[text-decoration-color,text-underline-offset] duration-200 hover:decoration-blush hover:underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blush focus-visible:ring-offset-2 focus-visible:ring-offset-ink";

const socials = [
  { label: "Instagram", href: site.socials.instagram },
  { label: "X", href: site.socials.twitter },
  { label: "TikTok", href: site.socials.tiktok },
];

// The logo is the footer: set full-width and cropped by the bottom of the page.
export default function Footer() {
  return (
    <footer className="relative overflow-hidden pt-16 md:pt-24">
      <div className="grid gap-10 px-6 text-sm md:grid-cols-12 md:px-10">
        <p className="font-display max-w-[22ch] text-xl italic text-bone/70 md:col-span-4">
          Woman-owned Fansly &amp; OnlyFans management.
        </p>

        <nav aria-label="Footer" className="flex flex-col gap-2 md:col-span-2 md:col-start-7">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className={link}>
              {l.label}
            </a>
          ))}
        </nav>

        <ul className="flex flex-col gap-2 md:col-span-2">
          {socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} className={link}>
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        <p className="max-w-[26ch] text-bone/60 md:col-span-2">
          18+ creators only. Content management &amp; consulting services.
        </p>
      </div>

      <div className="mt-14 overflow-hidden px-4 md:mt-20 md:px-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo/vault-logo.svg"
          alt={site.name}
          width={955}
          height={197}
          className="block h-auto w-full translate-y-[6%] select-none"
        />
      </div>
      <p className="relative z-10 -mt-[1vw] bg-ink px-6 py-4 text-xs text-bone/60 md:px-10">
        &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
      </p>
    </footer>
  );
}
