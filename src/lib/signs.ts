export type Element = "fire" | "earth" | "air" | "water";
export type Modality = "cardinal" | "fixed" | "mutable";

export type Sign = {
  slug: string;
  name: string;
  glyph: string;
  element: Element;
  modality: Modality;
  rulingPlanet: string;
  traits: string[];
  blurb: string;
  /** Inclusive start month/day in tropical zodiac (1-indexed month). */
  start: { month: number; day: number };
  /** Inclusive end month/day. Capricorn wraps the year. */
  end: { month: number; day: number };
};

export const SIGNS: readonly Sign[] = [
  {
    slug: "aries",
    name: "Aries",
    glyph: "♈",
    element: "fire",
    modality: "cardinal",
    rulingPlanet: "Mars",
    traits: ["bold", "direct", "competitive"],
    blurb:
      "Aries opens the zodiac year with ignition energy. Sun in Aries often shows up as initiative, impatience with delay, and a preference for starting over finishing.",
    start: { month: 3, day: 21 },
    end: { month: 4, day: 19 },
  },
  {
    slug: "taurus",
    name: "Taurus",
    glyph: "♉",
    element: "earth",
    modality: "fixed",
    rulingPlanet: "Venus",
    traits: ["steady", "sensual", "stubborn"],
    blurb:
      "Taurus builds value through patience. This sign favors tangible security, beauty you can touch, and routines that actually hold.",
    start: { month: 4, day: 20 },
    end: { month: 5, day: 20 },
  },
  {
    slug: "gemini",
    name: "Gemini",
    glyph: "♊",
    element: "air",
    modality: "mutable",
    rulingPlanet: "Mercury",
    traits: ["curious", "witty", "restless"],
    blurb:
      "Gemini connects ideas and people. Conversation, short trips, and dual interests are classic signatures of this Mercury-ruled sign.",
    start: { month: 5, day: 21 },
    end: { month: 6, day: 20 },
  },
  {
    slug: "cancer",
    name: "Cancer",
    glyph: "♋",
    element: "water",
    modality: "cardinal",
    rulingPlanet: "Moon",
    traits: ["protective", "intuitive", "moody"],
    blurb:
      "Cancer orients around belonging. Home, family bonds, and emotional memory often shape how this sign moves through the world.",
    start: { month: 6, day: 21 },
    end: { month: 7, day: 22 },
  },
  {
    slug: "leo",
    name: "Leo",
    glyph: "♌",
    element: "fire",
    modality: "fixed",
    rulingPlanet: "Sun",
    traits: ["expressive", "loyal", "dramatic"],
    blurb:
      "Leo wants to be seen and to give generously once trust is earned. Creativity, warmth, and pride are central themes.",
    start: { month: 7, day: 23 },
    end: { month: 8, day: 22 },
  },
  {
    slug: "virgo",
    name: "Virgo",
    glyph: "♍",
    element: "earth",
    modality: "mutable",
    rulingPlanet: "Mercury",
    traits: ["precise", "helpful", "critical"],
    blurb:
      "Virgo refines whatever it touches. Skill, service, and noticing what others miss are strengths — perfectionism is the shadow.",
    start: { month: 8, day: 23 },
    end: { month: 9, day: 22 },
  },
  {
    slug: "libra",
    name: "Libra",
    glyph: "♎",
    element: "air",
    modality: "cardinal",
    rulingPlanet: "Venus",
    traits: ["diplomatic", "aesthetic", "indecisive"],
    blurb:
      "Libra seeks balance in relationships and environments. Fairness, beauty, and partnership are recurring life themes.",
    start: { month: 9, day: 23 },
    end: { month: 10, day: 22 },
  },
  {
    slug: "scorpio",
    name: "Scorpio",
    glyph: "♏",
    element: "water",
    modality: "fixed",
    rulingPlanet: "Pluto / Mars",
    traits: ["intense", "strategic", "loyal"],
    blurb:
      "Scorpio investigates what others avoid. Depth, privacy, and transformation — including endings that make room for rebirth — define the sign.",
    start: { month: 10, day: 23 },
    end: { month: 11, day: 21 },
  },
  {
    slug: "sagittarius",
    name: "Sagittarius",
    glyph: "♐",
    element: "fire",
    modality: "mutable",
    rulingPlanet: "Jupiter",
    traits: ["adventurous", "honest", "restless"],
    blurb:
      "Sagittarius expands through learning and distance. Belief systems, travel, and blunt truth-telling are hallmarks.",
    start: { month: 11, day: 22 },
    end: { month: 12, day: 21 },
  },
  {
    slug: "capricorn",
    name: "Capricorn",
    glyph: "♑",
    element: "earth",
    modality: "cardinal",
    rulingPlanet: "Saturn",
    traits: ["ambitious", "disciplined", "reserved"],
    blurb:
      "Capricorn climbs with endurance. Long-term goals, reputation, and earned authority matter more than quick wins.",
    start: { month: 12, day: 22 },
    end: { month: 1, day: 19 },
  },
  {
    slug: "aquarius",
    name: "Aquarius",
    glyph: "♒",
    element: "air",
    modality: "fixed",
    rulingPlanet: "Uranus / Saturn",
    traits: ["independent", "inventive", "detached"],
    blurb:
      "Aquarius thinks in systems and futures. Friendship, reform, and unusual angles on ordinary life sit at the center.",
    start: { month: 1, day: 20 },
    end: { month: 2, day: 18 },
  },
  {
    slug: "pisces",
    name: "Pisces",
    glyph: "♓",
    element: "water",
    modality: "mutable",
    rulingPlanet: "Neptune / Jupiter",
    traits: ["empathic", "imaginative", "porous"],
    blurb:
      "Pisces dissolves hard edges. Compassion, art, dreams, and the need for spiritual or creative refuge are common threads.",
    start: { month: 2, day: 19 },
    end: { month: 3, day: 20 },
  },
] as const;

const SLUGS = new Set(SIGNS.map((s) => s.slug));

function monthDayValue(month: number, day: number): number {
  return month * 100 + day;
}

function isDateInSign(month: number, day: number, sign: Sign): boolean {
  const value = monthDayValue(month, day);
  const start = monthDayValue(sign.start.month, sign.start.day);
  const end = monthDayValue(sign.end.month, sign.end.day);

  if (start <= end) {
    return value >= start && value <= end;
  }

  return value >= start || value <= end;
}

/** Resolve the tropical sun sign for a calendar date in the given IANA timezone. */
export function getSignForDate(
  instant: Date = new Date(),
  timeZone: string = process.env.SITE_TZ ?? "America/New_York",
): Sign {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone,
      month: "numeric",
      day: "numeric",
    })
      .formatToParts(instant)
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value]),
  ) as Record<string, string>;

  const month = Number(parts.month);
  const day = Number(parts.day);
  return getSignForMonthDay(month, day);
}

export function getSignForMonthDay(month: number, day: number): Sign {
  const sign = SIGNS.find((entry) => isDateInSign(month, day, entry));
  if (!sign) {
    throw new Error(`No sign found for ${month}/${day}`);
  }
  return sign;
}

export function isSignSlug(value: string): boolean {
  return SLUGS.has(value);
}

export function getSign(slug: string): Sign {
  const sign = SIGNS.find((s) => s.slug === slug);
  if (!sign) {
    throw new Error(`Unknown sign slug: ${slug}`);
  }
  return sign;
}

export function formatSignDates(sign: Sign): string {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${months[sign.start.month - 1]} ${sign.start.day} – ${months[sign.end.month - 1]} ${sign.end.day}`;
}

export const ELEMENT_COPY: Record<
  Element,
  { title: string; summary: string }
> = {
  fire: {
    title: "Fire",
    summary: "Initiative, heat, and visible action. Aries, Leo, Sagittarius.",
  },
  earth: {
    title: "Earth",
    summary: "Form, craft, and material reality. Taurus, Virgo, Capricorn.",
  },
  air: {
    title: "Air",
    summary: "Ideas, language, and social current. Gemini, Libra, Aquarius.",
  },
  water: {
    title: "Water",
    summary: "Feeling, memory, and undercurrent. Cancer, Scorpio, Pisces.",
  },
};
