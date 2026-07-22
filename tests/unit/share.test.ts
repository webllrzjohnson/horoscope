import { describe, expect, it } from "vitest";
import { buildPhilosopherQuoteShareText } from "@/lib/share";

describe("share helpers", () => {
  it("builds a screenshot-ready philosopher quote", () => {
    expect(
      buildPhilosopherQuoteShareText({
        philosopherName: "Nietzsche",
        signName: "Cancer",
        body: "The herd will call your spine dramatic. Let them; sheep fear punctuation.",
      }),
    ).toBe(
      "Nietzsche reads Cancer\n\n“The herd will call your spine dramatic. Let them; sheep fear punctuation.”\n\nPhilosopher’s Horoscope",
    );
  });
});
