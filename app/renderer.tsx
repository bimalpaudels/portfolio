import { Heading2Block, RichTextItem } from "@/app/types";
import { Heading, Heading2 } from "@/app/componenets";

export default function NotionRenderer({ blocks }: any) {
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
            console.log(block);
        }
      })}
    </div>
  );
}
