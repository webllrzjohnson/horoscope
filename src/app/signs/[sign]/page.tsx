import Link from "next/link";
import { notFound } from "next/navigation";
import { PhilosopherQuoteActions } from "@/components/PhilosopherQuoteActions";
import { ShareButton } from "@/components/ShareButton";
import { PHILOSOPHERS } from "@/lib/philosophers";
import { formatPhilosopherAttribution } from "@/lib/readings/pick";
import { getSignReadings } from "@/lib/readings/query";
import { formatSignDates, getSign, isSignSlug, SIGNS } from "@/lib/signs";
import { formatFreshnessLabel } from "@/lib/windows";

export const dynamic = "force-dynamic";

type SignPageProps = {
  params: Promise<{ sign: string }>;
};

export default async function SignPage({ params }: SignPageProps) {
  const { sign: signSlug } = await params;
  if (!isSignSlug(signSlug)) {
    notFound();
  }

  const sign = getSign(signSlug);
  const data = await getSignReadings(signSlug);
  const timeZone = process.env.SITE_TZ ?? "America/New_York";

  if (!data) {
    notFound();
  }

  const { batch, readings } = data;
  const ordered = PHILOSOPHERS.map((philosopher) => {
    const reading = readings.find((entry) => entry.philosopher === philosopher.id);
    return reading ? { philosopher, reading } : null;
  }).filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));

  const signIndex = SIGNS.findIndex((entry) => entry.slug === sign.slug);
  const prev = SIGNS[(signIndex - 1 + SIGNS.length) % SIGNS.length];
  const next = SIGNS[(signIndex + 1) % SIGNS.length];

  return (
    <main className="page sign-page">
      <nav className="crumb">
        <Link href="/">Philosopher’s Horoscope</Link>
        <span aria-hidden="true">/</span>
        <span>{sign.name}</span>
      </nav>

      <header className="sign-header">
        <div className="sign-header-copy">
          <p className="brand-mark">Philosopher’s Horoscope</p>
          <p className="hero-date">{formatSignDates(sign)}</p>
          <h1>
            <span className="sign-title-glyph" aria-hidden="true">
              {sign.glyph}
            </span>
            {sign.name}
          </h1>
          <p className="sign-blurb">{sign.blurb}</p>
          <p className="muted">
            {sign.element} · {sign.modality} · {sign.rulingPlanet} ·{" "}
            <Link href={`/guide#${sign.slug}`}>Full guide entry</Link>
          </p>
          {batch ? (
            <p className="window">
              {formatFreshnessLabel(batch.windowStart, batch.windowEnd, timeZone)}
            </p>
          ) : (
            <p className="window">No batch available yet.</p>
          )}
          <ShareButton title={`${sign.name} horoscope`} />
        </div>
      </header>

      {ordered.length === 0 ? (
        <p className="empty">
          Readings will appear here after the next generate run.
        </p>
      ) : (
        <section className="philosopher-readings" aria-label={`${sign.name} philosopher readings`}>
          <div className="section-head compact">
            <h2>Today’s five philosopher readings</h2>
            <p>
              Same sign, five hostile witnesses. Choose the worldview that hurts most usefully.
            </p>
          </div>
          <div className="reading-stack">
            {ordered.map(({ philosopher, reading }) => {
              const attribution = formatPhilosopherAttribution(
                philosopher.name,
                `${batch?.id ?? "none"}:${sign.slug}:${philosopher.id}:attr`,
              );
              return (
                <article
                  key={reading.id}
                  id={philosopher.id}
                  className="reading featured-reading philosopher-card"
                >
                  <p className="attribution">{attribution}</p>
                  <h3>{philosopher.name} reads {sign.name}</h3>
                  <div className="quote-card-preview" aria-label={`${philosopher.name} quote card`}>
                    <span>{philosopher.name} reads {sign.name}</span>
                    <blockquote>“{reading.body}”</blockquote>
                    <small>Philosopher’s Horoscope</small>
                  </div>
                  <PhilosopherQuoteActions
                    philosopherName={philosopher.name}
                    signName={sign.name}
                    body={reading.body}
                    anchorId={philosopher.id}
                  />
                  <ul className="meta">
                    <li>
                      <span className="meta-label">Lucky number</span>
                      <span className="meta-value">{reading.luckyNumber}</span>
                    </li>
                    <li>
                      <span className="meta-label">Lucky color</span>
                      <span className="meta-value meta-color">
                        <span
                          className="swatch"
                          style={{ background: reading.luckyColorHex }}
                          aria-hidden="true"
                        />
                        {reading.luckyColorName}
                      </span>
                    </li>
                  </ul>
                </article>
              );
            })}
          </div>
        </section>
      )}

      <nav className="sign-pager" aria-label="Adjacent signs">
        <Link href={`/signs/${prev.slug}`}>
          <span>Previous</span>
          <strong>
            {prev.glyph} {prev.name}
          </strong>
        </Link>
        <Link href={`/signs/${next.slug}`}>
          <span>Next</span>
          <strong>
            {next.glyph} {next.name}
          </strong>
        </Link>
      </nav>
    </main>
  );
}
