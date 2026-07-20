export const SITE_DESCRIPTION =
  "Daily philosopher-voiced horoscopes, zodiac guides, moon phases, astrology news, and playful divination games.";

export function getSiteUrl(
  configuredUrl: string | undefined = process.env.NEXT_PUBLIC_SITE_URL,
): string {
  return (configuredUrl || "http://localhost:3000").replace(/\/$/, "");
}

export function buildWebsiteJsonLd(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Horoscope",
    url: siteUrl,
    description: SITE_DESCRIPTION,
    inLanguage: "en-US",
    publisher: {
      "@type": "Organization",
      name: "Horoscope",
      url: siteUrl,
    },
  } as const;
}
