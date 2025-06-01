import { colorMap } from "@/app/mapping";
import { Link } from "next-view-transitions";
import { TextRichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

export const RichText: React.FC<{ item: TextRichTextItemResponse }> = ({
  item,
}) => {
  const { annotations, text } = item;
  const className = [
    annotations.bold ? "font-semibold" : "",
    annotations.italic ? "italic" : "",
    annotations.strikethrough ? "line-through" : "",
    annotations.underline ? "underline" : "",
    annotations.code
      ? "font-mono text-sm bg-gray-100 dark:bg-gray-800 text-pink-600 dark:text-pink-400 rounded px-1 py-0.5"
      : "",
    colorMap[annotations.color] || colorMap.default,
  ].join(" ");

  const content = <span className={className}>{text.content}</span>;
  return text.link ? <Link href={text.link.url}>{content}</Link> : content;
};
