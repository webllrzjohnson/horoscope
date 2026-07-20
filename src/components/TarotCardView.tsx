"use client";

type TarotCardViewProps = {
  name: string;
  romanNumeral: string;
  orientation: "upright" | "reversed";
  large?: boolean;
  faceDown?: boolean;
  className?: string;
};

export function TarotCardView({
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

  return (
    <div
      className={`tarot-card tarot-card-face ${large ? "is-large" : ""} ${orientation === "reversed" ? "is-reversed" : ""} ${className ?? ""}`}
      role="img"
      aria-label={`${name}, ${orientation}`}
    >
      <div className="tarot-card-face-inner">
        <p className="tarot-roman">{romanNumeral}</p>
        <div className="tarot-sigil-wrap" aria-hidden="true">
          <span className="tarot-sigil">✧</span>
        </div>
        <p className="tarot-card-name">{name}</p>
        <p className="tarot-orientation-badge">
          {orientation === "reversed" ? "Reversed" : "Upright"}
        </p>
      </div>
    </div>
  );
}
