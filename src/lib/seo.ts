export const SITE_NAME = "Philosopher’s Horoscope";

export const SITE_DESCRIPTION =
  "Philosopher’s Horoscope serves brutal, funny zodiac readings from dead thinkers, plus tarot, moon phases, and practical astrology tools.";

export function getSiteUrl(
  configuredUrl: string | undefined = process.env.NEXT_PUBLIC_SITE_URL,
): string {
  return (configuredUrl || "http://localhost:3000").replace(/\/$/, "");
}

export function buildWebsiteJsonLd(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: siteUrl,
    description: SITE_DESCRIPTION,
    inLanguage: "en-US",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: siteUrl,
    },
  } as const;
}
