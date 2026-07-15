import { describe, expect, it } from "vitest";
import { samplePhrases } from "@/lib/phrases/sample";
import { PHRASE_BANK } from "@/lib/phrases/bank";

describe("samplePhrases", () => {
  it("returns the requested count of unique phrases", () => {
    const seeds = samplePhrases(3, () => 0.1);
    expect(seeds).toHaveLength(3);
    expect(new Set(seeds).size).toBe(3);
    for (const seed of seeds) {
      expect(PHRASE_BANK).toContain(seed);
    }
  });

  it("throws when asking for more phrases than the bank holds", () => {
    expect(() => samplePhrases(PHRASE_BANK.length + 1)).toThrow(/phrase bank/i);
  });
});
