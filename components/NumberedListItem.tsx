import { colorMap } from "@/lib";
import { RichText } from "./RichText";
import {
  NumberedListItemBlockObjectResponse,
  TextRichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";

export function NumberedListItem({
  numbered_list_item,
}: NumberedListItemBlockObjectResponse) {
  const { rich_text, color } = numbered_list_item;
  const colorClass = colorMap[color] || colorMap.default;

  return (
    <li className={`list-decimal ml-6 ${colorClass}`}>
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
