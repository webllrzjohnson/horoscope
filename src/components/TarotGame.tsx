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

type DrawCount = 1 | 3;

const SPREAD_LABELS = ["Past", "Present", "Future"] as const;

export function TarotGame() {
  const [pending, startTransition] = useTransition();
  const [count, setCount] = useState<DrawCount>(1);
  const [question, setQuestion] = useState("");
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

  const busy = pending || phase === "drawing";

  return (
    <div className="toy-game tarot-game">
      <h2>Tarot — archetype draw</h2>
      <p className="muted">
        Major Arcana, illustrated in-house. Ask a question, draw one card for the
        main theme or three for a past / present / future spread.
      </p>

      <label className="field field-wide tarot-question">
        <span>Your question</span>
        <input
          type="text"
          maxLength={160}
          placeholder="What am I refusing to admit?"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
        />
      </label>

      <div className="toy-options" role="group" aria-label="Draw count">
        <p className="toy-label">Spread</p>
        <div className="segmented">
          {([1, 3] as const).map((option) => (
            <button
              key={option}
              type="button"
              className={count === option ? "is-active" : undefined}
              aria-pressed={count === option}
              disabled={busy}
              onClick={() => {
                setCount(option);
                setCards([]);
                setPhase("idle");
              }}
            >
              {option === 1 ? "1 card" : "3 cards"}
            </button>
          ))}
        </div>
        <p className="toy-meta">
          22 Major Arcana · random upright or reversed · no velvet upsell
        </p>
      </div>

      <div className="toy-actions tarot-actions-top">
        <button
          type="button"
          className="toy-btn toy-btn-primary"
          disabled={busy}
          onClick={draw}
        >
          {busy ? "Drawing…" : count === 1 ? "Draw 1 card" : "Draw 3 cards"}
        </button>
      </div>

      <div className={`tarot-stage is-${phase}`}>
        <div className="tarot-felt" aria-hidden="true" />
        <div className={`tarot-stage-inner tarot-count-${count}`}>
          {phase === "idle"
            ? Array.from({ length: count }).map((_, index) => (
                <TarotCardView
                  key={index}
                  name="Major Arcana"
                  romanNumeral="✦"
                  orientation="upright"
                  faceDown
                  large={count === 1}
                />
              ))
            : null}

          {phase === "drawing"
            ? Array.from({ length: count }).map((_, index) => (
                <TarotCardView
                  key={index}
                  name="Drawing"
                  romanNumeral="…"
                  orientation="upright"
                  faceDown
                  large={count === 1}
                  className="is-shuffling"
                />
              ))
            : null}

          {phase === "revealed"
            ? cards.map((card) => (
                <TarotCardView
                  key={`${card.slug}:${card.orientation}`}
                  slug={card.slug}
                  name={card.name}
                  romanNumeral={card.romanNumeral}
                  orientation={card.orientation}
                  large={count === 1}
                  className="is-reveal"
                />
              ))
            : null}
        </div>
      </div>

      {error ? <p className="game-error">{error}</p> : null}

      {phase === "revealed" && cards.length > 0 ? (
        <article className="tarot-reading" aria-live="polite">
          <header className="tarot-reading-head">
            <p className="toy-label">Your reading</p>
            <h3>{count === 1 ? "The card that volunteered" : "Past / present / future"}</h3>
            {question.trim() ? (
              <p className="tarot-reading-meta">Question: {question.trim()}</p>
            ) : (
              <p className="tarot-reading-meta">No question entered. Bold. Suspicious.</p>
            )}
          </header>

          {cards.map((active, index) => (
            <section key={`${active.slug}:reading`} className="tarot-card-reading">
              <p className="toy-label">
                {count === 3 ? SPREAD_LABELS[index] : "Card"}
              </p>
              <h4>
                {active.romanNumeral}. {active.name}
              </h4>
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
              <div className="tarot-meaning-grid">
                <div>
                  <h5>Meaning</h5>
                  <p>{active.reading.general}</p>
                </div>
                <div>
                  <h5>Advice</h5>
                  <p>{active.reading.advice}</p>
                </div>
                <div>
                  <h5>Symbolism</h5>
                  <p>{active.reading.symbolism}</p>
                </div>
              </div>
            </section>
          ))}

          <p className="tarot-footnote">
            Reversed cards show blocked, internalized, or inverted archetypes. The cards are not giving orders; they are holding up a rude little mirror.
          </p>
        </article>
      ) : null}
    </div>
  );
}
