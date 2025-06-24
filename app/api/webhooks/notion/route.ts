import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";
import { Client } from "@notionhq/client";

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_KEY,
});

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
 * Normalizes Notion ID by removing hyphens for comparison
 */
function normalizeNotionId(id: string): string {
  return id.replace(/-/g, "");
}

/**
 * Gets the slug from a Notion page by querying its properties
 */
async function getSlugByPageId(pageId: string): Promise<string | null> {
  try {
    // Fetch the page to get its properties
    const page = await notion.pages.retrieve({ page_id: pageId });

    if (!("properties" in page)) {
      return null;
    }

    // Extract slug from properties
    const slugProperty = page.properties.slug;
    if (
      slugProperty?.type === "rich_text" &&
      slugProperty.rich_text.length > 0
    ) {
      return slugProperty.rich_text[0].plain_text;
    }

    return null;
  } catch (error) {
    console.error("Error fetching page slug:", error);
    return null;
  }
}

/**
 * Gets route for standalone pages by page ID
 */
function getStandaloneRoute(pageId: string): string | null {
  const normalizedPageId = normalizeNotionId(pageId);

  for (const [envPageId, route] of Object.entries(STANDALONE_PAGES)) {
    if (normalizeNotionId(envPageId) === normalizedPageId) {
      return route;
    }
  }

  return null;
}

/**
 * Determines which route to revalidate based on database parent and page ID
 */
async function getRouteByDatabaseAndPageId(
  databaseId: string,
  pageId: string
): Promise<string | null> {
  const normalizedDatabaseId = normalizeNotionId(databaseId);

  // Check if this database matches our known databases
  for (const [envDatabaseId, routePrefix] of Object.entries(DATABASE_ROUTES)) {
    if (normalizeNotionId(envDatabaseId) === normalizedDatabaseId) {
      // Get the slug for this page
      const slug = await getSlugByPageId(pageId);
      if (slug) {
        return `${routePrefix}/${slug}`;
      }
      break;
    }
  }

  return null;
}

/**
 * Webhook handler for Notion page content updates
 */
export async function POST(request: NextRequest) {
  try {
    const webhook = await request.json();

    console.log("Received webhook:", {
      type: webhook.type,
      pageId: webhook.entity?.id,
      timestamp: webhook.timestamp,
      parent: webhook.data?.parent,
    });

    if (webhook.type === "page.content_updated") {
      const pageId = webhook.entity?.id;
      const parentData = webhook.data?.parent;

      if (!pageId) {
        console.error("No page ID found in webhook payload");
        return new Response("Missing page ID", { status: 400 });
      }

      let routeToRevalidate: string | null = null;

      // Check if parent is a database
      if (parentData?.type === "database_id") {
        const databaseId = parentData.id;
        console.log(`Page ${pageId} belongs to database ${databaseId}`);

        // Get route based on database and page ID
        routeToRevalidate = await getRouteByDatabaseAndPageId(
          databaseId,
          pageId
        );
      } else {
        console.log(
          `Page ${pageId} is not in a database, checking standalone pages`
        );

        // Check if it's a standalone page
        routeToRevalidate = getStandaloneRoute(pageId);
      }

      if (routeToRevalidate) {
        try {
          revalidatePath(routeToRevalidate);
          console.log(`Revalidated route: ${routeToRevalidate}`);
        } catch (error) {
          console.error(
            `Failed to revalidate route ${routeToRevalidate}:`,
            error
          );
        }
      } else {
        console.log(`No route found for page ID: ${pageId}`);
      }
    } else {
      console.log(`Ignoring webhook type: ${webhook.type}`);
    }

    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
