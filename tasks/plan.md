# Plan: Horoscope v1

Spec: [`docs/spec/horoscope-v1.md`](../docs/spec/horoscope-v1.md)  
Intent: [`docs/intent/horoscope.md`](../docs/intent/horoscope.md)

## Approach

Greenfield Next.js app with Postgres-backed reading batches. Build in **vertical slices**: first a runnable shell + schema, then pure domain/LLM pieces with tests, then the cron write path, then read UI that displays the current batch, then share/polish.

## Dependency graph

```text
Next.js scaffold + env
    │
    ├── Prisma schema (Batch, Reading) + migrate
    │
    ├── Domain: signs, philosophers, phrase bank, window math (SITE_TZ)
    │       │
    │       ├── LLM clients (OpenAI + Claude) + Zod output schema
    │       │       │
    │       │       └── Cron generate route (auth, idempotent, transaction)
    │       │
    │       └── Readings query (current batch / by sign)
    │               │
    │               ├── Home (teaser + 12-sign grid)
    │               └── Sign page (5 philosopher readings + lucky meta)
    │                       │
    │                       └── Share control + visual polish
    │
    └── Coolify Docker + scheduled task + README runbook
```

## Risks

| Risk | Mitigation |
|------|------------|
| LLM returns messy prose / bad JSON | Zod schema + one retry; fail job if invalid; no silent partial publish |
| Double cron / overlapping runs | Idempotent on `(windowStart)`; unique constraints |
| Empty DB on first visit | Seed path or friendly empty state + manual cron trigger docs |
| Cost of 12×5 generations / run | Batch prompts where sensible later; v1 = explicit loops with rate limits / sequential with small concurrency |
| Tone too soft or off-brand | Versioned persona prompts in repo; review sample output before launch |

## Implementation order

1. Scaffold + Prisma  
2. Domain libs + tests  
3. LLM + generate pipeline + tests  
4. Cron route  
5. Home + sign pages (read path)  
6. Share + design polish  
7. Cron deploy config + runbook  

## Verification checkpoints

- After 1–2: `npm run build`, Prisma can push against local Postgres  
- After 3–4: mocked cron creates a full batch; second call same window is no-op  
- After 5–6: manual browse home → sign; window + 5 voices + lucky meta visible; share works  
- After 7: cron config present; README documents env + local generate curl  

## Out of scope (do not plan)

Accounts, compatibility product, natal charts, per-visitor generation.
