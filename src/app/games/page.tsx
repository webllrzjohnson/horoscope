import type { Metadata } from "next";
import { GamesArena } from "@/components/GamesArena";

export const metadata: Metadata = {
  title: "Games",
  description:
    "Crystal ball, ideal partner, magic 8-ball, dice, cards, and Major Arcana tarot.",
};

export default function GamesPage() {
  return (
    <main className="page prose-page">
      <p className="brand-mark">Play</p>
      <h1 className="page-title">Cosmic party games</h1>
      <p className="lede wide">
        Absurdity, chance, and a serious Major Arcana tarot spread when you want
        the archetypes without the fluff.
      </p>
      <GamesArena />
    </main>
  );
}
