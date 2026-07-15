import { beforeEach, describe, expect, it, vi } from "vitest";

const findUnique = vi.fn();
const create = vi.fn();
const transaction = vi.fn();

vi.mock("@/lib/db", () => ({
  prisma: {
    batch: {
      findUnique,
      create,
    },
    $transaction: (fn: (tx: unknown) => unknown) =>
      transaction(fn ?? (async () => undefined)),
  },
}));

describe("persistGeneratedBatch", () => {
  beforeEach(() => {
    vi.resetModules();
    findUnique.mockReset();
    create.mockReset();
    transaction.mockReset();
  });

  it("returns exists when a batch already covers the window", async () => {
    findUnique.mockResolvedValue({
      id: "batch-1",
      readings: Array.from({ length: 60 }, (_, i) => ({ id: String(i) })),
    });

    const { persistGeneratedBatch } = await import("@/lib/readings/persist");
    const result = await persistGeneratedBatch(
      {
        windowStart: new Date("2026-07-15T18:00:00.000Z"),
        windowEnd: new Date("2026-07-15T20:00:00.000Z"),
      },
      {
        readings: [],
        providerMeta: {
          primary: "anthropic",
          fallbackUsed: false,
          providersSeen: ["anthropic"],
        },
      },
    );

    expect(result).toEqual({
      status: "exists",
      batchId: "batch-1",
      readingCount: 60,
    });
    expect(transaction).not.toHaveBeenCalled();
  });

  it("creates a batch with readings when the window is new", async () => {
    findUnique.mockResolvedValue(null);
    transaction.mockImplementation(async (fn: (tx: unknown) => unknown) => {
      const tx = {
        batch: {
          create: create.mockResolvedValue({
            id: "batch-2",
            readings: [{ id: "r1" }],
          }),
        },
      };
      return fn(tx);
    });

    const { persistGeneratedBatch } = await import("@/lib/readings/persist");
    const result = await persistGeneratedBatch(
      {
        windowStart: new Date("2026-07-15T18:00:00.000Z"),
        windowEnd: new Date("2026-07-15T20:00:00.000Z"),
      },
      {
        readings: [
          {
            sign: "leo",
            philosopher: "diogenes",
            body: "A long enough savage reading for validation purposes.",
            luckyNumber: 3,
            luckyColorName: "gold",
            luckyColorHex: "#D4AF37",
            seedPhrases: ["a"],
            provider: "anthropic",
          },
        ],
        providerMeta: {
          primary: "anthropic",
          fallbackUsed: false,
          providersSeen: ["anthropic"],
        },
      },
    );

    expect(result.status).toBe("created");
    expect(create).toHaveBeenCalled();
  });
});
