import { fetchDatabaseContent, fetchNotionPageContent } from "@/lib";
import { PostsListRenderer, NotionBlockRenderer } from "@/components";
import { Header } from "@/components";

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
    <div className="animate-fade-in">
      <Header />
      <div className="article">
        <NotionBlockRenderer blocks={learnPage} />
      </div>
      <div className="space-y-8 pt-8 animate-slide-in">
        <PostsListRenderer pages={db_content_response} />
      </div>
    </div>
  );
}
