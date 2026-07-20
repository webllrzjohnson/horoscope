import { CURATED_NEWS, type NewsItem } from "./curated";

const NASA_RSS = "https://www.nasa.gov/rss/dyn/breaking_news.rss";
const SPACE_RSS = "https://www.space.com/feeds/all";

function stripHtml(value: string): string {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function extractTag(block: string, tag: string): string {
  const cdata = block.match(
    new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`, "i"),
  );
  if (cdata?.[1]) return cdata[1].trim();

  const plain = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return plain?.[1]?.trim() ?? "";
}

function parseRssItems(
  xml: string,
  source: string,
  category: NewsItem["category"],
  limit: number,
): NewsItem[] {
  const blocks = [...xml.matchAll(/<item[\s\S]*?<\/item>/gi)].slice(0, limit);
  const items: NewsItem[] = [];

  for (const [index, match] of blocks.entries()) {
    const block = match[0];
    const title = stripHtml(extractTag(block, "title"));
    const link = stripHtml(extractTag(block, "link"));
    const description = stripHtml(
      extractTag(block, "description") || extractTag(block, "content:encoded"),
    );
    const pubDate = stripHtml(extractTag(block, "pubDate"));
    const publishedAt = pubDate
      ? new Date(pubDate).toISOString()
      : new Date().toISOString();

    if (!title || !link) continue;

    items.push({
      id: `${source}-${index}-${publishedAt}`,
      title,
      summary:
        description.slice(0, 220) + (description.length > 220 ? "…" : ""),
      href: link,
      source,
      publishedAt: publishedAt.slice(0, 10),
      category,
      external: true,
    });
  }

  return items;
}

async function fetchFeed(
  url: string,
  source: string,
  category: NewsItem["category"],
  limit: number,
): Promise<NewsItem[]> {
  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 },
      headers: { "User-Agent": "HoroscopeBot/1.0 (+local)" },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return [];
    const xml = await response.text();
    return parseRssItems(xml, source, category, limit);
  } catch {
    return [];
  }
}

export async function getNewsFeed(): Promise<{
  items: NewsItem[];
  liveCount: number;
}> {
  const [nasa, space] = await Promise.all([
    fetchFeed(NASA_RSS, "NASA", "astronomy", 6),
    fetchFeed(SPACE_RSS, "Space.com", "skywatch", 6),
  ]);

  const live = [...nasa, ...space].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );

  const items = [...live.slice(0, 10), ...CURATED_NEWS].slice(0, 16);

  return { items, liveCount: live.length };
}
