import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "What Philosopher’s Horoscope is, who it is for, and how readings are made.",
};

export default function AboutPage() {
  return (
    <main className="page prose-page">
      <p className="brand-mark">About</p>
      <h1 className="page-title">A real astrology desk with sharper teeth</h1>
      <p className="lede wide">
        Philosopher’s Horoscope pairs classic tropical astrology tools — Sun
        signs, elements, moon phases — with daily readings written as dead
        philosophers roasting your chart. The tone is brutal, sarcastic, and
        shareable on purpose. The sky tools are meant to be useful.
      </p>

      <section className="prose-block">
        <h2>What you get</h2>
        <ul>
          <li>Daily sign readings, generated on a schedule and shared by everyone in that window</li>
          <li>A zodiac guide covering dates, elements, modalities, and ruling planets</li>
          <li>A Sun-sign finder from your birth date</li>
          <li>Current Moon phase with plain-language guidance</li>
          <li>A news desk mixing astronomy headlines with astrology explainers</li>
        </ul>
      </section>

      <section className="prose-block">
        <h2>How readings work</h2>
        <p>
          Every two hours we generate a fresh batch for all twelve signs across
          five philosopher personas. Every sign gets every voice, so you can
          decide whether Nietzsche, Diogenes, Schopenhauer, Machiavelli, or
          Voltaire wounds you most accurately. Lucky number and color ride along
          as light metadata — entertainment, not destiny math.
        </p>
      </section>

      <section className="prose-block">
        <h2>What this is not</h2>
        <p>
          We do not offer medical, legal, or financial advice. We do not claim
          predictive certainty. For the formal language, see the{" "}
          <Link href="/disclaimer">disclaimer</Link>.
        </p>
      </section>
    </main>
  );
}
