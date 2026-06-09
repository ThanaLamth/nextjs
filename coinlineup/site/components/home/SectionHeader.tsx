import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

interface Props {
  title: string;
  dotColor?: string;
  icon?: ReactNode;
  viewAllHref?: string;
  viewAllLabel?: string;
}

export default function SectionHeader({ title, dotColor = "#F7931A", icon, viewAllHref, viewAllLabel = "View all" }: Props) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        {icon ? (
          <span className="text-base leading-none">{icon}</span>
        ) : (
          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: dotColor }} />
        )}
        <h2 className="font-display font-bold text-xs uppercase tracking-widest" style={{ color: "var(--text-primary)" }}>
          {title}
        </h2>
      </div>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="flex items-center gap-1 text-xs font-medium hover:gap-1.5 transition-all text-brand-orange"
        >
          {viewAllLabel} <ArrowRight size={12} />
        </Link>
      )}
    </div>
  );
}
