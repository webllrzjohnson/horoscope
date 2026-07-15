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
});

describe("formatPhilosopherAttribution", () => {
  it("includes the philosopher name in a soft attribution", () => {
    const line = formatPhilosopherAttribution("Nietzsche", "attr-seed");
    expect(line).toMatch(/Nietzsche/);
    expect(line.toLowerCase()).toMatch(/interpreted|delivered|perspective/);
  });
});
