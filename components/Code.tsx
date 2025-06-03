"use client";

import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { monokai } from "react-syntax-highlighter/dist/esm/styles/hljs";
import {
  CodeBlockObjectResponse,
  TextRichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";
import {
  Copy,
  Check,
  FileText,
  Braces,
  Terminal,
  Globe,
  Palette,
  Database,
} from "lucide-react";

// Language icon mapping using Lucide icons
const getLanguageIcon = (language: string) => {
  const lang = language?.toLowerCase();

  switch (lang) {
    case "python":
      return <FileText className="w-4 h-4 text-blue-400" />;
    case "javascript":
    case "js":
      return <Braces className="w-4 h-4 text-yellow-400" />;
    case "typescript":
    case "ts":
      return <Braces className="w-4 h-4 text-blue-500" />;
    case "react":
    case "jsx":
    case "tsx":
      return <Braces className="w-4 h-4 text-cyan-400" />;
    case "html":
      return <Globe className="w-4 h-4 text-orange-400" />;
    case "css":
      return <Palette className="w-4 h-4 text-blue-400" />;
    case "json":
      return <Database className="w-4 h-4 text-green-400" />;
    case "bash":
    case "shell":
    case "sh":
      return <Terminal className="w-4 h-4 text-green-400" />;
    default:
      return <FileText className="w-4 h-4 text-gray-400" />;
  }
};

export function Code({ code }: CodeBlockObjectResponse) {
  const { rich_text, language } = code;
  const [copied, setCopied] = useState(false);

  const codeContent = rich_text
    .filter((item): item is TextRichTextItemResponse => item.type === "text")
    .map((item) => item.text.content)
    .join("\n");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  return (
    <div className="my-8 group relative">
      {/* Modern header with language icon and copy button */}
      <div className="flex items-center justify-between bg-slate-900/95 dark:bg-gray-900/95 backdrop-blur-sm px-3 sm:px-4 py-2.5 sm:py-3 rounded-t-xl border border-slate-700/50 dark:border-gray-700/50">
        <div className="flex items-center gap-2">
          {getLanguageIcon(language || "code")}
          <span className="text-xs sm:text-sm font-medium text-slate-300 dark:text-gray-300 capitalize">
            {language || "code"}
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 text-slate-400 hover:text-white hover:bg-slate-700/50 dark:hover:bg-gray-700/50 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-slate-900"
          aria-label="Copy code to clipboard"
          title={copied ? "Copied!" : "Copy code"}
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400" />
          ) : (
            <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          )}
        </button>
      </div>

      {/* Code content with enhanced styling */}
      <div className="relative overflow-hidden rounded-b-xl border-x border-b border-slate-700/50 dark:border-gray-700/50">
        <div className="overflow-x-auto">
          <SyntaxHighlighter
            language={language}
            style={monokai}
            customStyle={{
              margin: 0,
              borderRadius: 0,
              fontSize: "13px",
              lineHeight: "1.5",
              padding: "1rem",
              background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
              border: "none",
              fontFamily:
                "'JetBrains Mono', 'Fira Code', 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace",
              minWidth: "100%",
            }}
            showLineNumbers={true}
            lineNumberStyle={{
              color: "#64748b",
              fontSize: "11px",
              minWidth: "2rem",
              textAlign: "right",
              borderRight: "1px solid #334155",
              marginRight: "0.75rem",
              paddingRight: "0.5rem",
            }}
            wrapLines={false}
            wrapLongLines={false}
          >
            {codeContent}
          </SyntaxHighlighter>
        </div>

        {/* Enhanced gradient overlay */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5"></div>

        {/* Subtle border glow effect */}
        <div className="absolute inset-0 pointer-events-none rounded-b-xl ring-1 ring-inset ring-white/10"></div>
      </div>
    </div>
  );
}
