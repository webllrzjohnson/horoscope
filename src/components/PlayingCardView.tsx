"use client";

import type { PlayingCard } from "@/lib/cards";
import { suitGlyph } from "@/lib/cards";

type PlayingCardViewProps = {
  card?: PlayingCard | null;
  faceDown?: boolean;
  className?: string;
};

export function PlayingCardView({
  card,
  faceDown = false,
  className,
}: PlayingCardViewProps) {
  if (faceDown || !card) {
    return (
      <div
        className={`playing-card playing-card-back ${className ?? ""}`}
        aria-hidden={faceDown}
        aria-label={faceDown ? "Face-down card" : undefined}
      >
        <div className="playing-card-back-inner">
          <div className="playing-card-ornament" aria-hidden="true">
            <span />
            <span />
          </div>
        </div>
      </div>
    );
  }

  const isJoker = card.rank === "JOKER";
  const glyph = suitGlyph(card.suit);

  return (
    <div
      className={`playing-card playing-card-face is-${card.color} ${className ?? ""}`}
      role="img"
      aria-label={
        isJoker ? `${card.color} joker` : `${card.rank} of ${card.suit}`
      }
    >
      <div className="playing-card-face-inner">
        {isJoker ? (
          <>
            <span className="card-corner top">
              <em>J</em>
              <span aria-hidden="true">★</span>
            </span>
            <span className="card-center joker">
              <span aria-hidden="true">★</span>
              <strong>JOKER</strong>
            </span>
            <span className="card-corner bottom">
              <em>J</em>
              <span aria-hidden="true">★</span>
            </span>
          </>
        ) : (
          <>
            <span className="card-corner top">
              <em>{card.rank}</em>
              <span aria-hidden="true">{glyph}</span>
            </span>
            <span className="card-center" aria-hidden="true">
              {glyph}
            </span>
            <span className="card-corner bottom">
              <em>{card.rank}</em>
              <span aria-hidden="true">{glyph}</span>
            </span>
          </>
        )}
      </div>
    </div>
  );
}
