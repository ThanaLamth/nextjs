import { sanitizeHtmlImageUrls } from "@/lib/media";

type RichTextProps = {
  html: string;
};

export function RichText({ html }: RichTextProps) {
  return (
    <div
      className="rich-text"
      dangerouslySetInnerHTML={{ __html: sanitizeHtmlImageUrls(html) }}
    />
  );
}
