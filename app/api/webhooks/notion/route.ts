import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";
import {
  getStandaloneRoute,
  getRouteByDatabaseAndPageId,
  validateWebhookSignature,
} from "@/lib";

export async function POST(request: NextRequest) {
  try {
    // Get the raw body for signature validation
    const body = await request.text();
    const signature = request.headers.get("X-Notion-Signature");

    // Get the verification token from environment variables
    const verificationToken = process.env.NOTION_WEBHOOK_SECRET;

    if (!verificationToken) {
      console.error(
        "NOTION_WEBHOOK_SECRET is not defined in environment variables"
      );
      return new Response("Webhook secret not configured", { status: 500 });
    }

    if (!signature) {
      console.error("Missing X-Notion-Signature header");
      return new Response("Missing signature header", { status: 400 });
    }

    // Validate the webhook signature
    const isValidSignature = validateWebhookSignature(
      body,
      signature,
      verificationToken
    );

    if (!isValidSignature) {
      console.error("Invalid webhook signature");
      return new Response("Invalid signature", { status: 401 });
    }

    // Parse the webhook payload
    const webhook = JSON.parse(body);

    console.log("Received webhook for debug:", {
      type: webhook.type,
      pageId: webhook.entity?.id,
      timestamp: webhook.timestamp,
      parent: webhook.data?.parent,
      full_object: webhook,
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
      if (parentData?.type === "database") {
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
