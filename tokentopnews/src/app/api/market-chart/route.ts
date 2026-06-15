import { getCachedCoinChartSnapshot } from "@/lib/market-data-server";

const ALLOWED_DAYS = new Set(["1", "7", "30", "365", "max"]);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const coinId = searchParams.get("coin") ?? "bitcoin";
  const days = searchParams.get("days") ?? "1";

  if (coinId !== "bitcoin" || !ALLOWED_DAYS.has(days)) {
    return Response.json({ ok: false, error: "Invalid market chart request" }, { status: 400 });
  }

  const snapshot = await getCachedCoinChartSnapshot(coinId, days);
  return Response.json(snapshot);
}
