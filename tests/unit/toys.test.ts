import { describe, expect, it, vi } from "vitest";
import {
  createDeck,
  drawCard,
  shuffleDeck,
} from "@/lib/cards";
import { diceTotal, rollDice, rollDie } from "@/lib/dice";

describe("dice", () => {
  it("rolls faces between 1 and 6", () => {
    for (let i = 0; i < 40; i += 1) {
      const face = rollDie();
      expect(face).toBeGreaterThanOrEqual(1);
      expect(face).toBeLessThanOrEqual(6);
    }
  });

  it("rolls the requested number of dice", () => {
    expect(rollDice(1)).toHaveLength(1);
    expect(rollDice(2)).toHaveLength(2);
  });

  it("sums faces", () => {
    expect(diceTotal([2, 5])).toBe(7);
  });
});

describe("cards", () => {
  it("builds a 52-card deck without jokers", () => {
    expect(createDeck(false)).toHaveLength(52);
  });

  it("adds two jokers when requested", () => {
    const deck = createDeck(true);
    expect(deck).toHaveLength(54);
    expect(deck.filter((card) => card.rank === "JOKER")).toHaveLength(2);
  });

  it("draws from the top and shrinks the deck", () => {
    const deck = createDeck(false);
    const { card, remaining } = drawCard(deck);
    expect(card).not.toBeNull();
    expect(remaining).toHaveLength(51);
    expect(remaining[0]?.id).not.toBe(card?.id);
  });

  it("returns null when the deck is empty", () => {
    expect(drawCard([])).toEqual({ card: null, remaining: [] });
  });

  it("shuffles without losing cards", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.2);
    const original = createDeck(false);
    const shuffled = shuffleDeck(original);
    expect(shuffled).toHaveLength(original.length);
    expect(new Set(shuffled.map((c) => c.id)).size).toBe(52);
    vi.restoreAllMocks();
  });
});
