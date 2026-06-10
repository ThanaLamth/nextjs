import { NextResponse } from "next/server";
import { subscribeEmailToBrevo } from "@/lib/brevo";
import { readNewsletterConfirmationToken } from "@/lib/newsletter-confirm";
import { getSiteUrl } from "@/lib/wordpress";

function buildRedirectUrl(status: "success" | "invalid"): string {
  const url = new URL("/newsletter-confirmed", getSiteUrl());
  url.searchParams.set("status", status);
  return url.toString();
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(buildRedirectUrl("invalid"));
  }

  try {
    const { email } = readNewsletterConfirmationToken(token);
    await subscribeEmailToBrevo(email);
    return NextResponse.redirect(buildRedirectUrl("success"));
  } catch {
    return NextResponse.redirect(buildRedirectUrl("invalid"));
  }
}
