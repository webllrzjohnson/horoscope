import { beforeEach, describe, expect, it, vi } from "vitest";

const crystalCount = vi.fn();
const crystalFindMany = vi.fn();
const partnerCount = vi.fn();
const partnerFindMany = vi.fn();
const eightCount = vi.fn();
const eightFindMany = vi.fn();

vi.mock("@/lib/db", () => ({
  prisma: {
    crystalBallSaying: {
      count: (...args: unknown[]) => crystalCount(...args),
      findMany: (...args: unknown[]) => crystalFindMany(...args),
    },
    idealPartnerSaying: {
      count: (...args: unknown[]) => partnerCount(...args),
      findMany: (...args: unknown[]) => partnerFindMany(...args),
    },
    magicEightAnswer: {
      count: (...args: unknown[]) => eightCount(...args),
      findMany: (...args: unknown[]) => eightFindMany(...args),
    },
  },
}));

describe("detectEightCategory", () => {
  it("detects fitness questions", async () => {
    const { detectEightCategory } = await import("@/lib/games");
    expect(detectEightCategory("Should I run today?")).toBe("fitness");
    expect(detectEightCategory("gym after work?")).toBe("fitness");
  });

  it("detects romance questions", async () => {
    const { detectEightCategory } = await import("@/lib/games");
    expect(detectEightCategory("Does she like me?")).toBe("romance");
    expect(detectEightCategory("Should I text my crush?")).toBe("romance");
  });
});

describe("games draws", () => {
  beforeEach(() => {
    vi.resetModules();
    crystalCount.mockReset();
    crystalFindMany.mockReset();
    partnerCount.mockReset();
    partnerFindMany.mockReset();
    eightCount.mockReset();
    eightFindMany.mockReset();
  });

  it("returns a crystal ball saying", async () => {
    crystalCount.mockResolvedValue(2);
    crystalFindMany.mockResolvedValue([{ body: "Cosmic memo: hydrate." }]);
    const { drawCrystalBall } = await import("@/lib/games");
    await expect(drawCrystalBall()).resolves.toContain("hydrate");
  });

  it("prefixes ideal partner answers with the sign", async () => {
    partnerCount.mockResolvedValue(1);
    partnerFindMany.mockResolvedValue([
      { body: "They collect haunted spoons." },
    ]);
    const { drawIdealPartner } = await import("@/lib/games");
    const result = await drawIdealPartner("female", "leo");
    expect(result.body).toMatch(/Leo/);
    expect(result.body).toMatch(/haunted spoons/);
  });

  it("picks fitness answers for run questions", async () => {
    eightCount.mockImplementation(async (args?: { where?: { category?: string } }) => {
      if (args?.where?.category === "fitness") return 1;
      return 0;
    });
    eightFindMany.mockImplementation(async (args: { where?: { category?: string } }) => {
      if (args?.where?.category === "fitness") {
        return [{ body: "Go run. Your future knees sent a thank-you card." }];
      }
      return [];
    });
    const { drawMagicEight } = await import("@/lib/games");
    await expect(drawMagicEight("Should I run today?")).resolves.toMatch(/run/i);
  });
});
