import Link from "next/link";

const NAV = [
  { href: "/", label: "Today" },
  { href: "/guide", label: "Guide" },
  { href: "/find-sign", label: "Find sign" },
  { href: "/moon", label: "Moon" },
  { href: "/news", label: "News" },
  { href: "/games", label: "Games" },
] as const;

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link href="/" className="site-logo">
        Philosopher’s Horoscope
      </Link>
      <nav className="site-nav" aria-label="Primary">
        {NAV.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer-bar">
      <div className="footer-brand">
        <p className="site-logo">Philosopher’s Horoscope</p>
        <p>Dead thinkers roast your sign every two hours.</p>
      </div>
      <div className="footer-cols">
        <div>
          <p className="footer-label">Explore</p>
          <Link href="/guide">Zodiac guide</Link>
          <Link href="/find-sign">Find your sign</Link>
          <Link href="/moon">Moon phase</Link>
          <Link href="/news">News</Link>
          <Link href="/games">Games</Link>
        </div>
        <div>
          <p className="footer-label">Site</p>
          <Link href="/about">About</Link>
          <Link href="/disclaimer">Disclaimer</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/sitemap">Sitemap</Link>
        </div>
      </div>
    </footer>
  );
}
