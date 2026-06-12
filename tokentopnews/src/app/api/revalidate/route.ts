import { resolveEntityByPath, toInternalPath, toLocalArticlePath, toLocalEntityPath } from "@/lib/wp";
import { revalidatePath, revalidateTag } from "next/cache";

export async function POST(request: Request) {
  const secret = request.headers.get("x-revalidate-secret");

  if (secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const payload = (await request.json().catch(() => ({}))) as {
    path?: string;
    tags?: string[];
    postSlug?: string;
    categoryId?: number | string;
  };

  revalidateTag("posts", "max");
  revalidateTag("pages", "max");
  revalidateTag("categories", "max");

  if (payload.postSlug) {
    revalidateTag(`post:${payload.postSlug}`, "max");
    revalidatePath(toLocalArticlePath(payload.postSlug));
  }

  if (payload.categoryId) {
    revalidateTag(`category:${payload.categoryId}`, "max");
  }

  if (payload.path) {
    const slugParts = payload.path
      .replace(/^https?:\/\/[^/]+/i, "")
      .replace(/^\/+|\/+$/g, "")
      .split("/")
      .filter(Boolean);
    const entity = slugParts.length ? await resolveEntityByPath(slugParts) : null;
    revalidatePath(entity ? await toLocalEntityPath(entity) : toInternalPath(payload.path));
  }

  for (const tag of payload.tags ?? []) {
    revalidateTag(tag, "max");
  }

  return Response.json({ ok: true });
}
