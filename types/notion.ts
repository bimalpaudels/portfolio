import {
  PartialBlockObjectResponse,
  PageObjectResponse,
  GetBlockResponse,
} from "@notionhq/client/build/src/api-endpoints";

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
