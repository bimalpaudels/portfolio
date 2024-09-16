import { fetchNotionPage } from "@/lib";
import NotionRenderer from "@/app/renderer";

export default async function Home() {
  if (!process.env.NOTION_PAGE_ID) {
    throw new Error("NOTION_PAGE_ID is not defined in environment variables.");
  }
  const resp = await fetchNotionPage(process.env.NOTION_PAGE_ID);

  console.log(resp.results);
  return (
    <div>
      <NotionRenderer blocks={resp.results} />
    </div>
  );
}

export const dynamic = 'force-dynamic';
