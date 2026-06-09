import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");

  if (secret !== process.env.WORDPRESS_DRAFT_SECRET || !slug || !slug.startsWith("/")) {
    return new Response("Invalid draft request", { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();

  redirect(slug);
}

