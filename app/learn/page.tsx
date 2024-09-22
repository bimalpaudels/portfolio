import { fetchDatabaseContent } from "@/lib";
import { NotionDBPagesRenderer } from "@/app/renderer";
import { Header } from "@/app/componenets";

export const metadata = {
  title: "Learn",
  alternates: {
    canonical: "/learn",
  },
};

export default async function Home() {
  if (!process.env.NOTION_PAGE_ID) {
    throw new Error("NOTION_PAGE_ID is not defined in environment variables.");
  }
  if (!process.env.NOTION_DB_ID) {
    throw new Error("NOTION_DB_ID is not defined in environment variables.");
  }
  const db_content_response = await fetchDatabaseContent(
    process.env.NOTION_DB_ID
  );
  return (
    <>
      <Header />

      <h2>Learnings</h2>
      <div className="space-y-4">
        <p>
          This is the space where I will publish articles and snippets on all
          things I learn and implement, hopefully for a long time.
        </p>
        <p>
          Some articles are descriptive whereas, some are just code snippets and
          may lack clarity.
        </p>
      </div>

      <div className="mt-10 space-y-10">
        <NotionDBPagesRenderer pages={db_content_response} />
      </div>
    </>
  );
}

export const dynamic = "force-dynamic";
