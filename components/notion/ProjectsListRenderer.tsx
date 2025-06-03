import { NotionDBPagesRendererProps } from "@/types";
import { Link } from "next-view-transitions";

const statusColors = {
  Live: "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800",
  "In Progress":
    "bg-sky-100 text-sky-800 border-sky-200 dark:bg-sky-900/30 dark:text-sky-300 dark:border-sky-800",
  Completed:
    "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800",
  Unknown:
    "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600",
};

export default function ProjectsListRenderer({
  pages,
}: NotionDBPagesRendererProps) {
  return (
    <div className="space-y-6">
      {pages.map((page) => {
        const { properties } = page;
        const title =
          "title" in properties.Name ? properties.Name.title[0] : null;
        const description =
          properties.Description?.type === "rich_text"
            ? properties.Description.rich_text[0]?.plain_text || ""
            : "";
        const slug =
          properties.slug?.type === "rich_text"
            ? properties.slug.rich_text[0]?.plain_text
            : null;
        const status =
          properties.Status?.type === "status"
            ? properties.Status.status?.name || "Unknown"
            : "Unknown";
        const techStack =
          properties.TechStack?.type === "multi_select"
            ? properties.TechStack.multi_select.map(
                (tech: { name: string }) => tech.name
              )
            : [];

        return (
          <div
            key={page.id}
            className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-lg dark:hover:shadow-gray-900/20 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex flex-col sm:flex-row">
              {/* Image Section - Left side on desktop, top on mobile */}
              <div className="relative w-full sm:w-48 h-48 sm:h-auto bg-gradient-to-br from-sky-50 to-emerald-50 dark:from-sky-950/30 dark:to-emerald-950/30 overflow-hidden flex-shrink-0">
                <div className="absolute top-3 right-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium border ${
                      statusColors[status as keyof typeof statusColors]
                    }`}
                  >
                    {status}
                  </span>
                </div>
              </div>

              {/* Content Section - Right side on desktop, bottom on mobile */}
              <div className="flex-1 p-6">
                <h3 className="font-heading text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors leading-tight">
                  <Link href={`/projects/${slug}`}>{title?.plain_text}</Link>
                </h3>

                <p className="font-body text-gray-600 dark:text-gray-300 mb-3 text-sm leading-relaxed line-clamp-2">
                  {description}
                </p>

                {techStack.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {techStack.slice(0, 4).map((tech: string) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {techStack.length > 4 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-xs font-medium">
                        +{techStack.length - 4}
                      </span>
                    )}
                  </div>
                )}

                <div className="text-grey-800 text-base leading-normal mt-1">
                  <Link
                    href={`/projects/${slug}`}
                    className="text-sm text-sky-500 dark:text-sky-400 hover:text-sky-600 dark:hover:text-sky-300 transition-colors duration-200 font-body"
                  >
                    View project →
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
