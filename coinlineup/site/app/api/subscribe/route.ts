import { subscribeEmailToBrevo, hasBrevoNewsletterConfig } from "@/lib/brevo";

interface SubscribeRequestBody {
  email?: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let body: SubscribeRequestBody;

  try {
    body = (await request.json()) as SubscribeRequestBody;
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();
  if (!email || !isValidEmail(email)) {
    return Response.json({ error: "Enter a valid email address" }, { status: 400 });
  }

  if (!hasBrevoNewsletterConfig()) {
    return Response.json(
      { error: "Newsletter signup is not configured yet" },
      { status: 503 },
    );
  }

  try {
    await subscribeEmailToBrevo(email);
    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { error: "Subscription failed. Please try again." },
      { status: 502 },
    );
  }
}
