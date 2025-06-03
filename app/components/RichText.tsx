import { colorMap } from "@/app/mapping";
import { Link } from "next-view-transitions";
import { TextRichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

export const RichText: React.FC<{ item: TextRichTextItemResponse }> = ({
  item,
}) => {
  const { annotations, text } = item;

  const isLink = !!text.link;

  const className = [
    annotations.bold ? "font-semibold" : "",
    annotations.italic ? "italic" : "",
    annotations.strikethrough ? "line-through" : "",
    annotations.underline ? "underline" : "",
    annotations.code
      ? "font-mono text-sm bg-sky-50 dark:bg-sky-950/30 text-sky-700 dark:text-sky-300 rounded px-1.5 py-0.5 border border-sky-200/50 dark:border-sky-800/50"
      : "",
    // Only apply Notion colors if it's NOT a link
    !isLink ? colorMap[annotations.color] || colorMap.default : "",
  ]
    .filter(Boolean)
    .join(" ");

  const content = <span className={className}>{text.content}</span>;

  return isLink && text.link ? (
    <Link href={text.link.url}>{content}</Link>
  ) : (
    content
  );
};
