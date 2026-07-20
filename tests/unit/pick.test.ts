import { describe, expect, it } from "vitest";
import {
  formatPhilosopherAttribution,
  pickStable,
} from "@/lib/readings/pick";

describe("pickStable", () => {
  it("returns the same item for the same seed", () => {
    const items = ["a", "b", "c", "d", "e"] as const;
    expect(pickStable(items, "seed-1")).toBe(pickStable(items, "seed-1"));
  });

  it("can return different items for different seeds", () => {
    const items = ["a", "b", "c", "d", "e"] as const;
    const picks = new Set(
      ["x", "y", "z", "1", "2", "3", "4", "5"].map((seed) =>
        pickStable(items, seed),
      ),
    );
    expect(picks.size).toBeGreaterThan(1);
  });

  it("always returns a defined item even when the hash would be negative", () => {
    const items = ["a", "b", "c"] as const;
    for (let i = 0; i < 200; i += 1) {
      expect(pickStable(items, `batch-${i}:leo:attr`)).toBeDefined();
    }
  });
});

describe("formatPhilosopherAttribution", () => {
  it("includes the philosopher name in a soft attribution", () => {
    const line = formatPhilosopherAttribution("Nietzsche", "attr-seed");
    expect(line).toMatch(/Nietzsche/);
    expect(line.toLowerCase()).toMatch(/interpreted|delivered|perspective/);
  });

  it("never throws for typical batch seeds", () => {
    for (let i = 0; i < 100; i += 1) {
      expect(() =>
        formatPhilosopherAttribution("Diogenes", `cmrlilasb0000r8o1cv6hlskb:aries:attr:${i}`),
      ).not.toThrow();
    }
  });
});
