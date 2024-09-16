import {
  Heading1,
  Heading2,
  Heading3,
  Paragraph,
  Code,
} from "@/app/componenets";
import { GetBlockResponse } from "@notionhq/client/build/src/api-endpoints";

type NotionRendererProps = {
  blocks: GetBlockResponse[];
};

export default function NotionRenderer({ blocks }: NotionRendererProps) {
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
