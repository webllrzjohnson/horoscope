import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How Horoscope handles information on this site.",
};

export default function PrivacyPage() {
  return (
    <main className="page prose-page">
      <p className="brand-mark">Privacy</p>
      <h1 className="page-title">Privacy policy</h1>
      <p className="lede wide">Last updated: July 15, 2026</p>

      <section className="prose-block">
        <h2>What we collect</h2>
        <p>
          The Find your sign tool runs in your browser. Birth dates you enter
          there are not stored on our servers. Daily readings are generated on
          a schedule and stored as shared content — not as personal profiles.
        </p>
        <p>
          Standard hosting logs (IP address, user agent, request path, time)
          may be collected by our VPS / reverse proxy for security and
          reliability.
        </p>
      </section>

      <section className="prose-block">
        <h2>Cookies and accounts</h2>
        <p>
          This site does not require accounts and does not set advertising
          cookies. If a future feature needs cookies, we will update this page
          before enabling it.
        </p>
      </section>

      <section className="prose-block">
        <h2>Third parties</h2>
        <p>
          News headlines may be fetched from public RSS sources such as NASA
          and Space.com. Following those links sends you to their sites and
          their privacy policies.
        </p>
        <p>
          Reading generation uses AI providers (OpenAI and Anthropic) on the
          server. Prompts include sign, philosopher persona, and seed phrases —
          not your personal identity.
        </p>
      </section>

      <section className="prose-block">
        <h2>Contact</h2>
        <p>
          Questions about privacy can be opened as an issue on the project
          repository or sent to the site operator listed in your deployment
          notes.
        </p>
      </section>
    </main>
  );
}
