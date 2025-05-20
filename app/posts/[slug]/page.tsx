import NotionBlockChildrenRenderer from "@/app/renderer";
import {
  fetchNotionPageContent,
  fetchDatabaseContent,
  fetchPageBySlug,
} from "@/lib";
import {
  MultiSelectPropertyItemObjectResponse,
  TextRichTextItemResponse,
  LastEditedTimePropertyItemObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { NotionTags, NotionPageTitle, LastUpdated } from "@/app/componenets";
import { Header } from "@/app/componenets";

export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  const pages = await fetchDatabaseContent();
  return pages.map((page) => ({
    slug:
      page.properties.slug.type === "rich_text"
        ? page.properties.slug.rich_text[0].plain_text
        : null,
  }));
}

type PageProps = {
  params: Promise<{ slug: string }>
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const page = await fetchPageBySlug(slug);
  const { properties, id } = page;
  const postContent = await fetchNotionPageContent(id);

  const title = "title" in properties.Title ? properties.Title.title[0] : null;
  return (
    <>
      <Header />
      <div>
        <NotionPageTitle title={title as TextRichTextItemResponse} />
        <div className="article">
          <NotionBlockChildrenRenderer blocks={postContent} />
        </div>
        <LastUpdated
          updated={
            properties.Updated as LastEditedTimePropertyItemObjectResponse
          }
        />
        <NotionTags
          tags={properties.Tags as MultiSelectPropertyItemObjectResponse}
        />
      </div>
    </>
  );
}
