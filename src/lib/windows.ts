export type TimeWindow = {
  windowStart: Date;
  windowEnd: Date;
};

type WallParts = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
};

function getWallParts(date: Date, timeZone: string): WallParts {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });

  const parts = Object.fromEntries(
    dtf
      .formatToParts(date)
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value]),
  ) as Record<string, string>;

  return {
    year: Number(parts.year),
    month: Number(parts.month),
    day: Number(parts.day),
    hour: Number(parts.hour),
    minute: Number(parts.minute),
    second: Number(parts.second),
  };
}

/** Convert a civil datetime in `timeZone` to a UTC Date. */
function zonedLocalToUtc(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  second: number,
  timeZone: string,
): Date {
  let guess = Date.UTC(year, month - 1, day, hour, minute, second);

  for (let i = 0; i < 4; i += 1) {
    const wall = getWallParts(new Date(guess), timeZone);
    const desiredAsUtc = Date.UTC(year, month - 1, day, hour, minute, second);
    const wallAsUtc = Date.UTC(
      wall.year,
      wall.month - 1,
      wall.day,
      wall.hour,
      wall.minute,
      wall.second,
    );
    const diff = desiredAsUtc - wallAsUtc;
    guess += diff;
    if (diff === 0) break;
  }

  return new Date(guess);
}

export function getWindowForInstant(
  instant: Date,
  timeZone: string = process.env.SITE_TZ ?? "America/New_York",
): TimeWindow {
  const wall = getWallParts(instant, timeZone);
  const hourStart = wall.hour - (wall.hour % 2);

  const windowStart = zonedLocalToUtc(
    wall.year,
    wall.month,
    wall.day,
    hourStart,
    0,
    0,
    timeZone,
  );
  const windowEnd = new Date(windowStart.getTime() + 2 * 60 * 60 * 1000);

  return { windowStart, windowEnd };
}

export function formatWindowLabel(
  windowStart: Date,
  windowEnd: Date,
  timeZone: string = process.env.SITE_TZ ?? "America/New_York",
): string {
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone,
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  return `${fmt.format(windowStart)} – ${fmt.format(windowEnd)}`;
}

export function formatFreshnessLabel(
  windowStart: Date,
  windowEnd: Date,
  timeZone: string = process.env.SITE_TZ ?? "America/New_York",
): string {
  const dateFmt = new Intl.DateTimeFormat("en-US", {
    timeZone,
    month: "short",
    day: "numeric",
  });
  const timeFmt = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  });
  const normalizeZone = (value: string) => value.replace(/\bE[DS]T\b/g, "ET");
  const startTime = normalizeZone(timeFmt.format(windowStart)).replace(/\s[\w+/-]+$/, "");
  const endTime = normalizeZone(timeFmt.format(windowEnd));

  return `Current batch · ${dateFmt.format(windowStart)}, ${startTime}–${endTime} · Next roast refreshes at ${endTime}`;
}
