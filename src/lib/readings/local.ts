import { PHILOSOPHERS, type PhilosopherId } from "@/lib/philosophers";
import { SIGNS, type Sign } from "@/lib/signs";

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

const SIGN_TASKS: Record<Sign["element"], readonly string[]> = {
  fire: [
    "pick one brave act and stop trying to sell tickets to it",
    "burn the excuse, not the bridge",
    "move first, brag later, revise privately",
  ],
  earth: [
    "make the plan survive contact with an actual calendar",
    "choose the practical road before your pride builds a toll booth",
    "turn one stubborn preference into proof",
  ],
  air: [
    "close one loop before opening another debate society",
    "say the useful sentence without decorating it like a parade float",
    "let one thought become an action before it breeds cousins",
  ],
  water: [
    "feel the feeling without appointing it prime minister",
    "protect the boundary, not the melodrama around it",
    "let memory testify once, then dismiss the court",
  ],
};

const SIGN_TEMPTATIONS: Record<Sign["modality"], readonly string[]> = {
  cardinal: [
    "starting another campaign before finishing the first skirmish",
    "calling urgency a personality",
    "mistaking control for leadership",
  ],
  fixed: [
    "calling stubbornness integrity because it has better lighting",
    "defending a routine that has clearly expired",
    "guarding the throne even after the kingdom moved",
  ],
  mutable: [
    "collecting options until choice dies of neglect",
    "changing the subject and calling it adaptability",
    "turning flexibility into elegant avoidance",
  ],
};

const PHILOSOPHER_LINES: Record<PhilosopherId, readonly string[]> = {
  nietzsche: [
    "The herd will call your spine dramatic. Let them; sheep fear punctuation.",
    "Comfort is offering you a velvet leash. Chew through it before lunch.",
    "Become harder to bribe with approval. That is today's tiny mountain.",
  ],
  diogenes: [
    "A barrel, a sandwich, and fewer opinions would improve half your problems.",
    "Status is hunger wearing perfume. Sniff once, then walk away laughing.",
    "Throw one fake luxury into the street and see who salutes it.",
  ],
  schopenhauer: [
    "Desire has already prepared the invoice; your optimism merely forgot to read it.",
    "Suffering is not a plot twist. It is the house band. Tip poorly and leave early.",
    "The will wants applause again. Deny it the microphone.",
  ],
  machiavelli: [
    "Power is watching who benefits when everyone says they are being reasonable.",
    "At court, the smiling face is often just a locked door with teeth.",
    "Strategy today means letting others reveal their price before you name yours.",
  ],
  voltaire: [
    "Superstition is cheaper than reason, which explains its excellent market share.",
    "Vanity has arrived overdressed and under-informed. Offer it a chair, then none of your time.",
    "The absurd will wear a serious hat today. Laugh; it hates ventilation.",
  ],
};

function pick<T>(items: readonly T[], index: number): T {
  return items[index % items.length];
}

function sentenceFor(
  philosopherId: PhilosopherId,
  sign: Sign,
  signIndex: number,
  philosopherIndex: number,
): string {
  const trait = pick(sign.traits, philosopherIndex);
  const task = pick(SIGN_TASKS[sign.element], signIndex + philosopherIndex);
  const temptation = pick(
    SIGN_TEMPTATIONS[sign.modality],
    signIndex * 2 + philosopherIndex,
  );
  const line = pick(PHILOSOPHER_LINES[philosopherId], signIndex + philosopherIndex);

  switch (philosopherId) {
    case "nietzsche":
      return `${sign.name}: ${line} Your ${trait} streak wants applause, but the stronger move is to ${task}. Beware ${temptation}; greatness hates paperwork but loves discipline.`;
    case "diogenes":
      return `${sign.name}: ${line} Today your ${trait} side is performing for people who would clap at a shiny bucket. Drop the act, ${task}, and let the crowd keep its decorative misery.`;
    case "schopenhauer":
      return `${sign.name}: ${line} Your ${trait} impulse will call itself destiny, because appetite owns a thesaurus. Avoid ${temptation}; ${task}, then enjoy the rare silence of wanting less.`;
    case "machiavelli":
      return `${sign.name}: ${line} Your ${trait} reputation is useful, but only if you stop spending it on amateurs. Study ${temptation}, ${task}, and keep one card unshown until the room gets honest.`;
    case "voltaire":
      return `${sign.name}: ${line} Your ${trait} mood is not evidence, merely a witness with theatrical training. Mock ${temptation}, ${task}, and refuse every prophecy that cannot survive a joke.`;
  }
}

export function createLocalOfflineReadings(): LocalOfflineReading[] {
  return SIGNS.flatMap((sign, signIndex) =>
    PHILOSOPHERS.map((philosopher, philosopherIndex) => {
      const color = pick(COLORS, signIndex + philosopherIndex * 2);
      const trait = pick(sign.traits, philosopherIndex);

      return {
        sign: sign.slug,
        philosopher: philosopher.id,
        body: sentenceFor(philosopher.id, sign, signIndex, philosopherIndex),
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
