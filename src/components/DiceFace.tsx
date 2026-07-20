"use client";

import { useId } from "react";
import type { DieFace } from "@/lib/dice";

const PIP_MAP: Record<DieFace, Array<[number, number]>> = {
  1: [[50, 50]],
  2: [
    [28, 28],
    [72, 72],
  ],
  3: [
    [28, 28],
    [50, 50],
    [72, 72],
  ],
  4: [
    [28, 28],
    [72, 28],
    [28, 72],
    [72, 72],
  ],
  5: [
    [28, 28],
    [72, 28],
    [50, 50],
    [28, 72],
    [72, 72],
  ],
  6: [
    [28, 28],
    [72, 28],
    [28, 50],
    [72, 50],
    [28, 72],
    [72, 72],
  ],
};

type DiceFaceProps = {
  value: DieFace;
  size?: number;
  className?: string;
  spin?: boolean;
};

export function DiceFace({
  value,
  size = 104,
  className,
  spin = false,
}: DiceFaceProps) {
  const reactId = useId().replace(/:/g, "");
  const uid = `die-${reactId}`;

  return (
    <svg
      className={`${className ?? ""} ${spin ? "is-spinning" : ""}`}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label={`Die showing ${value}`}
    >
      <defs>
        <linearGradient id={`${uid}-face`} x1="18%" y1="8%" x2="82%" y2="92%">
          <stop offset="0%" stopColor="#fff8ee" />
          <stop offset="42%" stopColor="#f0e4d2" />
          <stop offset="100%" stopColor="#d8c4a6" />
        </linearGradient>
        <linearGradient id={`${uid}-edge`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c9b18a" />
          <stop offset="100%" stopColor="#8f7854" />
        </linearGradient>
        <radialGradient id={`${uid}-pip`} cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#3a3348" />
          <stop offset="100%" stopColor="#121018" />
        </radialGradient>
        <filter id={`${uid}-soft`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="2.2" floodOpacity="0.28" />
        </filter>
      </defs>

      <rect
        x="5"
        y="5"
        width="90"
        height="90"
        rx="18"
        fill={`url(#${uid}-edge)`}
        filter={`url(#${uid}-soft)`}
      />
      <rect
        x="8"
        y="8"
        width="84"
        height="84"
        rx="15"
        fill={`url(#${uid}-face)`}
      />
      <rect
        x="12"
        y="12"
        width="76"
        height="76"
        rx="12"
        fill="none"
        stroke="rgba(255,255,255,0.45)"
        strokeWidth="1.2"
      />
      <path
        d="M22 18h56a10 10 0 0 1 8 8v8c-18-8-38-10-64-4V26a8 8 0 0 1 0-8z"
        fill="rgba(255,255,255,0.28)"
      />

      {PIP_MAP[value].map(([cx, cy], index) => (
        <g key={index}>
          <circle cx={cx + 0.8} cy={cy + 1.2} r="8.2" fill="rgba(0,0,0,0.18)" />
          <circle cx={cx} cy={cy} r="7.4" fill={`url(#${uid}-pip)`} />
          <circle
            cx={cx - 2.2}
            cy={cy - 2.4}
            r="2.1"
            fill="rgba(255,255,255,0.22)"
          />
        </g>
      ))}
    </svg>
  );
}
