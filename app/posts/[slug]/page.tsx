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
import { NotionBlockRenderer } from "@/components";

import { Link } from "next-view-transitions";

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
        {/* Post Header */}
        <div className="article mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-substack">
                {title.plain_text}
              </h1>
            </div>
          </div>
        </div>

        {/* Post Content */}
        <div className="article font-substack">
          <NotionBlockRenderer blocks={postContent} />
        </div>

        {/* Post Meta at the end */}
        <div className=" pt-4 mt-2 space-y-4">
          {/* Last Updated */}
          <LastUpdated
            updated={
              lastEditedForNotionComponent as LastEditedTimePropertyItemObjectResponse
            }
          />

          {/* Separator line */}
          <div className="border-t border-gray-200 dark:border-gray-800 mb-32 pt-4">
            {/* Tags */}
            {properties.Tags && (
              <NotionTags
                tags={properties.Tags as MultiSelectPropertyItemObjectResponse}
              />
            )}
          </div>
        </div>
      </div>
    );
  } catch {
    return (
      <div className="animate-fade-in">
        <div className="article">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Post Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            The post you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
        </div>
      </div>
    );
  }
}
