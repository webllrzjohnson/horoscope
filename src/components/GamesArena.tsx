"use client";

import { useState, useTransition } from "react";
import { CardDrawGame } from "@/components/CardDrawGame";
import { DiceGame } from "@/components/DiceGame";
import { TarotGame } from "@/components/TarotGame";
import { SIGNS } from "@/lib/signs";

type GameId = "crystal" | "partner" | "eight" | "dice" | "cards" | "tarot";

async function playGame(payload: Record<string, unknown>) {
  const response = await fetch("/api/games", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = (await response.json()) as {
    ok: boolean;
    answer?: string;
    error?: string;
    question?: string | null;
  };
  if (!data.ok || !data.answer) {
    throw new Error(data.error ?? "The spirits hung up.");
  }
  return data;
}

export function GamesArena() {
  const [pending, startTransition] = useTransition();
  const [active, setActive] = useState<GameId>("crystal");
  const [answer, setAnswer] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [gender, setGender] = useState<"male" | "female" | "any">("any");
  const [sign, setSign] = useState(SIGNS[0]!.slug);
  const [question, setQuestion] = useState("");

  function run(game: Exclude<GameId, "dice" | "cards" | "tarot">) {
    setError(null);
    startTransition(async () => {
      try {
        if (game === "crystal") {
          const data = await playGame({ game: "crystal" });
          setAnswer(data.answer!);
          return;
        }
        if (game === "partner") {
          const data = await playGame({ game: "partner", gender, sign });
          setAnswer(data.answer!);
          return;
        }
        const data = await playGame({
          game: "eight",
          question: question.trim() || undefined,
        });
        setAnswer(data.answer!);
      } catch (err) {
        setAnswer(null);
        setError(err instanceof Error ? err.message : "Something broke.");
      }
    });
  }

  const showSpiritAnswer = active === "crystal" || active === "partner" || active === "eight";

  return (
    <div className="game-arena">
      <div className="game-tabs" role="tablist" aria-label="Games">
        {(
          [
            ["crystal", "Crystal ball"],
            ["partner", "Ideal partner"],
            ["eight", "Magic 8-ball"],
            ["dice", "Dice"],
            ["cards", "Cards"],
            ["tarot", "Tarot"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={active === id}
            className={active === id ? "is-active" : undefined}
            onClick={() => {
              setActive(id);
              setAnswer(null);
              setError(null);
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="game-panel" role="tabpanel">
        {active === "crystal" ? (
          <>
            <h2>What the crystal ball says</h2>
            <p className="muted">
              Peer into the fog of destiny. Receive urgent, useless intelligence
              that sounds extremely official.
            </p>
            <button
              type="button"
              className="hero-cta"
              disabled={pending}
              onClick={() => run("crystal")}
            >
              {pending ? "Consulting…" : "Gaze into the ball"}
            </button>
          </>
        ) : null}

        {active === "partner" ? (
          <>
            <h2>What your sign says about your ideal partner</h2>
            <p className="muted">
              Pick your gender and sign. Receive a wildly unrealistic match
              report with absolute confidence.
            </p>
            <div className="game-fields">
              <label className="field">
                <span>Your gender</span>
                <select
                  value={gender}
                  onChange={(event) =>
                    setGender(event.target.value as "male" | "female" | "any")
                  }
                >
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="any">Prefer not to say / other</option>
                </select>
              </label>
              <label className="field">
                <span>Your sign</span>
                <select
                  value={sign}
                  onChange={(event) => setSign(event.target.value)}
                >
                  {SIGNS.map((entry) => (
                    <option key={entry.slug} value={entry.slug}>
                      {entry.glyph} {entry.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <button
              type="button"
              className="hero-cta"
              disabled={pending}
              onClick={() => run("partner")}
            >
              {pending ? "Matchmaking…" : "Reveal my ideal partner"}
            </button>
          </>
        ) : null}

        {active === "eight" ? (
          <>
            <h2>Twisted magic 8-ball</h2>
            <p className="muted">
              Ask anything. Receive answers with less mercy and more personality
              than the classic toy.
            </p>
            <label className="field field-wide">
              <span>Your question</span>
              <input
                type="text"
                maxLength={280}
                placeholder="Will they text me back?"
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
              />
            </label>
            <button
              type="button"
              className="hero-cta"
              disabled={pending}
              onClick={() => run("eight")}
            >
              {pending ? "Shaking…" : "Shake the 8-ball"}
            </button>
          </>
        ) : null}

        {active === "dice" ? <DiceGame /> : null}
        {active === "cards" ? <CardDrawGame /> : null}
        {active === "tarot" ? <TarotGame /> : null}

        {error && showSpiritAnswer ? (
          <p className="game-error">{error}</p>
        ) : null}

        {answer && showSpiritAnswer ? (
          <blockquote className="game-answer" aria-live="polite">
            {active === "eight" && question.trim() ? (
              <p className="game-question">Q: {question.trim()}</p>
            ) : null}
            <p>{answer}</p>
          </blockquote>
        ) : null}
      </div>
    </div>
  );
}
