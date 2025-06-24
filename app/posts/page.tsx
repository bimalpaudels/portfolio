import { fetchDatabaseContent } from "@/lib";
import { DatabaseListView } from "@/components";
import { Header } from "@/components";

export const metadata = {
  title: "Blog Posts by Bimal Paudel",
  description:
    "Explore articles and insights on web development, technology, programming, and continuous learning.",
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

export default async function Learn() {
  const db_content_response = await fetchDatabaseContent();
  return (
    <div className="animate-fade-in">
      <Header />
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        Posts
      </h1>
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
