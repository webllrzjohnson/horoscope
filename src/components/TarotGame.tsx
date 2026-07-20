"use client";

import { useState, useTransition } from "react";
import { TarotCardView } from "@/components/TarotCardView";

type TarotReadingPayload = {
  keywords: string;
  general: string;
  love: string;
  career: string;
  advice: string;
  symbolism: string;
};

type DrawnCard = {
  slug: string;
  name: string;
  number: number;
  romanNumeral: string;
  arcana: string;
  element: string | null;
  orientation: "upright" | "reversed";
  reading: TarotReadingPayload;
};

export function TarotGame() {
  const [pending, startTransition] = useTransition();
  const [count] = useState<1>(1);
  const [cards, setCards] = useState<DrawnCard[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [phase, setPhase] = useState<"idle" | "drawing" | "revealed">("idle");

  function draw() {
    setError(null);
    setPhase("drawing");
    startTransition(async () => {
      try {
        const response = await fetch("/api/games", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ game: "tarot", count }),
        });
        const data = (await response.json()) as {
          ok: boolean;
          cards?: DrawnCard[];
          error?: string;
        };
        if (!data.ok || !data.cards?.length) {
          throw new Error(data.error ?? "The deck refused.");
        }
        // Brief cover beat, then reveal
        await new Promise((resolve) => window.setTimeout(resolve, 450));
        setCards(data.cards);
        setPhase("revealed");
      } catch (err) {
        setCards([]);
        setPhase("idle");
        setError(err instanceof Error ? err.message : "Draw failed.");
      }
    });
  }

  const active = cards[0] ?? null;
  const busy = pending || phase === "drawing";

  return (
    <div className="toy-game tarot-game">
      <h2>Tarot — one-card draw</h2>
      <p className="muted">
        Major Arcana only — the classic single-card reading. Meanings follow
        traditional Rider–Waite–Smith teaching (upright and reversed).
      </p>

      <div className="toy-options" role="group" aria-label="Draw count">
        <p className="toy-label">Cards to draw</p>
        <div className="segmented">
          <button
            type="button"
            className="is-active"
            aria-pressed="true"
            disabled={busy}
          >
            1 card
          </button>
        </div>
        <p className="toy-meta">
          22 Major Arcana · random upright or reversed
        </p>
      </div>

      <div className={`tarot-stage is-${phase}`}>
        <div className="tarot-felt" aria-hidden="true" />
        <div className="tarot-stage-inner">
          {phase === "idle" ? (
            <TarotCardView
              name="Major Arcana"
              romanNumeral="✦"
              orientation="upright"
              faceDown
              large
            />
          ) : null}

          {phase === "drawing" ? (
            <TarotCardView
              name="Drawing"
              romanNumeral="…"
              orientation="upright"
              faceDown
              large
              className="is-shuffling"
            />
          ) : null}

          {phase === "revealed" && active ? (
            <TarotCardView
              name={active.name}
              romanNumeral={active.romanNumeral}
              orientation={active.orientation}
              large
              className="is-reveal"
            />
          ) : null}
        </div>
      </div>

      <div className="toy-actions">
        <button
          type="button"
          className="toy-btn toy-btn-primary"
          disabled={busy}
          onClick={draw}
        >
          {busy ? "Drawing…" : "Draw 1 card"}
        </button>
      </div>

      {error ? <p className="game-error">{error}</p> : null}

      {phase === "revealed" && active ? (
        <article className="tarot-reading" aria-live="polite">
          <header className="tarot-reading-head">
            <p className="toy-label">Your card</p>
            <h3>
              {active.romanNumeral}. {active.name}
            </h3>
            <p className="tarot-reading-meta">
              {active.orientation === "reversed" ? "Reversed" : "Upright"}
              {active.element ? ` · ${active.element}` : ""}
              {" · "}
              Major Arcana
            </p>
            <p className="tarot-keywords">
              <span className="toy-label">Keywords</span>
              {active.reading.keywords}
            </p>
          </header>

          <section className="tarot-section">
            <h4>General meaning</h4>
            <p>{active.reading.general}</p>
          </section>

          <section className="tarot-section">
            <h4>Love &amp; relationships</h4>
            <p>{active.reading.love}</p>
          </section>

          <section className="tarot-section">
            <h4>Career &amp; work</h4>
            <p>{active.reading.career}</p>
          </section>

          <section className="tarot-section">
            <h4>Advice</h4>
            <p>{active.reading.advice}</p>
          </section>

          <section className="tarot-section">
            <h4>Symbolism</h4>
            <p>{active.reading.symbolism}</p>
          </section>

          <p className="tarot-footnote">
            Single-card draws highlight the main theme of the moment. Reversed
            cards traditionally show blocked, internalized, or inverted
            expressions of the same archetype.
          </p>
        </article>
      ) : null}
    </div>
  );
}
