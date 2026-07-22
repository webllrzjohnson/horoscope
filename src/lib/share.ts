export type PhilosopherQuoteShareInput = {
  philosopherName: string;
  signName: string;
  body: string;
};

export function buildPhilosopherQuoteShareText({
  philosopherName,
  signName,
  body,
}: PhilosopherQuoteShareInput): string {
  return `${philosopherName} reads ${signName}\n\n“${body.trim()}”\n\nPhilosopher’s Horoscope`;
}
