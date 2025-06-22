import {
  fetchProjectBySlug,
  fetchNotionPageContent,
  fetchProjectsDatabaseContent,
  transformImageUrl,
} from "@/lib";
import { NotionBlockRenderer, NotionTags, LastUpdated } from "@/components";
import { Header } from "@/components";
import { ExternalLink, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { SiGithub } from "@icons-pack/react-simple-icons";
import {
  MultiSelectPropertyItemObjectResponse,
  LastEditedTimePropertyItemObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  const projects = await fetchProjectsDatabaseContent();
  return projects
    .map((project: PageObjectResponse) => ({
      slug:
        project.properties.slug?.type === "rich_text"
          ? project.properties.slug.rich_text[0]?.plain_text
          : null,
    }))
    .filter((param) => param.slug !== null);
}

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

    // Extract cover image from project object
    const cover = project.cover;
    const coverUrl =
      cover?.type === "file"
        ? cover.file.url
        : cover?.type === "external"
        ? cover.external.url
        : null;

    return (
      <div className="animate-fade-in">
        <Header />

        {/* Back Navigation */}
        <div className="mb-6">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
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
          </div>

          {/* Cover Image Banner */}
          {coverUrl && (
            <div className="relative w-full h-64 md:h-80 mb-6 rounded-xl overflow-hidden">
              <Image
                unoptimized
                src={transformImageUrl(coverUrl, {})}
                alt={title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                priority
              />
            </div>
          )}

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

          {/* Links Section */}
          {(githubUrl || demoUrl) && (
            <div className="mb-6">
              <div className="flex items-center gap-4">
                {githubUrl && (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
                  >
                    <SiGithub className="w-4 h-4" />
                    <span className="text-sm">View Code</span>
                  </a>
                )}
                {demoUrl && (
                  <a
                    href={demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-sky-600 dark:text-gray-400 dark:hover:text-sky-400 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-sm">Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Last Updated using LastUpdated component */}
          <div className="pb-6 border-b border-gray-200 dark:border-gray-800 mt-6">
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
