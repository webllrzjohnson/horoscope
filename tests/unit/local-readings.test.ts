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

    expect(
      readings.some((reading) =>
        reading.body.includes("take the blame if anyone asks"),
      ),
    ).toBe(false);

    for (const sign of SIGNS) {
      const signReadings = readings.filter((reading) => reading.sign === sign.slug);
      expect(signReadings).toHaveLength(PHILOSOPHERS.length);
      expect(signReadings.every((reading) => reading.body.includes(sign.name))).toBe(
        true,
      );
    }
  });

  it("keeps each philosopher voice recognizably different", () => {
    const readings = createLocalOfflineReadings();
    const bodyFor = (philosopher: string) =>
      readings
        .filter((reading) => reading.philosopher === philosopher)
        .map((reading) => reading.body)
        .join("\n");

    expect(bodyFor("nietzsche")).toMatch(/herd|will|comfort|become/i);
    expect(bodyFor("diogenes")).toMatch(/barrel|status|luxury|street/i);
    expect(bodyFor("schopenhauer")).toMatch(/desire|suffering|optimism|will/i);
    expect(bodyFor("machiavelli")).toMatch(/power|court|strategy|appearance/i);
    expect(bodyFor("voltaire")).toMatch(/superstition|vanity|reason|absurd/i);
  });
});
