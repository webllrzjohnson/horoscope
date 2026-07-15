export type Sign = {
  slug: string;
  name: string;
  glyph: string;
  /** Inclusive start month/day in tropical zodiac (1-indexed month). */
  start: { month: number; day: number };
  /** Inclusive end month/day. Capricorn wraps the year. */
  end: { month: number; day: number };
};

export const SIGNS: readonly Sign[] = [
  { slug: "aries", name: "Aries", glyph: "♈", start: { month: 3, day: 21 }, end: { month: 4, day: 19 } },
  { slug: "taurus", name: "Taurus", glyph: "♉", start: { month: 4, day: 20 }, end: { month: 5, day: 20 } },
  { slug: "gemini", name: "Gemini", glyph: "♊", start: { month: 5, day: 21 }, end: { month: 6, day: 20 } },
  { slug: "cancer", name: "Cancer", glyph: "♋", start: { month: 6, day: 21 }, end: { month: 7, day: 22 } },
  { slug: "leo", name: "Leo", glyph: "♌", start: { month: 7, day: 23 }, end: { month: 8, day: 22 } },
  { slug: "virgo", name: "Virgo", glyph: "♍", start: { month: 8, day: 23 }, end: { month: 9, day: 22 } },
  { slug: "libra", name: "Libra", glyph: "♎", start: { month: 9, day: 23 }, end: { month: 10, day: 22 } },
  { slug: "scorpio", name: "Scorpio", glyph: "♏", start: { month: 10, day: 23 }, end: { month: 11, day: 21 } },
  { slug: "sagittarius", name: "Sagittarius", glyph: "♐", start: { month: 11, day: 22 }, end: { month: 12, day: 21 } },
  { slug: "capricorn", name: "Capricorn", glyph: "♑", start: { month: 12, day: 22 }, end: { month: 1, day: 19 } },
  { slug: "aquarius", name: "Aquarius", glyph: "♒", start: { month: 1, day: 20 }, end: { month: 2, day: 18 } },
  { slug: "pisces", name: "Pisces", glyph: "♓", start: { month: 2, day: 19 }, end: { month: 3, day: 20 } },
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
