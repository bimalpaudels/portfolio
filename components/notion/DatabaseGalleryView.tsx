import { NotionDBPagesRendererProps } from "@/types";
import { Link } from "next-view-transitions";
import { siGithub } from "simple-icons";
import { NotionTags } from "@/components";
import { MultiSelectPropertyItemObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { transformImageUrl } from "@/lib/utils";

interface DatabaseGalleryViewProps extends NotionDBPagesRendererProps {
  titleProperty?: string;
  descriptionProperty?: string;
  slugProperty?: string;
  tagsProperty?: string;
  linkPrefix: string;
  className?: string;
  showImage?: boolean;
}

export default function DatabaseGalleryView({
  pages,
  titleProperty = "Name",
  descriptionProperty = "Description",
  slugProperty = "slug",
  tagsProperty = "TechStack",
  linkPrefix,
  className = "space-y-6",
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

        // Extract tags/tech stack - format for NotionTags component
        const tagsProp = properties[tagsProperty];
        const tagsForNotionComponent =
          tagsProp?.type === "multi_select"
            ? { multi_select: tagsProp.multi_select }
            : { multi_select: [] };

        // Extract cover image from page object as thumbnail
        const thumbnail = page.cover;
        const thumbnailUrl =
          thumbnail?.type === "file"
            ? thumbnail.file.url
            : thumbnail?.type === "external"
            ? thumbnail.external.url
            : null;

        // Extract GitHub and Demo URLs
        const githubUrl =
          page.properties.GitHub?.type === "url"
            ? page.properties.GitHub.url
            : null;

        const demoUrl =
          page.properties.Demo?.type === "url"
            ? page.properties.Demo.url
            : null;

        return (
          <div
            key={page.id}
            className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-lg dark:hover:shadow-gray-900/20 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex flex-col sm:flex-row h-auto sm:h-40">
              {/* Image Section - Left side on desktop, top on mobile */}
              {showImage && (
                <div className="relative w-full sm:w-48 h-32 sm:h-full overflow-hidden flex-shrink-0">
                  {thumbnailUrl ? (
                    // Show thumbnail image if available
                    <Image
                      src={transformImageUrl(thumbnailUrl, {
                        width: 400,
                        crop: true,
                      })}
                      alt={title?.plain_text || "Project thumbnail"}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 192px"
                    />
                  ) : (
                    // Fall back to gradient background if no thumbnail
                    <div className="w-full h-full bg-gradient-to-br from-sky-50 to-emerald-50 dark:from-sky-950/30 dark:to-emerald-950/30" />
                  )}
                </div>
              )}

              {/* Content Section - Right side on desktop, bottom on mobile */}
              <div className="flex-1 p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-heading text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors leading-tight flex-1">
                    <Link href={`${linkPrefix}/${slug}`}>
                      {title?.plain_text}
                    </Link>
                  </h3>

                  {/* Project Links */}
                  {(githubUrl || demoUrl) && (
                    <div className="flex items-center gap-2 ml-3">
                      {githubUrl && (
                        <a
                          href={githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
                          title="View Code"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24">
                            <path d={siGithub.path} fill={`#${siGithub.hex}`} />
                          </svg>
                        </a>
                      )}
                      {demoUrl && (
                        <a
                          href={demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-gray-500 hover:text-sky-600 dark:text-gray-400 dark:hover:text-sky-400 transition-colors"
                          title="Live Demo"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  )}
                </div>

                <p className="font-body text-gray-600 dark:text-gray-300 mb-3 text-sm leading-relaxed line-clamp-2">
                  {description}
                </p>

                {tagsForNotionComponent.multi_select.length > 0 && (
                  <div className="mb-3 sm:hidden">
                    <NotionTags
                      tags={
                        tagsForNotionComponent as MultiSelectPropertyItemObjectResponse
                      }
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
