import { fetchNotionPageContent } from "@/lib";
import NotionBlockChildrenRenderer from "@/app/renderer";

const homePageId = process.env.HOME_PAGE_ID;

export const revalidate = 3600;

export default async function Home() {
  if (!homePageId) {
    throw new Error("STACK_ID is not defined in environment variables.");
  }
  const homePage = await fetchNotionPageContent(homePageId);
  return (
    <>
      <h2 className="font-semibold pt-12">Bimal Paudel</h2>
      <NotionBlockChildrenRenderer blocks={homePage} />
    </>
  );
}
