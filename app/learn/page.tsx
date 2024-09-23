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

export const revalidate = 3600;

export default async function Learn() {
  if (!learnPageIdd) {
    throw new Error("LEARN_PAGE_ID is not defined in environment variables.");
  }
  const learnPage = await fetchNotionPageContent(learnPageIdd);
  const db_content_response = await fetchDatabaseContent();
  return (
    <>
      <Header />
      <NotionBlockChildrenRenderer blocks={learnPage} />
      <NotionDBPagesRenderer pages={db_content_response} />
    </>
  );
}
