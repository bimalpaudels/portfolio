import { NextRequest } from "next/server";

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
      webhook,
    });
    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
