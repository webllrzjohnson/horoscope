import { describe, expect, it } from "vitest";
import { buildWebsiteJsonLd, getSiteUrl, SITE_DESCRIPTION, SITE_NAME } from "@/lib/seo";

describe("seo helpers", () => {
  it("normalizes the configured site URL without a trailing slash", () => {
    expect(getSiteUrl("https://example.com/")).toBe("https://example.com");
  });

  it("builds website JSON-LD for Philosopher’s Horoscope", () => {
    expect(buildWebsiteJsonLd("https://example.com")).toEqual({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      url: "https://example.com",
      description: SITE_DESCRIPTION,
      inLanguage: "en-US",
      publisher: {
        "@type": "Organization",
        name: SITE_NAME,
        url: "https://example.com",
      },
    });
  });
});
