import { PHILOSOPHERS, type PhilosopherId } from "@/lib/philosophers";
import { SIGNS } from "@/lib/signs";

export type LocalOfflineReading = {
  sign: string;
  philosopher: PhilosopherId;
  body: string;
  luckyNumber: number;
  luckyColorName: string;
  luckyColorHex: string;
  seedPhrases: string[];
};

const COLORS = [
  ["oxblood", "#7f1d1d"],
  ["midnight blue", "#1e3a8a"],
  ["moss green", "#3f6212"],
  ["old gold", "#b45309"],
  ["violet", "#6d28d9"],
  ["iron gray", "#374151"],
  ["burnt orange", "#c2410c"],
  ["deep teal", "#0f766e"],
] as const;

const SIGN_MOVES = {
  fire: ["aim the flame", "stop mistaking motion for conquest", "let courage do one useful errand"],
  earth: ["move the stone you keep admiring", "make the plan touch the floor", "turn preference into evidence"],
  air: ["close one loop before opening another", "make the thought earn rent", "speak plainly enough to be caught"],
  water: ["feel it without building a shrine", "protect the boundary, not the mood", "let memory testify, then dismiss the court"],
} as const;

const PHILOSOPHER_LINES: Record<PhilosopherId, readonly string[]> = {
  nietzsche: [
    "comfort is campaigning for your surrender",
    "the herd will call your backbone arrogance",
    "self-pity is a throne made of wet cardboard",
  ],
  diogenes: [
    "throw one fake luxury into the street and watch your soul breathe",
    "status is just hunger wearing perfume",
    "your excuses need fewer cushions and more daylight",
  ],
  schopenhauer: [
    "desire is already writing the invoice",
    "optimism has submitted another fraudulent receipt",
    "want less applause from a machine built to disappoint you",
  ],
  machiavelli: [
    "read the room before the room reads you",
    "appear calm while rearranging the board",
    "kindness without leverage is merely decor",
  ],
  voltaire: [
    "vanity has arrived overdressed and under-informed",
    "superstition is cheaper than thought, which explains its popularity",
    "laugh first; it makes nonsense show its paperwork",
  ],
};

function pick<T>(items: readonly T[], index: number): T {
  return items[index % items.length];
}

export function createLocalOfflineReadings(): LocalOfflineReading[] {
  return SIGNS.flatMap((sign, signIndex) =>
    PHILOSOPHERS.map((philosopher, philosopherIndex) => {
      const color = pick(COLORS, signIndex + philosopherIndex * 2);
      const signMove = pick(
        SIGN_MOVES[sign.element],
        signIndex + philosopherIndex,
      );
      const philosopherLine = pick(
        PHILOSOPHER_LINES[philosopher.id],
        signIndex * 2 + philosopherIndex,
      );
      const trait = pick(sign.traits, philosopherIndex);
      const ruling = sign.rulingPlanet.split(" /")[0];

      return {
        sign: sign.slug,
        philosopher: philosopher.id,
        body: `${sign.name}, ${philosopher.name} would not flatter your ${trait} streak today: ${philosopherLine}. Your ${sign.element} work is simple — ${signMove}, then let ${ruling} take the blame if anyone asks why you suddenly developed standards.`,
        luckyNumber: ((signIndex + 3) * (philosopherIndex + 7)) % 99 || 13,
        luckyColorName: color[0],
        luckyColorHex: color[1],
        seedPhrases: [
          "local offline generation",
          sign.name,
          philosopher.name,
          sign.element,
          sign.modality,
          trait,
        ],
      };
    }),
  );
}
