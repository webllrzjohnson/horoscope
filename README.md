# Horoscope

Brutal, sarcastic daily horoscope readings in the voices of five philosophers. Generated every 2 hours, same batch for everyone.

Product intent: [`docs/intent/horoscope.md`](docs/intent/horoscope.md)  
Spec: [`docs/spec/horoscope-v1.md`](docs/spec/horoscope-v1.md)  
Plan: [`tasks/plan.md`](tasks/plan.md)

## Stack

- Next.js (App Router) + TypeScript (`output: "standalone"`)
- PostgreSQL + Prisma 7
- OpenAI + Anthropic (Claude primary, OpenAI fallback)
- **Coolify on your VPS** (Docker) + Coolify Scheduled Task every 2 hours

## Local development

```bash
cp .env.example .env
# fill DATABASE_URL, OPENAI_API_KEY, ANTHROPIC_API_KEY, CRON_SECRET

npm install
npm run db:generate
npm run db:push
npm run dev
```

Optional local Prisma Postgres:

```bash
npx prisma dev --name horoscope
```

Generate a batch:

```bash
curl -X POST http://localhost:3000/api/cron/generate -H "Authorization: Bearer $CRON_SECRET"
```

## Deploy on Coolify (VPS)

### 1. Postgres

In Coolify: **New Resource → Database → PostgreSQL**.  
Copy the internal connection URL into the app’s `DATABASE_URL`.

### 2. Application

1. **New Resource → Application** → connect this Git repo  
2. Build Pack: **Dockerfile** (repo root `Dockerfile`)  
3. Port: **3000**  
4. Set domain + SSL as usual  

### 3. Environment variables

| Name | Notes |
|------|--------|
| `DATABASE_URL` | Coolify Postgres URL (prefer internal/docker network URL) |
| `OPENAI_API_KEY` | required |
| `ANTHROPIC_API_KEY` | required |
| `CRON_SECRET` | long random string |
| `SITE_TZ` | `America/New_York` |
| `LLM_PRIMARY` | `anthropic` (default) |
| `RUN_DB_PUSH_ON_START` | `true` (default) applies schema on boot; set `false` once you switch to migrations |

### 4. Scheduled Task (replaces Vercel Cron)

In the Coolify app → **Scheduled Tasks**:

| Field | Value |
|-------|--------|
| Name | `generate-readings` |
| Frequency | `0 */2 * * *` |
| Command | `node scripts/trigger-generate.mjs` |
| Timeout | `600` (or higher — 60 LLM calls can take several minutes) |

That script POSTs to `http://127.0.0.1:$PORT/api/cron/generate` with `CRON_SECRET`.

### 5. Deploy

Click **Deploy**. After it’s healthy, either wait for the schedule or run the command once from Coolify’s **Execute Command** tab:

```bash
node scripts/trigger-generate.mjs
```

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm test
npm run db:generate
npm run db:push
npm run db:migrate
```

## Agent skills

This repo also vendors [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) under `.agents/`, `.cursor/skills/`, etc.
