import { fetchDatabaseContent } from "@/lib";
import { DatabaseListView, PageHeader } from "@/components";

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
    <div className="animate-fade-in px-1">
      <PageHeader currentPage="posts" />
      <div className="space-y-8 animate-slide-in pt-6">
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
