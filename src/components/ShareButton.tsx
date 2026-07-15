"use client";

import { useState } from "react";

type ShareButtonProps = {
  title: string;
  text?: string;
};

export function ShareButton({ title, text }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const payload = { title, text: text ?? title, url };

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(payload);
        return;
      } catch {
        // fall through to copy
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button type="button" className="share-button" onClick={handleShare}>
      {copied ? "Link copied" : "Share"}
    </button>
  );
}
