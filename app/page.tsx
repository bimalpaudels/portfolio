import {
  fetchNotionPageContent,
  fetchNotionDatabase,
  fetchDatabaseContent,
} from "@/lib";
import NotionBlockChildrenRenderer, {
  NotionDBPagesRenderer,
} from "@/app/renderer";

export default async function Home() {
  if (!process.env.NOTION_PAGE_ID) {
    throw new Error("NOTION_PAGE_ID is not defined in environment variables.");
  }
  if (!process.env.NOTION_DB_ID) {
    throw new Error("NOTION_DB_ID is not defined in environment variables.");
  }
  // const resp = await fetchNotionPage(process.env.NOTION_PAGE_ID);
  // const db_resp = await fetchNotionDatabase(process.env.NOTION_DB_ID);
  // console.log(db_resp);
  // console.log(resp.results);
  const db_content_resp = await fetchDatabaseContent(process.env.NOTION_DB_ID);
  console.log(db_content_resp.results);
  return (
    <div>
      <NotionDBPagesRenderer pages={db_content_resp.results} />
    </div>
  );
}

export const dynamic = 'force-dynamic';
