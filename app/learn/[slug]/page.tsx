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

export const metadata = {
  title: "Post",
};

export const revalidate = 60;
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

export default async function Page({ params }: { params: { slug: string } }) {
  const page = await fetchPageBySlug(params.slug);
  const { properties, id } = page;
  const postContent = await fetchNotionPageContent(id);

  const title = "title" in properties.Title ? properties.Title.title[0] : null;
  return (
    <>
      <Header />
      <NotionPageTitle title={title as TextRichTextItemResponse} />
      <div className="article">
        <NotionBlockChildrenRenderer blocks={postContent} />
      </div>
      <LastUpdated
        updated={properties.Updated as LastEditedTimePropertyItemObjectResponse}
      />
      <NotionTags
        tags={properties.Tags as MultiSelectPropertyItemObjectResponse}
      />
    </>
  );
}
