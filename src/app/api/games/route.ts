import { NextResponse } from "next/server";
import { z } from "zod";
import {
  drawCrystalBall,
  drawIdealPartner,
  drawMagicEight,
  type PlayerGender,
} from "@/lib/games";
import { drawTarotCards } from "@/lib/tarot/draw";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const bodySchema = z.discriminatedUnion("game", [
  z.object({ game: z.literal("crystal") }),
  z.object({
    game: z.literal("partner"),
    gender: z.enum(["male", "female", "any"]),
    sign: z.string().optional(),
  }),
  z.object({
    game: z.literal("eight"),
    question: z.string().max(280).optional(),
  }),
  z.object({
    game: z.literal("tarot"),
    count: z.union([z.literal(1), z.literal(2), z.literal(3)]).default(1),
  }),
]);

export async function POST(request: Request) {
  try {
    const json: unknown = await request.json();
    const parsed = bodySchema.parse(json);

    if (parsed.game === "crystal") {
      const answer = await drawCrystalBall();
      return NextResponse.json({ ok: true, answer });
    }

    if (parsed.game === "partner") {
      const result = await drawIdealPartner(
        parsed.gender as PlayerGender,
        parsed.sign,
      );
      return NextResponse.json({
        ok: true,
        answer: result.body,
        sign: result.sign?.name ?? null,
      });
    }

    if (parsed.game === "tarot") {
      const draws = await drawTarotCards(parsed.count);
      return NextResponse.json({
        ok: true,
        count: draws.length,
        cards: draws.map(({ card, orientation, reading }) => ({
          slug: card.slug,
          name: card.name,
          number: card.number,
          romanNumeral: card.romanNumeral,
          arcana: card.arcana,
          element: card.element,
          orientation,
          reading,
        })),
      });
    }

    const answer = await drawMagicEight(parsed.question);
    return NextResponse.json({
      ok: true,
      answer,
      question: parsed.question?.trim() || null,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Bad request";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}
