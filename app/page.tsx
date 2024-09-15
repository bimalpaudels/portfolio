import { fetchNotionPage } from "@/lib";
import NotionRenderer from "@/app/renderer";

export default async function Home() {
  const resp = await fetchNotionPage(process.env.NOTION_PAGE_ID);
  console.log(resp.results);
  return (
    <div>
      <NotionRenderer blocks={resp.results} />
    </div>
  );
}
