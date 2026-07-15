# Todo: Horoscope v1

## Task 1: Scaffold Next.js + tooling

**Description:** Create the Next.js (App Router) + TypeScript app in the repo root (alongside existing `docs/` / agent-skills), with lint/test scripts and env example.

**Acceptance criteria:**
- [x] `npm run dev`, `npm run build`, `npm run lint`, `npm test` exist and run
- [x] `.env.example` lists `DATABASE_URL`, `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `CRON_SECRET`, `SITE_TZ`, `LLM_PRIMARY`
- [x] App does not overwrite `docs/intent` or `docs/spec`

**Verification:**
- [x] `npm run build` succeeds
- [x] Manual: homepage placeholder renders

**Status:** Done

**Dependencies:** None  
**Files likely touched:** `package.json`, `tsconfig.json`, `next.config.*`, `src/app/`, `.env.example`, `.gitignore`  
**Estimated scope:** Medium

---

## Task 2: Prisma schema + Postgres models

**Description:** Add Prisma with `Batch` and `Reading` models, indexes, and unique `(batchId, sign, philosopher)`.

**Acceptance criteria:**
- [x] Schema matches spec data model
- [x] `npx prisma migrate dev` (or `db push`) works against local Postgres
- [x] Client generates successfully

**Verification:**
- [x] Migrate/push succeeds
- [x] `npx prisma validate`

**Status:** Done

**Dependencies:** Task 1  
**Files likely touched:** `prisma/schema.prisma`, `src/lib/db.ts`  
**Estimated scope:** Small

---

## Checkpoint: After Tasks 1–2

- [ ] Build passes
- [ ] DB schema applied locally

---

## Task 3: Domain — signs, philosophers, phrases, windows

**Description:** Implement zodiac constants, five philosopher persona definitions + prompt builders, phrase bank JSON, and 2-hour window math for `America/New_York`.

**Acceptance criteria:**
- [x] 12 signs exported with stable slugs
- [x] 5 philosophers with persona prompt text
- [x] Phrase bank loadable; sampler returns N seeds
- [x] Window helper returns `windowStart` / `windowEnd` for a given instant in `SITE_TZ`

**Verification:**
- [x] Unit tests for window boundaries and sampling
- [x] `npm test` passes for these modules

**Status:** Done

**Dependencies:** Task 1  
**Files likely touched:** `src/lib/signs.ts`, `src/lib/philosophers/*`, `src/lib/phrases/*`, `src/lib/windows.ts`, `tests/unit/*`  
**Estimated scope:** Medium

---

## Task 4: LLM clients + generation pipeline

**Description:** Wire OpenAI and Anthropic clients; Claude primary / OpenAI fallback (env override); Zod-validate structured reading output; orchestrate 12×5 generation with seeds.

**Acceptance criteria:**
- [x] Both providers callable behind a common interface
- [x] Fallback triggers when primary fails
- [x] Invalid LLM output retries once, then errors
- [x] Pipeline returns validated readings ready for DB insert (no HTTP yet)

**Verification:**
- [x] Unit/integration tests with mocked providers
- [x] `npm test` covers parse + fallback

**Status:** Done

**Dependencies:** Task 3  
**Files likely touched:** `src/lib/llm/*`, `src/lib/readings/generate.ts`, `tests/**`  
**Estimated scope:** Medium

---

## Task 5: Cron generate API (idempotent write)

**Description:** Secured `POST /api/cron/generate` creates a batch + readings in one transaction; no-op if window exists.

**Acceptance criteria:**
- [x] Rejects missing/invalid `CRON_SECRET`
- [x] Idempotent per `windowStart`
- [x] Full 12×5 success required before commit (no partial publish)
- [x] Stores seed phrases on readings

**Verification:**
- [x] Integration test with mocked LLM + test DB (or prisma mock)
- [ ] Manual curl against local server creates one batch; second curl no-ops

**Status:** Done (manual curl needs API keys)

**Dependencies:** Tasks 2, 4  
**Files likely touched:** `src/app/api/cron/generate/route.ts`, `src/lib/readings/*`  
**Estimated scope:** Medium

---

## Checkpoint: After Tasks 3–5

- [ ] Tests pass for domain + LLM mocks + cron idempotency
- [ ] Local curl can populate Postgres

---

## Task 6: Readings query + Home + Sign pages

**Description:** Query current batch; build home (featured teaser + 12-sign grid) and sign detail (5 voices + lucky number/color + visible time window). Empty state when no batch.

**Acceptance criteria:**
- [x] Home shows brand placeholder, current window teaser, links to all signs
- [x] `/signs/[sign]` shows 5 philosopher readings for current batch
- [x] Lucky number/color and time window visible
- [x] Invalid sign slug → 404

**Verification:**
- [x] `npm run build`
- [ ] Manual: after generating a batch, browse home → each sign

**Status:** Done

**Dependencies:** Task 5  
**Files likely touched:** `src/app/page.tsx`, `src/app/signs/[sign]/page.tsx`, `src/components/*`, `src/lib/readings/query.ts`  
**Estimated scope:** Medium

---

## Task 7: Share control + visual polish

**Description:** Share button (Web Share API + copy-link fallback). Apply expressive typography and atmospheric styling so the site reads as a real astrology site (per frontend design rules / spec).

**Acceptance criteria:**
- [x] Share works on supporting browsers; copy-link fallback otherwise
- [x] First viewport is one composition; brand-forward; not a dashboard of widgets
- [x] Mobile and desktop usable

**Verification:**
- [ ] Manual share/copy on a sign page
- [ ] Quick mobile width check

**Status:** Done

**Dependencies:** Task 6  
**Files likely touched:** `src/components/ShareButton.tsx`, `src/app/globals.css`, layout/fonts  
**Estimated scope:** Medium

---

## Task 8: Deploy cron config + runbook

**Description:** Add Vercel cron (every 2 hours) pointing at generate route; document env vars and local generate command in README.

**Acceptance criteria:**
- [x] `vercel.json` (or platform equivalent) schedules `/api/cron/generate`
- [x] README covers setup, migrate, generate, and keys
- [x] Spec success criteria checklist mirrored for launch

**Verification:**
- [x] Config file present and path matches route
- [x] README steps are accurate against the repo

**Status:** Done

**Dependencies:** Task 5  
**Files likely touched:** `vercel.json`, `README.md`  
**Estimated scope:** Small

---

## Checkpoint: After Tasks 6–8

- [ ] `npm run build` + `npm test` pass
- [ ] Spec success criteria satisfied or explicitly deferred with reason
