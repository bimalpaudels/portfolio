import NotionBlockChildrenRenderer from "@/components/NotionRenderers";
import { fetchNotionPageContent } from "@/lib";
import { Header } from "@/components";

export const metadata = {
  title: "Stack",
};
const stackPageId = process.env.STACK_PAGE_ID;

export const revalidate = 3600;

export default async function Stack() {
  if (!stackPageId) {
    throw new Error("STACK_ID is not defined in environment variables.");
  }
  const stackPage = await fetchNotionPageContent(stackPageId);

  return (
    <div className="animate-fade-in">
      <Header />
      <div className="article">
        <NotionBlockChildrenRenderer blocks={stackPage} />
      </div>
    </div>
  );
}
