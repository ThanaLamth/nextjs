import { revalidatePath, revalidateTag } from "next/cache";

interface RevalidateBody {
  secret?: string;
  tags?: string[];
  paths?: string[];
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as RevalidateBody | null;

  if (!body || body.secret !== process.env.WORDPRESS_REVALIDATE_SECRET) {
    return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  for (const tag of body.tags ?? []) {
    revalidateTag(tag, "max");
  }

  for (const path of body.paths ?? []) {
    revalidatePath(path);
  }

  return Response.json({
    ok: true,
    revalidated: {
      tags: body.tags ?? [],
      paths: body.paths ?? [],
    },
  });
}

