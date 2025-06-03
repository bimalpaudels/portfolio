import { colorMap } from "@/lib";
import { RichText } from "./RichText";
import {
  BulletedListItemBlockObjectResponse,
  TextRichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";

export function BulletedListItem({
  bulleted_list_item,
}: BulletedListItemBlockObjectResponse) {
  const { rich_text, color } = bulleted_list_item;
  const colorClass = colorMap[color] || colorMap.default;

  return (
    <li className={`list-disc ml-6 ${colorClass}`}>
      {rich_text
        .filter(
          (item): item is TextRichTextItemResponse => item.type === "text"
        )
        .map((item, index) => (
          <RichText key={index} item={item} />
        ))}
    </li>
  );
}
