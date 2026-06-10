import {
  hasBrevoNewsletterConfig,
  hasBrevoWelcomeEmailConfig,
  sendBrevoConfirmationEmail,
  sendBrevoWelcomeEmail,
  subscribeEmailToBrevo,
} from "@/lib/brevo";
import {
  createNewsletterConfirmationToken,
  hasNewsletterConfirmationConfig,
} from "@/lib/newsletter-confirm";
import { getSiteUrl } from "@/lib/wordpress";

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

  if (hasNewsletterConfirmationConfig() && hasBrevoWelcomeEmailConfig()) {
    try {
      const token = createNewsletterConfirmationToken(email);
      const confirmUrl = new URL("/api/newsletter/confirm", getSiteUrl());
      confirmUrl.searchParams.set("token", token);

      await sendBrevoConfirmationEmail(email, confirmUrl.toString());
      return Response.json({
        ok: true,
        confirmationRequired: true,
        message: "Check your inbox and confirm your subscription to join CoinLineup Daily.",
      });
    } catch {
      return Response.json(
        { error: "Confirmation email could not be sent. Please try again." },
        { status: 502 },
      );
    }
  }

  try {
    await subscribeEmailToBrevo(email);
  } catch {
    return Response.json(
      { error: "Subscription failed. Please try again." },
      { status: 502 },
    );
  }

  let welcomeEmailSent = false;

  if (hasBrevoWelcomeEmailConfig()) {
    try {
      await sendBrevoWelcomeEmail(email);
      welcomeEmailSent = true;
    } catch (error) {
      console.error("Welcome email send failed", error);
    }
  }

  return Response.json({
    ok: true,
    welcomeEmailSent,
    message: "You’re subscribed. Check your inbox for a welcome note.",
  });
}
