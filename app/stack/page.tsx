import { NotionBlockRenderer } from "@/components";
import { fetchNotionPageContent } from "@/lib";
import { Header } from "@/components";

export const metadata = {
  title: "Stack",
};
const stackPageId = process.env.STACK_PAGE_ID;

export default async function Stack() {
  if (!stackPageId) {
    throw new Error("STACK_ID is not defined in environment variables.");
  }
  const stackPage = await fetchNotionPageContent(stackPageId);

  return (
    <div className="animate-fade-in">
      <Header />
      <div className="article">
        <NotionBlockRenderer blocks={stackPage} />
      </div>
    </div>
  );
}
