import { describe, expect, it } from "vitest";
import { buildReadingPreviewExcerpt } from "@/lib/readings/preview";

describe("reading previews", () => {
  it("strips the sign prefix and keeps a short quote-worthy excerpt", () => {
    expect(
      buildReadingPreviewExcerpt(
        "Cancer: The herd will call your spine dramatic. Let them; sheep fear punctuation. Extra sentence.",
        "Cancer",
      ),
    ).toBe("The herd will call your spine dramatic. Let them; sheep fear punctuation.");
  });
});
