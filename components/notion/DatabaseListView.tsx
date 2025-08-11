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
}: DatabaseListViewProps) {
  return (
    <div>
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
          <div key={page.id} className="space-y-2 mb-10">
            <div>
              <Link
                href={`${linkPrefix}/${slug}`}
                className="font-heading font-semibold text-lg text-gray-900 dark:text-gray-100 transition-colors duration-200"
              >
                {title?.plain_text}
              </Link>
            </div>

            <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
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
