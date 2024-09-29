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
  Heading1BlockObjectResponse,
  Heading2BlockObjectResponse,
  Heading3BlockObjectResponse,
  ParagraphBlockObjectResponse,
  CodeBlockObjectResponse,
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
            return (
              <Heading1
                key={block.id}
                {...(block as Heading1BlockObjectResponse)}
              />
            );

          case "heading_2":
            return (
              <Heading2
                key={block.id}
                {...(block as Heading2BlockObjectResponse)}
              />
            );

          case "heading_3":
            return (
              <Heading3
                key={block.id}
                {...(block as Heading3BlockObjectResponse)}
              />
            );

          case "paragraph":
            return (
              <Paragraph
                key={block.id}
                {...(block as ParagraphBlockObjectResponse)}
              />
            );

          case "code":
            return (
              <Code key={block.id} {...(block as CodeBlockObjectResponse)} />
            );
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
        <div>
          <Link href={`/posts/${slug}`} className="text-lg font-bold">
            {title?.plain_text}
          </Link>
        </div>

        <PageDescription
          description={description as TextRichTextItemResponse[]}
        />

        <div className="text-grey-800 text-base leading-normal mt-1">
          <a href={`/posts/${slug}`} className="text-sm text-[#ACADAF]">
            Read post →
          </a>
        </div>
      </div>
    );
  });
}
