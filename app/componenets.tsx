import {
  Heading2Block,
  RichTextItem,
  HeadingBlock,
  CodeBlock,
} from "@/app/types";
import { colorMap } from "@/app/mapping";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { arta } from "react-syntax-highlighter/dist/cjs/styles/prism";

const RichText: React.FC<{ item: RichTextItem }> = ({ item }) => {
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

export function Heading2({ heading_2 }: Heading2Block) {
  // Depreciated
  const { rich_text, is_toggleable, color } = heading_2;
  const headingClassName = `text-2xl font-bold mb-4 ${
    colorMap[color] || colorMap.default
  }`;
  return (
    <h2 className={headingClassName}>
      {rich_text.map((item, index) => (
        <RichText key={index} item={item} />
      ))}
      {is_toggleable && <span className="ml-2">▼</span>}
    </h2>
  );
}

export function Heading(props: HeadingBlock) {
  const heading_content = props[props.type];
  if (!heading_content) return null;
  const { rich_text, is_toggleable, color } = heading_content;
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
      {is_toggleable && <span className="ml-2">▼</span>}
    </Tag>
  );
}

export function Code({ code }: CodeBlock) {
  const { rich_text, language } = code;
  const codeContent = rich_text.map((item) => item.text.content).join("\n");
  return (
    <SyntaxHighlighter language={language} style={arta}>
      {codeContent}
    </SyntaxHighlighter>
  );
}
