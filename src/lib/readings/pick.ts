const ATTRIBUTION_TEMPLATES = [
  (name: string) => `As interpreted by ${name}`,
  (name: string) => `Delivered by ${name}`,
  (name: string) => `From ${name}'s perspective`,
] as const;

/** Stable pick from a list using a string seed (same seed → same item). */
export function pickStable<T>(items: readonly T[], seed: string): T {
  if (items.length === 0) {
    throw new Error("Cannot pick from an empty list");
  }

  let hash = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  return items[hash % items.length]!;
}

export function formatPhilosopherAttribution(
  philosopherName: string,
  seed: string,
): string {
  const template = pickStable(ATTRIBUTION_TEMPLATES, seed);
  return template(philosopherName);
}
