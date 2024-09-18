import { fetchDatabaseContent } from "@/lib";
import { NotionDBPagesRenderer } from "@/app/renderer";

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
    <div>
      <div className="mt-12">
        <h1 className="text-2xl font-extrabold text-gray-900	mb-3">
          Writings and Snippets
        </h1>
        <div className="text-lg text-gray-800 leading-normal space-y-4">
          <p>
            This is the space where I will publish all things I learn and
            implement, hopefully for a long time.
          </p>
          <p>
            Some articles are descriptive whereas, some are just code snippets
            and may lack clarity.
          </p>
        </div>
      </div>
      <div className="mt-10 space-y-10">
        <NotionDBPagesRenderer pages={db_content_response} />
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";
