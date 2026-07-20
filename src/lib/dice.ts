export type DieFace = 1 | 2 | 3 | 4 | 5 | 6;

export function rollDie(): DieFace {
  return (Math.floor(Math.random() * 6) + 1) as DieFace;
}

export function rollDice(count: 1 | 2): DieFace[] {
  return Array.from({ length: count }, () => rollDie());
}

export function diceTotal(faces: DieFace[]): number {
  return faces.reduce((sum, face) => sum + face, 0);
}
