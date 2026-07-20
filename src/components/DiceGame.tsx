"use client";

import { useEffect, useId, useState } from "react";
import { DiceFace } from "@/components/DiceFace";
import { diceTotal, rollDice, type DieFace } from "@/lib/dice";

type Phase = "idle" | "shaking" | "revealed";

export function DiceGame() {
  const labelId = useId();
  const [count, setCount] = useState<1 | 2>(1);
  const [faces, setFaces] = useState<DieFace[]>([1]);
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    if (phase !== "shaking") return;
    const timer = window.setTimeout(() => setPhase("revealed"), 1100);
    return () => window.clearTimeout(timer);
  }, [phase]);

  function throwDice() {
    if (phase === "shaking") return;
    const next = rollDice(count);
    setFaces(next);
    setPhase("shaking");
  }

  const busy = phase === "shaking";
  const showResult = phase === "revealed";

  return (
    <div className="toy-game">
      <h2>Throw the dice</h2>
      <p className="muted">
        Cover lifts. Fate lands. One die or two — your call.
      </p>

      <div className="toy-options" role="group" aria-labelledby={labelId}>
        <p id={labelId} className="toy-label">
          Dice
        </p>
        <div className="segmented">
          {([1, 2] as const).map((value) => (
            <button
              key={value}
              type="button"
              className={count === value ? "is-active" : undefined}
              disabled={busy}
              aria-pressed={count === value}
              onClick={() => {
                setCount(value);
                setFaces(Array.from({ length: value }, () => 1 as DieFace));
                setPhase("idle");
              }}
            >
              {value} {value === 1 ? "die" : "dice"}
            </button>
          ))}
        </div>
      </div>

      <div
        className={`dice-stage is-${phase} dice-count-${count}`}
        aria-live="polite"
      >
        <div className="dice-felt" aria-hidden="true" />
        <div className="dice-tray">
          {faces.map((face, index) => (
            <DiceFace
              key={`${count}-${index}-${phase === "revealed" ? face : "hide"}`}
              value={face}
              className="dice-piece"
              spin={busy}
            />
          ))}
        </div>
        <div className="dice-cup" aria-hidden="true">
          <div className="dice-cup-shell">
            <div className="dice-cup-rim" />
            <div className="dice-cup-body" />
            <div className="dice-cup-shine" />
          </div>
        </div>
      </div>

      <button
        type="button"
        className="hero-cta"
        disabled={busy}
        onClick={throwDice}
      >
        {busy ? "Shaking…" : "Throw the dice"}
      </button>

      {showResult ? (
        <p className="toy-result" aria-live="polite">
          {count === 1
            ? `You rolled a ${faces[0]}.`
            : `You rolled ${faces.join(" + ")} = ${diceTotal(faces)}.`}
        </p>
      ) : null}
    </div>
  );
}
