"use client";

type TarotCardViewProps = {
  slug?: string;
  name: string;
  romanNumeral: string;
  orientation: "upright" | "reversed";
  large?: boolean;
  faceDown?: boolean;
  className?: string;
};

const CARD_ART: Record<string, { symbol: string; scene: string }> = {
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

  const art = slug ? CARD_ART[slug] : undefined;

  return (
    <div
      className={`tarot-card tarot-card-face ${large ? "is-large" : ""} ${orientation === "reversed" ? "is-reversed" : ""} ${className ?? ""}`}
      role="img"
      aria-label={`${name}, ${orientation}`}
    >
      <div className="tarot-card-face-inner">
        <p className="tarot-roman">{romanNumeral}</p>
        <div className={`tarot-illustration is-${art?.scene ?? "oracle"}`} aria-hidden="true">
          <span>{art?.symbol ?? "✧"}</span>
        </div>
        <p className="tarot-card-name">{name}</p>
        <p className="tarot-orientation-badge">
          {orientation === "reversed" ? "Reversed" : "Upright"}
        </p>
      </div>
    </div>
  );
}
