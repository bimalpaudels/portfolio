import {
  PartialBlockObjectResponse,
  PageObjectResponse,
  GetBlockResponse,
} from "@notionhq/client/build/src/api-endpoints";

// Rich Text Types
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

// Block Types
export interface HeadingBlock {
  id: string;
  type: "heading_1" | "heading_2" | "heading_3" | "paragraph";
  heading_1?: {
    rich_text: RichTextItem[];
    is_toggleeable: boolean;
    color: string;
  };
  heading_2?: {
    rich_text: RichTextItem[];
    is_toggleeable: boolean;
    color: string;
  };
  heading_3?: {
    rich_text: RichTextItem[];
    is_toggleeable: boolean;
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

// Union Types
export type Block = HeadingBlock | CodeBlock;

export type BlockList = {
  blocks: (Block | PartialBlockObjectResponse)[];
};

// Database Types
export interface NotionDatabasePage extends PageObjectResponse {
  properties: {
    Title?: any;
    Name?: any;
    Description?: any;
    slug?: any;
    Status?: any;
    TechStack?: any;
    GitHub?: any;
    Demo?: any;
    Tags?: any;
    Updated?: any;
  };
}

// Component Props Types
export interface NotionDBPagesRendererProps {
  pages: PageObjectResponse[];
}

export interface NotionBlockChildrenRendererProps {
  blocks: GetBlockResponse[];
}
