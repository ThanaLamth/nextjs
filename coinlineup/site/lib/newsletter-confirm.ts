import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";

interface ConfirmationPayload {
  email: string;
  exp: number;
}

const CONFIRM_TOKEN_TTL_MS = 1000 * 60 * 60 * 24 * 3;

function getConfirmationSecret(): string | undefined {
  return process.env.NEWSLETTER_CONFIRM_SECRET?.trim() || undefined;
}

function encodeBase64Url(value: string): string {
  return Buffer.from(value, "utf8").toString("base64url");
}

function decodeBase64Url(value: string): string {
  return Buffer.from(value, "base64url").toString("utf8");
}

function signPayload(encodedPayload: string, secret: string): string {
  return createHmac("sha256", secret).update(encodedPayload).digest("base64url");
}

export function hasNewsletterConfirmationConfig(): boolean {
  return Boolean(getConfirmationSecret());
}

export function createNewsletterConfirmationToken(email: string): string {
  const secret = getConfirmationSecret();
  if (!secret) {
    throw new Error("Missing NEWSLETTER_CONFIRM_SECRET.");
  }

  const payload: ConfirmationPayload = {
    email,
    exp: Date.now() + CONFIRM_TOKEN_TTL_MS,
  };

  const encodedPayload = encodeBase64Url(JSON.stringify(payload));
  const signature = signPayload(encodedPayload, secret);

  return `${encodedPayload}.${signature}`;
}

export function readNewsletterConfirmationToken(token: string): ConfirmationPayload {
  const secret = getConfirmationSecret();
  if (!secret) {
    throw new Error("Missing NEWSLETTER_CONFIRM_SECRET.");
  }

  const [encodedPayload, providedSignature] = token.split(".");
  if (!encodedPayload || !providedSignature) {
    throw new Error("Invalid confirmation token.");
  }

  const expectedSignature = signPayload(encodedPayload, secret);
  const providedBuffer = Buffer.from(providedSignature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (
    providedBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(providedBuffer, expectedBuffer)
  ) {
    throw new Error("Invalid confirmation token.");
  }

  const payload = JSON.parse(decodeBase64Url(encodedPayload)) as ConfirmationPayload;
  if (!payload.email || !payload.exp) {
    throw new Error("Invalid confirmation token.");
  }

  if (Date.now() > payload.exp) {
    throw new Error("Confirmation token expired.");
  }

  return payload;
}
