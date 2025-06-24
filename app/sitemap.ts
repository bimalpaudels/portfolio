import { MetadataRoute } from "next";
import { fetchDatabaseContent, fetchProjectsDatabaseContent } from "@/lib";

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

// Function to fetch all projects from Notion
async function getAllProjects() {
  const response = await fetchProjectsDatabaseContent();

  return response.map((page) => ({
    slug:
      page.properties.slug.type === "rich_text"
        ? page.properties.slug.rich_text[0].plain_text
        : null,
    last_updated: page.last_edited_time,
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://bimals.net";

  // Fetch all posts and projects
  const posts = await getAllPosts();
  const projects = await getAllProjects();

  // Define static pages with priorities and change frequencies
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/stack`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/posts`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
  ];

  const postEntries = posts
    .filter((post) => post.slug) // Filter out posts without slugs
    .map((post) => ({
      url: `${baseUrl}/posts/${post.slug}`,
      lastModified: new Date(post.last_updated).toISOString(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  const projectEntries = projects
    .filter((project) => project.slug) // Filter out projects without slugs
    .map((project) => ({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: new Date(project.last_updated).toISOString(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  return [...staticPages, ...postEntries, ...projectEntries];
}
