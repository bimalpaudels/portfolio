"use client";

import { CategorySection } from "@/components/CategorySection";
import { stackCategories, tldrItems } from "@/data/stackData";

import { useState } from "react";

export default function Stack() {
  const [expandedSections, setExpandedSections] = useState<string[]>(["ai"]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  return (
    <div className="px-1">
      {/* Code Philosophy */}
      <div className="mb-8">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
          I mostly build with Python — it&apos;s my go-to for backends, AI work,
          and data-heavy tasks. I also write a fair amount of TypeScript/JS on
          the frontend. My approach centers on building scalable systems by
          keeping the codebase clean, maintainable and performant. I try to
          anyway.
        </p>
      </div>

      {/* TLDR Section */}
      <div className="mb-8">
        <h3 className="font-heading font-medium text-base text-gray-900 dark:text-custom_dark mb-2">
          TLDR:
        </h3>
        <div className="flex flex-wrap gap-2">
          {tldrItems.map((item) => (
            <span
              key={item}
              className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
      {/* Technology Stack - All categories including Currently Exploring */}
      <div className="space-y-4">
        {stackCategories.map((category) => (
          <CategorySection
            key={category.key}
            title={category.title}
            description={category.description}
            technologies={category.technologies}
            isExpanded={expandedSections.includes(category.key)}
            onToggle={() => toggleSection(category.key)}
            isSpecialSection={category.isSpecial || false}
          />
        ))}
      </div>
    </div>
  );
}
