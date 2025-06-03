import { fetchDatabaseContent } from "@/lib";
import { PostsListRenderer } from "@/components";
import { Header } from "@/components";

export const metadata = {
  title: "Posts",
  alternates: {
    canonical: "/posts",
  },
};

export const revalidate = 300;

export default async function Learn() {
  const db_content_response = await fetchDatabaseContent();
  return (
    <div className="animate-fade-in">
      <Header />
      <div className="space-y-8 pt-8 animate-slide-in">
        <PostsListRenderer pages={db_content_response} />
      </div>
    </div>
  );
}
