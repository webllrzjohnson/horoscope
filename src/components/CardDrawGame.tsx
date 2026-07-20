"use client";

import { useMemo, useState } from "react";
import { PlayingCardView } from "@/components/PlayingCardView";
import {
  createDeck,
  drawCard,
  shuffleDeck,
  type PlayingCard,
} from "@/lib/cards";

export function CardDrawGame() {
  const [includeJokers, setIncludeJokers] = useState(true);
  const [deck, setDeck] = useState<PlayingCard[]>(() =>
    shuffleDeck(createDeck(true)),
  );
  const [drawn, setDrawn] = useState<PlayingCard[]>([]);
  const [justDrawn, setJustDrawn] = useState<PlayingCard | null>(null);
  const [animKey, setAnimKey] = useState(0);
  const [dealing, setDealing] = useState(false);

  const remaining = deck.length;
  const empty = remaining === 0;

  const stackLayers = useMemo(
    () => Math.min(6, Math.max(0, remaining)),
    [remaining],
  );

  function reshuffle(withJokers = includeJokers) {
    setDeck(shuffleDeck(createDeck(withJokers)));
    setDrawn([]);
    setJustDrawn(null);
    setDealing(false);
    setAnimKey((key) => key + 1);
  }

  function onToggleJokers(next: boolean) {
    setIncludeJokers(next);
    reshuffle(next);
  }

  function onDraw() {
    if (empty || dealing) return;
    const { card, remaining: nextDeck } = drawCard(deck);
    if (!card) return;
    setDealing(true);
    setDeck(nextDeck);
    window.setTimeout(() => {
      setDrawn((prev) => [card, ...prev]);
      setJustDrawn(card);
      setAnimKey((key) => key + 1);
      setDealing(false);
    }, 220);
  }

  return (
    <div className="toy-game">
      <h2>Draw a card</h2>
      <p className="muted">
        Flip through the deck until it&apos;s gone. Shuffle when you want a
        fresh stack.
      </p>

      <div className="toy-options card-options">
        <label className="check-row">
          <input
            type="checkbox"
            checked={includeJokers}
            onChange={(event) => onToggleJokers(event.target.checked)}
          />
          Include jokers in the deck
        </label>
        <p className="toy-meta">
          {includeJokers ? "54-card deck" : "52-card deck"} · {remaining} left
        </p>
      </div>

      <div className="card-table">
        <div className="card-felt" aria-hidden="true" />
        <div className="card-stage">
          <div className="card-stack-wrap">
            <p className="toy-label">Deck</p>
            <div className={`card-stack ${empty ? "is-empty" : ""}`}>
              {Array.from({ length: stackLayers }).map((_, index) => (
                <div
                  key={index}
                  className="card-stack-layer"
                  style={{
                    transform: `translate(${index * 1.5}px, ${index * -1.5}px)`,
                    zIndex: index,
                  }}
                >
                  <PlayingCardView faceDown />
                </div>
              ))}
              {empty ? <p className="card-empty-label">Empty</p> : null}
            </div>
          </div>

          <div className="card-drawn-wrap">
            <p className="toy-label">Drawn</p>
            <div
              key={animKey}
              className={`card-drawn-slot ${dealing ? "is-dealing" : ""}`}
            >
              {justDrawn ? (
                <PlayingCardView card={justDrawn} className="is-deal-in" />
              ) : (
                <div className="playing-card playing-card-placeholder">
                  <span>Awaiting draw</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="toy-actions">
        <button
          type="button"
          className="toy-btn toy-btn-primary"
          disabled={empty || dealing}
          onClick={onDraw}
        >
          {empty ? "Deck empty" : dealing ? "Drawing…" : "Draw a card"}
        </button>
        <button
          type="button"
          className="toy-btn toy-btn-ghost"
          onClick={() => reshuffle()}
        >
          Shuffle &amp; start over
        </button>
      </div>

      {drawn.length > 0 ? (
        <div className="card-history" aria-label="Previously drawn cards">
          <p className="toy-label">History · {drawn.length}</p>
          <ul className="card-history-list">
            {drawn.map((card, index) => (
              <li key={`${card.id}-${index}`}>
                <PlayingCardView card={card} className="is-mini" />
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
