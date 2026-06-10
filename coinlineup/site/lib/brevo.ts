import "server-only";

const BREVO_API_BASE_URL = "https://api.brevo.com/v3";

interface BrevoEmailAddress {
  email: string;
  name?: string;
}

interface BrevoSendEmailPayload {
  sender: BrevoEmailAddress;
  to: BrevoEmailAddress[];
  replyTo?: BrevoEmailAddress;
  subject: string;
  htmlContent: string;
}

function getBrevoApiKey(): string | undefined {
  return process.env.BREVO_API_KEY?.trim() || undefined;
}

function getBrevoListId(): number | undefined {
  const raw = process.env.BREVO_LIST_ID?.trim();
  if (!raw) return undefined;

  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined;
}

export function hasBrevoNewsletterConfig(): boolean {
  return Boolean(getBrevoApiKey() && getBrevoListId());
}

function getBrevoSenderEmail(): string | undefined {
  return process.env.BREVO_SENDER_EMAIL?.trim() || undefined;
}

function getBrevoSenderName(): string {
  return process.env.BREVO_SENDER_NAME?.trim() || "CoinLineup";
}

function getBrevoReplyToEmail(): string | undefined {
  return process.env.BREVO_REPLY_TO_EMAIL?.trim() || undefined;
}

function getBrevoReplyToName(): string | undefined {
  return process.env.BREVO_REPLY_TO_NAME?.trim() || undefined;
}

export function hasBrevoWelcomeEmailConfig(): boolean {
  return Boolean(getBrevoApiKey() && getBrevoSenderEmail());
}

interface BrevoContactPayload {
  email: string;
  listIds: number[];
  updateEnabled: boolean;
}

export async function subscribeEmailToBrevo(email: string): Promise<void> {
  const apiKey = getBrevoApiKey();
  const listId = getBrevoListId();

  if (!apiKey || !listId) {
    throw new Error("Missing Brevo newsletter configuration. Set BREVO_API_KEY and BREVO_LIST_ID.");
  }

  const payload: BrevoContactPayload = {
    email,
    listIds: [listId],
    updateEnabled: true,
  };

  const response = await fetch(`${BREVO_API_BASE_URL}/contacts`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Brevo subscribe failed: ${response.status} ${details}`);
  }
}

function buildWelcomeEmailHtml(email: string): string {
  const safeEmail = email.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

  return `
    <html>
      <body style="margin:0;padding:0;background:#f5f0e8;font-family:Georgia,serif;color:#111827;">
        <div style="max-width:640px;margin:0 auto;padding:32px 20px;">
          <div style="background:#ffffff;border:1px solid #e5e7eb;border-radius:20px;padding:32px;">
            <p style="margin:0 0 16px;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#b45309;">
              CoinLineup Daily
            </p>
            <h1 style="margin:0 0 16px;font-size:32px;line-height:1.15;color:#111827;">
              Thanks for subscribing
            </h1>
            <p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#374151;">
              You are now on the CoinLineup Daily list with <strong>${safeEmail}</strong>.
            </p>
            <p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#374151;">
              We will send a short crypto briefing with major market stories, selected guides, and useful context without forcing account setup.
            </p>
            <p style="margin:0 0 24px;font-size:16px;line-height:1.7;color:#374151;">
              Expect a cleaner editorial format focused on what matters, what changed, and what is worth watching next.
            </p>
            <a href="https://coinlineup-production.up.railway.app/"
              style="display:inline-block;padding:12px 18px;border-radius:999px;background:#f97316;color:#ffffff;text-decoration:none;font-weight:700;">
              Visit CoinLineup
            </a>
          </div>
          <p style="margin:16px 0 0;font-size:12px;line-height:1.6;color:#6b7280;text-align:center;">
            If this was not you, you can ignore this email or unsubscribe from any future newsletter.
          </p>
        </div>
      </body>
    </html>
  `;
}

export async function sendBrevoWelcomeEmail(email: string): Promise<void> {
  const apiKey = getBrevoApiKey();
  const senderEmail = getBrevoSenderEmail();

  if (!apiKey || !senderEmail) {
    throw new Error(
      "Missing Brevo welcome email configuration. Set BREVO_API_KEY and BREVO_SENDER_EMAIL.",
    );
  }

  const replyToEmail = getBrevoReplyToEmail();
  const replyToName = getBrevoReplyToName();

  const payload: BrevoSendEmailPayload = {
    sender: {
      email: senderEmail,
      name: getBrevoSenderName(),
    },
    to: [{ email }],
    subject: "Welcome to CoinLineup Daily",
    htmlContent: buildWelcomeEmailHtml(email),
  };

  if (replyToEmail) {
    payload.replyTo = {
      email: replyToEmail,
      name: replyToName,
    };
  }

  const response = await fetch(`${BREVO_API_BASE_URL}/smtp/email`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Brevo welcome email failed: ${response.status} ${details}`);
  }
}

function buildConfirmationEmailHtml(confirmUrl: string): string {
  const safeConfirmUrl = confirmUrl.replaceAll("&", "&amp;").replaceAll("\"", "&quot;");

  return `
    <html>
      <body style="margin:0;padding:0;background:#f5f0e8;font-family:Georgia,serif;color:#111827;">
        <div style="max-width:640px;margin:0 auto;padding:32px 20px;">
          <div style="background:#ffffff;border:1px solid #e5e7eb;border-radius:20px;padding:32px;">
            <p style="margin:0 0 16px;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#b45309;">
              CoinLineup Daily
            </p>
            <h1 style="margin:0 0 16px;font-size:32px;line-height:1.15;color:#111827;">
              Confirm your subscription
            </h1>
            <p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#374151;">
              You asked to join CoinLineup Daily. Confirm your email to start receiving concise crypto news, market context, and selected reads worth your time.
            </p>
            <p style="margin:0 0 24px;font-size:16px;line-height:1.7;color:#374151;">
              This extra step keeps the list clean and makes sure nobody is signed up without permission.
            </p>
            <a href="${safeConfirmUrl}"
              style="display:inline-block;padding:12px 18px;border-radius:999px;background:#f97316;color:#ffffff;text-decoration:none;font-weight:700;">
              Confirm subscription
            </a>
          </div>
          <p style="margin:16px 0 0;font-size:12px;line-height:1.6;color:#6b7280;text-align:center;">
            If you did not request this, ignore this email and you will not be subscribed.
          </p>
        </div>
      </body>
    </html>
  `;
}

export async function sendBrevoConfirmationEmail(email: string, confirmUrl: string): Promise<void> {
  const apiKey = getBrevoApiKey();
  const senderEmail = getBrevoSenderEmail();

  if (!apiKey || !senderEmail) {
    throw new Error(
      "Missing Brevo confirmation email configuration. Set BREVO_API_KEY and BREVO_SENDER_EMAIL.",
    );
  }

  const replyToEmail = getBrevoReplyToEmail();
  const replyToName = getBrevoReplyToName();

  const payload: BrevoSendEmailPayload = {
    sender: {
      email: senderEmail,
      name: getBrevoSenderName(),
    },
    to: [{ email }],
    subject: "Confirm your CoinLineup Daily subscription",
    htmlContent: buildConfirmationEmailHtml(confirmUrl),
  };

  if (replyToEmail) {
    payload.replyTo = {
      email: replyToEmail,
      name: replyToName,
    };
  }

  const response = await fetch(`${BREVO_API_BASE_URL}/smtp/email`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Brevo confirmation email failed: ${response.status} ${details}`);
  }
}
