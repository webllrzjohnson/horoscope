import { describe, expect, it } from "vitest";
import { SIGNS, isSignSlug } from "@/lib/signs";
import { PHILOSOPHERS, getPhilosopher } from "@/lib/philosophers";

describe("signs", () => {
  it("exports 12 stable sign slugs", () => {
    expect(SIGNS).toHaveLength(12);
    expect(SIGNS.map((s) => s.slug)).toEqual([
      "aries",
      "taurus",
      "gemini",
      "cancer",
      "leo",
      "virgo",
      "libra",
      "scorpio",
      "sagittarius",
      "capricorn",
      "aquarius",
      "pisces",
    ]);
  });

  it("validates slugs", () => {
    expect(isSignSlug("leo")).toBe(true);
    expect(isSignSlug("not-a-sign")).toBe(false);
  });
});

describe("philosophers", () => {
  it("exports the five v1 personas", () => {
    expect(PHILOSOPHERS.map((p) => p.id)).toEqual([
      "nietzsche",
      "diogenes",
      "schopenhauer",
      "machiavelli",
      "voltaire",
    ]);
  });

  it("loads a persona with a non-empty prompt", () => {
    const p = getPhilosopher("diogenes");
    expect(p.name).toBe("Diogenes");
    expect(p.systemPrompt.length).toBeGreaterThan(40);
  });
});
