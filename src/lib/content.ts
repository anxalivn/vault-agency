// All values below read from environment variables first, falling back to a placeholder
// if unset. Edit the single .env.local file (see .env.example) instead of this file to
// swap in your real Calendly link, contact info, socials, images, and analytics ID.

export const DEFAULT_CALENDLY_URL = "https://calendly.com/lexyrosesnow/30min";

export const site = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "Vault Agency",
  tagline: "Chat coverage, content, and growth — handled.",
  description:
    "Woman-owned Fansly & OnlyFans management agency offering 24-hour chat coverage, video editing, FYP & wall posting, and social media growth for every creator.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.vaultagency.com",
  calendlyUrl:
    process.env.NEXT_PUBLIC_CALENDLY_URL || DEFAULT_CALENDLY_URL,
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@vaultagency.com",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "+1-000-000-0000",
  responsePromise: "We reply within 24 hours.",
  socials: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/",
    twitter: process.env.NEXT_PUBLIC_TWITTER_URL || "https://x.com/",
    tiktok: process.env.NEXT_PUBLIC_TIKTOK_URL || "https://tiktok.com/",
  },
  // Founder photo shown in the About section (public/owner/owner.jpg). Override with the env var.
  aboutImage: process.env.NEXT_PUBLIC_ABOUT_IMAGE || "/owner/owner.jpg",
  gaId: process.env.NEXT_PUBLIC_GA_ID || "",
};

// Used for LocalBusiness / ProfessionalService structured data (see src/components/seo/JsonLd.tsx).
// Leave streetAddress/postal fields blank if you operate fully remote — search engines accept
// LocalBusiness schema without a street address as long as addressLocality/Country are present.
export const business = {
  legalName: "Vault Agency LLC", // TODO: replace with your real legal business name
  address: {
    streetAddress: "", // TODO
    addressLocality: "", // TODO: e.g. "Austin"
    addressRegion: "", // TODO: e.g. "TX"
    postalCode: "", // TODO
    addressCountry: "US", // TODO
  },
  areaServed: "Worldwide",
};

export const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Proof", href: "#proofs" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
];

export const services = [
  {
    number: "01",
    title: "24/7 Chat Coverage",
    subtitle: "Fansly & OnlyFans",
    description: "Trained chatters cover your inbox 24 hours a day.",
  },
  {
    number: "02",
    title: "Video Editing",
    subtitle: "Content that sells",
    description: "Full porn editing.",
  },
  {
    number: "03",
    title: "FYP & Wall Posting",
    subtitle: "Fansly & OnlyFans",
    description: "Keep your authenticity, your brand, your account yours.",
  },
  {
    number: "04",
    title: "Social Media Growth",
    subtitle: "Instagram, X & more",
    description: "Free-platform strategy that feeds your paid ones.",
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Free strategy call",
    description: "We learn your goals — no pressure, no scripts.",
  },
  {
    step: "02",
    title: "Audit & onboarding",
    description: "We build a coverage plan tailored to you.",
  },
  {
    step: "03",
    title: "Coverage begins",
    description: "Your team goes live. You set the boundaries.",
  },
  {
    step: "04",
    title: "Grow, together",
    description: "Weekly reporting, ongoing optimization.",
  },
];

export const stats = [
  { value: 24, suffix: "h", label: "daily chat coverage" },
  { value: 100, suffix: "%", label: "woman-owned & operated" },
  { value: 24, suffix: "/7", label: "content pipeline" },
  { value: 0, suffix: "", label: "judgment, ever" },
];

// Desktop earnings screenshots, served from public/proofs. Set NEXT_PUBLIC_PROOF_IMAGE_1/2/3
// to point at different images instead.
export const proofs = [
  { id: 1, src: process.env.NEXT_PUBLIC_PROOF_IMAGE_1 || "/proofs/proof1.png" },
  { id: 2, src: process.env.NEXT_PUBLIC_PROOF_IMAGE_2 || "/proofs/proof2.png" },
  { id: 3, src: process.env.NEXT_PUBLIC_PROOF_IMAGE_3 || "/proofs/proof3.png" },
];

export const audiences = [
  "Cis & trans women",
  "Trans men",
  "Couples",
  "Non-binary creators",
  "Beginners",
  "Agency switchers",
];
