import {
  Heading1,
  Heading2,
  Heading3,
  Paragraph,
  Code,
  PostImage,
} from "@/components";
import {
  Heading1BlockObjectResponse,
  Heading2BlockObjectResponse,
  Heading3BlockObjectResponse,
  ParagraphBlockObjectResponse,
  CodeBlockObjectResponse,
  ImageBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { NotionBlockChildrenRendererProps } from "@/types";

export default function NotionBlockRenderer({
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

          case "image":
            return (
              <PostImage
                key={block.id}
                {...(block as ImageBlockObjectResponse)}
              />
            );
          default:
            return null;
        }
      })}
    </>
  );
}
