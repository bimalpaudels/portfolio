import NotionBlockChildrenRenderer from "@/app/renderer";
import { fetchNotionPageContent } from "@/lib";
import { Header } from "@/app/componenets";

export const metadata = {
  title: "About",
};
const aboutPageId = process.env.ABOUT_PAGE_ID;

export const revalidate = 3600;

export default async function Stack() {
  if (!aboutPageId) {
    throw new Error("ABOUT_PAGE_ID is not defined in environment variables.");
  }
  const stackPage = await fetchNotionPageContent(aboutPageId);

  return (
    <div className="animate-fade-in">
      <Header />
      <div className="article">
        <NotionBlockChildrenRenderer blocks={stackPage} />
      </div>
    </div>
  );
}
