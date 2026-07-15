import { NextResponse } from "next/server";
import { resolveProviders } from "@/lib/llm";
import { generateBatchReadings } from "@/lib/readings/generate";
import { persistGeneratedBatch } from "@/lib/readings/persist";
import { getWindowForInstant } from "@/lib/windows";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isAuthorized(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;

  const header = request.headers.get("authorization");
  if (header === `Bearer ${secret}`) return true;

  const cronHeader = request.headers.get("x-cron-secret");
  return cronHeader === secret;
}

export async function POST(request: Request) {
  return runGenerate(request);
}

export async function GET(request: Request) {
  return runGenerate(request);
}

async function runGenerate(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const timeZone = process.env.SITE_TZ ?? "America/New_York";
    const window = getWindowForInstant(new Date(), timeZone);
    const { primary, fallback } = resolveProviders();
    const generated = await generateBatchReadings({
      window,
      timeZone,
      primary,
      fallback,
    });
    const persisted = await persistGeneratedBatch(window, generated);

    return NextResponse.json({
      ok: true,
      ...persisted,
      windowStart: window.windowStart.toISOString(),
      windowEnd: window.windowEnd.toISOString(),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
