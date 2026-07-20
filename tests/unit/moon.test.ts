import { describe, expect, it } from "vitest";
import { getMoonInfo } from "@/lib/moon";
import { getSignForMonthDay } from "@/lib/signs";

describe("getMoonInfo", () => {
  it("returns a known phase shape", () => {
    const moon = getMoonInfo(new Date("2026-07-15T12:00:00.000Z"));
    expect(moon.phase.length).toBeGreaterThan(3);
    expect(moon.illumination).toBeGreaterThanOrEqual(0);
    expect(moon.illumination).toBeLessThanOrEqual(100);
    expect(moon.summary.length).toBeGreaterThan(20);
  });
});

describe("getSignForMonthDay", () => {
  it("maps July 14 to Cancer", () => {
    expect(getSignForMonthDay(7, 14).slug).toBe("cancer");
  });
});
