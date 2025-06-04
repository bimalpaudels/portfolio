import { fetchNotionPageContent } from "@/lib";
import { NotionBlockRenderer, HomeNavigation } from "@/components";

const homePageId = process.env.HOME_PAGE_ID;

export const revalidate = 3600;

export default async function Home() {
  if (!homePageId) {
    throw new Error("HOME_PAGE_ID is not defined in environment variables.");
  }
  const homePage = await fetchNotionPageContent(homePageId);
  return (
    <div className="animate-fade-in">
      <h2 className="font-heading font-semibold pt-12 text-gray-900 dark:text-gray-100">
        Bimal Paudel
      </h2>

      <NotionBlockRenderer blocks={homePage} />

      {/* Horizontal Navigation and Social Links Sections */}
      <HomeNavigation />
    </div>
  );
}
