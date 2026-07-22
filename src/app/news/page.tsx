import type { Metadata } from "next";
import Link from "next/link";
import { getNewsFeed, getSkyDeskAside } from "@/lib/news";

export const metadata: Metadata = {
  title: "Sky Desk",
  description: "Astronomy headlines, astrology explainers, and philosophical contempt for cosmic panic.",
};

export const dynamic = "force-dynamic";

export default async function NewsPage() {
  const { items, liveCount } = await getNewsFeed();

  return (
    <main className="page prose-page">
      <p className="brand-mark">Sky Desk</p>
      <h1 className="page-title">Cosmic news, lightly insulted</h1>
      <p className="lede wide">
        Astronomy headlines, astrology explainers, and occasional philosophical
        contempt for cosmic panic. External stories open on their publishers&apos; sites.
      </p>
      <p className="muted">
        {liveCount > 0
          ? `${liveCount} live headlines loaded from public feeds.`
          : "Live feeds unavailable right now — showing desk explainers."}
      </p>

      <div className="news-list">
        {items.map((item) => (
          <article key={item.id} className="news-item">
            <p className="eyebrow">
              {item.category} · {item.source} · {item.publishedAt}
            </p>
            <h2>
              {item.external ? (
                <a href={item.href} target="_blank" rel="noopener noreferrer">
                  {item.title}
                </a>
              ) : (
                <Link href={item.href}>{item.title}</Link>
              )}
            </h2>
            <p>{item.summary}</p>
            <p className="news-aside">{getSkyDeskAside(item.category)}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
