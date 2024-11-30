import { fetchPageBySlug } from "@/lib";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const page = await fetchPageBySlug(params.slug);
  const { properties } = page;

  const title =
    "title" in properties.Title ? properties.Title.title[0].plain_text : "Post";
  const description =
    properties.Description.type === "rich_text"
      ? properties.Description.rich_text[0].plain_text
      : "";
  return {
    title: title,
    description: description,
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
