import { describe, expect, it } from "vitest";
import { getSignForDate } from "@/lib/signs";

describe("getSignForDate", () => {
  it("returns Cancer for mid-July in America/New_York", () => {
    // 2026-07-14 23:00 EDT ≈ 2026-07-15 03:00 UTC
    const sign = getSignForDate(
      new Date("2026-07-15T03:00:00.000Z"),
      "America/New_York",
    );
    expect(sign.slug).toBe("cancer");
  });

  it("handles Capricorn wrapping the new year", () => {
    const sign = getSignForDate(
      new Date("2026-01-01T17:00:00.000Z"),
      "America/New_York",
    );
    expect(sign.slug).toBe("capricorn");
  });

  it("returns Aries on the start boundary", () => {
    const sign = getSignForDate(
      new Date("2026-03-21T16:00:00.000Z"),
      "America/New_York",
    );
    expect(sign.slug).toBe("aries");
  });
});
