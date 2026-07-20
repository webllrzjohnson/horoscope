export type MoonPhase =
  | "New Moon"
  | "Waxing Crescent"
  | "First Quarter"
  | "Waxing Gibbous"
  | "Full Moon"
  | "Waning Gibbous"
  | "Last Quarter"
  | "Waning Crescent";

export type MoonInfo = {
  phase: MoonPhase;
  illumination: number;
  ageDays: number;
  summary: string;
};

const PHASE_SUMMARIES: Record<MoonPhase, string> = {
  "New Moon":
    "Beginnings and quiet intention-setting. Energy is inward; good for planting plans, not forcing outcomes.",
  "Waxing Crescent":
    "Early momentum. Take the first practical step on what you began at the New Moon.",
  "First Quarter":
    "A decision point. Friction shows where commitment is required — choose and adjust.",
  "Waxing Gibbous":
    "Refine and improve. Details matter; polish what is already in motion.",
  "Full Moon":
    "Culmination and clarity. What was hidden is easier to see — release or celebrate accordingly.",
  "Waning Gibbous":
    "Share insight and integrate lessons. Teach, document, or redistribute what you gained.",
  "Last Quarter":
    "Course-correct. Drop what no longer fits before the next cycle begins.",
  "Waning Crescent":
    "Rest and close loops. Leave space for the next New Moon rather than forcing new starts.",
};

/**
 * Approximate lunar age using a known new-moon reference.
 * Accurate enough for educational / entertainment moon-phase UI.
 */
export function getMoonInfo(date: Date = new Date()): MoonInfo {
  const synodicMonth = 29.53058867;
  // Known new moon: 2000-01-06 18:14 UTC
  const knownNewMoon = Date.UTC(2000, 0, 6, 18, 14);
  const daysSince =
    (date.getTime() - knownNewMoon) / (1000 * 60 * 60 * 24);
  const ageDays = ((daysSince % synodicMonth) + synodicMonth) % synodicMonth;
  const illumination =
    (1 - Math.cos((2 * Math.PI * ageDays) / synodicMonth)) / 2;

  const phase = phaseFromAge(ageDays, synodicMonth);

  return {
    phase,
    illumination: Math.round(illumination * 1000) / 10,
    ageDays: Math.round(ageDays * 10) / 10,
    summary: PHASE_SUMMARIES[phase],
  };
}

function phaseFromAge(ageDays: number, synodicMonth: number): MoonPhase {
  const t = ageDays / synodicMonth;
  if (t < 0.0625) return "New Moon";
  if (t < 0.1875) return "Waxing Crescent";
  if (t < 0.3125) return "First Quarter";
  if (t < 0.4375) return "Waxing Gibbous";
  if (t < 0.5625) return "Full Moon";
  if (t < 0.6875) return "Waning Gibbous";
  if (t < 0.8125) return "Last Quarter";
  if (t < 0.9375) return "Waning Crescent";
  return "New Moon";
}
