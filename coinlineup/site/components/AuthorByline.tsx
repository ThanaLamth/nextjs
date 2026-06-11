import Link from "next/link";
import type { AuthorProfile } from "@/lib/authors";

interface AuthorBylineProps {
  authorName: string;
  authorSlug?: string;
  authorProfile?: AuthorProfile | null;
}

export default function AuthorByline({
  authorName,
  authorSlug,
  authorProfile,
}: AuthorBylineProps) {
  const authorLabel = authorSlug ? (
    <Link
      href={`/authors#${authorSlug}`}
      className="font-medium hover:text-brand-orange transition-colors"
      style={{ color: "var(--text-primary)" }}
    >
      By {authorName}
    </Link>
  ) : (
    <span className="font-medium" style={{ color: "var(--text-primary)" }}>
      By {authorName}
    </span>
  );

  if (!authorProfile) {
    return authorLabel;
  }

  return (
    <>
      {authorLabel}
      <span className="text-[10px]">•</span>
      <span>{authorProfile.role}</span>
    </>
  );
}
