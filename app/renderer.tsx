import {
  Heading1,
  Heading2,
  Heading3,
  Paragraph,
  Code,
  PageDescription,
} from "@/app/componenets";
import {
  GetBlockResponse,
  PageObjectResponse,
  TextRichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";

import { Link } from "next-view-transitions";

type NotionBlockChildrenRendererProps = {
  blocks: GetBlockResponse[];
};

export type NotionDBPagesRendererProps = {
  pages: PageObjectResponse[];
};

export default function NotionBlockChildrenRenderer({
  blocks,
}: NotionBlockChildrenRendererProps) {
  return (
    <>
      {blocks.map((block) => {
        if (!("type" in block)) {
          return null;
        }
        switch (block.type) {
          case "heading_1":
            return <Heading1 key={block.id} {...block} />;

          case "heading_2":
            return <Heading2 key={block.id} {...block} />;

          case "heading_3":
            return <Heading3 key={block.id} {...block} />;

          case "paragraph":
            return <Paragraph key={block.id} {...block} />;

          case "code":
            return <Code key={block.id} {...block} />;
          default:
            return null;
        }
      })}
    </>
  );
}

export function NotionDBPagesRenderer({ pages }: NotionDBPagesRendererProps) {
  return pages.map((page) => {
    const { properties } = page;
    const title =
      "title" in properties.Title ? properties.Title.title[0] : null;
    const description =
      properties.Description.type === "rich_text"
        ? properties.Description.rich_text
        : "";
    const slug =
      properties.slug.type === "rich_text"
        ? properties.slug.rich_text[0].plain_text
        : null;
    return (
      <div key={page.id}>
        <div className="text-gray-800">
          <Link
            href={`/learn/${slug}`}
            className="text-lg font-bold hover:underline"
          >
            {title?.plain_text}
          </Link>
        </div>
        <div className="mt-1">
          <PageDescription
            description={description as TextRichTextItemResponse[]}
          />
        </div>
        <div className="text-grey-800 text-base leading-normal mt-2">
          <a
            href={`/learn/${page.id}`}
            className="hover:text-black text-sm no-underline hover:underline"
          >
            Read article →
          </a>
        </div>
      </div>
    );
  });
}
