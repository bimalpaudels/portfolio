import { NextRequest } from "next/server";
/**
 * Webhook handler for Notion page content updates
 */
export async function POST(request: NextRequest) {
  try {
    const webhook = await request.json();

    // Verify the initial request is from Notion
    if (webhook.verification_token) {
      console.log(webhook);
      console.log("Received verification token:", webhook.verification_token);
      return new Response("OK", { status: 200 });
    }

    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
