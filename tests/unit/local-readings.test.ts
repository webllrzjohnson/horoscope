import { describe, expect, it } from "vitest";
import { PHILOSOPHERS } from "@/lib/philosophers";
import { createLocalOfflineReadings } from "@/lib/readings/local";
import { SIGNS } from "@/lib/signs";

describe("createLocalOfflineReadings", () => {
  it("creates one distinct reading for every sign and philosopher", () => {
    const readings = createLocalOfflineReadings();

    expect(readings).toHaveLength(SIGNS.length * PHILOSOPHERS.length);
    expect(new Set(readings.map((reading) => reading.body)).size).toBe(
      readings.length,
    );

    for (const sign of SIGNS) {
      const signReadings = readings.filter((reading) => reading.sign === sign.slug);
      expect(signReadings).toHaveLength(PHILOSOPHERS.length);
      expect(signReadings.every((reading) => reading.body.includes(sign.name))).toBe(
        true,
      );
    }
  });
});
