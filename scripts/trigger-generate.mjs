/**
 * Coolify Scheduled Task helper.
 * Recommended frequency: every 2 hours, e.g. cron expression: 0 0-23/2 * * *
 * Command: node scripts/trigger-generate.mjs
 *
 * Hits the local generate API with CRON_SECRET.
 */
const port = process.env.PORT || "3000";
const secret = process.env.CRON_SECRET;

if (!secret) {
  console.error("CRON_SECRET is not set");
  process.exit(1);
}

const url = `http://127.0.0.1:${port}/api/cron/generate`;

const response = await fetch(url, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${secret}`,
  },
});

const body = await response.text();
console.log(body);

if (!response.ok) {
  process.exit(1);
}
