import {
  fetchNotionPageContent,
  fetchDatabaseContent,
  fetchPageBySlug,
} from "@/lib";
import NotionBlockChildrenRenderer from "@/app/renderer";
import { notFound } from "next/navigation";
import {
  MultiSelectPropertyItemObjectResponse,
  LastEditedTimePropertyItemObjectResponse,
  PageObjectResponse,
  TextRichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { NotionPageTitle, PostMeta } from "@/app/components";
import { Header } from "@/app/components";

export const revalidate = 300;
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

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: PageProps) {
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

  return (
    <div className="animate-fade-in">
      <Header />
      <div>
        <NotionPageTitle title={title} />
        <div className="article">
          <NotionBlockChildrenRenderer blocks={postContent} />
        </div>
        <PostMeta
          updated={
            properties.Updated as LastEditedTimePropertyItemObjectResponse
          }
          tags={properties.Tags as MultiSelectPropertyItemObjectResponse}
        />
      </div>
    </div>
  );
}
