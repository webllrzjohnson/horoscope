const RWS_MAJOR_ARCANA_BASE = "/tarot/rws-major-arcana";

export function getTarotArtPath(slug: string | undefined): string | undefined {
  if (!slug) return undefined;
  return `${RWS_MAJOR_ARCANA_BASE}/${slug}.jpg`;
}
