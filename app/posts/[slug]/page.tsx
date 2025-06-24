import {
  fetchNotionPageContent,
  fetchDatabaseContent,
  fetchPageBySlug,
} from "@/lib";
import { notFound } from "next/navigation";
import {
  MultiSelectPropertyItemObjectResponse,
  LastEditedTimePropertyItemObjectResponse,
  PageObjectResponse,
  TextRichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { NotionTags, LastUpdated } from "@/components";
import { Header } from "@/components";
import { NotionBlockRenderer } from "@/components";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const dynamicParams = true;

export async function generateStaticParams() {
  const pages = await fetchDatabaseContent();
  return pages.map((page: PageObjectResponse) => ({
    slug:
      page.properties.slug.type === "rich_text"
        ? page.properties.slug.rich_text[0].plain_text
        : null,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  try {
    const { slug } = await params;
    const page = await fetchPageBySlug(slug);

    if (!page) {
      return {
        title: "Post Not Found",
        description: "The requested post could not be found.",
      };
    }

    const { properties } = page;
    const title =
      "title" in properties.Title
        ? properties.Title.title[0]?.plain_text || "Post"
        : "Post";

    const description =
      properties.Description?.type === "rich_text" &&
      properties.Description.rich_text[0]
        ? properties.Description.rich_text[0].plain_text
        : `Read ${title} by Bimal Paudel - insights on software development.`;

    const tags =
      properties.Tags?.type === "multi_select"
        ? properties.Tags.multi_select.map((tag) => tag.name)
        : [];

    return {
      title,
      description,
      keywords: [...tags, "Bimal Paudel", "Blog", "Development"],
      authors: [{ name: "Bimal Paudel", url: "https://bimals.net" }],
      alternates: {
        canonical: `/posts/${slug}`,
      },
    };
  } catch {
    return {
      title: "Post Not Found",
      description: "The requested post could not be found.",
    };
  }
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: PageProps) {
  try {
    const { slug } = await params;
    const page = await fetchPageBySlug(slug);
    if (!page) {
      notFound();
    }
    const { properties, id } = page;
    const postContent = await fetchNotionPageContent(id);

    const titleItem =
      "title" in properties.Title ? properties.Title.title[0] : null;

    if (!titleItem || titleItem.type !== "text") {
      notFound();
    }

    const title = titleItem as TextRichTextItemResponse;

    // Format data for consistent components
    const lastEditedForNotionComponent = {
      last_edited_time: page.last_edited_time,
    };

    return (
      <div className="animate-fade-in">
        <Header />

        {/* Back Navigation */}
        <div className="mb-6">
          <Link
            href="/posts"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Posts
          </Link>
        </div>

        {/* Post Header */}
        <div className="article mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                {title.plain_text}
              </h1>
            </div>
          </div>

          {/* Tags using NotionTags component */}
          {properties.Tags && (
            <div className="mb-6">
              <NotionTags
                tags={properties.Tags as MultiSelectPropertyItemObjectResponse}
              />
            </div>
          )}

          {/* Last Updated using LastUpdated component */}
          <div className="pb-6 border-b border-gray-200 dark:border-gray-800">
            <LastUpdated
              updated={
                lastEditedForNotionComponent as LastEditedTimePropertyItemObjectResponse
              }
            />
          </div>
        </div>

        {/* Post Content */}
        <div className="article">
          <NotionBlockRenderer blocks={postContent} />
        </div>
      </div>
    );
  } catch {
    return (
      <div className="animate-fade-in">
        <Header />
        <div className="article">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Post Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            The post you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
          <Link
            href="/posts"
            className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Posts
          </Link>
        </div>
      </div>
    );
  }
}
