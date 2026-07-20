import { prisma } from "@/lib/db";
import type { TarotCard } from "@/generated/prisma/client";

export type TarotOrientation = "upright" | "reversed";

export type DrawnTarotCard = {
  card: TarotCard;
  orientation: TarotOrientation;
  reading: {
    keywords: string;
    general: string;
    love: string;
    career: string;
    advice: string;
    symbolism: string;
  };
};

function randomIndex(max: number): number {
  return Math.floor(Math.random() * max);
}

export function orientationFor(card: TarotCard, orientation: TarotOrientation) {
  const reversed = orientation === "reversed";
  return {
    keywords: reversed ? card.keywordsReversed : card.keywordsUpright,
    general: reversed ? card.reversedGeneral : card.uprightGeneral,
    love: reversed ? card.reversedLove : card.uprightLove,
    career: reversed ? card.reversedCareer : card.uprightCareer,
    advice: reversed ? card.reversedAdvice : card.uprightAdvice,
    symbolism: card.symbolism,
  };
}

export async function drawTarotCards(count = 1): Promise<DrawnTarotCard[]> {
  const total = await prisma.tarotCard.count();
  if (total === 0) {
    throw new Error("Tarot deck is empty. Run npm run db:seed.");
  }

  const take = Math.min(Math.max(1, count), Math.min(3, total));
  const used = new Set<number>();
  const draws: DrawnTarotCard[] = [];

  while (draws.length < take) {
    const skip = randomIndex(total);
    if (used.has(skip) && used.size < total) continue;
    used.add(skip);
    const rows = await prisma.tarotCard.findMany({ take: 1, skip });
    const card = rows[0];
    if (!card) continue;
    if (draws.some((entry) => entry.card.id === card.id)) continue;

    const orientation: TarotOrientation =
      Math.random() < 0.5 ? "upright" : "reversed";
    draws.push({
      card,
      orientation,
      reading: orientationFor(card, orientation),
    });
  }

  return draws;
}
