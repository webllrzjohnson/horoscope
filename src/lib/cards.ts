export type Suit = "spades" | "hearts" | "diamonds" | "clubs";
export type Rank =
  | "A"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "J"
  | "Q"
  | "K"
  | "JOKER";

export type PlayingCard = {
  id: string;
  suit: Suit | "joker";
  rank: Rank;
  label: string;
  color: "red" | "black";
};

const SUITS: Suit[] = ["spades", "hearts", "diamonds", "clubs"];
const RANKS: Rank[] = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

const SUIT_GLYPH: Record<Suit, string> = {
  spades: "♠",
  hearts: "♥",
  diamonds: "♦",
  clubs: "♣",
};

export function suitGlyph(suit: Suit | "joker"): string {
  if (suit === "joker") return "★";
  return SUIT_GLYPH[suit];
}

export function createDeck(includeJokers: boolean): PlayingCard[] {
  const deck: PlayingCard[] = [];

  for (const suit of SUITS) {
    const color = suit === "hearts" || suit === "diamonds" ? "red" : "black";
    for (const rank of RANKS) {
      deck.push({
        id: `${rank}-${suit}`,
        suit,
        rank,
        label: `${rank}${SUIT_GLYPH[suit]}`,
        color,
      });
    }
  }

  if (includeJokers) {
    deck.push({
      id: "joker-red",
      suit: "joker",
      rank: "JOKER",
      label: "Joker",
      color: "red",
    });
    deck.push({
      id: "joker-black",
      suit: "joker",
      rank: "JOKER",
      label: "Joker",
      color: "black",
    });
  }

  return deck;
}

/** Fisher–Yates shuffle (mutates a copy). */
export function shuffleDeck(cards: PlayingCard[]): PlayingCard[] {
  const next = [...cards];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const a = next[i]!;
    next[i] = next[j]!;
    next[j] = a;
  }
  return next;
}

export function drawCard(deck: PlayingCard[]): {
  card: PlayingCard | null;
  remaining: PlayingCard[];
} {
  if (deck.length === 0) {
    return { card: null, remaining: [] };
  }
  const [card, ...remaining] = deck;
  return { card: card ?? null, remaining };
}
