import { describe, expect, it } from "vitest";
import { buildWebsiteJsonLd, getSiteUrl } from "@/lib/seo";

describe("seo helpers", () => {
  it("normalizes the configured site URL without a trailing slash", () => {
    expect(getSiteUrl("https://example.com/")).toBe("https://example.com");
  });

  it("builds website JSON-LD for Horoscope", () => {
    expect(buildWebsiteJsonLd("https://example.com")).toEqual({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Horoscope",
      url: "https://example.com",
      description:
        "Daily philosopher-voiced horoscopes, zodiac guides, moon phases, astrology news, and playful divination games.",
      inLanguage: "en-US",
      publisher: {
        "@type": "Organization",
        name: "Horoscope",
        url: "https://example.com",
      },
    });
  });
});
