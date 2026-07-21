import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Entertainment and educational disclaimer for Philosopher’s Horoscope.",
};

export default function DisclaimerPage() {
  return (
    <main className="page prose-page">
      <p className="brand-mark">Disclaimer</p>
      <h1 className="page-title">Entertainment &amp; education only</h1>
      <p className="lede wide">
        Philosopher’s Horoscope is for entertainment, reflection, and general
        astrology education. It is not a substitute for professional advice.
      </p>

      <section className="prose-block">
        <h2>No guarantees</h2>
        <p>
          Readings are AI-assisted creative text with a deliberate sarcastic
          tone. They are not verified predictions. Lucky numbers and colors are
          atmospheric details, not systems for gambling or decision-making.
        </p>
      </section>

      <section className="prose-block">
        <h2>Not professional advice</h2>
        <p>
          Do not use this site for medical, mental-health, legal, financial, or
          safety-critical decisions. If you need help in those areas, consult a
          qualified professional.
        </p>
      </section>

      <section className="prose-block">
        <h2>External content</h2>
        <p>
          Astronomy news and outbound links belong to their publishers. We do
          not control third-party accuracy or policies.
        </p>
      </section>

      <section className="prose-block">
        <h2>Astrology framing</h2>
        <p>
          We use the tropical zodiac common in Western astrology. Date ranges
          are conventional approximations; cusp dates can vary by source and
          year. For birth-chart work beyond Sun signs, a full chart with birth
          time and place is required — that is{" "}
          <Link href="/about">out of scope for this site&apos;s v1 tools</Link>.
        </p>
      </section>
    </main>
  );
}
