import { Client } from "@notionhq/client";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
const notion = new Client({
  auth: process.env.NOTION_KEY,
});

export async function fetchPageProperties(pageId: string) {
  const response = await notion.pages.retrieve({ page_id: pageId });
  if ("properties" in response) {
    return response.properties;
  } else {
    throw new Error("The response does not contain properties");
  }
}

export async function fetchNotionPageContent(pageId: string) {
  const response = await notion.blocks.children.list({ block_id: pageId });
  return response;
}

export async function fetchNotionDatabase(pageId: string) {
  const response = await notion.databases.retrieve({ database_id: pageId });
  return response;
}

export async function fetchDatabaseContent(
  pageId: string
): Promise<PageObjectResponse[]> {
  const response = await notion.databases.query({
    database_id: pageId,
    filter: {
      property: "Status",
      status: {
        equals: "Published",
      },
    },
  });

  return response.results.filter(
    (item): item is PageObjectResponse =>
      "properties" in item && "parent" in item
  );
  // return response.results as PageObjectResponse[]
}
