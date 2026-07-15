import { prisma } from "@/lib/db";
import type { GenerateBatchResult } from "@/lib/readings/generate";
import type { TimeWindow } from "@/lib/windows";

export type PersistBatchResult =
  | { status: "created"; batchId: string; readingCount: number }
  | { status: "exists"; batchId: string; readingCount: number };

export async function findBatchByWindowStart(windowStart: Date) {
  return prisma.batch.findUnique({
    where: { windowStart },
    include: { readings: true },
  });
}

export async function persistGeneratedBatch(
  window: TimeWindow,
  generated: GenerateBatchResult,
): Promise<PersistBatchResult> {
  const existing = await findBatchByWindowStart(window.windowStart);
  if (existing) {
    return {
      status: "exists",
      batchId: existing.id,
      readingCount: existing.readings.length,
    };
  }

  const batch = await prisma.$transaction(async (tx) => {
    return tx.batch.create({
      data: {
        windowStart: window.windowStart,
        windowEnd: window.windowEnd,
        providerMeta: generated.providerMeta,
        readings: {
          create: generated.readings.map((reading) => ({
            sign: reading.sign,
            philosopher: reading.philosopher,
            body: reading.body,
            luckyNumber: reading.luckyNumber,
            luckyColorName: reading.luckyColorName,
            luckyColorHex: reading.luckyColorHex,
            seedPhrases: reading.seedPhrases,
          })),
        },
      },
      include: { readings: true },
    });
  });

  return {
    status: "created",
    batchId: batch.id,
    readingCount: batch.readings.length,
  };
}
