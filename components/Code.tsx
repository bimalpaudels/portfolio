"use client";

import { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneLight,
  oneDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  CodeBlockObjectResponse,
  TextRichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { Copy, Check } from "lucide-react";

// Language extension mapping
const getLanguageExtension = (language: string) => {
  const lang = language?.toLowerCase();

  switch (lang) {
    case "python":
    case "py":
      return ".py";
    case "javascript":
    case "js":
      return ".js";
    case "typescript":
    case "ts":
      return ".ts";
    case "react":
    case "jsx":
      return ".jsx";
    case "tsx":
      return ".tsx";
    case "html":
      return ".html";
    case "css":
      return ".css";
    case "scss":
      return ".scss";
    case "sass":
      return ".sass";
    case "json":
      return ".json";
    case "bash":
    case "shell":
    case "sh":
    case "zsh":
      return "Shell";
    case "rust":
    case "rs":
      return ".rs";
    case "go":
    case "golang":
      return ".go";
    case "php":
      return ".php";
    case "ruby":
    case "rb":
      return ".rb";
    case "swift":
      return ".swift";
    case "kotlin":
    case "kt":
      return ".kt";
    case "java":
      return ".java";
    case "cpp":
    case "c++":
      return ".cpp";
    case "cxx":
      return ".cxx";
    case "c":
      return ".c";
    case "csharp":
    case "c#":
    case "cs":
      return ".cs";
    case "sql":
    case "mysql":
    case "postgresql":
      return ".sql";
    case "yaml":
    case "yml":
      return ".yml";
    case "markdown":
    case "md":
      return ".md";
    case "dockerfile":
    case "docker":
      return "Dockerfile";
    case "nginx":
    case "apache":
      return ".conf";
    case "xml":
      return ".xml";
    case "toml":
      return ".toml";
    case "ini":
      return ".ini";
    case "env":
      return ".env";
    default:
      return "zsh";
  }
};

export function Code({ code }: CodeBlockObjectResponse) {
  const { rich_text, language } = code;
  const [copied, setCopied] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Check for dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      if (typeof window !== "undefined") {
        const isDarkMode =
          document.documentElement.classList.contains("dark") ||
          window.matchMedia("(prefers-color-scheme: dark)").matches;
        setIsDark(isDarkMode);
      }
    };

    checkDarkMode();

    // Listen for theme changes
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const observer = new MutationObserver(checkDarkMode);

      mediaQuery.addEventListener("change", checkDarkMode);
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });

      return () => {
        mediaQuery.removeEventListener("change", checkDarkMode);
        observer.disconnect();
      };
    }
  }, []);

  const codeContent = rich_text
    .filter((item): item is TextRichTextItemResponse => item.type === "text")
    .map((item) => item.text.content)
    .join("\n");

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(codeContent);
      } else {
        // Fallback for older browsers or non-secure contexts
        const textArea = document.createElement("textarea");
        textArea.value = codeContent;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        textArea.remove();
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  return (
    <div className="my-8 group relative">
      {/* Header with language extension and copy button */}
      <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-t-xl border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-gray-600 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
            {getLanguageExtension(language || "")}
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center justify-center w-8 h-8 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          aria-label="Copy code to clipboard"
          title={copied ? "Copied!" : "Copy code"}
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Code content with proper syntax highlighting */}
      <div className="relative overflow-hidden rounded-b-xl border-x border-b border-gray-200 dark:border-gray-700">
        <div className="overflow-x-auto">
          <SyntaxHighlighter
            language={language || "bash"}
            style={isDark ? oneDark : oneLight}
            customStyle={{
              margin: 0,
              borderRadius: 0,
              fontSize: "14px",
              lineHeight: "1.6",
              padding: "1rem",
              fontFamily:
                "'JetBrains Mono', 'Fira Code', 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace",
              minWidth: "100%",
            }}
            showLineNumbers={false}
            wrapLines={false}
            wrapLongLines={false}
          >
            {codeContent}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
}
