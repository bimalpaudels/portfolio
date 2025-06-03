import { PageDescription } from "@/components";
import { TextRichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";
import { NotionDBPagesRendererProps } from "@/types";
import { Link } from "next-view-transitions";

export default function PostsListRenderer({
  pages,
}: NotionDBPagesRendererProps) {
  return (
    <div className="space-y-8">
      {pages.map((page) => {
        const { properties } = page;
        const title =
          "title" in properties.Title ? properties.Title.title[0] : null;
        const description =
          properties.Description.type === "rich_text"
            ? properties.Description.rich_text
            : "";
        const slug =
          properties.slug.type === "rich_text"
            ? properties.slug.rich_text[0].plain_text
            : null;

        return (
          <div key={page.id} className="space-y-3">
            <div>
              <Link
                href={`/posts/${slug}`}
                className="font-heading text-lg font-semibold text-gray-900 dark:text-gray-100 hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-200"
              >
                {title?.plain_text}
              </Link>
            </div>

            <div className="font-body text-gray-600 dark:text-gray-300 leading-relaxed">
              <PageDescription
                description={description as TextRichTextItemResponse[]}
              />
            </div>

            <div className="text-grey-800 text-base leading-normal mt-1">
              <Link
                href={`/posts/${slug}`}
                className="font-body text-sm text-sky-500 dark:text-sky-400 hover:text-sky-600 dark:hover:text-sky-300 transition-colors duration-200"
              >
                Read post →
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
