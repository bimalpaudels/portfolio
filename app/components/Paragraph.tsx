import { colorMap } from "@/app/mapping";
import { RichText } from "./RichText";
import {
  ParagraphBlockObjectResponse,
  TextRichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";

export function Paragraph({ paragraph }: ParagraphBlockObjectResponse) {
  const { rich_text, color } = paragraph;
  const colorClass = colorMap[color] || colorMap.default;
  return (
    <p className={colorClass}>
      {rich_text
        .filter(
          (item): item is TextRichTextItemResponse => item.type === "text"
        )
        .map((item, index) => (
          <RichText key={index} item={item} />
        ))}
    </p>
  );
}
