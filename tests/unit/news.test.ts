import { describe, expect, it } from "vitest";
import { getSkyDeskAside, isSkyDeskRelevantHeadline } from "@/lib/news";

describe("Sky Desk news helpers", () => {
  it("keeps astronomy and skywatch headlines but drops broad sci-fi entertainment", () => {
    expect(isSkyDeskRelevantHeadline("NASA spots a new comet before dawn")).toBe(true);
    expect(isSkyDeskRelevantHeadline("July full moon rises over Toronto tonight")).toBe(true);
    expect(isSkyDeskRelevantHeadline("Aliens sequel turns 40 with a collector Blu-ray")).toBe(false);
  });

  it("adds a small on-brand philosopher aside", () => {
    expect(getSkyDeskAside("astronomy")).toMatch(/Voltaire|Diogenes|sky|cosmic/i);
  });
});
