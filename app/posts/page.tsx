import { fetchDatabaseContent } from "@/lib";
import NotionBlockChildrenRenderer, {
  NotionDBPagesRenderer,
} from "@/app/renderer";
import { Header } from "@/app/componenets";
import { fetchNotionPageContent } from "@/lib";

export const metadata = {
  title: "Posts",
  alternates: {
    canonical: "/posts",
  },
};
const learnPageIdd = process.env.LEARN_PAGE_ID;

export const revalidate = 300;

export default async function Learn() {
  if (!learnPageIdd) {
    throw new Error("LEARN_PAGE_ID is not defined in environment variables.");
  }
  const learnPage = await fetchNotionPageContent(learnPageIdd);
  const db_content_response = await fetchDatabaseContent();
  return (
    <>
      <Header />
      <div className="article">
        <NotionBlockChildrenRenderer blocks={learnPage} />
      </div>
      <div className="space-y-8 pt-2">
        <NotionDBPagesRenderer pages={db_content_response} />
      </div>
    </>
  );
}
