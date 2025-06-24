import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { createHmac, timingSafeEqual } from "crypto";
import { getSlugByPageId } from "./notion";

// Utility function for merging Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Date formatting utilities
export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatDateShort(date: string | Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// String utilities
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + "...";
}

// Environment variable helpers
export function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not defined in environment variables.`);
  }
  return value;
}

// Cloudinary utility to transform image url
export function transformImageUrl(
  fullUrl: string,
  { width, crop = false }: { width?: number; crop?: boolean }
): string {
  const transforms = [
    "f_auto",
    "q_auto",
    ...(width ? [`w_${width}`] : []),
    ...(crop ? ["c_thumb", "g_auto"] : []),
  ].join(",");
  const cloudinaryUrl = "https://res.cloudinary.com";
  const url = new URL(fullUrl);
  const path = url.pathname.replace("/upload/", `/upload/${transforms}/`);
  return cloudinaryUrl + path;
}

/**
 * Validates the webhook signature to ensure the request is from Notion
 */
export function validateWebhookSignature(
  body: string,
  signature: string,
  secret: string
): boolean {
  try {
    const calculatedSignature = `sha256=${createHmac("sha256", secret)
      .update(body)
      .digest("hex")}`;

    return timingSafeEqual(
      Buffer.from(calculatedSignature),
      Buffer.from(signature)
    );
  } catch (error) {
    console.error("Error validating webhook signature:", error);
    return false;
  }
}

/**
 * Normalizes Notion ID by removing hyphens for comparison
 */
export function normalizeNotionId(id: string): string {
  return id.replace(/-/g, "");
}

// Standalone pages mapping
const STANDALONE_PAGES = {
  [process.env.HOME_PAGE_ID!]: "/",
  [process.env.ABOUT_PAGE_ID!]: "/about",
  [process.env.STACK_PAGE_ID!]: "/stack",
} as const;

// Database mappings
const DATABASE_ROUTES = {
  [process.env.NOTION_DB_ID!]: "/posts",
  [process.env.NOTION_PROJECTS_DB_ID!]: "/projects",
} as const;

/**
 * Gets route for standalone pages by page ID
 */
export function getStandaloneRoute(pageId: string): string | null {
  const normalizedPageId = normalizeNotionId(pageId);

  for (const [envPageId, route] of Object.entries(STANDALONE_PAGES)) {
    if (normalizeNotionId(envPageId) === normalizedPageId) {
      return route;
    }
  }

  return null;
}

/**
 * Determines which route to revalidate based on parent database and page ID
 */
export async function getRouteByDatabaseAndPageId(
  databaseId: string,
  pageId: string
): Promise<string | null> {
  const normalizedDatabaseId = normalizeNotionId(databaseId);

  // Check if this database matches existing databases via env variables
  for (const [envDatabaseId, routePrefix] of Object.entries(DATABASE_ROUTES)) {
    if (normalizeNotionId(envDatabaseId) === normalizedDatabaseId) {
      // Get the slug for this page
      const slug = await getSlugByPageId(pageId);
      if (slug) {
        return `${routePrefix}/${slug}`;
      }
      // No slug found for this page, return null
      return null;
    }
  }

  return null;
}
