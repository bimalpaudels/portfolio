import { RichText } from "./RichText";
import { Link } from "next-view-transitions";
import {
  MultiSelectPropertyItemObjectResponse,
  LastEditedTimePropertyItemObjectResponse,
  TextRichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { Calendar, Tag } from "lucide-react";

export const NotionTags: React.FC<{
  tags: MultiSelectPropertyItemObjectResponse;
}> = ({ tags }) => (
  <div className="flex flex-wrap items-center gap-3">
    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
      <Tag className="w-4 h-4" />
      <span className="text-sm font-medium">Tags</span>
    </div>
    <div className="flex flex-wrap gap-2">
      {tags.multi_select.map((tag) => (
        <span
          key={tag.id}
          className="inline-flex items-center px-3 py-1.5 text-xs font-medium bg-gradient-to-r from-sky-50 to-emerald-50 dark:from-sky-950/30 dark:to-emerald-950/30 text-sky-700 dark:text-sky-300 rounded-full border border-sky-200/60 dark:border-sky-800/60 hover:border-sky-300 dark:hover:border-sky-700 transition-colors duration-200"
        >
          {tag.name}
        </span>
      ))}
    </div>
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
  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
    <Calendar className="w-4 h-4" />
    <span className="text-sm font-medium">Last updated</span>
    <span className="text-sm text-gray-600 dark:text-gray-300">
      {new Date(updated.last_edited_time).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}
    </span>
  </div>
);

// New component to combine tags and last updated in a nice layout
export const PostMeta: React.FC<{
  tags: MultiSelectPropertyItemObjectResponse;
  updated: LastEditedTimePropertyItemObjectResponse;
}> = ({ tags, updated }) => (
  <div className="border-t border-gray-200 dark:border-gray-800 pt-8 mt-12 space-y-4">
    <LastUpdated updated={updated} />
    <NotionTags tags={tags} />
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
