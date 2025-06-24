import { NotionBlockRenderer } from "@/components";
import { fetchNotionPageContent } from "@/lib";
import { Header } from "@/components";

export const metadata = {
  title: "About Bimal Paudel",
  description:
    "Learn more about Bimal Paudel - a full-stack developer passionate about building modern web applications and sharing knowledge about technology and development.",
  keywords: ["Bimal Paudel", "About", "Developer", "Full Stack"],
  alternates: {
    canonical: "/about",
  },
};
const aboutPageId = process.env.ABOUT_PAGE_ID;

export default async function Stack() {
  if (!aboutPageId) {
    throw new Error("ABOUT_PAGE_ID is not defined in environment variables.");
  }
  const stackPage = await fetchNotionPageContent(aboutPageId);

  return (
    <div className="animate-fade-in">
      <Header />
      <div className="article">
        <NotionBlockRenderer blocks={stackPage} />
      </div>
    </div>
  );
}
