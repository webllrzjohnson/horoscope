import Link from "next/link";
import { notFound } from "next/navigation";
import { ShareButton } from "@/components/ShareButton";
import { getPhilosopher, PHILOSOPHERS } from "@/lib/philosophers";
import {
  formatPhilosopherAttribution,
  pickStable,
} from "@/lib/readings/pick";
import { getSignReadings } from "@/lib/readings/query";
import { formatSignDates, getSign, isSignSlug, SIGNS } from "@/lib/signs";
import { formatWindowLabel } from "@/lib/windows";

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
  const ordered = PHILOSOPHERS.map((philosopher) =>
    readings.find((reading) => reading.philosopher === philosopher.id),
  ).filter((reading): reading is NonNullable<typeof reading> => Boolean(reading));

  const seed = `${batch?.id ?? "none"}:${sign.slug}`;
  const reading = ordered.length > 0 ? pickStable(ordered, seed) : null;
  const philosopher = reading ? getPhilosopher(reading.philosopher) : null;
  const attribution =
    philosopher && reading
      ? formatPhilosopherAttribution(philosopher.name, `${seed}:attr`)
      : null;

  const signIndex = SIGNS.findIndex((entry) => entry.slug === sign.slug);
  const prev = SIGNS[(signIndex - 1 + SIGNS.length) % SIGNS.length];
  const next = SIGNS[(signIndex + 1) % SIGNS.length];

  return (
    <main className="page sign-page">
      <nav className="crumb">
        <Link href="/">Horoscope</Link>
        <span aria-hidden="true">/</span>
        <span>{sign.name}</span>
      </nav>

      <header className="sign-header">
        <div className="sign-header-copy">
          <p className="brand-mark">Horoscope</p>
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
              Window ·{" "}
              {formatWindowLabel(batch.windowStart, batch.windowEnd, timeZone)}
            </p>
          ) : (
            <p className="window">No batch available yet.</p>
          )}
          <ShareButton title={`${sign.name} horoscope`} />
        </div>
      </header>

      {!reading || !attribution ? (
        <p className="empty">
          Readings will appear here after the next generate run.
        </p>
      ) : (
        <article className="reading featured-reading">
          <p className="attribution">{attribution}</p>
          <p className="body">{reading.body}</p>
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
