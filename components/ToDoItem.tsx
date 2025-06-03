import { colorMap } from "@/lib";
import { RichText } from "./RichText";
import { Check } from "lucide-react";
import {
  ToDoBlockObjectResponse,
  TextRichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";

export function ToDoItem({ to_do }: ToDoBlockObjectResponse) {
  const { rich_text, color, checked } = to_do;
  const colorClass = colorMap[color] || colorMap.default;

  return (
    <div className={`flex items-start gap-2 ${colorClass}`}>
      <div className="flex-shrink-0 mt-1">
        <div
          className={`w-4 h-4 border-2 rounded-sm flex items-center justify-center transition-colors ${
            checked
              ? "bg-sky-500 border-sky-500 text-white"
              : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
          }`}
        >
          {checked && <Check className="w-3 h-3" />}
        </div>
      </div>
      <div
        className={`flex-1 ${
          checked ? "line-through text-gray-500 dark:text-gray-400" : ""
        }`}
      >
        {rich_text
          .filter(
            (item): item is TextRichTextItemResponse => item.type === "text"
          )
          .map((item, index) => (
            <RichText key={index} item={item} />
          ))}
      </div>
    </div>
  );
}
