import { colorMap } from "@/app/mapping";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  arta,
  tomorrowNight,
} from "react-syntax-highlighter/dist/esm/styles/hljs";

import {
  CodeBlockObjectResponse,
  TextRichTextItemResponse,
  Heading3BlockObjectResponse,
  Heading2BlockObjectResponse,
  Heading1BlockObjectResponse,
  ParagraphBlockObjectResponse,
  MultiSelectPropertyItemObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

type CustomMultiSelectPropertyItemObjectResponse = Omit<
  MultiSelectPropertyItemObjectResponse,
  "object"
>;

export const RichText: React.FC<{ item: TextRichTextItemResponse }> = ({
  item,
}) => {
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

export function Heading2({ heading_2 }: Heading2BlockObjectResponse) {
  const { rich_text, color } = heading_2;
  const headingClassName = `text-2xl font-bold mb-4 ${
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

export function Heading3({ heading_3 }: Heading3BlockObjectResponse) {
  const { rich_text, color } = heading_3;
  const headingClassName = `text-l font-bold mb-4 ${
    colorMap[color] || colorMap.default
  }`;
  return (
    <h3 className={headingClassName}>
      {rich_text
        .filter(
          (item): item is TextRichTextItemResponse => item.type === "text"
        )
        .map((item, index) => (
          <RichText key={index} item={item} />
        ))}
    </h3>
  );
}

export function Paragraph({ paragraph }: ParagraphBlockObjectResponse) {
  const { rich_text, color } = paragraph;
  const headingClassName = `text-normal mb-4 ${
    colorMap[color] || colorMap.default
  }`;
  return (
    <h3 className={headingClassName}>
      {rich_text
        .filter(
          (item): item is TextRichTextItemResponse => item.type === "text"
        )
        .map((item, index) => (
          <RichText key={index} item={item} />
        ))}
    </h3>
  );
}

export function Code({ code }: CodeBlockObjectResponse) {
  const { rich_text, language } = code;
  const codeContent = rich_text
    .filter((item): item is TextRichTextItemResponse => item.type === "text")
    .map((item) => item.text.content)
    .join("\n");
  return (
    <SyntaxHighlighter language={language} style={tomorrowNight}>
      {codeContent}
    </SyntaxHighlighter>
  );
}

export function Tags(props: CustomMultiSelectPropertyItemObjectResponse) {
  const { multi_select } = props;
  return null;
}
