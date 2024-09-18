import {
  Heading1,
  Heading2,
  Heading3,
  Paragraph,
  Code,
} from "@/app/componenets";
import {
  GetBlockResponse,
  GetPageResponse,
  GetDatabaseResponse,
  MultiSelectPropertyItemObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

import Link from "next/link";

type NotionBlockChildrenRendererProps = {
  blocks: GetBlockResponse[];
};

type NotionDBPagesRendererProps = {
  pages: (GetPageResponse | GetDatabaseResponse)[];
};

export default function NotionBlockChildrenRenderer({
  blocks,
}: NotionBlockChildrenRendererProps) {
  return (
    <div>
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
    </div>
  );
}

export function NotionDBPagesRenderer({ pages }: NotionDBPagesRendererProps) {
  // This will contain the gallery view of the pages in the databases
  return (
    <>
      {pages.map((page) => {
        return (
          <p key={page.id}>
            <Link href={`/${page.id}`}>{page.id}</Link>
          </p>
        );
      })}
    </>
  );
}
