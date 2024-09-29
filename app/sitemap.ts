import { MetadataRoute } from "next";
import { fetchDatabaseContent } from "@/lib";

export const revalidate = 3600;

// Function to fetch all blog posts from Notion
async function getAllPosts() {
  const response = await fetchDatabaseContent();

  return response.map((page) => ({
    slug:
      page.properties.slug.type === "rich_text"
        ? page.properties.slug.rich_text[0].plain_text
        : null,
    last_updated:
      page.properties.Updated.type === "last_edited_time"
        ? page.properties.Updated.last_edited_time
        : new Date(),
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://bimals.net";

  // Fetch all blog posts
  const posts = await getAllPosts();

  // Define static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/stack`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/posts`,
      lastModified: new Date().toISOString(),
    },
  ];

  const postEntries = posts.map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: new Date(post.last_updated).toISOString(),
  }));

  return [...staticPages, ...postEntries];
}
