import {
  Heading1,
  Heading2,
  Heading3,
  Paragraph,
  Code,
  RichText,
} from "@/app/componenets";
import {
  GetBlockResponse,
  GetPageResponse,
  GetDatabaseResponse,
  PageObjectResponse,
  TitlePropertyItemObjectResponse,
  TextRichTextItemResponse,
  MultiSelectPropertyItemObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

import Link from "next/link";

type NotionBlockChildrenRendererProps = {
  blocks: GetBlockResponse[];
};

type NotionDBPagesRendererProps = {
  pages: (GetPageResponse | GetDatabaseResponse)[];
};

// The SDK's MultiSelectPropertyItemObjectResponse has an object key which doesn't exist on the responses
type CustomMultiSelectPropertyItemObjectResponse = Omit<
  MultiSelectPropertyItemObjectResponse,
  "object"
>;

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

export function NotionPagePropsRenderer(props: PageObjectResponse) {
  /* 
  Component to render the properties of a Page.
  If additional properties are to be rendered, this has to be updated.
  Currently working with : Title, Tags and Updated
  */
  const { properties } = props;
  const { Title, Tags, Updated } = properties;
  console.log(properties);
  if ("title" in properties.Title) {
    const titleText = properties.Title.title[0];

    return (
      <p className="text-4xl font-bold mb-6">
        <RichText item={titleText as TextRichTextItemResponse} />
      </p>
    );
  }
  // For Tags, Object type is CustomMultiSelectPropertyItemObjectResponse

  // TBD: Updated, probably just a span

  return null;
}
