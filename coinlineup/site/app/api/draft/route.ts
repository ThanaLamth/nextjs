import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import {
  getAuthenticatedPageById,
  getAuthenticatedPostById,
  hasWordPressAuthenticatedApi,
} from "@/lib/wordpress-auth";
import { pathFromWpLink, resolveContentByPath } from "@/lib/wordpress";

function isValidSecret(secret: string | null): boolean {
  return Boolean(secret && secret === process.env.WORDPRESS_DRAFT_SECRET);
}

function parsePathSegments(pathname: string): string[] {
  return pathname.replace(/^\/+|\/+$/g, "").split("/").filter(Boolean);
}

async function resolveDraftSlugPath(slug: string): Promise<string | null> {
  if (!slug.startsWith("/")) {
    return null;
  }

  const segments = parsePathSegments(slug);
  if (segments.length === 0) {
    return "/";
  }

  const resolved = await resolveContentByPath(segments);
  if (!resolved) {
    return null;
  }

  if (resolved.kind === "post") return pathFromWpLink(resolved.post.link);
  if (resolved.kind === "page") return pathFromWpLink(resolved.page.link);
  return pathFromWpLink(resolved.category.link);
}

async function resolveDraftEntityPath(
  postId: number,
  postType: string | null,
): Promise<string | null> {
  if (!hasWordPressAuthenticatedApi()) {
    return null;
  }

  if (postType === "page") {
    const page = await getAuthenticatedPageById(postId);
    if (!page) return null;
    const pagePath = pathFromWpLink(page.link);
    return page.status === "publish" && pagePath !== "/"
      ? pagePath
      : `/_preview/page/${page.id}`;
  }

  const post = await getAuthenticatedPostById(postId);
  if (!post) return null;

  const postPath = pathFromWpLink(post.link);
  return post.status === "publish" && postPath !== "/"
    ? postPath
    : `/_preview/post/${post.id}`;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");
  const postId = Number.parseInt(searchParams.get("id") ?? searchParams.get("p") ?? "", 10);
  const postType = searchParams.get("type") ?? searchParams.get("post_type");

  if (!isValidSecret(secret)) {
    return new Response("Invalid draft request", { status: 401 });
  }

  const verifiedPath =
    Number.isFinite(postId) && postId > 0
      ? await resolveDraftEntityPath(postId, postType)
      : slug
        ? await resolveDraftSlugPath(slug)
        : null;

  if (!verifiedPath) {
    return new Response("Invalid draft target", { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();

  redirect(verifiedPath);
}
