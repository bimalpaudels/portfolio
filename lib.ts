import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_KEY,
});

export async function fetchPageProperties(pageId: string) {
  const response = await notion.pages.retrieve({ page_id: pageId });
  return response;
}

export async function fetchNotionPageContent(pageId: string) {
  const response = await notion.blocks.children.list({ block_id: pageId });
  return response;
}

export async function fetchNotionDatabase(pageId: string) {
  const response = await notion.databases.retrieve({ database_id: pageId });
  return response;
}

export async function fetchDatabaseContent(pageId: string) {
  const response = await notion.databases.query({
    database_id: pageId,
  });
  return response;
}
