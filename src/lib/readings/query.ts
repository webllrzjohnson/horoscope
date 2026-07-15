import { prisma } from "@/lib/db";
import { isSignSlug } from "@/lib/signs";

export async function getLatestBatch() {
  return prisma.batch.findFirst({
    orderBy: { windowStart: "desc" },
    include: { readings: true },
  });
}

export async function getCurrentBatch() {
  const now = new Date();
  const active = await prisma.batch.findFirst({
    where: {
      windowStart: { lte: now },
      windowEnd: { gt: now },
    },
    orderBy: { windowStart: "desc" },
    include: { readings: true },
  });

  if (active) return active;
  return getLatestBatch();
}

export async function getSignReadings(sign: string) {
  if (!isSignSlug(sign)) {
    return null;
  }

  const batch = await getCurrentBatch();
  if (!batch) {
    return { batch: null, readings: [] as const };
  }

  const readings = batch.readings.filter((reading) => reading.sign === sign);
  return { batch, readings };
}
