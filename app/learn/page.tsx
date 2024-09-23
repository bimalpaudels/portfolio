import { fetchDatabaseContent } from "@/lib";
import NotionBlockChildrenRenderer, {
  NotionDBPagesRenderer,
} from "@/app/renderer";
import { Header } from "@/app/componenets";
import { fetchNotionPageContent } from "@/lib";

export const metadata = {
  title: "Learn",
  alternates: {
    canonical: "/learn",
  },
};
const learnPageIdd = process.env.LEARN_PAGE_ID;
const notionDbId = process.env.NOTION_DB_ID;

export const revalidate = 3600;

export default async function Learn() {
  if (!notionDbId) {
    throw new Error("NOTION_DB_ID is not defined in environment variables.");
  }
  if (!learnPageIdd) {
    throw new Error("LEARN_PAGE_ID is not defined in environment variables.");
  }
  const learnPage = await fetchNotionPageContent(learnPageIdd);
  const db_content_response = await fetchDatabaseContent(notionDbId);
  return (
    <>
      <Header />
      <NotionBlockChildrenRenderer blocks={learnPage} />
      <NotionDBPagesRenderer pages={db_content_response} />
    </>
  );
}
