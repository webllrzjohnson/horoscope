# Spec: Horoscope v1

Source intent: [`docs/intent/horoscope.md`](../intent/horoscope.md)

## Objective

Build a consumer astrology website that looks like a real horoscope site, but delivers **brutal, sarcastic** daily readings voiced by **five famous philosophers**.

**User:** Astrology fans who want unusual, shareable “savage truth” takes — not soft affirmations.

**Core loop:**
1. Cron runs every **2 hours** (12 batches/day).
2. Job picks seeds from a phrase/idea bank, calls LLMs (OpenAI and/or Claude), writes one batch for all 12 signs into Postgres.
3. Visitors see the **current batch** (same content for everyone until the next run).
4. UI shows the **time window** for the active batch; pages are share-friendly.

**Philosophers (v1):**
| Philosopher   | Voice brief |
|---------------|-------------|
| Nietzsche     | Will, masks, contempt for comfort; aphoristic sting |
| Diogenes      | Cynic street roast; mocks pretension and status |
| Schopenhauer  | Pessimistic clarity; desire as trap |
| Machiavelli   | Cold political realism; power and appearances |
| Voltaire      | Witty Enlightenment sarcasm; punctures superstition gently-brutally |

Persona prompts live in repo (`src/lib/philosophers/`) and are versioned with the code.

**Lucky number / color:** One integer (1–99) and one named CSS-friendly color per sign per batch, shown as compact metadata under each reading (not a separate interactive tool).

## Tech Stack

| Layer | Choice |
|-------|--------|
| App | Next.js (App Router) + TypeScript |
| UI | React + CSS (project tokens; expressive typography — not default system stacks) |
| DB | PostgreSQL |
| ORM | Prisma |
| LLM | OpenAI **and** Anthropic (Claude) — both via env keys; generation job may use either or both (e.g. primary + fallback, or split by philosopher) |
| Cron | Coolify Scheduled Task → `node scripts/trigger-generate.mjs` (hits secured `/api/cron/generate`) |
| Hosting | Coolify on a VPS (Docker + Postgres) |

Env (names illustrative):
- `DATABASE_URL`
- `OPENAI_API_KEY`
- `ANTHROPIC_API_KEY`
- `CRON_SECRET`
- Optional: `LLM_PRIMARY=openai|anthropic`

## Commands

```text
Dev:     npm run dev
Build:   npm run build
Start:   npm run start
Lint:    npm run lint
Test:    npm test
DB push: npx prisma db push
Migrate: npx prisma migrate dev
Generate cron (local): curl -X POST http://localhost:3000/api/cron/generate -H "Authorization: Bearer $CRON_SECRET"
```

## Project Structure

```text
docs/
  intent/horoscope.md      → Confirmed product intent
  spec/horoscope-v1.md     → This spec
src/
  app/                     → App Router pages + API routes
    page.tsx               → Home (12 signs overview)
    signs/[sign]/page.tsx → Sign detail (current batch readings)
    api/cron/generate/     → Secured generation job
  components/              → UI (header, sign grid, reading cards, share)
  lib/
    philosophers/          → Persona definitions + prompt builders
    phrases/               → Phrase/idea bank for variation
    llm/                   → OpenAI + Claude clients, provider selection
    readings/              → DB access for current batch / by window
    signs.ts               → Zodiac constants (12 signs)
  generated/ or prisma/    → Prisma schema + client
prisma/
  schema.prisma
tests/                     → Unit/integration tests
public/                    → Static assets
```

## Data model (Postgres)

**Batch** — one generation run  
- `id`, `windowStart`, `windowEnd`, `createdAt`, `providerMeta` (JSON: which model(s) used)

**Reading** — one sign × one philosopher within a batch  
- `id`, `batchId`, `sign`, `philosopher`, `body` (text), `luckyNumber`, `luckyColor` (name + hex), `seedPhrases` (JSON array used)

**PhraseBank** (optional table) **or** repo JSON — curated seeds; v1 may ship as `src/lib/phrases/bank.json` and load in-process (DB later if needed).

Indexes: `(batch.windowStart DESC)`, `(reading.batchId, sign)`, unique `(batchId, sign, philosopher)`.

## Code Style

- TypeScript strict; named exports preferred for libs.
- Zod for validating cron payloads and LLM JSON output before DB write.
- Server Components by default; Client Components only for share UI / interactivity.
- No secrets in client bundles.

Example shape for one reading card:

```tsx
<article className="reading">
  <header>
    <h2>{philosopher}</h2>
    <p className="window">{formatWindow(batch.windowStart, batch.windowEnd)}</p>
  </header>
  <p className="body">{reading.body}</p>
  <ul className="meta">
    <li>Lucky number · {reading.luckyNumber}</li>
    <li>Lucky color · <span style={{ color: reading.luckyColorHex }}>{reading.luckyColorName}</span></li>
  </ul>
  <ShareButton title={`${sign} — ${philosopher}`} />
</article>
```

## Generation algorithm (every 2 hours)

1. Authenticate cron via `CRON_SECRET`.
2. Compute `windowStart` / `windowEnd` (2-hour slot, site timezone documented in env e.g. `SITE_TZ=America/New_York`).
3. If a batch already exists for that window, no-op (idempotent).
4. Sample N seed phrases from the bank.
5. For each of 12 signs × 5 philosophers, build persona prompt + seeds; call OpenAI and/or Claude per configured strategy; parse structured output (body, luckyNumber, luckyColor).
6. Validate with Zod; retry once on malformed output; fail the job loudly if still invalid (no partial silent publish unless all 12×5 succeed — **ask first** if we later want partial batches).
7. Insert `Batch` + `Reading` rows in one transaction.
8. Site queries “latest completed batch where windowEnd > now() OR latest by windowStart.”

**LLM strategy (default):** Claude primary for generation; OpenAI fallback on provider error. Overridable via env.

## Testing Strategy

- **Unit:** prompt builder, window math, phrase sampling, Zod parsers (`tests/unit/`).
- **Integration:** cron handler with mocked LLM clients → writes to test Postgres (or Prisma mock) and returns expected batch (`tests/integration/`).
- **Manual:** home + one sign page show current window; share copies a URL; second cron in same window is idempotent.
- Coverage target: critical paths (cron auth, idempotency, parse/validate) covered; no vanity % gate in v1.

## Boundaries

**Always:**
- Keep generation behind `CRON_SECRET`.
- Validate LLM output before persisting.
- Show time window on reading UI.
- Update this spec when product decisions change.

**Ask first:**
- Adding npm dependencies beyond the agreed stack.
- Changing philosopher set or tone rules.
- Partial batch publish on LLM failures.
- Schema migrations that drop/rename columns.
- Switching primary LLM strategy permanently.

**Never:**
- Commit API keys or `DATABASE_URL` with credentials.
- Per-visitor unique LLM calls in v1.
- User accounts, payments, or full compatibility product in v1.
- Soften tone into generic “feel-good” horoscope copy without a product decision.

## Success Criteria

- [ ] Site looks like a credible astrology site (home + 12 sign pages), not a bare joke landing page.
- [ ] Cron every 2 hours creates at most one batch per window; content is identical for all visitors in that window.
- [ ] Each sign page shows 5 philosopher readings + lucky number + lucky color for the current window.
- [ ] Time window is visible on the reading UI.
- [ ] OpenAI and Claude are both wired (keys via env); fallback path works when primary fails.
- [ ] Readings persist in Postgres and survive app restart.
- [ ] Share affordance works (Web Share API and/or copy link).
- [ ] Phrase bank influences generation (seeds stored or logged on readings).
- [ ] `npm run build` and agreed tests pass.

## Open Questions

Resolved on spec approval (2026-07-14):

1. **Timezone:** `America/New_York`
2. **Home layout:** Featured current-window teaser + 12-sign grid
3. **Brand name:** Placeholder “Horoscope” until a final name is chosen

---

**Status:** Spec approved. Proceed to plan (`tasks/plan.md`).
