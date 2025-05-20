import { fetchPageBySlug } from "@/lib";
import { Metadata } from "next";

type LayoutProps = {
  params: Promise<{ slug: string }>
};

export async function generateMetadata({
  params,
}: LayoutProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await fetchPageBySlug(slug);
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
