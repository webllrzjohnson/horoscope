import { describe, expect, it } from "vitest";
import { MAJOR_ARCANA } from "@/lib/tarot/deck-data";
import { orientationFor } from "@/lib/tarot/draw";
import type { TarotCard } from "@/generated/prisma/client";

describe("tarot deck data", () => {
  it("contains all 22 Major Arcana", () => {
    expect(MAJOR_ARCANA).toHaveLength(22);
    expect(MAJOR_ARCANA[0]?.slug).toBe("the-fool");
    expect(MAJOR_ARCANA[21]?.slug).toBe("the-world");
  });

  it("has unique slugs and sequential numbers", () => {
    const slugs = new Set(MAJOR_ARCANA.map((card) => card.slug));
    expect(slugs.size).toBe(22);
    MAJOR_ARCANA.forEach((card, index) => {
      expect(card.number).toBe(index);
      expect(card.uprightGeneral.length).toBeGreaterThan(40);
      expect(card.reversedGeneral.length).toBeGreaterThan(40);
    });
  });
});

describe("orientationFor", () => {
  const sample = {
    keywordsUpright: "a",
    keywordsReversed: "b",
    uprightGeneral: "ug",
    reversedGeneral: "rg",
    uprightLove: "ul",
    reversedLove: "rl",
    uprightCareer: "uc",
    reversedCareer: "rc",
    uprightAdvice: "ua",
    reversedAdvice: "ra",
    symbolism: "sym",
  } as TarotCard;

  it("returns upright fields", () => {
    expect(orientationFor(sample, "upright").general).toBe("ug");
  });

  it("returns reversed fields", () => {
    expect(orientationFor(sample, "reversed").general).toBe("rg");
    expect(orientationFor(sample, "reversed").keywords).toBe("b");
  });
});
