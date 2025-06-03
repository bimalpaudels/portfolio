import { NotionDBPagesRendererProps } from "@/types";
import { Link } from "next-view-transitions";
import { NotionTags } from "@/components";
import { MultiSelectPropertyItemObjectResponse } from "@notionhq/client/build/src/api-endpoints";

interface DatabaseGalleryViewProps extends NotionDBPagesRendererProps {
  titleProperty?: string;
  descriptionProperty?: string;
  slugProperty?: string;
  statusProperty?: string;
  tagsProperty?: string;
  linkPrefix: string;
  className?: string;
  statusColors?: Record<string, string>;
  showImage?: boolean;
}

const defaultStatusColors = {
  Live: "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800",
  "In Progress":
    "bg-sky-100 text-sky-800 border-sky-200 dark:bg-sky-900/30 dark:text-sky-300 dark:border-sky-800",
  Completed:
    "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800",
  Published:
    "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800",
  Draft:
    "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600",
  Unknown:
    "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600",
};

export default function DatabaseGalleryView({
  pages,
  titleProperty = "Name",
  descriptionProperty = "Description",
  slugProperty = "slug",
  statusProperty = "Status",
  tagsProperty = "TechStack",
  linkPrefix,
  className = "space-y-6",
  statusColors = defaultStatusColors,
  showImage = true,
}: DatabaseGalleryViewProps) {
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
            ? descriptionProp.rich_text[0]?.plain_text || ""
            : "";

        // Extract slug
        const slugProp = properties[slugProperty];
        const slug =
          slugProp?.type === "rich_text"
            ? slugProp.rich_text[0]?.plain_text
            : null;

        // Extract status
        const statusProp = properties[statusProperty];
        const status =
          statusProp?.type === "status"
            ? statusProp.status?.name || "Unknown"
            : "Unknown";

        // Extract tags/tech stack - format for NotionTags component
        const tagsProp = properties[tagsProperty];
        const tagsForNotionComponent =
          tagsProp?.type === "multi_select"
            ? { multi_select: tagsProp.multi_select }
            : { multi_select: [] };

        return (
          <div
            key={page.id}
            className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-lg dark:hover:shadow-gray-900/20 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex flex-col sm:flex-row">
              {/* Image Section - Left side on desktop, top on mobile */}
              {showImage && (
                <div className="relative w-full sm:w-48 h-48 sm:h-auto bg-gradient-to-br from-sky-50 to-emerald-50 dark:from-sky-950/30 dark:to-emerald-950/30 overflow-hidden flex-shrink-0">
                  <div className="absolute top-3 right-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium border ${
                        statusColors[status as keyof typeof statusColors] ||
                        statusColors.Unknown
                      }`}
                    >
                      {status}
                    </span>
                  </div>
                </div>
              )}

              {/* Content Section - Right side on desktop, bottom on mobile */}
              <div className="flex-1 p-6">
                {!showImage && (
                  <div className="flex justify-between items-start mb-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium border ${
                        statusColors[status as keyof typeof statusColors] ||
                        statusColors.Unknown
                      }`}
                    >
                      {status}
                    </span>
                  </div>
                )}

                <h3 className="font-heading text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors leading-tight">
                  <Link href={`${linkPrefix}/${slug}`}>
                    {title?.plain_text}
                  </Link>
                </h3>

                <p className="font-body text-gray-600 dark:text-gray-300 mb-3 text-sm leading-relaxed line-clamp-2">
                  {description}
                </p>

                {tagsForNotionComponent.multi_select.length > 0 && (
                  <div className="mb-4">
                    <NotionTags
                      tags={
                        tagsForNotionComponent as MultiSelectPropertyItemObjectResponse
                      }
                    />
                  </div>
                )}

                <div className="text-grey-800 text-base leading-normal mt-1">
                  <Link
                    href={`${linkPrefix}/${slug}`}
                    className="text-sm text-sky-500 dark:text-sky-400 hover:text-sky-600 dark:hover:text-sky-300 transition-colors duration-200 font-body"
                  >
                    View details →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
