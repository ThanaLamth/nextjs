import "server-only";

const BREVO_API_BASE_URL = "https://api.brevo.com/v3";

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
