"use client";

import Image from "next/image";
import { getTarotArtPath } from "@/lib/tarot/art";

type TarotCardViewProps = {
  slug?: string;
  name: string;
  romanNumeral: string;
  orientation: "upright" | "reversed";
  large?: boolean;
  faceDown?: boolean;
  className?: string;
};

const FALLBACK_CARD_ART: Record<string, { symbol: string; scene: string }> = {
  "the-fool": { symbol: "☼", scene: "cliff" },
  "the-magician": { symbol: "∞", scene: "altar" },
  "the-high-priestess": { symbol: "☾", scene: "veil" },
  "the-empress": { symbol: "✿", scene: "garden" },
  "the-emperor": { symbol: "♜", scene: "throne" },
  "the-hierophant": { symbol: "⚿", scene: "keys" },
  "the-lovers": { symbol: "♡", scene: "twins" },
  "the-chariot": { symbol: "♞", scene: "road" },
  strength: { symbol: "♌", scene: "lion" },
  "the-hermit": { symbol: "✦", scene: "lamp" },
  "wheel-of-fortune": { symbol: "◎", scene: "wheel" },
  justice: { symbol: "⚖", scene: "scales" },
  "the-hanged-man": { symbol: "⟡", scene: "suspension" },
  death: { symbol: "♱", scene: "gate" },
  temperance: { symbol: "⚱", scene: "cups" },
  "the-devil": { symbol: "♑", scene: "chains" },
  "the-tower": { symbol: "⚡", scene: "tower" },
  "the-star": { symbol: "✶", scene: "stars" },
  "the-moon": { symbol: "☽", scene: "moon" },
  "the-sun": { symbol: "☀", scene: "sun" },
  judgement: { symbol: "✢", scene: "trumpet" },
  "the-world": { symbol: "⊕", scene: "wreath" },
};

export function TarotCardView({
  slug,
  name,
  romanNumeral,
  orientation,
  large = false,
  faceDown = false,
  className,
}: TarotCardViewProps) {
  if (faceDown) {
    return (
      <div
        className={`tarot-card tarot-card-back ${large ? "is-large" : ""} ${className ?? ""}`}
        aria-label="Face-down tarot card"
      >
        <div className="tarot-card-back-inner">
          <span className="tarot-sigil" aria-hidden="true">
            ✦
          </span>
        </div>
      </div>
    );
  }

  const imagePath = getTarotArtPath(slug);
  const fallback = slug ? FALLBACK_CARD_ART[slug] : undefined;

  return (
    <div
      className={`tarot-card tarot-card-face ${large ? "is-large" : ""} ${orientation === "reversed" ? "is-reversed" : ""} ${className ?? ""}`}
      role="img"
      aria-label={`${name}, ${orientation}`}
    >
      {imagePath ? (
        <Image
          src={imagePath}
          alt=""
          width={360}
          height={630}
          sizes={large ? "(max-width: 640px) 72vw, 264px" : "184px"}
          className="tarot-card-art"
          aria-hidden="true"
          priority={large}
        />
      ) : (
        <div className="tarot-card-face-inner tarot-card-fallback">
          <p className="tarot-roman">{romanNumeral}</p>
          <div
            className={`tarot-illustration is-${fallback?.scene ?? "oracle"}`}
            aria-hidden="true"
          >
            <span>{fallback?.symbol ?? "✧"}</span>
          </div>
          <p className="tarot-card-name">{name}</p>
          <p className="tarot-orientation-badge">
            {orientation === "reversed" ? "Reversed" : "Upright"}
          </p>
        </div>
      )}
    </div>
  );
}
