import { PHRASE_BANK } from "./bank";

export function samplePhrases(
  count: number,
  random: () => number = Math.random,
): string[] {
  if (count < 1) {
    throw new Error("count must be at least 1");
  }
  if (count > PHRASE_BANK.length) {
    throw new Error(
      `Requested ${count} phrases but phrase bank only has ${PHRASE_BANK.length}`,
    );
  }

  const pool = [...PHRASE_BANK];
  const picked: string[] = [];

  for (let i = 0; i < count; i += 1) {
    const index = Math.floor(random() * pool.length);
    const [phrase] = pool.splice(index, 1);
    picked.push(phrase);
  }

  return picked;
}
