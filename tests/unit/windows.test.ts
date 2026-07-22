import { describe, expect, it } from "vitest";
import { formatFreshnessLabel, getWindowForInstant } from "@/lib/windows";

describe("getWindowForInstant", () => {
  it("aligns to 2-hour slots in America/New_York", () => {
    // 2026-07-15 15:37 EDT = 19:37 UTC
    const instant = new Date("2026-07-15T19:37:00.000Z");
    const window = getWindowForInstant(instant, "America/New_York");

    expect(window.windowStart.toISOString()).toBe("2026-07-15T18:00:00.000Z");
    expect(window.windowEnd.toISOString()).toBe("2026-07-15T20:00:00.000Z");
  });

  it("starts a new window on an even hour boundary", () => {
    const instant = new Date("2026-07-15T18:00:00.000Z");
    const window = getWindowForInstant(instant, "America/New_York");

    expect(window.windowStart.toISOString()).toBe("2026-07-15T18:00:00.000Z");
    expect(window.windowEnd.toISOString()).toBe("2026-07-15T20:00:00.000Z");
  });
});

describe("formatFreshnessLabel", () => {
  it("summarizes the current batch and next refresh in the configured timezone", () => {
    const label = formatFreshnessLabel(
      new Date("2026-07-15T18:00:00.000Z"),
      new Date("2026-07-15T20:00:00.000Z"),
      "America/New_York",
    );

    expect(label).toBe("Current batch · Jul 15, 2:00 PM–4:00 PM ET · Next roast refreshes at 4:00 PM ET");
  });
});
