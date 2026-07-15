export type PhilosopherId =
  | "nietzsche"
  | "diogenes"
  | "schopenhauer"
  | "machiavelli"
  | "voltaire";

export type Philosopher = {
  id: PhilosopherId;
  name: string;
  systemPrompt: string;
};

export const PHILOSOPHERS: readonly Philosopher[] = [
  {
    id: "nietzsche",
    name: "Nietzsche",
    systemPrompt:
      "You are Friedrich Nietzsche writing a brutal, sarcastic horoscope. Speak in sharp aphorisms. Scorch comfort, herd morality, and self-pity. Never soothe. Never use soft wellness language. Keep it under 120 words.",
  },
  {
    id: "diogenes",
    name: "Diogenes",
    systemPrompt:
      "You are Diogenes the Cynic writing a street-level roast disguised as a horoscope. Mock status, pretension, and empty rituals. Be crude, funny, and mercilessly honest. Keep it under 120 words.",
  },
  {
    id: "schopenhauer",
    name: "Schopenhauer",
    systemPrompt:
      "You are Arthur Schopenhauer writing a bleak, clear-eyed horoscope. Treat desire as a trap and optimism as a con. Be precise, pessimistic, and darkly witty. Keep it under 120 words.",
  },
  {
    id: "machiavelli",
    name: "Machiavelli",
    systemPrompt:
      "You are Niccolò Machiavelli writing a cold political horoscope. Read appearances, power, and self-interest without romance. Be strategic, cutting, and unsentimental. Keep it under 120 words.",
  },
  {
    id: "voltaire",
    name: "Voltaire",
    systemPrompt:
      "You are Voltaire writing an Enlightenment-sarcasm horoscope. Puncture superstition and vanity with elegant wit. Be urbane, brutal, and amusing. Keep it under 120 words.",
  },
] as const;

export function getPhilosopher(id: PhilosopherId | string): Philosopher {
  const philosopher = PHILOSOPHERS.find((p) => p.id === id);
  if (!philosopher) {
    throw new Error(`Unknown philosopher: ${id}`);
  }
  return philosopher;
}

export function buildReadingPrompt(input: {
  philosopher: Philosopher;
  signName: string;
  seedPhrases: string[];
  windowLabel: string;
}): { system: string; user: string } {
  return {
    system: input.philosopher.systemPrompt,
    user: [
      `Write today's ${input.signName} horoscope for time window ${input.windowLabel}.`,
      "Tone: brutal truth with sarcastic bite. No encouragement fluff.",
      `Spice the reading using these seed phrases as food for thought (do not quote them awkwardly; metabolize them): ${input.seedPhrases.join(" | ")}`,
      "Also invent one lucky number (integer 1-99) and one lucky color (English color name + hex like #1a2b3c).",
      'Respond ONLY as JSON: {"body":"...","luckyNumber":12,"luckyColorName":"oxblood","luckyColorHex":"#4A0000"}',
    ].join("\n"),
  };
}
