import type { Metadata } from "next";
import Link from "next/link";
import { getNewsFeed } from "@/lib/news";

export const metadata: Metadata = {
  title: "News",
  description: "Astrology explainers and astronomy headlines.",
};

export const dynamic = "force-dynamic";

export default async function NewsPage() {
  const { items, liveCount } = await getNewsFeed();

  return (
    <main className="page prose-page">
      <p className="brand-mark">News</p>
      <h1 className="page-title">Astrology &amp; sky news</h1>
      <p className="lede wide">
        Live astronomy headlines plus desk explainers on signs, cycles, and
        skywatching. External stories open on their publishers&apos; sites.
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
          </article>
        ))}
      </div>
    </main>
  );
}
