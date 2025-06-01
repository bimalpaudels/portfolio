import { RichText } from "./RichText";
import { Link } from "next-view-transitions";
import {
  MultiSelectPropertyItemObjectResponse,
  LastEditedTimePropertyItemObjectResponse,
  TextRichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";

export const NotionTags: React.FC<{
  tags: MultiSelectPropertyItemObjectResponse;
}> = ({ tags }) => (
  <div className="flex flex-wrap gap-2 mb-6">
    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
      Tags:
    </span>
    {tags.multi_select.map((tag) => (
      <span
        key={tag.id}
        className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full border border-gray-200 dark:border-gray-700"
      >
        {tag.name}
      </span>
    ))}
  </div>
);

export const NotionPageTitle: React.FC<{ title: TextRichTextItemResponse }> = ({
  title,
}) => (
  <h1 className="font-heading font-bold text-4xl md:text-5xl leading-tight mb-8 text-gray-900 dark:text-gray-100">
    {title.plain_text}
  </h1>
);

export const LastUpdated: React.FC<{
  updated: LastEditedTimePropertyItemObjectResponse;
}> = ({ updated }) => (
  <div className="mb-6">
    <span className="text-sm text-gray-500 dark:text-gray-400">
      Last updated:{" "}
      {new Date(updated.last_edited_time).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
    </span>
  </div>
);

export const PageDescription: React.FC<{
  description: TextRichTextItemResponse[];
}> = ({ description }) => (
  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
    {description.map((item, index) => (
      <RichText key={index} item={item} />
    ))}
  </p>
);

export function Header() {
  return (
    <Link href="/" className="inline-block group hover:no-underline">
      <h2 className="font-heading font-semibold text-xl pt-12 transition-all duration-300 ease-in-out transform group-hover:-translate-y-1 group-hover:rotate-2 text-gray-900 dark:text-gray-100">
        bimals.net
      </h2>
    </Link>
  );
}
