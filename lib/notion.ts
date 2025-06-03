import { Client } from "@notionhq/client";
import {
  PageObjectResponse,
  BlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_KEY,
});

// Basic page and block operations
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

// Generic database query function
export async function fetchDatabasePages(
  databaseId: string,
  statusFilter: string = "Published"
): Promise<PageObjectResponse[]> {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "Status",
      status: {
        equals: statusFilter,
      },
    },
  });

  return response.results.filter(
    (item): item is PageObjectResponse =>
      "properties" in item && "parent" in item
  );
}

// Convenience functions using environment variables
export async function fetchDatabaseContent(): Promise<PageObjectResponse[]> {
  const notionDbId = process.env.NOTION_DB_ID;
  if (!notionDbId) {
    throw new Error("NOTION_DB_ID is not defined in environment variables.");
  }
  return fetchDatabasePages(notionDbId);
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
  return fetchDatabasePages(notionProjectsDbId);
}

// Generic page by slug function
export async function fetchPageBySlug(
  slug: string,
  databaseId?: string
): Promise<PageObjectResponse> {
  const dbId = databaseId || process.env.NOTION_DB_ID;
  if (!dbId) {
    throw new Error(
      "Database ID is not provided or NOTION_DB_ID is not defined in environment variables."
    );
  }

  const response = await notion.databases.query({
    database_id: dbId,
    filter: {
      property: "slug",
      rich_text: {
        equals: slug,
      },
    },
  });
  return response.results[0] as PageObjectResponse;
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
  return fetchPageBySlug(slug, notionProjectsDbId);
}
