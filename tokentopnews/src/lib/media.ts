const NOISY_IMAGE_QUERY_PARAMS = new Set([
  "bis_skin_checked",
  "fbclid",
  "gclid",
  "mc_cid",
  "mc_eid",
]);

function shouldStripParam(key: string): boolean {
  return NOISY_IMAGE_QUERY_PARAMS.has(key) || key.startsWith("utm_");
}

export function sanitizeImageUrl(url: string): string {
  if (!url) {
    return url;
  }

  try {
    const parsed = new URL(url);
    const keys = Array.from(parsed.searchParams.keys());

    for (const key of keys) {
      if (shouldStripParam(key)) {
        parsed.searchParams.delete(key);
      }
    }

    return parsed.toString();
  } catch {
    return url
      .replace(/([?&])bis_skin_checked=[^&]*&?/gi, "$1")
      .replace(/([?&])(fbclid|gclid|mc_cid|mc_eid)=[^&]*&?/gi, "$1")
      .replace(/([?&])utm_[^=]+=[^&]*&?/gi, "$1")
      .replace(/[?&]$/, "");
  }
}

export function sanitizeHtmlImageUrls(html: string): string {
  if (!html) {
    return html;
  }

  return html
    .replace(
      /(<img\b[^>]*\bsrc=["'])([^"']+)(["'][^>]*>)/gi,
      (_match, prefix: string, url: string, suffix: string) =>
        `${prefix}${sanitizeImageUrl(url)}${suffix}`,
    )
    .replace(
      /(<img\b[^>]*\bsrcset=["'])([^"']+)(["'][^>]*>)/gi,
      (_match, prefix: string, srcset: string, suffix: string) => {
        const sanitized = srcset
          .split(",")
          .map((entry) => entry.trim())
          .filter(Boolean)
          .map((entry) => {
            const [candidateUrl, descriptor] = entry.split(/\s+/, 2);
            const cleanUrl = sanitizeImageUrl(candidateUrl);
            return descriptor ? `${cleanUrl} ${descriptor}` : cleanUrl;
          })
          .join(", ");

        return `${prefix}${sanitized}${suffix}`;
      },
    );
}

export function removeInlineThumbnailFigures(html: string): string {
  if (!html) {
    return html;
  }

  return html.replace(
    /<figure\b[^>]*(?:class=["'][^"']*pipeline-inline-thumbnail[^"']*["']|data-pipeline-inline-thumbnail=["']true["'])[^>]*>[\s\S]*?<\/figure>\s*/gi,
    "",
  );
}
