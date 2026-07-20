import Link from "next/link";
import { SIGNS, getSignForDate, formatSignDates } from "@/lib/signs";
import { getCurrentBatch } from "@/lib/readings/query";
import {
  formatPhilosopherAttribution,
  pickStable,
} from "@/lib/readings/pick";
import { formatWindowLabel } from "@/lib/windows";
import { getPhilosopher, PHILOSOPHERS } from "@/lib/philosophers";
import { getMoonInfo } from "@/lib/moon";

export const dynamic = "force-dynamic";

export default async function Home() {
  const batch = await getCurrentBatch();
  const timeZone = process.env.SITE_TZ ?? "America/New_York";
  const todaySign = getSignForDate(new Date(), timeZone);
  const moon = getMoonInfo(new Date());
  const todayReadings =
    batch?.readings.filter((reading) => reading.sign === todaySign.slug) ?? [];
  const ordered = PHILOSOPHERS.map((philosopher) =>
    todayReadings.find((reading) => reading.philosopher === philosopher.id),
  ).filter((reading): reading is NonNullable<typeof reading> => Boolean(reading));

  const seed = `${batch?.id ?? "none"}:${todaySign.slug}`;
  const teaser = ordered.length > 0 ? pickStable(ordered, seed) : null;
  const philosopher = teaser ? getPhilosopher(teaser.philosopher) : null;
  const attribution =
    philosopher && teaser
      ? formatPhilosopherAttribution(philosopher.name, `${seed}:attr`)
      : null;

  const todayLabel = new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date());

  return (
    <main className="page home">
      <header className="hero">
        <div className="hero-copy">
          <p className="brand-mark">Horoscope</p>
          <p className="hero-date">{todayLabel}</p>
          <h1 className="hero-sign">{todaySign.name}</h1>
          <p className="lede">
            Brutal truths from five philosophers — plus real zodiac tools, moon
            timing, and sky news.
          </p>
          <div className="hero-actions">
            <Link className="hero-cta" href={`/signs/${todaySign.slug}`}>
              Read {todaySign.name}
            </Link>
            {batch ? (
              <p className="window quiet">
                {formatWindowLabel(batch.windowStart, batch.windowEnd, timeZone)}
              </p>
            ) : (
              <p className="window quiet">Awaiting first generate run</p>
            )}
          </div>
        </div>
        <div className="hero-glyph" aria-hidden="true">
          <span>{todaySign.glyph}</span>
        </div>
      </header>

      {teaser && attribution ? (
        <section className="teaser" aria-label={`${todaySign.name} teaser`}>
          <p className="eyebrow">{attribution}</p>
          <blockquote className="teaser-body">{teaser.body}</blockquote>
          <Link className="text-link" href={`/signs/${todaySign.slug}`}>
            Open full reading
          </Link>
        </section>
      ) : null}

      <section className="utility-row" aria-label="Useful tools">
        <Link href="/moon" className="utility-tile">
          <span className="eyebrow">Now</span>
          <strong>{moon.phase}</strong>
          <span>{moon.illumination}% lit · Moon desk</span>
        </Link>
        <Link href="/find-sign" className="utility-tile">
          <span className="eyebrow">Tool</span>
          <strong>Find your sign</strong>
          <span>Sun sign from birth date</span>
        </Link>
        <Link href="/guide" className="utility-tile">
          <span className="eyebrow">Learn</span>
          <strong>Zodiac guide</strong>
          <span>Elements, dates, planets</span>
        </Link>
        <Link href="/news" className="utility-tile">
          <span className="eyebrow">Desk</span>
          <strong>News</strong>
          <span>Astrology & astronomy</span>
        </Link>
        <Link href="/games" className="utility-tile">
          <span className="eyebrow">Play</span>
          <strong>Games</strong>
          <span>Crystal ball & 8-ball</span>
        </Link>
      </section>

      <section className="sign-grid" aria-label="Zodiac signs">
        <div className="section-head">
          <h2>All signs</h2>
          <p>Pick yours. Today belongs to {todaySign.name}.</p>
        </div>
        <ul>
          {SIGNS.map((sign) => (
            <li key={sign.slug}>
              <Link
                href={`/signs/${sign.slug}`}
                className={sign.slug === todaySign.slug ? "is-today" : undefined}
              >
                <span className="sign-glyph" aria-hidden="true">
                  {sign.glyph}
                </span>
                <span className="sign-name">{sign.name}</span>
                <span className="sign-dates">{formatSignDates(sign)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
