import type { MDXComponents } from "mdx/types";
import React, { ComponentPropsWithoutRef } from "react";
import { Link } from "next-view-transitions";

type AnchorProps = ComponentPropsWithoutRef<"a">;

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: ({ href, children, ...props }: AnchorProps) => {
      const baseClasses = "hover:underline hover:text-blue-800";

      if (href?.startsWith("/")) {
        return (
          <Link
            href={href}
            className={`text-blue-500 ${baseClasses}`}
            {...props}
          >
            {children}
          </Link>
        );
      }
      if (href?.startsWith("#")) {
        return (
          <a href={href} className={`text-blue-500 ${baseClasses}`} {...props}>
            {children}
          </a>
        );
      }
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-blue-500 ${baseClasses}`}
          {...props}
        >
          {children}
        </a>
      );
    },
    ...components,
  };
}
