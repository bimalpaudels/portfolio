import { fetchProjectBySlug, fetchNotionPageContent } from "@/lib";
import { NotionBlockRenderer, NotionTags, LastUpdated } from "@/components";
import { Header } from "@/components";
import { ExternalLink, Github, ArrowLeft } from "lucide-react";
import Link from "next/link";
import {
  MultiSelectPropertyItemObjectResponse,
  LastEditedTimePropertyItemObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  try {
    const { slug } = await params;
    const project = await fetchProjectBySlug(slug);
    const title =
      project.properties.Name?.type === "title"
        ? project.properties.Name.title[0]?.plain_text || "Project"
        : "Project";

    return {
      title: title,
      alternates: {
        canonical: `/projects/${slug}`,
      },
    };
  } catch {
    return {
      title: "Project Not Found",
    };
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  try {
    const { slug } = await params;
    const project = await fetchProjectBySlug(slug);
    const content = await fetchNotionPageContent(project.id);

    // Extract project properties
    const title =
      project.properties.Name?.type === "title"
        ? project.properties.Name.title[0]?.plain_text || "Untitled Project"
        : "Untitled Project";

    const description =
      project.properties.Description?.type === "rich_text"
        ? project.properties.Description.rich_text[0]?.plain_text || ""
        : "";

    const techStackProp = project.properties.TechStack;
    const techStackForNotionComponent =
      techStackProp?.type === "multi_select"
        ? { multi_select: techStackProp.multi_select }
        : { multi_select: [] };

    const status =
      project.properties.Status?.type === "status"
        ? project.properties.Status.status?.name || "Unknown"
        : "Unknown";

    const githubUrl =
      project.properties.GitHub?.type === "url"
        ? project.properties.GitHub.url
        : null;

    const demoUrl =
      project.properties.Demo?.type === "url"
        ? project.properties.Demo.url
        : null;

    const lastEditedForNotionComponent = {
      last_edited_time: project.last_edited_time,
    };

    const statusColors = {
      Live: "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800",
      "In Progress":
        "bg-sky-100 text-sky-800 border-sky-200 dark:bg-sky-900/30 dark:text-sky-300 dark:border-sky-800",
      Completed:
        "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800",
      Unknown:
        "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600",
    };

    return (
      <div className="animate-fade-in">
        <Header />

        {/* Back Navigation */}
        <div className="mb-6">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
        </div>

        {/* Project Header */}
        <div className="article mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                {title}
              </h1>
              {description && (
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  {description}
                </p>
              )}
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium border ${
                  statusColors[status as keyof typeof statusColors]
                }`}
              >
                {status}
              </span>
            </div>
          </div>

          {/* Tech Stack using NotionTags component */}
          {techStackForNotionComponent.multi_select.length > 0 && (
            <div className="mb-6">
              <NotionTags
                tags={
                  techStackForNotionComponent as MultiSelectPropertyItemObjectResponse
                }
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mb-6">
            {githubUrl && (
              <a
                href={githubUrl}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-4 h-4" />
                View Code
              </a>
            )}
            {demoUrl && (
              <a
                href={demoUrl}
                className="inline-flex items-center gap-2 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            )}
          </div>

          {/* Last Updated using LastUpdated component */}
          <div className="pb-6 border-b border-gray-200 dark:border-gray-800">
            <LastUpdated
              updated={
                lastEditedForNotionComponent as LastEditedTimePropertyItemObjectResponse
              }
            />
          </div>
        </div>

        {/* Project Content */}
        <div className="article">
          <NotionBlockRenderer blocks={content} />
        </div>
      </div>
    );
  } catch {
    return (
      <div className="animate-fade-in">
        <Header />
        <div className="article">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Project Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            The project you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }
}
