import type { Metadata } from "next";
import Link from "next/link";
import { SIGNS } from "@/lib/signs";

export const metadata: Metadata = {
  title: "Sitemap",
  description: "All public pages on Philosopher’s Horoscope.",
};

const STATIC_LINKS = [
  { href: "/", label: "Home / today’s sign" },
  { href: "/guide", label: "Zodiac guide" },
  { href: "/find-sign", label: "Find your Sun sign" },
  { href: "/moon", label: "Moon phase" },
  { href: "/news", label: "News" },
  { href: "/games", label: "Games" },
  { href: "/about", label: "About" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/privacy", label: "Privacy" },
  { href: "/sitemap.xml", label: "XML sitemap" },
] as const;

export default function SitemapPage() {
  return (
    <main className="page prose-page">
      <p className="brand-mark">Sitemap</p>
      <h1 className="page-title">All pages</h1>

      <section className="prose-block">
        <h2>Main</h2>
        <ul className="link-list">
          {STATIC_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="prose-block">
        <h2>Daily sign readings</h2>
        <ul className="link-list two-col">
          {SIGNS.map((sign) => (
            <li key={sign.slug}>
              <Link href={`/signs/${sign.slug}`}>
                {sign.glyph} {sign.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
