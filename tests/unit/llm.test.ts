import { describe, expect, it, vi } from "vitest";
import { parseReadingOutput } from "@/lib/llm/schema";
import { completeWithFallback, type LlmProvider } from "@/lib/llm/types";
import { generateBatchReadings } from "@/lib/readings/generate";
import { PHILOSOPHERS } from "@/lib/philosophers";
import { SIGNS } from "@/lib/signs";

describe("parseReadingOutput", () => {
  it("parses a clean JSON payload", () => {
    const parsed = parseReadingOutput(
      JSON.stringify({
        body: "A long enough savage reading for validation purposes.",
        luckyNumber: 13,
        luckyColorName: "oxblood",
        luckyColorHex: "#4A0000",
      }),
    );
    expect(parsed.luckyNumber).toBe(13);
  });

  it("extracts JSON from fenced prose", () => {
    const parsed = parseReadingOutput(
      'Sure.\n{"body":"A long enough savage reading for validation purposes.","luckyNumber":7,"luckyColorName":"ink","luckyColorHex":"#121212"}',
    );
    expect(parsed.luckyColorName).toBe("ink");
  });

  it("rejects invalid hex", () => {
    expect(() =>
      parseReadingOutput(
        JSON.stringify({
          body: "A long enough savage reading for validation purposes.",
          luckyNumber: 7,
          luckyColorName: "ink",
          luckyColorHex: "black",
        }),
      ),
    ).toThrow();
  });
});

describe("completeWithFallback", () => {
  it("uses the primary provider when it succeeds", async () => {
    const primary: LlmProvider = {
      name: "anthropic",
      complete: vi.fn().mockResolvedValue("ok"),
    };
    const fallback: LlmProvider = {
      name: "openai",
      complete: vi.fn(),
    };

    const result = await completeWithFallback(
      { system: "s", user: "u" },
      primary,
      fallback,
    );

    expect(result.provider).toBe("anthropic");
    expect(result.usedFallback).toBe(false);
    expect(fallback.complete).not.toHaveBeenCalled();
  });

  it("falls back when primary fails", async () => {
    const primary: LlmProvider = {
      name: "anthropic",
      complete: vi.fn().mockRejectedValue(new Error("down")),
    };
    const fallback: LlmProvider = {
      name: "openai",
      complete: vi.fn().mockResolvedValue("recovered"),
    };

    const result = await completeWithFallback(
      { system: "s", user: "u" },
      primary,
      fallback,
    );

    expect(result.text).toBe("recovered");
    expect(result.usedFallback).toBe(true);
  });
});

describe("generateBatchReadings", () => {
  it("builds 12×5 validated readings with mocked LLM", async () => {
    const primary: LlmProvider = {
      name: "anthropic",
      complete: vi.fn().mockImplementation(async () =>
        JSON.stringify({
          body: "A long enough savage reading for validation purposes.",
          luckyNumber: 42,
          luckyColorName: "void",
          luckyColorHex: "#0A0A0A",
        }),
      ),
    };
    const fallback: LlmProvider = {
      name: "openai",
      complete: vi.fn(),
    };

    const result = await generateBatchReadings({
      window: {
        windowStart: new Date("2026-07-15T18:00:00.000Z"),
        windowEnd: new Date("2026-07-15T20:00:00.000Z"),
      },
      primary,
      fallback,
      sample: () => ["seed one", "seed two", "seed three"],
    });

    expect(result.readings).toHaveLength(SIGNS.length * PHILOSOPHERS.length);
    expect(result.readings[0]?.seedPhrases).toEqual([
      "seed one",
      "seed two",
      "seed three",
    ]);
    expect(primary.complete).toHaveBeenCalledTimes(
      SIGNS.length * PHILOSOPHERS.length,
    );
  });

  it("retries once on malformed output then succeeds", async () => {
    const primary: LlmProvider = {
      name: "anthropic",
      complete: vi
        .fn()
        .mockResolvedValueOnce("not-json")
        .mockResolvedValue(
          JSON.stringify({
            body: "A long enough savage reading for validation purposes.",
            luckyNumber: 9,
            luckyColorName: "ash",
            luckyColorHex: "#666666",
          }),
        ),
    };
    const fallback: LlmProvider = {
      name: "openai",
      complete: vi.fn().mockRejectedValue(new Error("also down")),
    };

    // Force a single reading path by stubbing generate through one call pattern:
    // Use a tiny custom loop — call generateBatch would be 60 calls.
    // Instead verify parse retry via a reduced mock: first batch item path.
    // We'll call completeWithFallback+parse indirectly by generating with
    // a provider that fails once then works — but batch is 60. Scale down by
    // monkeypatching SIGNS length isn't possible. Accept that one reading
    // retry is covered if we only need malformed path once in batch:
    // first call fails parse (primary returns not-json, fallback fails),
    // second attempt primary returns good JSON.

    // Simpler: unit already covers parse; for retry in generateOne, use
    // generateBatch with mocked providers that fail only on first invocation.
    let calls = 0;
    primary.complete = vi.fn().mockImplementation(async () => {
      calls += 1;
      if (calls === 1) return "not-json";
      return JSON.stringify({
        body: "A long enough savage reading for validation purposes.",
        luckyNumber: 9,
        luckyColorName: "ash",
        luckyColorHex: "#666666",
      });
    });

    const result = await generateBatchReadings({
      window: {
        windowStart: new Date("2026-07-15T18:00:00.000Z"),
        windowEnd: new Date("2026-07-15T20:00:00.000Z"),
      },
      primary,
      fallback,
      sample: () => ["a", "b", "c"],
    });

    expect(result.readings).toHaveLength(60);
    expect(calls).toBeGreaterThan(60); // first reading needed a retry
  });
});
