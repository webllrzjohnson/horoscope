export function buildReadingPreviewExcerpt(body: string, signName: string): string {
  const withoutPrefix = body.replace(new RegExp(`^${signName}:\\s*`, "i"), "").trim();
  const sentences = withoutPrefix.match(/[^.!?]+[.!?]+/g) ?? [withoutPrefix];
  return sentences.slice(0, 2).join(" ").replace(/\s+/g, " ").trim();
}
