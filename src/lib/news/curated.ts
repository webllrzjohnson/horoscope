export type NewsItem = {
  id: string;
  title: string;
  summary: string;
  href: string;
  source: string;
  publishedAt: string;
  category: "astrology" | "astronomy" | "skywatch";
  external: boolean;
};

/** Evergreen / editorial pieces hosted as context when live feeds are thin. */
export const CURATED_NEWS: readonly NewsItem[] = [
  {
    id: "mercury-retrograde-basics",
    title: "Mercury retrograde, without the panic",
    summary:
      "What the cycle actually describes in traditional astrology — review, revise, reconnect — and how to use it without treating it as a curse.",
    href: "/guide#mercury",
    source: "Horoscope Desk",
    publishedAt: "2026-07-01",
    category: "astrology",
    external: false,
  },
  {
    id: "sun-vs-rising",
    title: "Sun sign vs rising sign: which one is “you”?",
    summary:
      "Your Sun describes core vitality; your rising (ascendant) is the lens others meet first. Both matter — for different reasons.",
    href: "/find-sign",
    source: "Horoscope Desk",
    publishedAt: "2026-06-18",
    category: "astrology",
    external: false,
  },
  {
    id: "elements-refresher",
    title: "Fire, earth, air, water — a practical refresher",
    summary:
      "Elements are not personality stickers. They describe modes of attention: spark, build, think, feel.",
    href: "/guide#elements",
    source: "Horoscope Desk",
    publishedAt: "2026-06-04",
    category: "astrology",
    external: false,
  },
  {
    id: "moon-rituals",
    title: "Working with the Moon without overcomplicating it",
    summary:
      "New Moon for planting, Full Moon for clarity. A simple two-step practice beats a twelve-step aesthetic ritual you will abandon.",
    href: "/moon",
    source: "Horoscope Desk",
    publishedAt: "2026-05-22",
    category: "skywatch",
    external: false,
  },
];
