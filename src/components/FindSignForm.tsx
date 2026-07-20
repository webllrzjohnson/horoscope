"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { formatSignDates, getSignForMonthDay } from "@/lib/signs";

export function FindSignForm() {
  const [value, setValue] = useState("1994-07-14");

  const result = useMemo(() => {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
    if (!match) return null;
    const month = Number(match[2]);
    const day = Number(match[3]);
    if (month < 1 || month > 12 || day < 1 || day > 31) return null;
    try {
      return getSignForMonthDay(month, day);
    } catch {
      return null;
    }
  }, [value]);

  return (
    <div className="tool-panel">
      <label className="field">
        <span>Birth date</span>
        <input
          type="date"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </label>

      {result ? (
        <div className="tool-result" role="status">
          <p className="eyebrow">Your Sun sign</p>
          <p className="tool-sign">
            <span aria-hidden="true">{result.glyph}</span> {result.name}
          </p>
          <p className="muted">
            {formatSignDates(result)} · {result.element} · ruled by{" "}
            {result.rulingPlanet}
          </p>
          <p>{result.blurb}</p>
          <div className="hero-actions">
            <Link className="hero-cta" href={`/signs/${result.slug}`}>
              Today&apos;s {result.name} reading
            </Link>
            <Link className="text-link" href={`/guide#${result.slug}`}>
              Learn the sign
            </Link>
          </div>
        </div>
      ) : (
        <p className="muted">Enter a valid birth date to see your Sun sign.</p>
      )}
    </div>
  );
}
