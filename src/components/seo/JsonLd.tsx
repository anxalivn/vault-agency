import { site, business, services } from "@/lib/content";

// Only emit values that were really configured. Placeholder phone numbers and bare
// "https://instagram.com/" links in structured data are worse than leaving them out.
const configuredSocials = [
  process.env.NEXT_PUBLIC_INSTAGRAM_URL && site.socials.instagram,
  process.env.NEXT_PUBLIC_TWITTER_URL && site.socials.twitter,
  process.env.NEXT_PUBLIC_TIKTOK_URL && site.socials.tiktok,
].filter(Boolean);

export default function JsonLd() {
  const graph = [
    {
      "@type": "ProfessionalService",
      "@id": `${site.url}/#organization`,
      name: business.legalName,
      alternateName: site.name,
      description: site.description,
      url: site.url,
      email: site.email,
      telephone: process.env.NEXT_PUBLIC_CONTACT_PHONE || undefined,
      logo: `${site.url}/logo/vault-logo-black.svg`,
      image: `${site.url}/opengraph-image`,
      areaServed: business.areaServed,
      address: {
        "@type": "PostalAddress",
        streetAddress: business.address.streetAddress || undefined,
        addressLocality: business.address.addressLocality || undefined,
        addressRegion: business.address.addressRegion || undefined,
        postalCode: business.address.postalCode || undefined,
        addressCountry: business.address.addressCountry,
      },
      sameAs: configuredSocials.length ? configuredSocials : undefined,
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: `${site.name} services`,
        itemListElement: services.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.title, description: s.description },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      description: site.description,
      inLanguage: "en-US",
      publisher: { "@id": `${site.url}/#organization` },
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }) }}
    />
  );
}
