import {
  Heading2Block,
  RichTextItem,
  HeadingBlock,
  CodeBlock,
} from "@/app/types";
import { colorMap } from "@/app/mapping";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/hljs";

import {
  CodeBlockObjectResponse,
  RichTextItemResponse,
  TextRichTextItemResponse,
  Heading3BlockObjectResponse,
  Heading2BlockObjectResponse,
  Heading1BlockObjectResponse,
  ParagraphBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

type TextBasedObjectResponse =
  | Heading1BlockObjectResponse
  | Heading2BlockObjectResponse
  | Heading3BlockObjectResponse;

const RichText: React.FC<{ item: TextRichTextItemResponse }> = ({ item }) => {
  const { annotations, text } = item;
  const className = [
    annotations.bold ? "font-bold" : "",
    annotations.italic ? "italic" : "",
    annotations.strikethrough ? "line-through" : "",
    annotations.underline ? "underline" : "",
    annotations.code ? "font-mono bg-gray-100 rounded px-1" : "",
    colorMap[annotations.color] || colorMap.default,
  ].join(" ");

  return <span className={className}>{text.content}</span>;
};

export function Heading(props: HeadingBlock) {
  const heading_content = props[props.type];
  if (!heading_content) return null;
  const { rich_text, color } = heading_content;
  const headingClassName = `font-bold mb-4 ${
    colorMap[color] || colorMap.default
  }`;
  let Tag: "h1" | "h2" | "h3" | "p";
  let sizeClass: string;

  switch (props.type) {
    case "heading_1":
      Tag = "h1";
      sizeClass = "text-4xl";
      break;
    case "heading_2":
      Tag = "h2";
      sizeClass = "text-2xl";
      break;
    case "heading_3":
      Tag = "h3";
      sizeClass = "text-xl";
      break;
    case "paragraph":
      Tag = "p";
      sizeClass = "text-normal";
      break;
  }
  return (
    <Tag className={`${headingClassName} ${sizeClass}`}>
      {rich_text.map((item, index) => (
        <RichText key={index} item={item} />
      ))}
    </Tag>
  );
}

export function Code({ code }: CodeBlockObjectResponse) {
  const { rich_text, language } = code;
  const codeContent = rich_text
    .filter((item): item is TextRichTextItemResponse => item.type === "text")
    .map((item) => item.text.content)
    .join("\n");
  return (
    <SyntaxHighlighter language={language} style={tomorrow}>
      {codeContent}
    </SyntaxHighlighter>
  );
}

export function Heading1({ heading_1 }: Heading1BlockObjectResponse) {
  const { rich_text, color } = heading_1;
  const headingClassName = `text-3xl font-bold mb-4 ${
    colorMap[color] || colorMap.default
  }`;
  return (
    <h1 className={headingClassName}>
      {rich_text
        .filter(
          (item): item is TextRichTextItemResponse => item.type === "text"
        )
        .map((item, index) => (
          <RichText key={index} item={item} />
        ))}
    </h1>
  );
}

export function Heading2({ heading_1 }: Heading1BlockObjectResponse) {
  const { rich_text, color } = heading_1;
  const headingClassName = `text-3xl font-bold mb-4 ${
    colorMap[color] || colorMap.default
  }`;
  return (
    <h2 className={headingClassName}>
      {rich_text
        .filter(
          (item): item is TextRichTextItemResponse => item.type === "text"
        )
        .map((item, index) => (
          <RichText key={index} item={item} />
        ))}
    </h2>
  );
}
