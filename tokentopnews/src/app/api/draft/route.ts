import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

import { resolveEntityByPath, toLocalEntityPath } from "@/lib/wp";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");

  if (!slug || secret !== process.env.DRAFT_SECRET) {
    return new Response("Invalid draft request", { status: 401 });
  }

  const slugParts = slug.replace(/^\/+|\/+$/g, "").split("/").filter(Boolean);
  const entity = await resolveEntityByPath(slugParts);

  if (!entity) {
    return new Response("Slug not found", { status: 404 });
  }

  const draft = await draftMode();
  draft.enable();

  redirect(await toLocalEntityPath(entity));
}
