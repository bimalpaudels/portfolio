import { fetchDatabaseContent } from "@/lib";
import { DatabaseListView } from "@/components";
import { Header } from "@/components";

export const metadata = {
  title: "Blog Posts by Bimal Paudel",
  description:
    "Explore articles and insights on web development, technology, programming, and continuous learning. Stay updated with the latest trends and best practices in software development.",
  keywords: [
    "Blog",
    "Posts",
    "Web Development",
    "Technology",
    "Programming",
    "Bimal Paudel",
    "Articles",
    "Tutorials",
  ],
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
        <DatabaseListView
          pages={db_content_response}
          titleProperty="Title"
          descriptionProperty="Description"
          slugProperty="slug"
          linkPrefix="/posts"
        />
      </div>
    </div>
  );
}
