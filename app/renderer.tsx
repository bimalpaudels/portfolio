import { Heading, Code } from "@/app/componenets";
import { BlockList } from "@/app/types";

export default function NotionRenderer({ blocks }: BlockList) {
  return (
    <div>
      {blocks.map((block) => {
        switch (block.type) {
          case "heading_1":
          case "heading_2":
          case "heading_3":
          case "paragraph":
            return <Heading key={block.id} {...block} />;

          case "code":
            return <Code key={block.id} {...block} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
