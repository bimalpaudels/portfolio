import NotionBlockChildrenRenderer from "@/app/renderer";
import { fetchNotionPageContent } from "@/lib";
import { Header } from "@/app/componenets";

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
    <>
      <Header />
      <NotionBlockChildrenRenderer blocks={stackPage} />
    </>
  );
}
