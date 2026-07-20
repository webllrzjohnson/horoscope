import type { Metadata } from "next";
import { FindSignForm } from "@/components/FindSignForm";

export const metadata: Metadata = {
  title: "Find your sign",
  description: "Enter your birth date to find your tropical Sun sign.",
};

export default function FindSignPage() {
  return (
    <main className="page prose-page">
      <p className="brand-mark">Tool</p>
      <h1 className="page-title">Find your Sun sign</h1>
      <p className="lede wide">
        Your Sun sign is based on the Sun’s position along the ecliptic on your
        birth date in the tropical zodiac. Cusp birthdays can vary by a day
        depending on the year — treat near-boundary dates as approximate.
      </p>
      <FindSignForm />
    </main>
  );
}
