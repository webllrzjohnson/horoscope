import type { Metadata } from "next";
import Link from "next/link";
import { ELEMENT_COPY, SIGNS, formatSignDates } from "@/lib/signs";

export const metadata: Metadata = {
  title: "Zodiac guide",
  description:
    "Tropical zodiac overview: dates, elements, modalities, ruling planets, and traits.",
};

export default function GuidePage() {
  return (
    <main className="page prose-page">
      <p className="brand-mark">Guide</p>
      <h1 className="page-title">Zodiac guide</h1>
      <p className="lede wide">
        A practical map of the twelve tropical Sun signs — dates, elements, and
        what each sign tends to emphasize. Use it alongside the daily readings,
        not instead of your full chart.
      </p>

      <section className="prose-block" id="elements">
        <h2>Elements</h2>
        <div className="info-grid">
          {(Object.keys(ELEMENT_COPY) as Array<keyof typeof ELEMENT_COPY>).map(
            (key) => (
              <article key={key} className="info-card">
                <h3>{ELEMENT_COPY[key].title}</h3>
                <p>{ELEMENT_COPY[key].summary}</p>
              </article>
            ),
          )}
        </div>
      </section>

      <section className="prose-block" id="mercury">
        <h2>Mercury retrograde (quick note)</h2>
        <p>
          In astrology, Mercury retrograde periods are traditionally linked to
          revision: contracts, travel plans, and messages go under review. It is
          a timing metaphor, not a law of physics. Prefer backups and rereads
          over fatalism.
        </p>
      </section>

      <section className="prose-block">
        <h2>The twelve signs</h2>
        <div className="guide-list">
          {SIGNS.map((sign) => (
            <article key={sign.slug} id={sign.slug} className="guide-item">
              <header>
                <h3>
                  <span aria-hidden="true">{sign.glyph}</span> {sign.name}
                </h3>
                <p className="muted">
                  {formatSignDates(sign)} · {sign.element} · {sign.modality} ·{" "}
                  {sign.rulingPlanet}
                </p>
              </header>
              <p>{sign.blurb}</p>
              <p className="trait-line">
                Keywords: {sign.traits.join(" · ")}
              </p>
              <Link className="text-link" href={`/signs/${sign.slug}`}>
                Today&apos;s reading
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
