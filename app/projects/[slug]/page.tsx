import { fetchProjectBySlug, fetchNotionPageContent } from "@/lib";
import NotionBlockChildrenRenderer from "@/app/renderer";
import { Header } from "@/app/components";
import { ExternalLink, Github, Calendar, Tag, ArrowLeft } from "lucide-react";
import Link from "next/link";

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

    const techStack =
      project.properties.TechStack?.type === "multi_select"
        ? project.properties.TechStack.multi_select.map(
            (tech: { name: string }) => tech.name
          )
        : [];

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

    const lastEdited = project.last_edited_time;

    const statusColors = {
      Live: "bg-emerald-100 text-emerald-800 border-emerald-200",
      "In Progress": "bg-sky-100 text-sky-800 border-sky-200",
      Completed: "bg-purple-100 text-purple-800 border-purple-200",
      Unknown: "bg-gray-100 text-gray-800 border-gray-200",
    };

    return (
      <div className="animate-fade-in">
        <Header />

        {/* Back Navigation */}
        <div className="mb-6">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
        </div>

        {/* Project Header */}
        <div className="article mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-3">{title}</h1>
              {description && (
                <p className="text-lg text-gray-600">{description}</p>
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

          {/* Tech Stack */}
          {techStack.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Tag className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">
                  Tech Stack
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech: string) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-gradient-to-r from-sky-50 to-emerald-50 text-gray-700 rounded-lg text-sm border border-gray-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
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

          {/* Last Updated */}
          <div className="flex items-center gap-2 text-sm text-gray-500 pb-6 border-b border-gray-200">
            <Calendar className="w-4 h-4" />
            Last updated {new Date(lastEdited).toLocaleDateString()}
          </div>
        </div>

        {/* Project Content */}
        <div className="article">
          <NotionBlockChildrenRenderer blocks={content} />
        </div>
      </div>
    );
  } catch {
    return (
      <div className="animate-fade-in">
        <Header />
        <div className="article">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Project Not Found
          </h1>
          <p className="text-gray-600 mb-6">
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
