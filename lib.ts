import { Client } from "@notionhq/client";
import {
  PageObjectResponse,
  BlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
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

export async function fetchNotionPageContent(
  pageId: string
): Promise<BlockObjectResponse[]> {
  const response = await notion.blocks.children.list({ block_id: pageId });
  return response.results as BlockObjectResponse[];
}

export async function fetchNotionDatabase(pageId: string) {
  const response = await notion.databases.retrieve({ database_id: pageId });
  return response;
}

export async function fetchDatabaseContent(): Promise<PageObjectResponse[]> {
  const notionDbId = process.env.NOTION_DB_ID;
  if (!notionDbId) {
    throw new Error("NOTION_DB_ID is not defined in environment variables.");
  }

  const response = await notion.databases.query({
    database_id: notionDbId,
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
}

export async function fetchPageBySlug(
  slug: string
): Promise<PageObjectResponse> {
  const notionDbId = process.env.NOTION_DB_ID;
  if (!notionDbId) {
    throw new Error("NOTION_DB_ID is not defined in environment variables.");
  }
  const response = await notion.databases.query({
    database_id: notionDbId,
    filter: {
      property: "slug",
      rich_text: {
        equals: slug,
      },
    },
  });
  return response.results[0] as PageObjectResponse;
}

export async function fetchProjectsDatabaseContent(): Promise<
  PageObjectResponse[]
> {
  const notionProjectsDbId = process.env.NOTION_PROJECTS_DB_ID;
  if (!notionProjectsDbId) {
    throw new Error(
      "NOTION_PROJECTS_DB_ID is not defined in environment variables."
    );
  }

  const response = await notion.databases.query({
    database_id: notionProjectsDbId,
    filter: {
      property: "Status",
      status: {
        equals: "Published",
      },
    },
  });
  console.log(response);
  return response.results.filter(
    (item): item is PageObjectResponse =>
      "properties" in item && "parent" in item
  );
}

export async function fetchProjectBySlug(
  slug: string
): Promise<PageObjectResponse> {
  const notionProjectsDbId = process.env.NOTION_PROJECTS_DB_ID;
  if (!notionProjectsDbId) {
    throw new Error(
      "NOTION_PROJECTS_DB_ID is not defined in environment variables."
    );
  }
  const response = await notion.databases.query({
    database_id: notionProjectsDbId,
    filter: {
      property: "slug",
      rich_text: {
        equals: slug,
      },
    },
  });
  return response.results[0] as PageObjectResponse;
}
