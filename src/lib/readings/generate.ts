import {
  buildReadingPrompt,
  getPhilosopher,
  PHILOSOPHERS,
  type PhilosopherId,
} from "@/lib/philosophers";
import { samplePhrases } from "@/lib/phrases";
import { SIGNS } from "@/lib/signs";
import {
  completeWithFallback,
  parseReadingOutput,
  type LlmProvider,
  type LlmProviderName,
} from "@/lib/llm";
import { formatWindowLabel, type TimeWindow } from "@/lib/windows";

export type GeneratedReading = {
  sign: string;
  philosopher: PhilosopherId;
  body: string;
  luckyNumber: number;
  luckyColorName: string;
  luckyColorHex: string;
  seedPhrases: string[];
  provider: LlmProviderName;
};

export type GenerateBatchResult = {
  readings: GeneratedReading[];
  providerMeta: {
    primary: LlmProviderName;
    fallbackUsed: boolean;
    providersSeen: LlmProviderName[];
  };
};

export type GenerateBatchOptions = {
  window: TimeWindow;
  timeZone?: string;
  seedCount?: number;
  primary: LlmProvider;
  fallback: LlmProvider;
  sample?: (count: number) => string[];
};

async function generateOneReading(input: {
  signSlug: string;
  signName: string;
  philosopherId: PhilosopherId;
  seedPhrases: string[];
  windowLabel: string;
  primary: LlmProvider;
  fallback: LlmProvider;
}): Promise<GeneratedReading> {
  const philosopher = getPhilosopher(input.philosopherId);
  const prompt = buildReadingPrompt({
    philosopher,
    signName: input.signName,
    seedPhrases: input.seedPhrases,
    windowLabel: input.windowLabel,
  });

  let lastError: unknown;
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const completion = await completeWithFallback(
        prompt,
        input.primary,
        input.fallback,
      );
      const parsed = parseReadingOutput(completion.text);
      return {
        sign: input.signSlug,
        philosopher: input.philosopherId,
        body: parsed.body,
        luckyNumber: parsed.luckyNumber,
        luckyColorName: parsed.luckyColorName,
        luckyColorHex: parsed.luckyColorHex,
        seedPhrases: input.seedPhrases,
        provider: completion.provider,
      };
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("Failed to generate reading after retry");
}

export async function generateBatchReadings(
  options: GenerateBatchOptions,
): Promise<GenerateBatchResult> {
  const seedCount = options.seedCount ?? 3;
  const timeZone = options.timeZone ?? process.env.SITE_TZ ?? "America/New_York";
  const sample = options.sample ?? samplePhrases;
  const windowLabel = formatWindowLabel(
    options.window.windowStart,
    options.window.windowEnd,
    timeZone,
  );

  const readings: GeneratedReading[] = [];
  const providersSeen = new Set<LlmProviderName>();
  let fallbackUsed = false;

  for (const sign of SIGNS) {
    for (const philosopher of PHILOSOPHERS) {
      const seedPhrases = sample(seedCount);
      const reading = await generateOneReading({
        signSlug: sign.slug,
        signName: sign.name,
        philosopherId: philosopher.id,
        seedPhrases,
        windowLabel,
        primary: options.primary,
        fallback: options.fallback,
      });
      if (reading.provider !== options.primary.name) {
        fallbackUsed = true;
      }
      providersSeen.add(reading.provider);
      readings.push(reading);
    }
  }

  if (readings.length !== SIGNS.length * PHILOSOPHERS.length) {
    throw new Error("Incomplete batch: expected all sign × philosopher readings");
  }

  return {
    readings,
    providerMeta: {
      primary: options.primary.name,
      fallbackUsed,
      providersSeen: [...providersSeen],
    },
  };
}
