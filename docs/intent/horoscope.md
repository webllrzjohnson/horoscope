# Intent: Horoscope site

Confirmed via interview-me. Explicit user yes.

## Statement

- **Outcome:** A real-looking astrology website with readings for all 12 signs, written in a brutal, sarcastic tone through 5 famous philosophers (agent chooses philosophers and writes persona prompts).
- **User:** People who love astrology but want unusual, shareable “savage truth” takes — not soft affirmations.
- **Why now:** Differentiator is philosopher voices plus insult-generator-style phrase/idea bank spice, vs generic horoscope sites.
- **Success:** People share the readings on social media.
- **Constraint:** Generate on a cron every **2 hours** (12 batches/day). Each batch is AI-generated once and served to everyone until the next run — not per visitor. UI shows which time window the reading belongs to. Lucky number and lucky color are included; agent decides the best shape. Variation comes from a phrase/idea bank (funny-insult-generator style), not unique per-person generation.
- **Out of scope (v1):** Per-visitor live AI generation, user accounts, deep natal charts, and a full compatibility product (later).

## Product notes (decisions deferred to build/spec)

- Philosophers: choose top 5; write prompts matching each persona.
- Lucky number / color: include in each batch; exact UX left to implementation.
- Site must still look like a real astrology website (standard barebones UI), not a one-trick joke landing page.
