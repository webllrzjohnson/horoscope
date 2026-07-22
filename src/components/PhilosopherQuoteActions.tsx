"use client";

import { useState } from "react";
import { buildPhilosopherQuoteShareText } from "@/lib/share";

type PhilosopherQuoteActionsProps = {
  philosopherName: string;
  signName: string;
  body: string;
  anchorId: string;
};

export function PhilosopherQuoteActions({
  philosopherName,
  signName,
  body,
  anchorId,
}: PhilosopherQuoteActionsProps) {
  const [copied, setCopied] = useState(false);
  const text = buildPhilosopherQuoteShareText({ philosopherName, signName, body });

  function getUrl() {
    if (typeof window === "undefined") return "";
    return `${window.location.origin}${window.location.pathname}#${anchorId}`;
  }

  async function copyQuote() {
    try {
      const url = getUrl();
      await navigator.clipboard.writeText(url ? `${text}\n${url}` : text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  async function shareQuote() {
    const url = getUrl();
    const payload = {
      title: `${philosopherName} reads ${signName}`,
      text,
      url,
    };

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(payload);
        return;
      } catch {
        // Fall back to copy when native share is cancelled or unavailable.
      }
    }

    await copyQuote();
  }

  return (
    <div className="quote-actions" aria-label={`${philosopherName} sharing actions`}>
      <button type="button" className="share-button secondary" onClick={copyQuote}>
        {copied ? "Quote copied" : "Copy quote"}
      </button>
      <button type="button" className="share-button" onClick={shareQuote}>
        Share roast
      </button>
    </div>
  );
}
