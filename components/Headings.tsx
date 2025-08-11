import {
  Heading1BlockObjectResponse,
  Heading2BlockObjectResponse,
  Heading3BlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

export function Heading1({ heading_1 }: Heading1BlockObjectResponse) {
  const { rich_text } = heading_1;
  const { plain_text } = rich_text[0];
  return <h1 className="text-gray-900 dark:text-gray-100">{plain_text}</h1>;
}

export function Heading2({ heading_2 }: Heading2BlockObjectResponse) {
  const { rich_text } = heading_2;
  const { plain_text } = rich_text[0];
  return <h2 className="text-gray-900 dark:text-gray-100">{plain_text}</h2>;
}

export function Heading3({ heading_3 }: Heading3BlockObjectResponse) {
  const { rich_text } = heading_3;
  const { plain_text } = rich_text[0];
  return <h3 className="text-gray-900 dark:text-gray-100">{plain_text}</h3>;
}
