import { colorMap } from "@/app/mapping";
import SyntaxHighlighter from "react-syntax-highlighter";
import { monokai } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { Link } from "next-view-transitions";
import Image from "next/image";

import {
  CodeBlockObjectResponse,
  TextRichTextItemResponse,
  Heading3BlockObjectResponse,
  Heading2BlockObjectResponse,
  Heading1BlockObjectResponse,
  ParagraphBlockObjectResponse,
  MultiSelectPropertyItemObjectResponse,
  LastEditedTimePropertyItemObjectResponse,
  ImageBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

export const RichText: React.FC<{ item: TextRichTextItemResponse }> = ({
  item,
}) => {
  const { annotations, text } = item;
  const className = [
    annotations.bold ? "font-semibold" : "",
    annotations.italic ? "italic" : "",
    annotations.strikethrough ? "line-through" : "",
    annotations.underline ? "underline" : "",
    annotations.code
      ? "font-mono text-sm bg-gray-100 dark:bg-gray-800 text-pink-600 dark:text-pink-400 rounded px-1 py-0.5"
      : "",
    colorMap[annotations.color] || colorMap.default,
  ].join(" ");

  const content = <span className={className}>{text.content}</span>;
  return text.link ? <Link href={text.link.url}>{content}</Link> : content;
};

export function Heading1({ heading_1 }: Heading1BlockObjectResponse) {
  const { rich_text } = heading_1;
  const { plain_text } = rich_text[0];
  return <h1>{plain_text}</h1>;
}

export function Heading2({ heading_2 }: Heading2BlockObjectResponse) {
  const { rich_text } = heading_2;
  const { plain_text } = rich_text[0];
  return <h2>{plain_text}</h2>;
}

export function Heading3({ heading_3 }: Heading3BlockObjectResponse) {
  const { rich_text } = heading_3;
  const { plain_text } = rich_text[0];
  return <h3>{plain_text}</h3>;
}

export function Paragraph({ paragraph }: ParagraphBlockObjectResponse) {
  const { rich_text, color } = paragraph;
  const colorClass = colorMap[color] || colorMap.default;
  return (
    <p className={colorClass}>
      {rich_text
        .filter(
          (item): item is TextRichTextItemResponse => item.type === "text"
        )
        .map((item, index) => (
          <RichText key={index} item={item} />
        ))}
    </p>
  );
}

export function PostImage({ image }: ImageBlockObjectResponse) {
  const url = image.type === "file" ? image.file.url : image.external.url;
  const alt_text = image.caption[0] ? image.caption[0].plain_text : "";
  return (
    <div className="my-8">
      <Image
        src={url}
        alt={alt_text}
        width={700}
        height={400}
        className="rounded-lg shadow-sm w-full h-auto"
        priority={false}
      />
      {alt_text && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center italic">
          {alt_text}
        </p>
      )}
    </div>
  );
}

export function Code({ code }: CodeBlockObjectResponse) {
  const { rich_text, language } = code;
  const codeContent = rich_text
    .filter((item): item is TextRichTextItemResponse => item.type === "text")
    .map((item) => item.text.content)
    .join("\n");
  return (
    <div className="my-6">
      <SyntaxHighlighter
        language={language}
        style={monokai}
        customStyle={{
          borderRadius: "8px",
          fontSize: "14px",
          lineHeight: "1.5",
        }}
      >
        {codeContent}
      </SyntaxHighlighter>
    </div>
  );
}

export const NotionTags: React.FC<{
  tags: MultiSelectPropertyItemObjectResponse;
}> = ({ tags }) => (
  <div className="flex flex-wrap gap-2 mb-6">
    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
      Tags:
    </span>
    {tags.multi_select.map((tag) => (
      <span
        key={tag.id}
        className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full border border-gray-200 dark:border-gray-700"
      >
        {tag.name}
      </span>
    ))}
  </div>
);

export const NotionPageTitle: React.FC<{ title: TextRichTextItemResponse }> = ({
  title,
}) => (
  <h1 className="font-heading font-bold text-4xl md:text-5xl leading-tight mb-8 text-gray-900 dark:text-gray-100">
    {title.plain_text}
  </h1>
);

export const LastUpdated: React.FC<{
  updated: LastEditedTimePropertyItemObjectResponse;
}> = ({ updated }) => (
  <div className="mb-6">
    <span className="text-sm text-gray-500 dark:text-gray-400">
      Last updated:{" "}
      {new Date(updated.last_edited_time).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
    </span>
  </div>
);

export const PageDescription: React.FC<{
  description: TextRichTextItemResponse[];
}> = ({ description }) => (
  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
    {description.map((item, index) => (
      <RichText key={index} item={item} />
    ))}
  </p>
);

export function Header() {
  return (
    <Link href="/" className="inline-block group hover:no-underline">
      <h2 className="font-heading font-semibold text-xl pt-12 transition-all duration-300 ease-in-out transform group-hover:-translate-y-1 group-hover:rotate-2 text-gray-900 dark:text-gray-100">
        bimals.net
      </h2>
    </Link>
  );
}
