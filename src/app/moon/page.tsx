import type { Metadata } from "next";
import Link from "next/link";
import { getMoonInfo } from "@/lib/moon";

export const metadata: Metadata = {
  title: "Moon phase",
  description: "Current Moon phase with plain-language astrology notes.",
};

export const dynamic = "force-dynamic";

export default function MoonPage() {
  const moon = getMoonInfo(new Date());
  const timeZone = process.env.SITE_TZ ?? "America/New_York";
  const when = new Intl.DateTimeFormat("en-US", {
    timeZone,
    dateStyle: "full",
    timeStyle: "short",
  }).format(new Date());

  return (
    <main className="page prose-page">
      <p className="brand-mark">Skywatch</p>
      <h1 className="page-title">Moon phase</h1>
      <p className="lede wide">As of {when}</p>

      <section className="moon-hero">
        <p className="moon-phase">{moon.phase}</p>
        <p className="moon-stats">
          Illumination ~{moon.illumination}% · Age ~{moon.ageDays} days
        </p>
        <p className="moon-summary">{moon.summary}</p>
      </section>

      <section className="prose-block">
        <h2>How to use this</h2>
        <p>
          Pair the phase with your{" "}
          <Link href="/find-sign">Sun sign</Link> or today&apos;s{" "}
          <Link href="/">featured reading</Link>. Keep it simple: New Moon for
          intention, Full Moon for honesty about what is already visible.
        </p>
        <p className="muted">
          Phase is an astronomical approximation suitable for education and
          ritual timing — not observatory-grade ephemeris software.
        </p>
      </section>
    </main>
  );
}
