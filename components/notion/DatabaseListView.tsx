import { PageDescription } from "../NotionComponents";
import { TextRichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";
import { NotionDBPagesRendererProps } from "@/types";
import { Link } from "next-view-transitions";

interface DatabaseListViewProps extends NotionDBPagesRendererProps {
  titleProperty?: string;
  descriptionProperty?: string;
  slugProperty?: string;
  linkPrefix: string;
  className?: string;
}

export default function DatabaseListView({
  pages,
  titleProperty = "Title",
  descriptionProperty = "Description",
  slugProperty = "slug",
  linkPrefix,
  className = "space-y-8",
}: DatabaseListViewProps) {
  return (
    <div className={className}>
      {pages.map((page) => {
        const { properties } = page;

        // Extract title
        const titleProp = properties[titleProperty];
        const title =
          titleProp && "title" in titleProp ? titleProp.title[0] : null;

        // Extract description
        const descriptionProp = properties[descriptionProperty];
        const description =
          descriptionProp?.type === "rich_text"
            ? descriptionProp.rich_text
            : "";

        // Extract slug
        const slugProp = properties[slugProperty];
        const slug =
          slugProp?.type === "rich_text"
            ? slugProp.rich_text[0]?.plain_text
            : null;

        return (
          <div key={page.id} className="space-y-3 mb-12">
            <div>
              <Link
                href={`${linkPrefix}/${slug}`}
                className="font-heading text-xl font-semibold text-gray-900 dark:text-gray-100 hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-200"
              >
                {title?.plain_text}
              </Link>
            </div>

            <div className="font-body text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              <PageDescription
                description={description as TextRichTextItemResponse[]}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
