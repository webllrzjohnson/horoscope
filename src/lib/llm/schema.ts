import { z } from "zod";

export const readingOutputSchema = z.object({
  body: z.string().min(20).max(2000),
  luckyNumber: z.number().int().min(1).max(99),
  luckyColorName: z.string().min(2).max(40),
  luckyColorHex: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "luckyColorHex must be #RRGGBB"),
});

export type ReadingOutput = z.infer<typeof readingOutputSchema>;

export function parseReadingOutput(raw: string): ReadingOutput {
  const trimmed = raw.trim();
  const jsonText = extractJsonObject(trimmed);
  const parsed: unknown = JSON.parse(jsonText);
  return readingOutputSchema.parse(parsed);
}

function extractJsonObject(text: string): string {
  if (text.startsWith("{")) {
    return text;
  }
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) {
    throw new Error("LLM response did not contain a JSON object");
  }
  return text.slice(start, end + 1);
}
