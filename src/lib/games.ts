import { prisma } from "@/lib/db";
import { SIGNS, type Sign } from "@/lib/signs";

export type PlayerGender = "male" | "female" | "any";

export type EightCategory =
  | "general"
  | "romance"
  | "fitness"
  | "work"
  | "money"
  | "social";

function randomIndex(max: number): number {
  return Math.floor(Math.random() * max);
}

async function pickRandomBody(
  model: {
    count: (args?: object) => Promise<number>;
    findMany: (args: object) => Promise<Array<{ body: string }>>;
  },
  where?: object,
): Promise<string | null> {
  const count = await model.count(where ? { where } : undefined);
  if (count === 0) return null;
  const skip = randomIndex(count);
  const rows = await model.findMany({
    ...(where ? { where } : {}),
    take: 1,
    skip,
  });
  return rows[0]?.body ?? null;
}

export function detectEightCategory(question: string): EightCategory {
  const q = question.toLowerCase();

  if (
    /\b(crush|love|date|dating|girlfriend|boyfriend|wife|husband|marry|married|text (him|her|them)|ex\b|relationship|kiss|flirt|soulmate|league)\b/.test(
      q,
    ) ||
    /\b(does (he|she|they) like me|will (he|she|they))\b/.test(q)
  ) {
    return "romance";
  }

  if (
    /\b(run|running|jog|gym|workout|work out|exercise|lift|cardio|marathon|yoga|walk|hike|diet|protein|miles?)\b/.test(
      q,
    )
  ) {
    return "fitness";
  }

  if (
    /\b(job|boss|work|office|meeting|email|quit|resign|promotion|salary|raise|coworker|deadline|client)\b/.test(
      q,
    )
  ) {
    return "work";
  }

  if (
    /\b(buy|spend|money|broke|rich|afford|rent|salary|purchase|shopping|amazon|price)\b/.test(
      q,
    )
  ) {
    return "money";
  }

  if (
    /\b(party|go out|hang out|friend|friends|invite|rsvp|social|dinner with|meetup)\b/.test(
      q,
    )
  ) {
    return "social";
  }

  return "general";
}

export async function drawCrystalBall(): Promise<string> {
  const body = await pickRandomBody(prisma.crystalBallSaying);
  return body ?? "The crystal ball is offline. Feed it more nonsense and try again.";
}

export async function drawIdealPartner(
  gender: PlayerGender,
  signSlug?: string,
): Promise<{ body: string; sign: Sign | null }> {
  const sign = signSlug
    ? (SIGNS.find((entry) => entry.slug === signSlug) ?? null)
    : null;

  const where =
    gender === "any"
      ? { gender: "any" }
      : { OR: [{ gender }, { gender: "any" }] };

  const body = await pickRandomBody(prisma.idealPartnerSaying, where);
  if (!body) {
    return {
      body: "The matchmaking spirits are on break. Try again after a snack.",
      sign,
    };
  }

  const prefix = sign ? `As a ${sign.name}, the chart insists: ` : "";
  return { body: `${prefix}${body}`, sign };
}

export async function drawMagicEight(question?: string): Promise<string> {
  const category = detectEightCategory(question ?? "");

  // Prefer topic-specific answers; fall back to general so dating roasts
  // never answer "Should I run today?"
  const topical = await pickRandomBody(prisma.magicEightAnswer, { category });
  if (topical) return topical;

  const general = await pickRandomBody(prisma.magicEightAnswer, {
    category: "general",
  });
  if (general) return general;

  const any = await pickRandomBody(prisma.magicEightAnswer);
  return any ?? "The 8-ball is empty. Philosophically speaking.";
}
