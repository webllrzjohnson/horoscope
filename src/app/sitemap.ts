import { SIGNS } from "@/lib/signs";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap() {
  const staticPaths = [
    "",
    "/guide",
    "/find-sign",
    "/moon",
    "/news",
    "/games",
    "/about",
    "/privacy",
    "/disclaimer",
    "/sitemap",
  ];

  const staticEntries = staticPaths.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const signEntries = SIGNS.map((sign) => ({
    url: `${SITE_URL}/signs/${sign.slug}`,
    lastModified: new Date(),
    changeFrequency: "hourly" as const,
    priority: 0.8,
  }));

  return [...staticEntries, ...signEntries];
}
