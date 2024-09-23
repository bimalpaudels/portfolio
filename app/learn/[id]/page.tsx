import NotionBlockChildrenRenderer from "@/app/renderer";
import { fetchNotionPageContent, fetchPageProperties } from "@/lib";
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

export default async function Page({ params }: { params: { id: string } }) {
  const resp = await fetchNotionPageContent(params.id);
  const properties = await fetchPageProperties(params.id);
  const title = "title" in properties.Title ? properties.Title.title[0] : null;
  return (
    <>
      <Header />
      <NotionPageTitle title={title as TextRichTextItemResponse} />
      <NotionBlockChildrenRenderer blocks={resp} />
      <LastUpdated
        updated={properties.Updated as LastEditedTimePropertyItemObjectResponse}
      />
      <NotionTags
        tags={properties.Tags as MultiSelectPropertyItemObjectResponse}
      />
    </>
  );
}
