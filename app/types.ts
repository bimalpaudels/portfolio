import {
  BlockObjectResponse,
  PartialBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

export interface RichTextItem {
  type: "text";
  text: { content: string; link: string | null };
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
  plain_text: string;
  href: string | null;
}

export interface Heading2Block {
  // Depreciated
  type: "heading_2";
  heading_2: {
    rich_text: RichTextItem[];
    is_toggleable: boolean;
    color: string;
  };
}

export interface HeadingBlock {
  id: string;
  type: "heading_1" | "heading_2" | "heading_3" | "paragraph";
  heading_1?: {
    rich_text: RichTextItem[];
    is_toggleable: boolean;
    color: string;
  };
  heading_2?: {
    rich_text: RichTextItem[];
    is_toggleable: boolean;
    color: string;
  };
  heading_3?: {
    rich_text: RichTextItem[];
    is_toggleable: boolean;
    color: string;
  };
  paragraph?: {
    rich_text: RichTextItem[];
    color: string;
  };
}

export interface CodeBlock {
  id: string;
  type: "code";
  code: {
    rich_text: RichTextItem[];
    language: string;
  };
}

export type Block = HeadingBlock | CodeBlock;

export type BlockList = {
  blocks: (Block | PartialBlockObjectResponse)[];
};
