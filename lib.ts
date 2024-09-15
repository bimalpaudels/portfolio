import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_KEY,
});

export async function fetchNotionPage(pageId: string) {
  const response = await notion.blocks.children.list({ block_id: pageId });
  console.log(response);
  return response;
}
