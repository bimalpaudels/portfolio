import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";
import {
  getRouteByDatabaseAndPageId,
  validateWebhookSignature,
  getListingPageByDatabaseId,
} from "@/lib";

export async function POST(request: NextRequest) {
  try {
    // Get the raw body for signature validation
    const body = await request.text();

    // Parse the webhook payload
    const webhook = JSON.parse(body);

    // Handle initial verification request first
    if (webhook.verification_token) {
      console.log(webhook);
      console.log("Received verification token:", webhook.verification_token);
      return new Response("OK", { status: 200 });
    }
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

    console.log("Received webhook for debug:", {
      type: webhook.type,
      pageId: webhook.entity?.id,
      timestamp: webhook.timestamp,
      parent: webhook.data?.parent,
      full_object: webhook,
    });

    if (
      webhook.type === "page.content_updated" ||
      webhook.type === "page.properties_updated"
    ) {
      const pageId = webhook.entity?.id;
      const parentData = webhook.data?.parent;

      if (!pageId) {
        console.error("No page ID found in webhook payload");
        return new Response("Missing page ID", { status: 400 });
      }

      let routeToRevalidate: string | null = null;
      let listPageToRevalidate: string | null = null;

      // Check if parent is a database
      if (parentData?.type === "database") {
        const databaseId = parentData.id;
        console.log(`Page ${pageId} belongs to database ${databaseId}`);

        // Get route based on database and page ID
        routeToRevalidate = await getRouteByDatabaseAndPageId(
          databaseId,
          pageId
        );

        // For properties_updated, keep track of the listing page to revalidate
        if (webhook.type === "page.properties_updated") {
          listPageToRevalidate = getListingPageByDatabaseId(databaseId);
        }
      } else {
        console.log(
          `Page ${pageId} is not in a database, ignoring standalone pages`
        );
        // No standalone pages exist anymore, so we ignore these
      }

      if (routeToRevalidate) {
        try {
          revalidatePath(routeToRevalidate);
          console.log(`Revalidated route: ${routeToRevalidate}`);

          // For properties_updated, also revalidate the listing page
          if (
            webhook.type === "page.properties_updated" &&
            listPageToRevalidate
          ) {
            revalidatePath(listPageToRevalidate);
            console.log(`Revalidated listing page: ${listPageToRevalidate}`);
          }
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
